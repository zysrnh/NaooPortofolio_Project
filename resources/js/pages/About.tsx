import Navbar from "@/components/Navbar";
import { useVisitorTracker } from "@/hooks/useVisitorTracker";
import { useEffect, useState, useRef } from "react";
import { router, Head } from "@inertiajs/react";
import Magnetic from "@/components/Magnetic";
import SupportersSection from "@/components/SupportersSection";

// ── Scroll Reveal ─────────────────────────────────────────────────────────────
function useScrollReveal(ready: boolean) {
  useEffect(() => {  
    if (!ready) return; 
    let lastScrollY = window.scrollY;
    const getTransform = (el: HTMLElement, directionDown: boolean) => {
      if (el.classList.contains("from-left"))  return "translateX(-50px)";
      if (el.classList.contains("from-right")) return "translateX(50px)";
      if (el.classList.contains("from-scale")) return "scale(0.92)";
      return directionDown ? "translateY(48px)" : "translateY(-48px)";
    };
    const els = Array.from(document.querySelectorAll(".reveal")) as HTMLElement[];
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = getTransform(el, true);
      el.style.transition = "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)";
    });
    const observer = new IntersectionObserver((entries) => {
      const directionDown = window.scrollY >= lastScrollY;
      lastScrollY = window.scrollY;
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.delay ?? 0);
        if (entry.isIntersecting) {
          setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0) translateX(0) scale(1)"; }, delay);
          el.dataset.visible = "true";
        } else {
          if (el.dataset.visible === "true") {
            el.style.transition = "none"; el.style.opacity = "0"; el.style.transform = getTransform(el, directionDown);
            requestAnimationFrame(() => { el.style.transition = "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)"; });
            el.dataset.visible = "false";
          }
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ready]);
}

// ── FloatingBlocks ────────────────────────────────────────────────────────────
const BLOCK_CONFIGS = [
  { top:"8%",  left:"3%",   size:64, color:"var(--nb-accent)", type:"filled",  animDelay:"0s"   },
  { top:"55%", left:"2%",   size:20, color:"var(--nb-primary)", type:"outline", animDelay:"1.2s" },
  { top:"30%", left:"1.5%", size:14, color:"var(--nb-accent)", type:"filled",  animDelay:"2.4s" },
  { top:"75%", left:"4%",   size:40, color:"var(--nb-bg)", type:"outline", animDelay:"0.6s" },
  { top:"12%", left:"92%",  size:28, color:"var(--nb-primary)", type:"filled",  animDelay:"1.8s" },
  { top:"45%", left:"94%",  size:48, color:"var(--nb-accent)", type:"outline", animDelay:"0.3s" },
  { top:"70%", left:"91%",  size:16, color:"var(--nb-bg)", type:"filled",  animDelay:"2.1s" },
  { top:"85%", left:"93%",  size:36, color:"var(--nb-accent)", type:"outline", animDelay:"1.5s" },
];
function FloatingBlocks() {
  return (
    <>
      <style>{`@keyframes floatBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}} aria-hidden="true">
        {BLOCK_CONFIGS.map((cfg,i)=>(
          <div key={i} style={{position:"absolute",top:cfg.top,left:cfg.left,width:cfg.size,height:cfg.size,
            background:cfg.type==="filled"?cfg.color:"transparent",
            border:cfg.type==="outline"?`4px solid ${cfg.color}`:`3px solid var(--nb-primary)`,
            boxShadow:`4px 4px 0 var(--nb-primary)`,
            animation:`floatBob ${3.5+i*0.4}s ease-in-out ${cfg.animDelay} infinite`}} />
        ))}
      </div>
    </>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface HeroData {
  name: string; title: string; bio: string;
  photo: string | null; photo2: string | null;
}
interface InfoCard   { label: string; value: string; }
interface TechStack  { id: number; name: string; icon: string; category: string; }
interface Experience {
  id: number; title: string; type: string; company: string;
  description: string; start_date: string; end_date: string | null;
  highlights: string[];
}
interface CaseStudy  { id: number; title: string; short_story: string; }
interface Availability { status: string; freelance: boolean; remote: boolean; collaboration: boolean; timezone: string; }
interface Supporter { id: number; name: string; role: string; description: string; image: string; photo2?: string | null; }


// ── Defaults (fallback jika API belum ada data) ───────────────────────────────
const DEFAULT_HERO: HeroData = {
  name: "Yusron", title: "IT Programmer",
  bio: "Saya membangun aplikasi web modern, dashboard, dan tools internal dengan fokus pada UI yang rapi, performa, dan pengalaman pengguna.",
  photo: "/profile/Mboy.jpeg", photo2: null,
};

const FALLBACK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3C/svg%3E";

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  internship: { bg: "var(--nb-primary)", text: "var(--nb-accent)", border: "var(--nb-accent)" },
  freelance:  { bg: "var(--nb-accent)", text: "var(--nb-primary)", border: "var(--nb-primary)" },
  learning:   { bg: "var(--nb-bg)", text: "var(--nb-primary)", border: "var(--nb-primary)" },
  project:    { bg: "var(--nb-accent-light)", text: "var(--nb-primary)", border: "var(--nb-primary)" },
  fulltime:   { bg: "var(--nb-primary)", text: "var(--nb-accent)", border: "var(--nb-accent)" },
  parttime:   { bg: "var(--nb-secondary)", text: "var(--nb-primary)", border: "var(--nb-primary)" },
};

const fmtDate = (d: string | null) => {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][Number(m)-1]} ${y}`;
};

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
    1: { bg:"var(--nb-accent)", border:"var(--nb-primary)", shadow:"2px 2px 0 var(--nb-primary)" },
    2: { bg:"#5aa8f0", border:"var(--nb-primary)", shadow:"2px 2px 0 var(--nb-primary)" },
    3: { bg:"#2563eb", border:"var(--nb-primary)", shadow:"2px 2px 0 var(--nb-primary)" },
    4: { bg:"var(--nb-primary)", border:"var(--nb-accent)", shadow:"2px 2px 0 var(--nb-accent)" },
  };
  const LEGEND_COLORS = ["#E8E0D4","var(--nb-accent)","#5aa8f0","#2563eb","var(--nb-primary)"];
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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal">
      <h2 className="text-2xl font-black uppercase mb-6 text-[var(--nb-primary)] px-1 sm:px-0 relative z-10">GitHub Activity</h2>
      <div className="border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] overflow-hidden">
        <div className="bg-[var(--nb-primary)] px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div style={{border:"3px solid var(--nb-accent)",boxShadow:"3px 3px 0 var(--nb-accent)",padding:8}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--nb-accent)"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </div>
            <div>
              <p className="font-black text-[var(--nb-accent)] uppercase tracking-[0.25em] mb-0.5" style={{fontSize:10}}>Contribution Graph</p>
              <p className="font-black text-[var(--nb-bg)] text-xl uppercase tracking-widest">@{username}</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { val: loading?"…":totalContribs.toString(), label:"Total Commits" },
              { val: loading?"…":streak.toString(),        label:"Day Streak"    },
              { val: loading?"…":maxDay.toString(),        label:"Best Day"      },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center px-4 py-3 min-w-[80px]"
                style={{border:"3px solid var(--nb-accent)",boxShadow:"3px 3px 0 var(--nb-accent)",background:"var(--nb-accent),0.08)"}}>
                <span className="font-black tabular-nums text-[var(--nb-accent)]" style={{fontSize:"clamp(1.4rem,3vw,1.8rem)"}}>{s.val}</span>
                <span className="font-black text-[var(--nb-accent-light)] uppercase tracking-widest mt-0.5" style={{fontSize:9}}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[var(--nb-bg)]">
          <div ref={containerRef} className="px-5 sm:px-8 pt-6 pb-4 overflow-x-auto relative">
            {loading ? (
              <div style={{display:"flex",gap:GAP}}>
                {Array.from({length:52}).map((_,wi) => (
                  <div key={wi} style={{display:"flex",flexDirection:"column",gap:GAP}}>
                    {Array.from({length:7}).map((_,di) => (
                      <div key={di} className="skeleton-shimmer" style={{width:CELL,height:CELL}}/>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div style={{display:"flex",gap:GAP,marginBottom:6,marginLeft:30}}>
                  {weeks.map((_, wi) => {
                    const lbl = monthLabels.find(m => m.col === wi);
                    return (
                      <div key={wi} style={{width:CELL,flexShrink:0,overflow:"visible"}}>
                        {lbl && <span style={{fontWeight:900,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--nb-primary)",whiteSpace:"nowrap",display:"block"}}>{lbl.label}</span>}
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",gap:GAP}}>
                  <div style={{display:"flex",flexDirection:"column",gap:GAP,marginRight:4,flexShrink:0,width:26}}>
                    {DAY_LABELS.map((d, i) => (
                      <div key={i} style={{height:CELL,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                        {d && <span style={{fontWeight:900,fontSize:8,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--nb-primary)",opacity:0.5}}>{d}</span>}
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
                            boxShadow:isHov?`0 0 0 2px var(--nb-primary), 3px 3px 0 var(--nb-primary)`:cs.shadow,
                            cursor:"pointer",
                            transform:isHov?"scale(1.35) translate(-1px,-1px)":"scale(1)",
                            transition:"transform 0.08s ease,box-shadow 0.08s ease",
                            zIndex:isHov?10:1, position:"relative",
                          }}
                            onMouseEnter={e => handleMouseMove(day, e)}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                {hoveredDay && (
                  <div style={{position:"absolute",left:tooltipPos.x+14,top:tooltipPos.y-56,pointerEvents:"none",zIndex:50,background:"var(--nb-primary)",border:"3px solid var(--nb-accent)",boxShadow:"4px 4px 0 var(--nb-accent)",padding:"8px 12px",minWidth:170}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                      <div style={{width:10,height:10,flexShrink:0,background:CELL_STYLES[hoveredDay.level].bg,border:`2px solid ${hoveredDay.level===4?"var(--nb-accent)":"var(--nb-primary)"}`,boxShadow:hoveredDay.level>0?"1px 1px 0 var(--nb-accent)":"none"}}/>
                      <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--nb-accent)"}}>{hoveredDay.count} commit{hoveredDay.count!==1?"s":""}</p>
                    </div>
                    <p style={{fontWeight:600,fontSize:10,color:"var(--nb-accent-light)",textTransform:"capitalize"}}>{fmt(hoveredDay.date)}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="border-t-4 border-[var(--nb-primary)] px-5 sm:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
              className="btn-brutal font-black text-xs uppercase tracking-widest flex items-center gap-2"
              style={{border:"3px solid var(--nb-primary)",padding:"6px 14px",background:"var(--nb-primary)",color:"var(--nb-accent)",boxShadow:"3px 3px 0 var(--nb-accent)",textDecoration:"none"}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--nb-accent)"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View Profile →
            </a>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontWeight:900,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--nb-primary)",opacity:0.45}}>Less</span>
              {LEGEND_COLORS.map((c,i) => (
                <div key={i} style={{width:12,height:12,flexShrink:0,background:c,border:`2px solid ${i===4?"var(--nb-accent)":"var(--nb-primary)"}`,boxShadow:i>0?`1px 1px 0 ${i===4?"var(--nb-accent)":"var(--nb-primary)"}`:"none"}}/>
              ))}
              <span style={{fontWeight:900,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--nb-primary)",opacity:0.45}}>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Icon renderer — same keys as ICON_PRESETS in AboutManager ────────────────
const STAT_ICONS: Record<string, React.ReactNode> = {
  monitor: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  book:    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  code:    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/></svg>,
  github:  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>,
  coffee:  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  star:    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  users:   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  zap:     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  award:   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  layers:  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  globe:   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  clock:   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};
const getStatIcon = (key: string) => STAT_ICONS[key] ?? STAT_ICONS.star;

// ── Stats (API-driven) ────────────────────────────────────────────────────────
interface StatItem { label: string; value: string; icon_key: string; }

function Stats() {
  const [stats,   setStats]   = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [counted, setCounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/about/stats").then(r => r.json())
      .then(d => { setStats(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCounted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  if (!loading && stats.length === 0) return null;

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-right">
      <h2 className="text-2xl font-black uppercase mb-6 text-[var(--nb-primary)] px-1 sm:px-0 relative z-10">By the Numbers</h2>
      <div className={`grid gap-4`} style={{gridTemplateColumns:`repeat(${loading?5:Math.min(stats.length,5)},1fr)`}}>
        {loading && Array.from({length:5}).map((_,i)=>(
          <div key={i} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-primary)] p-6 flex flex-col items-center">
            <div className="skeleton-shimmer w-8 h-8 mb-3"/>
            <div className="skeleton-shimmer h-8 w-12 mb-2"/>
            <div className="skeleton-shimmer h-3 w-full"/>
          </div>
        ))}
        {!loading && stats.map((stat, i) => (
          <div key={i}
            className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-primary)] p-6 flex flex-col items-center text-center group hover:bg-[var(--nb-primary)] hover:shadow-[8px_8px_0_var(--nb-accent)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
            <div className="text-[var(--nb-primary)] group-hover:text-[var(--nb-accent)] transition-colors duration-200 mb-3"
              style={{animation:counted?`statIn 0.5s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s both`:"none"}}>
              {getStatIcon(stat.icon_key)}
            </div>
            <span className="font-black text-3xl text-[var(--nb-primary)] group-hover:text-[var(--nb-accent)] transition-colors duration-200 tabular-nums leading-none mb-1"
              style={{animation:counted?`statIn 0.5s cubic-bezier(0.16,1,0.3,1) ${i*0.08+0.05}s both`:"none"}}>
              {stat.value}
            </span>
            <span className="font-black text-xs uppercase tracking-widest text-[var(--nb-primary)] group-hover:text-[var(--nb-accent-light)] transition-colors duration-200 opacity-60 group-hover:opacity-100">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── TechStack ─────────────────────────────────────────────────────────────────
function TechStack() {
  const [stacks, setStacks]       = useState<TechStack[]>([]);
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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 reveal from-left">
      <h2 className="text-2xl font-black uppercase mb-6 text-[var(--nb-primary)] px-1 sm:px-0 relative z-10">Tech Stack</h2>
      <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] overflow-hidden">
        <div className="flex border-b-4 border-[var(--nb-primary)] overflow-x-auto">
          {tabLabels.map((label, i) => (
            <button key={label} onClick={() => switchTab(i)}
              className={`flex-shrink-0 flex-1 py-3 px-3 sm:px-4 font-black uppercase text-xs sm:text-sm tracking-wider border-r-4 border-[var(--nb-primary)] last:border-r-0 transition-all duration-150 whitespace-nowrap
                ${activeTab===i?"bg-[var(--nb-primary)] text-[var(--nb-accent)]":"bg-[var(--nb-bg)] text-[var(--nb-primary)] hover:bg-[var(--nb-accent-light)]"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="p-6 sm:p-10 min-h-[180px] flex flex-wrap gap-3 sm:gap-5 items-start content-start"
          style={{opacity:animating?0:1,transform:animating?"translateY(8px)":"translateY(0)",transition:"opacity 0.18s ease, transform 0.18s ease"}}>
          {loading && Array.from({length:5}).map((_,i) => (
            <div key={i} className="tech-chip" style={{background:"var(--nb-accent-light)",opacity:0.5}}>
              <div style={{width:26,height:26,background:"var(--nb-accent)",border:"2px solid var(--nb-primary)",flexShrink:0}}/>
              <span style={{color:"transparent",background:"var(--nb-accent)",minWidth:60}}>___</span>
            </div>
          ))}
          {!loading && categories.length === 0 && <p className="font-bold text-xs uppercase text-[var(--nb-primary)] opacity-40 tracking-widest self-center w-full text-center py-8">Belum ada tech stack</p>}
          {!loading && currentTechs.map(tech => (
            <div key={tech.id} className="tech-chip">
              <img src={tech.icon} alt={tech.name} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}/>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-[var(--nb-accent)] border-t-4 border-[var(--nb-primary)]"/>
      </div>
    </section>
  );
}

// ── Capabilities (API-driven, with featured tech stack icons) ─────────────────

// ── Capabilities (API-driven, with featured tech stack icons) ─────────────────
function Capabilities() {
  const [bio,        setBio]        = useState("Saya bukan cuma nulis kode — saya bangun sistem. Dari UI yang bikin user betah, sampai backend yang bisa scale. Kalau ada masalah teknis, saya cari solusinya sampai ketemu.");
  const [infoCards,  setInfoCards]  = useState<InfoCard[]>([
    { label:"Frontend", value:"React, Tailwind, Inertia" },
    { label:"Backend",  value:"Laravel, REST API" },
    { label:"Database", value:"MySQL, Redis" },
    { label:"Tools",    value:"Git, Figma, AI Tools" },
  ]);
  const [highlights, setHighlights] = useState<string[]>(["Clean Code","Fast Delivery","UI/UX Aware","Problem Solver","Self-Taught","Always Learning"]);
  const [featStacks, setFeatStacks] = useState<TechStack[]>([]);

  useEffect(() => {
    fetch("/api/about").then(r => r.json()).then(d => {
      if (d.bio || d.extra_bio) setBio(d.bio || d.extra_bio);
      if (Array.isArray(d.info_cards)  && d.info_cards.length)  setInfoCards(d.info_cards);
      if (Array.isArray(d.highlights)  && d.highlights.length)  setHighlights(d.highlights);
    }).catch(() => {});

    fetch("/api/about/featured-stacks").then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setFeatStacks(d); })
      .catch(() => {});
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-right">
      <h2 className="text-2xl font-black uppercase mb-6 text-[var(--nb-primary)] px-1 sm:px-0 relative z-10">What I Do Best</h2>
      <div className="bg-[var(--nb-primary)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-accent)] overflow-hidden">
        <div className="p-7 sm:p-10">
          <p className="font-bold text-[var(--nb-accent-light)] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl border-l-4 border-[var(--nb-accent)] pl-4">
            {bio}
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {infoCards.map((card, i) => (
              <div key={i} className="transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{border:"2px solid var(--nb-accent)",padding:"14px",cursor:"default"}}>
                <p className="text-[var(--nb-accent)] font-black uppercase text-xs tracking-widest mb-1">{card.label}</p>
                <p className="text-[var(--nb-bg)] font-bold text-sm">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Featured Tech Stack with icons */}
          {featStacks.length > 0 && (
            <div className="mb-7">
              <p className="font-black text-xs text-[var(--nb-accent)] uppercase tracking-widest mb-3 opacity-60">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {featStacks.map(stack => (
                  <div key={stack.id}
                    className="flex items-center gap-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5"
                    style={{border:"2px solid var(--nb-accent),0.4)",padding:"5px 12px 5px 5px",background:"var(--nb-accent),0.08)"}}>
                    <img src={stack.icon} alt={stack.name}
                      onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}
                      style={{width:20,height:20,objectFit:"cover",border:"2px solid var(--nb-accent),0.5)",flexShrink:0}} />
                    <span style={{fontWeight:900,fontSize:10,textTransform:"uppercase",color:"var(--nb-accent)",letterSpacing:"0.06em"}}>{stack.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlight tags */}
          <div className="flex flex-wrap gap-2">
            {highlights.map((tag, i) => (
              <span key={i} className="font-black text-xs uppercase px-4 py-2 tracking-widest transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{border:"2px solid var(--nb-accent)",color:"var(--nb-accent)",background:"var(--nb-accent),0.1)",
                  animation:`statIn 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.06}s both`}}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Experience Timeline (API-driven) ──────────────────────────────────────────
function ExperienceTimeline() {
  const [exps, setExps]       = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/about/experiences").then(r => r.json())
      .then(d => { setExps(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-left">
      <h2 className="text-2xl font-black uppercase mb-6 text-[var(--nb-primary)] px-1 sm:px-0 relative z-10">Experience</h2>
      {loading && (
        <div className="flex flex-col gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-5 items-start">
              <div className="w-10 flex justify-center mt-1"><div className="w-4 h-4 skeleton-shimmer"/></div>
              <div className="flex-1 border-4 border-[var(--nb-primary)] p-5 bg-[var(--nb-bg)]">
                <div className="skeleton-shimmer h-5 w-48 mb-2"/>
                <div className="skeleton-shimmer h-3 w-32 mb-3"/>
                <div className="skeleton-shimmer h-3 w-full mb-1"/>
                <div className="skeleton-shimmer h-3 w-3/4"/>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && exps.length === 0 && (
        <p className="font-bold text-sm text-[var(--nb-primary)] opacity-40 italic">Belum ada experience.</p>
      )}
      {!loading && exps.length > 0 && (
        <div className="relative">
          <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-[3px] bg-[var(--nb-primary)]" style={{zIndex:0}}/>
          <div className="flex flex-col gap-6">
            {exps.map((exp) => {
              const tc = TYPE_COLORS[exp.type] ?? TYPE_COLORS.project;
              const isCurrent = !exp.end_date;
              return (
                <div key={exp.id} className="relative flex gap-5 sm:gap-7 items-start group" style={{zIndex:1}}>
                  <div className="flex-shrink-0 mt-1" style={{width:40,display:"flex",justifyContent:"center"}}>
                    <div style={{width:16,height:16,background:isCurrent?"var(--nb-accent)":"var(--nb-primary)",border:"3px solid var(--nb-primary)",
                      boxShadow:`3px 3px 0 ${isCurrent?"var(--nb-primary)":"var(--nb-accent)"}`,position:"relative",zIndex:2,transition:"transform 0.12s ease"}}
                      className="group-hover:scale-125"/>
                  </div>
                  <div className="flex-1 bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-primary)] p-5 sm:p-6 group-hover:shadow-[8px_8px_0_var(--nb-primary)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-150">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-black text-lg uppercase text-[var(--nb-primary)] leading-tight">{exp.title}</h3>
                        <p className="font-bold text-xs uppercase tracking-widest text-[var(--nb-primary)] opacity-60 mt-0.5">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-xs uppercase tracking-widest px-3 py-1"
                          style={{border:`3px solid ${tc.border}`,background:tc.bg,color:tc.text,boxShadow:`2px 2px 0 ${tc.border}`}}>
                          {exp.type}
                        </span>
                        <span className="font-bold text-xs uppercase tracking-wider text-[var(--nb-primary)] opacity-50 whitespace-nowrap">
                          {fmtDate(exp.start_date)} — {fmtDate(exp.end_date)}
                        </span>
                        {isCurrent && (
                          <span className="font-black text-xs uppercase tracking-widest px-2 py-0.5"
                            style={{border:"2px solid var(--nb-accent)",background:"var(--nb-accent),0.15)",color:"var(--nb-primary)",boxShadow:"1px 1px 0 var(--nb-accent)"}}>
                            ● Active
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-semibold text-sm text-[var(--nb-primary)] leading-relaxed mb-3 opacity-80">{exp.description}</p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((h, hi) => (
                          <span key={hi} className="font-black text-xs uppercase px-2 py-1"
                            style={{border:"2px solid var(--nb-accent)",color:"var(--nb-primary)",background:"var(--nb-accent),0.1)"}}>
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

// ── Case Studies (API-driven) ─────────────────────────────────────────────────
function CaseStudies() {
  const [cases, setCases]     = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/about/case-studies").then(r => r.json())
      .then(d => { setCases(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && cases.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-scale">
      <h2 className="text-2xl font-black uppercase mb-6 text-[var(--nb-primary)] px-1 sm:px-0 relative z-10">Case Studies</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[1,2,3,4].map(i=>(
            <div key={i} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-primary)] p-6">
              <div className="skeleton-shimmer h-4 w-32 mb-3"/>
              <div className="skeleton-shimmer h-3 w-full mb-2"/>
              <div className="skeleton-shimmer h-3 w-4/5"/>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cases.map((cs, i) => (
            <div key={cs.id} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-primary)] p-6 group hover:shadow-[8px_8px_0_var(--nb-primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center font-black text-sm"
                  style={{background:"var(--nb-primary)",color:"var(--nb-accent)",border:"2px solid var(--nb-accent)",boxShadow:"2px 2px 0 var(--nb-accent)"}}>
                  {String(i+1).padStart(2,"0")}
                </div>
                <h3 className="font-black uppercase text-sm tracking-widest text-[var(--nb-primary)]">{cs.title}</h3>
              </div>
              <p className="font-semibold text-sm text-[var(--nb-primary)] leading-relaxed opacity-75">{cs.short_story}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ── Availability (API-driven) ─────────────────────────────────────────────────
function Availability() {
  const [avail, setAvail] = useState<Availability>({
    status:"Open to Work", freelance:true, remote:true, collaboration:true, timezone:"WIB (UTC+7)"
  });

  useEffect(() => {
    fetch("/api/about/availability").then(r => r.json())
      .then(d => setAvail(d)).catch(() => {});
  }, []);

  const badges = [
    { label:"Freelance", active:avail.freelance },
    { label:"Remote",    active:avail.remote    },
    { label:"Collab",    active:avail.collaboration },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 reveal from-left">
      <h2 className="text-2xl font-black uppercase mb-6 text-[var(--nb-primary)] px-1 sm:px-0 relative z-10">Availability</h2>
      <div className="bg-[var(--nb-primary)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-accent)] p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0" style={{width:16,height:16}}>
            <div style={{width:16,height:16,background:"#4ade80",border:"3px solid rgba(74,222,128,0.4)",position:"absolute"}}/>
            <div style={{width:16,height:16,background:"#4ade80",animation:"ping 1.4s ease-in-out infinite",opacity:0.4,position:"absolute"}}/>
          </div>
          <div>
            <p className="font-black text-[var(--nb-accent)] uppercase tracking-[0.25em] text-xs mb-1">Current Status</p>
            <p className="font-black text-[var(--nb-bg)] text-2xl uppercase">{avail.status}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {badges.map((b, i) => (
            <div key={i} style={{
              border:`3px solid ${b.active?"var(--nb-accent)":"var(--nb-accent),0.2)"}`,
              background:b.active?"var(--nb-accent),0.15)":"transparent",
              padding:"8px 18px",
              boxShadow:b.active?"3px 3px 0 var(--nb-accent)":"none",
            }}>
              <p className="font-black text-xs uppercase tracking-widest" style={{color:b.active?"var(--nb-accent)":"var(--nb-accent),0.35)"}}>
                {b.active ? "✓" : "✗"} {b.label}
              </p>
            </div>
          ))}
          {avail.timezone && (
            <div style={{border:"3px solid var(--nb-accent),0.4)",padding:"8px 18px"}}>
              <p className="font-black text-xs uppercase tracking-widest text-[var(--nb-accent)] opacity-70">{avail.timezone}</p>
            </div>
          )}
        </div>
        <div className="mt-4 sm:mt-0">
          <Magnetic>
            <button 
              onClick={() => router.visit("/resume")}
              className="btn-brutal border-4 border-[var(--nb-bg)] px-8 py-4 font-black uppercase shadow-[6px_6px_0_var(--nb-accent)] bg-[var(--nb-accent)] text-[var(--nb-primary)] text-sm sm:text-base hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[4px] active:translate-y-[4px]"
            >
              Lihat Resume →
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

// ── Main About ────────────────────────────────────────────────────────────────
export default function About() {
  useVisitorTracker('/about');
  const [visible,     setVisible]     = useState(false);
  const [showTop,     setShowTop]     = useState(false);
  const [hero,        setHero]        = useState<HeroData>(DEFAULT_HERO);
  const [heroLoading, setHeroLoading] = useState(true);
  const [heroSwapped, setHeroSwapped] = useState(false);
  const [about,       setAbout]       = useState<{ highlights: string[]; extra_bio: string }>({ highlights:[], extra_bio:"" });

  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  useEffect(() => {
    fetch("/api/hero").then(r => r.json())
      .then((d) => {
        setHero({
          name:   d.name   || DEFAULT_HERO.name,
          title:  d.title  || DEFAULT_HERO.title,
          bio:    d.bio    || DEFAULT_HERO.bio,
          photo:  d.photo  || DEFAULT_HERO.photo,
          photo2: d.photo2 || null,
        });
        setHeroLoading(false);
      })
      .catch(() => setHeroLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/about").then(r => r.json())
      .then((d) => setAbout({
        extra_bio:  d.extra_bio  || "",
        highlights: Array.isArray(d.highlights) ? d.highlights : [],
      }))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h);
  }, []);

  useScrollReveal(visible);

  return (
    <>
      <style>{`
        @keyframes slideDown  { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX( 40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer    { from{background-position:-200% 0} to{background-position:200% 0} }
        @keyframes statIn     { from{opacity:0;transform:translateY(10px) scale(0.9)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes ping       { 0%{transform:scale(1);opacity:0.4} 70%,100%{transform:scale(2.4);opacity:0} }
        body { background-color:var(--nb-accent-light); }

        .anim-navbar    { animation: slideDown  0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-hero-text { animation: slideLeft  0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .anim-hero-img  { animation: slideRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.10s both; }

        .btn-brutal { transition:transform 0.08s ease,box-shadow 0.08s ease; }
        .btn-brutal:hover  { transform:translate(2px,2px);  box-shadow:2px 2px 0 var(--nb-primary) !important; }
        .btn-brutal:active { transform:translate(4px,4px);  box-shadow:0   0   0 var(--nb-primary) !important; }

        .photo-wrap { position:relative;overflow:hidden;border:4px solid var(--nb-primary);box-shadow:10px 10px 0 var(--nb-primary);flex-shrink:0;transition:transform 0.15s ease,box-shadow 0.15s ease; }
        .photo-wrap:hover { transform:translate(-3px,-3px); box-shadow:13px 13px 0 var(--nb-primary); }
        .photo-wrap img { position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center top; }

        .hero-skeleton  { background:linear-gradient(90deg,var(--nb-accent) 25%,var(--nb-accent-light) 50%,var(--nb-accent) 75%);background-size:200% 100%;animation:shimmer 1.2s ease infinite; }
        .about-skeleton { background:linear-gradient(90deg,var(--nb-accent) 25%,var(--nb-accent-light) 50%,var(--nb-accent) 75%);background-size:200% 100%;animation:shimmer 1.2s ease infinite; }
        .skeleton-shimmer { background:linear-gradient(90deg,var(--nb-accent-light) 25%,var(--nb-accent) 50%,var(--nb-accent-light) 75%);background-size:200% 100%;animation:shimmer 1.4s ease infinite; }

        .tech-chip { display:inline-flex;align-items:center;gap:8px;border:3px solid var(--nb-primary);padding:7px 14px 7px 7px;background:var(--nb-bg);font-size:11px;font-weight:800;text-transform:uppercase;color:var(--nb-primary);letter-spacing:0.06em;transition:transform 0.12s ease,box-shadow 0.12s ease,background 0.12s ease;cursor:default;box-shadow:3px 3px 0 var(--nb-primary);flex:0 0 calc(25% - 15px);justify-content:flex-start;box-sizing:border-box; }
        @media(max-width:640px){.tech-chip{flex:0 0 calc(50% - 6px);}}
        .tech-chip:hover { background:var(--nb-accent);transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--nb-primary); }
        .tech-chip img { width:26px;height:26px;object-fit:cover;border:2px solid var(--nb-primary);flex-shrink:0; }

        .back-to-top { position:fixed;bottom:28px;right:28px;z-index:99;width:48px;height:48px;border:4px solid var(--nb-primary);background:var(--nb-primary);box-shadow:4px 4px 0 var(--nb-accent);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 0.1s ease,box-shadow 0.1s ease,opacity 0.3s ease,visibility 0.3s ease; }
        .back-to-top:hover  { transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--nb-accent); }
        .back-to-top:active { transform:translate(0,0);       box-shadow:2px 2px 0 var(--nb-accent); }

        .photo2-frame { position:absolute;bottom:12%;right:10%;
          border:4px solid var(--nb-primary);box-shadow:6px 6px 0 var(--nb-primary);
          overflow:hidden;z-index:9;transform:rotate(3deg);background:var(--nb-accent-light);
          transition:transform 0.15s ease,box-shadow 0.15s ease; }
        .photo2-frame:hover { transform:rotate(1deg) translate(-2px,-2px); box-shadow:8px 8px 0 var(--nb-primary); }
        .photo2-frame img { width:100%;height:100%;object-fit:cover;object-position:center top;display:block; }
      `}</style>

      <div className="min-h-screen relative" style={{opacity:visible?1:0,transition:"opacity 0.3s ease"}}>
        <Head title="About Me" />
        <FloatingBlocks/>
        <div className="anim-navbar"><Navbar/></div>

        {/* PAGE HEADER */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8 flex items-center gap-6">
          <button onClick={() => router.visit("/")}
            className="btn-brutal border-4 border-[var(--nb-primary)] px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0_var(--nb-primary)] bg-[var(--nb-bg)] text-[var(--nb-primary)] flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
          <div>
            <p className="font-black uppercase text-xs text-[var(--nb-primary)] opacity-50 tracking-[0.25em]">Portfolio</p>
            <h1 className="font-black uppercase text-2xl sm:text-3xl text-[var(--nb-primary)] leading-none">About Me</h1>
          </div>
        </div>

        {/* BIO HERO — Text LEFT, Dual Photo RIGHT */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="bg-[var(--nb-primary)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-accent)] flex flex-col md:flex-row overflow-hidden">

            {/* Text LEFT */}
            <div className="anim-hero-text flex-1 p-8 sm:p-12 flex flex-col justify-center relative order-2 md:order-1">
              <span className="absolute top-5 right-8 text-8xl font-black text-[var(--nb-accent)] select-none leading-none opacity-15" aria-hidden>"</span>

              {heroLoading ? (
                <div className="space-y-3 mb-6">
                  <div className="about-skeleton h-12 w-64"/>
                  <div className="w-12 h-1 bg-[var(--nb-accent)] mt-1"/>
                  <div className="about-skeleton h-4 w-full mt-3"/>
                  <div className="about-skeleton h-4 w-4/5"/>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl sm:text-5xl font-black uppercase text-[var(--nb-bg)] mb-4 leading-tight">{hero.name}</h2>
                  <div className="w-12 h-1 bg-[var(--nb-accent)] mb-5"/>
                  <p className="font-bold uppercase mb-5 text-[var(--nb-accent)] tracking-wider text-sm border-l-4 border-[var(--nb-accent)] pl-3">{hero.title}</p>
                  <p className="font-semibold text-[var(--nb-accent-light)] leading-relaxed max-w-lg text-base">
                    {about.extra_bio || hero.bio}
                  </p>
                </>
              )}

              {about.highlights.filter(Boolean).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {about.highlights.filter(Boolean).map((tag, i) => (
                    <span key={i} className="font-black text-xs uppercase px-3 py-1.5 tracking-widest"
                      style={{border:"2px solid var(--nb-accent)",color:"var(--nb-accent)",background:"var(--nb-accent),0.1)",
                        animation:`statIn 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.06}s both`}}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Photo RIGHT — Dual photo layout */}
            <div className="anim-hero-img md:w-2/5 relative bg-[var(--nb-accent-light)] border-b-4 md:border-b-0 md:border-l-4 border-[var(--nb-primary)] flex items-center justify-center py-16 px-8 min-h-[350px] sm:min-h-[420px] order-1 md:order-2 overflow-hidden">
              {/* Bold Grid bg */}
              <div className="absolute inset-0 opacity-20" style={{backgroundImage:"repeating-linear-gradient(0deg,var(--nb-primary) 0,var(--nb-primary) 2px,transparent 2px,transparent 40px),repeating-linear-gradient(90deg,var(--nb-primary) 0,var(--nb-primary) 2px,transparent 2px,transparent 40px)"}}/>

              <div className="relative w-full max-w-[260px] aspect-[4/5] flex items-center justify-center">
                {/* Secondary photo */}
                {!heroLoading && hero.photo2 && (
                  <div 
                    onClick={() => setHeroSwapped(!heroSwapped)}
                    className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] ${
                      heroSwapped
                      ? "z-20 w-full left-[-5%] bottom-[-5%] p-3 pb-12 shadow-[12px_12px_0_var(--nb-accent)] -rotate-3 hover:rotate-0 hover:scale-[1.02]"
                      : "z-0 w-[85%] right-[-15%] top-[-5%] p-2 pb-8 shadow-[8px_8px_0_var(--nb-primary)] rotate-[8deg] hover:rotate-[12deg] hover:scale-105"
                    }`}
                  >
                    <div className="absolute -top-3 right-4 w-12 h-6 bg-white/70 border-2 border-[var(--nb-primary)] -rotate-6 z-30 shadow-sm backdrop-blur-sm"></div>
                    <div className="w-full aspect-square border-4 border-[var(--nb-primary)] overflow-hidden">
                      <img src={hero.photo2} alt="secondary" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                {/* Primary photo */}
                <div 
                  onClick={() => hero.photo2 && setHeroSwapped(!heroSwapped)}
                  className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${hero.photo2 ? 'cursor-pointer' : ''} bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] ${
                    heroSwapped && hero.photo2
                    ? "z-0 w-[85%] right-[-15%] top-[-5%] p-2 pb-8 shadow-[8px_8px_0_var(--nb-primary)] rotate-[8deg] hover:rotate-[12deg] hover:scale-105"
                    : "z-10 w-full left-[-5%] bottom-[-5%] p-3 pb-12 shadow-[12px_12px_0_var(--nb-accent)] -rotate-3 hover:rotate-0 hover:scale-[1.02]"
                  }`}
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/80 border-2 border-[var(--nb-primary)] rotate-2 z-30 shadow-sm backdrop-blur-md"></div>
                  <div className="w-full aspect-[4/5] border-4 border-[var(--nb-primary)] overflow-hidden bg-[var(--nb-primary)] relative">
                    {heroLoading
                      ? <div className="hero-skeleton absolute inset-0"/>
                      : <img src={hero.photo!} alt={hero.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" onError={e=>{(e.target as HTMLImageElement).src="/profile/Mboy.jpeg";}}/>
                    }
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center font-black text-sm uppercase text-[var(--nb-primary)] tracking-widest px-2 opacity-80">
                    {hero.name}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SUPPORTERS */}
        <SupportersSection />

        {/* CAPABILITIES */}
        <Capabilities/>

        {/* STATS */}
        <Stats/>

        {/* EXPERIENCE */}
        <ExperienceTimeline/>

        {/* CASE STUDIES */}
        <CaseStudies/>

        {/* TECH STACK */}
        <TechStack/>

        {/* GITHUB */}
        <GitHubContributions username="zysrnh"/>

        {/* AVAILABILITY */}
        <Availability/>

        {/* FOOTER */}
        <footer className="border-t-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] reveal">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="font-black text-xl text-[var(--nb-primary)] cursor-pointer" onClick={() => router.visit("/")}>Naoo.id</div>
              <p className="font-bold uppercase text-xs text-[var(--nb-primary)] opacity-50 tracking-widest">© {new Date().getFullYear()} Zaki Yusron Hasyimmi</p>
            </div>
          </div>
        </footer>

        {/* BACK TO TOP */}
        <button className="back-to-top" style={{opacity:showTop?1:0,visibility:showTop?"visible":"hidden"}}
          onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--nb-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </div>
    </>
  );
}
