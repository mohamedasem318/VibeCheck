"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { ClassifyForm } from "@/components/ClassifyForm";
import { CrisisCard } from "@/components/CrisisCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

const vibeSubtexts: Record<string, string> = {
  normal: "You're doing okay. Keep riding the wave.",
  anxiety: "Your frequency is vibrating a little too high.",
  stress: "Heavy mental load detected. Remember to breathe.",
  depression: "Low energy state detected. Be gentle with yourself.",
  bipolar: "High variance detected. Anchors hold the ship steady.",
  personality_disorder: "Fragmented patterns detected. You are more than the pieces.",
  suicidal: "You are valuable. Help is just a conversation away.",
  rainbow: "damn, that's straight up gay, not that you're straight.",
};

export default function HomePage() {
  const { classification, isLoading, confidence } = useThemeStore();

  const isSuicidal = classification === "suicidal";
  const isPD = classification === "personality_disorder";
  const isDepression = classification === "depression";
  const isAnxiety = classification === "anxiety";
  const isBipolar = classification === "bipolar";
  const isRainbow = classification === "rainbow";

  // When a result is present, the layout shifts up slightly to make room
  const hasResult = classification && !isLoading;

  const headingAnim = isDepression
    ? {
        animate: { y: [0, 6, 0] },
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
      }
    : isAnxiety || isRainbow
    ? {
        animate: { x: [-1, 1, -1, 0.5, -0.5, 0] },
        transition: { duration: 0.9, repeat: Infinity, ease: "linear" as const },
      }
    : { animate: {}, transition: {} };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-16 transition-all duration-1000"
      style={{ position: "relative", zIndex: 30 }}
    >
      {/* Bipolar backdrop tint so text stays readable */}
      {isBipolar && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.45)", zIndex: 0 }}
        />
      )}

      <motion.div
        layout
        className={`relative z-10 w-full max-w-xl flex flex-col items-center gap-8 ${isPD ? "pd-panel" : ""}`}
        animate={{ y: hasResult ? -40 : 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      >
        {/* Massive Result Display vs Loading Skeleton vs Initial Heading */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingSkeleton />
          ) : hasResult ? (
            <motion.div
              layout
              key={classification} // Forces unmount/remount when classification changes, fixing overlap
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-center w-full"
            >
              <h2
                className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
                style={
                  classification === "rainbow"
                    ? {
                        backgroundImage:
                          "linear-gradient(90deg, #f97316, #facc15, #22c55e, #22d3ee, #3b82f6, #a855f7, #ec4899)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        textShadow: "0 0 40px rgba(251, 191, 36, 0.65)",
                        opacity: 1,
                      }
                    : {
                        color: "var(--accent)",
                        textShadow: "0 10px 40px var(--accent)",
                        opacity: 0.9,
                        WebkitTextStroke:
                          "1px color-mix(in srgb, var(--accent) 30%, var(--bg-primary))",
                      }
                }
              >
                {classification === "personality_disorder"
                  ? "P.D."
                  : classification === "rainbow"
                  ? "HAAA GAAAY!"
                  : classification}
              </h2>
              {vibeSubtexts[classification as string] && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="text-lg md:text-xl font-medium mt-4 tracking-wide"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {vibeSubtexts[classification as string]}
                </motion.p>
              )}

              {/* Confidence bar */}
              {confidence !== null && classification !== "rainbow" && (
                <motion.div
                  className="mt-6 w-full max-w-xs mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <div
                    className="flex justify-between text-xs font-semibold mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span>model confidence</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {Math.round(confidence * 100)}%
                    </motion.span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "color-mix(in srgb, var(--accent) 20%, transparent)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${Math.round(confidence * 100)}%` }}
                      transition={{ delay: 0.6, duration: 1.2, type: "spring", bounce: 0.2 }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              key="initial-state"
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, ...headingAnim.animate }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut", ...headingAnim.transition }}
            >
              <motion.h1
                className="text-6xl md:text-7xl font-bold tracking-tight mb-3"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: "var(--font-weight)" as string,
                  letterSpacing: "var(--letter-spacing)" as string,
                }}
                animate={isAnxiety ? { x: [-1, 1.5, -1, 0.5, 0] } : {}}
                transition={
                  isAnxiety
                    ? { duration: 1.1, repeat: Infinity, ease: "linear" }
                    : {}
                }
              >
                VibeCheck
              </motion.h1>

              <motion.p
                className="text-base md:text-lg"
                style={{ color: "var(--text-secondary)" }}
                animate={isDepression ? { y: [0, 4, 0], opacity: [1, 0.6, 1] } : {}}
                transition={
                  isDepression
                    ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    : {}
                }
              >
                tell us how you&apos;re feeling
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.div
          layout
          className="w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <ClassifyForm />
        </motion.div>

        {/* Crisis card */}
        <AnimatePresence mode="popLayout">
          {isSuicidal && (
            <motion.div
              layout
              key="crisis"
              className="w-full"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <CrisisCard />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
