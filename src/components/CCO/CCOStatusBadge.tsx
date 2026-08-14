"use client";
import React from "react";
import type { CCOStatus } from "@/lib/store";

interface CCOStatusBadgeProps {
  status: CCOStatus;
}

export default function CCOStatusBadge({ status }: CCOStatusBadgeProps) {
  const styles = {
    Draft: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    Diajukan: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900",
    Disetujui: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900",
    Ditolak: "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
}
