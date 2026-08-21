import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { projectSummary } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY tidak ditemukan di server environment." },
        { status: 500 }
      );
    }

    const systemPrompt = `Anda adalah Auditor Senior Quantity Surveyor (QS) & Ahli Estimasi Konstruksi bersertifikasi standar PUPR Indonesia.
Tugas Anda adalah melakukan audit mendalam terhadap kewajaran harga, koefisien teknis, dan kelengkapan item pekerjaan RAB konstruksi.

Analisis yang harus Anda lakukan:
1. Kewajaran Harga Satuan vs Standar Pasar Konstruksi Indonesia.
2. Kelayakan Teknis (Rasio Volume vs Koefisien Struktur / Beton / Besi / Dinding).
3. Deteksi Item Pekerjaan Terlupakan (Contoh: ada dinding tapi tidak ada plesteran/acian, ada beton tapi tidak ada bekisting/pembesian).
4. Potensi Efisiensi Biaya & Mitigasi Risiko Kebocoran Anggaran.

Keluarkan hasil audit murni dalam format JSON valid dengan skema:
{
  "healthScore": number (0 - 100),
  "status": "SEHAT" | "PERLU_PERHATIAN" | "KRITIS",
  "summary": string (ulasan eksekutif singkat 2-3 kalimat),
  "issues": [
    {
      "id": string,
      "severity": "CRITICAL" | "WARNING" | "SUGGESTION",
      "category": string (e.g. "Kewajaran Harga" | "Keamanan Struktur" | "Kelengkapan Item"),
      "itemName": string,
      "finding": string (penjelasan temuan anomali),
      "recommendation": string (saran tindakan perbaikan konkrit)
    }
  ]
}

Aturan:
- Respon WAJIB berupa raw JSON valid murni (tanpa \`\`\`json markdown).
- Jika ada 0 masalah besar, berikan skor 90-100 dan saran optimasi efisiensi.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Berikut adalah ringkasan data proyek RAB yang harus diaudit:\n\n${JSON.stringify(projectSummary, null, 2)}` },
        ],
        temperature: 0.1,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      // Fallback model jika cluster gpt-oss-120b sedang sibuk
      const fallback = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Berikut data proyek RAB:\n\n${JSON.stringify(projectSummary, null, 2)}` },
          ],
          temperature: 0.1,
          response_format: { type: "json_object" },
        }),
      });

      if (!fallback.ok) {
        throw new Error("Groq Audit API error: " + (await fallback.text()));
      }
      const fbData = await fallback.json();
      return NextResponse.json(JSON.parse(fbData.choices?.[0]?.message?.content || "{}"));
    }

    const data = await response.json();
    return NextResponse.json(JSON.parse(data.choices?.[0]?.message?.content || "{}"));
  } catch (error: any) {
    console.error("AI Audit Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Gagal menjalankan audit RAB dengan AI." },
      { status: 500 }
    );
  }
}
