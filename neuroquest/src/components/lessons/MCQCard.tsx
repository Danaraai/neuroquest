"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
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
    if ("vibrate" in navigator) {
      navigator.vibrate(correct ? [50] : [100, 50, 100]);
    }
  }

  const OPTION_LABELS = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Question card */}
      <div
        style={{
          background: "#1E2147",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: "20px 20px 18px",
          marginBottom: 16,
        }}
      >
        <pre
          style={{
            margin: 0,
            color: "#F2F1F8",
            fontSize: 15,
            fontWeight: 600,
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            fontFamily: "var(--font-display)",
          }}
        >
          {question.text}
        </pre>
      </div>

      {/* Options */}
      <div className="flex-1">
        <div className="space-y-2.5">
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
                    "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors",
                    optionState === "correct" && "bg-[#6EE7A8] text-[#0D1020]",
                    optionState === "wrong" && "bg-[#FF5C5C] text-white",
                    !optionState && "bg-[rgba(255,255,255,0.07)] text-[#9EA3BD]"
                  )}
                >
                  {optionState === "correct" ? "✓" : optionState === "wrong" ? "✗" : OPTION_LABELS[i]}
                </span>
                <span className="flex-1 text-sm leading-snug break-words" style={{ color: "#C5C7D8" }}>
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
          className="mt-5 rounded-2xl p-4 animate-slide-up"
          style={{
            background: state === "correct" ? "rgba(110,231,168,0.07)" : "rgba(255,92,92,0.07)",
            border: `1px solid ${state === "correct" ? "rgba(110,231,168,0.25)" : "rgba(255,92,92,0.25)"}`,
          }}
        >
          <div className="flex items-start gap-3 mb-3">
            <Ilya
              state={state === "correct" ? "correct" : "wrong"}
              size={44}
              className="flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                {state === "correct" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#6EE7A8]" />
                    <span
                      className="font-black text-sm"
                      style={{ color: "#6EE7A8", fontFamily: "var(--font-display)" }}
                    >
                      Correct! ✨
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-[#FF5C5C]" />
                    <span
                      className="font-black text-sm"
                      style={{ color: "#FF5C5C", fontFamily: "var(--font-display)" }}
                    >
                      Not quite!
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#9EA3BD" }}>{question.explanation}</p>
              {question.neuroConnection && (
                <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#6EE7A8" }}>
                  🧠 {question.neuroConnection}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onContinue}
            className="w-full py-3 rounded-xl font-black text-sm transition-all active:scale-95"
            style={{
              background: "#252850",
              color: state === "correct" ? "#6EE7A8" : "#C5C7D8",
              border: "1px solid rgba(255,255,255,0.09)",
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
