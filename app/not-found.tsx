"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-black mb-4 opacity-10">404</h1>
        <h2 className="text-3xl font-bold mb-6">the vibe is building.</h2>
        <p className="text-secondary mb-10 max-w-md mx-auto">
          we couldn&apos;t find the page you&apos;re looking for. maybe it&apos;s in a different state of mind?
        </p>
        <Link 
          href="/" 
          className="px-8 py-3 rounded-full bg-primary text-secondary font-bold hover:scale-105 transition-transform"
          style={{ backgroundColor: "var(--accent)", color: "var(--bg-primary)" }}
        >
          back to safety
        </Link>
      </motion.div>
    </div>
  );
}
