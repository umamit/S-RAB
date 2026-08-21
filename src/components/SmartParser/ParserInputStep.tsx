"use client";
import React, { useState } from "react";
import { Sparkles, FileText, Upload } from "lucide-react";

interface ParserInputStepProps {
  onParse: (text: string) => void;
  isLoading: boolean;
}

const EXAMPLE_BOQ = `Pekerjaan Persiapan
- Pembersihan lahan dan perataan 150 m2
- Pasang bouwplank 48 m1

Pekerjaan Struktur & Pondasi
- Galian tanah pondasi batu kali 42.5 m3
- Pasang pondasi batu kali 1:4 38 m3
- Beton Sloof 15/20 cm K250 3.6 m3
- Kolom Utama 20/20 cm K250 4.8 m3

Pekerjaan Dinding & Arsitektur
- Pasang dinding bata merah 1:4 320 m2
- Plesteran dinding dan acian 640 m2`;

export default function ParserInputStep({ onParse, isLoading }: ParserInputStepProps) {
  const [text, setText] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target?.result as string || "");
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="bg-zinc-50 dark:bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs flex justify-between items-center">
        <div>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">🚀 Model AI Aktif: </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Groq AI (GPT OSS 120B / LPU)</span>
        </div>
        <button
          type="button"
          onClick={() => setText(EXAMPLE_BOQ)}
          className="text-[11px] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-semibold underline"
        >
          Gunakan Contoh Teks
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex justify-between items-center">
          <span>Tempelkan Teks BOQ / Rincian Pekerjaan:</span>
          <label className="cursor-pointer text-[10px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1 font-semibold">
            <Upload className="w-3 h-3" /> Upload File (.txt / .csv)
            <input type="file" accept=".txt,.csv,.json" onChange={handleFileUpload} className="hidden" />
          </label>
        </label>
        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Contoh:&#10;Pekerjaan Pondasi&#10;- Galian tanah 42.5 m3&#10;- Pasang batu kali 38 m3&#10;&#10;Pekerjaan Dinding&#10;- Pasang bata merah 320 m2"
          className="w-full p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
      </div>

      <button
        type="button"
        disabled={!text.trim() || isLoading}
        onClick={() => onParse(text)}
        className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
      >
        {isLoading ? (
          <>Memproses dengan Groq LPU...</>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-amber-400" /> Mulai Ekstraksi AI & Cocokkan AHSP SNI
          </>
        )}
      </button>
    </div>
  );
}
