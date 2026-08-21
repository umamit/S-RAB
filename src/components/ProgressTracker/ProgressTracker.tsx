"use client";
import { useState, useEffect } from "react";
import { Project, useRABStore } from "@/lib/store";
import { calculateProjectTotals } from "../ProjectList";
import ProgressKPI from "./ProgressKPI";
import ProgressTable from "./ProgressTable";
import DeviationAlert from "./DeviationAlert";
import BudgetAlert from "./BudgetAlert";
import { Printer } from "lucide-react";
import { calculateWeeklyProgressData } from "@/lib/utils/progressCalc";

interface ProgressTrackerProps {
  project: Project;
  triggerPrint?: (mode: any) => void;
}

export default function ProgressTracker({ project, triggerPrint }: ProgressTrackerProps) {
  const { updateWeeklyProgress, updateWeeklyFinancial } = useRABStore();
  const numWeeks = project.durationWeeks || 12;
  const [selectedWeek, setSelectedWeek] = useState(1);
  const { directCost: totalProjectDirectCost } = calculateProjectTotals(project);

  const currentFinancial = project.weeklyFinancials?.find((f) => f.weekNumber === selectedWeek);
  const [prevWeek, setPrevWeek] = useState(selectedWeek);
  const [actualCostInput, setActualCostInput] = useState(() => currentFinancial ? String(currentFinancial.actualCost) : "");

  if (selectedWeek !== prevWeek) {
    setPrevWeek(selectedWeek);
    setActualCostInput(currentFinancial ? String(currentFinancial.actualCost) : "");
  }

  const {
    allCategories,
    cumulativeActualWeight,
    plannedProgress,
    deviation,
    isOverBudget,
    budgetDeficit,
    currentWeekRecord,
    cpi,
    spi,
  } = calculateWeeklyProgressData(project, selectedWeek, totalProjectDirectCost);

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
      <BudgetAlert isOverBudget={isOverBudget} budgetDeficit={budgetDeficit} />
      <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4 print:pb-2 print:border-b-2 print:border-zinc-800 flex justify-between items-baseline flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase print:text-center print:text-lg">Laporan Progres Fisik Bulanan / Mingguan</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 print:hidden">Input persentase realisasi penyelesaian kumulatif pekerjaan di lapangan untuk memantau keterlambatan proyek.</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300 print:hidden">
          <div className="flex items-center gap-2">
            <label htmlFor="progress-week-select" className="uppercase tracking-wider">Pilih Minggu Evaluasi:</label>
            <select id="progress-week-select" value={selectedWeek} onChange={(e) => setSelectedWeek(parseInt(e.target.value) || 1)}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1 font-bold focus:outline-none">
              {Array(numWeeks).fill(0).map((_, idx) => (
                <option key={idx + 1} value={idx + 1}>Minggu ke-{idx + 1}</option>
              ))}
            </select>
          </div>
          {triggerPrint && (
            <button
              onClick={() => triggerPrint("progress-only")}
              type="button"
              className="text-[11px] font-semibold bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak Progress
            </button>
          )}
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
              className="pl-8 pr-3 py-1.5 w-48 bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-semibold focus:outline-none"
            />
          </div>
          <button type="submit" className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-lg text-xs transition-colors">
            Simpan
          </button>
        </form>
      </div>

      <DeviationAlert deviation={deviation} threshold={project.alertThreshold ?? 5} />
      <ProgressKPI plannedProgress={plannedProgress} cumulativeActualWeight={cumulativeActualWeight} deviation={deviation} cpi={cpi} spi={spi} />
      <ProgressTable allCategories={allCategories} selectedWeek={selectedWeek} numWeeks={numWeeks} currentWeekRecord={currentWeekRecord} onProgressChange={handleProgressChange} />
    </div>
  );
}
