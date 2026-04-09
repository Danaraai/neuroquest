"use client";

import { useStore } from "@/lib/store";
import { WORLDS } from "@/data/worlds";
import { Ilya } from "@/components/ilya/Ilya";
import { XPBar } from "@/components/ui/XPBar";
import { Flame, Trophy, BookOpen, Star, RotateCcw, Zap, Shield } from "lucide-react";
import { getLevelFromXP, LEVELS } from "@/data/types";
import { cn } from "@/lib/utils";

const BADGES = [
  { id: "first_lesson", emoji: "🚀", label: "First Steps", desc: "Completed first lesson" },
  { id: "python_complete", emoji: "🐍", label: "Pythonista", desc: "All Python lessons done" },
  { id: "math_complete", emoji: "📐", label: "Math Master", desc: "Math Mountains cleared" },
  { id: "stats_complete", emoji: "📊", label: "Stats Savant", desc: "Stats Swamps cleared" },
  { id: "neuro_complete", emoji: "🧠", label: "Neuro Newbie", desc: "Neuro Jungle cleared" },
  { id: "coder", emoji: "💻", label: "Coder", desc: "First coding mission done" },
  { id: "boss_slayer", emoji: "⚔️", label: "Boss Slayer", desc: "Defeated first boss" },
  { id: "week_streak", emoji: "🔥", label: "On Fire", desc: "7-day streak" },
  { id: "nma_ready", emoji: "🏆", label: "NMA Ready", desc: "Complete all 5 worlds" },
  { id: "ilya_fav", emoji: "🦌", label: "Ilya's Fave", desc: "28-day streak" },
];

export default function ProfilePage() {
  const { stats, lessonProgress, questProgress, worldProgress, srCards, reset } = useStore();

  const level = getLevelFromXP(stats.totalXP);
  const nextLevel = LEVELS.find((l) => l.minXP > stats.totalXP);

  const totalLessons = Object.keys(lessonProgress).length;
  const totalQuests  = Object.values(questProgress).filter((q) => q.completed).length;
  const dueCards     = Object.values(srCards).filter((c) => c.nextReviewDate <= new Date().toISOString().split("T")[0]).length;
  const totalCards   = Object.keys(srCards).length;

  return (
    <div className="min-h-screen bg-[#1A1B2E] px-4 pb-6">
      {/* Header */}
      <div className="pt-6 pb-4 flex items-center gap-4">
        <Ilya
          state={stats.currentStreak >= 7 ? "celebrate" : "idle"}
          size={72}
          className="flex-shrink-0"
        />
        <div className="flex-1">
          <h1
            className="text-xl font-black text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your Progress
          </h1>
          <p className="text-sm text-[#AFAFAF]">
            {level.title} — Level {level.level}
          </p>
          {stats.currentStreak > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-bold text-orange-400">
                {stats.currentStreak} day streak
              </span>
            </div>
          )}
        </div>
      </div>

      {/* XP bar */}
      <div className="card p-4 mb-4">
        <XPBar />
        {nextLevel && (
          <p className="text-[10px] text-[#AFAFAF] mt-2 text-center">
            {nextLevel.minXP - stats.totalXP} XP to reach "{nextLevel.title}"
          </p>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard icon={<Star className="w-5 h-5 text-[#FFD700]" />} label="Total XP" value={stats.totalXP} color="#FFD700" />
        <StatCard icon={<Flame className="w-5 h-5 text-orange-400" />} label="Best Streak" value={stats.longestStreak} suffix="days" color="#F97316" />
        <StatCard icon={<BookOpen className="w-5 h-5 text-[#1CB0F6]" />} label="Lessons Done" value={totalLessons} color="#1CB0F6" />
        <StatCard icon={<Trophy className="w-5 h-5 text-[#58CC02]" />} label="Quests Done" value={totalQuests} color="#58CC02" />
        <StatCard icon={<RotateCcw className="w-5 h-5 text-[#AFAFAF]" />} label="Cards in SR" value={totalCards} color="#AFAFAF" />
        <StatCard icon={<Zap className="w-5 h-5 text-[#FF4B4B]" />} label="Due Today" value={dueCards} color="#FF4B4B" />
      </div>

      {/* World progress */}
      <div className="mb-4">
        <h2
          className="text-xs font-black text-[#AFAFAF] uppercase tracking-widest mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          World Progress
        </h2>
        <div className="space-y-2">
          {WORLDS.map((world) => {
            const wp = worldProgress[world.id];
            const unlocked = wp?.unlocked ?? false;
            const completed = wp?.completed ?? false;
            const doneQuests = world.quests.filter((q) => questProgress[q.id]?.completed).length;
            const pct = world.quests.length > 0 ? Math.round((doneQuests / world.quests.length) * 100) : 0;

            return (
              <div
                key={world.id}
                className={cn("card p-3 flex items-center gap-3", !unlocked && "opacity-40")}
              >
                <span className="text-xl w-8 text-center">{unlocked ? world.emoji : "🔒"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-bold truncate"
                      style={{ color: unlocked ? "white" : "#6B7094", fontFamily: "var(--font-display)" }}
                    >
                      {world.title}
                    </span>
                    <span className="text-[10px] text-[#AFAFAF] ml-2 flex-shrink-0">
                      {unlocked ? `${doneQuests}/${world.quests.length}` : "Locked"}
                    </span>
                  </div>
                  <div className="progress-bar-track" style={{ height: 6 }}>
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${pct}%`, background: world.color }}
                    />
                  </div>
                </div>
                {completed && <span className="text-[#58CC02] text-sm flex-shrink-0">✅</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6">
        <h2
          className="text-xs font-black text-[#AFAFAF] uppercase tracking-widest mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Badges ({stats.badges.length}/{BADGES.length})
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {BADGES.map((badge) => {
            const earned = stats.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl",
                  earned ? "bg-[#2E3058]" : "bg-[#252640] opacity-40"
                )}
                title={badge.desc}
              >
                <span className="text-2xl">{earned ? badge.emoji : "❓"}</span>
                <span
                  className="text-[8px] text-center text-[#AFAFAF] leading-tight font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak freeze */}
      <div className="card p-4 mb-4 flex items-center gap-3">
        <Shield className="w-6 h-6 text-[#1CB0F6] flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Streak Freezes: {stats.streakFreezes}
          </p>
          <p className="text-[10px] text-[#AFAFAF]">
            Protects your streak if you miss a day
          </p>
        </div>
      </div>

      {/* Reset (dev) */}
      <button
        onClick={() => {
          if (confirm("Reset ALL progress? This cannot be undone.")) reset();
        }}
        className="w-full py-3 rounded-xl text-[#FF4B4B] text-xs font-bold border border-[#FF4B4B]/30 transition-all hover:bg-[rgba(255,75,75,0.08)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Reset Progress (Dev)
      </button>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  suffix = "",
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  return (
    <div className="card p-4 flex flex-col gap-2">
      {icon}
      <p
        className="text-2xl font-black text-white"
        style={{ fontFamily: "var(--font-display)", color }}
      >
        {value}
        {suffix && <span className="text-sm ml-1 text-[#AFAFAF]">{suffix}</span>}
      </p>
      <p className="text-[10px] text-[#AFAFAF] font-semibold">{label}</p>
    </div>
  );
}
