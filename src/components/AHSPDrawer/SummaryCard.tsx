"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";

interface SummaryCardProps {
  materialsTotal: number;
  laborTotal: number;
  toolsTotal: number;
  calculatedUnitPrice: number;
}

export default function SummaryCard({
  materialsTotal,
  laborTotal,
  toolsTotal,
  calculatedUnitPrice,
}: SummaryCardProps) {
  return (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2 text-xs">
      <h4 className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-[10px] mb-3">
        Ringkasan Analisa Harga Satuan (AHSP)
      </h4>
      <div className="flex justify-between">
        <span className="text-zinc-500">1. Subtotal Bahan / Material</span>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatRupiah(materialsTotal)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-zinc-500">2. Subtotal Upah Tenaga Kerja</span>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatRupiah(laborTotal)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-zinc-500">3. Subtotal Peralatan Kerja</span>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatRupiah(toolsTotal)}</span>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800 my-2 pt-2 flex justify-between font-bold text-sm">
        <span className="text-zinc-900 dark:text-zinc-50">Harga Satuan Kerja (PUPR)</span>
        <span className="text-zinc-950 dark:text-zinc-50">{formatRupiah(calculatedUnitPrice)}</span>
      </div>
    </div>
  );
}
