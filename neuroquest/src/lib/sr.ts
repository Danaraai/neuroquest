/**
 * SM-2 Spaced Repetition Algorithm
 * Based on the SuperMemo SM-2 algorithm (same as Anki)
 *
 * Quality grades (0–5):
 *   5 — Perfect recall, instant
 *   4 — Correct with slight hesitation
 *   3 — Correct with serious difficulty
 *   2 — Wrong, correct answer was easy to recall
 *   1 — Wrong, correct answer remembered after seeing it
 *   0 — Complete blackout
 */

import type { SRCard } from "@/data/types";

export function createSRCard(cardId: string): SRCard {
  return {
    cardId,
    easinessFactor: 2.5,
    intervalDays: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString().split("T")[0],
    lastAnswerQuality: 0,
  };
}

export function updateSRCard(card: SRCard, quality: 0 | 1 | 2 | 3 | 4 | 5): SRCard {
  let { easinessFactor, intervalDays, repetitions } = card;

  // Update easiness factor
  easinessFactor = Math.max(
    1.3,
    easinessFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );

  if (quality < 3) {
    // Failed — reset repetitions but keep EF
    repetitions = 0;
    intervalDays = 1;
  } else {
    // Successful recall
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easinessFactor);
    }
    repetitions += 1;
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);

  return {
    cardId: card.cardId,
    easinessFactor,
    intervalDays,
    repetitions,
    nextReviewDate: nextDate.toISOString().split("T")[0],
    lastAnswerQuality: quality,
  };
}

export function isDueForReview(card: SRCard): boolean {
  const today = new Date().toISOString().split("T")[0];
  return card.nextReviewDate <= today;
}

export function getDueCards(cards: Record<string, SRCard>): SRCard[] {
  return Object.values(cards)
    .filter(isDueForReview)
    .sort((a, b) => {
      // Prioritize: failed cards first, then by due date
      if (a.lastAnswerQuality < 3 && b.lastAnswerQuality >= 3) return -1;
      if (a.lastAnswerQuality >= 3 && b.lastAnswerQuality < 3) return 1;
      return a.nextReviewDate.localeCompare(b.nextReviewDate);
    });
}

/** Convert MCQ result to quality grade */
export function answerToQuality(correct: boolean, wasHesitant = false): 0 | 1 | 2 | 3 | 4 | 5 {
  if (correct && !wasHesitant) return 5;
  if (correct && wasHesitant) return 4;
  return 1; // Wrong answer
}
