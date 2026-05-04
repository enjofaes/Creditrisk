import Link from "next/link";
import { getModule, MODULES } from "@/lib/content/modules";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Clock, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ module: string }>;
}

export async function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: slug } = await params;
  const mod = getModule(slug);
  return { title: mod ? `${mod.title} — Credit Risk Modelling` : "Module" };
}

export default async function ModuleLandingPage({ params }: Props) {
  const { module: slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Module</p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{mod.title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">{mod.description}</p>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {mod.chapters.map((chapter, i) => (
          <Link
            key={chapter.slug}
            href={`/modules/${slug}/${chapter.slug}`}
            className="flex items-center gap-4 px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-500 group-hover:border-blue-400 group-hover:text-blue-600 transition-colors">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {chapter.title}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">{chapter.description}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                {chapter.estimatedMinutes}m
              </span>
              <DifficultyBadge difficulty={chapter.difficulty} />
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
