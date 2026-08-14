"use client";
import { useState, useEffect } from "react";
import { Project, useRABStore } from "@/lib/store";
import { calculateProjectTotals } from "../ProjectList";
import ProgressKPI from "./ProgressKPI";
import ProgressTable, { ProgressCategory } from "./ProgressTable";

interface ProgressTrackerProps {
  project: Project;
}

export default function ProgressTracker({ project }: ProgressTrackerProps) {
  const { updateWeeklyProgress, updateWeeklyFinancial } = useRABStore();
  const numWeeks = project.durationWeeks || 12;
  const [selectedWeek, setSelectedWeek] = useState(1);
  const { directCost: totalProjectDirectCost } = calculateProjectTotals(project);

  const currentFinancial = project.weeklyFinancials?.find((f) => f.weekNumber === selectedWeek);
  const [actualCostInput, setActualCostInput] = useState("");

  useEffect(() => {
    const current = project.weeklyFinancials?.find((f) => f.weekNumber === selectedWeek);
    setActualCostInput(current ? String(current.actualCost) : "");
  }, [selectedWeek, project.weeklyFinancials]);

  const allCategories: ProgressCategory[] = project.subProjects.flatMap((sub) =>
    sub.categories.map((cat) => {
      const catSubtotal = cat.items.reduce((sum, item) => sum + item.total, 0);
      return {
        subProjectId: sub.id,
        subProjectName: sub.name,
        categoryId: cat.id,
        categoryName: cat.name,
        weight: totalProjectDirectCost > 0 ? (catSubtotal / totalProjectDirectCost) * 100 : 0,
        startWeek: cat.startWeek || 1,
        durationWeeks: cat.durationWeeks || 1,
      };
    })
  );

  const weeklyPlannedWeights = Array(numWeeks).fill(0);
  allCategories.forEach((cat) => {
    const start = Math.max(1, Math.min(numWeeks, cat.startWeek));
    const duration = Math.max(1, cat.durationWeeks);
    const end = Math.min(numWeeks, start + duration - 1);
    const distributedWeight = cat.weight / duration;
    for (let w = start - 1; w < end; w++) {
      weeklyPlannedWeights[w] += distributedWeight;
    }
  });

  const cumulativePlannedWeights: number[] = [];
  let currentCumulativePlanned = 0;
  for (let w = 0; w < numWeeks; w++) {
    currentCumulativePlanned += weeklyPlannedWeights[w];
    cumulativePlannedWeights.push(Math.min(100, currentCumulativePlanned));
  }

  const currentWeekRecord = project.weeklyProgress?.find((wp) => wp.weekNumber === selectedWeek);
  let cumulativeActualWeight = 0;
  allCategories.forEach((cat) => {
    const progressPercentage = currentWeekRecord?.actualCategoryProgress[cat.categoryId] ?? 0;
    cumulativeActualWeight += (progressPercentage / 100) * cat.weight;
  });
  cumulativeActualWeight = Math.min(100, cumulativeActualWeight);

  const plannedProgress = cumulativePlannedWeights[selectedWeek - 1] || 0;
  const deviation = cumulativeActualWeight - plannedProgress;

  const handleProgressChange = (categoryId: string, valStr: string) => {
    const parsed = Math.min(100, Math.max(0, parseFloat(valStr) || 0));
    updateWeeklyProgress(project.id, selectedWeek, categoryId, parsed);
  };

  const handleFinancialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(actualCostInput.replace(/[^0-9]/g, "")) || 0;
    updateWeeklyFinancial(project.id, selectedWeek, val);
  };

  return (
    <div className="space-y-8 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:p-0 print:border-none print:shadow-none">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 print:pb-2 print:border-b-2 print:border-zinc-800 flex justify-between items-baseline flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase print:text-center print:text-lg">Laporan Progres Fisik Bulanan / Mingguan</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 print:hidden">Input persentase realisasi penyelesaian kumulatif pekerjaan di lapangan untuk memantau keterlambatan proyek.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 print:hidden">
          <label htmlFor="progress-week-select" className="uppercase tracking-wider">Pilih Minggu Evaluasi:</label>
          <select id="progress-week-select" value={selectedWeek} onChange={(e) => setSelectedWeek(parseInt(e.target.value) || 1)}
            className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1 font-bold focus:outline-none">
            {Array(numWeeks).fill(0).map((_, idx) => (
              <option key={idx + 1} value={idx + 1}>Minggu ke-{idx + 1}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-4 items-center justify-between print:hidden">
        <div>
          <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Keuangan Minggu ke-{selectedWeek}</h4>
          <p className="text-[10px] text-zinc-400">Masukkan nominal pengeluaran/belanja lapangan aktual untuk evaluasi Cash Flow.</p>
        </div>
        <form onSubmit={handleFinancialSubmit} className="flex items-center gap-2">
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-zinc-500 text-xs font-semibold">Rp</span>
            </div>
            <input
              type="number"
              placeholder="0"
              value={actualCostInput}
              onChange={(e) => setActualCostInput(e.target.value)}
              className="pl-8 pr-3 py-1.5 w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-semibold focus:outline-none"
            />
          </div>
          <button type="submit" className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-lg text-xs transition-colors">
            Simpan
          </button>
        </form>
      </div>

      <ProgressKPI plannedProgress={plannedProgress} cumulativeActualWeight={cumulativeActualWeight} deviation={deviation} />
      <ProgressTable allCategories={allCategories} selectedWeek={selectedWeek} numWeeks={numWeeks} currentWeekRecord={currentWeekRecord} onProgressChange={handleProgressChange} />
    </div>
  );
}
