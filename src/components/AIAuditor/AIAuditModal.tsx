"use client";
import React, { useState } from "react";
import { X, Shield, RefreshCw } from "lucide-react";
import type { Project } from "@/lib/store";
import { runAIAudit, type AuditReportResult } from "@/lib/ai/rabAuditService";
import AuditScoreCard from "./AuditScoreCard";
import AuditIssueList from "./AuditIssueList";

interface AIAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export default function AIAuditModal({ isOpen, onClose, project }: AIAuditModalProps) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReportResult | null>(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleRunAudit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await runAIAudit(project);
      setReport(res);
    } catch (err: any) {
      setError(err.message || "Gagal menjalankan audit AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] flex flex-col p-6 space-y-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 p-1">
          <X className="w-4 h-4" />
        </button>

        <div className="border-b border-zinc-150 dark:border-zinc-800/80 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">AI Cost &amp; Coefficient Auditor</h3>
              <p className="text-[11px] text-zinc-400">Pemeriksaan kewajaran harga, rasio koefisien struktur, dan kelengkapan item.</p>
            </div>
          </div>
          {report && !loading && (
            <button
              type="button"
              onClick={handleRunAudit}
              className="text-[11px] font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1.5 rounded-lg mr-6"
            >
              <RefreshCw className="w-3 h-3" /> Audit Ulang
            </button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 rounded-xl text-xs text-red-600 dark:text-red-400 font-semibold">
            ⚠️ {error}
          </div>
        )}

        {!report && !loading && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 mx-auto flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Mulai Audit Otomatis RAB Proyek</h4>
              <p className="text-xs text-zinc-500">
                AI Groq (Model GPT OSS 120B) akan menganalisis {project.subProjects.length} divisi sub-pekerjaan untuk mendeteksi kejanggalan harga, risiko keselamatan struktur, dan efisiensi biaya.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRunAudit}
              className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-xl text-xs shadow-md transition-all"
            >
              Mulai Analisis Audit Sekarang
            </button>
          </div>
        )}

        {loading && (
          <div className="py-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
            <p className="font-bold text-xs text-zinc-800 dark:text-zinc-200">Sedang Menganalisis Struktur &amp; Koefisien RAB...</p>
            <p className="text-[11px] text-zinc-400">Memeriksa database harga pasar dan aturan teknis SNI dengan Groq LPU.</p>
          </div>
        )}

        {report && !loading && (
          <div className="space-y-4">
            <AuditScoreCard score={report.healthScore} status={report.status} summary={report.summary} />
            <AuditIssueList issues={report.issues || []} />
          </div>
        )}
      </div>
    </div>
  );
}
