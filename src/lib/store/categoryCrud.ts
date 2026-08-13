import type { StateCreator } from "zustand";
import type { RABState } from "./types";
import { syncProjectToSupabase } from "../supabaseClient";

export const createCategoryCrud = (
  set: Parameters<StateCreator<RABState>>[0],
): Pick<RABState, "addCategory" | "deleteCategory" | "updateCategory" | "updateCategorySchedule"> => ({
  addCategory: (projectId, subProjectId, name) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return { ...s, categories: [...s.categories, { id: `cat-${Date.now()}`, name, items: [], startWeek: 1, durationWeeks: 2 }] };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  deleteCategory: (projectId, subProjectId, categoryId) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return { ...s, categories: s.categories.filter((c) => c.id !== categoryId) };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  updateCategory: (projectId, subProjectId, categoryId, name) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return { ...s, categories: s.categories.map((c) => c.id === categoryId ? { ...c, name } : c) };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  updateCategorySchedule: (projectId, subProjectId, categoryId, startWeek, durationWeeks) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return { ...s, categories: s.categories.map((c) => c.id === categoryId ? { ...c, startWeek, durationWeeks } : c) };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },
});
