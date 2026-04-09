"use client";

import Link from "next/link";
import { Star, ChevronRight, Home } from "lucide-react";
import { Ilya } from "@/components/ilya/Ilya";
import type { Lesson } from "@/data/types";

interface LessonCompleteProps {
  lesson: Lesson;
  xpEarned: number;
  perfect: boolean;
  nextLessonId?: string | null;
  questId: string;
  worldId: string;
  onNext: () => void;
}

export function LessonComplete({
  lesson,
  xpEarned,
  perfect,
  nextLessonId,
  questId,
  worldId,
  onNext,
}: LessonCompleteProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center animate-fade-in">
      {/* Ilya celebration */}
      <Ilya state="celebrate" size={120} className="mb-4" />

      {/* Title */}
      <h1
        className="text-3xl font-black text-white mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {perfect ? "Perfect! ✨" : "Lesson Done! 🎉"}
      </h1>

      <p className="text-[#AFAFAF] text-sm mb-8">
        {perfect
          ? "No mistakes — you're on fire!"
          : "Keep going, you're making progress!"}
      </p>

      {/* XP badge */}
      <div
        className="flex items-center gap-2 rounded-2xl px-6 py-4 mb-8"
        style={{
          background: "linear-gradient(135deg, #252640, #2E3058)",
          border: "2px solid #FFD700",
        }}
      >
        <Star className="w-6 h-6 text-[#FFD700]" fill="#FFD700" />
        <span
          className="text-2xl font-black text-[#FFD700]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          +{xpEarned} XP
        </span>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-3">
        {nextLessonId ? (
          <button
            onClick={onNext}
            className="w-full py-4 rounded-xl font-black text-white text-base flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: "#58CC02",
              border: "none",
              borderBottom: "4px solid #46A302",
              fontFamily: "var(--font-display)",
            }}
          >
            Next Lesson
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <Link
            href={`/learn/${worldId}/${questId}`}
            className="w-full py-4 rounded-xl font-black text-white text-base flex items-center justify-center gap-2 transition-all active:scale-95 block"
            style={{
              background: "#58CC02",
              borderBottom: "4px solid #46A302",
              fontFamily: "var(--font-display)",
            }}
          >
            Quest Complete! →
          </Link>
        )}
        <Link
          href="/home"
          className="w-full py-3 rounded-xl font-bold text-[#AFAFAF] text-sm flex items-center justify-center gap-2 block"
          style={{
            background: "transparent",
            border: "2px solid #3A3D5C",
            fontFamily: "var(--font-display)",
          }}
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
