"use client";
import React from "react";
import { AlertCircle } from "lucide-react";
import { formatRupiah } from "@/lib/excel-export";

interface BudgetAlertProps {
  isOverBudget: boolean;
  budgetDeficit: number;
}

export default function BudgetAlert({ isOverBudget, budgetDeficit }: BudgetAlertProps) {
  if (!isOverBudget) return null;

  return (
    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 p-4 rounded-xl flex gap-3 text-red-800 dark:text-red-300">
      <AlertCircle className="w-5 h-5 text-red-655 dark:text-red-400 shrink-0 mt-0.5" />
      <div className="text-xs space-y-1">
        <p className="font-bold uppercase tracking-wider text-red-700 dark:text-red-400">Peringatan: Over-Budget!</p>
        <p className="leading-relaxed">
          Pengeluaran aktual kumulatif telah melampaui anggaran rencana kumulatif sebesar{" "}
          <strong className="underline decoration-wavy decoration-red-500">{formatRupiah(budgetDeficit)}</strong>.
          Segera lakukan evaluasi efisiensi pengeluaran dan tinjau ulang alokasi anggaran belanja lapangan.
        </p>
      </div>
    </div>
  );
}
