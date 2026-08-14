import { createClient } from "@supabase/supabase-js";
import type { Project } from "./store/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    "Supabase credentials are missing. Please define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const syncProjectToSupabase = async (project: Project) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase.from("projects").upsert({
      id: project.id,
      user_id: session.user.id,
      name: project.name,
      description: project.description,
      created_at: project.createdAt,
      tax_rate: project.taxRate,
      profit_rate: project.profitRate,
      duration_weeks: project.durationWeeks,
      active_sub_project_id: project.activeSubProjectId,
      sub_projects: project.subProjects,
      daily_logs: project.dailyLogs || [],
      weekly_progress: project.weeklyProgress || [],
      weekly_financials: project.weeklyFinancials || [],
      payment_terms: project.paymentTerms || [],
      addendums: project.addendums || [],
      ccos: project.ccos || [],
    });
  } catch (err) {
    console.error("Failed to sync project to Supabase:", err);
  }
};

export const deleteProjectFromSupabase = async (projectId: string) => {
  try {
    await supabase.from("projects").delete().eq("id", projectId);
  } catch (err) {
    console.error("Failed to delete project from Supabase:", err);
  }
};

export const fetchProjectsFromSupabase = async (): Promise<Project[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return [];

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
      taxRate: Number(row.tax_rate),
      profitRate: Number(row.profit_rate),
      durationWeeks: row.duration_weeks,
      activeSubProjectId: row.active_sub_project_id,
      subProjects: row.sub_projects,
      dailyLogs: row.daily_logs,
      weeklyProgress: row.weekly_progress,
      weeklyFinancials: row.weekly_financials || [],
      paymentTerms: row.payment_terms || [],
      addendums: row.addendums || [],
      ccos: row.ccos || [],
    }));
  } catch (err) {
    console.error("Error fetching projects from Supabase:", err);
    return [];
  }
};
