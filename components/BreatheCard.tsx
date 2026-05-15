"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TOTAL_SECONDS = 60;
const INHALE_S = 4;
const EXHALE_S = 6;
const CYCLE_S = INHALE_S + EXHALE_S;
const HAZARD_BAND = 32;

type Phase = "inhale" | "exhale";

function phaseFor(elapsed: number): Phase {
  return elapsed % CYCLE_S < INHALE_S ? "inhale" : "exhale";
}

function formatTime(s: number) {
  const total = Math.ceil(s);
  const mm = Math.floor(total / 60);
  const ss = (total % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

const LAYOUT_TRANSITION = { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };

export function BreatheCard() {
  const prefersReducedMotion = useReducedMotion();
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const startedAtRef = useRef<number | null>(null);
  const baseElapsedRef = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRunning) return;
    startedAtRef.current = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const elapsed =
        baseElapsedRef.current +
        (now - (startedAtRef.current ?? now)) / 1000;
      const next = Math.max(0, TOTAL_SECONDS - elapsed);
      setRemaining(next);
      setPhase(phaseFor(elapsed));
      if (next <= 0) {
        setIsRunning(false);
        setCompleted(true);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [isRunning]);

  const scrollCardIntoView = () => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const overflow = rect.bottom - (window.innerHeight - HAZARD_BAND);
    if (overflow > 0) {
      window.scrollBy({ top: overflow, behavior: "smooth" });
    }
  };

  const start = () => {
    if (completed) return;
    baseElapsedRef.current = TOTAL_SECONDS - remaining;
    setHasStarted(true);
    setIsRunning(true);
    window.setTimeout(scrollCardIntoView, 360);
  };
  const pause = () => {
    baseElapsedRef.current = TOTAL_SECONDS - remaining;
    setIsRunning(false);
  };
  const reset = () => {
    setIsRunning(false);
    setHasStarted(false);
    setCompleted(false);
    setRemaining(TOTAL_SECONDS);
    setPhase("inhale");
    baseElapsedRef.current = 0;
  };

  const circleAnimate = useMemo(() => {
    if (prefersReducedMotion) return { scale: 1 };
    if (!isRunning) return { scale: 1 };
    return phase === "inhale" ? { scale: 1.45 } : { scale: 1 };
  }, [isRunning, phase, prefersReducedMotion]);

  const circleTransition = useMemo(() => {
    if (prefersReducedMotion) return { duration: 0.4 };
    if (!isRunning) return { duration: 0.6, ease: "easeOut" as const };
    if (phase === "inhale")
      return { duration: INHALE_S, ease: "easeInOut" as const };
    return { duration: EXHALE_S, ease: "easeInOut" as const };
  }, [isRunning, phase, prefersReducedMotion]);

  const showBall = hasStarted && !completed;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        layout: LAYOUT_TRANSITION,
        opacity: { duration: 0.5, delay: 0.2 },
        y: { duration: 0.5, delay: 0.2, ease: "easeOut" },
      }}
      className="rounded-2xl p-6 w-full max-w-xl mx-auto backdrop-blur-2xl border shadow-2xl overflow-hidden relative"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--bg-secondary) 40%, transparent)",
        borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
        color: "var(--text-primary)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: "var(--accent)" }}
      />

      <motion.h3
        layout="position"
        transition={LAYOUT_TRANSITION}
        className="text-base font-bold uppercase tracking-widest mb-2"
        style={{ color: "var(--accent)" }}
      >
        Before You Do Something Weird
      </motion.h3>

      <motion.p
        layout="position"
        transition={LAYOUT_TRANSITION}
        className="text-sm md:text-base leading-snug mb-5"
        style={{ color: "var(--text-secondary)" }}
      >
        60 seconds of breath. Then decide if it&apos;s still worth it (probably
        not).
      </motion.p>

      <motion.div
        layout
        transition={LAYOUT_TRANSITION}
        className="flex flex-col items-center gap-3"
      >
        <AnimatePresence initial={false}>
          {showBall && (
            <motion.div
              key="ball"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative flex items-center justify-center"
              style={{ width: 132, height: 132 }}
            >
              <motion.div
                className="rounded-full"
                style={{
                  width: 78,
                  height: 78,
                  backgroundColor:
                    "color-mix(in srgb, var(--accent) 55%, transparent)",
                  boxShadow:
                    "0 0 56px var(--accent), inset 0 0 20px color-mix(in srgb, var(--accent-2) 35%, transparent)",
                  willChange: "transform",
                }}
                animate={circleAnimate}
                transition={circleTransition}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.4 }}
                    className="text-[11px] font-black uppercase tracking-[0.3em]"
                    style={{ color: "var(--accent-2)" }}
                  >
                    {phase}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!completed ? (
          <>
            <motion.div
              layout="position"
              transition={LAYOUT_TRANSITION}
              className="text-4xl font-black tabular-nums leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              {formatTime(remaining)}
            </motion.div>

            <motion.div
              layout="position"
              transition={LAYOUT_TRANSITION}
              className="flex gap-3 mt-1"
            >
              {!isRunning ? (
                <button
                  onClick={start}
                  className="text-sm font-bold uppercase tracking-widest px-6 py-2 rounded-md border transition-all hover:brightness-125"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-2)",
                    borderColor: "var(--accent)",
                  }}
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={pause}
                  className="text-sm font-bold uppercase tracking-widest px-6 py-2 rounded-md border transition-all hover:brightness-125"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--text-primary)",
                    borderColor: "var(--accent)",
                  }}
                >
                  Pause
                </button>
              )}
              {hasStarted && (
                <button
                  onClick={reset}
                  className="text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-md border transition-all hover:brightness-125"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--text-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  Reset
                </button>
              )}
            </motion.div>
          </>
        ) : (
          <motion.div
            layout="position"
            transition={LAYOUT_TRANSITION}
            className="text-center"
          >
            <p
              className="text-base font-semibold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              still spicy? text someone first.
            </p>
            <a
              href="https://www.befrienders.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              befrienders.org
            </a>
            <div className="mt-3">
              <button
                onClick={reset}
                className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-md border transition-all hover:brightness-125"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--text-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                Run it back
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
