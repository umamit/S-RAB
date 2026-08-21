"use client";
import React, { useState } from "react";

interface FormulaWallProps {
  onApply: (val: number, note: string) => void;
}

export default function FormulaWall({ onApply }: FormulaWallProps) {
  const [length, setLength] = useState<number>(10);
  const [height, setHeight] = useState<number>(3.5);
  const [doors, setDoors] = useState<number>(1);
  const [doorArea, setDoorArea] = useState<number>(1.8);
  const [windows, setWindows] = useState<number>(2);
  const [windowArea, setWindowArea] = useState<number>(1.44);

  const grossArea = length * height;
  const deduction = doors * doorArea + windows * windowArea;
  const netArea = Math.max(0, grossArea - deduction);

  return (
    <div className="space-y-3 text-xs">
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Panjang Dinding (m):</label>
          <input type="number" step="any" value={length} onChange={(e) => setLength(Number(e.target.value) || 0)}
            className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Tinggi Dinding (m):</label>
          <input type="number" step="any" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)}
            className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Jumlah Pintu (unit):</label>
          <input type="number" value={doors} onChange={(e) => setDoors(Number(e.target.value) || 0)}
            className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Luas / Pintu (m2):</label>
          <input type="number" step="any" value={doorArea} onChange={(e) => setDoorArea(Number(e.target.value) || 0)}
            className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Jumlah Jendela (unit):</label>
          <input type="number" value={windows} onChange={(e) => setWindows(Number(e.target.value) || 0)}
            className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Luas / Jendela (m2):</label>
          <input type="number" step="any" value={windowArea} onChange={(e) => setWindowArea(Number(e.target.value) || 0)}
            className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
        </div>
      </div>

      <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Luas Bersih:</span>
          <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50">{netArea.toFixed(2)} m2</span>
        </div>
        <button
          type="button"
          onClick={() => onApply(Number(netArea.toFixed(2)), `P(${length}) x T(${height}) - Bukaan(${deduction.toFixed(2)}m2)`)}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
        >
          Terapkan Volume
        </button>
      </div>
    </div>
  );
}
