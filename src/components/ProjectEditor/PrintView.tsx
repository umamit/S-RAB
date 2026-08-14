"use client";
import { formatRupiah } from "@/lib/excel-export";
import type { Project } from "@/lib/store";
import RecapSheet from "@/components/RecapSheet";
import DailyLogManager from "@/components/DailyLogManager";
import ProgressTracker from "@/components/ProgressTracker";
import ResourceSummary from "@/components/ResourceSummary";

interface PrintViewProps {
  project: Project;
  totalDirectCost: number;
}

export default function PrintView({ project, totalDirectCost }: PrintViewProps) {
  return (
    <div className="hidden print:block space-y-12">
      <RecapSheet project={project} />

      {project.subProjects.map((sub) => {
        const subtotal = sub.categories.reduce((acc, cat) =>
          acc + cat.items.reduce((sum, item) => sum + item.total, 0), 0);
        const subWeight = totalDirectCost > 0 ? (subtotal / totalDirectCost) * 100 : 0;

        return (
          <div key={sub.id} className="print-break-before space-y-4">
            <div className="border-b-2 border-zinc-800 pb-2">
              <h2 className="text-base font-bold uppercase tracking-tight text-center">
                Rincian Pekerjaan: {sub.name.toUpperCase()}
              </h2>
              <div className="flex justify-between text-[10px] mt-1 italic font-medium">
                <span>Proyek: {project.name}</span>
                <span>Bobot Divisi: {subWeight.toFixed(2)}% | Subtotal: {formatRupiah(subtotal)}</span>
              </div>
            </div>

            {sub.categories.map((category) => {
              const catSubtotal = category.items.reduce((sum, i) => sum + i.total, 0);
              const catWeight = totalDirectCost > 0 ? (catSubtotal / totalDirectCost) * 100 : 0;
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold bg-zinc-100 px-2 py-1 border border-zinc-400">
                    <span>{category.name.toUpperCase()}</span>
                    <span>Subtotal: {formatRupiah(catSubtotal)} ({catWeight.toFixed(2)}%)</span>
                  </div>
                  <table className="w-full text-[10px] border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border border-zinc-400 font-bold">
                        <th className="py-1 px-2 w-8 text-center border border-zinc-400">No.</th>
                        <th className="py-1 px-2 border border-zinc-400">Uraian Pekerjaan</th>
                        <th className="py-1 px-2 w-14 text-center border border-zinc-400">Satuan</th>
                        <th className="py-1 px-2 w-16 text-right border border-zinc-400">Vol Rencana</th>
                        <th className="py-1 px-2 w-16 text-right border border-zinc-400">Vol Realisasi</th>
                        <th className="py-1 px-2 w-24 text-right border border-zinc-400">Harga Satuan</th>
                        <th className="py-1 px-2 w-16 text-right border border-zinc-400">Bobot (%)</th>
                        <th className="py-1 px-2 w-28 text-right border border-zinc-400">Jumlah Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, index) => {
                        const itemWeight = totalDirectCost > 0 ? (item.total / totalDirectCost) * 100 : 0;
                        return (
                          <tr key={item.id} className="border border-zinc-400">
                            <td className="py-1 px-2 text-center border border-zinc-400">{index + 1}</td>
                            <td className="py-1 px-2 border border-zinc-400">{item.name}</td>
                            <td className="py-1 px-2 text-center border border-zinc-400">{item.unit}</td>
                            <td className="py-1 px-2 text-right border border-zinc-400">{item.quantity}</td>
                            <td className="py-1 px-2 text-right border border-zinc-400">{item.actualQuantity ?? 0}</td>
                            <td className="py-1 px-2 text-right border border-zinc-400">{formatRupiah(item.unitPrice)}</td>
                            <td className="py-1 px-2 text-right border border-zinc-400">{itemWeight.toFixed(2)}%</td>
                            <td className="py-1 px-2 text-right font-bold border border-zinc-400">{formatRupiah(item.total)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        );
      })}

      <div className="print-break-before space-y-4"><DailyLogManager project={project} /></div>
      <div className="print-break-before space-y-4"><ProgressTracker project={project} /></div>
      <div className="print-break-before space-y-4"><ResourceSummary project={project} /></div>
    </div>
  );
}
