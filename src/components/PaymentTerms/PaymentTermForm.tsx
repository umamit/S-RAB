"use client";
import { useState } from "react";
import { formatRupiah } from "@/lib/excel-export";

interface PaymentTermFormProps {
  grandTotal: number;
  termCount: number;
  onSubmit: (targetProgress: number, amount: number, notes?: string) => void;
  onCancel: () => void;
}

export default function PaymentTermForm({ grandTotal, termCount, onSubmit, onCancel }: PaymentTermFormProps) {
  const [targetProgress, setTargetProgress] = useState(termCount === 0 ? 30 : termCount === 1 ? 60 : 100);
  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [notes, setNotes] = useState("");

  const autoAmount = Math.round((targetProgress / 100) * grandTotal);
  const finalAmount = useCustomAmount ? (parseFloat(customAmount) || 0) : autoAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetProgress < 1 || targetProgress > 100) return;
    onSubmit(targetProgress, finalAmount, notes || undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Termin {termCount + 1}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Target Progres Fisik (%)</label>
          <input
            type="number" min={1} max={100} required
            value={targetProgress}
            onChange={(e) => setTargetProgress(Number(e.target.value))}
            className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-semibold focus:outline-none"
          />
          <p className="text-[10px] text-zinc-400 mt-1">Nilai otomatis: {formatRupiah(autoAmount)}</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Nilai Termin (Rp)</label>
          <div className="flex items-center gap-2 mb-1">
            <input type="checkbox" id="custom-amt" checked={useCustomAmount} onChange={(e) => setUseCustomAmount(e.target.checked)} />
            <label htmlFor="custom-amt" className="text-[10px] text-zinc-400">Atur manual</label>
          </div>
          <input
            type="number" min={0} disabled={!useCustomAmount}
            value={useCustomAmount ? customAmount : autoAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-semibold focus:outline-none disabled:opacity-50"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Catatan (opsional)</label>
        <input
          type="text" placeholder="misal: Uang muka, Termin akhir, dll."
          value={notes} onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">Batal</button>
        <button type="submit" className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold rounded-lg text-xs">Simpan Termin</button>
      </div>
    </form>
  );
}
