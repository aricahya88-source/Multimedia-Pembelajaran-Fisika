/**
 * Instalasi MPF — Multimedia Pembelajaran Fisika.
 * Gunakan Spreadsheet dan folder Drive baru, isi StorageConfig.gs, lalu Run setupLms().
 */
function setupLms() {
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try{
    var sid=String(LMS_STORAGE_CONFIG.SPREADSHEET_ID||'').trim(),fid=String(LMS_STORAGE_CONFIG.ROOT_FOLDER_ID||'').trim();
    if(!sid||sid.indexOf('PASTE_')===0)throw new Error('Isi SPREADSHEET_ID pada StorageConfig.gs.');
    if(!fid||fid.indexOf('PASTE_')===0)throw new Error('Isi ROOT_FOLDER_ID pada StorageConfig.gs.');
    var ss=SpreadsheetApp.openById(sid);ss.getName();var root=DriveApp.getFolderById(fid);root.getName();
    props_().setProperties({SPREADSHEET_ID:sid,ROOT_FOLDER_ID:fid},false);
    ensureSecrets_();ensureSchema_();seedSettings_();seedWeeks_();seedCourseContent_();seedCourseActivities_();seedCourseDiscussions_();ensureFolders_();var admin=ensureAdmin_();
    Logger.log('=== MPF SIAP ===');Logger.log('Spreadsheet: '+ss.getUrl());Logger.log('Drive: '+root.getUrl());Logger.log('Login admin: ADMIN');if(admin.pin)Logger.log('PIN admin sementara: '+admin.pin);
    return {success:true,spreadsheetUrl:ss.getUrl(),folderUrl:root.getUrl(),adminLogin:'ADMIN',temporaryPin:admin.pin||''};
  }finally{lock.releaseLock();}
}

function ensureSchema_(){
  var ss=db_();Object.keys(SCHEMA).forEach(function(key){
    var name=LMS.SHEETS[key],headers=SCHEMA[key],sh=ss.getSheetByName(name)||ss.insertSheet(name);
    if(sh.getLastRow()===0){sh.getRange(1,1,1,headers.length).setValues([headers]);sh.setFrozenRows(1);sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#E8F4FB').setFontColor('#064D8D');return;}
    var current=sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
    if(current.join('|')!==headers.join('|'))throw new Error('Header sheet '+name+' berbeda. Gunakan Spreadsheet baru untuk MPF agar data lama tidak tertimpa.');
  });
  var d=ss.getSheetByName('Sheet1');if(d&&ss.getSheets().length>1&&d.getLastRow()===0)ss.deleteSheet(d);
}
function seedSettings_(){Object.keys(DEFAULT_SETTINGS).forEach(function(k){if(!findOne_(LMS.SHEETS.SETTINGS,'key',k))setSetting_(k,DEFAULT_SETTINGS[k]);});}

function seedWeeks_(){
  var titles=[
    'Ruang Lingkup Multimedia Pembelajaran Fisika',
    'Cognitive Load Theory dan Prinsip Multimedia',
    'Analisis Kebutuhan dan Problem Pembelajaran',
    'Flowchart, Storyboard, dan Learning Flow',
    'Desain Aset Multimedia: Teks, Visual, dan Audio',
    'Audiovisual, Animasi, dan Simulasi Fisika',
    'Desain Interaktivitas Multimedia',
    'UTS — Multimedia Design Review',
    'Implementasi Multimedia Dasar',
    'Implementasi Interaktivitas Digital',
    'Interaktivitas Berbasis Sensor dan Microcontroller',
    'Data Fisika, Web/PWA, dan Physical-Digital Interface',
    'Integrasi Produk Multimedia',
    'Testing dan Evaluasi Multimedia',
    'Revisi, Debugging, dan Final QA',
    'UAS — Final Multimedia Showcase, Demo, dan Refleksi'
  ];
  var rows=[];for(var w=1;w<=16;w++){var id='W'+('0'+w).slice(-2);rows.push({week_id:id,week_no:w,title:titles[w-1],summary_html:'<p>Satu pertemuan memuat satu unit materi inti. Submateri berada di dalam unit yang sama agar sesuai beban 2 SKS (2 × 50 menit tatap muka).</p>',open_at:'',close_at:'',visible:true,updated_at:nowIso_()});}
  bulkUpsert_(LMS.SHEETS.WEEKS,'week_id',rows);
}

function seedCourseContent_(){
  var units=[
    ['Ruang Lingkup Multimedia Pembelajaran Fisika','<h2>Multimedia untuk Belajar Fisika</h2><p>Multimedia menggabungkan teks, visual, audio, video, animasi, simulasi, dan interaktivitas secara terencana untuk membantu peserta didik memahami konsep fisika.</p><h3>Pokok bahasan</h3><ul><li>Media, multimedia, dan multimedia interaktif.</li><li>Representasi dalam pembelajaran fisika.</li><li>Interaktivitas digital dan physical-digital interaction.</li><li>Orientasi dua proyek individu semester.</li></ul><p><strong>Pertanyaan pemantik:</strong> kapan multimedia membantu belajar dan kapan justru menambah beban?</p>'],
    ['Cognitive Load Theory dan Prinsip Multimedia','<h2>Cognitive Load dan Multimedia Learning</h2><p>Pelajari intrinsic, extraneous, dan germane cognitive load serta implikasinya terhadap penyajian konsep fisika.</p><h3>Prinsip desain</h3><ul><li>Coherence dan signaling.</li><li>Redundancy dan modality.</li><li>Spatial/temporal contiguity.</li><li>Segmenting dan personalization.</li></ul><p>Gunakan prinsip tersebut untuk mengaudit satu contoh multimedia pembelajaran fisika.</p>'],
    ['Analisis Kebutuhan dan Problem Pembelajaran','<h2>Mulai dari Masalah Belajar</h2><p>Proyek tidak dimulai dari aplikasi atau teknologi, tetapi dari kebutuhan peserta didik dan karakteristik konsep fisika.</p><h3>Analisis inti</h3><ul><li>Target learner dan pengetahuan awal.</li><li>Capaian/tujuan pembelajaran.</li><li>Konsep fisika, miskonsepsi, dan kesulitan representasi.</li><li>Konteks penggunaan, perangkat, dan aksesibilitas.</li><li>Problem definition dan kebutuhan multimedia.</li></ul>'],
    ['Flowchart, Storyboard, dan Learning Flow','<h2>Rancang Sebelum Membangun</h2><p>Susun pengalaman belajar dari orientasi, eksplorasi, representasi, interaksi, latihan, feedback, hingga asesmen.</p><h3>Artefak desain</h3><ul><li>Learning flow dan struktur konten.</li><li>Flowchart navigasi dan logika sistem.</li><li>Storyboard layar/scene.</li><li>Skenario interaksi dan evaluasi.</li></ul>'],
    ['Desain Aset Multimedia: Teks, Visual, dan Audio','<h2>Aset Multimedia yang Fungsional</h2><p>Teks, visual, dan audio dipelajari dalam satu unit agar mahasiswa memilih aset berdasarkan fungsi pedagogis, bukan berdasarkan jenis aplikasi.</p><h3>Pokok bahasan</h3><ul><li>Hierarki visual, tipografi, diagram, grafik, ilustrasi, simbol, dan satuan.</li><li>Warna, keterbacaan, dan konsistensi visual.</li><li>Narasi, voice-over, cue, noise, level audio, dan sinkronisasi.</li><li>Penerapan modality dan redundancy.</li></ul>'],
    ['Audiovisual, Animasi, dan Simulasi Fisika','<h2>Representasi Dinamis</h2><p>Gunakan video, animasi, simulasi, atau demonstrasi eksperimen hanya ketika membantu menjelaskan fenomena, proses, atau relasi yang sulit ditampilkan secara statis.</p><h3>Pokok bahasan</h3><ul><li>Microvideo dan video eksperimen.</li><li>Segmentasi dan signaling.</li><li>Animasi konsep abstrak.</li><li>Simulasi dan representasi dinamis.</li><li>Kesesuaian pedagogis dan potensi miskonsepsi visual.</li></ul>'],
    ['Desain Interaktivitas Multimedia','<h2>Interaksi yang Memicu Berpikir</h2><p>Interaktivitas tidak cukup berupa klik. Interaksi harus menghasilkan respons sistem yang mendorong reasoning fisika.</p><h3>Pokok bahasan</h3><ul><li>Navigasi, button, slider, drag, input, dan branching.</li><li>Kuis dan formative feedback.</li><li>Hint, retry, dan feedback timing.</li><li>Interaction loop: aksi pengguna → respons sistem → proses berpikir → feedback.</li></ul>'],
    ['UTS — Multimedia Design Review','<h2>Proyek 1: Perancangan Multimedia</h2><p>Pertemuan ini digunakan untuk review dan pertanggungjawaban rancangan, bukan untuk menambah materi baru.</p><h3>Yang diperiksa</h3><ul><li>Problem dan learner analysis.</li><li>Tujuan, struktur konten, flowchart, dan storyboard.</li><li>Rasional aset multimedia.</li><li>Interaction dan assessment design.</li><li>Technology plan dan feasibility.</li><li>Prototype desain dan oral design defense.</li></ul>'],
    ['Implementasi Multimedia Dasar','<h2>Build the Alpha</h2><p>Mulai implementasi Proyek 2 berdasarkan rancangan Proyek 1.</p><h3>Fokus</h3><ul><li>Struktur produk dan navigasi dasar.</li><li>Konten dan aset yang benar-benar diperlukan.</li><li>Konsistensi dengan storyboard.</li><li>Versioning aset dan pencatatan perubahan.</li></ul>'],
    ['Implementasi Interaktivitas Digital','<h2>Kontrol, Input, State, dan Feedback</h2><p>Implementasikan interaksi digital yang relevan dengan tujuan belajar.</p><h3>Fokus</h3><ul><li>Event dan perubahan state.</li><li>Input pengguna dan visualisasi dinamis.</li><li>Kuis, feedback, hint, dan retry.</li><li>Affordance, error prevention, touch target, dan kemudahan navigasi.</li></ul>'],
    ['Interaktivitas Berbasis Sensor dan Microcontroller','<h2>Physical Computing sebagai Interaktivitas</h2><p>ESP32/Arduino bukan tujuan elektronika dan tidak menjadi CPMK baru. Microcontroller digunakan hanya ketika interaksi dengan fenomena fisik memberi nilai pedagogis.</p><h3>Kerangka</h3><p><strong>Input/Sensor → Process → Output/Interface → Learning Feedback.</strong></p><ul><li>Pemilihan sensor/input sesuai fenomena fisika.</li><li>Data sederhana dari lingkungan fisik.</li><li>Actuator/display bila membantu feedback.</li><li>Alternatif interaktivitas digital tetap diperbolehkan bila lebih tepat.</li></ul>'],
    ['Data Fisika, Web/PWA, dan Physical-Digital Interface','<h2>Dari Data ke Representasi Multimedia</h2><p>Hubungkan data fisika dengan interface yang dapat dimaknai peserta didik.</p><h3>Fokus</h3><ul><li>Sampling dan data stream sederhana.</li><li>Angka, indikator, grafik, dan visualisasi.</li><li>Web/PWA sebagai interface jika relevan.</li><li>Koneksi serial, Wi-Fi, Bluetooth, atau mekanisme sederhana lain sesuai kebutuhan.</li><li>Uji pengalaman pengguna, bukan hanya keberhasilan koneksi.</li></ul>'],
    ['Integrasi Produk Multimedia','<h2>Build the Beta</h2><p>Satukan konten, aset, navigasi, interaktivitas, asesmen, dan teknologi menjadi satu pengalaman belajar yang koheren.</p><h3>Integration check</h3><ul><li>Alur end-to-end.</li><li>State dan navigasi.</li><li>Media dan asesmen.</li><li>Data/sensor bila digunakan.</li><li>Fallback jika perangkat tertentu tidak tersedia.</li></ul>'],
    ['Testing dan Evaluasi Multimedia','<h2>Apakah Produk Benar, Berfungsi, dan Mudah Digunakan?</h2><p>Testing difokuskan pada evidence yang diperlukan untuk memperbaiki produk.</p><h3>Testing minimal</h3><ul><li>Content/physics accuracy check.</li><li>Functional testing.</li><li>Usability testing sederhana.</li><li>Accessibility check dasar.</li><li>Device/sensor test bila relevan.</li></ul>'],
    ['Revisi, Debugging, dan Final QA','<h2>Perbaikan Berbasis Evidence</h2><p>Revisi harus mengikuti temuan testing, bukan selera semata.</p><h3>Revision log</h3><p>Temuan → sumber feedback → prioritas → perbaikan → bukti before/after.</p><h3>Final QA</h3><ul><li>Materi dan fungsi.</li><li>Usability dan kompatibilitas.</li><li>URL/file/media.</li><li>Sensor/perangkat bila ada.</li><li>Petunjuk penggunaan dan kesiapan demo.</li></ul>'],
    ['UAS — Final Multimedia Showcase, Demo, dan Refleksi','<h2>Proyek 2: Implementasi Multimedia</h2><p>Pertemuan akhir digunakan untuk menunjukkan produk final, evidence testing, revisi, dan pertanggungjawaban keputusan desain/teknologi.</p><h3>Showcase</h3><ul><li>Masalah belajar dan tujuan.</li><li>Alur penggunaan produk.</li><li>Multimedia dan interaktivitas.</li><li>Testing dan perubahan utama setelah revisi.</li><li>Demo fungsi, oral defense, dan refleksi individu.</li></ul>']
  ];
  var rows=[];
  units.forEach(function(u,i){var no=i+1,wid='W'+('0'+no).slice(-2);rows.push({material_id:'MAT'+('00'+no).slice(-3),week_id:wid,material_no:no,order_no:1,title:u[0],content_html:u[1],resource_url:'',visible:true,updated_at:nowIso_()});});
  bulkUpsert_(LMS.SHEETS.MATERIALS,'material_id',rows);
}

function seedCourseActivities_(){
  var now=nowIso_(),rows=[
    {activity_id:'PRJ_DESIGN',week_id:'W03',type:'project',title:'Proyek 1 — Perancangan Multimedia Pembelajaran Fisika',description_html:'<p><strong>Individu.</strong> Rancang multimedia mulai dari masalah belajar, learner analysis, tujuan, struktur konten, flowchart, storyboard, aset, interaktivitas, asesmen, teknologi, dan feasibility. Pertemuan 8 menjadi design review/UTS.</p>',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'DESIGN_PROJECT',created_at:now,updated_at:now},
    {activity_id:'PRJ_IMPLEMENTATION',week_id:'W09',type:'project',title:'Proyek 2 — Implementasi Multimedia Pembelajaran Fisika',description_html:'<p><strong>Individu.</strong> Implementasikan rancangan menjadi produk multimedia interaktif. Microcontroller ESP32/Arduino dapat digunakan sebagai bentuk interaktivitas fisik-digital. Produk harus diuji, direvisi, dan didemonstrasikan pada UAS.</p>',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'IMPLEMENTATION_PROJECT',created_at:now,updated_at:now},
    {activity_id:'PARTICIPATION',week_id:'W16',type:'participation',title:'Partisipasi dan Aktivitas LMS',description_html:'<p>Dinilai dosen berdasarkan kontribusi bermakna dalam diskusi, peer review, questioning, feedback, project clinic, testing, dan refleksi.</p>',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:false,project_code:'',created_at:now,updated_at:now}
  ];
  bulkUpsert_(LMS.SHEETS.ACTIVITIES,'activity_id',rows);SpreadsheetApp.flush();
}

function seedCourseDiscussions_(){
  var now=nowIso_();
  var acts=[
    {activity_id:'DISC_CLT',week_id:'W02',type:'discussion',title:'Diskusi — Apakah Multimedia Selalu Membantu Belajar?',description_html:'',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'',created_at:now,updated_at:now},
    {activity_id:'DISC_INTERACTION',week_id:'W07',type:'discussion',title:'Diskusi — Interaktivitas yang Bermakna',description_html:'',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'',created_at:now,updated_at:now},
    {activity_id:'DISC_MICRO',week_id:'W11',type:'discussion',title:'Diskusi — Kapan ESP32/Arduino Layak Digunakan?',description_html:'',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'',created_at:now,updated_at:now},
    {activity_id:'DISC_TEST',week_id:'W14',type:'discussion',title:'Diskusi — Evidence Apa yang Cukup untuk Merevisi Produk?',description_html:'',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'',created_at:now,updated_at:now}
  ];
  var ds=[
    {discussion_id:'D_CLT',activity_id:'DISC_CLT',prompt_html:'<p>Pilih satu contoh multimedia pembelajaran fisika. Jelaskan satu keputusan desain yang membantu belajar dan satu keputusan yang berpotensi menambah extraneous cognitive load. Tanggapi minimal satu argumen teman dengan alasan.</p>',min_posts:2,grading_mode:'manual',updated_at:now},
    {discussion_id:'D_INTERACTION',activity_id:'DISC_INTERACTION',prompt_html:'<p>Bedakan interaktivitas yang hanya menghasilkan klik dengan interaktivitas yang benar-benar memicu reasoning fisika. Berikan satu contoh interaction loop: aksi pengguna → respons sistem → proses berpikir → feedback.</p>',min_posts:2,grading_mode:'manual',updated_at:now},
    {discussion_id:'D_MICRO',activity_id:'DISC_MICRO',prompt_html:'<p>Dalam kondisi apa penggunaan sensor dan ESP32/Arduino memberikan nilai pedagogis yang lebih tinggi dibanding interaksi digital biasa? Jelaskan juga satu kondisi ketika microcontroller justru tidak perlu digunakan.</p>',min_posts:2,grading_mode:'manual',updated_at:now},
    {discussion_id:'D_TEST',activity_id:'DISC_TEST',prompt_html:'<p>Jika hasil peer review, functional test, dan user test memberikan rekomendasi yang berbeda, bagaimana Anda menentukan prioritas revisi? Gunakan contoh dari produk Anda.</p>',min_posts:2,grading_mode:'manual',updated_at:now}
  ];
  bulkUpsert_(LMS.SHEETS.ACTIVITIES,'activity_id',acts);bulkUpsert_(LMS.SHEETS.DISCUSSIONS,'discussion_id',ds);
}


/**
 * Jalankan sekali jika sebelumnya sudah memakai MPF v1.0.0 dengan 32 material seed.
 * Fungsi ini hanya menata ulang seed MATERIALS menjadi 16 unit (1 unit per pertemuan).
 * Submission, nilai, user, diskusi, dan project plan tidak diubah.
 */
function upgradeToV110TwoSks(){
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try{
    ensureSecrets_();ensureSchema_();seedWeeks_();
    var sh=sheet_(LMS.SHEETS.MATERIALS),all=rows_(LMS.SHEETS.MATERIALS);
    var custom=all.filter(function(m){return !/^MAT\d{3}$/.test(String(m.material_id||''));}).map(stripInternal_);
    rewriteRows_(LMS.SHEETS.MATERIALS,custom);
    seedCourseContent_();seedCourseActivities_();seedCourseDiscussions_();
    setSetting_('COURSE_MEETINGS','16');setSetting_('COURSE_SKS','2');setSetting_('CONTACT_MINUTES_PER_MEETING','100');
    SpreadsheetApp.flush();
    return {success:true,message:'Upgrade MPF v1.1.0 selesai: 16 pertemuan, 16 unit materi, 2 SKS. Data user/submission/nilai/proyek tetap dipertahankan.'};
  }finally{lock.releaseLock();}
}

function ensureAdmin_(){var users=rows_(LMS.SHEETS.USERS),found=null;for(var i=0;i<users.length;i++)if(String(users[i].role).toLowerCase()==='admin'&&asBool_(users[i].active)){found=users[i];break;}if(found)return {created:false,pin:''};var pin=String(Math.floor(100000+Math.random()*900000)),hp=makeUserPin_(pin);appendObj_(LMS.SHEETS.USERS,{user_id:makeId_('USR'),nim:'ADMIN',name:'Administrator',email:'',role:'admin',class_name:'',pin_salt:hp.salt,pin_hash:hp.hash,active:true,created_at:nowIso_(),updated_at:nowIso_()});return {created:true,pin:pin};}
function repairLms(){ensureSecrets_();ensureSchema_();seedSettings_();seedWeeks_();seedCourseContent_();seedCourseActivities_();seedCourseDiscussions_();ensureFolders_();return {success:true,message:'MPF diperiksa dan seed inti telah dipasang.'};}
function resetAdminPin(){var pin='123456';if(String(pin).length<6)throw new Error('PIN minimal 6 karakter.');var admin=findUserByIdentity_('ADMIN');if(!admin)throw new Error('Admin tidak ditemukan.');var hp=makeUserPin_(pin);updateRowObj_(LMS.SHEETS.USERS,admin.__row,{pin_salt:hp.salt,pin_hash:hp.hash,updated_at:nowIso_()});Logger.log('PIN admin baru: '+pin);return true;}
