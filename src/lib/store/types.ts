// ============================================================
// Types & Interfaces — semua tipe data untuk S-RAB store
// ============================================================

export interface AHSPEntry {
  id: string;
  name: string;
  unit: string;
  coefficient: number;
  unitPrice: number;
}

export interface AHSP {
  materials: AHSPEntry[];
  labor: AHSPEntry[];
  tools: AHSPEntry[];
}

export interface Item {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  ahsp?: AHSP;
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
  startWeek?: number;
  durationWeeks?: number;
}

export interface SubProject {
  id: string;
  name: string;
  categories: Category[];
}

export interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  weather: string;
  workers: { role: string; count: number }[];
  notes?: string;
}

export interface WeeklyProgress {
  weekNumber: number;
  actualCategoryProgress: Record<string, number>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

export interface Project {
  id: string;
  userId?: string;
  name: string;
  description: string;
  createdAt: string;
  taxRate: number;
  profitRate: number;
  subProjects: SubProject[];
  activeSubProjectId: string | null;
  durationWeeks: number;
  dailyLogs?: DailyLog[];
  weeklyProgress?: WeeklyProgress[];
}

export interface AHSPTemplate {
  name: string;
  unit: string;
  ahsp: AHSP;
}

export interface RABState {
  projects: Project[];
  activeProjectId: string | null;
  users: User[];
  currentUser: User | null;

  // Project Actions
  addProject: (name: string, description: string, taxRate: number, profitRate: number) => string;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<Omit<Project, "id" | "subProjects" | "createdAt">>) => void;
  setActiveProject: (id: string | null) => void;
  updateProjectDuration: (projectId: string, durationWeeks: number) => void;

  // SubProject Actions
  addSubProject: (projectId: string, name: string) => string;
  deleteSubProject: (projectId: string, subProjectId: string) => void;
  updateSubProjectName: (projectId: string, subProjectId: string, name: string) => void;
  setActiveSubProject: (projectId: string, subProjectId: string | null) => void;

  // Category Actions
  addCategory: (projectId: string, subProjectId: string, name: string) => void;
  deleteCategory: (projectId: string, subProjectId: string, categoryId: string) => void;
  updateCategory: (projectId: string, subProjectId: string, categoryId: string, name: string) => void;
  updateCategorySchedule: (projectId: string, subProjectId: string, categoryId: string, startWeek: number, durationWeeks: number) => void;

  // Item Actions
  addItem: (projectId: string, subProjectId: string, categoryId: string, item: Omit<Item, "id" | "total">) => void;
  updateItem: (projectId: string, subProjectId: string, categoryId: string, itemId: string, itemUpdates: Partial<Omit<Item, "id" | "total" | "unitPrice">>) => void;
  deleteItem: (projectId: string, subProjectId: string, categoryId: string, itemId: string) => void;
  updateItemAHSP: (projectId: string, subProjectId: string, categoryId: string, itemId: string, ahsp: AHSP | undefined) => void;

  // Daily Log Actions
  addDailyLog: (projectId: string, date: string, weather: string, workers: { role: string; count: number }[], notes?: string) => void;
  deleteDailyLog: (projectId: string, logId: string) => void;

  // Weekly Progress & SSH Actions
  updateWeeklyProgress: (projectId: string, weekNumber: number, categoryId: string, percentage: number) => void;
  updateGlobalResourcePrice: (projectId: string, name: string, price: number) => void;

  // Auth Actions
  registerUser: (email: string, name: string, passwordPlain: string) => { success: boolean; error?: string };
  loginUser: (email: string, passwordPlain: string) => { success: boolean; error?: string };
  logoutUser: () => void;
}
