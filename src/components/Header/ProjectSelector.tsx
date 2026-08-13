"use client";
import React from "react";
import type { Project } from "@/lib/store";

interface ProjectSelectorProps {
  projects: Project[];
  activeProjectId: string | null;
  onSetActiveProject: (id: string | null) => void;
  onOpenNewProjectModal: () => void;
}

export default function ProjectSelector({
  projects,
  activeProjectId,
  onSetActiveProject,
  onOpenNewProjectModal,
}: ProjectSelectorProps) {
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
    </div>
  );
}
export type { ProjectSelectorProps };
