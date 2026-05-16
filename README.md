# VibeCheck

Mental health sentiment classifier — paste how you're feeling, get a vibe check. The entire UI transforms to match the detected emotional state.

**Live:** https://checkmyvibe.me

---

## How It Works

1. User types into the text box on the home page.
2. User picks a model — **Quick Vibe** (fast, single forward pass) or **Deep Dive** (5-stage cascade).
3. For Deep Dive, an optional **Sensitive mode** toggle lowers the cascade's crisis-detection thresholds.
4. Frontend POSTs to the FastAPI proxy on HuggingFace Spaces, which runs the model on the Space's CPU.
5. The model returns one of 8 classifications + a confidence score.
6. The UI theme transforms to match (colors, animations, overlays).
7. When suicidal ideation or depression is detected, crisis resources are shown automatically.

### Classifications
`normal` · `anxiety` · `stress` · `depression` · `bipolar` · `personality_disorder` · `suicidal` · `unhinged`

(`unhinged` is the display key for the model label "Directed Aggression" — threats toward others.)

---

## Architecture

```
Browser
   │  fetch(POST /classify, { text, model, sensitive_mode })
   ▼
HuggingFace Space (itsLu/vibecheck-api)
  FastAPI proxy
   │  AutoModel.from_pretrained(...)   <-- Quick Vibe
   │  EndpointHandler(snapshot_dir)    <-- Deep Dive
   ▼
HuggingFace Hub
  itsLu/mentalbert-v6-flat            (8-class flat head)
  itsLu/mentalbert-v6-hierarchical    (5-stage cascade)
```

The backend lives in a separate git repository — the HF Space repo at `huggingface.co/spaces/itsLu/vibecheck-api`. This Next.js frontend ships no Python code and no model weights; it's a thin client over the proxy.

---

## Models

### Quick Vibe — `itsLu/mentalbert-v6-flat`
Fine-tuned MentalBERT (BERT-base with mental health pretraining) on a flat 8-class head — now including Directed Aggression for outward-facing threats. Single forward pass.

### Deep Dive — `itsLu/mentalbert-v6-hierarchical`
A 5-stage cascade with explicit safety prioritization:

| Stage | Purpose |
|---|---|
| 0 | Directed Aggression gate |
| 1A | Suicidal gate (Platt-calibrated) |
| 1B | Normal vs. Distress splitter |
| 2 | 5-class distress classifier (3-seed ensemble) |
| 3 | Longformer Depression vs. Suicidal re-scorer (1,024 token context) |

Two pre-calibrated operating points — **Balanced** (default) and **Sensitive** (lower thresholds for higher crisis recall).

---

## Project Structure

```
VibeCheck/
├── app/
│   ├── page.tsx              # Home — text input, result display, theme transforms
│   ├── about/page.tsx        # About — project overview, models, team
│   └── layout.tsx            # Root layout, navbar, theme wrapper
├── components/
│   ├── ClassifyForm.tsx      # Text input + model selector + sensitivity switch
│   ├── ThemeWrapper.tsx      # Applies CSS variables per active classification
│   ├── AnimatedBackground.tsx
│   ├── CrisisCard.tsx        # Shown for depression/suicidal results
│   ├── BreatheCard.tsx       # Shown for unhinged results
│   ├── HazardOverlay.tsx     # Yellow/black stripes for unhinged
│   └── DebugControls.tsx     # Dev-only state-switcher (NODE_ENV gated)
├── lib/
│   ├── mockApi.ts            # Thin fetch wrapper around the HF Space /classify
│   └── themes.ts             # CSS variable definitions per classification
├── store/
│   └── themeStore.ts         # Zustand global state
└── public/team/              # Team member photos
```

---

## Local Development

### Prerequisites
- Node.js 20+

### Setup

```bash
git clone https://github.com/mohamedasem318/VibeCheck.git
cd VibeCheck
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=https://itsLu-vibecheck-api.hf.space
```

(You can also point at a local copy of the backend by setting it to `http://localhost:7860`. Backend setup lives in the `vibecheck-api` HF Space repo.)

### Run

```bash
npm run dev
```

Open http://localhost:3000.

---

## State Behavior

The Zustand store persists **preferences only** to `localStorage`:

- `isDarkMode` — your light/dark choice
- `selectedModel` — Quick Vibe vs. Deep Dive
- `sensitiveMode` — Balanced vs. Sensitive

In-memory only (resets on full page reload, persists across in-app navigation):

- `inputText` — the textarea content
- `classification` / `confidence` — the last result

So navigating from `/` to `/about` and back keeps your draft + result, but reopening the site starts a fresh session.

---

## Deployment

### Frontend (Vercel)
Auto-deploys on push to `main`. Set `NEXT_PUBLIC_API_URL` to the Space URL under Vercel project → Settings → Environment Variables.

### Backend (HuggingFace Space)
Push to the separate `vibecheck-api` git remote. See that repo's README for env vars (`HF_TOKEN`, `ALLOWED_ORIGINS`, `MAX_INPUT_CHARS`, etc.) and operational details.

---

## Environment Variables

| Variable | Where | Value |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Vercel + `.env.local` | `https://itsLu-vibecheck-api.hf.space` (prod) or `http://localhost:7860` (local backend) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Zustand |
| Backend | FastAPI, PyTorch CPU, HuggingFace Transformers (in the separate `vibecheck-api` repo) |
| Models | Quick Vibe: `itsLu/mentalbert-v6-flat` · Deep Dive: `itsLu/mentalbert-v6-hierarchical` |
| Hosting | Vercel (frontend) + HuggingFace Spaces (backend) |

---

## Team

Fatma Al-Zahraa Emad · Gehad Mohamed · Hebatullah El Gazoly · Hussein Ibrahim · Mohamed Assem

Supervised by **Dr. Lamees Nasser** and **Eng. Mirna Ahmed**
