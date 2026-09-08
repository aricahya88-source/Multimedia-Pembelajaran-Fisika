# Validation Report — MPF LMS v1.1

Validation targets:

- Branding MPF dan aset PWA.
- **2 SKS** dan **16 pertemuan**.
- **1 unit materi per pertemuan / 16 material seed**.
- 3 CPMK asli dipertahankan.
- 2 proyek utama dan bersifat individu.
- Bobot 10% + 40% + 50% = 100%.
- Bukti proses tidak menjadi tugas terpisah.
- ESP32/Arduino ditempatkan pada konteks interaktivitas.
- Diskusi terarah tersedia sebagai aktivitas formatif/pendukung.
- Backend Apps Script mempertahankan comments, gradebook, Excel import/export, Drive upload, dan activity log.

Jalankan:

```bash
npm run lint:content
npm run build
```

Backend juga harus diperiksa melalui Apps Script:

```javascript
verifyBackendInstallation()
```
