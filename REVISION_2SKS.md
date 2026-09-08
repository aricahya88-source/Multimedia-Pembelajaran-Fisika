# Revisi MPF LMS menjadi 2 SKS

Versi: **v1.1.0**

Perubahan utama:

- 16 pertemuan, bukan pola 4 SKS dengan dua materi per minggu.
- 1 unit materi inti untuk setiap pertemuan (total 16 material seed).
- 2 × 50 menit tatap muka per pertemuan.
- 3 CPMK asli tetap dipertahankan.
- Hanya 2 proyek utama dan seluruhnya individu:
  - Proyek 1 Perancangan (UTS) 40%.
  - Proyek 2 Implementasi (UAS) 50%.
- Partisipasi dan aktivitas LMS 10%.
- Bukti proses tiap pertemuan bukan tugas terpisah.
- Teks/visual/audio dipadatkan menjadi satu unit.
- Video/animasi/simulasi dipadatkan menjadi satu unit.
- ESP32/Arduino tetap berada dalam konteks interaktivitas pada CPMK 3.
- Label antarmuka diubah dari “Minggu” menjadi “Pertemuan”.
- Backend tetap memakai nama teknis `WEEKS` agar kompatibel dengan engine lama.
- Ditambahkan fungsi `upgradeToV110TwoSks()` untuk instalasi v1.0.0 yang sudah memiliki 32 seed material.
