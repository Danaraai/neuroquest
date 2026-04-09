"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Laptop, BookOpen, Zap, Brain, ChevronRight } from "lucide-react";
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
  const { questProgress, lessonProgress } = useStore();

  if (!world || !quest) {
    return (
      <div className="min-h-screen bg-[#1A1B2E] flex flex-col items-center justify-center px-4 text-center">
        <Ilya state="sad" size={80} className="mb-4" />
        <h2 className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Quest not found
        </h2>
        <Link href="/map" className="text-[#1CB0F6] text-sm font-bold">← Back to Map</Link>
      </div>
    );
  }

  const completedLessons = quest.lessons.filter(
    (l) => lessonProgress[l.id]?.completedAt
  ).length;
  const progressPct = Math.round((completedLessons / quest.lessons.length) * 100);
  const nextLessonIndex = completedLessons < quest.lessons.length ? completedLessons : 0;
  const nextLesson = quest.lessons[nextLessonIndex];
  const questDone = completedLessons >= quest.lessons.length;

  return (
    <div className="min-h-screen bg-[#1A1B2E] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 border-b border-[#3A3D5C]">
        <Link href="/map" className="text-[#AFAFAF] hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1">
          <p className="text-[10px] text-[#AFAFAF] font-bold uppercase tracking-widest">
            {world.emoji} {world.title}
          </p>
          <h1
            className="text-base font-black text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {quest.title} {quest.isBoss && "⚔️"}
          </h1>
        </div>
        <span className="text-xs text-[#FFD700] font-bold">{quest.totalXP} XP</span>
      </div>

      {/* Progress */}
      <div className="px-4 py-3">
        <div className="flex justify-between text-[10px] text-[#AFAFAF] mb-1">
          <span>{completedLessons}/{quest.lessons.length} lessons</span>
          <span>{progressPct}%</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPct}%`, background: world.color }}
          />
        </div>
      </div>

      {/* Ilya description */}
      <div className="px-4 mb-4">
        <div className="card p-4 flex items-start gap-3">
          <Ilya state={questDone ? "celebrate" : "idle"} size={48} className="flex-shrink-0" />
          <div>
            <p
              className="text-white font-bold text-sm mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {quest.isBoss ? "⚔️ Boss Battle!" : questDone ? "✅ Quest Complete!" : "Quest Mission"}
            </p>
            <p className="text-[#AFAFAF] text-xs leading-relaxed">{quest.description}</p>
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <div className="flex-1 px-4 overflow-y-auto space-y-2">
        <h2
          className="text-xs font-black text-[#AFAFAF] uppercase tracking-widest mb-3"
          style={{ fontFamily: "var(--font-display)" }}
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
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border transition-all",
                done && "border-[#58CC02]/30 bg-[rgba(88,204,2,0.06)]",
                isCurrent && !done && "border-[#1CB0F6] bg-[#2E3058]",
                !done && !isCurrent && "border-[#3A3D5C] bg-[#252640]"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-black",
                  done && "bg-[#58CC02] text-white",
                  isCurrent && !done && "bg-[#1CB0F6] text-white",
                  !done && !isCurrent && "bg-[#2E3058] text-[#AFAFAF]"
                )}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {done ? "✓" : isLaptop ? <Laptop className="w-4 h-4" /> : i + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={cn("font-bold text-sm truncate", done ? "text-[#AFAFAF]" : "text-white")}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {lesson.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-[10px] text-[#6B7094]">{lesson.estimatedMinutes} min</span>
                  {isLaptop && <span className="text-[10px] text-[#1CB0F6] font-bold">💻 Laptop only</span>}
                  <span className="text-[10px] text-[#FFD700] font-bold">+{lesson.xpReward} XP</span>
                </div>
              </div>

              <ChevronRight className={cn("w-4 h-4 flex-shrink-0", done ? "text-[#58CC02]" : isCurrent ? "text-[#1CB0F6]" : "text-[#6B7094]")} />
            </Link>
          );
        })}
      </div>

      {/* CTA button */}
      <div className="px-4 py-4">
        {!questDone ? (
          <Link
            href={
              nextLesson.deviceRequired === "laptop"
                ? `/coding/${nextLesson.codingMission?.id ?? nextLesson.id}`
                : `/learn/${worldId}/${questId}/${nextLesson.id}`
            }
            className="block text-center w-full py-4 rounded-xl font-black text-white text-base transition-all active:scale-95"
            style={{
              background: world.color,
              border: "none",
              borderBottom: `4px solid ${world.colorDark}`,
              fontFamily: "var(--font-display)",
            }}
          >
            {completedLessons === 0 ? "Start Quest 🚀" : "Continue →"}
          </Link>
        ) : (
          <div
            className="w-full py-4 rounded-xl font-black text-center text-[#58CC02] text-base"
            style={{
              background: "rgba(88, 204, 2, 0.1)",
              border: "2px solid #58CC02",
              fontFamily: "var(--font-display)",
            }}
          >
            ✅ Quest Complete! Great work!
          </div>
        )}
      </div>
    </div>
  );
}
