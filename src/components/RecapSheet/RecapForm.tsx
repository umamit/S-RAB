"use client";
import React, { useState } from "react";

interface RecapFormProps {
  onSubmit: (name: string) => void;
}

export default function RecapForm({ onSubmit }: RecapFormProps) {
  const [newSubName, setNewSubName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;
    onSubmit(newSubName.trim());
    setNewSubName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center pt-4 border-t border-zinc-100 dark:border-zinc-800 print:hidden">
      <label htmlFor="new-sub-name-recap" className="sr-only">Nama Sub-Pekerjaan Baru</label>
      <input
        id="new-sub-name-recap"
        type="text"
        value={newSubName}
        onChange={(e) => setNewSubName(e.target.value)}
        placeholder="Sub-Pekerjaan Baru (Contoh: Pekerjaan Mekanikal & Elektrikal)"
        className="flex-1 max-w-sm px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-semibold rounded-lg text-xs"
      >
        Tambah Divisi
      </button>
    </form>
  );
}
