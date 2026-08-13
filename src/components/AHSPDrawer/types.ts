export type SectionType = "materials" | "labor" | "tools";
export interface NewEntryState {
  name: string;
  unit: string;
  coefficient: number;
  unitPrice: number;
}
