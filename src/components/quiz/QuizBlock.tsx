"use client";
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { useQuizState } from "./useQuizState";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { HelpCircle, ChevronRight } from "lucide-react";

interface QuizBlockProps {
  quizId: string;
  questions: QuizQuestionType[];
  passingScore?: number;
}

export function QuizBlock({ quizId: _quizId, questions, passingScore = 0.7 }: QuizBlockProps) {
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
  } = useQuizState(questions, passingScore);

  if (state === "idle") {
    return (
      <div className="my-8 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Chapter Quiz</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {total} questions · Pass at {Math.round(passingScore * 100)}%
            </p>
            <Button onClick={start} size="sm">Start Quiz</Button>
          </div>
        </div>
      </div>
    );
  }

  if (state === "complete") {
    return (
      <div className="my-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
        <QuizResult score={score} total={total} isPassing={isPassing} onReset={reset} />
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="my-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          Question {currentIndex + 1} of {total}
        </p>
        <span className="text-xs text-slate-400">{score} correct so far</span>
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
