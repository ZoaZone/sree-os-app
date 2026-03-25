import { useState, useEffect } from "react";
import { Cpu, Zap, GitBranch, ScrollText, Activity, Clock, CheckCircle2, AlertCircle, Circle, TrendingUp } from "lucide-react";
const TASKS = [
  { id:1, name:"Scan AEVOICE codebase",               status:"done",    time:"2 min ago",  type:"code"    },
  { id:2, name:"Generate marketing copy",             status:"done",    time:"18 min ago", type:"content" },
  { id:3, name:"Debug stripeWebhook.ts — 422 error",  status:"running", time:"just now",   type:"debug"   },
  { id:4, name:"Push 14 pages to ZoaZone/marketer",   status:"done",    time:"1 hr ago",   type:"deploy"  },
  { id:5, name:"Health check getSreeHealth",           status:"idle",    time:"scheduled",  type:"monitor" },
];
const S_ICON  = { done:<CheckCircle2 className="w-4 h-4 text-emerald-400"/>, running:<Activity className="w-4 h-4 text-purple-400 animate-pulse"/>, idle:<Circle className="w-4 h-4 text-muted-foreground"/>, error:<AlertCircle className="w-4 h-4 text-red-400"/> };
const S_COLOR = { done:"bg-emerald-500/10 text-emerald-400", running:"bg-purple-500/10 text-purple-400", idle:"bg-muted text-muted-foreground", error:"bg-red-500/10 text-red-400" };
const T_COLOR = { code:"bg-blue-500/10 text-blue-400", content:"bg-pink-500/10 text-pink-400", debug:"bg-amber-500/10 text-amber-400", deploy:"bg-indigo-500/10 text-indigo-400", monitor:"bg-teal-500/10 text-teal-400" };
const STATS = [
  { label:"Agent Tasks", value:"247", sub:"this session",  Icon:Zap,         color:"text-purple-400 bg-purple-500/10" },
  { label:"Flows Active", value:"3",  sub:"2 scheduled",   Icon:GitBranch,   color:"text-indigo-400 bg-indigo-500/10" },
  { label:"Log Events",  value:"1.8k",sub:"last 24h",      Icon:ScrollText,  color:"text-blue-400 bg-blue-500/10"   },
  { label:"Uptime",      value:"99.9%",sub:"30-day avg",   Icon:TrendingUp,  color:"text-emerald-400 bg-emerald-500/10" },
];
const SERVICES = [
  { name:"AEVOICE API",    status:"operational", ms:"42ms"  },
  { name:"Sree Engine",    status:"operational", ms:"18ms"  },
  { name:"GitHub Sync",    status:"operational", ms:"—"     },
  { name:"OpenAI Bridge",  status:"operational", ms:"320ms" },
  { name:"Twilio Webhook", status:"degraded",    ms:"1.2s"  },
];
export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  useEffect(()=>{ const t=setInterval(()=>setTime(new Date()),1000); return ()=>clearInterval(t); },[]);
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground flex items-center gap-2"><Cpu className="w-6 h-6 text-purple-400"/>Sree OS</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Agentic developer console — all systems nominal</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
          <span className="text-xs font-mono text-muted-foreground">{time.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(s=>(
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
            <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-3`}><s.Icon className={`w-4 h-4 ${s.color.split(" ")[0]}`}/></div>
            <div className="text-2xl font-black text-foreground">{s.value}</div>
            <div className="text-xs font-medium text-foreground/70">{s.label}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><Activity className="w-4 h-4 text-purple-400"/>Recent Tasks</h3>
          <span className="text-xs text-muted-foreground">{TASKS.filter(t=>t.status==="running").length} running</span>
        </div>
        <div className="divide-y divide-border">
          {TASKS.map(task=>(
            <div key={task.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20">
              {S_ICON[task.status]}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{task.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${T_COLOR[task.type]}`}>{task.type}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/>{task.time}</span>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${S_COLOR[task.status]}`}>{task.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-4">System Health</h3>
          <div className="space-y-3">
            {SERVICES.map(s=>(
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${s.status==="operational"?"bg-emerald-400":"bg-amber-400"}`}/>
                  <span className="text-sm text-foreground">{s.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">{s.ms}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${s.status==="operational"?"bg-emerald-500/10 text-emerald-400":"bg-amber-500/10 text-amber-400"}`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[["Run Health Check","from-purple-500 to-indigo-600"],["Pull Latest Logs","from-blue-500 to-cyan-600"],
              ["Sync GitHub","from-gray-600 to-gray-800"],["Clear Cache","from-amber-500 to-orange-600"],
              ["Deploy Functions","from-emerald-500 to-teal-600"],["Run Test Suite","from-pink-500 to-rose-600"]].map(([l,c])=>(
              <button key={l} className={`py-2.5 px-3 rounded-xl bg-gradient-to-r ${c} text-white text-xs font-semibold hover:opacity-90 text-left`}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
