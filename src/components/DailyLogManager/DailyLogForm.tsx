"use client";
import { useState } from "react";

interface DailyLogFormProps {
  onSubmit: (data: {
    date: string;
    weather: string;
    pekerjaCount: number;
    tukangCount: number;
    kepalaTukangCount: number;
    mandorCount: number;
    notes: string;
  }) => void;
}

export default function DailyLogForm({ onSubmit }: DailyLogFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [weather, setWeather] = useState("Cerah");
  const [notes, setNotes] = useState("");
  const [pekerjaCount, setPekerjaCount] = useState(0);
  const [tukangCount, setTukangCount] = useState(0);
  const [kepalaTukangCount, setKepalaTukangCount] = useState(0);
  const [mandorCount, setMandorCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    onSubmit({
      date,
      weather,
      pekerjaCount,
      tukangCount,
      kepalaTukangCount,
      mandorCount,
      notes: notes.trim(),
    });

    // Reset inputs
    setNotes("");
    setPekerjaCount(0);
    setTukangCount(0);
    setKepalaTukangCount(0);
    setMandorCount(0);
  };

  const mkInp = (id: string, label: string, val: number, setVal: (v: number) => void) => (
    <div className="flex justify-between items-center bg-white dark:bg-zinc-900 px-2 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <label htmlFor={id} className="font-semibold text-zinc-600 dark:text-zinc-400">{label}</label>
      <input
        id={id}
        type="number"
        min={0}
        value={val || ""}
        onChange={(e) => setVal(Math.max(0, parseInt(e.target.value) || 0))}
        className="w-10 text-right bg-transparent focus:outline-none font-bold"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-1 space-y-4 print:hidden bg-zinc-50/50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Buat Laporan Baru</h3>
      
      <div className="space-y-1">
        <label htmlFor="log-date" className="text-[10px] uppercase font-bold tracking-wider text-zinc-450">Tanggal</label>
        <input id="log-date" type="date" required value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400" />
      </div>

      <div className="space-y-1">
        <label htmlFor="log-weather" className="text-[10px] uppercase font-bold tracking-wider text-zinc-450">Cuaca Dominan</label>
        <select id="log-weather" value={weather} onChange={(e) => setWeather(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium focus:outline-none">
          <option value="Cerah">Cerah / Panas</option>
          <option value="Mendung">Mendung</option>
          <option value="Gerimis">Gerimis</option>
          <option value="Hujan">Hujan Deras</option>
        </select>
      </div>

      <div className="space-y-2 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450">Tenaga Kerja (Orang)</span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mkInp("count-pekerja", "Pekerja", pekerjaCount, setPekerjaCount)}
          {mkInp("count-tukang", "Tukang", tukangCount, setTukangCount)}
          {mkInp("count-kepala", "Kep. Tukang", kepalaTukangCount, setKepalaTukangCount)}
          {mkInp("count-mandor", "Mandor", mandorCount, setMandorCount)}
        </div>
      </div>

      <div className="space-y-1 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3">
        <label htmlFor="log-desc" className="text-[10px] uppercase font-bold tracking-wider text-zinc-450">Uraian Pekerjaan & Hambatan</label>
        <textarea id="log-desc" required rows={4} value={notes} onChange={(e) => setNotes(e.target.value)}
          placeholder="Contoh: Pemasangan kerangka besi sloof kolom Utama as C3-C7. Cuaca gerimis sore hari menghentikan pengecoran 1 jam."
          className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400 leading-relaxed" />
      </div>

      <button type="submit" className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-lg text-xs shadow-sm transition-colors">
        Simpan Laporan Harian
      </button>
    </form>
  );
}
export type { DailyLogFormProps };
