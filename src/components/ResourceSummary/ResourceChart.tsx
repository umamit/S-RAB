"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";

interface ResourceChartProps {
  totalMaterialsCost: number;
  totalLaborCost: number;
  totalToolsCost: number;
  matPercent: number;
  labPercent: number;
  toolPercent: number;
}

export default function ResourceChart({
  totalMaterialsCost,
  totalLaborCost,
  totalToolsCost,
  matPercent,
  labPercent,
  toolPercent,
}: ResourceChartProps) {
  return (
    <div className="space-y-3 bg-zinc-50/50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 print:bg-zinc-50 print:border print:border-zinc-300">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
        Sebaran Anggaran Sumber Daya
      </h3>
      
      {/* Visual Bar */}
      <div className="h-6 w-full rounded-lg overflow-hidden flex text-[10px] font-bold text-white shadow-inner">
        {totalMaterialsCost > 0 && (
          <div style={{ width: `${matPercent}%` }} className="bg-blue-600 dark:bg-blue-500 flex items-center justify-center min-w-[30px]" title={`Bahan: ${matPercent.toFixed(1)}%`}>
            {matPercent > 10 ? `Bahan (${matPercent.toFixed(0)}%)` : ""}
          </div>
        )}
        {totalLaborCost > 0 && (
          <div style={{ width: `${labPercent}%` }} className="bg-amber-600 dark:bg-amber-500 flex items-center justify-center min-w-[30px]" title={`Upah: ${labPercent.toFixed(1)}%`}>
            {labPercent > 10 ? `Upah (${labPercent.toFixed(0)}%)` : ""}
          </div>
        )}
        {totalToolsCost > 0 && (
          <div style={{ width: `${toolPercent}%` }} className="bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center min-w-[30px]" title={`Alat: ${toolPercent.toFixed(1)}%`}>
            {toolPercent > 10 ? `Alat (${toolPercent.toFixed(0)}%)` : ""}
          </div>
        )}
      </div>

      {/* Numeric breakdown labels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-semibold text-zinc-700 dark:text-zinc-350">
        <div className="flex justify-between items-center border-l-4 border-blue-600 pl-2">
          <span>Material (Bahan Baku):</span>
          <span className="font-bold">{formatRupiah(totalMaterialsCost)} ({matPercent.toFixed(1)}%)</span>
        </div>
        <div className="flex justify-between items-center border-l-4 border-amber-600 pl-2">
          <span>Upah Kerja (Labor):</span>
          <span className="font-bold">{formatRupiah(totalLaborCost)} ({labPercent.toFixed(1)}%)</span>
        </div>
        <div className="flex justify-between items-center border-l-4 border-emerald-600 pl-2">
          <span>Peralatan Kerja:</span>
          <span className="font-bold">{formatRupiah(totalToolsCost)} ({toolPercent.toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  );
}
