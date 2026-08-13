import React from "react";

export default function BiayaNonFisikSection() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3">
      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
        💼 Pedoman Komponen Biaya (Overhead & PPN)
      </h3>
      <p className="text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed">
        Kalkulasi lembar Rekapitulasi Utama dibagi menjadi tiga komponen biaya sesuai standar pengadaan pemerintah:
      </p>
      <div className="space-y-2.5 text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed pl-2">
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">1. Jumlah Pekerjaan Fisik (Direct Cost):</strong>
          Total biaya murni untuk material/bahan bangunan, upah harian pekerja di lapangan, dan biaya sewa peralatan yang langsung berkontribusi pada konstruksi bangunan.
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">2. Jasa Konstruksi & Overhead (Maksimal 15%):</strong>
          Berdasarkan Permen PUPR No. 1 Tahun 2022, batas maksimum pengenaan biaya umum dan keuntungan pelaksana adalah **15%**. Komponen ini mencakup:
          <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
            <li><span className="font-semibold text-zinc-700 dark:text-zinc-300">Overhead (Biaya Umum)</span>: Biaya tidak langsung penyedia jasa seperti sewa kantor kontraktor, ATK, gaji staf manajemen kantor pusat, pembuatan jaminan perbankan, serta K3 perusahaan.</li>
            <li><span className="font-semibold text-zinc-700 dark:text-zinc-300">Profit</span>: Keuntungan bersih murni yang didapatkan oleh penyedia jasa/kontraktor pelaksana.</li>
          </ul>
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">3. PPN (Pajak Pertambahan Nilai):</strong>
          Pajak yang dikenakan negara atas total biaya pekerjaan (Fisik + Jasa & Overhead). Di aplikasi, tarif ini dapat disesuaikan secara dinamis (default **12%** sesuai amanat UU HPP yang mulai berlaku 1 Januari 2025, atau disetel ke 0% untuk pembangunan swakelola/pribadi). *(Dasar Hukum: Undang-Undang No. 7 Tahun 2021 tentang Harmonisasi Peraturan Perpajakan / UU HPP)*.
        </div>
      </div>
    </div>
  );
}
