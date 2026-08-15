import type { SubProject } from "./types";

/**
 * Returns preset subprojects for S-RAB project templates
 */
export function getTemplateSubProjects(templateType: string): SubProject[] {
  const nowStr = String(Date.now());

  if (templateType === "ruko") {
    return [
      {
        id: `sub-pondasi-${nowStr}`,
        name: "Pekerjaan Struktur & Pondasi",
        categories: [
          {
            id: `cat-pondasi-bawah-${nowStr}`,
            name: "I. Pekerjaan Pondasi",
            startWeek: 1,
            durationWeeks: 3,
            items: [
              { id: `item-galian-${nowStr}`, name: "Galian Tanah Pondasi", unit: "m3", quantity: 45, unitPrice: 85000, total: 3825000 },
              { id: `item-batukali-${nowStr}`, name: "Pasangan Pondasi Batu Kali 1:4", unit: "m3", quantity: 30, unitPrice: 950000, total: 28500000 },
            ],
          },
          {
            id: `cat-beton-${nowStr}`,
            name: "II. Pekerjaan Beton Bertulang",
            startWeek: 3,
            durationWeeks: 4,
            items: [
              { id: `item-sloof-${nowStr}`, name: "Beton Sloof 15/20 (K-225)", unit: "m3", quantity: 3.5, unitPrice: 4200000, total: 14700000 },
              { id: `item-kolom-${nowStr}`, name: "Beton Kolom Struktur 20/20 (K-225)", unit: "m3", quantity: 4.2, unitPrice: 4500000, total: 18900000 },
            ],
          },
        ],
      },
      {
        id: `sub-arsitektur-${nowStr}`,
        name: "Pekerjaan Arsitektur & Finishing",
        categories: [
          {
            id: `cat-dinding-${nowStr}`,
            name: "III. Pekerjaan Dinding & Pasangan",
            startWeek: 6,
            durationWeeks: 4,
            items: [
              { id: `item-bata-${nowStr}`, name: "Pasangan Dinding Bata Ringan t=10cm", unit: "m2", quantity: 180, unitPrice: 165000, total: 29700000 },
              { id: `item-plester-${nowStr}`, name: "Plesteran + Acian Dinding 1:4", unit: "m2", quantity: 360, unitPrice: 85000, total: 30600000 },
            ],
          },
          {
            id: `cat-lantai-${nowStr}`,
            name: "IV. Pekerjaan Lantai & Plafon",
            startWeek: 8,
            durationWeeks: 3,
            items: [
              { id: `item-keramik-${nowStr}`, name: "Pasang Homogeneous Tile 60x60", unit: "m2", quantity: 120, unitPrice: 280000, total: 33600000 },
            ],
          },
        ],
      },
    ];
  }

  if (templateType === "paving") {
    return [
      {
        id: `sub-tanah-${nowStr}`,
        name: "Pekerjaan Tanah & Landscaping",
        categories: [
          {
            id: `cat-persiapan-${nowStr}`,
            name: "I. Pekerjaan Persiapan & Clearing",
            startWeek: 1,
            durationWeeks: 1,
            items: [
              { id: `item-clearing-${nowStr}`, name: "Pembersihan Lahan & Semak Belukar", unit: "m2", quantity: 400, unitPrice: 15000, total: 6000000 },
            ],
          },
          {
            id: `cat-tanah-${nowStr}`,
            name: "II. Pekerjaan Tanah & Leveling",
            startWeek: 1,
            durationWeeks: 2,
            items: [
              { id: `item-kupasan-${nowStr}`, name: "Kupasan Humus t=20cm & Perataan", unit: "m3", quantity: 80, unitPrice: 75000, total: 6000000 },
              { id: `item-padat-${nowStr}`, name: "Pemadatan Tanah Dasar dengan Vibratory Roller", unit: "m2", quantity: 400, unitPrice: 35000, total: 14000000 },
            ],
          },
        ],
      },
      {
        id: `sub-perkerasan-${nowStr}`,
        name: "Pekerjaan Perkerasan Paving Block",
        categories: [
          {
            id: `cat-perkerasan-${nowStr}`,
            name: "III. Lapisan Base & Paving",
            startWeek: 2,
            durationWeeks: 3,
            items: [
              { id: `item-lpa-${nowStr}`, name: "Lapis Pondasi Agregat Kelas A t=15cm", unit: "m3", quantity: 60, unitPrice: 480000, total: 28800000 },
              { id: `item-paving-${nowStr}`, name: "Pasang Paving Block K-300 t=6cm (Abu-abu)", unit: "m2", quantity: 400, unitPrice: 185000, total: 74000000 },
              { id: `item-kanstin-${nowStr}`, name: "Pasang Kanstin Beton Jepit 10x20x40", unit: "m'", quantity: 120, unitPrice: 95000, total: 11400000 },
            ],
          },
        ],
      },
    ];
  }

  if (templateType === "drainase") {
    return [
      {
        id: `sub-persiapan-${nowStr}`,
        name: "Pekerjaan Persiapan",
        categories: [
          {
            id: `cat-persiapan-${nowStr}`,
            name: "I. Pekerjaan Persiapan & Mobilisasi",
            startWeek: 1,
            durationWeeks: 1,
            items: [
              { id: `item-bowplank-${nowStr}`, name: "Pengukuran & Pemasangan Bowplank", unit: "ls", quantity: 1, unitPrice: 3500000, total: 3500000 },
              { id: `item-mobilisasi-${nowStr}`, name: "Mobilisasi & Demobilisasi Alat", unit: "ls", quantity: 1, unitPrice: 5000000, total: 5000000 },
            ],
          },
        ],
      },
      {
        id: `sub-tanah-${nowStr}`,
        name: "Pekerjaan Tanah",
        categories: [
          {
            id: `cat-tanah-${nowStr}`,
            name: "II. Galian & Timbunan",
            startWeek: 1,
            durationWeeks: 2,
            items: [
              { id: `item-galian-${nowStr}`, name: "Galian Tanah Saluran (manual)", unit: "m3", quantity: 120, unitPrice: 85000, total: 10200000 },
              { id: `item-timbunan-${nowStr}`, name: "Timbunan Tanah Kembali & Pemadatan", unit: "m3", quantity: 40, unitPrice: 55000, total: 2200000 },
              { id: `item-buang-${nowStr}`, name: "Buang Tanah Sisa (jarak < 5km)", unit: "m3", quantity: 80, unitPrice: 95000, total: 7600000 },
            ],
          },
        ],
      },
      {
        id: `sub-saluran-${nowStr}`,
        name: "Pekerjaan Saluran Pasangan",
        categories: [
          {
            id: `cat-saluran-${nowStr}`,
            name: "III. Pasangan Batu Kali",
            startWeek: 2,
            durationWeeks: 3,
            items: [
              { id: `item-batukali-${nowStr}`, name: "Pasangan Batu Kali 1:4", unit: "m3", quantity: 60, unitPrice: 950000, total: 57000000 },
              { id: `item-plester-${nowStr}`, name: "Plesteran Dinding Saluran 1:3 t=15mm", unit: "m2", quantity: 180, unitPrice: 75000, total: 13500000 },
              { id: `item-acian-${nowStr}`, name: "Acian Dinding Saluran", unit: "m2", quantity: 180, unitPrice: 45000, total: 8100000 },
            ],
          },
        ],
      },
      {
        id: `sub-gorong-${nowStr}`,
        name: "Pekerjaan Gorong-Gorong",
        categories: [
          {
            id: `cat-gorong-${nowStr}`,
            name: "IV. Beton & Gorong-Gorong",
            startWeek: 3,
            durationWeeks: 2,
            items: [
              { id: `item-lantaikerja-${nowStr}`, name: "Lantai Kerja Beton K-100 t=5cm", unit: "m3", quantity: 4, unitPrice: 1150000, total: 4600000 },
              { id: `item-gorong-${nowStr}`, name: "Gorong-Gorong Beton Ø80cm (precast)", unit: "m'", quantity: 24, unitPrice: 650000, total: 15600000 },
              { id: `item-plat-${nowStr}`, name: "Plat Penutup Beton Bertulang 50x50x10cm", unit: "bh", quantity: 20, unitPrice: 350000, total: 7000000 },
            ],
          },
        ],
      },
      {
        id: `sub-finishing-${nowStr}`,
        name: "Pekerjaan Finishing",
        categories: [
          {
            id: `cat-finishing-${nowStr}`,
            name: "V. Finishing & Perapian",
            startWeek: 5,
            durationWeeks: 1,
            items: [
              { id: `item-perapian-${nowStr}`, name: "Perapian & Pembuangan Sisa Material", unit: "ls", quantity: 1, unitPrice: 2500000, total: 2500000 },
            ],
          },
        ],
      },
    ];
  }

  return [];
}
