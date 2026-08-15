import type { AHSPTemplate } from "./types";

export const DRAINASE_AHSP_TEMPLATES: AHSPTemplate[] = [
  {
    name: "7. Pemasangan Pipa Beton Gorong-gorong Ø80 cm (Precast)",
    unit: "m'",
    ahsp: {
      materials: [
        { id: "m-pipe-80", name: "Pipa Beton RCP Ø80 cm", unit: "m'", coefficient: 1.0, unitPrice: 550000 },
        { id: "m-semen", name: "Semen Portland (PC)", unit: "kg", coefficient: 12.0, unitPrice: 1600 },
        { id: "m-pasir", name: "Pasir Pasang", unit: "m3", coefficient: 0.024, unitPrice: 260000 },
      ],
      labor: [
        { id: "l-pek", name: "Pekerja (Kenek)", unit: "OH", coefficient: 0.45, unitPrice: 95000 },
        { id: "l-tuk", name: "Tukang Batu", unit: "OH", coefficient: 0.15, unitPrice: 135000 },
        { id: "l-kpe", name: "Kepala Tukang", unit: "OH", coefficient: 0.015, unitPrice: 155000 },
        { id: "l-man", name: "Mandor", unit: "OH", coefficient: 0.023, unitPrice: 150000 },
      ],
      tools: [],
    },
  },
  {
    name: "8. Plesteran Dinding Saluran Pasangan Batu 1:3 t=15mm",
    unit: "m2",
    ahsp: {
      materials: [
        { id: "m-pc", name: "Semen Portland (PC)", unit: "kg", coefficient: 7.78, unitPrice: 1600 },
        { id: "m-ps", name: "Pasir Pasang", unit: "m3", coefficient: 0.023, unitPrice: 260000 },
      ],
      labor: [
        { id: "l-pe-pl", name: "Pekerja (Kenek)", unit: "OH", coefficient: 0.15, unitPrice: 95000 },
        { id: "l-tu-pl", name: "Tukang Batu", unit: "OH", coefficient: 0.15, unitPrice: 135000 },
        { id: "l-kp-pl", name: "Kepala Tukang", unit: "OH", coefficient: 0.015, unitPrice: 155000 },
        { id: "l-ma-pl", name: "Mandor", unit: "OH", coefficient: 0.008, unitPrice: 150000 },
      ],
      tools: [],
    },
  },
];
