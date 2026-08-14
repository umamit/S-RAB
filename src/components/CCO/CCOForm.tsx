"use client";
import { useState } from "react";
import type { Project, CCOItem } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";
import CCOItemInput from "./CCOItemInput";

interface CCOFormProps {
  project: Project;
  onSaved: () => void;
}

export default function CCOForm({ project, onSaved }: CCOFormProps) {
  const { addCCO, addCCOItem } = useRABStore();
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [tempItems, setTempItems] = useState<Omit<CCOItem, "id">[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!number.trim() || tempItems.length === 0) return;

    addCCO(project.id, number.trim(), date, notes.trim() || undefined);

    setTimeout(() => {
      const updatedProjects = useRABStore.getState().projects;
      const proj = updatedProjects.find((p) => p.id === project.id);
      const newCCO = proj?.ccos?.find((c) => c.number === number.trim());
      if (newCCO) {
        tempItems.forEach((it) => {
          addCCOItem(project.id, newCCO.id, it);
        });
      }
      onSaved();
    }, 50);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-5 text-xs">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Form Draft CCO Baru</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Nomor CCO</label>
          <input type="text" required value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Contoh: 01/CCO/RAB/2026"
            className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Tanggal Pengajuan</label>
          <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Catatan Tambahan</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Keterangan CCO..."
            className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none" />
        </div>
      </div>

      <CCOItemInput project={project} onAddItemChange={(item) => setTempItems([...tempItems, item])} />

      {tempItems.length > 0 && (
        <div className="space-y-2 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-zinc-950">
          <p className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider text-[10px]">Daftar Item Perubahan Fisik CCO ({tempItems.length})</p>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-850">
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
                      className="text-zinc-350 hover:text-red-500 font-bold">✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex gap-2 justify-end pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <button type="submit" disabled={tempItems.length === 0}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs disabled:opacity-50 transition-colors">
          Simpan Draft CCO
        </button>
      </div>
    </form>
  );
}
