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
    // Small delay then continue
    setTimeout(onContinue, 600);
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Card counter */}
      <div className="text-center mb-4">
        <span className="text-xs text-[#AFAFAF] font-semibold">
          Card {cardNumber} of {totalCards}
        </span>
      </div>

      {/* The flashcard */}
      <div className="flex-1 flex flex-col">
        {/* Front */}
        <div
          className="card p-6 mb-4 cursor-pointer active:scale-[0.98] transition-transform"
          onClick={handleFlip}
          style={{ minHeight: 180 }}
        >
          <div className="flex flex-col h-full">
            <span className="text-[10px] text-[#AFAFAF] font-bold uppercase tracking-widest mb-3">
              Question
            </span>
            <p
              className="text-white font-bold text-base leading-relaxed flex-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {card.front}
            </p>
            {!flipped && (
              <div className="flex items-center gap-2 mt-4 text-[#AFAFAF]">
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs">Tap to reveal answer</span>
              </div>
            )}
          </div>
        </div>

        {/* Back (revealed on flip) */}
        {flipped && (
          <div
            className="rounded-xl p-6 mb-6 animate-slide-up"
            style={{
              background: "linear-gradient(135deg, #1E2040, #252640)",
              border: "1px solid #3A3D5C",
            }}
          >
            <span className="text-[10px] text-[#58CC02] font-bold uppercase tracking-widest mb-3 block">
              Answer
            </span>
            <pre
              className="text-white text-sm leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {card.back}
            </pre>
          </div>
        )}

        {/* Self-assessment buttons */}
        {flipped && !answered && (
          <div className="grid grid-cols-2 gap-3 animate-slide-up">
            <button
              onClick={() => handleAnswer(false)}
              className="flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm transition-all active:scale-95"
              style={{
                background: "rgba(255, 75, 75, 0.15)",
                border: "2px solid #FF4B4B",
                color: "#FF4B4B",
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
                background: "rgba(88, 204, 2, 0.15)",
                border: "2px solid #58CC02",
                color: "#58CC02",
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
