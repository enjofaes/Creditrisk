import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { NotebookDownload } from "@/components/notebook/NotebookDownload";
import { QuizBlock } from "@/components/quiz/QuizBlock";
import { ExpectedLossChart } from "@/components/charts/ExpectedLossChart";
import { RocCurveChart } from "@/components/charts/RocCurveChart";
import { WoeChart } from "@/components/charts/WoeChart";
import { ShapWaterfallChart } from "@/components/charts/ShapWaterfallChart";
import { IfrsStageChart } from "@/components/charts/IfrsStageChart";
import { BaselCapitalChart } from "@/components/charts/BaselCapitalChart";
import { PythonRunner } from "@/components/python/PythonRunner";
import { PythonDemo } from "@/components/python/PythonDemo";
import { cn } from "@/lib/utils";
import { HTMLAttributes, AnchorHTMLAttributes } from "react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function HeadingWithId({
  level,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { level: 2 | 3 | 4 }) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";
  const text = typeof children === "string" ? children : "";
  const id = slugify(text);
  return (
    <Tag id={id} className={className} {...props}>
      {children}
    </Tag>
  );
}

export const mdxComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithId
      level={2}
      className="mt-10 mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100 scroll-mt-20"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithId
      level={3}
      className="mt-8 mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100 scroll-mt-20"
      {...props}
    />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithId
      level={4}
      className="mt-6 mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100 scroll-mt-20"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 text-slate-700 dark:text-slate-300 leading-relaxed" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-1 text-slate-700 dark:text-slate-300" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-1 text-slate-700 dark:text-slate-300" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-blue-400 pl-4 italic text-slate-600 dark:text-slate-400"
      {...props}
    />
  ),
  a: ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:no-underline"
      {...props}
    />
  ),
  pre: CodeBlock,
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className={cn("w-full text-sm border-collapse", props.className)}
        {...props}
      />
    </div>
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border border-slate-300 dark:border-slate-600 px-4 py-2"
      {...props}
    />
  ),
  // Custom components usable in MDX
  Callout,
  NotebookDownload,
  QuizBlock,
  PythonRunner,
  PythonDemo,
  ExpectedLossChart,
  RocCurveChart,
  WoeChart,
  ShapWaterfallChart,
  IfrsStageChart,
  BaselCapitalChart,
};
