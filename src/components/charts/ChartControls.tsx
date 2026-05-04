"use client";

interface SliderControlProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  formatValue?: (v: number) => string;
}

export function SliderControl({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue = String,
}: SliderControlProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
        <span className="font-medium">{label}</span>
        <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
          {formatValue(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 appearance-none bg-slate-200 dark:bg-slate-700 rounded-full accent-blue-500 cursor-pointer"
      />
    </div>
  );
}
