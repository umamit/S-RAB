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
      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-1 py-0.5 rounded focus:outline-none text-xs" />
  );

  return (
    <tr className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 group/row text-zinc-700 dark:text-zinc-300 font-medium">
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
      <td className={`py-2.5 px-4 text-right ${item.actualQuantity !== undefined && item.actualQuantity > item.quantity ? "text-red-650 dark:text-red-400 font-bold bg-red-50/50 dark:bg-red-950/20" : ""}`}>
        {isEditing("actualQuantity") ? mkInp("actualQuantity", "number") : (
          <div onClick={() => handleCellClick(item, "actualQuantity")} className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/60 rounded-sm py-0.5">
            {item.actualQuantity ?? 0}
          </div>
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
  );
}
