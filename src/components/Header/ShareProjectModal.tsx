"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Share2, Trash2, X, Shield } from "lucide-react";

interface ShareProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
}

interface ShareRecord {
  id: string;
  shared_to_email: string;
  role: "editor" | "verifier" | "viewer";
}

export default function ShareProjectModal({ isOpen, onClose, projectId, projectName }: ShareProjectModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"editor" | "verifier" | "viewer">("viewer");
  const [shares, setShares] = useState<ShareRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchShares = async () => {
    try {
      const { data, error } = await supabase
        .from("project_shares")
        .select("id, shared_to_email, role")
        .eq("project_id", projectId);
      if (error) throw error;
      setShares(data || []);
    } catch (err) {
      console.error("Error fetching shares:", err);
    }
  };

  useEffect(() => {
    if (isOpen && projectId) {
      fetchShares();
      setMessage("");
      setEmail("");
    }
  }, [isOpen, projectId]);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("project_shares")
        .insert({
          project_id: projectId,
          shared_to_email: email.trim().toLowerCase(),
          role,
        });
      if (error) throw error;
      setMessage("Berhasil membagikan proyek!");
      setEmail("");
      fetchShares();
    } catch (err: any) {
      setMessage(`Gagal membagikan: ${err.message || "Kesalahan tidak dikenal"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (shareId: string) => {
    if (!confirm("Cabut hak akses untuk email ini?")) return;
    try {
      const { error } = await supabase
        .from("project_shares")
        .delete()
        .eq("id", shareId);
      if (error) throw error;
      fetchShares();
    } catch (err: any) {
      alert(`Gagal mencabut: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl relative space-y-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 p-1">
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Share2 className="w-4 h-4 text-zinc-500" /> Kolaborasi Proyek: {projectName}
        </h3>

        <form onSubmit={handleShare} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-zinc-450">Email Rekan Kerja</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com"
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-zinc-450">Hak Akses Peran (Role)</label>
            <select value={role} onChange={(e) => setRole(e.target.value as any)}
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 font-semibold">
              <option value="viewer">Viewer (Hanya Melihat &amp; Cetak)</option>
              <option value="verifier">Verifier (Isi Progres &amp; Log Harian)</option>
              <option value="editor">Editor (Ubah Anggaran RAB &amp; AHSP)</option>
            </select>
          </div>

          {message && <p className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">{message}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold rounded-lg text-xs transition-colors disabled:opacity-50">
            {loading ? "Membagikan..." : "Kirim Undangan Akses"}
          </button>
        </form>

        <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <h4 className="text-[10px] uppercase font-bold text-zinc-450">Pengguna yang Memiliki Akses</h4>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {shares.map((s) => (
              <div key={s.id} className="flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/30 p-2.5 rounded-lg border border-zinc-150 dark:border-zinc-800/80 text-xs">
                <div className="truncate pr-2">
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">{s.shared_to_email}</p>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider inline-flex items-center gap-1"><Shield className="w-2.5 h-2.5" /> {s.role}</span>
                </div>
                <button onClick={() => handleRevoke(s.id)} className="text-zinc-400 hover:text-red-500 p-1 shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {shares.length === 0 && <p className="text-[10px] text-zinc-450 italic py-2">Proyek belum dibagikan dengan siapapun.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
