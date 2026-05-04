"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { RunResult } from "@/types/pyodide";

interface PyodideContextValue {
  isLoading: boolean;
  error: string | null;
  isReady: boolean;
  run: (code: string) => Promise<RunResult>;
}

const PyodideContext = createContext<PyodideContextValue | null>(null);

export function PyodideProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (code: string): Promise<RunResult> => {
    if (!isReady) {
      setIsLoading(true);
      setError(null);
    }
    try {
      const { runCode, getPyodide } = await import("@/lib/pyodide/loader");
      if (!isReady) {
        await getPyodide();
        setIsReady(true);
        setIsLoading(false);
      }
      return await runCode(code);
    } catch (e) {
      const msg = String(e);
      setError(msg);
      setIsLoading(false);
      return { stdout: "", stderr: msg, figures: [], result: undefined, error: msg };
    }
  }, [isReady]);

  return (
    <PyodideContext.Provider value={{ isLoading, error, isReady, run }}>
      {children}
    </PyodideContext.Provider>
  );
}

export function usePyodide() {
  const ctx = useContext(PyodideContext);
  if (!ctx) throw new Error("usePyodide must be used inside PyodideProvider");
  return ctx;
}
