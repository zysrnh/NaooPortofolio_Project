import { useState, useEffect, useRef } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconPlus  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconTrash = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const IconEdit  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconSave  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconClose = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconUp    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;
const IconDown  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const IconCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconImage = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;

// ── Types ─────────────────────────────────────────────────────────────────────
interface TechStack  { id: number; name: string; icon: string; category: string; }
interface InfoCard   { label: string; value: string; }
interface Experience {
  id: number; title: string; type: string; company: string;
  description: string; start_date: string; end_date: string | null;
  highlights: string[];
}
interface CaseStudy  { id: number; title: string; short_story: string; }
interface StatItem   { label: string; value: string; icon_key: string; }

type TabKey = "hero" | "capabilities" | "experience" | "casestudies" | "availability" | "stats";

const CSRF = () => (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? "";
const FALLBACK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3C/svg%3E";
const TYPE_OPTS = ["internship","freelance","learning","project","fulltime","parttime"];

// ── Global styles ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes am-slideUp    { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:translateY(0)} }
  @keyframes am-slideDown  { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes am-slideLeft  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes am-slideRight { from{opacity:0;transform:translateX(20px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes am-fadeIn     { from{opacity:0}                             to{opacity:1} }
  @keyframes am-scaleIn    { from{opacity:0;transform:scale(0.92)}       to{opacity:1;transform:scale(1)} }
  @keyframes am-popIn      { from{opacity:0;transform:scale(0.7)}        to{opacity:1;transform:scale(1)} }
  @keyframes am-shake      { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  @keyframes am-pulse      { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes am-spin       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes am-shimmer    { from{background-position:-200% 0} to{background-position:200% 0} }
  @keyframes am-ping       { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
  @keyframes am-toastIn    { from{opacity:0;transform:translateY(16px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes am-toastOut   { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(8px) scale(0.95)} }
  @keyframes am-modalIn    { from{opacity:0;transform:scale(0.94) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes am-overlayIn  { from{opacity:0} to{opacity:1} }
  @keyframes am-rowIn      { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
  @keyframes am-cardIn     { from{opacity:0;transform:translateY(10px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes am-tagPop     { from{opacity:0;transform:scale(0.6)} to{opacity:1;transform:scale(1)} }
  @keyframes am-headerPulse{ 0%,100%{background:#0B1957} 50%{background:#122372} }

  .am-btn {
    transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.1s ease, color 0.1s ease !important;
  }
  .am-btn:hover  { transform: translate(1px,1px) !important; }
  .am-btn:active { transform: translate(3px,3px) !important; }

  .am-card {
    transition: transform 0.15s ease, box-shadow 0.15s ease !important;
  }
  .am-card:hover {
    transform: translate(-2px,-2px) !important;
    box-shadow: 6px 6px 0 #0B1957 !important;
  }

  .am-input {
    transition: border-color 0.12s ease, box-shadow 0.12s ease !important;
  }
  .am-input:focus {
    outline: none !important;
    border-color: #9ECCFA !important;
    box-shadow: 0 0 0 3px rgba(158,204,250,0.25) !important;
  }

  .am-tab {
    transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease !important;
    position: relative;
  }
  .am-tab:hover { background: rgba(11,25,87,0.08) !important; transform: translateY(-1px) !important; }
  .am-tab.active { transform: translateY(0) !important; }

  .am-toggle {
    transition: background 0.2s ease, box-shadow 0.2s ease !important;
  }
  .am-toggle-dot {
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1) !important;
  }

  .am-skeleton {
    background: linear-gradient(90deg, #D1E8FF 25%, #b8d8ff 50%, #D1E8FF 75%);
    background-size: 200% 100%;
    animation: am-shimmer 1.4s ease infinite;
  }

  .am-list-item-enter {
    animation: am-rowIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
  }

  .am-section-enter {
    animation: am-slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  .am-saving-spinner {
    display: inline-block;
    width: 12px; height: 12px;
    border: 2px solid rgba(158,204,250,0.4);
    border-top-color: #9ECCFA;
    border-radius: 50%;
    animation: am-spin 0.6s linear infinite;
  }
`;

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }: { msg: string; type: "ok"|"err"; onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2200);
    const t2 = setTimeout(onDone, 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{
      position:"fixed", bottom:28, right:28, zIndex:9999,
      background: type==="ok" ? "#0B1957" : "#7f1d1d",
      border:`3px solid ${type==="ok"?"#9ECCFA":"#fca5a5"}`,
      boxShadow:`6px 6px 0 ${type==="ok"?"#9ECCFA":"#fca5a5"}`,
      padding:"14px 22px",
      display:"flex", alignItems:"center", gap:12, minWidth:220,
      animation: leaving ? "am-toastOut 0.4s ease forwards" : "am-toastIn 0.4s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
        <div style={{width:10,height:10,background:type==="ok"?"#9ECCFA":"#fca5a5"}} />
        <div style={{position:"absolute",inset:0,background:type==="ok"?"#9ECCFA":"#fca5a5",
          animation:"am-ping 1s ease infinite"}} />
      </div>
      <span style={{color:type==="ok"?"#9ECCFA":"#fca5a5",fontWeight:900,fontSize:13,
        textTransform:"uppercase",letterSpacing:"0.08em"}}>
        {msg}
      </span>
    </div>
  );
}

// ── Inputs ────────────────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder, type="text" }: {
  label?: string; value: string; onChange: (v:string)=>void;
  placeholder?: string; type?: string;
}) => (
  <div style={{marginBottom:12}}>
    {label && <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",
      letterSpacing:"0.1em",color:"#0B1957",marginBottom:5,
      animation:"am-slideLeft 0.3s cubic-bezier(0.16,1,0.3,1) both"}}>{label}</label>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      className="am-input"
      style={{width:"100%",border:"3px solid #0B1957",padding:"9px 12px",fontWeight:700,fontSize:13,
        background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit",boxSizing:"border-box"}} />
  </div>
);

const Textarea = ({ label, value, onChange, rows=3 }: {
  label?: string; value: string; onChange: (v:string)=>void; rows?: number;
}) => (
  <div style={{marginBottom:12}}>
    {label && <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",
      letterSpacing:"0.1em",color:"#0B1957",marginBottom:5}}>{label}</label>}
    <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows}
      className="am-input"
      style={{width:"100%",border:"3px solid #0B1957",padding:"9px 12px",fontWeight:700,fontSize:13,
        background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}} />
  </div>
);

// ── Buttons ───────────────────────────────────────────────────────────────────
const BtnPrimary = ({ onClick, children, disabled=false }: {
  onClick:()=>void; children:React.ReactNode; disabled?:boolean;
}) => (
  <button onClick={onClick} disabled={disabled} className="am-btn"
    style={{display:"flex",alignItems:"center",gap:7,border:"3px solid #0B1957",padding:"9px 18px",
      background:disabled?"#ccc":"#0B1957",color:disabled?"#999":"#9ECCFA",
      fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",
      cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",
      boxShadow:disabled?"none":"4px 4px 0 #9ECCFA"}}>
    {disabled ? <span className="am-saving-spinner"/> : null}
    {children}
  </button>
);

const BtnSecondary = ({ onClick, children }: { onClick:()=>void; children:React.ReactNode }) => (
  <button onClick={onClick} className="am-btn"
    style={{display:"flex",alignItems:"center",gap:6,border:"3px solid #0B1957",padding:"8px 16px",
      background:"#F8F3EA",color:"#0B1957",fontWeight:900,fontSize:11,textTransform:"uppercase",
      letterSpacing:"0.08em",cursor:"pointer",fontFamily:"inherit",
      boxShadow:"3px 3px 0 #0B1957"}}>
    {children}
  </button>
);

const BtnDanger = ({ onClick, children }: { onClick:()=>void; children:React.ReactNode }) => (
  <button onClick={onClick} className="am-btn"
    style={{display:"flex",alignItems:"center",gap:5,border:"2px solid #b91c1c",padding:"6px 10px",
      background:"transparent",color:"#b91c1c",fontWeight:900,fontSize:11,textTransform:"uppercase",
      cursor:"pointer",fontFamily:"inherit",transition:"background 0.1s ease"}}>
    {children}
  </button>
);

// ── SectionBox ────────────────────────────────────────────────────────────────
const SectionBox = ({ title, children, delay=0 }: {
  title: string; children: React.ReactNode; delay?: number;
}) => (
  <div className="am-section-enter"
    style={{border:"4px solid #0B1957",background:"#F8F3EA",
      boxShadow:"8px 8px 0 #0B1957",marginBottom:24,overflow:"hidden",
      animationDelay:`${delay}ms`}}>
    <div style={{background:"#0B1957",padding:"14px 20px",display:"flex",alignItems:"center",gap:10,
      position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",bottom:0,left:0,height:2,background:"#9ECCFA",
        animation:"am-slideRight 0.6s cubic-bezier(0.16,1,0.3,1) both",width:"100%",opacity:0.4}} />
      <span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.12em",
        color:"#9ECCFA",animation:"am-slideLeft 0.35s cubic-bezier(0.16,1,0.3,1) both"}}>
        {title}
      </span>
    </div>
    <div style={{padding:"20px"}}>{children}</div>
  </div>
);

// ── Skeleton row ──────────────────────────────────────────────────────────────
const SkeletonRow = ({ delay=0 }:{ delay?:number }) => (
  <div className="am-section-enter" style={{animationDelay:`${delay}ms`,
    border:"3px solid #D1E8FF",padding:"14px 16px",marginBottom:10}}>
    <div className="am-skeleton" style={{height:14,width:"40%",marginBottom:8}}/>
    <div className="am-skeleton" style={{height:11,width:"65%"}}/>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: HERO
// ═══════════════════════════════════════════════════════════════════════════════
function HeroTab({ toast }: { toast:(m:string,t:"ok"|"err")=>void }) {
  const [name,    setName]    = useState("");
  const [title,   setTitle]   = useState("");
  const [bio,     setBio]     = useState("");
  const [photo,   setPhoto]   = useState<File|null>(null);
  const [photo2,  setPhoto2]  = useState<File|null>(null);
  const [prev1,   setPrev1]   = useState<string|null>(null);
  const [prev2,   setPrev2]   = useState<string|null>(null);
  const [saving,  setSaving]  = useState(false);
  const [loaded,  setLoaded]  = useState(false);
  const f1Ref = useRef<HTMLInputElement>(null);
  const f2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/hero").then(r=>r.json()).then(d=>{
      setName(d.name||""); setTitle(d.title||""); setBio(d.bio||"");
      setPrev1(d.photo||null); setPrev2(d.photo2||null);
      setLoaded(true);
    }).catch(()=>setLoaded(true));
  }, []);

  const pickFile = (e:React.ChangeEvent<HTMLInputElement>, setter:(f:File)=>void, prevSetter:(s:string)=>void) => {
    const f = e.target.files?.[0]; if(!f) return;
    setter(f); prevSetter(URL.createObjectURL(f));
  };

  const save = async () => {
    setSaving(true);
    try {
      const rText = await fetch("/api/hero",{
        method:"PUT", headers:{"Content-Type":"application/json","X-CSRF-TOKEN":CSRF()},
        body:JSON.stringify({name,title,bio}),
      });
      if(!rText.ok) throw new Error();

      if(photo || photo2){
        const fd = new FormData();
        if(photo)  fd.append("photo",  photo);
        if(photo2) fd.append("photo2", photo2);
        const rPhoto = await fetch("/api/hero/photo",{method:"POST",headers:{"X-CSRF-TOKEN":CSRF()},body:fd});
        if(!rPhoto.ok) throw new Error();
      }
      toast("Hero saved!","ok");
    } catch { toast("Failed to save hero","err"); }
    setSaving(false);
  };

  const PhotoBox = ({
    label, hint, preview, fileRef, onPick, onClear
  }:{
    label:string; hint:string;
    preview:string|null; fileRef:React.RefObject<HTMLInputElement>;
    onPick:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    onClear:()=>void;
  }) => (
    <div style={{animation:"am-slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both"}}>
      <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",
        letterSpacing:"0.1em",color:"#0B1957",marginBottom:8}}>{label}</label>
      <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
        {/* Photo preview */}
        <div style={{width:90,height:112,border:"4px solid #0B1957",boxShadow:"4px 4px 0 #0B1957",
          overflow:"hidden",flexShrink:0,background:"#D1E8FF",position:"relative",cursor:"pointer",
          transition:"transform 0.15s ease,box-shadow 0.15s ease"}}
          onClick={()=>fileRef.current?.click()}
          onMouseOver={e=>{
            e.currentTarget.style.transform="translate(-2px,-2px)";
            e.currentTarget.style.boxShadow="6px 6px 0 #0B1957";
          }}
          onMouseOut={e=>{
            e.currentTarget.style.transform="";
            e.currentTarget.style.boxShadow="4px 4px 0 #0B1957";
          }}>
          {preview
            ? <img src={preview} alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",
                transition:"transform 0.3s ease"}}
                onMouseOver={e=>{e.currentTarget.style.transform="scale(1.05)";}}
                onMouseOut={e=>{e.currentTarget.style.transform="";}} />
            : <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",
                justifyContent:"center",gap:6,color:"#0B1957",opacity:0.4}}>
                <IconImage />
                <span style={{fontSize:9,fontWeight:900,textTransform:"uppercase",textAlign:"center",padding:"0 8px"}}>
                  Click to upload
                </span>
              </div>
          }
          {/* Hover overlay */}
          <div style={{position:"absolute",inset:0,background:"rgba(11,25,87,0)",transition:"background 0.15s ease",
            display:"flex",alignItems:"center",justifyContent:"center"}}
            onMouseOver={e=>{e.currentTarget.style.background="rgba(11,25,87,0.25)";}}
            onMouseOut={e=>{e.currentTarget.style.background="rgba(11,25,87,0)";}}>
          </div>
        </div>
        <div>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={onPick} />
          <button onClick={()=>fileRef.current?.click()} className="am-btn"
            style={{display:"flex",alignItems:"center",gap:6,border:"3px solid #0B1957",padding:"8px 14px",
              background:"#D1E8FF",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",
              color:"#0B1957",cursor:"pointer",fontFamily:"inherit",boxShadow:"3px 3px 0 #0B1957",marginBottom:8}}>
            <IconImage /> Choose Photo
          </button>
          {preview && (
            <button onClick={onClear} className="am-btn"
              style={{display:"flex",alignItems:"center",gap:5,border:"2px solid #b91c1c",padding:"6px 12px",
                background:"transparent",color:"#b91c1c",fontWeight:900,fontSize:10,textTransform:"uppercase",
                cursor:"pointer",fontFamily:"inherit",marginBottom:8}}>
              <IconClose /> Remove
            </button>
          )}
          <p style={{fontSize:11,color:"#0B1957",opacity:0.5,fontWeight:700,lineHeight:1.5}}>{hint}</p>
        </div>
      </div>
    </div>
  );

  if(!loaded) return (
    <SectionBox title="Hero / Bio">
      {[0,1,2,3].map(i=><div key={i} className="am-skeleton" style={{height:42,marginBottom:12,animationDelay:`${i*80}ms`}}/>)}
    </SectionBox>
  );

  return (
    <SectionBox title="Hero / Bio">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Input label="Name" value={name} onChange={setName} placeholder="Yusron" />
        <Input label="Title / Role" value={title} onChange={setTitle} placeholder="IT Programmer" />
      </div>
      <Textarea label="Bio (short)" value={bio} onChange={setBio} rows={3} />

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:20}}>
        <PhotoBox
          label="Profile Photo (Primary)" hint={"JPG/PNG/WEBP · max 2MB\nPortrait 2:2.5 recommended"}
          preview={prev1} fileRef={f1Ref}
          onPick={e=>pickFile(e,setPhoto,setPrev1)}
          onClear={()=>{ setPhoto(null); setPrev1(null); }}
        />
        <PhotoBox
          label="Photo 2 (Decorative, optional)" hint={"Ditampilkan di behind foto utama\npada About page hero section"}
          preview={prev2} fileRef={f2Ref}
          onPick={e=>pickFile(e,setPhoto2,setPrev2)}
          onClear={()=>{ setPhoto2(null); setPrev2(null); }}
        />
      </div>

      <BtnPrimary onClick={save} disabled={saving}>
        <IconSave /> {saving?"Saving...":"Save Hero"}
      </BtnPrimary>
    </SectionBox>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: CAPABILITIES
// ═══════════════════════════════════════════════════════════════════════════════
function CapabilitiesTab({ toast }: { toast:(m:string,t:"ok"|"err")=>void }) {
  const [bio,        setBio]        = useState("");
  const [infoCards,  setInfoCards]  = useState<InfoCard[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHL,      setNewHL]      = useState("");
  const [stacks,     setStacks]     = useState<TechStack[]>([]);
  const [selected,   setSelected]   = useState<number[]>([]);
  const [saving,     setSaving]     = useState(false);
  const [loaded,     setLoaded]     = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/about").then(r=>r.json()),
      fetch("/api/tech-stacks/visible").then(r=>r.json()),
    ]).then(([about, ts]) => {
      setBio(about.bio||about.extra_bio||"");
      setInfoCards(Array.isArray(about.info_cards)?about.info_cards:[]);
      setHighlights(Array.isArray(about.highlights)?about.highlights:[]);
      setSelected(Array.isArray(about.featured_stack_ids)?about.featured_stack_ids:[]);
      setStacks(Array.isArray(ts)?ts:[]);
      setLoaded(true);
    }).catch(()=>setLoaded(true));
  }, []);

  const addCard    = () => setInfoCards([...infoCards,{label:"",value:""}]);
  const updateCard = (i:number,f:"label"|"value",v:string) => { const c=[...infoCards];c[i]={...c[i],[f]:v};setInfoCards(c); };
  const removeCard = (i:number) => setInfoCards(infoCards.filter((_,idx)=>idx!==i));
  const moveCard   = (i:number,dir:-1|1) => { const c=[...infoCards];const ni=i+dir;if(ni<0||ni>=c.length)return;[c[i],c[ni]]=[c[ni],c[i]];setInfoCards(c); };
  const addHL      = () => { if(!newHL.trim())return;setHighlights([...highlights,newHL.trim()]);setNewHL(""); };
  const removeHL   = (i:number) => setHighlights(highlights.filter((_,idx)=>idx!==i));
  const toggleStack= (id:number) => setSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch("/api/about",{
        method:"PUT",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":CSRF()},
        body:JSON.stringify({bio,info_cards:infoCards,highlights,featured_stack_ids:selected}),
      });
      if(!r.ok) throw new Error();
      toast("Capabilities saved!","ok");
    } catch { toast("Failed to save","err"); }
    setSaving(false);
  };

  if(!loaded) return (
    <>
      {[0,1,2].map(i=><SkeletonRow key={i} delay={i*80}/>)}
    </>
  );

  return (
    <>
      <SectionBox title="Capabilities Bio" delay={0}>
        <Textarea label="Bio Text" value={bio} onChange={setBio} rows={3} />
      </SectionBox>

      <SectionBox title="Info Cards" delay={60}>
        {infoCards.map((card,i)=>(
          <div key={i} className="am-list-item-enter"
            style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,
              animationDelay:`${i*50}ms`}}>
            <input value={card.label} onChange={e=>updateCard(i,"label",e.target.value)}
              placeholder="Label" className="am-input"
              style={{flex:"0 0 140px",border:"2px solid #0B1957",padding:"7px 10px",
                fontWeight:800,fontSize:12,background:"#F8F3EA",color:"#0B1957",
                fontFamily:"inherit",textTransform:"uppercase"}} />
            <input value={card.value} onChange={e=>updateCard(i,"value",e.target.value)}
              placeholder="Value" className="am-input"
              style={{flex:1,border:"2px solid #0B1957",padding:"7px 10px",
                fontWeight:700,fontSize:13,background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit"}} />
            <button onClick={()=>moveCard(i,-1)} className="am-btn"
              style={{border:"2px solid #0B1957",padding:"6px 8px",background:"#D1E8FF",cursor:"pointer",display:"flex"}}>
              <IconUp />
            </button>
            <button onClick={()=>moveCard(i,1)} className="am-btn"
              style={{border:"2px solid #0B1957",padding:"6px 8px",background:"#D1E8FF",cursor:"pointer",display:"flex"}}>
              <IconDown />
            </button>
            <BtnDanger onClick={()=>removeCard(i)}><IconTrash /></BtnDanger>
          </div>
        ))}
        <button onClick={addCard} className="am-btn"
          style={{display:"flex",alignItems:"center",gap:6,border:"2px dashed #0B1957",padding:"7px 14px",
            background:"transparent",fontWeight:900,fontSize:11,color:"#0B1957",textTransform:"uppercase",
            letterSpacing:"0.08em",cursor:"pointer",fontFamily:"inherit",marginTop:4}}>
          <IconPlus /> Add Card
        </button>
      </SectionBox>

      <SectionBox title="Highlight Tags" delay={120}>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12,minHeight:32}}>
          {highlights.map((h,i)=>(
            <div key={`${h}-${i}`} style={{display:"flex",alignItems:"center",gap:4,
              border:"2px solid #0B1957",padding:"5px 10px",background:"#D1E8FF",
              animation:"am-tagPop 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
              animationDelay:`${i*40}ms`}}>
              <span style={{fontWeight:900,fontSize:11,textTransform:"uppercase",color:"#0B1957"}}>{h}</span>
              <button onClick={()=>removeHL(i)}
                style={{border:"none",background:"transparent",cursor:"pointer",display:"flex",
                  color:"#b91c1c",padding:0,marginLeft:2,transition:"transform 0.1s ease"}}
                onMouseOver={e=>{e.currentTarget.style.transform="scale(1.2)";}}
                onMouseOut={e=>{e.currentTarget.style.transform="";}}>
                <IconClose />
              </button>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          <input value={newHL} onChange={e=>setNewHL(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&addHL()} placeholder="New highlight tag…"
            className="am-input"
            style={{flex:1,border:"3px solid #0B1957",padding:"8px 12px",fontWeight:700,fontSize:13,
              background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit"}} />
          <button onClick={addHL} className="am-btn"
            style={{border:"3px solid #0B1957",padding:"8px 14px",background:"#0B1957",color:"#9ECCFA",
              fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",
              display:"flex",alignItems:"center",gap:5,boxShadow:"3px 3px 0 #9ECCFA"}}>
            <IconPlus /> Add
          </button>
        </div>
      </SectionBox>

      <SectionBox title="Featured Tech Stack" delay={180}>
        <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.6,marginBottom:12}}>
          Pilih tech stack yang tampil di Capabilities section dengan icon.
        </p>
        {stacks.length===0 && (
          <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.4,fontStyle:"italic"}}>
            Belum ada tech stack visible.
          </p>
        )}
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {stacks.map((s,i)=>{
            const active = selected.includes(s.id);
            return (
              <button key={s.id} onClick={()=>toggleStack(s.id)}
                style={{display:"flex",alignItems:"center",gap:8,
                  border:`3px solid ${active?"#0B1957":"#9ECCFA"}`,
                  padding:"6px 12px 6px 6px",
                  background:active?"#0B1957":"#F8F3EA",
                  cursor:"pointer",fontFamily:"inherit",
                  boxShadow:active?"4px 4px 0 #9ECCFA":"2px 2px 0 rgba(158,204,250,0.5)",
                  transition:"all 0.15s cubic-bezier(0.16,1,0.3,1)",
                  transform:active?"translate(-1px,-1px)":"none",
                  animation:`am-cardIn 0.3s cubic-bezier(0.16,1,0.3,1) ${i*30}ms both`}}>
                <img src={s.icon} alt={s.name}
                  onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}
                  style={{width:22,height:22,objectFit:"cover",border:`2px solid ${active?"#9ECCFA":"#0B1957"}`,flexShrink:0,
                    transition:"border-color 0.15s ease"}} />
                <span style={{fontWeight:900,fontSize:11,textTransform:"uppercase",
                  color:active?"#9ECCFA":"#0B1957",letterSpacing:"0.06em",
                  transition:"color 0.15s ease"}}>{s.name}</span>
                <span style={{marginLeft:2,color:"#9ECCFA",
                  transition:"opacity 0.15s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  opacity:active?1:0, transform:active?"scale(1)":"scale(0)"}}>
                  <IconCheck />
                </span>
              </button>
            );
          })}
        </div>
      </SectionBox>

      <div style={{animation:"am-slideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.24s both"}}>
        <BtnPrimary onClick={save} disabled={saving}>
          <IconSave /> {saving?"Saving...":"Save Capabilities"}
        </BtnPrimary>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: EXPERIENCE
// ═══════════════════════════════════════════════════════════════════════════════
const EMPTY_EXP: Omit<Experience,"id"> = {
  title:"",type:"freelance",company:"",description:"",
  start_date:"",end_date:null,highlights:[],
};

const TYPE_COLORS: Record<string,{bg:string;text:string;border:string}> = {
  internship:{bg:"#0B1957",text:"#9ECCFA",border:"#9ECCFA"},
  freelance: {bg:"#9ECCFA",text:"#0B1957",border:"#0B1957"},
  learning:  {bg:"#F8F3EA",text:"#0B1957",border:"#0B1957"},
  project:   {bg:"#D1E8FF",text:"#0B1957",border:"#0B1957"},
  fulltime:  {bg:"#0B1957",text:"#9ECCFA",border:"#9ECCFA"},
  parttime:  {bg:"#FFE8A0",text:"#0B1957",border:"#0B1957"},
};

function ExperienceTab({ toast }: { toast:(m:string,t:"ok"|"err")=>void }) {
  const [exps,    setExps]    = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience|null>(null);
  const [newHL,   setNewHL]   = useState("");
  const [saving,  setSaving]  = useState(false);
  const [loaded,  setLoaded]  = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const load = () => fetch("/api/about/experiences").then(r=>r.json())
    .then(d=>{ setExps(Array.isArray(d)?d:[]); setLoaded(true); }).catch(()=>setLoaded(true));
  useEffect(()=>{ load(); },[]);

  const openNew  = () => { setEditing({id:0,...EMPTY_EXP,highlights:[]}); setTimeout(()=>setModalVisible(true),10); };
  const openEdit = (e:Experience) => { setEditing({...e,highlights:[...e.highlights]}); setTimeout(()=>setModalVisible(true),10); };
  const closeModal = () => { setModalVisible(false); setTimeout(()=>setEditing(null),280); };

  const save = async () => {
    if(!editing) return; setSaving(true);
    try {
      const isNew = editing.id===0;
      const r = await fetch(isNew?"/api/about/experiences":`/api/about/experiences/${editing.id}`,{
        method:isNew?"POST":"PUT",
        headers:{"Content-Type":"application/json","X-CSRF-TOKEN":CSRF()},
        body:JSON.stringify(editing),
      });
      if(!r.ok) throw new Error();
      toast(isNew?"Experience added!":"Experience updated!","ok");
      closeModal(); load();
    } catch { toast("Failed to save","err"); }
    setSaving(false);
  };

  const del = async (id:number) => {
    if(!confirm("Delete this experience?")) return;
    try {
      await fetch(`/api/about/experiences/${id}`,{method:"DELETE",headers:{"X-CSRF-TOKEN":CSRF()}});
      toast("Deleted!","ok"); load();
    } catch { toast("Failed to delete","err"); }
  };

  const addHL    = () => { if(!newHL.trim()||!editing)return; setEditing({...editing,highlights:[...editing.highlights,newHL.trim()]}); setNewHL(""); };
  const removeHL = (i:number) => editing&&setEditing({...editing,highlights:editing.highlights.filter((_,idx)=>idx!==i)});

  const fmtDate = (d:string|null) => {
    if(!d) return "Present";
    const [y,m] = d.split("-");
    return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][Number(m)-1]} ${y}`;
  };

  return (
    <SectionBox title="Experience / Timeline">
      <div style={{animation:"am-slideLeft 0.3s cubic-bezier(0.16,1,0.3,1) both"}}>
        <BtnPrimary onClick={openNew}><IconPlus /> Add Experience</BtnPrimary>
      </div>

      {/* MODAL */}
      {editing && (
        <div style={{position:"fixed",inset:0,zIndex:100,
          display:"flex",alignItems:"center",justifyContent:"center",padding:16,
          background:"rgba(11,25,87,0.55)",
          animation:modalVisible?"am-overlayIn 0.2s ease":"am-overlayIn 0.2s ease reverse"}}
          onClick={e=>e.target===e.currentTarget&&closeModal()}>
          <div style={{background:"#F8F3EA",border:"4px solid #0B1957",
            boxShadow:"12px 12px 0 #0B1957",width:"100%",maxWidth:580,maxHeight:"90vh",overflow:"auto",
            animation:modalVisible?"am-modalIn 0.35s cubic-bezier(0.16,1,0.3,1)":"am-modalIn 0.25s ease reverse"}}>
            {/* Modal header */}
            <div style={{background:"#0B1957",padding:"14px 20px",
              display:"flex",justifyContent:"space-between",alignItems:"center",
              position:"sticky",top:0,zIndex:10}}>
              <span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",
                letterSpacing:"0.1em",color:"#9ECCFA",animation:"am-slideLeft 0.3s ease both"}}>
                {editing.id===0?"✦ Add Experience":"✦ Edit Experience"}
              </span>
              <button onClick={closeModal} className="am-btn"
                style={{border:"2px solid #9ECCFA",padding:7,background:"transparent",
                  cursor:"pointer",color:"#9ECCFA",display:"flex",
                  boxShadow:"2px 2px 0 #9ECCFA"}}>
                <IconClose />
              </button>
            </div>
            <div style={{padding:20}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Input label="Job Title" value={editing.title} onChange={v=>setEditing({...editing,title:v})} />
                <div style={{marginBottom:12}}>
                  <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",
                    letterSpacing:"0.1em",color:"#0B1957",marginBottom:5}}>Type</label>
                  <select value={editing.type} onChange={e=>setEditing({...editing,type:e.target.value})}
                    className="am-input"
                    style={{width:"100%",border:"3px solid #0B1957",padding:"9px 12px",fontWeight:700,
                      fontSize:13,background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit"}}>
                    {TYPE_OPTS.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <Input label="Company" value={editing.company} onChange={v=>setEditing({...editing,company:v})} />
                <div/>
                <Input label="Start Date" value={editing.start_date} onChange={v=>setEditing({...editing,start_date:v})} placeholder="2024-01" type="month" />
                <div style={{marginBottom:12}}>
                  <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",
                    letterSpacing:"0.1em",color:"#0B1957",marginBottom:5}}>End Date</label>
                  <input type="month" value={editing.end_date||""} onChange={e=>setEditing({...editing,end_date:e.target.value||null})}
                    className="am-input"
                    style={{width:"100%",border:"3px solid #0B1957",padding:"9px 12px",fontWeight:700,
                      fontSize:13,background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit",boxSizing:"border-box"}} />
                  <p style={{fontSize:10,fontWeight:700,color:"#0B1957",opacity:0.5,marginTop:4}}>Leave empty = Present</p>
                </div>
              </div>
              <Textarea label="Description" value={editing.description} onChange={v=>setEditing({...editing,description:v})} rows={3} />

              {/* Highlights */}
              <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",
                letterSpacing:"0.1em",color:"#0B1957",marginBottom:8}}>Highlights / Tags</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8,minHeight:28}}>
                {editing.highlights.map((h,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:4,
                    border:"2px solid #0B1957",padding:"3px 10px",background:"#D1E8FF",
                    animation:"am-tagPop 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
                    animationDelay:`${i*30}ms`}}>
                    <span style={{fontWeight:900,fontSize:11,textTransform:"uppercase",color:"#0B1957"}}>{h}</span>
                    <button onClick={()=>removeHL(i)}
                      style={{border:"none",background:"transparent",cursor:"pointer",
                        display:"flex",color:"#b91c1c",padding:0,marginLeft:2}}><IconClose /></button>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8,marginBottom:20}}>
                <input value={newHL} onChange={e=>setNewHL(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addHL()}
                  placeholder="React, Laravel…" className="am-input"
                  style={{flex:1,border:"3px solid #0B1957",padding:"7px 12px",fontWeight:700,fontSize:12,
                    background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit"}} />
                <button onClick={addHL} className="am-btn"
                  style={{border:"3px solid #0B1957",padding:"7px 12px",background:"#0B1957",color:"#9ECCFA",
                    fontWeight:900,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",
                    gap:5,fontSize:11,textTransform:"uppercase",boxShadow:"3px 3px 0 #9ECCFA"}}>
                  <IconPlus/> Add
                </button>
              </div>
              <div style={{display:"flex",gap:8}}>
                <BtnPrimary onClick={save} disabled={saving}><IconSave /> {saving?"Saving...":"Save"}</BtnPrimary>
                <BtnSecondary onClick={closeModal}>Cancel</BtnSecondary>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIST */}
      <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:10}}>
        {!loaded && [0,1,2].map(i=><SkeletonRow key={i} delay={i*80}/>)}
        {loaded && exps.length===0 && (
          <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.4,fontStyle:"italic",
            animation:"am-fadeIn 0.5s ease both"}}>No experiences yet. Add one!</p>
        )}
        {loaded && exps.map((exp,i)=>{
          const tc = TYPE_COLORS[exp.type]??{bg:"#D1E8FF",text:"#0B1957",border:"#0B1957"};
          return (
            <div key={exp.id} className="am-card"
              style={{border:"3px solid #0B1957",background:"#fff",boxShadow:"4px 4px 0 #0B1957",
                padding:"14px 16px",
                animation:`am-rowIn 0.35s cubic-bezier(0.16,1,0.3,1) ${i*60}ms both`}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",color:"#0B1957"}}>{exp.title}</span>
                    <span style={{border:`2px solid ${tc.border}`,padding:"2px 8px",fontSize:10,fontWeight:900,
                      textTransform:"uppercase",background:tc.bg,color:tc.text,
                      boxShadow:`1px 1px 0 ${tc.border}`}}>{exp.type}</span>
                    {!exp.end_date && (
                      <span style={{border:"2px solid #4ade80",padding:"2px 8px",fontSize:9,fontWeight:900,
                        textTransform:"uppercase",color:"#166534",background:"#dcfce7",
                        animation:"am-pulse 2s ease infinite"}}>● Active</span>
                    )}
                  </div>
                  <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.55}}>{exp.company}</p>
                  <p style={{fontSize:11,fontWeight:700,color:"#0B1957",opacity:0.4,marginTop:2}}>
                    {fmtDate(exp.start_date)} → {fmtDate(exp.end_date)}
                  </p>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>openEdit(exp)} className="am-btn"
                    style={{border:"2px solid #0B1957",padding:"5px 10px",background:"#D1E8FF",cursor:"pointer",
                      display:"flex",alignItems:"center",gap:5,fontWeight:900,fontSize:11,
                      textTransform:"uppercase",fontFamily:"inherit",boxShadow:"2px 2px 0 #0B1957"}}>
                    <IconEdit /> Edit
                  </button>
                  <BtnDanger onClick={()=>del(exp.id)}><IconTrash /> Del</BtnDanger>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionBox>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: CASE STUDIES
// ═══════════════════════════════════════════════════════════════════════════════
function CaseStudiesTab({ toast }: { toast:(m:string,t:"ok"|"err")=>void }) {
  const [cases,   setCases]   = useState<CaseStudy[]>([]);
  const [editing, setEditing] = useState<CaseStudy|null>(null);
  const [saving,  setSaving]  = useState(false);
  const [loaded,  setLoaded]  = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const load = () => fetch("/api/about/case-studies").then(r=>r.json())
    .then(d=>{ setCases(Array.isArray(d)?d:[]); setLoaded(true); }).catch(()=>setLoaded(true));
  useEffect(()=>{ load(); },[]);

  const openNew  = () => { setEditing({id:0,title:"",short_story:""}); setTimeout(()=>setModalVisible(true),10); };
  const openEdit = (cs:CaseStudy) => { setEditing({...cs}); setTimeout(()=>setModalVisible(true),10); };
  const closeModal = () => { setModalVisible(false); setTimeout(()=>setEditing(null),280); };

  const save = async () => {
    if(!editing) return; setSaving(true);
    try {
      const isNew = editing.id===0;
      const r = await fetch(isNew?"/api/about/case-studies":`/api/about/case-studies/${editing.id}`,{
        method:isNew?"POST":"PUT",
        headers:{"Content-Type":"application/json","X-CSRF-TOKEN":CSRF()},
        body:JSON.stringify(editing),
      });
      if(!r.ok) throw new Error();
      toast(isNew?"Case study added!":"Updated!","ok");
      closeModal(); load();
    } catch { toast("Failed","err"); }
    setSaving(false);
  };

  const del = async (id:number) => {
    if(!confirm("Delete?")) return;
    try {
      await fetch(`/api/about/case-studies/${id}`,{method:"DELETE",headers:{"X-CSRF-TOKEN":CSRF()}});
      toast("Deleted!","ok"); load();
    } catch { toast("Failed","err"); }
  };

  return (
    <SectionBox title="Case Studies">
      <div style={{animation:"am-slideLeft 0.3s cubic-bezier(0.16,1,0.3,1) both"}}>
        <BtnPrimary onClick={openNew}><IconPlus /> Add Case Study</BtnPrimary>
      </div>

      {/* MODAL */}
      {editing && (
        <div style={{position:"fixed",inset:0,zIndex:100,
          display:"flex",alignItems:"center",justifyContent:"center",padding:16,
          background:"rgba(11,25,87,0.55)",
          animation:modalVisible?"am-overlayIn 0.2s ease":"am-overlayIn 0.2s ease reverse"}}
          onClick={e=>e.target===e.currentTarget&&closeModal()}>
          <div style={{background:"#F8F3EA",border:"4px solid #0B1957",
            boxShadow:"12px 12px 0 #0B1957",width:"100%",maxWidth:500,
            animation:modalVisible?"am-modalIn 0.35s cubic-bezier(0.16,1,0.3,1)":"am-modalIn 0.25s ease reverse"}}>
            <div style={{background:"#0B1957",padding:"14px 20px",
              display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",
                letterSpacing:"0.1em",color:"#9ECCFA"}}>
                {editing.id===0?"✦ Add":"✦ Edit"} Case Study
              </span>
              <button onClick={closeModal} className="am-btn"
                style={{border:"2px solid #9ECCFA",padding:7,background:"transparent",
                  cursor:"pointer",color:"#9ECCFA",display:"flex",boxShadow:"2px 2px 0 #9ECCFA"}}>
                <IconClose />
              </button>
            </div>
            <div style={{padding:20}}>
              <Input label="Title" value={editing.title} onChange={v=>setEditing({...editing,title:v})} />
              <Textarea label="Story (2-4 sentences)" value={editing.short_story} onChange={v=>setEditing({...editing,short_story:v})} rows={4} />
              <div style={{display:"flex",gap:8}}>
                <BtnPrimary onClick={save} disabled={saving}><IconSave /> {saving?"Saving...":"Save"}</BtnPrimary>
                <BtnSecondary onClick={closeModal}>Cancel</BtnSecondary>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GRID */}
      <div style={{marginTop:16,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
        {!loaded && [0,1,2,3].map(i=>(
          <div key={i} className="am-skeleton" style={{height:110,animationDelay:`${i*60}ms`}}/>
        ))}
        {loaded && cases.length===0 && (
          <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.4,fontStyle:"italic",
            animation:"am-fadeIn 0.5s ease both"}}>No case studies yet.</p>
        )}
        {loaded && cases.map((cs,i)=>(
          <div key={cs.id} className="am-card"
            style={{border:"3px solid #0B1957",background:"#fff",boxShadow:"4px 4px 0 #0B1957",padding:"14px",
              animation:`am-cardIn 0.35s cubic-bezier(0.16,1,0.3,1) ${i*60}ms both`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{width:26,height:26,background:"#0B1957",color:"#9ECCFA",
                border:"2px solid #9ECCFA",boxShadow:"2px 2px 0 #9ECCFA",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontWeight:900,fontSize:11,flexShrink:0,
                transition:"transform 0.15s cubic-bezier(0.34,1.56,0.64,1)"}}
                onMouseOver={e=>{e.currentTarget.style.transform="scale(1.15)";}}
                onMouseOut={e=>{e.currentTarget.style.transform="";}}>
                {String(i+1).padStart(2,"0")}
              </div>
              <span style={{fontWeight:900,fontSize:12,textTransform:"uppercase",color:"#0B1957"}}>{cs.title}</span>
            </div>
            <p style={{fontSize:12,fontWeight:600,color:"#0B1957",opacity:0.7,marginBottom:10,lineHeight:1.5}}>
              {cs.short_story}
            </p>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>openEdit(cs)} className="am-btn"
                style={{border:"2px solid #0B1957",padding:"5px 10px",background:"#D1E8FF",cursor:"pointer",
                  display:"flex",alignItems:"center",gap:4,fontWeight:900,fontSize:11,
                  textTransform:"uppercase",fontFamily:"inherit",boxShadow:"2px 2px 0 #0B1957"}}>
                <IconEdit /> Edit
              </button>
              <BtnDanger onClick={()=>del(cs.id)}><IconTrash /></BtnDanger>
            </div>
          </div>
        ))}
      </div>
    </SectionBox>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: AVAILABILITY
// ═══════════════════════════════════════════════════════════════════════════════
function AvailabilityTab({ toast }: { toast:(m:string,t:"ok"|"err")=>void }) {
  const [status,   setStatus]   = useState("Open to Work");
  const [freelance,setFreelance]= useState(true);
  const [remote,   setRemote]   = useState(true);
  const [collab,   setCollab]   = useState(true);
  const [timezone, setTimezone] = useState("WIB (UTC+7)");
  const [saving,   setSaving]   = useState(false);
  const [loaded,   setLoaded]   = useState(false);

  useEffect(()=>{
    fetch("/api/about/availability").then(r=>r.json()).then(d=>{
      setStatus(d.status||"Open to Work");
      setFreelance(!!d.freelance); setRemote(!!d.remote); setCollab(!!d.collaboration);
      setTimezone(d.timezone||"WIB (UTC+7)");
      setLoaded(true);
    }).catch(()=>setLoaded(true));
  },[]);

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch("/api/about/availability",{
        method:"PUT",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":CSRF()},
        body:JSON.stringify({status,freelance,remote,collaboration:collab,timezone}),
      });
      if(!r.ok) throw new Error();
      toast("Availability saved!","ok");
    } catch { toast("Failed","err"); }
    setSaving(false);
  };

  const Toggle = ({label,val,onChange,delay=0}:{label:string;val:boolean;onChange:(v:boolean)=>void;delay?:number}) => (
    <div onClick={()=>onChange(!val)}
      className="am-toggle"
      style={{display:"flex",alignItems:"center",justifyContent:"space-between",
        border:`3px solid ${val?"#9ECCFA":"#0B1957"}`,padding:"14px 18px",
        background:val?"#0B1957":"#F8F3EA",cursor:"pointer",marginBottom:10,
        boxShadow:val?"4px 4px 0 #9ECCFA":"2px 2px 0 #0B1957",
        transform:val?"translate(-1px,-1px)":"none",
        animation:`am-slideRight 0.35s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
          <div style={{width:10,height:10,background:val?"#9ECCFA":"#0B1957",opacity:val?1:0.3,
            transition:"all 0.2s ease"}} />
          {val && <div style={{position:"absolute",inset:0,background:"#9ECCFA",
            animation:"am-ping 1.5s ease infinite"}} />}
        </div>
        <span style={{fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.08em",
          color:val?"#9ECCFA":"#0B1957",transition:"color 0.2s ease"}}>{label}</span>
      </div>
      <div style={{width:44,height:24,border:`3px solid ${val?"#9ECCFA":"#0B1957"}`,
        background:val?"rgba(158,204,250,0.2)":"transparent",
        display:"flex",alignItems:"center",padding:2,position:"relative",flexShrink:0}}>
        <div className="am-toggle-dot"
          style={{width:12,height:12,background:val?"#9ECCFA":"#0B1957",
            transform:val?"translateX(20px)":"translateX(0)",opacity:val?1:0.5}} />
      </div>
    </div>
  );

  if(!loaded) return (
    <SectionBox title="Availability Status">
      {[0,1,2,3,4].map(i=><div key={i} className="am-skeleton" style={{height:50,marginBottom:10,animationDelay:`${i*60}ms`}}/>)}
    </SectionBox>
  );

  return (
    <SectionBox title="Availability Status">
      <div style={{
        background:"#0B1957",border:"3px solid #9ECCFA",boxShadow:"4px 4px 0 #9ECCFA",
        padding:"16px 20px",marginBottom:20,
        display:"flex",alignItems:"center",gap:12,
        animation:"am-scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) both"}}>
        <div style={{position:"relative",width:12,height:12,flexShrink:0}}>
          <div style={{width:12,height:12,background:"#4ade80"}} />
          <div style={{position:"absolute",inset:0,background:"#4ade80",animation:"am-ping 1.4s ease infinite"}} />
        </div>
        <div>
          <p style={{fontSize:10,fontWeight:900,color:"#9ECCFA",textTransform:"uppercase",
            letterSpacing:"0.2em",marginBottom:2}}>Current Status</p>
          <p style={{fontSize:18,fontWeight:900,color:"#F8F3EA",textTransform:"uppercase"}}>
            {status || "Open to Work"}
          </p>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <Input label="Status Text" value={status} onChange={setStatus} placeholder="Open to Work" />
        <Input label="Timezone" value={timezone} onChange={setTimezone} placeholder="WIB (UTC+7)" />
      </div>

      <div style={{marginBottom:20}}>
        <Toggle label="Available for Freelance" val={freelance} onChange={setFreelance} delay={0}   />
        <Toggle label="Available Remote"        val={remote}    onChange={setRemote}    delay={60}  />
        <Toggle label="Open to Collaboration"   val={collab}    onChange={setCollab}    delay={120} />
      </div>

      <div style={{animation:"am-slideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.2s both"}}>
        <BtnPrimary onClick={save} disabled={saving}>
          <IconSave /> {saving?"Saving...":"Save Availability"}
        </BtnPrimary>
      </div>
    </SectionBox>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: STATS (By the Numbers)
// ═══════════════════════════════════════════════════════════════════════════════
const ICON_PRESETS: { key:string; label:string; svg:React.ReactNode }[] = [
  { key:"monitor",svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,label:"Monitor" },
  { key:"book",   svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,label:"Book" },
  { key:"code",   svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,label:"Code" },
  { key:"github", svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>,label:"GitHub" },
  { key:"coffee", svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,label:"Coffee" },
  { key:"star",   svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,label:"Star" },
  { key:"users",  svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,label:"Users" },
  { key:"zap",    svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,label:"Zap" },
  { key:"award",  svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,label:"Award" },
  { key:"layers", svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,label:"Layers" },
  { key:"globe",  svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,label:"Globe" },
  { key:"clock",  svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,label:"Clock" },
];

const DEFAULT_STATS: StatItem[] = [
  {label:"Years Coding",  value:"3+",  icon_key:"monitor"},
  {label:"Projects Built",value:"20+", icon_key:"book"},
  {label:"Tech Explored", value:"15+", icon_key:"code"},
  {label:"GitHub Repos",  value:"30+", icon_key:"github"},
  {label:"Cups of Coffee",value:"∞",   icon_key:"coffee"},
];

function StatsTab({ toast }: { toast:(m:string,t:"ok"|"err")=>void }) {
  const [stats,      setStats]      = useState<StatItem[]>([]);
  const [saving,     setSaving]     = useState(false);
  const [loaded,     setLoaded]     = useState(false);
  const [iconPicker, setIconPicker] = useState<number|null>(null);
  const [justAdded,  setJustAdded]  = useState<number|null>(null);

  useEffect(() => {
    fetch("/api/about/stats").then(r=>r.json())
      .then(d=>{ setStats(Array.isArray(d)&&d.length?d:DEFAULT_STATS); setLoaded(true); })
      .catch(()=>{ setStats(DEFAULT_STATS); setLoaded(true); });
  }, []);

  const addStat = () => {
    if(stats.length>=10) return;
    const newStats = [...stats,{label:"",value:"",icon_key:"star"}];
    setStats(newStats);
    setJustAdded(newStats.length-1);
    setTimeout(()=>setJustAdded(null),600);
  };

  const updateStat = (i:number,f:keyof StatItem,v:string) => {
    const s=[...stats]; s[i]={...s[i],[f]:v}; setStats(s);
  };

  const removeStat = (i:number) => {
    setStats(stats.filter((_,idx)=>idx!==i));
    setIconPicker(null);
  };

  const moveStat = (i:number,dir:-1|1) => {
    const s=[...stats]; const ni=i+dir;
    if(ni<0||ni>=s.length) return;
    [s[i],s[ni]]=[s[ni],s[i]]; setStats(s);
  };

  const save = async () => {
    const invalid = stats.find(s=>!s.label.trim()||!s.value.trim());
    if(invalid){ toast("Label & Value harus diisi semua!","err"); return; }
    setSaving(true);
    try {
      const r = await fetch("/api/about/stats",{
        method:"PUT",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":CSRF()},
        body:JSON.stringify({stats}),
      });
      if(!r.ok) throw new Error();
      toast("Stats saved!","ok");
    } catch { toast("Failed to save stats","err"); }
    setSaving(false);
  };

  const getIconNode = (key:string) => ICON_PRESETS.find(p=>p.key===key)?.svg ?? ICON_PRESETS[0].svg;

  if(!loaded) return (
    <SectionBox title="By the Numbers">
      {[0,1,2,3,4].map(i=><div key={i} className="am-skeleton" style={{height:58,marginBottom:10,animationDelay:`${i*60}ms`}}/>)}
    </SectionBox>
  );

  return (
    <SectionBox title="By the Numbers">
      <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.6,marginBottom:16,
        animation:"am-slideDown 0.3s cubic-bezier(0.16,1,0.3,1) both"}}>
        Tambah, edit, hapus, dan urutkan stat cards yang tampil di About page. Max 10 items.
      </p>

      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        {stats.map((stat,i)=>(
          <div key={i}
            style={{
              display:"flex",alignItems:"center",gap:8,
              border:"3px solid #0B1957",padding:"10px 12px",background:"#fff",
              boxShadow:"3px 3px 0 #0B1957",
              animation: i===justAdded
                ? "am-popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both"
                : `am-rowIn 0.35s cubic-bezier(0.16,1,0.3,1) ${i*50}ms both`,
              transition:"box-shadow 0.15s ease, transform 0.15s ease",
            }}
            onMouseOver={e=>{
              e.currentTarget.style.transform="translate(-1px,-1px)";
              e.currentTarget.style.boxShadow="5px 5px 0 #0B1957";
            }}
            onMouseOut={e=>{
              e.currentTarget.style.transform="";
              e.currentTarget.style.boxShadow="3px 3px 0 #0B1957";
            }}>

            {/* Icon picker button */}
            <div style={{position:"relative",flexShrink:0}}>
              <button onClick={()=>setIconPicker(iconPicker===i?null:i)}
                title="Pilih icon" className="am-btn"
                style={{width:42,height:42,border:"3px solid #0B1957",
                  background:iconPicker===i?"#0B1957":"#D1E8FF",
                  color:iconPicker===i?"#9ECCFA":"#0B1957",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  cursor:"pointer",flexShrink:0,
                  boxShadow:iconPicker===i?"3px 3px 0 #9ECCFA":"2px 2px 0 #0B1957",
                  transition:"all 0.15s ease"}}>
                <span style={{transition:"transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  transform:iconPicker===i?"scale(1.2)":"scale(1)"}}>
                  {getIconNode(stat.icon_key)}
                </span>
              </button>

              {/* Icon picker dropdown */}
              {iconPicker===i && (
                <div style={{
                  position:"absolute",top:50,left:0,zIndex:200,
                  background:"#F8F3EA",border:"3px solid #0B1957",
                  boxShadow:"8px 8px 0 #0B1957",
                  display:"grid",gridTemplateColumns:"repeat(6,38px)",
                  gap:4,padding:8,
                  animation:"am-scaleIn 0.2s cubic-bezier(0.16,1,0.3,1) both",
                  transformOrigin:"top left",
                }}>
                  <div style={{gridColumn:"1/-1",fontWeight:900,fontSize:9,textTransform:"uppercase",
                    color:"#0B1957",opacity:0.4,letterSpacing:"0.1em",marginBottom:2}}>
                    Pilih Icon
                  </div>
                  {ICON_PRESETS.map((preset,pi)=>{
                    const isActive = stat.icon_key===preset.key;
                    return (
                      <button key={preset.key} title={preset.label}
                        onClick={()=>{ updateStat(i,"icon_key",preset.key); setIconPicker(null); }}
                        style={{width:38,height:38,border:"2px solid #0B1957",
                          background:isActive?"#0B1957":"#F8F3EA",
                          color:isActive?"#9ECCFA":"#0B1957",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          cursor:"pointer",padding:0,
                          boxShadow:isActive?"2px 2px 0 #9ECCFA":"none",
                          transition:"all 0.12s ease",
                          animation:`am-popIn 0.2s cubic-bezier(0.16,1,0.3,1) ${pi*20}ms both`}}>
                        {preset.svg}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Value */}
            <input value={stat.value} onChange={e=>updateStat(i,"value",e.target.value)}
              placeholder="3+" className="am-input"
              style={{width:64,flexShrink:0,border:"2px solid #0B1957",padding:"7px 8px",
                fontWeight:900,fontSize:18,textAlign:"center",
                background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit"}} />

            {/* Label */}
            <input value={stat.label} onChange={e=>updateStat(i,"label",e.target.value)}
              placeholder="Years Coding" className="am-input"
              style={{flex:1,border:"2px solid #0B1957",padding:"7px 10px",
                fontWeight:700,fontSize:13,background:"#F8F3EA",color:"#0B1957",
                fontFamily:"inherit",textTransform:"uppercase"}} />

            {/* Controls */}
            <div style={{display:"flex",gap:4,flexShrink:0}}>
              <button onClick={()=>moveStat(i,-1)} className="am-btn"
                style={{border:"2px solid #0B1957",padding:"5px 7px",background:"#D1E8FF",cursor:"pointer",display:"flex"}}>
                <IconUp />
              </button>
              <button onClick={()=>moveStat(i,1)} className="am-btn"
                style={{border:"2px solid #0B1957",padding:"5px 7px",background:"#D1E8FF",cursor:"pointer",display:"flex"}}>
                <IconDown />
              </button>
              <button onClick={()=>removeStat(i)} className="am-btn"
                style={{border:"2px solid #b91c1c",padding:"5px 7px",background:"transparent",
                  cursor:"pointer",display:"flex",color:"#b91c1c"}}>
                <IconTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add + Save */}
      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:24}}>
        {stats.length<10 && (
          <button onClick={addStat} className="am-btn"
            style={{display:"flex",alignItems:"center",gap:6,
              border:"2px dashed #0B1957",padding:"8px 16px",
              background:"transparent",fontWeight:900,fontSize:11,
              color:"#0B1957",textTransform:"uppercase",letterSpacing:"0.08em",
              cursor:"pointer",fontFamily:"inherit",transition:"border-style 0.15s ease,background 0.15s ease"}}
            onMouseOver={e=>{
              e.currentTarget.style.borderStyle="solid";
              e.currentTarget.style.background="#D1E8FF";
            }}
            onMouseOut={e=>{
              e.currentTarget.style.borderStyle="dashed";
              e.currentTarget.style.background="transparent";
            }}>
            <IconPlus /> Add Stat
          </button>
        )}
        <BtnPrimary onClick={save} disabled={saving}>
          <IconSave /> {saving?"Saving...":"Save Stats"}
        </BtnPrimary>
        <span style={{fontSize:11,fontWeight:700,color:"#0B1957",opacity:0.4}}>
          {stats.length}/10 items
        </span>
      </div>

      {/* Live Preview */}
      {stats.length>0 && (
        <div style={{borderTop:"3px solid #0B1957",paddingTop:16,
          animation:"am-slideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.2s both"}}>
          <p style={{fontWeight:900,fontSize:10,textTransform:"uppercase",
            letterSpacing:"0.1em",color:"#0B1957",opacity:0.5,marginBottom:12}}>
            ↓ Preview (seperti tampilan di About page)
          </p>
          <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(stats.length,5)},1fr)`,gap:8}}>
            {stats.map((stat,i)=>(
              <div key={i} className="am-card"
                style={{border:"3px solid #0B1957",background:"#F8F3EA",
                  boxShadow:"4px 4px 0 #0B1957",padding:"14px 10px",
                  display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",
                  animation:`am-cardIn 0.3s cubic-bezier(0.16,1,0.3,1) ${i*50}ms both`}}>
                <div style={{color:"#0B1957",marginBottom:6,
                  transition:"transform 0.2s cubic-bezier(0.34,1.56,0.64,1)"}}
                  onMouseOver={e=>{e.currentTarget.style.transform="scale(1.25)";}}
                  onMouseOut={e=>{e.currentTarget.style.transform="";}}>
                  {getIconNode(stat.icon_key)}
                </div>
                <span style={{fontWeight:900,fontSize:20,color:"#0B1957",lineHeight:1,marginBottom:4}}>
                  {stat.value||"–"}
                </span>
                <span style={{fontWeight:800,fontSize:9,textTransform:"uppercase",
                  letterSpacing:"0.1em",color:"#0B1957",opacity:0.6}}>
                  {stat.label||"Label"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionBox>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN: AboutManager
// ═══════════════════════════════════════════════════════════════════════════════
const TABS: { key:TabKey; label:string; icon:string }[] = [
  { key:"hero",         label:"Hero / Bio",     icon:"◈" },
  { key:"capabilities", label:"Capabilities",   icon:"◆" },
  { key:"experience",   label:"Experience",     icon:"◇" },
  { key:"casestudies",  label:"Case Studies",   icon:"▣" },
  { key:"availability", label:"Availability",   icon:"◉" },
  { key:"stats",        label:"By the Numbers", icon:"▦" },
];

export default function AboutManager() {
  const [activeTab,  setActiveTab]  = useState<TabKey>("hero");
  const [toastMsg,   setToastMsg]   = useState<{msg:string;type:"ok"|"err"}|null>(null);
  const [tabMounted, setTabMounted] = useState(true);
  const [headerReady,setHeaderReady]= useState(false);

  useEffect(()=>{ setTimeout(()=>setHeaderReady(true),80); },[]);

  const toast = (msg:string,type:"ok"|"err") => setToastMsg({msg,type});

  const switchTab = (key:TabKey) => {
    if(key===activeTab) return;
    setTabMounted(false);
    setTimeout(()=>{ setActiveTab(key); setTabMounted(true); },160);
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {toastMsg && <Toast msg={toastMsg.msg} type={toastMsg.type} onDone={()=>setToastMsg(null)} />}

      <div style={{maxWidth:840}}>
        {/* Header */}
        <div style={{marginBottom:24,
          opacity:headerReady?1:0, transform:headerReady?"translateY(0)":"translateY(-12px)",
          transition:"opacity 0.4s ease, transform 0.4s ease"}}>
          <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.25em",
            color:"#9ECCFA",marginBottom:4}}>Dashboard</p>
          <h2 style={{fontWeight:900,fontSize:26,textTransform:"uppercase",color:"#0B1957",
            letterSpacing:"0.05em",lineHeight:1}}>
            About Page Manager
          </h2>
          <div style={{height:4,background:"#0B1957",marginTop:8,width:headerReady?"100%":"0%",
            transition:"width 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s"}} />
        </div>

        {/* Tab bar */}
        <div style={{display:"flex",background:"#F8F3EA",border:"4px solid #0B1957",
          boxShadow:"6px 6px 0 #0B1957",marginBottom:28,overflow:"hidden",
          animation:"am-slideDown 0.4s cubic-bezier(0.16,1,0.3,1) 0.1s both"}}>
          {TABS.map((tab,i)=>{
            const isActive = activeTab===tab.key;
            return (
              <button key={tab.key} onClick={()=>switchTab(tab.key)}
                className={`am-tab ${isActive?"active":""}`}
                style={{
                  flex:1, flexShrink:0,
                  padding:"12px 8px",
                  fontWeight:900,fontSize:10,textTransform:"uppercase",
                  letterSpacing:"0.07em",cursor:"pointer",fontFamily:"inherit",
                  border:"none",borderRight:i<TABS.length-1?"3px solid #0B1957":"none",
                  borderBottom:isActive?"4px solid #9ECCFA":"4px solid transparent",
                  background: isActive?"#0B1957":"#F8F3EA",
                  color: isActive?"#9ECCFA":"#0B1957",
                  display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                  position:"relative",
                  animation:`am-slideDown 0.35s cubic-bezier(0.16,1,0.3,1) ${i*40+100}ms both`,
                }}>
                {isActive && (
                  <div style={{position:"absolute",top:6,right:6,width:6,height:6,
                    background:"#9ECCFA",animation:"am-popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both"}} />
                )}
                <span style={{fontSize:14,lineHeight:1,opacity:isActive?1:0.5,
                  transition:"opacity 0.15s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  transform:isActive?"scale(1.1)":"scale(1)"}}>{tab.icon}</span>
                <span style={{lineHeight:1,whiteSpace:"nowrap",overflow:"hidden",
                  textOverflow:"ellipsis",maxWidth:"100%",padding:"0 4px"}}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div style={{
          opacity:tabMounted?1:0,
          transform:tabMounted?"translateY(0)":"translateY(8px)",
          transition:"opacity 0.18s ease, transform 0.18s ease",
        }}>
          {activeTab==="hero"         && <HeroTab         toast={toast} />}
          {activeTab==="capabilities" && <CapabilitiesTab toast={toast} />}
          {activeTab==="experience"   && <ExperienceTab   toast={toast} />}
          {activeTab==="casestudies"  && <CaseStudiesTab  toast={toast} />}
          {activeTab==="availability" && <AvailabilityTab toast={toast} />}
          {activeTab==="stats"        && <StatsTab        toast={toast} />}
        </div>
      </div>
    </>
  );
}