import type { StateCreator } from "zustand";
import type { RABState, Project } from "./types";
import { syncProjectToSupabase, deleteProjectFromSupabase } from "../supabaseClient";

export const createProjectCrud = (
  set: Parameters<StateCreator<RABState>>[0],
  get: Parameters<StateCreator<RABState>>[1]
): Pick<
  RABState,
  | "addProject" | "importProject" | "deleteProject" | "updateProject" | "setActiveProject" | "updateProjectDuration"
  | "saveCustomAHSPTemplate" | "deleteCustomAHSPTemplate"
> => ({
  saveCustomAHSPTemplate: (name, unit, ahsp) => {
    const id = `custom-ahsp-${Date.now()}`;
    const newTemplate = { id, name, unit, ahsp };
    set((state) => ({
      customAHSPTemplates: [...(state.customAHSPTemplates || []), newTemplate],
    }));
  },

  deleteCustomAHSPTemplate: (id) => {
    set((state) => ({
      customAHSPTemplates: (state.customAHSPTemplates || []).filter((t) => t.id !== id),
    }));
  },

  importProject: (projectData) => {
    if (!projectData || typeof projectData !== "object" || !projectData.name || !Array.isArray(projectData.subProjects)) {
      throw new Error("Format data proyek tidak valid.");
    }

    const projectId = `proj-${Date.now()}`;
    const importedProject: Project = {
      ...projectData,
      id: projectId,
      userId: get().currentUser?.id,
      createdAt: new Date().toISOString(),
      subProjects: projectData.subProjects.map((sub: any, idx: number) => ({
        ...sub,
        id: `sub-${Date.now()}-${idx}`,
      })),
      dailyLogs: Array.isArray(projectData.dailyLogs) ? projectData.dailyLogs : [],
      weeklyProgress: Array.isArray(projectData.weeklyProgress) ? projectData.weeklyProgress : [],
    };

    if (importedProject.subProjects.length > 0) {
      importedProject.activeSubProjectId = importedProject.subProjects[0].id;
    }

    set((state) => ({
      projects: [...state.projects, importedProject],
      activeProjectId: projectId
    }));

    syncProjectToSupabase(importedProject);
    return projectId;
  },

  addProject: (name, description, taxRate, profitRate) => {
    const id = `proj-${Date.now()}`;
    const subId = `sub-${Date.now()}`;
    const newProject: Project = {
      id,
      userId: get().currentUser?.id,
      name,
      description,
      createdAt: new Date().toISOString(),
      taxRate,
      profitRate,
      durationWeeks: 12,
      activeSubProjectId: subId,
      dailyLogs: [],
      weeklyProgress: [],
      subProjects: [{
        id: subId,
        name: "Pekerjaan Utama",
        categories: [
          { id: `cat-${Date.now()}-1`, name: "I. Pekerjaan Persiapan", items: [], startWeek: 1, durationWeeks: 2 },
          { id: `cat-${Date.now()}-2`, name: "II. Pekerjaan Pondasi & Tanah", items: [], startWeek: 2, durationWeeks: 3 },
          { id: `cat-${Date.now()}-3`, name: "III. Pekerjaan Struktur Beton", items: [], startWeek: 3, durationWeeks: 4 },
        ],
      }],
    };
    set((state) => ({ projects: [...state.projects, newProject], activeProjectId: id }));
    syncProjectToSupabase(newProject);
    return id;
  },

  deleteProject: (id) => {
    set((state) => {
      const nextProjects = state.projects.filter((p) => p.id !== id);
      const nextActiveId = state.activeProjectId === id
        ? (nextProjects.length > 0 ? nextProjects[0].id : null)
        : state.activeProjectId;
      return { projects: nextProjects, activeProjectId: nextActiveId };
    });
    deleteProjectFromSupabase(id);
  },

  updateProject: (id, updates) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => p.id === id ? { ...p, ...updates } : p);
      const found = nextProjects.find((p) => p.id === id);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  setActiveProject: (id) => { set({ activeProjectId: id }); },

  updateProjectDuration: (projectId, durationWeeks) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => p.id === projectId ? { ...p, durationWeeks } : p);
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },
});
