import type { StateCreator } from "zustand";
import type { RABState, Addendum, AddendumItem, CCO, CCOItem, CCOStatus } from "./types";
import { syncProjectToSupabase } from "../supabaseClient";

export const createChangeOrderActions = (
  set: Parameters<StateCreator<RABState>>[0],
  get: Parameters<StateCreator<RABState>>[1]
): Pick<
  RABState,
  | "addAddendum" | "deleteAddendum" | "addAddendumItem" | "deleteAddendumItem"
  | "addCCO" | "deleteCCO" | "updateCCOStatus" | "addCCOItem" | "deleteCCOItem"
> => ({
  addAddendum: (projectId, number, date, reason) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const newAdd = { id: `addendum-${Date.now()}`, number, date, reason, items: [] };
        return { ...p, addendums: [...(p.addendums || []), newAdd] };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
    get().addAuditLog(projectId, "ADD_ADDENDUM", `Membuat Addendum baru No: ${number} tanggal ${date}`);
  },

  deleteAddendum: (projectId, addendumId) => {
    const project = get().projects.find((p) => p.id === projectId);
    const target = project?.addendums?.find((a) => a.id === addendumId);
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return { ...p, addendums: (p.addendums || []).filter((a) => a.id !== addendumId) };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
    if (target) get().addAuditLog(projectId, "DELETE_ADDENDUM", `Menghapus Addendum No: ${target.number}`);
  },

  addAddendumItem: (projectId, addendumId, item) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          addendums: (p.addendums || []).map((a) => {
            if (a.id !== addendumId) return a;
            return { ...a, items: [...a.items, { ...item, id: `add-item-${Date.now()}` }] };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
    const addObj = get().projects.find((p) => p.id === projectId)?.addendums?.find((a) => a.id === addendumId);
    if (addObj) get().addAuditLog(projectId, "ADD_ADDENDUM_ITEM", `Menambah item perubahan pada Addendum No: ${addObj.number} (${item.name})`);
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
    const addObj = get().projects.find((p) => p.id === projectId)?.addendums?.find((a) => a.id === addendumId);
    if (addObj) get().addAuditLog(projectId, "DELETE_ADDENDUM_ITEM", `Menghapus item perubahan pada Addendum No: ${addObj.number}`);
  },

  addCCO: (projectId, number, date, notes) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const newCCO = { id: `cco-${Date.now()}`, number, date, status: "Draft" as const, items: [], notes };
        return { ...p, ccos: [...(p.ccos || []), newCCO] };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
    get().addAuditLog(projectId, "ADD_CCO", `Membuat draft CCO baru No: ${number}`);
  },

  deleteCCO: (projectId, ccoId) => {
    const project = get().projects.find((p) => p.id === projectId);
    const target = project?.ccos?.find((c) => c.id === ccoId);
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return { ...p, ccos: (p.ccos || []).filter((c) => c.id !== ccoId) };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
    if (target) get().addAuditLog(projectId, "DELETE_CCO", `Menghapus CCO No: ${target.number}`);
  },

  updateCCOStatus: (projectId, ccoId, status) => {
    const project = get().projects.find((p) => p.id === projectId);
    const target = project?.ccos?.find((c) => c.id === ccoId);
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
    if (target) get().addAuditLog(projectId, "UPDATE_CCO_STATUS", `Mengubah status CCO No: ${target.number} menjadi ${status}`);
  },

  addCCOItem: (projectId, ccoId, item) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          ccos: (p.ccos || []).map((c) => {
            if (c.id !== ccoId) return c;
            return { ...c, items: [...c.items, { ...item, id: `cco-item-${Date.now()}` }] };
          }),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
    const ccoObj = get().projects.find((p) => p.id === projectId)?.ccos?.find((c) => c.id === ccoId);
    if (ccoObj) get().addAuditLog(projectId, "ADD_CCO_ITEM", `Menambah item perubahan pada CCO No: ${ccoObj.number} (${item.name})`);
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
    const ccoObj = get().projects.find((p) => p.id === projectId)?.ccos?.find((c) => c.id === ccoId);
    if (ccoObj) get().addAuditLog(projectId, "DELETE_CCO_ITEM", `Menghapus item perubahan pada CCO No: ${ccoObj.number}`);
  },
});
