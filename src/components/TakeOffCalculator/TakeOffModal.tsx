"use client";
import React, { useState } from "react";
import { X, Calculator } from "lucide-react";
import FormulaWall from "./FormulaWall";
import FormulaVolume from "./FormulaVolume";
import FormulaFloor from "./FormulaFloor";

interface TakeOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemUnit: string;
  onApplyVolume: (volume: number, note: string) => void;
}

export default function TakeOffModal({
  isOpen,
  onClose,
  itemName,
  itemUnit,
  onApplyVolume,
}: TakeOffModalProps) {
  const [activeTab, setActiveTab] = useState<"wall" | "volume" | "floor">("wall");

  if (!isOpen) return null;

  const handleApply = (val: number, note: string) => {
    onApplyVolume(val, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md p-5 space-y-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 p-1">
          <X className="w-4 h-4" />
        </button>

        <div className="border-b border-zinc-150 dark:border-zinc-800/80 pb-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Kalkulator Dimensi Cepat</h3>
            <p className="text-[11px] text-zinc-400 truncate max-w-[280px]">Item: {itemName} ({itemUnit})</p>
          </div>
        </div>

        <div className="flex border-b border-zinc-200 dark:border-zinc-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("wall")}
            className={`flex-1 py-2 text-center border-b-2 transition-all ${
              activeTab === "wall"
                ? "border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Dinding (m2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("volume")}
            className={`flex-1 py-2 text-center border-b-2 transition-all ${
              activeTab === "volume"
                ? "border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Kubikasi (m3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("floor")}
            className={`flex-1 py-2 text-center border-b-2 transition-all ${
              activeTab === "floor"
                ? "border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Lantai/Plafon (m2)
          </button>
        </div>

        {activeTab === "wall" && <FormulaWall onApply={handleApply} />}
        {activeTab === "volume" && <FormulaVolume onApply={handleApply} />}
        {activeTab === "floor" && <FormulaFloor onApply={handleApply} />}
      </div>
    </div>
  );
}
