"use client";
import React, { useState } from "react";

interface FormulaFloorProps {
  onApply: (val: number, note: string) => void;
}

export default function FormulaFloor({ onApply }: FormulaFloorProps) {
  const [length, setLength] = useState<number>(6);
  const [width, setWidth] = useState<number>(8);
  const [wastePct, setWastePct] = useState<number>(5);

  const rawArea = length * width;
  const totalWithWaste = rawArea * (1 + wastePct / 100);

  return (
    <div className="space-y-3 text-xs">
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Panjang Ruangan (m):</label>
          <input type="number" step="any" value={length} onChange={(e) => setLength(Number(e.target.value) || 0)}
            className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Lebar Ruangan (m):</label>
          <input type="number" step="any" value={width} onChange={(e) => setWidth(Number(e.target.value) || 0)}
            className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-zinc-500 uppercase">Faktor Potongan / Buang (Waste %):</label>
        <div className="flex gap-2 mt-1">
          {[0, 3, 5, 10].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => setWastePct(pct)}
              className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                wastePct === pct
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 border-transparent shadow-xs"
                  : "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {pct}%
            </button>
          ))}
          <input
            type="number"
            value={wastePct}
            onChange={(e) => setWastePct(Number(e.target.value) || 0)}
            className="w-16 px-2 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center font-bold"
          />
        </div>
      </div>

      <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Luas Total (+ Waste):</span>
          <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50">{totalWithWaste.toFixed(2)} m2</span>
        </div>
        <button
          type="button"
          onClick={() => onApply(Number(totalWithWaste.toFixed(2)), `P(${length}) x L(${width}) + Waste(${wastePct}%)`)}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
        >
          Terapkan Volume
        </button>
      </div>
    </div>
  );
}
