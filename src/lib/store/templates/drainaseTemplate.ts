import type { SubProject } from "../types";

export function getDrainaseTemplate(nowStr: string): SubProject[] {
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
