"use client";
import { QUIZ_DATA } from "@/lib/content/quiz-data";
import { QuizBlock } from "./QuizBlock";

interface QuizDemoProps {
  quizId: string;
  passingScore?: number;
}

export function QuizDemo({ quizId, passingScore }: QuizDemoProps) {
  const questions = QUIZ_DATA[quizId];
  if (!questions) {
    return (
      <div className="my-8 rounded-xl border border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-300">
        Quiz not found: <code className="font-mono">{quizId}</code>
      </div>
    );
  }
  return <QuizBlock quizId={quizId} questions={questions} passingScore={passingScore} />;
}
