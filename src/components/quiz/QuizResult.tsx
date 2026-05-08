"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, RefreshCw, Star, TrendingUp } from "lucide-react";
import { Confetti } from "@/components/gamification/Confetti";
import { cn } from "@/lib/utils";

interface QuizResultProps {
  score: number;
  total: number;
  isPassing: boolean;
  onReset: () => void;
  xpEarned?: number;
  leveledUp?: boolean;
  newLevelTitle?: string;
}

export function QuizResult({ score, total, isPassing, onReset, xpEarned = 0, leveledUp = false, newLevelTitle }: QuizResultProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPerfect = pct === 100;
  const [xpCount, setXpCount] = useState(0);

  // Animate XP counter
  useEffect(() => {
    if (xpEarned === 0) return;
    let frame = 0;
    const total_frames = 40;
    const step = () => {
      frame++;
      setXpCount(Math.round((frame / total_frames) * xpEarned));
      if (frame < total_frames) requestAnimationFrame(step);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 400);
    return () => clearTimeout(t);
  }, [xpEarned]);

  return (
    <div className="relative text-center space-y-5 py-6 overflow-hidden">
      <Confetti active={isPerfect} />

      {/* Score circle */}
      <div className="relative inline-flex">
        <svg width="96" height="96" className="-rotate-90">
          <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="8"
            className="text-slate-100 dark:text-slate-800" />
          <circle cx="48" cy="48" r="40" fill="none" strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - pct / 100)}`}
            strokeLinecap="round"
            className={cn("transition-all duration-1000", isPassing ? "stroke-emerald-500" : "stroke-red-400")}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{pct}%</span>
        </div>
      </div>

      {/* Result text */}
      <div>
        <div className="flex items-center justify-center gap-2 mb-1">
          {isPassing
            ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            : <XCircle className="h-5 w-5 text-red-400" />}
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {isPerfect ? "Perfect score!" : isPassing ? "Passed!" : "Not quite"}
          </p>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {score} of {total} correct
        </p>
      </div>

      {/* XP reward */}
      {xpEarned > 0 && (
        <div className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold",
          "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700"
        )}>
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          +{xpCount} XP
        </div>
      )}

      {/* Level up banner */}
      {leveledUp && newLevelTitle && (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700 px-4 py-3">
          <TrendingUp className="h-5 w-5 text-violet-600" />
          <div className="text-left">
            <p className="text-xs text-violet-500 font-semibold uppercase tracking-wide">Level Up!</p>
            <p className="text-sm font-bold text-violet-700 dark:text-violet-300">{newLevelTitle}</p>
          </div>
        </div>
      )}

      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
        {isPassing
          ? isPerfect ? "Flawless execution. Basel would approve." : "Solid work — you can move on to the next chapter."
          : "Review the explanations above — you can retake the quiz anytime."}
      </p>

      <Button variant="secondary" onClick={onReset} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
