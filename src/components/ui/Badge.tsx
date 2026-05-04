import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "emerald" | "violet" | "amber" | "slate" | "red";
  className?: string;
}

export function Badge({ children, variant = "slate", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        {
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300": variant === "blue",
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300": variant === "emerald",
          "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300": variant === "violet",
          "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300": variant === "amber",
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300": variant === "slate",
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300": variant === "red",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const map: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    foundational: { label: "Foundational", variant: "emerald" },
    intermediate: { label: "Intermediate", variant: "blue" },
    advanced: { label: "Advanced", variant: "violet" },
  };
  const { label, variant } = map[difficulty] ?? { label: difficulty, variant: "slate" };
  return <Badge variant={variant}>{label}</Badge>;
}
