import type { StateCreator } from "zustand";
import type { RABState, Addendum, AddendumItem, CCO, CCOItem, CCOStatus } from "./types";
import { syncProjectToSupabase } from "../supabaseClient";

export const createChangeOrderActions = (
  set: Parameters<StateCreator<RABState>>[0]
): Pick<
  RABState,
  | "addAddendum" | "deleteAddendum" | "addAddendumItem" | "deleteAddendumItem"
  | "addCCO" | "deleteCCO" | "updateCCOStatus" | "addCCOItem" | "deleteCCOItem"
> => ({
  addAddendum: (projectId, number, date, reason) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const newAddendum: Addendum = { id: `addendum-${Date.now()}`, number, date, reason, items: [] };
        return { ...p, addendums: [...(p.addendums || []), newAddendum] };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  deleteAddendum: (projectId, addendumId) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return { ...p, addendums: (p.addendums || []).filter((a) => a.id !== addendumId) };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  addAddendumItem: (projectId, addendumId, item) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          addendums: (p.addendums || []).map((a) => {
            if (a.id !== addendumId) return a;
            const newItem: AddendumItem = { ...item, id: `add-item-${Date.now()}` };
            return { ...a, items: [...a.items, newItem] };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  deleteAddendumItem: (projectId, addendumId, itemId) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          addendums: (p.addendums || []).map((a) => {
            if (a.id !== addendumId) return a;
            return { ...a, items: a.items.filter((i) => i.id !== itemId) };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  addCCO: (projectId, number, date, notes) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const newCCO: CCO = { id: `cco-${Date.now()}`, number, date, status: "Draft", items: [], notes };
        return { ...p, ccos: [...(p.ccos || []), newCCO] };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  deleteCCO: (projectId, ccoId) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return { ...p, ccos: (p.ccos || []).filter((c) => c.id !== ccoId) };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  updateCCOStatus: (projectId, ccoId, status) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          ccos: (p.ccos || []).map((c) => (c.id === ccoId ? { ...c, status } : c)),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  addCCOItem: (projectId, ccoId, item) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          ccos: (p.ccos || []).map((c) => {
            if (c.id !== ccoId) return c;
            const newItem: CCOItem = { ...item, id: `cco-item-${Date.now()}` };
            return { ...c, items: [...c.items, newItem] };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  deleteCCOItem: (projectId, ccoId, itemId) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          ccos: (p.ccos || []).map((c) => {
            if (c.id !== ccoId) return c;
            return { ...c, items: c.items.filter((i) => i.id !== itemId) };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },
});
