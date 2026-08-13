import type { StateCreator } from "zustand";
import type { RABState, DailyLog } from "./types";
import { calculateAHSPUnitPrice } from "./ahspTemplates";
import { syncProjectToSupabase } from "../supabaseClient";

export const createLogActions = (
  set: Parameters<StateCreator<RABState>>[0],
): Pick<RABState, "addDailyLog" | "deleteDailyLog" | "updateWeeklyProgress" | "updateGlobalResourcePrice"> => ({

  addDailyLog: (projectId, date, weather, workers, notes) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const newLog: DailyLog = { id: `log-${Date.now()}`, date, weather, workers, notes };
        return { ...p, dailyLogs: [...(p.dailyLogs || []), newLog] };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  deleteDailyLog: (projectId, logId) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return { ...p, dailyLogs: (p.dailyLogs || []).filter((l) => l.id !== logId) };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  updateWeeklyProgress: (projectId, weekNumber, categoryId, percentage) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const list = [...(p.weeklyProgress || [])];
        const idx = list.findIndex((w) => w.weekNumber === weekNumber);
        if (idx >= 0) {
          list[idx] = { ...list[idx], actualCategoryProgress: { ...list[idx].actualCategoryProgress, [categoryId]: percentage } };
        } else {
          list.push({ weekNumber, actualCategoryProgress: { [categoryId]: percentage } });
        }
        return { ...p, weeklyProgress: list };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  updateGlobalResourcePrice: (projectId, name, price) => {
    set((state) => {
      const nextProjects = state.projects.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          subProjects: proj.subProjects.map((sub) => ({
            ...sub,
            categories: sub.categories.map((cat) => ({
              ...cat,
              items: cat.items.map((item) => {
                if (!item.ahsp) return item;
                const materials = item.ahsp.materials.map((m) =>
                  m.name.toLowerCase() === name.toLowerCase() ? { ...m, unitPrice: price } : m
                );
                const labor = item.ahsp.labor.map((l) =>
                  l.name.toLowerCase() === name.toLowerCase() ? { ...l, unitPrice: price } : l
                );
                const tools = item.ahsp.tools.map((t) =>
                  t.name.toLowerCase() === name.toLowerCase() ? { ...t, unitPrice: price } : t
                );
                const newAhsp = { materials, labor, tools };
                return { ...item, ahsp: newAhsp, unitPrice: calculateAHSPUnitPrice(newAhsp) };
              }),
            })),
          })),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },
});
