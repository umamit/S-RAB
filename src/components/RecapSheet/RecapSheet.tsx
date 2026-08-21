"use client";
import { useState } from "react";
import { Project, useRABStore, SubProject } from "@/lib/store";
import { Printer, Shield } from "lucide-react";
import RecapTable, { SubProjectCost } from "./RecapTable";
import RecapForm from "./RecapForm";
import ProjectParamsForm from "./ProjectParamsForm";
import ProjectMap from "./ProjectMap";
import AIAuditModal from "@/components/AIAuditor/AIAuditModal";

interface RecapSheetProps {
  project: Project;
  triggerPrint?: (mode: any, subId?: string | null) => void;
}

export default function RecapSheet({ project, triggerPrint }: RecapSheetProps) {
  const { addSubProject, deleteSubProject, updateSubProjectName, setActiveSubProject, updateProject } = useRABStore();
  const [editingSubId, setEditingSubId] = useState<string | null>(null);
  const [editingVal, setEditingVal] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);

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

  const handleAddSub = (name: string) => addSubProject(project.id, name);

  const handleSaveParams = (
    profitRate: number, taxRate: number, alertThreshold: number,
    pphRate: number, latitude?: number, longitude?: number
  ) => updateProject(project.id, { profitRate, taxRate, alertThreshold, pphRate, latitude, longitude });

  const handleStartEdit = (id: string, name: string) => {
    setEditingSubId(id);
    setEditingVal(name);
  };

  const handleSaveEdit = (id: string) => {
    if (editingVal.trim()) updateSubProjectName(project.id, id, editingVal.trim());
    setEditingSubId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") handleSaveEdit(id);
    else if (e.key === "Escape") setEditingSubId(null);
  };

  const handleSetActiveSub = (id: string) => setActiveSubProject(project.id, id);
  const handleDeleteSub = (id: string, name: string) => {
    if (confirm(`Hapus sub-pekerjaan "${name}" beserta semua kategorinya?`)) deleteSubProject(project.id, id);
  };

  return (
    <div className="space-y-8 bg-white dark:bg-zinc-955 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:p-0 print:border-none print:shadow-none">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 flex justify-between items-start print:pb-2 print:border-b-2 print:border-zinc-800">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase print:text-center print:text-lg">Rekapitulasi Rencana Anggaran Biaya (RAB)</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 print:hidden">Rangkuman anggaran keseluruhan dari semua sub-pekerjaan/divisi proyek konstruksi.</p>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={() => setIsAuditOpen(true)}
            type="button"
            className="text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-500" /> 🛡️ Audit AI
          </button>
          {triggerPrint && (
            <button
              onClick={() => triggerPrint("recap-only")}
              type="button"
              className="text-[11px] font-semibold bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak Ringkasan
            </button>
          )}
        </div>
      </div>

      <RecapTable
        subprojectCosts={subprojectCosts}
        totalDirectCost={totalDirectCost}
        profit={profit}
        tax={tax}
        grandTotal={grandTotal}
        profitRate={project.profitRate}
        taxRate={project.taxRate}
        addendums={project.addendums}
        ccos={project.ccos}
        pphRate={project.pphRate}
        editingSubId={editingSubId}
        editingVal={editingVal}
        setEditingVal={setEditingVal}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onKeyDown={handleKeyDown}
        onSetActiveSub={handleSetActiveSub}
        onDeleteSub={handleDeleteSub}
        triggerPrint={triggerPrint}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 print:hidden">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Tambah Divisi / Sub-Pekerjaan</h3>
          <RecapForm onSubmit={handleAddSub} />
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Parameter Proyek (Overhead, Pajak, Geolocation)</h3>
          <ProjectParamsForm
            profitRate={project.profitRate}
            taxRate={project.taxRate}
            alertThreshold={project.alertThreshold ?? 5}
            pphRate={project.pphRate ?? 0.02}
            latitude={project.latitude}
            longitude={project.longitude}
            onSave={handleSaveParams}
          />
        </div>
      </div>
      <ProjectMap latitude={project.latitude} longitude={project.longitude} />

      <AIAuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} project={project} />
    </div>
  );
}
