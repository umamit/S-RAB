import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, projectContext } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY tidak ditemukan di server environment." },
        { status: 500 }
      );
    }

    const systemPrompt = `Anda adalah AI Estimator Copilot & Konsultan Quantity Surveyor (QS) Senior profesional bersertifikasi standar PUPR Indonesia di platform S-RAB.
Anda bertugas membantu pengguna menganalisis, menghitung, memberikan rekomendasi efisiensi teknis, serta membuat draf dokumen resmi berdasarkan data proyek aktif yang diberikan.

Berikut adalah DATA LENGKAP PROYEK AKTIF SAAT INI:
${JSON.stringify(projectContext, null, 2)}

Aturan Respon Anda:
1. Jawab secara ringkas, to-the-point, jelas, dan profesional menggunakan format Markdown yang rapi (gunakan bold, bullet point, atau tabel bila relevan).
2. Jika pengguna menanyakan kebutuhan bahan (seperti semen, pasir, besi), hitunglah berdasarkan koefisien AHSP yang ada pada data item proyek.
3. Sebutkan angka nominal Rupiah atau persentase yang spesifik bila relevan.
4. Bersikaplah solutif, ramah, dan bertindaklah sebagai mitra estimator teknik sipil yang handal.`;

    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []).map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: groqMessages,
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      // Fallback model jika gpt-oss-120b sedang sibuk di infrastruktur Groq
      const fallback = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          temperature: 0.3,
          max_tokens: 1500,
        }),
      });

      if (!fallback.ok) {
        throw new Error("Groq Chat Copilot API Error: " + (await fallback.text()));
      }

      const fbData = await fallback.json();
      return NextResponse.json({
        content: fbData.choices?.[0]?.message?.content || "Maaf, tidak ada respon.",
      });
    }

    const data = await response.json();
    return NextResponse.json({
      content: data.choices?.[0]?.message?.content || "Maaf, tidak ada respon.",
    });
  } catch (error: any) {
    console.error("AI Chat Copilot Error:", error);
    return NextResponse.json(
      { error: error.message || "Gagal memproses pertanyaan chat dengan AI." },
      { status: 500 }
    );
  }
}
