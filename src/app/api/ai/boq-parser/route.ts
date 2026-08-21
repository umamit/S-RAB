import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, rawBoqText } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY tidak ditemukan di environment server." },
        { status: 500 }
      );
    }

    const systemPrompt = `Anda adalah AI Estimator Konstruksi & Quantity Surveyor (QS) senior profesional bersertifikasi standar PUPR Indonesia.
Tugas Anda adalah mengurai teks/dokumen BOQ (Bill of Quantities) mentah menjadi format JSON berstruktur dengan skema berikut:
{
  "subProjectName": string,
  "categories": [
    {
      "name": string,
      "items": [
        {
          "name": string,
          "quantity": number,
          "unit": string,
          "suggestedAhspName": string | null
        }
      ]
    }
  ]
}

Aturan Ketat:
1. Respon WAJIB berupa raw JSON valid murni (tanpa tanda kutip markdown \`\`\`json).
2. Bersihkan penomoran hierarki seperti "1.", "A.", "I." dari nama kategori dan item.
3. Konversi satuan ke bentuk standar teknik sipil: "m3", "m2", "m'", "kg", "bh", "ls", "titik", "unit", "set".
4. Jika kuantitas tidak disebutkan secara eksplisit, gunakan 1.`;

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
          { role: "user", content: `${prompt || ""}\n\nBerikut teks BOQ mentah yang harus diurai:\n${rawBoqText}` },
        ],
        temperature: 0.1,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      // Fallback model jika gpt-oss-120b sedang overload di cluster Groq
      const fallbackResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `${prompt || ""}\n\nBerikut teks BOQ mentah yang harus diurai:\n${rawBoqText}` },
          ],
          temperature: 0.1,
          response_format: { type: "json_object" },
        }),
      });

      if (!fallbackResp.ok) {
        throw new Error(`Groq API Error: ${errText}`);
      }

      const fallbackData = await fallbackResp.json();
      const rawContent = fallbackData.choices?.[0]?.message?.content || "{}";
      return NextResponse.json(JSON.parse(rawContent));
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "{}";
    return NextResponse.json(JSON.parse(rawContent));
  } catch (error: any) {
    console.error("AI BOQ Parser Error:", error);
    return NextResponse.json(
      { error: error.message || "Gagal memproses data BOQ dengan AI." },
      { status: 500 }
    );
  }
}
