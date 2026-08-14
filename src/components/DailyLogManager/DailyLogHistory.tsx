"use client";
import React, { useState } from "react";
import { DailyLog } from "@/lib/store";
import { Sun, Cloud, CloudDrizzle, CloudRain, Trash2 } from "lucide-react";

interface DailyLogHistoryProps {
  logs: DailyLog[];
  onDeleteLog: (id: string) => void;
}

export default function DailyLogHistory({ logs, onDeleteLog }: DailyLogHistoryProps) {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  const getWeatherIcon = (w: string) => {
    switch (w) {
      case "Cerah": return <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case "Hujan": return <CloudRain className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
      case "Mendung": return <Cloud className="w-3.5 h-3.5 text-zinc-400 shrink-0" />;
      case "Gerimis": return <CloudDrizzle className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
      default: return <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
    }
  };

  return (
    <div className="lg:col-span-2 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 print:hidden">
        Riwayat Laporan Lapangan ({logs.length})
      </h3>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 print:max-h-none print:overflow-visible">
        {sortedLogs.map((log) => {
          const formattedDate = new Date(log.date).toLocaleDateString("id-ID", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          });
          return (
            <div key={log.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-3 relative group print:border-b print:border-zinc-300 print:rounded-none print:shadow-none print:p-3">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 print:text-[11px]">{formattedDate}</h4>
                  <span className="text-[10px] inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 px-2 py-0.5 rounded-full mt-1.5 font-semibold">
                    {getWeatherIcon(log.weather)}
                    <span>{log.weather}</span>
                  </span>
                </div>
                <button onClick={() => { if (confirm("Hapus laporan harian ini?")) onDeleteLog(log.id); }} type="button"
                  className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium bg-zinc-50/40 dark:bg-zinc-900/30 p-3 rounded-xl border border-zinc-100 dark:border-zinc-900 print:bg-transparent print:border-none print:p-0 print:text-[10px]">{log.notes}</p>
              
              {log.photos && log.photos.length > 0 && (
                <div className="flex gap-2 flex-wrap pt-1 print:gap-1">
                  {log.photos.map((url, idx) => (
                    <div key={idx} className="relative group/photo cursor-pointer w-20 h-20 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0"
                      onClick={() => setLightboxUrl(url)}>
                      <img src={url} alt={`Dokumentasi ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                    </div>
                  ))}
                </div>
              )}

              {log.workers.length > 0 && (
                <div className="flex items-baseline gap-2 flex-wrap text-[10px] text-zinc-400 font-semibold print:text-[9px]">
                  <span className="uppercase text-[9px] text-zinc-400 tracking-wider">Tenaga Kerja:</span>
                  {log.workers.map((w) => (
                    <span key={w.role} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-105 dark:border-zinc-850 px-2 py-0.5 rounded text-zinc-650 dark:text-zinc-350 print:bg-transparent print:border-none">
                      {w.role}: <strong className="text-zinc-800 dark:text-zinc-200">{w.count} org</strong>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {logs.length === 0 && (
          <div className="text-center py-16 text-xs text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/20">Belum ada laporan harian lapangan yang dicatat.</div>
        )}
      </div>

      {lightboxUrl && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center z-50 print:hidden" onClick={() => setLightboxUrl(null)}>
          <div className="relative max-w-3xl max-h-[85vh] p-2">
            <img src={lightboxUrl} alt="Dokumentasi Full" className="max-w-full max-h-[80vh] rounded-lg object-contain shadow-2xl" />
            <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 font-bold transition-colors">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

