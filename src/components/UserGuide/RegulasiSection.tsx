import React from "react";

export default function RegulasiSection() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3">
      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
        ⚖️ Acuan Regulasi & Dasar Hukum AHSP (SNI)
      </h3>
      <p className="text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed">
        Penyusunan Analisis Harga Satuan Pekerjaan (AHSP) di aplikasi ini didasarkan pada pedoman standar nasional yang sah untuk keperluan instansi pemerintah (Kementerian PUPR/Dinas Pekerjaan Umum) dan swasta:
      </p>
      <ul className="list-disc list-inside text-xs text-zinc-650 dark:text-zinc-450 space-y-1.5 leading-relaxed pl-2">
        <li>
          <strong className="text-zinc-800 dark:text-zinc-200">Permen PUPR No. 1 Tahun 2022</strong>: Pedoman Analisis Harga Satuan Pekerjaan Bidang Pekerjaan Umum (Revisi dari Permen PUPR No. 28/PRT/M/2016).
        </li>
        <li>
          <strong className="text-zinc-800 dark:text-zinc-200">SNI 2835:2008</strong>: Tata Cara Perhitungan Harga Satuan Pekerjaan Tanah (Galian, Urugan, Pemadatan).
        </li>
        <li>
          <strong className="text-zinc-800 dark:text-zinc-200">SNI 2836:2008</strong>: Tata Cara Perhitungan Harga Satuan Pekerjaan Fondasi (Pasang Batu Belah, Pancang).
        </li>
        <li>
          <strong className="text-zinc-800 dark:text-zinc-200">SNI 6897:2008</strong>: Tata Cara Perhitungan Harga Satuan Pekerjaan Dinding (Pasang Bata Merah, Batako).
        </li>
        <li>
          <strong className="text-zinc-800 dark:text-zinc-200">SNI 2837:2008</strong>: Tata Cara Perhitungan Harga Satuan Pekerjaan Plesteran & Acian.
        </li>
        <li>
          <strong className="text-zinc-800 dark:text-zinc-200">SNI 6197:2008</strong>: Tata Cara Perhitungan Harga Satuan Pekerjaan Pengecatan (Tembok, Kayu, Besi).
        </li>
      </ul>
    </div>
  );
}
