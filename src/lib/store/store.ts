import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RABState, SubProject } from "./types";
import { mockProjects } from "./mockData";
import { simpleHash } from "./authActions";
import { createProjectActions } from "./projectActions";
import { createLogActions } from "./logActions";
import { createAuthActions } from "./authActions";

// ============================================================
// Zustand Store — inisialisasi & persist config
// ============================================================
export const useRABStore = create<RABState>()(
  persist(
    (set, get) => ({
      projects: mockProjects,
      activeProjectId: "proj-mock-1",
      users: [
        {
          id: "user-default",
          email: "admin@s-rab.app",
          name: "Administrator",
          passwordHash: simpleHash("admin123"),
        },
      ],
      currentUser: null,
      customAHSPTemplates: [],

      ...createProjectActions(set, get),
      ...createLogActions(set, get),
      ...createAuthActions(set, get),
    }),
    {
      name: "rab-canggih-storage",
      version: 4,
      migrate: (persistedState: any, version: number) => {
        if (persistedState?.projects) {
          persistedState.projects = persistedState.projects.map((proj: any) => {
            if (version < 1 || !proj.subProjects) {
              const subId = `sub-default-${Date.now()}`;
              const subProject: SubProject = {
                id: subId,
                name: "Pekerjaan Utama",
                categories: proj.categories || [],
              };
              delete proj.categories;
              proj.subProjects = [subProject];
              proj.activeSubProjectId = subId;
              proj.durationWeeks = 12;
            }
            if (version < 2 || !proj.dailyLogs) {
              if (!proj.dailyLogs) proj.dailyLogs = [];
              if (!proj.weeklyProgress) proj.weeklyProgress = [];
            }
            if (version < 3 || !proj.userId) {
              proj.userId = "user-default";
            }
            if (version < 4) {
              if (!proj.weeklyFinancials) proj.weeklyFinancials = [];
              if (!proj.paymentTerms) proj.paymentTerms = [];
              if (!proj.addendums) proj.addendums = [];
              if (!proj.ccos) proj.ccos = [];
              proj.pphRate = proj.pphRate !== undefined ? proj.pphRate : 0.02;
              if (!proj.auditLogs) proj.auditLogs = [];
            }
            return proj;
          });
        }
        if (!persistedState?.users) persistedState.users = [];
        persistedState.currentUser = null;
        return persistedState;
      },
    }
  )
);
