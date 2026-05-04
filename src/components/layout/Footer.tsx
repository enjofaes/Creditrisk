import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <span>Credit Risk Modelling — open teaching resource</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <Link href="https://github.com/enjofaes/creditrisk" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            GitHub
          </Link>
          <span>MIT License</span>
        </div>
      </div>
    </footer>
  );
}
