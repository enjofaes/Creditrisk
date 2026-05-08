"use client";
import { useState, useEffect, useCallback } from "react";
import { loadProgress, saveProgress, getLevel, ProgressState } from "./index";

export function useProgress() {
  const [state, setState] = useState<ProgressState | null>(null);

  useEffect(() => {
    setState(loadProgress());
  }, []);

  const refresh = useCallback(() => {
    setState(loadProgress());
  }, []);

  // Listen for storage changes from other tabs / components
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "crm-progress-v1") refresh();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [refresh]);

  const level = state ? getLevel(state.xp) : null;

  return { state, level, refresh };
}
