import type { Project } from "../store/types";

export interface AuditIssue {
  id: string;
  severity: "CRITICAL" | "WARNING" | "SUGGESTION";
  category: string;
  itemName: string;
  finding: string;
  recommendation: string;
}

export interface AuditReportResult {
  healthScore: number;
  status: "SEHAT" | "PERLU_PERHATIAN" | "KRITIS";
  summary: string;
  issues: AuditIssue[];
}

export function buildProjectSummaryPayload(project: Project) {
  return {
    projectName: project.name,
    projectDescription: project.description,
    durationWeeks: project.durationWeeks,
    profitRatePct: (project.profitRate * 100).toFixed(1) + "%",
    taxRatePct: (project.taxRate * 100).toFixed(1) + "%",
    subProjects: project.subProjects.map((sub) => ({
      subProjectName: sub.name,
      categories: sub.categories.map((cat) => ({
        categoryName: cat.name,
        items: cat.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          total: item.total,
          hasAhspSni: !!item.ahsp,
          ahspComponentSummary: item.ahsp
            ? {
                materialsCount: item.ahsp.materials.length,
                materials: item.ahsp.materials.map((m) => `${m.name} (${m.coefficient} ${m.unit} @ Rp${m.unitPrice})`),
                laborCount: item.ahsp.labor.length,
                toolsCount: item.ahsp.tools.length,
              }
            : null,
        })),
      })),
    })),
  };
}

export async function runAIAudit(project: Project): Promise<AuditReportResult> {
  const summaryPayload = buildProjectSummaryPayload(project);

  const res = await fetch("/api/ai/audit-rab", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectSummary: summaryPayload }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Gagal menghubungi layanan AI Auditor.");
  }

  return await res.json();
}
