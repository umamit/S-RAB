"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";
import { Settings, Trash2 } from "lucide-react";
import type { Item, Category, SubProject, Project } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import type { EditState } from "./types";

interface TableItemRowProps {
  project: Project;
  activeSubProject: SubProject;
  category: Category;
  item: Item;
  index: number;
  totalDirectCost: number;
  editState: EditState;
  editVal: string;
  setEditVal: (v: string) => void;
  handleCellClick: (item: Item, field: "name" | "unit" | "quantity" | "unitPrice" | "actualQuantity") => void;
  handleCellSave: () => void;
  handleCellKeyDown: (e: React.KeyboardEvent) => void;
  setAhspItem: (v: { categoryId: string; itemId: string } | null) => void;
}

export default function TableItemRow({
  project, activeSubProject, category, item, index, totalDirectCost,
  editState, editVal, setEditVal, handleCellClick, handleCellSave, handleCellKeyDown, setAhspItem,
}: TableItemRowProps) {
  const { deleteItem } = useRABStore();
  const itemWeight = totalDirectCost > 0 ? (item.total / totalDirectCost) * 100 : 0;

  const isEditing = (field: "name" | "unit" | "quantity" | "unitPrice" | "actualQuantity") =>
    editState?.categoryId === category.id && editState?.itemId === item.id && editState?.field === field;

  const mkInp = (field: "name" | "unit" | "quantity" | "unitPrice" | "actualQuantity", type = "text") => (
    <input type={type} step="any" autoFocus value={editVal} onChange={(e) => setEditVal(e.target.value)}
      onBlur={handleCellSave} onKeyDown={handleCellKeyDown}
      className="w-full bg-zinc-55 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-2 py-1 rounded focus:outline-none text-xs" />
  );

  return (
    <>
      {/* Desktop view (Standard Table Row) */}
      <tr className="hidden sm:table-row hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 group/row text-zinc-700 dark:text-zinc-300 font-medium">
        <td className="py-2.5 px-4 text-center text-zinc-400">{index + 1}</td>
        <td className="py-2.5 px-4 text-zinc-900 dark:text-zinc-100 font-semibold">
          {isEditing("name") ? mkInp("name") : (
            <div className="flex items-center gap-2 group/title">
              <div onClick={() => handleCellClick(item, "name")} className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/60 px-1 rounded-sm py-0.5 flex-1">{item.name}</div>
              <button onClick={() => setAhspItem({ categoryId: category.id, itemId: item.id })} type="button"
                className={`p-1 rounded shrink-0 ${item.ahsp ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950" : "text-zinc-400 hover:text-zinc-900 opacity-0 group-hover/title:opacity-100"}`}>
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </td>
        <td className="py-2.5 px-4 text-center">{isEditing("unit") ? mkInp("unit") : <div onClick={() => handleCellClick(item, "unit")} className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/60 rounded-sm py-0.5">{item.unit}</div>}</td>
        <td className="py-2.5 px-4 text-right">{isEditing("quantity") ? mkInp("quantity", "number") : <div onClick={() => handleCellClick(item, "quantity")} className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/60 rounded-sm py-0.5">{item.quantity}</div>}</td>
        <td className={`py-2.5 px-4 text-right ${item.actualQuantity !== undefined && item.actualQuantity > item.quantity ? "text-red-655 dark:text-red-400 font-bold bg-red-50/50 dark:bg-red-955/20" : ""}`}>
          {isEditing("actualQuantity") ? mkInp("actualQuantity", "number") : (
            <div onClick={() => handleCellClick(item, "actualQuantity")} className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/60 rounded-sm py-0.5">{item.actualQuantity ?? 0}</div>
          )}
        </td>
        <td className="py-2.5 px-4 text-right">
          {isEditing("unitPrice") ? mkInp("unitPrice", "number") : (
            <div onClick={() => handleCellClick(item, "unitPrice")} className={`cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/60 rounded-sm py-0.5 ${item.ahsp ? "underline decoration-dashed font-bold" : ""}`}>{formatRupiah(item.unitPrice)}</div>
          )}
        </td>
        <td className="py-2.5 px-4 text-right text-zinc-400">{itemWeight.toFixed(2)}%</td>
        <td className="py-2.5 px-4 text-right font-bold text-zinc-900 dark:text-zinc-50">{formatRupiah(item.total)}</td>
        <td className="py-2.5 px-4 text-center">
          <button onClick={() => deleteItem(project.id, activeSubProject.id, category.id, item.id)} type="button"
            className="text-zinc-400 hover:text-red-500 opacity-0 group-hover/row:opacity-100 p-0.5 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
        </td>
      </tr>

      {/* Mobile view (Responsive Card View) */}
      <tr className="block sm:hidden">
        <td colSpan={9} className="block p-2">
          <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-150 dark:border-zinc-800/80 rounded-xl p-3 space-y-2">
            {/* Header: No, Name, Settings, Delete */}
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

            {/* Grid fields */}
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
                <span className="block text-[10px] text-zinc-400 font-medium">VOL RENCANA</span>
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
    </>
  );
}
