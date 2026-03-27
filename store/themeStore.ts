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
  | "rainbow";

export type ModelOption = "mentalbert" | "longformer";

interface ThemeState {
  classification: Classification | null;
  confidence: number | null;
  isDarkMode: boolean;
  isLoading: boolean;
  selectedModel: ModelOption;
  inputText: string;
  setClassification: (c: Classification | null) => void;
  setConfidence: (v: number | null) => void;
  setLoading: (loading: boolean) => void;
  toggleDarkMode: () => void;
  setSelectedModel: (m: ModelOption) => void;
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
      inputText: "",
      setClassification: (c) => set({ classification: c }),
      setConfidence: (v) => set({ confidence: v }),
      setLoading: (loading) => set({ isLoading: loading }),
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
      setSelectedModel: (m) => set({ selectedModel: m }),
      setInputText: (t) => set({ inputText: t }),
    }),
    {
      name: "vibecheck-theme",
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        inputText: state.inputText,
        classification: state.classification,
        confidence: state.confidence,
        selectedModel: state.selectedModel,
      }),
    }
  )
);
