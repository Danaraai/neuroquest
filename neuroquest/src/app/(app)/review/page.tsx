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
    const shuffled = [...dueCards].sort(() => Math.random() - 0.5);
    setQueue(shuffled.slice(0, 20));
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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: "#151735" }}>
        <Ilya state="celebrate" size={100} className="mb-6" />
        <h1 className="text-2xl font-black mb-3" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)" }}>
          You&apos;re all caught up! 🎉
        </h1>
        <p className="text-sm mb-8 max-w-xs" style={{ color: "#9EA3BD" }}>
          No cards due for review. Come back tomorrow — Ilya will have a fresh queue ready!
        </p>
        <Link
          href="/home"
          style={{
            maxWidth: 220,
            display: "block",
            textAlign: "center",
            padding: "14px 32px",
            borderRadius: 14,
            background: "#252850",
            border: "1px solid rgba(124,130,248,0.35)",
            color: "#A5A9FA",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            fontFamily: "var(--font-display)",
          }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (sessionDone) {
    const accuracy = Math.round((results.correct / totalCards) * 100);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: "#151735" }}>
        <Ilya state={accuracy >= 80 ? "celebrate" : "idle"} size={100} className="mb-6" />
        <h1 className="text-2xl font-black mb-2" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)" }}>
          Review Complete!
        </h1>
        <p className="text-sm mb-6" style={{ color: "#9EA3BD" }}>
          {accuracy >= 80 ? "Outstanding memory!" : "Keep practicing — you'll get there!"}
        </p>

        <div className="grid grid-cols-3 gap-4 w-full max-w-xs mb-8">
          <div className="card p-3 text-center">
            <p className="text-2xl font-black" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)" }}>{totalCards}</p>
            <p className="text-[10px]" style={{ color: "#9EA3BD" }}>Reviewed</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-2xl font-black" style={{ color: "#6EE7A8", fontFamily: "var(--font-display)" }}>{results.correct}</p>
            <p className="text-[10px]" style={{ color: "#9EA3BD" }}>Correct</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-2xl font-black" style={{ color: "#FF7878", fontFamily: "var(--font-display)" }}>{results.wrong}</p>
            <p className="text-[10px]" style={{ color: "#9EA3BD" }}>To review</p>
          </div>
        </div>

        <div className="w-full max-w-xs">
          <Link
            href="/home"
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              padding: "15px 24px",
              borderRadius: 14,
              background: "#252850",
              border: "1px solid rgba(124,130,248,0.35)",
              color: "#A5A9FA",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
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
    <div className="min-h-screen flex flex-col" style={{ background: "#151735" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" style={{ color: "#7C82F8" }} />
            <span className="text-sm font-black" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)" }}>
              Daily Review
            </span>
          </div>
          <span className="text-xs" style={{ color: "#9EA3BD" }}>{index + 1} / {totalCards}</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${((index) / totalCards) * 100}%` }}
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
          <pre
            className="font-bold text-base leading-relaxed flex-1 whitespace-pre-wrap"
            style={{ color: "#F2F1F8", fontFamily: "var(--font-display)", margin: 0 }}
          >
            {currentCard.front}
          </pre>
          {cardState === "question" && (
            <p className="text-xs mt-4" style={{ color: "#6A70A0" }}>Tap to reveal answer</p>
          )}
        </div>

        {/* Answer */}
        {cardState === "answer" && (
          <div
            className="rounded-xl p-6 mb-5 animate-slide-up"
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
              className="text-sm leading-relaxed whitespace-pre-wrap"
              style={{ color: "#C5C7D8", fontFamily: "var(--font-display)", margin: 0 }}
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
                background: "rgba(255,92,92,0.10)",
                border: "1.5px solid #FF5C5C",
                color: "#FF7878",
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
                background: "rgba(110,231,168,0.10)",
                border: "1.5px solid #6EE7A8",
                color: "#6EE7A8",
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
            className="w-full py-4 rounded-xl font-black text-base transition-all active:scale-95"
            style={{
              background: "#252850",
              border: "1px solid rgba(124,130,248,0.35)",
              color: "#A5A9FA",
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
