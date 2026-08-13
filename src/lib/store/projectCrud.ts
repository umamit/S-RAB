import type { StateCreator } from "zustand";
import type { RABState, Project } from "./types";

export const createProjectCrud = (
  set: Parameters<StateCreator<RABState>>[0],
  get: Parameters<StateCreator<RABState>>[1]
): Pick<RABState, "addProject" | "deleteProject" | "updateProject" | "setActiveProject" | "updateProjectDuration"> => ({
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
  },

  updateProject: (id, updates) => {
    set((state) => ({ projects: state.projects.map((p) => p.id === id ? { ...p, ...updates } : p) }));
  },

  setActiveProject: (id) => { set({ activeProjectId: id }); },

  updateProjectDuration: (projectId, durationWeeks) => {
    set((state) => ({ projects: state.projects.map((p) => p.id === projectId ? { ...p, durationWeeks } : p) }));
  },
});
