import type { Classification } from "@/store/themeStore";

export interface ThemeVars {
  "--bg-primary": string;
  "--bg-secondary": string;
  "--text-primary": string;
  "--text-secondary": string;
  "--accent": string;
  "--accent-2": string;
  "--border-color": string;
  "--transition-speed": string;
  "--font-weight": string;
  "--letter-spacing": string;
}

type ThemeSet = { dark: ThemeVars; light: ThemeVars };
type ThemeMap = Record<string, ThemeSet>;

const themes: ThemeMap = {
  // Base theme used before any classification result is shown
  base: {
    dark: {
      "--bg-primary": "#0a0a0a",
      "--bg-secondary": "#111111",
      "--text-primary": "#ffffff",
      "--text-secondary": "#a0a0a0",
      "--accent": "#e5e5e5",
      "--accent-2": "#9ca3af",
      "--border-color": "#222222",
      "--transition-speed": "0.6s",
      "--font-weight": "400",
      "--letter-spacing": "0em",
    },
    light: {
      "--bg-primary": "#f5f5f5",
      "--bg-secondary": "#ebebeb",
      "--text-primary": "#000000",
      "--text-secondary": "#555555",
      "--accent": "#111827",
      "--accent-2": "#4b5563",
      "--border-color": "#dddddd",
      "--transition-speed": "0.6s",
      "--font-weight": "400",
      "--letter-spacing": "0em",
    },
  },
  // "normal" classification result – distinct green theme
  normal: {
    dark: {
      "--bg-primary": "#022c22",
      "--bg-secondary": "#064e3b",
      "--text-primary": "#ecfdf5",
      "--text-secondary": "#6ee7b7",
      "--accent": "#22c55e",
      "--accent-2": "#a7f3d0",
      "--border-color": "#0f766e",
      "--transition-speed": "0.6s",
      "--font-weight": "400",
      "--letter-spacing": "0em",
    },
    light: {
      "--bg-primary": "#ecfdf5",
      "--bg-secondary": "#d1fae5",
      "--text-primary": "#022c22",
      "--text-secondary": "#059669",
      "--accent": "#16a34a",
      "--accent-2": "#22c55e",
      "--border-color": "#34d399",
      "--transition-speed": "0.6s",
      "--font-weight": "400",
      "--letter-spacing": "0em",
    },
  },
  anxiety: {
    dark: {
      "--bg-primary": "#1c0e00",
      "--bg-secondary": "#2a1600",
      "--text-primary": "#FF9B50",
      "--text-secondary": "#c97030",
      "--accent": "#FF6B35",
      "--accent-2": "#FF9B50",
      "--border-color": "#5a2e00",
      "--transition-speed": "0.3s",
      "--font-weight": "400",
      "--letter-spacing": "0.02em",
    },
    light: {
      "--bg-primary": "#2d1a00",
      "--bg-secondary": "#3d2400",
      "--text-primary": "#FFB570",
      "--text-secondary": "#e07830",
      "--accent": "#FF8050",
      "--accent-2": "#FFB570",
      "--border-color": "#7a3e00",
      "--transition-speed": "0.3s",
      "--font-weight": "400",
      "--letter-spacing": "0.02em",
    },
  },
  stress: {
    dark: {
      "--bg-primary": "#120004",
      "--bg-secondary": "#2A0208",
      "--text-primary": "#FFE5E8",
      "--text-secondary": "#FFB0B8",
      "--accent": "#FF0000",
      "--accent-2": "#FF3232",
      "--border-color": "#7A0010",
      "--transition-speed": "0.6s",
      "--font-weight": "800",
      "--letter-spacing": "-0.03em",
    },
    light: {
      "--bg-primary": "#2A0208",
      "--bg-secondary": "#3A030C",
      "--text-primary": "#FFECEE",
      "--text-secondary": "#FFC4CC",
      "--accent": "#FF1111",
      "--accent-2": "#FF4444",
      "--border-color": "#8C0014",
      "--transition-speed": "0.6s",
      "--font-weight": "800",
      "--letter-spacing": "-0.03em",
    },
  },
  bipolar: {
    dark: {
      "--bg-primary": "#070316",
      "--bg-secondary": "#18082F",
      "--text-primary": "#F3E8FF",
      "--text-secondary": "#D4B3FF",
      "--accent": "#A855F7",
      "--accent-2": "#FF8A3D",
      "--border-color": "#5B21A5",
      "--transition-speed": "0.6s",
      "--font-weight": "400",
      "--letter-spacing": "0em",
    },
    light: {
      "--bg-primary": "#1B0A36",
      "--bg-secondary": "#2A114A",
      "--text-primary": "#F8ECFF",
      "--text-secondary": "#E0C6FF",
      "--accent": "#C084FC",
      "--accent-2": "#FF9F54",
      "--border-color": "#7C3AED",
      "--transition-speed": "0.6s",
      "--font-weight": "400",
      "--letter-spacing": "0em",
    },
  },
  personality_disorder: {
    dark: {
      "--bg-primary": "#0a0a0a",
      "--bg-secondary": "#111111",
      "--text-primary": "#ffffff",
      "--text-secondary": "#a0a0a0",
      "--accent": "#ffffff",
      "--accent-2": "#888888",
      "--border-color": "#222222",
      "--transition-speed": "0.6s",
      "--font-weight": "400",
      "--letter-spacing": "0em",
    },
    light: {
      "--bg-primary": "#f5f5f5",
      "--bg-secondary": "#ebebeb",
      "--text-primary": "#000000",
      "--text-secondary": "#555555",
      "--accent": "#000000",
      "--accent-2": "#777777",
      "--border-color": "#dddddd",
      "--transition-speed": "0.6s",
      "--font-weight": "400",
      "--letter-spacing": "0em",
    },
  },
  depression: {
    dark: {
      "--bg-primary": "#050711",
      "--bg-secondary": "#101322",
      "--text-primary": "#C3D0FF",
      "--text-secondary": "#8C9AD9",
      "--accent": "#6366F1",
      "--accent-2": "#A855F7",
      "--border-color": "#312E81",
      "--transition-speed": "1.2s",
      "--font-weight": "300",
      "--letter-spacing": "0.01em",
    },
    light: {
      "--bg-primary": "#111827",
      "--bg-secondary": "#1F2937",
      "--text-primary": "#D5E0FF",
      "--text-secondary": "#A5B4FC",
      "--accent": "#818CF8",
      "--accent-2": "#C4B5FD",
      "--border-color": "#3730A3",
      "--transition-speed": "1.2s",
      "--font-weight": "300",
      "--letter-spacing": "0.01em",
    },
  },
  suicidal: {
    dark: {
      "--bg-primary": "#170813",
      "--bg-secondary": "#271025",
      "--text-primary": "#F4B8D2",
      "--text-secondary": "#E58BB5",
      "--accent": "#F97393",
      "--accent-2": "#FDA4AF",
      "--border-color": "#9D174D",
      "--transition-speed": "1s",
      "--font-weight": "400",
      "--letter-spacing": "0.01em",
    },
    light: {
      "--bg-primary": "#271025",
      "--bg-secondary": "#3B162F",
      "--text-primary": "#F9C6DD",
      "--text-secondary": "#F2A2C6",
      "--accent": "#FB7185",
      "--accent-2": "#FDA4AF",
      "--border-color": "#BE185D",
      "--transition-speed": "1s",
      "--font-weight": "400",
      "--letter-spacing": "0.01em",
    },
  },
  rainbow: {
    dark: {
      "--bg-primary": "#111827",
      "--bg-secondary": "#020617",
      "--text-primary": "#ffffff",
      "--text-secondary": "#ffffff",
      "--accent": "#f97316",
      "--accent-2": "#22c55e",
      "--border-color": "#38bdf8",
      "--transition-speed": "0.4s",
      "--font-weight": "800",
      "--letter-spacing": "0em",
    },
    light: {
      "--bg-primary": "#f9fafb",
      "--bg-secondary": "#e0f2fe",
      "--text-primary": "#020617",
      "--text-secondary": "#1e293b",
      "--accent": "#f97316",
      "--accent-2": "#22c55e",
      "--border-color": "#38bdf8",
      "--transition-speed": "0.4s",
      "--font-weight": "800",
      "--letter-spacing": "0em",
    },
  },
};

export function getThemeVars(
  classification: Classification | null,
  isDarkMode: boolean
): ThemeVars {
  const key = classification ?? "base";
  const themeSet = themes[key] ?? themes["base"];
  return isDarkMode ? themeSet.dark : themeSet.light;
}
