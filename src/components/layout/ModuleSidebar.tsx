"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MODULES } from "@/lib/content/modules";
import { DifficultyBadge } from "@/components/ui/Badge";
import { ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/lib/progress/useProgress";

// Map chapter slugs to quizIds
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

interface ModuleSidebarProps {
  className?: string;
}

export function ModuleSidebar({ className }: ModuleSidebarProps) {
  const pathname = usePathname();
  const { state } = useProgress();
  const completedSet = new Set(state?.completedQuizzes ?? []);

  return (
    <aside className={cn("w-64 shrink-0", className)}>
      <nav className="sticky top-20 space-y-4">
        {MODULES.map((module) => {
          const isActiveModule = pathname.includes(`/modules/${module.slug}`);
          const moduleQuizIds = module.chapters.map((c) => CHAPTER_QUIZ_IDS[c.slug]).filter(Boolean);
          const completedCount = moduleQuizIds.filter((id) => completedSet.has(id)).length;

          return (
            <div key={module.slug}>
              <Link
                href={`/modules/${module.slug}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActiveModule
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <ChevronRight className={cn("h-3.5 w-3.5 transition-transform shrink-0", isActiveModule && "rotate-90")} />
                <span className="flex-1">{module.title}</span>
                {completedCount > 0 && (
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0",
                    completedCount === moduleQuizIds.length
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                  )}>
                    {completedCount}/{moduleQuizIds.length}
                  </span>
                )}
              </Link>

              {isActiveModule && (
                <ul className="mt-1 ml-5 space-y-0.5">
                  {module.chapters.map((chapter) => {
                    const href = `/modules/${module.slug}/${chapter.slug}`;
                    const isActive = pathname === href;
                    const quizId = CHAPTER_QUIZ_IDS[chapter.slug];
                    const isCompleted = quizId ? completedSet.has(quizId) : false;

                    return (
                      <li key={chapter.slug}>
                        <Link
                          href={href}
                          className={cn(
                            "flex items-start gap-2 px-3 py-2 rounded-md text-xs transition-colors",
                            isActive
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 font-medium"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                          )}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isCompleted
                              ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                              : <div className={cn(
                                  "h-3.5 w-3.5 rounded-full border-2",
                                  isActive
                                    ? "border-blue-400"
                                    : "border-slate-300 dark:border-slate-600"
                                )} />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="leading-snug block">{chapter.title}</span>
                            <span className="flex items-center gap-1.5 mt-0.5 opacity-70">
                              <Clock className="h-3 w-3" />
                              {chapter.estimatedMinutes}m
                              <DifficultyBadge difficulty={chapter.difficulty} />
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
