"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface WoeBin {
  label: string;
  woe: number;
  iv: number;
  eventRate: number;
  count: number;
}

const DEFAULT_BINS: WoeBin[] = [
  { label: "< 580", woe: 1.42, iv: 0.21, eventRate: 0.34, count: 1200 },
  { label: "580–620", woe: 0.72, iv: 0.09, eventRate: 0.21, count: 2400 },
  { label: "620–660", woe: 0.15, iv: 0.01, eventRate: 0.13, count: 3100 },
  { label: "660–700", woe: -0.38, iv: 0.04, eventRate: 0.08, count: 3800 },
  { label: "700–740", woe: -0.89, iv: 0.10, eventRate: 0.04, count: 3200 },
  { label: "> 740", woe: -1.65, iv: 0.24, eventRate: 0.02, count: 2300 },
];

interface WoeChartProps {
  feature?: string;
  bins?: WoeBin[];
}

export function WoeChart({ feature = "Credit Score Band", bins = DEFAULT_BINS }: WoeChartProps) {
  const totalIv = bins.reduce((s, b) => s + b.iv, 0);

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
          Weight of Evidence — {feature}
        </h3>
        <span className="text-xs text-slate-500">
          IV = <strong className="text-amber-600">{totalIv.toFixed(3)}</strong>
          {totalIv > 0.3 && " (Strong)"}
          {totalIv > 0.1 && totalIv <= 0.3 && " (Medium)"}
          {totalIv <= 0.1 && " (Weak)"}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={bins} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(v: any, name: any) => [Number(v).toFixed(3), name]}
            labelFormatter={(l) => `Bin: ${l}`}
          />
          <ReferenceLine y={0} stroke="#64748b" />
          <Bar dataKey="woe" name="WoE" radius={[3, 3, 0, 0]}>
            {bins.map((b, i) => (
              <Cell key={i} fill={b.woe >= 0 ? "#ef4444" : "#10b981"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-slate-500">
        Positive WoE = higher default rate than average (riskier). Negative WoE = lower default rate (safer).
      </p>
    </div>
  );
}
