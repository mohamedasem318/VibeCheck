"use client";

import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";

const TEAM = [
  {
    initials: "FE",
    name: "Fatma Al-Zahraa Emad",
    image: "/team/fatma.jpg",
    linkedin: "https://www.linkedin.com/in/fatma-al-zahraa-emad-326b64234",
  },
  {
    initials: "GM",
    name: "Gehad Mohamed",
    image: "/team/gehad.jpg",
    linkedin: "https://www.linkedin.com/in/gehad-mohamed-2a4946252/",
  },
  {
    initials: "HG",
    name: "Hebatullah El Gazoly",
    image: "/team/hebatullah.jpg",
    linkedin: "https://www.linkedin.com/in/hebatullah-elgazoly-308ab2243/",
  },
  {
    initials: "HI",
    name: "Hussein Ibrahim",
    image: "/team/hussein.jpg",
    linkedin: "https://www.linkedin.com/in/hussien-ebrahim-5752ab274",
  },
  {
    initials: "MA",
    name: "Mohamed Assem",
    image: "/team/mohamed.jpg",
    linkedin: "https://www.linkedin.com/in/mohamedasem318/",
  },
];

const SUPERVISORS = [
  { name: "Dr. Lamees Nasser", role: "Assistant Professor" },
  { name: "Eng. Mirna Ahmed", role: "Teaching Assistant" },
];

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function AboutPage() {
  const { classification } = useThemeStore();
  const isPD = classification === "personality_disorder";

  return (
    <div className="min-h-[calc(100vh-4rem)] px-6 md:px-12 py-20 max-w-6xl mx-auto">

      {/* ── Section 1: Project Overview ────────────────────────── */}
      <motion.section
        className={`mb-24 ${isPD ? "pd-panel" : ""}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2
          className="text-sm font-bold uppercase tracking-[0.25em] mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          About The Project
        </h2>

        <div className="max-w-4xl space-y-6">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
            style={{ color: "var(--text-primary)" }}
          >
            Feelings, but make them legible.
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            VibeCheck is a mental health text classifier built for students. Paste how you&apos;re
            feeling and the model identifies your emotional state across 8 categories — from
            everyday stress to clinical signals like suicidal ideation and directed aggression.
            The interface transforms its entire visual identity to match the result, so the
            experience feels as human as the problem it addresses.
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Most sentiment classifiers reduce text to positive, negative, or neutral. That&apos;s
            not how feelings work. VibeCheck identifies the specific shape of distress — anxiety,
            depression, stress, bipolar mood cycling, personality-related volatility, suicidal
            ideation, or outward aggression — and lets the UI mirror it. Color, motion, typography,
            and the resources we surface all change with the result.
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Under the hood there are two models. <span style={{ color: "var(--text-primary)" }}>Quick Vibe</span> is
            a single forward pass for an instant read. <span style={{ color: "var(--text-primary)" }}>Deep Dive</span> is
            a five-stage cascade that&apos;s deliberately tuned to favor catching suicidal cases
            over precision — the asymmetric cost of a missed crisis indicator demands that trade.
          </p>
        </div>

        <div
          className="mt-20 h-px w-full"
          style={{ backgroundColor: "var(--border-color)" }}
        />
      </motion.section>

      {/* ── Section 2: The Models ──────────────────────────────── */}
      <motion.section
        className={`mb-24 ${isPD ? "pd-panel" : ""}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2
          className="text-sm font-bold uppercase tracking-[0.25em] mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          The Models
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Quick Vibe */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-between gap-5 backdrop-blur-xl"
            style={{
              backgroundColor: "color-mix(in srgb, var(--bg-secondary) 40%, transparent)",
              border: "1px solid color-mix(in srgb, var(--border-color) 60%, transparent)",
              boxShadow: "0 8px 32px -8px rgba(0,0,0,0.3)",
            }}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>Quick Vibe</p>
                <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>MentalBERT Flat v6</h3>
              </div>
              <p
                className="text-base leading-relaxed text-justify"
                style={{ color: "var(--text-secondary)", hyphens: "auto" }}
              >
                MentalBERT &mdash; BERT-base with mental-health pretraining &mdash; fine-tuned on
                an 8-class head. v6 retired the OLID-era Directed Aggression data and pulled in
                explicit threat-labelled examples from Jigsaw 2017 and Civil Comments. Same class,
                training data that actually reflects how aggression shows up in the wild. One
                forward pass, near-instant. For when you just want the vibe.
              </p>
              <div className="space-y-2 pt-1">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: "var(--text-secondary)", opacity: 0.7 }}
                >
                  v6 update
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Retired the OLID-sourced Directed Aggression data. Re-trained on
                  threat-labelled examples from <span style={{ color: "var(--text-primary)" }}>Jigsaw 2017</span> +
                  <span style={{ color: "var(--text-primary)" }}> Civil Comments</span> &mdash;
                  same class, training data that generalizes.
                </p>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--text-secondary)", opacity: 0.7 }}
              >
                Test set
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Accuracy", value: "82.12%" },
                  { label: "Dep→Sui", value: "774" },
                  { label: "Sui→Dep", value: "533" },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-1">
                    <p
                      className="text-2xl font-black"
                      style={{
                        color: "var(--accent)",
                        textShadow: "0 0 36px color-mix(in srgb, var(--accent) 70%, transparent)",
                      }}
                    >
                      {value}
                    </p>
                    <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deep Dive */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-between gap-5 backdrop-blur-xl"
            style={{
              backgroundColor: "color-mix(in srgb, var(--bg-secondary) 40%, transparent)",
              border: "1px solid color-mix(in srgb, var(--border-color) 60%, transparent)",
              boxShadow: "0 8px 32px -8px rgba(0,0,0,0.3)",
            }}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>Deep Dive</p>
                <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Hierarchical Cascade v6 <span className="font-medium opacity-70">(5 stages)</span></h3>
              </div>
              <p
                className="text-base leading-relaxed text-justify"
                style={{ color: "var(--text-secondary)", hyphens: "auto" }}
              >
                Five stages, each more careful than the last. A Directed Aggression gate up top
                (Cardiff RoBERTa). A suicidal early-exit. A normal-vs-distress splitter. A 5-class
                distress sorter, averaged across 3 seeds for stability. And a Longformer that
                re-reads up to 1,024 tokens of context when depression and suicidal start blurring
                together. Pick <span style={{ color: "var(--text-primary)" }}>Balanced</span> for
                everyday, <span style={{ color: "var(--text-primary)" }}>Sensitive</span> when
                missing a crisis would cost more than over-flagging. Slower than Quick Vibe,
                significantly sharper on the cases that matter.
              </p>
            </div>
            <div className="space-y-5 pt-2">
              {([
                {
                  mode: "Balanced",
                  stats: [
                    { label: "Accuracy", value: "82.82%" },
                    { label: "Dep→Sui", value: "941"    },
                    { label: "Sui→Dep", value: "266"    },
                  ],
                },
                {
                  mode: "Sensitive",
                  stats: [
                    { label: "Accuracy", value: "82.45%" },
                    { label: "Dep→Sui", value: "1113"   },
                    { label: "Sui→Dep", value: "161"    },
                  ],
                },
              ] as const).map(({ mode, stats }) => (
                <div key={mode} className="space-y-2">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-secondary)", opacity: 0.7 }}
                  >
                    {mode}
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map(({ label, value }) => (
                      <div key={label} className="space-y-1">
                        <p
                          className="text-2xl font-black"
                          style={{
                            color: "var(--accent)",
                            textShadow: "0 0 36px color-mix(in srgb, var(--accent) 70%, transparent)",
                          }}
                        >
                          {value}
                        </p>
                        <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>
          Dep&rarr;Sui: Depression samples misclassified as Suicidal. Sui&rarr;Dep: Suicidal
          samples misclassified as Depression &mdash; the more critical error. Sensitive mode
          trades a small amount of macro F1 for catching ~40% more of these (266 &rarr; 161).
        </p>

        <div
          className="mt-16 h-px w-full"
          style={{ backgroundColor: "var(--border-color)" }}
        />
      </motion.section>

      {/* ── Section 2: Team Members ────────────────────────────── */}
      <section className={`mb-24 ${isPD ? "pd-panel" : ""}`}>
        <h2
          className="text-sm font-bold uppercase tracking-[0.25em] mb-12"
          style={{ color: "var(--text-secondary)" }}
        >
          The Team
        </h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-14"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="flex flex-col items-center gap-6 group"
            >
              {/* Avatar Container — photo with initials fallback */}
              <div className="relative">
                <div
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden flex items-center justify-center text-2xl md:text-3xl font-bold select-none transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    border: "2px solid var(--border-color)",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Initials sit underneath; image covers them when it loads */}
                  <span aria-hidden>{member.initials}</span>
                  {member.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      onError={(e) => {
                        // Hide the <img> if the file isn't there yet — initials show through
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* Decorative background element */}
                <div
                  className="absolute -inset-2 rounded-[2rem] -z-10 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: "var(--text-primary)" }}
                />
              </div>

              {/* Info */}
              <div className="text-center space-y-2">
                <p
                  className="text-base md:text-lg font-bold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {member.name}
                </p>

                {/* LinkedIn Icon */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <LinkedInIcon />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div
          className="mt-20 h-px w-full"
          style={{ backgroundColor: "var(--border-color)" }}
        />
      </section>

      {/* ── Section 3: Supervision ────────────────────────────── */}
      <motion.section
        className={`mb-24 ${isPD ? "pd-panel" : ""}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2
          className="text-sm font-bold uppercase tracking-[0.25em] mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          Project Supervision
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16">
          {SUPERVISORS.map((s) => (
            <div key={s.name} className="space-y-2">
              <p
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {s.name}
              </p>
              <p
                className="text-lg md:text-xl font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {s.role}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-16 h-px w-full"
          style={{ backgroundColor: "var(--border-color)" }}
        />
      </motion.section>

      {/* ── Section 4: Disclaimer ─────────────────────────────── */}
      <motion.section
        className={isPD ? "pd-panel" : ""}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2
          className="text-sm font-bold uppercase tracking-[0.25em] mb-8"
          style={{ color: "var(--text-secondary)" }}
        >
          Disclaimer
        </h2>

        <div className="max-w-4xl space-y-5">
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            VibeCheck is an academic NLP project. It can spot patterns in text, but
            it can&apos;t read you. Whatever it produces is a guess based on training
            data &mdash; sometimes useful, sometimes off, and never the whole story
            of what you&apos;re carrying.
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            If it lands on a heavy label and that doesn&apos;t feel right to you,
            trust yourself first. The model isn&apos;t diagnosing you. It&apos;s
            reflecting a pattern back &mdash; that&apos;s exactly why the UI is built
            to feel like a mirror, not a verdict.
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            And if you are going through something heavy: you don&apos;t have to carry
            it alone. Reaching out &mdash; to a friend who&apos;ll just listen, a
            counselor, a crisis line &mdash; is one of the bravest things you can do,
            not a sign that things have to be at their worst. The numbers below are
            free and they&apos;re there for you whenever you&apos;re ready.
          </p>
        </div>

        {/* Crisis resources — full-width strip below the prose */}
        <div className="mt-10">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-5"
            style={{ color: "var(--text-secondary)" }}
          >
            When you&apos;re ready to talk
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Egypt — Suicide Prevention",
                line: "16328 · 24/7",
                href: null,
              },
              {
                title: "Shezlong — Online Therapy",
                line: "shezlong.com",
                href: "https://shezlong.com",
              },
              {
                title: "Worldwide — IASP",
                line: "findahelpline.com",
                href: "https://findahelpline.com",
              },
            ].map(({ title, line, href }) => (
              <div
                key={title}
                className="rounded-2xl p-5 space-y-1 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--bg-secondary) 40%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--border-color) 50%, transparent)",
                }}
              >
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {title}
                </p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                    style={{ color: "var(--accent)" }}
                  >
                    {line}
                  </a>
                ) : (
                  <p
                    className="text-base font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    {line}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

