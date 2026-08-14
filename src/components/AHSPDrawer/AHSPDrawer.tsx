"use client";
import { useEffect, useState } from "react";
import { useRABStore, AHSP, AHSPEntry, AHSP_TEMPLATES } from "@/lib/store";
import { SectionType, NewEntryState } from "./types";
import AHSPHeader from "./AHSPHeader";
import TemplateSelector from "./TemplateSelector";
import QuickAddForm from "./QuickAddForm";
import AHSPTable from "./AHSPTable";
import SummaryCard from "./SummaryCard";
import FooterActions from "./FooterActions";

interface AHSPDrawerProps {
  projectId: string;
  categoryId: string;
  itemId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AHSPDrawer({ projectId, categoryId, itemId, isOpen, onClose }: AHSPDrawerProps) {
  const { projects, updateItemAHSP, customAHSPTemplates, saveCustomAHSPTemplate } = useRABStore();

  const activeProject = projects.find((p) => p.id === projectId);
  const activeSubProject = activeProject?.subProjects.find(
    (s) => s.id === activeProject.activeSubProjectId
  ) || activeProject?.subProjects[0];
  const activeCategory = activeSubProject?.categories.find((c) => c.id === categoryId);
  const activeItem = activeCategory?.items.find((i) => i.id === itemId);

  const [localAHSP, setLocalAHSP] = useState<AHSP>({ materials: [], labor: [], tools: [] });
  const [newEntry, setNewEntry] = useState<NewEntryState>({ name: "", unit: "kg", coefficient: 1, unitPrice: 0 });
  const [activeSection, setActiveSection] = useState<SectionType>("materials");

  useEffect(() => {
    if (isOpen && activeItem) {
      setLocalAHSP(activeItem.ahsp ? JSON.parse(JSON.stringify(activeItem.ahsp)) : { materials: [], labor: [], tools: [] });
      setNewEntry({ name: "", unit: activeSection === "labor" ? "OH" : "kg", coefficient: 1.0, unitPrice: 0 });
      setActiveSection("materials");
    }
  }, [isOpen, activeItem]);

  if (!isOpen || !activeItem) return null;

  const handleApplyTemplate = (ahsp: AHSP) => {
    if (localAHSP.materials.length > 0 || localAHSP.labor.length > 0 || localAHSP.tools.length > 0) {
      if (!confirm("Menerapkan template akan menghapus analisa yang sedang Anda edit. Lanjutkan?")) return;
    }
    setLocalAHSP(JSON.parse(JSON.stringify(ahsp)));
  };

  const handleSaveCustom = () => {
    const defaultName = activeItem.name || "Template Analisa Baru";
    const name = prompt("Masukkan nama untuk template kustom ini:", defaultName);
    if (!name || !name.trim()) return;
    saveCustomAHSPTemplate(name.trim(), activeItem.unit || "m'", localAHSP);
    alert(`Template "${name.trim()}" berhasil disimpan!`);
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.name.trim()) return;
    const entry: AHSPEntry = {
      id: `${activeSection}-${Date.now()}`,
      name: newEntry.name.trim(),
      unit: newEntry.unit.trim(),
      coefficient: newEntry.coefficient,
      unitPrice: newEntry.unitPrice,
    };
    setLocalAHSP((prev) => ({ ...prev, [activeSection]: [...prev[activeSection], entry] }));
    setNewEntry({ name: "", unit: activeSection === "labor" ? "OH" : "m3", coefficient: 1.0, unitPrice: 0 });
  };

  const handleDeleteEntry = (section: SectionType, entryId: string) => {
    setLocalAHSP((prev) => ({ ...prev, [section]: prev[section].filter((e) => e.id !== entryId) }));
  };

  const handleUpdateEntry = (section: SectionType, entryId: string, field: keyof Omit<AHSPEntry, "id">, value: string | number) => {
    setLocalAHSP((prev) => ({
      ...prev,
      [section]: prev[section].map((entry) => (entry.id === entryId ? { ...entry, [field]: value } : entry)),
    }));
  };

  const handleSave = () => {
    const totalEntries = localAHSP.materials.length + localAHSP.labor.length + localAHSP.tools.length;
    if (totalEntries === 0) {
      if (confirm("Analisa kosong. Menonaktifkan AHSP dan kembali ke harga manual?")) {
        if (activeSubProject) updateItemAHSP(projectId, activeSubProject.id, categoryId, activeItem.id, undefined);
        onClose();
      }
      return;
    }
    if (activeSubProject) updateItemAHSP(projectId, activeSubProject.id, categoryId, activeItem.id, localAHSP);
    onClose();
  };

  const handleDisableAHSP = () => {
    if (confirm("Apakah Anda yakin ingin menghapus Analisa SNI ini dan menggunakan input manual?")) {
      if (activeSubProject) updateItemAHSP(projectId, activeSubProject.id, categoryId, activeItem.id, undefined);
      onClose();
    }
  };

  const calcSum = (entries: AHSPEntry[]) => entries.reduce((sum, e) => sum + e.coefficient * e.unitPrice, 0);
  const materialsTotal = calcSum(localAHSP.materials);
  const laborTotal = calcSum(localAHSP.labor);
  const toolsTotal = calcSum(localAHSP.tools);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 h-full flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800">
        <AHSPHeader activeItem={activeItem} onClose={onClose} />
        <TemplateSelector customTemplates={customAHSPTemplates} onApplyTemplate={handleApplyTemplate} />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold uppercase tracking-wider">
            {(["materials", "labor", "tools"] as SectionType[]).map((section) => (
              <button key={section} onClick={() => setActiveSection(section)} type="button"
                className={`py-2.5 px-4 border-b-2 font-bold transition-all -mb-px ${
                  activeSection === section ? "border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50" : "border-transparent text-zinc-400"
                }`}
              >{section === "materials" ? "Bahan" : section === "labor" ? "Tenaga" : "Alat"} ({localAHSP[section].length})</button>
            ))}
          </div>
          <QuickAddForm activeSection={activeSection} newEntry={newEntry} setNewEntry={setNewEntry} onAddEntry={handleAddEntry} />
          <AHSPTable localAHSP={localAHSP} activeSection={activeSection} onUpdateEntry={handleUpdateEntry} onDeleteEntry={handleDeleteEntry} />
          <SummaryCard materialsTotal={materialsTotal} laborTotal={laborTotal} toolsTotal={toolsTotal} calculatedUnitPrice={materialsTotal + laborTotal + toolsTotal} />
        </div>
        <FooterActions hasAHSP={!!activeItem.ahsp} onDisableAHSP={handleDisableAHSP} onClose={onClose} onSave={handleSave} onSaveCustom={handleSaveCustom} />
      </div>
    </div>
  );
}
