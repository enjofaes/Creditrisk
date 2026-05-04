import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export function BreadcrumbBar({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-6">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-slate-900 dark:text-slate-100 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
