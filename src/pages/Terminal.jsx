import { useState, useRef, useEffect } from "react";
import { Terminal as T, ChevronRight } from "lucide-react";
const INIT = [
  { t:"sys", v:"Sree OS Terminal v1.0 — type 'help' for commands" },
  { t:"sys", v:"Connected to AEVOICE infrastructure · Session secured" },
];
const CMDS = {
  help:   ()=>["Available commands:","  health  agents  deploy  logs  clear  whoami"],
  health: ()=>["Running health check…","  ✓ AEVOICE API — 42ms","  ✓ Sree Engine — 18ms","  ⚠ Twilio Webhook — degraded","Done."],
  agents: ()=>["Active agents:","  [1] SriChat — voice chatbot — running","  [2] SreeDev — developer agent — running","  [3] MarketingHub — content gen — running"],
  deploy: ()=>["Pulling ZoaZone/sree-os-app…","Building…","Deploying to os.aevoice.ai…","✓ Deployed successfully."],
  logs:   ()=>["[INFO]  getSreeHealth — OK","[WARN]  twilioWebhook — 1200ms timeout","[INFO]  postCallLearning — 3 records processed"],
  whoami: ()=>["User: admin@aevoice.ai","Role: super-admin","App: Sree OS"],
  clear:  ()=>null,
};
export default function Terminal() {
  const [hist, setHist] = useState(INIT);
  const [inp, setInp] = useState("");
  const [cmds, setCmds] = useState([]);
  const [idx, setIdx] = useState(-1);
  const bot = useRef(null);
  const ref = useRef(null);
  useEffect(()=>{ bot.current?.scrollIntoView({behavior:"smooth"}); },[hist]);
  const run = (cmd) => {
    const c = cmd.trim().toLowerCase(); if(!c) return;
    setCmds(h=>[c,...h]); setIdx(-1);
    setHist(h=>[...h,{t:"in",v:"$ "+c}]);
    if(c==="clear"){ setHist(INIT); return; }
    const fn = CMDS[c];
    if(fn){ const out=fn(); if(out) setHist(h=>[...h,...out.map(v=>({t:"out",v}))]); }
    else   setHist(h=>[...h,{t:"err",v:`Not found: ${c}. Try 'help'.`}]);
  };
  const onKey = (e) => {
    if(e.key==="Enter"){ run(inp); setInp(""); }
    else if(e.key==="ArrowUp"){ const i=Math.min(idx+1,cmds.length-1); setIdx(i); setInp(cmds[i]||""); }
    else if(e.key==="ArrowDown"){ const i=Math.max(idx-1,-1); setIdx(i); setInp(i===-1?"":cmds[i]||""); }
  };
  const COLOR = { sys:"text-blue-400/70", in:"text-purple-400", out:"text-green-400/90", err:"text-red-400" };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-foreground flex items-center gap-2"><T className="w-6 h-6 text-purple-400"/>Terminal</h1>
      <div className="bg-[#050505] border border-border rounded-2xl overflow-hidden font-mono" onClick={()=>ref.current?.focus()}>
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/50">
          <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/70"/><div className="w-3 h-3 rounded-full bg-amber-500/70"/><div className="w-3 h-3 rounded-full bg-emerald-500/70"/></div>
          <span className="text-xs text-muted-foreground ml-2">sree@os.aevoice.ai:~</span>
        </div>
        <div className="p-4 h-96 overflow-y-auto space-y-1">
          {hist.map((l,i)=><div key={i} className={`text-sm leading-relaxed ${COLOR[l.t]}`}>{l.v}</div>)}
          <div ref={bot}/>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
          <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0"/>
          <input ref={ref} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={onKey}
            placeholder="type a command…" autoFocus
            className="flex-1 bg-transparent text-sm text-foreground focus:outline-none placeholder-muted-foreground/30 font-mono"/>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {["help","health","agents","logs","deploy"].map(c=>(
          <button key={c} onClick={()=>run(c)} className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-mono text-muted-foreground hover:text-purple-400 hover:border-purple-500/30 transition-all">{c}</button>
        ))}
      </div>
    </div>
  );
}
