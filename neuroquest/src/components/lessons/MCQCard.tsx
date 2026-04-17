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
          className="text-white text-[15px] font-semibold leading-relaxed whitespace-pre-wrap mb-6"
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
                    optionState === "correct" && "bg-[#58CC02] text-white",
                    optionState === "wrong" && "bg-[#FF4B4B] text-white",
                    !optionState && "bg-[#3A3D5C] text-[#AFAFAF]"
                  )}
                >
                  {optionState === "correct" ? "✓" : optionState === "wrong" ? "✗" : OPTION_LABELS[i]}
                </span>
                <pre className="flex-1 text-sm leading-snug whitespace-pre-wrap break-words bg-[#252640] rounded-lg p-3 font-mono text-[#AFAFAF]">
                  {option}
                </pre>
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
              ? "bg-[rgba(88,204,2,0.12)] border border-[#58CC02]/30"
              : "bg-[rgba(255,75,75,0.12)] border border-[#FF4B4B]/30"
          )}
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
              <p className="text-xs text-[#AFAFAF] leading-relaxed">{question.explanation}</p>
              {question.neuroConnection && (
                <p className="text-xs text-[#1CB0F6] mt-1.5 leading-relaxed">
                  🧠 {question.neuroConnection}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onContinue}
            className={cn(
              "w-full py-3 rounded-xl font-black text-sm text-white transition-all active:scale-95",
              state === "correct" ? "bg-[#58CC02] hover:bg-[#46A302]" : "bg-[#1CB0F6] hover:bg-[#0E98D9]"
            )}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {state === "correct" ? "Continue →" : "Got it →"}
          </button>
        </div>
      )}
    </div>
  );
}
