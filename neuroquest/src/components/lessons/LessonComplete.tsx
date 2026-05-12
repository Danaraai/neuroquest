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
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: "#F2F1F8",
          marginBottom: 8,
          fontFamily: "var(--font-display)",
        }}
      >
        {perfect ? "Perfect! ✨" : "Lesson Done! 🎉"}
      </h1>

      <p style={{ fontSize: 14, color: "#9EA3BD", marginBottom: 32 }}>
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
          background: "#1E2147",
          border: "1.5px solid rgba(246,217,91,0.35)",
        }}
      >
        <Star className="w-5 h-5" style={{ color: "#F6D95B" }} fill="#F6D95B" />
        <span style={{ fontSize: 22, fontWeight: 800, color: "#F6D95B", fontFamily: "var(--font-display)" }}>
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
              padding: "15px 24px",
              borderRadius: 16,
              border: "1px solid rgba(124,130,248,0.35)",
              background: "#252850",
              color: "#A5A9FA",
              fontSize: 15,
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
              padding: "15px 24px",
              borderRadius: 16,
              background: "#252850",
              border: "1px solid rgba(124,130,248,0.35)",
              color: "#A5A9FA",
              fontSize: 15,
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
            padding: "13px 24px",
            borderRadius: 16,
            background: "transparent",
            border: "1.5px solid rgba(255,255,255,0.07)",
            color: "#9EA3BD",
            fontSize: 13,
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
