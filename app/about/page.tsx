"use client";

import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";

const TEAM = [
  { initials: "FE", name: "Fatma Al-Zahraa Emad", linkedin: "#" },
  { initials: "GM", name: "Gehad Mohamed", linkedin: "#" },
  { initials: "HG", name: "Hebatullah El Gazoly", linkedin: "#" },
  { initials: "HI", name: "Hussein Ibrahim", linkedin: "#" },
  { initials: "MA", name: "Mohamed Assem", linkedin: "#" },
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

        <div className="max-w-4xl">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1]"
            style={{ color: "var(--text-primary)" }}
          >
            Empowering Mental Health with NLP.
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            VibeCheck is a sophisticated mental health sentiment classifier designed for students.
            By leveraging advanced Natural Language Processing (NLP), the platform analyzes text
            to detect emotional states—ranging from anxiety and stress to clinical conditions.
            Our unique interface dynamically transforms its entire visual identity to reflect
            the user&apos;s vibe, creating an immersive and empathetic experience.
          </p>
        </div>

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
              {/* Avatar Container */}
              <div className="relative">
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-2xl md:text-3xl font-bold select-none transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    border: "2px solid var(--border-color)",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
                  }}
                >
                  {member.initials}
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
          className="text-sm font-bold uppercase tracking-[0.25em] mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          Disclaimer
        </h2>

        <p
          className="text-base md:text-lg leading-relaxed max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          VibeCheck is an academic NLP project developed as part of a university
          course. It isn&apos;t a substitute for professional mental health support,
          clinical assessment, or any form of medical advice. All classifications
          produced by this system are model predictions based on input text and
          should not be interpreted as diagnoses of any mental health condition.
          If you or someone you know is struggling, please consult a qualified
          mental health professional.
        </p>
      </motion.section>
    </div>
  );
}

