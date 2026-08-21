"use client";
import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { parseBoqWithGroq, type ParsedBoqResult } from "@/lib/rag/boqParserService";
import { useRABStore, type Project } from "@/lib/store";
import ParserInputStep from "./ParserInputStep";
import ParserPreviewStep from "./ParserPreviewStep";

interface SmartParserModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export default function SmartParserModal({ isOpen, onClose, project }: SmartParserModalProps) {
  const { addSubProject, customAHSPTemplates } = useRABStore();
  const [step, setStep] = useState<"input" | "preview">("input");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [parsedResult, setParsedResult] = useState<ParsedBoqResult | null>(null);

  if (!isOpen) return null;

  const handleParse = async (rawText: string) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await parseBoqWithGroq(rawText, customAHSPTemplates);
      setParsedResult(result);
      setStep("preview");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat memproses data dengan AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = () => {
    if (!parsedResult) return;
    const store = useRABStore.getState();
    const subName = parsedResult.subProjectName || "Hasil Ekstraksi AI";
    store.addSubProject(project.id, subName);

    const updatedProj = useRABStore.getState().projects.find((p) => p.id === project.id);
    const newSub = updatedProj?.subProjects.find((s) => s.name === subName) || updatedProj?.subProjects[updatedProj.subProjects.length - 1];

    if (newSub) {
      parsedResult.categories.forEach((cat) => {
        store.addCategory(project.id, newSub.id, cat.name);
        const latestSub = useRABStore.getState().projects.find((p) => p.id === project.id)?.subProjects.find((s) => s.id === newSub.id);
        const newCat = latestSub?.categories.find((c) => c.name === cat.name) || latestSub?.categories[latestSub.categories.length - 1];
        if (newCat) {
          cat.items.forEach((item) => {
            store.addItem(project.id, newSub.id, newCat.id, {
              name: item.name,
              unit: item.unit,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              ahsp: item.ahsp,
            });
          });
        }
      });
    }

    onClose();
    setStep("input");
    setParsedResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] flex flex-col p-6 space-y-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 p-1">
          <X className="w-4 h-4" />
        </button>

        <div className="border-b border-zinc-150 dark:border-zinc-800/80 pb-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">AI Smart BOQ Parser (RAG)</h3>
            <p className="text-[11px] text-zinc-400">Ekstraksi otomatis dokumen/teks BoQ dan cocokkan ke koefisien AHSP PUPR SNI.</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 rounded-xl text-xs text-red-600 dark:text-red-400 font-semibold">
            ⚠️ {error}
          </div>
        )}

        {step === "input" ? (
          <ParserInputStep onParse={handleParse} isLoading={isLoading} />
        ) : (
          parsedResult && (
            <ParserPreviewStep result={parsedResult} onBack={() => setStep("input")} onImport={handleImport} />
          )
        )}
      </div>
    </div>
  );
}
