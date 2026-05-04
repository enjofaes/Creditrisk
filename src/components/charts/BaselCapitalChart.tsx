"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { SliderControl } from "./ChartControls";

function irbRiskWeight(pd: number, lgd: number, r: number, maturity = 2.5): number {
  const N = (x: number) => {
    // Approx normal CDF
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp((-x * x) / 2);
    const poly = t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212560 + t * 1.3302744))));
    const cdf = 1 - d * poly;
    return x >= 0 ? cdf : 1 - cdf;
  };
  const Ninv = (p: number) => {
    // Rational approx for inverse normal
    const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
    const b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833];
    const c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209, 0.0276438810333863, 0.0038405729373609, 0.0003951896511349, 0.0000321767881768, 0.0000002888167364, 0.0000003960315187];
    const y = p - 0.5;
    if (Math.abs(y) < 0.42) {
      const r = y * y;
      return y * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]) / ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
    }
    const r2 = Math.sqrt(-Math.log(y < 0 ? p : 1 - p));
    const x = (((((((c[8] * r2 + c[7]) * r2 + c[6]) * r2 + c[5]) * r2 + c[4]) * r2 + c[3]) * r2 + c[2]) * r2 + c[1]) * r2 + c[0];
    return y < 0 ? -x : x;
  };

  const K =
    lgd * N((1 / Math.sqrt(1 - r)) * Ninv(pd) + Math.sqrt(r / (1 - r)) * Ninv(0.999)) -
    lgd * pd;
  const ma = (1 + (maturity - 2.5) * (0.11852 - 0.05478 * Math.log(pd)) ** 2) / (1 - 1.5 * (0.11852 - 0.05478 * Math.log(pd)) ** 2);
  return Math.max(0, Math.min(12.5 * K * ma, 1.5));
}

export function BaselCapitalChart() {
  const [lgd, setLgd] = useState(0.45);
  const [r, setR] = useState(0.15);

  const data = Array.from({ length: 50 }, (_, i) => {
    const pd = 0.001 + (i / 49) * 0.299;
    const rw = irbRiskWeight(pd, lgd, r);
    return {
      pd: Math.round(pd * 1000) / 10,
      riskWeight: Math.round(rw * 1000) / 10,
      capitalCharge: Math.round(rw * 0.08 * 1000) / 10,
    };
  });

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Basel IRB — Risk Weight vs PD</h3>
        <span className="text-xs text-slate-500">Capital = RW × 8% (min. requirement)</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="pd" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} label={{ value: "PD (%)", position: "insideBottom", offset: -2, fontSize: 11 }} />
          <YAxis yAxisId="left" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} label={{ value: "Risk Weight (%)", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Tooltip formatter={(v: any, name: any) => [`${v}%`, name]} />
          <Line yAxisId="left" type="monotone" dataKey="riskWeight" name="Risk Weight" stroke="#3b82f6" dot={false} strokeWidth={2} />
          <Line yAxisId="right" type="monotone" dataKey="capitalCharge" name="Capital Charge" stroke="#f59e0b" dot={false} strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        <SliderControl
          label="LGD"
          min={0.05}
          max={1}
          step={0.05}
          value={lgd}
          onChange={setLgd}
          formatValue={(v) => `${(v * 100).toFixed(0)}%`}
        />
        <SliderControl
          label="Asset Correlation (R)"
          min={0.03}
          max={0.24}
          step={0.01}
          value={r}
          onChange={setR}
          formatValue={(v) => v.toFixed(2)}
        />
      </div>
    </div>
  );
}
