"use client";

import { cn } from "@/lib/utils";

export type IlyaState = "idle" | "correct" | "wrong" | "celebrate" | "thinking" | "sad";

interface IlyaProps {
  state?: IlyaState;
  size?: number;
  className?: string;
}

export function Ilya({ state = "idle", size = 80, className }: IlyaProps) {
  const animClass = {
    idle:      "animate-float",
    correct:   "animate-bounce-in",
    wrong:     "animate-shake",
    celebrate: "animate-bounce-in",
    thinking:  "animate-float",
    sad:       "",
  }[state];

  return (
    <div
      className={cn("inline-flex items-center justify-center", animClass, className)}
      style={{ width: size, height: size }}
      aria-label="Ilya the deer"
    >
      <svg
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        {/* ── Antlers ── */}
        {/* Left antler */}
        <path d="M42 35 L28 10 M28 10 L18 2 M28 10 L22 20" stroke="#C8A96E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38 30 L30 18 M30 18 L24 12" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Right antler */}
        <path d="M78 35 L92 10 M92 10 L102 2 M92 10 L98 20" stroke="#C8A96E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M82 30 L90 18 M90 18 L96 12" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round"/>

        {/* ── Golden stars on antlers (celebrate state) ── */}
        {state === "celebrate" && (
          <>
            <circle cx="18" cy="2" r="3" fill="#FFD700" opacity="0.9"/>
            <circle cx="102" cy="2" r="3" fill="#FFD700" opacity="0.9"/>
            <circle cx="24" cy="12" r="2" fill="#FFD700" opacity="0.8"/>
            <circle cx="96" cy="12" r="2" fill="#FFD700" opacity="0.8"/>
          </>
        )}

        {/* ── Head ── */}
        <ellipse cx="60" cy="52" rx="26" ry="24" fill="#F5F0E8"/>
        {/* Ear left */}
        <ellipse cx="36" cy="42" rx="7" ry="10" fill="#F5F0E8" transform="rotate(-15 36 42)"/>
        <ellipse cx="36" cy="42" rx="4" ry="6" fill="#E8C4B8" transform="rotate(-15 36 42)"/>
        {/* Ear right */}
        <ellipse cx="84" cy="42" rx="7" ry="10" fill="#F5F0E8" transform="rotate(15 84 42)"/>
        <ellipse cx="84" cy="42" rx="4" ry="6" fill="#E8C4B8" transform="rotate(15 84 42)"/>

        {/* ── Eyes ── */}
        {state === "wrong" || state === "sad" ? (
          // Sad eyes
          <>
            <ellipse cx="50" cy="50" rx="5" ry="5" fill="#2D2D4E"/>
            <ellipse cx="70" cy="50" rx="5" ry="5" fill="#2D2D4E"/>
            {/* Sad lines */}
            <path d="M46 47 L50 44 L54 47" stroke="#2D2D4E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M66 47 L70 44 L74 47" stroke="#2D2D4E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </>
        ) : state === "correct" || state === "celebrate" ? (
          // Happy squint eyes
          <>
            <path d="M45 50 Q50 45 55 50" stroke="#2D2D4E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M65 50 Q70 45 75 50" stroke="#2D2D4E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            {/* Star sparkles */}
            <circle cx="44" cy="45" r="2" fill="#FFD700"/>
            <circle cx="76" cy="45" r="2" fill="#FFD700"/>
          </>
        ) : (
          // Normal eyes
          <>
            <ellipse cx="50" cy="50" rx="5" ry="5.5" fill="#2D2D4E"/>
            <ellipse cx="70" cy="50" rx="5" ry="5.5" fill="#2D2D4E"/>
            {/* Eye shine */}
            <circle cx="52" cy="48" r="1.5" fill="white"/>
            <circle cx="72" cy="48" r="1.5" fill="white"/>
          </>
        )}

        {/* ── Nose ── */}
        <ellipse cx="60" cy="62" rx="8" ry="6" fill="#E8A898"/>
        <circle cx="57" cy="61" r="1.5" fill="white" opacity="0.6"/>

        {/* ── Mouth ── */}
        {state === "wrong" || state === "sad" ? (
          <path d="M54 68 Q60 65 66 68" stroke="#C47868" strokeWidth="2" strokeLinecap="round" fill="none"/>
        ) : (
          <path d="M54 67 Q60 72 66 67" stroke="#C47868" strokeWidth="2" strokeLinecap="round" fill="none"/>
        )}

        {/* ── Body ── */}
        <ellipse cx="60" cy="105" rx="22" ry="28" fill="#F5F0E8"/>

        {/* ── Chest patch ── */}
        <ellipse cx="60" cy="100" rx="12" ry="16" fill="#EDE8DC"/>

        {/* ── Legs ── */}
        <rect x="44" y="124" width="9" height="14" rx="4" fill="#F5F0E8"/>
        <rect x="67" y="124" width="9" height="14" rx="4" fill="#F5F0E8"/>
        {/* Hooves */}
        <ellipse cx="48.5" cy="138" rx="5" ry="3" fill="#C8A96E"/>
        <ellipse cx="71.5" cy="138" rx="5" ry="3" fill="#C8A96E"/>

        {/* ── Spots (cute detail) ── */}
        <circle cx="52" cy="95" r="3" fill="#EDE0D0" opacity="0.7"/>
        <circle cx="68" cy="98" r="2.5" fill="#EDE0D0" opacity="0.7"/>
        <circle cx="58" cy="108" r="2" fill="#EDE0D0" opacity="0.6"/>

        {/* ── Tail ── */}
        <ellipse cx="82" cy="100" rx="6" ry="8" fill="white" opacity="0.9"/>

        {/* ── Thinking bubble ── */}
        {state === "thinking" && (
          <>
            <circle cx="90" cy="40" r="12" fill="#2E3058" opacity="0.95"/>
            <circle cx="85" cy="50" r="4" fill="#2E3058" opacity="0.7"/>
            <circle cx="82" cy="57" r="2.5" fill="#2E3058" opacity="0.5"/>
            <text x="90" y="44" textAnchor="middle" fontSize="10" fill="#AFAFAF">...</text>
          </>
        )}
      </svg>
    </div>
  );
}

// ─── Ilya with speech bubble ──────────────────────────────────

interface IlyaBubbleProps {
  message: string;
  state?: IlyaState;
  size?: number;
  className?: string;
}

export function IlyaBubble({ message, state = "idle", size = 64, className }: IlyaBubbleProps) {
  return (
    <div className={cn("flex items-end gap-2", className)}>
      <Ilya state={state} size={size} />
      <div
        className="relative bg-[#2E3058] rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs"
        style={{ borderBottom: "3px solid rgba(0,0,0,0.3)" }}
      >
        <p className="text-sm font-semibold text-white leading-snug" style={{ fontFamily: "var(--font-display)" }}>
          {message}
        </p>
      </div>
    </div>
  );
}
