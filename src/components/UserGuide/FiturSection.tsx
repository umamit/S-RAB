import React from "react";

export default function FiturSection() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3">
      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
        🎯 Fungsi & Manfaat Praktis Fitur Utama
      </h3>
      <p className="text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed">
        Berikut adalah tujuan digunakannya masing-masing fitur utama dalam aplikasi untuk mendukung proyek Anda:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed pl-2">
        <div className="space-y-1">
          <strong className="text-zinc-800 dark:text-zinc-200 block">1. Sub-Pekerjaan (Divisi):</strong>
          Memecah proyek besar menjadi kelompok anggaran terpisah (misal: Struktur, MEP, Lanskap, Lantai 1 & 2) demi kerapian dokumen lelang dan kontrol spesialisasi pekerjaan kontraktor.
        </div>
        <div className="space-y-1">
          <strong className="text-zinc-800 dark:text-zinc-200 block">2. Kalkulator AHSP SNI:</strong>
          Menjamin harga satuan pekerjaan dapat dipertanggungjawabkan secara hukum melalui penggabungan koefisien PUPR/SNI dan Harga Satuan Dasar lokal (SSH).
        </div>
        <div className="space-y-1">
          <strong className="text-zinc-800 dark:text-zinc-200 block">3. Rencana Kurva S:</strong>
          Menjadi garis dasar (baseline) target durasi waktu pengerjaan proyek yang sah sebagai acuan kontrak kerja sama kontraktor dan pemilik proyek.
        </div>
        <div className="space-y-1">
          <strong className="text-zinc-800 dark:text-zinc-200 block">4. Laporan Harian:</strong>
          Menjadi bukti otentik pengawas lapangan tentang cuaca, jumlah tenaga kerja harian, kemajuan proyek, serta kendala lapangan untuk bahan backup data.
        </div>
        <div className="space-y-1">
          <strong className="text-zinc-800 dark:text-zinc-200 block">5. Laporan Realisasi Progres:</strong>
          Mengukur keterlambatan kontraktor (Deviasi) sebagai dasar penjatuhan surat peringatan lelang (SCM) maupun dasar penghitungan termin pembayaran.
        </div>
        <div className="space-y-1">
          <strong className="text-zinc-800 dark:text-zinc-200 block">6. Rekapitulasi Bahan & Tenaga:</strong>
          Berfungsi sebagai daftar belanja resmi (Shopping List) agar pengadaan logistik material di lapangan efisien, tepat waktu, dan bebas dari pemborosan biaya.
        </div>
      </div>
    </div>
  );
}
