# Changelog

## v1.1.0 — 2 SKS correction

- LMS dikoreksi dari pola 4 SKS menjadi **2 SKS**.
- Struktur diubah menjadi **16 pertemuan**, bukan 16 minggu dengan 2 materi.
- Seed materi dipadatkan dari 32 menjadi **16 unit materi**, satu unit untuk setiap pertemuan.
- Submateri teks/visual/audio dan audiovisual/animasi/simulasi tetap terintegrasi dalam satu unit pertemuan.
- Antarmuka mengganti label "Minggu" menjadi "Pertemuan" tanpa mengubah route/backend compatibility.
- Bukti proses ditegaskan sebagai bagian dari dua proyek, bukan tugas terpisah.
- Ditambahkan `upgradeToV110TwoSks()` untuk backend yang sudah terlanjur memakai seed v1.0.0.
- 3 CPMK asli, 2 proyek individu, bobot 10%/40%/50%, dan posisi ESP32/Arduino sebagai interaktivitas tetap dipertahankan.

## v1.0.0

- Branding MPF dan logo MPF.
- RPS Multimedia Pembelajaran Fisika terintegrasi.
- 16 minggu dan 32 materi seed.
- 3 CPMK asli dipertahankan.
- 2 proyek individu: Perancangan (40%) dan Implementasi (50%).
- Partisipasi/Aktivitas LMS 10%.
- Forum diskusi dengan reply dan penilaian.
- ESP32/Arduino ditempatkan sebagai implementasi interaktivitas fisik-digital.
- Workflow project plan → review → revision → approval → final submission → grade.
- WYSIWYG materials/project plan/feedback.
- Import/export Excel multi-sheet.
- PWA, Google Apps Script, Sheets, Drive, Vercel architecture.
