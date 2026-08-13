"use client";
import React from "react";

interface ScheduleHeaderProps {
  numWeeks: number;
  onDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ScheduleHeader({ numWeeks, onDurationChange }: ScheduleHeaderProps) {
  return (
    <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 print:pb-2 print:border-b-2 print:border-zinc-800 flex justify-between items-baseline flex-wrap gap-2">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase print:text-center print:text-lg">
          Jadwal Pelaksanaan & Kurva S
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 print:hidden">
          Atur durasi pekerjaan kategori untuk menggambar proyeksi Kurva S rencana progres fisik.
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 print:hidden">
        <label htmlFor="proj-duration-input" className="uppercase tracking-wider">Durasi Proyek:</label>
        <input
          id="proj-duration-input"
          type="number"
          min={4}
          max={26}
          value={numWeeks}
          onChange={onDurationChange}
          className="w-16 px-2 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center"
        />
        <span>Minggu</span>
      </div>
    </div>
  );
}
