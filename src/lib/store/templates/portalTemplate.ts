import type { SubProject } from "../types";

export function getPortalTemplate(nowStr: string): SubProject[] {
  return [
    {
      id: `sub-portal-req-${nowStr}`,
      name: "01 Analisis Kebutuhan",
      categories: [
        {
          id: `cat-portal-req-${nowStr}`,
          name: "I. Analisis Kebutuhan Portal",
          startWeek: 1,
          durationWeeks: 1,
          items: [
            { id: `item-port-req-${nowStr}`, name: "Riset Kebutuhan Sistem Sekolah & Pemetaan Fungsionalitas", unit: "ls", quantity: 1, unitPrice: 4000000, total: 4000000 },
          ],
        },
      ],
    },
    {
      id: `sub-portal-plan-${nowStr}`,
      name: "02 Perencanaan",
      categories: [
        {
          id: `cat-portal-plan-${nowStr}`,
          name: "II. Perencanaan Basis Data & ORM",
          startWeek: 1,
          durationWeeks: 1,
          items: [
            { id: `item-port-dbplan-${nowStr}`, name: "Skema Desain Database Relasional & Perencanaan Migrasi (Prisma Schema)", unit: "ls", quantity: 1, unitPrice: 3000000, total: 3000000 },
          ],
        },
      ],
    },
    {
      id: `sub-portal-design-${nowStr}`,
      name: "03 Desain UI/UX",
      categories: [
        {
          id: `cat-portal-design-${nowStr}`,
          name: "III. Perancangan UI/UX Dasbor",
          startWeek: 2,
          durationWeeks: 2,
          items: [
            { id: `item-port-figma-${nowStr}`, name: "Desain Mockup Portal & Dasbor Admin Sekolah", unit: "ls", quantity: 1, unitPrice: 5000000, total: 5000000 },
          ],
        },
      ],
    },
    {
      id: `sub-portal-code-${nowStr}`,
      name: "04 Pengodean",
      categories: [
        {
          id: `cat-portal-code-${nowStr}`,
          name: "IV. Implementasi & Coding CMS",
          startWeek: 3,
          durationWeeks: 5,
          items: [
            { id: `item-port-editor-${nowStr}`, name: "CMS & Rich Text Editor Berita (Tiptap Editor)", unit: "ls", quantity: 1, unitPrice: 12000000, total: 12000000 },
            { id: `item-port-orm-${nowStr}`, name: "Integrasi ORM & Database Relasional (Prisma & PostgreSQL Supabase)", unit: "ls", quantity: 1, unitPrice: 7000000, total: 7000000 },
            { id: `item-port-auth-${nowStr}`, name: "Sistem Keamanan & Hak Akses Data (Supabase Auth SSR & RLS)", unit: "ls", quantity: 1, unitPrice: 4000000, total: 4000000 },
            { id: `item-port-groq-${nowStr}`, name: "Integrasi Chatbot Pintar AI Sekolah (Groq AI API / Aim AI)", unit: "ls", quantity: 1, unitPrice: 8000000, total: 8000000 },
            { id: `item-port-flow-${nowStr}`, name: "Visualisasi Statistik & Diagram Alur (Recharts & @xyflow/react)", unit: "ls", quantity: 1, unitPrice: 6000000, total: 6000000 },
            { id: `item-port-pdf-${nowStr}`, name: "Penjanaan Form PDF & Kode QR Dinamis (React-PDF & qrcode.react)", unit: "ls", quantity: 1, unitPrice: 5000000, total: 5000000 },
            { id: `item-port-store-${nowStr}`, name: "Integrasi Media Storage & Cloud CDN (Supabase Storage)", unit: "ls", quantity: 1, unitPrice: 3000000, total: 3000000 },
          ],
        },
      ],
    },
    {
      id: `sub-portal-test-${nowStr}`,
      name: "05 Pengujian Ketat",
      categories: [
        {
          id: `cat-portal-test-${nowStr}`,
          name: "V. Quality Assurance & Debugging",
          startWeek: 6,
          durationWeeks: 1,
          items: [
            { id: `item-port-qa-${nowStr}`, name: "Pengujian Komprehensif (QA), Unit Testing, & Debugging", unit: "ls", quantity: 1, unitPrice: 4000000, total: 4000000 },
          ],
        },
      ],
    },
    {
      id: `sub-portal-launch-${nowStr}`,
      name: "06 Peluncuran",
      categories: [
        {
          id: `cat-portal-launch-${nowStr}`,
          name: "VI. Deployment & Server Setup",
          startWeek: 7,
          durationWeeks: 1,
          items: [
            { id: `item-port-deploy-${nowStr}`, name: "Setup Production Deployment Server (Vercel) & SSL", unit: "ls", quantity: 1, unitPrice: 2500000, total: 2500000 },
          ],
        },
      ],
    },
    {
      id: `sub-portal-handover-${nowStr}`,
      name: "07 Serah Terima & Dukungan",
      categories: [
        {
          id: `cat-portal-handover-${nowStr}`,
          name: "VII. Handover & Training",
          startWeek: 7,
          durationWeeks: 1,
          items: [
            { id: `item-port-handover-${nowStr}`, name: "Dokumentasi Admin & Pelatihan Penggunaan CMS Sekolah", unit: "ls", quantity: 1, unitPrice: 3000000, total: 3000000 },
          ],
        },
      ],
    },
    {
      id: `sub-portal-maint-${nowStr}`,
      name: "08 Pemeliharaan",
      categories: [
        {
          id: `cat-portal-maint-${nowStr}`,
          name: "VIII. Pemeliharaan & Audit Performa",
          startWeek: 8,
          durationWeeks: 4,
          items: [
            { id: `item-port-maint-${nowStr}`, name: "Pemantauan Kinerja Berkala, Update Keamanan & Performa (Lighthouse)", unit: "ls", quantity: 1, unitPrice: 4000000, total: 4000000 },
          ],
        },
      ],
    },
  ];
}
