"use client";
import { useRABStore } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";
import { calculateProjectTotals } from "@/components/ProjectList";

export default function RekapLintas() {
  const projects = useRABStore((s) => s.projects);

  const rows = projects.map((p) => {
    const { directCost, profit, tax, grandTotal } = calculateProjectTotals(p);
    const termin = p.paymentTerms || [];
    const terminLunas = termin.filter((t) => t.isPaid).length;
    const hasBast = !!p.bastDetails?.number;
    return { p, directCost, profit, tax, grandTotal, terminLunas, totalTermin: termin.length, hasBast };
  });

  const totalGrand = rows.reduce((s, r) => s + r.grandTotal, 0);
  const totalDirect = rows.reduce((s, r) => s + r.directCost, 0);

  if (projects.length === 0) {
    return <p className="text-center text-zinc-400 py-10 text-sm">Belum ada proyek.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-xs">
          <thead className="bg-zinc-50 dark:bg-zinc-900 text-[10px] uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Nama Proyek</th>
              <th className="px-4 py-3 text-right font-semibold">Biaya Langsung</th>
              <th className="px-4 py-3 text-right font-semibold">Overhead+Profit</th>
              <th className="px-4 py-3 text-right font-semibold">PPN</th>
              <th className="px-4 py-3 text-right font-semibold">Grand Total</th>
              <th className="px-4 py-3 text-center font-semibold">Termin Lunas</th>
              <th className="px-4 py-3 text-center font-semibold">BAST</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {rows.map(({ p, directCost, profit, tax, grandTotal, terminLunas, totalTermin, hasBast }) => (
              <tr key={p.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-900/30">
                <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100 max-w-[180px]">
                  <div className="line-clamp-1">{p.name}</div>
                  {p.description && <div className="text-[10px] text-zinc-400 font-normal line-clamp-1">{p.description}</div>}
                </td>
                <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">{formatRupiah(directCost)}</td>
                <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">{formatRupiah(profit)}</td>
                <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">{formatRupiah(tax)}</td>
                <td className="px-4 py-3 text-right font-bold text-zinc-900 dark:text-zinc-50">{formatRupiah(grandTotal)}</td>
                <td className="px-4 py-3 text-center">
                  {totalTermin > 0
                    ? <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${terminLunas === totalTermin ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>{terminLunas}/{totalTermin}</span>
                    : <span className="text-zinc-300 dark:text-zinc-700">—</span>}
                </td>
                <td className="px-4 py-3 text-center">
                  {hasBast
                    ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">✓ Ada</span>
                    : <span className="text-zinc-300 dark:text-zinc-700">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-zinc-100 dark:bg-zinc-900 border-t-2 border-zinc-300 dark:border-zinc-700">
            <tr>
              <td className="px-4 py-3 font-bold text-zinc-700 dark:text-zinc-300 text-[10px] uppercase tracking-wider">Total {projects.length} Proyek</td>
              <td className="px-4 py-3 text-right font-bold text-zinc-700 dark:text-zinc-300">{formatRupiah(totalDirect)}</td>
              <td colSpan={2} />
              <td className="px-4 py-3 text-right font-bold text-zinc-900 dark:text-zinc-50 text-sm">{formatRupiah(totalGrand)}</td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="text-[10px] text-zinc-400 text-right">* Grand Total sudah termasuk Overhead & Profit dan PPN masing-masing proyek.</p>
    </div>
  );
}
