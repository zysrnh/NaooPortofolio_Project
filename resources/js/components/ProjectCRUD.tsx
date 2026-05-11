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
const IconCrop    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 2 6 8 2 8"/><polyline points="18 22 18 16 22 16"/><path d="M2 14h14V2"/><path d="M10 22H22V10"/></svg>;
const IconZoomIn  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconZoomOut = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconRefresh = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const IconExternal= () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IconFolder  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>;
const IconSpin    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{animation:"pcSpin 0.7s linear infinite"}}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>;

// ── Types ─────────────────────────────────────────────────────────────────────
interface TechStackOption { id: number; name: string; icon: string; category: string; }
interface Feature         { title: string; desc: string; }
interface SocialLink     { platform: string; url: string; }
interface Collaborator   { name: string; role: string; origin: string; socials: SocialLink[]; photo: string; }
interface ProjectData {
  title: string; subtitle: string; desc: string; long_desc: string;
  status: "Hosted" | "In Progress" | "Planning";
  date: string; duration: string; images: string[];
  tech_stack_ids: number[]; features: Feature[];
  demo_url: string; github_url: string; order: number; visible: boolean;
  work_type: "Solo" | "Collaboration";
  solo_role: string;
  collaborators: Collaborator[];
}
interface ProjectRow {
  id: number; slug: string; title: string; subtitle: string; desc: string;
  longDesc: string; status: string; date: string; duration: string;
  images: string[]; stacks: { id: number; label: string; icon: string }[];
  tech_stack_ids: number[]; features: Feature[];
  demoUrl: string | null; githubUrl: string | null;
  order: number; visible: boolean;
  workType: "Solo" | "Collaboration";
  soloRole: string;
  collaborators: Collaborator[];
}

const EMPTY_FORM: ProjectData = {
  title:"", subtitle:"", desc:"", long_desc:"",
  status:"Planning", date:"", duration:"",
  images:[], tech_stack_ids:[], features:[],
  demo_url:"", github_url:"", order:0, visible:true,
  work_type:"Solo", solo_role:"Fullstack Developer", collaborators:[],
};
const STATUS_OPTS = ["Hosted","In Progress","Planning"] as const;
const STATUS_CFG: Record<string,{bg:string;fg:string}> = {
  "Hosted":      {bg:"var(--nb-accent)", fg:"var(--nb-primary)"},
  "In Progress": {bg:"var(--nb-secondary)", fg:"var(--nb-primary)"},
  "Planning":    {bg:"var(--nb-bg)", fg:"var(--nb-primary)"},
};

const FALLBACK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3C/svg%3E";

const CROP_ASPECT_W = 16;
const CROP_ASPECT_H = 9;

function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function base64ToBlob(b64: string): Blob {
  const [header, data] = b64.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
  const binary = atob(data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type: mime });
}

const getCsrf = (): string => {
  const meta = null;
  if (meta) return "";
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
};

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
    background:linear-gradient(90deg,var(--nb-accent-light) 25%,var(--nb-accent) 50%,var(--nb-accent-light) 75%);
    background-size:200% 100%;
    animation:pcShimmer 1.5s ease infinite, pcPulse 1.5s ease infinite;
    border:3px solid var(--nb-primary);
  }

  /* ── Project card ── */
  .pc2-card {
    border:4px solid var(--nb-primary);
    background:var(--nb-bg);
    box-shadow:5px 5px 0 var(--nb-primary);
    transition:transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s cubic-bezier(0.16,1,0.3,1);
  }
  .pc2-card:hover {
    transform:translate(-3px,-3px);
    box-shadow:8px 8px 0 var(--nb-accent), 10px 10px 0 var(--nb-primary);
  }
  .pc2-card.pc2-hidden {
    opacity:0.48;
    box-shadow:3px 3px 0 var(--nb-primary);
  }
  .pc2-card.pc2-hidden:hover {
    transform:translate(-2px,-2px);
    box-shadow:5px 5px 0 var(--nb-primary);
    opacity:0.65;
  }

  /* ── Stack chip ── */
  .pc2-chip {
    display:inline-flex; align-items:center; gap:4px;
    border:2px solid var(--nb-primary); padding:3px 8px;
    background:var(--nb-accent-light); font-weight:800; font-size:10px;
    text-transform:uppercase; letter-spacing:0.06em; color:var(--nb-primary);
    transition:transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
    cursor:default;
  }
  .pc2-chip:hover { transform:translate(-1px,-1px); box-shadow:2px 2px 0 var(--nb-primary); background:var(--nb-accent); }

  /* ── Stack select chip ── */
  .pc2-stack-sel {
    display:inline-flex; align-items:center; gap:5px;
    border:2px solid var(--nb-primary); padding:4px 10px;
    background:var(--nb-bg); font-weight:800; font-size:10px;
    text-transform:uppercase; letter-spacing:0.06em; color:var(--nb-primary);
    cursor:pointer; box-shadow:2px 2px 0 var(--nb-primary);
    transition:transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  }
  .pc2-stack-sel:hover { transform:translate(-1px,-1px); box-shadow:3px 3px 0 var(--nb-primary); background:var(--nb-accent-light); }
  .pc2-stack-sel.active { background:var(--nb-primary); color:var(--nb-accent); box-shadow:2px 2px 0 var(--nb-accent); }
  .pc2-stack-sel.active:hover { transform:translate(-1px,-1px); box-shadow:3px 3px 0 var(--nb-accent); }

  /* ── Filter tab ── */
  .pc2-tab {
    flex:1; padding:11px 8px; font-weight:900; font-size:11px;
    text-transform:uppercase; letter-spacing:0.1em;
    border:none; border-right:4px solid var(--nb-primary);
    cursor:pointer; font-family:inherit;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:background 0.15s ease, color 0.15s ease;
  }
  .pc2-tab:last-child { border-right:none; }
  .pc2-tab.active  { background:var(--nb-primary); color:var(--nb-accent); }
  .pc2-tab:not(.active) { background:var(--nb-bg); color:var(--nb-primary); }
  .pc2-tab:not(.active):hover { background:var(--nb-accent-light); }

  /* ── Input ── */
  .pc2-input {
    width:100%; border:4px solid var(--nb-primary);
    padding:10px 14px; font-weight:700; font-size:13px;
    color:var(--nb-primary); background:var(--nb-bg); outline:none;
    font-family:inherit; box-sizing:border-box;
    transition:box-shadow 0.15s ease, transform 0.12s ease;
  }
  .pc2-input:focus { box-shadow:4px 4px 0 var(--nb-accent); transform:translate(-1px,-1px); }
  .pc2-input.err { border-color:#ef4444; background:var(--nb-bg); }
  .pc2-input::placeholder { color:var(--nb-primary),0.3); font-weight:600; }
  .pc2-input[type=textarea], textarea.pc2-input { resize:vertical; }

  /* ── Thumb ── */
  .pc2-thumb { position:relative; overflow:hidden; border:3px solid var(--nb-primary); box-shadow:3px 3px 0 var(--nb-primary); transition:transform 0.15s ease, box-shadow 0.15s ease; }
  .pc2-thumb:hover { transform:translate(-2px,-2px); box-shadow:5px 5px 0 var(--nb-primary); }
  .pc2-thumb img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease; }
  .pc2-thumb:hover img { transform:scale(1.08); }
  .pc2-thumb-del { position:absolute; top:3px; right:3px; width:20px; height:20px; background:var(--nb-primary); border:2px solid var(--nb-accent); color:var(--nb-accent); display:flex; align-items:center; justify-content:center; cursor:pointer; opacity:0; transition:opacity 0.15s ease; font-size:10px; }
  .pc2-thumb:hover .pc2-thumb-del { opacity:1; }

  /* ── Upload zone ── */
  .pc2-upload { width:96px; height:68px; border:3px dashed var(--nb-primary); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; gap:4px; transition:background 0.15s ease, transform 0.12s ease; }
  .pc2-upload:hover { background:var(--nb-accent-light); transform:translate(-1px,-1px); }

  /* ── Feature row ── */
  .pc2-feat { border:3px solid var(--nb-primary); padding:12px 14px; background:var(--nb-bg); box-shadow:3px 3px 0 var(--nb-primary); display:flex; gap:10px; align-items:flex-start; transition:transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease; animation:pcSlideUp 0.3s cubic-bezier(0.16,1,0.3,1); }
  .pc2-feat:hover { background:var(--nb-accent-light); transform:translate(-1px,-1px); box-shadow:4px 4px 0 var(--nb-primary); }

  /* ── Action buttons in card ── */
  .pc2-action {
    display:inline-flex; align-items:center; justify-content:center; gap:5px;
    border:3px solid var(--nb-primary); padding:5px 10px;
    font-weight:900; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;
    cursor:pointer; font-family:inherit;
    box-shadow:2px 2px 0 var(--nb-primary);
    transition:transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease, color 0.1s ease;
  }
  .pc2-action:hover:not(:disabled) { transform:translate(-1px,-1px); box-shadow:3px 3px 0 var(--nb-primary); }
  .pc2-action:disabled { opacity:0.5; cursor:not-allowed; }
`;

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, ok, onDone }: { msg:string; ok:boolean; onDone:()=>void }) {
  useEffect(()=>{ const t=setTimeout(onDone,2800); return ()=>clearTimeout(t); },[]);
  return (
    <div style={{position:"fixed",bottom:28,right:28,zIndex:999,display:"flex",alignItems:"center",gap:10,border:"4px solid var(--nb-primary)",background:ok?"var(--nb-accent)":"#ef4444",color:ok?"var(--nb-primary)":"white",padding:"12px 20px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",boxShadow:"6px 6px 0 var(--nb-primary)",maxWidth:320,animation:"pcToastIn 0.35s cubic-bezier(0.16,1,0.3,1)"}}>
      {ok?<IconCheck/>:null}{msg}
    </div>
  );
}

// ── ImageCropModal ────────────────────────────────────────────────────────────
interface CropState { scale: number; offsetX: number; offsetY: number; }

function ImageCropModal({ src, onConfirm, onCancel }: {
  src: string; onConfirm: (croppedBase64: string) => void; onCancel: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef    = useRef<HTMLImageElement | null>(null);
  const stateRef  = useRef<CropState>({ scale: 1, offsetX: 0, offsetY: 0 });
  const dragRef   = useRef<{ active: boolean; startX: number; startY: number; ox: number; oy: number }>({ active: false, startX: 0, startY: 0, ox: 0, oy: 0 });
  const rafRef    = useRef<number | null>(null);
  const CANVAS_W  = 500;
  const CANVAS_H  = Math.round(CANVAS_W * CROP_ASPECT_H / CROP_ASPECT_W);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d")!;
    const { scale, offsetX, offsetY } = stateRef.current;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "var(--nb-primary)"; ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.drawImage(img, offsetX, offsetY, img.naturalWidth * scale, img.naturalHeight * scale);
    ctx.save();
    ctx.strokeStyle = "var(--nb-accent)"; ctx.lineWidth = 3; ctx.strokeRect(2, 2, CANVAS_W - 4, CANVAS_H - 4);
    ctx.strokeStyle = "rgba(158,204,250,0.25)"; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(CANVAS_W/3,0);ctx.lineTo(CANVAS_W/3,CANVAS_H);
    ctx.moveTo(CANVAS_W*2/3,0);ctx.lineTo(CANVAS_W*2/3,CANVAS_H);
    ctx.moveTo(0,CANVAS_H/3);ctx.lineTo(CANVAS_W,CANVAS_H/3);
    ctx.moveTo(0,CANVAS_H*2/3);ctx.lineTo(CANVAS_W,CANVAS_H*2/3);
    ctx.stroke();
    const BL = 24; ctx.strokeStyle = "var(--nb-accent)"; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(2,2+BL);ctx.lineTo(2,2);ctx.lineTo(2+BL,2);
    ctx.moveTo(CANVAS_W-2-BL,2);ctx.lineTo(CANVAS_W-2,2);ctx.lineTo(CANVAS_W-2,2+BL);
    ctx.moveTo(2,CANVAS_H-2-BL);ctx.lineTo(2,CANVAS_H-2);ctx.lineTo(2+BL,CANVAS_H-2);
    ctx.moveTo(CANVAS_W-2-BL,CANVAS_H-2);ctx.lineTo(CANVAS_W-2,CANVAS_H-2);ctx.lineTo(CANVAS_W-2,CANVAS_H-2-BL);
    ctx.stroke(); ctx.restore();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const scale = Math.max(CANVAS_W/img.naturalWidth, CANVAS_H/img.naturalHeight);
      stateRef.current = { scale, offsetX:(CANVAS_W-img.naturalWidth*scale)/2, offsetY:(CANVAS_H-img.naturalHeight*scale)/2 };
      draw();
    };
    img.crossOrigin = "anonymous"; img.src = src;
  }, [src, draw]);

  const clamp = (s: CropState): CropState => {
    const img = imgRef.current; if (!img) return s;
    const drawW = img.naturalWidth*s.scale, drawH = img.naturalHeight*s.scale;
    return { scale:s.scale, offsetX:Math.max(Math.min(0,CANVAS_W-drawW),Math.min(0,s.offsetX)), offsetY:Math.max(Math.min(0,CANVAS_H-drawH),Math.min(0,s.offsetY)) };
  };
  const requestDraw = useCallback(() => { if(rafRef.current)cancelAnimationFrame(rafRef.current); rafRef.current=requestAnimationFrame(draw); }, [draw]);
  const zoom = (delta: number) => {
    const img = imgRef.current; if(!img) return;
    const minScale = Math.max(CANVAS_W/img.naturalWidth, CANVAS_H/img.naturalHeight);
    const newScale = Math.max(minScale, Math.min(5, stateRef.current.scale+delta*stateRef.current.scale));
    const ratio = newScale/stateRef.current.scale;
    stateRef.current = clamp({ scale:newScale, offsetX:CANVAS_W/2-(CANVAS_W/2-stateRef.current.offsetX)*ratio, offsetY:CANVAS_H/2-(CANVAS_H/2-stateRef.current.offsetY)*ratio });
    requestDraw();
  };

  const touchStartRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; touchStartRef.current = { x: t.clientX, y: t.clientY, ox: stateRef.current.offsetX, oy: stateRef.current.offsetY }; };
  const onTouchMove = (e: React.TouchEvent) => { if (!touchStartRef.current) return; e.preventDefault(); const t = e.touches[0]; stateRef.current = clamp({ ...stateRef.current, offsetX: touchStartRef.current.ox + t.clientX - touchStartRef.current.x, offsetY: touchStartRef.current.oy + t.clientY - touchStartRef.current.y }); requestDraw(); };
  const onTouchEnd = () => { touchStartRef.current = null; };

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); dragRef.current={active:true,startX:e.clientX,startY:e.clientY,ox:stateRef.current.offsetX,oy:stateRef.current.offsetY}; };
  const onMouseMove = useCallback((e: MouseEvent) => { const d=dragRef.current; if(!d.active)return; stateRef.current=clamp({...stateRef.current,offsetX:d.ox+e.clientX-d.startX,offsetY:d.oy+e.clientY-d.startY}); requestDraw(); }, [requestDraw]);
  const onMouseUp = useCallback(() => { dragRef.current.active=false; }, []);
  useEffect(() => { window.addEventListener("mousemove",onMouseMove); window.addEventListener("mouseup",onMouseUp); return()=>{window.removeEventListener("mousemove",onMouseMove);window.removeEventListener("mouseup",onMouseUp);}; }, [onMouseMove,onMouseUp]);

  const handleConfirm = () => {
    const img = imgRef.current; if(!img) return;
    const ec = document.createElement("canvas"); ec.width=CANVAS_W*2; ec.height=CANVAS_H*2;
    ec.getContext("2d")!.drawImage(img, stateRef.current.offsetX*2, stateRef.current.offsetY*2, img.naturalWidth*stateRef.current.scale*2, img.naturalHeight*stateRef.current.scale*2);
    onConfirm(ec.toDataURL("image/jpeg",0.92));
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(11,25,87,0.85)",backdropFilter:"blur(6px)",padding:16}}>
      <div style={{background:"var(--nb-primary)",border:"4px solid var(--nb-accent)",boxShadow:"16px 16px 0 var(--nb-accent)",width:"100%",maxWidth:540,display:"flex",flexDirection:"column"}}>
        <div style={{borderBottom:"4px solid var(--nb-accent)",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,color:"var(--nb-accent)"}}><IconCrop /><span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.15em"}}>Crop Foto Project</span></div>
          <button style={{color:"var(--nb-accent)",background:"transparent",border:"none",cursor:"pointer"}} onClick={onCancel}><IconClose /></button>
        </div>
        <div style={{position:"relative",display:"flex",justifyContent:"center",background:"var(--nb-primary)",borderBottom:"4px solid var(--nb-accent)",overflow:"hidden"}}>
          <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} style={{display:"block",cursor:"grab",width:"100%",maxWidth:CANVAS_W,userSelect:"none",touchAction:"none"}} onMouseDown={onMouseDown} onWheel={e=>{e.preventDefault();zoom(e.deltaY<0?0.07:-0.07);}} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} />
        </div>
        <div style={{padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"4px solid var(--nb-accent)"}}>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>zoom(-0.15)} style={{border:"2px solid var(--nb-accent)",background:"transparent",color:"var(--nb-accent)",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><IconZoomOut /></button>
            <button onClick={()=>zoom(0.15)}  style={{border:"2px solid var(--nb-accent)",background:"transparent",color:"var(--nb-accent)",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><IconZoomIn /></button>
          </div>
          <button onClick={()=>{const img=imgRef.current;if(!img)return;const sc=Math.max(CANVAS_W/img.naturalWidth,CANVAS_H/img.naturalHeight);stateRef.current={scale:sc,offsetX:(CANVAS_W-img.naturalWidth*sc)/2,offsetY:(CANVAS_H-img.naturalWidth*sc)/2};requestDraw();}} style={{display:"flex",alignItems:"center",gap:6,border:"2px solid var(--nb-accent)",background:"transparent",color:"var(--nb-accent)",padding:"6px 12px",fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:"pointer"}}><IconRefresh /> Reset</button>
        </div>
        <div style={{padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--nb-primary)"}}>
          <button onClick={onCancel} style={{border:"4px solid var(--nb-accent)",background:"transparent",color:"var(--nb-accent)",padding:"10px 20px",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:"pointer"}}>Batal</button>
          <button onClick={handleConfirm} style={{display:"flex",alignItems:"center",gap:8,border:"4px solid var(--nb-accent)",background:"var(--nb-accent)",color:"var(--nb-primary)",padding:"10px 24px",fontWeight:900,fontSize:13,textTransform:"uppercase",cursor:"pointer"}}><IconCheck /> Selesai Crop</button>
        </div>
      </div>
    </div>
  );
}

// ── CollaboratorModal ────────────────────────────────────────────────────────
function CollaboratorModal({ item, index, onSave, onCancel, onUpload }: {
  item: Collaborator | null; index: number | null;
  onSave: (c: Collaborator) => void; onCancel: () => void; onUpload: () => void;
}) {
  const [form, setForm] = useState<Collaborator>(item ?? { name: "", role: "", origin: "", socials: [], photo: "" });
  const [newLink, setNewLink] = useState<SocialLink>({ platform: "instagram", url: "" });

  const addSocial = () => {
    if(!newLink.url) return;
    setForm(f => ({...f, socials: [...f.socials, newLink]}));
    setNewLink({ platform: "instagram", url: "" });
  };

  const removeSocial = (idx: number) => {
    setForm(f => ({...f, socials: f.socials.filter((_,i) => i !== idx)}));
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(11,25,87,0.8)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",animation:"pcOverlay 0.2s ease"}}>
      <div style={{background:"var(--nb-bg)",border:"4px solid var(--nb-primary)",boxShadow:"12px 12px 0 var(--nb-primary)",width:"100%",maxWidth:450,maxHeight:"90vh",overflowY:"auto",animation:"pcModalIn 0.3s cubic-bezier(0.16,1,0.3,1)"}}>
        <div style={{background:"var(--nb-primary)",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
          <span style={{fontWeight:900,fontSize:11,textTransform:"uppercase",color:"var(--nb-accent)",letterSpacing:"0.1em"}}>{index!==null?"Edit Kolaborator":"Tambah Kolaborator"}</span>
          <button onClick={onCancel} style={{background:"transparent",border:"none",color:"var(--nb-accent)",cursor:"pointer"}}><IconClose/></button>
        </div>
        <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
            <div style={{position:"relative",width:80,height:80,border:"3px solid var(--nb-primary)",boxShadow:"4px 4px 0 var(--nb-primary)",background:"var(--nb-accent-light)"}}>
              {form.photo ? <img src={form.photo} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",fontSize:24}}>👤</div>}
              <button onClick={onUpload} style={{position:"absolute",bottom:-8,right:-8,width:28,height:28,background:"var(--nb-primary)",color:"var(--nb-accent)",border:"2px solid var(--nb-accent)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><IconImg/></button>
            </div>
          </div>
          <Field label="Nama Kolaborator">
            <input className="pc2-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Contoh: Andi Wijaya"/>
          </Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Field label="Peran / Role">
              <input className="pc2-input" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} placeholder="Contoh: UI Designer"/>
            </Field>
            <Field label="Asal / Instansi">
              <input className="pc2-input" value={form.origin} onChange={e=>setForm(f=>({...f,origin:e.target.value}))} placeholder="Contoh: UGM"/>
            </Field>
          </div>

          <div className="border-4 border-[var(--nb-primary)] p-5 bg-white shadow-[6px_6px_0_var(--nb-primary)]">
            <p className="font-black text-[10px] uppercase text-[var(--nb-primary)] mb-4 opacity-50 tracking-[0.2em]">Added Social Links</p>
            <div className="space-y-2 mb-6">
              {form.socials.length > 0 ? (
                form.socials.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 border-2 border-[var(--nb-primary)] p-2 bg-[var(--nb-bg)] group">
                    <div className="w-6 h-6 bg-[var(--nb-primary)] text-[var(--nb-accent)] flex items-center justify-center text-[10px] font-black uppercase">
                       {s.platform.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="font-black text-[10px] uppercase text-[var(--nb-primary)] leading-none mb-0.5">{s.platform}</p>
                       <p className="font-bold text-[9px] text-[var(--nb-primary)] opacity-40 truncate">{s.url}</p>
                    </div>
                    <button onClick={() => removeSocial(i)} className="text-[#e53e3e] hover:scale-125 transition-transform font-black px-2 text-sm">✕</button>
                  </div>
                ))
              ) : (
                <div className="py-4 border-2 border-dashed border-[var(--nb-primary)]/10 text-center">
                   <p className="text-[9px] font-black uppercase text-[var(--nb-primary)] opacity-20 tracking-widest">No links added yet</p>
                </div>
              )}
            </div>

            <p className="font-black text-[10px] uppercase text-[var(--nb-primary)] mb-2 opacity-50 tracking-[0.2em]">Add New Link</p>
            <div className="flex gap-2">
              <select className="pc2-input !w-28 !py-2 !text-[10px] !font-black uppercase" value={newLink.platform} onChange={e=>setNewLink(l=>({...l,platform:e.target.value}))}>
                <option value="instagram">Instagram</option>
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="web">Website</option>
              </select>
              <input className="pc2-input !flex-1 !py-2 !text-[10px] !font-bold" value={newLink.url} onChange={e=>setNewLink(l=>({...l,url:e.target.value}))} placeholder="Paste URL here..."/>
              <button onClick={addSocial} className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-2 border-[var(--nb-primary)] px-4 font-black hover:bg-[var(--nb-accent)] hover:text-[var(--nb-primary)] transition-all shadow-[3px_3px_0_var(--nb-primary)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">+</button>
            </div>
          </div>
        </div>
        <div style={{padding:"14px 20px",borderTop:"4px solid var(--nb-primary)",display:"flex",gap:10,position:"sticky",bottom:0,background:"var(--nb-bg)"}}>
          <button onClick={onCancel}
            style={{flex:1,border:"3px solid var(--nb-primary)",background:"transparent",color:"var(--nb-primary)",padding:10,fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:"pointer",transition:"background 0.15s ease"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--nb-accent-light)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";}}>
            Batal
          </button>
          <button onClick={()=>onSave(form)} disabled={!form.name||!form.role}
            style={{flex:1,border:"3px solid var(--nb-primary)",background:"var(--nb-primary)",color:"var(--nb-accent)",padding:10,fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:"pointer",opacity:(!form.name||!form.role)?0.5:1,transition:"transform 0.1s ease"}}
            onMouseEnter={e=>{if(form.name&&form.role)(e.currentTarget as HTMLElement).style.transform="scale(1.02)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";}}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ConfirmModal ──────────────────────────────────────────────────────────────
function ConfirmModal({ msg, onConfirm, onCancel }: { msg:string; onConfirm:()=>void; onCancel:()=>void }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(11,25,87,0.72)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(5px)",animation:"pcOverlay 0.2s ease"}}>
      <div style={{background:"var(--nb-bg)",border:"4px solid var(--nb-primary)",boxShadow:"12px 12px 0 var(--nb-primary)",padding:32,maxWidth:380,width:"90%",animation:"pcModalIn 0.35s cubic-bezier(0.16,1,0.3,1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <div style={{width:40,height:40,background:"#ef4444",border:"3px solid var(--nb-primary)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <IconTrash/>
          </div>
          <p style={{fontWeight:900,fontSize:13,textTransform:"uppercase",color:"var(--nb-primary)",lineHeight:1.5,margin:0}}>{msg}</p>
        </div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={onConfirm}
            style={{flex:1,border:"4px solid var(--nb-primary)",background:"#ef4444",color:"white",padding:"10px",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:"pointer",boxShadow:"4px 4px 0 var(--nb-primary)",fontFamily:"inherit",transition:"transform 0.1s ease"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";}}>
            Ya, Hapus
          </button>
          <button onClick={onCancel}
            style={{flex:1,border:"4px solid var(--nb-primary)",background:"var(--nb-bg)",color:"var(--nb-primary)",padding:"10px",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:"pointer",boxShadow:"4px 4px 0 var(--nb-primary)",fontFamily:"inherit",transition:"transform 0.1s ease, background 0.1s ease"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--nb-accent-light)";(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="var(--nb-bg)";(e.currentTarget as HTMLElement).style.transform="";}}>
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
          <div style={{width:220,height:140,flexShrink:0,border:"3px solid var(--nb-primary)",background:"var(--nb-accent-light)",boxShadow:"3px 3px 0 var(--nb-primary)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:40,opacity:0.15}}>🗂</span>
          </div>
        )}

        {/* ── Info + Actions ── */}
        <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:0,minHeight:140}}>
          {/* Title row */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
            <span style={{fontWeight:900,fontSize:15,textTransform:"uppercase",color:"var(--nb-primary)",letterSpacing:"0.05em"}}>{p.title}</span>
            <span style={{border:"2px solid var(--nb-primary)",background:sc.bg,color:sc.fg,padding:"2px 9px",fontSize:10,fontWeight:900,textTransform:"uppercase",letterSpacing:"0.08em",transition:"transform 0.12s ease"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";}}>
              {p.status}
            </span>
            {!p.visible&&(
              <span style={{border:"2px solid var(--nb-primary)",background:"var(--nb-bg)",color:"var(--nb-primary)",padding:"2px 9px",fontSize:10,fontWeight:900,textTransform:"uppercase",opacity:0.45}}>Hidden</span>
            )}
          </div>

          {/* Subtitle */}
          {p.subtitle&&(
            <p style={{fontWeight:700,fontSize:11,color:"var(--nb-primary)",opacity:0.5,textTransform:"uppercase",letterSpacing:"0.06em",margin:"0 0 4px"}}>{p.subtitle}</p>
          )}

          {/* Date + Duration + Work Type */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <p style={{fontWeight:800,fontSize:11,color:"var(--nb-primary)",opacity:0.4,textTransform:"uppercase",letterSpacing:"0.08em",margin:0}}>{p.date}{p.duration&&` · ${p.duration}`}</p>
            <span style={{width:4,height:4,background:"var(--nb-primary)",opacity:0.2,borderRadius:"50%"}}/>
            <span style={{fontWeight:900,fontSize:10,color:p.workType==="Solo"?"var(--nb-primary)":"var(--nb-accent)",background:p.workType==="Solo"?"transparent":"var(--nb-primary)",border:p.workType==="Solo"?"2px solid var(--nb-primary)":"none",padding:"1px 6px",textTransform:"uppercase",letterSpacing:"0.05em"}}>
              {p.workType==="Solo" ? p.soloRole || "Solo" : `${p.collaborators?.length || 0} Kolaborator`}
            </span>
          </div>

          {/* Desc */}
          <p style={{fontWeight:600,fontSize:12,color:"var(--nb-primary)",opacity:0.65,lineHeight:1.55,marginBottom:10,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden",flex:1}}>{p.desc}</p>

          {/* Stack chips */}
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
            {p.stacks?.slice(0,6).map((s,si)=>(
              <div key={si} className="pc2-chip">
                <img src={s.icon} alt={s.label} style={{width:14,height:14,objectFit:"cover"}} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}/>
                {s.label}
              </div>
            ))}
            {p.stacks?.length>6&&(<div style={{border:"2px solid var(--nb-primary)",padding:"3px 8px",background:"var(--nb-primary)",color:"var(--nb-accent)",fontWeight:900,fontSize:10,textTransform:"uppercase"}}>+{p.stacks.length-6}</div>)}
          </div>

          {/* Actions */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",borderTop:"3px solid var(--nb-primary)",paddingTop:12,marginTop:"auto"}}>
            <button className="pc2-action" onClick={onToggle}
              style={{background:p.visible?"var(--nb-bg)":"var(--nb-primary)",color:p.visible?"var(--nb-primary)":"var(--nb-accent)"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";(e.currentTarget as HTMLElement).style.boxShadow="3px 3px 0 var(--nb-primary)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="2px 2px 0 var(--nb-primary)";}}>
              {p.visible?<><IconEye/><span>Tampil</span></>:<><IconEyeOff/><span>Hidden</span></>}
            </button>
            {p.demoUrl&&(
              <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="pc2-action"
                style={{background:"var(--nb-accent-light)",color:"var(--nb-primary)",textDecoration:"none"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";(e.currentTarget as HTMLElement).style.boxShadow="3px 3px 0 var(--nb-primary)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="2px 2px 0 var(--nb-primary)";}}>
                <IconExternal/><span>Demo</span>
              </a>
            )}
            <div style={{flex:1}}/>
            <button className="pc2-action" onClick={onEdit}
              style={{background:"var(--nb-bg)",color:"var(--nb-primary)"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--nb-primary)";(e.currentTarget as HTMLElement).style.color="var(--nb-accent)";(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";(e.currentTarget as HTMLElement).style.boxShadow="3px 3px 0 var(--nb-primary)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="var(--nb-bg)";(e.currentTarget as HTMLElement).style.color="var(--nb-primary)";(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="2px 2px 0 var(--nb-primary)";}}>
              <IconEdit/><span>Edit</span>
            </button>
            <button className="pc2-action" onClick={onDelete}
              style={{background:"var(--nb-bg)",color:"var(--nb-primary)"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#ef4444";(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="#ef4444";(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="var(--nb-bg)";(e.currentTarget as HTMLElement).style.color="var(--nb-primary)";(e.currentTarget as HTMLElement).style.borderColor="var(--nb-primary)";(e.currentTarget as HTMLElement).style.transform="";}}>
              <IconTrash/><span>Hapus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Input helper (Moved outside to prevent focus loss) ──
const Field = ({label,err,children}:{label:string;err?:string;children:React.ReactNode}) => (
  <div style={{display:"flex",flexDirection:"column",gap:4}}>
    <label style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--nb-primary)"}}>{label}</label>
    {children}
    {err&&<span style={{fontSize:11,fontWeight:800,color:"#e53e3e",textTransform:"uppercase",letterSpacing:"0.05em"}}>↑ {err}</span>}
  </div>
);

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
  const [cropSrc,    setCropSrc]    = useState<string|null>(null);
  const [cropTarget, setCropTarget] = useState<"project"|"collab">("project");
  const [collabModal, setCollabModal] = useState<{ open: boolean; index: number | null; item: Collaborator | null }>({ open: false, index: null, item: null });
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
    setForm({
      title:p.title, subtitle:p.subtitle, desc:p.desc, long_desc:p.longDesc,
      status:p.status as ProjectData["status"], date:p.date, duration:p.duration,
      images:p.images??[], tech_stack_ids:p.tech_stack_ids??[], features:p.features??[],
      demo_url:p.demoUrl??"", github_url:p.githubUrl??"", order:p.order, visible:p.visible,
      work_type:p.workType as any, solo_role:p.soloRole, collaborators:p.collaborators??[],
    });
    setErrors({}); setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const triggerUpload = (target:"project"|"collab") => {
    setCropTarget(target);
    setTimeout(() => fileRef.current?.click(), 10);
  };

  const handleUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if(!file) return;
    if(!file.type.startsWith("image/")){showToast("File harus gambar!",false);return;}
    setCropSrc(await toBase64(file));
  };

  const handleCropConfirm = async (b64:string) => {
    setCropSrc(null);
    setUploading(true);
    const blob = base64ToBlob(b64);
    const fd = new FormData(); fd.append("image", blob, "upload.jpg");
    try {
      const r = await fetch("/api/admin/projects/upload-image",{method:"POST",headers:{"X-XSRF-TOKEN":getCsrf()},body:fd});
      const d = await r.json();
      if(d.url){
        if(cropTarget==="project") setForm(f=>({...f,images:[...f.images,d.url]}));
        else if(collabModal.open) setCollabModal(prev=>({...prev, item: prev.item ? {...prev.item, photo: d.url} : {name:"", role:"", origin:"", social:"", photo:d.url}}));
        showToast("Gambar diupload!");
      }
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
      const r = await fetch(url,{method:isEdit?"PUT":"POST",headers:{"Content-Type":"application/json","Accept":"application/json","X-XSRF-TOKEN":getCsrf()},body:JSON.stringify({...form,demo_url:form.demo_url||null,github_url:form.github_url||null})});
      if(!r.ok){const d=await r.json();if(d.errors)setErrors(Object.fromEntries(Object.entries(d.errors).map(([k,v])=>[k,(v as string[])[0]])));else showToast(d.message||"Gagal menyimpan",false);return;}
      showToast(isEdit?"Project diupdate!":"Project ditambah!");
      closeModal(); fetchAll();
    } catch { showToast("Terjadi kesalahan",false); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id:number) => {
    try {
      const r = await fetch(`/api/admin/projects/${id}`, {
        method:"DELETE",
        headers:{"X-XSRF-TOKEN":getCsrf(), "Accept":"application/json"}
      });
      if (!r.ok) {
        const d = await r.json();
        throw new Error(d.message || "Gagal hapus");
      }
      showToast("Project dihapus!");
      fetchAll();
    }
    catch (err: any) { showToast(err.message || "Gagal hapus", false); }
    finally { setDeleteId(null); }
  };

  const handleToggle = async (id:number) => {
    try {
      const r = await fetch(`/api/admin/projects/${id}/toggle`,{method:"PATCH",headers:{"X-XSRF-TOKEN":getCsrf()}});
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

  return (
    <>
      <style>{STYLES}</style>

      {/* ── Page Header ── */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24,gap:16,flexWrap:"wrap",opacity:headerIn?1:0,transform:headerIn?"translateY(0)":"translateY(-18px)",transition:"opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)"}}>
        <div>
          <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.3em",color:"var(--nb-accent)",margin:"0 0 4px",opacity:headerIn?1:0,transform:headerIn?"translateX(0)":"translateX(-12px)",transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s"}}>Kelola</p>
          <h2 style={{fontWeight:900,fontSize:26,textTransform:"uppercase",color:"var(--nb-primary)",margin:"0 0 6px",opacity:headerIn?1:0,transform:headerIn?"translateX(0)":"translateX(-12px)",transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s"}}>Projects</h2>
          <p style={{fontWeight:600,fontSize:12,color:"var(--nb-primary)",opacity:0.5,margin:0}}>{loading?"Memuat data...":projects.length+" project tersimpan"}</p>
        </div>
        <button onClick={openAdd}
          style={{display:"flex",alignItems:"center",gap:8,border:"4px solid var(--nb-primary)",background:"var(--nb-primary)",color:"var(--nb-accent)",padding:"10px 20px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer",boxShadow:"4px 4px 0 var(--nb-accent)",fontFamily:"inherit",opacity:headerIn?1:0,transform:headerIn?"translateX(0)":"translateX(16px)",transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, box-shadow 0.1s ease"}}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";(e.currentTarget as HTMLElement).style.boxShadow="6px 6px 0 var(--nb-accent)";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="4px 4px 0 var(--nb-accent)";}}>
          <IconPlus/> Tambah Project
        </button>
      </div>

      {/* ── Stats ── */}
      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",animation:"pcSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.15s both"}}>
        {[
          {n:projects.length,label:"Total",   bg:"var(--nb-primary)",fg:"var(--nb-accent)"},
          {n:visibleCount,   label:"Tampil",  bg:"var(--nb-accent)",fg:"var(--nb-primary)"},
          {n:hiddenCount,    label:"Hidden",  bg:"var(--nb-bg)",fg:"var(--nb-primary)"},
          {n:projects.filter(p=>p.status==="Hosted").length,      label:"Hosted",      bg:"var(--nb-accent-light)",fg:"var(--nb-primary)"},
          {n:projects.filter(p=>p.status==="In Progress").length, label:"In Progress", bg:"var(--nb-secondary)",fg:"var(--nb-primary)"},
        ].map((c,i)=>(
          <div key={i} style={{border:"4px solid var(--nb-primary)",background:c.bg,color:c.fg,display:"flex",alignItems:"center",gap:6,padding:"6px 14px",boxShadow:"3px 3px 0 var(--nb-primary)",animation:`pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${0.15+i*0.06}s both`}}>
            <span style={{fontWeight:900,fontSize:22,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{loading?"—":c.n}</span>
            <span style={{fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",opacity:0.75}}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ── */}
      {!loading&&projects.length>0&&(
        <div style={{display:"flex",border:"4px solid var(--nb-primary)",marginBottom:16,overflow:"hidden",boxShadow:"4px 4px 0 var(--nb-primary)",animation:"pcSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.3s both"}}>
          {([["all","Semua",projects.length],["visible","Tampil",visibleCount],["hidden","Hidden",hiddenCount]] as const).map(([key,label,count])=>(
            <button key={key} onClick={()=>setFilterTab(key as any)} className={`pc2-tab${filterTab===key?" active":""}`}>
              {label}
              <span style={{background:filterTab===key?"rgba(158,204,250,0.2)":"var(--nb-accent-light)",color:filterTab===key?"var(--nb-accent)":"var(--nb-primary)",border:`2px solid ${filterTab===key?"var(--nb-accent)":"var(--nb-primary)"}`,fontSize:10,fontWeight:900,padding:"1px 7px",minWidth:22,textAlign:"center",transition:"all 0.15s ease"}}>{count}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── List ── */}
      {loading ? (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[0,1,2].map(i=>(
            <div key={i} style={{border:"4px solid var(--nb-primary)",background:"var(--nb-bg)",boxShadow:"5px 5px 0 var(--nb-primary)",padding:"18px 22px",animation:`pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.09}s both`}}>
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
        <div style={{border:"4px dashed var(--nb-primary)",background:"var(--nb-bg)",padding:"64px 24px",textAlign:"center",animation:"pcFadeIn 0.4s ease"}}>
          <div style={{fontSize:48,marginBottom:16,opacity:0.1}}><IconFolder/></div>
          <p style={{fontWeight:900,fontSize:14,textTransform:"uppercase",color:"var(--nb-primary)",opacity:0.35,margin:0,letterSpacing:"0.15em"}}>
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
        <div style={{marginTop:16,background:"var(--nb-primary)",border:"4px solid var(--nb-primary)",boxShadow:"4px 4px 0 var(--nb-accent)",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",animation:"pcFadeIn 0.5s ease 0.4s both"}}>
          <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,border:"2px solid var(--nb-accent)",background:"var(--nb-accent)"}}/><span style={{fontWeight:900,fontSize:10,color:"var(--nb-accent)",textTransform:"uppercase",letterSpacing:"0.12em"}}>Tampil di homepage</span></div>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,border:"2px solid var(--nb-accent)",background:"transparent",opacity:0.5}}/><span style={{fontWeight:900,fontSize:10,color:"var(--nb-accent)",textTransform:"uppercase",letterSpacing:"0.12em",opacity:0.5}}>Disembunyikan</span></div>
          </div>
          <span style={{fontWeight:700,fontSize:10,color:"var(--nb-accent-light)",opacity:0.4,textTransform:"uppercase",letterSpacing:"0.1em"}}>{visibleCount}/{projects.length} aktif</span>
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
          <div ref={modalRef} style={{background:"var(--nb-accent-light)",border:"4px solid var(--nb-primary)",boxShadow:"14px 14px 0 var(--nb-primary)",width:"100%",maxWidth:760,flexShrink:0,animation:"pcModalIn 0.4s cubic-bezier(0.16,1,0.3,1)",margin:"auto"}}>

            {/* Modal Header */}
            <div style={{background:"var(--nb-primary)",padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <p style={{fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.3em",color:"var(--nb-accent)",margin:"0 0 3px",opacity:0.8}}>{editTarget?"Edit":"Tambah"} Project</p>
                <h3 style={{fontWeight:900,fontSize:20,textTransform:"uppercase",color:"var(--nb-bg)",margin:0,letterSpacing:"0.05em"}}>{editTarget?editTarget.title:"Project Baru"}</h3>
              </div>
              <button onClick={closeModal}
                style={{border:"3px solid var(--nb-accent)",background:"transparent",color:"var(--nb-accent)",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"transform 0.15s ease, background 0.15s ease",fontFamily:"inherit"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="rotate(90deg)";(e.currentTarget as HTMLElement).style.background="rgba(158,204,250,0.15)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.background="transparent";}}>
                <IconClose/>
              </button>
            </div>

            {/* Progress bar */}
            <div style={{height:3,background:"linear-gradient(90deg,var(--nb-accent),var(--nb-accent-light),var(--nb-accent))",backgroundSize:"200% 100%",animation:"pcShimmer 2s ease infinite"}}/>

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

              {/* Collaboration Section */}
              <div style={{background:"var(--nb-bg)",border:"4px solid var(--nb-primary)",padding:20,boxShadow:"6px 6px 0 var(--nb-primary)",animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.28s both",display:"flex",flexDirection:"column",gap:16}}>
                <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.15em",color:"var(--nb-primary)",margin:0}}>Tipe Pengerjaan</p>
                <div style={{display:"flex",gap:10}}>
                  {["Solo","Collaboration"].map(t=>(
                    <button key={t} onClick={()=>setForm(f=>({...f,work_type:t as any}))}
                      style={{flex:1,padding:"10px",border:"3px solid var(--nb-primary)",background:form.work_type===t?"var(--nb-primary)":"white",color:form.work_type===t?"var(--nb-accent)":"var(--nb-primary)",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:"pointer",transition:"all 0.15s ease"}}>
                      {t==="Solo"?"Pengerjaan Mandiri":"Kolaborasi Tim"}
                    </button>
                  ))}
                </div>

                {form.work_type==="Solo" ? (
                  <div style={{animation:"pcSlideUp 0.3s ease"}}>
                    <Field label="Peran Anda (Solo Role)">
                      <input className="pc2-input" placeholder="Contoh: Fullstack Developer" value={form.solo_role} onChange={e=>setForm(f=>({...f,solo_role:e.target.value}))}/>
                    </Field>
                  </div>
                ) : (
                  <div style={{animation:"pcSlideUp 0.3s ease",display:"flex",flexDirection:"column",gap:12}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <p style={{fontWeight:900,fontSize:10,textTransform:"uppercase",color:"var(--nb-primary)",opacity:0.6,margin:0}}>Daftar Kolaborator</p>
                      <button onClick={()=>setCollabModal({open:true,index:null,item:null})}
                        style={{border:"2px solid var(--nb-primary)",background:"var(--nb-primary)",color:"var(--nb-accent)",padding:"4px 10px",fontWeight:900,fontSize:10,textTransform:"uppercase",cursor:"pointer"}}>+ Tambah</button>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {form.collaborators.length===0 ? (
                        <p style={{fontSize:11,fontWeight:700,opacity:0.4,textAlign:"center",padding:"10px",border:"2px dashed var(--nb-primary)"}}>Belum ada kolaborator</p>
                      ) : form.collaborators.map((c,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:"white",border:"2px solid var(--nb-primary)",padding:8}}>
                          <div style={{width:32,height:32,border:"2px solid var(--nb-primary)",background:"var(--nb-accent-light)",flexShrink:0}}>
                            {c.photo ? <img src={c.photo} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",fontSize:14}}>👤</div>}
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <p style={{fontWeight:900,fontSize:11,color:"var(--nb-primary)",margin:0}}>{c.name}</p>
                            <p style={{fontWeight:700,fontSize:9,color:"var(--nb-primary)",opacity:0.5,margin:0}}>{c.role}</p>
                          </div>
                          <div style={{display:"flex",gap:4}}>
                            <button onClick={()=>setCollabModal({open:true,index:i,item:c})} style={{width:24,height:24,border:"2px solid var(--nb-primary)",background:"var(--nb-accent-light)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><IconEdit/></button>
                            <button onClick={()=>setForm(f=>({...f,collaborators:f.collaborators.filter((_,j)=>j!==i)}))} style={{width:24,height:24,border:"2px solid var(--nb-primary)",background:"#ef4444",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Order + Visible */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,alignItems:"center",animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.3s both"}}>
                <Field label="Order (urutan)">
                  <input className="pc2-input" type="number" value={form.order} onChange={e=>setForm(f=>({...f,order:Number(e.target.value)}))}/>
                </Field>
                <div style={{paddingTop:18}}>
                  <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--nb-primary)",marginBottom:8}}>Visibility</p>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div onClick={()=>setForm(f=>({...f,visible:!f.visible}))}
                      style={{width:52,height:28,border:"4px solid var(--nb-primary)",background:form.visible?"var(--nb-primary)":"var(--nb-bg)",cursor:"pointer",position:"relative",transition:"background 0.2s ease",boxShadow:"3px 3px 0 var(--nb-primary)",flexShrink:0}}>
                      <div style={{position:"absolute",top:2,left:form.visible?22:2,width:16,height:16,background:form.visible?"var(--nb-accent)":"var(--nb-primary)",transition:"left 0.2s cubic-bezier(0.16,1,0.3,1)"}}/>
                    </div>
                    <div style={{border:"3px solid var(--nb-primary)",background:form.visible?"var(--nb-primary)":"var(--nb-bg)",color:form.visible?"var(--nb-accent)":"var(--nb-primary)",padding:"4px 12px",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",boxShadow:"2px 2px 0 var(--nb-primary)",cursor:"pointer",transition:"all 0.15s ease"}} onClick={()=>setForm(f=>({...f,visible:!f.visible}))}>
                      {form.visible?"Tampil di Homepage":"Tersembunyi"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stacks */}
              <div style={{animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.35s both"}}>
                <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--nb-primary)",marginBottom:10}}>
                  Tech Stack
                  {form.tech_stack_ids.length>0&&(
                    <span style={{marginLeft:8,background:"var(--nb-primary)",color:"var(--nb-accent)",border:"2px solid var(--nb-primary)",fontSize:10,fontWeight:900,padding:"1px 7px"}}>{form.tech_stack_ids.length} dipilih</span>
                  )}
                </p>
                {Object.keys(stacksByCategory).length===0 ? (
                  <p style={{fontWeight:700,fontSize:12,color:"var(--nb-primary)",opacity:0.5}}>Belum ada tech stack.</p>
                ) : (
                  <div style={{background:"var(--nb-bg)",border:"4px solid var(--nb-primary)",padding:16,display:"flex",flexDirection:"column",gap:14,boxShadow:"4px 4px 0 var(--nb-primary)"}}>
                    {Object.entries(stacksByCategory).map(([cat,stacks])=>(
                      <div key={cat}>
                        <p style={{fontWeight:900,fontSize:10,textTransform:"uppercase",color:"var(--nb-primary)",opacity:0.45,letterSpacing:"0.15em",margin:"0 0 8px"}}>{cat}</p>
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
                <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--nb-primary)",marginBottom:10}}>
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
                  <div className="pc2-upload" style={{opacity:uploading?0.5:1}} onClick={()=>!uploading&&triggerUpload("project")}>
                    {uploading?<IconSpin/>:<IconImg/>}
                    <span style={{fontWeight:900,fontSize:9,textTransform:"uppercase",color:"var(--nb-primary)",letterSpacing:"0.08em"}}>{uploading?"Upload...":"+ Upload"}</span>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleUpload}/>
                </div>
              </div>

              {/* Features */}
              <div style={{animation:"pcSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.45s both"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                  <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--nb-primary)",margin:0}}>Fitur-Fitur</p>
                  <button onClick={addFeature}
                    style={{display:"flex",alignItems:"center",gap:6,border:"3px solid var(--nb-primary)",background:"var(--nb-primary)",color:"var(--nb-accent)",padding:"5px 12px",fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:"pointer",boxShadow:"2px 2px 0 var(--nb-accent)",fontFamily:"inherit",transition:"transform 0.1s ease"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-1px,-1px)";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";}}>
                    <IconPlus/> Tambah Fitur
                  </button>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {form.features.length===0&&(
                    <div style={{border:"3px dashed var(--nb-primary)",padding:"16px",textAlign:"center",opacity:0.4}}>
                      <p style={{fontWeight:700,fontSize:12,textTransform:"uppercase",color:"var(--nb-primary)",margin:0}}>Belum ada fitur — klik Tambah Fitur</p>
                    </div>
                  )}
                  {form.features.map((f,i)=>(
                    <div key={i} className="pc2-feat">
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,background:"var(--nb-primary)",color:"var(--nb-accent)",fontWeight:900,fontSize:11,flexShrink:0,marginTop:4}}>#{i+1}</div>
                      <div style={{flex:1,display:"flex",flexDirection:"column",gap:8}}>
                        <input className="pc2-input" placeholder="Nama fitur..." value={f.title} onChange={e=>setFeature(i,"title",e.target.value)} style={{border:"3px solid var(--nb-primary)"}}/>
                        <input className="pc2-input" placeholder="Deskripsi fitur..." value={f.desc} onChange={e=>setFeature(i,"desc",e.target.value)} style={{border:"3px solid var(--nb-primary)"}}/>
                      </div>
                      <button onClick={()=>removeFeature(i)}
                        style={{flexShrink:0,width:32,height:32,border:"3px solid var(--nb-primary)",background:"var(--nb-bg)",color:"var(--nb-primary)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"inherit",marginTop:4,transition:"all 0.1s ease"}}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#ef4444";(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="#ef4444";}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="var(--nb-bg)";(e.currentTarget as HTMLElement).style.color="var(--nb-primary)";(e.currentTarget as HTMLElement).style.borderColor="var(--nb-primary)";}}>
                        <IconTrash/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{padding:"16px 28px",borderTop:"4px solid var(--nb-primary)",background:"var(--nb-primary)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontWeight:700,fontSize:10,color:"var(--nb-accent-light)",opacity:0.5,textTransform:"uppercase",letterSpacing:"0.1em"}}>{editTarget?"Mode edit project":"Isi semua field wajib (*)"}</span>
              <div style={{display:"flex",gap:12}}>
                <button onClick={closeModal} disabled={saving}
                  style={{border:"4px solid var(--nb-accent)",background:"transparent",color:"var(--nb-accent)",padding:"10px 20px",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"background 0.1s ease"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(158,204,250,0.12)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";}}>
                  Batal
                </button>
                <button onClick={handleSave} disabled={saving}
                  style={{display:"flex",alignItems:"center",gap:8,border:"4px solid var(--nb-accent)",background:"var(--nb-accent)",color:"var(--nb-primary)",padding:"10px 24px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",cursor:saving?"wait":"pointer",boxShadow:"4px 4px 0 rgba(158,204,250,0.4)",fontFamily:"inherit",transition:"transform 0.1s ease, box-shadow 0.1s ease",opacity:saving?0.7:1}}
                  onMouseEnter={e=>{if(!saving){(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";(e.currentTarget as HTMLElement).style.boxShadow="6px 6px 0 rgba(158,204,250,0.4)";}}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="4px 4px 0 rgba(158,204,250,0.4)";}}>
                  {saving?<IconSpin/>:<IconSave/>}{saving?"Menyimpan...":(editTarget?"Update Project":"Simpan Project")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── Crop Modal ── */}
      {cropSrc&&<ImageCropModal src={cropSrc} onConfirm={handleCropConfirm} onCancel={()=>setCropSrc(null)}/>}

      {/* ── Collaborator Modal ── */}
      {collabModal.open&&(
        <CollaboratorModal
          item={collabModal.item}
          index={collabModal.index}
          onSave={(c)=>{
            if(collabModal.index!==null) setForm(f=>({...f, collaborators: f.collaborators.map((x,i)=>i===collabModal.index?c:x)}));
            else setForm(f=>({...f, collaborators: [...f.collaborators, c]}));
            setCollabModal({open:false,index:null,item:null});
          }}
          onCancel={()=>setCollabModal({open:false,index:null,item:null})}
          onUpload={()=>triggerUpload("collab")}
        />
      )}
    </>
  );
}
