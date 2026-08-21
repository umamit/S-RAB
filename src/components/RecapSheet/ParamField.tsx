import React from "react";

interface ParamFieldProps {
  id: string;
  label: string;
  suffix?: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
}

export default function ParamField({
  id,
  label,
  suffix,
  value,
  onChange,
  type = "number",
  min,
  max,
  step,
}: ParamFieldProps) {
  return (
    <div className="flex-1 min-w-[110px] flex items-center gap-1.5">
      <label htmlFor={id} className="text-zinc-550 text-[10px] font-semibold shrink-0 whitespace-nowrap">{label}</label>
      <div className="relative rounded-lg shadow-sm w-full">
        <input
          id={id}
          type={type}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-2 py-2 pr-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 font-semibold"
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-xs">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}
