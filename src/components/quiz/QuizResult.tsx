"use client";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

interface QuizResultProps {
  score: number;
  total: number;
  isPassing: boolean;
  onReset: () => void;
}

export function QuizResult({ score, total, isPassing, onReset }: QuizResultProps) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="text-center space-y-4 py-6">
      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${isPassing ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
        {isPassing ? (
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        ) : (
          <XCircle className="h-8 w-8 text-red-500" />
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{pct}%</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {score} of {total} correct
        </p>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
        {isPassing
          ? "Well done! You've passed this chapter quiz."
          : "Keep reviewing the material — you can retake the quiz anytime."}
      </p>
      <Button variant="secondary" onClick={onReset} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
