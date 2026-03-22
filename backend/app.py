import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn.functional as F
from transformers import (
    AutoTokenizer,
    BertForSequenceClassification,
    BertConfig,
    BertTokenizerFast,
    LongformerForSequenceClassification,
    LongformerTokenizerFast,
)
from huggingface_hub import hf_hub_download
import joblib
import os

_BASE = os.path.dirname(os.path.abspath(__file__))
_SAVED = os.path.join(_BASE, "saved_models", "mentalbert_v3flat")
MODEL_DIR = os.getenv("MODEL_DIR", _SAVED)
TOKENIZER_DIR = os.getenv("TOKENIZER_DIR", os.path.join(_SAVED, "tokenizer"))
CHECKPOINT_PATH = os.getenv(
    "CHECKPOINT_PATH",
    os.path.join(_BASE, "saved_models", "mentalbert_v3flat_best.pt"),
)
LABEL_ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.joblib")

HF_REPO = "itsLu/mentalbert-longformer-stage3"
THRESHOLD_1A = 0.6
N_CLASSES = 7
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

# Registry: model_name -> loaded state dict
model_registry: dict = {}
_registry_locks: dict[str, asyncio.Lock] = {}


def _get_lock(name: str) -> asyncio.Lock:
    if name not in _registry_locks:
        _registry_locks[name] = asyncio.Lock()
    return _registry_locks[name]


def _load_mentalbert() -> dict:
    tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_DIR)
    cfg = BertConfig(
        vocab_size=30522,
        hidden_size=768,
        num_hidden_layers=12,
        num_attention_heads=12,
        intermediate_size=3072,
        num_labels=N_CLASSES,
    )
    model = BertForSequenceClassification(cfg)
    checkpoint = torch.load(CHECKPOINT_PATH, map_location=DEVICE)
    state_dict = checkpoint.get("model_state_dict", checkpoint)
    model.load_state_dict(state_dict)
    model.to(DEVICE)
    model.eval()
    label_encoder = joblib.load(LABEL_ENCODER_PATH)
    print("MentalBERT loaded.")
    return {"tokenizer": tokenizer, "model": model, "label_encoder": label_encoder}


def _load_longformer() -> dict:
    # Stage 1A tokenizer (shared with 1B and 2)
    tok_bert = BertTokenizerFast.from_pretrained(HF_REPO, subfolder="stage1a")

    model_1a = BertForSequenceClassification.from_pretrained(HF_REPO, subfolder="stage1a")
    model_1a.to(DEVICE).eval()

    model_1b = BertForSequenceClassification.from_pretrained(HF_REPO, subfolder="stage1b")
    model_1b.to(DEVICE).eval()

    model_2 = BertForSequenceClassification.from_pretrained(HF_REPO, subfolder="stage2")
    model_2.to(DEVICE).eval()

    le_path = hf_hub_download(HF_REPO, "stage2/label_encoder.joblib")
    label_encoder_2 = joblib.load(le_path)

    tok_longformer = LongformerTokenizerFast.from_pretrained(HF_REPO, subfolder="stage3")
    model_3 = LongformerForSequenceClassification.from_pretrained(HF_REPO, subfolder="stage3")
    model_3.to(DEVICE).eval()

    print("Longformer pipeline loaded.")
    return {
        "tok_bert": tok_bert,
        "model_1a": model_1a,
        "model_1b": model_1b,
        "model_2": model_2,
        "label_encoder_2": label_encoder_2,
        "tok_longformer": tok_longformer,
        "model_3": model_3,
    }


async def get_or_load(name: str) -> dict:
    if name in model_registry:
        return model_registry[name]
    lock = _get_lock(name)
    async with lock:
        # Double-check after acquiring lock
        if name in model_registry:
            return model_registry[name]
        loop = asyncio.get_event_loop()
        if name == "mentalbert":
            state = await loop.run_in_executor(None, _load_mentalbert)
        elif name == "longformer":
            state = await loop.run_in_executor(None, _load_longformer)
        else:
            raise HTTPException(status_code=400, detail=f"Unknown model: {name}")
        model_registry[name] = state
    return model_registry[name]


def _run_mentalbert(text: str, state: dict) -> tuple[str, float]:
    tokenizer = state["tokenizer"]
    model = state["model"]
    label_encoder = state["label_encoder"]

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding="max_length",
        max_length=128,
    )
    inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

    with torch.no_grad():
        logits = model(**inputs).logits

    probs = F.softmax(logits, dim=-1)
    confidence = float(probs.max().item())
    pred_idx = int(torch.argmax(probs, dim=-1).item())
    raw_label: str = label_encoder.inverse_transform([pred_idx])[0]
    return raw_label, confidence


def _run_longformer(text: str, state: dict) -> tuple[str, float]:
    tok_bert = state["tok_bert"]
    model_1a = state["model_1a"]
    model_1b = state["model_1b"]
    model_2 = state["model_2"]
    label_encoder_2 = state["label_encoder_2"]
    tok_longformer = state["tok_longformer"]
    model_3 = state["model_3"]

    def bert_inputs(text_: str) -> dict:
        enc = tok_bert(
            text_,
            return_tensors="pt",
            truncation=True,
            padding="max_length",
            max_length=128,
        )
        return {k: v.to(DEVICE) for k, v in enc.items()}

    # Stage 1A — suicidal gate
    with torch.no_grad():
        logits_1a = model_1a(**bert_inputs(text)).logits
    probs_1a = F.softmax(logits_1a, dim=-1)
    if float(probs_1a[0, 1].item()) >= THRESHOLD_1A:
        return "Suicidal", float(probs_1a[0, 1].item())

    # Stage 1B — normal vs distress
    with torch.no_grad():
        logits_1b = model_1b(**bert_inputs(text)).logits
    probs_1b = F.softmax(logits_1b, dim=-1)
    if float(probs_1b[0, 1].item()) <= 0.5:
        return "Normal", float(1.0 - probs_1b[0, 1].item())

    # Stage 2 — 5-class distress
    with torch.no_grad():
        logits_2 = model_2(**bert_inputs(text)).logits
    probs_2 = F.softmax(logits_2, dim=-1)
    pred_idx_2 = int(torch.argmax(probs_2, dim=-1).item())
    raw_2: str = label_encoder_2.inverse_transform([pred_idx_2])[0]
    if raw_2 != "Depression":
        return raw_2, float(probs_2.max().item())

    # Stage 3 — depression vs suicidal re-scorer
    enc3 = tok_longformer(
        text,
        return_tensors="pt",
        truncation=True,
        padding="max_length",
        max_length=1024,
    )
    enc3 = {k: v.to(DEVICE) for k, v in enc3.items()}
    # Global attention on [CLS]
    global_attn = torch.zeros_like(enc3["attention_mask"])
    global_attn[:, 0] = 1
    enc3["global_attention_mask"] = global_attn

    with torch.no_grad():
        logits_3 = model_3(**enc3).logits
    probs_3 = F.softmax(logits_3, dim=-1)
    raw_3 = "Suicidal" if float(probs_3[0, 1].item()) > 0.5 else "Depression"
    return raw_3, float(probs_3.max().item())


@asynccontextmanager
async def lifespan(_app: FastAPI):
    yield
    model_registry.clear()


app = FastAPI(title="VibeCheck API", version="2.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


class ClassifyRequest(BaseModel):
    text: str
    model: str = "mentalbert"


class ClassifyResponse(BaseModel):
    classification: str
    confidence: float


@app.get("/")
def health():
    loaded = list(model_registry.keys())
    return {"status": "ok", "loaded_models": loaded}


@app.post("/classify", response_model=ClassifyResponse)
async def classify(req: ClassifyRequest):
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=422, detail="text must not be empty")

    state = await get_or_load(req.model)

    if req.model == "mentalbert":
        raw_label, confidence = _run_mentalbert(text, state)
    else:
        raw_label, confidence = _run_longformer(text, state)

    return ClassifyResponse(
        classification=LABEL_MAP.get(raw_label, "normal"),
        confidence=round(confidence, 4),
    )
