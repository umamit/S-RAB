"use client";
import React from "react";

interface LangkahCardProps {
  title: string;
  lawText?: string;
  children: React.ReactNode;
}

export default function LangkahCard({ title, lawText, children }: LangkahCardProps) {
  return (
    <div className="space-y-4 bg-zinc-50/40 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{title}</h3>
      <div className="space-y-3 text-zinc-650 dark:text-zinc-450 text-xs">
        {lawText && (
          <p className="text-[11px] text-zinc-500 font-semibold mb-1">{lawText}</p>
        )}
        {children}
      </div>
    </div>
  );
}
