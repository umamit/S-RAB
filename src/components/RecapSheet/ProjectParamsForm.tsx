"use client";
import React, { useState } from "react";
import ParamField from "./ParamField";

interface ProjectParamsFormProps {
  profitRate: number;
  taxRate: number;
  alertThreshold: number;
  pphRate: number;
  latitude?: number;
  longitude?: number;
  onSave: (
    profitRate: number,
    taxRate: number,
    alertThreshold: number,
    pphRate: number,
    latitude?: number,
    longitude?: number
  ) => void;
}

export default function ProjectParamsForm({
  profitRate,
  taxRate,
  alertThreshold,
  pphRate,
  latitude,
  longitude,
  onSave,
}: ProjectParamsFormProps) {
  const [profitInput, setProfitInput] = useState((profitRate * 100).toFixed(0));
  const [taxInput, setTaxInput] = useState((taxRate * 100).toFixed(0));
  const [thresholdInput, setThresholdInput] = useState(String(alertThreshold));
  const [pphInput, setPphInput] = useState(String(pphRate));
  const [latInput, setLatInput] = useState(latitude ? String(latitude) : "");
  const [lngInput, setLngInput] = useState(longitude ? String(longitude) : "");

  const [prevProps, setPrevProps] = useState({ profitRate, taxRate, alertThreshold, pphRate, latitude, longitude });

  if (
    prevProps.profitRate !== profitRate ||
    prevProps.taxRate !== taxRate ||
    prevProps.alertThreshold !== alertThreshold ||
    prevProps.pphRate !== pphRate ||
    prevProps.latitude !== latitude ||
    prevProps.longitude !== longitude
  ) {
    setPrevProps({ profitRate, taxRate, alertThreshold, pphRate, latitude, longitude });
    setProfitInput((profitRate * 100).toFixed(0));
    setTaxInput((taxRate * 100).toFixed(0));
    setThresholdInput(String(alertThreshold));
    setPphInput(String(pphRate));
    setLatInput(latitude ? String(latitude) : "");
    setLngInput(longitude ? String(longitude) : "");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      Number(profitInput) / 100,
      Number(taxInput) / 100,
      Math.max(1, Math.min(100, parseInt(thresholdInput) || 5)),
      Number(pphInput),
      latInput ? Number(latInput) : undefined,
      lngInput ? Number(lngInput) : undefined
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-center w-full">
      <ParamField id="profit-rate-input" label="Overhead:" suffix="%" value={profitInput} onChange={setProfitInput} min="0" max="100" step="1" />
      <ParamField id="tax-rate-input" label="PPN:" suffix="%" value={taxInput} onChange={setTaxInput} min="0" max="100" step="1" />
      <ParamField id="threshold-input" label="Batas Deviasi:" suffix="-%" value={thresholdInput} onChange={setThresholdInput} min="1" max="100" step="1" />

      <div className="flex-1 min-w-[160px] flex items-center gap-1.5">
        <label htmlFor="pph-rate-input" className="text-zinc-550 text-[10px] font-semibold shrink-0">PPh 4(2):</label>
        <select
          id="pph-rate-input"
          value={pphInput}
          onChange={(e) => setPphInput(e.target.value)}
          className="w-full px-2 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-400"
        >
          <option value="0">0% (Tanpa PPh)</option>
          <option value="0.02">2% (Kecil - SBU)</option>
          <option value="0.03">3% (Menengah/Besar)</option>
          <option value="0.04">4% (Non-SBU)</option>
        </select>
      </div>

      <ParamField id="lat-input" label="Latitude:" value={latInput} onChange={setLatInput} type="text" />
      <ParamField id="lng-input" label="Longitude:" value={lngInput} onChange={setLngInput} type="text" />

      <button
        type="submit"
        className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-lg text-xs shrink-0 self-stretch flex items-center justify-center"
      >
        Simpan
      </button>
    </form>
  );
}
export type { ProjectParamsFormProps };
