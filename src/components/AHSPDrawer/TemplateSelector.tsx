"use client";
import React from "react";
import { AHSP_TEMPLATES, AHSP, CustomAHSPTemplate } from "@/lib/store";

interface TemplateSelectorProps {
  customTemplates: CustomAHSPTemplate[];
  onApplyTemplate: (ahsp: AHSP) => void;
}

export default function TemplateSelector({ customTemplates, onApplyTemplate }: TemplateSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;

    if (val.startsWith("sni-")) {
      const idx = Number(val.replace("sni-", ""));
      onApplyTemplate(AHSP_TEMPLATES[idx].ahsp);
    } else if (val.startsWith("cust-")) {
      const id = val.replace("cust-", "");
      const found = customTemplates.find((t) => t.id === id);
      if (found) onApplyTemplate(found.ahsp);
    }
    e.target.value = ""; // Reset
  };

  return (
    <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white dark:bg-zinc-950">
      <label htmlFor="ahsp-preset" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider shrink-0">
        Gunakan Template:
      </label>
      <select
        id="ahsp-preset"
        defaultValue=""
        onChange={handleChange}
        className="flex-1 w-full px-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none"
      >
        <option value="">-- Pilih Template Pekerjaan --</option>
        
        <optgroup label="Preset SNI PUPR">
          {AHSP_TEMPLATES.map((tmpl, idx) => (
            <option key={`sni-${idx}`} value={`sni-${idx}`}>
              {tmpl.name}
            </option>
          ))}
        </optgroup>

        {customTemplates && customTemplates.length > 0 && (
          <optgroup label="Template Kustom Saya">
            {customTemplates.map((tmpl) => (
              <option key={`cust-${tmpl.id}`} value={`cust-${tmpl.id}`}>
                {tmpl.name}
              </option>
            ))}
          </optgroup>
        )}
      </select>
    </div>
  );
}
