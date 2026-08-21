"use client";
import { useState } from "react";
import type { Project } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import { calculateProjectTotals } from "../ProjectList";
import { formatRupiah } from "@/lib/excel-export";
import PaymentTermForm from "./PaymentTermForm";
import PaymentTermRow from "./PaymentTermRow";
import { Printer } from "lucide-react";

interface PaymentTermsProps {
  project: Project;
  triggerPrint?: (mode: any) => void;
}

export default function PaymentTerms({ project, triggerPrint }: PaymentTermsProps) {
  const { addPaymentTerm } = useRABStore();
  const [showForm, setShowForm] = useState(false);
  const { grandTotal } = calculateProjectTotals(project);

  const totalAddendum = (project.addendums || []).reduce((sum, add) => {
    return sum + add.items.reduce((s, item) => {
      const current = item.quantity * item.unitPrice;
      if (item.type === "add") return s + current;
      if (item.type === "remove") return s - current;
      const orig = (item.originalQuantity ?? 0) * (item.originalUnitPrice ?? 0);
      return s + (current - orig);
    }, 0);
  }, 0);

  const totalCCO = (project.ccos || [])
    .filter((c) => c.status === "Disetujui")
    .reduce((sum, cco) => {
      return sum + cco.items.reduce((s, item) => {
        const current = item.quantity * item.unitPrice;
        if (item.type === "add") return s + current;
        if (item.type === "remove") return s - current;
        const orig = (item.originalQuantity ?? 0) * (item.originalUnitPrice ?? 0);
        return s + (current - orig);
      }, 0);
    }, 0);

  const finalContractTotal = grandTotal + totalAddendum + totalCCO;
  const terms = project.paymentTerms || [];

  // Hitung progres aktual kumulatif
  const allCategories = project.subProjects.flatMap((s) =>
    s.categories.map((c) => {
      const catSubtotal = c.items.reduce((sum, i) => sum + i.total, 0);
      const totalCost = project.subProjects.reduce(
        (sum, sub) => sum + sub.categories.reduce(
          (cs, cat) => cs + cat.items.reduce((is, item) => is + item.total, 0), 0), 0);
      return { categoryId: c.id, weight: totalCost > 0 ? (catSubtotal / totalCost) * 100 : 0 };
    })
  );
  const latestWeek = Math.max(0, ...(project.weeklyProgress?.map((w) => w.weekNumber) || [0]));
  const latestRecord = project.weeklyProgress?.find((w) => w.weekNumber === latestWeek);
  let currentActual = 0;
  allCategories.forEach((cat) => {
    const pct = latestRecord?.actualCategoryProgress[cat.categoryId] ?? 0;
    currentActual += (pct / 100) * cat.weight;
  });

  const handleAdd = (targetProgress: number, amount: number, notes?: string) => {
    addPaymentTerm(project.id, targetProgress, amount, notes);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-955 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:p-0 print:border-none print:shadow-none">
      <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4 flex justify-between items-end flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase print:text-lg">Termin Pembayaran</h2>
          <p className="text-xs text-zinc-500 mt-1 print:hidden">Rencana termin pembayaran kontraktor berdasarkan capaian progres fisik.</p>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          {triggerPrint && (
            <button
              onClick={() => triggerPrint("termin-only")}
              type="button"
              className="text-[11px] font-semibold bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak Termin
            </button>
          )}
          <button
            onClick={() => setShowForm((v) => !v)}
            className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold rounded-lg text-xs transition-colors"
          >
            {showForm ? "Batal" : "+ Tambah Termin"}
          </button>
        </div>
      </div>

      {showForm && (
        <PaymentTermForm
          grandTotal={finalContractTotal}
          termCount={terms.length}
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {terms.length === 0 && !showForm ? (
        <div className="py-16 text-center text-xs text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          Belum ada termin. Klik &quot;+ Tambah Termin&quot; untuk membuat rencana pembayaran.
        </div>
      ) : (
        <div className="space-y-3">
          {terms.map((term) => (
            <PaymentTermRow
              key={term.id}
              term={term}
              projectId={project.id}
              currentActualProgress={currentActual}
            />
          ))}
        </div>
      )}
    </div>
  );
}
