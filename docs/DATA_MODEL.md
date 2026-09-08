# Data Model MPF LMS

Sheet inti:

- `SETTINGS`: konfigurasi LMS.
- `USERS`: mahasiswa/dosen/admin dan credential PIN ter-hash.
- `WEEKS`: nama teknis kompatibilitas backend untuk **16 slot pertemuan**. Pada antarmuka seluruhnya ditampilkan sebagai *Pertemuan*.
- `MATERIALS`: **1 unit materi inti per pertemuan** (16 seed). Submateri ditulis di dalam satu konten WYSIWYG, bukan sebagai record terpisah.
- `ACTIVITIES`: dua project utama, discussion formatif, participation, dan aktivitas opsional.
- `DISCUSSIONS`: prompt dan metadata forum.
- `POSTS`: post/reply diskusi dengan `parent_post_id`.
- `COMMENTS`: komentar universal, terutama komentar submission.
- `SUBMISSIONS`: versioned submission individu.
- `GRADES`: nilai skala 0–100 dan feedback.
- `RUBRICS`, `RUBRIC_SCORES`: dukungan rubrik.
- `PROJECT_PLANS`: rencana proyek, status review, feedback dosen, dan detail form JSON.
- `ANNOUNCEMENTS`: pengumuman.
- `ACTIVITY_LOG`: audit aktivitas.
- `QUIZZES`, `QUIZ_QUESTIONS`, `QUIZ_ATTEMPTS`: engine generik yang tersedia tetapi tidak diseed sebagai asesmen utama MPF.
- `GROUPS`, `GROUP_MEMBERS`: tabel kompatibilitas engine; tidak digunakan oleh dua proyek utama karena seluruh proyek MPF bersifat individu.

Activity utama seed:

- `PRJ_DESIGN` → `DESIGN_PROJECT` (40%).
- `PRJ_IMPLEMENTATION` → `IMPLEMENTATION_PROJECT` (50%).
- `PARTICIPATION` (10%).
- `DISC_CLT`, `DISC_INTERACTION`, `DISC_MICRO`, `DISC_TEST` sebagai aktivitas formatif/pendukung partisipasi.
