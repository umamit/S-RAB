"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";
import type { Project, BASTDetails } from "@/lib/store";

interface BASTPrintViewProps {
  project: Project;
  bast: BASTDetails;
}

export default function BASTPrintView({ project, bast }: BASTPrintViewProps) {
  // Hitung total RAB
  const totalDirectCost = project.subProjects.reduce(
    (sum, sub) => sum + sub.categories.reduce(
      (cs, cat) => cs + cat.items.reduce((is, item) => is + item.total, 0), 0), 0);
  const profit = totalDirectCost * project.profitRate;
  const tax = (totalDirectCost + profit) * project.taxRate;
  const grandTotal = totalDirectCost + profit + tax;

  const totalAddendum = (project.addendums || []).reduce((sum, add) => {
    return sum + add.items.reduce((s, item) => {
      const current = item.quantity * item.unitPrice;
      if (item.type === "add") return s + current;
      if (item.type === "remove") return s - current;
      const orig = (item.originalQuantity ?? 0) * (item.originalUnitPrice ?? 0);
      return s + (current - orig);
    }, 0);
  }, 0);

  const totalCCO = (project.ccos || [])
    .filter((c) => c.status === "Disetujui")
    .reduce((sum, cco) => {
      return sum + cco.items.reduce((s, item) => {
        const current = item.quantity * item.unitPrice;
        if (item.type === "add") return s + current;
        if (item.type === "remove") return s - current;
        const orig = (item.originalQuantity ?? 0) * (item.originalUnitPrice ?? 0);
        return s + (current - orig);
      }, 0);
    }, 0);

  const finalContractTotal = grandTotal + totalAddendum + totalCCO;

  // Format tanggal hari ini
  const formattedDate = new Date(bast.date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white text-zinc-950 p-8 max-w-2xl mx-auto border border-zinc-200 shadow-sm print:border-none print:shadow-none font-serif text-[11px] leading-relaxed">
      <div className="text-center space-y-1 border-b-2 border-zinc-950 pb-4 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider">BERITA ACARA SERAH TERIMA PEKERJAAN (BAST)</h2>
        <p className="text-[10px] font-semibold">Nomor: {bast.number}</p>
      </div>

      <p className="mb-4">
        Pada hari ini, <strong>{formattedDate}</strong>, yang bertanda tangan di bawah ini masing-masing pihak:
      </p>

      <div className="space-y-4 mb-6 pl-4">
        <div className="grid grid-cols-12 gap-1">
          <span className="col-span-1 font-bold">I.</span>
          <div className="col-span-11 space-y-1">
            <p><strong>{bast.firstPartyName}</strong> — <em>{bast.firstPartyRole}</em></p>
            <p className="text-zinc-600">Bertindak untuk dan atas nama penyedia jasa konstruksi, selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-1">
          <span className="col-span-1 font-bold">II.</span>
          <div className="col-span-11 space-y-1">
            <p><strong>{bast.secondPartyName}</strong> — <em>{bast.secondPartyRole}</em></p>
            <p className="text-zinc-600">Bertindak untuk dan atas nama pemilik proyek / owner, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</p>
          </div>
        </div>
      </div>

      <p className="mb-4">
        Kedua belah pihak dengan ini menyatakan bahwa <strong>PIHAK PERTAMA</strong> telah menyelesaikan seluruh tahapan pekerjaan fisik lapangan 100% untuk proyek <strong>{project.name}</strong> dengan rincian nilai kontrak sebagai berikut:
      </p>

      <table className="w-full border-collapse mb-6 text-[10px] table-fixed">
        <tbody>
          <tr className="border-b border-zinc-200">
            <td className="py-1.5 font-semibold w-1/2">1. Nilai Kontrak Awal (Grand Total)</td>
            <td className="py-1.5 text-right w-1/2 font-bold">{formatRupiah(grandTotal)}</td>
          </tr>
          <tr className="border-b border-zinc-200">
            <td className="py-1.5 font-semibold">2. Kumulatif Addendum Kontrak (PTK)</td>
            <td className={`py-1.5 text-right font-bold ${totalAddendum >= 0 ? "text-emerald-700" : "text-red-600"}`}>
              {totalAddendum >= 0 ? "+" : ""}{formatRupiah(totalAddendum)}
            </td>
          </tr>
          <tr className="border-b border-zinc-200">
            <td className="py-1.5 font-semibold">3. Kumulatif CCO Lapangan Disetujui</td>
            <td className={`py-1.5 text-right font-bold ${totalCCO >= 0 ? "text-emerald-700" : "text-red-600"}`}>
              {totalCCO >= 0 ? "+" : ""}{formatRupiah(totalCCO)}
            </td>
          </tr>
          <tr className="bg-zinc-50 font-bold border-b-2 border-zinc-950">
            <td className="py-2">TOTAL NILAI KONTRAK AKHIR</td>
            <td className="py-2 text-right">{formatRupiah(finalContractTotal)}</td>
          </tr>
        </tbody>
      </table>

      {bast.notes && (
        <div className="mb-6 bg-zinc-50 p-3 rounded border border-zinc-250 italic">
          <strong className="block not-italic text-[10px] font-bold uppercase mb-1">Catatan Tambahan:</strong>
          {bast.notes}
        </div>
      )}

      <p className="mb-8">
        Demikian Berita Acara Serah Terima ini dibuat dalam rangkap yang cukup untuk digunakan sebagaimana mestinya oleh kedua belah pihak.
      </p>

      <div className="grid grid-cols-2 gap-8 text-center pt-4">
        <div className="space-y-16">
          <div className="flex flex-col">
            <span className="uppercase text-[9px] font-bold text-zinc-500">Penyedia Jasa (Pihak Pertama)</span>
            <span className="font-semibold">{bast.firstPartyRole}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold underline uppercase">{bast.firstPartyName}</span>
          </div>
        </div>

        <div className="space-y-16">
          <div className="flex flex-col">
            <span className="uppercase text-[9px] font-bold text-zinc-500">Pengguna Jasa (Pihak Kedua)</span>
            <span className="font-semibold">{bast.secondPartyRole}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold underline uppercase">{bast.secondPartyName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
