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
import { LessonComplete } from "@/components/lessons/LessonComplete";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  const worldId  = params.worldId  as string;
  const questId  = params.questId  as string;
  const lessonId = params.lessonId as string;

  const world  = getWorld(worldId);
  const quest  = getQuest(worldId, questId);
  const lesson = quest?.lessons.find((l) => l.id === lessonId);

  const { completeLesson, recordAnswer, initSRCard } = useStore();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [cardIndex,     setCardIndex]     = useState(0);
  const [step,          setStep]          = useState<"lesson" | "complete">("lesson");
  const [wrongCount,    setWrongCount]    = useState(0);
  const [xpEarned,     setXpEarned]      = useState(0);

  // Initialise SR cards
  useEffect(() => {
    if (lesson?.cards)     lesson.cards.forEach((c) => initSRCard(c.id));
    if (lesson?.questions) lesson.questions.forEach((q) => initSRCard(q.id));
  }, [lesson, initSRCard]);

  if (!world || !quest || !lesson) {
    return (
      <div className="min-h-screen bg-[#1A1B2E] flex flex-col items-center justify-center px-4 text-center">
        <Ilya state="sad" size={80} className="mb-4" />
        <h2 className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Lesson not found
        </h2>
        <Link href="/map" className="text-[#1CB0F6] text-sm font-bold">← Back to Map</Link>
      </div>
    );
  }

  const totalSteps = lesson.questions?.length ?? lesson.cards?.length ?? 1;
  const currentStep = lesson.type === "mcq" ? questionIndex : lesson.type === "flashcard" ? cardIndex : 0;
  const progressPct = step === "complete" ? 100 : (currentStep / totalSteps) * 100;

  // Next lesson in quest
  const lessonIdx = quest.lessons.findIndex((l) => l.id === lessonId);
  const nextLesson = quest.lessons[lessonIdx + 1] ?? null;

  function finishLesson(xp: number) {
    const score = wrongCount === 0 ? 100 : Math.max(50, 100 - wrongCount * 20);
    completeLesson(lessonId, score, xp);
    setXpEarned(xp);
    setStep("complete");
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
      const perfect = wrongCount === 0;
      finishLesson(perfect ? lesson!.xpReward + 5 : lesson!.xpReward);
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
      const perfect = wrongCount === 0;
      finishLesson(perfect ? lesson!.xpReward + 5 : lesson!.xpReward);
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
      <div className="min-h-screen bg-[#1A1B2E] px-4 py-8 flex flex-col">
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

  return (
    <div className="min-h-screen bg-[#1A1B2E] flex flex-col">
      {/* Top bar */}
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => router.push(`/learn/${worldId}/${questId}`)}
            className="text-[#AFAFAF] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex-1 progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPct}%`, background: world.color }}
            />
          </div>
          <span className="text-xs text-[#FFD700] font-bold whitespace-nowrap">
            +{lesson.xpReward} XP
          </span>
        </div>
        <p
          className="text-sm font-black text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {lesson.title}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-6 overflow-y-auto">
        {lesson.type === "concept" && lesson.concept && (
          <div className="flex flex-col min-h-full">
            <ConceptCard blocks={lesson.concept} />
            <div className="mt-auto pt-6">
              <button
                onClick={handleConceptDone}
                className="w-full py-4 rounded-xl font-black text-white text-base transition-all active:scale-95"
                style={{
                  background: world.color,
                  borderBottom: `4px solid ${world.colorDark}`,
                  fontFamily: "var(--font-display)",
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
      </div>
    </div>
  );
}
