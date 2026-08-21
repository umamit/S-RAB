"use client";
import React from "react";
import type { ParsedBoqResult } from "@/lib/rag/boqParserService";
import { formatRupiah } from "@/lib/excel-export";
import { CheckCircle2, AlertCircle, ArrowLeft, Download } from "lucide-react";

interface ParserPreviewStepProps {
  result: ParsedBoqResult;
  onBack: () => void;
  onImport: () => void;
}

export default function ParserPreviewStep({ result, onBack, onImport }: ParserPreviewStepProps) {
  const totalEstimatedCost = result.categories.reduce((catSum, cat) =>
    catSum + cat.items.reduce((itemSum, item) => itemSum + item.total, 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex-wrap gap-2 text-xs">
        <div>
          <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] block">Sub-Proyek Terdeteksi:</span>
          <strong className="text-zinc-900 dark:text-zinc-100 text-sm">{result.subProjectName}</strong>
        </div>
        <div className="text-right">
          <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] block">Estimasi Biaya Awal:</span>
          <strong className="text-zinc-950 dark:text-zinc-50 text-sm">{formatRupiah(totalEstimatedCost)}</strong>
        </div>
      </div>

      <div className="max-h-[380px] overflow-y-auto space-y-4 pr-1">
        {result.categories.map((cat, cIdx) => (
          <div key={cat.id} className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-900 dark:text-zinc-100">
              {cIdx + 1}. {cat.name} ({cat.items.length} item)
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {cat.items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/20">
                    <td className="py-2 px-4 font-semibold text-zinc-800 dark:text-zinc-200">{item.name}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-zinc-600 dark:text-zinc-400">{item.quantity} {item.unit}</td>
                    <td className="py-2 px-4 text-right">
                      {item.matchedAhspName ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded-md font-semibold border border-emerald-200 dark:border-emerald-900/60" title={item.matchedAhspName}>
                          <CheckCircle2 className="w-3 h-3" /> AHSP SNI Terpasang
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] px-2 py-0.5 rounded-md font-medium">
                          <AlertCircle className="w-3 h-3 text-zinc-400" /> Manual
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-right font-bold text-zinc-900 dark:text-zinc-100">{formatRupiah(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <button
          type="button"
          onClick={onImport}
          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <Download className="w-4 h-4" /> Konfirmasi & Masukkan ke Lembar Kerja RAB
        </button>
      </div>
    </div>
  );
}
