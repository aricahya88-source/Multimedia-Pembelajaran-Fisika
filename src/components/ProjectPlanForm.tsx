'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { ProjectPlan } from '@/lib/types';
import { projectByCode } from '@/lib/projectThemes';
import RichTextEditor from './RichTextEditor';
import GlassCard from './GlassCard';
import RichHtml from './RichHtml';
import { Save, Send, AlertTriangle } from 'lucide-react';

type PlanContext={plan:ProjectPlan|null;can_edit?:boolean;is_group?:boolean};
const EMPTY=(code:string):ProjectPlan=>({project_code:code,title:'',theme_code:'MAIN',topic:'',maharah_json:'[]',target_users_html:'',problem_html:'',objectives_html:'',features_html:'',flow_html:'',technology_html:'',test_plan_html:'',team_html:'',detail_json:'{}'});

export default function ProjectPlanForm({code}:{code:string}){
 const def=projectByCode(code); const[plan,setPlan]=useState<ProjectPlan>(EMPTY(code)); const[detail,setDetail]=useState<Record<string,string>>({}); const[ctx,setCtx]=useState<PlanContext>({plan:null,can_edit:true,is_group:false}); const[busy,setBusy]=useState(false); const[msg,setMsg]=useState('');
 const load=()=>api<PlanContext>('getProjectPlan',{project_code:code}).then(d=>{setCtx(d);if(d.plan){setPlan(d.plan);try{setDetail(JSON.parse(d.plan.detail_json||'{}'))}catch{setDetail({})}}else{setPlan(EMPTY(code));setDetail({})}});
 useEffect(()=>{load().catch(e=>setMsg(e instanceof Error?e.message:String(e)))},[code]); if(!def)return <GlassCard>Aktivitas tidak ditemukan.</GlassCard>;
 const status=plan.status||'DRAFT',locked=['APPROVED','DONE'].includes(status),editable=ctx.can_edit!==false&&!locked;
 const save=async(submit=false)=>{setBusy(true);setMsg('');try{const d=await api<{plan:ProjectPlan}>('saveProjectPlan',{plan:{...plan,theme_code:'MAIN',detail_json:JSON.stringify(detail)},submit});setPlan(d.plan);setMsg(submit?'Rencana diajukan ke dosen.':'Draft tersimpan.');await load()}catch(e){setMsg(e instanceof Error?e.message:String(e))}finally{setBusy(false)}};
 return <div className="stack"><GlassCard className="project-hero"><div><span className="eyebrow">PROYEK INDIVIDU</span><h2>{def.name}</h2><p className="muted">{def.description}</p></div><span className="badge">{status}</span></GlassCard>
 {def.warning&&<div className="notice"><AlertTriangle size={18}/><strong>Ketentuan:</strong> {def.warning}</div>}
 {plan.lecturer_feedback_html&&<GlassCard><span className="eyebrow">FEEDBACK DOSEN</span><RichHtml html={plan.lecturer_feedback_html}/></GlassCard>}
 <GlassCard><div className="form-grid two"><label className="field"><span>Judul *</span><input disabled={!editable} value={plan.title} onChange={e=>setPlan({...plan,title:e.target.value})} placeholder="Judul aktivitas/proyek"/></label><label className="field"><span>Topik / isu *</span><input disabled={!editable} value={plan.topic} onChange={e=>setPlan({...plan,topic:e.target.value})} placeholder="Topik utama"/></label></div></GlassCard>
 {def.fields.map(field=><GlassCard key={field.key}><label className="field"><span>{field.label} *</span>{editable?<RichTextEditor value={detail[field.key]||''} onChange={v=>setDetail(d=>({...d,[field.key]:v}))} minHeight={130}/>:<div className="readonly-rich"><RichHtml html={detail[field.key]||'<p>Belum diisi.</p>'}/></div>}{field.hint&&<small>{field.hint}</small>}</label></GlassCard>)}
 <GlassCard><label className="field"><span>Catatan proses / komitmen individu</span>{editable?<RichTextEditor value={plan.team_html||''} onChange={v=>setPlan({...plan,team_html:v})} minHeight={140}/>:<div className="readonly-rich"><RichHtml html={plan.team_html||'<p>Belum diisi.</p>'}/></div>}<small>Catat target pengerjaan, keputusan penting, risiko, dan tindak lanjut pribadi.</small></label></GlassCard>
 {msg&&<div className="notice selectable">{msg}</div>}{ctx.can_edit!==false&&<div className="sticky-actions"><button className="button soft" disabled={busy||!editable} onClick={()=>save(false)}><Save/>Simpan Draft</button><button className="button primary" disabled={busy||!editable||!plan.title||!plan.topic} onClick={()=>save(true)}><Send/>Ajukan ke Dosen</button></div>}</div>;
}
