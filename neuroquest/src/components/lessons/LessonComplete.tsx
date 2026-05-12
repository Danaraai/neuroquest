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
    <div
      className="flex flex-col items-center justify-center h-full text-center animate-fade-in"
      style={{ padding: "32px 24px", maxWidth: 480, margin: "0 auto" }}
    >
      <Ilya state="celebrate" size={110} className="mb-6" />

      <h1
        style={{ fontSize: 28, fontWeight: 800, color: "#D8D9E8", marginBottom: 8, fontFamily: "var(--font-display)" }}
      >
        {perfect ? "Perfect! ✨" : "Lesson Done! 🎉"}
      </h1>

      <p style={{ fontSize: 15, color: "#7E849D", marginBottom: 32 }}>
        {perfect ? "No mistakes — you're on fire!" : "Keep going, you're making progress!"}
      </p>

      {/* XP badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderRadius: 16,
          padding: "14px 28px",
          marginBottom: 36,
          background: "#111827",
          border: "1.5px solid #E8C84A44",
        }}
      >
        <Star className="w-5 h-5" style={{ color: "#E8C84A" }} fill="#E8C84A" />
        <span style={{ fontSize: 22, fontWeight: 800, color: "#E8C84A", fontFamily: "var(--font-display)" }}>
          +{xpEarned} XP
        </span>
      </div>

      {/* Buttons */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        {nextLessonId ? (
          <button
            onClick={onNext}
            style={{
              width: "100%",
              padding: "16px 24px",
              borderRadius: 16,
              border: "none",
              background: "#1A2E22",
              color: "#8FCC9A",
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Next Lesson
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <Link
            href={`/learn/${worldId}/${questId}`}
            style={{
              width: "100%",
              padding: "16px 24px",
              borderRadius: 16,
              background: "#1A2E22",
              color: "#8FCC9A",
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Quest Complete! →
          </Link>
        )}
        <Link
          href="/home"
          style={{
            width: "100%",
            padding: "14px 24px",
            borderRadius: 16,
            background: "transparent",
            border: "1.5px solid rgba(255,255,255,0.08)",
            color: "#7E849D",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
