import React from "react";

export default function AnalogiDapurSection() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3">
      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
        🔗 Hubungan Erat antara SSH, AHSP, dan HSPK (Analogi Dapur)
      </h3>
      <p className="text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed">
        Dalam penyusunan anggaran daerah, ketiga komponen ini bekerja bersama sebagai satu kesatuan yang tidak terpisahkan:
      </p>
      <div className="space-y-3 text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed pl-2 border-l-2 border-zinc-300 dark:border-zinc-700">
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">1. SSH (Standar Satuan Harga) = "Bahan Baku Mentah" (Input):</strong>
          Daftar harga dasar eceran resmi per sak semen, per kubik pasir, atau per hari upah tukang berdasarkan SK Kepala Daerah. SSH adalah bahan mentah yang belum diolah menjadi pekerjaan jadi.
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">2. AHSP (Analisis Harga Satuan Pekerjaan) = "Resep Masakan" (Proses):</strong>
          Rumus koefisien pengali (Permen PUPR/SNI) yang mengatur takaran berapa sak semen atau hari kerja tukang untuk menyelesaikan 1 unit pekerjaan jadi (misal: 1 m³ Beton atau 1 m² Pasang Keramik).
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">3. HSPK (Harga Satuan Pokok Kegiatan) = "Makanan Jadi" (Hasil Akhir):</strong>
          Hasil akhir perkalian antara Bahan Baku (SSH) dengan takaran Resep (AHSP) yang diterbitkan resmi oleh Pemda untuk langsung dipakai sebagai harga jadi per unit pekerjaan tanpa perlu diurai lagi.
        </div>
      </div>
    </div>
  );
}
