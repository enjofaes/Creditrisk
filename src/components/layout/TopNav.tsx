"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, GitBranch } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { XpDisplay } from "@/components/gamification/XpDisplay";
import { cn } from "@/lib/utils";
import { MODULES } from "@/lib/content/modules";

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white shrink-0">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <span className="hidden sm:inline">Credit Risk</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {MODULES.map((m) => (
            <Link
              key={m.slug}
              href={`/modules/${m.slug}`}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors",
                pathname.startsWith(`/modules/${m.slug}`)
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {m.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <XpDisplay />
          <Link
            href="https://github.com/enjofaes/creditrisk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-2 rounded-md transition-colors"
            aria-label="GitHub"
          >
            <GitBranch className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
