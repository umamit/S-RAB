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

export interface CustomAHSPTemplate {
  id: string;
  name: string;
  unit: string;
  ahsp: AHSP;
}

export interface AHSPTemplate {
  name: string;
  unit: string;
  ahsp: AHSP;
}
