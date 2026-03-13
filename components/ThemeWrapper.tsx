"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { getThemeVars } from "@/lib/themes";
import { BipolarBackground } from "./BipolarBackground";
import { ShatteredGlassOverlay } from "./ShatteredGlassOverlay";
import { AnimatedBackground } from "./AnimatedBackground";
export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { classification, isDarkMode } = useThemeStore();
  const vars = getThemeVars(classification, isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const isAnxiety = classification === "anxiety";
  const isDepression = classification === "depression";
  const isBipolar = classification === "bipolar";
  const isPD = classification === "personality_disorder";
  const isRainbow = classification === "rainbow";
  const isStress = classification === "stress";

  const wrapperStyle: React.CSSProperties = {

    ...(vars as React.CSSProperties),
    backgroundColor: "transparent", // Let the body background or AnimatedBackground handle it
    color: "var(--text-primary)",
    fontWeight: "var(--font-weight)" as string,
    letterSpacing: "var(--letter-spacing)" as string,
    minHeight: "100vh",
    position: "relative",
  };

  const anxietyLike = isAnxiety || isRainbow;

  const anxietyAnim = anxietyLike
    ? {
        x: [0, -1, 1, -0.5, 0.5, 0],
        y: [0, 0.5, -0.5, 1, -0.5, 0],
        rotate: [0, -0.15, 0.15, -0.1, 0.1, 0],
      }
    : { x: 0, y: 0, rotate: 0 };

  const depressionAnim = isDepression
    ? { y: [0, 5, 0] }
    : { y: 0 };

  const transitionBase =
    isDepression
      ? { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
      : anxietyLike
      ? { duration: 0.8, repeat: Infinity, ease: "linear" as const }
      : { duration: 0 };

  return (
    <div
      style={wrapperStyle}
      className="vibecheck-root transition-colors duration-1000"
    >
      <AnimatedBackground />
      {isBipolar && <BipolarBackground />}
      {isPD && <ShatteredGlassOverlay />}

      <motion.div
        animate={{ ...(isAnxiety ? anxietyAnim : {}), ...(isDepression ? depressionAnim : {}) }}
        transition={transitionBase}
        className={`relative z-20 ${isPD ? "pd-misalign" : ""}`}
        style={isStress ? { fontWeight: 800, letterSpacing: "-0.03em" } : {}}
      >
        {children}
      </motion.div>
    </div>
  );
}
