"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";
import { Edit2 } from "lucide-react";

interface SSHResource {
  name: string;
  unit: string;
  category: "material" | "labor" | "tool";
  unitPrice: number;
}

interface SSHTableProps {
  title: string;
  emoji: string;
  list: SSHResource[];
  editingKey: string | null;
  editValue: string;
  setEditValue: (v: string) => void;
  onStartEdit: (key: string, val: number) => void;
  onSaveEdit: (name: string) => void;
  onKeyDown: (e: React.KeyboardEvent, name: string) => void;
}

export default function SSHTable({
  title,
  emoji,
  list,
  editingKey,
  editValue,
  setEditValue,
  onStartEdit,
  onSaveEdit,
  onKeyDown,
}: SSHTableProps) {
  if (list.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
        <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
          {emoji} {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-zinc-50/30 dark:bg-zinc-900/10 border-b border-zinc-150 dark:border-zinc-800/80 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <th className="py-3 px-5">Nama Komponen</th>
              <th className="py-3 px-5 w-32">Satuan</th>
              <th className="py-3 px-5 w-48 text-right">Harga Satuan Dasar (SSH)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {list.map((r) => {
              const key = `${r.category}-${r.name.toLowerCase()}`;
              const isEditing = editingKey === key;
              return (
                <tr key={key} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                  <td className="py-3 px-5 font-medium text-zinc-800 dark:text-zinc-200">{r.name}</td>
                  <td className="py-3 px-5 text-zinc-500 dark:text-zinc-400">{r.unit}</td>
                  <td className="py-2 px-5 text-right font-mono">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => onSaveEdit(r.name)}
                        onKeyDown={(e) => onKeyDown(e, r.name)}
                        autoFocus
                        className="w-32 px-2 py-1 text-right bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
                      />
                    ) : (
                      <button
                        onClick={() => onStartEdit(key, r.unitPrice)}
                        className="hover:bg-zinc-100 dark:hover:bg-zinc-850 px-2.5 py-1 rounded transition-colors group inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 font-semibold"
                      >
                        {formatRupiah(r.unitPrice)}
                        <Edit2 className="w-3 h-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export type { SSHResource };
