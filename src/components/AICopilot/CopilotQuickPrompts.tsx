"use client";
import React from "react";
import { Sparkles, Calculator, AlertTriangle, FileText } from "lucide-react";

interface CopilotQuickPromptsProps {
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
}

const QUICK_PROMPTS = [
  {
    icon: <Calculator className="w-3 h-3 text-blue-500" />,
    label: "Hitung Total Semen & Besi",
    prompt: "Berapa perkiraan total kebutuhan belanja semen (dalam sak) dan besi beton (dalam kg/batang) untuk seluruh proyek ini?",
  },
  {
    icon: <Sparkles className="w-3 h-3 text-amber-500" />,
    label: "3 Item Biaya Terbesar",
    prompt: "Sebutkan 3 item pekerjaan dengan porsi biaya terbesar di proyek ini beserta persentase kontribusinya terhadap total anggaran.",
  },
  {
    icon: <AlertTriangle className="w-3 h-3 text-red-500" />,
    label: "Analisis Efisiensi Biaya",
    prompt: "Berikan strategi konkret untuk menghemat anggaran proyek ini sekitar 5-10% tanpa menurunkan standar mutu struktur.",
  },
  {
    icon: <FileText className="w-3 h-3 text-emerald-500" />,
    label: "Draf Surat Penawaran (SPH)",
    prompt: "Buatkan draf teks Surat Penawaran Harga (SPH) resmi untuk pemilik proyek berdasarkan ringkasan total RAB proyek ini.",
  },
];

export default function CopilotQuickPrompts({ onSelectPrompt, disabled }: CopilotQuickPromptsProps) {
  return (
    <div className="p-3 border-t border-zinc-150 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Pertanyaan Cepat:</div>
      <div className="flex flex-wrap gap-1.5">
        {QUICK_PROMPTS.map((qp, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPrompt(qp.prompt)}
            className="text-[11px] bg-white dark:bg-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 rounded-lg px-2.5 py-1.5 font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 shadow-2xs transition-all disabled:opacity-50 text-left"
          >
            {qp.icon}
            <span>{qp.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
