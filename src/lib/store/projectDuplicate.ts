import type { StateCreator } from "zustand";
import type { RABState, Project } from "./types";
import { syncProjectToSupabase } from "../supabaseClient";

export const createProjectDuplicateAction = (
  set: Parameters<StateCreator<RABState>>[0],
  get: Parameters<StateCreator<RABState>>[1]
): Pick<RABState, "duplicateProject"> => ({
  duplicateProject: (id) => {
    const project = get().projects.find((p) => p.id === id);
    if (!project) return;
    const nowStr = String(Date.now());
    const newId = `proj-${nowStr}`;
    const duplicated: Project = {
      ...project,
      id: newId,
      name: `${project.name} (Salinan)`,
      createdAt: new Date().toISOString(),
      subProjects: project.subProjects.map((sub, sIdx) => ({
        ...sub,
        id: `sub-${nowStr}-${sIdx}`,
        categories: sub.categories.map((cat, cIdx) => ({
          ...cat,
          id: `cat-${nowStr}-${sIdx}-${cIdx}`,
          items: cat.items.map((item, iIdx) => ({
            ...item,
            id: `item-${nowStr}-${sIdx}-${cIdx}-${iIdx}`,
          })),
        })),
      })),
      dailyLogs: [],
      weeklyProgress: [],
      weeklyFinancials: [],
      paymentTerms: project.paymentTerms?.map((term, tIdx) => ({
        ...term,
        id: `term-${nowStr}-${tIdx}`,
        isPaid: false,
        paidDate: undefined,
      })) || [],
      addendums: [],
      ccos: [],
      bastDetails: undefined,
      auditLogs: [],
    };
    set((state) => ({
      projects: [...state.projects, duplicated],
      activeProjectId: newId,
    }));
    syncProjectToSupabase(duplicated);
  },
});
