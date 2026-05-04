"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TocEntry } from "@/types/module";

export function TableOfContents({ headings }: { headings: TocEntry[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "0px 0px -60% 0px" }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
          On this page
        </p>
        <ul className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block text-xs py-0.5 transition-colors leading-snug",
                  level === 3 ? "pl-3" : "",
                  active === id
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
