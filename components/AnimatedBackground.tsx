"use client";

import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";

// Get base colors based on classification for the mesh gradients
// Themed palettes for specific classifications
const PALETTES: Record<string, string[]> = {
  anxiety: ["#ea580c", "#f97316", "#fb923c"],
  stress: ["#7f1d1d", "#991b1b", "#b91c1c"],
  depression: ["#312e81", "#3730a3", "#4338ca"],
  bipolar: ["#7e22ce", "#c2410c", "#6b21a8"],
  personality_disorder: ["#be185d", "#4338ca", "#047857"],
  suicidal: ["#831843", "#9d174d", "#be185d"],
  // Smooth full-spectrum loop for rainbow state
  rainbow: [
    "#ef4444", // red
    "#f97316", // orange
    "#facc15", // yellow
    "#22c55e", // green
    "#22d3ee", // cyan
    "#3b82f6", // blue
    "#a855f7", // purple
    "#ec4899", // pink
    "#ef4444", // back to red
  ],
};

function getGradientColors(classification: string | null, isDarkMode: boolean) {
  if (!classification) {
    // Base neutral background before any classification result
    return isDarkMode
      ? ["#1a1a2e", "#16213e", "#0f3460"]
      : ["#e2e8f0", "#cbd5e1", "#f8fafc"];
  }

  if (classification === "normal") {
    // Green "normal" result theme
    return isDarkMode
      ? ["#064e3b", "#022c22", "#0f766e"]
      : ["#bbf7d0", "#6ee7b7", "#ecfdf5"];
  }

  return PALETTES[classification] || PALETTES.anxiety;
}


export function AnimatedBackground() {
  const { classification, isDarkMode } = useThemeStore();
  const colors = getGradientColors(classification, isDarkMode);
  const isRainbow = classification === "rainbow";

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--bg-primary)] transition-colors duration-1000">
      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Orb 1: Top Right */}
      <motion.div
        key={`orb-1-${classification ?? "none"}`}
        className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
          backgroundColor: isRainbow ? colors : [colors[0]],
        }}
        transition={{
          duration: isRainbow ? 26 : 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Orb 2: Bottom Left */}
      <motion.div
        key={`orb-2-${classification ?? "none"}`}
        className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[140px] opacity-[0.15]"
        animate={{
          x: [0, 70, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          backgroundColor: isRainbow ? colors.slice(2) : [colors[1]],
        }}
        transition={{
          duration: isRainbow ? 32 : 18,
          repeat: Infinity,
          ease: "linear",
          delay: isRainbow ? 4 : 2,
        }}
      />

      {/* Orb 3: Center Drifter */}
      <motion.div
        key={`orb-3-${classification ?? "none"}`}
        className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-10"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 0.9, 1.1, 1],
          backgroundColor: isRainbow ? colors.slice(4) : [colors[2]],
        }}
        transition={{
          duration: isRainbow ? 38 : 25,
          repeat: Infinity,
          ease: "linear",
          delay: isRainbow ? 8 : 5,
        }}
      />
    </div>
  );
}
