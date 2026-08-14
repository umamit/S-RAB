"use client";
import { useState } from "react";
import type { PaymentTerm } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";

interface PaymentTermRowProps {
  term: PaymentTerm;
  projectId: string;
  currentActualProgress: number;
}

export default function PaymentTermRow({ term, projectId, currentActualProgress }: PaymentTermRowProps) {
  const { updatePaymentTerm, deletePaymentTerm } = useRABStore();
  const [editingDate, setEditingDate] = useState(false);
  const [paidDate, setPaidDate] = useState(term.paidDate || "");

  const isReached = currentActualProgress >= term.targetProgress;
  const statusColor = term.isPaid
    ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
    : isReached
    ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
    : "bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800";

  const handleTogglePaid = () => {
    if (!term.isPaid) {
      setEditingDate(true);
    } else {
      updatePaymentTerm(projectId, term.id, { isPaid: false, paidDate: undefined });
    }
  };

  const handleConfirmPaid = () => {
    updatePaymentTerm(projectId, term.id, { isPaid: true, paidDate: paidDate || new Date().toISOString().split("T")[0] });
    setEditingDate(false);
  };

  return (
    <div className={`p-4 rounded-xl border ${statusColor} flex flex-wrap gap-4 items-center justify-between transition-colors`}>
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-zinc-400 w-16 shrink-0">Termin {term.termNumber}</span>
        <div>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{formatRupiah(term.amount)}</p>
          <p className="text-[10px] text-zinc-500">Target progres: <strong>{term.targetProgress}%</strong>
            {term.notes && <span> · {term.notes}</span>}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {editingDate && !term.isPaid && (
          <div className="flex items-center gap-2">
            <input type="date" value={paidDate} onChange={(e) => setPaidDate(e.target.value)}
              className="px-2 py-1 text-xs border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-950 focus:outline-none" />
            <button onClick={handleConfirmPaid} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs">Konfirmasi</button>
            <button onClick={() => setEditingDate(false)} className="text-xs text-zinc-400 hover:text-zinc-700">Batal</button>
          </div>
        )}

        {!editingDate && (
          <div className="flex items-center gap-2">
            {term.isPaid && <span className="text-[10px] text-emerald-600 font-semibold">✓ Lunas {term.paidDate}</span>}
            {!term.isPaid && isReached && <span className="text-[10px] text-amber-600 font-semibold">⚡ Progres tercapai</span>}
            <button
              onClick={handleTogglePaid}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                term.isPaid
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-red-50 hover:text-red-600"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {term.isPaid ? "Batalkan Lunas" : "Tandai Lunas"}
            </button>
            <button
              onClick={() => deletePaymentTerm(projectId, term.id)}
              className="text-zinc-300 hover:text-red-500 dark:text-zinc-700 dark:hover:text-red-400 transition-colors text-xs font-bold px-1"
            >✕</button>
          </div>
        )}
      </div>
    </div>
  );
}
