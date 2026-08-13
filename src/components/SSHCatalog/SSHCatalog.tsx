"use client";
import { useState } from "react";
import { Project, useRABStore } from "@/lib/store";
import { Coins, Search } from "lucide-react";
import SSHTable, { SSHResource } from "./SSHTable";

interface SSHCatalogProps {
  project: Project;
}

export default function SSHCatalog({ project }: SSHCatalogProps) {
  const updateGlobalResourcePrice = useRABStore((state) => state.updateGlobalResourcePrice);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const resourcesMap: Record<string, SSHResource> = {};

  project.subProjects.forEach((sub) => {
    sub.categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (!item.ahsp) return;
        item.ahsp.materials.forEach((m) => {
          const key = `material-${m.name.toLowerCase()}`;
          if (!resourcesMap[key] || resourcesMap[key].unitPrice === 0) {
            resourcesMap[key] = { name: m.name, unit: m.unit, category: "material", unitPrice: m.unitPrice };
          }
        });
        item.ahsp.labor.forEach((l) => {
          const key = `labor-${l.name.toLowerCase()}`;
          if (!resourcesMap[key] || resourcesMap[key].unitPrice === 0) {
            resourcesMap[key] = { name: l.name, unit: l.unit, category: "labor", unitPrice: l.unitPrice };
          }
        });
        item.ahsp.tools.forEach((t) => {
          const key = `tool-${t.name.toLowerCase()}`;
          if (!resourcesMap[key] || resourcesMap[key].unitPrice === 0) {
            resourcesMap[key] = { name: t.name, unit: t.unit, category: "tool", unitPrice: t.unitPrice };
          }
        });
      });
    });
  });

  const resourcesList = Object.values(resourcesMap).sort((a, b) => a.name.localeCompare(b.name));
  const materials = resourcesList.filter((r) => r.category === "material");
  const labors = resourcesList.filter((r) => r.category === "labor");
  const tools = resourcesList.filter((r) => r.category === "tool");

  const filterList = (list: SSHResource[]) => list.filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleStartEdit = (key: string, value: number) => {
    setEditingKey(key);
    setEditValue(value.toString());
  };

  const handleSaveEdit = (name: string) => {
    if (editingKey) {
      const price = parseFloat(editValue);
      if (!isNaN(price) && price >= 0) {
        updateGlobalResourcePrice(project.id, name, price);
      }
      setEditingKey(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, name: string) => {
    if (e.key === "Enter") handleSaveEdit(name);
    else if (e.key === "Escape") setEditingKey(null);
  };

  const hasAnyResources = resourcesList.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-md font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            Kamus Harga SSH Global (Master Price List)
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Daftar harga satuan dasar eceran untuk semua bahan baku, upah kerja, dan alat yang digunakan dalam seluruh analisa AHSP proyek ini.
          </p>
        </div>
        {hasAnyResources && (
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <input type="text" placeholder="Cari bahan/upah..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400" />
          </div>
        )}
      </div>

      {!hasAnyResources ? (
        <div className="text-center py-12 bg-zinc-50/50 dark:bg-zinc-900/5 p-6 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Belum ada bahan baku atau upah kerja harian yang didefinisikan dalam analisa AHSP.</p>
          <p className="text-[11px] text-zinc-450 mt-1">Tambahkan analisa AHSP (ikon ⚙️) pada item rincian pekerjaan terlebih dahulu.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <SSHTable title="Bahan Baku / Material" emoji="📦" list={filterList(materials)} editingKey={editingKey} editValue={editValue} setEditValue={setEditValue} onStartEdit={handleStartEdit} onSaveEdit={handleSaveEdit} onKeyDown={handleKeyDown} />
          <SSHTable title="Tenaga Kerja / Harian (OH)" emoji="👷" list={filterList(labors)} editingKey={editingKey} editValue={editValue} setEditValue={setEditValue} onStartEdit={handleStartEdit} onSaveEdit={handleSaveEdit} onKeyDown={handleKeyDown} />
          <SSHTable title="Peralatan / Sewa" emoji="🛠️" list={filterList(tools)} editingKey={editingKey} editValue={editValue} setEditValue={setEditValue} onStartEdit={handleStartEdit} onSaveEdit={handleSaveEdit} onKeyDown={handleKeyDown} />
        </div>
      )}
    </div>
  );
}
