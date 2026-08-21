"use client";
import React from "react";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";

interface AuditScoreCardProps {
  score: number;
  status: "SEHAT" | "PERLU_PERHATIAN" | "KRITIS";
  summary: string;
}

export default function AuditScoreCard({ score, status, summary }: AuditScoreCardProps) {
  const getBadgeStyle = () => {
    if (score >= 85) {
      return {
        bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
        label: "RAB Sangat Sehat & Layak",
      };
    }
    if (score >= 60) {
      return {
        bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        icon: <AlertTriangle className="w-8 h-8 text-amber-500" />,
        label: "Perlu Perhatian & Penyesuaian",
      };
    }
    return {
      bg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
      icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
      label: "Kritis (Risiko Teknis / Biaya Tinggi)",
    };
  };

  const badge = getBadgeStyle();

  return (
    <div className={`p-4 rounded-2xl border ${badge.bg} flex items-center gap-4 transition-all shadow-xs`}>
      <div className="shrink-0">{badge.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold tracking-tight">{score}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">/ 100 Skor Kesehatan</span>
        </div>
        <div className="text-xs font-bold mt-0.5">{badge.label}</div>
        <p className="text-xs text-zinc-650 dark:text-zinc-350 mt-1 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
