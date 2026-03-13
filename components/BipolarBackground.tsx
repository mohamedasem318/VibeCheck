"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export function BipolarBackground() {
  const leftControls = useAnimationControls();
  const rightControls = useAnimationControls();

  useEffect(() => {
    let leftDominant = true;

    const cycle = async () => {
      if (leftDominant) {
        leftControls.start({ opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } });
        rightControls.start({ opacity: 0.3, transition: { duration: 1.5, ease: "easeInOut" } });
      } else {
        leftControls.start({ opacity: 0.3, transition: { duration: 1.5, ease: "easeInOut" } });
        rightControls.start({ opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } });
      }
      leftDominant = !leftDominant;
    };

    cycle();
    const interval = setInterval(cycle, 3000);
    return () => clearInterval(interval);
  }, [leftControls, rightControls]);

  return (
    <div className="fixed inset-0 z-0 flex pointer-events-none">
      <motion.div
        animate={leftControls}
        initial={{ opacity: 1 }}
        className="w-1/2 h-full"
        style={{ backgroundColor: "#6B21A8" }}
      />
      <motion.div
        animate={rightControls}
        initial={{ opacity: 0.3 }}
        className="w-1/2 h-full"
        style={{ backgroundColor: "#EA580C" }}
      />
    </div>
  );
}
