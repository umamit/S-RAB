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
