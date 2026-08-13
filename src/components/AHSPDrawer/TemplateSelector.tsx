"use client";
import React from "react";
import { AHSP_TEMPLATES } from "@/lib/store";

interface TemplateSelectorProps {
  onApplyTemplate: (idx: number) => void;
}

export default function TemplateSelector({ onApplyTemplate }: TemplateSelectorProps) {
  return (
    <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white dark:bg-zinc-950">
      <label htmlFor="ahsp-preset" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider shrink-0">
        Gunakan Template SNI:
      </label>
      <select
        id="ahsp-preset"
        defaultValue=""
        onChange={(e) => {
          if (e.target.value !== "") {
            onApplyTemplate(Number(e.target.value));
            e.target.value = ""; // Reset
          }
        }}
        className="flex-1 w-full px-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none"
      >
        <option value="">-- Pilih Template Pekerjaan --</option>
        {AHSP_TEMPLATES.map((tmpl, idx) => (
          <option key={tmpl.name} value={idx}>
            {tmpl.name}
          </option>
        ))}
      </select>
    </div>
  );
}
