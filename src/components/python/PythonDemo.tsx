"use client";
import { CODE_SAMPLES } from "@/lib/content/code-samples";
import { PythonRunner } from "./PythonRunner";

interface PythonDemoProps {
  id: string;
  height?: number;
  readOnly?: boolean;
}

export function PythonDemo({ id, height, readOnly }: PythonDemoProps) {
  const code = CODE_SAMPLES[id];
  if (!code) {
    return (
      <div className="my-6 rounded-xl border border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-300">
        Code sample not found: <code className="font-mono">{id}</code>
      </div>
    );
  }
  return <PythonRunner id={id} initialCode={code} height={height} readOnly={readOnly} />;
}
