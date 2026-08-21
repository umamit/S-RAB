import { getAllIndexedAHSP, type IndexedAHSP } from "./ahspKnowledgeBase";
import type { AHSPTemplate } from "../store/types";

export interface RetrievalResult {
  indexed: IndexedAHSP;
  score: number;
  confidence: "high" | "medium" | "low";
}

export function retrieveMatchingAHSP(
  query: string,
  customTemplates: AHSPTemplate[] = [],
  topK: number = 3
): RetrievalResult[] {
  const allAHSP = getAllIndexedAHSP(customTemplates);
  const cleanQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const queryTokens = cleanQuery.split(/\s+/).filter((t) => t.length > 2);

  if (queryTokens.length === 0) return [];

  const results: RetrievalResult[] = allAHSP.map((item) => {
    let matches = 0;
    let weight = 0;

    queryTokens.forEach((token) => {
      if (item.keywords.includes(token)) {
        matches += 2;
        weight += 2;
      } else if (item.keywords.some((k) => k.includes(token) || token.includes(k))) {
        matches += 1;
        weight += 1;
      }
    });

    const score = matches / Math.max(queryTokens.length, 1);
    let confidence: "high" | "medium" | "low" = "low";
    if (score >= 0.8) confidence = "high";
    else if (score >= 0.4) confidence = "medium";

    return { indexed: item, score, confidence };
  });

  return results
    .filter((r) => r.score > 0.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
