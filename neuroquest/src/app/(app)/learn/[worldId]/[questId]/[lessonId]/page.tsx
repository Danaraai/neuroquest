"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { getWorld, getQuest } from "@/data/worlds";
import { useStore } from "@/lib/store";
import { Ilya } from "@/components/ilya/Ilya";
import { ConceptCard } from "@/components/lessons/ConceptCard";
import { MCQCard } from "@/components/lessons/MCQCard";
import { FlashCard } from "@/components/lessons/FlashCard";
import { FillCard } from "@/components/lessons/FillCard";
import { LessonComplete } from "@/components/lessons/LessonComplete";

const MAX_W = 840;

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  const worldId  = params.worldId  as string;
  const questId  = params.questId  as string;
  const lessonId = params.lessonId as string;

  const world  = getWorld(worldId);
  const quest  = getQuest(worldId, questId);
  const lesson = quest?.lessons.find((l) => l.id === lessonId);

  const { completeLesson, completeQuest, recordAnswer, initSRCard } = useStore();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [cardIndex,     setCardIndex]     = useState(0);
  const [fillIndex,     setFillIndex]     = useState(0);
  const [step,          setStep]          = useState<"lesson" | "complete">("lesson");
  const [wrongCount,    setWrongCount]    = useState(0);
  const [xpEarned,     setXpEarned]      = useState(0);

  useEffect(() => {
    if (lesson?.cards)         lesson.cards.forEach((c) => initSRCard(c.id));
    if (lesson?.questions)     lesson.questions.forEach((q) => initSRCard(q.id));
    if (lesson?.fillQuestions) lesson.fillQuestions.forEach((q) => initSRCard(q.id));
  }, [lesson, initSRCard]);

  if (!world || !quest || !lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: "#151735" }}>
        <Ilya state="sad" size={80} className="mb-4" />
        <h2 className="text-xl font-black mb-2" style={{ color: "#F2F1F8", fontFamily: "var(--font-display)" }}>
          Lesson not found
        </h2>
        <Link href="/map" className="text-sm font-bold" style={{ color: "#7C82F8" }}>← Back to Map</Link>
      </div>
    );
  }

  const totalSteps = lesson.questions?.length ?? lesson.cards?.length ?? lesson.fillQuestions?.length ?? 1;
  const currentStep = lesson.type === "mcq" ? questionIndex : lesson.type === "flashcard" ? cardIndex : lesson.type === "fillin" ? fillIndex : 0;
  const progressPct = step === "complete" ? 100 : (currentStep / totalSteps) * 100;

  const lessonIdx = quest.lessons.findIndex((l) => l.id === lessonId);
  const nextLesson = quest.lessons[lessonIdx + 1] ?? null;

  function finishLesson(xp: number) {
    const score = wrongCount === 0 ? 100 : Math.max(50, 100 - wrongCount * 20);
    completeLesson(lessonId, score, xp);
    setXpEarned(xp);
    setStep("complete");
    if (!nextLesson) completeQuest(questId, worldId);
  }

  function handleConceptDone() { finishLesson(lesson!.xpReward); }

  function handleMCQAnswer(correct: boolean, qId: string) {
    recordAnswer(qId, correct);
    if (!correct) setWrongCount((n) => n + 1);
  }

  function handleMCQContinue() {
    const questions = lesson!.questions!;
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      finishLesson(wrongCount === 0 ? lesson!.xpReward + 5 : lesson!.xpReward);
    }
  }

  function handleFlashAnswer(correct: boolean, cardId: string) {
    recordAnswer(cardId, correct);
    if (!correct) setWrongCount((n) => n + 1);
  }

  function handleFlashContinue() {
    const cards = lesson!.cards!;
    if (cardIndex < cards.length - 1) {
      setCardIndex((i) => i + 1);
    } else {
      finishLesson(wrongCount === 0 ? lesson!.xpReward + 5 : lesson!.xpReward);
    }
  }

  function handleFillAnswer(correct: boolean, qId: string) {
    recordAnswer(qId, correct);
    if (!correct) setWrongCount((n) => n + 1);
  }

  function handleFillContinue() {
    const fills = lesson!.fillQuestions!;
    if (fillIndex < fills.length - 1) {
      setFillIndex((i) => i + 1);
    } else {
      finishLesson(wrongCount === 0 ? lesson!.xpReward + 5 : lesson!.xpReward);
    }
  }

  function handleNextLesson() {
    if (!nextLesson) {
      router.push(`/learn/${worldId}/${questId}`);
      return;
    }
    if (nextLesson.deviceRequired === "laptop") {
      router.push(`/coding/${nextLesson.codingMission?.id ?? nextLesson.id}`);
    } else {
      router.push(`/learn/${worldId}/${questId}/${nextLesson.id}`);
    }
  }

  if (step === "complete") {
    return (
      <div className="min-h-screen px-4 py-8 flex flex-col" style={{ background: "#151735" }}>
        <LessonComplete
          lesson={lesson}
          xpEarned={xpEarned}
          perfect={wrongCount === 0}
          nextLessonId={nextLesson?.id ?? null}
          questId={questId}
          worldId={worldId}
          onNext={handleNextLesson}
        />
      </div>
    );
  }

  const contentPadding = "clamp(16px, 4vw, 40px)";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#151735" }}>
      {/* Top bar — same max-width as content */}
      <div
        style={{
          flexShrink: 0,
          paddingTop: 16,
          paddingBottom: 12,
          paddingLeft: contentPadding,
          paddingRight: contentPadding,
          position: "sticky",
          top: 0,
          background: "rgba(21,23,53,0.95)",
          backdropFilter: "blur(8px)",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <button
              onClick={() => router.push(`/learn/${worldId}/${questId}`)}
              style={{ color: "#5A5F80", background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 0, borderRadius: 8 }}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <span style={{ fontSize: 12, color: "#F6D95B", fontWeight: 700, whiteSpace: "nowrap" }}>
              +{lesson.xpReward} XP
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#9EA3BD", fontFamily: "var(--font-display)" }}>
            {lesson.title}
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          paddingTop: 24,
          paddingBottom: 48,
          paddingLeft: contentPadding,
          paddingRight: contentPadding,
        }}
      >
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>

          {lesson.type === "concept" && lesson.concept && (
            <div className="flex flex-col">
              <ConceptCard blocks={lesson.concept} />
              <div style={{ marginTop: 36 }}>
                <button
                  onClick={handleConceptDone}
                  style={{
                    width: "100%",
                    padding: "15px 24px",
                    borderRadius: 14,
                    border: "1px solid rgba(124,130,248,0.3)",
                    background: "#252850",
                    color: "#A5A9FA",
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    cursor: "pointer",
                    transition: "opacity 0.15s",
                  }}
                >
                  Got it! →
                </button>
              </div>
            </div>
          )}

          {lesson.type === "mcq" && lesson.questions && (
            <MCQCard
              key={`mcq-${questionIndex}`}
              question={lesson.questions[questionIndex]}
              onAnswer={handleMCQAnswer}
              onContinue={handleMCQContinue}
            />
          )}

          {lesson.type === "flashcard" && lesson.cards && (
            <FlashCard
              key={`flash-${cardIndex}`}
              card={lesson.cards[cardIndex]}
              onAnswer={handleFlashAnswer}
              onContinue={handleFlashContinue}
              cardNumber={cardIndex + 1}
              totalCards={lesson.cards.length}
            />
          )}

          {lesson.type === "fillin" && lesson.fillQuestions && (
            <FillCard
              key={`fill-${fillIndex}`}
              question={lesson.fillQuestions[fillIndex]}
              onAnswer={handleFillAnswer}
              onContinue={handleFillContinue}
              cardNumber={fillIndex + 1}
              totalCards={lesson.fillQuestions.length}
            />
          )}

        </div>
      </div>
    </div>
  );
}
