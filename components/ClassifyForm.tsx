"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore, type Classification } from "@/store/themeStore";
import { classifyText } from "@/lib/mockApi";

const slurPatterns = [
  /\b(im|i'm|i am)\s+gay\b/i,
  /\b(im|i'm|i am)\s+straight\b/i, // Added variation
  /\b(i|im|i'm|i am)\s+suck\s+cock\b/i,
];

function triggerCheck(text: string): boolean {
  const normalized = text.toLowerCase().trim();
  return slurPatterns.some((p) => p.test(normalized));
}

export function ClassifyForm() {
  const [text, setText] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const {
    isLoading,
    classification,
    setClassification,
    setConfidence,
    setLoading,
    isDarkMode,
  } = useThemeStore();

  const isAnxiety = classification === "anxiety";
  const isPD = classification === "personality_disorder";
  const isRainbow = classification === "rainbow";
  const isBaseState = !classification;

  const handleReset = () => {
    setClassification(null);
    setConfidence(null);
    setApiError(null);
    setText("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    if (triggerCheck(text)) {
      setClassification("rainbow");
      setConfidence(null);
      return;
    }

    setApiError(null);
    setClassification(null);
    setConfidence(null);
    setLoading(true);
    try {
      const result = await classifyText(text);
      setClassification(result.classification);
      setConfidence(result.confidence);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const textareaStyle: React.CSSProperties = {
    backgroundColor: "color-mix(in srgb, var(--bg-secondary) 40%, transparent)",
    color: "var(--text-primary)",
    border: "1px solid color-mix(in srgb, var(--border-color) 60%, transparent)",
    caretColor: "var(--accent)",
    transition: `all var(--transition-speed) ease`,
    transform: isPD ? "rotate(-0.4deg) translateX(3px)" : "none",
  };

  const buttonStyle: React.CSSProperties = isRainbow
    ? {
        background:
          "linear-gradient(90deg, #f97316, #facc15, #22c55e, #22d3ee, #3b82f6, #a855f7, #ec4899)",
        color: "#020617",
        transition: `all var(--transition-speed) ease`,
        transform: isPD ? "rotate(0.3deg) translateX(-2px)" : "none",
        boxShadow: "0 0 40px -12px rgba(248, 250, 252, 0.85)",
      }
    : isBaseState
    ? {
        backgroundColor: isDarkMode ? "#f9fafb" : "#111827",
        color: isDarkMode ? "#020617" : "#f9fafb",
        transition: `all var(--transition-speed) ease`,
        transform: isPD ? "rotate(0.3deg) translateX(-2px)" : "none",
        boxShadow: "0 0 40px -12px rgba(15, 23, 42, 0.6)",
      }
    : {
        backgroundColor: "var(--accent)",
        color: "var(--bg-primary)",
        transition: `all var(--transition-speed) ease`,
        transform: isPD ? "rotate(0.3deg) translateX(-2px)" : "none",
        boxShadow: "0 0 40px -10px var(--accent)",
      };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
      <motion.div
        animate={
          isAnxiety
            ? { rotate: [-0.15, 0.15, -0.1, 0.1, 0] }
            : { rotate: 0 }
        }
        transition={
          isAnxiety
            ? { duration: 1.8, repeat: Infinity, ease: "linear" }
            : { duration: 0 }
        }
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-1000"></div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="tell us how you're feeling..."
          rows={5}
          disabled={isLoading}
          style={textareaStyle}
          className="relative w-full rounded-2xl px-6 py-5 text-lg font-medium resize-none outline-none placeholder:opacity-30 focus:ring-1 ring-[var(--accent)] backdrop-blur-xl shadow-2xl transition-all"
        />
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          type="submit"
          disabled={isLoading || !text.trim()}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={buttonStyle}
          className="flex-1 rounded-2xl py-4 font-bold text-lg tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <LoadingDots />
                Analyzing
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Check My Vibe
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Reset Button */}
        <AnimatePresence>
          {!isBaseState && !isLoading && (
            <motion.button
              type="button"
              onClick={handleReset}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl font-bold border transition-colors"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-secondary)"
              }}
            >
              Reset
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* API Error */}
      <AnimatePresence>
        {apiError && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm text-center"
            style={{ color: "var(--accent)", opacity: 0.8 }}
          >
            {apiError}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}


function LoadingDots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}
