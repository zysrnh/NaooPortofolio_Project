import { useState, useEffect } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconGlobe    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
const IconLayers   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IconLock     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const IconExternal = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IconEye      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

// ── Types ─────────────────────────────────────────────────────────────────────
interface TSItem { id: number; name: string; icon: string; category: string; is_visible: boolean; }

const FALLBACK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3C/svg%3E";

function getCsrfToken(): string {
  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  if (meta?.content) return meta.content;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

// ── TechStackVisibility ───────────────────────────────────────────────────────
function TechStackVisibility() {
  const [stacks,    setStacks]    = useState<TSItem[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [toggling,  setToggling]  = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [toast,     setToast]     = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2500);
  };

  // Fetch SEMUA stack (bukan hanya visible)
  useEffect(() => {
    fetch("/api/tech-stacks")
      .then(r => r.json())
      .then(data => { setStacks(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(stacks.map(s => s.category)));
  useEffect(() => { setActiveTab(0); }, [categories.length]);

  const switchTab = (i: number) => {
    if (i === activeTab) return;
    setAnimating(true);
    setTimeout(() => { setActiveTab(i); setAnimating(false); }, 150);
  };

  const handleToggle = async (stack: TSItem) => {
    setToggling(stack.id);
    try {
      const res = await fetch(`/api/tech-stacks/${stack.id}/toggle`, {
        method: "PATCH",
        headers: { "X-CSRF-TOKEN": getCsrfToken() },
      });
      const updated = await res.json();
      if (updated?.id) {
        setStacks(prev => prev.map(s => s.id === stack.id ? updated : s));
        showToast(`"${stack.name}" ${updated.is_visible ? "ditampilkan" : "disembunyikan"}`);
      }
    } catch {
      showToast("Gagal update!", false);
    } finally {
      setToggling(null);
    }
  };

  const currentTechs = stacks.filter(s => s.category === categories[activeTab]);
  const visibleCount  = stacks.filter(s => s.is_visible).length;

  return (
    <div>
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="border-4 border-[#0B1957] bg-[#9ECCFA] text-[#0B1957] font-black text-xs px-3 py-1.5 uppercase tracking-widest">
            {visibleCount} Tampil
          </span>
          <span className="border-4 border-[#0B1957] bg-[#F8F3EA] text-[#0B1957] font-black text-xs px-3 py-1.5 uppercase tracking-widest">
            {stacks.length - visibleCount} Disembunyikan
          </span>
        </div>
        <p className="font-semibold text-xs text-[#0B1957] opacity-50 uppercase tracking-wide hidden sm:block">
          Klik chip untuk toggle tampil/sembunyi
        </p>
      </div>

      {/* Card */}
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[8px_8px_0_#0B1957] overflow-hidden">

        {/* Tabs per kategori */}
        {!loading && categories.length > 0 && (
          <div className="flex border-b-4 border-[#0B1957] overflow-x-auto">
            {categories.map((cat, i) => {
              const catVisible = stacks.filter(s => s.category === cat && s.is_visible).length;
              const catTotal   = stacks.filter(s => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => switchTab(i)}
                  className={`flex-shrink-0 flex-1 py-3 px-4 font-black uppercase text-xs tracking-wider border-r-4 border-[#0B1957] last:border-r-0 transition-all duration-150 whitespace-nowrap
                    ${activeTab === i ? "bg-[#0B1957] text-[#9ECCFA]" : "bg-[#F8F3EA] text-[#0B1957] hover:bg-[#D1E8FF]"}`}
                >
                  {cat}
                  <span className={`ml-2 text-[10px] font-black ${activeTab === i ? "text-[#9ECCFA] opacity-70" : "opacity-40"}`}>
                    {catVisible}/{catTotal}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Chips */}
        <div
          className="p-6 sm:p-8 min-h-[160px] flex flex-wrap gap-3 items-start content-start"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)", transition: "opacity 0.15s ease, transform 0.15s ease" }}
        >
          {/* Loading skeleton */}
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ display:"inline-flex", alignItems:"center", gap:8, border:"3px solid #0B1957", padding:"7px 10px 7px 7px", background:"#D1E8FF", opacity:0.5 }}>
              <div style={{ width:26, height:26, background:"#9ECCFA", border:"2px solid #0B1957" }} />
              <span style={{ minWidth:60, background:"#9ECCFA", color:"transparent" }}>___</span>
            </div>
          ))}

          {/* Empty — belum ada stack sama sekali */}
          {!loading && stacks.length === 0 && (
            <p className="font-bold text-xs uppercase text-[#0B1957] opacity-40 tracking-widest self-center w-full text-center py-8">
              Belum ada tech stack — tambahkan dulu di menu Tech Stack
            </p>
          )}

          {/* Chips toggle */}
          {!loading && currentTechs.map(tech => {
            const isTogglingThis = toggling === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => !isTogglingThis && handleToggle(tech)}
                disabled={isTogglingThis}
                title={tech.is_visible ? "Klik untuk sembunyikan" : "Klik untuk tampilkan"}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: `3px ${tech.is_visible ? "solid" : "dashed"} #0B1957`,
                  padding: "7px 10px 7px 7px",
                  background: tech.is_visible ? "#F8F3EA" : "transparent",
                  opacity: isTogglingThis ? 0.5 : tech.is_visible ? 1 : 0.45,
                  boxShadow: tech.is_visible ? "3px 3px 0 #0B1957" : "none",
                  cursor: isTogglingThis ? "wait" : "pointer",
                  fontFamily: "inherit", fontWeight: 800, fontSize: 11,
                  textTransform: "uppercase", letterSpacing: "0.06em", color: "#0B1957",
                  transition: "all 0.12s ease",
                }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  style={{ width:26, height:26, objectFit:"cover", border:"2px solid #0B1957", flexShrink:0 }}
                  onError={e => { (e.target as HTMLImageElement).src = FALLBACK_ICON; }}
                />
                <span>{tech.name}</span>
                <span style={{ display:"flex", alignItems:"center", marginLeft:2, opacity:0.6 }}>
                  {isTogglingThis
                    ? <span style={{ animation:"spin 0.6s linear infinite", display:"inline-block" }}>⟳</span>
                    : tech.is_visible ? <IconEye /> : <IconEyeOff />
                  }
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer legend */}
        <div className="border-t-4 border-[#0B1957] bg-[#0B1957] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 border-2 border-[#9ECCFA] bg-[#9ECCFA]" />
              <span className="font-black text-[10px] text-[#9ECCFA] uppercase tracking-widest">Tampil di homepage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 border-2 border-[#9ECCFA] bg-transparent" />
              <span className="font-black text-[10px] text-[#9ECCFA] opacity-60 uppercase tracking-widest">Disembunyikan</span>
            </div>
          </div>
          <span className="font-bold text-[10px] text-[#D1E8FF] opacity-50 uppercase tracking-widest hidden sm:block">
            Perubahan langsung tersimpan
          </span>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 z-[999] flex items-center gap-3 border-4 border-[#0B1957] px-5 py-3 font-black uppercase text-sm tracking-wide shadow-[6px_6px_0_#0B1957] ${toast.ok ? "bg-[#9ECCFA] text-[#0B1957]" : "bg-red-500 text-white"}`}
          style={{ transform: "translateX(-50%)" }}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ── Section config ────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    key:         "techstack",
    label:       "Tech Stack",
    icon:        <IconLayers />,
    description: "Kelola tech stack yang tampil di section Tech Stack homepage",
    status:      "active",
    component:   <TechStackVisibility />,  // ← pakai TechStackVisibility, bukan TechStackCRUD!
  },
  {
    key:         "hero",
    label:       "Hero Section",
    icon:        <IconGlobe />,
    description: "Edit nama, bio, dan foto di hero section",
    status:      "soon",
    component:   null,
  },
  {
    key:         "projects",
    label:       "Projects",
    icon:        <IconGlobe />,
    description: "Kelola daftar project yang tampil di homepage",
    status:      "soon",
    component:   null,
  },
  {
    key:         "about",
    label:       "About",
    icon:        <IconGlobe />,
    description: "Edit konten section About",
    status:      "soon",
    component:   null,
  },
];

// ── HomepageManager ───────────────────────────────────────────────────────────
export default function HomepageManager() {
  const [activeSection, setActiveSection] = useState("techstack");
  const current = SECTIONS.find(s => s.key === activeSection)!;

  return (
    <>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes spin    { to { transform: rotate(360deg); } }

        .hm-anim-0 { animation: slideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .hm-anim-1 { animation: slideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .hm-anim-2 { animation: slideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.20s both; }
        .hm-content-fade { animation: fadeIn 0.25s ease both; }

        .hm-section-btn {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px 16px; border: 3px solid #0B1957;
          background: #F8F3EA; cursor: pointer; font-family: inherit;
          text-align: left; box-shadow: 3px 3px 0 #0B1957; width: 100%;
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
        }
        .hm-section-btn:hover:not(:disabled) { background: #D1E8FF; transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #0B1957; }
        .hm-section-btn.active { background: #0B1957; transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #9ECCFA; }
        .hm-section-btn:disabled { cursor: not-allowed; opacity: 0.55; }
      `}</style>

      {/* Header */}
      <div className="hm-anim-0 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-[0.3em] mb-1">Kelola</p>
            <h2 className="font-black text-2xl uppercase text-[#0B1957]">Homepage</h2>
            <p className="font-semibold text-xs text-[#0B1957] opacity-60 mt-1">
              Manage konten yang tampil di halaman utama portfolio
            </p>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 border-4 border-[#0B1957] px-4 py-2 font-black text-xs uppercase bg-[#F8F3EA] text-[#0B1957] shadow-[3px_3px_0_#0B1957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#0B1957] transition-all">
            <IconExternal /> Preview Homepage
          </a>
        </div>
      </div>

      {/* Layout */}
      <div className="hm-anim-1 flex gap-5 flex-col lg:flex-row">

        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <p className="font-black text-xs uppercase tracking-widest text-[#0B1957] opacity-50 mb-3 px-1">Sections</p>
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
            {SECTIONS.map(section => {
              const isActive = activeSection === section.key;
              const isSoon   = section.status === "soon";
              return (
                <button
                  key={section.key}
                  disabled={isSoon}
                  className={`hm-section-btn flex-shrink-0 ${isActive ? "active" : ""}`}
                  onClick={() => !isSoon && setActiveSection(section.key)}
                >
                  <div className={`mt-0.5 flex-shrink-0 ${isActive ? "text-[#9ECCFA]" : "text-[#0B1957]"}`}>
                    {section.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-black text-xs uppercase tracking-wide leading-tight ${isActive ? "text-[#9ECCFA]" : "text-[#0B1957]"}`}>
                        {section.label}
                      </span>
                      {isSoon && (
                        <span className="flex items-center gap-1 border border-current px-1.5 py-0.5 font-black text-[9px] uppercase tracking-wide opacity-60 text-[#0B1957]">
                          <IconLock /> Soon
                        </span>
                      )}
                    </div>
                    <p className={`font-semibold text-[10px] leading-snug mt-0.5 hidden lg:block ${isActive ? "text-[#D1E8FF]" : "text-[#0B1957] opacity-50"}`}>
                      {section.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="hm-anim-2 flex items-center gap-2 mb-5">
            <span className="font-black text-xs uppercase tracking-widest text-[#0B1957] opacity-40">Homepage</span>
            <span className="font-black text-xs text-[#0B1957] opacity-30">/</span>
            <span className="font-black text-xs uppercase tracking-widest text-[#0B1957]">{current.label}</span>
            {current.status === "active" && (
              <span className="ml-1 border-2 border-[#0B1957] bg-[#9ECCFA] px-2 py-0.5 font-black text-[9px] uppercase tracking-wide text-[#0B1957]">
                Live
              </span>
            )}
          </div>

          <div key={activeSection} className="hm-content-fade">
            {current.component ?? (
              <div className="border-4 border-dashed border-[#0B1957] bg-[#F8F3EA] p-12 text-center">
                <div className="text-[#0B1957] opacity-20 flex justify-center mb-4"><IconLock /></div>
                <p className="font-black uppercase text-lg text-[#0B1957] mb-2">Coming Soon</p>
                <p className="font-semibold text-sm text-[#0B1957] opacity-50">
                  Section <span className="font-black opacity-80">"{current.label}"</span> belum tersedia
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}