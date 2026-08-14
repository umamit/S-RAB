"use client";
import React, { useRef } from "react";
import type { Project } from "@/lib/store";

interface ProjectSelectorProps {
  projects: Project[];
  activeProjectId: string | null;
  onSetActiveProject: (id: string | null) => void;
  onOpenNewProjectModal: () => void;
  onImportProject: (data: any) => void;
}

export default function ProjectSelector({
  projects,
  activeProjectId,
  onSetActiveProject,
  onOpenNewProjectModal,
  onImportProject,
}: ProjectSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onImportProject(json);
        e.target.value = "";
      } catch (err) {
        alert("Berkas JSON tidak valid atau rusak.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2 max-w-sm w-full sm:w-auto">
      <label htmlFor="project-select" className="sr-only">Pilih Proyek</label>
      <select
        id="project-select"
        value={activeProjectId || ""}
        onChange={(e) => onSetActiveProject(e.target.value || null)}
        className="flex-1 sm:w-64 px-3 py-1.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-700 transition-all font-medium"
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
        {projects.length === 0 && (
          <option value="">Tidak ada proyek</option>
        )}
      </select>

      <button
        onClick={onOpenNewProjectModal}
        type="button"
        title="Tambah Proyek Baru"
        className="p-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
      >
        <svg className="w-5 h-5 text-zinc-650 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleImportClick}
        type="button"
        title="Impor Proyek (JSON)"
        className="p-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
      >
        <svg className="w-5 h-5 text-zinc-650 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      </button>
    </div>
  );
}
export type { ProjectSelectorProps };
