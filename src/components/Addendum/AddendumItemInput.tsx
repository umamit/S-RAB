"use client";
import { useState } from "react";
import type { Project, AddendumItem } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";

interface AddendumItemInputProps {
  project: Project;
  onAddItemChange: (item: Omit<AddendumItem, "id">) => void;
}

export default function AddendumItemInput({ project, onAddItemChange }: AddendumItemInputProps) {
  const [selectedSubId, setSelectedSubId] = useState(project.subProjects[0]?.id || "");
  const [selectedCatId, setSelectedCatId] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [changeType, setChangeType] = useState<"add" | "remove" | "modify">("modify");

  const [name, setName] = useState("");
  const [unit, setUnit] = useState("m'");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);

  const activeSub = project.subProjects.find((s) => s.id === selectedSubId);
  const activeCat = activeSub?.categories.find((c) => c.id === selectedCatId);
  const activeItem = activeCat?.items.find((i) => i.id === selectedItemId);

  const handleAddChangeItem = () => {
    if (changeType !== "add" && (!selectedCatId || !selectedItemId)) return;
    const safeQty = quantity <= 0 ? 0.001 : quantity;
    const safePrice = unitPrice < 0 ? 0 : unitPrice;
    let newItem: Omit<AddendumItem, "id">;
    if (changeType === "add") {
      newItem = { subProjectId: selectedSubId, categoryId: selectedCatId, type: "add", name: name.trim() || "Item Baru", unit, quantity: safeQty, unitPrice: safePrice };
    } else if (changeType === "remove" && activeItem) {
      newItem = { subProjectId: selectedSubId, categoryId: selectedCatId, itemId: selectedItemId, type: "remove", name: activeItem.name, unit: activeItem.unit, quantity: activeItem.quantity, unitPrice: activeItem.unitPrice };
    } else {
      if (!activeItem) return;
      newItem = { subProjectId: selectedSubId, categoryId: selectedCatId, itemId: selectedItemId, type: "modify", name: activeItem.name, unit: activeItem.unit, quantity: safeQty, unitPrice: safePrice, originalQuantity: activeItem.quantity, originalUnitPrice: activeItem.unitPrice };
    }
    onAddItemChange(newItem);
    setSelectedItemId("");
    setName("");
    setQuantity(1);
    setUnitPrice(0);
  };

  const qtyInvalid = quantity <= 0;
  const priceInvalid = unitPrice < 0;

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-3 bg-white dark:bg-zinc-950/30 p-4 rounded-xl border">
      <h4 className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider text-[10px]">Input Item Perubahan</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block text-[9px] uppercase font-semibold text-zinc-400 mb-1">Sub-Pekerjaan</label>
          <select value={selectedSubId} onChange={(e) => { setSelectedSubId(e.target.value); setSelectedCatId(""); setSelectedItemId(""); }}
            className="w-full px-2 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none">
            {project.subProjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[9px] uppercase font-semibold text-zinc-400 mb-1">Kategori</label>
          <select value={selectedCatId} onChange={(e) => { setSelectedCatId(e.target.value); setSelectedItemId(""); }}
            className="w-full px-2 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none">
            <option value="">-- Pilih Kategori --</option>
            {activeSub?.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[9px] uppercase font-semibold text-zinc-400 mb-1">Jenis Perubahan</label>
          <select value={changeType} onChange={(e) => setChangeType(e.target.value as any)}
            className="w-full px-2 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none">
            <option value="modify">Ubah Volume/Harga</option>
            <option value="add">Tambah Item Baru</option>
            <option value="remove">Hapus Item Pekerjaan</option>
          </select>
        </div>
        {changeType !== "add" && (
          <div>
            <label className="block text-[9px] uppercase font-semibold text-zinc-400 mb-1">Item Pekerjaan</label>
            <select value={selectedItemId} onChange={(e) => {
              setSelectedItemId(e.target.value);
              const item = activeCat?.items.find((i) => i.id === e.target.value);
              if (item) { setName(item.name); setUnit(item.unit); setQuantity(item.quantity); setUnitPrice(item.unitPrice); }
            }}
              className="w-full px-2 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none">
              <option value="">-- Pilih Item --</option>
              {activeCat?.items.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>
        )}
      </div>

      {(changeType === "add" || (changeType === "modify" && selectedItemId)) && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs">
          {changeType === "add" ? (
            <>
              <div className="sm:col-span-2">
                <label className="block text-[9px] font-semibold mb-0.5 text-zinc-400">Nama Pekerjaan Baru</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-2.5 py-1 bg-white dark:bg-zinc-955 border border-zinc-250 dark:border-zinc-800 rounded text-xs focus:outline-none" />
              </div>
              <div>
                <label className="block text-[9px] font-semibold mb-0.5 text-zinc-400">Satuan</label>
                <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-2.5 py-1 bg-white dark:bg-zinc-955 border border-zinc-250 dark:border-zinc-800 rounded text-xs focus:outline-none" />
              </div>
            </>
          ) : (
            <div className="sm:col-span-3 flex flex-col justify-center text-[10px] text-zinc-500 font-semibold px-2">
              <span>Item: <strong>{activeItem?.name}</strong></span>
              <span>Original: {activeItem?.quantity} {activeItem?.unit} @ {formatRupiah(activeItem?.unitPrice || 0)}</span>
            </div>
          )}
          <div>
            <label className="block text-[9px] font-semibold mb-0.5 text-zinc-400">Volume Baru</label>
            <input type="number" step="any" min="0.001" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
              className={`w-full px-2.5 py-1 bg-white dark:bg-zinc-955 border rounded text-xs focus:outline-none ${qtyInvalid ? "border-red-400 dark:border-red-600" : "border-zinc-250 dark:border-zinc-800"}`} />
            {qtyInvalid && <p className="text-[9px] text-red-500 mt-0.5">Volume harus &gt; 0</p>}
          </div>
          <div>
            <label className="block text-[9px] font-semibold mb-0.5 text-zinc-400">Harga Satuan Baru</label>
            <input type="number" step="any" min="0" value={unitPrice} onChange={(e) => setUnitPrice(Number(e.target.value))}
              className={`w-full px-2.5 py-1 bg-white dark:bg-zinc-955 border rounded text-xs focus:outline-none ${priceInvalid ? "border-red-400 dark:border-red-600" : "border-zinc-250 dark:border-zinc-800"}`} />
            {priceInvalid && <p className="text-[9px] text-red-500 mt-0.5">Harga tidak boleh negatif</p>}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button type="button" onClick={handleAddChangeItem}
          className="px-3.5 py-1.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 font-bold rounded-lg text-[10px] hover:opacity-90">
          + Tambahkan Perubahan
        </button>
      </div>
    </div>
  );
}
