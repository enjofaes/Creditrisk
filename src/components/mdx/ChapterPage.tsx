import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { mdxComponents } from "./MDXComponents";
import { ChapterFrontmatter, TocEntry } from "@/types/module";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NavChapter } from "@/lib/content/navigation";

interface ChapterPageProps {
  source: string;
  frontmatter: ChapterFrontmatter;
  headings: TocEntry[];
  prev: NavChapter | null;
  next: NavChapter | null;
  moduleTitle: string;
  moduleSlug: string;
}

export function ChapterPage({
  source,
  frontmatter,
  headings,
  prev,
  next,
  moduleTitle,
  moduleSlug,
}: ChapterPageProps) {
  return (
    <div className="flex gap-10">
      <article className="flex-1 min-w-0">
        <BreadcrumbBar
          crumbs={[
            { label: "Modules", href: "/modules" },
            { label: moduleTitle, href: `/modules/${moduleSlug}` },
            { label: frontmatter.title },
          ]}
        />

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <DifficultyBadge difficulty={frontmatter.difficulty} />
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              {frontmatter.estimatedMinutes} min read
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {frontmatter.title}
          </h1>
          {frontmatter.description && (
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
              {frontmatter.description}
            </p>
          )}
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <MDXRemote
            source={source}
            components={mdxComponents as never}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rehypePlugins: [rehypeHighlight, [rehypeKatex as any, { strict: false }]],
              },
            }}
          />
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={prev.href}
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <div>
                <p className="text-xs text-slate-400">Previous</p>
                <p className="font-medium">{prev.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={next.href}
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-right"
            >
              <div>
                <p className="text-xs text-slate-400">Next</p>
                <p className="font-medium">{next.title}</p>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

      <TableOfContents headings={headings} />
    </div>
  );
}
