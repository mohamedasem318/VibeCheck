from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, BertForSequenceClassification
import joblib
import os

_BASE = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.getenv(
    "MODEL_DIR",
    os.path.join(_BASE, "..", "saved_models", "mentalbert_v3flat")
)
TOKENIZER_DIR = os.getenv(
    "TOKENIZER_DIR",
    os.path.join(MODEL_DIR, "tokenizer")
)
CHECKPOINT_PATH = os.getenv(
    "CHECKPOINT_PATH",
    os.path.join(_BASE, "..", "saved_models", "mentalbert_v3flat_best.pt")
)
LABEL_ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.joblib")
BASE_MODEL_NAME = "mental/mental-bert-base-uncased"
N_CLASSES = 7
MAX_LEN = 128
DEVICE = torch.device("cpu")

LABEL_MAP: dict[str, str] = {
    "Anxiety": "anxiety",
    "Bipolar": "bipolar",
    "Depression": "depression",
    "Normal": "normal",
    "Personality Disorder": "personality_disorder",
    "Stress": "stress",
    "Suicidal": "suicidal",
}

model_state: dict = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_DIR)

    # Load architecture from HuggingFace base, then overwrite weights from .pt checkpoint
    model = BertForSequenceClassification.from_pretrained(
        BASE_MODEL_NAME, num_labels=N_CLASSES, ignore_mismatched_sizes=True
    )
    checkpoint = torch.load(CHECKPOINT_PATH, map_location=DEVICE)
    # .pt may be a raw state_dict or wrapped under a key
    state_dict = checkpoint.get("model_state_dict", checkpoint)
    model.load_state_dict(state_dict)

    model.to(DEVICE)
    model.eval()
    label_encoder = joblib.load(LABEL_ENCODER_PATH)
    model_state.update({"tokenizer": tokenizer, "model": model, "label_encoder": label_encoder})
    print("MentalBERT model loaded successfully.")
    yield
    model_state.clear()


app = FastAPI(title="VibeCheck API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


class ClassifyRequest(BaseModel):
    text: str


class ClassifyResponse(BaseModel):
    classification: str
    confidence: float


@app.get("/")
def health():
    return {"status": "ok", "model_loaded": bool(model_state)}


@app.post("/classify", response_model=ClassifyResponse)
def classify(req: ClassifyRequest):
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=422, detail="text must not be empty")

    tokenizer = model_state["tokenizer"]
    model = model_state["model"]
    label_encoder = model_state["label_encoder"]

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding="max_length",
        max_length=MAX_LEN,
    )
    inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

    with torch.no_grad():
        logits = model(**inputs).logits

    probs = F.softmax(logits, dim=-1)
    confidence = float(probs.max().item())
    pred_idx = int(torch.argmax(probs, dim=-1).item())
    raw_label: str = label_encoder.inverse_transform([pred_idx])[0]

    return ClassifyResponse(
        classification=LABEL_MAP.get(raw_label, "normal"),
        confidence=round(confidence, 4),
    )
