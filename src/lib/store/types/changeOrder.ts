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
