"use client";
import { useEffect, useRef } from "react";
import { useRABStore } from "@/lib/store";
import ProjectForm from "./ProjectForm";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const addProject = useRABStore((state) => state.addProject);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width
      );
      if (!isInside) onClose();
    };

    if (!("closedBy" in HTMLDialogElement.prototype)) {
      dialog.addEventListener("click", handleBackdropClick);
      return () => dialog.removeEventListener("click", handleBackdropClick);
    }
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  const handleSubmit = (data: { name: string; description: string; taxRate: number; profitRate: number; templateType: string }) => {
    addProject(data.name, data.description, data.taxRate, data.profitRate, data.templateType);
    onClose();
  };

  return (
    <dialog ref={dialogRef} closedby="any"
      className="backdrop:bg-black/60 backdrop:backdrop-blur-sm bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-2xl max-w-md w-full focus:outline-none transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <h3 className="text-lg font-semibold tracking-tight">Buat Proyek RAB Baru</h3>
        <button onClick={onClose} type="button" className="text-zinc-400 hover:text-zinc-655 transition-colors p-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ProjectForm onSubmit={handleSubmit} onCancel={onClose} />
    </dialog>
  );
}
