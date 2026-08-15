"use client";
import { useState } from "react";
import { useRABStore } from "@/lib/store";
import { exportProjectToExcel } from "@/lib/excel-export";
import confetti from "canvas-confetti";
import { LogOut, BookOpen, Download, BarChart2 } from "lucide-react";
import ProjectSelector from "./Header/ProjectSelector";
import UserGuideModal from "./Header/UserGuideModal";
import SaveIndicator from "./Header/SaveIndicator";
import RekapLintasModal from "./RekapLintas/RekapLintasModal";

interface HeaderProps {
  onOpenNewProjectModal: () => void;
}

export default function Header({ onOpenNewProjectModal }: HeaderProps) {
  const { projects, activeProjectId, deleteProject, setActiveProject, currentUser, logoutUser, importProject } = useRABStore();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isRekapOpen, setIsRekapOpen] = useState(false);

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const handleExport = async () => {
    if (!activeProject) return;
    try {
      await exportProjectToExcel(activeProject);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"] });
    } catch (e) { console.error("Export failed:", e); }
  };

  const handleExportJson = () => {
    if (!activeProject) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeProject, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `${activeProject.name.replace(/\s+/g, "_")}_data.json`;
    a.click();
  };

  const handleDelete = () => {
    if (activeProjectId && confirm("Hapus proyek ini beserta seluruh data di dalamnya?")) deleteProject(activeProjectId);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center font-bold text-lg text-white dark:text-zinc-950 shadow-md shadow-black/10">S</div>
        <div>
          <h1 className="font-bold text-md tracking-tight text-zinc-950 dark:text-zinc-50 leading-none">S-RAB</h1>
          <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Estimator Platform</span>
        </div>
      </div>

      <ProjectSelector projects={projects} activeProjectId={activeProjectId}
        onSetActiveProject={setActiveProject} onOpenNewProjectModal={onOpenNewProjectModal}
        onImportProject={importProject} />

      <div className="flex items-center gap-2">
        <SaveIndicator />

        <button onClick={() => setIsRekapOpen(true)} type="button"
          className="flex items-center gap-2 px-3.5 py-1.5 text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg font-semibold transition-colors">
          <BarChart2 className="w-4 h-4 text-zinc-500" />
          <span className="hidden sm:inline">Rekap Semua</span>
        </button>

        <button onClick={() => setIsGuideOpen(true)} type="button"
          className="flex items-center gap-2 px-3.5 py-1.5 text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg font-semibold transition-colors">
          <BookOpen className="w-4 h-4 text-zinc-500" />
          <span className="hidden sm:inline">Panduan</span>
        </button>

        {activeProject && (
          <>
            <button onClick={handleExportJson} type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg font-semibold transition-colors">
              <Download className="w-4 h-4 text-zinc-500" />
              <span className="hidden sm:inline">Ekspor JSON</span>
            </button>

            <button onClick={handleExport} type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 text-sm bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg font-semibold shadow-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">Ekspor Excel</span>
            </button>

            <button onClick={() => window.print()} type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg font-semibold transition-colors">
              <svg className="w-4 h-4 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm5-17H9a2 2 0 00-2 2v3h10V5a2 2 0 00-2-2z" />
              </svg>
              <span className="hidden sm:inline">Cetak PDF</span>
            </button>

            <button onClick={handleDelete} type="button" title="Hapus Proyek"
              className="p-2 border border-red-200 hover:bg-red-50 dark:border-red-950 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </>
        )}

        <div className="flex items-center gap-3 ml-2 pl-3 border-l border-zinc-200 dark:border-zinc-800">
          {currentUser && (
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-tight">{currentUser.name}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-555 leading-tight">{currentUser.email}</span>
            </div>
          )}
          <button onClick={logoutUser} type="button" title="Keluar dari Akun"
            className="p-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <UserGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <RekapLintasModal isOpen={isRekapOpen} onClose={() => setIsRekapOpen(false)} />
    </header>
  );
}
