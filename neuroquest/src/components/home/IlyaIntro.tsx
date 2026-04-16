"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function IlyaIntro() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 6 seconds
    const timer = setTimeout(() => setDismissed(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Ilya running in from the left */}
        <motion.div
          className="text-9xl absolute"
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          🦌
        </motion.div>

        {/* Dialogue bubble */}
        <motion.div
          className="absolute top-32 right-20 bg-white text-gray-900 rounded-3xl px-6 py-4 max-w-sm shadow-2xl pointer-events-auto cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={() => setDismissed(true)}
        >
          <div className="font-bold text-lg mb-2">Hello, I'm Ilya! 👋</div>
          <div className="text-sm leading-relaxed mb-3">
            Welcome to <span className="font-black" style={{ fontFamily: "var(--font-display)" }}>NeuroQuest</span>!
            We're exploring 5 incredible worlds of neuroscience together.
          </div>
          <div className="text-sm leading-relaxed mb-3">
            You can start from anywhere, but within each world, follow the journey I've laid out for you.
          </div>
          <div className="text-xs text-gray-500">Click to continue →</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
