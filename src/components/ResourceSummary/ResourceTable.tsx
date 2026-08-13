"use client";
import React from "react";
import { formatRupiah } from "@/lib/excel-export";

interface AggregatedResource {
  name: string;
  unit: string;
  totalQty: number;
  unitPrice: number;
  totalCost: number;
}

interface ResourceTableProps {
  title: string;
  totalCost: number;
  list: AggregatedResource[];
  colNameLabel: string;
  priceLabel: string;
}

export default function ResourceTable({
  title,
  totalCost,
  list,
  colNameLabel,
  priceLabel,
}: ResourceTableProps) {
  if (list.length === 0) return null;

  return (
    <div className="space-y-2 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm print:border-zinc-400 print:shadow-none print-break-before">
      <div className="bg-zinc-50 dark:bg-zinc-900/60 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center print:bg-zinc-100 print:border-zinc-400">
        <span className="font-bold text-xs uppercase text-zinc-850 dark:text-zinc-200">
          {title}
        </span>
        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
          Total: {formatRupiah(totalCost)}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-zinc-100/50 dark:bg-zinc-900/10 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-2 px-4 w-12 text-center">No.</th>
              <th className="py-2 px-4">{colNameLabel}</th>
              <th className="py-2 px-4 w-28 text-right">Volume</th>
              <th className="py-2 px-4 w-20 text-center">Satuan</th>
              <th className="py-2 px-4 w-32 text-right">{priceLabel}</th>
              <th className="py-2 px-4 w-36 text-right">Jumlah Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {list.map((item, i) => (
              <tr key={item.name} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 text-zinc-700 dark:text-zinc-300 font-medium">
                <td className="py-2 px-4 text-center text-zinc-400">{i + 1}</td>
                <td className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</td>
                <td className="py-2 px-4 text-right font-bold">
                  {item.totalQty.toLocaleString("id-ID", { maximumFractionDigits: 3 })}
                </td>
                <td className="py-2 px-4 text-center text-zinc-400">{item.unit}</td>
                <td className="py-2 px-4 text-right">{formatRupiah(item.unitPrice)}</td>
                <td className="py-2 px-4 text-right font-bold text-zinc-900 dark:text-zinc-50">{formatRupiah(item.totalCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
