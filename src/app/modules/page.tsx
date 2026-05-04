import Link from "next/link";
import { MODULES } from "@/lib/content/modules";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "Course Modules — Credit Risk Modelling",
};

export default function ModulesIndexPage() {
  const totalChapters = MODULES.reduce((s, m) => s + m.chapters.length, 0);
  const totalMinutes = MODULES.reduce(
    (s, m) => s + m.chapters.reduce((cs, c) => cs + c.estimatedMinutes, 0),
    0
  );

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Course Modules
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {totalChapters} chapters · ~{Math.round(totalMinutes / 60)} hours of content
        </p>
      </div>

      <div className="space-y-8">
        {MODULES.map((module, idx) => (
          <div key={module.slug} className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Module {idx + 1}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {module.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{module.description}</p>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {module.chapters.map((chapter, ci) => (
                <Link
                  key={chapter.slug}
                  href={`/modules/${module.slug}/${chapter.slug}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 group-hover:border-blue-400 group-hover:text-blue-600 transition-colors">
                    {ci + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
