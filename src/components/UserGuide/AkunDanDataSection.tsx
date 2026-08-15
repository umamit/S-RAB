"use client";
import React from "react";
import LangkahCard from "./LangkahCard";

export default function AkunDanDataSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
      {/* Poin 1: Login & Daftar */}
      <LangkahCard title="Cara Login & Daftar Akun">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Masuk ke Akun:</strong>
          Buka aplikasi S-RAB. Isi kolom <em>Email</em> dan <em>Password</em> lalu klik <strong>Masuk</strong>.
          Jika email atau password salah, pesan error akan muncul di bawah form.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Daftar Akun Baru:</strong>
          Klik tab <strong>Daftar Akun</strong> pada kotak login. Isi nama lengkap, email aktif, dan password
          minimal 6 karakter. Klik <strong>Buat Akun Baru</strong> — akun langsung aktif dan Anda akan
          otomatis masuk ke workspace.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Keluar dari Akun:</strong>
          Klik ikon <em>Keluar</em> (LogOut) di pojok kanan atas Header untuk mengakhiri sesi.
        </div>
      </LangkahCard>

      {/* Poin 2: Ekspor & Cetak */}
      <LangkahCard title="Ekspor Excel & Cetak PDF">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Ekspor ke Excel:</strong>
          Pilih proyek yang ingin diekspor melalui dropdown di Header, lalu klik tombol <strong>Ekspor Excel</strong>.
          File <code>.xlsx</code> akan otomatis terunduh, berisi sheet RAB lengkap, Rekapitulasi,
          Sumber Daya, dan Rekap Akhir yang sudah terformat rapi.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Cetak sebagai PDF:</strong>
          Klik tombol <strong>Cetak PDF</strong> di Header. Dialog cetak browser akan terbuka — pilih
          tujuan <em>Save as PDF</em> (atau nama serupa di browser Anda) untuk menyimpan dokumen
          sebagai file PDF siap kirim.
        </div>
      </LangkahCard>

      {/* Poin 3: Hapus & Parameter Proyek */}
      <LangkahCard title="Mengubah Parameter & Menghapus Proyek">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Mengubah Overhead & PPN:</strong>
          Buka tab **Rekapitulasi**. Di bagian kanan bawah terdapat kolom **Parameter Proyek (Overhead & Pajak)**.
          Masukkan persentase baru untuk Overhead/Profit dan PPN, lalu klik <strong>Simpan</strong>. Seluruh
          kalkulasi biaya non-fisik dan grand total proyek akan langsung ter-update otomatis.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Cara Menghapus Proyek:</strong>
          Pilih proyek di Header, lalu klik ikon <em>tempat sampah</em> (merah) di sebelah kanan tombol Cetak PDF.
          Sebuah dialog konfirmasi akan muncul meminta persetujuan Anda.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-red-600 dark:text-red-400 block mb-0.5">⚠ Peringatan Penting:</strong>
          Penghapusan proyek bersifat <strong>permanen</strong>. Seluruh data RAB, sub-pekerjaan, log harian,
          dan progres mingguan di dalam proyek tersebut akan terhapus selamanya dari cloud server.
        </div>
      </LangkahCard>

      {/* Poin 4: Sinkronisasi Cloud */}
      <LangkahCard title="Penyimpanan & Sinkronisasi Cloud">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Tersimpan Otomatis:</strong>
          Setiap perubahan yang Anda buat — menambah item, mengedit harga, mengisi log harian — tersimpan
          secara otomatis ke <strong>cloud server</strong> dalam hitungan detik. Tidak ada tombol
          "Simpan" yang perlu diklik.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Akses dari Mana Saja:</strong>
          Karena data tersimpan di cloud server, Anda bisa membuka proyek yang sama dari perangkat
          berbeda (laptop kantor, laptop rumah, dll.) cukup dengan login menggunakan akun yang sama.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Keamanan Data:</strong>
          Data setiap akun terisolasi secara ketat — hanya pemilik akun yang dapat melihat dan
          mengubah proyek miliknya.
        </div>
      </LangkahCard>

      {/* Poin 5: Backup & Restore JSON */}
      <LangkahCard title="Backup & Restore Data (JSON)">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Backup Proyek (Ekspor JSON):</strong>
          Pilih proyek aktif, lalu klik tombol <strong>Ekspor JSON</strong> di Header. File <code>.json</code> berisi seluruh data proyek (RAB, log harian, termin, addendum, dll.) akan terunduh ke perangkat Anda. Simpan sebagai cadangan di folder lokal atau cloud storage pribadi.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Restore Proyek (Impor JSON):</strong>
          Klik ikon <strong>↑ (upload)</strong> di sebelah dropdown pilih proyek pada Header. Pilih file <code>.json</code> hasil backup — proyek langsung muncul sebagai proyek baru tanpa menimpa data yang ada.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Kapan Perlu Backup?</strong>
          Lakukan backup secara berkala, terutama sebelum menghapus proyek atau berpindah perangkat.
        </div>
      </LangkahCard>

      {/* Poin 6: Validasi Input */}
      <LangkahCard title="Validasi & Keamanan Input Data">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Inline Edit Tabel RAB:</strong>
          Sistem mencegah data tidak valid secara otomatis saat menyimpan:
          <ul className="list-disc ml-4 mt-1 space-y-0.5">
            <li>Volume ≤ 0 → dikoreksi ke <strong>0.001</strong></li>
            <li>Harga negatif → dikoreksi ke <strong>0</strong></li>
            <li>Nama kosong → perubahan <strong>dibatalkan</strong>, nilai lama terjaga</li>
          </ul>
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Form CCO &amp; Addendum:</strong>
          Field Volume/Harga menampilkan <span className="text-red-500 font-semibold">border merah</span> jika nilai tidak valid, dan otomatis dikoreksi saat tombol Tambahkan diklik.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">PPN &amp; Overhead:</strong>
          Dibatasi antara <strong>0%–100%</strong>. Nilai di luar rentang otomatis dikembalikan ke batas terdekat.
        </div>
      </LangkahCard>

      {/* Poin 7: Autosave Indicator */}
      <LangkahCard title="Indikator Tersimpan Otomatis">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Status Simpan Real-Time:</strong>
          Setiap kali Anda mengubah data — mengedit item, menambah kategori, mengisi log — teks <span className="text-green-600 font-semibold">✓ Tersimpan</span> akan muncul sebentar di Header, lalu memudar secara otomatis setelah 2,5 detik. Tidak perlu klik tombol simpan apapun.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Tersimpan ke Mana?</strong>
          Data tersimpan ke <strong>localStorage</strong> perangkat Anda (persisten meski browser ditutup) dan secara bersamaan disinkronkan ke <strong>cloud server</strong> dalam hitungan detik.
        </div>
      </LangkahCard>

      {/* Poin 8: Rekap Lintas Proyek */}
      <LangkahCard title="Rekapitulasi Lintas Proyek">
        <div>
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Cara Membuka:</strong>
          Klik tombol <strong>Rekap Semua</strong> (ikon grafik batang) di Header. Modal akan terbuka menampilkan ringkasan seluruh proyek dalam satu tabel.
        </div>
        <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-2 mt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block mb-0.5">Informasi yang Ditampilkan:</strong>
          <ul className="list-disc ml-4 mt-1 space-y-0.5">
            <li>Biaya Langsung, Overhead & Profit, PPN, dan <strong>Grand Total</strong> per proyek</li>
            <li>Status <strong>Termin</strong> — berapa termin yang sudah lunas dari total</li>
            <li>Status <strong>BAST</strong> — apakah berita acara serah terima sudah diisi</li>
            <li>Baris <strong>Total Keseluruhan</strong> di bagian bawah tabel</li>
          </ul>
        </div>
      </LangkahCard>
    </div>
  );
}
