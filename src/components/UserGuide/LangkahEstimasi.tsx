"use client";
import React from "react";
import LangkahCard from "./LangkahCard";

export default function LangkahEstimasi() {
  return (
    <div className="space-y-8">
      {/* Section 1: RAB & Estimasi */}
      <LangkahCard title="1. Menyusun Anggaran & Sub-Pekerjaan">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Membuat & Mengelola Divisi (Sub-Pekerjaan):</strong>
          Buka tab **Rekapitulasi Utama**. Di bagian bawah, masukkan nama divisi baru (misal: *Pekerjaan Struktur* atau *Lantai 2*) lalu klik **Tambah Divisi**. Klik nama divisi untuk mengedit item di dalamnya.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Membuat Proyek dari Template Preset:</strong>
          Saat membuat proyek baru, pilih template struktur yang sesuai:
          <ul className="list-disc ml-4 mt-1 space-y-0.5">
            <li><strong>Pembangunan Ruko 2 Lantai</strong> — Struktur &amp; Arsitektur (pondasi, beton, dinding, lantai)</li>
            <li><strong>Pekerjaan Jalan Paving Block</strong> — Tanah, leveling, lapisan base &amp; paving</li>
            <li><strong>Pekerjaan Drainase &amp; Gorong-Gorong</strong> — Persiapan, galian, saluran pasangan, gorong-gorong beton, finishing</li>
            <li><strong>Pembuatan Website &amp; Integrasi AI</strong> — Alur lengkap 8 langkah pengerjaan (PWA, ZXing, RAG Chatbot, PDF, &amp; PostHog)</li>
            <li><strong>Portal Sekolah &amp; CMS Dinamis</strong> — Alur lengkap 8 langkah pengerjaan (Prisma ORM, Supabase Auth/Storage, Groq AI, &amp; XYFlow)</li>
            <li><strong>Template Kosong</strong> — Mulai dari RAB kosong, susun sendiri dari nol</li>
          </ul>
          Sistem akan otomatis mengisi sub-proyek, kategori, dan item pekerjaan awal untuk menghemat waktu input.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mengedit Item Pekerjaan (Inline Editor):</strong>
          Buka tab **Rincian Detail (BOQ)**. Klik langsung pada teks sel manapun (Nama Pekerjaan, Satuan, Volume Rencana, atau Harga) untuk mengedit nilainya secara instan. Tekan **Enter** untuk menyimpan.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Menggunakan Analisa Harga Satuan (AHSP):</strong>
          Klik tombol roda gigi (ikon setting) di sebelah nama pekerjaan untuk memecah harga satuan menjadi bahan, upah, dan alat. Anda dapat memilih preset koefisien PUPR di drawer sebelah kanan.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mengatur Volume Realisasi:</strong>
          Di tab **Rincian Detail (BOQ)**, klik langsung pada sel di kolom **Vol Realisasi** untuk mencatat jumlah volume fisik pekerjaan yang telah diselesaikan secara aktual di lapangan. Jika volume realisasi melebihi rencana awal, sistem akan menandainya dengan warna merah (over-run).
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Menambahkan Bahan & Tenaga Kerja Baru:</strong>
          Jika ada bahan/tenaga baru yang tidak terdaftar di preset, Anda bisa menambahkannya langsung melalui laci AHSP (ikon ⚙️) pada item pekerjaan terkait. Pilih tab **Bahan** atau **Upah**, isi nama, satuan, harga dasar, serta koefisien pengali pada form di atas tabel, lalu klik **Tambah**. Komponen baru ini otomatis tersimpan dan langsung terdaftar secara global di tab **Harga SSH**!
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Pajak Pertambahan Nilai (PPN) &amp; PPh Final 4(2):</strong>
          Di bagian **Parameter Proyek**, Anda dapat mengatur tarif PPN (default 12%) dan tarif PPh Final Pasal 4 Ayat (2) atas Jasa Konstruksi (kategori kecil 2%, menengah/besar 3%, non-SBU 4%). Nilai potongan PPh 4(2) final dan nilai bersih kontrak setelah dipotong pajak akan otomatis dihitung di bawah Grand Total Rekapitulasi.
        </div>
      </LangkahCard>

      {/* Section 4.5: AHSP Kustom */}
      <LangkahCard title="2. Kamus AHSP Kustom (Template Pribadi)">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Menyimpan Template AHSP:</strong>
          Buka laci AHSP (ikon ⚙️) pada item pekerjaan, susun komponen bahan/upah sesuai kebutuhan, lalu klik tombol **Simpan Kustom** di bagian bawah laci. Beri nama template, dan template akan tersimpan secara lokal di perangkat.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Menggunakan Kembali Template:</strong>
          Di dropdown preset AHSP bagian atas laci, gulir ke grup **Template Saya**. Pilih template tersimpan — seluruh komponen akan otomatis terisi. Template kustom dapat dihapus kapan saja melalui tombol hapus (ikon 🗑️).
        </div>
      </LangkahCard>

      {/* Section 5: Kamus Harga SSH */}
      <LangkahCard title="3. Kamus Harga SSH Global" lawText="Dasar Hukum: PP No. 12 Tahun 2019 tentang Pengelolaan Keuangan Daerah & Standar Satuan Harga.">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Daftar Terpusat Otomatis:</strong>
          Buka tab **Harga SSH**. Semua bahan, upah harian, dan alat yang dimasukkan dalam laci AHSP disaring dan didaftarkan otomatis di sini secara efisien tanpa duplikasi.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Pembaruan Harga Sekali Klik:</strong>
          Cukup klik nominal rupiah pada tabel, masukkan harga baru, lalu tekan **Enter**. Seluruh item pekerjaan di semua divisi yang memakai bahan tersebut akan otomatis ter-update serentak.
        </div>
      </LangkahCard>

      {/* Section 4: Addendum / PTK */}
      <LangkahCard title="4. Addendum / Pekerjaan Tambah Kurang (PTK)">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Membuat Addendum Resmi:</strong>
          Buka tab **Addendum / PTK**, klik **+ Buat Addendum**, masukkan nomor addendum, tanggal, dan justifikasi teknis perubahan.
        </div>
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mencatat Perubahan Scope:</strong>
          Pilih divisi dan kategori, tentukan jenis perubahan (Tambah Baru, Hapus, atau Ubah Volume/Harga), isi rincian barunya, lalu klik **+ Tambahkan Perubahan**. Setelah selesai, klik **Simpan Addendum**. Selisih delta nilai kontrak awal vs akhir akan otomatis dihitung dan ditampilkan secara transparan di Rekapitulasi Utama.
        </div>
      </LangkahCard>
    </div>
  );
}
