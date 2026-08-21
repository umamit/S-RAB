"use client";
import React, { useState, useEffect } from "react";

interface ProjectParamsFormProps {
  profitRate: number;
  taxRate: number;
  alertThreshold: number;
  pphRate: number;
  onSave: (profitRate: number, taxRate: number, alertThreshold: number, pphRate: number) => void;
}

export default function ProjectParamsForm({
  profitRate,
  taxRate,
  alertThreshold,
  pphRate,
  onSave,
}: ProjectParamsFormProps) {
  const [profitInput, setProfitInput] = useState((profitRate * 100).toFixed(0));
  const [taxInput, setTaxInput] = useState((taxRate * 100).toFixed(0));
  const [thresholdInput, setThresholdInput] = useState(String(alertThreshold));
  const [pphInput, setPphInput] = useState(String(pphRate));

  const [prevProps, setPrevProps] = useState({ profitRate, taxRate, alertThreshold, pphRate });

  if (
    prevProps.profitRate !== profitRate ||
    prevProps.taxRate !== taxRate ||
    prevProps.alertThreshold !== alertThreshold ||
    prevProps.pphRate !== pphRate
  ) {
    setPrevProps({ profitRate, taxRate, alertThreshold, pphRate });
    setProfitInput((profitRate * 100).toFixed(0));
    setTaxInput((taxRate * 100).toFixed(0));
    setThresholdInput(String(alertThreshold));
    setPphInput(String(pphRate));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      Number(profitInput) / 100,
      Number(taxInput) / 100,
      Math.max(1, Math.min(100, parseInt(thresholdInput) || 5)),
      Number(pphInput)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-center w-full">
      <div className="flex-1 min-w-[130px] flex items-center gap-1.5">
        <label htmlFor="profit-rate-input" className="text-zinc-550 text-[10px] font-semibold shrink-0">Overhead:</label>
        <div className="relative rounded-lg shadow-sm w-full">
          <input
            id="profit-rate-input"
            type="number"
            min="0"
            max="100"
            step="1"
            value={profitInput}
            onChange={(e) => setProfitInput(e.target.value)}
            className="w-full px-2 py-2 pr-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 font-semibold"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-xs">%</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-[110px] flex items-center gap-1.5">
        <label htmlFor="tax-rate-input" className="text-zinc-550 text-[10px] font-semibold shrink-0">PPN:</label>
        <div className="relative rounded-lg shadow-sm w-full">
          <input
            id="tax-rate-input"
            type="number"
            min="0"
            max="100"
            step="1"
            value={taxInput}
            onChange={(e) => setTaxInput(e.target.value)}
            className="w-full px-2 py-2 pr-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 font-semibold"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-xs">%</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-[150px] flex items-center gap-1.5">
        <label htmlFor="threshold-input" className="text-zinc-550 text-[10px] font-semibold shrink-0 whitespace-nowrap">Batas Deviasi:</label>
        <div className="relative rounded-lg shadow-sm w-full">
          <input
            id="threshold-input"
            type="number"
            min="1"
            max="100"
            step="1"
            value={thresholdInput}
            onChange={(e) => setThresholdInput(e.target.value)}
            className="w-full px-2 py-2 pr-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 font-semibold"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-xs">-%</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-[160px] flex items-center gap-1.5">
        <label htmlFor="pph-rate-input" className="text-zinc-550 text-[10px] font-semibold shrink-0">PPh 4(2):</label>
        <select
          id="pph-rate-input"
          value={pphInput}
          onChange={(e) => setPphInput(e.target.value)}
          className="w-full px-2 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-400"
        >
          <option value="0">0% (Tanpa PPh)</option>
          <option value="0.02">2% (Kecil - SBU)</option>
          <option value="0.03">3% (Menengah/Besar)</option>
          <option value="0.04">4% (Non-SBU)</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-lg text-xs shrink-0 self-stretch flex items-center justify-center"
      >
        Simpan
      </button>
    </form>
  );

}
export type { ProjectParamsFormProps };
