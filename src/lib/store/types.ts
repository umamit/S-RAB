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
  actualQuantity?: number;
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
  photos?: string[];
}

export interface WeeklyProgress {
  weekNumber: number;
  actualCategoryProgress: Record<string, number>;
}

export interface WeeklyFinancial {
  weekNumber: number;
  actualCost: number;
}

export interface PaymentTerm {
  id: string;
  termNumber: number;
  targetProgress: number; // 0–100 (%)
  amount: number;         // Rp, dihitung dari grandTotal
  isPaid: boolean;
  paidDate?: string;      // YYYY-MM-DD
  notes?: string;
}

export interface CustomAHSPTemplate {
  id: string;
  name: string;
  unit: string;
  ahsp: AHSP;
}

export interface AddendumItem {
  id: string;
  subProjectId: string;
  categoryId: string;
  itemId?: string;
  type: "add" | "remove" | "modify";
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  originalQuantity?: number;
  originalUnitPrice?: number;
}

export interface Addendum {
  id: string;
  number: string;
  date: string;
  reason: string;
  items: AddendumItem[];
}

export interface CCOItem {
  id: string;
  subProjectId: string;
  categoryId: string;
  itemId?: string;
  type: "add" | "remove" | "modify";
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  originalQuantity?: number;
  originalUnitPrice?: number;
}

export type CCOStatus = "Draft" | "Diajukan" | "Disetujui" | "Ditolak";

export interface CCO {
  id: string;
  number: string;
  date: string;
  status: CCOStatus;
  items: CCOItem[];
  notes?: string;
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
  weeklyFinancials?: WeeklyFinancial[];
  paymentTerms?: PaymentTerm[];
  alertThreshold?: number; // Nilai persentase threshold deviasi minus, misal: 5 untuk -5%
  addendums?: Addendum[];
  ccos?: CCO[];
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
  customAHSPTemplates: CustomAHSPTemplate[];

  // Project Actions
  addProject: (name: string, description: string, taxRate: number, profitRate: number) => string;
  importProject: (projectData: any) => string;
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
  updateItemActualQuantity: (projectId: string, subProjectId: string, categoryId: string, itemId: string, actualQuantity: number) => void;

  // Daily Log Actions
  addDailyLog: (projectId: string, date: string, weather: string, workers: { role: string; count: number }[], notes?: string, photos?: string[]) => void;
  deleteDailyLog: (projectId: string, logId: string) => void;

  // Weekly Progress & SSH Actions
  updateWeeklyProgress: (projectId: string, weekNumber: number, categoryId: string, percentage: number) => void;
  updateWeeklyFinancial: (projectId: string, weekNumber: number, actualCost: number) => void;
  updateGlobalResourcePrice: (projectId: string, name: string, price: number) => void;

  // Custom AHSP Template Actions
  saveCustomAHSPTemplate: (name: string, unit: string, ahsp: AHSP) => void;
  deleteCustomAHSPTemplate: (id: string) => void;

  // Payment Term Actions
  addPaymentTerm: (projectId: string, targetProgress: number, amount: number, notes?: string) => void;
  updatePaymentTerm: (projectId: string, termId: string, updates: Partial<Omit<PaymentTerm, "id" | "termNumber">>) => void;
  deletePaymentTerm: (projectId: string, termId: string) => void;

  // Addendum Actions
  addAddendum: (projectId: string, number: string, date: string, reason: string) => void;
  deleteAddendum: (projectId: string, addendumId: string) => void;
  addAddendumItem: (projectId: string, addendumId: string, item: Omit<AddendumItem, "id">) => void;
  deleteAddendumItem: (projectId: string, addendumId: string, itemId: string) => void;

  // CCO Actions
  addCCO: (projectId: string, number: string, date: string, notes?: string) => void;
  deleteCCO: (projectId: string, ccoId: string) => void;
  updateCCOStatus: (projectId: string, ccoId: string, status: CCOStatus) => void;
  addCCOItem: (projectId: string, ccoId: string, item: Omit<CCOItem, "id">) => void;
  deleteCCOItem: (projectId: string, ccoId: string, itemId: string) => void;

  // Auth Actions
  registerUser: (email: string, name: string, passwordPlain: string) => Promise<{ success: boolean; error?: string }>;
  loginUser: (email: string, passwordPlain: string) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => Promise<void>;

}
