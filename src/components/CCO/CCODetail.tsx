"use client";
import type { CCO, CCOStatus } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";
import CCOStatusBadge from "./CCOStatusBadge";
import { Printer, Trash2 } from "lucide-react";

interface CCODetailProps {
  cco: CCO;
  projectId: string;
  ccoTotal: number;
  onClose: () => void;
  onDelete: () => void;
  triggerPrint?: (mode: any, subId?: string | null, itemId?: string | null) => void;
}

export default function CCODetail({ cco, projectId, ccoTotal, onClose, onDelete, triggerPrint }: CCODetailProps) {
  const { updateCCOStatus } = useRABStore();

  const handleStatusChange = (newStatus: CCOStatus) => {
    updateCCOStatus(projectId, cco.id, newStatus);
  };

  const handlePrint = () => {
    if (triggerPrint) {
      triggerPrint("cco-only", null, cco.id);
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-zinc-50/50 dark:bg-zinc-900/10 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs">
      <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">CCO No. {cco.number}</h3>
          <CCOStatusBadge status={cco.status} />
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-semibold text-zinc-500 mr-1">Status CCO:</label>
          <select value={cco.status} onChange={(e) => handleStatusChange(e.target.value as CCOStatus)}
            className="px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded font-semibold focus:outline-none text-[11px]">
            <option value="Draft">Draft</option>
            <option value="Diajukan">Diajukan</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
          </select>
          <button onClick={handlePrint} className="px-3 py-1.5 bg-zinc-205 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-lg text-[11px] flex items-center gap-1">
            <Printer className="w-3.5 h-3.5" /> Cetak
          </button>
          <button onClick={onDelete} className="px-3 py-1.5 bg-red-650 hover:bg-red-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> Hapus
          </button>
          <button onClick={onClose} className="px-3 py-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 font-semibold text-[11px]">
            Tutup
          </button>
        </div>
      </div>

      {cco.notes && (
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400">Catatan:</span>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold bg-white dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">{cco.notes}</p>
        </div>
      )}

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-100/50 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              <th className="py-2 px-3 w-10 text-center">No</th>
              <th className="py-2 px-3">Tipe</th>
              <th className="py-2 px-3">Uraian Pekerjaan</th>
              <th className="py-2 px-3 text-center">Sat</th>
              <th className="py-2 px-3 text-right">Vol Awal</th>
              <th className="py-2 px-3 text-right">Vol Baru</th>
              <th className="py-2 px-3 text-right">Harga Baru</th>
              <th className="py-2 px-3 text-right">Selisih Delta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 font-medium text-zinc-650 dark:text-zinc-400">
            {cco.items.map((item, index) => {
              const origTotal = (item.originalQuantity ?? 0) * (item.originalUnitPrice ?? 0);
              const currentTotal = item.quantity * item.unitPrice;
              let delta = 0;
              if (item.type === "add") delta = currentTotal;
              else if (item.type === "remove") delta = -origTotal;
              else delta = currentTotal - origTotal;

              return (
                <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                  <td className="py-2 px-3 text-center text-zinc-400">{index + 1}</td>
                  <td className="py-2 px-3">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                      item.type === "add" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700" :
                      item.type === "remove" ? "bg-red-100 dark:bg-red-950 text-red-700" : "bg-blue-100 dark:bg-blue-950 text-blue-700"
                    }`}>{item.type}</span>
                  </td>
                  <td className="py-2 px-3 font-semibold text-zinc-800 dark:text-zinc-200">{item.name}</td>
                  <td className="py-2 px-3 text-center">{item.unit}</td>
                  <td className="py-2 px-3 text-right text-zinc-400">{item.type === "add" ? "-" : item.originalQuantity}</td>
                  <td className="py-2 px-3 text-right">{item.type === "remove" ? "0" : item.quantity}</td>
                  <td className="py-2 px-3 text-right">{item.type === "remove" ? "-" : formatRupiah(item.unitPrice)}</td>
                  <td className={`py-2 px-3 text-right font-bold ${delta >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {delta >= 0 ? "+" : ""}{formatRupiah(delta)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center bg-zinc-100/50 dark:bg-zinc-900/30 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">TOTAL ESTIMASI NILAI SELISIH CCO:</span>
        <strong className={`font-bold text-sm ${ccoTotal >= 0 ? "text-emerald-600" : "text-red-500"}`}>
          {ccoTotal >= 0 ? "+" : ""}{formatRupiah(ccoTotal)}
        </strong>
      </div>
    </div>
  );
}
