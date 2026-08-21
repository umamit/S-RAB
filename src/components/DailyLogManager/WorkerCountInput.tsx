import React from "react";

interface WorkerCountInputProps {
  id: string;
  label: string;
  val: number;
  setVal: (v: number) => void;
}

export default function WorkerCountInput({ id, label, val, setVal }: WorkerCountInputProps) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-zinc-900 px-2 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <label htmlFor={id} className="font-semibold text-zinc-650 dark:text-zinc-400">{label}</label>
      <input
        id={id}
        type="number"
        min={0}
        value={val || ""}
        onChange={(e) => setVal(Math.max(0, parseInt(e.target.value) || 0))}
        className="w-10 text-right bg-transparent focus:outline-none font-bold"
      />
    </div>
  );
}
