"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";

interface SummaryCardsProps {
  grandTotal: number;
  directCost: number;
  profit: number;
  tax: number;
  profitRate: number;
  taxRate: number;
}

export default function SummaryCards({
  grandTotal,
  directCost,
  profit,
  tax,
  profitRate,
  taxRate,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Grand Total */}
      <div className="p-5 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-md shadow-zinc-900/10 flex flex-col justify-between">
        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">Grand Total RAB</span>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight">{formatRupiah(grandTotal)}</span>
          <div className="text-[10px] opacity-60 mt-1">Sudah termasuk PPN & Jasa</div>
        </div>
      </div>

      {/* Biaya Fisik */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">Pekerjaan Fisik (Murni)</span>
        <div className="mt-2">
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{formatRupiah(directCost)}</span>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Semua sub-pekerjaan</div>
        </div>
      </div>

      {/* Jasa Konstruksi */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">Jasa & Overhead ({(profitRate * 100).toFixed(0)}%)</span>
        <div className="mt-2">
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{formatRupiah(profit)}</span>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Biaya manajemen pelaksana</div>
        </div>
      </div>

      {/* PPN */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">PPN ({(taxRate * 100).toFixed(0)}%)</span>
        <div className="mt-2">
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{formatRupiah(tax)}</span>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Pajak Pertambahan Nilai</div>
        </div>
      </div>
    </div>
  );
}
