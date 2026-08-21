import React from "react";

export default function TaktisPLSection() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3">
      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
        🛠️ Panduan Taktis Paket Penunjukan Langsung (PL) / Pengadaan Langsung
      </h3>
      <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-semibold">
        Dasar Hukum: Peraturan Presiden (Perpres) No. 12 Tahun 2021 (Pagu Pengadaan Jasa Konstruksi s.d. Rp200.000.000).
      </p>
      <div className="space-y-2.5 text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed pl-2 border-l-2 border-zinc-300 dark:border-zinc-700">
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">1. Sederhanakan Sub-Pekerjaan:</strong>
          Cukup gunakan satu divisi default (misal: *"Pekerjaan Utama"*) agar struktur dokumen cetak Surat Perintah Kerja (SPK) ringkas dan mudah dibaca.
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">2. Kunci Anggaran di Bawah Pagu:</strong>
          Sesuaikan kuantitas volume pekerjaan di tab *Rincian Detail (BOQ)* agar nilai Grand Total akhir berada sedikit di bawah pagu kontrak setelah ditambah PPN dan Overhead.
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">3. Setel Kurva S Durasi Pendek:</strong>
          Proyek PL umumnya berlangsung cepat (**2 s.d. 6 minggu**). Ubah total durasi proyek menjadi pendek di tab *Jadwal*, lalu jadwalkan kategori secara padat agar grafik Kurva S tergambar proporsional.
        </div>
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">4. Laporan Lapangan & Pencairan Termin Tunggal:</strong>
          Meskipun proyek PL di bawah Rp100 Juta dibayar sekaligus di akhir (termin 100%), pengawas tetap wajib mencatat log harian dan progres sebagai lampiran Berita Acara Serah Terima (BAST).
        </div>
      </div>
    </div>
  );
}
