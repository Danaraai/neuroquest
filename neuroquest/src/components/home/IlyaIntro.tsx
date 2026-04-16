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
          {/* White deer SVG */}
          <svg
            width="140"
            height="140"
            viewBox="0 0 120 120"
            className="mb-4"
          >
            {/* Body */}
            <ellipse cx="60" cy="70" rx="35" ry="40" fill="white" />

            {/* Head */}
            <circle cx="60" cy="35" r="28" fill="white" />

            {/* Left ear */}
            <ellipse cx="42" cy="10" rx="8" ry="18" fill="white" transform="rotate(-25 42 10)" />
            {/* Right ear */}
            <ellipse cx="78" cy="10" rx="8" ry="18" fill="white" transform="rotate(25 78 10)" />

            {/* Left antler */}
            <line x1="40" y1="8" x2="30" y2="-8" stroke="tan" strokeWidth="3" strokeLinecap="round" />
            <line x1="30" y1="-8" x2="25" y2="-18" stroke="tan" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right antler */}
            <line x1="80" y1="8" x2="90" y2="-8" stroke="tan" strokeWidth="3" strokeLinecap="round" />
            <line x1="90" y1="-8" x2="95" y2="-18" stroke="tan" strokeWidth="2.5" strokeLinecap="round" />

            {/* Eyes */}
            <circle cx="50" cy="30" r="4" fill="#333" />
            <circle cx="70" cy="30" r="4" fill="#333" />
            {/* Eye shine */}
            <circle cx="51" cy="29" r="1.5" fill="white" />
            <circle cx="71" cy="29" r="1.5" fill="white" />

            {/* Nose */}
            <ellipse cx="60" cy="42" rx="3" ry="4" fill="#333" />

            {/* Smile */}
            <path d="M 55 45 Q 60 48 65 45" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Legs */}
            <rect x="48" y="105" width="6" height="20" rx="3" fill="white" />
            <rect x="66" y="105" width="6" height="20" rx="3" fill="white" />
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
