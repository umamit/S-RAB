"use client";
import React from "react";

interface ScheduleCategory {
  subProjectId: string;
  subProjectName: string;
  categoryId: string;
  categoryName: string;
  weight: number;
  startWeek: number;
  durationWeeks: number;
}

interface ScheduleTableProps {
  projectId: string;
  allCategories: ScheduleCategory[];
  numWeeks: number;
  updateCategorySchedule: (
    projectId: string,
    subProjectId: string,
    categoryId: string,
    startWeek: number,
    durationWeeks: number
  ) => void;
}

export default function ScheduleTable({
  projectId,
  allCategories,
  numWeeks,
  updateCategorySchedule,
}: ScheduleTableProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
        Penjadwalan Kategori Pekerjaan
      </h3>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs min-w-[650px]">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-3">Divisi / Kelompok</th>
              <th className="py-2.5 px-3 w-16 text-right">Bobot</th>
              <th className="py-2.5 px-3 w-20 text-center print:hidden">Mulai Mng</th>
              <th className="py-2.5 px-3 w-20 text-center print:hidden">Durasi Mng</th>
              <th className="py-2.5 px-3 text-center">Visual Timeline Kerja ({numWeeks} Minggu)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {allCategories.map((cat) => {
              const start = Math.max(1, Math.min(numWeeks, cat.startWeek));
              const duration = Math.max(1, cat.durationWeeks);
              const end = Math.min(numWeeks, start + duration - 1);

              return (
                <tr key={cat.categoryId} className="hover:bg-zinc-50/20 dark:hover:bg-zinc-900/5 text-zinc-700 dark:text-zinc-300">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-zinc-850 dark:text-zinc-200 truncate max-w-[200px]" title={cat.categoryName}>
                      {cat.categoryName}
                    </div>
                    <div className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium">
                      {cat.subProjectName}
                    </div>
                  </td>
                  
                  <td className="py-2.5 px-3 text-right font-bold text-zinc-500 dark:text-zinc-400">
                    {cat.weight.toFixed(2)}%
                  </td>

                  {/* Start Week Selector */}
                  <td className="py-2.5 px-3 text-center print:hidden">
                    <select
                      value={cat.startWeek}
                      onChange={(e) =>
                        updateCategorySchedule(
                          projectId,
                          cat.subProjectId,
                          cat.categoryId,
                          parseInt(e.target.value) || 1,
                          cat.durationWeeks
                        )
                      }
                      className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5 text-center focus:outline-none"
                    >
                      {Array(numWeeks).fill(0).map((_, idx) => (
                        <option key={idx + 1} value={idx + 1}>M{idx + 1}</option>
                      ))}
                    </select>
                  </td>

                  {/* Duration Week Selector */}
                  <td className="py-2.5 px-3 text-center print:hidden">
                    <select
                      value={cat.durationWeeks}
                      onChange={(e) =>
                        updateCategorySchedule(
                          projectId,
                          cat.subProjectId,
                          cat.categoryId,
                          cat.startWeek,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5 text-center focus:outline-none"
                    >
                      {Array(numWeeks - start + 1).fill(0).map((_, idx) => (
                        <option key={idx + 1} value={idx + 1}>{idx + 1} M</option>
                      ))}
                    </select>
                  </td>

                  {/* Timeline Block */}
                  <td className="py-2.5 px-3">
                    <div className="flex h-5 items-center gap-0.5 w-full bg-zinc-50/50 dark:bg-zinc-900/10 rounded overflow-hidden p-0.5 border border-zinc-100 dark:border-zinc-900">
                      {Array(numWeeks).fill(0).map((_, idx) => {
                        const weekNum = idx + 1;
                        const isWorkActive = weekNum >= start && weekNum <= end;
                        return (
                          <div
                            key={idx}
                            className={`h-full flex-1 rounded-sm text-[8px] flex items-center justify-center font-bold font-mono transition-all ${
                              isWorkActive
                                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-xs"
                                : "bg-transparent text-zinc-300 dark:text-zinc-850"
                            }`}
                            title={`Minggu ${weekNum}`}
                          >
                            {isWorkActive ? weekNum : "."}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export type { ScheduleCategory };
