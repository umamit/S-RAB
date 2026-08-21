import { AHSP } from "./ahsp";
import { DailyLog, WeeklyProgress, WeeklyFinancial, PaymentTerm } from "./logs";
import { Addendum, CCO } from "./changeOrder";

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

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

export interface BASTDetails {
  number: string;
  date: string;
  firstPartyName: string;
  firstPartyRole: string;
  secondPartyName: string;
  secondPartyRole: string;
  notes?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  actionType: string;
  details: string;
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
  alertThreshold?: number;
  pphRate?: number;
  addendums?: Addendum[];
  ccos?: CCO[];
  bastDetails?: BASTDetails;
  auditLogs?: AuditLog[];
}
