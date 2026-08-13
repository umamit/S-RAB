"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";

interface BreakdownItem {
  name: string;
  cost: number;
  percentage: number;
}

interface DistributionChartProps {
  sortedBreakdown: BreakdownItem[];
}

export default function DistributionChart({ sortedBreakdown }: DistributionChartProps) {
  if (sortedBreakdown.length === 0) return null;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
        Distribusi Anggaran Terbesar
      </h3>

      <div className="space-y-4">
        {sortedBreakdown.slice(0, 5).map((item, index) => {
          const colors = [
            "bg-zinc-900 dark:bg-zinc-50",
            "bg-zinc-700 dark:bg-zinc-300",
            "bg-zinc-500 dark:bg-zinc-400",
            "bg-zinc-400 dark:bg-zinc-505",
            "bg-zinc-300 dark:bg-zinc-600",
          ];
          const colorClass = colors[index % colors.length];

          return (
            <div key={item.name} className="space-y-1.5">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 truncate pr-4">
                  {item.name}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-zinc-900 dark:text-zinc-50 font-bold">
                    {formatRupiah(item.cost)}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 font-semibold w-10 text-right">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export type { BreakdownItem };
