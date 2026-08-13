"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";
import { Settings, Trash2 } from "lucide-react";

interface SubProjectCost {
  id: string;
  name: string;
  cost: number;
}

interface RecapTableProps {
  subprojectCosts: SubProjectCost[];
  totalDirectCost: number;
  profit: number;
  tax: number;
  grandTotal: number;
  profitRate: number;
  taxRate: number;
  editingSubId: string | null;
  editingVal: string;
  setEditingVal: (v: string) => void;
  onStartEdit: (id: string, name: string) => void;
  onSaveEdit: (id: string) => void;
  onKeyDown: (e: React.KeyboardEvent, id: string) => void;
  onSetActiveSub: (id: string) => void;
  onDeleteSub: (id: string, name: string) => void;
}

export default function RecapTable({
  subprojectCosts,
  totalDirectCost,
  profit,
  tax,
  grandTotal,
  profitRate,
  taxRate,
  editingSubId,
  editingVal,
  setEditingVal,
  onStartEdit,
  onSaveEdit,
  onKeyDown,
  onSetActiveSub,
  onDeleteSub,
}: RecapTableProps) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm print:shadow-none print:border-none print:rounded-none">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider print:bg-zinc-100">
            <th className="py-3 px-4 w-16 text-center">No.</th>
            <th className="py-3 px-4">Uraian Pekerjaan / Divisi</th>
            <th className="py-3 px-4 w-36 text-right">Bobot (%)</th>
            <th className="py-3 px-4 w-44 text-right">Jumlah Harga</th>
            <th className="py-3 px-4 w-20 text-center print:hidden">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {subprojectCosts.map((sub, index) => {
            const weight = totalDirectCost > 0 ? (sub.cost / totalDirectCost) * 100 : 0;
            return (
              <tr key={sub.id} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 group text-zinc-700 dark:text-zinc-300 font-medium h-11">
                <td className="py-2.5 px-4 text-center text-zinc-400 dark:text-zinc-550">{index + 1}</td>
                <td className="py-2.5 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                  {editingSubId === sub.id ? (
                    <input type="text" autoFocus value={editingVal} onChange={(e) => setEditingVal(e.target.value)}
                      onBlur={() => onSaveEdit(sub.id)} onKeyDown={(e) => onKeyDown(e, sub.id)}
                      className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded text-sm w-full max-w-sm focus:outline-none" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={() => onSetActiveSub(sub.id)} type="button" className="hover:underline text-left hover:text-zinc-950 dark:hover:text-zinc-50">{sub.name.toUpperCase()}</button>
                      <button onClick={() => onStartEdit(sub.id, sub.name)} type="button" className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-350 p-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"><Settings className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </td>
                <td className="py-2.5 px-4 text-right font-bold text-zinc-400 dark:text-zinc-500">{weight.toFixed(2)}%</td>
                <td className="py-2.5 px-4 text-right font-bold text-zinc-900 dark:text-zinc-50">{formatRupiah(sub.cost)}</td>
                <td className="py-2.5 px-4 text-center print:hidden">
                  <button onClick={() => onDeleteSub(sub.id, sub.name)} type="button" className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            );
          })}
          {subprojectCosts.length === 0 && (
            <tr><td colSpan={5} className="py-8 text-center text-zinc-400 dark:text-zinc-600">Belum ada sub-pekerjaan. Silakan tambahkan di bawah.</td></tr>
          )}

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

          <tr className="bg-zinc-100 dark:bg-zinc-900/80 font-bold border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-zinc-50 h-12 text-sm">
            <td className="py-2.5 px-4" />
            <td className="py-2.5 px-4 uppercase text-zinc-950 dark:text-zinc-50">Grand Total (Dibulatkan)</td>
            <td className="py-2.5 px-4 text-right">{(grandTotal / totalDirectCost * 100 || 100).toFixed(2)}%</td>
            <td className="py-2.5 px-4 text-right text-zinc-950 dark:text-zinc-50">{formatRupiah(grandTotal)}</td>
            <td className="py-2.5 px-4 print:hidden" />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export type { SubProjectCost };
