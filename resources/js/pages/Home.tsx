import Navbar from "@/components/Navbar";
import { useEffect, useState, useRef, useCallback } from "react";
import { router } from "@inertiajs/react";

// ── Scroll reveal hook ────────────────────────────────────────────────────────
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

// ── FloatingBlocks ─────────────────────────────────────────────────────────────
const BLOCK_CONFIGS = [
  { top:"8%",  left:"3%",   size:64, color:"#9ECCFA", type:"filled",  animDelay:"0s"   },
  { top:"55%", left:"2%",   size:20, color:"#0B1957", type:"outline", animDelay:"1.2s" },
  { top:"30%", left:"1.5%", size:14, color:"#9ECCFA", type:"filled",  animDelay:"2.4s" },
  { top:"75%", left:"4%",   size:40, color:"#F8F3EA", type:"outline", animDelay:"0.6s" },
  { top:"12%", left:"92%",  size:28, color:"#0B1957", type:"filled",  animDelay:"1.8s" },
  { top:"45%", left:"94%",  size:48, color:"#9ECCFA", type:"outline", animDelay:"0.3s" },
  { top:"70%", left:"91%",  size:16, color:"#F8F3EA", type:"filled",  animDelay:"2.1s" },
  { top:"85%", left:"93%",  size:36, color:"#9ECCFA", type:"outline", animDelay:"1.5s" },
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

// ── SpotlightCard ──────────────────────────────────────────────────────────────
function SpotlightCard({children,className="",onClick}:{children:React.ReactNode;className?:string;onClick?:()=>void}) {
  const cardRef=useRef<HTMLDivElement>(null);
  const [spotlight,setSpotlight]=useState({x:0,y:0,opacity:0});
  const handleMouseMove=useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
    const card=cardRef.current; if(!card) return;
    const rect=card.getBoundingClientRect();
    setSpotlight({x:e.clientX-rect.left,y:e.clientY-rect.top,opacity:1});
  },[]);
  const handleMouseLeave=useCallback(()=>setSpotlight(p=>({...p,opacity:0})),[]);
  return (
    <div ref={cardRef} className={`spotlight-card ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick}>
      <div className="spotlight-glow" style={{left:spotlight.x,top:spotlight.y,opacity:spotlight.opacity}}/>
      {children}
    </div>
  );
}

// ── Types ──────────────────────────────────────────────────────────────────────
interface Stack { id:number; label:string; icon:string; }
interface Project { id:number; slug:string; title:string; desc:string; images:string[]; status:"Hosted"|"In Progress"|"Planning"; date:string; stacks:Stack[]; }
interface TechStackItem { id:number; name:string; icon:string; category:string; }
interface HeroProfile { name:string; title:string; bio:string; photo:string|null; }

type ContactPlatform = "whatsapp"|"email"|"github"|"linkedin"|"twitter"|"instagram"|"telegram"|"custom";
interface ContactItem {
  id: number;
  platform: ContactPlatform;
  label: string;
  value: string;
  url: string;
  is_visible: boolean;
  sort_order: number;
  icon_color: string;
}

const DEFAULT_HERO:HeroProfile = {
  name:"Yusron", title:"IT Programmer",
  bio:"Saya membangun aplikasi web modern, dashboard, dan tools internal dengan fokus pada UI yang rapi, performa, dan pengalaman pengguna.",
  photo:"/profile/Mboy.jpeg",
};
const FALLBACK_ICON="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3C/svg%3E";
const STATUS_DOT:Record<string,string> = {"Hosted":"#22c55e","In Progress":"#F59E0B","Planning":"#9ECCFA"};

// ── Platform SVG Icons ─────────────────────────────────────────────────────────
function PlatformIcon({ platform }: { platform: ContactPlatform }) {
  switch (platform) {
    case "whatsapp":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
    case "email":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
    case "github":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="#9ECCFA"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
    case "linkedin":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    case "twitter":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
    case "instagram":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
    case "telegram":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;
    default:
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
  }
}

// ── TechStack ──────────────────────────────────────────────────────────────────
function TechStack() {
  const [stacks,setStacks]=useState<TechStackItem[]>([]);
  const [loading,setLoading]=useState(true);
  const [activeTab,setActiveTab]=useState(0);
  const [animating,setAnimating]=useState(false);
  useEffect(()=>{
    fetch("/api/tech-stacks/visible").then(r=>r.json())
      .then(d=>{setStacks(Array.isArray(d)?d:[]);setLoading(false);})
      .catch(()=>setLoading(false));
  },[]);
  const categories=Array.from(new Set(stacks.map(s=>s.category)));
  useEffect(()=>{setActiveTab(0);},[categories.length]);
  const switchTab=(i:number)=>{
    if(i===activeTab) return;
    setAnimating(true); setTimeout(()=>{setActiveTab(i);setAnimating(false);},180);
  };
  const currentTechs=stacks.filter(s=>s.category===categories[activeTab]);
  const tabLabels=categories.length>0?categories:["Frontend","Backend","Tools","AI Tools"];
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 reveal from-left">
      <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">Tech Stack</h2>
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden">
        <div className="flex border-b-4 border-[#0B1957] overflow-x-auto">
          {tabLabels.map((label,i)=>(
            <button key={label} onClick={()=>switchTab(i)}
              className={`flex-shrink-0 flex-1 py-3 px-3 sm:px-4 font-black uppercase text-xs sm:text-sm tracking-wider border-r-4 border-[#0B1957] last:border-r-0 transition-all duration-150 whitespace-nowrap
                ${activeTab===i?"bg-[#0B1957] text-[#9ECCFA]":"bg-[#F8F3EA] text-[#0B1957] hover:bg-[#D1E8FF]"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="p-6 sm:p-10 min-h-[180px] flex flex-wrap gap-3 sm:gap-5 items-start content-start"
          style={{opacity:animating?0:1,transform:animating?"translateY(8px)":"translateY(0)",transition:"opacity 0.18s ease, transform 0.18s ease"}}>
          {loading && Array.from({length:5}).map((_,i)=>(
            <div key={i} className="tech-chip" style={{background:"#D1E8FF",opacity:0.5}}>
              <div style={{width:26,height:26,background:"#9ECCFA",border:"2px solid #0B1957",flexShrink:0}}/>
              <span style={{color:"transparent",background:"#9ECCFA",minWidth:60}}>___</span>
            </div>
          ))}
          {!loading&&categories.length===0&&<p className="font-bold text-xs uppercase text-[#0B1957] opacity-40 tracking-widest self-center w-full text-center py-8">Belum ada tech stack</p>}
          {!loading&&currentTechs.map(tech=>(
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

// ── ProjectCount ───────────────────────────────────────────────────────────────
function ProjectCount({projects}:{projects:Project[]}) {
  const stackCounts:Record<string,number>={};
  projects.forEach(p=>p.stacks?.forEach(s=>{stackCounts[s.label]=(stackCounts[s.label]||0)+1;}));
  const topEntry=Object.entries(stackCounts).sort((a,b)=>b[1]-a[1])[0];
  const STATS=[
    {value:projects.length,                                          label:"Total Projects",  note:"Semua project"},
    {value:Object.keys(stackCounts).length,                         label:"Tech Stacks Used",note:"Teknologi berbeda"},
    {value:projects.filter(p=>p.status==="Hosted").length,          label:"Hosted",          note:"Live & deployed"},
    {value:projects.filter(p=>p.status==="In Progress").length,     label:"In Progress",     note:"Sedang dikerjakan"},
  ];
  const [counts,setCounts]=useState(STATS.map(()=>0));
  const sectionRef=useRef<HTMLElement>(null);
  const hasAnimated=useRef(false);
  useEffect(()=>{hasAnimated.current=false;setCounts(STATS.map(()=>0));},[projects.length]);
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting&&!hasAnimated.current){
        hasAnimated.current=true;
        STATS.forEach((stat,i)=>{
          const duration=800,steps=40; let step=0;
          const timer=setInterval(()=>{
            step++;
            const eased=1-Math.pow(1-step/steps,3);
            const current=Math.round(eased*stat.value);
            setCounts(prev=>{const next=[...prev];next[i]=current;return next;});
            if(step>=steps) clearInterval(timer);
          },duration/steps);
        });
      }
    },{threshold:0.25});
    if(sectionRef.current) observer.observe(sectionRef.current);
    return ()=>observer.disconnect();
  },[projects.length]);
  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-right">
      <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">Project Stats</h2>
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat,i)=>(
            <div key={i} className="relative flex flex-col items-center justify-center py-10 px-4 text-center overflow-hidden group border-b-4 border-[#0B1957] [&:nth-child(odd)]:border-r-4 [&:nth-child(odd)]:border-r-[#0B1957] md:[&:nth-child(n)]:border-r-4 md:[&:nth-child(n)]:border-r-[#0B1957] md:[&:last-child]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0 md:[&:nth-child(3)]:border-b-4 md:[&:nth-child(4)]:border-b-4">
              <div className="absolute inset-0 bg-[#0B1957] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"/>
              <div className="absolute top-0 left-0 border-t-[18px] border-l-[18px] border-t-[#9ECCFA] border-l-transparent"/>
              <span className="relative z-10 font-black tabular-nums leading-none text-[#0B1957] group-hover:text-[#9ECCFA] transition-colors duration-300" style={{fontSize:"clamp(2.8rem,7vw,4.5rem)"}}>
                {counts[i]}<sup className="text-[#9ECCFA] group-hover:text-[#D1E8FF] text-xl align-super ml-0.5">+</sup>
              </span>
              <p className="relative z-10 font-black uppercase text-xs tracking-[0.12em] text-[#0B1957] group-hover:text-[#F8F3EA] transition-colors duration-300 mt-3 leading-snug">{stat.label}</p>
              <p className="relative z-10 font-semibold text-[10px] uppercase tracking-wide text-[#0B1957] opacity-40 group-hover:text-[#9ECCFA] group-hover:opacity-100 transition-all duration-300 mt-1">{stat.note}</p>
            </div>
          ))}
        </div>
        {topEntry&&(
          <div className="bg-[#0B1957] border-t-4 border-[#0B1957] px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 justify-between">
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#9ECCFA]"/><span className="font-black uppercase text-xs tracking-[0.2em] text-[#9ECCFA]">Most Used Stack</span></div>
            <div className="flex items-center gap-3">
              <span className="font-black text-[#F8F3EA] uppercase text-sm border-2 border-[#9ECCFA] px-4 py-1">{topEntry[0]}</span>
              <span className="font-bold text-[#D1E8FF] text-xs uppercase">{topEntry[1]}x digunakan</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── SkeletonCard ───────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{border:"4px solid #0B1957",background:"#F8F3EA",boxShadow:"5px 5px 0 #0B1957"}}>
      <div className="skeleton-shimmer" style={{width:"100%",height:176,borderBottom:"4px solid #0B1957"}}/>
      <div style={{padding:20,display:"flex",flexDirection:"column",gap:10}}>
        <div className="skeleton-shimmer" style={{height:14,width:"70%"}}/>
        <div className="skeleton-shimmer" style={{height:11,width:"90%"}}/>
        <div style={{display:"flex",gap:8,marginTop:4}}>
          <div className="skeleton-shimmer" style={{width:36,height:36}}/>
          <div className="skeleton-shimmer" style={{width:36,height:36}}/>
        </div>
      </div>
    </div>
  );
}

// ── LoadingScreen ──────────────────────────────────────────────────────────────
function LoadingScreen({ progress }: { progress: number }) {
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const [dots, setDots] = useState("");

  // Glitch effect at certain progress points
  useEffect(() => {
    if (progress === 30 || progress === 60 || progress === 90) {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }
  }, [Math.floor(progress / 30)]);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? "" : d + ".");
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Scan line animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(p => (p + 2) % 100);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const phase =
    progress < 25 ? { label: "LOADING ASSETS", code: "01" } :
    progress < 50 ? { label: "BUILDING UI", code: "02" } :
    progress < 75 ? { label: "COMPILING STYLES", code: "03" } :
    progress < 95 ? { label: "ALMOST READY", code: "04" } :
                   { label: "LAUNCHING", code: "05" };

  const blocks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

  return (
    <div className="min-h-screen bg-[#0B1957] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(0deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 48px)"
      }}/>

      {/* Scan line effect */}
      <div className="absolute inset-x-0 pointer-events-none" style={{
        top: `${scanLine}%`, height: "2px",
        background: "linear-gradient(90deg, transparent, rgba(158,204,250,0.15), transparent)",
        transition: "top 0.016s linear"
      }}/>

      {/* Floating corner decorations */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-[#9ECCFA] opacity-40"/>
      <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-[#9ECCFA] opacity-40"/>
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-[#9ECCFA] opacity-40"/>
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-[#9ECCFA] opacity-40"/>

      {/* Phase code — top left */}
      <div className="absolute top-8 left-8 hidden sm:flex items-center gap-2">
        <div className="w-2 h-2 bg-[#9ECCFA] animate-pulse"/>
        <span className="font-black text-[10px] uppercase tracking-[0.4em] text-[#9ECCFA] opacity-50">SYS/{phase.code}</span>
      </div>

      {/* Version — top right */}
      <div className="absolute top-8 right-8 hidden sm:block">
        <span className="font-black text-[10px] uppercase tracking-[0.3em] text-[#9ECCFA] opacity-30">v2.0.0</span>
      </div>

      {/* Main content */}
      <div className="w-full max-w-lg relative z-10">

        {/* Logo / Title */}
        <div className="mb-10">
          <div className="flex items-end gap-4 mb-1">
            <h1
              className="text-6xl sm:text-7xl font-black uppercase text-[#F8F3EA] leading-none select-none"
              style={{
                textShadow: glitchActive
                  ? "3px 0 #9ECCFA, -3px 0 #F59E0B"
                  : "4px 4px 0 rgba(158,204,250,0.3)",
                transition: "text-shadow 0.05s ease",
                letterSpacing: "-0.02em"
              }}
            >
              Naoo
            </h1>
            <span className="text-3xl sm:text-4xl font-black text-[#9ECCFA] mb-1 leading-none">.id</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[3px] w-8 bg-[#9ECCFA]"/>
            <p className="font-black uppercase text-[10px] tracking-[0.4em] text-[#9ECCFA] opacity-60">Portfolio System</p>
          </div>
        </div>

        {/* Block progress bar */}
        <div className="mb-4">
          <div className="flex gap-1">
            {blocks.map(i => {
              const filled = progress >= (i + 1) * 5;
              const active = !filled && progress >= i * 5;
              return (
                <div
                  key={i}
                  className="flex-1 h-7 border-2 border-[#9ECCFA] relative overflow-hidden"
                  style={{ borderColor: filled ? "#9ECCFA" : "rgba(158,204,250,0.2)" }}
                >
                  {filled && (
                    <div className="absolute inset-0 bg-[#9ECCFA]"/>
                  )}
                  {active && (
                    <div
                      className="absolute inset-0 bg-[#9ECCFA]"
                      style={{
                        animation: "blockPulse 0.6s ease infinite",
                        opacity: 0.6
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress info row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span
              className="font-black text-4xl tabular-nums leading-none"
              style={{
                color: "#9ECCFA",
                textShadow: glitchActive ? "2px 0 #F59E0B" : "none",
                transition: "text-shadow 0.05s ease"
              }}
            >
              {String(progress).padStart(3, "0")}
            </span>
            <span className="font-black text-xl text-[#9ECCFA] opacity-50">%</span>
          </div>
          <div className="text-right">
            <p className="font-black uppercase text-xs tracking-widest text-[#9ECCFA]">{phase.label}{dots}</p>
            <p className="font-bold text-[10px] text-[#D1E8FF] opacity-30 uppercase tracking-wider mt-0.5">Please wait</p>
          </div>
        </div>

        {/* Terminal-style log lines */}
        <div className="border-2 border-[#9ECCFA] border-opacity-20 bg-black bg-opacity-30 px-4 py-3 font-mono">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-400 opacity-70"/>
            <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-70"/>
            <div className="w-2 h-2 rounded-full bg-green-400 opacity-70"/>
            <span className="text-[10px] text-[#9ECCFA] opacity-30 ml-2 uppercase tracking-widest">terminal</span>
          </div>
          <div className="space-y-1">
            {[
              { threshold: 0,  text: "→ Initializing portfolio engine...", done: progress > 10 },
              { threshold: 20, text: "→ Fetching project data...",          done: progress > 35 },
              { threshold: 40, text: "→ Compiling components...",           done: progress > 60 },
              { threshold: 65, text: "→ Applying styles...",                done: progress > 80 },
              { threshold: 85, text: "→ Ready to launch!",                  done: progress >= 100 },
            ].map((line, i) => (
              progress >= line.threshold && (
                <p key={i} className="text-[11px] font-bold" style={{
                  color: line.done ? "#9ECCFA" : "#D1E8FF",
                  opacity: line.done ? 1 : 0.5
                }}>
                  {line.text}
                  {!line.done && progress >= line.threshold && <span className="animate-pulse"> _</span>}
                </p>
              )
            ))}
          </div>
        </div>

        {/* Bottom hint */}
        <p className="text-center font-bold text-[10px] uppercase tracking-[0.3em] text-[#9ECCFA] opacity-20 mt-6">
          Best viewed on desktop
        </p>
      </div>

      <style>{`
        @keyframes blockPulse { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
        @keyframes shimmer{from{transform:translateX(-200%)}to{transform:translateX(200%)}}
      `}</style>
    </div>
  );
}

// ── MobileBanner ───────────────────────────────────────────────────────────────
function MobileBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: "#0B1957",
        borderBottom: "4px solid #9ECCFA",
        boxShadow: "0 4px 0 #9ECCFA",
        animation: "slideDownBanner 0.4s cubic-bezier(0.16,1,0.3,1) both"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-8 h-8 border-2 border-[#9ECCFA] flex items-center justify-center bg-[#9ECCFA] bg-opacity-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ECCFA" strokeWidth="2.5" strokeLinecap="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="font-black uppercase text-[10px] tracking-[0.25em] text-[#9ECCFA] leading-tight">
            Gunakan Desktop
          </p>
          <p className="font-semibold text-[11px] text-[#D1E8FF] opacity-70 leading-tight truncate">
            Untuk pengalaman terbaik, buka di desktop atau laptop
          </p>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 w-7 h-7 border-2 border-[#9ECCFA] border-opacity-40 flex items-center justify-center text-[#9ECCFA] hover:bg-[#9ECCFA] hover:bg-opacity-20 transition-colors"
          aria-label="Tutup"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <style>{`@keyframes slideDownBanner{from{opacity:0;transform:translateY(-100%)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ── Main Home ──────────────────────────────────────────────────────────────────
export default function Home() {
  const hasLoaded=typeof window!=="undefined"&&sessionStorage.getItem("hasLoaded")==="true";
  const [loading,setLoading]=useState(!hasLoaded);
  const [progress,setProgress]=useState(hasLoaded?100:0);
  const [visible,setVisible]=useState(hasLoaded);
  const [showTop,setShowTop]=useState(false);
  const [isMobile,setIsMobile]=useState(false);

  const [projects,setProjects]=useState<Project[]>([]);
  const [projectsLoading,setProjectsLoading]=useState(true);
  const [currentSlide,setCurrentSlide]=useState(0);
  const [isHoveringCarousel,setIsHoveringCarousel]=useState(false);
  const autoplayRef=useRef<ReturnType<typeof setInterval>|null>(null);

  const [hero,setHero]=useState<HeroProfile>(DEFAULT_HERO);
  const [heroLoading,setHeroLoading]=useState(true);

  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [contactsLoading, setContactsLoading] = useState(true);

  useEffect(()=>{
    fetch("/api/hero").then(r=>r.json())
      .then((d:HeroProfile)=>setHero({name:d.name||DEFAULT_HERO.name,title:d.title||DEFAULT_HERO.title,bio:d.bio||DEFAULT_HERO.bio,photo:d.photo||DEFAULT_HERO.photo}))
      .catch(()=>{}).finally(()=>setHeroLoading(false));
  },[]);

  useEffect(()=>{
    fetch("/api/projects").then(r=>r.json())
      .then(d=>setProjects(Array.isArray(d)?d:[]))
      .catch(()=>{}).finally(()=>setProjectsLoading(false));
  },[]);

  useEffect(()=>{
    fetch("/api/contact/visible").then(r=>r.json())
      .then(d=>setContacts(Array.isArray(d)?d:[]))
      .catch(()=>{}).finally(()=>setContactsLoading(false));
  },[]);

  const perPage=isMobile?1:3;
  const displayed=projects.slice(0,6);
  const totalSlides=Math.ceil(displayed.length/perPage);

  useEffect(()=>{
    const h=()=>setShowTop(window.scrollY>400);
    window.addEventListener("scroll",h,{passive:true}); return()=>window.removeEventListener("scroll",h);
  },[]);
  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<768);
    check(); window.addEventListener("resize",check); return()=>window.removeEventListener("resize",check);
  },[]);
  useEffect(()=>{
    if(!visible||isHoveringCarousel||projectsLoading||totalSlides<=1) return;
    autoplayRef.current=setInterval(()=>setCurrentSlide(p=>(p+1)%totalSlides),3000);
    return()=>{if(autoplayRef.current)clearInterval(autoplayRef.current);};
  },[visible,isHoveringCarousel,projectsLoading,totalSlides]);
  useEffect(()=>{
    if(hasLoaded) return;
    const duration=1800,interval=16,steps=duration/interval; let current=0;
    const timer=setInterval(()=>{
      current++;
      const eased=current<steps*0.7?(current/(steps*0.7))*85:85+((current-steps*0.7)/(steps*0.3))*15;
      setProgress(Math.min(Math.round(eased),100));
      if(current>=steps){clearInterval(timer);setTimeout(()=>{sessionStorage.setItem("hasLoaded","true");setLoading(false);setTimeout(()=>setVisible(true),50);},200);}
    },interval);
    return()=>clearInterval(timer);
  },[]);

  useScrollReveal(visible);
  const scrollTo=(id:string)=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:"smooth",block:"start"});};
  const goToSlide=(idx:number)=>{if(autoplayRef.current)clearInterval(autoplayRef.current);setCurrentSlide(idx);};
  const heroPhoto=hero.photo||DEFAULT_HERO.photo;

  if(loading) return <LoadingScreen progress={progress} />;

  return (
    <>
      <style>{`
        @keyframes slideDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes shimmer{from{background-position:-200% 0}to{background-position:200% 0}}
        body{background-color:#D1E8FF;}
        .anim-navbar{animation:slideDown 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both;}
        .anim-hero-img{animation:slideLeft 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both;}
        .anim-hero-text{animation:slideRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both;}
        .btn-brutal{transition:transform 0.08s ease,box-shadow 0.08s ease;}
        .btn-brutal:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #0B1957 !important;}
        .btn-brutal:active{transform:translate(4px,4px);box-shadow:0 0 0 #0B1957 !important;}
        .spotlight-card{position:relative;overflow:hidden;cursor:pointer;background:#F8F3EA;border:4px solid #0B1957;box-shadow:5px 5px 0 #0B1957;transition:transform 0.15s ease,box-shadow 0.15s ease;}
        .spotlight-card:hover{transform:translate(-3px,-3px);box-shadow:8px 8px 0 #9ECCFA,10px 10px 0 #0B1957;}
        .spotlight-card:hover .card-img{transform:scale(1.05);}
        .card-img{transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);}
        .card-overlay{opacity:0;transition:opacity 0.2s ease;}
        .spotlight-card:hover .card-overlay{opacity:1;}
        .spotlight-glow{position:absolute;width:300px;height:300px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle at center,rgba(158,204,250,0.25) 0%,rgba(158,204,250,0.1) 40%,transparent 70%);pointer-events:none;z-index:10;transition:opacity 0.3s ease;mix-blend-mode:screen;}
        .photo-wrap{position:relative;overflow:hidden;border:4px solid #0B1957;box-shadow:10px 10px 0 #0B1957;flex-shrink:0;transition:transform 0.15s ease,box-shadow 0.15s ease;}
        .photo-wrap:hover{transform:translate(-3px,-3px);box-shadow:13px 13px 0 #0B1957;}
        .photo-wrap img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center center;}
        .hero-skeleton{background:linear-gradient(90deg,#9ECCFA 25%,#D1E8FF 50%,#9ECCFA 75%);background-size:200% 100%;animation:shimmer 1.2s ease infinite;}
        .contact-card{transition:background 0.15s ease;text-decoration:none;}
        .contact-card:hover{background:#D1E8FF;}
        .contact-card:hover .contact-icon{transform:translate(-2px,-2px);box-shadow:5px 5px 0 #0B1957;}
        .contact-icon{transition:transform 0.15s ease,box-shadow 0.15s ease;}
        .tech-chip{display:inline-flex;align-items:center;gap:8px;border:3px solid #0B1957;padding:7px 14px 7px 7px;background:#F8F3EA;font-size:11px;font-weight:800;text-transform:uppercase;color:#0B1957;letter-spacing:0.06em;transition:transform 0.12s ease,box-shadow 0.12s ease,background 0.12s ease;cursor:default;box-shadow:3px 3px 0 #0B1957;flex:0 0 calc(25% - 15px);justify-content:flex-start;box-sizing:border-box;}
        @media(max-width:640px){.tech-chip{flex:0 0 calc(50% - 6px);}}
        .tech-chip:hover{background:#9ECCFA;transform:translate(-2px,-2px);box-shadow:5px 5px 0 #0B1957;}
        .tech-chip img{width:26px;height:26px;object-fit:cover;border:2px solid #0B1957;flex-shrink:0;}
        .stack-icon{display:inline-flex;align-items:center;justify-content:center;border:2px solid #0B1957;padding:3px;background:#D1E8FF;transition:transform 0.1s ease,box-shadow 0.1s ease,background 0.1s ease;cursor:default;}
        .stack-icon:hover{background:#9ECCFA;transform:translate(-2px,-2px);box-shadow:3px 3px 0 #0B1957;}
        .stack-icon img{width:28px;height:28px;object-fit:cover;display:block;}
        .dot{width:12px;height:12px;border:2px solid #0B1957;background:transparent;transition:all 0.2s ease;cursor:pointer;flex-shrink:0;}
        .dot.active{background:#0B1957;width:32px;}
        .dot:hover:not(.active){background:#9ECCFA;}
        .carousel-track{transition:transform 0.5s cubic-bezier(0.16,1,0.3,1);}
        .skeleton-shimmer{background:linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%);background-size:200% 100%;animation:shimmer 1.4s ease infinite;}
        .back-to-top{position:fixed;bottom:28px;right:28px;z-index:99;width:48px;height:48px;border:4px solid #0B1957;background:#0B1957;box-shadow:4px 4px 0 #9ECCFA;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 0.1s ease,box-shadow 0.1s ease,opacity 0.3s ease,visibility 0.3s ease;}
        .back-to-top:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #9ECCFA;}
        .back-to-top:active{transform:translate(0,0);box-shadow:2px 2px 0 #9ECCFA;}
        .contact-skeleton{background:linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%);background-size:200% 100%;animation:shimmer 1.4s ease infinite;border:4px solid #0B1957;}
      `}</style>

      {/* Mobile banner */}
      <MobileBanner />

      <div className="min-h-screen relative" style={{opacity:visible?1:0,transition:"opacity 0.3s ease"}}>
        <FloatingBlocks/>
        <div className="anim-navbar"><Navbar/></div>

        {/* HERO */}
        <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 sm:pb-20">
          <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0px_0px_#0B1957] flex flex-col md:flex-row overflow-hidden">
            <div className="anim-hero-img md:w-2/5 relative bg-[#9ECCFA] border-b-4 md:border-b-0 md:border-r-4 border-[#0B1957] flex items-center justify-center py-8 sm:py-10 px-6 sm:px-8 min-h-[260px] sm:min-h-[320px]">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage:"repeating-linear-gradient(0deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px)"}}/>
              <div className="photo-wrap" style={{width:"min(180px,60vw)",height:"min(220px,75vw)"}}>
                {heroLoading?<div className="hero-skeleton absolute inset-0"/>:<img src={heroPhoto!} alt={hero.name} onError={e=>{(e.target as HTMLImageElement).src="/profile/Mboy.jpeg";}}/>}
              </div>
            </div>
            <div className="anim-hero-text md:w-3/5 p-6 sm:p-10 flex flex-col justify-center relative">
              <span className="absolute top-4 right-6 text-6xl sm:text-8xl font-black text-[#9ECCFA] select-none leading-none" aria-hidden="true">"</span>
              {heroLoading?(
                <div className="space-y-3">
                  <div className="hero-skeleton h-10 w-48 rounded"/><div className="hero-skeleton h-4 w-32 rounded"/>
                  <div className="hero-skeleton h-4 w-full rounded mt-4"/><div className="hero-skeleton h-4 w-5/6 rounded"/>
                </div>
              ):(
                <>
                  <h1 className="text-4xl sm:text-5xl font-black uppercase mb-3 text-[#0B1957]">{hero.name}</h1>
                  <p className="font-bold uppercase mb-4 sm:mb-5 text-[#9ECCFA] tracking-wider text-sm border-l-4 border-[#9ECCFA] pl-3">{hero.title}</p>
                  <p className="font-semibold text-[#0B1957] text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">{hero.bio}</p>
                </>
              )}
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <button onClick={()=>scrollTo("about")} className="btn-brutal border-4 border-[#0B1957] px-5 sm:px-6 py-2 sm:py-3 font-black uppercase shadow-[4px_4px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957] text-sm sm:text-base">About</button>
                <button onClick={()=>scrollTo("contact")} className="btn-brutal border-4 border-[#0B1957] px-5 sm:px-6 py-2 sm:py-3 font-black uppercase shadow-[4px_4px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957] text-sm sm:text-base">Contact</button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-left" data-delay="0">
          <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">Contact</h2>

          {contactsLoading && (
            <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] flex flex-col md:flex-row overflow-hidden">
              {[0,1,2].map(i => (
                <div key={i} className="flex-1 border-b-4 md:border-b-0 md:border-r-4 border-[#0B1957] last:border-r-0 last:border-b-0 p-6 sm:p-8 flex flex-row md:flex-col gap-4 items-center md:items-start">
                  <div className="contact-skeleton w-12 h-12 flex-shrink-0" style={{boxShadow:"3px 3px 0 #0B1957"}}/>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="contact-skeleton h-3 w-20"/>
                    <div className="contact-skeleton h-5 w-32"/>
                    <div className="contact-skeleton h-3 w-24"/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!contactsLoading && contacts.length === 0 && (
            <div className="border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[6px_6px_0_#0B1957] p-12 text-center">
              <p className="font-black uppercase text-lg text-[#0B1957] mb-1">Belum Ada Kontak</p>
              <p className="font-semibold text-xs text-[#0B1957] opacity-50 uppercase">Tambahkan kontak di dashboard</p>
            </div>
          )}

          {!contactsLoading && contacts.length > 0 && (
            <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] flex flex-col md:flex-row overflow-hidden">
              {contacts.map((c, i) => {
                const isExternal = c.platform !== "email";
                const ctaText =
                  c.platform === "whatsapp" ? "Klik untuk chat →" :
                  c.platform === "email"    ? "Klik untuk email →" :
                  c.platform === "github"   ? "Klik untuk lihat repo →" :
                  c.platform === "linkedin" ? "Klik untuk lihat profil →" :
                  c.platform === "instagram"? "Klik untuk lihat profil →" :
                  c.platform === "telegram" ? "Klik untuk chat →" :
                  c.platform === "twitter"  ? "Klik untuk lihat profil →" :
                  "Klik untuk buka →";

                return (
                  <a
                    key={c.id}
                    href={c.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="contact-card flex-1 border-b-4 md:border-b-0 md:border-r-4 border-[#0B1957] last:border-r-0 last:border-b-0 p-6 sm:p-8 flex flex-row md:flex-col gap-4 items-center md:items-start"
                    style={{animationDelay:`${i*0.05}s`}}
                  >
                    <div
                      className="contact-icon border-4 border-[#0B1957] w-12 h-12 flex-shrink-0 flex items-center justify-center shadow-[3px_3px_0_#0B1957]"
                      style={{ background: c.icon_color || "#0B1957" }}
                    >
                      <PlatformIcon platform={c.platform} />
                    </div>
                    <div>
                      <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest mb-1">{c.label}</p>
                      <p className="font-black text-[#0B1957] text-base sm:text-lg break-all">{c.value}</p>
                      <p className="font-semibold text-xs text-[#0B1957] mt-1 uppercase tracking-wide">{ctaText}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>

        {/* PROJECTS */}
        <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-right" data-delay="0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase text-[#0B1957]">Projects</h2>
            {!projectsLoading&&totalSlides>0&&<div className="text-sm font-bold text-[#0B1957] uppercase tracking-widest">{currentSlide+1} / {totalSlides}</div>}
          </div>

          {projectsLoading&&(
            <div className={`grid gap-4 sm:gap-6 ${isMobile?"grid-cols-1":"grid-cols-3"}`}>
              {Array.from({length:isMobile?1:3}).map((_,i)=><SkeletonCard key={i}/>)}
            </div>
          )}
          {!projectsLoading&&displayed.length===0&&(
            <div className="border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[6px_6px_0_#0B1957] p-12 text-center">
              <p className="font-black uppercase text-lg text-[#0B1957] mb-1">Belum Ada Project</p>
              <p className="font-semibold text-xs text-[#0B1957] opacity-50 uppercase">Tambahkan project di dashboard</p>
            </div>
          )}
          {!projectsLoading&&displayed.length>0&&(
            <>
              <div className="overflow-hidden" onMouseEnter={()=>setIsHoveringCarousel(true)} onMouseLeave={()=>setIsHoveringCarousel(false)}>
                <div className="carousel-track flex" style={{transform:`translateX(-${currentSlide*100}%)`}}>
                  {Array.from({length:totalSlides}).map((_,page)=>(
                    <div key={page} className={`min-w-full grid gap-4 sm:gap-6 ${isMobile?"grid-cols-1":"grid-cols-3"}`}>
                      {displayed.slice(page*perPage,page*perPage+perPage).map((p)=>(
                        <SpotlightCard key={p.id} onClick={()=>router.visit(`/projects/${p.slug}`)}>
                          <div className="w-full h-40 sm:h-44 overflow-hidden border-b-4 border-[#0B1957] relative">
                            {p.images?.[0]
                              ?<img src={p.images[0]} alt={p.title} className="card-img w-full h-full object-cover object-top"/>
                              :<div className="w-full h-full bg-[#D1E8FF] flex items-center justify-center"><span className="font-black uppercase text-xs text-[#0B1957] opacity-30">No Image</span></div>
                            }
                            <div className="card-overlay absolute inset-0 bg-[#0B1957] bg-opacity-60 flex items-center justify-center">
                              <span className="text-[#9ECCFA] font-black uppercase text-sm border-2 border-[#9ECCFA] px-4 py-2">Lihat Detail →</span>
                            </div>
                            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#F8F3EA] border-2 border-[#0B1957] px-2 py-1 z-20">
                              <div className="w-1.5 h-1.5 rounded-full" style={{background:STATUS_DOT[p.status]??"#9ECCFA"}}/>
                              <span className="font-black uppercase text-xs text-[#0B1957]">{p.status}</span>
                            </div>
                          </div>
                          <div className="p-4 sm:p-5 relative z-20">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-black uppercase text-sm text-[#0B1957] leading-tight">{p.title}</h3>
                              <span className="font-bold text-xs text-[#0B1957] opacity-50 flex-shrink-0">{p.date}</span>
                            </div>
                            <p className="font-semibold text-xs sm:text-sm mb-4 text-[#0B1957] opacity-70">{p.desc}</p>
                            <div className="flex flex-wrap gap-2">
                              {p.stacks?.map((s,j)=>(
                                <div key={j} className="stack-icon" title={s.label}><img src={s.icon} alt={s.label}/></div>
                              ))}
                            </div>
                          </div>
                        </SpotlightCard>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-6 sm:mt-8">
                <div className="flex items-center gap-3">
                  {Array.from({length:totalSlides}).map((_,i)=>(
                    <div key={i} className={`dot ${currentSlide===i?"active":""}`} onClick={()=>goToSlide(i)}/>
                  ))}
                </div>
                <button onClick={()=>router.visit("/projects")} className="btn-brutal border-4 border-[#0B1957] px-4 sm:px-5 py-2 font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2">
                  Lihat Selengkapnya <span>→</span>
                </button>
              </div>
            </>
          )}
        </section>

        {/* TECH STACK */}
        <TechStack/>

        {/* ABOUT */}
        <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-scale">
          <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">About</h2>
          <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] flex flex-col md:flex-row overflow-hidden">
            <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
              <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-[0.3em] mb-3">Who am I</p>
              {heroLoading?(
                <div className="space-y-3 mb-6">
                  <div className="bg-[#9ECCFA] opacity-30 h-10 w-64 rounded"/><div className="w-12 h-1 bg-[#9ECCFA]"/>
                  <div className="bg-[#9ECCFA] opacity-20 h-4 w-full rounded"/><div className="bg-[#9ECCFA] opacity-20 h-4 w-4/5 rounded"/>
                </div>
              ):(
                <>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#F8F3EA] mb-4 leading-tight">{hero.name}</h3>
                  <div className="w-12 h-1 bg-[#9ECCFA] mb-5"/>
                  <p className="font-semibold text-[#D1E8FF] leading-relaxed mb-6">{hero.bio}</p>
                </>
              )}
              <div className="grid grid-cols-2 gap-3">
                {[{label:"Role",value:heroLoading?"…":hero.title},{label:"Focus",value:"Fullstack Web"},{label:"Stack",value:"React + Laravel"},{label:"Status",value:"Open to Work"}].map((item,i)=>(
                  <div key={i} className="border-2 border-[#9ECCFA] p-3">
                    <p className="text-[#9ECCFA] font-black uppercase text-xs tracking-widest mb-1">{item.label}</p>
                    <p className="text-[#F8F3EA] font-bold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-2/5 relative bg-[#9ECCFA] border-t-4 md:border-t-0 md:border-l-4 border-[#9ECCFA] flex items-center justify-center py-10 px-8 min-h-[280px]">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage:"repeating-linear-gradient(0deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px)"}}/>
              <div className="photo-wrap" style={{width:"min(260px,70vw)",height:"min(320px,85vw)"}}>
                {heroLoading?<div className="hero-skeleton absolute inset-0"/>:<img src={heroPhoto!} alt={hero.name} onError={e=>{(e.target as HTMLImageElement).src="/profile/Mboy.jpeg";}}/>}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT STATS */}
        <ProjectCount projects={projects}/>

        {/* FOOTER */}
        <footer className="border-t-4 border-[#0B1957] bg-[#F8F3EA] reveal">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <div className="font-black text-2xl text-[#0B1957] mb-1"> Naoo.id</div>
                <p className="font-semibold text-sm text-[#0B1957] opacity-70">Made with ☕ by Zaki Yusron Hasyimmi</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest mb-1">Quick Links</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {[{label:"Home",id:"hero"},{label:"Projects",id:"projects"},{label:"About",id:"about"},{label:"Contact",id:"contact"}].map(l=>(
                    <a key={l.id} onClick={()=>scrollTo(l.id)} className="font-bold text-sm text-[#0B1957] uppercase cursor-pointer hover:underline">{l.label}</a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest mb-1">Connect</p>
                <div className="flex gap-3 flex-wrap">
                  {contacts.map(c => (
                    <a
                      key={c.id}
                      href={c.url}
                      target={c.platform !== "email" ? "_blank" : undefined}
                      rel={c.platform !== "email" ? "noopener noreferrer" : undefined}
                      title={c.label}
                      className="border-4 border-[#0B1957] w-10 h-10 flex items-center justify-center btn-brutal"
                      style={{
                        background: c.icon_color || "#0B1957",
                        boxShadow: `3px 3px 0 ${c.platform === "github" ? "#9ECCFA" : "#0B1957"}`,
                      }}
                    >
                      <PlatformIcon platform={c.platform} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t-4 border-[#0B1957] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
              <p className="font-bold uppercase text-xs text-[#0B1957] tracking-widest">© {new Date().getFullYear()} Zaki Yusron Hasyimmi</p>
              <p className="font-bold uppercase text-xs text-[#0B1957] opacity-50 tracking-widest">Built with React + Vite + Tailwind</p>
            </div>
          </div>
        </footer>

        {/* BACK TO TOP */}
        <button className="back-to-top" style={{opacity:showTop?1:0,visibility:showTop?"visible":"hidden"}}
          onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ECCFA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button> 
      </div>
    </>
  );
} 