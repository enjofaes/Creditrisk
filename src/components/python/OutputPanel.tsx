"use client";
import { Spinner } from "@/components/ui/Spinner";

interface OutputPanelProps {
  stdout: string;
  stderr: string;
  figures: string[];
  isRunning: boolean;
  error?: string;
}

export function OutputPanel({ stdout, stderr, figures, isRunning, error }: OutputPanelProps) {
  const hasOutput = stdout || stderr || figures.length > 0 || error;

  if (!hasOutput && !isRunning) return null;

  return (
    <div className="border-t border-slate-700 bg-slate-950 rounded-b-xl">
      {isRunning && (
        <div className="flex items-center gap-2 px-4 py-3 text-sm text-slate-400">
          <Spinner size="sm" />
          <span>Running…</span>
        </div>
      )}
      {!isRunning && error && (
        <div className="px-4 py-3">
          <pre className="text-xs text-red-400 font-mono whitespace-pre-wrap overflow-x-auto">{error}</pre>
        </div>
      )}
      {!isRunning && stdout && (
        <div className="px-4 py-3">
          <p className="text-xs text-slate-500 mb-1">stdout</p>
          <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap overflow-x-auto">{stdout}</pre>
        </div>
      )}
      {!isRunning && stderr && (
        <div className="px-4 py-3 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-1">stderr</p>
          <pre className="text-xs text-amber-400 font-mono whitespace-pre-wrap overflow-x-auto">{stderr}</pre>
        </div>
      )}
      {figures.map((fig, i) => (
        <div key={i} className="p-4 border-t border-slate-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${fig}`}
            alt={`Figure ${i + 1}`}
            className="max-w-full rounded"
          />
        </div>
      ))}
    </div>
  );
}
