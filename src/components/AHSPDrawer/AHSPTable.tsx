"use client";
import React from "react";
import { AHSP, AHSPEntry } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";
import { SectionType } from "./types";

interface AHSPTableProps {
  localAHSP: AHSP;
  activeSection: SectionType;
  onUpdateEntry: (
    section: SectionType,
    entryId: string,
    field: keyof Omit<AHSPEntry, "id">,
    value: string | number
  ) => void;
  onDeleteEntry: (section: SectionType, entryId: string) => void;
}

export default function AHSPTable({
  localAHSP,
  activeSection,
  onUpdateEntry,
  onDeleteEntry,
}: AHSPTableProps) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
            <th className="py-2 px-3">Uraian / Deskripsi</th>
            <th className="py-2 px-3 w-16 text-center">Satuan</th>
            <th className="py-2 px-3 w-20 text-right">Koefisien</th>
            <th className="py-2 px-3 w-28 text-right">Harga Satuan</th>
            <th className="py-2 px-3 w-28 text-right">Subtotal</th>
            <th className="py-2 px-3 w-10 text-center"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {localAHSP[activeSection].map((entry) => {
            const entrySubtotal = entry.coefficient * entry.unitPrice;

            return (
              <tr key={entry.id} className="hover:bg-zinc-50/20 dark:hover:bg-zinc-900/5 group">
                <td className="py-2 px-3">
                  <input
                    type="text"
                    value={entry.name}
                    onChange={(e) => onUpdateEntry(activeSection, entry.id, "name", e.target.value)}
                    className="bg-transparent border-b border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 w-full focus:outline-none"
                  />
                </td>
                <td className="py-2 px-3 text-center">
                  <input
                    type="text"
                    value={entry.unit}
                    onChange={(e) => onUpdateEntry(activeSection, entry.id, "unit", e.target.value)}
                    className="bg-transparent border-b border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 text-center w-full focus:outline-none"
                  />
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    step="any"
                    value={entry.coefficient}
                    onChange={(e) =>
                      onUpdateEntry(activeSection, entry.id, "coefficient", parseFloat(e.target.value) || 0)
                    }
                    className="bg-transparent border-b border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 text-right w-full focus:outline-none font-medium"
                  />
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    value={entry.unitPrice}
                    onChange={(e) =>
                      onUpdateEntry(activeSection, entry.id, "unitPrice", parseInt(e.target.value) || 0)
                    }
                    className="bg-transparent border-b border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 text-right w-full focus:outline-none font-medium"
                  />
                </td>
                <td className="py-2 px-3 text-right font-semibold text-zinc-900 dark:text-zinc-50">
                  {formatRupiah(entrySubtotal)}
                </td>
                <td className="py-2 px-3 text-center">
                  <button
                    onClick={() => onDeleteEntry(activeSection, entry.id)}
                    type="button"
                    className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}

          {localAHSP[activeSection].length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-zinc-400 dark:text-zinc-650 font-medium">
                Belum ada komponen di kategori ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
