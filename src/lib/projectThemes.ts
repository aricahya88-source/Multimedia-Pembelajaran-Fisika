export type ProjectField={key:string;label:string;hint?:string};
export type ProjectDefinition={code:string;name:string;group:boolean;short:string;description:string;warning?:string;fields:ProjectField[]};
const f=(key:string,label:string,hint=''):ProjectField=>({key,label,hint});

export const PROJECTS:ProjectDefinition[]=[
  {
    code:'DESIGN_PROJECT',
    name:'Proyek 1 — Perancangan Multimedia Pembelajaran Fisika',
    short:'Pertemuan 3–8 • individu • UTS',
    group:false,
    description:'Rancang multimedia pembelajaran fisika secara lengkap sebelum implementasi. Proyek dimulai dari masalah belajar dan kebutuhan pengguna, bukan dari aplikasi atau teknologi yang ingin digunakan.',
    fields:[
      f('physics_topic','Topik dan konsep fisika','Nyatakan konsep, jenjang, dan ruang lingkup materi yang akan dikembangkan.'),
      f('problem_definition','Masalah pembelajaran','Jelaskan kesulitan belajar, miskonsepsi, keterbatasan representasi, atau kebutuhan yang hendak dijawab.'),
      f('learner_profile','Target peserta didik dan karakteristiknya'),
      f('learning_outcomes','Capaian/tujuan pembelajaran','Gunakan rumusan yang terukur dan sesuai konteks pembelajaran.'),
      f('content_structure','Struktur konten dan learning flow'),
      f('multimedia_rationale','Rasional penggunaan multimedia','Jelaskan kapan dan mengapa menggunakan teks, visual, audio, video, animasi, atau simulasi.'),
      f('flowchart','Flowchart produk'),
      f('storyboard','Storyboard utama','Jelaskan layar/scene, konten, media, navigasi, interaksi, dan feedback.'),
      f('interaction_design','Skenario interaktivitas','Navigasi, input pengguna, feedback, kuis, branching, simulasi, atau physical-digital interaction.'),
      f('assessment_design','Rancangan asesmen dan feedback'),
      f('technology_plan','Rencana teknologi','Platform, software, web/PWA, sensor, ESP32/Arduino jika relevan, serta alasan pemilihannya.'),
      f('feasibility','Kelayakan implementasi','Waktu, perangkat, sumber daya, risiko, dan alternatif bila teknologi utama tidak tersedia.'),
      f('references','Referensi konsep fisika, pedagogi, dan desain multimedia')
    ]
  },
  {
    code:'IMPLEMENTATION_PROJECT',
    name:'Proyek 2 — Implementasi Multimedia Pembelajaran Fisika',
    short:'Pertemuan 9–16 • individu • UAS',
    group:false,
    description:'Implementasikan rancangan menjadi produk multimedia pembelajaran fisika yang berfungsi, interaktif, diuji, direvisi, dan dapat didemonstrasikan.',
    warning:'Microcontroller ditempatkan sebagai salah satu bentuk interaktivitas. Produk tidak dinilai dari kerumitan rangkaian, tetapi dari relevansi interaksi terhadap tujuan pembelajaran fisika.',
    fields:[
      f('design_reference','Ringkasan rancangan yang diimplementasikan','Nyatakan hubungan implementasi dengan hasil Proyek 1.'),
      f('development_scope','Scope implementasi','Fitur, konten, aset, dan komponen yang benar-benar dibangun.'),
      f('multimedia_assets','Implementasi aset multimedia','Teks, gambar/diagram, audio, video, animasi, simulasi yang digunakan dan alasannya.'),
      f('digital_interaction','Implementasi interaktivitas digital','Navigasi, kontrol, kuis, feedback, input, visualisasi, atau branching.'),
      f('physical_interaction','Implementasi physical-digital interaction','Jika digunakan: sensor/input → ESP32/Arduino → data/proses → output/interface → feedback belajar. Jika tidak, jelaskan alternatif interaktivitas yang dipakai.'),
      f('web_pwa_interface','Web/PWA/interface dan integrasi data','Jelaskan interface, visualisasi, konektivitas, dan arsitektur sederhana produk.'),
      f('assessment_feedback','Implementasi asesmen dan feedback pembelajaran'),
      f('testing_plan','Rencana dan hasil testing','Content check, functional test, usability, accessibility, sensor/device test bila relevan.'),
      f('revision_log','Revision log berbasis evidence','Temuan → prioritas → perbaikan → bukti perubahan.'),
      f('final_product','Deskripsi produk final dan cara penggunaan'),
      f('limitations','Keterbatasan dan pengembangan lanjutan'),
      f('references','Referensi dan sumber aset/teknologi')
    ]
  }
];

export function projectByCode(code:string){return PROJECTS.find(p=>p.code===String(code||'').toUpperCase());}
