"use client";
import { X } from "lucide-react";
import RekapLintas from "./RekapLintas";

interface RekapLintasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RekapLintasModal({ isOpen, onClose }: RekapLintasModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-5xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div>
            <h2 className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Rekapitulasi Lintas Proyek</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">Ringkasan nilai kontrak, termin, dan status BAST semua proyek</p>
          </div>
          <button onClick={onClose} type="button"
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors">
            <X className="w-4 h-4 text-zinc-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <RekapLintas />
        </div>
      </div>
    </div>
  );
}
