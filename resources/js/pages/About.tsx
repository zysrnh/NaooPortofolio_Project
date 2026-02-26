import Navbar from "@/components/Navbar";
import { useEffect, useState, useRef } from "react";
import { router } from "@inertiajs/react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface HeroProfile   { name: string; title: string; bio: string; photo: string | null; }
interface TechStackItem { id: number; name: string; icon: string; category: string; }
interface ContactItem   { id: number; platform: string; label: string; value: string; url: string; is_visible: boolean; sort_order: number; icon_color: string; }
interface AboutProfile  { tagline: string; extra_bio: string; info_cards: { label: string; value: string }[]; highlights: string[]; }

const DEFAULT_HERO: HeroProfile = {
  name: "Yusron", title: "IT Programmer",
  bio: "Saya membangun aplikasi web modern, dashboard, dan tools internal dengan fokus pada UI yang rapi, performa, dan pengalaman pengguna.",
  photo: "/profile/Mboy.jpeg",
};
const DEFAULT_ABOUT: AboutProfile = {
  tagline: "Who am I",
  extra_bio: "",
  info_cards: [
    { label:"Role",   value:"IT Programmer"   },
    { label:"Focus",  value:"Fullstack Web"   },
    { label:"Stack",  value:"React + Laravel" },
    { label:"Status", value:"Open to Work"    },
  ],
  highlights: [],
};
const FALLBACK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3C/svg%3E";
const FALLBACK_CONTACTS: ContactItem[] = [
  { id:-1, platform:"whatsapp", label:"WhatsApp",       value:"083861669565",       url:"https://wa.me/6283861669565",  is_visible:true, sort_order:0, icon_color:"#25D366" },
  { id:-2, platform:"email",    label:"Email",          value:"naooolaf@gmail.com", url:"mailto:naooolaf@gmail.com",    is_visible:true, sort_order:1, icon_color:"#EA4335" },
  { id:-3, platform:"github",   label:"GitHub",         value:"github.com/zysrnh",  url:"https://github.com/zysrnh",    is_visible:true, sort_order:2, icon_color:"#0B1957" },
];
const CONTACT_ICONS: Record<string, JSX.Element> = {
  whatsapp: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  email:    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  github:   <svg width="20" height="20" viewBox="0 0 24 24" fill="#9ECCFA"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  linkedin: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  telegram: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  instagram:<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  twitter:  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  custom:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
};

// ── Scroll Reveal ─────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal")) as HTMLElement[];
    els.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = el.classList.contains("from-left") ? "translateX(-40px)"
        : el.classList.contains("from-right") ? "translateX(40px)"
        : "translateY(40px)";
      el.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.delay ?? 0);
        setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0) translateX(0)"; }, delay);
        obs.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── FloatingBlocks (same as Home) ─────────────────────────────────────────────
const BLOCK_CONFIGS = [
  { top:"10%", left:"2%",   size:56, color:"#9ECCFA", type:"filled",  animDelay:"0s"   },
  { top:"50%", left:"1.5%", size:18, color:"#0B1957", type:"outline", animDelay:"1.4s" },
  { top:"75%", left:"3%",   size:38, color:"#F8F3EA", type:"outline", animDelay:"0.7s" },
  { top:"15%", left:"93%",  size:26, color:"#0B1957", type:"filled",  animDelay:"1.9s" },
  { top:"45%", left:"94%",  size:44, color:"#9ECCFA", type:"outline", animDelay:"0.4s" },
  { top:"80%", left:"92%",  size:14, color:"#F8F3EA", type:"filled",  animDelay:"2.2s" },
];
function FloatingBlocks() {
  return (
    <>
      <style>{`@keyframes floatBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}} aria-hidden="true">
        {BLOCK_CONFIGS.map((cfg,i)=>(
          <div key={i} style={{position:"absolute",top:cfg.top,left:cfg.left,width:cfg.size,height:cfg.size,
            background:cfg.type==="filled"?cfg.color:"transparent",
            border:cfg.type==="outline"?`4px solid ${cfg.color}`:`3px solid rgba(11,25,87,0.3)`,
            boxShadow:`4px 4px 0 rgba(11,25,87,0.4)`,
            animation:`floatBob ${3.5+i*0.4}s ease-in-out ${cfg.animDelay} infinite`}} />
        ))}
      </div>
    </>
  );
}

// ── GitHubContributions ───────────────────────────────────────────────────────
function GitHubContributions({ username = "zysrnh" }: { username?: string }) {
  interface ContribDay { date: string; count: number; level: 0|1|2|3|4; }
  const [weeks, setWeeks]           = useState<ContribDay[][]>([]);
  const [loading, setLoading]       = useState(true);
  const [totalContribs, setTotal]   = useState(0);
  const [streak, setStreak]         = useState(0);
  const [maxDay, setMaxDay]         = useState(0);
  const [hoveredDay, setHoveredDay] = useState<ContribDay|null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x:0, y:0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then(data => {
        const contributions: ContribDay[] = data.contributions ?? [];
        const grouped: ContribDay[][] = [];
        for (let i = 0; i < contributions.length; i += 7) grouped.push(contributions.slice(i, i + 7));
        setWeeks(grouped);
        setTotal(contributions.reduce((s, d) => s + d.count, 0));
        setMaxDay(Math.max(...contributions.map(d => d.count), 0));
        let s = 0;
        for (let i = contributions.length - 1; i >= 0; i--) { if (contributions[i].count > 0) s++; else break; }
        setStreak(s);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  const CELL_STYLES: Record<number, { bg: string; border: string; shadow: string }> = {
    0: { bg:"#E8E0D4", border:"#C8B8A0", shadow:"none" },
    1: { bg:"#9ECCFA", border:"#0B1957", shadow:"2px 2px 0 #0B1957" },
    2: { bg:"#5aa8f0", border:"#0B1957", shadow:"2px 2px 0 #0B1957" },
    3: { bg:"#2563eb", border:"#0B1957", shadow:"2px 2px 0 #0B1957" },
    4: { bg:"#0B1957", border:"#9ECCFA", shadow:"2px 2px 0 #9ECCFA" },
  };
  const LEGEND_COLORS = ["#E8E0D4","#9ECCFA","#5aa8f0","#2563eb","#0B1957"];
  const DAY_LABELS    = ["","Mon","","Wed","","Fri",""];
  const MONTHS        = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const CELL = 14, GAP = 3;

  const monthLabels = (() => {
    if (!weeks.length) return [];
    const labels: { label:string; col:number }[] = [];
    let lastM = -1;
    weeks.forEach((week, wi) => {
      if (!week[0]) return;
      const m = new Date(week[0].date).getMonth();
      if (m !== lastM) { labels.push({ label: MONTHS[m], col: wi }); lastM = m; }
    });
    return labels;
  })();

  const handleMouseMove = (day: ContribDay, e: React.MouseEvent) => {
    setHoveredDay(day);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString("id-ID", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal" data-delay="0">
      <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">GitHub Activity</h2>
      <div className="border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden">

        {/* Header */}
        <div className="bg-[#0B1957] px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div style={{border:"3px solid #9ECCFA",boxShadow:"3px 3px 0 #9ECCFA",padding:8}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#9ECCFA">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <p className="font-black text-[#9ECCFA] uppercase tracking-[0.25em] mb-0.5" style={{fontSize:10}}>Contribution Graph</p>
              <p className="font-black text-[#F8F3EA] text-xl uppercase tracking-widest">@{username}</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { val: loading?"…":totalContribs.toString(), label:"Total Commits" },
              { val: loading?"…":streak.toString(),        label:"Day Streak"    },
              { val: loading?"…":maxDay.toString(),        label:"Best Day"      },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center px-4 py-3 min-w-[80px]"
                style={{border:"3px solid #9ECCFA",boxShadow:"3px 3px 0 #9ECCFA",background:"rgba(158,204,250,0.08)"}}>
                <span className="font-black tabular-nums text-[#9ECCFA]" style={{fontSize:"clamp(1.4rem,3vw,1.8rem)"}}>{s.val}</span>
                <span className="font-black text-[#D1E8FF] uppercase tracking-widest mt-0.5" style={{fontSize:9}}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Graph */}
        <div className="bg-[#F8F3EA]">
          <div ref={containerRef} className="px-5 sm:px-8 pt-6 pb-4 overflow-x-auto relative">
            {loading ? (
              <div style={{display:"flex",gap:GAP}}>
                {Array.from({length:52}).map((_,wi)=>(
                  <div key={wi} style={{display:"flex",flexDirection:"column",gap:GAP}}>
                    {Array.from({length:7}).map((_,di)=>(
                      <div key={di} className="skeleton-shimmer" style={{width:CELL,height:CELL}}/>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Month labels */}
                <div style={{display:"flex",gap:GAP,marginBottom:6,marginLeft:30}}>
                  {weeks.map((_, wi) => {
                    const lbl = monthLabels.find(m => m.col === wi);
                    return (
                      <div key={wi} style={{width:CELL,flexShrink:0,overflow:"visible"}}>
                        {lbl && <span style={{fontWeight:900,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",whiteSpace:"nowrap",display:"block"}}>{lbl.label}</span>}
                      </div>
                    );
                  })}
                </div>
                {/* Grid */}
                <div style={{display:"flex",gap:GAP}}>
                  <div style={{display:"flex",flexDirection:"column",gap:GAP,marginRight:4,flexShrink:0,width:26}}>
                    {DAY_LABELS.map((d, i) => (
                      <div key={i} style={{height:CELL,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                        {d && <span style={{fontWeight:900,fontSize:8,textTransform:"uppercase",letterSpacing:"0.08em",color:"#0B1957",opacity:0.5}}>{d}</span>}
                      </div>
                    ))}
                  </div>
                  {weeks.map((week, wi) => (
                    <div key={wi} style={{display:"flex",flexDirection:"column",gap:GAP,flexShrink:0}}>
                      {week.map((day, di) => {
                        const cs = CELL_STYLES[day.level];
                        const isHov = hoveredDay?.date === day.date;
                        return (
                          <div key={di} style={{
                            width:CELL,height:CELL,flexShrink:0,
                            background:cs.bg, border:`2px solid ${cs.border}`,
                            boxShadow:isHov?`0 0 0 2px #0B1957, 3px 3px 0 #0B1957`:cs.shadow,
                            cursor:"pointer",
                            transform:isHov?"scale(1.35) translate(-1px,-1px)":"scale(1)",
                            transition:"transform 0.08s ease,box-shadow 0.08s ease",
                            zIndex:isHov?10:1, position:"relative",
                          }}
                            onMouseEnter={e=>handleMouseMove(day,e)}
                            onMouseLeave={()=>setHoveredDay(null)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                {/* Tooltip */}
                {hoveredDay && (
                  <div style={{position:"absolute",left:tooltipPos.x+14,top:tooltipPos.y-56,pointerEvents:"none",zIndex:50,background:"#0B1957",border:"3px solid #9ECCFA",boxShadow:"4px 4px 0 #9ECCFA",padding:"8px 12px",minWidth:170}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                      <div style={{width:10,height:10,flexShrink:0,background:CELL_STYLES[hoveredDay.level].bg,border:`2px solid ${hoveredDay.level===4?"#9ECCFA":"#0B1957"}`,boxShadow:hoveredDay.level>0?"1px 1px 0 #9ECCFA":"none"}}/>
                      <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"#9ECCFA"}}>{hoveredDay.count} commit{hoveredDay.count!==1?"s":""}</p>
                    </div>
                    <p style={{fontWeight:600,fontSize:10,color:"#D1E8FF",textTransform:"capitalize"}}>{fmt(hoveredDay.date)}</p>
                  </div>
                )}
              </>
            )}
          </div>
          {/* Legend */}
          <div className="border-t-4 border-[#0B1957] px-5 sm:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
              className="btn-brutal font-black text-xs uppercase tracking-widest flex items-center gap-2"
              style={{border:"3px solid #0B1957",padding:"6px 14px",background:"#0B1957",color:"#9ECCFA",boxShadow:"3px 3px 0 #9ECCFA",textDecoration:"none"}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#9ECCFA"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View Profile →
            </a>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontWeight:900,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",opacity:0.45}}>Less</span>
              {LEGEND_COLORS.map((c,i)=>(
                <div key={i} style={{width:12,height:12,flexShrink:0,background:c,border:`2px solid ${i===4?"#9ECCFA":"#0B1957"}`,boxShadow:i>0?`1px 1px 0 ${i===4?"#9ECCFA":"#0B1957"}`:"none"}}/>
              ))}
              <span style={{fontWeight:900,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",opacity:0.45}}>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TechStack ─────────────────────────────────────────────────────────────────
function TechStack() {
  const [stacks, setStacks]       = useState<TechStackItem[]>([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    fetch("/api/tech-stacks/visible").then(r => r.json())
      .then(d => { setStacks(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);
  const categories   = Array.from(new Set(stacks.map(s => s.category)));
  const tabLabels    = categories.length > 0 ? categories : ["Frontend","Backend","Tools","AI Tools"];
  const currentTechs = stacks.filter(s => s.category === categories[activeTab]);
  const switchTab = (i: number) => {
    if (i === activeTab) return;
    setAnimating(true); setTimeout(() => { setActiveTab(i); setAnimating(false); }, 180);
  };
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-left" data-delay="0">
      <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">Tech Stack</h2>
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden">
        <div className="flex border-b-4 border-[#0B1957] overflow-x-auto">
          {tabLabels.map((label, i) => (
            <button key={label} onClick={() => switchTab(i)}
              className={`flex-shrink-0 flex-1 py-3 px-3 sm:px-5 font-black uppercase text-xs sm:text-sm tracking-wider border-r-4 border-[#0B1957] last:border-r-0 transition-all duration-150 whitespace-nowrap
                ${activeTab===i?"bg-[#0B1957] text-[#9ECCFA]":"bg-[#F8F3EA] text-[#0B1957] hover:bg-[#D1E8FF]"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="p-6 sm:p-10 min-h-[180px] flex flex-wrap gap-3 sm:gap-5 items-start content-start"
          style={{opacity:animating?0:1,transform:animating?"translateY(8px)":"translateY(0)",transition:"opacity 0.18s ease,transform 0.18s ease"}}>
          {loading && Array.from({length:6}).map((_,i)=>(
            <div key={i} className="tech-chip" style={{background:"#D1E8FF",opacity:0.5}}>
              <div style={{width:26,height:26,background:"#9ECCFA",border:"2px solid #0B1957",flexShrink:0}}/>
              <span style={{color:"transparent",background:"#9ECCFA",minWidth:60}}>___</span>
            </div>
          ))}
          {!loading && categories.length === 0 && (
            <p className="font-bold text-xs uppercase text-[#0B1957] opacity-40 tracking-widest self-center w-full text-center py-8">Belum ada tech stack</p>
          )}
          {!loading && currentTechs.map(tech => (
            <div key={tech.id} className="tech-chip">
              <img src={tech.icon} alt={tech.name} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}/>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-[#9ECCFA] border-t-4 border-[#0B1957]"/>
      </div>
    </section>
  );
}

// ── Main About ────────────────────────────────────────────────────────────────
export default function About() {
  const [visible,          setVisible]          = useState(false);
  const [showTop,          setShowTop]          = useState(false);
  const [hero,             setHero]             = useState<HeroProfile>(DEFAULT_HERO);
  const [heroLoading,      setHeroLoading]      = useState(true);
  const [about,            setAbout]            = useState<AboutProfile>(DEFAULT_ABOUT);
  const [aboutLoading,     setAboutLoading]     = useState(true);
  const [contacts,         setContacts]         = useState<ContactItem[]>([]);
  const [contactsLoading,  setContactsLoading]  = useState(true);

  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);
  useScrollReveal();

  useEffect(() => {
    fetch("/api/hero").then(r => r.json())
      .then((d: HeroProfile) => setHero({name:d.name||DEFAULT_HERO.name,title:d.title||DEFAULT_HERO.title,bio:d.bio||DEFAULT_HERO.bio,photo:d.photo||DEFAULT_HERO.photo}))
      .catch(()=>{}).finally(()=>setHeroLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/about").then(r => r.json())
      .then((d: AboutProfile) => setAbout({
        tagline:    d.tagline    || DEFAULT_ABOUT.tagline,
        extra_bio:  d.extra_bio  || "",
        info_cards: Array.isArray(d.info_cards) && d.info_cards.length > 0 ? d.info_cards : DEFAULT_ABOUT.info_cards,
        highlights: Array.isArray(d.highlights) ? d.highlights : [],
      }))
      .catch(()=>{}).finally(()=>setAboutLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/contact/visible").then(r => r.json())
      .then(d => setContacts(Array.isArray(d) && d.length > 0 ? d : FALLBACK_CONTACTS))
      .catch(() => setContacts(FALLBACK_CONTACTS))
      .finally(() => setContactsLoading(false));
  }, []);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h);
  }, []);

  const heroPhoto = hero.photo || DEFAULT_HERO.photo;

  return (
    <>
      <style>{`
        @keyframes slideDown  { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer    { from{background-position:-200% 0} to{background-position:200% 0} }
        @keyframes tagIn      { from{opacity:0;transform:translateY(8px) scale(0.9)} to{opacity:1;transform:translateY(0) scale(1)} }
        body { background-color: #D1E8FF; }

        .anim-navbar  { animation: slideDown  0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-hero    { animation: slideRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .anim-photo   { animation: slideLeft  0.7s cubic-bezier(0.16,1,0.3,1) 0.1s  both; }

        .btn-brutal { transition:transform 0.08s ease,box-shadow 0.08s ease; }
        .btn-brutal:hover  { transform:translate(2px,2px);  box-shadow:2px 2px 0 #0B1957 !important; }
        .btn-brutal:active { transform:translate(4px,4px);  box-shadow:0   0   0 #0B1957 !important; }

        .photo-wrap { position:relative;overflow:hidden;border:4px solid #0B1957;box-shadow:10px 10px 0 #0B1957;flex-shrink:0;transition:transform 0.15s ease,box-shadow 0.15s ease; }
        .photo-wrap:hover { transform:translate(-3px,-3px);box-shadow:13px 13px 0 #0B1957; }
        .photo-wrap img { position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center top; }

        .hero-skeleton  { background:linear-gradient(90deg,#9ECCFA 25%,#D1E8FF 50%,#9ECCFA 75%);background-size:200% 100%;animation:shimmer 1.2s ease infinite; }
        .about-skeleton { background:linear-gradient(90deg,rgba(158,204,250,0.3) 25%,rgba(158,204,250,0.5) 50%,rgba(158,204,250,0.3) 75%);background-size:200% 100%;animation:shimmer 1.2s ease infinite; }
        .skeleton-shimmer { background:linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%);background-size:200% 100%;animation:shimmer 1.4s ease infinite; }

        .about-info-card { border:2px solid #9ECCFA;padding:14px;transition:background 0.15s ease,transform 0.12s ease,box-shadow 0.12s ease;cursor:default; }
        .about-info-card:hover { background:rgba(158,204,250,0.15);transform:translate(-2px,-2px);box-shadow:3px 3px 0 #9ECCFA; }

        .about-highlight-tag { border:2px solid #9ECCFA;background:rgba(158,204,250,0.1);color:#9ECCFA;padding:6px 16px;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;transition:background 0.12s ease,transform 0.12s ease,box-shadow 0.12s ease; }
        .about-highlight-tag:hover { background:rgba(158,204,250,0.25);transform:translate(-1px,-1px);box-shadow:2px 2px 0 #9ECCFA; }

        .tech-chip { display:inline-flex;align-items:center;gap:8px;border:3px solid #0B1957;padding:7px 14px 7px 7px;background:#F8F3EA;font-size:11px;font-weight:800;text-transform:uppercase;color:#0B1957;letter-spacing:0.06em;transition:transform 0.12s ease,box-shadow 0.12s ease,background 0.12s ease;cursor:default;box-shadow:3px 3px 0 #0B1957;flex:0 0 calc(25% - 15px);justify-content:flex-start;box-sizing:border-box; }
        @media(max-width:640px){.tech-chip{flex:0 0 calc(50% - 6px);}}
        .tech-chip:hover { background:#9ECCFA;transform:translate(-2px,-2px);box-shadow:5px 5px 0 #0B1957; }
        .tech-chip img { width:26px;height:26px;object-fit:cover;border:2px solid #0B1957;flex-shrink:0; }

        .contact-row { display:flex;align-items:center;gap:16px;padding:20px 28px;text-decoration:none;border-bottom:3px solid #0B1957;transition:background 0.12s ease,padding-left 0.2s ease; }
        .contact-row:last-child { border-bottom:none; }
        .contact-row:hover { background:#D1E8FF;padding-left:40px; }
        .contact-row:hover .contact-icon-box { transform:translate(-2px,-2px);box-shadow:5px 5px 0 #0B1957; }
        .contact-icon-box { width:46px;height:46px;display:flex;align-items:center;justify-content:center;border:3px solid #0B1957;flex-shrink:0;box-shadow:3px 3px 0 #0B1957;transition:transform 0.12s ease,box-shadow 0.12s ease; }

        .back-to-top { position:fixed;bottom:28px;right:28px;z-index:99;width:48px;height:48px;border:4px solid #0B1957;background:#0B1957;box-shadow:4px 4px 0 #9ECCFA;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 0.1s ease,box-shadow 0.1s ease,opacity 0.3s ease,visibility 0.3s ease; }
        .back-to-top:hover  { transform:translate(-2px,-2px);box-shadow:6px 6px 0 #9ECCFA; }
        .back-to-top:active { transform:translate(0,0);box-shadow:2px 2px 0 #9ECCFA; }
      `}</style>

      <div className="min-h-screen relative" style={{opacity:visible?1:0,transition:"opacity 0.3s ease"}}>
        <FloatingBlocks/>
        <div className="anim-navbar"><Navbar/></div>

        {/* ── PAGE HEADER ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8 flex items-center gap-4">
          <button
            onClick={() => router.visit("/")}
            className="btn-brutal border-4 border-[#0B1957] px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957] flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
          <div>
            <p className="font-black uppercase text-xs text-[#0B1957] opacity-50 tracking-[0.25em]">Portfolio</p>
            <h1 className="font-black uppercase text-2xl sm:text-3xl text-[#0B1957] leading-none">About Me</h1>
          </div>
        </div>

        {/* ── BIO HERO ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] flex flex-col md:flex-row overflow-hidden">

            {/* Photo */}
            <div className="anim-photo md:w-2/5 relative bg-[#9ECCFA] border-b-4 md:border-b-0 md:border-r-4 border-[#0B1957] flex items-center justify-center py-10 px-8 min-h-[280px] sm:min-h-[340px]">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage:"repeating-linear-gradient(0deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px)"}}/>
              <div className="photo-wrap relative z-10" style={{width:"min(200px,60vw)",height:"min(250px,75vw)"}}>
                {heroLoading
                  ? <div className="hero-skeleton absolute inset-0"/>
                  : <img src={heroPhoto!} alt={hero.name} onError={e=>{(e.target as HTMLImageElement).src="/profile/Mboy.jpeg";}}/>
                }
              </div>
            </div>

            {/* Text */}
            <div className="anim-hero flex-1 p-8 sm:p-12 flex flex-col justify-center relative">
              <div className="absolute top-5 right-8 text-8xl font-black text-[#9ECCFA] select-none leading-none opacity-20" aria-hidden>"</div>

              {aboutLoading
                ? <div className="about-skeleton h-3 w-24 mb-4"/>
                : <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-[0.3em] mb-4">{about.tagline}</p>
              }

              {heroLoading ? (
                <div className="space-y-3 mb-6">
                  <div className="about-skeleton h-12 w-64"/>
                  <div className="w-12 h-1 bg-[#9ECCFA]"/>
                  <div className="about-skeleton h-4 w-full"/>
                  <div className="about-skeleton h-4 w-4/5"/>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#F8F3EA] mb-4 leading-tight">{hero.name}</h2>
                  <div className="w-12 h-1 bg-[#9ECCFA] mb-5"/>
                  <p className="font-bold uppercase mb-4 text-[#9ECCFA] tracking-wider text-sm border-l-4 border-[#9ECCFA] pl-3">{hero.title}</p>
                  <p className="font-semibold text-[#D1E8FF] leading-relaxed mb-2 max-w-lg">{hero.bio}</p>
                  {!aboutLoading && about.extra_bio && (
                    <p className="font-semibold text-[#9ECCFA] opacity-80 leading-relaxed mb-6 text-sm max-w-lg">{about.extra_bio}</p>
                  )}
                  {!about.extra_bio && <div className="mb-6"/>}
                </>
              )}

              {/* Info cards */}
              {aboutLoading ? (
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[1,2,3,4].map(i=><div key={i} className="about-skeleton h-16"/>)}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {about.info_cards.map((card, i) => (
                    <div key={i} className="about-info-card">
                      <p className="text-[#9ECCFA] font-black uppercase text-xs tracking-widest mb-1">{card.label}</p>
                      <p className="text-[#F8F3EA] font-bold text-sm">{card.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights */}
              {!aboutLoading && about.highlights.filter(Boolean).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {about.highlights.filter(Boolean).map((tag, i) => (
                    <span key={i} className="about-highlight-tag"
                      style={{animation:`tagIn 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.06}s both`}}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <TechStack/>

        {/* ── GITHUB CONTRIBUTIONS ── */}
        <GitHubContributions username="zysrnh"/>

       

        {/* ── FOOTER ── */}
        <footer className="border-t-4 border-[#0B1957] bg-[#F8F3EA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="font-black text-xl text-[#0B1957] cursor-pointer" onClick={() => router.visit("/")}>Yusron.dev</div>
              <p className="font-bold uppercase text-xs text-[#0B1957] opacity-50 tracking-widest">© {new Date().getFullYear()} Zaki Yusron Hasyimmi</p>
            </div>
          </div>
        </footer>

        {/* ── BACK TO TOP ── */}
        <button className="back-to-top" style={{opacity:showTop?1:0,visibility:showTop?"visible":"hidden"}}
          onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ECCFA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </div>
    </>
  );
}