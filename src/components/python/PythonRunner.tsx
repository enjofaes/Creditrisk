"use client";
import { useState } from "react";
import { usePyodide } from "./PyodideProvider";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { RunResult } from "@/types/pyodide";
import { Play } from "lucide-react";

interface PythonRunnerProps {
  id: string;
  initialCode: string;
  height?: number;
  readOnly?: boolean;
  preloadPackages?: string[];
}

export function PythonRunner({ id: _id, initialCode, height = 220, readOnly = false }: PythonRunnerProps) {
  const { isLoading, run } = usePyodide();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);

  async function handleRun() {
    setRunning(true);
    setOutput(null);
    const result = await run(code);
    setOutput(result);
    setRunning(false);
  }

  return (
    <div className="my-6 rounded-xl border border-slate-700 overflow-hidden shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-slate-400 font-mono">Python</span>
        </div>
        <Button
          size="sm"
          onClick={handleRun}
          disabled={running || isLoading}
          className="gap-1.5 h-7 px-3 text-xs"
        >
          {running || isLoading ? (
            <>
              <Spinner size="sm" />
              {isLoading ? "Loading Python…" : "Running…"}
            </>
          ) : (
            <>
              <Play className="h-3 w-3" />
              Run
            </>
          )}
        </Button>
      </div>
      <CodeEditor
        value={code}
        onChange={setCode}
        readOnly={readOnly}
        height={height}
      />
      {output && (
        <OutputPanel
          stdout={output.stdout}
          stderr={output.stderr}
          figures={output.figures}
          isRunning={running}
          error={output.error}
        />
      )}
      {running && !output && (
        <OutputPanel stdout="" stderr="" figures={[]} isRunning={true} />
      )}
    </div>
  );
}
