import { MODULES } from "@/lib/content/modules";
import { ModuleProgressCards } from "@/components/gamification/ModuleProgressCards";

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
      <ModuleProgressCards />
    </div>
  );
}
