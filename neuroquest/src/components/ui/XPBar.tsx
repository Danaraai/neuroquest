"use client";

import { useStore } from "@/lib/store";
import { getXPProgress } from "@/data/types";
import { formatXP } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface XPBarProps {
  compact?: boolean;
  className?: string;
  accentColor?: string;
}

export function XPBar({ compact = false, className, accentColor = "#7C82F8" }: XPBarProps) {
  const { stats } = useStore();
  const { level, nextLevel, progress } = getXPProgress(stats.totalXP);

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {/* Streak */}
        <div className="flex items-center gap-1 bg-[#252850] rounded-full px-3 py-1">
          <Flame className="w-4 h-4 text-orange-400 animate-streak" />
          <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {stats.currentStreak}
          </span>
        </div>
        {/* XP */}
        <div className="flex items-center gap-1 bg-[#252850] rounded-full px-3 py-1">
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
      <div className="flex items-center justify-between mb-[5px]">
        <span
          className="text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: "#5A5E8A", fontFamily: "var(--font-display)" }}
        >
          LV {level.level} · {level.title}
        </span>
        <span className="text-[11px] font-semibold" style={{ color: "#5A5E8A" }}>
          {formatXP(stats.totalXP)} / {nextLevel ? formatXP(nextLevel.minXP) : "MAX"} XP
        </span>
      </div>
      <div className="h-[5px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(progress * 100, 100)}%`,
            background: `linear-gradient(90deg, ${accentColor}, #6EE7A8)`,
          }}
        />
      </div>
    </div>
  );
}
