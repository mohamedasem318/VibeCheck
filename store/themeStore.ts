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

interface ThemeState {
  classification: Classification | null;
  confidence: number | null;
  isDarkMode: boolean;
  isLoading: boolean;
  setClassification: (c: Classification | null) => void;
  setConfidence: (v: number | null) => void;
  setLoading: (loading: boolean) => void;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      classification: null,
      confidence: null,
      isDarkMode: true,
      isLoading: false,
      setClassification: (c) => set({ classification: c }),
      setConfidence: (v) => set({ confidence: v }),
      setLoading: (loading) => set({ isLoading: loading }),
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "vibecheck-theme",
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);
