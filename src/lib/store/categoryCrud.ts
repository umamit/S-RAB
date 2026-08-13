import type { StateCreator } from "zustand";
import type { RABState } from "./types";

export const createCategoryCrud = (
  set: Parameters<StateCreator<RABState>>[0],
): Pick<RABState, "addCategory" | "deleteCategory" | "updateCategory" | "updateCategorySchedule"> => ({
  addCategory: (projectId, subProjectId, name) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return { ...s, categories: [...s.categories, { id: `cat-${Date.now()}`, name, items: [], startWeek: 1, durationWeeks: 2 }] };
          }),
        };
      }),
    }));
  },

  deleteCategory: (projectId, subProjectId, categoryId) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return { ...s, categories: s.categories.filter((c) => c.id !== categoryId) };
          }),
        };
      }),
    }));
  },

  updateCategory: (projectId, subProjectId, categoryId, name) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return { ...s, categories: s.categories.map((c) => c.id === categoryId ? { ...c, name } : c) };
          }),
        };
      }),
    }));
  },

  updateCategorySchedule: (projectId, subProjectId, categoryId, startWeek, durationWeeks) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return { ...s, categories: s.categories.map((c) => c.id === categoryId ? { ...c, startWeek, durationWeeks } : c) };
          }),
        };
      }),
    }));
  },
});
