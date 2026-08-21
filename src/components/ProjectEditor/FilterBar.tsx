"use client";
import React from "react";
import { Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-3 items-center justify-between bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs text-xs">
      <div className="relative w-full sm:max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-3.5 h-3.5 text-zinc-400" />
        </div>
        <input
          type="text"
          placeholder="Cari item pekerjaan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
      </div>

      <div className="w-full sm:w-auto">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full sm:w-48 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-semibold text-zinc-650 dark:text-zinc-300 focus:outline-none"
        >
          <option value="">-- Urutkan Pekerjaan --</option>
          <option value="price-desc">Harga Satuan: Termahal</option>
          <option value="price-asc">Harga Satuan: Termurah</option>
          <option value="total-desc">Total Harga: Terbesar</option>
          <option value="qty-desc">Volume: Terbesar</option>
        </select>
      </div>
    </div>
  );
}
