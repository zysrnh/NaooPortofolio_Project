import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import TechStackCRUD from "@/components/TechStackCRUD";

// ── SVG Icons ────────────────────────────────────────────────────────────────
const IconFolder    = ({ size = 20 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>;
const IconRocket    = ({ size = 20 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
const IconGear      = ({ size = 20 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const IconLayers    = ({ size = 20 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IconGrid      = ({ size = 18 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const IconUser      = ({ size = 18 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconLogOut    = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconHome      = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconClose     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconMenu      = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconArrow     = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconClock     = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9ECCFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconBriefcase = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9ECCFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>;
const IconGlobe     = ({ size = 18 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
const IconLock      = ({ size = 12 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const IconExternal  = ({ size = 12 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

// ── Types ────────────────────────────────────────────────────────────────────
interface Project { title: string; desc: string; status: string; stacks: string[]; date: string; }
interface Stat    { label: string; value: string; icon: JSX.Element; color: string; }

const PROJECTS: Project[] = [
  { title: "Burger Ordering App",  desc: "Website restoran burger dengan sistem pemesanan online", status: "Live",        stacks: ["Laravel", "React"],      date: "Jan 2025" },
  { title: "Beyblade Leaderboard", desc: "Leaderboard turnamen dengan statistik otomatis",         status: "Live",        stacks: ["JavaScript"],            date: "Mar 2025" },
  { title: "CV Generator Tool",    desc: "Generate CV massal dari Excel ke PDF",                   status: "In Progress", stacks: ["React", "TypeScript"],   date: "May 2025" },
  { title: "Dashboard Analytics",  desc: "Dashboard visualisasi data real-time",                   status: "Planning",    stacks: ["React", "TypeScript"],   date: "Jun 2025" },
  { title: "Inventory System",     desc: "Sistem manajemen stok dan inventaris berbasis web",      status: "Live",        stacks: ["Laravel", "JavaScript"], date: "Feb 2025" },
  { title: "E-Learning Platform",  desc: "Platform belajar online dengan kuis dan sertifikasi",   status: "In Progress", stacks: ["React", "Laravel"],      date: "Apr 2025" },
];

const STATS: Stat[] = [
  { label: "Total Projects", value: "6", icon: <IconFolder />, color: "#9ECCFA" },
  { label: "Live Projects",  value: "3", icon: <IconRocket />, color: "#9ECCFA" },
  { label: "In Progress",    value: "2", icon: <IconGear />,   color: "#D1E8FF" },
  { label: "Tech Stacks",    value: "8", icon: <IconLayers />, color: "#F8F3EA" },
];

const STATUS_STYLE: Record<string, string> = {
  "Live":        "bg-[#9ECCFA] border-[#0B1957] text-[#0B1957]",
  "In Progress": "bg-[#FFE8A0] border-[#0B1957] text-[#0B1957]",
  "Planning":    "bg-[#F8F3EA] border-[#0B1957] text-[#0B1957]",
};
// ── Nav Items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "overview",  label: "Overview",  icon: <IconGrid /> },
  { key: "projects",  label: "Projects",  icon: <IconFolder size={18} /> },
  { key: "stacks",    label: "Tech Stack", icon: <IconLayers size={18} /> },
  { key: "homepage",  label: "Homepage",  icon: <IconGlobe size={18} /> },
  { key: "profile",   label: "Profile",   icon: <IconUser /> },
];



// ── IconEye / IconEyeOff for toggle ──────────────────────────────────────────
const IconEye    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

// ── TechStackVisibility — preview + toggle ────────────────────────────────────
interface TSItem { id: number; name: string; icon: string; category: string; is_visible: boolean; }

const FALLBACK_ICON_DASH = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3C/svg%3E";

function getCsrfToken(): string {
  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  if (meta?.content) return meta.content;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function TechStackVisibility() {
  const [stacks,      setStacks]      = useState<TSItem[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [toggling,    setToggling]    = useState<number | null>(null);
  const [activeTab,   setActiveTab]   = useState(0);
  const [animating,   setAnimating]   = useState(false);
  const [toast,       setToast]       = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2500);
  };

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
  const visibleCount = stacks.filter(s => s.is_visible).length;

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

        {/* Tabs */}
        {!loading && categories.length > 0 && (
          <div className="flex border-b-4 border-[#0B1957] overflow-x-auto">
            {categories.map((cat, i) => {
              const catVisible = stacks.filter(s => s.category === cat && s.is_visible).length;
              const catTotal   = stacks.filter(s => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => switchTab(i)}
                  className={`flex-shrink-0 flex-1 py-3 px-3 sm:px-5 font-black uppercase text-xs tracking-wider border-r-4 border-[#0B1957] last:border-r-0 transition-all duration-150 whitespace-nowrap
                    ${activeTab === i ? "bg-[#0B1957] text-[#9ECCFA]" : "bg-[#F8F3EA] text-[#0B1957] hover:bg-[#D1E8FF]"}`}
                >
                  <span>{cat}</span>
                  <span className={`ml-2 text-[10px] font-black ${activeTab === i ? "text-[#9ECCFA] opacity-70" : "text-[#0B1957] opacity-40"}`}>
                    {catVisible}/{catTotal}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Chips area */}
        <div
          className="p-6 sm:p-8 min-h-[160px] flex flex-wrap gap-3 items-start content-start"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)", transition: "opacity 0.15s ease, transform 0.15s ease" }}
        >
          {/* Loading */}
          {loading && Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="ts-chip-skeleton" style={{ animationDelay: `${i * 0.08}s` }}>
              <div style={{ width: 26, height: 26, background: "#9ECCFA", border: "2px solid #0B1957", flexShrink: 0 }} />
              <span style={{ minWidth: 60, background: "#9ECCFA", borderRadius: 2, color: "transparent" }}>___</span>
            </div>
          ))}

          {/* Empty */}
          {!loading && categories.length === 0 && (
            <p className="font-bold text-xs uppercase text-[#0B1957] opacity-40 tracking-widest self-center w-full text-center py-8">
              Belum ada tech stack — tambahkan dulu di menu Tech Stack
            </p>
          )}

          {/* Chips */}
          {!loading && currentTechs.map(tech => {
            const isTogglingThis = toggling === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => !isTogglingThis && handleToggle(tech)}
                disabled={isTogglingThis}
                title={tech.is_visible ? "Klik untuk sembunyikan" : "Klik untuk tampilkan"}
                className={`ts-chip-toggle ${tech.is_visible ? "ts-chip-on" : "ts-chip-off"} ${isTogglingThis ? "ts-chip-loading" : ""}`}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  onError={e => { (e.target as HTMLImageElement).src = FALLBACK_ICON_DASH; }}
                />
                <span>{tech.name}</span>
                <span className="ts-chip-badge">
                  {isTogglingThis
                    ? <span style={{ animation: "spin 0.6s linear infinite", display: "inline-block" }}>⟳</span>
                    : tech.is_visible ? <IconEye /> : <IconEyeOff />
                  }
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="border-t-4 border-[#0B1957] bg-[#0B1957] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          className={`fixed bottom-6 left-1/2 z-[999] flex items-center gap-3 border-4 border-[#0B1957] px-5 py-3 font-black uppercase text-sm tracking-wide shadow-[6px_6px_0_#0B1957] ${toast.ok ? "bg-[#9ECCFA] text-[#0B1957]" : "bg-[#FF4444] text-white"}`}
          style={{ transform: "translateX(-50%)", animation: "hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ── HomepageManager Section Icons ────────────────────────────────────────────
const HmIconLayers  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const HmIconHero    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const HmIconFolder  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>;
const HmIconUser    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

// ── Homepage Section Config (with icons) ──────────────────────────────────────
const HOMEPAGE_SECTIONS_FULL = [
  {
    key:         "techstack",
    label:       "Tech Stack",
    icon:        <HmIconLayers />,
    description: "Kelola tech stack yang tampil di section Tech Stack homepage",
    status:      "active" as const,
  },
  {
    key:         "hero",
    label:       "Hero Section",
    icon:        <HmIconHero />,
    description: "Edit nama, bio, dan foto di hero section",
    status:      "soon" as const,
  },
  {
    key:         "projects",
    label:       "Projects",
    icon:        <HmIconFolder />,
    description: "Kelola daftar project yang tampil di homepage",
    status:      "soon" as const,
  },
  {
    key:         "about",
    label:       "About",
    icon:        <HmIconUser />,
    description: "Edit konten section About",
    status:      "soon" as const,
  },
];

// ── HomepageManager Component ─────────────────────────────────────────────────
function HomepageManager() {
  const [activeSection, setActiveSection] = useState("techstack");
  const current = HOMEPAGE_SECTIONS_FULL.find(s => s.key === activeSection)!;

  return (
    <>
      <style>{`
        @keyframes hmSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hmFadeIn  { from{opacity:0} to{opacity:1} }

        .hm-anim-0 { animation: hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .hm-anim-1 { animation: hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .hm-anim-2 { animation: hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.20s both; }
        .hm-content-fade { animation: hmFadeIn 0.25s ease both; }
      `}</style>

      {/* ── Header ── */}
      <div className="hm-anim-0 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-[0.3em] mb-1">Kelola</p>
            <h2 className="font-black text-2xl uppercase text-[#0B1957]">Homepage</h2>
            <p className="font-semibold text-xs text-[#0B1957] opacity-60 mt-1">
              Manage konten yang tampil di halaman utama portfolio
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-4 border-[#0B1957] px-4 py-2 font-black text-xs uppercase bg-[#F8F3EA] text-[#0B1957] shadow-[3px_3px_0_#0B1957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#0B1957] transition-all"
          >
            <IconExternal size={12} /> Preview Homepage
          </a>
        </div>
      </div>

      {/* ── Layout: Section Sidebar + Content ── */}
      <div className="hm-anim-1 flex gap-5 flex-col lg:flex-row">

        {/* Section Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <p className="font-black text-xs uppercase tracking-widest text-[#0B1957] opacity-50 mb-3 px-1">
            Sections
          </p>
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
            {HOMEPAGE_SECTIONS_FULL.map(section => {
              const isActive = activeSection === section.key;
              const isSoon   = section.status === "soon";
              return (
                <button
                  key={section.key}
                  disabled={isSoon}
                  className={`
                    hm-section-btn flex-shrink-0 text-left
                    ${isActive ? "hm-section-btn-active" : ""}
                    ${isSoon   ? "hm-section-btn-disabled" : ""}
                  `}
                  onClick={() => !isSoon && setActiveSection(section.key)}
                >
                  {/* Per-section icon */}
                  <div className={`mt-0.5 flex-shrink-0 ${isActive ? "text-[#9ECCFA]" : "text-[#0B1957]"}`}>
                    {section.icon}
                  </div>

                  {/* Label + description */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-black text-xs uppercase tracking-wide leading-tight ${isActive ? "text-[#9ECCFA]" : "text-[#0B1957]"}`}>
                        {section.label}
                      </span>
                      {isSoon && (
                        <span className={`flex items-center gap-1 border px-1.5 py-0.5 font-black text-[9px] uppercase tracking-wide opacity-60 ${isActive ? "border-[#9ECCFA] text-[#9ECCFA]" : "border-[#0B1957] text-[#0B1957]"}`}>
                          <IconLock size={9} /> Soon
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

        {/* Section Content */}
        <div className="flex-1 min-w-0">

          {/* Breadcrumb */}
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

          {/* Content */}
          <div key={activeSection} className="hm-content-fade">
            {activeSection === "techstack" ? (
              <TechStackVisibility />
            ) : (
              <div className="border-4 border-dashed border-[#0B1957] bg-[#F8F3EA] p-12 text-center">
                <div className="text-[#0B1957] opacity-20 flex justify-center mb-4 scale-150">
                  <IconLock size={28} />
                </div>
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

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { auth } = usePage<{ auth: { user: { name: string; email: string } } }>().props;
  const user = auth?.user;

  const [visible,     setVisible]     = useState(false);
  const [activeNav,   setActiveNav]   = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time,        setTime]        = useState(new Date());

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleLogout = () => router.post("/logout");
  const handleHome   = () => router.visit("/");

  const greeting = () => {
    const h = time.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const NavItems = ({ onClose }: { onClose?: () => void }) => (
    <>
      {NAV_ITEMS.map(item => (
        <div
          key={item.key}
          className={`nav-item ${activeNav === item.key ? "active" : ""}`}
          onClick={() => { setActiveNav(item.key); onClose?.(); }}
        >
          {item.icon}
          {item.label}
          {activeNav === item.key && (
            <span className="ml-auto w-2 h-2 rounded-full bg-[#9ECCFA] flex-shrink-0" />
          )}
        </div>
      ))}
    </>
  );

  const SidebarBottom = () => (
    <div className="border-t-4 border-[#9ECCFA] p-5 relative z-10">
      <div className="mb-3">
        <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">{user?.name ?? "Yusron"}</p>
        <p className="font-semibold text-xs text-[#D1E8FF] opacity-60 truncate">{user?.email ?? "yusron@dev.com"}</p>
      </div>
      <button className="home-btn-sidebar" onClick={handleHome}><IconHome size={13} /> Homepage</button>
      <button className="logout-btn w-full" onClick={handleLogout}><IconLogOut /> Logout</button>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes slideUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }

        .anim-sidebar { animation:slideLeft 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-topbar  { animation:slideUp   0.4s cubic-bezier(0.16,1,0.3,1) 0.1s  both; }
        .anim-content { animation:slideUp   0.6s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
        .anim-stat-0  { animation:slideUp   0.5s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .anim-stat-1  { animation:slideUp   0.5s cubic-bezier(0.16,1,0.3,1) 0.32s both; }
        .anim-stat-2  { animation:slideUp   0.5s cubic-bezier(0.16,1,0.3,1) 0.39s both; }
        .anim-stat-3  { animation:slideUp   0.5s cubic-bezier(0.16,1,0.3,1) 0.46s both; }

        .nav-item {
          display:flex; align-items:center; gap:10px;
          padding:12px 16px; font-weight:800; font-size:13px;
          text-transform:uppercase; letter-spacing:0.08em;
          color:#9ECCFA; cursor:pointer; border-left:4px solid transparent;
          transition:background 0.12s ease, color 0.12s ease, border-color 0.12s ease, padding-left 0.15s ease;
        }
        .nav-item:hover  { background:rgba(158,204,250,0.1); color:#F8F3EA; padding-left:22px; }
        .nav-item.active { background:rgba(158,204,250,0.15); color:#F8F3EA; border-left-color:#9ECCFA; padding-left:22px; }

        .home-btn-sidebar {
          display:flex; align-items:center; gap:8px;
          width:100%; border:3px solid rgba(158,204,250,0.4); padding:9px 14px;
          background:transparent; font-weight:900; font-size:12px;
          text-transform:uppercase; color:#9ECCFA; letter-spacing:0.08em;
          cursor:pointer; font-family:inherit; margin-bottom:8px;
          box-shadow:2px 2px 0 rgba(158,204,250,0.3);
          transition:background 0.1s ease, border-color 0.1s ease, transform 0.08s ease, box-shadow 0.08s ease;
        }
        .home-btn-sidebar:hover  { background:rgba(158,204,250,0.1); border-color:#9ECCFA; transform:translate(-1px,-1px); box-shadow:3px 3px 0 rgba(158,204,250,0.4); }
        .home-btn-sidebar:active { transform:translate(1px,1px); box-shadow:0 0 0; }

        .home-btn-topbar {
          display:flex; align-items:center; gap:6px;
          border:3px solid #0B1957; padding:7px 14px;
          background:#F8F3EA; font-weight:900; font-size:12px;
          text-transform:uppercase; color:#0B1957; letter-spacing:0.07em;
          cursor:pointer; font-family:inherit;
          box-shadow:3px 3px 0 #0B1957;
          transition:transform 0.08s ease, box-shadow 0.08s ease;
        }
        .home-btn-topbar:hover  { transform:translate(2px,2px); box-shadow:1px 1px 0 #0B1957; }
        .home-btn-topbar:active { transform:translate(3px,3px); box-shadow:0 0 0 #0B1957; }

        .stat-card {
          border:4px solid #0B1957; background:#F8F3EA; box-shadow:6px 6px 0 #0B1957;
          transition:transform 0.15s ease, box-shadow 0.15s ease;
        }
        .stat-card:hover { transform:translate(-3px,-3px); box-shadow:9px 9px 0 #0B1957; }

        .project-card {
          border:4px solid #0B1957; background:#F8F3EA; box-shadow:5px 5px 0 #0B1957;
          transition:transform 0.15s ease, box-shadow 0.15s ease;
        }
        .project-card:hover { transform:translate(-3px,-3px); box-shadow:8px 8px 0 #9ECCFA, 10px 10px 0 #0B1957; }

        .btn-brutal { transition:transform 0.08s ease, box-shadow 0.08s ease; }
        .btn-brutal:hover  { transform:translate(2px,2px); }
        .btn-brutal:active { transform:translate(4px,4px); }

        .status-badge { border:2px solid; padding:3px 10px; font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:0.07em; }

        .stack-tag {
          border:2px solid #0B1957; background:#D1E8FF; padding:3px 8px;
          font-size:10px; font-weight:800; text-transform:uppercase; color:#0B1957; letter-spacing:0.05em;
          transition:background 0.1s ease, transform 0.08s ease;
        }
        .stack-tag:hover { background:#9ECCFA; transform:translate(-1px,-1px); }

        .logout-btn {
          display:flex; align-items:center; justify-content:center; gap:8px;
          border:3px solid #9ECCFA; padding:8px 16px; background:transparent;
          font-weight:900; font-size:12px; text-transform:uppercase; color:#9ECCFA;
          letter-spacing:0.08em; cursor:pointer; font-family:inherit;
          box-shadow:3px 3px 0 #9ECCFA;
          transition:background 0.1s ease, transform 0.08s ease, box-shadow 0.08s ease;
        }
        .logout-btn:hover  { background:rgba(158,204,250,0.15); transform:translate(1px,1px); box-shadow:2px 2px 0 #9ECCFA; }
        .logout-btn:active { transform:translate(3px,3px); box-shadow:0 0 0 #9ECCFA; }

        .content-fade { animation:fadeIn 0.3s ease both; }

        .grid-bg-dark {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            repeating-linear-gradient(0deg,rgba(158,204,250,0.08) 0,rgba(158,204,250,0.08) 1px,transparent 1px,transparent 40px),
            repeating-linear-gradient(90deg,rgba(158,204,250,0.08) 0,rgba(158,204,250,0.08) 1px,transparent 1px,transparent 40px);
        }

        /* ── HomepageManager section buttons ── */
        .hm-section-btn {
          display:flex; align-items:flex-start; gap:10px;
          padding:12px 14px; border:3px solid #0B1957;
          background:#F8F3EA; cursor:pointer; font-family:inherit;
          box-shadow:3px 3px 0 #0B1957; width:100%;
          transition:transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
        }
        .hm-section-btn:hover:not(:disabled) { background:#D1E8FF; transform:translate(-2px,-2px); box-shadow:5px 5px 0 #0B1957; }
        .hm-section-btn-active { background:#0B1957 !important; transform:translate(-2px,-2px) !important; box-shadow:5px 5px 0 #9ECCFA !important; }
        .hm-section-btn-disabled { cursor:not-allowed !important; opacity:0.55; }

        /* ── TechStackVisibility chips ── */
        .ts-chip-toggle {
          display: inline-flex; align-items: center; gap: 8px;
          border: 3px solid #0B1957; padding: 7px 10px 7px 7px;
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.06em; cursor: pointer; font-family: inherit;
          box-shadow: 3px 3px 0 #0B1957;
          transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease, opacity 0.12s ease;
        }
        .ts-chip-toggle img { width: 26px; height: 26px; object-fit: cover; border: 2px solid #0B1957; flex-shrink: 0; }
        .ts-chip-badge { display:flex; align-items:center; margin-left:2px; opacity:0.6; }
        .ts-chip-on  { background: #F8F3EA; color: #0B1957; }
        .ts-chip-on:hover  { background: #9ECCFA; transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #0B1957; }
        .ts-chip-on .ts-chip-badge { color: #0B1957; }
        .ts-chip-off { background: transparent; color: #0B1957; opacity: 0.4; border-style: dashed; box-shadow: none; }
        .ts-chip-off:hover { opacity: 0.7; background: #F8F3EA; transform: translate(-1px,-1px); box-shadow: 3px 3px 0 #0B1957; border-style: solid; }
        .ts-chip-loading { opacity: 0.5 !important; cursor: wait !important; }
        .ts-chip-skeleton {
          display: inline-flex; align-items: center; gap: 8px;
          border: 3px solid #0B1957; padding: 7px 10px 7px 7px;
          background: #D1E8FF; opacity: 0.5;
          animation: pulse 1.2s ease infinite;
        }
      `}</style>

      <div className="min-h-screen bg-[#D1E8FF] flex" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}>

        {/* ── SIDEBAR Desktop ── */}
        <aside className="anim-sidebar hidden md:flex flex-col w-64 bg-[#0B1957] border-r-4 border-[#0B1957] relative min-h-screen flex-shrink-0">
          <div className="grid-bg-dark" />
          <div className="border-b-4 border-[#9ECCFA] px-6 py-6 relative">
            <div className="font-black text-xl text-[#9ECCFA] uppercase tracking-widest">Yusron.dev</div>
            <div className="font-semibold text-xs text-[#D1E8FF] opacity-60 uppercase tracking-wider mt-1">Dashboard</div>
          </div>
          <nav className="flex-1 py-4 relative">
            <NavItems />
          </nav>
          <SidebarBottom />
        </aside>

        {/* ── SIDEBAR Mobile Overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-[#0B1957] bg-opacity-50 z-30 md:hidden"
            style={{ backdropFilter: "blur(2px)" }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className="fixed top-0 left-0 bottom-0 w-64 z-40 md:hidden bg-[#0B1957] border-r-4 border-[#0B1957] flex flex-col"
          style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div className="grid-bg-dark" />
          <div className="border-b-4 border-[#9ECCFA] px-6 py-6 relative z-10 flex items-center justify-between">
            <div>
              <div className="font-black text-lg text-[#9ECCFA] uppercase tracking-widest">Yusron.dev</div>
              <div className="font-semibold text-xs text-[#D1E8FF] opacity-60 uppercase">Dashboard</div>
            </div>
            <button className="border-2 border-[#9ECCFA] p-2 text-[#9ECCFA]" onClick={() => setSidebarOpen(false)}>
              <IconClose />
            </button>
          </div>
          <nav className="flex-1 py-4 relative z-10">
            <NavItems onClose={() => setSidebarOpen(false)} />
          </nav>
          <SidebarBottom />
        </aside>

        {/* ── MAIN ── */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

          {/* TOPBAR */}
          <header className="anim-topbar bg-[#F8F3EA] border-b-4 border-[#0B1957] shadow-[0_4px_0_#0B1957] px-4 sm:px-8 py-4 flex items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2 border-4 border-[#0B1957] shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] btn-brutal"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <IconMenu />
              </button>
              <div>
                <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">{greeting()}</p>
                <h2 className="font-black text-lg sm:text-xl text-[#0B1957] uppercase">{user?.name ?? "Yusron"}</h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="home-btn-topbar" onClick={handleHome}>
                <IconHome size={13} /> Home
              </button>
              <div className="text-right hidden sm:flex items-center gap-2">
                <IconClock size={16} />
                <div>
                  <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">Live Clock</p>
                  <p className="font-black text-lg text-[#0B1957] tabular-nums">
                    {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-8">

            {/* ── OVERVIEW ── */}
            {activeNav === "overview" && (
              <div className="content-fade space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {STATS.map((stat, i) => (
                    <div key={i} className={`stat-card anim-stat-${i} p-5 sm:p-6`}>
                      <div className="mb-3 text-[#0B1957]">{stat.icon}</div>
                      <p className="font-black text-3xl sm:text-4xl text-[#0B1957] mb-1">{stat.value}</p>
                      <p className="font-black text-xs text-[#0B1957] uppercase tracking-widest opacity-70">{stat.label}</p>
                      <div className="h-2 mt-3 border-2 border-[#0B1957]" style={{ background: stat.color }} />
                    </div>
                  ))}
                </div>

                <div className="anim-content">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-xl uppercase text-[#0B1957]">Recent Projects</h2>
                    <button
                      className="btn-brutal border-4 border-[#0B1957] px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2"
                      onClick={() => setActiveNav("projects")}
                    >
                      All Projects <IconArrow />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PROJECTS.slice(0, 3).map((p, i) => <ProjectCard key={i} project={p} />)}
                  </div>
                </div>

                <div className="anim-content">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-xl uppercase text-[#0B1957]">Tech Stack</h2>
                    <button
                      className="btn-brutal border-4 border-[#0B1957] px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2"
                      onClick={() => setActiveNav("stacks")}
                    >
                      Kelola Stack <IconArrow />
                    </button>
                  </div>
                  <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[6px_6px_0_#0B1957] p-5">
                    <p className="font-semibold text-sm text-[#0B1957] opacity-60 mb-4">
                      Tambah, edit, dan hapus tech stack yang tampil di portfolio — icon + nama framework/bahasa.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Laravel", "TypeScript", "JavaScript"].map((s, i) => (
                        <span key={i} className="stack-tag">{s}</span>
                      ))}
                      <button
                        className="border-2 border-dashed border-[#0B1957] px-3 py-1 font-black text-xs uppercase text-[#0B1957] opacity-50 hover:opacity-100 transition-opacity"
                        onClick={() => setActiveNav("stacks")}
                      >
                        + Kelola
                      </button>
                    </div>
                  </div>
                </div>

                {/* Homepage quick access */}
                <div className="anim-content">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-xl uppercase text-[#0B1957]">Homepage</h2>
                    <button
                      className="btn-brutal border-4 border-[#0B1957] px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2"
                      onClick={() => setActiveNav("homepage")}
                    >
                      Kelola <IconArrow />
                    </button>
                  </div>
                  <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[6px_6px_0_#0B1957] p-5">
                    <p className="font-semibold text-sm text-[#0B1957] opacity-60 mb-4">
                      Kelola konten homepage portfolio — tech stack, hero, projects, dan about section.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {HOMEPAGE_SECTIONS_FULL.map((s, i) => (
                        <span
                          key={i}
                          className={`border-2 border-[#0B1957] px-3 py-1 font-black text-xs uppercase ${s.status === "active" ? "bg-[#9ECCFA] text-[#0B1957]" : "bg-[#F8F3EA] text-[#0B1957] opacity-40"}`}
                        >
                          {s.label} {s.status === "soon" ? "(soon)" : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="anim-content bg-[#0B1957] border-4 border-[#0B1957] shadow-[8px_8px_0_#9ECCFA] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <IconBriefcase size={16} />
                      <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">Status</p>
                    </div>
                    <p className="font-black text-2xl text-[#F8F3EA] uppercase">Open to Work</p>
                    <p className="font-semibold text-sm text-[#D1E8FF] mt-1">Available for freelance & full-time roles</p>
                  </div>
                  <div className="p-4 text-center" style={{ border: "3px solid #9ECCFA" }}>
                    <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest mb-1">Stack</p>
                    <p className="font-black text-[#F8F3EA]">React + Laravel</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── PROJECTS ── */}
            {activeNav === "projects" && (
              <div className="content-fade space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-black text-2xl uppercase text-[#0B1957]">All Projects</h2>
                  <span className="border-4 border-[#0B1957] bg-[#0B1957] text-[#9ECCFA] font-black text-xs px-3 py-2 uppercase tracking-widest">
                    {PROJECTS.length} Total
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} />)}
                </div>
              </div>
            )}

            {/* ── TECH STACK CRUD ── */}
            {activeNav === "stacks" && (
              <div className="content-fade">
                <TechStackCRUD />
              </div>
            )}

            {/* ── HOMEPAGE MANAGER ── */}
            {activeNav === "homepage" && <HomepageManager />}

            {/* ── PROFILE ── */}
            {activeNav === "profile" && (
              <div className="content-fade space-y-6 max-w-2xl">
                <h2 className="font-black text-2xl uppercase text-[#0B1957]">Profile</h2>
                <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] overflow-hidden">
                  <div className="bg-[#9ECCFA] h-20 border-b-4 border-[#0B1957] relative">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 12px)" }} />
                  </div>
                  <div className="px-8 pb-8 relative -mt-8">
                    <div className="w-16 h-16 border-4 border-[#F8F3EA] bg-[#0B1957] flex items-center justify-center font-black text-2xl text-[#9ECCFA] mb-4" style={{ boxShadow: "4px 4px 0 #9ECCFA" }}>
                      {(user?.name ?? "Y")[0]}
                    </div>
                    <h3 className="font-black text-2xl uppercase text-[#F8F3EA] mb-1">{user?.name ?? "Zaki Yusron"}</h3>
                    <p className="font-semibold text-sm text-[#9ECCFA] mb-6">{user?.email ?? "yusron@dev.com"}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Role",   value: "IT Programmer" },
                        { label: "Focus",  value: "Fullstack Web" },
                        { label: "Stack",  value: "React + Laravel" },
                        { label: "Status", value: "Open to Work" },
                      ].map((item, i) => (
                        <div key={i} className="border-2 border-[#9ECCFA] p-3">
                          <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="font-bold text-sm text-[#F8F3EA]">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleHome}
                    className="btn-brutal flex-1 border-4 border-[#0B1957] py-4 font-black text-sm uppercase tracking-widest shadow-[6px_6px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957] flex items-center justify-center gap-3"
                  >
                    <IconHome size={16} /> Homepage
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn-brutal flex-1 border-4 border-[#0B1957] py-4 font-black text-sm uppercase tracking-widest shadow-[6px_6px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957] flex items-center justify-center gap-3"
                  >
                    <IconLogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </>
  );
}

// ── ProjectCard ───────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card p-5">
      <div className="flex items-start justify-between mb-3 gap-2">
        <h3 className="font-black uppercase text-sm text-[#0B1957] leading-tight">{project.title}</h3>
        <span className={`status-badge flex-shrink-0 ${STATUS_STYLE[project.status] ?? ""}`}>{project.status}</span>
      </div>
      <p className="font-semibold text-xs text-[#0B1957] mb-4 leading-relaxed">{project.desc}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.stacks.map((s, i) => <span key={i} className="stack-tag">{s}</span>)}
      </div>
      <div className="flex items-center justify-between border-t-2 border-[#0B1957] pt-3 mt-3">
        <span className="font-black text-xs text-[#0B1957] uppercase opacity-50">{project.date}</span>
        <span className="font-black text-xs text-[#9ECCFA] uppercase cursor-pointer hover:underline flex items-center gap-1">
          View <IconArrow size={12} />
        </span>
      </div>
    </div>
  );
}