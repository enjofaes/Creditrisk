"use client";
import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { SliderControl } from "./ChartControls";

interface RocPoint { fpr: number; tpr: number; threshold: number; }

function generateRocData(): RocPoint[] {
  // Simulated ROC for a decent credit model (Gini ~0.6)
  const points: RocPoint[] = [];
  const n = 101;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const fpr = t;
    // Concave ROC curve using beta-like transform
    const tpr = Math.min(1, Math.pow(fpr, 0.3));
    points.push({ fpr: Math.round(fpr * 1000) / 1000, tpr: Math.round(tpr * 1000) / 1000, threshold: 1 - t });
  }
  return points;
}

const DATA = generateRocData();

function calcAuc(points: RocPoint[]): number {
  let auc = 0;
  for (let i = 1; i < points.length; i++) {
    auc += (points[i].fpr - points[i - 1].fpr) * ((points[i].tpr + points[i - 1].tpr) / 2);
  }
  return auc;
}

const AUC = calcAuc(DATA);

interface RocCurveChartProps {
  data?: RocPoint[];
  interactive?: boolean;
}

export function RocCurveChart({ data = DATA, interactive = true }: RocCurveChartProps) {
  const [threshold, setThreshold] = useState(0.5);

  const chartData = useMemo(
    () => data.map((p) => ({ fpr: p.fpr, tpr: p.tpr, random: p.fpr })),
    [data]
  );

  const operatingPoint = useMemo(() => {
    const closest = data.reduce((best, p) =>
      Math.abs(p.threshold - threshold) < Math.abs(best.threshold - threshold) ? p : best
    );
    return closest;
  }, [data, threshold]);

  const gini = (2 * AUC - 1).toFixed(3);

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">ROC Curve</h3>
        <div className="text-xs text-slate-500 space-x-3">
          <span>AUC = <strong>{AUC.toFixed(3)}</strong></span>
          <span>Gini = <strong>{gini}</strong></span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="fpr" type="number" domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 11 }} label={{ value: "False Positive Rate", position: "insideBottom", offset: -2, fontSize: 11 }} />
          <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 11 }} label={{ value: "True Positive Rate", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <Tooltip formatter={(v: any) => `${(v * 100).toFixed(1)}%`} />
          <Legend />
          <Line type="monotone" dataKey="tpr" name="Model" stroke="#3b82f6" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="random" name="Random" stroke="#94a3b8" dot={false} strokeDasharray="5 5" />
          {interactive && (
            <>
              <ReferenceLine x={operatingPoint.fpr} stroke="#f59e0b" strokeDasharray="3 3" />
              <ReferenceLine y={operatingPoint.tpr} stroke="#f59e0b" strokeDasharray="3 3" />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
      {interactive && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <SliderControl
            label="Classification Threshold"
            min={0.01}
            max={0.99}
            step={0.01}
            value={threshold}
            onChange={setThreshold}
            formatValue={(v) => v.toFixed(2)}
          />
          <p className="text-xs text-slate-500">
            At threshold {threshold.toFixed(2)}: TPR = {(operatingPoint.tpr * 100).toFixed(1)}%, FPR = {(operatingPoint.fpr * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}
