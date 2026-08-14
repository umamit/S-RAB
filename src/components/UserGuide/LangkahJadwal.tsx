"use client";
import React from "react";
import LangkahCard from "./LangkahCard";

export default function LangkahJadwal() {
  return (
    <div className="space-y-8">
      {/* Section 2: Jadwal & S-Curve */}
      <LangkahCard title="4. Jadwal Pelaksanaan & Kurva S" lawText="Dasar Hukum: Permen PUPR No. 14 Tahun 2020 tentang Rencana Target Linimasa / Kurva S.">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mengatur Durasi Proyek:</strong>
          Pada tab **Jadwal & Kurva S**, Anda dapat mengubah durasi proyek (dalam minggu) menggunakan input angka durasi di kanan atas.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Penjadwalan Kategori Pekerjaan:</strong>
          Gunakan dropdown **Mulai Mng** dan **Durasi Mng** untuk masing-masing kategori. Proyeksi Kurva S Rencana (garis abu-abu putus-putus) akan otomatis menggambar kumulatif bobot mingguan.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Toggle Mode Keuangan (Cash Flow):</strong>
          Di pojok kanan grafik Kurva S, klik tombol <strong>Keuangan (Rp)</strong> untuk menampilkan proyeksi rencana belanja kumulatif (Rp). Masukkan realisasi pengeluaran aktual lapangan di tab <strong>Realisasi Progres</strong> (bagian Keuangan Minggu ke-X), lalu simpan — garis hijau solid akan otomatis muncul sebagai aktual cash flow.
        </div>
      </LangkahCard>

      {/* Section 3: Laporan Harian */}
      <LangkahCard title="5. Laporan Harian Lapangan" lawText="Dasar Hukum: Permen PUPR No. 22/PRT/M/2018 tentang Pengawasan Lapangan & Log Harian Resmi.">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mencatat Log Harian:</strong>
          Buka tab **Laporan Harian**. Pilih tanggal, kondisi cuaca, jumlah tenaga kerja aktif (pekerja, tukang, mandor), dan ketik uraian pekerjaan hari itu beserta hambatan jika ada.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Unggah Foto Dokumentasi Lapangan:</strong>
          Di bagian form bawah, Anda dapat mengunggah hingga 3 foto dokumentasi lapangan per hari. Foto akan otomatis dikompres ke resolusi yang efisien dan diunggah ke **Supabase Storage** (cloud server). Foto tersebut dapat diakses secara real-time dan diklik untuk diperbesar (view lightbox).
        </div>
      </LangkahCard>

      {/* Section 4: Laporan Progres & Deviasi */}
      <LangkahCard title="6. Realisasi Progres & Deviasi" lawText="Dasar Hukum: Permen PUPR No. 22/PRT/M/2018 tentang Progres Kemajuan Fisik & Pengendalian Keterlambatan.">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Input Realisasi Fisik:</strong>
          Buka tab **Realisasi Progres**. Pilih minggu evaluasi berjalan, lalu input persentase penyelesaian fisik kumulatif (0-100%) untuk setiap kategori pekerjaan di lapangan.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Kalkulasi Deviasi Progres:</strong>
          Sistem akan menghitung deviasi proyek. Jika deviasi bernilai minus (merah), proyek mengalami keterlambatan (delay). Jika plus (hijau), proyek berjalan lebih cepat dari target.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Peringatan Keterlambatan Proyek (Alert Banner):</strong>
          Jika persentase deviasi minus melebihi batas threshold toleransi (default -5%), sistem akan otomatis memunculkan banner peringatan keterlambatan (Waspada/Kritis) beserta rekomendasi tindakan resmi (seperti pelaksanaan Show Cause Meeting SCM-1). Batas toleransi dapat diubah di bagian Parameter Proyek.
        </div>
      </LangkahCard>

      {/* Section 4.6: Termin Pembayaran */}
      <LangkahCard title="7. Rencana Termin Pembayaran">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Membuat Rencana Termin:</strong>
          Buka tab **Termin Pembayaran** dan klik **+ Tambah Termin**. Masukkan target progres pencapaian (%) dan nominal Rp (dapat dihitung otomatis berdasarkan persentase dari Grand Total).
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Pelacakan Status Realisasi:</strong>
          Sistem akan secara otomatis menandai status termin sebagai **"Progres tercapai"** (warna oranye) apabila realisasi progres fisik lapangan dari tab Realisasi Progres telah mencapai target termin tersebut. Anda dapat mengeklik **"Tandai Lunas"** untuk merekam tanggal penagihan/pembayaran termin yang sah.
        </div>
      </LangkahCard>

      {/* Section 4.7: CCO Lapangan */}
      <LangkahCard title="8. CCO (Contract Change Order) Lapangan">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Pengajuan CCO Lapangan:</strong>
          Buka tab **CCO Lapangan**, klik **+ Buat CCO**, masukkan nomor, tanggal, dan item perubahan fisik lapangan (tambah, hapus, atau ubah volume/harga).
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Alur Workflow CCO:</strong>
          Pengajuan CCO memiliki status siklus: `Draft` &rarr; `Diajukan` &rarr; `Disetujui` / `Ditolak`. CCO yang disetujui secara otomatis akan memutakhirkan kalkulasi penarikan pembayaran di tab **Termin Pembayaran** (MC).
        </div>
      </LangkahCard>
    </div>
  );
}
