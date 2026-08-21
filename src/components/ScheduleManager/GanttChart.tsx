"use client";
import React from "react";
import type { Project } from "@/lib/store";
import type { ScheduleCategory } from "./ScheduleTable";
import { AlertTriangle } from "lucide-react";

interface GanttChartProps {
  project: Project;
  allCategories: ScheduleCategory[];
  numWeeks: number;
}

export default function GanttChart({ project, allCategories, numWeeks }: GanttChartProps) {
  return (
    <div className="lg:col-span-3 p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          Linimasa &amp; Progress Bar Kategori (Gantt Chart)
        </h3>
        <span className="text-[10px] text-zinc-400">Bar Hijau = Realisasi Fisik Lapangan | Bar Gelap = Rencana</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <th className="py-2.5 px-3 sticky left-0 bg-zinc-50 dark:bg-zinc-900/60 border-r border-zinc-200 dark:border-zinc-800 z-10">Kategori Pekerjaan</th>
              <th className="py-2.5 px-3 w-16 text-right border-r border-zinc-200 dark:border-zinc-800">Bobot</th>
              {Array.from({ length: numWeeks }).map((_, w) => (
                <th key={w} className="py-2.5 px-1 text-center min-w-[34px] border-r border-zinc-100 dark:border-zinc-800/60">
                  M{w + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {allCategories.map((cat) => {
              const start = Math.max(1, Math.min(numWeeks, cat.startWeek));
              const duration = Math.max(1, cat.durationWeeks);
              const end = Math.min(numWeeks, start + duration - 1);
              
              const currentMaxWeek = project.weeklyProgress?.length || 0;
              const lastRecord = project.weeklyProgress?.find((wp) => wp.weekNumber === currentMaxWeek);
              const actualPct = lastRecord?.actualCategoryProgress[cat.categoryId] ?? 0;
              const isDelayed = currentMaxWeek > end && actualPct < 100;

              return (
                <tr key={cat.categoryId} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 h-10">
                  <td className="py-1.5 px-2.5 font-semibold text-zinc-900 dark:text-zinc-100 sticky left-0 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 truncate min-w-[120px] sm:min-w-[200px] max-w-[120px] sm:max-w-[240px]">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1.5 truncate">
                        {cat.categoryName}
                        {isDelayed && (
                          <span className="shrink-0 bg-red-150 text-red-700 dark:bg-red-950/40 dark:text-red-400 px-1 py-0.5 rounded text-[8px] font-extrabold tracking-tight uppercase flex items-center gap-0.5" title="Pekerjaan terlambat melewati jadwal rencana">
                            <AlertTriangle className="w-2.5 h-2.5" /> Terlambat
                          </span>
                        )}
                      </span>
                      <span className="text-[8px] text-zinc-400 uppercase font-bold tracking-tight">{cat.subProjectName}</span>
                    </div>
                  </td>
                  <td className="py-1 px-3 text-right font-bold border-r border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500">{cat.weight.toFixed(2)}%</td>
                  
                  {Array.from({ length: numWeeks }).map((_, w) => {
                    const weekNum = w + 1;
                    const isPlanned = weekNum >= start && weekNum <= end;

                    // Ambil progres aktual kategori ini di minggu tersebut
                    const weekProgressRecord = project.weeklyProgress?.find((wp) => wp.weekNumber === weekNum);
                    const progressPct = weekProgressRecord?.actualCategoryProgress[cat.categoryId] ?? 0;

                    return (
                      <td key={w} className="p-0 border-r border-zinc-200 dark:border-zinc-800 text-center relative w-14">
                        {/* Rencana bar track */}
                        {isPlanned && (
                          <div className="absolute inset-x-1.5 top-1/2 -translate-y-1/2 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden" title="Rencana">
                            {/* Fill progress inside the plan bar */}
                            {progressPct > 0 && (
                              <div className="h-full bg-emerald-500 dark:bg-emerald-600 rounded-full transition-all duration-300"
                                style={{ width: `${progressPct}%` }}
                                title={`Realisasi: ${progressPct}%`} />
                            )}
                          </div>
                        )}
                        {/* Jika tidak direncanakan tetapi ada progres lapangan */}
                        {!isPlanned && progressPct > 0 && (
                          <div className="absolute inset-x-1.5 top-1/2 -translate-y-1/2 h-2.5 rounded-full bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/60 overflow-hidden" title="Kerja di luar jadwal rencana">
                            <div className="h-full bg-yellow-500 dark:bg-yellow-600 rounded-full transition-all duration-300"
                              style={{ width: `${progressPct}%` }}
                              title={`Realisasi (di luar jadwal): ${progressPct}%`} />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
