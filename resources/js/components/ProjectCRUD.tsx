import { useState, useEffect, useRef } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconPlus    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconEdit    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconTrash   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>;
const IconEye     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const IconClose   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconImg     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconSave    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconCheck   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconSpinner = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.7s linear infinite" }}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
    <path d="M12 2a10 10 0 0110 10"/>
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface TechStackOption { id: number; name: string; icon: string; category: string; }
interface Feature         { title: string; desc: string; }
interface ProjectData {
  title:          string;
  subtitle:       string;
  desc:           string;
  long_desc:      string;
  status:         "Hosted" | "In Progress" | "Planning";
  date:           string;
  duration:       string;
  images:         string[];
  tech_stack_ids: number[];
  features:       Feature[];
  demo_url:       string;
  github_url:     string;
  order:          number;
  visible:        boolean;
}
interface ProjectRow {
  id:             number;
  slug:           string;
  title:          string;
  subtitle:       string;
  desc:           string;
  longDesc:       string;
  status:         string;
  date:           string;
  duration:       string;
  images:         string[];
  stacks:         { id: number; label: string; icon: string }[];
  tech_stack_ids: number[];
  features:       Feature[];
  demoUrl:        string | null;
  githubUrl:      string | null;
  order:          number;
  visible:        boolean;
}

const EMPTY_FORM: ProjectData = {
  title: "", subtitle: "", desc: "", long_desc: "",
  status: "Planning", date: "", duration: "",
  images: [], tech_stack_ids: [], features: [],
  demo_url: "", github_url: "", order: 0, visible: true,
};

const STATUS_OPTS = ["Hosted", "In Progress", "Planning"] as const;

// ── CSRF Helper ───────────────────────────────────────────────────────────────
const getCsrf = (): string =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? "";

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }: { msg: string; type: "ok" | "err"; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position:"fixed", bottom:24, right:24, zIndex:300,
      border:"4px solid #0B1957",
      background: type==="ok" ? "#9ECCFA" : "#FFD1D1",
      boxShadow:"5px 5px 0 #0B1957",
      padding:"12px 20px",
      display:"flex", alignItems:"center", gap:10,
      animation:"toastIn 0.4s cubic-bezier(0.16,1,0.3,1)",
      maxWidth:320,
    }}>
      <span style={{ color:"#0B1957" }}>{type==="ok" ? <IconCheck /> : "✕"}</span>
      <span style={{ fontWeight:800, fontSize:13, textTransform:"uppercase", letterSpacing:"0.05em", color:"#0B1957" }}>{msg}</span>
    </div>
  );
}

// ── ConfirmModal ──────────────────────────────────────────────────────────────
function ConfirmModal({ msg, onConfirm, onCancel }: { msg: string; onConfirm:()=>void; onCancel:()=>void }) {
  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(11,25,87,0.65)", zIndex:200,
      display:"flex", alignItems:"center", justifyContent:"center",
      backdropFilter:"blur(4px)",
      animation:"fadeIn 0.2s ease",
    }}>
      <div style={{
        background:"#F8F3EA", border:"4px solid #0B1957",
        boxShadow:"10px 10px 0 #0B1957",
        padding:32, maxWidth:380, width:"90%",
        animation:"modalIn 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <p style={{ fontWeight:900, fontSize:14, textTransform:"uppercase", color:"#0B1957", marginBottom:20, lineHeight:1.5 }}>{msg}</p>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={onConfirm} style={{ flex:1 }} className="pc-btn pc-btn-danger">Ya, Hapus</button>
          <button onClick={onCancel}  style={{ flex:1 }} className="pc-btn pc-btn-outline">Batal</button>
        </div>
      </div>
    </div>
  );
}

// ── ProjectRow animated card ──────────────────────────────────────────────────
function ProjectCard({
  p, index, onToggle, onEdit, onDelete,
}: {
  p: ProjectRow;
  index: number;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), index * 60);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className="pc-row"
      style={{
        padding:"18px 22px",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ display:"flex", alignItems:"flex-start", gap:16, flexWrap:"wrap" }}>
        {/* Thumb */}
        {p.images?.[0] && (
          <div style={{
            width:72, height:56,
            border:"3px solid #0B1957",
            overflow:"hidden", flexShrink:0,
            boxShadow:"3px 3px 0 #0B1957",
            transition:"transform 0.3s ease, box-shadow 0.3s ease",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translate(-2px,-2px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "5px 5px 0 #9ECCFA, 7px 7px 0 #0B1957";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0 #0B1957";
            }}
          >
            <img src={p.images[0]} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = ""; }}
            />
          </div>
        )}

        {/* Info */}
        <div style={{ flex:1, minWidth:180 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
            <span style={{ fontWeight:900, fontSize:14, textTransform:"uppercase", color:"#0B1957" }}>{p.title}</span>
            <span style={{
              border:"2px solid #0B1957", padding:"2px 8px",
              fontSize:10, fontWeight:900, textTransform:"uppercase",
              background: p.status==="Hosted" ? "#9ECCFA" : p.status==="In Progress" ? "#FFE8A0" : "#F8F3EA",
              color:"#0B1957",
              transition:"transform 0.15s ease",
            }}>{p.status}</span>
            {!p.visible && (
              <span style={{
                border:"2px solid #0B1957", padding:"2px 8px",
                fontSize:10, fontWeight:900,
                background:"#F8F3EA", color:"#0B1957",
                textTransform:"uppercase", opacity:0.5,
              }}>Hidden</span>
            )}
          </div>
          <p style={{ fontWeight:600, fontSize:12, color:"#0B1957", opacity:0.6, margin:"0 0 8px", lineHeight:1.4 }}>{p.desc}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {p.stacks?.map((s, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:4,
                border:"2px solid #0B1957", padding:"2px 7px",
                background:"#D1E8FF",
                transition:"transform 0.15s ease, box-shadow 0.15s ease",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translate(-1px,-1px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "2px 2px 0 #0B1957";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                }}
              >
                <img src={s.icon} alt={s.label} style={{ width:14, height:14, objectFit:"cover" }} />
                <span style={{ fontWeight:800, fontSize:10, textTransform:"uppercase", color:"#0B1957" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <p style={{ fontWeight:800, fontSize:11, color:"#0B1957", opacity:0.5, textTransform:"uppercase", margin:"0 0 2px" }}>{p.date}</p>
          <p style={{ fontWeight:800, fontSize:11, color:"#0B1957", opacity:0.5, textTransform:"uppercase", margin:0 }}>{p.duration}</p>
        </div>

        {/* Actions */}
        <div style={{ display:"flex", gap:8, flexShrink:0 }}>
          <button className="pc-btn pc-btn-outline pc-btn-sm" onClick={onToggle} title={p.visible?"Sembunyikan":"Tampilkan"}>
            {p.visible ? <IconEye /> : <IconEyeOff />}
          </button>
          <button className="pc-btn pc-btn-outline pc-btn-sm" onClick={onEdit}><IconEdit /></button>
          <button className="pc-btn pc-btn-danger  pc-btn-sm" onClick={onDelete}><IconTrash /></button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ProjectCRUD() {
  const [projects,   setProjects]   = useState<ProjectRow[]>([]);
  const [techStacks, setTechStacks] = useState<TechStackOption[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editTarget, setEditTarget] = useState<ProjectRow | null>(null);
  const [form,       setForm]       = useState<ProjectData>(EMPTY_FORM);
  const [saving,     setSaving]     = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [deleteId,   setDeleteId]   = useState<number | null>(null);
  const [toast,      setToast]      = useState<{ msg:string; type:"ok"|"err" } | null>(null);
  const [errors,     setErrors]     = useState<Record<string,string>>({});
  const [headerIn,   setHeaderIn]   = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type:"ok"|"err"="ok") => setToast({ msg, type });

  useEffect(() => {
    const t = setTimeout(() => setHeaderIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  // fetch
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pr, ts] = await Promise.all([
        fetch("/api/admin/projects").then(r => r.json()),
        fetch("/api/tech-stacks").then(r => r.json()),
      ]);
      setProjects(Array.isArray(pr) ? pr : []);
      setTechStacks(Array.isArray(ts) ? ts : []);
    } catch { showToast("Gagal load data", "err"); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  // modal
  const openAdd = () => { setEditTarget(null); setForm(EMPTY_FORM); setErrors({}); setModalOpen(true); };
  const openEdit = (p: ProjectRow) => {
    setEditTarget(p);
    setForm({
      title:p.title, subtitle:p.subtitle, desc:p.desc, long_desc:p.longDesc,
      status:p.status as ProjectData["status"], date:p.date, duration:p.duration,
      images:p.images??[], tech_stack_ids:p.tech_stack_ids??[],
      features:p.features??[], demo_url:p.demoUrl??"",
      github_url:p.githubUrl??"", order:p.order, visible:p.visible,
    });
    setErrors({});
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  // upload image
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append("image", file);
    try {
      const r = await fetch("/api/admin/projects/upload-image", {
        method: "POST",
        headers: { "X-CSRF-TOKEN": getCsrf() },
        body: fd,
      });
      const d = await r.json();
      if (d.url) { setForm(f => ({ ...f, images:[...f.images, d.url] })); showToast("Gambar diupload"); }
      else showToast("Upload gagal","err");
    } catch { showToast("Upload gagal","err"); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value=""; }
  };

  // features
  const addFeature    = () => setForm(f => ({ ...f, features:[...f.features,{title:"",desc:""}] }));
  const removeFeature = (i:number) => setForm(f => ({ ...f, features:f.features.filter((_,j)=>j!==i) }));
  const setFeature    = (i:number, k:"title"|"desc", v:string) => setForm(f => {
    const ft=[...f.features]; ft[i]={...ft[i],[k]:v}; return {...f,features:ft};
  });

  // stack toggle
  const toggleStack = (id:number) => setForm(f => ({
    ...f,
    tech_stack_ids: f.tech_stack_ids.includes(id)
      ? f.tech_stack_ids.filter(x=>x!==id)
      : [...f.tech_stack_ids,id],
  }));

  // validate
  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.title.trim())     e.title     = "Wajib diisi";
    if (!form.subtitle.trim())  e.subtitle  = "Wajib diisi";
    if (!form.desc.trim())      e.desc      = "Wajib diisi";
    if (!form.long_desc.trim()) e.long_desc = "Wajib diisi";
    if (!form.date.trim())      e.date      = "Wajib diisi";
    if (!form.duration.trim())  e.duration  = "Wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // save
  const handleSave = async () => {
    if (!validate()) {
      // shake the modal body on error
      const body = document.querySelector(".pc-modal-box") as HTMLElement | null;
      if (body) {
        body.classList.remove("pc-shake");
        void body.offsetWidth; // reflow
        body.classList.add("pc-shake");
      }
      return;
    }
    setSaving(true);
    try {
      const isEdit = !!editTarget;
      const url    = isEdit ? `/api/admin/projects/${editTarget!.id}` : "/api/admin/projects";
      const r = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-TOKEN": getCsrf(),
        },
        body: JSON.stringify({ ...form, demo_url:form.demo_url||null, github_url:form.github_url||null }),
      });
      if (!r.ok) {
        const d = await r.json();
        if (d.errors) setErrors(Object.fromEntries(Object.entries(d.errors).map(([k,v])=>[k,(v as string[])[0]])));
        else showToast(d.message||"Gagal menyimpan","err");
        return;
      }
      showToast(isEdit ? "Project diupdate" : "Project ditambah");
      closeModal(); fetchAll();
    } catch { showToast("Terjadi kesalahan","err"); }
    finally { setSaving(false); }
  };

  // delete
  const handleDelete = async (id:number) => {
    try {
      await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: { "X-CSRF-TOKEN": getCsrf() },
      });
      showToast("Project dihapus"); fetchAll();
    } catch { showToast("Gagal hapus","err"); }
    finally { setDeleteId(null); }
  };

  // toggle
  const handleToggle = async (id:number) => {
    try {
      const r = await fetch(`/api/admin/projects/${id}/toggle`, {
        method: "PATCH",
        headers: { "X-CSRF-TOKEN": getCsrf() },
      });
      const d = await r.json();
      setProjects(ps => ps.map(p => p.id===id ? {...p,visible:d.visible} : p));
    } catch { showToast("Gagal toggle","err"); }
  };

  const stacksByCategory = techStacks.reduce<Record<string,TechStackOption[]>>((acc,s) => {
    if(!acc[s.category]) acc[s.category]=[];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes toastIn { from { opacity:0; transform:translateY(16px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes modalIn { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes overlayIn { from { opacity:0; } to { opacity:1; } }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* ── Buttons ── */
        .pc-btn {
          display:inline-flex; align-items:center; gap:6px;
          border:3px solid #0B1957; padding:8px 16px;
          font-weight:900; font-size:12px; text-transform:uppercase;
          letter-spacing:0.07em; cursor:pointer; font-family:inherit;
          box-shadow:3px 3px 0 #0B1957;
          transition:transform 0.1s ease, box-shadow 0.1s ease, background 0.12s ease;
          position: relative; overflow: hidden;
        }
        .pc-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .pc-btn:hover::after { opacity: 1; animation: shimmer 0.5s ease; }
        .pc-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 #0B1957; }
        .pc-btn:active { transform: translate(3px,3px); box-shadow: 0 0 0 #0B1957; }
        .pc-btn:disabled { opacity: 0.55; cursor: not-allowed; pointer-events: none; }
        .pc-btn-primary { background:#0B1957; color:#9ECCFA; }
        .pc-btn-outline { background:#F8F3EA; color:#0B1957; }
        .pc-btn-danger  { background:#FFD1D1; color:#0B1957; }
        .pc-btn-sm { padding:5px 10px; font-size:11px; box-shadow:2px 2px 0 #0B1957; }
        .pc-btn-sm:hover { transform:translate(1px,1px); box-shadow:1px 1px 0 #0B1957; }

        /* ── Inputs ── */
        .pc-input {
          width:100%; border:3px solid #0B1957;
          padding:9px 12px; font-weight:700; font-size:13px;
          color:#0B1957; background:#F8F3EA; outline:none;
          font-family:inherit;
          transition:box-shadow 0.15s ease, transform 0.12s ease, background 0.12s ease;
          box-sizing:border-box;
        }
        .pc-input:focus {
          box-shadow:4px 4px 0 #0B1957;
          transform:translate(-1px,-1px);
          background:#fff;
        }
        .pc-input.err   { background:#FFE8E8; border-color:#e53e3e; }
        .pc-input::placeholder { color:#0B195570; font-weight:600; }

        .pc-label { font-weight:900; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#0B1957; display:block; margin-bottom:5px; }
        .pc-err   { font-size:11px; font-weight:800; color:#0B1957; background:#FFD1D1; border:2px solid #0B1957; padding:2px 8px; display:inline-block; margin-top:4px; text-transform:uppercase; }

        /* ── Row card ── */
        .pc-row {
          border:4px solid #0B1957; background:#F8F3EA;
          box-shadow:5px 5px 0 #0B1957;
          transition:transform 0.18s cubic-bezier(0.16,1,0.3,1), box-shadow 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        .pc-row:hover {
          transform:translate(-3px,-3px);
          box-shadow:8px 8px 0 #9ECCFA, 10px 10px 0 #0B1957;
        }

        /* ── Chip ── */
        .pc-chip {
          display:inline-flex; align-items:center; gap:5px;
          border:2px solid #0B1957; padding:4px 8px;
          font-size:10px; font-weight:800; text-transform:uppercase;
          color:#0B1957; cursor:pointer;
          background:#F8F3EA; box-shadow:2px 2px 0 #0B1957;
          transition:transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease, color 0.12s ease;
        }
        .pc-chip:hover    { background:#D1E8FF; transform:translate(-1px,-1px); box-shadow:3px 3px 0 #0B1957; }
        .pc-chip.selected { background:#0B1957; color:#9ECCFA; }
        .pc-chip.selected:hover { background:#162580; transform:translate(-1px,-1px); }

        /* ── Thumb ── */
        .pc-thumb { position:relative; border:3px solid #0B1957; overflow:hidden; box-shadow:3px 3px 0 #0B1957; transition:transform 0.15s ease, box-shadow 0.15s ease; }
        .pc-thumb:hover { transform:translate(-2px,-2px); box-shadow:5px 5px 0 #0B1957; }
        .pc-thumb img { transition:transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .pc-thumb:hover img { transform:scale(1.08); }
        .pc-thumb-del {
          position:absolute; top:3px; right:3px;
          width:20px; height:20px;
          background:#0B1957; border:2px solid #9ECCFA; color:#9ECCFA;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; opacity:0;
          transition:opacity 0.15s ease, transform 0.15s ease;
        }
        .pc-thumb:hover .pc-thumb-del { opacity:1; }
        .pc-thumb-del:hover { transform:scale(1.1); }

        /* ── Modal ── */
        .pc-modal-overlay {
          position:fixed; inset:0; background:rgba(11,25,87,0.7); z-index:100;
          display:flex; align-items:flex-start; justify-content:center;
          overflow-y:auto; padding:32px 16px;
          backdrop-filter:blur(5px);
          animation:overlayIn 0.25s ease;
        }
        .pc-modal-box {
          background:#D1E8FF; border:4px solid #0B1957;
          box-shadow:14px 14px 0 #0B1957;
          width:100%; max-width:740px; flex-shrink:0;
          animation:modalIn 0.4s cubic-bezier(0.16,1,0.3,1);
          margin:auto;
        }

        /* ── Skeleton ── */
        .pc-skeleton {
          background: linear-gradient(90deg, #D1E8FF 25%, #b8daff 50%, #D1E8FF 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite, skeletonPulse 1.4s ease infinite;
          border: 3px solid #0B1957;
        }

        /* ── Upload zone hover ── */
        .pc-upload-zone {
          width:96px; height:68px;
          border:3px dashed #0B1957;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          cursor:pointer; gap:4px;
          transition:background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
        }
        .pc-upload-zone:hover {
          background:#D1E8FF;
          border-color:#0B1957;
          transform:translate(-1px,-1px);
        }

        /* ── Feature row ── */
        .pc-feature-row {
          border:3px solid #0B1957; padding:12px;
          background:#F8F3EA; box-shadow:3px 3px 0 #0B1957;
          display:flex; gap:10px; align-items:flex-start;
          transition:transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
          animation:modalIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .pc-feature-row:hover { background:#E8F4FF; transform:translate(-1px,-1px); box-shadow:4px 4px 0 #0B1957; }

        /* ── Modal field stagger ── */
        @keyframes fieldIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .pc-field {
          opacity:0;
          animation:fieldIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .pc-field:nth-child(1) { animation-delay:0.05s; }
        .pc-field:nth-child(2) { animation-delay:0.10s; }
        .pc-field:nth-child(3) { animation-delay:0.15s; }
        .pc-field:nth-child(4) { animation-delay:0.20s; }
        .pc-field:nth-child(5) { animation-delay:0.25s; }
        .pc-field:nth-child(6) { animation-delay:0.30s; }
        .pc-field:nth-child(7) { animation-delay:0.35s; }
        .pc-field:nth-child(8) { animation-delay:0.40s; }
        .pc-field:nth-child(9) { animation-delay:0.45s; }

        /* ── Modal progress bar ── */
        @keyframes progressGrow {
          from { width:0; }
          to   { width:100%; }
        }
        .pc-modal-progress {
          height:3px;
          background:linear-gradient(90deg, #9ECCFA, #D1E8FF, #9ECCFA);
          background-size:200% 100%;
          animation:progressGrow 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both,
                    shimmer 2s ease 0.6s infinite;
        }

        /* ── Error shake ── */
        @keyframes shake {
          0%,100%{ transform:translateX(0); }
          20%    { transform:translateX(-6px); }
          40%    { transform:translateX(6px); }
          60%    { transform:translateX(-4px); }
          80%    { transform:translateX(4px); }
        }
        .pc-shake { animation:shake 0.4s cubic-bezier(0.36,0.07,0.19,0.97); }
      `}</style>

      {/* ── Header ── */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        marginBottom:24, gap:12, flexWrap:"wrap",
        opacity: headerIn ? 1 : 0,
        transform: headerIn ? "translateY(0)" : "translateY(-16px)",
        transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div>
          <h2 style={{ fontWeight:900, fontSize:22, textTransform:"uppercase", color:"#0B1957", margin:0 }}>Projects</h2>
          <p style={{
            fontWeight:700, fontSize:12, color:"#0B1957", opacity:0.5,
            textTransform:"uppercase", letterSpacing:"0.1em", margin:"4px 0 0",
            transition:"opacity 0.3s ease",
          }}>
            {loading ? "Memuat..." : `${projects.length} total`}
          </p>
        </div>
        <button className="pc-btn pc-btn-primary" onClick={openAdd} style={{
          opacity: headerIn ? 1 : 0,
          transform: headerIn ? "translateX(0)" : "translateX(16px)",
          transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}>
          <IconPlus /> Tambah Project
        </button>
      </div>

      {/* ── List ── */}
      {loading ? (
        /* Skeleton loading */
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              border:"4px solid #0B1957", padding:"18px 22px",
              opacity: 0,
              animation: `modalIn 0.4s cubic-bezier(0.16,1,0.3,1) ${i*80}ms forwards`,
            }}>
              <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                <div className="pc-skeleton" style={{ width:72, height:56, flexShrink:0 }} />
                <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
                  <div className="pc-skeleton" style={{ height:16, width:"45%" }} />
                  <div className="pc-skeleton" style={{ height:12, width:"70%" }} />
                  <div style={{ display:"flex", gap:6 }}>
                    <div className="pc-skeleton" style={{ height:24, width:64 }} />
                    <div className="pc-skeleton" style={{ height:24, width:64 }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div style={{
          border:"4px dashed #0B1957", padding:"48px 24px", textAlign:"center",
          animation:"modalIn 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <p style={{ fontWeight:900, fontSize:13, textTransform:"uppercase", color:"#0B1957", opacity:0.4, margin:0 }}>
            Belum ada project — klik Tambah Project!
          </p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {projects.map((p, idx) => (
            <ProjectCard
              key={p.id}
              p={p}
              index={idx}
              onToggle={() => handleToggle(p.id)}
              onEdit={() => openEdit(p)}
              onDelete={() => setDeleteId(p.id)}
            />
          ))}
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId !== null && (
        <ConfirmModal
          msg="Yakin hapus project ini? Aksi tidak bisa dibatalkan."
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}

      {/* ── Modal ── */}
      {modalOpen && (
        <div className="pc-modal-overlay" onClick={e => { if(e.target===e.currentTarget) closeModal(); }}>
          <div className="pc-modal-box">

            {/* Modal Header */}
            <div style={{ background:"#0B1957", padding:"20px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontWeight:900, fontSize:11, textTransform:"uppercase", letterSpacing:"0.3em", color:"#9ECCFA", margin:"0 0 2px" }}>
                  {editTarget ? "Edit" : "Tambah"} Project
                </p>
                <h3 style={{ fontWeight:900, fontSize:20, textTransform:"uppercase", color:"#F8F3EA", margin:0 }}>
                  {editTarget ? editTarget.title : "Project Baru"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                style={{
                  border:"3px solid #9ECCFA", background:"transparent", color:"#9ECCFA",
                  width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer",
                  transition:"transform 0.15s ease, background 0.15s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(158,204,250,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "rotate(90deg)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0deg)";
                }}
              >
                <IconClose />
              </button>
            </div>
            {/* Progress bar */}
            <div className="pc-modal-progress" />

            {/* Modal Body */}
            <div style={{ padding:"24px 28px", display:"flex", flexDirection:"column", gap:20, maxHeight:"72vh", overflowY:"auto" }}>

              {/* Title & Subtitle */}
              <div className="pc-field" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div>
                  <label className="pc-label">Title *</label>
                  <input className={`pc-input${errors.title?" err":""}`} placeholder="Nama project..." value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
                  {errors.title && <span className="pc-err">{errors.title}</span>}
                </div>
                <div>
                  <label className="pc-label">Subtitle *</label>
                  <input className={`pc-input${errors.subtitle?" err":""}`} placeholder="Kalimat singkat..." value={form.subtitle} onChange={e=>setForm(f=>({...f,subtitle:e.target.value}))} />
                  {errors.subtitle && <span className="pc-err">{errors.subtitle}</span>}
                </div>
              </div>

              {/* Desc */}
              <div className="pc-field">
                <label className="pc-label">Deskripsi Singkat * <span style={{ opacity:0.5, fontWeight:700, textTransform:"none" }}>(tampil di card)</span></label>
                <input className={`pc-input${errors.desc?" err":""}`} placeholder="Tampil di card project..." value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} />
                {errors.desc && <span className="pc-err">{errors.desc}</span>}
              </div>

              {/* Long Desc */}
              <div className="pc-field">
                <label className="pc-label">Deskripsi Lengkap * <span style={{ opacity:0.5, fontWeight:700, textTransform:"none" }}>(halaman detail)</span></label>
                <textarea className={`pc-input${errors.long_desc?" err":""}`} placeholder="Penjelasan panjang project..." value={form.long_desc} onChange={e=>setForm(f=>({...f,long_desc:e.target.value}))} rows={4} style={{ resize:"vertical" }} />
                {errors.long_desc && <span className="pc-err">{errors.long_desc}</span>}
              </div>

              {/* Status / Date / Duration */}
              <div className="pc-field" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
                <div>
                  <label className="pc-label">Status *</label>
                  <select className="pc-input" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value as ProjectData["status"]}))}>
                    {STATUS_OPTS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="pc-label">Tanggal *</label>
                  <input className={`pc-input${errors.date?" err":""}`} placeholder="Jan 2025" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} />
                  {errors.date && <span className="pc-err">{errors.date}</span>}
                </div>
                <div>
                  <label className="pc-label">Durasi *</label>
                  <input className={`pc-input${errors.duration?" err":""}`} placeholder="3 Bulan" value={form.duration} onChange={e=>setForm(f=>({...f,duration:e.target.value}))} />
                  {errors.duration && <span className="pc-err">{errors.duration}</span>}
                </div>
              </div>

              {/* URLs */}
              <div className="pc-field" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div>
                  <label className="pc-label">Demo URL</label>
                  <input className="pc-input" placeholder="https://..." value={form.demo_url} onChange={e=>setForm(f=>({...f,demo_url:e.target.value}))} />
                </div>
                <div>
                  <label className="pc-label">GitHub URL</label>
                  <input className="pc-input" placeholder="https://github.com/..." value={form.github_url} onChange={e=>setForm(f=>({...f,github_url:e.target.value}))} />
                </div>
              </div>

              {/* Order & Visible */}
              <div className="pc-field" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, alignItems:"center" }}>
                <div>
                  <label className="pc-label">Order (urutan)</label>
                  <input className="pc-input" type="number" value={form.order} onChange={e=>setForm(f=>({...f,order:Number(e.target.value)}))} />
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:22 }}>
                  <div
                    onClick={() => setForm(f=>({...f,visible:!f.visible}))}
                    style={{
                      width:44, height:26, border:"3px solid #0B1957",
                      background: form.visible ? "#0B1957" : "#F8F3EA",
                      cursor:"pointer", position:"relative",
                      transition:"background 0.2s ease",
                      boxShadow:"2px 2px 0 #0B1957", flexShrink:0,
                    }}
                  >
                    <div style={{
                      position:"absolute", top:3,
                      left: form.visible ? 20 : 3,
                      width:14, height:14,
                      background: form.visible ? "#9ECCFA" : "#0B1957",
                      transition:"left 0.2s cubic-bezier(0.16,1,0.3,1), background 0.2s ease",
                    }} />
                  </div>
                  <span style={{ fontWeight:900, fontSize:12, textTransform:"uppercase", color:"#0B1957" }}>
                    {form.visible ? "Visible" : "Hidden"}
                  </span>
                </div>
              </div>

              {/* Tech Stacks */}
              <div className="pc-field">
                <label className="pc-label">Tech Stack <span style={{ opacity:0.5, fontWeight:700, textTransform:"none" }}>(dari tabel TechStack)</span></label>
                {Object.keys(stacksByCategory).length === 0 ? (
                  <p style={{ fontWeight:700, fontSize:12, color:"#0B1957", opacity:0.5, margin:0 }}>Belum ada tech stack tersedia.</p>
                ) : (
                  <div style={{ background:"#F8F3EA", border:"3px solid #0B1957", padding:14, display:"flex", flexDirection:"column", gap:14 }}>
                    {Object.entries(stacksByCategory).map(([cat, stacks]) => (
                      <div key={cat}>
                        <p style={{ fontWeight:900, fontSize:10, textTransform:"uppercase", color:"#0B1957", opacity:0.5, letterSpacing:"0.1em", margin:"0 0 8px" }}>{cat}</p>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                          {stacks.map(s => (
                            <div key={s.id} className={`pc-chip${form.tech_stack_ids.includes(s.id)?" selected":""}`} onClick={()=>toggleStack(s.id)}>
                              <img src={s.icon} alt={s.name} style={{ width:15, height:15, objectFit:"cover", border:"1px solid currentColor" }} />
                              {s.name}
                              {form.tech_stack_ids.includes(s.id) && <IconCheck />}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Images */}
              <div className="pc-field">
                <label className="pc-label">Gambar Project</label>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                  {form.images.map((img, idx) => (
                    <div key={idx} className="pc-thumb" style={{ width:96, height:68 }}>
                      <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      <div className="pc-thumb-del" onClick={() => setForm(f=>({...f,images:f.images.filter((_,i)=>i!==idx)}))}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                  <div
                    className="pc-upload-zone"
                    style={{ opacity: uploading ? 0.5 : 1 }}
                    onClick={() => !uploading && fileRef.current?.click()}
                  >
                    {uploading ? <IconSpinner /> : <IconImg />}
                    <span style={{ fontWeight:800, fontSize:9, textTransform:"uppercase", color:"#0B1957" }}>
                      {uploading ? "Uploading..." : "+ Upload"}
                    </span>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleUpload} />
                </div>
              </div>

              {/* Features */}
              <div className="pc-field">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                  <label className="pc-label" style={{ margin:0 }}>Fitur-Fitur</label>
                  <button className="pc-btn pc-btn-outline pc-btn-sm" onClick={addFeature}><IconPlus /> Tambah Fitur</button>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {form.features.length === 0 && (
                    <p style={{ fontWeight:700, fontSize:12, color:"#0B1957", opacity:0.4, textAlign:"center", padding:"12px 0", margin:0 }}>
                      Belum ada fitur
                    </p>
                  )}
                  {form.features.map((f, i) => (
                    <div key={i} className="pc-feature-row">
                      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
                        <input className="pc-input" placeholder="Nama fitur..." value={f.title} onChange={e=>setFeature(i,"title",e.target.value)} />
                        <input className="pc-input" placeholder="Deskripsi fitur..." value={f.desc} onChange={e=>setFeature(i,"desc",e.target.value)} />
                      </div>
                      <button className="pc-btn pc-btn-danger pc-btn-sm" onClick={()=>removeFeature(i)}><IconTrash /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding:"16px 28px", borderTop:"4px solid #0B1957", background:"#F8F3EA", display:"flex", gap:12, justifyContent:"flex-end" }}>
              <button className="pc-btn pc-btn-outline" onClick={closeModal} disabled={saving}>Batal</button>
              <button className="pc-btn pc-btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? <IconSpinner /> : <IconSave />}
                {saving ? "Menyimpan..." : (editTarget ? "Update Project" : "Simpan Project")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}