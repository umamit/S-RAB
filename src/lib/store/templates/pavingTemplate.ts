import type { SubProject } from "../types";

export function getPavingTemplate(nowStr: string): SubProject[] {
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
