"use client";
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { useQuizState } from "./useQuizState";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { HelpCircle, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizBlockProps {
  quizId: string;
  questions: QuizQuestionType[];
  passingScore?: number;
  xpEarned?: number;
  leveledUp?: boolean;
  newLevelTitle?: string;
  onComplete?: (score: number, total: number) => void;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  recall:      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  application: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  analysis:    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export function QuizBlock({
  quizId: _quizId,
  questions,
  passingScore = 0.7,
  xpEarned,
  leveledUp,
  newLevelTitle,
  onComplete,
}: QuizBlockProps) {
  const {
    state,
    currentIndex,
    answers,
    revealed,
    score,
    total,
    isPassing,
    start,
    answer,
    next,
    reset,
    currentQuestion,
  } = useQuizState(questions, passingScore, onComplete);

  if (state === "idle") {
    return (
      <div className="my-8 rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-100 dark:bg-blue-900/50 p-3">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900 dark:text-slate-100 mb-0.5">Chapter Quiz</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {total} questions · Pass at {Math.round(passingScore * 100)}%
              <span className="ml-2 inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                Up to {total * 10 + 45} XP
              </span>
            </p>
            <Button onClick={start} size="sm" className="gap-2">
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (state === "complete") {
    return (
      <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
        <QuizResult
          score={score}
          total={total}
          isPassing={isPassing}
          onReset={reset}
          xpEarned={xpEarned}
          leveledUp={leveledUp}
          newLevelTitle={newLevelTitle}
        />
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Question {currentIndex + 1} / {total}
          </p>
          <span className={cn(
            "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
            DIFFICULTY_COLORS[currentQuestion.difficulty] ?? DIFFICULTY_COLORS.recall
          )}>
            {currentQuestion.difficulty}
          </span>
        </div>
        <span className="text-xs text-slate-400">
          {score} correct
        </span>
      </div>
      <ProgressBar value={currentIndex + 1} max={total} />
      <QuizQuestion
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id]}
        revealed={revealed[currentQuestion.id] ?? false}
        onAnswer={(val) => answer(currentQuestion.id, val)}
      />
      {revealed[currentQuestion.id] && (
        <div className="flex justify-end">
          <Button onClick={next} size="sm" className="gap-1.5">
            {currentIndex < total - 1 ? "Next Question" : "See Results"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
