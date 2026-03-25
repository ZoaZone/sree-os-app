import { useState } from "react";
import { FolderOpen, Folder, FileCode, Search, ChevronRight, ChevronDown } from "lucide-react";
const TREE = [
  { n:"src", d:true, open:true, ch:[
    { n:"pages", d:true, open:true, ch:[
      {n:"Dashboard.jsx",e:"jsx"},{n:"Terminal.jsx",e:"jsx"},{n:"FileExplorer.jsx",e:"jsx"},
      {n:"AgentLogs.jsx",e:"jsx"},{n:"FlowBuilder.jsx",e:"jsx"},{n:"Settings.jsx",e:"jsx"},
      {n:"Login.jsx",e:"jsx"},{n:"Layout.jsx",e:"jsx"},
    ]},
    {n:"lib",d:true,ch:[{n:"utils.js",e:"js"}]},
    {n:"App.jsx",e:"jsx"},{n:"main.jsx",e:"jsx"},{n:"index.css",e:"css"},
  ]},
  {n:"public",d:true,ch:[{n:"favicon.svg",e:"svg"}]},
  {n:"package.json",e:"json"},{n:"vite.config.js",e:"js"},{n:"index.html",e:"html"},
];
const EC = {jsx:"text-blue-400",js:"text-yellow-400",css:"text-pink-400",json:"text-amber-400",html:"text-orange-400",svg:"text-purple-400"};
function Node({node,depth=0}){
  const [open,setOpen]=useState(node.open||false);
  const isD=node.d;
  return(
    <div>
      <div onClick={()=>isD&&setOpen(o=>!o)} className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-muted/20 cursor-pointer" style={{paddingLeft:`${8+depth*14}px`}}>
        {isD?(open?<ChevronDown className="w-3 h-3 text-muted-foreground"/>:<ChevronRight className="w-3 h-3 text-muted-foreground"/>):<span className="w-3"/>}
        {isD?(open?<FolderOpen className="w-4 h-4 text-amber-400"/>:<Folder className="w-4 h-4 text-amber-400"/>):<FileCode className={`w-4 h-4 ${EC[node.e]||"text-muted-foreground"}`}/>}
        <span className={`text-sm ${isD?"font-medium text-foreground":"text-muted-foreground"}`}>{node.n}</span>
      </div>
      {isD&&open&&node.ch?.map((c,i)=><Node key={i} node={c} depth={depth+1}/>)}
    </div>
  );
}
export default function FileExplorer(){
  return(
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-foreground flex items-center gap-2"><FolderOpen className="w-6 h-6 text-amber-400"/>File Explorer</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-3 py-2.5 border-b border-border text-xs text-muted-foreground font-mono">sree-os-app/</div>
          <div className="p-2 max-h-96 overflow-y-auto">{TREE.map((n,i)=><Node key={i} node={n}/>)}</div>
        </div>
        <div className="md:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="text-xs font-mono text-muted-foreground mb-4 pb-3 border-b border-border">src/App.jsx</div>
          <pre className="text-xs font-mono text-green-400/80 leading-relaxed overflow-auto max-h-80">{`import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";

const qc = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/terminal"  element={<Terminal />} />
            <Route path="/files"     element={<FileExplorer />} />
            <Route path="/logs"      element={<AgentLogs />} />
            <Route path="/flows"     element={<FlowBuilder />} />
            <Route path="/settings"  element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}`}</pre>
        </div>
      </div>
    </div>
  );
}
