"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";

interface ResourceAllocationProps {
  directCost: number;
  totalMaterials: number;
  totalLabor: number;
  totalTools: number;
  totalMisc: number;
  materialPct: number;
  laborPct: number;
  toolsPct: number;
  miscPct: number;
}

export default function ResourceAllocation({
  directCost,
  totalMaterials,
  totalLabor,
  totalTools,
  totalMisc,
  materialPct,
  laborPct,
  toolsPct,
  miscPct,
}: ResourceAllocationProps) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1 font-semibold">
          Sebaran Sumber Daya Proyek
        </h3>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mb-4 font-medium">
          Pengelompokan anggaran fisik berdasarkan analisa bahan, upah tenaga, dan alat bantu SNI.
        </p>
      </div>

      {directCost > 0 ? (
        <div className="space-y-6">
          {/* Stacked Percentage Bar */}
          <div className="w-full h-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex shadow-inner">
            {totalMaterials > 0 && (
              <div className="h-full bg-zinc-900 dark:bg-zinc-50 transition-all" style={{ width: `${materialPct}%` }} title={`Material: ${materialPct.toFixed(1)}%`} />
            )}
            {totalLabor > 0 && (
              <div className="h-full bg-zinc-500 dark:bg-zinc-400 transition-all" style={{ width: `${laborPct}%` }} title={`Upah Kerja: ${laborPct.toFixed(1)}%`} />
            )}
            {totalTools > 0 && (
              <div className="h-full bg-zinc-350 dark:bg-zinc-650 transition-all" style={{ width: `${toolsPct}%` }} title={`Alat Bantu: ${toolsPct.toFixed(1)}%`} />
            )}
            {totalMisc > 0 && (
              <div className="h-full bg-zinc-100 dark:bg-zinc-800 border-l border-white/20 transition-all" style={{ width: `${miscPct}%` }} title={`Lain-lain: ${miscPct.toFixed(1)}%`} />
            )}
          </div>

          {/* Legend with Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <div className="w-3 h-3 rounded bg-zinc-900 dark:bg-zinc-50 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-zinc-800 dark:text-zinc-200">Bahan / Material</div>
                <div className="text-zinc-500 text-[10px]">{formatRupiah(totalMaterials)} ({materialPct.toFixed(1)}%)</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-3 h-3 rounded bg-zinc-500 dark:bg-zinc-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-zinc-800 dark:text-zinc-200">Upah Tenaga</div>
                <div className="text-zinc-500 text-[10px]">{formatRupiah(totalLabor)} ({laborPct.toFixed(1)}%)</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-3 h-3 rounded bg-zinc-350 dark:bg-zinc-650 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-zinc-800 dark:text-zinc-200">Peralatan Kerja</div>
                <div className="text-zinc-500 text-[10px]">{formatRupiah(totalTools)} ({toolsPct.toFixed(1)}%)</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-3 h-3 rounded bg-zinc-150 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-zinc-800 dark:text-zinc-200">Lain-lain (Manual)</div>
                <div className="text-zinc-500 text-[10px]">{formatRupiah(totalMisc)} ({miscPct.toFixed(1)}%)</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-zinc-400">Belum ada data biaya untuk menghitung sebaran.</div>
      )}
    </div>
  );
}
