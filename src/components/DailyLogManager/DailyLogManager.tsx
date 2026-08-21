"use client";
import React from "react";
import { Project, useRABStore } from "@/lib/store";
import DailyLogForm from "./DailyLogForm";
import DailyLogHistory from "./DailyLogHistory";
import { Printer } from "lucide-react";

interface DailyLogManagerProps {
  project: Project;
  triggerPrint?: (mode: any) => void;
}

export default function DailyLogManager({ project, triggerPrint }: DailyLogManagerProps) {
  const { addDailyLog, deleteDailyLog } = useRABStore();
  const logs = project.dailyLogs || [];

  const handleAddLog = (data: {
    date: string;
    weather: string;
    pekerjaCount: number;
    tukangCount: number;
    kepalaTukangCount: number;
    mandorCount: number;
    notes: string;
    photos?: string[];
  }) => {
    const workers = [
      { role: "Pekerja", count: data.pekerjaCount },
      { role: "Tukang", count: data.tukangCount },
      { role: "Kepala Tukang", count: data.kepalaTukangCount },
      { role: "Mandor", count: data.mandorCount },
    ].filter((w) => w.count > 0);

    addDailyLog(project.id, data.date, data.weather, workers, data.notes, data.photos);
  };

  const handleDeleteLog = (logId: string) => {
    deleteDailyLog(project.id, logId);
  };

  return (
    <div className="space-y-8 bg-white dark:bg-zinc-955 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:p-0 print:border-none print:shadow-none">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 flex justify-between items-start print:pb-2 print:border-b-2 print:border-zinc-800">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase print:text-center print:text-lg">Laporan Harian Lapangan</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 print:hidden">Catat kondisi cuaca, jumlah tenaga kerja, dan aktivitas pekerjaan yang berlangsung setiap hari di lapangan.</p>
        </div>
        {triggerPrint && (
          <button
            onClick={() => triggerPrint("daily-only")}
            type="button"
            className="text-[11px] font-semibold bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 shadow-sm transition-all print:hidden"
          >
            <Printer className="w-3.5 h-3.5" /> Cetak Log Harian
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <DailyLogForm projectId={project.id} onSubmit={handleAddLog} />
        <DailyLogHistory logs={logs} onDeleteLog={handleDeleteLog} />
      </div>
    </div>
  );
}
