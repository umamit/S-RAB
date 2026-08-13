"use client";
import React from "react";

interface SCurveChartProps {
  totalProjectDirectCost: number;
  numWeeks: number;
  maxRecordedWeek: number;
  cumulativePlannedWeights: number[];
  weeklyActualWeights: number[];
}

export default function SCurveChart({
  totalProjectDirectCost,
  numWeeks,
  maxRecordedWeek,
  cumulativePlannedWeights,
  weeklyActualWeights,
}: SCurveChartProps) {
  const svgWidth = 500;
  const svgHeight = 200;
  const paddingX = 40;
  const paddingY = 20;
  const graphWidth = svgWidth - paddingX * 2;
  const graphHeight = svgHeight - paddingY * 2;

  const getCoordinates = (weekIdx: number, percentage: number) => {
    const x = paddingX + (weekIdx / (numWeeks - 1)) * graphWidth;
    const y = paddingY + graphHeight - (percentage / 100) * graphHeight;
    return { x, y };
  };

  let sCurvePath = "";
  if (numWeeks > 1) {
    const startPt = getCoordinates(0, 0);
    sCurvePath = `M ${startPt.x} ${startPt.y}`;
    for (let w = 0; w < numWeeks; w++) {
      const pt = getCoordinates(w, cumulativePlannedWeights[w]);
      sCurvePath += ` L ${pt.x} ${pt.y}`;
    }
  }

  let actualSCurvePath = "";
  if (numWeeks > 1 && maxRecordedWeek > 0) {
    const startPt = getCoordinates(0, 0);
    actualSCurvePath = `M ${startPt.x} ${startPt.y}`;
    for (let w = 0; w < maxRecordedWeek; w++) {
      const pt = getCoordinates(w, weeklyActualWeights[w]);
      actualSCurvePath += ` L ${pt.x} ${pt.y}`;
    }
  }

  return (
    <div className="lg:col-span-1 p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-4">
          Grafik Kurva S Realisasi
        </h3>

        {totalProjectDirectCost > 0 ? (
          <div className="w-full">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto text-zinc-300 dark:text-zinc-700">
              {[0, 25, 50, 75, 100].map((pct) => {
                const y = paddingY + graphHeight - (pct / 100) * graphHeight;
                return (
                  <g key={pct} className="opacity-20 dark:opacity-10">
                    <line x1={paddingX} y1={y} x2={svgWidth - paddingX} y2={y} stroke="currentColor" strokeWidth={1} strokeDasharray="4 4" />
                    <text x={paddingX - 10} y={y + 4} className="text-[10px] fill-zinc-500 text-right" textAnchor="end">{pct}%</text>
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

              {sCurvePath && (
                <path d={sCurvePath} fill="none" className="stroke-zinc-400 dark:stroke-zinc-600 transition-all duration-300" strokeWidth={1.5} strokeDasharray="3 3" strokeLinecap="round" strokeLinejoin="round" />
              )}

              {actualSCurvePath && (
                <path d={actualSCurvePath} fill="none" className="stroke-emerald-600 dark:stroke-emerald-400 transition-all duration-300" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              )}

              {cumulativePlannedWeights.map((pct, idx) => {
                const pt = getCoordinates(idx, pct);
                return <circle key={`plan-${idx}`} cx={pt.x} cy={pt.y} r={2.5} className="fill-zinc-400 dark:fill-zinc-650" />;
              })}

              {Array(maxRecordedWeek).fill(0).map((_, idx) => {
                const pt = getCoordinates(idx, weeklyActualWeights[idx]);
                return <circle key={`act-${idx}`} cx={pt.x} cy={pt.y} r={4} className="fill-emerald-600 dark:fill-emerald-400 stroke-white dark:stroke-zinc-950 transition-all duration-300" strokeWidth={1.5} />;
              })}
            </svg>

            <div className="flex gap-4 items-center justify-center text-[10px] font-semibold text-zinc-500 mt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 border-t border-dashed border-zinc-400" />
                <span>Rencana S-Curve</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded" />
                <span>Realisasi Lapangan</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-zinc-400">Isi lembar kerja RAB terlebih dahulu untuk memproyeksikan Kurva S.</div>
        )}
      </div>

      <div className="mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-3 text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
        Garis putus-putus menunjukkan target progres rencana. Garis hijau solid menunjukkan perkembangan progres fisik riil lapangan.
      </div>
    </div>
  );
}
