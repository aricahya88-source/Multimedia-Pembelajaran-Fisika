# Arsitektur MPF LMS

## Frontend
Next.js 15, React 19, TypeScript, deploy di Vercel, installable sebagai PWA.

## Backend
Google Apps Script Web App. Frontend memanggil route server `/api/gas`; route ini meneruskan payload JSON ke `APPS_SCRIPT_URL` sehingga URL Apps Script tidak perlu dipanggil langsung dari browser.

## Data
Google Sheets sebagai database tabular. Pembacaan dan penulisan menggunakan helper di `Db.gs`, termasuk batch upsert untuk seed.

## Storage
Google Drive menyimpan file submission kecil. Multimedia besar disimpan sebagai URL eksternal/Drive/GitHub/YouTube agar Apps Script tetap ringan.

## Rich content
TipTap WYSIWYG digunakan untuk materi, deskripsi, project plan, feedback, dan respons diskusi.

## Workflow proyek
Draft → Submit Plan → Lecturer Review → Needs Revision / Approved → Final Submission → Comment/Grade.

## Security boundary
- Password tidak disimpan; login memakai PIN hash + salt.
- `SPREADSHEET_ID` dan `ROOT_FOLDER_ID` berada di Script Properties/StorageConfig Apps Script.
- `APPS_SCRIPT_URL` berada di environment server Next.js.
- HTML dari user disanitasi backend.
