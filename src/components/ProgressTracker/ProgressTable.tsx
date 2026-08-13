"use client";
import React from "react";
import { WeeklyProgress } from "@/lib/store";

interface ProgressCategory {
  subProjectId: string;
  subProjectName: string;
  categoryId: string;
  categoryName: string;
  weight: number;
  startWeek: number;
  durationWeeks: number;
}

interface ProgressTableProps {
  allCategories: ProgressCategory[];
  selectedWeek: number;
  numWeeks: number;
  currentWeekRecord: WeeklyProgress | undefined;
  onProgressChange: (categoryId: string, valStr: string) => void;
}

export default function ProgressTable({
  allCategories,
  selectedWeek,
  numWeeks,
  currentWeekRecord,
  onProgressChange,
}: ProgressTableProps) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs min-w-[600px]">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
            <th className="py-2.5 px-4">Divisi / Kategori Pekerjaan</th>
            <th className="py-2.5 px-4 w-24 text-right">Bobot Proyek</th>
            <th className="py-2.5 px-4 w-36 text-center">Status Rencana Kerja</th>
            <th className="py-2.5 px-4 w-40 text-center print:hidden">Update Progres Kumulatif (%)</th>
            <th className="py-2.5 px-4 w-32 text-right">Kontribusi Progres Riel</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {allCategories.map((cat) => {
            const start = Math.max(1, Math.min(numWeeks, cat.startWeek));
            const duration = Math.max(1, cat.durationWeeks);
            const end = Math.min(numWeeks, start + duration - 1);
            const isPlannedActive = selectedWeek >= start && selectedWeek <= end;
            const isPlannedFuture = selectedWeek < start;

            const progressPercentage = currentWeekRecord?.actualCategoryProgress[cat.categoryId] ?? 0;
            const actualContribution = (progressPercentage / 100) * cat.weight;

            return (
              <tr key={cat.categoryId} className="hover:bg-zinc-50/20 dark:hover:bg-zinc-900/5 text-zinc-700 dark:text-zinc-300 font-medium">
                <td className="py-2.5 px-4">
                  <span className="font-semibold text-zinc-850 dark:text-zinc-200">{cat.categoryName}</span>
                  <div className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5">{cat.subProjectName}</div>
                </td>
                <td className="py-2.5 px-4 text-right font-bold text-zinc-400">{cat.weight.toFixed(2)}%</td>
                <td className="py-2.5 px-4 text-center">
                  {isPlannedActive ? (
                    <span className="inline-block bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">Sedang Berjalan</span>
                  ) : isPlannedFuture ? (
                    <span className="inline-block bg-zinc-100 dark:bg-zinc-800 text-zinc-450 dark:text-zinc-500 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">Belum Dimulai</span>
                  ) : (
                    <span className="inline-block bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">Selesai (Jadwal)</span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-center print:hidden">
                  <div className="flex items-center gap-2 justify-center max-w-[130px] mx-auto">
                    <input type="number" min={0} max={100} step="any" value={progressPercentage || ""}
                      onChange={(e) => onProgressChange(cat.categoryId, e.target.value)} placeholder="0"
                      className="w-16 px-2 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 rounded text-center font-bold focus:outline-none focus:ring-1 focus:ring-zinc-400" />
                    <span className="font-semibold text-zinc-400">%</span>
                  </div>
                </td>
                <td className="py-2.5 px-4 text-right font-bold text-zinc-900 dark:text-zinc-50">{actualContribution.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export type { ProgressCategory };
