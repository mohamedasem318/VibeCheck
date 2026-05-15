"use client";

import { motion, useReducedMotion } from "framer-motion";

const STRIPE_BG =
  "repeating-linear-gradient(45deg, #FACC15 0 12px, #000000 12px 24px)";

export function HazardOverlay() {
  const prefersReducedMotion = useReducedMotion();

  const animate = prefersReducedMotion
    ? {}
    : { backgroundPositionX: ["0px", "24px"] };

  const transition = prefersReducedMotion
    ? undefined
    : { duration: 1.2, repeat: Infinity, ease: "linear" as const };

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 15 }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "18px",
          backgroundImage: STRIPE_BG,
          opacity: 0.55,
          willChange: "background-position",
        }}
        animate={animate}
        transition={transition}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "18px",
          backgroundImage: STRIPE_BG,
          opacity: 0.55,
          willChange: "background-position",
        }}
        animate={animate}
        transition={transition}
      />
    </div>
  );
}
