"use client";
import React from "react";
import { Trash2, Settings, Plus } from "lucide-react";
import { useRABStore } from "@/lib/store";
import type { Category, SubProject, Project, Item } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";
import AHSPDrawer from "@/components/AHSPDrawer";
import TableItemRow from "./TableItemRow";
import type { EditState, CatEditState } from "./types";

interface ItemRowProps {
  project: Project;
  category: Category;
  activeSubProject: SubProject;
  totalDirectCost: number;
  categorySubtotal: number;
  categoryWeight: number;
  editState: EditState;
  setEditState: (s: EditState) => void;
  editVal: string;
  setEditVal: (v: string) => void;
  catEditState: CatEditState;
  setCatEditState: (s: CatEditState) => void;
  catEditVal: string;
  setCatEditVal: (v: string) => void;
  ahspItem: { categoryId: string; itemId: string } | null;
  setAhspItem: (v: { categoryId: string; itemId: string } | null) => void;
  onCategorySave: (categoryId: string) => void;
  onAddItem: () => void;
  onDeleteCategory: () => void;
}

export default function ItemRow({
  project, category, activeSubProject, totalDirectCost,
  categorySubtotal, categoryWeight,
  editState, setEditState, editVal, setEditVal,
  catEditState, setCatEditState, catEditVal, setCatEditVal,
  ahspItem, setAhspItem,
  onCategorySave, onAddItem, onDeleteCategory,
}: ItemRowProps) {
  const { updateItem, updateItemActualQuantity } = useRABStore();

  const handleCellClick = (item: Item, field: "name" | "unit" | "quantity" | "unitPrice" | "actualQuantity") => {
    if (field === "unitPrice" && item.ahsp) { setAhspItem({ categoryId: category.id, itemId: item.id }); return; }
    setEditState({ categoryId: category.id, itemId: item.id, field });
    const val = item[field];
    setEditVal(val !== undefined && val !== null ? val.toString() : "");
  };

  const handleCellSave = () => {
    if (!editState) return;
    const { categoryId, itemId, field } = editState;
    if (field === "actualQuantity") {
      const parsed = parseFloat(editVal);
      const value = isNaN(parsed) ? 0 : parsed;
      updateItemActualQuantity(project.id, activeSubProject.id, categoryId, itemId, value);
    } else {
      let value: string | number = editVal;
      if (field === "quantity" || field === "unitPrice") {
        const parsed = parseFloat(editVal);
        value = isNaN(parsed) ? 0 : parsed;
      }
      updateItem(project.id, activeSubProject.id, categoryId, itemId, { [field]: value });
    }
    setEditState(null);
  };

  const handleCellKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCellSave();
    else if (e.key === "Escape") setEditState(null);
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-zinc-50 dark:bg-zinc-900/50 px-4 py-3 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex-1 pr-4">
          {catEditState === category.id ? (
            <input type="text" autoFocus value={catEditVal} onChange={(e) => setCatEditVal(e.target.value)}
              onBlur={() => onCategorySave(category.id)}
              onKeyDown={(e) => { if (e.key === "Enter") onCategorySave(category.id); else if (e.key === "Escape") setCatEditState(null); }}
              className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded text-sm font-bold w-full max-w-md focus:outline-none" />
          ) : (
            <div className="flex items-center gap-2 group">
              <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50">{category.name}</span>
              <button onClick={() => { setCatEditState(category.id); setCatEditVal(category.name); }} type="button"
                className="text-zinc-400 hover:text-zinc-650 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><Settings className="w-3.5 h-3.5" /></button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-end">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider shrink-0">Bobot: {categoryWeight.toFixed(2)}%</span>
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 shrink-0">Subtotal: {formatRupiah(categorySubtotal)}</span>
          <button onClick={onDeleteCategory} type="button" className="p-1 text-zinc-400 hover:text-red-500 transition-colors shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="hidden sm:table-header-group">
            <tr className="bg-zinc-100/55 dark:bg-zinc-900/20 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-4 w-12 text-center">No.</th>
              <th className="py-2.5 px-4">Uraian Pekerjaan</th>
              <th className="py-2.5 px-4 text-center">Satuan</th>
              <th className="py-2.5 px-4 text-right">Vol Rencana</th>
              <th className="py-2.5 px-4 text-right">Vol Realisasi</th>
              <th className="py-2.5 px-4 text-right">Harga Satuan</th>
              <th className="py-2.5 px-4 text-right">Bobot (%)</th>
              <th className="py-2.5 px-4 text-right">Jumlah Harga</th>
              <th className="py-2.5 px-4 w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {category.items.map((item, index) => (
              <TableItemRow key={item.id} project={project} activeSubProject={activeSubProject} category={category} item={item} index={index}
                totalDirectCost={totalDirectCost} editState={editState} editVal={editVal} setEditVal={setEditVal}
                handleCellClick={handleCellClick} handleCellSave={handleCellSave} handleCellKeyDown={handleCellKeyDown} setAhspItem={setAhspItem} />
            ))}
            {category.items.length === 0 && (
              <tr><td colSpan={9} className="py-6 text-center text-zinc-400">Belum ada item pekerjaan di kategori ini.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-3 bg-zinc-50/30 dark:bg-zinc-900/10 border-t border-zinc-100 dark:border-zinc-800/80"><button onClick={onAddItem} type="button" className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Tambah Baris Pekerjaan</button></div>

      <AHSPDrawer projectId={project.id} categoryId={ahspItem?.categoryId || ""} itemId={ahspItem?.itemId || null} isOpen={ahspItem !== null && ahspItem.categoryId === category.id} onClose={() => setAhspItem(null)} />
    </div>
  );
}
