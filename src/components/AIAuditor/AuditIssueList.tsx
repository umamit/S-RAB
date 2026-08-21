"use client";
import React, { useState } from "react";
import type { AuditIssue } from "@/lib/ai/rabAuditService";
import { AlertCircle, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";

interface AuditIssueListProps {
  issues: AuditIssue[];
}

export default function AuditIssueList({ issues }: AuditIssueListProps) {
  const [filter, setFilter] = useState<"ALL" | "CRITICAL" | "WARNING" | "SUGGESTION">("ALL");

  const filteredIssues = issues.filter((item) => {
    if (filter === "ALL") return true;
    return item.severity === filter;
  });

  const getSeverityBadge = (severity: string) => {
    if (severity === "CRITICAL") {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60">
          <AlertCircle className="w-3 h-3" /> Kritis
        </span>
      );
    }
    if (severity === "WARNING") {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60">
          <AlertTriangle className="w-3 h-3" /> Waspada
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
        <Lightbulb className="w-3 h-3" /> Saran Efisiensi
      </span>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 border-b border-zinc-150 dark:border-zinc-800 pb-2 text-xs font-bold">
        {(["ALL", "CRITICAL", "WARNING", "SUGGESTION"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded-lg text-[11px] transition-all ${
              filter === key
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            {key === "ALL" && `Semua Temuan (${issues.length})`}
            {key === "CRITICAL" && `Kritis (${issues.filter((i) => i.severity === "CRITICAL").length})`}
            {key === "WARNING" && `Waspada (${issues.filter((i) => i.severity === "WARNING").length})`}
            {key === "SUGGESTION" && `Saran (${issues.filter((i) => i.severity === "SUGGESTION").length})`}
          </button>
        ))}
      </div>

      <div className="max-h-[320px] overflow-y-auto space-y-3 pr-1">
        {filteredIssues.length === 0 ? (
          <div className="py-8 text-center text-zinc-400 text-xs flex flex-col items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <p>Tidak ada temuan anomali pada filter ini. Struktur RAB Anda baik!</p>
          </div>
        ) : (
          filteredIssues.map((issue, idx) => (
            <div key={issue.id || idx} className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs space-y-2 text-xs">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  {getSeverityBadge(issue.severity)}
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{issue.category}</span>
                </div>
                {issue.itemName && (
                  <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400 font-mono">
                    {issue.itemName}
                  </span>
                )}
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                {issue.finding}
              </p>
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-800/80 text-[11px] text-zinc-650 dark:text-zinc-350">
                <strong className="text-emerald-600 dark:text-emerald-400">Rekomendasi: </strong>
                {issue.recommendation}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
