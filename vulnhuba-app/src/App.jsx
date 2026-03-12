import { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend } from "recharts";

// ─── THEME ───────────────────────────────────────────────────────
const C = {
  bg: "#020c1b", bgCard: "#040e1f", bgDeep: "#010810",
  blue: "#1a6fff", electric: "#00b4ff", cyan: "#00e5ff",
  glow: "rgba(26,111,255,0.45)", cyanGlow: "rgba(0,229,255,0.35)",
  red: "#ff3366", orange: "#ff6b35", yellow: "#ffd60a", green: "#00ff9d",
  border: "#0d2a4a", borderBright: "#1a6fff",
  text: "#ddeeff", textSub: "#6b9bc4", textDim: "#2a5070",
  mono: "'Share Tech Mono', monospace",
  display: "'Orbitron', monospace",
  body: "'Rajdhani', sans-serif",
};

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{background:${C.bg};color:${C.text};font-family:${C.body};overflow-x:hidden;}
  ::-webkit-scrollbar{width:6px;height:6px;}
  ::-webkit-scrollbar-track{background:${C.bgDeep};}
  ::-webkit-scrollbar-thumb{background:${C.blue};border-radius:3px;}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
  @keyframes pulse{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.12);opacity:1}}
  @keyframes scanline{0%{top:-100%}100%{top:100%}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes glitch{0%,100%{clip-path:inset(0 0 98% 0)}20%{clip-path:inset(20% 0 60% 0)}40%{clip-path:inset(50% 0 30% 0)}60%{clip-path:inset(80% 0 5% 0)}80%{clip-path:inset(10% 0 85% 0)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
`;

// ─── MOCK DATA ────────────────────────────────────────────────────
const vulnData = [
  { id:"CVE-2024-001", type:"SQL Injection", target:"api.example.com/login", severity:"Critical", cvss:9.8, status:"Open", discovered:"2024-06-01", owasp:"A03:2021" },
  { id:"CVE-2024-002", type:"XSS Reflected", target:"app.example.com/search", severity:"High", cvss:7.5, status:"In Progress", discovered:"2024-06-02", owasp:"A03:2021" },
  { id:"CVE-2024-003", type:"IDOR", target:"api.example.com/user/profile", severity:"High", cvss:7.1, status:"Open", discovered:"2024-06-03", owasp:"A01:2021" },
  { id:"CVE-2024-004", type:"SSRF", target:"internal.example.com/fetch", severity:"Critical", cvss:9.1, status:"Resolved", discovered:"2024-06-04", owasp:"A10:2021" },
  { id:"CVE-2024-005", type:"Broken Auth", target:"app.example.com/admin", severity:"Medium", cvss:5.9, status:"Open", discovered:"2024-06-05", owasp:"A07:2021" },
  { id:"CVE-2024-006", type:"XXE", target:"api.example.com/xml", severity:"High", cvss:7.8, status:"In Progress", discovered:"2024-06-06", owasp:"A05:2021" },
  { id:"CVE-2024-007", type:"RCE", target:"cms.example.com/upload", severity:"Critical", cvss:10.0, status:"Open", discovered:"2024-06-07", owasp:"A08:2021" },
];

const pieData = [
  { name:"Critical", value:3, color: C.red },
  { name:"High", value:5, color: C.orange },
  { name:"Medium", value:4, color: C.yellow },
  { name:"Low", value:8, color: C.green },
];

const barData = [
  { month:"Jan", found:12, resolved:8 },
  { month:"Feb", found:19, resolved:14 },
  { month:"Mar", found:9, resolved:11 },
  { month:"Apr", found:24, resolved:18 },
  { month:"May", found:17, resolved:20 },
  { month:"Jun", found:31, resolved:22 },
];

const lineData = [
  { day:"Mon", score:72 }, { day:"Tue", score:68 }, { day:"Wed", score:55 },
  { day:"Thu", score:61 }, { day:"Fri", score:48 }, { day:"Sat", score:53 }, { day:"Sun", score:40 },
];

const radarData = [
  { vuln:"SQLi", score:85 }, { vuln:"XSS", score:72 }, { vuln:"IDOR", score:60 },
  { vuln:"SSRF", score:90 }, { vuln:"Auth", score:55 }, { vuln:"XXE", score:45 },
];

const aiResponses = {
  default: "🔍 Analyzing vulnerability data... I can help you understand CVE details, generate remediation code, assess CVSS scores, or run targeted scans. What would you like to know?",
  sqli: `**SQL Injection — Remediation Guide**\n\n✅ Use parameterized queries:\n\`\`\`python\ncursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))\n\`\`\`\n\n✅ Apply input validation & WAF rules\n✅ Principle of least privilege on DB user\n✅ CVSS Score: 9.8 (Critical)`,
  xss: `**XSS — Remediation Guide**\n\n✅ Encode all output:\n\`\`\`js\nconst safe = DOMPurify.sanitize(userInput);\n\`\`\`\n\n✅ Set Content-Security-Policy headers\n✅ Use HttpOnly & Secure cookie flags\n✅ CVSS Score: 7.5 (High)`,
  scan: "🛰️ Initiating intelligent scan on target... Mapping endpoints, testing payloads for SQLi, XSS, IDOR, SSRF, Auth bypass. ETA: ~90 seconds. Results will populate in the Evidence Hub.",
  report: "📊 Generating executive PDF report... Includes: 20 findings, CVSS breakdown, OWASP mapping, remediation timeline. Report ready in ~15 seconds.",
  cvss: "📐 CVSS v3.1 Scoring Engine: Base Score = Attack Vector × Attack Complexity × Privileges Required × User Interaction × Scope × Impact. I can calculate precise scores for any finding.",
};

// ─── SMALL ATOMS ─────────────────────────────────────────────────
const Tag = ({ label }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10, fontFamily:C.mono, fontSize:"0.7rem", color:C.electric, letterSpacing:"4px", textTransform:"uppercase", marginBottom:10 }}>
    <span style={{ display:"block", width:28, height:1, background:C.electric }} />
    {label}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{ fontFamily:C.display, fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:700, color:C.text, marginBottom:14 }}>{children}</h2>
);

const SectionDesc = ({ children }) => (
  <p style={{ color:C.textSub, fontSize:"1rem", lineHeight:1.7, maxWidth:620, marginBottom:50 }}>{children}</p>
);

const Chip = ({ label, color }) => (
  <span style={{ background:`${color}18`, color, border:`1px solid ${color}40`, borderRadius:3, padding:"2px 10px", fontSize:"0.7rem", fontFamily:C.mono, letterSpacing:1 }}>{label}</span>
);

const SeverityBadge = ({ s }) => {
  const map = { Critical:[C.red,"CRITICAL"], High:[C.orange,"HIGH"], Medium:[C.yellow,"MEDIUM"], Low:[C.green,"LOW"] };
  const [clr, lbl] = map[s] || [C.textSub, s];
  return <Chip label={lbl} color={clr} />;
};

// ─── NAV ─────────────────────────────────────────────────────────
const Nav = ({ active, setActive }) => {
  const links = ["Home","Problem","Solution","Dashboard","AI","Scan","Evidence","Team","Roadmap"];
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, background:"rgba(2,12,27,0.93)", backdropFilter:"blur(14px)", borderBottom:`1px solid ${C.border}`, padding:"0 32px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ fontFamily:C.display, fontWeight:900, fontSize:"1.1rem", color:C.cyan, letterSpacing:3, textShadow:`0 0 18px ${C.cyanGlow}` }}>
        VOID<span style={{ color:C.blue }}>ERR</span>
        <span style={{ fontFamily:C.mono, fontSize:"0.55rem", color:C.textDim, marginLeft:10, letterSpacing:2 }}>VULN HUB</span>
      </div>
      <div style={{ display:"flex", gap:4 }}>
        {links.map(l => (
          <button key={l} onClick={() => { setActive(l); document.getElementById(l.toLowerCase())?.scrollIntoView({behavior:"smooth"}); }}
            style={{ background: active===l ? `${C.blue}22` : "transparent", color: active===l ? C.cyan : C.textSub, border: active===l ? `1px solid ${C.blue}` : "1px solid transparent", padding:"6px 12px", cursor:"pointer", fontFamily:C.body, fontSize:"0.78rem", fontWeight:600, letterSpacing:2, textTransform:"uppercase", transition:"all 0.3s" }}>
            {l}
          </button>
        ))}
      </div>
      <button style={{ background:`linear-gradient(135deg,${C.blue},${C.electric})`, border:"none", color:C.bgDeep, padding:"8px 20px", fontFamily:C.body, fontWeight:700, fontSize:"0.82rem", letterSpacing:2, cursor:"pointer", clipPath:"polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)" }}>
        LAUNCH SCAN
      </button>
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────
const Hero = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(x => x+1), 80); return () => clearInterval(t); }, []);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
  const scramble = (word, progress) => word.split("").map((c,i) => i < progress ? c : chars[Math.floor(Math.random()*chars.length)]).join("");

  return (
    <div id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", padding:"80px 40px 40px", overflow:"hidden" }}>
      {/* Orbs */}
      {[{w:700,h:700,c:C.blue,op:.12,t:-150,r:-150},{w:400,h:400,c:C.cyan,op:.08,b:0,l:-80}].map((o,i) => (
        <div key={i} style={{ position:"absolute", width:o.w, height:o.h, background:`radial-gradient(circle,${o.c}${Math.round(o.op*255).toString(16).padStart(2,'0')},transparent 70%)`, borderRadius:"50%", filter:"blur(80px)", top:o.t, right:o.r, bottom:o.b, left:o.l, pointerEvents:"none", animation:`pulse ${6+i*2}s ease-in-out infinite ${i?"reverse":""}` }} />
      ))}
      {/* Grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.blue}0a 1px,transparent 1px),linear-gradient(90deg,${C.blue}0a 1px,transparent 1px)`, backgroundSize:"50px 50px", pointerEvents:"none" }} />

      <div style={{ textAlign:"center", maxWidth:900, position:"relative", zIndex:2, animation:"fadeUp 0.8s ease" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:`${C.blue}14`, border:`1px solid ${C.blue}`, borderRadius:20, padding:"6px 20px", marginBottom:32, fontFamily:C.mono, fontSize:"0.7rem", color:C.electric, letterSpacing:3 }}>
          <span style={{ width:6, height:6, background:C.green, borderRadius:"50%", animation:"blink 1.4s infinite" }} />
          ACTIVE — VULNERABILITY INTELLIGENCE PLATFORM
        </div>
        <h1 style={{ fontFamily:C.display, fontSize:"clamp(2.6rem,6.5vw,5.2rem)", fontWeight:900, lineHeight:1.1, letterSpacing:2, marginBottom:20 }}>
          <div style={{ color:C.text }}>VULNERABILITY</div>
          <div style={{ background:`linear-gradient(135deg,${C.electric},${C.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>KNOWLEDGE HUB</div>
        </h1>
        <p style={{ fontSize:"1.1rem", color:C.textSub, maxWidth:680, margin:"0 auto 44px", lineHeight:1.7 }}>
          A unified platform connecting vulnerability discovery, intelligent prioritization, and remediation guidance — with a fully searchable, timestamped evidence trail.
        </p>
        <div style={{ display:"flex", gap:50, justifyContent:"center", marginBottom:50, flexWrap:"wrap" }}>
          {[["60%","of breaches from unpatched vulns"],["206d","avg. breach identification time"],["15%","of CVEs ever remediated"],["10×","faster triage vs manual"]].map(([n,l]) => (
            <div key={n} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:C.display, fontSize:"2rem", fontWeight:900, color:C.cyan, textShadow:`0 0 18px ${C.cyanGlow}` }}>{n}</div>
              <div style={{ fontSize:"0.68rem", color:C.textDim, letterSpacing:2, textTransform:"uppercase", marginTop:4, maxWidth:120 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          {[["START SCANNING",`linear-gradient(135deg,${C.blue},${C.electric})`,C.bgDeep],["VIEW DASHBOARD","transparent",C.cyan]].map(([t,bg,clr],i) => (
            <button key={t} onClick={() => document.getElementById(i===0?"scan":"dashboard")?.scrollIntoView({behavior:"smooth"})}
              style={{ background:bg, border:`1px solid ${i===0?C.blue:C.cyan}`, color:clr, padding:"14px 34px", fontFamily:C.body, fontWeight:700, fontSize:"0.95rem", letterSpacing:2, textTransform:"uppercase", cursor:"pointer", clipPath:i===0?"polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)":"none", transition:"all 0.3s" }}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PROBLEM ──────────────────────────────────────────────────────
const Problem = () => (
  <section id="problem" style={{ padding:"80px 60px", maxWidth:1280, margin:"0 auto" }}>
    <Tag label="01 / THE PROBLEM" />
    <SectionTitle>Why Does This Problem Exist?</SectionTitle>
    <SectionDesc>Security teams have no single platform to discover, prioritize, remediate, and audit vulnerabilities — leaving critical gaps unaddressed.</SectionDesc>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24 }}>
      {[
        { icon:"⚡", title:"Scattered Discovery", text:"Vulnerabilities found across dozens of disconnected tools — no single pane of glass.", color:C.red },
        { icon:"🎯", title:"No Smart Prioritization", text:"Teams burn cycles on low-risk issues. Critical CVEs go unpatched for weeks.", color:C.orange },
        { icon:"📂", title:"Missing Evidence Trails", text:"No searchable audit log of who found what, when, and how it was remediated.", color:C.yellow },
      ].map(c => (
        <div key={c.title} style={{ background:C.bgCard, border:`1px solid ${c.color}30`, padding:"32px 28px", position:"relative", transition:"all 0.3s", cursor:"default" }}
          onMouseEnter={e => e.currentTarget.style.boxShadow=`0 0 24px ${c.color}30`}
          onMouseLeave={e => e.currentTarget.style.boxShadow="none"}>
          <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:`linear-gradient(180deg,${c.color},transparent)` }} />
          <div style={{ fontSize:"2.2rem", marginBottom:16 }}>{c.icon}</div>
          <div style={{ fontFamily:C.display, fontSize:"0.9rem", fontWeight:700, color:c.color, marginBottom:10, letterSpacing:1 }}>{c.title}</div>
          <div style={{ fontSize:"0.88rem", color:C.textSub, lineHeight:1.6 }}>{c.text}</div>
        </div>
      ))}
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:32 }}>
      {[["60%","of breaches involve unpatched vulns",C.red],["206 days","avg. time to identify a breach",C.orange],["15%","of CVEs are ever remediated",C.yellow]].map(([n,l,clr]) => (
        <div key={n} style={{ textAlign:"center", padding:"40px 20px", background:`linear-gradient(135deg,${clr}08,${C.bgCard})`, border:`1px solid ${clr}25` }}>
          <div style={{ fontFamily:C.display, fontSize:"3rem", fontWeight:900, color:clr, textShadow:`0 0 20px ${clr}60` }}>{n}</div>
          <div style={{ fontSize:"0.82rem", color:C.textSub, marginTop:10, letterSpacing:1 }}>{l}</div>
        </div>
      ))}
    </div>
  </section>
);

// ─── SOLUTION ─────────────────────────────────────────────────────
const Solution = () => (
  <section id="solution" style={{ padding:"80px 60px", maxWidth:1280, margin:"0 auto", background:`linear-gradient(180deg,${C.bgDeep},${C.bg})` }}>
    <Tag label="02 / OUR SOLUTION" />
    <SectionTitle>Introducing the Vulnerability Knowledge Hub</SectionTitle>
    <SectionDesc>A unified platform: auto-scan → smart prioritize → AI-guided remediation → searchable evidence trail.</SectionDesc>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
      {[
        { icon:"🔭", num:"01", title:"DISCOVER", desc:"Auto-scans web assets. Finds SQLi, XSS, IDOR, Auth flaws & more.", color:C.electric },
        { icon:"⚖️", num:"02", title:"PRIORITIZE", desc:"CVSS v3.1 engine surfaces critical issues first, not noise.", color:C.cyan },
        { icon:"🔧", num:"03", title:"REMEDIATE", desc:"Fix suggestions with code patches mapped to OWASP & CVE.", color:C.green },
        { icon:"🗄️", num:"04", title:"EVIDENCE HUB", desc:"Every scan & fix stored with full searchable audit trail.", color:C.blue },
      ].map(c => (
        <div key={c.num} style={{ background:C.bgCard, border:`1px solid ${C.border}`, padding:"36px 24px", position:"relative", overflow:"hidden", transition:"all 0.35s", cursor:"default" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=c.color; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 0 30px ${c.color}30`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
          <div style={{ position:"absolute", top:16, right:16, fontFamily:C.mono, fontSize:"0.65rem", color:C.textDim }}>{c.num}</div>
          <div style={{ fontSize:"2rem", marginBottom:16 }}>{c.icon}</div>
          <div style={{ fontFamily:C.display, fontSize:"0.85rem", fontWeight:700, color:c.color, marginBottom:12, letterSpacing:2 }}>{c.title}</div>
          <div style={{ fontSize:"0.88rem", color:C.textSub, lineHeight:1.6 }}>{c.desc}</div>
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${c.color},transparent)` }} />
        </div>
      ))}
    </div>
  </section>
);

// ─── DASHBOARD ────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, padding:"10px 14px", fontFamily:C.mono, fontSize:"0.75rem" }}>
      <div style={{ color:C.textSub, marginBottom:6 }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color:p.color }}>{p.name}: {p.value}</div>)}
    </div>
  );
};

const Dashboard = () => {
  const stats = [
    { val:"1,248", lbl:"Total Scans", clr:C.blue },
    { val:"342", lbl:"Active Vulns", clr:C.red },
    { val:"89%", lbl:"Remediation Rate", clr:C.green },
    { val:"9.1", lbl:"Avg CVSS", clr:C.orange },
  ];

  return (
    <section id="dashboard" style={{ padding:"80px 60px", background:C.bgDeep, maxWidth:"100%" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <Tag label="03 / DASHBOARD" />
        <SectionTitle>Security Intelligence Dashboard</SectionTitle>
        <SectionDesc>Real-time vulnerability metrics, trends, and risk posture overview.</SectionDesc>

        {/* Stats Row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
          {stats.map(s => (
            <div key={s.lbl} style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderTop:`2px solid ${s.clr}`, padding:"24px 20px", textAlign:"center" }}>
              <div style={{ fontFamily:C.display, fontSize:"2rem", fontWeight:700, color:s.clr, textShadow:`0 0 12px ${s.clr}50` }}>{s.val}</div>
              <div style={{ fontSize:"0.72rem", color:C.textDim, letterSpacing:2, textTransform:"uppercase", marginTop:6 }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
          <ChartCard title="VULNERABILITIES FOUND vs RESOLVED">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData}>
                <XAxis dataKey="month" stroke={C.textDim} tick={{ fontFamily:C.mono, fontSize:11, fill:C.textSub }} />
                <YAxis stroke={C.textDim} tick={{ fontFamily:C.mono, fontSize:11, fill:C.textSub }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontFamily:C.mono, fontSize:11, color:C.textSub }} />
                <Bar dataKey="found" name="Found" fill={C.blue} radius={[2,2,0,0]} />
                <Bar dataKey="resolved" name="Resolved" fill={C.green} radius={[2,2,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="SEVERITY DISTRIBUTION">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontFamily:C.mono, fontSize:11, color:C.textSub }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Charts Row 2 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <ChartCard title="RISK SCORE TREND (7 DAYS)">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={lineData}>
                <XAxis dataKey="day" stroke={C.textDim} tick={{ fontFamily:C.mono, fontSize:11, fill:C.textSub }} />
                <YAxis stroke={C.textDim} tick={{ fontFamily:C.mono, fontSize:11, fill:C.textSub }} domain={[30,100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" name="Risk Score" stroke={C.cyan} strokeWidth={2} dot={{ fill:C.cyan, r:4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="OWASP COVERAGE RADAR">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={C.border} />
                <PolarAngleAxis dataKey="vuln" tick={{ fontFamily:C.mono, fontSize:10, fill:C.textSub }} />
                <Radar name="Coverage" dataKey="score" stroke={C.electric} fill={C.electric} fillOpacity={0.15} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </section>
  );
};

const ChartCard = ({ title, children }) => (
  <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, padding:"24px 20px", position:"relative", overflow:"hidden" }}>
    <div style={{ fontFamily:C.mono, fontSize:"0.7rem", color:C.textSub, letterSpacing:2, textTransform:"uppercase", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
      <span style={{ color:C.electric }}>◈</span>{title}
    </div>
    {children}
  </div>
);

// ─── AI INTERFACE ─────────────────────────────────────────────────
const AIInterface = () => {
  const [msgs, setMsgs] = useState([
    { role:"ai", text:"👾 VoidErr AI online. I can analyze vulnerabilities, generate remediation code, assess CVSS scores, and answer any security question. How can I help?", time:"Now" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  const getReply = (q) => {
    const ql = q.toLowerCase();
    if (ql.includes("sql") || ql.includes("sqli")) return aiResponses.sqli;
    if (ql.includes("xss")) return aiResponses.xss;
    if (ql.includes("scan")) return aiResponses.scan;
    if (ql.includes("report") || ql.includes("pdf")) return aiResponses.report;
    if (ql.includes("cvss") || ql.includes("score")) return aiResponses.cvss;
    return `🔍 Analyzing: "${q}"\n\nBased on current vulnerability data, I've identified potential risk vectors. CVSS scoring, OWASP mapping, and remediation steps are available. Shall I run a targeted scan or generate a detailed report?`;
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role:"user", text:input, time:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) };
    setMsgs(m => [...m, userMsg]);
    setInput(""); setTyping(true);
    setTimeout(() => {
      setMsgs(m => [...m, { role:"ai", text:getReply(userMsg.text), time:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) }]);
      setTyping(false);
    }, 1200);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, typing]);

  const quickQuestions = ["How to fix SQL Injection?","Explain XSS remediation","Generate CVSS score","Scan target domain","Generate PDF report","What is IDOR?"];

  return (
    <section id="ai" style={{ padding:"80px 60px", background:C.bgDeep, maxWidth:"100%" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <Tag label="04 / AI INTELLIGENCE" />
        <SectionTitle>AI-Powered Security Advisor</SectionTitle>
        <SectionDesc>LLM-driven remediation engine with context-aware fix code, CVSS analysis, and OWASP mapping.</SectionDesc>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:20 }}>
          {/* Chat */}
          <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, display:"flex", flexDirection:"column", height:580 }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, background:`linear-gradient(135deg,${C.blue},${C.cyan})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem" }}>🤖</div>
              <div>
                <div style={{ fontFamily:C.display, fontSize:"0.82rem", color:C.cyan, fontWeight:700 }}>VoidErr AI</div>
                <div style={{ fontSize:"0.68rem", color:C.green, display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:6, height:6, background:C.green, borderRadius:"50%", animation:"blink 1.4s infinite" }} />
                  ONLINE — GPT/GEMINI POWERED
                </div>
              </div>
              <div style={{ marginLeft:"auto", fontFamily:C.mono, fontSize:"0.65rem", color:C.textDim }}>CVSS v3.1 ENGINE ACTIVE</div>
            </div>

            <div style={{ flex:1, overflowY:"auto", padding:20, display:"flex", flexDirection:"column", gap:14 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ maxWidth:"80%", alignSelf:m.role==="ai"?"flex-start":"flex-end", animation:"fadeUp 0.3s ease" }}>
                  <div style={{ padding:"12px 16px", fontSize:"0.86rem", lineHeight:1.65, borderRadius:2, whiteSpace:"pre-wrap",
                    background: m.role==="ai" ? `rgba(26,111,255,0.1)` : `rgba(0,229,255,0.08)`,
                    border: m.role==="ai" ? `1px solid ${C.border}` : `1px solid rgba(0,229,255,0.2)`,
                    borderLeft: m.role==="ai" ? `3px solid ${C.blue}` : `1px solid rgba(0,229,255,0.2)`,
                    color: C.text }}>
                    {m.text}
                  </div>
                  <div style={{ fontSize:"0.62rem", color:C.textDim, marginTop:4, fontFamily:C.mono, textAlign:m.role==="ai"?"left":"right" }}>{m.time}</div>
                </div>
              ))}
              {typing && (
                <div style={{ alignSelf:"flex-start", background:`rgba(26,111,255,0.1)`, border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.blue}`, padding:"12px 16px", borderRadius:2 }}>
                  <div style={{ display:"flex", gap:5 }}>
                    {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, background:C.blue, borderRadius:"50%", animation:`blink 1s infinite ${i*0.2}s` }} />)}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div style={{ padding:"14px 16px", borderTop:`1px solid ${C.border}`, display:"flex", gap:10 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()}
                placeholder="Ask about CVEs, CVSS scoring, remediation code..."
                style={{ flex:1, background:`rgba(26,111,255,0.05)`, border:`1px solid ${C.border}`, color:C.text, padding:"10px 14px", fontFamily:C.body, fontSize:"0.88rem", outline:"none" }} />
              <button onClick={send} style={{ background:`linear-gradient(135deg,${C.blue},${C.electric})`, border:"none", color:C.bgDeep, padding:"10px 22px", fontFamily:C.body, fontWeight:700, fontSize:"0.85rem", letterSpacing:1, cursor:"pointer" }}>
                SEND →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, padding:20 }}>
              <div style={{ fontFamily:C.mono, fontSize:"0.68rem", color:C.textSub, letterSpacing:2, marginBottom:14, textTransform:"uppercase" }}>⚡ QUICK QUERIES</div>
              {quickQuestions.map(q => (
                <div key={q} onClick={() => { setInput(q); }} style={{ padding:"10px 12px", borderBottom:`1px solid ${C.border}`, cursor:"pointer", fontSize:"0.82rem", color:C.textSub, transition:"all 0.2s", display:"flex", justifyContent:"space-between", alignItems:"center" }}
                  onMouseEnter={e => { e.currentTarget.style.color=C.cyan; e.currentTarget.style.paddingLeft="18px"; }}
                  onMouseLeave={e => { e.currentTarget.style.color=C.textSub; e.currentTarget.style.paddingLeft="12px"; }}>
                  {q} <span style={{ color:C.textDim }}>›</span>
                </div>
              ))}
            </div>
            <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, padding:20 }}>
              <div style={{ fontFamily:C.mono, fontSize:"0.68rem", color:C.textSub, letterSpacing:2, marginBottom:14, textTransform:"uppercase" }}>🧠 AI CAPABILITIES</div>
              {[["CVE Lookup","Instant"],["CVSS Scoring","Real-time"],["Fix Code Gen","Auto"],["OWASP Mapping","Full Top 10"],["Report Gen","< 15s"]].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}`, fontSize:"0.8rem" }}>
                  <span style={{ color:C.textSub }}>{k}</span>
                  <span style={{ color:C.green, fontFamily:C.mono, fontSize:"0.7rem" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SCAN ─────────────────────────────────────────────────────────
const Scan = () => {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [done, setDone] = useState(false);
  const [modules, setModules] = useState({ SQLi:true, XSS:true, IDOR:false, SSRF:true, Auth:true, XXE:false });
  const logRef = useRef(null);

  const scanLogs = [
    "[INIT] Initializing scan engine...",
    "[CRAWL] Mapping endpoints for target...",
    "[CRAWL] Discovered 34 endpoints, 12 forms",
    "[SQLi] Testing 48 SQL injection payloads...",
    "[SQLi] ⚠ Potential injection at /api/login?id=",
    "[XSS] Testing reflected XSS vectors...",
    "[XSS] ⚠ XSS found in /search?q= parameter",
    "[SSRF] Testing server-side request forgery...",
    "[AUTH] Testing authentication bypass...",
    "[AUTH] ⚠ Auth bypass detected at /admin",
    "[CVSS] Scoring findings via CVSS v3.1 engine...",
    "[INDEX] Indexing CVE/CWE mappings...",
    "[REPORT] Generating evidence trail...",
    "[DONE] ✅ Scan complete. 7 vulnerabilities found.",
  ];

  const startScan = () => {
    if (!url) return;
    setScanning(true); setProgress(0); setLogs([]); setDone(false);
    let step = 0;
    const iv = setInterval(() => {
      step++;
      const p = Math.min(Math.round((step / scanLogs.length) * 100), 100);
      setProgress(p);
      if (step <= scanLogs.length) setLogs(l => [...l, `[${new Date().toLocaleTimeString()}] ${scanLogs[step-1]}`]);
      if (step >= scanLogs.length) { clearInterval(iv); setScanning(false); setDone(true); }
    }, 700);
  };

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [logs]);

  return (
    <section id="scan" style={{ padding:"80px 60px", background:C.bgDeep, maxWidth:"100%" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <Tag label="05 / SCAN ENGINE" />
        <SectionTitle>Launch Vulnerability Scan</SectionTitle>
        <SectionDesc>Multi-module scanner: SQLi, XSS, IDOR, SSRF, Auth bypass, XXE — running in parallel via Celery queue.</SectionDesc>

        <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, padding:36, marginTop:10 }}>
          {/* URL Input */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:14, marginBottom:24 }}>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://target.example.com — Enter URL or IP range"
              style={{ background:`rgba(26,111,255,0.04)`, border:`1px solid ${C.border}`, color:C.text, padding:"14px 18px", fontFamily:C.mono, fontSize:"0.88rem", outline:"none", width:"100%" }} />
            <button onClick={startScan} disabled={scanning || !url}
              style={{ background: scanning ? C.bgDeep : `linear-gradient(135deg,${C.blue},${C.electric})`, border:`1px solid ${scanning?C.border:C.blue}`, color: scanning ? C.textDim : C.bgDeep, padding:"14px 28px", fontFamily:C.body, fontWeight:700, fontSize:"0.9rem", letterSpacing:2, cursor: scanning ? "not-allowed" : "pointer", clipPath:"polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)", transition:"all 0.3s" }}>
              {scanning ? "SCANNING..." : "LAUNCH SCAN"}
            </button>
          </div>

          {/* Modules */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:C.mono, fontSize:"0.68rem", color:C.textSub, letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>SCAN MODULES</div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {Object.entries(modules).map(([k, v]) => (
                <div key={k} onClick={() => setModules(m => ({...m,[k]:!m[k]}))}
                  style={{ padding:"8px 18px", border:`1px solid ${v?C.blue:C.border}`, background: v ? `${C.blue}18` : "transparent", color: v ? C.cyan : C.textSub, cursor:"pointer", fontFamily:C.mono, fontSize:"0.75rem", letterSpacing:1, transition:"all 0.3s" }}>
                  {v?"✓ ":""}{k}
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          {(scanning || done) && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontFamily:C.mono, fontSize:"0.75rem", color:C.textSub }}>
                <span>{done ? "✅ SCAN COMPLETE" : "🔄 SCANNING..."}</span>
                <span style={{ color: done ? C.green : C.cyan }}>{progress}%</span>
              </div>
              <div style={{ height:6, background:C.bg, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:16 }}>
                <div style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${C.blue},${C.cyan})`, boxShadow:`0 0 10px ${C.electric}`, transition:"width 0.4s ease" }} />
              </div>
              <div ref={logRef} style={{ background:C.bg, border:`1px solid ${C.border}`, padding:"14px 18px", maxHeight:180, overflowY:"auto", fontFamily:C.mono, fontSize:"0.72rem", color:C.green, lineHeight:1.9 }}>
                {logs.map((l,i) => <div key={i}>{l}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ─── EVIDENCE HUB ─────────────────────────────────────────────────
const Evidence = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = vulnData.filter(v =>
    (filter==="All" || v.severity===filter) &&
    (v.id.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase()) || v.target.toLowerCase().includes(search.toLowerCase()))
  );

  const th = { padding:"12px 16px", textAlign:"left", fontFamily:C.mono, fontSize:"0.68rem", color:C.textSub, letterSpacing:2, textTransform:"uppercase", borderBottom:`1px solid ${C.borderBright}`, background:`rgba(26,111,255,0.08)` };
  const td = { padding:"14px 16px", borderBottom:`1px solid ${C.border}`, fontSize:"0.84rem" };

  return (
    <section id="evidence" style={{ padding:"80px 60px", maxWidth:1280, margin:"0 auto" }}>
      <Tag label="06 / EVIDENCE HUB" />
      <SectionTitle>Searchable Vulnerability Database</SectionTitle>
      <SectionDesc>Every scan logged with full request/response pairs, CVE/CWE mappings, and analyst timestamps.</SectionDesc>

      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search CVE, type, or target..."
          style={{ flex:1, minWidth:240, background:`rgba(26,111,255,0.04)`, border:`1px solid ${C.border}`, color:C.text, padding:"10px 14px", fontFamily:C.mono, fontSize:"0.82rem", outline:"none" }} />
        {["All","Critical","High","Medium","Low"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding:"10px 16px", border:`1px solid ${filter===f?C.blue:C.border}`, background: filter===f?`${C.blue}20`:"transparent", color: filter===f?C.cyan:C.textSub, fontFamily:C.mono, fontSize:"0.72rem", letterSpacing:1, cursor:"pointer", transition:"all 0.3s" }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr>
              {["CVE ID","Type","Target","Severity","CVSS","OWASP","Status","Action"].map(h => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={v.id} style={{ background: i%2===0 ? "transparent" : `rgba(26,111,255,0.02)` }}
                onMouseEnter={e => e.currentTarget.style.background=`rgba(26,111,255,0.06)`}
                onMouseLeave={e => e.currentTarget.style.background=i%2===0?"transparent":`rgba(26,111,255,0.02)`}>
                <td style={{...td, fontFamily:C.mono, color:C.electric, fontSize:"0.78rem"}}>{v.id}</td>
                <td style={{...td, color:C.text}}>{v.type}</td>
                <td style={{...td, fontFamily:C.mono, color:C.textSub, fontSize:"0.78rem"}}>{v.target}</td>
                <td style={td}><SeverityBadge s={v.severity} /></td>
                <td style={{...td, fontFamily:C.mono, color: v.cvss>=9?C.red:v.cvss>=7?C.orange:C.yellow, fontWeight:700}}>{v.cvss}</td>
                <td style={{...td, fontFamily:C.mono, fontSize:"0.75rem", color:C.textSub}}>{v.owasp}</td>
                <td style={td}><Chip label={v.status} color={v.status==="Resolved"?C.green:v.status==="Open"?C.red:C.yellow} /></td>
                <td style={td}>
                  <button style={{ background:`${C.blue}18`, border:`1px solid ${C.blue}`, color:C.cyan, padding:"4px 12px", fontFamily:C.mono, fontSize:"0.68rem", cursor:"pointer", letterSpacing:1 }}>DETAILS</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding:"12px 16px", borderTop:`1px solid ${C.border}`, fontFamily:C.mono, fontSize:"0.7rem", color:C.textDim }}>
          Showing {filtered.length} of {vulnData.length} records — Full audit trail with request/response pairs stored
        </div>
      </div>
    </section>
  );
};

// ─── FEATURES ─────────────────────────────────────────────────────
const Features = () => (
  <section id="features" style={{ padding:"80px 60px", background:C.bgDeep, maxWidth:"100%" }}>
    <div style={{ maxWidth:1280, margin:"0 auto" }}>
      <Tag label="07 / KEY FEATURES" />
      <SectionTitle>What Makes VoidErr Different</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
        {[
          { icon:"🔍", title:"Smart Search", desc:"Full-text search across all vulns, evidence, and past remediations powered by Elasticsearch.", color:C.cyan },
          { icon:"🤖", title:"AI-Powered Fixes", desc:"LLM generates context-aware remediation code and config patches for every finding.", color:C.electric },
          { icon:"🛡️", title:"OWASP Top 10 Coverage", desc:"Full coverage of all OWASP categories with curated payload libraries for each.", color:C.green },
          { icon:"📋", title:"Evidence Trail", desc:"Every scan logged with request/response pairs & analyst timestamps. Fully auditable.", color:C.blue },
          { icon:"🎯", title:"Multi-Target Scanning", desc:"Scan multiple URLs/APIs simultaneously via Celery queue management.", color:C.orange },
          { icon:"📊", title:"Auto PDF Reports", desc:"Executive + technical severity reports generated automatically at scan completion.", color:C.yellow },
        ].map(f => (
          <div key={f.title} style={{ background:C.bgCard, border:`1px solid ${C.border}`, padding:"30px 24px", transition:"all 0.3s", cursor:"default", position:"relative", overflow:"hidden" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=f.color; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 32px ${f.color}20`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${f.color},transparent)` }} />
            <div style={{ fontSize:"2rem", marginBottom:14 }}>{f.icon}</div>
            <div style={{ fontFamily:C.display, fontSize:"0.88rem", fontWeight:700, color:f.color, marginBottom:10, letterSpacing:1 }}>{f.title}</div>
            <div style={{ fontSize:"0.87rem", color:C.textSub, lineHeight:1.65 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── TEAM ─────────────────────────────────────────────────────────
const Team = () => (
  <section id="team" style={{ padding:"80px 60px", maxWidth:1280, margin:"0 auto" }}>
    <Tag label="08 / THE TEAM" />
    <SectionTitle>Team VoidErr</SectionTitle>
    <SectionDesc>5 members — Cybersecurity × Full Stack × AI</SectionDesc>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20 }}>
      {[
        { name:"Yamini Gaur", role:"Security Lead", icon:"🔐", color:C.red },
        { name:"Naman Tiwari", role:"Backend Dev", icon:"⚙️", color:C.blue },
        { name:"Manjot Virk", role:"Frontend Dev", icon:"🎨", color:C.cyan },
        { name:"Kanaad Arya", role:"AI / ML Lead", icon:"🧠", color:C.green },
        { name:"Mayank", role:"DevOps & Infra", icon:"🚀", color:C.orange },
      ].map(m => (
        <div key={m.name} style={{ background:C.bgCard, border:`1px solid ${C.border}`, padding:"32px 20px", textAlign:"center", transition:"all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=m.color; e.currentTarget.style.boxShadow=`0 0 24px ${m.color}25`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow=""; }}>
          <div style={{ width:64, height:64, background:`linear-gradient(135deg,${m.color}30,${C.bgDeep})`, border:`2px solid ${m.color}50`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.8rem", margin:"0 auto 16px" }}>{m.icon}</div>
          <div style={{ fontFamily:C.display, fontSize:"0.82rem", fontWeight:700, color:C.text, marginBottom:6, letterSpacing:1 }}>{m.name}</div>
          <div style={{ fontSize:"0.75rem", color:m.color, fontFamily:C.mono, letterSpacing:2 }}>{m.role}</div>
        </div>
      ))}
    </div>
    <div style={{ textAlign:"center", marginTop:48, padding:"32px", background:`rgba(26,111,255,0.05)`, border:`1px solid ${C.border}`, fontFamily:C.mono, fontSize:"0.9rem", color:C.textSub, fontStyle:"italic" }}>
      "Turning vulnerabilities into knowledge, one scan at a time."
    </div>
  </section>
);

// ─── ROADMAP ─────────────────────────────────────────────────────
const Roadmap = () => (
  <section id="roadmap" style={{ padding:"80px 60px", background:C.bgDeep, maxWidth:"100%" }}>
    <div style={{ maxWidth:1280, margin:"0 auto" }}>
      <Tag label="09 / ROADMAP" />
      <SectionTitle>Development Roadmap</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
        {[
          { phase:"PHASE 01", title:"Core Engine", items:["Crawler & mapping","SQLi + XSS modules","Risk scoring"], color:C.green, done:true },
          { phase:"PHASE 02", title:"Knowledge Hub", items:["Elasticsearch setup","CVE/CWE API","Evidence trail"], color:C.blue, done:true },
          { phase:"PHASE 03", title:"AI Layer", items:["LLM remediation","Smart prioritization","Auto reports"], color:C.cyan, done:false },
          { phase:"PHASE 04", title:"Scale & Polish", items:["Multi-target scan","Dashboard polish","CI/CD deploy"], color:C.orange, done:false },
        ].map((p, idx) => (
          <div key={p.phase} style={{ background:C.bgCard, border:`1px solid ${p.done?p.color:C.border}`, padding:"28px 24px", position:"relative" }}>
            <div style={{ position:"absolute", top:16, right:16, fontFamily:C.mono, fontSize:"0.65rem", color: p.done?C.green:C.textDim }}>{p.done?"✓ COMPLETE":"IN PROGRESS"}</div>
            <div style={{ fontFamily:C.mono, fontSize:"0.68rem", color:p.color, letterSpacing:3, marginBottom:8 }}>{p.phase}</div>
            <div style={{ fontFamily:C.display, fontSize:"1rem", fontWeight:700, color:C.text, marginBottom:16 }}>{p.title}</div>
            {p.items.map(item => (
              <div key={item} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 0", borderBottom:`1px solid ${C.border}`, fontSize:"0.83rem", color:C.textSub }}>
                <span style={{ color:p.done?C.green:C.textDim }}>{"›"}</span>{item}
              </div>
            ))}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${p.color},transparent)`, opacity: p.done?1:0.4 }} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── TECH STACK ───────────────────────────────────────────────────
const TechStack = () => {
  const stacks = [
    { label:"FRONTEND", items:["React.js","Tailwind CSS","Chart.js / Recharts"], color:C.cyan },
    { label:"BACKEND", items:["Python FastAPI","Celery","Redis"], color:C.blue },
    { label:"SCANNING ENGINE", items:["BeautifulSoup + Selenium","Custom Payload Modules","OWASP ZAP"], color:C.red },
    { label:"KNOWLEDGE & DB", items:["Elasticsearch","PostgreSQL","CVE/NVD API"], color:C.green },
    { label:"AI / INTELLIGENCE", items:["LLM (Gemini/GPT)","CVSS v3.1 Scoring","Auto-Remediation Engine"], color:C.electric },
    { label:"DEVOPS", items:["Docker Compose","GitHub Actions CI/CD","Nginx + Gunicorn"], color:C.orange },
  ];
  return (
    <section style={{ padding:"80px 60px", maxWidth:1280, margin:"0 auto" }}>
      <Tag label="TECH STACK" />
      <SectionTitle>Built With</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
        {stacks.map(s => (
          <div key={s.label} style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderTop:`2px solid ${s.color}`, padding:"24px 20px" }}>
            <div style={{ fontFamily:C.mono, fontSize:"0.65rem", color:s.color, letterSpacing:3, marginBottom:14, textTransform:"uppercase" }}>{s.label}</div>
            {s.items.map(i => (
              <div key={i} style={{ padding:"6px 0", borderBottom:`1px solid ${C.border}`, fontSize:"0.82rem", color:C.textSub, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ color:s.color, fontSize:"0.6rem" }}>◆</span>{i}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background:C.bgDeep, borderTop:`1px solid ${C.border}`, padding:"48px 60px 32px", textAlign:"center" }}>
    <div style={{ fontFamily:C.display, fontSize:"2rem", fontWeight:900, color:C.cyan, letterSpacing:4, marginBottom:10, textShadow:`0 0 30px ${C.cyanGlow}` }}>
      VOID<span style={{ color:C.blue }}>ERR</span>
    </div>
    <div style={{ fontFamily:C.mono, fontSize:"0.72rem", color:C.textDim, letterSpacing:3, marginBottom:24 }}>VULNERABILITY KNOWLEDGE HUB — PS031 × T083</div>
    <div style={{ fontFamily:C.mono, fontSize:"0.7rem", color:C.textDim }}>
      © 2024 Team VoidErr · School of Computing Science and Engineering (AI-ML) · All rights reserved
    </div>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  return (
    <div style={{ minHeight:"100vh", background:C.bg }}>
      <style>{globalStyle}</style>
      {/* Grid BG */}
      <div style={{ position:"fixed", inset:0, backgroundImage:`linear-gradient(${C.blue}08 1px,transparent 1px),linear-gradient(90deg,${C.blue}08 1px,transparent 1px)`, backgroundSize:"50px 50px", pointerEvents:"none", zIndex:0 }} />
      <Nav active={activeNav} setActive={setActiveNav} />
      <Hero />
      <Problem />
      <Solution />
      <Dashboard />
      <AIInterface />
      <Scan />
      <Evidence />
      <Features />
      <TechStack />
      <Team />
      <Roadmap />
      <Footer />
    </div>
  );
}