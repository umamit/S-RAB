import React from "react";

interface ProjectMapProps {
  latitude?: number;
  longitude?: number;
}

export default function ProjectMap({ latitude, longitude }: ProjectMapProps) {
  return (
    <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 print:hidden space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Peta Lokasi Proyek</h3>
      {latitude && longitude ? (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <iframe
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <div className="text-center py-8 text-xs text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/20">
          Koordinat lokasi proyek belum diatur. Masukkan Latitude dan Longitude di kolom parameter untuk memetakan proyek.
        </div>
      )}
    </div>
  );
}
