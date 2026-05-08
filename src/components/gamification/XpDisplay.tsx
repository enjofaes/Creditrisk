"use client";
import { useProgress } from "@/lib/progress/useProgress";
import { getLevel } from "@/lib/progress";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const LEVEL_COLORS: Record<string, string> = {
  slate:  "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200",
  blue:   "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  indigo: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
  violet: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
  purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  amber:  "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  orange: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
};

const XP_BAR_COLORS: Record<string, string> = {
  slate:  "bg-slate-500",
  blue:   "bg-blue-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  purple: "bg-purple-500",
  amber:  "bg-amber-500",
  orange: "bg-orange-500",
};

export function XpDisplay() {
  const { state } = useProgress();
  if (!state) return null;

  const level = getLevel(state.xp);
  const progress = state.xp - level.min;
  const range = level.next - level.min;
  const pct = Math.min(100, Math.round((progress / range) * 100));

  return (
    <div className="flex items-center gap-3">
      {/* Streak */}
      <div className="flex items-center gap-1 text-sm font-semibold">
        <Flame className={cn("h-4 w-4", state.streak >= 3 ? "text-orange-500" : "text-slate-400")} />
        <span className={state.streak >= 3 ? "text-orange-500" : "text-slate-500 dark:text-slate-400"}>
          {state.streak}
        </span>
      </div>

      {/* XP bar + level */}
      <div className="flex items-center gap-2">
        <span className={cn("hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold", LEVEL_COLORS[level.color])}>
          {level.title}
        </span>
        <div className="hidden sm:flex flex-col gap-0.5 w-20">
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-700", XP_BAR_COLORS[level.color])}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 text-right leading-none">{state.xp} XP</span>
        </div>
        {/* Mobile: just XP number */}
        <span className="sm:hidden text-xs font-semibold text-slate-500 dark:text-slate-400">{state.xp} XP</span>
      </div>
    </div>
  );
}
