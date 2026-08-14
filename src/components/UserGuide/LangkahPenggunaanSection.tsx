"use client";
import React from "react";
import LangkahEstimasi from "./LangkahEstimasi";
import LangkahJadwal from "./LangkahJadwal";

export default function LangkahPenggunaanSection() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
        <LangkahEstimasi />
        <LangkahJadwal />
      </div>

      {/* Printing and Export */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5 space-y-3 text-xs">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">Format Ekspor &amp; Cetak</h3>
        <ul className="list-disc list-inside space-y-1.5 text-zinc-650 dark:text-zinc-400">
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Ekspor Excel:</strong> Menghasilkan file `.xlsx` dengan tab cover Rekapitulasi, tab sub-proyek detail, serta daftar kebutuhan bahan &amp; upah terintegrasi rumus otomatis.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Cetak PDF:</strong> Klik tombol <strong>Cetak PDF</strong> di kanan atas layar untuk menghasilkan satu dokumen bundel laporan terpadu (Cover Rekapitulasi + Rincian Detail + Laporan Harian + Laporan Progres Mingguan + Rekapitulasi Bahan) yang siap dicetak atau disimpan sebagai PDF.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Bagikan Proyek (JSON):</strong> Klik <strong>Ekspor JSON</strong> di header untuk mengunduh satu file `.json` berisi seluruh data proyek aktif. Rekan kerja dapat membukanya melalui tombol <strong>Impor JSON</strong> di samping daftar proyek — data akan masuk sebagai proyek baru tanpa menimpa data yang sudah ada.
          </li>
        </ul>
      </div>
    </>
  );
}
