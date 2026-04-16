"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function IlyaIntro() {
  const [dismissed, setDismissed] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after running animation completes
    const textTimer = setTimeout(() => setShowText(true), 1200);
    // Auto-dismiss after text appears for 5 seconds
    const dismissTimer = setTimeout(() => setDismissed(true), 6500);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(dismissTimer);
    };
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
        {/* Ilya running towards camera from far away */}
        <motion.div
          className="absolute flex flex-col items-center"
          initial={{ scale: 0.2, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* White deer SVG - Ilya */}
          <svg
            width="160"
            height="180"
            viewBox="0 0 120 140"
            className="mb-4"
          >
            {/* Body */}
            <ellipse cx="60" cy="85" rx="38" ry="45" fill="white" />

            {/* Head */}
            <circle cx="60" cy="38" r="32" fill="white" />

            {/* Left horn */}
            <path
              d="M 42 8 Q 35 -5 32 -20"
              stroke="#D4A574"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right horn */}
            <path
              d="M 78 8 Q 85 -5 88 -20"
              stroke="#D4A574"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Left eye */}
            <circle cx="50" cy="32" r="3.5" fill="#1a1a1a" />
            {/* Right eye */}
            <circle cx="70" cy="32" r="3.5" fill="#1a1a1a" />

            {/* Left cheek - pink circle */}
            <circle cx="38" cy="42" r="7" fill="#FFB6C6" opacity="0.8" />
            {/* Right cheek - pink circle */}
            <circle cx="82" cy="42" r="7" fill="#FFB6C6" opacity="0.8" />

            {/* Nose - small black dot */}
            <circle cx="60" cy="48" r="2" fill="#1a1a1a" />

            {/* Legs */}
            <rect x="48" y="120" width="8" height="25" rx="4" fill="white" />
            <rect x="64" y="120" width="8" height="25" rx="4" fill="white" />
          </svg>

          {/* Ilya's name */}
          {showText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-white font-bold text-xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ilya
            </motion.div>
          )}
        </motion.div>

        {/* Dialogue bubble */}
        {showText && (
          <motion.div
            className="absolute top-32 right-12 bg-white text-gray-900 rounded-3xl px-6 py-5 max-w-sm shadow-2xl pointer-events-auto cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setDismissed(true)}
          >
            <div className="font-bold text-lg mb-3">Hello! I'm Ilya! 👋</div>
            <div className="text-sm leading-relaxed mb-3">
              Welcome to <span className="font-black" style={{ fontFamily: "var(--font-display)" }}>NeuroQuest</span>!
              We're exploring 5 incredible worlds of neuroscience together.
            </div>
            <div className="text-sm leading-relaxed mb-3">
              You can start from anywhere, but within each world, follow the journey I've laid out for you.
            </div>
            <div className="text-xs text-gray-500">Click to continue →</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
