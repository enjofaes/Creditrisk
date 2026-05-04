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

export interface ShapEntry {
  feature: string;
  value: string | number;
  shapValue: number;
}

const DEFAULT_SHAP: ShapEntry[] = [
  { feature: "Credit Score", value: "612", shapValue: 0.45 },
  { feature: "DTI Ratio", value: "0.52", shapValue: 0.31 },
  { feature: "Loan Amount", value: "$45k", shapValue: 0.18 },
  { feature: "Employment (yrs)", value: "2", shapValue: 0.12 },
  { feature: "Num Delinquencies", value: "1", shapValue: 0.09 },
  { feature: "Home Ownership", value: "RENT", shapValue: -0.08 },
  { feature: "Annual Income", value: "$68k", shapValue: -0.22 },
  { feature: "Loan Term", value: "36mo", shapValue: -0.14 },
];

interface ShapWaterfallChartProps {
  baseValue?: number;
  shapValues?: ShapEntry[];
  predictedValue?: number;
}

export function ShapWaterfallChart({
  baseValue = 0.12,
  shapValues = DEFAULT_SHAP,
  predictedValue,
}: ShapWaterfallChartProps) {
  const pred = predictedValue ?? baseValue + shapValues.reduce((s, e) => s + e.shapValue, 0);
  const sorted = [...shapValues].sort((a, b) => Math.abs(b.shapValue) - Math.abs(a.shapValue));

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">SHAP Feature Contributions</h3>
        <div className="text-xs text-slate-500 space-x-3">
          <span>Base = {baseValue.toFixed(3)}</span>
          <span>Predicted PD = <strong className="text-blue-600">{pred.toFixed(3)}</strong></span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 5, right: 40, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => v.toFixed(2)} />
          <YAxis type="category" dataKey="feature" tick={{ fontSize: 11 }} width={115} />
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(v: any, _: any, props: any) => [
              `${v > 0 ? "+" : ""}${Number(v).toFixed(3)}`,
              `${props?.payload?.feature} = ${props?.payload?.value}`,
            ]}
          />
          <ReferenceLine x={0} stroke="#64748b" />
          <Bar dataKey="shapValue" name="SHAP Value" radius={[0, 3, 3, 0]}>
            {sorted.map((e, i) => (
              <Cell key={i} fill={e.shapValue > 0 ? "#ef4444" : "#10b981"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-slate-500">
        Red = increases predicted PD (riskier). Green = decreases predicted PD (safer).
      </p>
    </div>
  );
}
