# VibeCheck — Project Blueprint

> **Mental health sentiment classifier for students** — an NLP-powered web app that dynamically reshapes its entire UI based on detected emotional states.

---

## Project Overview

VibeCheck takes user-submitted text, classifies it into a mental health category (e.g. anxiety, depression, bipolar, stress, suicidal ideation, personality disorder), and applies a **full-spectrum visual theme transformation** to the interface. Each classification has a unique dark/light palette, animation style, and overlay effect, creating an immersive experience that reflects the detected emotional state.

When suicidal ideation is detected, the app displays crisis support resources and helpline numbers.

---

## Architecture

```
VibeCheck/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout: Google Font (Space Grotesk), ThemeWrapper, Navbar
│   ├── page.tsx                 # Home page: result display, confidence bar, form, crisis card
│   ├── globals.css              # CSS variables, keyframe animations, theme transitions
│   └── about/
│       └── page.tsx             # About page: team, supervisors, disclaimer
│
├── components/
│   ├── ClassifyForm.tsx         # Textarea + submit/reset buttons, easter egg detection
│   ├── LoadingSkeleton.tsx      # Animated loading placeholder with rotating funny messages
│   ├── ThemeWrapper.tsx         # Applies CSS variables + overlays per classification
│   ├── Navbar.tsx               # Fixed top nav with dark mode toggle
│   ├── CrisisCard.tsx           # Crisis intervention card (helplines, support links)
│   ├── BipolarBackground.tsx    # Split-screen animated purple/orange background
│   └── ShatteredGlassOverlay.tsx  # SVG cracked-glass overlay for personality disorder
│
├── lib/
│   ├── mockApi.ts               # Real API client — fetches from NEXT_PUBLIC_API_URL
│   └── themes.ts                # Theme variable definitions for all classifications × dark/light
│
├── store/
│   └── themeStore.ts            # Zustand store: classification, confidence, dark mode, loading
│
├── backend/                     # Python FastAPI inference server (deployed to HF Spaces)
│   ├── app.py                   # FastAPI app with /classify endpoint
│   ├── requirements.txt         # Python dependencies (CPU torch, transformers, etc.)
│   ├── Dockerfile               # Docker image for HuggingFace Spaces
│   └── README.md                # HF Spaces YAML config header
│
├── saved_models/                # Model weights (NOT committed to GitHub — git-ignored)
│   ├── mentalbert_v3flat_best.pt          # Fine-tuned weights checkpoint
│   └── mentalbert_v3flat/
│       ├── config.json                    # Training metadata (not HF format)
│       ├── label_encoder.joblib           # sklearn LabelEncoder for class decoding
│       ├── model.safetensors              # (unused by backend — .pt is used instead)
│       └── tokenizer/
│           ├── tokenizer.json
│           └── tokenizer_config.json
│
├── .env.local                   # NOT committed — contains NEXT_PUBLIC_API_URL
├── .gitignore                   # Ignores node_modules, .next, saved_models, .env*
├── tailwind.config.ts           # Tailwind with CSS variable-based custom colors
├── tsconfig.json                # TypeScript strict mode, bundler module resolution
├── next.config.js               # Next.js config
├── postcss.config.js            # PostCSS with Tailwind + Autoprefixer
└── package.json                 # Dependencies and scripts
```

---

## Tech Stack

### Frontend
| Category    | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | **Next.js 15** (App Router)         |
| Language    | **TypeScript** (strict)             |
| Styling     | **Tailwind CSS 3** + CSS Variables  |
| Animations  | **Framer Motion 11**                |
| State       | **Zustand 4** (persisted dark mode) |
| Font        | **Space Grotesk** (Google Fonts)    |

### Backend
| Category    | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | **FastAPI** + **Uvicorn**           |
| Language    | **Python 3.10**                     |
| ML          | **PyTorch** (CPU) + **Transformers**|
| Model       | **MentalBERT** (bert-base-uncased architecture, fine-tuned on mental health dataset) |
| Deployment  | **HuggingFace Spaces** (Docker SDK) |

---

## Classification Themes

| Classification       | Visual Effect                                                          |
| -------------------- | ---------------------------------------------------------------------- |
| **Normal**           | Clean dark/light neutral palette                                       |
| **Anxiety**          | Orange tones, jittering/shaking animations on text and form            |
| **Stress**           | Dark red tones, extra bold (800) font weight, tight letter spacing     |
| **Depression**       | Muted purple-gray, slow sinking animations, light font weight (300)   |
| **Bipolar**          | Split-screen purple/orange background, alternating opacity panels      |
| **Personality Disorder** | Shifting color palettes, shattered glass SVG overlay, misaligned panels |
| **Suicidal**         | Muted rose tones, crisis card with helpline resources appears          |

---

## Data Flow

```
User types text
      ↓
ClassifyForm.tsx
      ↓
   classification directly
      ↓ (no match)
lib/mockApi.ts → POST /classify to HF Spaces FastAPI
      ↓
FastAPI (app.py):
  - Tokenize with MentalBERT tokenizer
  - Run BertForSequenceClassification
  - softmax(logits) → confidence + predicted class
  - LabelEncoder.inverse_transform → class name
  - Return { classification, confidence }
      ↓
store/themeStore.ts (Zustand)
  - setClassification()
  - setConfidence()
      ↓
ThemeWrapper.tsx → applies CSS variables from lib/themes.ts
      ↓
app/page.tsx → renders result, confidence bar, crisis card
```

---

## Core Files & Responsibilities

### State — `store/themeStore.ts`
- Zustand store with `persist` middleware (persists only `isDarkMode` to localStorage)
- Exports `Classification` union type — canonical source for all classification strings
- Tracks: `classification`, `confidence`, `isDarkMode`, `isLoading`

### Theme Engine — `lib/themes.ts`
- Maps each classification to dark & light `ThemeVars` (CSS custom properties)
- `getThemeVars(classification, isDarkMode)` returns the active variable set

### API Client — `lib/mockApi.ts`
- Reads `NEXT_PUBLIC_API_URL` from environment (throws clear error if missing)
- POST to `/classify` with 10s AbortController timeout
- Validates response shape before returning

### Theme Application — `components/ThemeWrapper.tsx`
- Applies CSS variables as inline styles to the root wrapper
- Conditionally renders overlays: `BipolarBackground`, `ShatteredGlassOverlay`, `RainbowOverlay`
- Manages `PersonalityDisorderEffect` with cycling color palettes

### Form — `components/ClassifyForm.tsx`
- Clears previous classification + confidence before each new submission (prevents stale state)
- Easter egg detection via regex patterns with word boundaries (`\b`) to ensure precision
- Per-theme micro-animations on textarea and button

### Loading — `components/LoadingSkeleton.tsx`
- Pulsing placeholder blocks matching the result/subtext/confidence bar layout
- 15 rotating funny messages cycling every 2.2s

### Backend — `backend/app.py`
- FastAPI with `lifespan` context manager — model loaded once at startup, never per-request
- Builds `BertForSequenceClassification` from `BertConfig` (no internet required at runtime)
- Loads fine-tuned weights from `mentalbert_v3flat_best.pt` via `load_state_dict`
- Returns `{ classification: str, confidence: float }` (confidence rounded to 4 decimals)

---

## CSS & Animation Strategy

- **CSS Variables** on `:root` as bridge between Tailwind and dynamic JS themes
- **Tailwind** for layout utilities; CSS variables for colors
- **Keyframes** in `globals.css`: `jitter`, `slow-sink`, `strobe`, `pd-color-shift` (all GPU optimized with `translate3d`)
- **Framer Motion** for component-level animations with `will-change: transform` hints on high-impact layers.
- **Transition speed** varies by theme (`1.2s` for depression)

---

## Deployment

### Frontend → Vercel
- Auto-deploys from GitHub `main` branch
- Requires env var: `NEXT_PUBLIC_API_URL=https://itsLu-vibecheck-api.hf.space`
- Live at: https://vibecheck-eosin.vercel.app/

### Backend → HuggingFace Spaces
- Space: https://huggingface.co/spaces/itsLu/vibecheck-api
- SDK: Docker, port 7860
- Model weights are in the Space repo tracked via **git-lfs** (`.pt`, `.joblib`)
- Space is separate from the GitHub repo — has its own git remote

---

## Scripts

### Frontend
| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start Next.js dev server (port 3000) |
| `npm run build` | Create production build            |
| `npm run start` | Serve production build             |
| `npm run lint`  | Run ESLint                         |

### Backend (local)
| Command                                       | Description                  |
| --------------------------------------------- | ---------------------------- |
| `pip install -r requirements.txt`             | Install Python dependencies  |
| `python -m uvicorn app:app --port 7860 --reload` | Start backend dev server  |

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
