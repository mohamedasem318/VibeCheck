"use client";

import { useThemeStore, type Classification } from "@/store/themeStore";
import { motion } from "framer-motion";

const classifications: Classification[] = [
  "normal",
  "anxiety",
  "stress",
  "depression",
  "bipolar",
  "personality_disorder",
  "suicidal",
  "rainbow",
];

export function DebugControls() {
  const { classification, setClassification, setLoading } = useThemeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 p-4 rounded-xl backdrop-blur-md border"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg-secondary) 80%, transparent)",
        borderColor: "var(--border-color)",
      }}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
        Debug States
      </p>
      <div className="flex flex-wrap gap-2 max-w-[280px]">
        {classifications.map((c) => (
          <button
            key={c}
            onClick={() => {
              setLoading(true);
              setClassification(c);
              setTimeout(() => setLoading(false), 300); // Simulate network delay
            }}
            className="text-[10px] px-2 py-1 rounded-md border transition-all"
            style={{
              backgroundColor:
                classification === c
                  ? "var(--accent)"
                  : "var(--bg-primary)",
              color:
                classification === c
                  ? "var(--bg-primary)"
                  : "var(--text-secondary)",
              borderColor:
                classification === c
                  ? "var(--accent)"
                  : "var(--border-color)",
            }}
          >
            {c.replace("_", " ")}
          </button>
        ))}
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 800);
          }}
          className="text-[10px] px-2 py-1 rounded-md border transition-all mt-2 w-full text-center hover:brightness-125"
          style={{
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            borderColor: "var(--border-color)"
          }}
        >
          Trigger Loading State
        </button>
      </div>
    </motion.div>
  );
}
