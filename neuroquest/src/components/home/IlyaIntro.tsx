"use client";

import { useState, useEffect, useCallback } from "react";
import { Ilya } from "@/components/ilya/Ilya";
import { NeuronCanvas } from "@/components/ui/NeuronCanvas";

const ACCENT = "#00DCFF";
const STORAGE_KEY = "nq-intro-seen";

const PATHS = [
  {
    id: "computational",
    icon: "🔬",
    color: "#4ECDC4",
    title: "Computational Neuroscientist",
    tag: "For NMA prep",
    desc: "The serious path. Learn Python, master the math, understand statistics, then dive into real computational neuroscience.",
    route: "NeuroBasics → Python → Math → Stats → Neuro Jungle → Computation Caves",
  },
  {
    id: "explorer",
    icon: "🧠",
    color: "#6BCF7F",
    title: "Brain Explorer",
    tag: "Lighter path",
    desc: "Discover how neurons fire, how the brain thinks, and what makes us human — no coding needed.",
    route: "NeuroBasics → Neuro Jungle",
  },
  {
    id: "ai",
    icon: "⚡",
    color: "#F59E0B",
    title: "Brain & AI",
    tag: "Hot topic",
    desc: "Learn how real neurons inspired artificial neural networks, and why understanding the brain unlocks the future of AI.",
    route: "NeuroBasics → Neuro Jungle → Neural Networks (coming soon)",
  },
];

const WORLDS_PREVIEW = [
  { name: "NeuroBasics",       icon: "🧬", color: "#F472B6", desc: "What is a brain? Neurons, synapses, the basics" },
  { name: "Python Village",    icon: "🏘️", color: "#FF8C42", desc: "Code your first neurons in Python" },
  { name: "Math Mountains",    icon: "⛰️", color: "#4ECDC4", desc: "Vectors, matrices & calculus intuition" },
  { name: "Stats Swamps",      icon: "🌿", color: "#95E1D3", desc: "Probability, distributions & randomness" },
  { name: "Neuro Jungle",      icon: "🌴", color: "#6BCF7F", desc: "Action potentials, brain signals, real neurons" },
  { name: "Computation Caves", icon: "🪨", color: "#9B59FF", desc: "Build a spiking neuron model" },
];

export function IlyaIntro() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setVisible(true);
    }
  }, []);

  // Auto-advance step 0 → 1
  useEffect(() => {
    if (!visible || step !== 0) return;
    const t = setTimeout(() => setStep(1), 2200);
    return () => clearTimeout(t);
  }, [visible, step]);

  const advance = useCallback(() => setStep((s) => Math.min(s + 1, 3)), []);

  const finish = useCallback(() => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }, []);

  const togglePath = (id: string) => {
    setSelectedPaths((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#040610" }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 55 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              width: (i % 3) + 1,
              height: (i % 3) + 1,
              background: "white",
              opacity: 0.06 + (i % 5) * 0.03,
              animation: `float ${2 + (i % 3)}s ease-in-out ${(i % 4) * 0.8}s infinite`,
            }}
          />
        ))}
      </div>
      <NeuronCanvas width={800} height={900} density={0.3} color={ACCENT} />

      {/* Step dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-[6px] z-10 pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: i === step ? 20 : 6,
              height: 6,
              borderRadius: 99,
              background: i === step ? ACCENT : "rgba(255,255,255,0.12)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>

      {/* ── STEP 0: Ilya runs in ── */}
      {step === 0 && (
        <div className="flex items-center justify-center">
          <div className="animate-approach">
            <div className="animate-run-bob">
              <Ilya state="run" size={140} />
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 1: Ilya greets ── */}
      {step === 1 && (
        <div className="flex flex-col items-center justify-center gap-5 px-8 max-w-sm w-full text-center">
          <div className="animate-pop-in">
            <Ilya state="celebrate" size={150} />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-[28px] font-black leading-tight mb-2" style={{ color: "#F0F0FF", fontFamily: "var(--font-display)" }}>
              Hi! I'm <span style={{ color: ACCENT }}>Ilya</span>, your Neuro Guide! 🦌
            </div>
            <div className="text-[14px] leading-relaxed" style={{ color: "#8890C0" }}>
              I'll be your partner and companion on this journey of learning neuroscience.<br />
              <span className="font-semibold" style={{ color: "#C0C4E8" }}>Welcome to NeuroQuest.</span>
            </div>
          </div>
          <div
            className="animate-fade-up rounded-2xl px-[18px] py-[14px] text-center"
            style={{ animationDelay: "0.4s", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-[13px] leading-relaxed m-0" style={{ color: "#A0A8D0" }}>
              Your brain is the most powerful computer on Earth — and you're about to learn exactly how it works. 🧠✨
            </p>
          </div>
          <div className="animate-fade-up w-full" style={{ animationDelay: "0.6s" }}>
            <ContinueBtn label="Let's go! →" onClick={advance} />
          </div>
        </div>
      )}

      {/* ── STEP 2: Path selection ── */}
      {step === 2 && (
        <div className="flex flex-col w-full max-w-sm px-6 overflow-y-auto" style={{ maxHeight: "90vh" }}>
          <div className="animate-fade-up text-center mb-5">
            <div className="text-[13px] font-bold mb-1 uppercase tracking-[1.5px]" style={{ color: ACCENT }}>
              Choose Your Path
            </div>
            <div className="text-[21px] font-black leading-tight" style={{ color: "#F0F0FF", fontFamily: "var(--font-display)" }}>
              What kind of explorer are you?
            </div>
            <div className="text-[12px] mt-2 leading-relaxed" style={{ color: "#5A6090" }}>
              Pick one or more — you're not locked in.
            </div>
          </div>

          <div className="flex flex-col gap-[10px] mb-4">
            {PATHS.map((p, i) => {
              const selected = selectedPaths.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => togglePath(p.id)}
                  className="animate-world-enter rounded-2xl p-[14px] cursor-pointer transition-all"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    background: selected ? `${p.color}18` : "rgba(255,255,255,0.02)",
                    border: `2px solid ${selected ? p.color : p.color + "28"}`,
                  }}
                >
                  <div className="flex items-center gap-[10px] mb-[6px]">
                    <div
                      className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${p.color}1A` }}
                    >
                      {p.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-black" style={{ color: "#F0F0FF", fontFamily: "var(--font-display)" }}>
                          {p.title}
                        </span>
                        <span
                          className="text-[10px] font-bold px-[7px] py-[2px] rounded-full"
                          style={{ color: p.color, background: `${p.color}18` }}
                        >
                          {p.tag}
                        </span>
                      </div>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ border: `2px solid ${selected ? p.color : "rgba(255,255,255,0.15)"}`, background: selected ? p.color : "transparent" }}
                    >
                      {selected && <span className="text-[11px] font-black" style={{ color: "#080A18" }}>✓</span>}
                    </div>
                  </div>
                  <div className="text-[12px] leading-relaxed mb-2" style={{ color: "#7A80A8" }}>{p.desc}</div>
                  <div className="text-[10px] font-bold opacity-70" style={{ color: p.color }}>📍 {p.route}</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <ContinueBtn label={selectedPaths.length > 0 ? "Start exploring! →" : "Continue anyway →"} onClick={advance} />
            <button
              onClick={advance}
              className="text-[11px] font-semibold bg-transparent border-none cursor-pointer"
              style={{ color: "#4A4E78" }}
            >
              Skip — show me all worlds
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: World map + CTA ── */}
      {step === 3 && (
        <div className="flex flex-col w-full max-w-sm px-6" style={{ maxHeight: "90vh" }}>
          <div className="animate-fade-up flex items-center gap-3 mb-4">
            <Ilya state="idle" size={52} />
            <div>
              <div className="text-[13px] font-bold uppercase tracking-[1px]" style={{ color: ACCENT }}>Your Adventure</div>
              <div className="text-[20px] font-black" style={{ color: "#F0F0FF", fontFamily: "var(--font-display)" }}>
                5 Worlds to Discover
              </div>
              <div className="text-[12px] mt-0.5" style={{ color: "#6A70A0" }}>Start anywhere. Follow the path or forge your own.</div>
            </div>
          </div>

          <div className="flex flex-col gap-[9px] overflow-y-auto mb-4 flex-1">
            {WORLDS_PREVIEW.map((w, i) => (
              <div
                key={w.name}
                className="flex items-center gap-3 rounded-2xl px-[14px] py-3 relative animate-world-enter"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  background: `${w.color}0D`,
                  border: `1px solid ${w.color}30`,
                }}
              >
                {i < WORLDS_PREVIEW.length - 1 && (
                  <div
                    className="absolute left-[25px]"
                    style={{ bottom: -10, width: 2, height: 10, background: `${w.color}33` }}
                  />
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${w.color}1A`, border: `1px solid ${w.color}40` }}
                >
                  {w.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-black" style={{ color: "#F0F0FF", fontFamily: "var(--font-display)" }}>{w.name}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: "#5A6090" }}>{w.desc}</div>
                </div>
                <div
                  className="w-[7px] h-[7px] rounded-full animate-float"
                  style={{ background: w.color, boxShadow: `0 0 8px ${w.color}`, animationDelay: `${i * 0.3}s` }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[10px] mb-6 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <ContinueBtn label="Start my journey! 🚀" onClick={finish} />
            <button
              onClick={finish}
              className="text-[13px] font-bold cursor-pointer px-4 py-3 rounded-2xl"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#6A70A0", fontFamily: "var(--font-display)" }}
            >
              See the World Map first
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ContinueBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-[15px] px-8 rounded-2xl text-[15px] font-black cursor-pointer border-none"
      style={{
        background: `linear-gradient(135deg, ${ACCENT}, #58CC02)`,
        color: "#080A18",
        fontFamily: "var(--font-display)",
        boxShadow: `0 4px 24px ${ACCENT}44`,
      }}
    >
      {label}
    </button>
  );
}
