<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-coding-rules -->

# Aturan Kode Proyek S-RAB

## 1. Satu Fungsi / Komponen = Satu File

- Setiap file hanya boleh mengekspor **satu fungsi utama, satu komponen, atau satu modul** bertanggung jawab tunggal.
- Jangan menggabungkan beberapa komponen React yang tidak berkaitan dalam satu file.
- Helper kecil yang hanya dipakai di dalam file tersebut boleh didefinisikan di file yang sama (bukan diekspor).

## 2. Batas Panjang File: Maksimal 150 Baris

- Setiap file kode (`.ts`, `.tsx`, `.js`, `.jsx`) **tidak boleh melebihi 150 baris**.
- Jika sebuah file mendekati atau melebihi 150 baris, **pecah** segera menjadi file-file yang lebih kecil dengan tanggung jawab masing-masing.
- Komentar dan baris kosong tetap dihitung dalam batas 150 baris.

## 3. Cara Memecah File yang Terlalu Panjang

Apabila sebuah file mendekati batas, ikuti pola berikut:

```
src/
  components/
    ProjectEditor/
      index.tsx          ← re-export utama (< 30L)
      ProjectEditor.tsx  ← layout & tab utama (< 150L)
      TabRAB.tsx         ← konten tab RAB (< 150L)
      TabSchedule.tsx    ← konten tab jadwal (< 150L)
  lib/
    store/
      index.ts           ← re-export store (< 10L)
      store.ts           ← state & actions utama (< 150L)
      authActions.ts     ← action autentikasi (< 150L)
      projectActions.ts  ← action project CRUD (< 150L)
```

## 4. Penamaan File

- Gunakan **PascalCase** untuk komponen React: `LoginScreen.tsx`, `ProjectEditor.tsx`
- Gunakan **camelCase** untuk utility/lib: `excelExport.ts`, `formatCurrency.ts`
- Nama file harus mencerminkan isi tunggalnya.

## 5. Larangan

- ❌ Jangan buat file dengan 2+ komponen React yang diekspor
- ❌ Jangan buat file `utils.ts` or `helpers.ts` yang berisi campuran fungsi tidak berkaitan
- ❌ Jangan melewati batas 150 baris dengan alasan apapun — pecah dulu, baru kerjakan

## 6. Efisiensi Token AI

Untuk menghemat biaya token AI dan menjaga kecepatan respon:
- ⚡ **Pencarian Terarah**: Jangan melakukan pencarian teks global (grep) atau listing direktori rekursif secara masif jika target file sudah diketahui.
- ⚡ **Batasi Pembacaan File**: Hanya baca baris kode yang relevan menggunakan rentang baris (`StartLine` dan `EndLine`). Hindari membaca seluruh isi file berukuran besar jika hanya ingin mengedit area kecil.
- ⚡ **Edit Contiguous**: Gunakan `replace_file_content` untuk melakukan edit kecil yang terlokalisasi, alih-alih menulis ulang seluruh isi file.
- ⚡ **Konsistensi Perintah**: Jangan menjalankan perintah build (`npm run build`) berulang-ulang tanpa perubahan kode yang substansial.
- ⚡ **Respon Singkat**: Tulis respon penjelasan sependek dan sejelas mungkin tanpa basa-basi.

## 7. Pembaruan Buku Panduan (User Guide)

- ⚡ **Wajib Perbarui Panduan**: Setiap kali ada penambahan fitur baru, perbaikan alur fitur utama, atau perubahan parameter fungsional, **wajib** memperbarui file komponen di dalam folder `src/components/UserGuide/` agar petunjuk penggunaan selalu selaras dengan fungsionalitas riil aplikasi.

## 8. Aturan Git Push

- ❌ **Dilarang push kosong** (`git commit --allow-empty`) kecuali pengguna secara eksplisit memintanya (misal: "tes push kosong", "trigger deploy").
- ❌ **Dilarang push ulang** setelah satu sesi push berhasil, kecuali ada perubahan kode baru atau pengguna meminta secara eksplisit.
- ✅ Satu perintah "commit push" dari pengguna = satu kali commit + satu kali push, selesai.

## 9. Prinsip Interaksi Inline Edit: Single Click/Tap

- ⚡ **Sekali Klik**: Seluruh elemen angka/teks yang mendukung pengeditan langsung (*inline edit*) pada tabel rincian pekerjaan dan parameter proyek harus menggunakan pemicu **sekali klik (single click / single tap)**, bukan double tap. Ini bertujuan agar proses pemutakhiran data di lapangan tetap cepat dan responsif.

<!-- END:project-coding-rules -->
