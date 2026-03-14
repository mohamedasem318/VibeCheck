"use client";

import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";

export function CrisisCard() {
  const { classification } = useThemeStore();
  const isDepression = classification === "depression";

  const content = isDepression
    ? {
        title: "Someone to talk to",
        description:
          "Sometimes the internal monologue just gets a little too loud. It helps to bring in a fresh set of ears to help us untangle the static together.",
        resources: [
          {
            name: "Shezlong Online Therapy",
            link: "https://www.shezlong.com",
            linkLabel: "shezlong.com",
            description: "Private online therapy platform",
          },
          {
            name: "National Hotline (Egypt)",
            number: "16328",
            description: "Psychological Support Line • 24/7",
          },
        ],
      }
    : {
        title: "You're not alone",
        description:
          "If you're going through something difficult, please reach out. Talking to someone can make a real difference.",
        resources: [
          {
            name: "Befrienders Worldwide",
            link: "https://www.befrienders.org",
            linkLabel: "befrienders.org",
            description: "Find your local helpline worldwide",
          },
          {
            name: "National Hotline (Egypt)",
            number: "16328",
            description: "Mental Health Secretariat • 24/7",
          },
        ],
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: 0.6 }}
      className="mt-10 rounded-2xl p-8 max-w-xl mx-auto backdrop-blur-2xl border shadow-2xl overflow-hidden relative"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg-secondary) 40%, transparent)",
        borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
        color: "var(--text-primary)",
      }}
    >
      {/* Visual accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1" 
        style={{ backgroundColor: "var(--accent)" }}
      />

      <h3
        className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
        style={{ color: "var(--accent)" }}
      >
        {content.title}
      </h3>

      <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
        {content.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.resources.map((resource, idx) => (
          <div 
            key={idx}
            className="rounded-xl p-5 border transition-all hover:scale-[1.02]" 
            style={{ 
              backgroundColor: "color-mix(in srgb, var(--bg-primary) 60%, transparent)",
              borderColor: "color-mix(in srgb, var(--border-color) 40%, transparent)"
            }}
          >
            <p className="text-sm font-bold mb-1" style={{ color: "var(--accent)" }}>
              {resource.name}
            </p>
            {resource.link ? (
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold underline underline-offset-4 transition-opacity hover:opacity-70 inline-block mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {resource.linkLabel}
              </a>
            ) : (
              <p className="text-lg font-black mb-1" style={{ color: "var(--text-primary)" }}>
                {resource.number}
              </p>
            )}
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {resource.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
