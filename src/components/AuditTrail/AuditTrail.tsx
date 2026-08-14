"use client";
import React, { useState } from "react";
import type { Project } from "@/lib/store";
import { Search, History, ShieldAlert } from "lucide-react";

interface AuditTrailProps {
  project: Project;
}

export default function AuditTrail({ project }: AuditTrailProps) {
  const [search, setSearch] = useState("");
  const logs = project.auditLogs || [];

  const filteredLogs = logs.filter((log) => {
    const term = search.toLowerCase();
    return (
      log.actionType.toLowerCase().includes(term) ||
      log.details.toLowerCase().includes(term) ||
      log.userName.toLowerCase().includes(term)
    );
  });

  const getActionBadgeColor = (type: string) => {
    if (type.startsWith("ADD_")) return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/60";
    if (type.startsWith("DELETE_")) return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/60";
    if (type.startsWith("UPDATE_")) return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/60";
    return "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800";
  };

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:hidden">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 flex justify-between items-end flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-2">
            <History className="w-5 h-5 text-zinc-500" /> Riwayat Perubahan Data (Audit Trail)
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Jejak audit riwayat perubahan data (Addendum, CCO, dan status persetujuan) secara kronologis.</p>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari riwayat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-zinc-55 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
        </div>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="py-16 text-center text-zinc-400 space-y-2">
          <ShieldAlert className="w-8 h-8 text-zinc-300 mx-auto" />
          <p className="font-semibold text-sm">Tidak ada riwayat aktivitas ditemukan.</p>
          <p className="text-xs">Aktivitas perubahan CCO, Addendum, dan parameter proyek akan dicatat otomatis di sini.</p>
        </div>
      ) : (
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 pl-6 space-y-6">
          {filteredLogs.map((log) => {
            const dateStr = new Date(log.timestamp).toLocaleString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div key={log.id} className="relative group">
                {/* Timeline Circle */}
                <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-350 dark:bg-zinc-700 border-2 border-white dark:border-zinc-950 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-colors" />
                
                <div className="bg-zinc-50/50 dark:bg-zinc-900/10 p-3 rounded-lg border border-zinc-150 dark:border-zinc-800/80 hover:border-zinc-250 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-tight border uppercase ${getActionBadgeColor(log.actionType)}`}>
                        {log.actionType}
                      </span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        {log.userName}
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-350 font-medium">{log.details}</p>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase shrink-0 whitespace-nowrap self-start md:self-center">
                    {dateStr}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
