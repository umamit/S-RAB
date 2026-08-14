import type { StateCreator } from "zustand";
import type { RABState, PaymentTerm } from "./types";
import { syncProjectToSupabase } from "../supabaseClient";

export const createPaymentTermActions = (
  set: Parameters<StateCreator<RABState>>[0],
): Pick<RABState, "addPaymentTerm" | "updatePaymentTerm" | "deletePaymentTerm"> => ({
  addPaymentTerm: (projectId, targetProgress, amount, notes) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const existing = p.paymentTerms || [];
        const newTerm: PaymentTerm = {
          id: `term-${Date.now()}`,
          termNumber: existing.length + 1,
          targetProgress,
          amount,
          isPaid: false,
          notes,
        };
        return { ...p, paymentTerms: [...existing, newTerm] };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  updatePaymentTerm: (projectId, termId, updates) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          paymentTerms: (p.paymentTerms || []).map((t) =>
            t.id === termId ? { ...t, ...updates } : t
          ),
        };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },

  deletePaymentTerm: (projectId, termId) => {
    set((state) => {
      const nextProjects = state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const filtered = (p.paymentTerms || []).filter((t) => t.id !== termId);
        const renumbered = filtered.map((t, i) => ({ ...t, termNumber: i + 1 }));
        return { ...p, paymentTerms: renumbered };
      });
      const found = nextProjects.find((p) => p.id === projectId);
      if (found) syncProjectToSupabase(found);
      return { projects: nextProjects };
    });
  },
});
