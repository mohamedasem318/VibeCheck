"use client";

import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "What you send us",
    body: (
      <>
        The only thing VibeCheck collects is the text you type into the
        classifier and the model choice you make. That&apos;s it. No accounts,
        no names, no email, no tracking pixels, no analytics scripts.
      </>
    ),
  },
  {
    title: "What happens to it",
    body: (
      <>
        Your text is sent to a HuggingFace Space we run, where one of two
        models classifies it and returns a label plus a confidence score.
        Nothing about that request is logged to a database. The Space&apos;s
        container holds nothing once the request finishes. Same for the
        browser side — your last result is held in memory, not on a server.
      </>
    ),
  },
  {
    title: "What we keep on your device",
    body: (
      <>
        VibeCheck uses your browser&apos;s <code className="font-mono text-sm">localStorage</code>{" "}
        for three preferences only: light/dark mode, your model choice
        (Quick Vibe vs. Deep Dive), and your sensitive-mode toggle. Your
        input text, classification results, and confidence scores are kept
        in memory while the tab is open and wiped on a full reload — they
        never touch <code className="font-mono text-sm">localStorage</code>{" "}
        and never reach our server.
      </>
    ),
  },
  {
    title: "Third parties",
    body: (
      <>
        The classifier itself runs on a HuggingFace Space. HuggingFace
        receives the text you submit because the model needs it to produce
        a prediction. The frontend is hosted on Vercel — Vercel sees normal
        web requests (IP, user-agent, page paths) the way any web host
        does, but it does not see your classifier input.
      </>
    ),
  },
  {
    title: "Children",
    body: (
      <>
        VibeCheck wasn&apos;t built specifically for children, and it&apos;s
        not designed to handle accounts or personal data of users under 16.
        If you are under 16, please use the site with a parent or guardian
        and don&apos;t enter information that personally identifies you.
      </>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        Clear your browser&apos;s site data for{" "}
        <code className="font-mono text-sm">checkmyvibe.me</code>{" "}
        to wipe every trace of your activity. There&apos;s nothing on our
        side to delete because there&apos;s nothing on our side to begin
        with.
      </>
    ),
  },
  {
    title: "Changes",
    body: (
      <>
        If we change how data flows through the app, we&apos;ll update this
        page and adjust the &ldquo;last updated&rdquo; date below. There&apos;s
        no mailing list to notify.
      </>
    ),
  },
  {
    title: "Get in touch",
    body: (
      <>
        Open an issue on the{" "}
        <a
          href="https://github.com/mohamedasem318/VibeCheck"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
          style={{ color: "var(--accent)" }}
        >
          GitHub repo
        </a>
        . If something feels off, that&apos;s the fastest way to flag it.
      </>
    ),
  },
];

export default function PrivacyPage() {
  const { classification } = useThemeStore();
  const isPD = classification === "personality_disorder";

  return (
    <div className="min-h-[calc(100vh-4rem)] px-6 md:px-12 py-20 max-w-5xl mx-auto">
      <motion.section
        className={isPD ? "pd-panel" : ""}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2
          className="text-sm font-bold uppercase tracking-[0.25em] mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          Privacy Policy
        </h2>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1]"
          style={{ color: "var(--text-primary)" }}
        >
          Your feelings stay yours.
        </h1>

        <p
          className="text-lg md:text-xl leading-relaxed mb-16 max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          VibeCheck is an academic NLP project. We didn&apos;t build it to
          collect data on anyone. This page is the short, plain-language
          version of exactly what we do and don&apos;t handle.
        </p>

        <div className="space-y-12">
          {SECTIONS.map(({ title, body }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-3 max-w-3xl"
            >
              <h3
                className="text-xl md:text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          className="mt-20 pt-8 text-sm"
          style={{
            color: "var(--text-secondary)",
            borderTop: "1px solid color-mix(in srgb, var(--border-color) 50%, transparent)",
          }}
        >
          Last updated: May 2026.
        </div>
      </motion.section>
    </div>
  );
}
