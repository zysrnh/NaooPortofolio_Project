import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import TechStackCRUD from "@/components/TechStackCRUD";
import HomepageManager from "@/components/HomepageManager";
import ProjectCRUD from "@/components/ProjectCRUD";


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
  { key: "overview",  label: "Overview",   icon: <IconGrid /> },
  { key: "projects",  label: "Projects",   icon: <IconFolder size={18} /> },
  { key: "stacks",    label: "Tech Stack", icon: <IconLayers size={18} /> },
  { key: "homepage",  label: "Homepage",   icon: <IconGlobe size={18} /> },
  { key: "profile",   label: "Profile",    icon: <IconUser /> },
];

// ── Homepage sections (untuk overview card) ───────────────────────────────────
const HOMEPAGE_SECTIONS_OVERVIEW = [
  { label: "Tech Stack", status: "active" },
  { label: "Hero Section", status: "soon" },
  { label: "Projects", status: "soon" },
  { label: "About", status: "soon" },
];

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
                      {HOMEPAGE_SECTIONS_OVERVIEW.map((s, i) => (
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
  <div className="content-fade">
    <ProjectCRUD />
  </div>
)}

            {/* ── TECH STACK CRUD ── */}
            {activeNav === "stacks" && (
              <div className="content-fade">
                <TechStackCRUD />
              </div>
            )}

            {/* ── HOMEPAGE MANAGER — pakai component dari file terpisah ── */}
            {activeNav === "homepage" && (
              <div className="content-fade">
                <HomepageManager />
              </div>
            )}

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