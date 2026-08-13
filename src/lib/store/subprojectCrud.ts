import type { StateCreator } from "zustand";
import type { RABState, SubProject } from "./types";

export const createSubProjectCrud = (
  set: Parameters<StateCreator<RABState>>[0],
): Pick<RABState, "addSubProject" | "deleteSubProject" | "updateSubProjectName" | "setActiveSubProject"> => ({
  addSubProject: (projectId, name) => {
    const subId = `sub-${Date.now()}`;
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const newSub: SubProject = { id: subId, name, categories: [] };
        return { ...p, subProjects: [...p.subProjects, newSub], activeSubProjectId: subId };
      }),
    }));
    return subId;
  },

  deleteSubProject: (projectId, subProjectId) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const nextSubs = p.subProjects.filter((s) => s.id !== subProjectId);
        const nextActiveSubId = p.activeSubProjectId === subProjectId
          ? (nextSubs.length > 0 ? nextSubs[0].id : null)
          : p.activeSubProjectId;
        return { ...p, subProjects: nextSubs, activeSubProjectId: nextActiveSubId };
      }),
    }));
  },

  updateSubProjectName: (projectId, subProjectId, name) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return { ...p, subProjects: p.subProjects.map((s) => s.id === subProjectId ? { ...s, name } : s) };
      }),
    }));
  },

  setActiveSubProject: (projectId, subProjectId) => {
    set((state) => ({
      projects: state.projects.map((p) => p.id === projectId ? { ...p, activeSubProjectId: subProjectId } : p),
    }));
  },
});
