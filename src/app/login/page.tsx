'use client';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { LogIn, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const {login}=useAuth();
  const [identity,setIdentity]=useState(''); const [pin,setPin]=useState('');
  const [busy,setBusy]=useState(false); const [error,setError]=useState('');
  const submit=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setError('');try{await login(identity,pin)}catch(err){setError(err instanceof Error?err.message:String(err))}finally{setBusy(false)}};
  return <div className="login-screen"><div className="liquid-orb orb-a"/><div className="liquid-orb orb-b"/><div className="liquid-orb orb-c"/>
    <div className="login-shell"><section className="login-copy"><img className="login-wordmark mpf-full-logo" src="/mpf-logo.png" alt="MPF"/><span className="eyebrow">PWA • NEXT.JS • APPS SCRIPT • GOOGLE SHEETS</span><h1>Multimedia Pembelajaran Fisika</h1><p>Design • Interact • Build • Evaluate. LMS berbasis OBE untuk merancang dan mengimplementasikan multimedia pembelajaran fisika yang interaktif.</p><div className="login-pills"><span>16 Pertemuan</span><span>1 Unit/Pertemuan</span><span>2 SKS • 2×50 menit</span><span>2 Proyek Individu</span><span>ESP32/Arduino</span><span>WYSIWYG</span></div></section>
    <form onSubmit={submit} className="glass-panel login-card"><img className="login-card-brand mpf-card-logo" src="/mpf-logo.png" alt="MPF"/><div className="row gap"><div className="icon-bubble teal"><ShieldCheck/></div><div><span className="eyebrow">AKSES MPF</span><h2>Masuk</h2></div></div><label className="field"><span>Email / NIM</span><input autoFocus value={identity} onChange={e=>setIdentity(e.target.value)} placeholder="NIM atau email" autoComplete="username"/></label><label className="field"><span>PIN</span><input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="PIN minimal 6 karakter" autoComplete="current-password"/></label>{error&&<div className="error-box">{error}</div>}<button disabled={busy||!identity||!pin} className="button primary large" type="submit"><LogIn/>{busy?'Memeriksa...':'Masuk ke MPF'}</button><p className="tiny muted">Database: Google Sheets • File: Google Drive • Frontend: Vercel/PWA</p></form></div>
  </div>;
}
