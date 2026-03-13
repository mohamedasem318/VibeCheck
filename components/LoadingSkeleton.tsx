"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "checking the vibe...",
  "trauma dumping into the void...",
  "consulting the algorithm...",
  "reading between the breakdowns...",
  "decoding your cry for help...",
  "analyzing the damage...",
  "processing your situationship...",
  "asking the model nicely...",
  "untangling the emotional spaghetti...",
  "vibes detected, classifying...",
  "the AI is in its feelings too...",
  "counting your red flags...",
  "running it through therapy...",
  "parsing the chaos...",
  "model is judging you lovingly...",
];

export function LoadingSkeleton() {
  const [msgIndex, setMsgIndex] = useState(() =>
    Math.floor(Math.random() * MESSAGES.length)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      key="loading-skeleton"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="text-center w-full"
    >
      {/* Pulsing placeholder for the big result text */}
      <div className="flex flex-col items-center gap-3 mb-4">
        <motion.div
          className="h-16 md:h-24 rounded-2xl"
          style={{
            width: "55%",
            backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)",
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="h-5 rounded-xl"
          style={{
            width: "70%",
            backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        {/* Confidence bar skeleton */}
        <div className="w-full max-w-xs mx-auto mt-2 space-y-1.5">
          <div className="flex justify-between">
            <motion.div
              className="h-3 rounded"
              style={{
                width: "35%",
                backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.div
              className="h-3 rounded"
              style={{
                width: "15%",
                backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
          </div>
          <motion.div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)" }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "color-mix(in srgb, var(--accent) 40%, transparent)" }}
              animate={{ width: ["20%", "60%", "35%", "75%", "20%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Rotating funny message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.6, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="text-base md:text-lg font-medium tracking-wide"
          style={{ color: "var(--text-secondary)" }}
        >
          {MESSAGES[msgIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
