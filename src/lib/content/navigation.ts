import { MODULES } from "./modules";
import { Chapter, Module } from "@/types/module";

export interface NavChapter extends Chapter {
  moduleSlug: string;
  href: string;
}

function getAllChapters(): NavChapter[] {
  return MODULES.flatMap((m) =>
    m.chapters.map((c) => ({
      ...c,
      moduleSlug: m.slug,
      href: `/modules/${m.slug}/${c.slug}`,
    }))
  );
}

export function getPrevNext(moduleSlug: string, chapterSlug: string) {
  const all = getAllChapters();
  const idx = all.findIndex(
    (c) => c.moduleSlug === moduleSlug && c.slug === chapterSlug
  );
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export function getModuleProgress(moduleSlug: string): Module | undefined {
  return MODULES.find((m) => m.slug === moduleSlug);
}
