import { retrieveMatchingAHSP } from "./semanticRetriever";
import type { AHSPTemplate, AHSP } from "../store/types";
import { AHSP_TEMPLATES, calculateAHSPUnitPrice } from "../store/ahspTemplates";

export interface ParsedItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  ahsp?: AHSP;
  matchedAhspName?: string;
  confidence?: "high" | "medium" | "low";
}

export interface ParsedCategory {
  id: string;
  name: string;
  items: ParsedItem[];
}

export interface ParsedBoqResult {
  subProjectName: string;
  categories: ParsedCategory[];
}

export async function parseBoqWithGroq(
  rawText: string,
  customTemplates: AHSPTemplate[] = []
): Promise<ParsedBoqResult> {
  const res = await fetch("/api/ai/boq-parser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rawBoqText: rawText,
      prompt: "Identifikasi struktur pekerjaan konstruksi dan cocokkan kemungkinan pekerjaan SNI.",
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Gagal menghubungi server AI Groq.");
  }

  const aiData = await res.json();
  const subName = aiData.subProjectName || "Pekerjaan Tambahan (Hasil AI)";
  const allTemplates = [...AHSP_TEMPLATES, ...customTemplates];

  const categories: ParsedCategory[] = (aiData.categories || []).map((cat: any, cIdx: number) => ({
    id: `parsed-cat-${Date.now()}-${cIdx}`,
    name: cat.name || `Kategori ${cIdx + 1}`,
    items: (cat.items || []).map((item: any, iIdx: number) => {
      const matches = retrieveMatchingAHSP(item.name || "", customTemplates, 1);
      let matchedTemplate: AHSPTemplate | undefined;
      let matchedAhsp: AHSP | undefined;
      let unitPrice = 0;
      let confidence: "high" | "medium" | "low" = "low";

      if (matches.length > 0 && matches[0].score >= 0.3) {
        matchedTemplate = matches[0].indexed.template;
        matchedAhsp = JSON.parse(JSON.stringify(matchedTemplate.ahsp));
        unitPrice = calculateAHSPUnitPrice(matchedAhsp);
        confidence = matches[0].confidence;
      }

      const qty = Math.max(0.001, Number(item.quantity) || 1);
      const total = qty * unitPrice;

      return {
        id: `parsed-item-${Date.now()}-${cIdx}-${iIdx}`,
        name: item.name || "Item Pekerjaan",
        quantity: qty,
        unit: item.unit || matchedTemplate?.unit || "ls",
        unitPrice,
        total,
        ahsp: matchedAhsp,
        matchedAhspName: matchedTemplate?.name,
        confidence,
      };
    }),
  }));

  return { subProjectName: subName, categories };
}
