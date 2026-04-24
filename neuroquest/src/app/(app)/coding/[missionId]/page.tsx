"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft, Play, CheckCircle2, XCircle, Lightbulb,
  Loader2, Terminal, BookOpen
} from "lucide-react";
import { WORLDS } from "@/data/worlds";
import { useStore } from "@/lib/store";
import { Ilya } from "@/components/ilya/Ilya";
import { usePyodide, type RunResult } from "@/components/coding/PyodideRunner";
import type { CodingMission } from "@/data/types";
import { cn } from "@/lib/utils";

// Dynamic import of CodeMirror to avoid SSR issues
import dynamic from "next/dynamic";
const CodeMirrorEditor = dynamic(() => import("@/components/coding/CodeMirrorEditor"), { ssr: false });

// ─── Find mission across all worlds ───────────────────────────

function findMission(missionId: string): { mission: CodingMission; worldId: string; questId: string; lessonId: string } | null {
  for (const world of WORLDS) {
    for (const quest of world.quests) {
      for (const lesson of quest.lessons) {
        if (lesson.codingMission?.id === missionId || lesson.id === missionId) {
          if (lesson.codingMission) {
            return {
              mission: lesson.codingMission,
              worldId: world.id,
              questId: quest.id,
              lessonId: lesson.id,
            };
          }
        }
      }
    }
  }
  return null;
}

export default function CodingMissionPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params.missionId as string;

  const found = findMission(missionId);
  const { mission, worldId, questId, lessonId } = found ?? {};

  const { completeLesson } = useStore();
  const { ready, loading, load, run } = usePyodide();

  const [code, setCode] = useState(mission?.starterCode ?? "");
  const [output, setOutput] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState<number | null>(null);
  const [missionComplete, setMissionComplete] = useState(false);
  const [activePanel, setActivePanel] = useState<"instructions" | "output">("instructions");

  // Load Pyodide on mount
  useEffect(() => {
    load();
  }, [load]);

  if (!mission) {
    return (
      <div className="min-h-screen bg-[#1A1B2E] flex flex-col items-center justify-center px-4 text-center">
        <Ilya state="sad" size={80} className="mb-4" />
        <h2 className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Mission not found
        </h2>
        <Link href="/map" className="text-[#1CB0F6] text-sm font-bold">← Back to Map</Link>
      </div>
    );
  }

  async function handleRun() {
    setRunning(true);
    setActivePanel("output");

    const result = await run(code, mission!.testCode);
    setOutput(result);

    if (result.testPassed) {
      setMissionComplete(true);
      if (lessonId) {
        completeLesson(lessonId, 100, mission!.xpReward);
      }
    }

    setRunning(false);
  }

  return (
    <div className="min-h-screen bg-[#1A1B2E] flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
        style={{ background: "#1A1B2E", borderBottom: "1px solid #3A3D5C" }}
      >
        <button
          onClick={() => router.push(`/learn/${worldId}/${questId}`)}
          className="text-[#AFAFAF] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-[#1CB0F6] font-bold uppercase tracking-wider">
            💻 Coding Mission
          </p>
          <h1
            className="text-sm font-black text-white truncate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {mission.title}
          </h1>
        </div>
        <span className="text-xs text-[#FFD700] font-bold flex-shrink-0">
          +{mission.xpReward} XP
        </span>
      </div>

      {/* Pyodide loading banner */}
      {!ready && (
        <div
          className="px-4 py-2 flex items-center gap-2 text-xs"
          style={{ background: "#252640", borderBottom: "1px solid #3A3D5C" }}
        >
          <Loader2 className="w-3.5 h-3.5 text-[#1CB0F6] animate-spin" />
          <span className="text-[#AFAFAF]">
            {loading ? "Loading Python runtime (numpy, matplotlib)..." : "Click Run to start Python"}
          </span>
        </div>
      )}

      {/* Mission complete overlay */}
      {missionComplete && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6">
          <div
            className="rounded-2xl p-8 text-center max-w-sm w-full"
            style={{ background: "#252640", border: "2px solid #58CC02" }}
          >
            <Ilya state="celebrate" size={100} className="mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Mission Complete! 🎉
            </h2>
            <p className="text-[#AFAFAF] text-sm mb-2">All tests passed!</p>
            <p className="text-[#FFD700] font-black text-xl mb-6" style={{ fontFamily: "var(--font-display)" }}>
              +{mission.xpReward} XP
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push(`/learn/${worldId}/${questId}`)}
                className="w-full py-3 rounded-xl font-black text-white text-base"
                style={{
                  background: "#58CC02",
                  borderBottom: "4px solid #46A302",
                  fontFamily: "var(--font-display)",
                }}
              >
                Back to Quest →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main layout: side by side on wide, stacked on narrow */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* Left: Instructions / Output tabs */}
        <div className="lg:w-[42%] flex flex-col border-b lg:border-b-0 lg:border-r border-[#3A3D5C]">
          {/* Tabs */}
          <div className="flex border-b border-[#3A3D5C] flex-shrink-0">
            <button
              onClick={() => setActivePanel("instructions")}
              className={cn(
                "flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors",
                activePanel === "instructions" ? "text-white border-b-2 border-[#58CC02]" : "text-[#6B7094]"
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Instructions
            </button>
            <button
              onClick={() => setActivePanel("output")}
              className={cn(
                "flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors",
                activePanel === "output" ? "text-white border-b-2 border-[#1CB0F6]" : "text-[#6B7094]"
              )}
            >
              <Terminal className="w-3.5 h-3.5" />
              Output
              {output?.testPassed === false && (
                <span className="w-2 h-2 rounded-full bg-[#FF4B4B]" />
              )}
              {output?.testPassed === true && (
                <span className="w-2 h-2 rounded-full bg-[#58CC02]" />
              )}
            </button>
          </div>

          {/* Instructions panel */}
          {activePanel === "instructions" && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="prose prose-invert text-sm">
                <pre
                  className="whitespace-pre-wrap text-[#AFAFAF] text-xs leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {mission.description}
                </pre>
              </div>

              {/* Hints */}
              {mission.hints.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-[10px] text-[#AFAFAF] font-bold uppercase tracking-wider mb-2">
                    Hints (only if you're stuck!)
                  </p>
                  {mission.hints.map((hint, i) => (
                    <div key={i}>
                      <button
                        onClick={() => setShowHint(showHint === i ? null : i)}
                        className="w-full text-left flex items-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          background: showHint === i ? "rgba(255,193,7,0.1)" : "#252640",
                          border: `1px solid ${showHint === i ? "#FFD700" : "#3A3D5C"}`,
                          color: showHint === i ? "#FFD700" : "#AFAFAF",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" />
                        Hint {i + 1} {showHint !== i ? "(tap to reveal)" : ""}
                      </button>
                      {showHint === i && (
                        <p className="text-xs text-[#AFAFAF] mt-1.5 px-3 animate-slide-up leading-relaxed">
                          {hint}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Output panel */}
          {activePanel === "output" && (
            <div className="flex-1 overflow-y-auto p-4">
              {!output && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3 opacity-50">
                  <Terminal className="w-8 h-8 text-[#AFAFAF]" />
                  <p className="text-xs text-[#AFAFAF]">
                    Click Run to execute your code
                  </p>
                </div>
              )}

              {output && (
                <div className="space-y-3 animate-slide-up">
                  {/* Test result */}
                  {output.testPassed !== undefined && (
                    <div
                      className="flex items-start gap-2 p-3 rounded-xl text-xs"
                      style={{
                        background: output.testPassed ? "rgba(88,204,2,0.1)" : "rgba(255,75,75,0.1)",
                        border: `1px solid ${output.testPassed ? "#58CC02" : "#FF4B4B"}`,
                      }}
                    >
                      {output.testPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#58CC02] flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#FF4B4B] flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p
                          className="font-black mb-1"
                          style={{
                            color: output.testPassed ? "#58CC02" : "#FF4B4B",
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          {output.testPassed ? "All tests passed! ✨" : "Tests not passing yet"}
                        </p>
                        {output.stderr && (
                          <p className="text-[#FF4B4B] font-mono text-[11px]">{output.stderr}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* stdout / plot output */}
                  {output.stdout && output.stdout !== "(no output)" && (
                    <div
                      className="p-3 rounded-xl text-[12px] text-[#E0E0E0] overflow-auto"
                      style={{ background: "#0D0E1A", maxHeight: "400px" }}
                      dangerouslySetInnerHTML={{
                        __html: `<style>img{max-width:100%!important;height:auto!important}</style>${output.stdout}`,
                      }}
                    />
                  )}

                  {/* Runtime error (code crashed) */}
                  {!output.success && output.stderr && (
                    <div
                      className="p-3 rounded-xl font-mono text-[12px] text-[#FF6B6B] whitespace-pre-wrap"
                      style={{ background: "rgba(255,75,75,0.08)", border: "1px solid #FF4B4B" }}
                    >
                      ❌ Error: {output.stderr}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Code editor */}
        <div className="flex-1 flex flex-col min-h-[400px]">
          <div
            className="px-3 py-2 flex items-center justify-between flex-shrink-0"
            style={{ background: "#0D0E1A", borderBottom: "1px solid #3A3D5C" }}
          >
            <span className="text-[10px] text-[#6B7094] font-mono">solution.py</span>
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "text-[10px] font-bold",
                  ready ? "text-[#58CC02]" : "text-[#AFAFAF]"
                )}
              >
                {ready ? "● Python ready" : "● Loading..."}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <CodeMirrorEditor
              value={code}
              onChange={setCode}
            />
          </div>

          {/* Run button */}
          <div
            className="p-3 flex-shrink-0"
            style={{ background: "#0D0E1A", borderTop: "1px solid #3A3D5C" }}
          >
            <button
              onClick={handleRun}
              disabled={running}
              className={cn(
                "w-full py-3 rounded-xl font-black text-white text-sm flex items-center justify-center gap-2 transition-all active:scale-95",
                running ? "opacity-60 cursor-wait" : "hover:opacity-90"
              )}
              style={{
                background: running ? "#252640" : "#58CC02",
                borderBottom: running ? "3px solid #3A3D5C" : "4px solid #46A302",
                fontFamily: "var(--font-display)",
              }}
            >
              {running ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" fill="white" />
                  Run Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
