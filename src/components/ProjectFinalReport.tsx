'use client';
import { useEffect, useState } from 'react';
import { api, fileToBase64 } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { projectByCode } from '@/lib/projectThemes';
import GlassCard from './GlassCard';
import RichHtml from './RichHtml';
import RichTextEditor from './RichTextEditor';
import { ExternalLink, FileCheck2, Upload, RefreshCw, UserRound } from 'lucide-react';

type Report={submission_id:string;version:number;content_html:string;link_url:string;file_name:string;file_url:string;submitted_at:string};
type ReportData={activity:{activity_id:string;title:string;max_score:number};report:Report|null;comments:Array<{comment_id:string;content_html:string;created_at:string;author?:{name:string}}> ;grade?:{score:number;max_score:number;feedback_html:string}|null;can_edit:boolean;is_group:boolean;plan_status?:string;plan_ready?:boolean};

export default function ProjectFinalReport({code}:{code:string}){
  const def=projectByCode(code);
  const[d,setD]=useState<ReportData|null>(null);const[content,setContent]=useState('');const[link,setLink]=useState('');const[file,setFile]=useState<File|null>(null);const[busy,setBusy]=useState(false);const[msg,setMsg]=useState('');
  const load=()=>api<ReportData>('getProjectFinalReport',{project_code:code}).then(setD).catch(e=>setMsg(e instanceof Error?e.message:String(e)));
  useEffect(()=>{load();},[code]);
  const submit=async()=>{if(!d?.can_edit)return;setBusy(true);setMsg('');try{let file_base64='',file_name='',file_mime='';if(file){if(file.size>3*1024*1024)throw new Error('File kecil maksimal 3 MB. Untuk video/audio besar gunakan tautan Drive/YouTube/GitHub.');file_base64=await fileToBase64(file);file_name=file.name;file_mime=file.type;}await api('saveProjectFinalReport',{project_code:code,content_html:content,link_url:link,file_base64,file_name,file_mime});setContent('');setLink('');setFile(null);setMsg('Submission final berhasil dikirim.');await load();}catch(e){setMsg(e instanceof Error?e.message:String(e))}finally{setBusy(false)}};
  const finalTitle=code==='DESIGN_PROJECT'?'Final Perancangan Multimedia':'Final Implementasi Multimedia';
  const finalDesc=code==='DESIGN_PROJECT'?'Kirim dokumen perancangan final, flowchart, storyboard, prototype desain, ringkasan feedback, dan hasil design defense.':'Kirim produk final, URL/file produk, testing report, revision log, petunjuk penggunaan, dan bukti demo/oral defense.';
  return <div className="stack project-final-section">
    <GlassCard className="final-report-hero"><div className="row between wrap gap"><div className="row gap"><div className="icon-bubble coral"><FileCheck2/></div><div><span className="eyebrow">TAHAP FINAL</span><h2>{finalTitle}</h2><p className="muted">{finalDesc}</p></div></div><span className="badge"><UserRound/>Individu</span></div></GlassCard>
    {d?.grade&&<GlassCard className="grade-highlight"><div><span className="eyebrow">NILAI PROYEK</span><h2>{d.grade.score} / {d.grade.max_score}</h2></div><RichHtml html={d.grade.feedback_html||'<p>Belum ada feedback tertulis.</p>'}/></GlassCard>}
    {d?.report&&<GlassCard><div className="row between wrap gap"><div><span className="eyebrow">SUBMISSION TERAKHIR • VERSI {d.report.version}</span><h3>{def?.name||'Proyek'}</h3></div><span className="badge"><FileCheck2/>{formatDate(d.report.submitted_at)}</span></div><RichHtml html={d.report.content_html||'<p>Tidak ada narasi.</p>'}/><div className="row wrap gap">{d.report.link_url&&<a className="button soft compact" target="_blank" rel="noreferrer" href={d.report.link_url}><ExternalLink/>Buka produk/evidence</a>}{d.report.file_url&&<a className="button soft compact" target="_blank" rel="noreferrer" href={d.report.file_url}><ExternalLink/>{d.report.file_name||'Buka lampiran'}</a>}</div></GlassCard>}
    {d&&!d.plan_ready&&<div className="notice">Rencana proyek masih berstatus <strong>{d.plan_status||'DRAFT'}</strong>. Submission final terbuka setelah rencana disetujui dosen.</div>}
    {d?.can_edit&&<GlassCard><div className="row between wrap gap"><div><span className="eyebrow">{d.report?'KIRIM REVISI':'KUMPULKAN HASIL AKHIR'}</span><h3>Submission individu</h3></div>{d.report&&<span className="badge"><RefreshCw/>Versi baru</span>}</div><label className="field"><span>Narasi hasil, evidence, revisi, dan refleksi</span><RichTextEditor value={content} onChange={setContent} minHeight={190}/></label><div className="form-grid two"><label className="field"><span>URL produk / Drive / GitHub / YouTube</span><input value={link} onChange={e=>setLink(e.target.value)} placeholder="https://..."/></label><label className="field"><span>Lampiran kecil (maks. 3 MB)</span><input type="file" onChange={e=>setFile(e.target.files?.[0]||null)}/><small>Gunakan URL untuk file multimedia besar agar LMS tetap ringan.</small></label></div><div className="right-actions"><button className="button primary" disabled={busy} onClick={submit}><Upload/>{busy?'Mengirim...':'Kirim Submission'}</button></div></GlassCard>}
    {d?.comments?.length?<div className="stack small-gap"><div className="section-title"><h3>Komentar Dosen</h3></div>{d.comments.map(c=><GlassCard key={c.comment_id}><strong>{c.author?.name||'Dosen'}</strong><RichHtml html={c.content_html}/><small>{formatDate(c.created_at)}</small></GlassCard>)}</div>:null}
    {msg&&<div className="notice selectable">{msg}</div>}
  </div>;
}
