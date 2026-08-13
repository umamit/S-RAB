import React from "react";

export default function TaktisLelangSection() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3">
      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
        🏢 Panduan Taktis Paket Lelang / Tender (Di Atas Rp200.000.000)
      </h3>
      <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-semibold">
        Dasar Hukum: Peraturan Presiden (Perpres) No. 12 Tahun 2021 (Paket Pekerjaan Konstruksi di atas Rp200.000.000 wajib melalui metode lelang/tender).
      </p>
      <div className="space-y-2.5 text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed pl-2 border-l-2 border-zinc-300 dark:border-zinc-700">
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">1. Wajib Menggunakan Multi Sub-Pekerjaan (Divisi):</strong>
          Pecah anggaran proyek menjadi sub-pekerjaan yang terpisah (seperti Struktur, Arsitektur, MEP) di tab *Rekapitulasi Utama* guna memudahkan evaluasi kelayakan harga penawaran oleh Pokja LPSE.
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">2. Wajib Menggunakan Analisa AHSP Rinci (Metode 1):</strong>
          Seluruh item pekerjaan harus dikalkulasi menggunakan koefisien standar **Permen PUPR No. 1 Tahun 2022** dan Harga Satuan Dasar (HSD) daerah setempat untuk menjamin akuntabilitas audit hukum.
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">3. Rancang Baseline Kurva S Rencana:</strong>
          Tentukan durasi minggu kontrak secara riil di tab *Jadwal* (misal 12 s.d. 24 minggu), lalu distribusikan jadwal mulai dan durasi secara logis sebagai garis dasar (*baseline*) rencana pelaksanaan fisik.
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">4. Pengendalian Deviasi Progres & Show Cause Meeting (SCM):</strong>
          Input kemajuan fisik berkala di tab *Realisasi Progres*. Jika nilai *Deviasi Progres* menunjukkan defisit minus merah yang melebihi batas toleransi kontrak (misal defisit &gt; 10%), PPK wajib menggunakannya sebagai dasar untuk memicu rapat pembuktian keterlambatan (**SCM**) atau menerbitkan Surat Peringatan (SP).
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">5. Dasar Berita Acara Pembayaran (BAP) Termin:</strong>
          Nilai progres fisik riil akhir yang dikalkulasi otomatis oleh aplikasi digunakan sebagai dasar penetapan volume prestasi kerja untuk pencairan dana termin bertahap kontraktor.
        </div>
      </div>
    </div>
  );
}
