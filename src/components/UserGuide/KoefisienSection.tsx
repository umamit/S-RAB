import React from "react";

export default function KoefisienSection() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3">
      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
        📐 Memahami 3 Jenis Koefisien AHSP
      </h3>
      <p className="text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed">
        Dalam laci kalkulator AHSP, Anda akan menemui angka desimal indeks (koefisien). Berikut adalah penjelasan jenis koefisien tersebut:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed pl-2">
        <div className="space-y-1">
          <strong className="text-zinc-800 dark:text-zinc-200 block">1. Koefisien Bahan (Material):</strong>
          Takaran kebutuhan jumlah bahan bangunan untuk menyelesaikan 1 unit pekerjaan jadi. Contoh: koefisien bata merah **70.00** pada 1 m² dinding berarti dibutuhkan 70 buah bata merah.
        </div>
        <div className="space-y-1">
          <strong className="text-zinc-800 dark:text-zinc-200 block">2. Koefisien Tenaga Kerja (Labor):</strong>
          Indeks waktu kerja pekerja harian dalam satuan **OH (Orang Hari)**. Pembagian tenaga kerja terdiri atas **Pekerja** (kenek), **Tukang** (batu/kayu/besi), **Kepala Tukang**, dan **Mandor**.
        </div>
        <div className="space-y-1">
          <strong className="text-zinc-800 dark:text-zinc-200 block">3. Koefisien Alat (Equipment):</strong>
          Indeks waktu penggunaan peralatan kerja (baik alat bantu manual atau sewa alat berat) dalam satuan **Jam** untuk menyelesaikan 1 unit pekerjaan jadi.
        </div>
      </div>
      
      <div className="space-y-1 bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-150 dark:border-zinc-850 mt-2 text-xs">
        <strong className="text-zinc-800 dark:text-zinc-200 block">💡 Contoh Kasus Nyata (Pasang Dinding Batako 1:4 per 1 m²):</strong>
        <p className="text-[11px] text-zinc-650 dark:text-zinc-400 leading-relaxed">
          Berdasarkan **SNI 6897:2008 / Permen PUPR 2022**, takaran pengali untuk 1 m² dinding batako adalah:
          <br />
          • **Bahan**: Batako = **12,50 buah** | Semen = **12,13 kg** | Pasir Pasang = **0,039 m³**
          <br />
          • **Tenaga Kerja**: Pekerja = **0,30 OH** | Tukang = **0,10 OH** | Kepala Tukang = **0,01 OH** | Mandor = **0,015 OH**
        </p>
      </div>
    </div>
  );
}
