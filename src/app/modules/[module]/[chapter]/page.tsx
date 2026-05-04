import { serializeChapter } from "@/lib/mdx/serialize";
import { getModule, getChapter, MODULES } from "@/lib/content/modules";
import { getPrevNext } from "@/lib/content/navigation";
import { ChapterPage } from "@/components/mdx/ChapterPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ module: string; chapter: string }>;
}

export async function generateStaticParams() {
  return MODULES.flatMap((m) =>
    m.chapters.map((c) => ({ module: m.slug, chapter: c.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: moduleSlug, chapter: chapterSlug } = await params;
  const chapter = getChapter(moduleSlug, chapterSlug);
  const mod = getModule(moduleSlug);
  return {
    title: chapter ? `${chapter.title} — ${mod?.title} — Credit Risk Modelling` : "Chapter",
    description: chapter?.description,
  };
}

export default async function ChapterRoute({ params }: Props) {
  const { module: moduleSlug, chapter: chapterSlug } = await params;
  const mod = getModule(moduleSlug);
  if (!mod) notFound();

  const { source, frontmatter, headings } = await serializeChapter(moduleSlug, chapterSlug);
  const { prev, next } = getPrevNext(moduleSlug, chapterSlug);

  return (
    <ChapterPage
      source={source}
      frontmatter={frontmatter}
      headings={headings}
      prev={prev}
      next={next}
      moduleTitle={mod.title}
      moduleSlug={moduleSlug}
    />
  );
}
