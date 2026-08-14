"use client";
import { useState } from "react";
import type { Project } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import { calculateProjectTotals } from "../ProjectList";
import { formatRupiah } from "@/lib/excel-export";
import PaymentTermForm from "./PaymentTermForm";
import PaymentTermRow from "./PaymentTermRow";

interface PaymentTermsProps {
  project: Project;
}

export default function PaymentTerms({ project }: PaymentTermsProps) {
  const { addPaymentTerm } = useRABStore();
  const [showForm, setShowForm] = useState(false);
  const { grandTotal } = calculateProjectTotals(project);

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
    <div className="space-y-6 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 flex justify-between items-end flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">Termin Pembayaran</h2>
          <p className="text-xs text-zinc-500 mt-1">Rencana termin pembayaran kontraktor berdasarkan capaian progres fisik.</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold rounded-lg text-xs transition-colors"
        >
          {showForm ? "Batal" : "+ Tambah Termin"}
        </button>
      </div>

      {showForm && (
        <PaymentTermForm
          grandTotal={grandTotal}
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
