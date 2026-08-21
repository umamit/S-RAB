import { AHSP_TEMPLATES } from "../store/ahspTemplates";
import type { AHSPTemplate } from "../store/types";

export interface IndexedAHSP {
  id: string;
  name: string;
  unit: string;
  keywords: string[];
  template: AHSPTemplate;
}

const extractKeywords = (name: string): string[] => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !["dan", "atau", "sni", "permen", "pupr"].includes(w));
};

export const AHSP_KNOWLEDGE_BASE: IndexedAHSP[] = AHSP_TEMPLATES.map((tmpl, idx) => ({
  id: `sni-template-${idx}`,
  name: tmpl.name,
  unit: tmpl.unit,
  keywords: extractKeywords(tmpl.name),
  template: tmpl,
}));

export const getAllIndexedAHSP = (customTemplates: AHSPTemplate[] = []): IndexedAHSP[] => {
  const customIndexed: IndexedAHSP[] = customTemplates.map((tmpl, idx) => ({
    id: `custom-template-${idx}`,
    name: tmpl.name,
    unit: tmpl.unit,
    keywords: extractKeywords(tmpl.name),
    template: tmpl,
  }));
  return [...AHSP_KNOWLEDGE_BASE, ...customIndexed];
};
