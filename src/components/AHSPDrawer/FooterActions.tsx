"use client";
import React from "react";

interface FooterActionsProps {
  hasAHSP: boolean;
  onDisableAHSP: () => void;
  onClose: () => void;
  onSave: () => void;
  onSaveCustom?: () => void;
}

export default function FooterActions({
  hasAHSP,
  onDisableAHSP,
  onClose,
  onSave,
  onSaveCustom,
}: FooterActionsProps) {
  return (
    <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-wrap gap-3 justify-between items-center shrink-0">
      <div>
        {hasAHSP && (
          <button
            type="button"
            onClick={onDisableAHSP}
            className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-950 dark:hover:bg-red-950/20 rounded-lg text-xs font-semibold transition-colors"
          >
            Hapus & Matikan Analisa
          </button>
        )}
      </div>
      
      <div className="flex gap-2">
        {onSaveCustom && (
          <button
            type="button"
            onClick={onSaveCustom}
            className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg text-xs font-semibold transition-colors"
          >
            Simpan Kustom
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg text-xs font-medium transition-colors"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          Simpan Analisa
        </button>
      </div>
    </div>
  );
}
