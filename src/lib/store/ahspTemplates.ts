import type { AHSP, AHSPTemplate } from "./types";

// ============================================================
// Helper: hitung harga satuan AHSP
// ============================================================
export const calculateAHSPUnitPrice = (ahsp?: AHSP): number => {
  if (!ahsp) return 0;
  const matSum = ahsp.materials.reduce((sum, e) => sum + e.coefficient * e.unitPrice, 0);
  const labSum = ahsp.labor.reduce((sum, e) => sum + e.coefficient * e.unitPrice, 0);
  const toolSum = ahsp.tools.reduce((sum, e) => sum + e.coefficient * e.unitPrice, 0);
  return matSum + labSum + toolSum;
};

// ============================================================
// Template AHSP Baku (SNI)
// ============================================================
export const AHSP_TEMPLATES: AHSPTemplate[] = [
  {
    name: "1. Galian Tanah Pondasi Manual (SNI 2835:2008)",
    unit: "m3",
    ahsp: {
      materials: [],
      labor: [
        { id: "l-1", name: "Pekerja (Kenek)", unit: "OH", coefficient: 0.75, unitPrice: 95000 },
        { id: "l-2", name: "Mandor", unit: "OH", coefficient: 0.025, unitPrice: 150000 },
      ],
      tools: [],
    },
  },
  {
    name: "2. Pasang Pondasi Batu Kali 1:4 (SNI 2836:2008)",
    unit: "m3",
    ahsp: {
      materials: [
        { id: "m-1", name: "Batu Belah / Batu Kali", unit: "m3", coefficient: 1.2, unitPrice: 320000 },
        { id: "m-2", name: "Semen Portland (PC)", unit: "kg", coefficient: 163, unitPrice: 1600 },
        { id: "m-3", name: "Pasir Pasang", unit: "m3", coefficient: 0.52, unitPrice: 260000 },
      ],
      labor: [
        { id: "l-1", name: "Pekerja (Kenek)", unit: "OH", coefficient: 1.5, unitPrice: 95000 },
        { id: "l-2", name: "Tukang Batu", unit: "OH", coefficient: 0.75, unitPrice: 135000 },
        { id: "l-3", name: "Kepala Tukang", unit: "OH", coefficient: 0.075, unitPrice: 155000 },
        { id: "l-4", name: "Mandor", unit: "OH", coefficient: 0.075, unitPrice: 150000 },
      ],
      tools: [],
    },
  },
  {
    name: "3. Pasang Dinding Bata Merah 1:4 (SNI 6897:2008)",
    unit: "m2",
    ahsp: {
      materials: [
        { id: "m-1", name: "Bata Merah", unit: "bh", coefficient: 70, unitPrice: 1200 },
        { id: "m-2", name: "Semen Portland (PC)", unit: "kg", coefficient: 11.5, unitPrice: 1600 },
        { id: "m-3", name: "Pasir Pasang", unit: "m3", coefficient: 0.043, unitPrice: 260000 },
      ],
      labor: [
        { id: "l-1", name: "Pekerja (Kenek)", unit: "OH", coefficient: 0.3, unitPrice: 95000 },
        { id: "l-2", name: "Tukang Bata", unit: "OH", coefficient: 0.1, unitPrice: 135000 },
        { id: "l-3", name: "Kepala Tukang", unit: "OH", coefficient: 0.01, unitPrice: 155000 },
        { id: "l-4", name: "Mandor", unit: "OH", coefficient: 0.015, unitPrice: 150000 },
      ],
      tools: [],
    },
  },
  {
    name: "3b. Pasang Dinding Batako Beton 1:4 (SNI 6897:2008)",
    unit: "m2",
    ahsp: {
      materials: [
        { id: "m-1", name: "Batako Beton (10x20x40 cm)", unit: "bh", coefficient: 12.5, unitPrice: 3500 },
        { id: "m-2", name: "Semen Portland (PC)", unit: "kg", coefficient: 12.13, unitPrice: 1600 },
        { id: "m-3", name: "Pasir Pasang", unit: "m3", coefficient: 0.039, unitPrice: 260000 },
      ],
      labor: [
        { id: "l-1", name: "Pekerja (Kenek)", unit: "OH", coefficient: 0.3, unitPrice: 95000 },
        { id: "l-2", name: "Tukang Batu", unit: "OH", coefficient: 0.1, unitPrice: 135000 },
        { id: "l-3", name: "Kepala Tukang", unit: "OH", coefficient: 0.01, unitPrice: 155000 },
        { id: "l-4", name: "Mandor", unit: "OH", coefficient: 0.015, unitPrice: 150000 },
      ],
      tools: [],
    },
  },
  {
    name: "4. Plesteran Dinding 1:4 t=15mm (SNI 2837:2008)",
    unit: "m2",
    ahsp: {
      materials: [
        { id: "m-1", name: "Semen Portland (PC)", unit: "kg", coefficient: 6.24, unitPrice: 1600 },
        { id: "m-2", name: "Pasir Pasang", unit: "m3", coefficient: 0.024, unitPrice: 260000 },
      ],
      labor: [
        { id: "l-1", name: "Pekerja (Kenek)", unit: "OH", coefficient: 0.15, unitPrice: 95000 },
        { id: "l-2", name: "Tukang Batu", unit: "OH", coefficient: 0.15, unitPrice: 135000 },
        { id: "l-3", name: "Kepala Tukang", unit: "OH", coefficient: 0.015, unitPrice: 155000 },
        { id: "l-4", name: "Mandor", unit: "OH", coefficient: 0.0075, unitPrice: 150000 },
      ],
      tools: [],
    },
  },
  {
    name: "5. Acian Dinding Tembok Baru (SNI 2837:2008)",
    unit: "m2",
    ahsp: {
      materials: [
        { id: "m-1", name: "Semen Portland (PC)", unit: "kg", coefficient: 3.25, unitPrice: 1600 },
      ],
      labor: [
        { id: "l-1", name: "Pekerja (Kenek)", unit: "OH", coefficient: 0.1, unitPrice: 95000 },
        { id: "l-2", name: "Tukang Batu", unit: "OH", coefficient: 0.1, unitPrice: 135000 },
        { id: "l-3", name: "Kepala Tukang", unit: "OH", coefficient: 0.01, unitPrice: 155000 },
        { id: "l-4", name: "Mandor", unit: "OH", coefficient: 0.005, unitPrice: 150000 },
      ],
      tools: [],
    },
  },
  {
    name: "6. Pengecatan Tembok Baru 3 lapis (SNI 6197:2008)",
    unit: "m2",
    ahsp: {
      materials: [
        { id: "m-1", name: "Cat Tembok Plamir", unit: "kg", coefficient: 0.1, unitPrice: 18000 },
        { id: "m-2", name: "Cat Dasar / Sealer", unit: "kg", coefficient: 0.1, unitPrice: 28000 },
        { id: "m-3", name: "Cat Tembok Penutup (2-3x)", unit: "kg", coefficient: 0.26, unitPrice: 42000 },
      ],
      labor: [
        { id: "l-1", name: "Pekerja (Kenek)", unit: "OH", coefficient: 0.02, unitPrice: 95000 },
        { id: "l-2", name: "Tukang Cat", unit: "OH", coefficient: 0.063, unitPrice: 135000 },
        { id: "l-3", name: "Kepala Tukang", unit: "OH", coefficient: 0.0063, unitPrice: 155000 },
        { id: "l-4", name: "Mandor", unit: "OH", coefficient: 0.003, unitPrice: 150000 },
      ],
      tools: [],
    },
  },
];
