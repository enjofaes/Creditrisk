"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { SliderControl } from "./ChartControls";

function gaussian(x: number, mean: number, sd: number) {
  return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / sd) ** 2);
}

export function ScoreDistribution() {
  const [cutoff, setCutoff] = useState(600);

  const data = Array.from({ length: 100 }, (_, i) => {
    const score = 300 + i * 5.5;
    return {
      score: Math.round(score),
      good: gaussian(score, 700, 60) * 1000,
      bad: gaussian(score, 540, 70) * 1000,
    };
  });

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-4">
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Score Distributions — Good vs Bad Accounts</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="score" tick={{ fontSize: 11 }} label={{ value: "Score", position: "insideBottom", offset: -2, fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={() => ""} />
          <Tooltip formatter={(v: any) => [v.toFixed(2), ""]} labelFormatter={(l) => `Score: ${l}`} />
          <Legend />
          <Area type="monotone" dataKey="good" name="Good accounts" stroke="#10b981" fill="#10b98133" strokeWidth={2} />
          <Area type="monotone" dataKey="bad" name="Bad accounts" stroke="#ef4444" fill="#ef444433" strokeWidth={2} />
          <ReferenceLine x={cutoff} stroke="#f59e0b" strokeWidth={2} label={{ value: `Cutoff: ${cutoff}`, fill: "#f59e0b", fontSize: 11 }} />
        </AreaChart>
      </ResponsiveContainer>
      <SliderControl
        label="Score Cutoff"
        min={400}
        max={750}
        step={5}
        value={cutoff}
        onChange={setCutoff}
        formatValue={String}
      />
    </div>
  );
}
