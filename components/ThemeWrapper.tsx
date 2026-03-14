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
    backgroundColor: "transparent",
    color: "var(--text-primary)",
    fontWeight: "var(--font-weight)" as string,
    letterSpacing: "var(--letter-spacing)" as string,
    minHeight: "100vh",
    position: "relative",
  };

  return (
    <div
      style={wrapperStyle}
      className={`vibecheck-root transition-colors duration-300 ${isPD ? "pd-misalign" : ""}`}
    >
      <AnimatedBackground />
      {isBipolar && <BipolarBackground />}
      {isPD && <ShatteredGlassOverlay />}

      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
