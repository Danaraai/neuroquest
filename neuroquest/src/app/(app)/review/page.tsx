"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getDueCards } from "@/lib/sr";
import { getAllSRCards } from "@/data/worlds";
import { Ilya } from "@/components/ilya/Ilya";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type CardState = "question" | "answer" | "done";

interface ReviewCard {
  cardId: string;
  front: string;
  back: string;
}

export default function ReviewPage() {
  const { srCards, recordAnswer } = useStore();
  const [queue, setQueue] = useState<ReviewCard[]>([]);
  const [index, setIndex] = useState(0);
  const [cardState, setCardState] = useState<CardState>("question");
  const [results, setResults] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });
  const [sessionDone, setSessionDone] = useState(false);

  useEffect(() => {
    const dueCardIds = getDueCards(srCards).map((c) => c.cardId);
    const allCards = getAllSRCards();
    const dueCards = allCards.filter((c) => dueCardIds.includes(c.cardId));
    // Shuffle
    const shuffled = [...dueCards].sort(() => Math.random() - 0.5);
    setQueue(shuffled.slice(0, 20)); // Max 20 per session
  }, []);

  const currentCard = queue[index];
  const totalCards = queue.length;

  function handleReveal() { setCardState("answer"); }

  function handleAnswer(correct: boolean) {
    recordAnswer(currentCard.cardId, correct);
    setResults((r) => ({
      correct: r.correct + (correct ? 1 : 0),
      wrong: r.wrong + (correct ? 0 : 1),
    }));

    if (index < totalCards - 1) {
      setIndex((i) => i + 1);
      setCardState("question");
    } else {
      setSessionDone(true);
    }
  }

  if (queue.length === 0 && !sessionDone) {
    return (
      <div className="min-h-screen bg-[#1A1B2E] flex flex-col items-center justify-center px-4 text-center">
        <Ilya state="celebrate" size={100} className="mb-6" />
        <h1 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
          You&apos;re all caught up! 🎉
        </h1>
        <p className="text-[#AFAFAF] text-sm mb-8 max-w-xs">
          No cards due for review. Come back tomorrow — Ilya will have a fresh queue ready!
        </p>
        <Link
          href="/home"
          className="btn-primary"
          style={{ maxWidth: 220, display: "block", textAlign: "center", fontFamily: "var(--font-display)" }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (sessionDone) {
    const accuracy = Math.round((results.correct / totalCards) * 100);
    return (
      <div className="min-h-screen bg-[#1A1B2E] flex flex-col items-center justify-center px-4 text-center">
        <Ilya state={accuracy >= 80 ? "celebrate" : "idle"} size={100} className="mb-6" />
        <h1 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Review Complete!
        </h1>
        <p className="text-[#AFAFAF] text-sm mb-6">
          {accuracy >= 80 ? "Outstanding memory!" : "Keep practicing — you'll get there!"}
        </p>

        <div className="grid grid-cols-3 gap-4 w-full max-w-xs mb-8">
          <div className="card p-3 text-center">
            <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>{totalCards}</p>
            <p className="text-[10px] text-[#AFAFAF]">Reviewed</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-2xl font-black text-[#58CC02]" style={{ fontFamily: "var(--font-display)" }}>{results.correct}</p>
            <p className="text-[10px] text-[#AFAFAF]">Correct</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-2xl font-black text-[#FF4B4B]" style={{ fontFamily: "var(--font-display)" }}>{results.wrong}</p>
            <p className="text-[10px] text-[#AFAFAF]">To review</p>
          </div>
        </div>

        <div className="w-full max-w-xs space-y-3">
          <Link
            href="/home"
            className="block text-center w-full py-4 rounded-xl font-black text-white text-base"
            style={{
              background: "#58CC02",
              borderBottom: "4px solid #46A302",
              fontFamily: "var(--font-display)",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!currentCard) return null;

  return (
    <div className="min-h-screen bg-[#1A1B2E] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#1CB0F6]" />
            <span className="text-sm font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
              Daily Review
            </span>
          </div>
          <span className="text-xs text-[#AFAFAF]">{index + 1} / {totalCards}</span>
        </div>
        {/* Progress */}
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${((index) / totalCards) * 100}%`, background: "#1CB0F6" }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 px-4 pb-6 flex flex-col">
        {/* Question */}
        <div
          className="card p-6 mb-4 flex-1 flex flex-col cursor-pointer"
          onClick={cardState === "question" ? handleReveal : undefined}
          style={{ minHeight: 180 }}
        >
          <span className="text-[10px] text-[#AFAFAF] font-bold uppercase tracking-widest mb-3">
            Question
          </span>
          <pre
            className="text-white font-bold text-base leading-relaxed flex-1 whitespace-pre-wrap"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {currentCard.front}
          </pre>
          {cardState === "question" && (
            <p className="text-xs text-[#6B7094] mt-4">Tap to reveal answer</p>
          )}
        </div>

        {/* Answer */}
        {cardState === "answer" && (
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
              {currentCard.back}
            </pre>
          </div>
        )}

        {/* Self-assessment */}
        {cardState === "answer" && (
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
              <XCircle className="w-4 h-4" />
              Missed it
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
              <CheckCircle2 className="w-4 h-4" />
              Got it!
            </button>
          </div>
        )}

        {cardState === "question" && (
          <button
            onClick={handleReveal}
            className="w-full py-4 rounded-xl font-black text-white text-base transition-all active:scale-95"
            style={{
              background: "#1CB0F6",
              borderBottom: "4px solid #0E98D9",
              fontFamily: "var(--font-display)",
            }}
          >
            Show Answer
          </button>
        )}
      </div>
    </div>
  );
}
