"use client";

import Link from "next/link";
import { useStore, selectDueReviewCount } from "@/lib/store";
import { WORLDS } from "@/data/worlds";
import { getGreeting, pluralize } from "@/lib/utils";
import { Ilya, IlyaBubble } from "@/components/ilya/Ilya";
import { IlyaIntro } from "@/components/home/IlyaIntro";
import { XPBar } from "@/components/ui/XPBar";
import { NeuronCanvas } from "@/components/ui/NeuronCanvas";

const ACCENT = "#00DCFF";

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
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#080A18", fontFamily: "'Inter', sans-serif" }}>
      {/* Animated neuron background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <NeuronCanvas width={800} height={900} density={0.5} color={ACCENT} />
      </div>

      <IlyaIntro />

      <div className="relative" style={{ zIndex: 2 }}>
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-5 pt-[18px] pb-0">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center text-lg"
              style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.08)" }}
            >
              🦌
            </div>
            <span className="font-black text-[17px]" style={{ color: "#F0F0FF", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>
              NeuroQuest
            </span>
          </div>
          <div className="flex gap-[10px]">
            <div
              className="flex items-center gap-[5px] px-3 py-[5px] rounded-full"
              style={{ background: "rgba(255,136,0,0.12)", border: "1px solid rgba(255,136,0,0.3)" }}
            >
              <span className="text-[15px]">🔥</span>
              <span className="text-[13px] font-bold" style={{ color: "#FF8800" }}>{stats.currentStreak}</span>
            </div>
            <div
              className="flex items-center gap-[5px] px-3 py-[5px] rounded-full"
              style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)" }}
            >
              <span className="text-[15px]">⭐</span>
              <span className="text-[13px] font-bold" style={{ color: "#FFD700" }}>{stats.totalXP.toLocaleString()}</span>
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
                background: `linear-gradient(135deg, rgba(0,220,255,0.08), rgba(0,180,220,0.04))`,
                border: `1px solid ${ACCENT}33`,
                boxShadow: `0 0 20px rgba(0,220,255,0.06)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}44` }}
                >
                  🔄
                </div>
                <div>
                  <p className="font-black text-sm m-0" style={{ color: "#F0F0FF", fontFamily: "var(--font-display)" }}>
                    Daily Review
                  </p>
                  <p className="text-xs m-0 mt-0.5" style={{ color: "#6A70A0" }}>
                    {pluralize(dueCount, "card")} waiting · est. {Math.ceil(dueCount * 0.8)} min
                  </p>
                </div>
              </div>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-black"
                style={{ background: ACCENT, color: "#000" }}
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
                border: `1px solid ${currentWorld.color}40`,
              }}
            >
              <div className="text-[11px] font-black uppercase tracking-[0.5px] mb-1" style={{ color: currentWorld.color }}>
                {currentWorld.title} · Quest {currentWorld.number}.{currentQuest.number}
              </div>
              <div className="text-[15px] font-black mb-[10px]" style={{ color: "#F0F0FF", fontFamily: "var(--font-display)" }}>
                {currentQuest.title}
              </div>
              <div className="h-[5px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(currentQuest.lessons.filter((l) => questProgress[l.id]).length / currentQuest.lessons.length) * 100}%`,
                    background: `linear-gradient(90deg, ${currentWorld.color}, ${currentWorld.colorDark})`,
                    boxShadow: `0 0 8px ${currentWorld.color}66`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-[6px]">
                <span className="text-[11px] font-semibold" style={{ color: currentWorld.color }}>
                  {currentQuest.lessons.filter((l) => questProgress[l.id]).length} / {currentQuest.lessons.length} lessons
                </span>
                <span className="text-[11px] font-bold" style={{ color: "#FFD700" }}>+{currentQuest.totalXP} XP</span>
              </div>
            </div>
          </Link>
        )}

        {/* ── Your Journey ── */}
        <div className="pt-4 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <div className="text-[11px] font-black uppercase tracking-[1px] px-5 mb-3" style={{ color: "#4A4E78" }}>
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
                    background: (unlocked || active) ? `${world.color}1E` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${(unlocked || active) ? world.color + "55" : "rgba(255,255,255,0.08)"}`,
                    opacity: unlocked ? 1 : 0.45,
                  }}
                >
                  <span className="text-2xl">{world.emoji}</span>
                  <span className="text-[10px] font-black" style={{ color: (unlocked || active) ? world.color : "#5A608A" }}>
                    W{world.number}
                  </span>
                  {completed && (
                    <div className="absolute top-[4px] right-[4px] w-[15px] h-[15px] rounded-full bg-[#58CC02] flex items-center justify-center text-[8px] text-white font-black">
                      ✓
                    </div>
                  )}
                  {active && !completed && (
                    <div
                      className="absolute bottom-[5px]"
                      style={{ width: 5, height: 5, borderRadius: "50%", background: world.color, boxShadow: `0 0 6px ${world.color}` }}
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
        <div className="mx-5 mt-[14px] mb-6 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <div
            className="flex items-center gap-[10px] px-[14px] py-3 rounded-2xl"
            style={{ background: "rgba(155,89,255,0.08)", border: "1px solid rgba(155,89,255,0.2)" }}
          >
            <span className="text-[22px]">🧠</span>
            <div>
              <div className="text-xs font-black" style={{ color: "#C084FF", fontFamily: "var(--font-display)" }}>
                NMA Prep — 4 Weeks
              </div>
              <div className="text-[11px]" style={{ color: "#6A70A0" }}>
                Complete all worlds to be NMA-ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBadge({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div
      className="flex-1 flex flex-col items-center py-[14px] px-2 rounded-2xl text-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <span className="text-[22px] mb-1">{icon}</span>
      <span className="text-[22px] font-black" style={{ color: "#F0F0FF", fontFamily: "var(--font-display)" }}>{value}</span>
      <span className="text-[11px] font-semibold mt-0.5" style={{ color: "#6A70A0" }}>{label}</span>
    </div>
  );
}
