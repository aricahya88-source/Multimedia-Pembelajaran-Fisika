export type CourseMeeting = {
  no:number;
  phase:number;
  phaseLabel:string;
  title:string;
  mode:string;
  cpmk:string[];
  objectives:string[];
  before:string[];
  during:string[];
  after:string[];
  outputs:string[];
  activityHref?:string;
  activityLabel?:string;
};

export const APP_NAME='MPF';
export const COURSE_NAME='Multimedia Pembelajaran Fisika';
export const COURSE_CODE='PFS125028';
export const COURSE_SEMESTER='-';
export const COURSE_TAGLINE='Design • Interact • Build • Evaluate';
export const COURSE_SKS=2;
export const COURSE_MEETING_COUNT=16;
export const COURSE_CONTACT_MINUTES=100;

export const CPMK = [
  'CPMK 1: Mahasiswa mampu menjelaskan ruang lingkup multimedia pembelajaran fisika, Cognitive Load Theory, beban kognitif, serta prinsip-prinsip multimedia pembelajaran sebagai dasar pengembangan media pembelajaran fisika.',
  'CPMK 2: Mahasiswa mampu menganalisis kebutuhan pembelajaran fisika, karakteristik peserta didik, capaian pembelajaran, materi, serta rancangan storyboard, flowchart, skenario, dan evaluasi untuk pengembangan multimedia pembelajaran fisika.',
  'CPMK 3: Mahasiswa mampu mengembangkan dan mengevaluasi produk multimedia pembelajaran fisika berbasis teks, gambar, audio, video, animasi, interaktivitas, dan teknologi digital sederhana secara sistematis, kreatif, dan sesuai dengan prinsip pembelajaran.'
] as const;

export const PHASES=[
  {no:1,label:'Foundations of Multimedia Learning',range:'Pertemuan 1–2',description:'Membangun fondasi multimedia pembelajaran fisika melalui ruang lingkup multimedia, Cognitive Load Theory, dan prinsip-prinsip multimedia.'},
  {no:2,label:'Project 1 — Multimedia Design',range:'Pertemuan 3–8',description:'Mahasiswa secara individu menganalisis kebutuhan lalu merancang flowchart, storyboard, aset multimedia, audiovisual, dan interaktivitas. Fase berakhir pada UTS berupa proyek perancangan.'},
  {no:3,label:'Project 2 — Interactive Implementation',range:'Pertemuan 9–13',description:'Mahasiswa mengimplementasikan rancangan menjadi produk multimedia interaktif, termasuk interaktivitas digital dan physical-digital interaction menggunakan sensor/microcontroller bila relevan.'},
  {no:4,label:'Testing, Revision & Showcase',range:'Pertemuan 14–16',description:'Produk diuji, direvisi, difinalisasi, dan dipertahankan melalui demo serta refleksi akhir.'}
] as const;

export const ASSESSMENT_WEIGHTS=[
  {code:'PARTICIPATION',label:'Partisipasi & Aktivitas LMS',weight:10},
  {code:'DESIGN_PROJECT',label:'Proyek 1 — Perancangan Multimedia',weight:40},
  {code:'IMPLEMENTATION_PROJECT',label:'Proyek 2 — Implementasi Multimedia',weight:50}
] as const;

const base=(no:number,phase:number,title:string,mode:string,cpmk:string[],objectives:string[],during:string[],outputs:string[],activityHref?:string,activityLabel?:string):CourseMeeting=>({
  no,phase,phaseLabel:PHASES.find(p=>p.no===phase)?.label||'',title,mode,cpmk,objectives,
  before:['Pelajari satu unit materi inti pertemuan secara ringkas dan catat pertanyaan yang perlu dibawa ke kelas.'],
  during,
  after:['Dokumentasikan bukti proses yang relevan ke Proyek 1 atau Proyek 2. Bukti proses bukan tugas terpisah.'],outputs,activityHref,activityLabel
});

export const MEETINGS:CourseMeeting[]=[
  base(1,1,'Ruang Lingkup Multimedia Pembelajaran Fisika','Dosen-led + exploratory learning',['CPMK 1'],['Menjelaskan konsep, karakteristik, fungsi, dan ruang lingkup multimedia pembelajaran fisika.'],['Eksplorasi contoh multimedia, concept mapping, diskusi kriteria media yang membantu belajar fisika.'],['Concept map multimedia pembelajaran fisika.']),
  base(2,1,'Cognitive Load Theory dan Prinsip Multimedia','Dosen-led + case analysis',['CPMK 1'],['Menjelaskan beban kognitif dan menerapkan prinsip multimedia untuk menilai kualitas media pembelajaran fisika.'],['Case analysis terhadap contoh media, identifikasi beban kognitif, dan redesign singkat.'],['Audit singkat contoh multimedia berdasarkan CLT dan prinsip multimedia.']),
  base(3,2,'Analisis Kebutuhan dan Problem Pembelajaran','Project-based learning',['CPMK 2'],['Menganalisis peserta didik, capaian pembelajaran, karakteristik konsep fisika, masalah belajar, dan kebutuhan multimedia.'],['Problem finding, learner analysis, pemilihan topik, dan project clinic individu.'],['Needs analysis dan problem definition.'],'/projects/DESIGN_PROJECT','Proyek 1 — Perancangan'),
  base(4,2,'Flowchart, Storyboard, dan Learning Flow','Design workshop',['CPMK 2'],['Merancang alur belajar, flowchart, storyboard, struktur konten, dan skenario evaluasi.'],['Workshop flowchart/storyboard, walkthrough, dan umpan balik dosen.'],['Flowchart dan storyboard versi 1.'],'/projects/DESIGN_PROJECT','Proyek 1 — Perancangan'),
  base(5,2,'Desain Aset Multimedia: Teks, Visual, dan Audio','Design studio',['CPMK 2','CPMK 3'],['Merancang aset teks, visual, diagram, ilustrasi, tipografi, audio, dan narasi yang selaras dengan prinsip multimedia.'],['Design studio, asset critique, dan produksi contoh aset terpilih.'],['Multimedia asset specification dan contoh aset.'],'/projects/DESIGN_PROJECT','Proyek 1 — Perancangan'),
  base(6,2,'Audiovisual, Animasi, dan Simulasi Fisika','Production workshop',['CPMK 2','CPMK 3'],['Merancang penggunaan video, animasi, simulasi, atau demonstrasi eksperimen sesuai kebutuhan konsep fisika.'],['Workshop audiovisual/animasi, pemilihan representasi dinamis, dan review kesesuaian pedagogis.'],['Rancangan audiovisual/animasi/simulasi.'],'/projects/DESIGN_PROJECT','Proyek 1 — Perancangan'),
  base(7,2,'Desain Interaktivitas Multimedia','Interaction design workshop',['CPMK 2','CPMK 3'],['Merancang navigasi, kontrol, kuis, feedback, branching, dan bentuk interaksi yang bermakna bagi pembelajaran fisika.'],['Interaction mapping, prototyping, peer walkthrough, dan revisi rancangan.'],['Interaction map dan prototype rancangan interaktif.'],'/projects/DESIGN_PROJECT','Proyek 1 — Perancangan'),
  base(8,2,'UTS — Multimedia Design Review','Project presentation + design defense',['CPMK 2'],['Mempertahankan rancangan multimedia berdasarkan kebutuhan, prinsip multimedia, kelayakan teknis, dan tujuan pembelajaran.'],['Presentasi individu, questioning, design defense, dan feedback dosen.'],['Dokumen Perancangan Multimedia final + prototype desain.'],'/projects/DESIGN_PROJECT','UTS — Proyek 1'),
  base(9,3,'Implementasi Multimedia Dasar','Development workshop',['CPMK 3'],['Mengimplementasikan struktur produk, konten, dan aset multimedia berdasarkan rancangan yang telah dibuat.'],['Development sprint, konsultasi teknis, dan pemeriksaan kesesuaian implementasi dengan storyboard.'],['Versi alpha produk multimedia.'],'/projects/IMPLEMENTATION_PROJECT','Proyek 2 — Implementasi'),
  base(10,3,'Implementasi Interaktivitas Digital','Interactive development',['CPMK 3'],['Mengembangkan navigasi, input pengguna, feedback, kuis/aktivitas, dan interaksi digital yang berfungsi.'],['Implementasi kontrol dan feedback, debugging, serta usability walkthrough.'],['Interactive prototype.'],'/projects/IMPLEMENTATION_PROJECT','Proyek 2 — Implementasi'),
  base(11,3,'Interaktivitas Berbasis Sensor dan Microcontroller','Physical computing workshop',['CPMK 3'],['Menerapkan microcontroller sebagai bagian dari interaktivitas multimedia melalui pola input–process–output–feedback.'],['Eksplorasi ESP32/Arduino, sensor/input, data sederhana, actuator/output, dan desain interaksi fisik-digital. Fokus pada interaktivitas pembelajaran, bukan elektronika tingkat lanjut.'],['Physical interaction prototype atau alternatif interaktivitas digital yang setara.'],'/projects/IMPLEMENTATION_PROJECT','Proyek 2 — Implementasi'),
  base(12,3,'Data Fisika, Web/PWA, dan Physical-Digital Interface','Integration workshop',['CPMK 3'],['Mengintegrasikan data fisika, visualisasi, interface web/PWA, dan microcontroller bila relevan untuk menghasilkan feedback multimedia.'],['Integrasi sensor/data dengan interface, visualisasi, atau PWA; uji komunikasi data dan pengalaman pengguna.'],['Prototype terintegrasi sensor/data–multimedia atau web/PWA.'],'/projects/IMPLEMENTATION_PROJECT','Proyek 2 — Implementasi'),
  base(13,3,'Integrasi Produk Multimedia','Project sprint + lecturer clinic',['CPMK 3'],['Mengintegrasikan konten, aset, interaktivitas, asesmen, dan teknologi menjadi produk yang koheren.'],['Project sprint individual, integration debugging, dan lecturer clinic.'],['Beta product siap diuji.'],'/projects/IMPLEMENTATION_PROJECT','Proyek 2 — Implementasi'),
  base(14,4,'Testing dan Evaluasi Multimedia','User testing + peer review',['CPMK 3'],['Mengevaluasi akurasi materi, fungsi, usability, aksesibilitas, interaktivitas, dan kualitas teknis produk.'],['Functional testing, content validation, usability testing sederhana, peer/user review, dan pencatatan temuan.'],['Testing report dan daftar prioritas perbaikan.'],'/projects/IMPLEMENTATION_PROJECT','Proyek 2 — Implementasi'),
  base(15,4,'Revisi, Debugging, dan Final QA','Project clinic',['CPMK 3'],['Memperbaiki produk berdasarkan evidence hasil testing dan menyiapkan versi final yang stabil.'],['Revision sprint, debugging, final QA, dan penyusunan revision log.'],['Final product candidate + revision log.'],'/projects/IMPLEMENTATION_PROJECT','Proyek 2 — Implementasi'),
  base(16,4,'UAS — Final Multimedia Showcase, Demo, dan Refleksi','Demo + oral defense + reflection',['CPMK 3'],['Mendemonstrasikan, mempertahankan, dan merefleksikan produk multimedia pembelajaran fisika secara sistematis.'],['Final showcase, demo fungsi, questioning/oral defense, dan refleksi individu.'],['Final Multimedia Learning Product + dokumentasi + refleksi.'],'/projects/IMPLEMENTATION_PROJECT','UAS — Proyek 2')
];

export function meetingByNo(no:number){return MEETINGS.find(m=>m.no===no);}
export function phaseByMeeting(no:number){return MEETINGS.find(m=>m.no===no)?.phase||1;}
