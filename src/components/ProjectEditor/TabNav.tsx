"use client";
import type { Project } from "@/lib/store";
import {
  Layers, FileSpreadsheet, LineChart, ClipboardList,
  TrendingUp, HelpCircle, Package, Coins, FileSignature, GitPullRequest, ClipboardCheck, History
} from "lucide-react";

type TabType = "detail" | "recap" | "schedule" | "daily" | "progress" | "guide" | "resource" | "ssh" | "termin" | "addendum" | "cco" | "bast" | "history";

const TABS: { id: TabType; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "recap",    label: "Rekapitulasi Utama",  Icon: Layers },
  { id: "detail",   label: "Rincian Detail",       Icon: FileSpreadsheet },
  { id: "schedule", label: "Jadwal & Kurva S",     Icon: LineChart },
  { id: "daily",    label: "Laporan Harian",       Icon: ClipboardList },
  { id: "progress", label: "Realisasi Progres",    Icon: TrendingUp },
  { id: "termin",   label: "Termin Pembayaran",    Icon: Coins },
  { id: "addendum", label: "Addendum / PTK",       Icon: FileSignature },
  { id: "cco",      label: "CCO Lapangan",         Icon: GitPullRequest },
  { id: "bast",     label: "Cetak BAST",           Icon: ClipboardCheck },
  { id: "history",  label: "Riwayat",              Icon: History },
  { id: "resource", label: "Bahan & Tenaga",       Icon: Package },
  { id: "ssh",      label: "Harga SSH",            Icon: Coins },
  { id: "guide",    label: "Panduan",              Icon: HelpCircle },
];

interface TabNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800 print:hidden text-xs font-bold uppercase tracking-wider overflow-x-auto">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          type="button"
          className={`py-3 px-5 border-b-2 font-bold shrink-0 transition-all -mb-px flex items-center gap-1.5 ${
            activeTab === id
              ? "border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50"
              : "border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

export type { TabType };
