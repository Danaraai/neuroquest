"use client";

import Link from "next/link";
import { ChevronLeft, Lock, CheckCircle2, Star, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { WORLDS } from "@/data/worlds";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function MapPage() {
  const router = useRouter();
  const { worldProgress, questProgress, lessonProgress } = useStore();

  return (
    <div className="min-h-screen bg-[#1A1B2E]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#1A1B2E] border-b border-[#3A3D5C] px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-[#AFAFAF] hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1
          className="text-lg font-black text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          🗺️ The Neural Realm
        </h1>
      </div>

      {/* Map path */}
      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-[#3A3D5C]" />

          {WORLDS.map((world, index) => {
            const wp = worldProgress[world.id];
            // Default to unlocked=true if no persisted entry exists (handles new worlds added after user's first visit)
            const unlocked = wp?.unlocked ?? true;
            const completed = wp?.completed ?? false;
            const isFirst = index === 0;

            // Count completed quests in this world
            const totalQuests = world.quests.length;
            const completedQuestsCount = world.quests.filter((q) => {
              // A quest is done if questProgress marks it complete OR all its lessons are completed
              if (questProgress[q.id]?.completed) return true;
              return q.lessons.every((l) => !!lessonProgress[l.id]?.completedAt);
            }).length;

            const progressPct = totalQuests > 0
              ? Math.round((completedQuestsCount / totalQuests) * 100)
              : 0;

            return (
              <div key={world.id} className="relative mb-6 animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
                {/* World card */}
                <div
                  className={cn(
                    "ml-16 card p-4 transition-all",
                    unlocked && !completed && "ring-2",
                    completed && "opacity-90"
                  )}
                  style={unlocked && !completed ? { outline: `2px solid ${world.color}` } : {}}
                >
                  {/* World icon on path */}
                  <div
                    className="absolute left-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                    style={{
                      background: unlocked ? world.color : "#2E3058",
                      border: completed ? "2px solid #58CC02" : "none",
                    }}
                  >
                    {completed ? "✅" : unlocked ? world.emoji : "🔒"}
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: unlocked ? world.color : "#6B7094" }}
                        >
                          World {world.number}
                        </span>
                        {completed && (
                          <span className="flex items-center gap-0.5 text-[#58CC02] text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Done
                          </span>
                        )}
                        {!unlocked && (
                          <span className="flex items-center gap-0.5 text-[#6B7094] text-[10px] font-bold">
                            <Lock className="w-3 h-3" /> Locked
                          </span>
                        )}
                      </div>
                      <h2
                        className="font-black text-white text-base leading-tight mb-1"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: unlocked ? "white" : "#6B7094",
                        }}
                      >
                        {world.title}
                      </h2>
                      <p className="text-xs text-[#AFAFAF] leading-snug mb-3">
                        {world.subtitle}
                      </p>

                      {/* Progress */}
                      {unlocked && totalQuests > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-[#AFAFAF]">{completedQuestsCount}/{totalQuests} quests</span>
                            <span style={{ color: world.color }}>{world.totalXP} XP total</span>
                          </div>
                          <div className="progress-bar-track" style={{ height: 6 }}>
                            <div
                              className="progress-bar-fill"
                              style={{ width: `${progressPct}%`, background: world.color }}
                            />
                          </div>
                        </div>
                      )}

                      {unlocked && totalQuests === 0 && (
                        <p className="text-[10px] text-[#6B7094] italic">Coming soon...</p>
                      )}
                    </div>

                    {/* Enter button */}
                    {unlocked && totalQuests > 0 && (
                      <Link
                        href={`/learn/${world.id}/${world.quests[0].id}`}
                        className="ml-3 flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl transition-all active:scale-95"
                        style={{ background: world.color }}
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Quest list (if world unlocked) */}
                {unlocked && totalQuests > 0 && (
                  <div className="ml-16 mt-2 space-y-1.5">
                    {world.quests.map((quest, qi) => {
                      const qp = questProgress[quest.id];
                      const questDone = qp?.completed || quest.lessons.every((l) => !!lessonProgress[l.id]?.completedAt);
                      const isBoss = quest.isBoss;

                      return (
                        <Link
                          key={quest.id}
                          href={`/learn/${world.id}/${quest.id}`}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-xl transition-all",
                            "bg-[#252640] border border-[#3A3D5C]",
                            questDone && "opacity-70"
                          )}
                        >
                          <span className="text-sm">
                            {questDone ? "✅" : isBoss ? "⚔️" : `${qi + 1}.`}
                          </span>
                          <span
                            className="text-xs font-bold flex-1 truncate"
                            style={{
                              fontFamily: "var(--font-display)",
                              color: questDone ? "#AFAFAF" : "white",
                            }}
                          >
                            {quest.title}
                          </span>
                          <span className="text-[10px] text-[#FFD700] font-bold flex-shrink-0">
                            {quest.totalXP} XP
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* NMA Gate */}
          <div className="ml-16 mt-4 card p-4 opacity-50">
            <div className="absolute left-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-[#2E3058]">
              🏆
            </div>
            <span className="text-xs font-bold text-[#6B7094] uppercase tracking-wider">Final Challenge</span>
            <h2 className="font-black text-[#6B7094] text-base" style={{ fontFamily: "var(--font-display)" }}>
              NMA Gate
            </h2>
            <p className="text-xs text-[#6B7094]">Complete all 5 worlds to unlock</p>
          </div>
        </div>
      </div>
    </div>
  );
}
