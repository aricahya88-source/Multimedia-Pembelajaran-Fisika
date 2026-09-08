# Petunjuk Pemasangan MPF LMS v1.1

## 1. Prasyarat

Siapkan:

1. akun Google;
2. satu Google Spreadsheet baru;
3. satu folder Google Drive khusus MPF;
4. project Google Apps Script;
5. Node.js >= 20.11 untuk development lokal;
6. akun Vercel/GitHub untuk deployment frontend.

## 2. Backend Google Apps Script

Salin **seluruh file** pada folder `apps-script/` ke satu project Apps Script:

- `Config.gs`
- `StorageConfig.gs`
- `Db.gs`
- `Security.gs`
- `DriveService.gs`
- `Services.gs`
- `Api.gs`
- `Web.gs`
- `Setup.gs`
- `BackendVerify.gs`
- `appsscript.json`

## 3. Konfigurasi storage

Buka `StorageConfig.gs`, isi:

```javascript
var LMS_STORAGE_CONFIG = {
  SPREADSHEET_ID: 'ID_SPREADSHEET_ANDA',
  ROOT_FOLDER_ID: 'ID_FOLDER_DRIVE_ANDA'
};
```

Gunakan Spreadsheet baru agar schema lama dari LMS lain tidak tertimpa.

## 4. Setup database baru

Jalankan:

```javascript
setupLms()
```

Fungsi ini akan:

- membuat schema Google Sheets;
- membuat **16 pertemuan**;
- membuat **16 unit materi bawaan (1 unit per pertemuan)**;
- membuat dua project individu;
- membuat empat diskusi formatif;
- membuat folder Drive;
- membuat akun admin bila belum ada.

MPF adalah **2 SKS**, sehingga seed tidak membuat dua materi per pertemuan. Submateri ditempatkan dalam satu unit WYSIWYG.

## 5. Upgrade dari MPF v1.0.0

Jika sebelumnya sudah memasang versi dengan 32 material seed, ganti seluruh file Apps Script ke versi ini lalu jalankan sekali:

```javascript
upgradeToV110TwoSks()
```

Yang diubah hanya seed unit materi dan konfigurasi 2 SKS. User, submission, grade, komentar, diskusi, dan project plan tetap dipertahankan.

## 6. Verifikasi backend

Jalankan:

```javascript
verifyBackendInstallation()
```

Pastikan seluruh pemeriksaan lolos sebelum deploy.

## 7. Deploy Apps Script sebagai Web App

Deploy → New deployment → Web app. Salin URL deployment yang berakhiran `/exec`.

## 8. Frontend lokal

```bash
cp .env.example .env.local
```

Isi:

```text
APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Kemudian:

```bash
npm install
npm run lint:content
npm run dev
```

## 9. Build produksi

```bash
npm run build
```

## 10. Deploy ke Vercel

Push repository ke GitHub lalu import ke Vercel. Tambahkan environment variable `APPS_SCRIPT_URL` untuk Production/Preview/Development sesuai kebutuhan.

## 11. Setup pengguna

Login sebagai `ADMIN`, kemudian buka **Kelola → Pengguna**. Mahasiswa dapat dibuat satu per satu atau diimpor melalui template Excel.

## 12. Alur dosen

1. Atur **pertemuan aktif** pada settings bila diperlukan.
2. Edit satu unit materi inti melalui **Kelola Materi**.
3. Atur deadline dua project utama.
4. Buat/edit forum formatif melalui **Kelola Diskusi**.
5. Review rencana Proyek 1 dan Proyek 2.
6. Beri status `NEEDS_REVISION` atau `APPROVED`.
7. Setelah approved, mahasiswa dapat mengirim submission final.
8. Periksa submission pada **Gradebook**.
9. Tambahkan komentar dan/atau nilai.
10. Export/import nilai serta database melalui Excel bila diperlukan.

## 13. Dua project utama

### DESIGN_PROJECT
Proyek 1 Perancangan, individu, UTS, bobot 40%.

### IMPLEMENTATION_PROJECT
Proyek 2 Implementasi, individu, UAS, bobot 50%.

Partisipasi dan aktivitas LMS berbobot 10%. Tidak ada tugas besar lain di luar dua proyek tersebut.

## 14. File multimedia

Lampiran kecil dapat diunggah melalui backend. Untuk file besar seperti video, audio, repository, atau produk web, gunakan URL Google Drive, GitHub, YouTube, atau hosting lain.

## 15. PWA

`manifest.webmanifest`, `sw.js`, dan icon sudah tersedia. Setelah deploy melalui HTTPS, browser yang kompatibel dapat menawarkan instalasi aplikasi MPF.
