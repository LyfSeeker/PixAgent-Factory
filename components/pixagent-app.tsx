"use client";

import { useMemo, useState } from "react";
import { Bell, Bot, ChevronRight, CircleHelp, ClipboardList, Code2, FolderKanban, LayoutDashboard, Menu, Plus, Settings, Sparkles, Users, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type Status = "working" | "waiting" | "approval" | "blocked" | "idle" | "complete";
type Agent = { id: string; name: string; role: string; skills: string[]; status: Status; task: string; progress: number; color: string; queue: number; spot: string };

const seedAgents: Agent[] = [
  { id: "maya", name: "Maya Park", role: "Frontend Engineer", skills: ["React", "Next.js", "TypeScript"], status: "working", task: "Build event dashboard", progress: 68, color: "#f18955", queue: 2, spot: "desk-a" },
  { id: "alex", name: "Alex Rivera", role: "Backend Engineer", skills: ["Node.js", "PostgreSQL", "APIs"], status: "working", task: "Create events API", progress: 81, color: "#5ea8e5", queue: 1, spot: "desk-b" },
  { id: "leo", name: "Leo Bennett", role: "UI / UX Engineer", skills: ["Design systems", "Tailwind", "UX"], status: "complete", task: "Design component system", progress: 100, color: "#b987df", queue: 0, spot: "desk-c" },
  { id: "sara", name: "Sara Okafor", role: "QA Engineer", skills: ["Playwright", "Testing", "Debugging"], status: "blocked", task: "Verify registration flow", progress: 32, color: "#efb557", queue: 2, spot: "desk-d" },
  { id: "max", name: "Max Chen", role: "Code Reviewer", skills: ["Architecture", "Security", "Review"], status: "approval", task: "Approve deployment plan", progress: 92, color: "#62c9a1", queue: 1, spot: "desk-e" },
];

const nav = [
  { label: "Studio", href: "/", icon: LayoutDashboard }, { label: "Agents", href: "/agents", icon: Users },
  { label: "Projects", href: "/projects", icon: FolderKanban }, { label: "Tasks", href: "/tasks", icon: ClipboardList },
  { label: "Activity", href: "/activity", icon: Bell }, { label: "Analytics", href: "/analytics", icon: Code2 },
];

const statusMeta: Record<Status, { label: string; dot: string }> = {
  working: { label: "Working", dot: "green" }, waiting: { label: "Waiting", dot: "amber" }, approval: { label: "Needs approval", dot: "blue" }, blocked: { label: "Blocked", dot: "red" }, idle: { label: "Idle", dot: "gray" }, complete: { label: "Completed", dot: "green" },
};

export function PixAgentApp() {
  const pathname = usePathname(); const router = useRouter();
  const [agents, setAgents] = useState(seedAgents); const [selectedId, setSelectedId] = useState("maya");
  const [showHire, setShowHire] = useState(false); const [demoStep, setDemoStep] = useState(0); const [notice, setNotice] = useState("Review required");
  const selected = agents.find(a => a.id === selectedId) ?? agents[0];
  const active = nav.find(n => n.href === pathname)?.label ?? "Studio";
  const metrics = useMemo(() => ({ done: agents.filter(a => a.status === "complete").length + 8, work: agents.filter(a => a.status === "working").length + 2, blockers: agents.filter(a => a.status === "blocked").length }), [agents]);
  const navigate = (href: string) => router.push(href);
  const updateName = (name: string) => setAgents(old => old.map(a => a.id === selected.id ? { ...a, name } : a));
  const runDemo = () => { setDemoStep(s => (s + 1) % 4); setAgents(old => old.map(a => a.id === "sara" ? { ...a, status: demoStep === 1 ? "working" : "blocked", progress: demoStep === 1 ? 54 : a.progress } : a)); setNotice(demoStep === 1 ? "Sara resumed after API contract landed" : "Demo sequence is running"); };

  return <main className="app-shell">
    <aside className="rail">
      <a className="brand" onClick={() => navigate("/")}><span className="brand-mark">P</span><span>PIXAGENT</span></a>
      <div className="nav-stack">{nav.map(item => <button key={item.label} onClick={() => navigate(item.href)} className={`nav-item ${active === item.label ? "active" : ""}`}><item.icon size={19}/><span>{item.label}</span></button>)}</div>
      <button className="nav-item rail-bottom" onClick={() => navigate("/settings")}><Settings size={19}/><span>Settings</span></button>
    </aside>
    <section className="workspace">
      <header className="topbar"><div className="crumb"><span className="pulse-dot"/> <span>Northstar workspace</span><ChevronRight size={15}/><strong>{active}</strong></div><div className="top-actions"><button className="icon-button"><CircleHelp size={18}/></button><button className="notification"><Bell size={18}/><i/></button><div className="user-avatar">LK</div></div></header>
      {active === "Studio" ? <Studio agents={agents} selected={selected} onSelect={setSelectedId} onHire={() => setShowHire(true)} onDemo={runDemo} demoStep={demoStep} metrics={metrics} notice={notice} onNavigate={navigate}/> : <DashboardView title={active} agents={agents} metrics={metrics} onSelect={setSelectedId} onNavigate={navigate}/>} 
    </section>
    {active === "Studio" && <AgentDrawer agent={selected} onClose={() => setSelectedId("")} onName={updateName} notice={notice}/>} 
    {showHire && <HireModal onClose={() => setShowHire(false)} onHire={(agent) => { setAgents(a => [...a, agent]); setSelectedId(agent.id); setShowHire(false); }}/>} 
  </main>;
}

function Studio({ agents, selected, onSelect, onHire, onDemo, demoStep, metrics, notice, onNavigate }: { agents: Agent[]; selected: Agent; onSelect: (id: string) => void; onHire: () => void; onDemo: () => void; demoStep: number; metrics: {done:number;work:number;blockers:number}; notice:string; onNavigate:(url:string)=>void }) {
  return <div className="studio-page"><section className="studio-heading"><div><p className="eyebrow">AI SOFTWARE STUDIO</p><h1>Good morning, Lyf <span>✦</span></h1><p className="subtle">Your agents are making steady progress on Student Events.</p></div><div className="heading-actions"><button className="ghost-btn" onClick={onHire}><Plus size={17}/> Hire agent</button><button className="primary-btn" onClick={onDemo}><Sparkles size={17}/>{demoStep ? "Advance demo" : "Run demo project"}</button></div></section>
    <section className="office-wrap"><div className="office-toolbar"><div><span className="live-indicator">LIVE</span><b>Company studio</b><span className="office-sub">5 agents online</span></div><button className="minimap"><Menu size={15}/> Office map</button></div>
      <div className="office-scene">
        <div className="window"><div className="city"/><span className="sun"/></div><div className="shelf"><i/><i/><i/><i/></div><div className="whiteboard"><span>SPRINT 04</span><b>Ship event flow</b><i/><i/></div><div className="server"><i/><i/><i/><i/><i/></div><div className="plant p1">♣</div><div className="plant p2">♣</div><div className="plant p3">♣</div><div className="rug rug1"/><div className="rug rug2"/><div className="cat">⌁</div>
        {agents.map((agent, idx) => <button key={agent.id} className={`desk ${agent.spot} ${selected.id === agent.id ? "desk-selected" : ""}`} onClick={() => onSelect(agent.id)}><div className="screen"><span/></div><div className="desk-lamp"/><div className="keyboard"/><div className="person" style={{ "--hair": agent.color } as React.CSSProperties}><i className="head"/><i className="body"/></div>{agent.status === "blocked" && <b className="agent-badge danger">!</b>}{agent.status === "approval" && <b className="agent-badge approve">?</b>}{agent.status === "complete" && <b className="agent-badge done">✓</b>}<span className="agent-label">{agent.name.split(" ")[0]} <em className={statusMeta[agent.status].dot}/></span></button>)}
        <button className="manager-desk" onClick={() => onNavigate("/projects")}><Bot size={25}/><span>ORCHESTRATOR</span><small>Click to see plan</small></button>
      </div>
      <div className="office-footer"><span>● Studio online</span><span>🌤 21°</span><span>Tue, 19 Sep</span></div>
    </section>
    <section className="below-office"><div className="project-strip"><div className="project-icon">SE</div><div><p className="eyebrow">ACTIVE PROJECT</p><h3>Student Event Management Platform</h3><p>12 of 14 tasks complete · Target: today</p></div><div className="project-progress"><div><span>86% complete</span><b>12/14</b></div><div className="progress"><i style={{width:"86%"}}/></div></div><button onClick={() => onNavigate("/tasks")} className="open-btn">Open board <ChevronRight size={16}/></button></div>
      <div className="bottom-grid"><div className="activity-card"><div className="card-title"><div><p className="eyebrow">LIVE SIGNALS</p><h3>Agent activity</h3></div><button onClick={() => onNavigate("/activity")}>View all</button></div><Activity notice={notice}/></div><div className="metrics-card"><p className="eyebrow">PROJECT PULSE</p><div className="metric-main"><b>86%</b><span>on track</span></div><div className="metric-row"><span>In progress <b>{metrics.work}</b></span><span>Blocked <b className="red-text">{metrics.blockers}</b></span><span>Done <b>{metrics.done}</b></span></div><button className="approval-alert"><span>✦</span><div><b>Decision needed</b><small>Approve deployment policy</small></div><ChevronRight size={17}/></button></div></div>
    </section>
  </div>;
}

function Activity({ notice }: {notice:string}) { const lines = [["10:48", "Alex", "published the event API contract", "green"], ["10:49", "Maya", "started API integration", "green"], ["10:52", "Sara", "is blocked by registration edge case", "red"], ["10:55", "Max", notice.toLowerCase(), "blue"]]; return <div className="activity-list">{lines.map((l, i) => <div className="activity" key={i}><time>{l[0]}</time><i className={`activity-dot ${l[3]}`}/><p><b>{l[1]}</b> {l[2]}</p></div>)}</div> }

function AgentDrawer({ agent, onClose, onName, notice }: {agent:Agent;onClose:()=>void;onName:(name:string)=>void;notice:string}) { const [editing, setEditing] = useState(false); return <aside className="agent-drawer"><div className="drawer-top"><span><Users size={16}/> COWORKER PROFILE</span><button onClick={onClose}><X size={19}/></button></div><div className="agent-hero"><div className="portrait" style={{background:agent.color}}>{agent.name.split(" ").map(x=>x[0]).join("")}</div><div>{editing ? <input autoFocus className="name-input" value={agent.name} onChange={e=>onName(e.target.value)} onBlur={()=>setEditing(false)} onKeyDown={e=> e.key === "Enter" && setEditing(false)}/> : <h2 onClick={()=>setEditing(true)} title="Click to rename">{agent.name} <small>✎</small></h2>}<p>{agent.role}</p><span className={`status-pill ${statusMeta[agent.status].dot}`}><i/> {statusMeta[agent.status].label}</span></div></div><div className="drawer-section"><p className="section-label">CURRENT ASSIGNMENT</p><div className="assignment"><div><b>{agent.task}</b><span>{agent.progress}% complete · Current sprint</span></div><ChevronRight size={18}/></div><div className="progress agent-progress"><i style={{width:`${agent.progress}%`}}/></div></div><div className="drawer-section"><p className="section-label">CAPACITY</p><div className="capacity"><div><span>Active work</span><b>{agent.queue} / 3 tasks</b></div><div className="capacity-bars"><i/><i className="filled"/><i className="filled"/></div></div></div><div className="drawer-section"><p className="section-label">SPECIALTIES</p><div className="skill-list">{agent.skills.map(s=><span key={s}>{s}</span>)}</div></div><div className="drawer-section"><p className="section-label">RECENT SIGNAL</p><div className="signal-note">{notice}</div></div><button className="drawer-cta"><ClipboardList size={17}/> View task history</button></aside> }

function HireModal({onClose,onHire}:{onClose:()=>void;onHire:(agent:Agent)=>void}) { const [name,setName]=useState(""); const [role,setRole]=useState("Full-stack Engineer"); return <div className="modal-backdrop"><div className="hire-modal"><button className="modal-close" onClick={onClose}><X size={19}/></button><span className="modal-icon"><Bot size={23}/></span><p className="eyebrow">EXPAND YOUR CREW</p><h2>Hire an AI coworker</h2><p className="subtle">Give them a name and choose the specialization for your studio.</p><label>Agent name<input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Nia Patel" autoFocus/></label><label>Primary role<select value={role} onChange={e=>setRole(e.target.value)}><option>Full-stack Engineer</option><option>Product Designer</option><option>DevOps Engineer</option><option>Data Engineer</option></select></label><button className="primary-btn wide" disabled={!name.trim()} onClick={()=>onHire({id:`agent-${Date.now()}`,name:name.trim(),role,skills:["TypeScript","Problem solving","Collaboration"],status:"idle",task:"Available for assignment",progress:0,color:"#e9809c",queue:0,spot:"desk-e"})}>Hire {name || "agent"}</button></div></div> }

function DashboardView({title,agents,metrics,onSelect,onNavigate}:{title:string;agents:Agent[];metrics:{done:number;work:number;blockers:number};onSelect:(x:string)=>void;onNavigate:(x:string)=>void}) { if(title === "Agents") return <div className="dashboard-page"><div className="view-heading"><p className="eyebrow">YOUR AI WORKFORCE</p><h1>Agent command center</h1><p>Manage capacity, skills and execution state across your studio.</p></div><div className="agent-grid">{agents.map(a=><button className="agent-card" key={a.id} onClick={()=>{onSelect(a.id);onNavigate("/")}}><div className="portrait sm" style={{background:a.color}}>{a.name.split(" ").map(x=>x[0]).join("")}</div><span className={`status-pill ${statusMeta[a.status].dot}`}><i/> {statusMeta[a.status].label}</span><h3>{a.name}</h3><p>{a.role}</p><div className="skill-list">{a.skills.slice(0,2).map(x=><span key={x}>{x}</span>)}</div><div className="mini-progress"><span>{a.task}</span><b>{a.progress}%</b><div className="progress"><i style={{width:`${a.progress}%`}}/></div></div></button>)}</div></div>;
  const cards = title === "Tasks" ? ["Backlog", "Ready", "In progress", "Waiting", "Blocked", "Review", "Done"] : title === "Analytics" ? ["14 tasks", `${metrics.done} completed`, `${metrics.work} active`, `${metrics.blockers} blocked`] : ["Student Event Management", "Developer portal refresh", "API reliability sprint"];
  return <div className="dashboard-page"><div className="view-heading"><p className="eyebrow">NORTHSTAR WORKSPACE</p><h1>{title === "Tasks" ? "Factory task board" : title}</h1><p>{title === "Tasks" ? "Every task, owner and dependency in one observable flow." : "An original control surface for your AI software factory."}</p></div>{title === "Activity" ? <div className="timeline-panel"><Activity notice="requested review for deployment policy"/><Activity notice="completed component specifications"/></div> : <div className={title === "Tasks" ? "task-columns" : "summary-grid"}>{cards.map((x,i)=><div className="data-panel" key={x}><p className="eyebrow">{title === "Tasks" ? x.toUpperCase() : "PROJECT SIGNAL"}</p><h2>{x}</h2><p>{title === "Tasks" ? (i===2 ? "Build API integration · Maya Park" : i===4 ? "Registration edge case · Sara" : "No tasks waiting") : "Live studio data will appear here in the connected production version."}</p>{title === "Analytics" && <div className="metric-main"><b>{["86%","12","37","1"][i]}</b><span>{["delivery health","tasks shipped","agent actions","open issue"][i]}</span></div>}</div>)}</div>}</div> }
