"use client";
import { useState } from "react";
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
import { SliderControl } from "./ChartControls";

interface ExpectedLossChartProps {
  interactive?: boolean;
  initialPd?: number;
  initialLgd?: number;
  ead?: number;
}

export function ExpectedLossChart({
  interactive = true,
  initialPd = 0.05,
  initialLgd = 0.45,
  ead = 1_000_000,
}: ExpectedLossChartProps) {
  const [pd, setPd] = useState(initialPd);
  const [lgd, setLgd] = useState(initialLgd);

  const el = pd * lgd * ead;
  const pct = (el / ead) * 100;

  const data = [
    { name: "EAD", value: ead, fill: "#94a3b8" },
    { name: "Expected Loss", value: el, fill: "#3b82f6" },
  ];

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Expected Loss = PD × LGD × EAD</h3>
        <div className="text-right">
          <span className="text-2xl font-bold text-blue-600">
            {el >= 1_000 ? `$${(el / 1000).toFixed(0)}k` : `$${el.toFixed(0)}`}
          </span>
          <span className="ml-2 text-sm text-slate-500">({pct.toFixed(2)}% of EAD)</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {interactive && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <SliderControl
            label="Probability of Default (PD)"
            min={0.001}
            max={0.3}
            step={0.001}
            value={pd}
            onChange={setPd}
            formatValue={(v) => `${(v * 100).toFixed(1)}%`}
          />
          <SliderControl
            label="Loss Given Default (LGD)"
            min={0.01}
            max={1}
            step={0.01}
            value={lgd}
            onChange={setLgd}
            formatValue={(v) => `${(v * 100).toFixed(0)}%`}
          />
        </div>
      )}
    </div>
  );
}
