import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "theme-bg": "var(--bg-primary)",
        "theme-bg2": "var(--bg-secondary)",
        "theme-text": "var(--text-primary)",
        "theme-text2": "var(--text-secondary)",
        "theme-accent": "var(--accent)",
        "theme-accent2": "var(--accent-2)",
        "theme-border": "var(--border-color)",
      },
      transitionDuration: {
        "600": "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
