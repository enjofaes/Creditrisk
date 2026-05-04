import { cn } from "@/lib/utils";
import { AlertCircle, Info, Lightbulb, AlertTriangle } from "lucide-react";
import { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "important";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const config: Record<CalloutType, { icon: typeof Info; bg: string; border: string; text: string }> = {
  info: { icon: Info, bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800", text: "text-blue-800 dark:text-blue-200" },
  warning: { icon: AlertTriangle, bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800", text: "text-amber-800 dark:text-amber-200" },
  tip: { icon: Lightbulb, bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800", text: "text-emerald-800 dark:text-emerald-200" },
  important: { icon: AlertCircle, bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800", text: "text-red-800 dark:text-red-200" },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, bg, border, text } = config[type];
  return (
    <div className={cn("my-6 rounded-lg border p-4", bg, border)}>
      <div className={cn("flex items-start gap-3", text)}>
        <Icon className="h-5 w-5 mt-0.5 shrink-0" />
        <div className="flex-1 text-sm">
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="prose-sm prose-p:my-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
