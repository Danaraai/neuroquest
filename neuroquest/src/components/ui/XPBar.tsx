"use client";

import { useStore } from "@/lib/store";
import { getXPProgress } from "@/data/types";
import { formatXP } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface XPBarProps {
  compact?: boolean;
  className?: string;
}

export function XPBar({ compact = false, className }: XPBarProps) {
  const { stats } = useStore();
  const { level, nextLevel, progress } = getXPProgress(stats.totalXP);

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {/* Streak */}
        <div className="flex items-center gap-1 bg-[#2E3058] rounded-full px-3 py-1">
          <Flame className="w-4 h-4 text-orange-400 animate-streak" />
          <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {stats.currentStreak}
          </span>
        </div>
        {/* XP */}
        <div className="flex items-center gap-1 bg-[#2E3058] rounded-full px-3 py-1">
          <span className="text-yellow-400 text-xs font-bold">⭐</span>
          <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {formatXP(stats.totalXP)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-xs font-bold text-[#AFAFAF] uppercase tracking-wide"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Lv {level.level} · {level.title}
        </span>
        <span className="text-xs font-semibold text-[#FFD700]">
          {formatXP(stats.totalXP)} XP
          {nextLevel && ` / ${formatXP(nextLevel.minXP)}`}
        </span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
