"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Classification =
  | "normal"
  | "anxiety"
  | "stress"
  | "bipolar"
  | "personality_disorder"
  | "depression"
  | "suicidal"
  | "unhinged"
  | "rainbow";

export type ModelOption = "mentalbert" | "longformer";

interface ThemeState {
  classification: Classification | null;
  confidence: number | null;
  isDarkMode: boolean;
  isLoading: boolean;
  selectedModel: ModelOption;
  sensitiveMode: boolean;
  inputText: string;
  setClassification: (c: Classification | null) => void;
  setConfidence: (v: number | null) => void;
  setLoading: (loading: boolean) => void;
  toggleDarkMode: () => void;
  setSelectedModel: (m: ModelOption) => void;
  setSensitiveMode: (v: boolean) => void;
  setInputText: (t: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      classification: null,
      confidence: null,
      isDarkMode: true,
      isLoading: false,
      selectedModel: "mentalbert",
      sensitiveMode: false,
      inputText: "",
      setClassification: (c) => set({ classification: c }),
      setConfidence: (v) => set({ confidence: v }),
      setLoading: (loading) => set({ isLoading: loading }),
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
      setSelectedModel: (m) => set({ selectedModel: m }),
      setSensitiveMode: (v) => set({ sensitiveMode: v }),
      setInputText: (t) => set({ inputText: t }),
    }),
    {
      name: "vibecheck-theme",
      // Persist user PREFERENCES only. inputText/classification/confidence
      // stay in-memory so SPA navigation (check ↔ about) preserves them
      // but a full reload starts the session fresh.
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        selectedModel: state.selectedModel,
        sensitiveMode: state.sensitiveMode,
      }),
    }
  )
);
