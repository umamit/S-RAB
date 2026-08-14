"use client";
import React, { useState } from "react";
import { Project, useRABStore } from "@/lib/store";
import { Printer } from "lucide-react";
import BASTPrintView from "./BASTPrintView";

interface BASTManagerProps {
  project: Project;
}

export default function BASTManager({ project }: BASTManagerProps) {
  const { updateProject } = useRABStore();
  const [number, setNumber] = useState(project.bastDetails?.number || "");
  const [date, setDate] = useState(project.bastDetails?.date || new Date().toISOString().split("T")[0]);
  const [firstPartyName, setFirstPartyName] = useState(project.bastDetails?.firstPartyName || "");
  const [firstPartyRole, setFirstPartyRole] = useState(project.bastDetails?.firstPartyRole || "Direktur Utama");
  const [secondPartyName, setSecondPartyName] = useState(project.bastDetails?.secondPartyName || "");
  const [secondPartyRole, setSecondPartyRole] = useState(project.bastDetails?.secondPartyRole || "Pejabat Pembuat Komitmen (PPK)");
  const [notes, setNotes] = useState(project.bastDetails?.notes || "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(project.id, {
      bastDetails: {
        number,
        date,
        firstPartyName,
        firstPartyRole,
        secondPartyName,
        secondPartyRole,
        notes,
      },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:bg-white print:border-none print:shadow-none print:p-0">
      {/* Form Section */}
      <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-4 print:hidden">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">Formulir BAST</h3>
        <p className="text-xs text-zinc-500">Lengkapi formulir untuk generate dokumen Berita Acara Serah Terima pekerjaan.</p>
        
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-zinc-550">Nomor BAST</label>
            <input type="text" required value={number} onChange={(e) => setNumber(e.target.value)} placeholder="01/BAST/RAB/2026" className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-zinc-550">Tanggal Serah Terima</label>
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-zinc-550">Nama Pihak Pertama (Penyedia)</label>
            <input type="text" required value={firstPartyName} onChange={(e) => setFirstPartyName(e.target.value)} placeholder="Agus Supriyadi" className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-zinc-550">Jabatan Pihak Pertama</label>
            <input type="text" required value={firstPartyRole} onChange={(e) => setFirstPartyRole(e.target.value)} className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-zinc-550">Nama Pihak Kedua (Owner/PPK)</label>
            <input type="text" required value={secondPartyName} onChange={(e) => setSecondPartyName(e.target.value)} placeholder="Dr. Hermawan" className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-zinc-550">Jabatan Pihak Kedua</label>
            <input type="text" required value={secondPartyRole} onChange={(e) => setSecondPartyRole(e.target.value)} className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-zinc-550">Catatan/Justifikasi Pekerjaan</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Pekerjaan selesai 100% dengan kualitas memuaskan." className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg resize-none" />
          </div>
          
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 py-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-lg font-bold transition-colors">
              Simpan Data
            </button>
            {project.bastDetails && (
              <button type="button" onClick={handlePrint} className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-950 text-zinc-600 dark:text-zinc-400">
                <Printer className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="lg:col-span-8 bg-zinc-100/50 dark:bg-zinc-900/20 p-2 md:p-6 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 overflow-y-auto max-h-[700px] print:max-h-none print:border-none print:shadow-none print:bg-white print:p-0 print:overflow-visible">
        {project.bastDetails ? (
          <BASTPrintView project={project} bast={project.bastDetails} />
        ) : (
          <div className="py-24 text-center text-zinc-400 space-y-2">
            <p className="font-semibold text-sm">Belum ada Draft BAST.</p>
            <p className="text-xs">Isi formulir BAST di sebelah kiri dan klik Simpan Data untuk men-generate dokumen resmi.</p>
          </div>
        )}
      </div>
    </div>
  );
}
