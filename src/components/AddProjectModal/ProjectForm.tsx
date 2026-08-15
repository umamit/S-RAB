"use client";
import { useState } from "react";

interface ProjectFormProps {
  onSubmit: (data: { name: string; description: string; taxRate: number; profitRate: number; templateType: string }) => void;
  onCancel: () => void;
}

export default function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [taxRate, setTaxRate] = useState(12);
  const [profitRate, setProfitRate] = useState(10);
  const [templateType, setTemplateType] = useState("empty");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      taxRate: taxRate / 100,
      profitRate: profitRate / 100,
      templateType,
    });
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="proj-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
          Nama Proyek *
        </label>
        <input
          id="proj-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Pembangunan Ruko Kelapa Gading"
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-700 transition-all"
        />
      </div>

      <div>
        <label htmlFor="proj-desc" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
          Deskripsi Proyek
        </label>
        <textarea
          id="proj-desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detail proyek bangunan, lokasi, owner, dll."
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-700 transition-all resize-none"
        />
      </div>

      <div>
        <label htmlFor="proj-template" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
          Template Struktur Proyek *
        </label>
        <select
          id="proj-template"
          value={templateType}
          onChange={(e) => setTemplateType(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-400"
        >
          <option value="empty">Template Kosong (RAB Kosong)</option>
          <option value="ruko">Pembangunan Ruko 2 Lantai (Struktur &amp; Arsitektur)</option>
          <option value="paving">Pekerjaan Jalan Paving Block (Tanah &amp; Paving)</option>
          <option value="drainase">Pekerjaan Drainase &amp; Gorong-Gorong</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="proj-tax" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
            PPN (%)
          </label>
          <input
            id="proj-tax"
            type="number"
            min={0}
            max={100}
            value={taxRate}
            onChange={(e) => setTaxRate(Math.min(100, Math.max(0, Number(e.target.value))))}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
        </div>

        <div>
          <label htmlFor="proj-profit" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
            Overhead & Profit (%)
          </label>
          <input
            id="proj-profit"
            type="number"
            min={0}
            max={100}
            value={profitRate}
            onChange={(e) => setProfitRate(Math.min(100, Math.max(0, Number(e.target.value))))}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg font-medium transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 rounded-lg font-semibold shadow-sm transition-colors"
        >
          Simpan Proyek
        </button>
      </div>
    </form>
  );
}
