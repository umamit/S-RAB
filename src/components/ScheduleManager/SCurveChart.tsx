"use client";
import React, { useState } from "react";
import type { WeeklyFinancial } from "@/lib/store/types";

interface SCurveChartProps {
  totalProjectDirectCost: number;
  numWeeks: number;
  maxRecordedWeek: number;
  cumulativePlannedWeights: number[];
  weeklyActualWeights: number[];
  profitRate: number;
  taxRate: number;
  weeklyFinancials?: WeeklyFinancial[];
}

export default function SCurveChart({
  totalProjectDirectCost, numWeeks, maxRecordedWeek, cumulativePlannedWeights,
  weeklyActualWeights, profitRate, taxRate, weeklyFinancials,
}: SCurveChartProps) {
  const [chartMode, setChartMode] = useState<"physical" | "financial">("physical");

  const svgWidth = 550, svgHeight = 220, paddingX = 65, paddingY = 20;
  const graphWidth = svgWidth - paddingX * 2, graphHeight = svgHeight - paddingY * 2;
  const grandTotal = totalProjectDirectCost * (1 + profitRate) * (1 + taxRate);
  const maxVal = chartMode === "physical" ? 100 : grandTotal;

  const formatYAxis = (val: number) => {
    if (val >= 1000000000) return `Rp ${(val / 1000000000).toFixed(1)}M`;
    if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(1)}Jt`;
    if (val >= 1000) return `Rp ${(val / 1000).toFixed(0)}Rb`;
    return `Rp ${val}`;
  };

  const getCoordinates = (weekIdx: number, val: number) => {
    const x = paddingX + (weekIdx / (numWeeks - 1)) * graphWidth;
    const y = paddingY + graphHeight - (val / maxVal) * graphHeight;
    return { x, y };
  };

  const actualCosts = Array(numWeeks).fill(0);
  weeklyFinancials?.forEach((f) => {
    if (f.weekNumber <= numWeeks) actualCosts[f.weekNumber - 1] = f.actualCost;
  });

  const cumulativeActualCosts: number[] = [];
  let currentCostCumulative = 0;
  let maxFinancialWeek = 0;
  actualCosts.forEach((cost, idx) => { if (cost > 0) maxFinancialWeek = idx + 1; });
  const maxRecorded = Math.max(maxRecordedWeek, maxFinancialWeek);

  for (let w = 0; w < numWeeks; w++) {
    currentCostCumulative += actualCosts[w];
    cumulativeActualCosts.push(currentCostCumulative);
  }

  const buildPath = (isActual: boolean) => {
    if (numWeeks <= 1 || (isActual && maxRecorded === 0)) return "";
    const len = isActual ? maxRecorded : numWeeks;
    const startPt = getCoordinates(0, 0);
    let path = `M ${startPt.x} ${startPt.y}`;
    for (let w = 0; w < len; w++) {
      const val = isActual
        ? (chartMode === "physical" ? weeklyActualWeights[w] : cumulativeActualCosts[w])
        : (chartMode === "physical" ? cumulativePlannedWeights[w] : (cumulativePlannedWeights[w] / 100) * grandTotal);
      const pt = getCoordinates(w, val);
      path += ` L ${pt.x} ${pt.y}`;
    }
    return path;
  };

  return (
    <div className="lg:col-span-1 p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Grafik Kurva S Realisasi</h3>
          <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 bg-zinc-50 dark:bg-zinc-900 shrink-0">
            {(["physical", "financial"] as const).map((mode) => (
              <button key={mode} onClick={() => setChartMode(mode)} type="button"
                className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
                  chartMode === mode ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow-xs" : "text-zinc-400"
                }`}>
                {mode === "physical" ? "Fisik (%)" : "Keuangan (Rp)"}
              </button>
            ))}
          </div>
        </div>

        {totalProjectDirectCost > 0 ? (
          <div className="w-full">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto text-zinc-300 dark:text-zinc-700">
              {[0, 25, 50, 75, 105].map((pct) => {
                const val = chartMode === "physical" ? pct : (pct / 100) * grandTotal;
                const y = paddingY + graphHeight - (pct / 100) * graphHeight;
                return (
                  <g key={pct} className="opacity-20 dark:opacity-10">
                    <line x1={paddingX} y1={y} x2={svgWidth - paddingX} y2={y} stroke="currentColor" strokeWidth={1} strokeDasharray="4 4" />
                    <text x={paddingX - 10} y={y + 3} className="text-[9px] fill-zinc-500 font-medium" textAnchor="end">
                      {chartMode === "physical" ? `${pct}%` : formatYAxis(val)}
                    </text>
                  </g>
                );
              })}

              {Array(numWeeks).fill(0).map((_, idx) => {
                if (idx === 0 || idx === numWeeks - 1 || idx % 2 === 0) {
                  const x = paddingX + (idx / (numWeeks - 1)) * graphWidth;
                  return (
                    <g key={idx} className="opacity-20 dark:opacity-10">
                      <line x1={x} y1={paddingY} x2={x} y2={paddingY + graphHeight} stroke="currentColor" strokeWidth={1} />
                      <text x={x} y={paddingY + graphHeight + 14} className="text-[9px] fill-zinc-500" textAnchor="middle">M{idx + 1}</text>
                    </g>
                  );
                }
                return null;
              })}

              {buildPath(false) && (
                <path d={buildPath(false)} fill="none" className="stroke-zinc-400 dark:stroke-zinc-650" strokeWidth={1.5} strokeDasharray="3 3" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {buildPath(true) && (
                <path d={buildPath(true)} fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-zinc-400">Isi lembar kerja RAB terlebih dahulu untuk memproyeksikan Kurva S.</div>
        )}
      </div>
    </div>
  );
}
