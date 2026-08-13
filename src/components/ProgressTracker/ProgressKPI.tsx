"use client";
import React from "react";

interface ProgressKPIProps {
  plannedProgress: number;
  cumulativeActualWeight: number;
  deviation: number;
}

export default function ProgressKPI({
  plannedProgress,
  cumulativeActualWeight,
  deviation,
}: ProgressKPIProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Target Rencana */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col justify-between">
        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Target Progres Rencana</span>
        <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-150 mt-1">{plannedProgress.toFixed(2)}%</span>
      </div>

      {/* Realisasi Lapangan */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col justify-between">
        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Realisasi Aktual Lapangan</span>
        <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{cumulativeActualWeight.toFixed(2)}%</span>
      </div>

      {/* Deviasi */}
      <div className={`p-4 rounded-xl border flex flex-col justify-between ${
        deviation >= 0
          ? "border-green-200 bg-green-50/20 dark:border-green-950/20 dark:bg-green-950/10"
          : "border-red-200 bg-red-50/20 dark:border-red-950/20 dark:bg-red-950/10"
      }`}>
        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Deviasi Progres</span>
        <div className="flex justify-between items-baseline mt-1">
          <span className={`text-xl font-extrabold ${deviation >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {deviation >= 0 ? "+" : ""}{deviation.toFixed(2)}%
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
            deviation >= 0
              ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400"
              : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400"
          }`}>
            {deviation >= 0 ? "Sesuai Jadwal" : "Terlambat / Delay"}
          </span>
        </div>
      </div>
    </div>
  );
}
