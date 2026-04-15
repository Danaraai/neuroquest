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

  // Split the code template around ___ so we can render an inline input
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
      <p className="text-xs text-[#6B7094] font-bold uppercase tracking-widest">
        Question {cardNumber} of {totalCards}
      </p>

      {/* Prompt */}
      <p className="text-white font-bold text-base leading-relaxed">
        {question.prompt}
      </p>

      {/* Code block with inline input */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#0d1117", border: "1px solid #30363d" }}
      >
        <div
          className="px-3 py-1.5 flex items-center gap-1.5"
          style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[10px] text-[#6B7094] font-mono">python</span>
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
                  ? "rgba(88,204,2,0.2)"
                  : "rgba(255,75,75,0.2)"
                : "rgba(28,176,246,0.15)",
              border: submitted
                ? correct
                  ? "1px solid #58CC02"
                  : "1px solid #FF4B4B"
                : "1px solid #1CB0F6",
              color: submitted
                ? correct
                  ? "#58CC02"
                  : "#FF4B4B"
                : "#1CB0F6",
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
            background: correct ? "rgba(88,204,2,0.1)" : "rgba(255,75,75,0.1)",
            border: `1px solid ${correct ? "#58CC02" : "#FF4B4B"}`,
          }}
        >
          <p
            className="font-black text-sm mb-1"
            style={{ color: correct ? "#58CC02" : "#FF4B4B" }}
          >
            {correct ? "✓ Correct!" : `✗ The answer is: ${question.answer}`}
          </p>
          <p className="text-[#AFAFAF] text-xs leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Buttons */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="w-full py-4 rounded-xl font-black text-white text-base transition-all active:scale-95 disabled:opacity-40"
          style={{
            background: "#1CB0F6",
            borderBottom: "4px solid #0e8bbf",
            fontFamily: "var(--font-display)",
          }}
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-xl font-black text-white text-base transition-all active:scale-95"
          style={{
            background: correct ? "#58CC02" : "#FF4B4B",
            borderBottom: `4px solid ${correct ? "#46A302" : "#cc3b3b"}`,
            fontFamily: "var(--font-display)",
          }}
        >
          Continue →
        </button>
      )}
    </div>
  );
}
