"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserState, LessonProgress, SRCard, UserStats } from "@/data/types";
import { getLevelFromXP, LEVELS } from "@/data/types";
import { updateSRCard, createSRCard, answerToQuality } from "./sr";

// ─── Default State ─────────────────────────────────────────────

function defaultStats(): UserStats {
  return {
    totalXP: 0,
    currentLevel: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: "",
    streakFreezes: 1,
    badges: [],
  };
}

const initialState: UserState = {
  stats: defaultStats(),
  lessonProgress: {},
  questProgress: {},
  worldProgress: {
    world1: { worldId: "world1", unlocked: true, completed: false },
    world2: { worldId: "world2", unlocked: true, completed: false },
    world3: { worldId: "world3", unlocked: true, completed: false },
    world4: { worldId: "world4", unlocked: true, completed: false },
    world5: { worldId: "world5", unlocked: true, completed: false },
  },
  srCards: {},
  currentWorldId: "world1",
  currentQuestId: "w1q1",
};

// ─── Store Actions ─────────────────────────────────────────────

interface StoreActions {
  // XP + Streak
  addXP: (amount: number) => void;
  checkAndUpdateStreak: () => void;

  // Progress
  completeLesson: (lessonId: string, score: number, xpEarned: number) => void;
  completeQuest: (questId: string, worldId: string) => void;
  unlockWorld: (worldId: string) => void;
  setCurrentQuest: (worldId: string, questId: string) => void;

  // Spaced repetition
  recordAnswer: (cardId: string, correct: boolean) => void;
  initSRCard: (cardId: string) => void;

  // Badges
  awardBadge: (badgeId: string) => void;

  // Reset (for dev)
  reset: () => void;
}

type Store = UserState & StoreActions;

// ─── Today's date string ──────────────────────────────────────
function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(a: string, b: string) {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  return Math.round(Math.abs(db - da) / (1000 * 60 * 60 * 24));
}

// ─── Zustand Store ────────────────────────────────────────────

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,

      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.stats.totalXP + amount;
          const newLevel = getLevelFromXP(newXP).level;
          return {
            stats: {
              ...state.stats,
              totalXP: newXP,
              currentLevel: newLevel,
            },
          };
        });
      },

      checkAndUpdateStreak: () => {
        set((state) => {
          const today = todayStr();
          const last = state.stats.lastActivityDate;

          if (last === today) return {}; // Already checked today

          let newStreak = state.stats.currentStreak;
          const diff = last ? daysBetween(last, today) : 0;

          if (diff <= 1) {
            newStreak += 1;
          } else if (state.stats.streakFreezes > 0 && diff === 2) {
            // Use a streak freeze
            return {
              stats: {
                ...state.stats,
                lastActivityDate: today,
                streakFreezes: state.stats.streakFreezes - 1,
              },
            };
          } else {
            newStreak = 1; // Reset streak
          }

          return {
            stats: {
              ...state.stats,
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.stats.longestStreak),
              lastActivityDate: today,
            },
          };
        });
      },

      completeLesson: (lessonId: string, score: number, xpEarned: number) => {
        set((state) => {
          const existing = state.lessonProgress[lessonId];
          const attempts = existing ? existing.attempts + 1 : 1;
          return {
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: {
                lessonId,
                completedAt: new Date().toISOString(),
                score,
                xpEarned,
                attempts,
              },
            },
          };
        });
        get().addXP(xpEarned);
        get().checkAndUpdateStreak();
      },

      completeQuest: (questId: string, worldId: string) => {
        set((state) => ({
          questProgress: {
            ...state.questProgress,
            [questId]: {
              questId,
              completed: true,
              completedAt: new Date().toISOString(),
            },
          },
        }));
      },

      unlockWorld: (worldId: string) => {
        set((state) => ({
          worldProgress: {
            ...state.worldProgress,
            [worldId]: {
              ...state.worldProgress[worldId],
              unlocked: true,
            },
          },
        }));
      },

      setCurrentQuest: (worldId: string, questId: string) => {
        set({ currentWorldId: worldId, currentQuestId: questId });
      },

      recordAnswer: (cardId: string, correct: boolean) => {
        set((state) => {
          const card = state.srCards[cardId] ?? createSRCard(cardId);
          const quality = answerToQuality(correct);
          const updated = updateSRCard(card, quality);
          return {
            srCards: {
              ...state.srCards,
              [cardId]: updated,
            },
          };
        });
      },

      initSRCard: (cardId: string) => {
        set((state) => {
          if (state.srCards[cardId]) return {};
          return {
            srCards: {
              ...state.srCards,
              [cardId]: createSRCard(cardId),
            },
          };
        });
      },

      awardBadge: (badgeId: string) => {
        set((state) => {
          if (state.stats.badges.includes(badgeId)) return {};
          return {
            stats: {
              ...state.stats,
              badges: [...state.stats.badges, badgeId],
            },
          };
        });
      },

      reset: () => set(initialState),
    }),
    {
      name: "neuroquest-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ─── Selectors ────────────────────────────────────────────────

export const selectDueReviewCount = (state: UserState) =>
  Object.values(state.srCards).filter((c) => {
    const today = todayStr();
    return c.nextReviewDate <= today;
  }).length;

export const selectCompletedLessons = (state: UserState) =>
  Object.keys(state.lessonProgress).length;
