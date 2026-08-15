"use client";
import { useEffect, useRef, useState } from "react";
import { useRABStore } from "@/lib/store";
import { Check } from "lucide-react";

export default function SaveIndicator() {
  const projects = useRABStore((s) => s.projects);
  const [visible, setVisible] = useState(false);
  const isFirst = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2500);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [projects]);

  return (
    <div className={`flex items-center gap-1 text-[10px] font-semibold text-green-600 dark:text-green-400 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
      <Check className="w-3 h-3" />
      Tersimpan
    </div>
  );
}
