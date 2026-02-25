import { useState, useEffect, useRef } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconPlus    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconEdit    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconTrash   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>;
const IconEye     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const IconClose   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconImg     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconSave    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconCheck   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconExternal= () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IconFolder  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>;
const IconSpin    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{animation:"pcSpin 0.7s linear infinite"}}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>;

// ── Types ─────────────────────────────────────────────────────────────────────
interface TechStackOption { id: number; name: string; icon: string; category: string; }
interface Feature         { title: string; desc: string; }
interface ProjectData {
  title: string; subtitle: string; desc: string; long_desc: string;
  status: "Hosted" | "In Progress" | "Planning";
  date: string; duration: string; images: string[];
  tech_stack_ids: number[]; features: Feature[];
  demo_url: string; github_url: string; order: number; visible: boolean;
}
interface ProjectRow {
  id: number; slug: string; title: string; subtitle: string; desc: string;
  longDesc: string; status: string; date: string; duration: string;
  images: string[]; stacks: { id: number; label: string; icon: string }[];
  tech_stack_ids: number[]; features: Feature[];
  demoUrl: string | null; githubUrl: string | null;
  order: number; visible: boolean;
}

const EMPTY_FORM: ProjectData = {
  title:"", subtitle:"", desc:"", long_desc:"",
  status:"Planning", date:"", duration:"",
  images:[], tech_stack_ids:[], features:[],
  demo_url:"", github_url:"", order:0, visible:true,
};
const STATUS_OPTS = ["Hosted","In Progress","Planning"] as const;
const STATUS_CFG: Record<string,{bg:string;fg:string}> = {
  "Hosted":      {bg:"#9ECCFA", fg:"#0B1957"},
  "In Progress": {bg:"#FFE8A0", fg:"#0B1957"},
  "Planning":    {bg:"#F8F3EA", fg:"#0B1957"},
};

const FALLBACK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3C/svg%3E";

const getCsrf = (): string =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? "";

// ── Global Styles ─────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes pcSpin      { to{transform:rotate(360deg)} }
  @keyframes pcSlideUp   { from{opacity:0;transform:translateY(22px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes pcSlideRight{ from{opacity:0;transform:translateX(-18px)} to{opacity:1;transform:translateX(0)} }
  @keyframes pcSlideLeft { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:translateX(0)} }
  @keyframes pcFadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes pcShimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes pcPulse     { 0%,100%{opacity:1} 50%{opacity:.45} }
  @keyframes pcShake     { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  @keyframes pcToastIn   { from{opacity:0;transform:translateX(20px) scale(0.95)} to{opacity:1;transform:translateX(0) scale(1)} }
  @keyframes pcModalIn   { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes pcOverlay   { from{opacity:0} to{opacity:1} }
  @keyframes pcCardIn    { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

  .pc2-skeleton {
    background:linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%);
    background-size:200% 100%;
    animation:pcShimmer 1.5s ease infinite, pcPulse 1.5s ease infinite;
    border:3px solid #0B1957;
  }

  /* ── Project card ── */
  .pc2-card {
    border:4px solid #0B1957;
    background:#F8F3EA;
    box-shadow:5px 5px 0 #0B1957;
    transition:transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s cubic-bezier(0.16,1,0.3,1);
  }
  .pc2-card:hover {
    transform:translate(-3px,-3px);
    box-shadow:8px 8px 0 #9ECCFA, 10px 10px 0 #0B1957;
  }
  .pc2-card.pc2-hidden {
    opacity:0.48;
    box-shadow:3px 3px 0 #0B1957;
  }
  .pc2-card.pc2-hidden:hover {
    transform:translate(-2px,-2px);
    box-shadow:5px 5px 0 #0B1957;
    opacity:0.65;
  }

  /* ── Stack chip ── */
  .pc2-chip {
    display:inline-flex; align-items:center; gap:4px;
    border:2px solid #0B1957; padding:3px 8px;
    background:#D1E8FF; font-weight:800; font-size:10px;
    text-transform:uppercase; letter-spacing:0.06em; color:#0B1957;
    transition:transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
    cursor:default;
  }
  .pc2-chip:hover { transform:translate(-1px,-1px); box-shadow:2px 2px 0 #0B1957; background:#9ECCFA; }

  /* ── Stack select chip ── */
  .pc2-stack-sel {
    display:inline-flex; align-items:center; gap:5px;
    border:2px solid #0B1957; padding:4px 10px;
    background:#F8F3EA; font-weight:800; font-size:10px;
    text-transform:uppercase; letter-spacing:0.06em; color:#0B1957;
    cursor:pointer; box-shadow:2px 2px 0 #0B1957;
    transition:transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  }
  .pc2-stack-sel:hover { transform:translate(-1px,-1px); box-shadow:3px 3px 0 #0B1957; background:#D1E8FF; }
  .pc2-stack-sel.active { background:#0B1957; color:#9ECCFA; box-shadow:2px 2px 0 #9ECCFA; }
  .pc2-stack-sel.active:hover { transform:translate(-1px,-1px); box-shadow:3px 3px 0 #9ECCFA; }

  /* ── Filter tab ── */
  .pc2-tab {
    flex:1; padding:11px 8px; font-weight:900; font-size:11px;
    text-transform:uppercase; letter-spacing:0.1em;
    border:none; border-right:4px solid #0B1957;
    cursor:pointer; font-family:inherit;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:background 0.15s ease, color 0.15s ease;
  }
  .pc2-tab:last-child { border-right:none; }
  .pc2-tab.active  { background:#0B1957; color:#9ECCFA; }
  .pc2-tab:not(.active) { background:#F8F3EA; color:#0B1957; }
  .pc2-tab:not(.active):hover { background:#D1E8FF; }

  /* ── Input ── */
  .pc2-input {
    width:100%; border:4px solid #0B1957;
    padding:10px 14px; font-weight:700; font-size:13px;
    color:#0B1957; background:white; outline:none;
    font-family:inherit; box-sizing:border-box;
    transition:box-shadow 0.15s ease, transform 0.12s ease;
  }
  .pc2-input:focus { box-shadow:4px 4px 0 #9ECCFA; transform:translate(-1px,-1px); }
  .pc2-input.err { border-color:#e53e3e; background:#fff5f5; }
  .pc2-input::placeholder { color:rgba(11,25,87,0.3); font-weight:600; }
  .pc2-input[type=textarea], textarea.pc2-input { resize:vertical; }

  /* ── Thumb ── */
  .pc2-thumb { position:relative; overflow:hidden; border:3px solid #0B1957; box-shadow:3px 3px 0 #0B1957; transition:transform 0.15s ease, box-shadow 0.15s ease; }
  .pc2-thumb:hover { transform:translate(-2px,-2px); box-shadow:5px 5px 0 #0B1957; }
  .pc2-thumb img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease; }
  .pc2-thumb:hover img { transform:scale(1.08); }
  .pc2-thumb-del { position:absolute; top:3px; right:3px; width:20px; height:20px; background:#0B1957; border:2px solid #9ECCFA; color:#9ECCFA; display:flex; align-items:center; justify-content:center; cursor:pointer; opacity:0; transition:opacity 0.15s ease; font-size:10px; }
  .pc2-thumb:hover .pc2-thumb-del { opacity:1; }

  /* ── Upload zone ── */
  .pc2-upload { width:96px; height:68px; border:3px dashed #0B1957; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; gap:4px; transition:background 0.15s ease, transform 0.12s ease; }
  .pc2-upload:hover { background:#D1E8FF; transform:translate(-1px,-1px); }

  /* ── Feature row ── */
  .pc2-feat { border:3px solid #0B1957; padding:12px 14px; background:#F8F3EA; box-shadow:3px 3px 0 #0B1957; display:flex; gap:10px; align-items:flex-start; transition:transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease; animation:pcSlideUp 0.3s cubic-bezier(0.16,1,0.3,1); }
  .pc2-feat:hover { background:#EAF4FF; transform:translate(-1px,-1px); box-shadow:4px 4px 0 #0B1957; }

  /* ── Action buttons in card ── */
  .pc2-action {
    display:inline-flex; align-items:center; justify-content:center; gap:5px;
    border:3px solid #0B1957; padding:5px 10px;
    font-weight:900; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;
    cursor:pointer; font-family:inherit;
    box-shadow:2px 2px 0 #0B1957;
    transition:transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease, color 0.1s ease;
  }
  .pc2-action:hover:not(:disabled) { transform:translate(-1px,-1px); box-shadow:3px 3px 0 #0B1957; }
  .pc2-action:disabled { opacity:0.5; cursor:not-allowed; }
`;

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, ok, onDone }: { msg:string; ok:boolean; onDone:()=>void }) {
  useEffect(()=>{ const t=setTimeout(onDone,2800); return ()=>clearTimeout(t); },[]);
  return (
    <div style={{position:"fixed",bottom:28,right:28,zIndex:999,display:"flex",alignItems:"center",gap:10,border:"4px solid #0B1957",background:ok?"#9ECCFA":"#ef4444",color:ok?"#0B1957":"white",padding:"12px 20px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",boxShadow:"6px 6px 0 #0B1957",maxWidth:320,animation:"pcToastIn 0.35s cubic-bezier(0.16,1,0.3,1)"}}>
      {ok?<IconCheck/>:null}{msg}
    </div>
  );
}

// ── ConfirmModal ──────────────────────────────────────────────────────────────
function ConfirmModal({ msg, onConfirm, onCancel }: { msg:string; onConfirm:()=>void; onCancel:()=>void }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(11,25,87,0.72)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(5px)",animation:"pcOverlay 0.2s ease"}}>
      <div style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"12px 12px 0 #0B1957",padding:32,maxWidth:380,width:"90%",animation:"pcModalIn 0.35s cubic-bezier(0.16,1,0.3,1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <div style={{width:40,height:40,background:"#ef4444",border:"3px solid #0B1957",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <IconTrash/>
          </div>
          <p style={{fontWeight:900,fontSize:13,textTransform:"uppercase",color:"#0B1957",lineHeight:1.5,margin:0}}>{msg}</p>
        </div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={onConfirm}
            style={{flex:1,border:"4px solid #0B1957",background:"#ef4444",color:"white",padding:"10px",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:"pointer",boxShadow:"4px 4px 0 #0B1957",fontFamily:"inherit",transition:"transform 0.1s ease"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";}}>
            Ya, Hapus
          </button>
          <button onClick={onCancel}
            style={{flex:1,border:"4px solid #0B1957",background:"#F8F3EA",color:"#0B1957",padding:"10px",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:"pointer",boxShadow:"4px 4px 0 #0B1957",fontFamily:"inherit",transition:"transform 0.1s ease, background 0.1s ease"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#D1E8FF";(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#F8F3EA";(e.currentTarget as HTMLElement).style.transform="";}}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ProjectCard ───────────────────────────────────────────────────────────────
function ProjectCard({ p, index, onToggle, onEdit, onDelete }: {
  p:ProjectRow; index:number; onToggle:()=>void; onEdit:()=>void; onDelete:()=>void;
}) {
  const [entered, setEntered] = useState(false);
  const sc = STATUS_CFG[p.status] ?? STATUS_CFG["Planning"];

  useEffect(()=>{ const t=setTimeout(()=>setEntered(true),index*65+80); return()=>clearTimeout(t); },[index]);

  return (
    <div className={`pc2-card${!p.visible?" pc2-hidden":""}`}
      style={{
        padding:"18px 22px",
        opacity: entered ? (p.visible?1:0.52) : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s cubic-bezier(0.16,1,0.3,1)",
      }}>
      <div style={{display:"flex",alignItems:"flex-start",gap:20}}>

        {/* ── Thumbnail — landscape on left ── */}
        {p.images?.[0] ? (
          <div className="pc2-thumb" style={{width:220,height:140,flexShrink:0}}>
            <img src={p.images[0]} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
          </div>
        ) : (
          <div style={{width:220,height:140,flexShrink:0,border:"3px solid #0B1957",background:"#D1E8FF",boxShadow:"3px 3px 0 #0B1957",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:40,opacity:0.15}}>🗂</span>
          </div>
        )}

        {/* ── Info + Actions ── */}
        <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:0,minHeight:140}}>
          {/* Title row */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
            <span style={{fontWeight:900,fontSize:15,textTransform:"uppercase",color:"#0B1957",letterSpacing:"0.05em"}}>{p.title}</span>
            <span style={{border:"2px solid #0B1957",background:sc.bg,color:sc.fg,padding:"2px 9px",fontSize:10,fontWeight:900,textTransform:"uppercase",letterSpacing:"0.08em",transition:"transform 0.12s ease"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";}}>
              {p.status}
            </span>
            {!p.visible&&(
              <span style={{border:"2px solid #0B1957",background:"#F8F3EA",color:"#0B1957",padding:"2px 9px",fontSize:10,fontWeight:900,textTransform:"uppercase",opacity:0.45}}>Hidden</span>
            )}
          </div>

          {/* Subtitle */}
          {p.subtitle&&(
            <p style={{fontWeight:700,fontSize:11,color:"#0B1957",opacity:0.5,textTransform:"uppercase",letterSpacing:"0.06em",margin:"0 0 4px"}}>{p.subtitle}</p>
          )}

          {/* Date + Duration */}
          <p style={{fontWeight:800,fontSize:11,color:"#0B1957",opacity:0.4,textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 8px"}}>{p.date}{p.duration&&` · ${p.duration}`}</p>

          {/* Desc */}
          <p style={{fontWeight:600,fontSize:12,color:"#0B1957",opacity:0.65,lineHeight:1.55,marginBottom:10,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden",flex:1}}>{p.desc}</p>

          {/* Stack chips */}
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
            {p.stacks?.slice(0,6).map((s,si)=>(
              <div key={si} className="pc2-chip">
                <img src={s.icon} alt={s.label} style={{width:14,height:14,objectFit:"cover"}} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}/>
                {s.label}
              </div>
            ))}
            {p.stacks?.length>6&&(<div style={{border:"2px solid #0B1957",padding:"3px 8px",background:"#0B1957",color:"#9ECCFA",fontWeight:900,fontSize:10,textTransform:"uppercase"}}>+{p.stacks.length-6}</div>)}
          </div>

          {/* Actions */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",borderTop:"3px solid #0B1957",paddingTop:12,marginTop:"auto"}}>
            <button className="pc2-action" onClick={onToggle}
              style={{background:p.visible?"#F8F3EA":"#0B1957",color:p.visible?"#0B1957":"#9ECCFA"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";(e.currentTarget as HTMLElement).style.boxShadow="3px 3px 0 #0B1957";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="2px 2px 0 #0B1957";}}>
              {p.visible?<><IconEye/><span>Tampil</span></>:<><IconEyeOff/><span>Hidden</span></>}
            </button>
            {p.demoUrl&&(
              <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="pc2-action"
                style={{background:"#D1E8FF",color:"#0B1957",textDecoration:"none"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";(e.currentTarget as HTMLElement).style.boxShadow="3px 3px 0 #0B1957";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="2px 2px 0 #0B1957";}}>
                <IconExternal/><span>Demo</span>
              </a>
            )}
            <div style={{flex:1}}/>
            <button className="pc2-action" onClick={onEdit}
              style={{background:"#F8F3EA",color:"#0B1957"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#0B1957";(e.currentTarget as HTMLElement).style.color="#9ECCFA";(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";(e.currentTarget as HTMLElement).style.boxShadow="3px 3px 0 #0B1957";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#F8F3EA";(e.currentTarget as HTMLElement).style.color="#0B1957";(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="2px 2px 0 #0B1957";}}>
              <IconEdit/><span>Edit</span>
            </button>
            <button className="pc2-action" onClick={onDelete}
              style={{background:"#F8F3EA",color:"#0B1957"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#ef4444";(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="#ef4444";(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#F8F3EA";(e.currentTarget as HTMLElement).style.color="#0B1957";(e.currentTarget as HTMLElement).style.borderColor="#0B1957";(e.currentTarget as HTMLElement).style.transform="";}}>
              <IconTrash/><span>Hapus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProjectCRUD() {
  const [projects,   setProjects]   = useState<ProjectRow[]>([]);
  const [techStacks, setTechStacks] = useState<TechStackOption[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editTarget, setEditTarget] = useState<ProjectRow | null>(null);
  const [form,       setForm]       = useState<ProjectData>(EMPTY_FORM);
  const [saving,     setSaving]     = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [deleteId,   setDeleteId]   = useState<number|null>(null);
  const [toast,      setToast]      = useState<{msg:string;ok:boolean}|null>(null);
  const [errors,     setErrors]     = useState<Record<string,string>>({});
  const [headerIn,   setHeaderIn]   = useState(false);
  const [filterTab,  setFilterTab]  = useState<"all"|"visible"|"hidden">("all");
  const modalRef = useRef<HTMLDivElement>(null);
  const fileRef  = useRef<HTMLInputElement>(null);

  const showToast = (msg:string, ok=true) => setToast({msg,ok});

  useEffect(()=>{ const t=setTimeout(()=>setHeaderIn(true),60); return()=>clearTimeout(t); },[]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pr,ts] = await Promise.all([
        fetch("/api/admin/projects").then(r=>r.json()),
        fetch("/api/tech-stacks").then(r=>r.json()),
      ]);
      setProjects(Array.isArray(pr)?pr:[]);
      setTechStacks(Array.isArray(ts)?ts:[]);
    } catch { showToast("Gagal load data",false); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ fetchAll(); },[]);

  const openAdd  = () => { setEditTarget(null); setForm(EMPTY_FORM); setErrors({}); setModalOpen(true); };
  const openEdit = (p:ProjectRow) => {
    setEditTarget(p);
    setForm({title:p.title,subtitle:p.subtitle,desc:p.desc,long_desc:p.longDesc,status:p.status as ProjectData["status"],date:p.date,duration:p.duration,images:p.images??[],tech_stack_ids:p.tech_stack_ids??[],features:p.features??[],demo_url:p.demoUrl??"",github_url:p.githubUrl??"",order:p.order,visible:p.visible});
    setErrors({}); setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const handleUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if(!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append("image",file);
    try {
      const r = await fetch("/api/admin/projects/upload-image",{method:"POST",headers:{"X-CSRF-TOKEN":getCsrf()},body:fd});
      const d = await r.json();
      if(d.url){setForm(f=>({...f,images:[...f.images,d.url]}));showToast("Gambar diupload!");}
      else showToast("Upload gagal",false);
    } catch { showToast("Upload gagal",false); }
    finally { setUploading(false); if(fileRef.current) fileRef.current.value=""; }
  };

  const addFeature    = () => setForm(f=>({...f,features:[...f.features,{title:"",desc:""}]}));
  const removeFeature = (i:number) => setForm(f=>({...f,features:f.features.filter((_,j)=>j!==i)}));
  const setFeature    = (i:number,k:"title"|"desc",v:string) => setForm(f=>{const ft=[...f.features];ft[i]={...ft[i],[k]:v};return{...f,features:ft};});
  const toggleStack   = (id:number) => setForm(f=>({...f,tech_stack_ids:f.tech_stack_ids.includes(id)?f.tech_stack_ids.filter(x=>x!==id):[...f.tech_stack_ids,id]}));

  const validate = () => {
    const e:Record<string,string>={};
    if(!form.title.trim())     e.title     = "Wajib diisi";
    if(!form.subtitle.trim())  e.subtitle  = "Wajib diisi";
    if(!form.desc.trim())      e.desc      = "Wajib diisi";
    if(!form.long_desc.trim()) e.long_desc = "Wajib diisi";
    if(!form.date.trim())      e.date      = "Wajib diisi";
    if(!form.duration.trim())  e.duration  = "Wajib diisi";
    setErrors(e); return Object.keys(e).length===0;
  };

  const handleSave = async () => {
    if(!validate()){
      if(modalRef.current){modalRef.current.classList.remove("pc2-shake");void modalRef.current.offsetWidth;modalRef.current.classList.add("pc2-shake");}
      return;
    }
    setSaving(true);
    try {
      const isEdit = !!editTarget;
      const url    = isEdit ? `/api/admin/projects/${editTarget!.id}` : "/api/admin/projects";
      const r = await fetch(url,{method:isEdit?"PUT":"POST",headers:{"Content-Type":"application/json","Accept":"application/json","X-CSRF-TOKEN":getCsrf()},body:JSON.stringify({...form,demo_url:form.demo_url||null,github_url:form.github_url||null})});
      if(!r.ok){const d=await r.json();if(d.errors)setErrors(Object.fromEntries(Object.entries(d.errors).map(([k,v])=>[k,(v as string[])[0]])));else showToast(d.message||"Gagal menyimpan",false);return;}
      showToast(isEdit?"Project diupdate!":"Project ditambah!");
      closeModal(); fetchAll();
    } catch { showToast("Terjadi kesalahan",false); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id:number) => {
    try { await fetch(`/api/admin/projects/${id}`,{method:"DELETE",headers:{"X-CSRF-TOKEN":getCsrf()}}); showToast("Project dihapus!"); fetchAll(); }
    catch { showToast("Gagal hapus",false); }
    finally { setDeleteId(null); }
  };

  const handleToggle = async (id:number) => {
    try {
      const r = await fetch(`/api/admin/projects/${id}/toggle`,{method:"PATCH",headers:{"X-CSRF-TOKEN":getCsrf()}});
      const d = await r.json();
      setProjects(ps=>ps.map(p=>p.id===id?{...p,visible:d.visible}:p));
    } catch { showToast("Gagal toggle",false); }
  };

  const stacksByCategory = techStacks.reduce<Record<string,TechStackOption[]>>((acc,s)=>{
    if(!acc[s.category]) acc[s.category]=[];
    acc[s.category].push(s); return acc;
  },{});

  const visibleCount = projects.filter(p=>p.visible).length;
  const hiddenCount  = projects.filter(p=>!p.visible).length;
  const filtered     = projects.filter(p=>filterTab==="visible"?p.visible:filterTab==="hidden"?!p.visible:true);

  // ── Input helper ──
  const Field = ({label,err,children}:{label:string;err?:string;children:React.ReactNode}) => (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      <label style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957"}}>{label}</label>
      {children}
      {err&&<span style={{fontSize:11,fontWeight:800,color:"#e53e3e",textTransform:"uppercase",letterSpacing:"0.05em"}}>↑ {err}</span>}
    </div>
  );

  return (
    <>
      <style>{STYLES}</style>

      {/* ── Page Header ── */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24,gap:16,flexWrap:"wrap",opacity:headerIn?1:0,transform:headerIn?"translateY(0)":"translateY(-18px)",transition:"opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)"}}>
        <div>
          <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.3em",color:"#9ECCFA",margin:"0 0 4px",opacity:headerIn?1:0,transform:headerIn?"translateX(0)":"translateX(-12px)",transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s"}}>Kelola</p>
          <h2 style={{fontWeight:900,fontSize:26,textTransform:"uppercase",color:"#0B1957",margin:"0 0 6px",opacity:headerIn?1:0,transform:headerIn?"translateX(0)":"translateX(-12px)",transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s"}}>Projects</h2>
          <p style={{fontWeight:600,fontSize:12,color:"#0B1957",opacity:0.5,margin:0}}>{loading?"Memuat data...":projects.length+" project tersimpan"}</p>
        </div>
        <button onClick={openAdd}
          style={{display:"flex",alignItems:"center",gap:8,border:"4px solid #0B1957",background:"#0B1957",color:"#9ECCFA",padding:"10px 20px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer",boxShadow:"4px 4px 0 #9ECCFA",fontFamily:"inherit",opacity:headerIn?1:0,transform:headerIn?"translateX(0)":"translateX(16px)",transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, box-shadow 0.1s ease"}}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";(e.currentTarget as HTMLElement).style.boxShadow="6px 6px 0 #9ECCFA";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="4px 4px 0 #9ECCFA";}}>
          <IconPlus/> Tambah Project
        </button>
      </div>

      {/* ── Stats ── */}
      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",animation:"pcSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.15s both"}}>
        {[
          {n:projects.length,label:"Total",   bg:"#0B1957",fg:"#9ECCFA"},
          {n:visibleCount,   label:"Tampil",  bg:"#9ECCFA",fg:"#0B1957"},
          {n:hiddenCount,    label:"Hidden",  bg:"#F8F3EA",fg:"#0B1957"},
          {n:projects.filter(p=>p.status==="Hosted").length,      label:"Hosted",      bg:"#D1E8FF",fg:"#0B1957"},
          {n:projects.filter(p=>p.status==="In Progress").length, label:"In Progress", bg:"#FFE8A0",fg:"#0B1957"},
        ].map((c,i)=>(
          <div key={i} style={{border:"4px solid #0B1957",background:c.bg,color:c.fg,display:"flex",alignItems:"center",gap:6,padding:"6px 14px",boxShadow:"3px 3px 0 #0B1957",animation:`pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${0.15+i*0.06}s both`}}>
            <span style={{fontWeight:900,fontSize:22,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{loading?"—":c.n}</span>
            <span style={{fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",opacity:0.75}}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ── */}
      {!loading&&projects.length>0&&(
        <div style={{display:"flex",border:"4px solid #0B1957",marginBottom:16,overflow:"hidden",boxShadow:"4px 4px 0 #0B1957",animation:"pcSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.3s both"}}>
          {([["all","Semua",projects.length],["visible","Tampil",visibleCount],["hidden","Hidden",hiddenCount]] as const).map(([key,label,count])=>(
            <button key={key} onClick={()=>setFilterTab(key as any)} className={`pc2-tab${filterTab===key?" active":""}`}>
              {label}
              <span style={{background:filterTab===key?"rgba(158,204,250,0.2)":"#D1E8FF",color:filterTab===key?"#9ECCFA":"#0B1957",border:`2px solid ${filterTab===key?"#9ECCFA":"#0B1957"}`,fontSize:10,fontWeight:900,padding:"1px 7px",minWidth:22,textAlign:"center",transition:"all 0.15s ease"}}>{count}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── List ── */}
      {loading ? (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[0,1,2].map(i=>(
            <div key={i} style={{border:"4px solid #0B1957",background:"#F8F3EA",boxShadow:"5px 5px 0 #0B1957",padding:"18px 22px",animation:`pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.09}s both`}}>
              <div style={{display:"flex",gap:18,alignItems:"flex-start"}}>
                <div className="pc2-skeleton" style={{width:96,height:72,flexShrink:0,border:"none"}}/>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:8}}>
                  <div className="pc2-skeleton" style={{height:16,width:"40%",border:"none"}}/>
                  <div className="pc2-skeleton" style={{height:12,width:"65%",border:"none"}}/>
                  <div style={{display:"flex",gap:6}}>
                    {[80,72,90].map((w,j)=><div key={j} className="pc2-skeleton" style={{height:24,width:w,border:"none"}}/>)}
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  <div className="pc2-skeleton" style={{height:12,width:64,border:"none"}}/>
                  <div className="pc2-skeleton" style={{height:12,width:56,border:"none"}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length===0 ? (
        <div style={{border:"4px dashed #0B1957",background:"#F8F3EA",padding:"64px 24px",textAlign:"center",animation:"pcFadeIn 0.4s ease"}}>
          <div style={{fontSize:48,marginBottom:16,opacity:0.1}}><IconFolder/></div>
          <p style={{fontWeight:900,fontSize:14,textTransform:"uppercase",color:"#0B1957",opacity:0.35,margin:0,letterSpacing:"0.15em"}}>
            {filterTab==="visible"?"Tidak ada project yang ditampilkan":filterTab==="hidden"?"Tidak ada project yang disembunyikan":"Belum ada project — klik Tambah Project!"}
          </p>
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {filtered.map((p,idx)=>(
            <ProjectCard key={p.id} p={p} index={idx}
              onToggle={()=>handleToggle(p.id)}
              onEdit={()=>openEdit(p)}
              onDelete={()=>setDeleteId(p.id)}/>
          ))}
        </div>
      )}

      {/* ── Footer legend ── */}
      {!loading&&filtered.length>0&&(
        <div style={{marginTop:16,background:"#0B1957",border:"4px solid #0B1957",boxShadow:"4px 4px 0 #9ECCFA",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",animation:"pcFadeIn 0.5s ease 0.4s both"}}>
          <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,border:"2px solid #9ECCFA",background:"#9ECCFA"}}/><span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.12em"}}>Tampil di homepage</span></div>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,border:"2px solid #9ECCFA",background:"transparent",opacity:0.5}}/><span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.12em",opacity:0.5}}>Disembunyikan</span></div>
          </div>
          <span style={{fontWeight:700,fontSize:10,color:"#D1E8FF",opacity:0.4,textTransform:"uppercase",letterSpacing:"0.1em"}}>{visibleCount}/{projects.length} aktif</span>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId!==null&&<ConfirmModal msg="Yakin hapus project ini? Aksi tidak bisa dibatalkan." onConfirm={()=>handleDelete(deleteId)} onCancel={()=>setDeleteId(null)}/>}

      {/* ── Toast ── */}
      {toast&&<Toast msg={toast.msg} ok={toast.ok} onDone={()=>setToast(null)}/>}

      {/* ══════════════════════ MODAL ══════════════════════ */}
      {modalOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(11,25,87,0.72)",zIndex:100,display:"flex",alignItems:"flex-start",justifyContent:"center",overflow:"auto",padding:"32px 16px",backdropFilter:"blur(5px)",animation:"pcOverlay 0.25s ease"}}
          onClick={e=>{if(e.target===e.currentTarget)closeModal();}}>
          <div ref={modalRef} style={{background:"#D1E8FF",border:"4px solid #0B1957",boxShadow:"14px 14px 0 #0B1957",width:"100%",maxWidth:760,flexShrink:0,animation:"pcModalIn 0.4s cubic-bezier(0.16,1,0.3,1)",margin:"auto"}}>

            {/* Modal Header */}
            <div style={{background:"#0B1957",padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <p style={{fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.3em",color:"#9ECCFA",margin:"0 0 3px",opacity:0.8}}>{editTarget?"Edit":"Tambah"} Project</p>
                <h3 style={{fontWeight:900,fontSize:20,textTransform:"uppercase",color:"#F8F3EA",margin:0,letterSpacing:"0.05em"}}>{editTarget?editTarget.title:"Project Baru"}</h3>
              </div>
              <button onClick={closeModal}
                style={{border:"3px solid #9ECCFA",background:"transparent",color:"#9ECCFA",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"transform 0.15s ease, background 0.15s ease",fontFamily:"inherit"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="rotate(90deg)";(e.currentTarget as HTMLElement).style.background="rgba(158,204,250,0.15)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.background="transparent";}}>
                <IconClose/>
              </button>
            </div>

            {/* Progress bar */}
            <div style={{height:3,background:"linear-gradient(90deg,#9ECCFA,#D1E8FF,#9ECCFA)",backgroundSize:"200% 100%",animation:"pcShimmer 2s ease infinite"}}/>

            {/* Modal Body */}
            <div style={{padding:"24px 28px",display:"flex",flexDirection:"column",gap:20,maxHeight:"72vh",overflowY:"auto"}}>

              {/* Title + Subtitle */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s both"}}>
                <Field label="Title *" err={errors.title}>
                  <input className={`pc2-input${errors.title?" err":""}`} placeholder="Nama project..." value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
                </Field>
                <Field label="Subtitle *" err={errors.subtitle}>
                  <input className={`pc2-input${errors.subtitle?" err":""}`} placeholder="Kalimat singkat..." value={form.subtitle} onChange={e=>setForm(f=>({...f,subtitle:e.target.value}))}/>
                </Field>
              </div>

              {/* Desc */}
              <div style={{animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.1s both"}}>
                <Field label="Deskripsi Singkat * — tampil di card" err={errors.desc}>
                  <input className={`pc2-input${errors.desc?" err":""}`} placeholder="Tampil di card project..." value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))}/>
                </Field>
              </div>

              {/* Long Desc */}
              <div style={{animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s both"}}>
                <Field label="Deskripsi Lengkap * — halaman detail" err={errors.long_desc}>
                  <textarea className={`pc2-input${errors.long_desc?" err":""}`} placeholder="Penjelasan panjang project..." value={form.long_desc} onChange={e=>setForm(f=>({...f,long_desc:e.target.value}))} rows={4} style={{resize:"vertical"}}/>
                </Field>
              </div>

              {/* Status / Date / Duration */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.2s both"}}>
                <Field label="Status">
                  <select className="pc2-input" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value as ProjectData["status"]}))}>
                    {STATUS_OPTS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Tanggal *" err={errors.date}>
                  <input className={`pc2-input${errors.date?" err":""}`} placeholder="Jan 2025" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
                </Field>
                <Field label="Durasi *" err={errors.duration}>
                  <input className={`pc2-input${errors.duration?" err":""}`} placeholder="3 Bulan" value={form.duration} onChange={e=>setForm(f=>({...f,duration:e.target.value}))}/>
                </Field>
              </div>

              {/* URLs */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.25s both"}}>
                <Field label="Demo URL">
                  <input className="pc2-input" placeholder="https://..." value={form.demo_url} onChange={e=>setForm(f=>({...f,demo_url:e.target.value}))}/>
                </Field>
                <Field label="GitHub URL">
                  <input className="pc2-input" placeholder="https://github.com/..." value={form.github_url} onChange={e=>setForm(f=>({...f,github_url:e.target.value}))}/>
                </Field>
              </div>

              {/* Order + Visible */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,alignItems:"center",animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.3s both"}}>
                <Field label="Order (urutan)">
                  <input className="pc2-input" type="number" value={form.order} onChange={e=>setForm(f=>({...f,order:Number(e.target.value)}))}/>
                </Field>
                <div style={{paddingTop:18}}>
                  <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:8}}>Visibility</p>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div onClick={()=>setForm(f=>({...f,visible:!f.visible}))}
                      style={{width:52,height:28,border:"4px solid #0B1957",background:form.visible?"#0B1957":"#F8F3EA",cursor:"pointer",position:"relative",transition:"background 0.2s ease",boxShadow:"3px 3px 0 #0B1957",flexShrink:0}}>
                      <div style={{position:"absolute",top:2,left:form.visible?22:2,width:16,height:16,background:form.visible?"#9ECCFA":"#0B1957",transition:"left 0.2s cubic-bezier(0.16,1,0.3,1)"}}/>
                    </div>
                    <div style={{border:"3px solid #0B1957",background:form.visible?"#0B1957":"#F8F3EA",color:form.visible?"#9ECCFA":"#0B1957",padding:"4px 12px",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",boxShadow:"2px 2px 0 #0B1957",cursor:"pointer",transition:"all 0.15s ease"}} onClick={()=>setForm(f=>({...f,visible:!f.visible}))}>
                      {form.visible?"Tampil di Homepage":"Tersembunyi"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stacks */}
              <div style={{animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.35s both"}}>
                <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:10}}>
                  Tech Stack
                  {form.tech_stack_ids.length>0&&(
                    <span style={{marginLeft:8,background:"#0B1957",color:"#9ECCFA",border:"2px solid #0B1957",fontSize:10,fontWeight:900,padding:"1px 7px"}}>{form.tech_stack_ids.length} dipilih</span>
                  )}
                </p>
                {Object.keys(stacksByCategory).length===0 ? (
                  <p style={{fontWeight:700,fontSize:12,color:"#0B1957",opacity:0.5}}>Belum ada tech stack.</p>
                ) : (
                  <div style={{background:"#F8F3EA",border:"4px solid #0B1957",padding:16,display:"flex",flexDirection:"column",gap:14,boxShadow:"4px 4px 0 #0B1957"}}>
                    {Object.entries(stacksByCategory).map(([cat,stacks])=>(
                      <div key={cat}>
                        <p style={{fontWeight:900,fontSize:10,textTransform:"uppercase",color:"#0B1957",opacity:0.45,letterSpacing:"0.15em",margin:"0 0 8px"}}>{cat}</p>
                        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                          {stacks.map(s=>(
                            <div key={s.id} className={`pc2-stack-sel${form.tech_stack_ids.includes(s.id)?" active":""}`} onClick={()=>toggleStack(s.id)}>
                              <img src={s.icon} alt={s.name} style={{width:14,height:14,objectFit:"cover"}} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}/>
                              {s.name}
                              {form.tech_stack_ids.includes(s.id)&&<IconCheck/>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Images */}
              <div style={{animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.40s both"}}>
                <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:10}}>
                  Gambar Project
                  <span style={{marginLeft:8,fontWeight:600,fontSize:10,opacity:0.4,textTransform:"none",letterSpacing:0}}>— gambar pertama jadi thumbnail</span>
                </p>
                <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
                  {form.images.map((img,idx)=>(
                    <div key={idx} className="pc2-thumb" style={{width:96,height:68}}>
                      <img src={img} alt=""/>
                      <div className="pc2-thumb-del" onClick={()=>setForm(f=>({...f,images:f.images.filter((_,i)=>i!==idx)}))}>✕</div>
                    </div>
                  ))}
                  <div className="pc2-upload" style={{opacity:uploading?0.5:1}} onClick={()=>!uploading&&fileRef.current?.click()}>
                    {uploading?<IconSpin/>:<IconImg/>}
                    <span style={{fontWeight:900,fontSize:9,textTransform:"uppercase",color:"#0B1957",letterSpacing:"0.08em"}}>{uploading?"Upload...":"+ Upload"}</span>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleUpload}/>
                </div>
              </div>

              {/* Features */}
              <div style={{animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.45s both"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                  <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",margin:0}}>Fitur-Fitur</p>
                  <button onClick={addFeature}
                    style={{display:"flex",alignItems:"center",gap:6,border:"3px solid #0B1957",background:"#0B1957",color:"#9ECCFA",padding:"5px 12px",fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:"pointer",boxShadow:"2px 2px 0 #9ECCFA",fontFamily:"inherit",transition:"transform 0.1s ease"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";}}>
                    <IconPlus/> Tambah Fitur
                  </button>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {form.features.length===0&&(
                    <div style={{border:"3px dashed #0B1957",padding:"16px",textAlign:"center",opacity:0.4}}>
                      <p style={{fontWeight:700,fontSize:12,textTransform:"uppercase",color:"#0B1957",margin:0}}>Belum ada fitur — klik Tambah Fitur</p>
                    </div>
                  )}
                  {form.features.map((f,i)=>(
                    <div key={i} className="pc2-feat">
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,background:"#0B1957",color:"#9ECCFA",fontWeight:900,fontSize:11,flexShrink:0,marginTop:4}}>#{i+1}</div>
                      <div style={{flex:1,display:"flex",flexDirection:"column",gap:8}}>
                        <input className="pc2-input" placeholder="Nama fitur..." value={f.title} onChange={e=>setFeature(i,"title",e.target.value)} style={{border:"3px solid #0B1957"}}/>
                        <input className="pc2-input" placeholder="Deskripsi fitur..." value={f.desc} onChange={e=>setFeature(i,"desc",e.target.value)} style={{border:"3px solid #0B1957"}}/>
                      </div>
                      <button onClick={()=>removeFeature(i)}
                        style={{flexShrink:0,width:32,height:32,border:"3px solid #0B1957",background:"#F8F3EA",color:"#0B1957",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"inherit",marginTop:4,transition:"all 0.1s ease"}}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#ef4444";(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="#ef4444";}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#F8F3EA";(e.currentTarget as HTMLElement).style.color="#0B1957";(e.currentTarget as HTMLElement).style.borderColor="#0B1957";}}>
                        <IconTrash/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{padding:"16px 28px",borderTop:"4px solid #0B1957",background:"#0B1957",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontWeight:700,fontSize:10,color:"#D1E8FF",opacity:0.5,textTransform:"uppercase",letterSpacing:"0.1em"}}>{editTarget?"Mode edit project":"Isi semua field wajib (*)"}</span>
              <div style={{display:"flex",gap:12}}>
                <button onClick={closeModal} disabled={saving}
                  style={{border:"4px solid #9ECCFA",background:"transparent",color:"#9ECCFA",padding:"10px 20px",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"background 0.1s ease"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(158,204,250,0.12)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";}}>
                  Batal
                </button>
                <button onClick={handleSave} disabled={saving}
                  style={{display:"flex",alignItems:"center",gap:8,border:"4px solid #9ECCFA",background:"#9ECCFA",color:"#0B1957",padding:"10px 24px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",cursor:saving?"wait":"pointer",boxShadow:"4px 4px 0 rgba(158,204,250,0.4)",fontFamily:"inherit",transition:"transform 0.1s ease, box-shadow 0.1s ease",opacity:saving?0.7:1}}
                  onMouseEnter={e=>{if(!saving){(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";(e.currentTarget as HTMLElement).style.boxShadow="6px 6px 0 rgba(158,204,250,0.4)";}}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="4px 4px 0 rgba(158,204,250,0.4)";}}>
                  {saving?<IconSpin/>:<IconSave/>}{saving?"Menyimpan...":(editTarget?"Update Project":"Simpan Project")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}