"use client";
import { useState } from "react";
import { Project, useRABStore, SubProject } from "@/lib/store";
import RecapTable, { SubProjectCost } from "./RecapTable";
import RecapForm from "./RecapForm";

interface RecapSheetProps {
  project: Project;
}

export default function RecapSheet({ project }: RecapSheetProps) {
  const { addSubProject, deleteSubProject, updateSubProjectName, setActiveSubProject } = useRABStore();
  const [editingSubId, setEditingSubId] = useState<string | null>(null);
  const [editingVal, setEditingVal] = useState("");

  const calculateSubProjectDirectCost = (sub: SubProject) => {
    return sub.categories.reduce((acc, cat) => acc + cat.items.reduce((sum, item) => sum + item.total, 0), 0);
  };

  const subprojectCosts: SubProjectCost[] = project.subProjects.map((sub) => ({
    id: sub.id,
    name: sub.name,
    cost: calculateSubProjectDirectCost(sub),
  }));

  const totalDirectCost = subprojectCosts.reduce((sum, s) => sum + s.cost, 0);
  const profit = totalDirectCost * project.profitRate;
  const directWithProfit = totalDirectCost + profit;
  const tax = directWithProfit * project.taxRate;
  const grandTotal = directWithProfit + tax;

  const handleAddSub = (name: string) => {
    addSubProject(project.id, name);
  };

  const handleStartEdit = (id: string, name: string) => {
    setEditingSubId(id);
    setEditingVal(name);
  };

  const handleSaveEdit = (id: string) => {
    if (!editingVal.trim()) return;
    updateSubProjectName(project.id, id, editingVal.trim());
    setEditingSubId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") handleSaveEdit(id);
    else if (e.key === "Escape") setEditingSubId(null);
  };

  const handleSetActiveSub = (id: string) => {
    setActiveSubProject(project.id, id);
  };

  const handleDeleteSub = (id: string, name: string) => {
    if (confirm(`Hapus sub-pekerjaan "${name}" beserta seluruh isinya?`)) {
      deleteSubProject(project.id, id);
    }
  };

  return (
    <div className="space-y-8 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:p-0 print:border-none print:shadow-none">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 print:pb-2 print:border-b-2 print:border-zinc-800">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase print:text-center print:text-lg">Rekapitulasi Rencana Anggaran Biaya (RAB)</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 print:hidden">Rangkuman anggaran keseluruhan dari semua sub-pekerjaan/divisi proyek konstruksi.</p>
      </div>

      <RecapTable
        subprojectCosts={subprojectCosts}
        totalDirectCost={totalDirectCost}
        profit={profit}
        tax={tax}
        grandTotal={grandTotal}
        profitRate={project.profitRate}
        taxRate={project.taxRate}
        editingSubId={editingSubId}
        editingVal={editingVal}
        setEditingVal={setEditingVal}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onKeyDown={handleKeyDown}
        onSetActiveSub={handleSetActiveSub}
        onDeleteSub={handleDeleteSub}
      />
      <RecapForm onSubmit={handleAddSub} />
    </div>
  );
}
