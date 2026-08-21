"use client";
import React, { useState } from "react";

interface FormulaVolumeProps {
  onApply: (val: number, note: string) => void;
}

export default function FormulaVolume({ onApply }: FormulaVolumeProps) {
  const [shape, setShape] = useState<"balok" | "trapesium">("balok");
  const [length, setLength] = useState<number>(12);
  const [width, setWidth] = useState<number>(0.2);
  const [height, setHeight] = useState<number>(0.3);
  const [count, setCount] = useState<number>(1);
  const [topWidth, setTopWidth] = useState<number>(0.3);
  const [bottomWidth, setBottomWidth] = useState<number>(0.6);

  let volume = 0;
  let formulaDesc = "";

  if (shape === "balok") {
    volume = length * width * height * count;
    formulaDesc = `P(${length}m) x L(${width}m) x T(${height}m) x ${count} ttk`;
  } else {
    volume = ((topWidth + bottomWidth) / 2) * height * length;
    formulaDesc = `Trapesium: [(${topWidth}+${bottomWidth})/2] x T(${height}) x P(${length})`;
  }

  return (
    <div className="space-y-3 text-xs">
      <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setShape("balok")}
          className={`flex-1 py-1 text-center font-bold rounded-md transition-all ${
            shape === "balok" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs" : "text-zinc-400"
          }`}
        >
          Balok / Kolom / Sloof
        </button>
        <button
          type="button"
          onClick={() => setShape("trapesium")}
          className={`flex-1 py-1 text-center font-bold rounded-md transition-all ${
            shape === "trapesium" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs" : "text-zinc-400"
          }`}
        >
          Pondasi Batu Kali
        </button>
      </div>

      {shape === "balok" ? (
        <>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase">Panjang (m):</label>
              <input type="number" step="any" value={length} onChange={(e) => setLength(Number(e.target.value) || 0)}
                className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase">Lebar (m):</label>
              <input type="number" step="any" value={width} onChange={(e) => setWidth(Number(e.target.value) || 0)}
                className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase">Tinggi (m):</label>
              <input type="number" step="any" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)}
                className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Jumlah Titik / Segmen:</label>
            <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value) || 0)}
              className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Lebar Atas (m):</label>
            <input type="number" step="any" value={topWidth} onChange={(e) => setTopWidth(Number(e.target.value) || 0)}
              className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Lebar Bawah (m):</label>
            <input type="number" step="any" value={bottomWidth} onChange={(e) => setBottomWidth(Number(e.target.value) || 0)}
              className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Tinggi Pondasi (m):</label>
            <input type="number" step="any" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)}
              className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Panjang Total (m):</label>
            <input type="number" step="any" value={length} onChange={(e) => setLength(Number(e.target.value) || 0)}
              className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
        </div>
      )}

      <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Total Volume:</span>
          <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50">{volume.toFixed(3)} m3</span>
        </div>
        <button
          type="button"
          onClick={() => onApply(Number(volume.toFixed(3)), formulaDesc)}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
        >
          Terapkan Volume
        </button>
      </div>
    </div>
  );
}
