"use client";
import React from "react";
import LangkahCard from "./LangkahCard";

export default function LangkahPenggunaanSection() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
        {/* Section 1: RAB & Estimasi */}
        <LangkahCard title="1. Menyusun Anggaran & Sub-Pekerjaan">
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Membuat & Mengelola Divisi (Sub-Pekerjaan):</strong>
            Buka tab **Rekapitulasi Utama**. Di bagian bawah, masukkan nama divisi baru (misal: *Pekerjaan Struktur* atau *Lantai 2*) lalu klik **Tambah Divisi**. Klik nama divisi untuk mengedit item di dalamnya.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mengedit Item Pekerjaan (Inline Editor):</strong>
            Buka tab **Rincian Detail**. Klik langsung pada teks sel manapun (Nama Pekerjaan, Satuan, Volume, atau Harga) untuk mengedit nilainya secara instan. Tekan **Enter** untuk menyimpan.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Menggunakan Analisa Harga Satuan (AHSP):</strong>
            Klik tombol roda gigi (ikon setting) di sebelah nama pekerjaan untuk memecah harga satuan menjadi bahan, upah, dan alat. Anda dapat memilih preset koefisien PUPR di drawer sebelah kanan.
          </div>
          <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Menggunakan Kamus Harga SSH Global:</strong>
            Buka tab **Harga SSH**. Semua bahan baku, upah, dan alat yang Anda gunakan di laci AHSP dikelompokkan otomatis menjadi satu daftar global. Klik pada nilai harga untuk mengeditnya secara instan, dan seluruh item pekerjaan di seluruh divisi yang memakai bahan tersebut akan otomatis ter-update serentak!
          </div>
          <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Menambahkan Bahan & Tenaga Kerja Baru:</strong>
            Jika ada bahan/tenaga baru yang tidak terdaftar di preset, Anda bisa menambahkannya langsung melalui laci AHSP (ikon ⚙️) pada item pekerjaan terkait. Pilih tab **Bahan** atau **Upah**, isi nama, satuan, harga dasar, serta koefisien pengali pada form di atas tabel, lalu klik **Tambah**. Komponen baru ini otomatis tersimpan dan langsung terdaftar secara global di tab **Harga SSH**!
          </div>
        </LangkahCard>

        {/* Section 2: Jadwal & S-Curve */}
        <LangkahCard title="2. Jadwal Pelaksanaan & Kurva S" lawText="Dasar Hukum: Permen PUPR No. 14 Tahun 2020 tentang Rencana Target Linimasa / Kurva S.">
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mengatur Durasi Proyek:</strong>
            Pada tab **Jadwal & Kurva S**, Anda dapat mengubah durasi proyek (dalam minggu) menggunakan input angka durasi di kanan atas.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Penjadwalan Kategori Pekerjaan:</strong>
            Gunakan dropdown **Mulai Mng** dan **Durasi Mng** untuk masing-masing kategori. Proyeksi Kurva S Rencana (garis abu-abu putus-putus) akan otomatis menggambar kumulatif bobot mingguan.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Fungsi Grafik Kurva S:</strong>
            Kurva ini sangat penting di PU untuk melihat kesiapan pendanaan serta target capaian kontraktor dari minggu ke minggu.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Toggle Mode Keuangan (Cash Flow):</strong>
            Di pojok kanan grafik Kurva S, klik tombol <strong>Keuangan (Rp)</strong> untuk menampilkan proyeksi rencana belanja kumulatif (Rp). Masukkan realisasi pengeluaran aktual lapangan di tab <strong>Realisasi Progres</strong> (bagian Keuangan Minggu ke-X), lalu simpan — garis hijau solid akan otomatis muncul sebagai aktual cash flow.
          </div>
        </LangkahCard>

        {/* Section 3: Laporan Harian */}
        <LangkahCard title="3. Laporan Harian Lapangan" lawText="Dasar Hukum: Permen PUPR No. 22/PRT/M/2018 tentang Pengawasan Lapangan & Log Harian Resmi.">
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mencatat Log Harian:</strong>
            Buka tab **Laporan Harian**. Pilih tanggal, kondisi cuaca, jumlah tenaga kerja aktif (pekerja, tukang, mandor), dan ketik uraian pekerjaan hari itu beserta hambatan jika ada.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Arsip Pengawasan Lapangan:</strong>
            Riwayat log akan tersusun secara kontinuitas di bagian kanan. Berguna sebagai bahan pengawasan dinas PU/pemilik proyek untuk memantau kehadiran pekerja dan pengaruh cuaca.
          </div>
        </LangkahCard>

        {/* Section 4: Laporan Progres & Deviasi */}
        <LangkahCard title="4. Realisasi Progres & Deviasi" lawText="Dasar Hukum: Permen PUPR No. 22/PRT/M/2018 tentang Progres Kemajuan Fisik & Pengendalian Keterlambatan.">
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Input Realisasi Fisik:</strong>
            Buka tab **Realisasi Progres**. Pilih minggu evaluasi berjalan, lalu input persentase penyelesaian fisik kumulatif (0-100%) untuk setiap kategori pekerjaan di lapangan.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Kalkulasi Deviasi Progres:</strong>
            Sistem akan menghitung deviasi proyek. Jika deviasi bernilai minus (merah), proyek mengalami keterlambatan (delay). Jika plus (hijau), proyek berjalan lebih cepat dari target.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Kurva S Aktual:</strong>
            Garis hijau solid pada grafik Kurva S akan otomatis digambar berdasarkan riwayat progres mingguan yang Anda input di sini.
          </div>
        </LangkahCard>

        {/* Section 4.5: AHSP Kustom */}
        <LangkahCard title="4.5 Kamus AHSP Kustom (Template Pribadi)">
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Menyimpan Template AHSP:</strong>
            Buka laci AHSP (ikon ⚙️) pada item pekerjaan, susun komponen bahan/upah sesuai kebutuhan, lalu klik tombol <strong>Simpan Kustom</strong> di bagian bawah laci. Beri nama template, dan template akan tersimpan secara lokal di perangkat.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Menggunakan Kembali Template:</strong>
            Di dropdown preset AHSP bagian atas laci, gulir ke grup <strong>Template Saya</strong>. Pilih template tersimpan — seluruh komponen akan otomatis terisi. Template kustom dapat dihapus kapan saja melalui tombol hapus (ikon 🗑️).
          </div>
        </LangkahCard>

        {/* Section 5: Kamus Harga SSH */}
        <LangkahCard title="5. Kamus Harga SSH Global" lawText="Dasar Hukum: PP No. 12 Tahun 2019 tentang Pengelolaan Keuangan Daerah & Standar Satuan Harga.">
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Daftar Terpusat Otomatis:</strong>
            Buka tab **Harga SSH**. Semua bahan, upah harian, dan alat yang dimasukkan dalam laci AHSP disaring dan didaftarkan otomatis di sini secara efisien tanpa duplikasi.
          </div>
          <div>
            <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Pembaruan Harga Sekali Klik:</strong>
            Cukup klik nominal rupiah pada tabel, masukkan harga baru, lalu tekan **Enter**. Seluruh item pekerjaan di semua divisi yang memakai bahan tersebut akan otomatis ter-update serentak.
          </div>
        </LangkahCard>
      </div>

      {/* Printing and Export */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5 space-y-3 text-xs">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">Format Ekspor & Cetak</h3>
        <ul className="list-disc list-inside space-y-1.5 text-zinc-650 dark:text-zinc-400">
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Ekspor Excel:</strong> Menghasilkan file `.xlsx` dengan tab cover Rekapitulasi, tab sub-proyek detail, serta daftar kebutuhan bahan & upah terintegrasi rumus otomatis.
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
