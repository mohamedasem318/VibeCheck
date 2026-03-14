# VibeCheck

Mental health sentiment classifier — paste how you're feeling, get a vibe check. The entire UI transforms to match the detected emotional state.

**Live:** https://vibecheck-eosin.vercel.app/

---

## How It Works

1. User types how they're feeling into the text box
2. Frontend sends the text to the MentalBERT API on HuggingFace Spaces
3. The model classifies it into one of 7 categories and returns a confidence score
4. The UI theme transforms to match the result (colors, animations, overlays)
5. If suicidal ideation is detected, crisis resources are shown automatically

### Classifications
`normal` · `anxiety` · `stress` · `depression` · `bipolar` · `personality_disorder` · `suicidal`

(+ a rainbow easter egg)

---

## Project Structure

```
VibeCheck/
├── app/                    # Next.js pages
├── components/             # React components
├── lib/
│   ├── mockApi.ts          # API client (calls HF Spaces backend)
│   └── themes.ts           # CSS variable definitions per classification
├── store/
│   └── themeStore.ts       # Zustand global state
└── backend/                # Python FastAPI inference server
    ├── app.py
    ├── requirements.txt
    └── Dockerfile
```

---

## Local Development

### Prerequisites
- Node.js 20+ (recommended for Next.js 15)
- Python 3.10+
- The model files in `saved_models/` (not in git — get from the team)

### 1. Start the backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app:app --port 7860 --reload
```

Verify it's running: http://localhost:7860 should return `{"status":"ok","model_loaded":true}`

### 2. Configure the frontend

Create `.env.local` in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:7860
```

### 3. Start the frontend

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Adding a New Feature

### Add a new classification

The classification list flows through several files — update all of them:

1. **`store/themeStore.ts`** — add the new string to the `Classification` union type
2. **`lib/themes.ts`** — add dark + light theme variables (`ThemeVars`) for the new class
3. **`app/page.tsx`** — add a subtext string in `vibeSubtexts` and any result-display logic
4. **`components/ThemeWrapper.tsx`** — add any special overlay or animation for the new theme
5. **`backend/app.py`** — add the new class to `LABEL_MAP` (maps model output → frontend key)
6. **Model** — you'll need to retrain with the new class in the dataset

### Add a new frontend page

Create `app/your-page/page.tsx`. Next.js App Router picks it up automatically. Add a link in `components/Navbar.tsx` if needed.

### Add a new API endpoint

In `backend/app.py`, add a new route:

```python
@app.post("/your-endpoint")
def your_endpoint(req: YourRequest):
    ...
    return YourResponse(...)
```

Then call it from the frontend in `lib/mockApi.ts`.

### Change the model

1. Train a new model, save the checkpoint as a `.pt` file
2. Replace `saved_models/mentalbert_v3flat_best.pt` and `label_encoder.joblib`
3. If the architecture changes, update `BertConfig(...)` params in `backend/app.py`
4. Push to the HF Space repo (see deployment section below)

### Add a loading message

Open `components/LoadingSkeleton.tsx` and add a string to the `MESSAGES` array.

---

## Deployment

### Frontend (Vercel)

The frontend auto-deploys when you push to GitHub `main`.

To manually redeploy or change env vars:
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. `NEXT_PUBLIC_API_URL` should be set to `https://itsLu-vibecheck-api.hf.space`
3. After changing env vars, go to **Deployments** → redeploy the latest

### Backend (HuggingFace Spaces)

The backend lives in a **separate git repo** — the HF Space repo. It is not the same as the GitHub repo.

**To push backend changes:**

```bash
# One-time setup (already done, but for reference):
git clone https://huggingface.co/spaces/itsLu/vibecheck-api vibecheck-api
cd vibecheck-api

# Copy updated files from the backend/ folder:
cp ../VibeCheck/backend/app.py .
cp ../VibeCheck/backend/requirements.txt .

# Commit and push:
git add app.py requirements.txt
git commit -m "describe your change"
git push
```

After pushing, watch the build logs at https://huggingface.co/spaces/itsLu/vibecheck-api (click **Logs**). The Space restarts automatically.

**To push new model weights:**

Model files are tracked with git-lfs. Make sure lfs is set up:

```bash
git lfs install
git lfs track "*.pt" "*.joblib" "*.safetensors"
git add .gitattributes
```

Then copy the new model files into the Space repo and push normally.

---

## Environment Variables

| Variable               | Where            | Value                                        |
| ---------------------- | ---------------- | -------------------------------------------- |
| `NEXT_PUBLIC_API_URL`  | Vercel + `.env.local` | `https://itsLu-vibecheck-api.hf.space` (prod) or `http://localhost:7860` (dev) |

---

## Tech Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Frontend   | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Zustand |
| Backend    | FastAPI, Python 3.10, PyTorch (CPU), HuggingFace Transformers |
| Model      | MentalBERT (bert-base-uncased fine-tuned), 7-class, ~82% accuracy |
| Hosting    | Vercel (frontend) + HuggingFace Spaces (backend) |

---

## Performance & Optimization

The 2026 audit introduced several key performance improvements:
- **GPU Acceleration**: Keyframe animations (`jitter`, `slow-sink`) and heavy background elements now use `translate3d` and `will-change: transform` to offload work from the CPU to the GPU.
- **Robust Detection**: Enhanced easter egg detection with word boundaries to prevent accidental triggers.

---

## Team

Fatma Al-Zahraa Emad · Gehad Mohamed · Hebatullah El Gazoly · Hussein Ibrahim · Mohamed Assem

Supervised by **Dr. Lamees Nasser** and **Eng. Mirna**
