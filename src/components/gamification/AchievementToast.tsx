"use client";
import { useEffect, useState } from "react";
import { Achievement } from "@/lib/progress";
import { cn } from "@/lib/utils";

interface Props {
  achievements: Achievement[];
  onDone: () => void;
}

export function AchievementToast({ achievements, onDone }: Props) {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (achievements.length === 0) return;
    setIndex(0);
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 3500);
    return () => clearTimeout(timer);
  }, [achievements, onDone]);

  if (achievements.length === 0) return null;
  const achievement = achievements[index];

  return (
    <div
      className={cn(
        "fixed top-20 right-4 z-[100] max-w-sm transition-all duration-400",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-3 rounded-xl bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 shadow-lg px-4 py-3">
        <span className="text-2xl">{achievement.icon}</span>
        <div>
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">Achievement Unlocked</p>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{achievement.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
}
