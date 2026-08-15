"use client";
import React from "react";
import LangkahCard from "./LangkahCard";

export default function FiturCanggihSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
      {/* Poin 1: Backup & Restore */}
      <LangkahCard title="Backup &amp; Restore Data (JSON)">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Backup Proyek (Ekspor JSON):</strong>
          Pilih proyek aktif, lalu klik tombol <strong>Ekspor JSON</strong> di Header. File <code>.json</code> berisi seluruh data proyek akan terunduh ke perangkat Anda.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Restore Proyek (Impor JSON):</strong>
          Klik ikon <strong>↑ (upload)</strong> di sebelah dropdown pilih proyek pada Header. Pilih file <code>.json</code> hasil backup — proyek langsung muncul sebagai proyek baru tanpa menimpa data yang ada.
        </div>
      </LangkahCard>

      {/* Poin 2: Validasi Input */}
      <LangkahCard title="Validasi &amp; Keamanan Input Data">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Inline Edit Tabel RAB:</strong>
          Sistem mencegah data tidak valid secara otomatis:
          <ul className="list-disc ml-4 mt-1 space-y-0.5">
            <li>Volume ≤ 0 → dikoreksi ke <strong>0.001</strong></li>
            <li>Harga negatif → dikoreksi ke <strong>0</strong></li>
            <li>Nama kosong → perubahan <strong>dibatalkan</strong></li>
          </ul>
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Form CCO &amp; Addendum:</strong>
          Field Volume/Harga menampilkan <span className="text-red-500 font-semibold">border merah</span> jika nilai tidak valid, dan otomatis dikoreksi saat tombol Tambahkan diklik.
        </div>
      </LangkahCard>

      {/* Poin 3: Duplikasi & Theme Toggle */}
      <LangkahCard title="Duplikasi Proyek &amp; Mode Gelap">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Duplikasi Proyek:</strong>
          Klik tombol <strong>Duplikat</strong> di Header untuk menduplikasi proyek aktif. Sistem membuat salinan proyek lengkap dengan seluruh rincian sub-proyek dan parameter, tanpa menimpa data asli.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mode Gelap / Terang:</strong>
          Klik ikon <strong>Matahari/Bulan</strong> di Header untuk beralih tema warna secara instan. Pilihan Anda akan disimpan secara lokal.
        </div>
      </LangkahCard>

      {/* Poin 4: Pengawasan Progres & Deviasi */}
      <LangkahCard title="Pengawasan Budget &amp; Jadwal">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Notifikasi Over-Budget:</strong>
          Jika total pengeluaran aktual kumulatif melampaui anggaran rencana kumulatif mingguan, sistem menampilkan kotak peringatan <span className="text-red-655 font-bold">Over-Budget</span> di tab Pengawasan Progres.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Keterlambatan Jadwal (Gantt Chart):</strong>
          Kategori pekerjaan yang durasinya terlewati tetapi progresnya masih di bawah 100% akan ditandai dengan label <span className="text-red-600 font-bold">⚠️ Terlambat</span> merah menyala pada Gantt Chart.
        </div>
      </LangkahCard>

      {/* Poin 5: Progress Bar & Rekap Semua */}
      <LangkahCard title="Visualisasi Progres &amp; Rekap Lintas">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Progress Bar Global:</strong>
          Setiap kartu proyek di sidebar menampilkan bilah progres hijau visual (diambil dari persentase penyelesaian kumulatif bobot riil) untuk pemantauan cepat.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Rekap Semua Proyek:</strong>
          Klik <strong>Rekap Semua</strong> di Header untuk membuka tabel summary lengkap yang merangkum nilai kontrak total, progress termin, dan status BAST seluruh proyek Anda.
        </div>
      </LangkahCard>

      {/* Poin 6: Sorting & Filter Tabel */}
      <LangkahCard title="Pencarian &amp; Pengurutan Item (RAB)">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mencari Pekerjaan:</strong>
          Ketik kata kunci nama pekerjaan di kotak pencarian **"Cari item pekerjaan..."** pada tab Rincian Detail. Kategori pekerjaan yang tidak memiliki item yang cocok akan disembunyikan secara otomatis agar tampilan bersih.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mengurutkan Item:</strong>
          Gunakan dropdown **"Urutkan Pekerjaan"** untuk mengatur urutan baris berdasarkan kriteria: Harga Satuan Termahal/Termurah, Total Harga Terbesar, atau Volume Terbesar. Pilihan ini memudahkan peninjauan item berbiaya tinggi.
        </div>
      </LangkahCard>
    </div>
  );
}
