"use client";
import { useState } from "react";
import type { Project, CCO as CCOType } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";
import CCOForm from "./CCOForm";
import CCODetail from "./CCODetail";
import CCOStatusBadge from "./CCOStatusBadge";
import { Layers } from "lucide-react";

interface CCOProps {
  project: Project;
}

export default function CCO({ project }: CCOProps) {
  const { deleteCCO } = useRABStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedCCO, setSelectedCCO] = useState<CCOType | null>(null);

  const ccos = project.ccos || [];

  const calculateCCOTotal = (c: CCOType) => {
    return c.items.reduce((sum, item) => {
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

  const totalCCODelta = ccos
    .filter((c) => c.status === "Disetujui")
    .reduce((sum, c) => sum + calculateCCOTotal(c), 0);

  const handleDelete = (id: string) => {
    if (confirm("Hapus dokumen CCO ini? Tindakan ini tidak bisa dibatalkan.")) {
      deleteCCO(project.id, id);
      if (selectedCCO?.id === id) setSelectedCCO(null);
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 flex justify-between items-end flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-2">
            <Layers className="w-5 h-5 text-zinc-400" /> CCO (Contract Change Order)
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Pengajuan dan persetujuan perubahan volume fisik lapangan untuk dasar penarikan termin (MC).
          </p>
        </div>
        <button
          onClick={() => { setShowForm((v) => !v); setSelectedCCO(null); }}
          className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold rounded-lg text-xs transition-colors"
        >
          {showForm ? "Batal" : "+ Buat CCO"}
        </button>
      </div>

      {ccos.length > 0 && !showForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50/50 dark:bg-zinc-900/10 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs">
            <span className="text-zinc-400 block font-semibold uppercase">Total Nilai CCO Disetujui Kumulatif:</span>
            <strong className={`text-base font-bold ${totalCCODelta >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {totalCCODelta >= 0 ? "+" : ""}{formatRupiah(totalCCODelta)}
            </strong>
          </div>
          <div className="text-xs flex items-center justify-end text-zinc-550 font-semibold uppercase tracking-wider">
            Total Pengajuan: {ccos.length} CCO
          </div>
        </div>
      )}

      {showForm ? (
        <CCOForm project={project} onSaved={() => setShowForm(false)} />
      ) : selectedCCO ? (
        <CCODetail
          cco={selectedCCO}
          projectId={project.id}
          ccoTotal={calculateCCOTotal(selectedCCO)}
          onClose={() => setSelectedCCO(null)}
          onDelete={() => handleDelete(selectedCCO.id)}
        />
      ) : (
        <div className="space-y-4">
          {ccos.length === 0 ? (
            <div className="py-16 text-center text-xs text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              Belum ada CCO fisik lapangan yang dicatat. Klik &quot;+ Buat CCO&quot; untuk membuat.
            </div>
          ) : (
            <div className="divide-y divide-zinc-150 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
              {ccos.map((c) => {
                const delta = calculateCCOTotal(c);
                return (
                  <div key={c.id} className="p-4 bg-zinc-50/20 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 flex justify-between items-center transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">CCO No. {c.number}</p>
                        <CCOStatusBadge status={c.status} />
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Tanggal Pengajuan: {c.date} {c.notes && `· Keterangan: ${c.notes}`}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${delta >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {delta >= 0 ? "+" : ""}{formatRupiah(delta)}
                      </span>
                      <button
                        onClick={() => setSelectedCCO(c)}
                        className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded text-[11px] transition-colors"
                      >
                        Detail
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="text-zinc-300 hover:text-red-500 p-1 transition-colors">
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
