"use client";
import { useState } from "react";
import type { Project, Addendum as AddendumType } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";
import AddendumForm from "./AddendumForm";
import AddendumDetail from "./AddendumDetail";
import { Layers } from "lucide-react";

interface AddendumProps {
  project: Project;
}

export default function Addendum({ project }: AddendumProps) {
  const { deleteAddendum } = useRABStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedAddendum, setSelectedAddendum] = useState<AddendumType | null>(null);

  const addendums = project.addendums || [];

  const calculateAddendumTotal = (add: AddendumType) => {
    return add.items.reduce((sum, item) => {
      if (item.type === "add") return sum + item.quantity * item.unitPrice;
      if (item.type === "remove") return sum - item.quantity * item.unitPrice;
      if (item.type === "modify") {
        const origQty = item.originalQuantity ?? 0;
        const origPrice = item.originalUnitPrice ?? 0;
        const currentTotal = item.quantity * item.unitPrice;
        const origTotal = origQty * origPrice;
        return sum + (currentTotal - origTotal);
      }
      return sum;
    }, 0);
  };

  const totalAddendumDelta = addendums.reduce((sum, add) => sum + calculateAddendumTotal(add), 0);

  const handleDelete = (id: string) => {
    if (confirm("Hapus dokumen Addendum ini? Tindakan ini tidak bisa dibatalkan.")) {
      deleteAddendum(project.id, id);
      if (selectedAddendum?.id === id) setSelectedAddendum(null);
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 flex justify-between items-end flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-2">
            <Layers className="w-5 h-5 text-zinc-400" /> Addendum / Pekerjaan Tambah Kurang
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Catat perubahan kontrak resmi, penambahan, penghapusan, atau modifikasi volume pekerjaan.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowForm((v) => !v); setSelectedAddendum(null); }}
            className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold rounded-lg text-xs transition-colors"
          >
            {showForm ? "Batal" : "+ Buat Addendum"}
          </button>
        </div>
      </div>

      {/* Nilai Kumulatif Info */}
      {addendums.length > 0 && !showForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50/50 dark:bg-zinc-900/10 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs">
            <span className="text-zinc-400 block font-semibold uppercase">Total Nilai Addendum Kumulatif:</span>
            <strong className={`text-base font-bold ${totalAddendumDelta >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {totalAddendumDelta >= 0 ? "+" : ""}{formatRupiah(totalAddendumDelta)}
            </strong>
          </div>
          <div className="text-xs flex items-center justify-end text-zinc-500 font-medium">
            Terdapat {addendums.length} Addendum yang tercatat untuk proyek ini.
          </div>
        </div>
      )}

      {showForm ? (
        <AddendumForm project={project} onSaved={() => setShowForm(false)} />
      ) : selectedAddendum ? (
        <AddendumDetail
          addendum={selectedAddendum}
          projectId={project.id}
          addendumTotal={calculateAddendumTotal(selectedAddendum)}
          onClose={() => setSelectedAddendum(null)}
          onDelete={() => handleDelete(selectedAddendum.id)}
        />
      ) : (
        <div className="space-y-4">
          {addendums.length === 0 ? (
            <div className="py-16 text-center text-xs text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              Belum ada Addendum resmi yang dicatat. Klik &quot;+ Buat Addendum&quot; untuk membuat.
            </div>
          ) : (
            <div className="divide-y divide-zinc-150 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
              {addendums.map((add) => {
                const delta = calculateAddendumTotal(add);
                return (
                  <div key={add.id} className="p-4 bg-zinc-50/20 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 flex justify-between items-center transition-colors">
                    <div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Addendum No. {add.number}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Tanggal: {add.date} · Alasan: {add.reason}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${delta >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {delta >= 0 ? "+" : ""}{formatRupiah(delta)}
                      </span>
                      <button
                        onClick={() => setSelectedAddendum(add)}
                        className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded text-[11px] transition-colors"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleDelete(add.id)}
                        className="text-zinc-300 hover:text-red-500 p-1 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
