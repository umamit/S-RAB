import React from "react";

export default function RegulasiSection() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3">
      <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
        ⚖️ Acuan Regulasi &amp; Dasar Hukum AHSP (SNI)
      </h3>
      <p className="text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed">
        Penyusunan Analisis Harga Satuan Pekerjaan (AHSP) di aplikasi ini didasarkan pada pedoman standar nasional yang sah untuk keperluan instansi pemerintah (Kementerian PUPR/Dinas Pekerjaan Umum) dan swasta:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
        <ul className="list-disc list-inside text-xs text-zinc-650 dark:text-zinc-450 space-y-1.5 leading-relaxed pl-2">
          <li><strong className="text-zinc-800 dark:text-zinc-200">Permen PUPR No. 1 Tahun 2022</strong>: Pedoman AHSP Bidang Pekerjaan Umum (revisi Permen No. 28/2016).</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 2835:2008</strong>: Harga Satuan Pekerjaan Tanah (Galian, Urugan, Pemadatan).</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 2836:2008</strong>: Harga Satuan Pekerjaan Fondasi (Batu Belah, Pancang).</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 7394:2008</strong>: Harga Satuan Pekerjaan Beton (Cor Kolom, Balok, Plat Lantai).</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 7393:2008</strong>: Harga Satuan Pekerjaan Besi &amp; Aluminium (Railing, Rangka Baja Ringan).</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 6897:2008</strong>: Harga Satuan Pekerjaan Dinding (Bata Merah, Batako).</li>
        </ul>
        <ul className="list-disc list-inside text-xs text-zinc-650 dark:text-zinc-450 space-y-1.5 leading-relaxed pl-2">
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 2837:2008</strong>: Harga Satuan Pekerjaan Plesteran &amp; Acian.</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 2838:2008</strong>: Harga Satuan Pekerjaan Penutup Atap (Genteng, Metal Roof).</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 7396:2008</strong>: Harga Satuan Pekerjaan Plafon (Gypsum, GRC, Triplek).</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 7395:2008</strong>: Harga Satuan Pekerjaan Kayu (Kusen, Daun Pintu/Jendela).</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 3976:1995</strong>: Harga Satuan Pekerjaan Pemasangan Lantai &amp; Dinding Keramik.</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">SNI 6197:2008</strong>: Harga Satuan Pekerjaan Pengecatan (Tembok, Kayu, Besi).</li>
        </ul>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 text-xs text-zinc-650 dark:text-zinc-450 space-y-1 leading-relaxed pl-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-1">Regulasi Pendukung Fitur Aplikasi</p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li><strong className="text-zinc-800 dark:text-zinc-200">Permen PUPR No. 14 Tahun 2020</strong>: Rencana Target Linimasa / Kurva S — dasar hukum fitur Jadwal &amp; Kurva S.</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">Permen PUPR No. 22/PRT/M/2018</strong>: Pengawasan Lapangan &amp; Log Harian Resmi — dasar hukum fitur Laporan Harian.</li>
          <li><strong className="text-zinc-800 dark:text-zinc-200">PP No. 12 Tahun 2019</strong>: Pengelolaan Keuangan Daerah &amp; Standar Satuan Harga (SSH) — dasar hukum fitur Kamus Harga SSH.</li>
        </ul>
      </div>
    </div>
  );
}
