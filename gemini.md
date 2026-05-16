# VibeCheck — Project Blueprint

> **Mental health sentiment classifier for students** — an NLP-powered web app that dynamically reshapes its entire UI based on detected emotional states.

---

## Project Overview

VibeCheck takes user-submitted text, classifies it into one of 8 mental-health categories (anxiety, bipolar, depression, directed aggression, normal, personality disorder, stress, suicidal), and applies a **full-spectrum visual theme transformation** to the interface. Each classification has a unique dark/light palette, animation style, and overlay effect.

When suicidal ideation or depression is detected, the app displays crisis support resources.

---

## Architecture

```
VibeCheck/                          # Next.js frontend (this repo)
├── app/
│   ├── layout.tsx                  # Root layout: font, ThemeWrapper, Navbar
│   ├── page.tsx                    # Home: result display, confidence bar, form, crisis card
│   ├── globals.css                 # CSS variables, keyframe animations
│   └── about/page.tsx              # About: project overview, models, team, supervisors
│
├── components/
│   ├── ClassifyForm.tsx            # Textarea + model selector + sensitivity switch + submit
│   ├── LoadingSkeleton.tsx         # Loading placeholder with rotating funny messages
│   ├── ThemeWrapper.tsx            # Applies CSS variables + overlays per classification
│   ├── AnimatedBackground.tsx      # Mesh-gradient atmosphere
│   ├── Navbar.tsx                  # Top nav + dark-mode toggle
│   ├── CrisisCard.tsx              # Helpline card (depression / suicidal)
│   ├── BreatheCard.tsx             # De-escalation card (unhinged / directed aggression)
│   ├── HazardOverlay.tsx           # Yellow/black hazard stripes for unhinged
│   ├── BipolarBackground.tsx       # Split-screen alternating bg for bipolar
│   ├── ShatteredGlassOverlay.tsx   # SVG cracked-glass overlay for personality disorder
│   └── DebugControls.tsx           # NODE_ENV==="development" classification shortcuts
│
├── lib/
│   ├── mockApi.ts                  # POST /classify to the HF Space, returns { classification, confidence }
│   └── themes.ts                   # CSS variable bundles per classification × dark/light
│
├── store/
│   └── themeStore.ts               # Zustand: classification, confidence, inputText, isDarkMode, selectedModel, sensitiveMode
│
├── public/team/                    # Team member JPGs (256×256, first-name lowercase)
├── .env.local                      # NEXT_PUBLIC_API_URL — not committed
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

Backend lives in a **separate repo** (`huggingface.co/spaces/itsLu/vibecheck-api`) — a thin FastAPI proxy that lazily loads two HF model repos and runs inference on the Space's CPU. This frontend ships no Python and no model weights.

---

## Tech Stack

### Frontend
| Category    | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 15 (App Router)             |
| Language    | TypeScript (strict)                 |
| Styling     | Tailwind CSS 3 + CSS Variables      |
| Animations  | Framer Motion 11                    |
| State       | Zustand 4 (persist middleware)      |
| Font        | Space Grotesk                       |

### Backend (in `vibecheck-api` repo)
| Category    | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | FastAPI + Uvicorn                   |
| Language    | Python 3.10                         |
| ML          | PyTorch CPU + HuggingFace Transformers |
| Deployment  | HuggingFace Spaces (Docker SDK)     |

---

## Models

| Tier | HF repo | Type |
|---|---|---|
| Quick Vibe | `itsLu/mentalbert-v6-flat` | Flat 8-class BertForSequenceClassification |
| Deep Dive | `itsLu/mentalbert-v6-hierarchical` | 5-stage cascade with custom `handler.py` |

Deep Dive has two pre-calibrated operating points — **Balanced** (default) and **Sensitive**. Sensitive lowers Stage 0 / Stage 1A thresholds for higher crisis recall at the cost of some false positives.

---

## Classification Themes

| Classification        | Visual Effect                                                          |
| --------------------- | ---------------------------------------------------------------------- |
| Normal                | Clean neutral palette, green accent                                    |
| Anxiety               | Orange tones, jittering/shaking animations                             |
| Stress                | Deep red, extra-bold (800) weight, tight letter spacing                |
| Depression            | Indigo, slow sinking animations, light font weight                     |
| Bipolar               | Split-screen purple/orange background, alternating opacity panels      |
| Personality Disorder  | Shifting palettes, shattered-glass SVG overlay, misaligned panels      |
| Suicidal              | Muted rose, CrisisCard with helpline resources                         |
| Unhinged (Directed Aggression) | Yellow/black hazard stripes, BreatheCard de-escalation prompt |

---

## Data Flow

```
User types text
      ↓
ClassifyForm.tsx (selected model + sensitive mode from store)
      ↓
lib/mockApi.ts → POST /classify to HF Space
      ↓
HF Space proxy (FastAPI):
  - Regex pre-filter: explicit threat → unhinged @ 0.99 (skip model)
  - Quick Vibe: AutoModel.from_pretrained → softmax → argmax → label
  - Deep Dive: EndpointHandler({inputs, mode}) → label + stage_probs
  - Sensitive mode: post-hoc t0 override on stage 0
  - Return { classification, confidence }
      ↓
store/themeStore.ts (Zustand)
      ↓
ThemeWrapper.tsx + lib/themes.ts → CSS variables applied
      ↓
app/page.tsx → renders headline, subtext, confidence bar, support card
```

---

## State Persistence

Zustand `persist` middleware writes to `localStorage`. Only **preferences** persist:

- `isDarkMode`, `selectedModel`, `sensitiveMode`

These reset on **full page reload** (in-memory only, but preserved across SPA navigation):

- `inputText`, `classification`, `confidence`

So check → about → back retains your draft and last result, but reopening the tab starts fresh.

---

## Core Files & Responsibilities

### State — `store/themeStore.ts`
- `Classification` union: 9 string literals (8 classes + `rainbow` easter egg)
- `ModelOption` union: `"mentalbert" | "longformer"`
- Persist `partialize` only includes preference fields

### API Client — `lib/mockApi.ts`
- Reads `NEXT_PUBLIC_API_URL` (throws clear error if missing)
- POST `/classify` with body `{ text, model, sensitive_mode? }`
- `sensitive_mode` only sent when `model === "longformer"`
- 30s / 120s timeouts (Quick Vibe / Deep Dive)

### Theme Engine — `lib/themes.ts`
- Maps each classification to dark + light `ThemeVars`
- Exposes `getThemeVars(classification, isDarkMode)`

### Theme Application — `components/ThemeWrapper.tsx`
- Applies CSS variables to the root wrapper
- Conditionally renders overlays (Bipolar, ShatteredGlass, Hazard)

### Form — `components/ClassifyForm.tsx`
- Model pills (Quick Vibe / Deep Dive)
- Sensitivity switch (iOS-style toggle, visible only when Deep Dive is selected)
- Resets `sensitiveMode` to false when switching to Quick Vibe

### Result — `app/page.tsx`
- Renders headline (huge text in active theme color), subtext, confidence bar
- "Sensitive mode" badge below the confidence bar when applicable
- CrisisCard for depression/suicidal, BreatheCard for unhinged

---

## CSS & Animation Strategy

- CSS variables on `:root` bridge Tailwind and dynamic JS themes
- Tailwind for layout, CSS variables for colors
- Keyframes in `globals.css`: `jitter`, `slow-sink`, `strobe`, `pd-color-shift` — all GPU-optimized with `translate3d`
- Framer Motion for component-level animations with `will-change: transform` on heavy layers
- `--transition-speed` varies per theme (depression slowest at ~1.2s)

---

## Deployment

### Frontend → Vercel
- Auto-deploys from GitHub `main`
- Env: `NEXT_PUBLIC_API_URL=https://itsLu-vibecheck-api.hf.space`
- Live: https://checkmyvibe.me

### Backend → HuggingFace Space
- Space: https://huggingface.co/spaces/itsLu/vibecheck-api
- SDK: Docker, port 7860
- Separate git remote from this repo. Push from the local `vibecheck-api/` checkout.

---

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Next.js dev server (port 3000)       |
| `npm run build` | Production build                     |
| `npm run start` | Serve production build               |
| `npm run lint`  | ESLint                               |

---

## Team

| Member                   | Role     |
| ------------------------ | -------- |
| Fatma Al-Zahraa Emad     | Student  |
| Gehad Mohamed            | Student  |
| Hebatullah El Gazoly     | Student  |
| Hussein Ibrahim          | Student  |
| Mohamed Assem            | Student  |

### Supervision
- **Dr. Lamees Nasser** — Assistant Professor
- **Eng. Mirna Ahmed** — Teaching Assistant
