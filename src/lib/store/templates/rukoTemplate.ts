import type { SubProject } from "../types";

export function getRukoTemplate(nowStr: string): SubProject[] {
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
