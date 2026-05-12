"use client";

import { useState, useRef, useEffect } from "react";
import type { FillQuestion } from "@/data/types";

interface FillCardProps {
  question: FillQuestion;
  onAnswer: (correct: boolean, qId: string) => void;
  onContinue: () => void;
  cardNumber: number;
  totalCards: number;
}

export function FillCard({ question, onAnswer, onContinue, cardNumber, totalCards }: FillCardProps) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!submitted) inputRef.current?.focus();
  }, [submitted]);

  const parts = question.codeTemplate.split("___");

  function handleSubmit() {
    if (!value.trim() || submitted) return;
    const isCorrect = value.trim() === question.answer;
    setCorrect(isCorrect);
    setSubmitted(true);
    onAnswer(isCorrect, question.id);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Counter */}
      <p style={{ fontSize: 11, color: "#5A5F80", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
        Question {cardNumber} of {totalCards}
      </p>

      {/* Prompt */}
      <div
        style={{
          background: "#1E2147",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14,
          padding: "16px 18px",
        }}
      >
        <p style={{ color: "#F2F1F8", fontWeight: 600, fontSize: 15, lineHeight: 1.65, margin: 0 }}>
          {question.prompt}
        </p>
      </div>

      {/* Code block */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="px-3 py-1.5 flex items-center gap-1.5"
          style={{ background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[10px] font-mono" style={{ color: "#5A5F80" }}>python</span>
        </div>
        <pre
          className="p-4 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap"
          style={{ color: "#e6edf3" }}
        >
          {parts[0]}
          <input
            ref={inputRef}
            type="text"
            value={submitted ? question.answer : value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={submitted}
            placeholder="???"
            className="font-mono text-sm px-2 py-0.5 rounded outline-none"
            style={{
              background: submitted
                ? correct
                  ? "rgba(110,231,168,0.15)"
                  : "rgba(255,92,92,0.15)"
                : "rgba(124,130,248,0.15)",
              border: submitted
                ? correct
                  ? "1px solid #6EE7A8"
                  : "1px solid #FF5C5C"
                : "1px solid #7C82F8",
              color: submitted
                ? correct
                  ? "#6EE7A8"
                  : "#FF5C5C"
                : "#A5A9FA",
              minWidth: `${Math.max(question.answer.length + 2, 4)}ch`,
              width: `${Math.max(value.length + 2, question.answer.length + 2, 4)}ch`,
            }}
          />
          {parts[1]}
        </pre>
      </div>

      {/* Feedback */}
      {submitted && (
        <div
          className="rounded-xl p-4 animate-fade-in"
          style={{
            background: correct ? "rgba(110,231,168,0.07)" : "rgba(255,92,92,0.07)",
            border: `1px solid ${correct ? "rgba(110,231,168,0.25)" : "rgba(255,92,92,0.25)"}`,
          }}
        >
          <p
            className="font-black text-sm mb-1"
            style={{ color: correct ? "#6EE7A8" : "#FF5C5C" }}
          >
            {correct ? "✓ Correct!" : `✗ The answer is: ${question.answer}`}
          </p>
          <p style={{ color: "#9EA3BD", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Buttons */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="w-full py-4 rounded-xl font-black text-base transition-all active:scale-95 disabled:opacity-40"
          style={{
            background: "#252850",
            border: "1px solid rgba(124,130,248,0.35)",
            color: "#A5A9FA",
            fontFamily: "var(--font-display)",
          }}
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-xl font-black text-base transition-all active:scale-95"
          style={{
            background: "#252850",
            border: `1px solid ${correct ? "rgba(110,231,168,0.3)" : "rgba(255,92,92,0.3)"}`,
            color: correct ? "#6EE7A8" : "#C5C7D8",
            fontFamily: "var(--font-display)",
          }}
        >
          Continue →
        </button>
      )}
    </div>
  );
}
