"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";
import { Settings, Trash2, Calculator } from "lucide-react";
import type { Item, Category, SubProject, Project } from "@/lib/store";
import type { EditState } from "./types";

interface MobileItemCardProps {
  project: Project;
  activeSubProject: SubProject;
  category: Category;
  item: Item;
  index: number;
  itemWeight: number;
  isEditing: (field: "name" | "unit" | "quantity" | "unitPrice" | "actualQuantity") => boolean;
  mkInp: (field: "name" | "unit" | "quantity" | "unitPrice" | "actualQuantity", type?: string) => React.ReactNode;
  handleCellClick: (item: Item, field: "name" | "unit" | "quantity" | "unitPrice" | "actualQuantity") => void;
  setAhspItem: (v: { categoryId: string; itemId: string } | null) => void;
  deleteItem: (pId: string, sId: string, cId: string, iId: string) => void;
  onOpenTakeOff: () => void;
}

export default function MobileItemCard({
  project, activeSubProject, category, item, index, itemWeight,
  isEditing, mkInp, handleCellClick, setAhspItem, deleteItem, onOpenTakeOff,
}: MobileItemCardProps) {
  return (
    <tr className="block sm:hidden">
      <td colSpan={9} className="block p-2">
        <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-150 dark:border-zinc-800/80 rounded-xl p-3 space-y-2">
          <div className="flex items-start justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/50 pb-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {isEditing("name") ? mkInp("name") : (
                  <div onClick={() => handleCellClick(item, "name")} className="cursor-pointer break-words leading-relaxed py-0.5">{item.name}</div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => setAhspItem({ categoryId: category.id, itemId: item.id })} type="button"
                className={`p-1.5 rounded-lg border ${item.ahsp ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 border-transparent" : "text-zinc-500 border-zinc-200 dark:border-zinc-800"}`}>
                <Settings className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => deleteItem(project.id, activeSubProject.id, category.id, item.id)} type="button"
                className="p-1.5 rounded-lg border border-red-100 dark:border-red-950/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-zinc-500 dark:text-zinc-400">
            <div>
              <span className="block text-[10px] text-zinc-400 font-medium">SATUAN</span>
              {isEditing("unit") ? mkInp("unit") : <div onClick={() => handleCellClick(item, "unit")} className="cursor-pointer font-bold text-zinc-700 dark:text-zinc-300 py-0.5">{item.unit || "-"}</div>}
            </div>
            <div>
              <span className="block text-[10px] text-zinc-400 font-medium">BOBOT (%)</span>
              <div className="py-0.5 font-bold text-zinc-700 dark:text-zinc-300">{itemWeight.toFixed(2)}%</div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="block text-[10px] text-zinc-400 font-medium">VOL RENCANA</span>
                <button type="button" onClick={onOpenTakeOff} className="text-blue-500 p-0.5"><Calculator className="w-3 h-3" /></button>
              </div>
              {isEditing("quantity") ? mkInp("quantity", "number") : <div onClick={() => handleCellClick(item, "quantity")} className="cursor-pointer font-bold text-zinc-700 dark:text-zinc-300 py-0.5">{item.quantity}</div>}
            </div>
            <div>
              <span className="block text-[10px] text-zinc-400 font-medium">VOL REALISASI</span>
              <div className={`rounded px-1 -mx-1 ${item.actualQuantity !== undefined && item.actualQuantity > item.quantity ? "text-red-655 dark:text-red-400 font-bold bg-red-50/50 dark:bg-red-955/10" : ""}`}>
                {isEditing("actualQuantity") ? mkInp("actualQuantity", "number") : <div onClick={() => handleCellClick(item, "actualQuantity")} className="cursor-pointer font-bold py-0.5">{item.actualQuantity ?? 0}</div>}
              </div>
            </div>
            <div>
              <span className="block text-[10px] text-zinc-400 font-medium">HARGA SATUAN</span>
              {isEditing("unitPrice") ? mkInp("unitPrice", "number") : (
                <div onClick={() => handleCellClick(item, "unitPrice")} className={`cursor-pointer font-bold text-zinc-700 dark:text-zinc-300 py-0.5 ${item.ahsp ? "underline decoration-dashed" : ""}`}>{formatRupiah(item.unitPrice)}</div>
              )}
            </div>
            <div>
              <span className="block text-[10px] text-zinc-400 font-medium">JUMLAH HARGA</span>
              <div className="py-0.5 font-extrabold text-zinc-900 dark:text-zinc-50">{formatRupiah(item.total)}</div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
