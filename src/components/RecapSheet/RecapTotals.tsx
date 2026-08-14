"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";
import type { Addendum, CCO } from "@/lib/store";

interface RecapTotalsProps {
  totalDirectCost: number;
  profit: number;
  tax: number;
  grandTotal: number;
  profitRate: number;
  taxRate: number;
  addendums?: Addendum[];
  ccos?: CCO[];
}

export default function RecapTotals({
  totalDirectCost,
  profit,
  tax,
  grandTotal,
  profitRate,
  taxRate,
  addendums,
  ccos,
}: RecapTotalsProps) {
  const totalAddendum = (addendums || []).reduce((sum, add) => {
    return sum + add.items.reduce((s, item) => {
      const current = item.quantity * item.unitPrice;
      if (item.type === "add") return s + current;
      if (item.type === "remove") return s - current;
      const orig = (item.originalQuantity ?? 0) * (item.originalUnitPrice ?? 0);
      return s + (current - orig);
    }, 0);
  }, 0);

  const totalCCO = (ccos || [])
    .filter((c) => c.status === "Disetujui")
    .reduce((sum, cco) => {
      return sum + cco.items.reduce((s, item) => {
        const current = item.quantity * item.unitPrice;
        if (item.type === "add") return s + current;
        if (item.type === "remove") return s - current;
        const orig = (item.originalQuantity ?? 0) * (item.originalUnitPrice ?? 0);
        return s + (current - orig);
      }, 0);
    }, 0);

  const finalContractValue = grandTotal + totalAddendum + totalCCO;

  return (
    <>
      <tr className="bg-zinc-50 dark:bg-zinc-900/50 font-bold border-t border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 h-11">
        <td className="py-2.5 px-4" />
        <td className="py-2.5 px-4 uppercase">Jumlah Pekerjaan Fisik</td>
        <td className="py-2.5 px-4 text-right">100.00%</td>
        <td className="py-2.5 px-4 text-right">{formatRupiah(totalDirectCost)}</td>
        <td className="py-2.5 px-4 print:hidden" />
      </tr>

      <tr className="bg-zinc-50 dark:bg-zinc-900/50 font-bold text-zinc-900 dark:text-zinc-50 h-11">
        <td className="py-2.5 px-4" />
        <td className="py-2.5 px-4 uppercase">Jasa & Overhead ({(profitRate * 100).toFixed(0)}%)</td>
        <td className="py-2.5 px-4 text-right">{(profitRate * 100).toFixed(2)}%</td>
        <td className="py-2.5 px-4 text-right">{formatRupiah(profit)}</td>
        <td className="py-2.5 px-4 print:hidden" />
      </tr>

      <tr className="bg-zinc-50 dark:bg-zinc-900/50 font-bold text-zinc-900 dark:text-zinc-50 h-11">
        <td className="py-2.5 px-4" />
        <td className="py-2.5 px-4 uppercase">PPN ({(taxRate * 100).toFixed(0)}%)</td>
        <td className="py-2.5 px-4 text-right">{(taxRate * (1 + profitRate) * 100).toFixed(2)}%</td>
        <td className="py-2.5 px-4 text-right">{formatRupiah(tax)}</td>
        <td className="py-2.5 px-4 print:hidden" />
      </tr>

      <tr className="bg-zinc-100 dark:bg-zinc-900/80 font-bold border-t border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-zinc-50 h-12 text-sm">
        <td className="py-2.5 px-4" />
        <td className="py-2.5 px-4 uppercase">Grand Total (Dibulatkan)</td>
        <td className="py-2.5 px-4 text-right">{(grandTotal / totalDirectCost * 100 || 100).toFixed(2)}%</td>
        <td className="py-2.5 px-4 text-right">{formatRupiah(grandTotal)}</td>
        <td className="py-2.5 px-4 print:hidden" />
      </tr>

      {totalAddendum !== 0 && (
        <tr className="bg-zinc-50 dark:bg-zinc-900/50 font-bold text-zinc-900 dark:text-zinc-50 h-11">
          <td className="py-2.5 px-4" />
          <td className="py-2.5 px-4 uppercase text-zinc-500">Kumulatif Addendum Kontrak</td>
          <td className="py-2.5 px-4 text-right" />
          <td className={`py-2.5 px-4 text-right ${totalAddendum >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {totalAddendum >= 0 ? "+" : ""}{formatRupiah(totalAddendum)}
          </td>
          <td className="py-2.5 px-4 print:hidden" />
        </tr>
      )}

      {totalCCO !== 0 && (
        <tr className="bg-zinc-50 dark:bg-zinc-900/50 font-bold text-zinc-900 dark:text-zinc-50 h-11">
          <td className="py-2.5 px-4" />
          <td className="py-2.5 px-4 uppercase text-zinc-500">Kumulatif CCO (Disetujui)</td>
          <td className="py-2.5 px-4 text-right" />
          <td className={`py-2.5 px-4 text-right ${totalCCO >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {totalCCO >= 0 ? "+" : ""}{formatRupiah(totalCCO)}
          </td>
          <td className="py-2.5 px-4 print:hidden" />
        </tr>
      )}

      {(totalAddendum !== 0 || totalCCO !== 0) && (
        <tr className="bg-zinc-100 dark:bg-zinc-900/80 font-bold border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-zinc-50 h-12 text-sm">
          <td className="py-2.5 px-4" />
          <td className="py-2.5 px-4 uppercase">Nilai Kontrak Akhir</td>
          <td className="py-2.5 px-4 text-right">{(finalContractValue / totalDirectCost * 100 || 100).toFixed(2)}%</td>
          <td className="py-2.5 px-4 text-right">{formatRupiah(finalContractValue)}</td>
          <td className="py-2.5 px-4 print:hidden" />
        </tr>
      )}
    </>
  );
}
