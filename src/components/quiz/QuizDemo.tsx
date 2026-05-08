"use client";
import { useState, useCallback } from "react";
import { QUIZ_DATA } from "@/lib/content/quiz-data";
import { QuizBlock } from "./QuizBlock";
import { recordQuizScore, Achievement } from "@/lib/progress";
import { AchievementToast } from "@/components/gamification/AchievementToast";

interface QuizDemoProps {
  quizId: string;
  passingScore?: number;
}

export function QuizDemo({ quizId, passingScore }: QuizDemoProps) {
  const questions = QUIZ_DATA[quizId];
  const [reward, setReward] = useState<{
    xpEarned: number;
    leveledUp: boolean;
    newLevelTitle?: string;
  } | null>(null);
  const [pendingAchievements, setPendingAchievements] = useState<Achievement[]>([]);

  const handleComplete = useCallback((score: number, total: number) => {
    const result = recordQuizScore(quizId, score, total);
    setReward({
      xpEarned: result.xpEarned,
      leveledUp: result.leveledUp,
      newLevelTitle: result.newLevel?.title,
    });
    if (result.newAchievements.length > 0) {
      setPendingAchievements(result.newAchievements);
    }
    // Notify XpDisplay in nav to refresh
    window.dispatchEvent(new StorageEvent("storage", { key: "crm-progress-v1" }));
  }, [quizId]);

  if (!questions) {
    return (
      <div className="my-8 rounded-xl border border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-300">
        Quiz not found: <code className="font-mono">{quizId}</code>
      </div>
    );
  }

  return (
    <>
      <QuizBlock
        quizId={quizId}
        questions={questions}
        passingScore={passingScore}
        xpEarned={reward?.xpEarned}
        leveledUp={reward?.leveledUp}
        newLevelTitle={reward?.newLevelTitle}
        onComplete={handleComplete}
      />
      <AchievementToast
        achievements={pendingAchievements}
        onDone={() => setPendingAchievements([])}
      />
    </>
  );
}
