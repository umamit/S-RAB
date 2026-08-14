"use client";
import React from "react";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface DeviationAlertProps {
  deviation: number;
  threshold: number;
}

export default function DeviationAlert({ deviation, threshold }: DeviationAlertProps) {
  // Hanya tunjukkan alert jika terjadi keterlambatan (deviasi minus)
  if (deviation >= 0) return null;

  const absoluteDeviation = Math.abs(deviation);
  if (absoluteDeviation < threshold) return null;

  const isCritical = absoluteDeviation >= threshold * 2;

  if (isCritical) {
    return (
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 p-4 rounded-xl flex gap-3 text-red-800 dark:text-red-300">
        <AlertCircle className="w-5 h-5 text-red-650 dark:text-red-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold uppercase tracking-wider text-red-700 dark:text-red-400">Status Proyek: Kritis (Deviasi {deviation.toFixed(2)}%)</p>
          <p className="leading-relaxed">
            Tingkat keterlambatan proyek sudah melampaui batas kritis toleransi (≤ -{threshold * 2}%).
            Direkomendasikan segera melaksanakan <strong>Show Cause Meeting (SCM) ke-1</strong> dengan kontraktor untuk menyusun uji coba (Test Show Cause) penyelesaian pekerjaan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 p-4 rounded-xl flex gap-3 text-amber-800 dark:text-amber-300">
      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div className="text-xs space-y-1">
        <p className="font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Status Proyek: Waspada (Deviasi {deviation.toFixed(2)}%)</p>
        <p className="leading-relaxed">
          Proyek terdeteksi mengalami keterlambatan yang melebihi batas toleransi rencana awal (-{threshold}%).
          Pengawas lapangan harus melakukan evaluasi kendala material/tenaga kerja dan meminta kontraktor mempercepat pengerjaan divisi terkait.
        </p>
      </div>
    </div>
  );
}
