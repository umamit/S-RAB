"use client";
import React from "react";
import RegulasiSection from "./RegulasiSection";
import KoefisienSection from "./KoefisienSection";
import FiturSection from "./FiturSection";
import TaktisPLSection from "./TaktisPLSection";
import TaktisLelangSection from "./TaktisLelangSection";
import SSHSection from "./SSHSection";
import AnalogiDapurSection from "./AnalogiDapurSection";
import BiayaNonFisikSection from "./BiayaNonFisikSection";
import LangkahPenggunaanSection from "./LangkahPenggunaanSection";

export default function UserGuide() {
  return (
    <div className="space-y-8 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:hidden">
      {/* Title Header */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">
          Buku Panduan Penggunaan Aplikasi
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Panduan langkah demi langkah cara mengoperasikan seluruh fitur estimasi dan pengawasan di aplikasi S-RAB.
        </p>
      </div>

      <RegulasiSection />
      <KoefisienSection />
      <FiturSection />
      <TaktisPLSection />
      <TaktisLelangSection />
      <SSHSection />
      <AnalogiDapurSection />
      <BiayaNonFisikSection />
      <LangkahPenggunaanSection />
    </div>
  );
}
