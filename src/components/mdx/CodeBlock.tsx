import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function CodeBlock({ className, children, ...props }: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-xl bg-slate-900 dark:bg-slate-950 p-4 text-sm leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  );
}
