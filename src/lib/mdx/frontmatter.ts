import { ChapterFrontmatter } from "@/types/module";

export type { ChapterFrontmatter };

export function validateFrontmatter(raw: Record<string, unknown>): ChapterFrontmatter {
  return {
    title: String(raw.title ?? "Untitled"),
    description: String(raw.description ?? ""),
    module: (raw.module as ChapterFrontmatter["module"]) ?? "core-concepts",
    order: Number(raw.order ?? 0),
    difficulty: (raw.difficulty as ChapterFrontmatter["difficulty"]) ?? "foundational",
    prerequisites: Array.isArray(raw.prerequisites) ? raw.prerequisites.map(String) : [],
    notebookPath: raw.notebookPath ? String(raw.notebookPath) : undefined,
    estimatedMinutes: Number(raw.estimatedMinutes ?? 20),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
  };
}
