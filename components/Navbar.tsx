"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const pathname = usePathname();

  const isOnAbout = pathname.startsWith("/about");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 border-b border-[var(--border-color)] transition-colors duration-300 bg-opacity-60 backdrop-blur-xl"
      style={{ 
        backgroundColor: "color-mix(in srgb, var(--bg-primary) 60%, transparent)", 
        borderColor: "var(--border-color)" 
      }}
    >
      <Link href="/" className="text-xl font-medium tracking-tight transition-colors duration-300 hover:opacity-80"
        style={{ color: "var(--text-primary)" }}
      >
        VibeCheck
      </Link>


      <div className="flex items-center gap-4">
        {/* Tab switcher: Check / About */}
        <div
          className="hidden sm:flex items-center rounded-full px-1 py-0.5 border transition-colors duration-300"
          style={{
            borderColor: "color-mix(in srgb, var(--border-color) 60%, transparent)",
            backgroundColor:
              "color-mix(in srgb, var(--bg-secondary) 65%, transparent)",
          }}
        >
          <Link
            href="/"
            className="text-xs md:text-sm font-medium px-3 py-1.5 rounded-full transition-all"
            style={{
              backgroundColor: !isOnAbout
                ? "var(--accent)"
                : "transparent",
              color: !isOnAbout ? "var(--bg-primary)" : "var(--text-secondary)",
            }}
            aria-current={!isOnAbout ? "page" : undefined}
          >
            Check
          </Link>
          <Link
            href="/about"
            className="text-xs md:text-sm font-medium px-3 py-1.5 rounded-full transition-all"
            style={{
              backgroundColor: isOnAbout ? "var(--accent)" : "transparent",
              color: isOnAbout ? "var(--bg-primary)" : "var(--text-secondary)",
            }}
            aria-current={isOnAbout ? "page" : undefined}
          >
            About
          </Link>
        </div>

        <motion.button
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-150 focus:outline-none"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--bg-secondary) 70%, transparent)",
            color: "var(--text-primary)",
            border: "1px solid color-mix(in srgb, var(--border-color) 40%, transparent)",
            boxShadow:
              "0 0 0 1px color-mix(in srgb, var(--border-color) 15%, transparent)",
          }}
          aria-label="Toggle dark mode"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDarkMode ? (
              <motion.div
                key="moon"
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 600, damping: 22 }}
              >
                <Moon size={18} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 600, damping: 22 }}
              >
                <Sun size={18} strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </nav>
  );
}
