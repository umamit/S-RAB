import type { SubProject } from "../types";

export function getWebsiteTemplate(nowStr: string): SubProject[] {
  return [
    {
      id: `sub-website-req-${nowStr}`,
      name: "01 Analisis Kebutuhan",
      categories: [
        {
          id: `cat-website-req-${nowStr}`,
          name: "I. Analisis Kebutuhan",
          startWeek: 1,
          durationWeeks: 1,
          items: [
            { id: `item-web-req-${nowStr}`, name: "Riset Bisnis & Analisis Persyaratan Sistem", unit: "ls", quantity: 1, unitPrice: 3000000, total: 3000000 },
          ],
        },
      ],
    },
    {
      id: `sub-website-plan-${nowStr}`,
      name: "02 Perencanaan",
      categories: [
        {
          id: `cat-website-plan-${nowStr}`,
          name: "II. Perencanaan Proyek",
          startWeek: 1,
          durationWeeks: 1,
          items: [
            { id: `item-web-plan-${nowStr}`, name: "Pemetaan Timeline, Milestones, & Alokasi Sumber Daya", unit: "ls", quantity: 1, unitPrice: 2000000, total: 2000000 },
          ],
        },
      ],
    },
    {
      id: `sub-website-design-${nowStr}`,
      name: "03 Desain UI/UX",
      categories: [
        {
          id: `cat-website-design-${nowStr}`,
          name: "III. Perancangan UI/UX & Aset",
          startWeek: 2,
          durationWeeks: 2,
          items: [
            { id: `item-web-figma-${nowStr}`, name: "Desain Wireframe & Mockup Interaktif Figma", unit: "ls", quantity: 1, unitPrice: 4000000, total: 4000000 },
            { id: `item-web-assets-${nowStr}`, name: "Aset Ilustrasi & Struktur Aset Visual (3D Logo & Animasi)", unit: "ls", quantity: 1, unitPrice: 3000000, total: 3000000 },
          ],
        },
      ],
    },
    {
      id: `sub-website-code-${nowStr}`,
      name: "04 Pengodean",
      categories: [
        {
          id: `cat-website-code-${nowStr}`,
          name: "IV. Implementasi & Coding",
          startWeek: 3,
          durationWeeks: 4,
          items: [
            { id: `item-web-front-${nowStr}`, name: "Frontend Coding & Responsive Layout (Next.js & React 19)", unit: "ls", quantity: 1, unitPrice: 8000000, total: 8000000 },
            { id: `item-web-anim-${nowStr}`, name: "Animasi Landing Page (GSAP, CSS Variables & Three.js)", unit: "ls", quantity: 1, unitPrice: 5000000, total: 5000000 },
            { id: `item-web-scan-${nowStr}`, name: "Fitur Scanner QR Code Kamera (ZXing Browser SDK)", unit: "ls", quantity: 1, unitPrice: 4500000, total: 4500000 },
            { id: `item-web-ai-${nowStr}`, name: "Integrasi AI Chatbot (Supabase pgvector, Embeddings & RAG)", unit: "ls", quantity: 1, unitPrice: 7500000, total: 7500000 },
            { id: `item-web-copilot-${nowStr}`, name: "Asisten Admin Copilot & Command Palette (Cmdk Widget)", unit: "ls", quantity: 1, unitPrice: 4500000, total: 4500000 },
            { id: `item-web-pdf-${nowStr}`, name: "Penjanaan Sertifikat PDF Dinamis & Ekspor Excel (PDF-Lib & XLSX)", unit: "ls", quantity: 1, unitPrice: 4000000, total: 4000000 },
          ],
        },
      ],
    },
    {
      id: `sub-website-test-${nowStr}`,
      name: "05 Pengujian Ketat",
      categories: [
        {
          id: `cat-website-test-${nowStr}`,
          name: "V. Quality Assurance & Testing",
          startWeek: 6,
          durationWeeks: 1,
          items: [
            { id: `item-web-qa-${nowStr}`, name: "Quality Assurance (QA), Compatibility Testing & Bug Fixing", unit: "ls", quantity: 1, unitPrice: 3500000, total: 3500000 },
          ],
        },
      ],
    },
    {
      id: `sub-website-launch-${nowStr}`,
      name: "06 Peluncuran",
      categories: [
        {
          id: `cat-website-launch-${nowStr}`,
          name: "VI. Deployment & Launch",
          startWeek: 7,
          durationWeeks: 1,
          items: [
            { id: `item-web-deploy-${nowStr}`, name: "Setup Serverless Deploy (Cloudflare Pages) & SSL Kustom Domain", unit: "ls", quantity: 1, unitPrice: 2000000, total: 2000000 },
          ],
        },
      ],
    },
    {
      id: `sub-website-handover-${nowStr}`,
      name: "07 Serah Terima & Dukungan",
      categories: [
        {
          id: `cat-website-handover-${nowStr}`,
          name: "VII. Handover & Pelatihan",
          startWeek: 7,
          durationWeeks: 1,
          items: [
            { id: `item-web-handover-${nowStr}`, name: "Dokumentasi Teknis Sistem & Pelatihan Penggunaan", unit: "ls", quantity: 1, unitPrice: 2500000, total: 2500000 },
          ],
        },
      ],
    },
    {
      id: `sub-website-maint-${nowStr}`,
      name: "08 Pemeliharaan",
      categories: [
        {
          id: `cat-website-maint-${nowStr}`,
          name: "VIII. Pemeliharaan & Audit Berkala",
          startWeek: 8,
          durationWeeks: 4,
          items: [
            { id: `item-web-maint-${nowStr}`, name: "Pemeliharaan Sistem, Security Updates & Speed Audit (PostHog & Lighthouse)", unit: "ls", quantity: 1, unitPrice: 3500000, total: 3500000 },
          ],
        },
      ],
    },
  ];
}
