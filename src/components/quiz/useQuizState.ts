"use client";
import { useState, useCallback } from "react";
import { QuizQuestion, QuizState } from "@/types/quiz";

export function useQuizState(questions: QuizQuestion[] = [], passingScore = 0.7, onComplete?: (score: number, total: number) => void) {
  const [state, setState] = useState<QuizState>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const start = useCallback(() => {
    setState("in_progress");
    setCurrentIndex(0);
    setAnswers({});
    setRevealed({});
  }, []);

  const answer = useCallback(
    (questionId: string, value: number | boolean) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      setRevealed((prev) => ({ ...prev, [questionId]: true }));
    },
    []
  );

  const score = questions.reduce((acc, q) => {
    const given = answers[q.id];
    if (given === undefined) return acc;
    if (q.type === "mcq" && given === q.correctIndex) return acc + 1;
    if (q.type === "true_false" && given === q.correctAnswer) return acc + 1;
    return acc;
  }, 0);

  const next = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setState("complete");
      onComplete?.(score, questions.length);
    }
  }, [currentIndex, questions.length, onComplete, score]);

  const reset = useCallback(() => {
    setState("idle");
    setCurrentIndex(0);
    setAnswers({});
    setRevealed({});
  }, []);

  const isPassing = questions.length > 0 && score / questions.length >= passingScore;

  return {
    state,
    currentIndex,
    answers,
    revealed,
    score,
    total: questions.length,
    isPassing,
    start,
    answer,
    next,
    reset,
    currentQuestion: questions[currentIndex] ?? null,
  };
}
