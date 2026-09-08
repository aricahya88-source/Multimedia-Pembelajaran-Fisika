# MPF LMS v1.1 — 2 SKS

**MPF — Multimedia Pembelajaran Fisika** adalah LMS/PWA berbasis OBE untuk mata kuliah **Multimedia Pembelajaran Fisika (PFS125028, 2 SKS)**. Arsitektur mengikuti LMS acuan sebelumnya, tetapi beban dan struktur konten sudah disederhanakan khusus untuk mata kuliah 2 SKS.

## Prinsip desain 2 SKS

- **16 pertemuan**, bukan 16 minggu dengan dua materi.
- Setiap pertemuan mempunyai **1 unit materi inti** yang dapat berisi beberapa submateri dalam satu halaman WYSIWYG.
- Tatap muka dirancang **2 × 50 menit per pertemuan**.
- CPMK tetap menggunakan **3 CPMK asli**.
- Kelas bersifat **individu** karena konteks kelas mengulang.
- Hanya ada **2 proyek utama**:
  1. **Proyek 1 — Perancangan Multimedia Pembelajaran Fisika (UTS), 40%**.
  2. **Proyek 2 — Implementasi Multimedia Pembelajaran Fisika (UAS), 50%**.
- **Partisipasi & Aktivitas LMS 10%**.
- Bukti proses pertemuan adalah bagian dari dua proyek, **bukan tugas terpisah**.
- Audio, visual, video, animasi, dan simulasi dipadatkan sebagai komponen multimedia.
- ESP32/Arduino ditempatkan sebagai **implementasi interaktivitas**, bukan CPMK baru dan bukan mata bahasan elektronika mandiri.

## Fitur mahasiswa

- Login NIM/email + PIN.
- Dashboard progress dan pertemuan aktif.
- RPS interaktif + file RPS DOCX/PDF.
- Learning journey **16 pertemuan / 16 unit materi**.
- Diskusi terarah yang bersifat formatif/pendukung partisipasi.
- Dua workflow proyek individu: draft → review dosen → revisi → approved → final submission → grade/feedback.
- Upload lampiran kecil ke Google Drive; file besar memakai URL Drive/GitHub/YouTube.
- Nilai dan feedback terpublikasi.
- PWA installable.

## Fitur dosen/admin

- Kelola **1 unit materi inti untuk setiap pertemuan** dengan WYSIWYG.
- Kelola dua proyek utama dan aktivitas pendukung.
- Kelola diskusi pada pertemuan terpilih.
- Review rencana proyek dan memberi feedback.
- Gradebook skala 0–100.
- Komentar dosen pada submission tanpa harus mengubah nilai.
- Penilaian diskusi sebagai evidence formatif bila diperlukan.
- Import mahasiswa via Excel.
- Import komentar/nilai via Excel dengan preview/validasi frontend.
- Export/import database XLSX multi-sheet.
- Pengumuman dashboard.
- Activity log.
- Backend verifier `verifyBackendInstallation()`.

## Arsitektur

```text
Browser / PWA
    ↓
Next.js 15 + React 19 + TypeScript
    ↓  /api/gas
Google Apps Script Web App
    ├─ Google Sheets (database)
    └─ Google Drive (file storage)
```

`APPS_SCRIPT_URL` hanya disimpan di environment Vercel/.env.local. Spreadsheet ID dan Drive Folder ID hanya berada di project Apps Script.

## Menjalankan frontend lokal

```bash
cp .env.example .env.local
# isi APPS_SCRIPT_URL
npm install
npm run dev
```

Build produksi:

```bash
npm run lint:content
npm run build
```

## Instalasi backend

Lihat `PETUNJUK_PEMASANGAN.md`. Seluruh file dalam `apps-script/` harus disalin ke satu project Google Apps Script. Gunakan Spreadsheet dan folder Drive khusus MPF.

## Konten bawaan

Seed backend membuat:

- 16 slot `WEEKS` sebagai nama teknis backend untuk **16 pertemuan**.
- **16 baris `MATERIALS` (1 unit inti per pertemuan)**.
- 2 project activities individu.
- 1 activity partisipasi.
- 4 forum diskusi terarah sebagai aktivitas formatif.

Semua unit materi/instruksi selanjutnya dapat diedit dosen melalui LMS tanpa mengubah source code.

## Upgrade dari v1.0.0

Jika backend v1.0.0 dengan 32 material seed sudah pernah dipasang, setelah mengganti file Apps Script ke v1.1.0 jalankan sekali:

```javascript
upgradeToV110TwoSks()
```

Fungsi tersebut menata ulang seed materi menjadi 16 unit tanpa menghapus user, submission, nilai, diskusi, atau project plan.
