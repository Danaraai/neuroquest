"use client";

import Link from "next/link";
import { Flame, BookOpen, RotateCcw, Trophy, ChevronRight, Lock } from "lucide-react";
import { Ilya, IlyaBubble } from "@/components/ilya/Ilya";
import { IlyaIntro } from "@/components/home/IlyaIntro";
import { XPBar } from "@/components/ui/XPBar";
import { useStore, selectDueReviewCount } from "@/lib/store";
import { WORLDS } from "@/data/worlds";
import { getGreeting, pluralize } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { stats, worldProgress, questProgress, currentWorldId, currentQuestId } = useStore();
  const dueCount = useStore(selectDueReviewCount);

  const currentWorld = WORLDS.find((w) => w.id === currentWorldId);
  const currentQuest = currentWorld?.quests.find((q) => q.id === currentQuestId);

  const greeting = getGreeting();
  const completedQuests = Object.values(questProgress).filter((q) => q.completed).length;

  // Compute Ilya's message
  const ilyaMessage =
    stats.currentStreak >= 7
      ? `${stats.currentStreak} days in a row! You're unstoppable! 🔥`
      : stats.currentStreak > 0
      ? `Day ${stats.currentStreak} streak! Keep going!`
      : dueCount > 0
      ? `${dueCount} cards need review — your brain will thank you!`
      : `Ready to unlock ${currentWorld?.title ?? "the next world"}?`;

  return (
    <div className="min-h-screen bg-[#1A1B2E] px-4 pt-safe safe-top">
      <IlyaIntro />

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between pt-4 pb-3">
        <div className="flex items-center gap-2">
          <Ilya state="idle" size={36} />
          <span
            className="text-base font-black text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            NeuroQuest
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-[#2E3058] rounded-full px-3 py-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              {stats.currentStreak}
            </span>
          </div>
          {/* XP */}
          <div className="flex items-center gap-1 bg-[#2E3058] rounded-full px-3 py-1.5">
            <span className="text-yellow-400 text-xs">⭐</span>
            <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              {stats.totalXP}
            </span>
          </div>
        </div>
      </div>

      {/* ── XP Progress bar ── */}
      <div className="mb-5">
        <XPBar />
      </div>

      {/* ── Ilya greeting ── */}
      <div className="mb-5 animate-slide-up">
        <IlyaBubble
          message={`${greeting}! ${ilyaMessage}`}
          state={stats.currentStreak >= 3 ? "celebrate" : "idle"}
          size={56}
        />
      </div>

      {/* ── Daily Review card (shown if due cards exist) ── */}
      {dueCount > 0 && (
        <Link href="/review" className="block mb-4 animate-slide-up">
          <div
            className="card p-4 flex items-center justify-between"
            style={{
              background: "linear-gradient(135deg, #252640, #2E3058)",
              borderLeft: "4px solid #1CB0F6",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1CB0F6]/20 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-[#1CB0F6]" />
              </div>
              <div>
                <p
                  className="font-black text-white text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Daily Review
                </p>
                <p className="text-xs text-[#AFAFAF]">
                  {pluralize(dueCount, "card")} waiting for you
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#1CB0F6]" />
          </div>
        </Link>
      )}

      {/* ── Continue Quest card ── */}
      {currentWorld && currentQuest && (
        <Link
          href={`/learn/${currentWorldId}/${currentQuestId}`}
          className="block mb-4 animate-slide-up"
          style={{ animationDelay: "80ms" }}
        >
          <div
            className="card p-4"
            style={{
              background: "linear-gradient(135deg, #252640, #2E3058)",
              borderLeft: `4px solid ${currentWorld.color}`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentWorld.emoji}</span>
                <div>
                  <p className="text-[10px] font-bold text-[#AFAFAF] uppercase tracking-wider">
                    {currentWorld.title}
                  </p>
                  <p
                    className="font-black text-white text-sm leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {currentQuest.title}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-[#FFD700] font-bold">+{currentQuest.totalXP} XP</span>
                <ChevronRight className="w-5 h-5" style={{ color: currentWorld.color }} />
              </div>
            </div>
            {/* Progress */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[10px] text-[#AFAFAF]">Quest progress</span>
                <span className="text-[10px] text-[#AFAFAF]">
                  {currentQuest.lessons.filter((l) => questProgress[l.id]).length} / {currentQuest.lessons.length} lessons
                </span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${(currentQuest.lessons.filter((l) => questProgress[l.id]).length / currentQuest.lessons.length) * 100}%`,
                    background: currentWorld.color,
                  }}
                />
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* ── World progress summary ── */}
      <div className="mb-4" style={{ animationDelay: "160ms" }}>
        <h2
          className="text-xs font-black text-[#AFAFAF] uppercase tracking-widest mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your Journey
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {WORLDS.map((world) => {
            const wp = worldProgress[world.id];
            const unlocked = wp?.unlocked ?? true;
            const completed = wp?.completed ?? false;

            return (
              <Link
                key={world.id}
                href={unlocked ? `/map` : "#"}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                  unlocked ? "opacity-100" : "opacity-40",
                  completed && "ring-2 ring-[#58CC02]"
                )}
                style={{ background: unlocked ? `${world.color}22` : "#252640" }}
              >
                <span className="text-2xl">{unlocked ? world.emoji : "🔒"}</span>
                <span className="text-[9px] text-center text-[#AFAFAF] font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  W{world.number}
                </span>
                {completed && <span className="text-[#58CC02] text-[10px]">✓</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 gap-3 mb-6" style={{ animationDelay: "240ms" }}>
        <StatCard
          label="Quests done"
          value={completedQuests}
          icon={<BookOpen className="w-5 h-5 text-[#58CC02]" />}
          color="#58CC02"
        />
        <StatCard
          label="Day streak"
          value={stats.currentStreak}
          icon={<Flame className="w-5 h-5 text-orange-400" />}
          color="#F97316"
        />
        <StatCard
          label="Best streak"
          value={stats.longestStreak}
          icon={<Trophy className="w-5 h-5 text-[#FFD700]" />}
          color="#FFD700"
        />
      </div>

      {/* ── NMA countdown ── */}
      <div className="card p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🧠</div>
          <div>
            <p
              className="font-black text-white text-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NMA Prep — 4 Weeks
            </p>
            <p className="text-xs text-[#AFAFAF]">
              Complete all 5 worlds to be NMA-ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="card p-3 flex flex-col items-center gap-1">
      {icon}
      <span
        className="text-2xl font-black text-white"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </span>
      <span className="text-[10px] text-[#AFAFAF] text-center font-semibold">
        {label}
      </span>
    </div>
  );
}
