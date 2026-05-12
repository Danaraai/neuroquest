"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import type { MCQQuestion } from "@/data/types";
import { Ilya } from "@/components/ilya/Ilya";
import { cn } from "@/lib/utils";

interface MCQCardProps {
  question: MCQQuestion;
  onAnswer: (correct: boolean, questionId: string) => void;
  onContinue: () => void;
}

type AnswerState = "unanswered" | "correct" | "wrong";

export function MCQCard({ question, onAnswer, onContinue }: MCQCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [state, setState] = useState<AnswerState>("unanswered");

  function handleSelect(index: number) {
    if (state !== "unanswered") return;
    setSelected(index);
    const correct = index === question.correctIndex;
    setState(correct ? "correct" : "wrong");
    onAnswer(correct, question.id);
    // Haptic feedback on mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(correct ? [50] : [100, 50, 100]);
    }
  }

  const OPTION_LABELS = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Question */}
      <div className="flex-1">
        <pre
          className="text-[#E8E8FF] text-[15px] font-semibold leading-relaxed whitespace-pre-wrap mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {question.text}
        </pre>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, i) => {
            let optionState = "";
            if (state !== "unanswered") {
              if (i === question.correctIndex) optionState = "correct";
              else if (i === selected) optionState = "wrong";
              else optionState = "disabled";
            }

            return (
              <button
                key={i}
                className={cn("answer-option", optionState)}
                onClick={() => handleSelect(i)}
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors",
                    optionState === "correct" && "bg-[#58CC02] text-[#E8E8FF]",
                    optionState === "wrong" && "bg-[#FF4B4B] text-[#E8E8FF]",
                    !optionState && "bg-[rgba(255,255,255,0.10)] text-[#AFAFAF]"
                  )}
                >
                  {optionState === "correct" ? "✓" : optionState === "wrong" ? "✗" : OPTION_LABELS[i]}
                </span>
                <span className="flex-1 text-sm leading-snug break-words" style={{ color: "#D0D4F0" }}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result panel */}
      {state !== "unanswered" && (
        <div
          className={cn(
            "mt-6 rounded-2xl p-4 animate-slide-up",
            state === "correct"
              ? "border"
              : "border"
          )}
          style={{
            background: state === "correct" ? "rgba(111,175,122,0.08)" : "rgba(224,85,85,0.08)",
            borderColor: state === "correct" ? "#4F8F6A55" : "#E0555555",
          }}
        >
          <div className="flex items-start gap-3 mb-3">
            <Ilya
              state={state === "correct" ? "correct" : "wrong"}
              size={48}
              className="flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                {state === "correct" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#58CC02]" />
                    <span
                      className="text-[#58CC02] font-black text-sm"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Correct! ✨
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-[#FF4B4B]" />
                    <span
                      className="text-[#FF4B4B] font-black text-sm"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Not quite!
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#7E849D" }}>{question.explanation}</p>
              {question.neuroConnection && (
                <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#6FAF7A" }}>
                  🧠 {question.neuroConnection}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onContinue}
            className="w-full py-3 rounded-xl font-black text-sm transition-all active:scale-95"
            style={{
              background: state === "correct" ? "#1A2E22" : "#111827",
              color: state === "correct" ? "#8FCC9A" : "#AEB2C8",
              border: `1px solid ${state === "correct" ? "#4F8F6A44" : "rgba(255,255,255,0.08)"}`,
              fontFamily: "var(--font-display)",
            }}
          >
            {state === "correct" ? "Continue →" : "Got it →"}
          </button>
        </div>
      )}
    </div>
  );
}
