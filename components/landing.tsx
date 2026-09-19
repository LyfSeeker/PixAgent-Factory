import Link from "next/link";

export function Landing() {
  return <main className="noctra-landing">
    <header className="landing-nav"><Link className="landing-mark" href="/"><span>✦</span> PIXAGENT</Link><nav><a href="#system">System</a><a href="#workflow">Workflow</a><Link href="/workspace">Workspace ↗</Link></nav></header>
    <section className="landing-hero">
      <div className="hero-copy"><p className="landing-kicker">OBSERVABLE AI SOFTWARE STUDIO · 2026</p><h1>PIX<br/><em>AGENT</em><br/>FAACTORY</h1><p className="landing-lede">A pixel operations system for directing your coding agents with scoped work, visible evidence, and human approval gates.</p><div className="hero-actions"><Link className="workspace-link" href="/workspace">Go to Agent Workspace <span>→</span></Link><a className="text-link" href="#workflow">Explore the system ↓</a></div></div>
      <div className="hero-world" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="moon"/><div className="signal">● ● ●</div><div className="pixel-mountain mountain-back"/><div className="pixel-mountain mountain-front"/><div className="factory-window"><i/><i/><i/><i/></div><div className="tiny-worker">▣</div></div>
    </section>
    <section className="landing-marquee"><span>SCOPED TASKS</span><i>✦</i><span>VISIBLE QUEUES</span><i>✦</i><span>HUMAN GATES</span><i>✦</i><span>REAL AGENT SESSIONS</span></section>
    <section id="system" className="landing-grid"><article><p>01 / OBSERVE</p><h2>See the work,<br/>not just the workers.</h2><span>Every task holds its owner, blocker, evidence, next decision and execution environment.</span></article><article><p>02 / ORCHESTRATE</p><h2>Scope tools<br/>before dispatch.</h2><span>Distinct capabilities keep concurrent agents from inventing dependencies or colliding in the same workspace.</span></article><article><p>03 / DECIDE</p><h2>Keep the human<br/>at the controls.</h2><span>Reviews, approvals and verification requests arrive with the context needed to make a call.</span></article></section>
    <section id="workflow" className="landing-workflow"><p className="landing-kicker">HOW THE FACTORY RUNS</p><div className="workflow-line"><span>BRIEF</span><i>→</i><span>SCOPED PLAN</span><i>→</i><span>PARALLEL BUILD</span><i>→</i><span>PROOF</span><i>→</i><span>DECISION</span></div><Link className="workspace-link inverse" href="/workspace">Enter the factory <span>→</span></Link></section>
    <footer>PIXAGENT FAACTORY <span>YOUR AI SOFTWARE STUDIO</span><span>BUILT FOR OBSERVABLE WORK</span></footer>
  </main>;
}
