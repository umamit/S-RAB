"use client";
import { useState, useRef } from "react";
import { useRABStore } from "@/lib/store";
import { compressImage } from "@/lib/utils/imageCompressor";
import { uploadPhoto } from "@/lib/utils/storageUploader";
import WorkerCountInput from "./WorkerCountInput";

interface DailyLogFormProps {
  projectId: string;
  onSubmit: (data: {
    date: string;
    weather: string;
    pekerjaCount: number;
    tukangCount: number;
    kepalaTukangCount: number;
    mandorCount: number;
    notes: string;
    photos?: string[];
  }) => void;
}

export default function DailyLogForm({ projectId, onSubmit }: DailyLogFormProps) {
  const { currentUser } = useRABStore();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [weather, setWeather] = useState("Cerah");
  const [notes, setNotes] = useState("");
  const [pekerjaCount, setPekerjaCount] = useState(0);
  const [tukangCount, setTukangCount] = useState(0);
  const [kepalaTukangCount, setKepalaTukangCount] = useState(0);
  const [mandorCount, setMandorCount] = useState(0);

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (selected.length > 3) {
        setErrorMsg("Maksimal upload 3 foto per hari.");
        setFiles(selected.slice(0, 3));
      } else {
        setErrorMsg("");
        setFiles(selected);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;
    setUploading(true);
    setErrorMsg("");

    try {
      const uploadedUrls: string[] = [];
      const userId = currentUser?.id || "user-default";

      for (const file of files) {
        const compressed = await compressImage(file);
        const url = await uploadPhoto(userId, projectId, date, compressed);
        uploadedUrls.push(url);
      }

      onSubmit({
        date,
        weather,
        pekerjaCount,
        tukangCount,
        kepalaTukangCount,
        mandorCount,
        notes: notes.trim(),
        photos: uploadedUrls.length > 0 ? uploadedUrls : undefined,
      });

      // Reset
      setNotes("");
      setPekerjaCount(0);
      setTukangCount(0);
      setKepalaTukangCount(0);
      setMandorCount(0);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal mengunggah foto.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-1 space-y-4 print:hidden bg-zinc-50/50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Buat Laporan Baru</h3>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label htmlFor="log-date" className="text-[10px] uppercase font-bold tracking-wider text-zinc-450">Tanggal</label>
          <input id="log-date" type="date" required value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium focus:outline-none" />
        </div>
        <div className="space-y-1">
          <label htmlFor="log-weather" className="text-[10px] uppercase font-bold tracking-wider text-zinc-450">Cuaca</label>
          <select id="log-weather" value={weather} onChange={(e) => setWeather(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium focus:outline-none">
            <option value="Cerah">Cerah</option>
            <option value="Mendung">Mendung</option>
            <option value="Gerimis">Gerimis</option>
            <option value="Hujan">Hujan</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450">Tenaga Kerja</span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <WorkerCountInput id="count-pekerja" label="Pekerja" val={pekerjaCount} setVal={setPekerjaCount} />
          <WorkerCountInput id="count-tukang" label="Tukang" val={tukangCount} setVal={setTukangCount} />
          <WorkerCountInput id="count-kepala" label="Kep. Tukang" val={kepalaTukangCount} setVal={setKepalaTukangCount} />
          <WorkerCountInput id="count-mandor" label="Mandor" val={mandorCount} setVal={setMandorCount} />
        </div>
      </div>

      <div className="space-y-1 pt-1">
        <label htmlFor="log-desc" className="text-[10px] uppercase font-bold tracking-wider text-zinc-450">Uraian & Hambatan</label>
        <textarea id="log-desc" required rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
          placeholder="Uraian pekerjaan..." className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none leading-relaxed" />
      </div>

      <div className="space-y-1 pt-1">
        <label htmlFor="log-photos" className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 block">Upload Foto (Max 3)</label>
        <input id="log-photos" type="file" accept="image/*" multiple onChange={handleFileChange} ref={fileInputRef}
          className="w-full text-xs text-zinc-550 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-zinc-100 dark:file:bg-zinc-800 file:text-zinc-700 dark:file:text-zinc-300 hover:file:bg-zinc-200 dark:hover:file:bg-zinc-750" />
        {files.length > 0 && (
          <div className="flex gap-1.5 mt-1.5">
            {files.map((f, i) => (
              <div key={i} className="text-[9px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 font-semibold truncate max-w-[80px]">{f.name}</div>
            ))}
          </div>
        )}
      </div>

      {errorMsg && <p className="text-[10px] text-red-500 font-semibold">{errorMsg}</p>}

      <button type="submit" disabled={uploading} className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold rounded-lg text-xs shadow-sm transition-colors disabled:opacity-50">
        {uploading ? "Mengunggah & Menyimpan..." : "Simpan Laporan Harian"}
      </button>
    </form>
  );
}
