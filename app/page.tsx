"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { ClassifyForm } from "@/components/ClassifyForm";
import { CrisisCard } from "@/components/CrisisCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

const vibeSubtexts: Record<string, string[]> = {
  normal: [
    "The frequency is stable. Baseline vibes detected.",
    "Standard emotional levels. Carry on, main character.",
    "Everything looks steady. Enjoy the clear skies.",
    "The signal is clear. You're handling it well.",
    "Everything is in sync. Stay in this zone.",
  ],
  anxiety: [
    "Brain.exe is running too many background processes.",
    "High-speed thoughts detected. Grounding recommended.",
    "Static detected in the signal. The wires are a bit crossed today.",
    "The nervous system is playing a lot of high-tempo jazz today.",
    "Your frequency is vibrating a little too high. Take a breath.",
  ],
  stress: [
    "Heavy mental load detected. Cooling system needed.",
    "System pressure rising. Time for a manual override.",
    "Too many open tabs in your brain. Let's close some.",
    "The engine is running hot. Pull over for a bit.",
    "High pressure detected. Remember: you are not a machine.",
  ],
  depression: [
    "Low color saturation detected. Your light will return.",
    "Low energy state detected. Be extra gentle with yourself.",
    "The signal is a bit muffled. One small step is enough today.",
    "Rest mode is active. You don't have to be 'on' for anyone.",
    "The vibe is heavy, but you don't have to carry it alone.",
  ],
  bipolar: [
    "High variance detected. Anchors hold the ship steady.",
    "Dual frequency signals. Stability is a journey, not a destination.",
    "Shifting amplitudes recognized. Breathe into the middle ground.",
    "Emotional tides are high. Keep your feet in the sand.",
    "Complex signal patterns. Embrace your full spectrum.",
  ],
  personality_disorder: [
    "Shifting layers detected. Which version are we today?",
    "Broken glass reflects everything. Let's find the focus.",
    "Multifaceted signal detected. The kaleidoscope is turning.",
    "Complexity recognized. You are more than the pieces.",
    "Different frequencies, same soul. We see you.",
  ],
  suicidal: [
    "The signal is fragile. Please reach out, you aren't alone.",
    "A heavy fog is detected, but there is a clear path through it.",
    "Your story isn't over. Let's talk to someone who can help.",
    "The frequency is low, but you are still worth the fight.",
    "Every life has a frequency. Yours is too valuable to lose.",
  ],
  rainbow: [
    "Damn, that's straight up gay, not that you're straight.",
    "The AI just asked for its 15-minute break early because of how fruity this is.",
    "We tried to find a straight line in your input and the model literally crashed.",
    "Error 404: Heterosexuality not found. Gay ahh bih.",
    "The server just rebranded to 'GayCheck' because of this input. Hope you're happy.",
  ],
};

const SUBTITLES = [
  "Trauma dumping made aesthetic.",
  "Your Notes app is tired. Tell us instead.",
  "The premium home for your internal monologue.",
  "Is it a vibe or a cry for help?",
  "Unfiltered. Analyzed. Aesthetic.",
  "No filter, just raw vibes.",
  "Because 'I'm fine' is a boring answer.",
  "Validation is just a click away (mostly).",
  "Your emotional weather report.",
  "A safe haven for your 3AM monologues.",
  "Because sometimes, 'it be like that' isn't enough.",
  "Turning your chaos into a color palette.",
  "The AI knows what's up (and it's not judging).",
  "Your feelings, but make them high-def.",
  "The official home for 'Not Found' vibes.",
];

export default function HomePage() {
  const { classification, isLoading, confidence } = useThemeStore();
  const [subtitle, setSubtitle] = useState(SUBTITLES[0]);
  const [currentResultSubtext, setCurrentResultSubtext] = useState("");

  useEffect(() => {
    setSubtitle(SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)]);
  }, []);

  useEffect(() => {
    if (classification && vibeSubtexts[classification]) {
      const options = vibeSubtexts[classification];
      setCurrentResultSubtext(options[Math.floor(Math.random() * options.length)]);
    }
  }, [classification]);

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

  // Theme-specific background-level animations (previously in ThemeWrapper)
  const anxietyLike = isAnxiety || isRainbow;
  const anxietyVibe = anxietyLike
    ? {
        x: [0, -1, 1, -0.5, 0.5, 0],
        y: [0, 0.5, -0.5, 1, -0.5, 0],
        rotate: [0, -0.15, 0.15, -0.1, 0.1, 0],
      }
    : {};

  const depressionVibe = isDepression ? { y: [0, 5, 0] } : {};

  const vibeTransition = isDepression
    ? { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
    : anxietyLike
    ? { duration: 0.8, repeat: Infinity, ease: "linear" as const }
    : { duration: 0 };

  const isStress = classification === "stress";

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-16 transition-colors duration-300"
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
        className={`relative z-10 w-full max-w-xl flex flex-col items-center gap-8 ${isPD ? "pd-panel" : ""}`}
        animate={{ 
          y: hasResult ? -40 : 0,
          ...anxietyVibe,
          ...depressionVibe
        }}
        transition={{ 
          y: { duration: 0.8, type: "spring", bounce: 0.3 },
          ...vibeTransition
        }}
        style={{ 
          willChange: "transform",
          ...(isStress ? { fontWeight: 800, letterSpacing: "-0.03em" } : {}) 
        }}
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
                className="text-4xl xs:text-6xl md:text-8xl font-black uppercase tracking-tighter"
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
              {currentResultSubtext && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="text-lg md:text-xl font-medium mt-4 tracking-wide"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {currentResultSubtext}
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
                {subtitle}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <ClassifyForm />
        </motion.div>

        {/* Crisis card */}
        <AnimatePresence mode="popLayout">
          {(isSuicidal || isDepression) && (
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
