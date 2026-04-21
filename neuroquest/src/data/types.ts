// ─── Lesson Content Types ─────────────────────────────────────

export type LessonType = "concept" | "mcq" | "flashcard" | "dragdrop" | "fillin" | "coding";
export type DeviceRequired = "any" | "laptop";

export interface MCQQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  neuroConnection?: string; // How this connects to neuroscience
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  hint?: string;
}

export interface ConceptBlock {
  type: "text" | "code" | "formula" | "highlight" | "image-placeholder" | "executable-code";
  content: string;
  caption?: string;
  annotations?: { line: number; text: string }[]; // For executable-code: explanations for specific lines
}

export interface CodingMission {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCode: string; // Code to validate the solution
  hints: string[];
  xpReward: number;
}

export interface FillQuestion {
  id: string;
  prompt: string;        // instruction shown above the code
  codeTemplate: string;  // code with ___ marking the blank
  answer: string;        // correct answer (trimmed, case-sensitive)
  explanation: string;
}

export interface Lesson {
  id: string;
  questId: string;
  worldId: string;
  title: string;
  type: LessonType;
  deviceRequired: DeviceRequired;
  xpReward: number;
  estimatedMinutes: number;
  // Content - one of these will be populated based on type
  concept?: ConceptBlock[];
  questions?: MCQQuestion[];
  cards?: FlashCard[];
  fillQuestions?: FillQuestion[];
  codingMission?: CodingMission;
}

export interface Quest {
  id: string;
  worldId: string;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
  isBoss?: boolean;
  totalXP: number;
}

export interface World {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string; // Tailwind color or hex
  colorDark: string;
  quests: Quest[];
  totalXP: number;
}

// ─── User Progress Types ──────────────────────────────────────

export interface LessonProgress {
  lessonId: string;
  completedAt: string; // ISO date
  score: number; // 0–100
  xpEarned: number;
  attempts: number;
}

export interface QuestProgress {
  questId: string;
  completed: boolean;
  completedAt?: string;
}

export interface WorldProgress {
  worldId: string;
  unlocked: boolean;
  completed: boolean;
}

// ─── Spaced Repetition ───────────────────────────────────────

export interface SRCard {
  cardId: string;
  easinessFactor: number; // starts at 2.5
  intervalDays: number;   // starts at 1
  repetitions: number;    // number of successful reviews
  nextReviewDate: string; // ISO date
  lastAnswerQuality: number; // 0–5
}

// ─── User State ───────────────────────────────────────────────

export interface UserStats {
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // ISO date YYYY-MM-DD
  streakFreezes: number;
  badges: string[];
}

export interface UserState {
  stats: UserStats;
  lessonProgress: Record<string, LessonProgress>;
  questProgress: Record<string, QuestProgress>;
  worldProgress: Record<string, WorldProgress>;
  srCards: Record<string, SRCard>;
  currentWorldId: string;
  currentQuestId: string;
}

// ─── Level Definitions ────────────────────────────────────────

export const LEVELS = [
  { level: 1, minXP: 0,    title: "Neural Newbie" },
  { level: 2, minXP: 100,  title: "Synapse Spark" },
  { level: 3, minXP: 300,  title: "Dendrite Drifter" },
  { level: 4, minXP: 600,  title: "Action Potential" },
  { level: 5, minXP: 1000, title: "Cortex Explorer" },
  { level: 6, minXP: 1500, title: "Hippocampal Hacker" },
  { level: 7, minXP: 2200, title: "Neural Networker" },
  { level: 8, minXP: 3000, title: "NMA Ready" },
];

export function getLevelFromXP(xp: number) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXP) current = lvl;
    else break;
  }
  return current;
}

export function getXPProgress(xp: number): { level: typeof LEVELS[0]; nextLevel: typeof LEVELS[0] | null; progress: number } {
  const level = getLevelFromXP(xp);
  const nextLevel = LEVELS.find((l) => l.minXP > xp) ?? null;
  const progress = nextLevel
    ? (xp - level.minXP) / (nextLevel.minXP - level.minXP)
    : 1;
  return { level, nextLevel, progress };
}
