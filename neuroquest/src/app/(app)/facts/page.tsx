"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FACTS } from "@/data/facts";

export default function FactsPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dragStart, setDragStart] = useState(0);

  const fact = FACTS[index];
  const isFirst = index === 0;
  const isLast = index === FACTS.length - 1;
  const nextFact = FACTS[index + 1];

  function goNext() {
    if (isLast) return;
    setDirection(1);
    setIndex((i) => i + 1);
  }

  function goPrev() {
    if (isFirst) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#080A18", paddingBottom: 100 }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-black text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ⚡ Brain Sparks
          </h1>
          <p className="text-xs text-[#6A70A0] mt-0.5">Swipe or tap to explore</p>
        </div>
        <div
          className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#AFAFAF",
            fontFamily: "var(--font-display)",
          }}
        >
          {index + 1} / {FACTS.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 mb-6">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 3, background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: fact.color }}
            animate={{ width: `${((index + 1) / FACTS.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* Card stack */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="relative w-full max-w-sm" style={{ height: 420 }}>

          {/* Background peek card */}
          {nextFact && (
            <div
              className="absolute inset-x-4 rounded-3xl"
              style={{
                top: 12,
                bottom: -12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                transform: "scale(0.95)",
                zIndex: 0,
              }}
            />
          )}

          {/* Main card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={fact.id}
              custom={direction}
              initial={{ x: direction > 0 ? 320 : -320, opacity: 0, scale: 0.92 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: direction > 0 ? -320 : 320, opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              drag="x"
              dragConstraints={{ left: -20, right: 20 }}
              dragElastic={0.15}
              onDragStart={(_, info) => setDragStart(info.point.x)}
              onDragEnd={(_, info) => {
                const delta = info.offset.x;
                if (delta < -80) goNext();
                else if (delta > 80) goPrev();
              }}
              className="absolute inset-0 rounded-3xl flex flex-col cursor-grab active:cursor-grabbing"
              style={{
                background: "linear-gradient(145deg, #12143A 0%, #0E1028 100%)",
                border: `1px solid ${fact.color}30`,
                boxShadow: `0 0 40px ${fact.color}18, 0 20px 60px rgba(0,0,0,0.5)`,
                zIndex: 1,
                userSelect: "none",
              }}
            >
              {/* Top accent bar */}
              <div
                className="rounded-t-3xl flex-shrink-0"
                style={{ height: 4, background: fact.color }}
              />

              {/* Card content */}
              <div className="flex-1 flex flex-col p-7 pt-6">
                {/* Emoji + category */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: `${fact.color}20`,
                      color: fact.color,
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {fact.category}
                  </span>
                  <span style={{ fontSize: 36, lineHeight: 1 }}>{fact.emoji}</span>
                </div>

                {/* Fact text */}
                <p
                  className="text-white leading-relaxed flex-1"
                  style={{ fontSize: 16.5, fontWeight: 500, lineHeight: 1.65 }}
                >
                  {fact.text}
                </p>

                {/* Swipe hint */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {!isFirst && (
                    <div
                      className="text-[10px] font-bold flex items-center gap-1"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      ← swipe back
                    </div>
                  )}
                  <div className="flex gap-1.5 flex-1 justify-center">
                    {FACTS.map((_, i) => (
                      <div
                        key={i}
                        className="rounded-full transition-all duration-200"
                        style={{
                          width: i === index ? 16 : 4,
                          height: 4,
                          background: i === index ? fact.color : "rgba(255,255,255,0.15)",
                        }}
                      />
                    ))}
                  </div>
                  {!isLast && (
                    <div
                      className="text-[10px] font-bold flex items-center gap-1"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      swipe →
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tap buttons */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="flex items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-90"
            style={{
              background: isFirst ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
              opacity: isFirst ? 0.3 : 1,
            }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div
            className="text-sm font-bold text-center"
            style={{ color: "#6A70A0", fontFamily: "var(--font-display)", minWidth: 80 }}
          >
            {index + 1} of {FACTS.length}
          </div>

          <button
            onClick={goNext}
            disabled={isLast}
            className="flex items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-90"
            style={{
              background: isLast ? "rgba(255,255,255,0.04)" : fact.color,
              border: "1px solid rgba(255,255,255,0.08)",
              opacity: isLast ? 0.3 : 1,
            }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Done state */}
        {isLast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-sm font-bold" style={{ color: "#58CC02" }}>
              🎉 You've seen all {FACTS.length} sparks!
            </p>
            <button
              onClick={() => { setDirection(-1); setIndex(0); }}
              className="mt-3 text-xs font-bold px-4 py-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.06)", color: "#AFAFAF" }}
            >
              Start over
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
