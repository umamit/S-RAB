import type { Project } from "./types";
import { AHSP_TEMPLATES } from "./ahspTemplates";

// ============================================================
// Data Mock — hanya dipakai untuk seed awal localStorage
// ============================================================
export const mockProjects: Project[] = [
  {
    id: "proj-mock-1",
    userId: "user-default",
    name: "Pembangunan Rumah Tinggal 2 Lantai",
    description: "Estimasi biaya pembangunan rumah tinggal modern minimalis tipe 120/150 di Jakarta Selatan.",
    createdAt: new Date().toISOString(),
    taxRate: 0.12,
    profitRate: 0.10,
    activeSubProjectId: "sub-mock-1",
    durationWeeks: 12,
    dailyLogs: [
      {
        id: "log-1",
        date: new Date(Date.now() - 24 * 3600 * 1000).toISOString().split("T")[0],
        weather: "Cerah",
        workers: [
          { role: "Pekerja", count: 4 },
          { role: "Tukang Batu", count: 2 },
          { role: "Mandor", count: 1 },
        ],
        notes: "Mobilisasi alat ukur bouwplank dan pembersihan semak belukar di bagian belakang kavling.",
      },
      {
        id: "log-2",
        date: new Date().toISOString().split("T")[0],
        weather: "Mendung",
        workers: [
          { role: "Pekerja", count: 6 },
          { role: "Tukang Batu", count: 3 },
          { role: "Mandor", count: 1 },
        ],
        notes: "Pengukuran ulang as bangunan dan dimulainya galian tanah pondasi batu kali zona 1.",
      },
    ],
    weeklyProgress: [
      { weekNumber: 1, actualCategoryProgress: { "cat-1": 100, "cat-2": 30 } },
      { weekNumber: 2, actualCategoryProgress: { "cat-1": 100, "cat-2": 75, "cat-3": 10 } },
    ],
    subProjects: [
      {
        id: "sub-mock-1",
        name: "Pekerjaan Struktur & Arsitektur",
        categories: [
          {
            id: "cat-1",
            name: "I. Pekerjaan Persiapan",
            startWeek: 1,
            durationWeeks: 2,
            items: [
              { id: "item-1-1", name: "Pembersihan lahan dan perataan", unit: "m2", quantity: 150, unitPrice: 25000, total: 3750000 },
              { id: "item-1-2", name: "Pengukuran dan pemasangan bouwplank", unit: "m'", quantity: 48, unitPrice: 45000, total: 2160000 },
              { id: "item-1-3", name: "Pembuatan direksikit & barak kerja", unit: "ls", quantity: 1, unitPrice: 5000000, total: 5000000 },
            ],
          },
          {
            id: "cat-2",
            name: "II. Pekerjaan Pondasi & Tanah",
            startWeek: 2,
            durationWeeks: 3,
            items: [
              { id: "item-2-1", name: "Galian tanah pondasi batu kali", unit: "m3", quantity: 42.5, unitPrice: 75000, total: 3187500, ahsp: JSON.parse(JSON.stringify(AHSP_TEMPLATES[0].ahsp)) },
              { id: "item-2-2", name: "Urugan pasir bawah pondasi t=10cm", unit: "m3", quantity: 4.25, unitPrice: 220000, total: 935000 },
              { id: "item-2-3", name: "Pemasangan pondasi batu belah (campuran 1:4)", unit: "m3", quantity: 38, unitPrice: 792300, total: 30107400, ahsp: JSON.parse(JSON.stringify(AHSP_TEMPLATES[1].ahsp)) },
              { id: "item-2-4", name: "Urugan tanah kembali bekas galian", unit: "m3", quantity: 14.1, unitPrice: 45000, total: 634500 },
            ],
          },
          {
            id: "cat-3",
            name: "III. Pekerjaan Beton Bertulang (Struktur)",
            startWeek: 3,
            durationWeeks: 6,
            items: [
              { id: "item-3-1", name: "Beton Sloof 15/20 cm (K-250)", unit: "m3", quantity: 3.6, unitPrice: 4200000, total: 15120000 },
              { id: "item-3-2", name: "Kolom Utama 20/20 cm (K-250)", unit: "m3", quantity: 4.8, unitPrice: 4600000, total: 22080000 },
              { id: "item-3-3", name: "Ring Balk 15/15 cm (K-225)", unit: "m3", quantity: 2.7, unitPrice: 4100000, total: 11070000 },
              { id: "item-3-4", name: "Beton Plat Dak Lantai 2 t=12cm (K-275)", unit: "m3", quantity: 10.8, unitPrice: 5100000, total: 55080000 },
            ],
          },
          {
            id: "cat-4",
            name: "IV. Pekerjaan Dinding & Plesteran",
            startWeek: 6,
            durationWeeks: 5,
            items: [
              { id: "item-4-1", name: "Pasangan dinding bata merah (campuran 1:4)", unit: "m2", quantity: 320, unitPrice: 140000, total: 44800000, ahsp: JSON.parse(JSON.stringify(AHSP_TEMPLATES[2].ahsp)) },
              { id: "item-4-2", name: "Plesteran dinding + acian kasar", unit: "m2", quantity: 640, unitPrice: 32589, total: 20856960, ahsp: JSON.parse(JSON.stringify(AHSP_TEMPLATES[3].ahsp)) },
              { id: "item-4-3", name: "Pemasangan granit tile lantai utama 60x60 cm", unit: "m2", quantity: 110, unitPrice: 285000, total: 31350000 },
              { id: "item-4-4", name: "Pemasangan keramik kamar mandi 30x30 cm", unit: "m2", quantity: 18, unitPrice: 165000, total: 2970000 },
            ],
          },
          {
            id: "cat-5",
            name: "V. Pekerjaan Atap & Plafon",
            startWeek: 9,
            durationWeeks: 4,
            items: [
              { id: "item-5-1", name: "Konstruksi rangka atap baja ringan", unit: "m2", quantity: 95, unitPrice: 195000, total: 18525000 },
              { id: "item-5-2", name: "Pemasangan penutup atap genteng beton", unit: "m2", quantity: 95, unitPrice: 110000, total: 10450000 },
              { id: "item-5-3", name: "Pemasangan plafon Gypsum Board 9mm + rangka hollow", unit: "m2", quantity: 115, unitPrice: 125000, total: 14375000 },
            ],
          },
        ],
      },
      {
        id: "sub-mock-2",
        name: "Pekerjaan Mekanikal, Elektrikal, & Plumbing (MEP)",
        categories: [
          {
            id: "cat-mep-1",
            name: "I. Pekerjaan Elektrikal (Kelistrikan)",
            startWeek: 8,
            durationWeeks: 3,
            items: [
              { id: "item-e-1", name: "Pemasangan titik lampu fitting standar", unit: "ttk", quantity: 24, unitPrice: 185000, total: 4440000 },
              { id: "item-e-2", name: "Instalasi stop kontak + saklar Broco", unit: "ttk", quantity: 16, unitPrice: 220000, total: 3520000 },
              { id: "item-e-3", name: "Pemasangan panel box MCB Schneider 6 group", unit: "unit", quantity: 1, unitPrice: 1250000, total: 1250000 },
            ],
          },
          {
            id: "cat-mep-2",
            name: "II. Pekerjaan Plumbing & Sanitasi",
            startWeek: 7,
            durationWeeks: 4,
            items: [
              { id: "item-p-1", name: "Instalasi pipa air bersih PVC Rucika 3/4\"", unit: "m'", quantity: 65, unitPrice: 45000, total: 2925000 },
              { id: "item-p-2", name: "Instalasi pipa air kotor PVC Rucika 4\"", unit: "m'", quantity: 38, unitPrice: 95000, total: 3610000 },
              { id: "item-p-3", name: "Pasang Closet Duduk Toto standar", unit: "bh", quantity: 2, unitPrice: 2400000, total: 4800000 },
              { id: "item-p-4", name: "Pasang pompa air jetpump + tangki air 500L", unit: "ls", quantity: 1, unitPrice: 3800000, total: 3800000 },
            ],
          },
        ],
      },
    ],
  },
];
