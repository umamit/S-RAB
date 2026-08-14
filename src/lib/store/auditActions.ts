import type { StateCreator } from "zustand";
import type { RABState, AuditLog } from "./types";
import { syncProjectToSupabase } from "../supabaseClient";

export const createAuditActions = (
  set: Parameters<StateCreator<RABState>>[0],
  get: Parameters<StateCreator<RABState>>[1]
) => ({
  addAuditLog: (projectId: string, actionType: string, details: string) => {
    const { projects, currentUser } = get();
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      timestamp: new Date().toISOString(),
      userName: currentUser?.name || "Tamu / Pengguna",
      actionType,
      details,
    };

    const updatedProject = {
      ...project,
      auditLogs: [newLog, ...(project.auditLogs || [])],
    };

    set((state) => ({
      projects: state.projects.map((p) => (p.id === projectId ? updatedProject : p)),
    }));
    syncProjectToSupabase(updatedProject);
  },
});
export type { AuditLog };
