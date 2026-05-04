export type ModuleSlug = "core-concepts" | "credit-scoring" | "ml-models" | "regulation";
export type Difficulty = "foundational" | "intermediate" | "advanced";

export interface ChapterFrontmatter {
  title: string;
  description: string;
  module: ModuleSlug;
  order: number;
  difficulty: Difficulty;
  prerequisites?: string[];
  notebookPath?: string;
  estimatedMinutes: number;
  tags: string[];
}

export interface Chapter {
  slug: string;
  title: string;
  description: string;
  order: number;
  difficulty: Difficulty;
  estimatedMinutes: number;
  notebookPath?: string;
}

export interface Module {
  slug: ModuleSlug;
  title: string;
  description: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}
