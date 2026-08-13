"use client";
import { useEffect, useRef } from "react";
import UserGuide from "../UserGuide/UserGuide";

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserGuideModal({ isOpen, onClose }: UserGuideModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  return (
    <dialog ref={dialogRef} closedby="any"
      className="fixed inset-0 m-auto backdrop:bg-black/60 backdrop:backdrop-blur-sm bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto focus:outline-none transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Buku Panduan S-RAB</h3>
        <button onClick={onClose} type="button" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-250 transition-colors p-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="overflow-y-auto pr-1">
        <UserGuide />
      </div>
    </dialog>
  );
}
