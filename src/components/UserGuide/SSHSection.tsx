import React from "react";

export default function SSHSection() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3">
      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
        📋 Penerapan Standar Satuan Harga (SSH) Kabupaten/Kota
      </h3>
      <p className="text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed font-semibold">
        Dasar Hukum: PP No. 12 Tahun 2019 tentang Pengelolaan Keuangan Daerah & Perpres No. 12 Tahun 2021.
      </p>
      <div className="space-y-3 text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed pl-2">
        <div>
          <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">Definisi SSH (Standar Satuan Harga):</strong>
          Daftar harga satuan dasar maksimal untuk bahan bangunan (material), upah harian tenaga kerja (OH), dan biaya sewa peralatan yang ditetapkan secara resmi oleh Kepala Daerah (Bupati/Walikota) melalui Surat Keputusan (SK) tahunan.
        </div>
        
        <div className="space-y-2 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-2">
          <strong className="text-zinc-850 dark:text-zinc-200 block">Metode Penerapan Harga Daerah di Aplikasi:</strong>
          
          <div className="pl-2 border-l-2 border-zinc-300 dark:border-zinc-700 space-y-1.5">
            <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Metode 1: Jika Pemkab Merilis Standar Satuan Harga (SSH) Bahan/Upah</span>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-450">
              Gunakan koefisien standar SNI yang ada, lalu sesuaikan harga dasar satuan bahan dan upah di dalam laci AHSP (tombol roda gigi di samping pekerjaan) mengikuti angka rupiah resmi dari SK Bupati/SSH Kabupaten tersebut.
            </p>
          </div>

          <div className="pl-2 border-l-2 border-zinc-300 dark:border-zinc-700 space-y-1.5">
            <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Metode 2: Jika Pemkab Merilis Harga Satuan Pokok Kegiatan (HSPK) Jadi</span>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-450">
              Apabila pemerintah daerah mengeluarkan harga standar "jadi" (misal: Pasangan Bata Merah jadi Rp145.000/m²), Anda tidak perlu menghitung koefisiennya lagi. Cukup nonaktifkan laci analisa AHSP, lalu langsung ketik nominal tersebut pada kolom Harga Satuan di tabel detail utama.
            </p>
          </div>
        </div>

        <div className="space-y-1 bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-150 dark:border-zinc-850 mt-2">
          <strong className="text-zinc-800 dark:text-zinc-200 block">💡 Tips untuk Proyek Rumah Pribadi / Swasta:</strong>
          <p className="text-[11px] text-zinc-600 dark:text-zinc-450 leading-relaxed">
            Kedua metode di atas juga sangat relevan untuk pembangunan rumah tinggal mandiri. Gunakan **Metode 1 (AHSP)** jika Anda membeli bahan material sendiri ke toko bangunan dan membayar upah harian tukang (HSD bertindak sebagai harga material toko & upah tukang harian). Gunakan **Metode 2 (Manual)** jika Anda menyerahkan pekerjaan secara borongan "terima bersih" kepada kontraktor/pemborong lokal dengan tarif per meter persegi.
          </p>
        </div>
      </div>
    </div>
  );
}
