"use client";

import { useEffect, useState } from "react";
import { useRABStore } from "@/lib/store";
import Header from "@/components/Header";
import ProjectList from "@/components/ProjectList";
import BudgetSummary from "@/components/BudgetSummary";
import ProjectEditor from "@/components/ProjectEditor";
import AddProjectModal from "@/components/AddProjectModal";
import LoginScreen from "@/components/LoginScreen";
import { supabase, fetchProjectsFromSupabase } from "@/lib/supabaseClient";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const { projects, activeProjectId, currentUser } = useRABStore();

  // Filter projects to only those belonging to the current user
  const userProjects = currentUser
    ? projects.filter((p) => !p.userId || p.userId === currentUser.id)
    : [];

  const activeProject = userProjects.find((p) => p.id === activeProjectId);

  useEffect(() => {
    setIsMounted(true);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const name = session.user.user_metadata?.display_name || session.user.email?.split("@")[0] || "User";
        const loggedUser = {
          id: session.user.id,
          email: session.user.email || "",
          name,
          passwordHash: "",
        };

        const dbProjects = await fetchProjectsFromSupabase();

        useRABStore.setState({
          currentUser: loggedUser,
          projects: dbProjects,
          activeProjectId: dbProjects.length > 0
            ? (useRABStore.getState().activeProjectId && dbProjects.find(p => p.id === useRABStore.getState().activeProjectId)
               ? useRABStore.getState().activeProjectId
               : dbProjects[0].id)
            : null,
        });
      } else {
        useRABStore.setState({
          currentUser: null,
          activeProjectId: null,
          projects: [],
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-50 animate-spin" />
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium tracking-wider uppercase">
            Memuat Estimator...
          </span>
        </div>
      </div>
    );
  }

  // Show login if no active session
  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans">
      {/* Premium Header */}
      <Header onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)} />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Sidebar Project List */}
        <ProjectList onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeProject ? (
            <>
              {/* Top Summary & Allocation Chart */}
              <BudgetSummary project={activeProject} />

              {/* Main Calculation Spreadsheet */}
              <ProjectEditor project={activeProject} />
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Pilih atau Buat Proyek
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mt-1 mb-4">
                Halo, <span className="font-semibold text-zinc-700 dark:text-zinc-300">{currentUser.name}</span>! Silakan pilih proyek dari menu di samping kiri, atau buat proyek estimasi baru.
              </p>
              <button
                onClick={() => setIsNewProjectModalOpen(true)}
                type="button"
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-semibold rounded-lg text-sm shadow-sm transition-colors"
              >
                Buat Proyek Baru
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Dynamic Creation Dialog */}
      <AddProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  );
}
