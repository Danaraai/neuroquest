"use client";

import Link from "next/link";
import { useStore, selectDueReviewCount } from "@/lib/store";
import { WORLDS } from "@/data/worlds";
import { FACTS } from "@/data/facts";
import { getGreeting, pluralize } from "@/lib/utils";
import { Ilya, IlyaBubble } from "@/components/ilya/Ilya";
import { IlyaIntro } from "@/components/home/IlyaIntro";
import { XPBar } from "@/components/ui/XPBar";
import { NeuronCanvas } from "@/components/ui/NeuronCanvas";

function getDailySparkIndex() {
  // Use epoch days (ms since Jan 1 1970 / ms per day) — more reliable than day-of-year
  const epochDay = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  // Offset so Zverev (index 15) shows on Jun 10 2026 (epochDay 20614)
  const offset = (15 - (20614 % FACTS.length) + FACTS.length) % FACTS.length;
  return (epochDay + offset) % FACTS.length;
}

const ACCENT = "#7C82F8";

export default function HomePage() {
  const { stats, worldProgress, questProgress, currentWorldId, currentQuestId } = useStore();
  const dueCount = useStore(selectDueReviewCount);

  const currentWorld = WORLDS.find((w) => w.id === currentWorldId);
  const currentQuest = currentWorld?.quests.find((q) => q.id === currentQuestId);

  const greeting = getGreeting();
  const completedQuests = Object.values(questProgress).filter((q) => q.completed).length;

  const ilyaMessage =
    stats.currentStreak >= 7
      ? `${stats.currentStreak} days in a row! You're unstoppable! 🔥`
      : stats.currentStreak > 0
      ? `Day ${stats.currentStreak} streak — keep going!`
      : dueCount > 0
      ? `${dueCount} cards need review — your brain will thank you!`
      : `Ready to unlock ${currentWorld?.title ?? "the next world"}?`;

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#151735", fontFamily: "'Inter', sans-serif" }}>
      {/* Animated neuron background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <NeuronCanvas width={800} height={900} density={0.4} color={ACCENT} />
      </div>

      <IlyaIntro />

      <div className="relative" style={{ zIndex: 2 }}>
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-5 pt-[18px] pb-0">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center text-lg"
              style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.07)" }}
            >
              🦌
            </div>
            <span className="font-black text-[17px]" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>
              NeuroQuest
            </span>
          </div>
          <div className="flex gap-[10px]">
            <div
              className="flex items-center gap-[5px] px-3 py-[5px] rounded-full"
              style={{ background: "rgba(255,136,0,0.10)", border: "1px solid rgba(255,136,0,0.22)" }}
            >
              <span className="text-[15px]">🔥</span>
              <span className="text-[13px] font-bold" style={{ color: "#FF9B45" }}>{stats.currentStreak}</span>
            </div>
            <div
              className="flex items-center gap-[5px] px-3 py-[5px] rounded-full"
              style={{ background: "rgba(246,217,91,0.08)", border: "1px solid rgba(246,217,91,0.22)" }}
            >
              <span className="text-[15px]">⭐</span>
              <span className="text-[13px] font-bold" style={{ color: "#F6D95B" }}>{stats.totalXP.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ── XP bar ── */}
        <div className="px-5 pt-[10px]">
          <XPBar accentColor={ACCENT} />
        </div>

        {/* ── Ilya greeting ── */}
        <div className="px-5 pt-[18px] animate-fade-up">
          <IlyaBubble
            message={`${greeting}! ${ilyaMessage}`}
            state={stats.currentStreak >= 3 ? "celebrate" : "idle"}
            size={72}
          />
        </div>

        {/* ── Daily Review card ── */}
        {dueCount > 0 && (
          <Link href="/review" className="block mx-5 mt-4 animate-fade-up" style={{ animationDelay: "80ms" }}>
            <div
              className="flex items-center justify-between px-4 py-[14px] rounded-2xl cursor-pointer"
              style={{
                background: "rgba(124,130,248,0.07)",
                border: "1px solid rgba(124,130,248,0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: "rgba(124,130,248,0.12)", border: "1px solid rgba(124,130,248,0.25)" }}
                >
                  🔄
                </div>
                <div>
                  <p className="font-black text-sm m-0" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)" }}>
                    Daily Review
                  </p>
                  <p className="text-xs m-0 mt-0.5" style={{ color: "#6A70A0" }}>
                    {pluralize(dueCount, "card")} waiting · est. {Math.ceil(dueCount * 0.8)} min
                  </p>
                </div>
              </div>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-black"
                style={{ background: ACCENT, color: "#151735" }}
              >
                ›
              </div>
            </div>
          </Link>
        )}

        {/* ── Continue Quest ── */}
        {currentWorld && currentQuest && (
          <Link
            href={`/learn/${currentWorldId}/${currentQuestId}`}
            className="block mx-5 mt-[10px] animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <div
              className="px-4 py-[14px] rounded-2xl cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${currentWorld.color}0D, ${currentWorld.color}07)`,
                border: `1px solid ${currentWorld.color}33`,
              }}
            >
              <div className="text-[11px] font-black uppercase tracking-[0.5px] mb-1" style={{ color: currentWorld.color }}>
                {currentWorld.title} · Quest {currentWorld.number}.{currentQuest.number}
              </div>
              <div className="text-[15px] font-black mb-[10px]" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)" }}>
                {currentQuest.title}
              </div>
              <div className="h-[5px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(currentQuest.lessons.filter((l) => questProgress[l.id]).length / currentQuest.lessons.length) * 100}%`,
                    background: `linear-gradient(90deg, ${currentWorld.color}, ${currentWorld.colorDark})`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-[6px]">
                <span className="text-[11px] font-semibold" style={{ color: currentWorld.color }}>
                  {currentQuest.lessons.filter((l) => questProgress[l.id]).length} / {currentQuest.lessons.length} lessons
                </span>
                <span className="text-[11px] font-bold" style={{ color: "#F6D95B" }}>+{currentQuest.totalXP} XP</span>
              </div>
            </div>
          </Link>
        )}

        {/* ── Spark of the Day ── */}
        {(() => {
          const spark = FACTS[getDailySparkIndex()];
          const preview = spark.text.replace(/\n+/g, " ").slice(0, 200) + (spark.text.length > 200 ? "…" : "");
          return (
            <Link href={`/facts?start=${getDailySparkIndex()}`} className="block mx-5 mt-[10px] animate-fade-up" style={{ animationDelay: "140ms" }}>
              <div
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: `1px solid ${spark.color}30` }}
              >
                {/* Top accent bar */}
                <div style={{ height: 3, background: spark.color }} />
                <div
                  className="px-4 py-[14px]"
                  style={{ background: `linear-gradient(135deg, ${spark.color}0F, ${spark.color}06)` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl leading-none mt-0.5">{spark.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-[6px]">
                        <span
                          className="text-[10px] font-black uppercase tracking-[0.6px] px-2 py-[3px] rounded-full"
                          style={{ background: `${spark.color}20`, color: spark.color }}
                        >
                          ⚡ Spark of the Day
                        </span>
                      </div>
                      <p className="text-[13px] leading-snug m-0" style={{ color: "#C8CADF" }}>
                        {preview}
                      </p>
                    </div>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-black flex-shrink-0 mt-0.5"
                      style={{ background: `${spark.color}25`, color: spark.color }}
                    >
                      ›
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })()}

        {/* ── Your Journey ── */}
        <div className="pt-4 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <div className="text-[11px] font-black uppercase tracking-[1px] px-5 mb-3" style={{ color: "#5A5F80" }}>
            Your Journey
          </div>
          <div className="grid px-5 gap-2" style={{ gridTemplateColumns: `repeat(${WORLDS.length}, 1fr)` }}>
            {WORLDS.map((world) => {
              const wp = worldProgress[world.id];
              const unlocked = wp?.unlocked ?? true;
              const completed = wp?.completed ?? false;
              const active = world.id === currentWorldId;

              return (
                <Link
                  key={world.id}
                  href={unlocked ? "/map" : "#"}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl cursor-pointer relative py-3"
                  style={{
                    background: (unlocked || active) ? `${world.color}15` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${(unlocked || active) ? world.color + "40" : "rgba(255,255,255,0.06)"}`,
                    opacity: unlocked ? 1 : 0.4,
                  }}
                >
                  <span className="text-2xl">{world.emoji}</span>
                  <span className="text-[10px] font-black" style={{ color: (unlocked || active) ? world.color : "#5A608A" }}>
                    W{world.number}
                  </span>
                  {completed && (
                    <div className="absolute top-[4px] right-[4px] w-[15px] h-[15px] rounded-full bg-[#6EE7A8] flex items-center justify-center text-[8px] font-black" style={{ color: "#151735" }}>
                      ✓
                    </div>
                  )}
                  {active && !completed && (
                    <div
                      className="absolute bottom-[5px]"
                      style={{ width: 5, height: 5, borderRadius: "50%", background: world.color }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="flex gap-2 px-5 pt-[14px] animate-fade-up" style={{ animationDelay: "200ms" }}>
          <StatBadge icon="📖" value={completedQuests} label="Quests done" />
          <StatBadge icon="🔥" value={stats.currentStreak} label="Day streak" />
          <StatBadge icon="🏆" value={stats.longestStreak} label="Best streak" />
        </div>

        {/* ── NMA Prep banner ── */}
        <div className="mx-5 mt-[14px] animate-fade-up" style={{ animationDelay: "240ms" }}>
          <div
            className="flex items-center gap-[10px] px-[14px] py-3 rounded-2xl"
            style={{ background: "rgba(124,130,248,0.07)", border: "1px solid rgba(124,130,248,0.18)" }}
          >
            <span className="text-[22px]">🧠</span>
            <div>
              <div className="text-xs font-black" style={{ color: "#A5A9FA", fontFamily: "var(--font-display)" }}>
                NMA Prep — 4 Weeks
              </div>
              <div className="text-[11px]" style={{ color: "#6A70A0" }}>
                Complete all worlds to be NMA-ready
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer attribution ── */}
        <p className="text-center px-5 pt-5 pb-6" style={{ fontSize: 11, color: "#3D4168", lineHeight: 1.6 }}>
          * Curriculum based on{" "}
          <a href="https://neuromatch.io" target="_blank" rel="noopener noreferrer" style={{ color: "#5A6090", textDecoration: "underline" }}>
            Neuromatch Academy
          </a>
          {" "}Computational Neuroscience course
        </p>
      </div>
    </div>
  );
}

function StatBadge({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div
      className="flex-1 flex flex-col items-center py-[14px] px-2 rounded-2xl text-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <span className="text-[22px] mb-1">{icon}</span>
      <span className="text-[22px] font-black" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)" }}>{value}</span>
      <span className="text-[11px] font-semibold mt-0.5" style={{ color: "#6A70A0" }}>{label}</span>
    </div>
  );
}
