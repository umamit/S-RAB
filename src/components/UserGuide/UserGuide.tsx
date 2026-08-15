"use client";
import React, { useState } from "react";
import RegulasiSection from "./RegulasiSection";
import KoefisienSection from "./KoefisienSection";
import FiturSection from "./FiturSection";
import TaktisPLSection from "./TaktisPLSection";
import TaktisLelangSection from "./TaktisLelangSection";
import SSHSection from "./SSHSection";
import AnalogiDapurSection from "./AnalogiDapurSection";
import BiayaNonFisikSection from "./BiayaNonFisikSection";
import LangkahPenggunaanSection from "./LangkahPenggunaanSection";
import AkunDanDataSection from "./AkunDanDataSection";
import FiturCanggihSection from "./FiturCanggihSection";

type GuideTabType = "langkah" | "dasar" | "taktis" | "analogi";

export default function UserGuide() {
  const [activeTab, setActiveTab] = useState<GuideTabType>("langkah");

  const tabs: { id: GuideTabType; label: string }[] = [
    { id: "langkah", label: "Langkah Penggunaan" },
    { id: "dasar", label: "Dasar Hukum & Regulasi" },
    { id: "taktis", label: "Taktis PL & Lelang" },
    { id: "analogi", label: "Analogi Dapur & Non-Fisik" },
  ];

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-955 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:hidden">
      {/* Title Header */}
      <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">
          Buku Panduan Penggunaan Aplikasi
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Panduan terstruktur cara mengoperasikan seluruh fitur estimasi dan pengawasan di aplikasi S-RAB.
        </p>
      </div>

      {/* Internal Tabs */}
      <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 bg-zinc-50/50 dark:bg-zinc-900/20 text-xs font-semibold uppercase tracking-wider overflow-x-auto gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            className={`py-2 px-4 rounded-md transition-colors shrink-0 text-[10px] ${
              activeTab === tab.id
                ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 font-bold shadow-xs"
                : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="space-y-8 pt-2">
        {activeTab === "langkah" && (
          <>
            <AkunDanDataSection />
            <FiturCanggihSection />
            <LangkahPenggunaanSection />
          </>
        )}

        {activeTab === "dasar" && (
          <>
            <RegulasiSection />
            <FiturSection />
            <KoefisienSection />
          </>
        )}

        {activeTab === "taktis" && (
          <>
            <TaktisPLSection />
            <TaktisLelangSection />
          </>
        )}

        {activeTab === "analogi" && (
          <>
            <AnalogiDapurSection />
            <BiayaNonFisikSection />
            <SSHSection />
          </>
        )}
      </div>
    </div>
  );
}
