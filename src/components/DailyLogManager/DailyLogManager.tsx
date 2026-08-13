"use client";
import React from "react";
import { Project, useRABStore } from "@/lib/store";
import DailyLogForm from "./DailyLogForm";
import DailyLogHistory from "./DailyLogHistory";

interface DailyLogManagerProps {
  project: Project;
}

export default function DailyLogManager({ project }: DailyLogManagerProps) {
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
  }) => {
    const workers = [
      { role: "Pekerja", count: data.pekerjaCount },
      { role: "Tukang", count: data.tukangCount },
      { role: "Kepala Tukang", count: data.kepalaTukangCount },
      { role: "Mandor", count: data.mandorCount },
    ].filter((w) => w.count > 0);

    addDailyLog(project.id, data.date, data.weather, workers, data.notes);
  };

  const handleDeleteLog = (logId: string) => {
    deleteDailyLog(project.id, logId);
  };

  return (
    <div className="space-y-8 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:p-0 print:border-none print:shadow-none">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 print:pb-2 print:border-b-2 print:border-zinc-800">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase print:text-center print:text-lg">Laporan Harian Lapangan</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 print:hidden">Catat kondisi cuaca, jumlah tenaga kerja, dan aktivitas pekerjaan yang berlangsung setiap hari di lapangan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <DailyLogForm onSubmit={handleAddLog} />
        <DailyLogHistory logs={logs} onDeleteLog={handleDeleteLog} />
      </div>
    </div>
  );
}
