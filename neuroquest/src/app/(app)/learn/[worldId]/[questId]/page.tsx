"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Laptop, ChevronRight } from "lucide-react";
import { getWorld, getQuest } from "@/data/worlds";
import { useStore } from "@/lib/store";
import { Ilya } from "@/components/ilya/Ilya";
import { cn } from "@/lib/utils";

export default function QuestPage() {
  const params = useParams();
  const worldId = params.worldId as string;
  const questId = params.questId as string;

  const world = getWorld(worldId);
  const quest = getQuest(worldId, questId);
  const { lessonProgress } = useStore();

  if (!world || !quest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: "#151735" }}>
        <Ilya state="sad" size={80} className="mb-4" />
        <h2 className="text-xl font-black mb-2" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)" }}>
          Quest not found
        </h2>
        <Link href="/map" className="text-sm font-bold" style={{ color: "#7C82F8" }}>← Back to Map</Link>
      </div>
    );
  }

  const completedLessons = quest.lessons.filter((l) => lessonProgress[l.id]?.completedAt).length;
  const progressPct = Math.round((completedLessons / quest.lessons.length) * 100);
  const nextLessonIndex = completedLessons < quest.lessons.length ? completedLessons : 0;
  const nextLesson = quest.lessons[nextLessonIndex];
  const questDone = completedLessons >= quest.lessons.length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#151735" }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-3 flex items-center gap-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Link href="/map" style={{ color: "#9EA3BD", lineHeight: 0 }}>
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1">
          <p style={{ fontSize: 10, color: "#9EA3BD", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
            {world.emoji} {world.title}
          </p>
          <h1
            style={{ fontSize: 15, fontWeight: 800, color: "#F2F1F8", lineHeight: 1.3, margin: 0, fontFamily: "var(--font-display)" }}
          >
            {quest.title} {quest.isBoss && "⚔️"}
          </h1>
        </div>
        <span style={{ fontSize: 12, color: "#F6D95B", fontWeight: 700 }}>{quest.totalXP} XP</span>
      </div>

      {/* Progress */}
      <div className="px-4 py-3">
        <div className="flex justify-between mb-1" style={{ fontSize: 10, color: "#9EA3BD" }}>
          <span>{completedLessons}/{quest.lessons.length} lessons</span>
          <span>{progressPct}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Ilya card */}
      <div className="px-4 mb-4">
        <div className="card p-4 flex items-start gap-3">
          <Ilya state={questDone ? "celebrate" : "idle"} size={48} className="flex-shrink-0" />
          <div>
            <p style={{ color: "#F2F1F8", fontWeight: 700, fontSize: 14, marginBottom: 4, fontFamily: "var(--font-display)" }}>
              {quest.isBoss ? "⚔️ Boss Battle!" : questDone ? "Quest Complete!" : "Quest Mission"}
            </p>
            <p style={{ color: "#9EA3BD", fontSize: 12, lineHeight: 1.55, margin: 0 }}>{quest.description}</p>
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <div className="flex-1 px-4 overflow-y-auto space-y-2">
        <h2
          style={{ fontSize: 11, color: "#5A5F80", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, fontFamily: "var(--font-display)" }}
        >
          Lessons in this quest
        </h2>

        {quest.lessons.map((lesson, i) => {
          const done = !!lessonProgress[lesson.id]?.completedAt;
          const isLaptop = lesson.deviceRequired === "laptop";
          const isCurrent = i === nextLessonIndex && !questDone;

          return (
            <Link
              key={lesson.id}
              href={
                isLaptop
                  ? `/coding/${lesson.codingMission?.id ?? lesson.id}`
                  : `/learn/${worldId}/${questId}/${lesson.id}`
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                borderRadius: 14,
                textDecoration: "none",
                transition: "opacity 0.15s",
                background: done
                  ? "rgba(110,231,168,0.05)"
                  : isCurrent
                  ? "#1E2147"
                  : "#191C3B",
                border: done
                  ? "1px solid rgba(110,231,168,0.18)"
                  : isCurrent
                  ? "1px solid rgba(124,130,248,0.4)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 13,
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  background: done
                    ? "rgba(110,231,168,0.15)"
                    : isCurrent
                    ? "rgba(124,130,248,0.2)"
                    : "rgba(255,255,255,0.05)",
                  color: done
                    ? "#86EFAC"
                    : isCurrent
                    ? "#A5A9FA"
                    : "#5A5F80",
                }}
              >
                {done ? "✓" : isLaptop ? <Laptop className="w-4 h-4" /> : i + 1}
              </div>

              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: done ? "#9EA3BD" : "#F2F1F8",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {lesson.title}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span style={{ fontSize: 11, color: "#5A5F80" }}>{lesson.estimatedMinutes} min</span>
                  {isLaptop && <span style={{ fontSize: 11, color: "#7C82F8", fontWeight: 700 }}>💻 Laptop only</span>}
                  <span style={{ fontSize: 11, color: "#F6D95B", fontWeight: 700 }}>+{lesson.xpReward} XP</span>
                </div>
              </div>

              <ChevronRight
                className="w-4 h-4 flex-shrink-0"
                style={{
                  color: done ? "#86EFAC" : isCurrent ? "#7C82F8" : "#5A5F80",
                }}
              />
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <div className="px-4 py-4">
        {!questDone ? (
          <Link
            href={
              nextLesson.deviceRequired === "laptop"
                ? `/coding/${nextLesson.codingMission?.id ?? nextLesson.id}`
                : `/learn/${worldId}/${questId}/${nextLesson.id}`
            }
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              padding: "15px 24px",
              borderRadius: 14,
              background: "#252850",
              border: "1px solid rgba(124,130,248,0.35)",
              color: "#A5A9FA",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "var(--font-display)",
            }}
          >
            {completedLessons === 0 ? "Start Quest 🚀" : "Continue →"}
          </Link>
        ) : (
          <Link
            href="/map"
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              padding: "15px 24px",
              borderRadius: 14,
              background: "rgba(110,231,168,0.08)",
              border: "1px solid rgba(110,231,168,0.25)",
              color: "#86EFAC",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "var(--font-display)",
            }}
          >
            Quest Complete! Back to Map →
          </Link>
        )}
      </div>
    </div>
  );
}
