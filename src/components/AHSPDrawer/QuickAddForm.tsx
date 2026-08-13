"use client";
import React from "react";
import { SectionType, NewEntryState } from "./types";

interface QuickAddFormProps {
  activeSection: SectionType;
  newEntry: NewEntryState;
  setNewEntry: React.Dispatch<React.SetStateAction<NewEntryState>>;
  onAddEntry: (e: React.FormEvent) => void;
}

export default function QuickAddForm({
  activeSection,
  newEntry,
  setNewEntry,
  onAddEntry,
}: QuickAddFormProps) {
  const getPlaceholder = () => {
    switch (activeSection) {
      case "materials":
        return "Nama Bahan";
      case "labor":
        return "Nama Tenaga";
      case "tools":
        return "Nama Alat";
    }
  };

  return (
    <form
      onSubmit={onAddEntry}
      className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-zinc-50/50 dark:bg-zinc-900/20 p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl"
    >
      <div className="sm:col-span-2">
        <label htmlFor="entry-name" className="sr-only">Nama Komponen</label>
        <input
          id="entry-name"
          type="text"
          required
          placeholder={getPlaceholder()}
          value={newEntry.name}
          onChange={(e) => setNewEntry((p) => ({ ...p, name: e.target.value }))}
          className="w-full px-2.5 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs"
        />
      </div>
      <div className="grid grid-cols-3 gap-2 sm:col-span-2">
        <div>
          <label htmlFor="entry-unit" className="sr-only">Satuan</label>
          <input
            id="entry-unit"
            type="text"
            required
            placeholder="Satuan"
            value={newEntry.unit}
            onChange={(e) => setNewEntry((p) => ({ ...p, unit: e.target.value }))}
            className="w-full px-2.5 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-center"
          />
        </div>
        <div>
          <label htmlFor="entry-coeff" className="sr-only">Koefisien</label>
          <input
            id="entry-coeff"
            type="number"
            step="any"
            required
            placeholder="Koef"
            value={newEntry.coefficient || ""}
            onChange={(e) =>
              setNewEntry((p) => ({ ...p, coefficient: parseFloat(e.target.value) || 0 }))
            }
            className="w-full px-2.5 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-right"
          />
        </div>
        <button
          type="submit"
          className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-lg text-xs"
        >
          Tambah
        </button>
      </div>
    </form>
  );
}
