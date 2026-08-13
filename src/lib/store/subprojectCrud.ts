import type { StateCreator } from "zustand";
import type { RABState, SubProject } from "./types";
import { syncProjectToSupabase } from "../supabaseClient";

export const createSubProjectCrud = (
  set: Parameters<StateCreator<RABState>>[0],
): Pick<RABState, "addSubProject" | "deleteSubProject" | "updateSubProjectName" | "setActiveSubProject"> => ({
  addSubProject: (projectId, name) => {
    const subId = `sub-${Date.now()}`;
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const newSub: SubProject = { id: subId, name, categories: [] };
        return { ...p, subProjects: [...p.subProjects, newSub], activeSubProjectId: subId };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
    return subId;
  },

  deleteSubProject: (projectId, subProjectId) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const nextSubs = p.subProjects.filter((s) => s.id !== subProjectId);
        const nextActiveSubId = p.activeSubProjectId === subProjectId
          ? (nextSubs.length > 0 ? nextSubs[0].id : null)
          : p.activeSubProjectId;
        return { ...p, subProjects: nextSubs, activeSubProjectId: nextActiveSubId };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  updateSubProjectName: (projectId, subProjectId, name) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return { ...p, subProjects: p.subProjects.map((s) => s.id === subProjectId ? { ...s, name } : s) };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  setActiveSubProject: (projectId, subProjectId) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => p.id === projectId ? { ...p, activeSubProjectId: subProjectId } : p);
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },
});
