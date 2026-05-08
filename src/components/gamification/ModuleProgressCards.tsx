"use client";
import Link from "next/link";
import { Clock, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODULES } from "@/lib/content/modules";
import { DifficultyBadge } from "@/components/ui/Badge";
import { useProgress } from "@/lib/progress/useProgress";

const CHAPTER_QUIZ_IDS: Record<string, string> = {
  "expected-loss":        "el-quiz",
  "pd-estimation":        "pd-estimation-quiz",
  "lgd-ead":              "lgd-ead-quiz",
  "portfolio-credit-risk":"portfolio-quiz",
  "logistic-regression":  "logistic-regression-quiz",
  "woe-iv-analysis":      "woe-iv-quiz",
  "scorecard-development":"scorecard-quiz",
  "model-performance":    "model-performance-quiz",
  "xgboost-credit":       "xgboost-quiz",
  "neural-networks":      "neural-networks-quiz",
  "shap-explainability":  "shap-quiz",
  "model-comparison":     "model-comparison-quiz",
  "basel-framework":      "basel-quiz",
  "irb-approach":         "irb-quiz",
  "ifrs9-staging":        "ifrs9-quiz",
  "model-validation":     "model-validation-quiz",
};

const MODULE_COLORS: Record<string, { ring: string; bg: string; text: string; badge: string }> = {
  "core-concepts":  { ring: "stroke-blue-500",   bg: "bg-blue-50 dark:bg-blue-950/30",   text: "text-blue-700 dark:text-blue-300",   badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  "credit-scoring": { ring: "stroke-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-300", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  "ml-models":      { ring: "stroke-violet-500",  bg: "bg-violet-50 dark:bg-violet-950/30",  text: "text-violet-700 dark:text-violet-300",  badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" },
  "regulation":     { ring: "stroke-amber-500",   bg: "bg-amber-50 dark:bg-amber-950/30",   text: "text-amber-700 dark:text-amber-300",   badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
};

function CircleProgress({ value, max, colorClass }: { value: number; max: number; colorClass: string }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? value / max : 0;
  const offset = circ * (1 - pct);

  return (
    <svg width="56" height="56" className="-rotate-90" aria-hidden>
      <circle cx="28" cy="28" r={r} fill="none" strokeWidth="4" className="stroke-slate-200 dark:stroke-slate-700" />
      {pct > 0 && (
        <circle
          cx="28" cy="28" r={r} fill="none" strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={colorClass}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      )}
      <text
        x="28" y="28"
        textAnchor="middle" dominantBaseline="central"
        className="rotate-90 fill-slate-700 dark:fill-slate-200 text-[10px] font-bold"
        style={{ transform: "rotate(90deg)", transformOrigin: "28px 28px", fontSize: "10px", fontWeight: "700" }}
      >
        {value}/{max}
      </text>
    </svg>
  );
}

export function ModuleProgressCards() {
  const { state } = useProgress();
  const completedSet = new Set(state?.completedQuizzes ?? []);

  return (
    <div className="space-y-8">
      {MODULES.map((module, idx) => {
        const colors = MODULE_COLORS[module.slug] ?? MODULE_COLORS["core-concepts"];
        const quizIds = module.chapters.map((c) => CHAPTER_QUIZ_IDS[c.slug]).filter(Boolean);
        const completedCount = quizIds.filter((id) => completedSet.has(id)).length;
        const isComplete = completedCount === quizIds.length;

        return (
          <div key={module.slug} className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Module header */}
            <div className={cn("p-6 border-b border-slate-200 dark:border-slate-700", colors.bg)}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Module {idx + 1}
                    </span>
                    {isComplete && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Complete
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{module.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{module.description}</p>
                </div>
                <div className="shrink-0">
                  <CircleProgress value={completedCount} max={quizIds.length} colorClass={colors.ring} />
                </div>
              </div>
            </div>

            {/* Chapter list */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {module.chapters.map((chapter, ci) => {
                const quizId = CHAPTER_QUIZ_IDS[chapter.slug];
                const done = quizId ? completedSet.has(quizId) : false;

                return (
                  <Link
                    key={chapter.slug}
                    href={`/modules/${module.slug}/${chapter.slug}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                      done
                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600"
                        : "border-slate-200 dark:border-slate-700 text-slate-500 group-hover:border-blue-400 group-hover:text-blue-600"
                    )}>
                      {done ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : ci + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm font-medium transition-colors",
                        done
                          ? "text-slate-500 dark:text-slate-400 line-through decoration-slate-300 dark:decoration-slate-600"
                          : "text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      )}>
                        {chapter.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{chapter.description}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        {chapter.estimatedMinutes}m
                      </span>
                      <DifficultyBadge difficulty={chapter.difficulty} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
