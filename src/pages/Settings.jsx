import { useState } from "react";
import { Settings, Key, Globe, Bell, Save, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";
const TABS=[{v:"general",l:"General",Icon:Globe},{v:"apikeys",l:"API Keys",Icon:Key},{v:"notifications",l:"Notifications",Icon:Bell}];
export default function SettingsPage(){
  const [tab,setTab]=useState("general");
  const [saved,setSaved]=useState(false);
  const [saving,setSaving]=useState(false);
  const [show,setShow]=useState({});
  const [general,setGeneral]=useState({app_name:"Sree OS",base_url:"https://os.aevoice.ai",theme:"dark"});
  const [keys,setKeys]=useState({openai_key:"",github_token:"",twilio_sid:"",sendgrid_key:""});
  const save=async()=>{setSaving(true);await new Promise(r=>setTimeout(r,800));setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2500);};
  return(
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-foreground flex items-center gap-2"><Settings className="w-6 h-6 text-purple-400"/>Settings</h1>
      <div className="flex gap-2 border-b border-border pb-1">
        {TABS.map(t=>(
          <button key={t.v} onClick={()=>setTab(t.v)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all ${tab===t.v?"text-purple-400 border-b-2 border-purple-500":"text-muted-foreground hover:text-foreground"}`}>
            <t.Icon className="w-4 h-4"/>{t.l}
          </button>
        ))}
      </div>
      {tab==="general"&&(
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          {[{k:"app_name",l:"App Name"},{k:"base_url",l:"Base URL"}].map(f=>(
            <div key={f.k} className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground">{f.l}</label>
            <input value={general[f.k]} onChange={e=>setGeneral(p=>({...p,[f.k]:e.target.value}))} className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
          ))}
          <div className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground">Theme</label>
          <select value={general.theme} onChange={e=>setGeneral(p=>({...p,theme:e.target.value}))} className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none">
            <option value="dark">Dark</option><option value="light">Light</option>
          </select></div>
          <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
            {saving?<Loader2 className="w-4 h-4 animate-spin"/>:saved?<><CheckCircle2 className="w-4 h-4"/>Saved!</>:<><Save className="w-4 h-4"/>Save</>}
          </button>
        </div>
      )}
      {tab==="apikeys"&&(
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          {[{k:"openai_key",l:"OpenAI API Key",ph:"sk-..."},{k:"github_token",l:"GitHub Token",ph:"ghp_..."},{k:"twilio_sid",l:"Twilio SID",ph:"ACxxx"},{k:"sendgrid_key",l:"SendGrid Key",ph:"SG.xxx"}].map(f=>(
            <div key={f.k} className="space-y-1.5"><label className="text-xs font-medium text-muted-foreground">{f.l}</label>
            <div className="relative">
              <input type={show[f.k]?"text":"password"} value={keys[f.k]} onChange={e=>setKeys(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph}
                className="w-full h-9 px-3 pr-9 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono"/>
              <button onClick={()=>setShow(p=>({...p,[f.k]:!p[f.k]}))} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show[f.k]?<EyeOff className="w-3.5 h-3.5"/>:<Eye className="w-3.5 h-3.5"/>}
              </button>
            </div></div>
          ))}
          <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
            {saving?<Loader2 className="w-4 h-4 animate-spin"/>:saved?<><CheckCircle2 className="w-4 h-4"/>Saved!</>:"Save Keys"}
          </button>
        </div>
      )}
      {tab==="notifications"&&(
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
          {["Agent task completed","Error alerts","Health check failures","GitHub sync events","Daily digest"].map(n=>(
            <div key={n} className="flex items-center justify-between p-3 border border-border rounded-xl">
              <p className="text-sm font-medium text-foreground">{n}</p>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-purple-500"/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
