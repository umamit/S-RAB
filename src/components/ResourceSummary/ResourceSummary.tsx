"use client";
import React from "react";
import { Project } from "@/lib/store";
import ResourceChart from "./ResourceChart";
import ResourceTable from "./ResourceTable";
import { Printer } from "lucide-react";

interface ResourceSummaryProps {
  project: Project;
  triggerPrint?: (mode: any) => void;
}

interface AggregatedResource {
  name: string;
  unit: string;
  totalQty: number;
  unitPrice: number;
  totalCost: number;
}

export default function ResourceSummary({ project, triggerPrint }: ResourceSummaryProps) {
  const materialsMap: Record<string, AggregatedResource> = {};
  const laborMap: Record<string, AggregatedResource> = {};
  const toolsMap: Record<string, AggregatedResource> = {};

  let itemsWithAhspCount = 0;
  let totalItemsCount = 0;

  project.subProjects.forEach((sub) => {
    sub.categories.forEach((cat) => {
      cat.items.forEach((item) => {
        totalItemsCount++;
        if (item.ahsp) {
          itemsWithAhspCount++;
          (item.ahsp.materials || []).forEach((mat) => {
            const key = `${mat.name.toLowerCase()}_${mat.unit.toLowerCase()}`;
            const qty = item.quantity * mat.coefficient;
            const cost = qty * mat.unitPrice;
            if (materialsMap[key]) {
              materialsMap[key].totalQty += qty;
              materialsMap[key].totalCost += cost;
            } else {
              materialsMap[key] = { name: mat.name, unit: mat.unit, totalQty: qty, unitPrice: mat.unitPrice, totalCost: cost };
            }
          });
          (item.ahsp.labor || []).forEach((lab) => {
            const key = `${lab.name.toLowerCase()}_${lab.unit.toLowerCase()}`;
            const qty = item.quantity * lab.coefficient;
            const cost = qty * lab.unitPrice;
            if (laborMap[key]) {
              laborMap[key].totalQty += qty;
              laborMap[key].totalCost += cost;
            } else {
              laborMap[key] = { name: lab.name, unit: lab.unit, totalQty: qty, unitPrice: lab.unitPrice, totalCost: cost };
            }
          });
          (item.ahsp.tools || []).forEach((tool) => {
            const key = `${tool.name.toLowerCase()}_${tool.unit.toLowerCase()}`;
            const qty = item.quantity * tool.coefficient;
            const cost = qty * tool.unitPrice;
            if (toolsMap[key]) {
              toolsMap[key].totalQty += qty;
              toolsMap[key].totalCost += cost;
            } else {
              toolsMap[key] = { name: tool.name, unit: tool.unit, totalQty: qty, unitPrice: tool.unitPrice, totalCost: cost };
            }
          });
        }
      });
    });
  });

  const materials = Object.values(materialsMap).sort((a, b) => b.totalCost - a.totalCost);
  const labor = Object.values(laborMap).sort((a, b) => b.totalCost - a.totalCost);
  const tools = Object.values(toolsMap).sort((a, b) => b.totalCost - a.totalCost);

  const totalMaterialsCost = materials.reduce((sum, r) => sum + r.totalCost, 0);
  const totalLaborCost = labor.reduce((sum, r) => sum + r.totalCost, 0);
  const totalToolsCost = tools.reduce((sum, r) => sum + r.totalCost, 0);
  const totalResourceCost = totalMaterialsCost + totalLaborCost + totalToolsCost;

  const matPercent = totalResourceCost > 0 ? (totalMaterialsCost / totalResourceCost) * 100 : 0;
  const labPercent = totalResourceCost > 0 ? (totalLaborCost / totalResourceCost) * 100 : 0;
  const toolPercent = totalResourceCost > 0 ? (totalToolsCost / totalResourceCost) * 100 : 0;

  return (
    <div className="space-y-8 bg-white dark:bg-zinc-955 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:p-0 print:border-none print:shadow-none">
      <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4 print:pb-2 print:border-b-2 print:border-zinc-800 flex justify-between items-end flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase print:text-center print:text-lg">Komparasi & Rekapitulasi Sumber Daya</h2>
          <p className="text-xs text-zinc-500 mt-1 print:hidden">Rangkuman akumulatif seluruh bahan baku, upah kerja, dan biaya sewa peralatan hasil ekstraksi koefisien AHSP SNI.</p>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          <div className="text-[10px] bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-lg font-semibold">
            Teranalisa AHSP: {itemsWithAhspCount} dari {totalItemsCount} item ({totalItemsCount > 0 ? ((itemsWithAhspCount / totalItemsCount) * 100).toFixed(0) : 0}%)
          </div>
          {triggerPrint && (
            <button
              onClick={() => triggerPrint("resource-only")}
              type="button"
              className="text-[11px] font-semibold bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak Kebutuhan
            </button>
          )}
        </div>
      </div>

      {totalResourceCost === 0 ? (
        <div className="text-center py-20 text-xs text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/20">Belum ada data sumber daya. Aktifkan Analisis AHSP SNI pada pekerjaan di tab "Rincian Detail (BOQ)" dan isi volume pekerjaan untuk melihat rekapitulasi.</div>
      ) : (
        <div className="space-y-8">
          <ResourceChart totalMaterialsCost={totalMaterialsCost} totalLaborCost={totalLaborCost} totalToolsCost={totalToolsCost} matPercent={matPercent} labPercent={labPercent} toolPercent={toolPercent} />
          <ResourceTable title="Daftar Belanja Kebutuhan Bahan (Material)" totalCost={totalMaterialsCost} list={materials} colNameLabel="Nama Material" priceLabel="Harga Dasar" />
          <ResourceTable title="Daftar Kebutuhan Tenaga Kerja (Upah Kerja)" totalCost={totalLaborCost} list={labor} colNameLabel="Kualifikasi Pekerja" priceLabel="Tarif Harian (OH)" />
          <ResourceTable title="Daftar Kebutuhan Peralatan Kerja" totalCost={totalToolsCost} list={tools} colNameLabel="Nama Peralatan" priceLabel="Tarif Dasar" />
        </div>
      )}
    </div>
  );
}
export type { AggregatedResource };
