"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MODULES } from "@/lib/content/modules";
import { DifficultyBadge } from "@/components/ui/Badge";
import { ChevronRight, Clock } from "lucide-react";

interface ModuleSidebarProps {
  className?: string;
}

export function ModuleSidebar({ className }: ModuleSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-64 shrink-0", className)}>
      <nav className="sticky top-20 space-y-4">
        {MODULES.map((module) => {
          const isActiveModule = pathname.includes(`/modules/${module.slug}`);
          return (
            <div key={module.slug}>
              <Link
                href={`/modules/${module.slug}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActiveModule
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 transition-transform shrink-0",
                    isActiveModule && "rotate-90"
                  )}
                />
                {module.title}
              </Link>

              {isActiveModule && (
                <ul className="mt-1 ml-5 space-y-0.5">
                  {module.chapters.map((chapter) => {
                    const href = `/modules/${module.slug}/${chapter.slug}`;
                    const isActive = pathname === href;
                    return (
                      <li key={chapter.slug}>
                        <Link
                          href={href}
                          className={cn(
                            "flex flex-col gap-0.5 px-3 py-2 rounded-md text-xs transition-colors",
                            isActive
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 font-medium"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                          )}
                        >
                          <span className="leading-snug">{chapter.title}</span>
                          <span className="flex items-center gap-1.5 opacity-70">
                            <Clock className="h-3 w-3" />
                            {chapter.estimatedMinutes}m
                            <DifficultyBadge difficulty={chapter.difficulty} />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
