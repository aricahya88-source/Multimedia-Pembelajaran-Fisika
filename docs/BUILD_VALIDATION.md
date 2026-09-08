# Build & Validation Notes — MPF LMS v1.1.0

Target validasi:

- Course configuration — 2 SKS, 16 pertemuan, 3 CPMK asli, 2 proyek individu, bobot 10/40/50.
- Seed content — 16 materials (1 unit per pertemuan).
- ESP32/Arduino tetap sebagai implementasi interaktivitas dalam CPMK 3.
- Empat forum diskusi formatif tersedia.
- PWA manifest dan service worker tersedia.
- Google Apps Script `.gs` lulus JavaScript syntax checking.

Jalankan pada mesin dengan dependency npm tersedia:

```bash
npm install
npm run lint:content
npm run build
```

Kemudian deploy frontend ke Vercel dan konfigurasi `APPS_SCRIPT_URL`.
