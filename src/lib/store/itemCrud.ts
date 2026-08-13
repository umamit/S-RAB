import type { StateCreator } from "zustand";
import type { RABState, Item } from "./types";
import { calculateAHSPUnitPrice } from "./ahspTemplates";

export const createItemCrud = (
  set: Parameters<StateCreator<RABState>>[0],
): Pick<RABState, "addItem" | "updateItem" | "deleteItem" | "updateItemAHSP"> => ({
  addItem: (projectId, subProjectId, categoryId, item) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return {
              ...s,
              categories: s.categories.map((c) => {
                if (c.id !== categoryId) return c;
                const unitPrice = item.ahsp ? calculateAHSPUnitPrice(item.ahsp) : item.unitPrice;
                const newItem: Item = { ...item, id: `item-${Date.now()}`, unitPrice, total: item.quantity * unitPrice };
                return { ...c, items: [...c.items, newItem] };
              }),
            };
          }),
        };
      }),
    }));
  },

  updateItem: (projectId, subProjectId, categoryId, itemId, itemUpdates) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return {
              ...s,
              categories: s.categories.map((c) => {
                if (c.id !== categoryId) return c;
                return {
                  ...c,
                  items: c.items.map((item) => {
                    if (item.id !== itemId) return item;
                    const merged = { ...item, ...itemUpdates };
                    const unitPrice = merged.ahsp ? calculateAHSPUnitPrice(merged.ahsp) : merged.unitPrice;
                    return { ...merged, unitPrice, total: merged.quantity * unitPrice };
                  }),
                };
              }),
            };
          }),
        };
      }),
    }));
  },

  deleteItem: (projectId, subProjectId, categoryId, itemId) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return {
              ...s,
              categories: s.categories.map((c) => {
                if (c.id !== categoryId) return c;
                return { ...c, items: c.items.filter((item) => item.id !== itemId) };
              }),
            };
          }),
        };
      }),
    }));
  },

  updateItemAHSP: (projectId, subProjectId, categoryId, itemId, ahsp) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          subProjects: p.subProjects.map((s) => {
            if (s.id !== subProjectId) return s;
            return {
              ...s,
              categories: s.categories.map((c) => {
                if (c.id !== categoryId) return c;
                return {
                  ...c,
                  items: c.items.map((item) => {
                    if (item.id !== itemId) return item;
                    const unitPrice = ahsp ? calculateAHSPUnitPrice(ahsp) : item.unitPrice;
                    return { ...item, ahsp, unitPrice, total: item.quantity * unitPrice };
                  }),
                };
              }),
            };
          }),
        };
      }),
    }));
  },
});
