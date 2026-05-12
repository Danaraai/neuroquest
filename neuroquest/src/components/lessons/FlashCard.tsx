"use client";

import { useState } from "react";
import type { FlashCard as FlashCardType } from "@/data/types";
import { ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashCardProps {
  card: FlashCardType;
  onAnswer: (correct: boolean, cardId: string) => void;
  onContinue: () => void;
  cardNumber: number;
  totalCards: number;
}

export function FlashCard({ card, onAnswer, onContinue, cardNumber, totalCards }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);

  function handleFlip() {
    if (!answered) setFlipped(true);
  }

  function handleAnswer(correct: boolean) {
    setAnswered(true);
    onAnswer(correct, card.id);
    setTimeout(onContinue, 600);
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Card counter */}
      <div className="text-center mb-4">
        <span className="text-xs font-semibold" style={{ color: "#9EA3BD" }}>
          Card {cardNumber} of {totalCards}
        </span>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Front */}
        <div
          style={{
            background: "#1E2147",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: 24,
            marginBottom: 12,
            minHeight: 160,
            cursor: "pointer",
          }}
          onClick={handleFlip}
          className="active:scale-[0.98] transition-transform"
        >
          <div className="flex flex-col h-full">
            <span
              style={{
                fontSize: 10,
                color: "#9EA3BD",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 12,
                display: "block",
              }}
            >
              Question
            </span>
            <p
              style={{
                color: "#F2F1F8",
                fontWeight: 700,
                fontSize: 15,
                lineHeight: 1.65,
                flex: 1,
                margin: 0,
                fontFamily: "var(--font-display)",
              }}
            >
              {card.front}
            </p>
            {!flipped && (
              <div className="flex items-center gap-2 mt-4" style={{ color: "#9EA3BD" }}>
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs">Tap to reveal answer</span>
              </div>
            )}
          </div>
        </div>

        {/* Back */}
        {flipped && (
          <div
            className="rounded-2xl p-5 mb-5 animate-slide-up"
            style={{
              background: "#252850",
              border: "1px solid rgba(124,130,248,0.2)",
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#7C82F8",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 10,
                display: "block",
              }}
            >
              Answer
            </span>
            <pre
              style={{
                color: "#C5C7D8",
                fontSize: 14,
                lineHeight: 1.65,
                whiteSpace: "pre-wrap",
                margin: 0,
                fontFamily: "var(--font-display)",
              }}
            >
              {card.back}
            </pre>
          </div>
        )}

        {/* Self-assessment */}
        {flipped && !answered && (
          <div className="grid grid-cols-2 gap-3 animate-slide-up">
            <button
              onClick={() => handleAnswer(false)}
              className="flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm transition-all active:scale-95"
              style={{
                background: "rgba(255,92,92,0.10)",
                border: "1.5px solid #FF5C5C",
                color: "#FF5C5C",
                fontFamily: "var(--font-display)",
              }}
            >
              <ThumbsDown className="w-4 h-4" />
              Still learning
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm transition-all active:scale-95"
              style={{
                background: "rgba(110,231,168,0.10)",
                border: "1.5px solid #6EE7A8",
                color: "#6EE7A8",
                fontFamily: "var(--font-display)",
              }}
            >
              <ThumbsUp className="w-4 h-4" />
              Got it!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
