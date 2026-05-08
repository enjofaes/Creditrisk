"use client";
// Client-only — all functions guard against SSR with typeof window checks

export interface Level {
  title: string;
  min: number;
  next: number;
  color: string;
  index: number;
}

const LEVELS: Omit<Level, "next" | "index">[] = [
  { title: "Junior Analyst",       min: 0,    color: "slate"  },
  { title: "Analyst",              min: 100,  color: "blue"   },
  { title: "Senior Analyst",       min: 300,  color: "indigo" },
  { title: "Risk Manager",         min: 600,  color: "violet" },
  { title: "Senior Risk Manager",  min: 1000, color: "purple" },
  { title: "Head of Risk",         min: 1500, color: "amber"  },
  { title: "Chief Risk Officer",   min: 2500, color: "orange" },
];

export function getLevel(xp: number): Level {
  let idx = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) { idx = i; break; }
  }
  return {
    ...LEVELS[idx],
    index: idx,
    next: LEVELS[idx + 1]?.min ?? LEVELS[idx].min + 500,
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_quiz",      title: "First Blood",       description: "Complete your first quiz",                icon: "🎯" },
  { id: "perfect_score",   title: "Perfectionist",     description: "Score 100% on any quiz",                  icon: "💯" },
  { id: "streak_3",        title: "On a Roll",         description: "3-day learning streak",                   icon: "🔥" },
  { id: "streak_7",        title: "Week Warrior",      description: "7-day learning streak",                   icon: "⚡" },
  { id: "module_core",     title: "Foundations Built", description: "Complete all Core Concepts quizzes",      icon: "🏗️" },
  { id: "module_scoring",  title: "Scorecard Pro",     description: "Complete all Credit Scoring quizzes",     icon: "📊" },
  { id: "module_ml",       title: "ML Quant",          description: "Complete all ML Models quizzes",          icon: "🤖" },
  { id: "module_reg",      title: "Basel Scholar",     description: "Complete all Regulation quizzes",         icon: "⚖️" },
  { id: "all_modules",     title: "Chief Risk Officer",description: "Complete all 16 chapter quizzes",         icon: "👑" },
  { id: "xp_500",          title: "Rising Star",       description: "Earn 500 XP",                             icon: "⭐" },
  { id: "xp_1000",         title: "Risk Expert",       description: "Earn 1000 XP",                            icon: "🌟" },
];

export interface ProgressState {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  completedQuizzes: string[];       // quizIds where score >= 70%
  quizBestScores: Record<string, number>; // quizId -> best %
  earnedAchievements: string[];
}

const KEY = "crm-progress-v1";

const DEFAULT: ProgressState = {
  xp: 0,
  streak: 1,
  lastActiveDate: null,
  completedQuizzes: [],
  quizBestScores: {},
  earnedAchievements: [],
};

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return { ...DEFAULT };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function checkAchievements(
  state: ProgressState,
  quizIdJustCompleted?: string
): string[] {
  const newOnes: string[] = [];
  const has = (id: string) => state.earnedAchievements.includes(id);

  if (!has("first_quiz") && state.completedQuizzes.length >= 1) newOnes.push("first_quiz");
  if (!has("perfect_score") && Object.values(state.quizBestScores).some((s) => s === 100)) newOnes.push("perfect_score");
  if (!has("streak_3") && state.streak >= 3) newOnes.push("streak_3");
  if (!has("streak_7") && state.streak >= 7) newOnes.push("streak_7");
  if (!has("xp_500") && state.xp >= 500) newOnes.push("xp_500");
  if (!has("xp_1000") && state.xp >= 1000) newOnes.push("xp_1000");

  const coreIds = ["el-quiz","pd-estimation-quiz","lgd-ead-quiz","portfolio-quiz"];
  const scoringIds = ["logistic-regression-quiz","woe-iv-quiz","scorecard-quiz","model-performance-quiz"];
  const mlIds = ["xgboost-quiz","neural-networks-quiz","shap-quiz","model-comparison-quiz"];
  const regIds = ["basel-quiz","irb-quiz","ifrs9-quiz","model-validation-quiz"];

  const done = new Set(state.completedQuizzes);
  if (!has("module_core") && coreIds.every((id) => done.has(id))) newOnes.push("module_core");
  if (!has("module_scoring") && scoringIds.every((id) => done.has(id))) newOnes.push("module_scoring");
  if (!has("module_ml") && mlIds.every((id) => done.has(id))) newOnes.push("module_ml");
  if (!has("module_reg") && regIds.every((id) => done.has(id))) newOnes.push("module_reg");
  if (!has("all_modules") && [...coreIds,...scoringIds,...mlIds,...regIds].every((id) => done.has(id))) newOnes.push("all_modules");

  void quizIdJustCompleted;
  return newOnes;
}

export interface QuizResult {
  xpEarned: number;
  newAchievements: Achievement[];
  newState: ProgressState;
  leveledUp: boolean;
  newLevel: Level | null;
}

export function recordQuizScore(quizId: string, score: number, total: number): QuizResult {
  const state = loadProgress();
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const prevBest = state.quizBestScores[quizId] ?? 0;
  const isPerfect = pct === 100;
  const isFirstPass = pct >= 70 && !state.completedQuizzes.includes(quizId);

  // XP: 10 per correct answer + 25 bonus for perfect + 20 for first completion
  let xpEarned = score * 10;
  if (isPerfect) xpEarned += 25;
  if (isFirstPass) xpEarned += 20;

  const prevLevel = getLevel(state.xp);
  const newXp = state.xp + xpEarned;
  const newLevelData = getLevel(newXp);
  const leveledUp = newLevelData.index > prevLevel.index;

  // Update streak
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let streak = state.streak;
  if (state.lastActiveDate === yesterday) streak += 1;
  else if (state.lastActiveDate !== today) streak = 1;

  const newState: ProgressState = {
    ...state,
    xp: newXp,
    streak,
    lastActiveDate: today,
    quizBestScores: { ...state.quizBestScores, [quizId]: Math.max(prevBest, pct) },
    completedQuizzes: isFirstPass
      ? [...state.completedQuizzes, quizId]
      : state.completedQuizzes,
  };

  const newAchievementIds = checkAchievements(newState, quizId);
  newState.earnedAchievements = [...state.earnedAchievements, ...newAchievementIds];

  saveProgress(newState);

  return {
    xpEarned,
    newAchievements: newAchievementIds.map((id) => ACHIEVEMENTS.find((a) => a.id === id)!).filter(Boolean),
    newState,
    leveledUp,
    newLevel: leveledUp ? newLevelData : null,
  };
}
