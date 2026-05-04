"use client";
import { useState } from "react";
import { SliderControl } from "./ChartControls";

interface StageData {
  stage1: number;
  stage2: number;
  stage3: number;
}

const BASE: StageData = { stage1: 750, stage2: 180, stage3: 70 };

export function IfrsStageChart() {
  const [pdThreshold, setPdThreshold] = useState(3);

  // Simulate migration: higher PD threshold → more loans stay in Stage 1
  const sensitivity = pdThreshold / 3;
  const s2 = Math.round(BASE.stage2 * (1 / sensitivity));
  const s3 = BASE.stage3;
  const s1 = BASE.stage1 + BASE.stage2 - s2;
  const total = s1 + s2 + s3;

  const stages = [
    { label: "Stage 1", count: s1, pct: (s1 / total * 100).toFixed(1), ecl: "12-month ECL", color: "bg-emerald-500", ecl_text: "text-emerald-700 dark:text-emerald-300" },
    { label: "Stage 2", count: s2, pct: (s2 / total * 100).toFixed(1), ecl: "Lifetime ECL", color: "bg-amber-500", ecl_text: "text-amber-700 dark:text-amber-300" },
    { label: "Stage 3", count: s3, pct: (s3 / total * 100).toFixed(1), ecl: "Lifetime ECL (credit-impaired)", color: "bg-red-500", ecl_text: "text-red-700 dark:text-red-300" },
  ];

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-5">
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">IFRS 9 — Three-Stage Impairment Model</h3>

      {/* Stage bars */}
      <div className="space-y-3">
        {stages.map((s) => (
          <div key={s.label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-sm ${s.color}`} />
                <span className="font-medium text-slate-900 dark:text-slate-100">{s.label}</span>
                <span className={`text-xs ${s.ecl_text}`}>{s.ecl}</span>
              </div>
              <span className="text-slate-500">{s.count.toLocaleString()} loans ({s.pct}%)</span>
            </div>
            <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${s.color} rounded-full transition-all duration-500`}
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <SliderControl
          label="SICR PD Threshold (× origination PD)"
          min={1.5}
          max={6}
          step={0.5}
          value={pdThreshold}
          onChange={setPdThreshold}
          formatValue={(v) => `${v}×`}
        />
        <p className="text-xs text-slate-500 mt-2">
          Adjust the Significant Increase in Credit Risk threshold to see how staging allocations change.
        </p>
      </div>
    </div>
  );
}
