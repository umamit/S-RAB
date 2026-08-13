"use client";
import React from "react";
import { Item } from "@/lib/store";

interface AHSPHeaderProps {
  activeItem: Item;
  onClose: () => void;
}

export default function AHSPHeader({ activeItem, onClose }: AHSPHeaderProps) {
  return (
    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start bg-zinc-50/50 dark:bg-zinc-900/10">
      <div className="space-y-1 pr-6">
        <span className="text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          AHSP Calculator (SNI)
        </span>
        <h2 className="text-md font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          {activeItem.name}
        </h2>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Satuan: <strong className="text-zinc-700 dark:text-zinc-300">{activeItem.unit}</strong> | Volume Pekerjaan: <strong className="text-zinc-700 dark:text-zinc-300">{activeItem.quantity}</strong>
        </p>
      </div>
      <button
        onClick={onClose}
        type="button"
        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
