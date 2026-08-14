"use client";
import { useState } from "react";
import type { Project, AddendumItem } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";
import AddendumItemInput from "./AddendumItemInput";

interface AddendumFormProps {
  project: Project;
  onSaved: () => void;
}

export default function AddendumForm({ project, onSaved }: AddendumFormProps) {
  const { addAddendum, addAddendumItem } = useRABStore();
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [reason, setReason] = useState("");
  const [tempItems, setTempItems] = useState<Omit<AddendumItem, "id">[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!number.trim() || !reason.trim() || tempItems.length === 0) return;

    addAddendum(project.id, number.trim(), date, reason.trim());

    setTimeout(() => {
      const updatedProjects = useRABStore.getState().projects;
      const proj = updatedProjects.find((p) => p.id === project.id);
      const newAdd = proj?.addendums?.find((a) => a.number === number.trim());
      if (newAdd) {
        tempItems.forEach((it) => {
          addAddendumItem(project.id, newAdd.id, it);
        });
      }
      onSaved();
    }, 50);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-5 text-xs">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Form Draft Addendum Baru</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Nomor Addendum</label>
          <input type="text" required value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Contoh: 01/ADD/RAB/2026"
            className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Tanggal Tanda Tangan</label>
          <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Alasan Perubahan (Justifikasi Teknik)</label>
          <input type="text" required value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Alasan Justifikasi..."
            className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none" />
        </div>
      </div>

      {/* Input component for changes */}
      <AddendumItemInput project={project} onAddItemChange={(item) => setTempItems([...tempItems, item])} />

      {/* List of changes in draft */}
      {tempItems.length > 0 && (
        <div className="space-y-2 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-zinc-950">
          <p className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider text-[10px]">Daftar Item Perubahan ({tempItems.length})</p>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {tempItems.map((it, idx) => {
              const subName = project.subProjects.find((s) => s.id === it.subProjectId)?.name;
              return (
                <div key={idx} className="py-2 flex justify-between items-center text-[11px] font-semibold text-zinc-650 dark:text-zinc-400">
                  <div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase mr-2 ${
                      it.type === "add" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700" :
                      it.type === "remove" ? "bg-red-100 dark:bg-red-950 text-red-700" : "bg-blue-100 dark:bg-blue-950 text-blue-700"
                    }`}>{it.type}</span>
                    <span>{it.name} (Divisi: {subName})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{it.quantity} {it.unit} @ {formatRupiah(it.unitPrice)}</span>
                    <button type="button" onClick={() => setTempItems(tempItems.filter((_, i) => i !== idx))}
                      className="text-zinc-305 hover:text-red-500 font-bold">✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 justify-end pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <button type="submit" disabled={tempItems.length === 0}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs disabled:opacity-50 transition-colors">
          Simpan Addendum
        </button>
      </div>
    </form>
  );
}
