---
title: VibeCheck MentalBERT API
emoji: 🧠
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# VibeCheck MentalBERT API

FastAPI backend serving a fine-tuned MentalBERT model for mental health text classification.

## Endpoint

**POST** `/classify`

Request body:
```json
{ "text": "I have been feeling really overwhelmed lately" }
```

Response:
```json
{ "classification": "stress", "confidence": 0.8731 }
```

## Classes
`anxiety` · `bipolar` · `depression` · `normal` · `personality_disorder` · `stress` · `suicidal`

## Health check
**GET** `/` → `{ "status": "ok", "model_loaded": true }`

## Deployment note
When pushing to this Space, use git-lfs for model files:
```bash
git lfs track "*.safetensors" "*.pt" "*.joblib"
```
