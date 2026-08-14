"use client";
import React, { useState, useEffect } from "react";

interface ProjectParamsFormProps {
  profitRate: number;
  taxRate: number;
  onSave: (profitRate: number, taxRate: number) => void;
}

export default function ProjectParamsForm({ profitRate, taxRate, onSave }: ProjectParamsFormProps) {
  const [profitInput, setProfitInput] = useState((profitRate * 100).toFixed(0));
  const [taxInput, setTaxInput] = useState((taxRate * 100).toFixed(0));

  useEffect(() => {
    setProfitInput((profitRate * 100).toFixed(0));
    setTaxInput((taxRate * 100).toFixed(0));
  }, [profitRate, taxRate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(Number(profitInput) / 100, Number(taxInput) / 100);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center">
      <div className="flex-1">
        <label htmlFor="profit-rate-input" className="sr-only">Jasa & Overhead (%)</label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-zinc-500 text-xs font-semibold">Overhead:</span>
          </div>
          <input
            id="profit-rate-input"
            type="number"
            min="0"
            max="100"
            step="1"
            value={profitInput}
            onChange={(e) => setProfitInput(e.target.value)}
            className="w-full pl-[70px] pr-8 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 font-semibold"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-xs">%</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <label htmlFor="tax-rate-input" className="sr-only">PPN (%)</label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-zinc-500 text-xs font-semibold">PPN:</span>
          </div>
          <input
            id="tax-rate-input"
            type="number"
            min="0"
            max="100"
            step="1"
            value={taxInput}
            onChange={(e) => setTaxInput(e.target.value)}
            className="w-full pl-[46px] pr-8 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 font-semibold"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-xs">%</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-lg text-xs shrink-0 self-stretch flex items-center"
      >
        Simpan
      </button>
    </form>
  );
}
export type { ProjectParamsFormProps };
