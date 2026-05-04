import { readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { validateFrontmatter } from "./frontmatter";
import { ChapterFrontmatter } from "@/types/module";

export interface SerializedChapter {
  source: string;
  frontmatter: ChapterFrontmatter;
  headings: Array<{ id: string; text: string; level: number }>;
}

export async function serializeChapter(
  moduleSlug: string,
  chapterSlug: string
): Promise<SerializedChapter> {
  const filePath = path.join(
    process.cwd(),
    "src/content",
    moduleSlug,
    `${chapterSlug}.mdx`
  );

  let raw: string;
  try {
    raw = await readFile(filePath, "utf-8");
  } catch {
    raw = generatePlaceholderMdx(moduleSlug, chapterSlug);
  }

  const { data, content } = matter(raw);
  const frontmatter = validateFrontmatter(data);
  const headings = extractHeadings(content);

  return { source: content, frontmatter, headings };
}

function extractHeadings(mdx: string) {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(mdx)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[`*_]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }
  return headings;
}

function generatePlaceholderMdx(moduleSlug: string, chapterSlug: string): string {
  return `---
title: "${chapterSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}"
description: "Coming soon"
module: "${moduleSlug}"
order: 1
difficulty: "foundational"
estimatedMinutes: 20
tags: []
---

## Coming Soon

This chapter is under development.
`;
}
