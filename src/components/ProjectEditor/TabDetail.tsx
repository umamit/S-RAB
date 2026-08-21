"use client";
import { useState } from "react";
import { Plus, Printer, Sparkles } from "lucide-react";
import type { Project } from "@/lib/store";
import { useRABStore } from "@/lib/store";
import ItemRow from "./ItemRow";
import FilterBar from "./FilterBar";
import SmartParserModal from "@/components/SmartParser/SmartParserModal";
import type { EditState, CatEditState } from "./types";

interface TabDetailProps {
  project: Project;
  totalDirectCost: number;
  triggerPrint: (mode: any, subId?: string | null) => void;
}

export default function TabDetail({ project, totalDirectCost, triggerPrint }: TabDetailProps) {
  const { addCategory, deleteCategory, updateCategory, addItem, setActiveSubProject, addSubProject } = useRABStore();
  const [editState, setEditState] = useState<EditState>(null);
  const [editVal, setEditVal] = useState("");
  const [catEditState, setCatEditState] = useState<CatEditState>(null);
  const [catEditVal, setCatEditVal] = useState("");
  const [newCatName, setNewCatName] = useState("");
  const [newSubName, setNewSubName] = useState("");
  const [isAddingSub, setIsAddingSub] = useState(false);
  const [isParserOpen, setIsParserOpen] = useState(false);
  const [ahspItem, setAhspItem] = useState<{ categoryId: string; itemId: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const activeSubProject = project.subProjects.find((s) => s.id === project.activeSubProjectId) || project.subProjects[0];

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim() && activeSubProject) {
      addCategory(project.id, activeSubProject.id, newCatName.trim());
      setNewCatName("");
    }
  };

  const handleCategorySave = (categoryId: string) => {
    if (catEditVal.trim() && activeSubProject) {
      updateCategory(project.id, activeSubProject.id, categoryId, catEditVal.trim());
      setCatEditState(null);
    }
  };

  const handleCreateSubProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubName.trim()) {
      addSubProject(project.id, newSubName.trim());
      setNewSubName("");
      setIsAddingSub(false);
    }
  };

  if (!activeSubProject) {
    return <div className="py-12 text-center text-zinc-400">Belum ada sub-pekerjaan. Buat di tab Rekapitulasi.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Sub-project Switcher */}
      <div className="flex flex-wrap gap-2 items-center bg-zinc-50 dark:bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 px-2 tracking-wider">Sub-Pekerjaan:</span>
        {project.subProjects.map((sub) => (
          <button key={sub.id} onClick={() => setActiveSubProject(project.id, sub.id)} type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all ${
              sub.id === project.activeSubProjectId
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-sm"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
            }`}
          >{sub.name}</button>
        ))}
        {isAddingSub ? (
          <form onSubmit={handleCreateSubProject} className="flex gap-2 items-center ml-2">
            <input type="text" required autoFocus value={newSubName} onChange={(e) => setNewSubName(e.target.value)}
              placeholder="Nama Sub-Pekerjaan" className="px-2 py-1 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded text-xs focus:outline-none" />
            <button type="submit" className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold">OK</button>
            <button type="button" onClick={() => setIsAddingSub(false)} className="text-zinc-400 text-xs px-1">Batal</button>
          </form>
        ) : (
          <button onClick={() => setIsAddingSub(true)} type="button" className="px-2 py-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 font-semibold flex items-center gap-1 ml-2">
            <Plus className="w-3.5 h-3.5" /> Tambah Sub
          </button>
        )}
      </div>

      <FilterBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} sortBy={sortBy} setSortBy={setSortBy} />

      {/* Categories & Items */}
      <div className="space-y-8 bg-white dark:bg-zinc-955 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4 flex justify-between items-start flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">Rincian: {activeSubProject.name}</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Sel dengan garis bawah putus-putus dikalkulasi oleh Harga Satuan SNI.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsParserOpen(true)}
              type="button"
              className="text-[11px] font-bold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 🤖 AI Smart Parser
            </button>
            <button
              onClick={() => triggerPrint("single-sub", activeSubProject.id)}
              type="button"
              className="text-[11px] font-semibold bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak Divisi
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {activeSubProject.categories.map((category) => {
            const categorySubtotal = category.items.reduce((sum, i) => sum + i.total, 0);
            const categoryWeight = totalDirectCost > 0 ? (categorySubtotal / totalDirectCost) * 100 : 0;
            return (
              <ItemRow
                key={category.id} project={project} category={category}
                activeSubProject={activeSubProject} totalDirectCost={totalDirectCost}
                categorySubtotal={categorySubtotal} categoryWeight={categoryWeight}
                editState={editState} setEditState={setEditState} editVal={editVal} setEditVal={setEditVal}
                catEditState={catEditState} setCatEditState={setCatEditState} catEditVal={catEditVal} setCatEditVal={setCatEditVal}
                ahspItem={ahspItem} setAhspItem={setAhspItem} onCategorySave={handleCategorySave}
                onAddItem={() => activeSubProject && addItem(project.id, activeSubProject.id, category.id, { name: "Item baru (klik untuk edit)", unit: "m'", quantity: 1, unitPrice: 100000 })}
                onDeleteCategory={() => confirm(`Hapus kategori "${category.name}" beserta semua itemnya?`) && deleteCategory(project.id, activeSubProject.id, category.id)}
                searchQuery={searchQuery} sortBy={sortBy}
              />
            );
          })}
        </div>

        <form onSubmit={handleAddCategorySubmit} className="flex gap-2 items-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Kategori Baru (Contoh: VI. Pekerjaan Pengecatan)"
            className="flex-1 max-w-sm px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400" />
          <button type="submit" className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-semibold rounded-lg text-xs">
            Tambah Kategori
          </button>
        </form>
      </div>

      <SmartParserModal isOpen={isParserOpen} onClose={() => setIsParserOpen(false)} project={project} />
    </div>
  );
}
