import { useState, useEffect, useRef } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconPlus    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconTrash   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const IconEdit    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconSave    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconClose   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconUp      = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;
const IconDown    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const IconCheck   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconImage   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;

// ── Types ─────────────────────────────────────────────────────────────────────
interface TechStack  { id: number; name: string; icon: string; category: string; }
interface InfoCard   { label: string; value: string; }
interface Experience {
  id: number; title: string; type: string; company: string;
  description: string; start_date: string; end_date: string | null;
  highlights: string[];
}
interface CaseStudy  { id: number; title: string; short_story: string; }

type TabKey = "hero" | "capabilities" | "experience" | "casestudies" | "availability" | "stats";

const CSRF = () => (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? "";
const FALLBACK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3C/svg%3E";

const TYPE_OPTS = ["internship","freelance","learning","project","fulltime","parttime"];

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }: { msg: string; type: "ok"|"err"; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position:"fixed", bottom:28, right:28, zIndex:9999,
      background: type==="ok" ? "#0B1957" : "#b91c1c",
      border:`3px solid ${type==="ok"?"#9ECCFA":"#fca5a5"}`,
      boxShadow:`4px 4px 0 ${type==="ok"?"#9ECCFA":"#fca5a5"}`,
      padding:"12px 20px", display:"flex", alignItems:"center", gap:10,
      animation:"slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <span style={{color: type==="ok"?"#9ECCFA":"#fca5a5", fontWeight:900, fontSize:13, textTransform:"uppercase", letterSpacing:"0.08em"}}>{msg}</span>
    </div>
  );
}

// ── Reusable Input / Textarea ─────────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder, type="text" }: {
  label?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) => (
  <div style={{marginBottom:12}}>
    {label && <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",marginBottom:4}}>{label}</label>}
    <input
      type={type} value={value} onChange={e=>onChange(e.target.value)}
      placeholder={placeholder}
      style={{width:"100%",border:"3px solid #0B1957",padding:"9px 12px",fontWeight:700,fontSize:13,
        background:"#F8F3EA",color:"#0B1957",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}
    />
  </div>
);
const Textarea = ({ label, value, onChange, rows=3 }: {
  label?: string; value: string; onChange: (v: string) => void; rows?: number;
}) => (
  <div style={{marginBottom:12}}>
    {label && <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",marginBottom:4}}>{label}</label>}
    <textarea
      value={value} onChange={e=>onChange(e.target.value)} rows={rows}
      style={{width:"100%",border:"3px solid #0B1957",padding:"9px 12px",fontWeight:700,fontSize:13,
        background:"#F8F3EA",color:"#0B1957",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}
    />
  </div>
);

// ── Section Wrapper ───────────────────────────────────────────────────────────
const SectionBox = ({ title, children, accent="#0B1957" }: { title: string; children: React.ReactNode; accent?: string }) => (
  <div style={{border:"4px solid #0B1957",background:"#F8F3EA",boxShadow:"8px 8px 0 #0B1957",marginBottom:24,overflow:"hidden"}}>
    <div style={{background:"#0B1957",padding:"12px 20px",display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.12em",color:"#9ECCFA"}}>{title}</span>
    </div>
    <div style={{padding:"20px"}}>{children}</div>
  </div>
);

// ── BtnPrimary / BtnSecondary ─────────────────────────────────────────────────
const BtnPrimary = ({ onClick, children, disabled=false }: { onClick: ()=>void; children: React.ReactNode; disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled}
    style={{display:"flex",alignItems:"center",gap:6,border:"3px solid #0B1957",padding:"8px 16px",
      background: disabled?"#ccc":"#0B1957",color: disabled?"#999":"#9ECCFA",fontWeight:900,fontSize:11,
      textTransform:"uppercase",letterSpacing:"0.08em",cursor:disabled?"not-allowed":"pointer",
      fontFamily:"inherit",boxShadow:disabled?"none":"3px 3px 0 #9ECCFA",transition:"transform 0.08s,box-shadow 0.08s"}}
    onMouseOver={e=>{if(!disabled){(e.currentTarget as HTMLElement).style.transform="translate(1px,1px)";(e.currentTarget as HTMLElement).style.boxShadow="2px 2px 0 #9ECCFA";}}}
    onMouseOut={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow=disabled?"none":"3px 3px 0 #9ECCFA";}}>
    {children}
  </button>
);
const BtnDanger = ({ onClick, children }: { onClick: ()=>void; children: React.ReactNode }) => (
  <button onClick={onClick}
    style={{display:"flex",alignItems:"center",gap:6,border:"2px solid #b91c1c",padding:"6px 12px",
      background:"transparent",color:"#b91c1c",fontWeight:900,fontSize:11,
      textTransform:"uppercase",letterSpacing:"0.08em",cursor:"pointer",fontFamily:"inherit",
      transition:"background 0.1s"}}>
    {children}
  </button>
);

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: HERO
// ═══════════════════════════════════════════════════════════════════════════════
function HeroTab({ toast }: { toast: (m:string,t:"ok"|"err")=>void }) {
  const [name,    setName]    = useState("");
  const [title,   setTitle]   = useState("");
  const [bio,     setBio]     = useState("");
  const [photo,   setPhoto]   = useState<File|null>(null);
  const [preview, setPreview] = useState<string|null>(null);
  const [saving,  setSaving]  = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/hero").then(r=>r.json()).then(d=>{
      setName(d.name||""); setTitle(d.title||""); setBio(d.bio||"");
      setPreview(d.photo||null);
    }).catch(()=>{});
  }, []);

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhoto(f);
    setPreview(URL.createObjectURL(f));
  };

  const save = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", name); fd.append("title", title); fd.append("bio", bio);
      fd.append("_method", "PUT");
      if (photo) fd.append("photo", photo);
      const r = await fetch("/api/hero", { method:"POST", headers:{"X-CSRF-TOKEN":CSRF()}, body:fd });
      if (!r.ok) throw new Error();
      toast("Hero saved!", "ok");
    } catch { toast("Failed to save hero", "err"); }
    setSaving(false);
  };

  return (
    <SectionBox title="Hero / Bio">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Input label="Name" value={name} onChange={setName} placeholder="Yusron" />
        <Input label="Title / Role" value={title} onChange={setTitle} placeholder="IT Programmer" />
      </div>
      <Textarea label="Bio (short)" value={bio} onChange={setBio} rows={3} />

      {/* Photo upload */}
      <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",marginBottom:8}}>
        Profile Photo
      </label>
      <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:16}}>
        {/* Preview */}
        <div style={{
          width:100, height:125, border:"4px solid #0B1957", boxShadow:"4px 4px 0 #0B1957",
          overflow:"hidden", flexShrink:0, background:"#D1E8FF", position:"relative",
          cursor:"pointer"
        }} onClick={()=>fileRef.current?.click()}>
          {preview
            ? <img src={preview} alt="preview" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}} />
            : <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,color:"#0B1957",opacity:0.4}}>
                <IconImage /><span style={{fontSize:9,fontWeight:900,textTransform:"uppercase"}}>Click to upload</span>
              </div>
          }
          <div style={{position:"absolute",inset:0,background:"rgba(11,25,87,0.0)",transition:"background 0.15s"}}
            onMouseOver={e=>(e.currentTarget.style.background="rgba(11,25,87,0.2)")}
            onMouseOut={e=>(e.currentTarget.style.background="rgba(11,25,87,0)")} />
        </div>
        <div>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={pickFile} />
          <button onClick={()=>fileRef.current?.click()}
            style={{display:"flex",alignItems:"center",gap:6,border:"3px solid #0B1957",padding:"8px 14px",background:"#D1E8FF",
              fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",color:"#0B1957",cursor:"pointer",
              fontFamily:"inherit",boxShadow:"3px 3px 0 #0B1957",marginBottom:8}}>
            <IconImage /> Choose Photo
          </button>
          <p style={{fontSize:11,color:"#0B1957",opacity:0.5,fontWeight:700}}>JPG, PNG, WEBP — max 2MB<br/>Recommended: portrait ratio (2:2.5)</p>
          {photo && <p style={{fontSize:11,color:"#0B1957",fontWeight:900,marginTop:6}}>✓ {photo.name}</p>}
        </div>
      </div>

      <BtnPrimary onClick={save} disabled={saving}>
        <IconSave /> {saving ? "Saving..." : "Save Hero"}
      </BtnPrimary>
    </SectionBox>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: CAPABILITIES (What I Do Best)
// ═══════════════════════════════════════════════════════════════════════════════
function CapabilitiesTab({ toast }: { toast: (m:string,t:"ok"|"err")=>void }) {
  const [bio,        setBio]        = useState("");
  const [infoCards,  setInfoCards]  = useState<InfoCard[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHL,      setNewHL]      = useState("");
  const [stacks,     setStacks]     = useState<TechStack[]>([]);
  const [selected,   setSelected]   = useState<number[]>([]);   // selected techstack ids
  const [saving,     setSaving]     = useState(false);

  useEffect(() => {
    // Load about data
    fetch("/api/about").then(r=>r.json()).then(d=>{
      setBio(d.bio||d.extra_bio||"");
      setInfoCards(Array.isArray(d.info_cards)?d.info_cards:[]);
      setHighlights(Array.isArray(d.highlights)?d.highlights:[]);
      setSelected(Array.isArray(d.featured_stack_ids)?d.featured_stack_ids:[]);
    }).catch(()=>{});
    // Load tech stacks
    fetch("/api/tech-stacks/visible").then(r=>r.json())
      .then(d=>setStacks(Array.isArray(d)?d:[])).catch(()=>{});
  }, []);

  const addCard = () => setInfoCards([...infoCards, {label:"", value:""}]);
  const updateCard = (i:number, field:"label"|"value", val:string) => {
    const c = [...infoCards]; c[i] = {...c[i],[field]:val}; setInfoCards(c);
  };
  const removeCard = (i:number) => setInfoCards(infoCards.filter((_,idx)=>idx!==i));
  const moveCard = (i:number, dir:-1|1) => {
    const c=[...infoCards]; const ni=i+dir;
    if(ni<0||ni>=c.length) return;
    [c[i],c[ni]]=[c[ni],c[i]]; setInfoCards(c);
  };

  const addHL = () => { if(!newHL.trim()) return; setHighlights([...highlights,newHL.trim()]); setNewHL(""); };
  const removeHL = (i:number) => setHighlights(highlights.filter((_,idx)=>idx!==i));

  const toggleStack = (id:number) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]);

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch("/api/about", {
        method:"PUT",
        headers:{"Content-Type":"application/json","X-CSRF-TOKEN":CSRF()},
        body: JSON.stringify({ bio, info_cards:infoCards, highlights, featured_stack_ids:selected }),
      });
      if(!r.ok) throw new Error();
      toast("Capabilities saved!", "ok");
    } catch { toast("Failed to save", "err"); }
    setSaving(false);
  };

  return (
    <>
      <SectionBox title="Capabilities Bio">
        <Textarea label="Bio Text" value={bio} onChange={setBio} rows={3} />
      </SectionBox>

      <SectionBox title="Info Cards (Frontend / Backend / Database / Tools)">
        {infoCards.map((card,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <input value={card.label} onChange={e=>updateCard(i,"label",e.target.value)}
              placeholder="Label" style={{flex:"0 0 140px",border:"2px solid #0B1957",padding:"7px 10px",fontWeight:800,fontSize:12,background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit",textTransform:"uppercase"}} />
            <input value={card.value} onChange={e=>updateCard(i,"value",e.target.value)}
              placeholder="Value" style={{flex:1,border:"2px solid #0B1957",padding:"7px 10px",fontWeight:700,fontSize:13,background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit"}} />
            <button onClick={()=>moveCard(i,-1)} style={{border:"2px solid #0B1957",padding:"6px 8px",background:"#D1E8FF",cursor:"pointer"}}><IconUp /></button>
            <button onClick={()=>moveCard(i,1)}  style={{border:"2px solid #0B1957",padding:"6px 8px",background:"#D1E8FF",cursor:"pointer"}}><IconDown /></button>
            <BtnDanger onClick={()=>removeCard(i)}><IconTrash /></BtnDanger>
          </div>
        ))}
        <button onClick={addCard}
          style={{display:"flex",alignItems:"center",gap:6,border:"2px dashed #0B1957",padding:"7px 14px",
            background:"transparent",fontWeight:900,fontSize:11,color:"#0B1957",textTransform:"uppercase",
            letterSpacing:"0.08em",cursor:"pointer",fontFamily:"inherit",marginTop:4}}>
          <IconPlus /> Add Card
        </button>
      </SectionBox>

      <SectionBox title="Highlight Tags (Clean Code, Fast Delivery…)">
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
          {highlights.map((h,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:4,border:"2px solid #0B1957",padding:"4px 10px",background:"#D1E8FF"}}>
              <span style={{fontWeight:900,fontSize:11,textTransform:"uppercase",color:"#0B1957"}}>{h}</span>
              <button onClick={()=>removeHL(i)} style={{border:"none",background:"transparent",cursor:"pointer",display:"flex",color:"#b91c1c",padding:0,marginLeft:2}}><IconClose /></button>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          <input value={newHL} onChange={e=>setNewHL(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&addHL()}
            placeholder="New highlight tag…"
            style={{flex:1,border:"3px solid #0B1957",padding:"8px 12px",fontWeight:700,fontSize:13,background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit"}} />
          <button onClick={addHL}
            style={{border:"3px solid #0B1957",padding:"8px 14px",background:"#0B1957",color:"#9ECCFA",fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
            <IconPlus /> Add
          </button>
        </div>
      </SectionBox>

      <SectionBox title="Featured Tech Stack (shown as icons in 'What I Do Best')">
        <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.6,marginBottom:12}}>
          Pilih tech stack yang ingin ditampilkan di section Capabilities. Icon akan diambil dari Tech Stack manager.
        </p>
        {stacks.length === 0 && (
          <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.4,fontStyle:"italic"}}>
            Belum ada tech stack. Tambah dulu di menu Tech Stack.
          </p>
        )}
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {stacks.map(s=>{
            const active = selected.includes(s.id);
            return (
              <button key={s.id} onClick={()=>toggleStack(s.id)}
                style={{display:"flex",alignItems:"center",gap:8,border:`3px solid ${active?"#0B1957":"#9ECCFA"}`,
                  padding:"6px 12px 6px 6px",background:active?"#0B1957":"#F8F3EA",
                  cursor:"pointer",fontFamily:"inherit",
                  boxShadow:active?"3px 3px 0 #9ECCFA":"2px 2px 0 #9ECCFA",
                  transition:"all 0.12s ease"}}>
                <img src={s.icon} alt={s.name} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}
                  style={{width:22,height:22,objectFit:"cover",border:`2px solid ${active?"#9ECCFA":"#0B1957"}`,flexShrink:0}} />
                <span style={{fontWeight:900,fontSize:11,textTransform:"uppercase",color:active?"#9ECCFA":"#0B1957",letterSpacing:"0.06em"}}>{s.name}</span>
                {active && <span style={{marginLeft:2,color:"#9ECCFA"}}><IconCheck /></span>}
              </button>
            );
          })}
        </div>
      </SectionBox>

      <BtnPrimary onClick={save} disabled={saving}>
        <IconSave /> {saving ? "Saving..." : "Save Capabilities"}
      </BtnPrimary>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: EXPERIENCE
// ═══════════════════════════════════════════════════════════════════════════════
const EMPTY_EXP: Omit<Experience,"id"> = {
  title:"", type:"freelance", company:"", description:"",
  start_date:"", end_date:null, highlights:[],
};

function ExperienceTab({ toast }: { toast: (m:string,t:"ok"|"err")=>void }) {
  const [exps,      setExps]      = useState<Experience[]>([]);
  const [editing,   setEditing]   = useState<Experience|null>(null);
  const [newHighl,  setNewHighl]  = useState("");
  const [saving,    setSaving]    = useState(false);

  const load = () => {
    fetch("/api/about/experiences").then(r=>r.json())
      .then(d=>setExps(Array.isArray(d)?d:[])).catch(()=>{});
  };
  useEffect(load, []);

  const openNew = () => setEditing({ id:0, ...EMPTY_EXP, highlights:[] });
  const openEdit = (e: Experience) => setEditing({...e, highlights:[...e.highlights]});

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const isNew = editing.id === 0;
      const url   = isNew ? "/api/about/experiences" : `/api/about/experiences/${editing.id}`;
      const r = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers:{"Content-Type":"application/json","X-CSRF-TOKEN":CSRF()},
        body: JSON.stringify(editing),
      });
      if(!r.ok) throw new Error();
      toast(isNew?"Experience added!":"Experience updated!", "ok");
      setEditing(null); load();
    } catch { toast("Failed to save", "err"); }
    setSaving(false);
  };

  const del = async (id: number) => {
    if(!confirm("Delete this experience?")) return;
    try {
      await fetch(`/api/about/experiences/${id}`, { method:"DELETE", headers:{"X-CSRF-TOKEN":CSRF()} });
      toast("Deleted!", "ok"); load();
    } catch { toast("Failed to delete", "err"); }
  };

  const addHL = () => {
    if(!newHighl.trim()||!editing) return;
    setEditing({...editing, highlights:[...editing.highlights, newHighl.trim()]});
    setNewHighl("");
  };
  const removeHL = (i:number) => editing && setEditing({...editing, highlights:editing.highlights.filter((_,idx)=>idx!==i)});

  const TYPE_COLORS: Record<string,{bg:string;text:string}> = {
    internship:{bg:"#0B1957",text:"#9ECCFA"}, freelance:{bg:"#9ECCFA",text:"#0B1957"},
    learning:{bg:"#F8F3EA",text:"#0B1957"}, project:{bg:"#D1E8FF",text:"#0B1957"},
    fulltime:{bg:"#0B1957",text:"#9ECCFA"}, parttime:{bg:"#FFE8A0",text:"#0B1957"},
  };

  return (
    <SectionBox title="Experience / Timeline">
      <BtnPrimary onClick={openNew}><IconPlus /> Add Experience</BtnPrimary>

      {/* MODAL */}
      {editing && (
        <div style={{position:"fixed",inset:0,zIndex:100,background:"rgba(11,25,87,0.55)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}
          onClick={e=>e.target===e.currentTarget&&setEditing(null)}>
          <div style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"12px 12px 0 #0B1957",width:"100%",maxWidth:580,maxHeight:"90vh",overflow:"auto"}}>
            <div style={{background:"#0B1957",padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0}}>
              <span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.1em",color:"#9ECCFA"}}>
                {editing.id===0?"Add Experience":"Edit Experience"}
              </span>
              <button onClick={()=>setEditing(null)} style={{border:"2px solid #9ECCFA",padding:6,background:"transparent",cursor:"pointer",color:"#9ECCFA",display:"flex"}}><IconClose /></button>
            </div>
            <div style={{padding:20}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Input label="Job Title" value={editing.title} onChange={v=>setEditing({...editing,title:v})} />
                <div style={{marginBottom:12}}>
                  <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",marginBottom:4}}>Type</label>
                  <select value={editing.type} onChange={e=>setEditing({...editing,type:e.target.value})}
                    style={{width:"100%",border:"3px solid #0B1957",padding:"9px 12px",fontWeight:700,fontSize:13,background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit"}}>
                    {TYPE_OPTS.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <Input label="Company" value={editing.company} onChange={v=>setEditing({...editing,company:v})} />
                <div/>
                <Input label="Start Date" value={editing.start_date} onChange={v=>setEditing({...editing,start_date:v})} placeholder="2024-01" type="month" />
                <div style={{marginBottom:12}}>
                  <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",marginBottom:4}}>End Date</label>
                  <input type="month" value={editing.end_date||""} onChange={e=>setEditing({...editing,end_date:e.target.value||null})}
                    placeholder="Leave empty = Present"
                    style={{width:"100%",border:"3px solid #0B1957",padding:"9px 12px",fontWeight:700,fontSize:13,background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit",boxSizing:"border-box"}} />
                  <p style={{fontSize:10,fontWeight:700,color:"#0B1957",opacity:0.5,marginTop:4}}>Leave empty = Present / Active</p>
                </div>
              </div>
              <Textarea label="Description" value={editing.description} onChange={v=>setEditing({...editing,description:v})} rows={3} />

              {/* Highlights */}
              <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",marginBottom:8}}>Highlights / Tags</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                {editing.highlights.map((h,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:4,border:"2px solid #0B1957",padding:"3px 10px",background:"#D1E8FF"}}>
                    <span style={{fontWeight:900,fontSize:11,textTransform:"uppercase",color:"#0B1957"}}>{h}</span>
                    <button onClick={()=>removeHL(i)} style={{border:"none",background:"transparent",cursor:"pointer",display:"flex",color:"#b91c1c",padding:0}}><IconClose /></button>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                <input value={newHighl} onChange={e=>setNewHighl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addHL()}
                  placeholder="React, Laravel…"
                  style={{flex:1,border:"3px solid #0B1957",padding:"7px 12px",fontWeight:700,fontSize:12,background:"#F8F3EA",color:"#0B1957",fontFamily:"inherit"}} />
                <button onClick={addHL}
                  style={{border:"3px solid #0B1957",padding:"7px 12px",background:"#0B1957",color:"#9ECCFA",fontWeight:900,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,fontSize:11,textTransform:"uppercase"}}>
                  <IconPlus/> Add
                </button>
              </div>
              <div style={{display:"flex",gap:8}}>
                <BtnPrimary onClick={save} disabled={saving}><IconSave /> {saving?"Saving...":"Save"}</BtnPrimary>
                <button onClick={()=>setEditing(null)}
                  style={{border:"3px solid #0B1957",padding:"8px 16px",background:"#F8F3EA",color:"#0B1957",fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIST */}
      <div style={{marginTop:16, display:"flex",flexDirection:"column",gap:12}}>
        {exps.length===0 && <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.4,fontStyle:"italic"}}>No experiences yet. Add one!</p>}
        {exps.map((exp)=>{
          const tc = TYPE_COLORS[exp.type] ?? {bg:"#D1E8FF",text:"#0B1957"};
          return (
            <div key={exp.id} style={{border:"3px solid #0B1957",background:"#fff",boxShadow:"4px 4px 0 #0B1957",padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",color:"#0B1957"}}>{exp.title}</span>
                    <span style={{border:`2px solid #0B1957`,padding:"2px 8px",fontSize:10,fontWeight:900,textTransform:"uppercase",background:tc.bg,color:tc.text}}>{exp.type}</span>
                    {!exp.end_date && <span style={{border:"2px solid #4ade80",padding:"1px 6px",fontSize:9,fontWeight:900,textTransform:"uppercase",color:"#166534",background:"#dcfce7"}}>● Active</span>}
                  </div>
                  <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.6}}>{exp.company}</p>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>openEdit(exp)}
                    style={{border:"2px solid #0B1957",padding:"5px 10px",background:"#D1E8FF",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontWeight:900,fontSize:11,textTransform:"uppercase",fontFamily:"inherit"}}>
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
function CaseStudiesTab({ toast }: { toast: (m:string,t:"ok"|"err")=>void }) {
  const [cases,  setCases]  = useState<CaseStudy[]>([]);
  const [editing,setEditing]= useState<CaseStudy|null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/about/case-studies").then(r=>r.json())
      .then(d=>setCases(Array.isArray(d)?d:[])).catch(()=>{});
  };
  useEffect(load, []);

  const openNew  = () => setEditing({id:0,title:"",short_story:""});
  const openEdit = (c: CaseStudy) => setEditing({...c});

  const save = async () => {
    if(!editing) return;
    setSaving(true);
    try {
      const isNew = editing.id===0;
      const r = await fetch(isNew?"/api/about/case-studies":`/api/about/case-studies/${editing.id}`, {
        method: isNew?"POST":"PUT",
        headers:{"Content-Type":"application/json","X-CSRF-TOKEN":CSRF()},
        body: JSON.stringify(editing),
      });
      if(!r.ok) throw new Error();
      toast(isNew?"Case study added!":"Updated!", "ok");
      setEditing(null); load();
    } catch { toast("Failed", "err"); }
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
      <BtnPrimary onClick={openNew}><IconPlus /> Add Case Study</BtnPrimary>

      {editing && (
        <div style={{position:"fixed",inset:0,zIndex:100,background:"rgba(11,25,87,0.55)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}
          onClick={e=>e.target===e.currentTarget&&setEditing(null)}>
          <div style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"12px 12px 0 #0B1957",width:"100%",maxWidth:500}}>
            <div style={{background:"#0B1957",padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.1em",color:"#9ECCFA"}}>
                {editing.id===0?"Add":"Edit"} Case Study
              </span>
              <button onClick={()=>setEditing(null)} style={{border:"2px solid #9ECCFA",padding:6,background:"transparent",cursor:"pointer",color:"#9ECCFA",display:"flex"}}><IconClose /></button>
            </div>
            <div style={{padding:20}}>
              <Input label="Title (Best Project, Biggest Challenge…)" value={editing.title} onChange={v=>setEditing({...editing,title:v})} />
              <Textarea label="Story (2-4 sentences)" value={editing.short_story} onChange={v=>setEditing({...editing,short_story:v})} rows={4} />
              <div style={{display:"flex",gap:8}}>
                <BtnPrimary onClick={save} disabled={saving}><IconSave/> {saving?"Saving...":"Save"}</BtnPrimary>
                <button onClick={()=>setEditing(null)}
                  style={{border:"3px solid #0B1957",padding:"8px 16px",background:"#F8F3EA",color:"#0B1957",fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{marginTop:16,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
        {cases.length===0 && <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.4,fontStyle:"italic"}}>No case studies yet.</p>}
        {cases.map((cs,i)=>(
          <div key={cs.id} style={{border:"3px solid #0B1957",background:"#fff",boxShadow:"4px 4px 0 #0B1957",padding:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{width:26,height:26,background:"#0B1957",color:"#9ECCFA",border:"2px solid #9ECCFA",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11,flexShrink:0}}>
                {String(i+1).padStart(2,"0")}
              </div>
              <span style={{fontWeight:900,fontSize:12,textTransform:"uppercase",color:"#0B1957"}}>{cs.title}</span>
            </div>
            <p style={{fontSize:12,fontWeight:600,color:"#0B1957",opacity:0.7,marginBottom:10,lineHeight:1.5}}>{cs.short_story}</p>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>openEdit(cs)}
                style={{border:"2px solid #0B1957",padding:"5px 10px",background:"#D1E8FF",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontWeight:900,fontSize:11,textTransform:"uppercase",fontFamily:"inherit"}}>
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
function AvailabilityTab({ toast }: { toast: (m:string,t:"ok"|"err")=>void }) {
  const [status,    setStatus]    = useState("Open to Work");
  const [freelance, setFreelance] = useState(true);
  const [remote,    setRemote]    = useState(true);
  const [collab,    setCollab]    = useState(true);
  const [timezone,  setTimezone]  = useState("WIB (UTC+7)");
  const [saving,    setSaving]    = useState(false);

  useEffect(()=>{
    fetch("/api/about/availability").then(r=>r.json()).then(d=>{
      setStatus(d.status||"Open to Work");
      setFreelance(!!d.freelance); setRemote(!!d.remote); setCollab(!!d.collaboration);
      setTimezone(d.timezone||"WIB (UTC+7)");
    }).catch(()=>{});
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

  const Toggle = ({label,val,onChange}:{label:string;val:boolean;onChange:(v:boolean)=>void}) => (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",border:"3px solid #0B1957",padding:"12px 16px",background:val?"#0B1957":"#F8F3EA",marginBottom:8,cursor:"pointer"}}
      onClick={()=>onChange(!val)}>
      <span style={{fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.08em",color:val?"#9ECCFA":"#0B1957"}}>{label}</span>
      <div style={{width:36,height:20,border:`3px solid ${val?"#9ECCFA":"#0B1957"}`,background:val?"#9ECCFA":"transparent",display:"flex",alignItems:"center",justifyContent:val?"flex-end":"flex-start",padding:2,transition:"all 0.15s"}}>
        <div style={{width:10,height:10,background:val?"#0B1957":"#0B1957",opacity:val?1:0.3}} />
      </div>
    </div>
  );

  return (
    <SectionBox title="Availability Status">
      <Input label="Status Text" value={status} onChange={setStatus} placeholder="Open to Work" />
      <Input label="Timezone" value={timezone} onChange={setTimezone} placeholder="WIB (UTC+7)" />
      <div style={{marginTop:12}}>
        <Toggle label="Available for Freelance" val={freelance} onChange={setFreelance} />
        <Toggle label="Available Remote"        val={remote}    onChange={setRemote} />
        <Toggle label="Open to Collaboration"   val={collab}    onChange={setCollab} />
      </div>
      <div style={{marginTop:16}}>
        <BtnPrimary onClick={save} disabled={saving}><IconSave /> {saving?"Saving...":"Save Availability"}</BtnPrimary>
      </div>
    </SectionBox>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB: STATS (By the Numbers)
// ═══════════════════════════════════════════════════════════════════════════════

// Preset icons — key → SVG path data (viewBox 0 0 24 24, stroke-based)
const ICON_PRESETS: { key: string; label: string; svg: React.ReactNode }[] = [
  { key:"monitor", label:"Monitor",  svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { key:"book",    label:"Book",     svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> },
  { key:"code",    label:"Code",     svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { key:"github",  label:"GitHub",   svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg> },
  { key:"coffee",  label:"Coffee",   svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { key:"star",    label:"Star",     svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { key:"users",   label:"Users",    svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
  { key:"zap",     label:"Zap",      svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { key:"award",   label:"Award",    svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg> },
  { key:"layers",  label:"Layers",   svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
  { key:"globe",   label:"Globe",    svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
  { key:"clock",   label:"Clock",    svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
];

interface StatItem { label: string; value: string; icon_key: string; }

const DEFAULT_STATS_FALLBACK: StatItem[] = [
  { label:"Years Coding",   value:"3+",  icon_key:"monitor" },
  { label:"Projects Built", value:"20+", icon_key:"book"    },
  { label:"Tech Explored",  value:"15+", icon_key:"code"    },
  { label:"GitHub Repos",   value:"30+", icon_key:"github"  },
  { label:"Cups of Coffee", value:"∞",   icon_key:"coffee"  },
];

function StatsTab({ toast }: { toast: (m:string,t:"ok"|"err")=>void }) {
  const [stats,         setStats]         = useState<StatItem[]>([]);
  const [saving,        setSaving]        = useState(false);
  const [iconPicker,    setIconPicker]    = useState<number|null>(null); // index sedang pilih icon

  useEffect(() => {
    fetch("/api/about/stats").then(r => r.json())
      .then(d => setStats(Array.isArray(d) && d.length ? d : DEFAULT_STATS_FALLBACK))
      .catch(() => setStats(DEFAULT_STATS_FALLBACK));
  }, []);

  const addStat = () => {
    if (stats.length >= 10) return;
    setStats([...stats, { label:"", value:"", icon_key:"star" }]);
  };

  const updateStat = (i: number, field: keyof StatItem, val: string) => {
    const s = [...stats]; s[i] = { ...s[i], [field]: val }; setStats(s);
  };

  const removeStat = (i: number) => setStats(stats.filter((_,idx) => idx !== i));

  const moveStat = (i: number, dir: -1|1) => {
    const s = [...stats]; const ni = i + dir;
    if (ni < 0 || ni >= s.length) return;
    [s[i], s[ni]] = [s[ni], s[i]]; setStats(s);
  };

  const save = async () => {
    const invalid = stats.find(s => !s.label.trim() || !s.value.trim());
    if (invalid) { toast("Label & Value harus diisi semua!", "err"); return; }
    setSaving(true);
    try {
      const r = await fetch("/api/about/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": CSRF() },
        body: JSON.stringify({ stats }),
      });
      if (!r.ok) throw new Error();
      toast("Stats saved!", "ok");
    } catch { toast("Failed to save stats", "err"); }
    setSaving(false);
  };

  const getIconNode = (key: string) =>
    ICON_PRESETS.find(p => p.key === key)?.svg ?? ICON_PRESETS[0].svg;

  return (
    <SectionBox title="By the Numbers">
      <p style={{fontSize:12,fontWeight:700,color:"#0B1957",opacity:0.6,marginBottom:16}}>
        Tambah, edit, hapus, dan urutkan stat cards. Max 10 items.
      </p>

      {/* Stat rows */}
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:8,
            border:"3px solid #0B1957", padding:"10px 12px", background:"#fff",
            boxShadow:"3px 3px 0 #0B1957",
          }}>
            {/* Icon picker button */}
            <div style={{position:"relative",flexShrink:0}}>
              <button
                onClick={() => setIconPicker(iconPicker === i ? null : i)}
                title="Pilih icon"
                style={{
                  width:40, height:40, border:"3px solid #0B1957",
                  background: iconPicker===i ? "#0B1957" : "#D1E8FF",
                  color: iconPicker===i ? "#9ECCFA" : "#0B1957",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", flexShrink:0,
                  boxShadow:"2px 2px 0 #0B1957",
                }}>
                {getIconNode(stat.icon_key)}
              </button>

              {/* Icon picker dropdown */}
              {iconPicker === i && (
                <div style={{
                  position:"absolute", top:46, left:0, zIndex:200,
                  background:"#F8F3EA", border:"3px solid #0B1957",
                  boxShadow:"6px 6px 0 #0B1957",
                  display:"grid", gridTemplateColumns:"repeat(6,36px)",
                  gap:4, padding:8,
                }}>
                  {ICON_PRESETS.map(preset => (
                    <button
                      key={preset.key}
                      title={preset.label}
                      onClick={() => { updateStat(i, "icon_key", preset.key); setIconPicker(null); }}
                      style={{
                        width:36, height:36, border:"2px solid #0B1957",
                        background: stat.icon_key===preset.key ? "#0B1957" : "#F8F3EA",
                        color:      stat.icon_key===preset.key ? "#9ECCFA" : "#0B1957",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        cursor:"pointer", padding:0,
                        boxShadow: stat.icon_key===preset.key ? "2px 2px 0 #9ECCFA" : "none",
                      }}>
                      {preset.svg}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Value (number/text) */}
            <input
              value={stat.value}
              onChange={e => updateStat(i, "value", e.target.value)}
              placeholder="3+"
              style={{
                width:64, flexShrink:0,
                border:"2px solid #0B1957", padding:"7px 8px",
                fontWeight:900, fontSize:16, textAlign:"center",
                background:"#F8F3EA", color:"#0B1957", fontFamily:"inherit",
              }}
            />

            {/* Label */}
            <input
              value={stat.label}
              onChange={e => updateStat(i, "label", e.target.value)}
              placeholder="Years Coding"
              style={{
                flex:1,
                border:"2px solid #0B1957", padding:"7px 10px",
                fontWeight:700, fontSize:13,
                background:"#F8F3EA", color:"#0B1957", fontFamily:"inherit",
                textTransform:"uppercase",
              }}
            />

            {/* Controls */}
            <div style={{display:"flex",gap:4,flexShrink:0}}>
              <button onClick={() => moveStat(i, -1)} title="Move up"
                style={{border:"2px solid #0B1957",padding:"5px 7px",background:"#D1E8FF",cursor:"pointer",display:"flex"}}>
                <IconUp />
              </button>
              <button onClick={() => moveStat(i, 1)} title="Move down"
                style={{border:"2px solid #0B1957",padding:"5px 7px",background:"#D1E8FF",cursor:"pointer",display:"flex"}}>
                <IconDown />
              </button>
              <button onClick={() => removeStat(i)} title="Delete"
                style={{border:"2px solid #b91c1c",padding:"5px 7px",background:"transparent",cursor:"pointer",display:"flex",color:"#b91c1c"}}>
                <IconTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add + Save */}
      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
        {stats.length < 10 && (
          <button onClick={addStat}
            style={{
              display:"flex", alignItems:"center", gap:6,
              border:"2px dashed #0B1957", padding:"8px 16px",
              background:"transparent", fontWeight:900, fontSize:11,
              color:"#0B1957", textTransform:"uppercase", letterSpacing:"0.08em",
              cursor:"pointer", fontFamily:"inherit",
            }}>
            <IconPlus /> Add Stat
          </button>
        )}
        <BtnPrimary onClick={save} disabled={saving}>
          <IconSave /> {saving ? "Saving..." : "Save Stats"}
        </BtnPrimary>
        <span style={{fontSize:11,fontWeight:700,color:"#0B1957",opacity:0.4}}>
          {stats.length}/10 items
        </span>
      </div>

      {/* Live Preview */}
      {stats.length > 0 && (
        <div style={{marginTop:24,borderTop:"3px solid #0B1957",paddingTop:16}}>
          <p style={{fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",opacity:0.5,marginBottom:12}}>
            Preview
          </p>
          <div style={{
            display:"grid",
            gridTemplateColumns:`repeat(${Math.min(stats.length,5)},1fr)`,
            gap:8,
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                border:"3px solid #0B1957", background:"#F8F3EA",
                boxShadow:"4px 4px 0 #0B1957", padding:"14px 10px",
                display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center",
              }}>
                <div style={{color:"#0B1957",marginBottom:6}}>{getIconNode(stat.icon_key)}</div>
                <span style={{fontWeight:900,fontSize:20,color:"#0B1957",lineHeight:1,marginBottom:4}}>
                  {stat.value || "–"}
                </span>
                <span style={{fontWeight:800,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",opacity:0.6}}>
                  {stat.label || "Label"}
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
const TABS: { key: TabKey; label: string }[] = [
  { key:"hero",         label:"Hero / Bio"     },
  { key:"capabilities", label:"Capabilities"   },
  { key:"experience",   label:"Experience"     },
  { key:"casestudies",  label:"Case Studies"   },
  { key:"availability", label:"Availability"   },
  { key:"stats",        label:"By the Numbers" },
];

export default function AboutManager() {
  const [activeTab, setActiveTab] = useState<TabKey>("hero");
  const [toastMsg,  setToastMsg]  = useState<{msg:string;type:"ok"|"err"}|null>(null);

  const toast = (msg:string, type:"ok"|"err") => setToastMsg({msg,type});

  return (
    <>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {toastMsg && <Toast msg={toastMsg.msg} type={toastMsg.type} onDone={()=>setToastMsg(null)} />}

      <div style={{maxWidth:800}}>
        <h2 style={{fontWeight:900,fontSize:22,textTransform:"uppercase",color:"#0B1957",letterSpacing:"0.08em",marginBottom:20}}>
          About Page Manager
        </h2>

        {/* Tab bar */}
        <div style={{display:"flex",borderBottom:"4px solid #0B1957",marginBottom:24,overflowX:"auto"}}>
          {TABS.map(tab=>(
            <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
              style={{
                flexShrink:0, padding:"10px 18px",fontWeight:900,fontSize:11,textTransform:"uppercase",
                letterSpacing:"0.08em", cursor:"pointer",fontFamily:"inherit",border:"none",
                borderBottom: activeTab===tab.key ? "4px solid #9ECCFA" : "4px solid transparent",
                marginBottom: activeTab===tab.key ? -4 : 0,
                background:   activeTab===tab.key ? "#0B1957" : "#F8F3EA",
                color:        activeTab===tab.key ? "#9ECCFA" : "#0B1957",
                transition:"background 0.12s,color 0.12s",
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div key={activeTab} style={{animation:"slideUp 0.25s cubic-bezier(0.16,1,0.3,1)"}}>
          {activeTab === "hero"         && <HeroTab         toast={toast} />}
          {activeTab === "capabilities" && <CapabilitiesTab toast={toast} />}
          {activeTab === "experience"   && <ExperienceTab   toast={toast} />}
          {activeTab === "casestudies"  && <CaseStudiesTab  toast={toast} />}
          {activeTab === "availability" && <AvailabilityTab toast={toast} />}
          {activeTab === "stats"        && <StatsTab        toast={toast} />}
        </div>
      </div>
    </>
  );
}