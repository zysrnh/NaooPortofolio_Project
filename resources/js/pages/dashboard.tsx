import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

// Types
interface Project { title: string; desc: string; status: string; stacks: string[]; date: string; }
interface Stat     { label: string; value: string; icon: string; color: string; }

const PROJECTS: Project[] = [
  { title: "Burger Ordering App",   desc: "Website restoran burger dengan sistem pemesanan online", status: "Live",        stacks: ["Laravel", "React"],      date: "Jan 2025" },
  { title: "Beyblade Leaderboard",  desc: "Leaderboard turnamen dengan statistik otomatis",         status: "Live",        stacks: ["JavaScript"],            date: "Mar 2025" },
  { title: "CV Generator Tool",     desc: "Generate CV massal dari Excel ke PDF",                   status: "In Progress", stacks: ["React", "TypeScript"],   date: "May 2025" },
  { title: "Dashboard Analytics",   desc: "Dashboard visualisasi data real-time",                   status: "Planning",    stacks: ["React", "TypeScript"],   date: "Jun 2025" },
  { title: "Inventory System",      desc: "Sistem manajemen stok dan inventaris berbasis web",      status: "Live",        stacks: ["Laravel", "JavaScript"], date: "Feb 2025" },
  { title: "E-Learning Platform",   desc: "Platform belajar online dengan kuis dan sertifikasi",   status: "In Progress", stacks: ["React", "Laravel"],      date: "Apr 2025" },
];

const STATS: Stat[] = [
  { label: "Total Projects", value: "6",   icon: "📁", color: "#9ECCFA" },
  { label: "Live Projects",  value: "3",   icon: "🚀", color: "#9ECCFA" },
  { label: "In Progress",    value: "2",   icon: "⚙",  color: "#D1E8FF" },
  { label: "Tech Stacks",    value: "8",   icon: "🛠",  color: "#F8F3EA" },
];

const STATUS_STYLE: Record<string, string> = {
  "Live":        "bg-[#9ECCFA] border-[#0B1957] text-[#0B1957]",
  "In Progress": "bg-[#FFE8A0] border-[#0B1957] text-[#0B1957]",
  "Planning":    "bg-[#F8F3EA] border-[#0B1957] text-[#0B1957]",
};

const NAV_ITEMS = [
  { key: "overview",  label: "Overview",  icon: "▦" },
  { key: "projects",  label: "Projects",  icon: "📁" },
  { key: "profile",   label: "Profile",   icon: "👤" },
];

export default function Dashboard() {
  const { auth } = usePage<{ auth: { user: { name: string; email: string } } }>().props;
  const user = auth?.user;

  const [visible,     setVisible]     = useState(false);
  const [activeNav,   setActiveNav]   = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time,        setTime]        = useState(new Date());

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const handleLogout = () => router.post("/logout");

  const greeting = () => {
    const h = time.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      <style>{`
        @keyframes slideUp    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideLeft  { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
        @keyframes shimmer    { from{transform:translateX(-200%)} to{transform:translateX(200%)} }

        .anim-sidebar  { animation:slideLeft  0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-topbar   { animation:slideUp    0.4s cubic-bezier(0.16,1,0.3,1) 0.1s  both; }
        .anim-content  { animation:slideUp    0.6s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
        .anim-stat-0   { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .anim-stat-1   { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.32s both; }
        .anim-stat-2   { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.39s both; }
        .anim-stat-3   { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.46s both; }

        .nav-item {
          display:flex; align-items:center; gap:10px;
          padding:12px 16px; font-weight:800; font-size:13px;
          text-transform:uppercase; letter-spacing:0.08em;
          color:#9ECCFA; cursor:pointer; border-left:4px solid transparent;
          transition:background 0.12s ease, color 0.12s ease, border-color 0.12s ease, padding-left 0.15s ease;
        }
        .nav-item:hover { background:rgba(158,204,250,0.1); color:#F8F3EA; padding-left:22px; }
        .nav-item.active { background:rgba(158,204,250,0.15); color:#F8F3EA; border-left-color:#9ECCFA; padding-left:22px; }

        .stat-card {
          border:4px solid #0B1957; background:#F8F3EA;
          box-shadow:6px 6px 0 #0B1957;
          transition:transform 0.15s ease, box-shadow 0.15s ease;
        }
        .stat-card:hover { transform:translate(-3px,-3px); box-shadow:9px 9px 0 #0B1957; }

        .project-card {
          border:4px solid #0B1957; background:#F8F3EA;
          box-shadow:5px 5px 0 #0B1957;
          transition:transform 0.15s ease, box-shadow 0.15s ease;
        }
        .project-card:hover { transform:translate(-3px,-3px); box-shadow:8px 8px 0 #9ECCFA, 10px 10px 0 #0B1957; }

        .btn-brutal {
          transition:transform 0.08s ease, box-shadow 0.08s ease;
        }
        .btn-brutal:hover  { transform:translate(2px,2px); }
        .btn-brutal:active { transform:translate(4px,4px); }

        .status-badge { border:2px solid; padding:3px 10px; font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:0.07em; }

        .stack-tag {
          border:2px solid #0B1957; background:#D1E8FF; padding:3px 8px;
          font-size:10px; font-weight:800; text-transform:uppercase; color:#0B1957;
          letter-spacing:0.05em;
          transition:background 0.1s ease, transform 0.08s ease;
        }
        .stack-tag:hover { background:#9ECCFA; transform:translate(-1px,-1px); }

        .logout-btn {
          border:3px solid #9ECCFA; padding:8px 16px; background:transparent;
          font-weight:900; font-size:12px; text-transform:uppercase; color:#9ECCFA;
          letter-spacing:0.08em; cursor:pointer; font-family:inherit;
          transition:background 0.1s ease, transform 0.08s ease, box-shadow 0.08s ease;
          box-shadow:3px 3px 0 #9ECCFA;
        }
        .logout-btn:hover  { background:rgba(158,204,250,0.15); transform:translate(1px,1px); box-shadow:2px 2px 0 #9ECCFA; }
        .logout-btn:active { transform:translate(3px,3px); box-shadow:0 0 0 #9ECCFA; }

        .mobile-overlay { position:fixed; inset:0; background:rgba(11,25,87,0.5); z-index:30; backdrop-filter:blur(2px); }

        .sidebar-mobile {
          position:fixed; top:0; left:0; bottom:0; width:260px; z-index:40;
          transform:translateX(-100%); transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .sidebar-mobile.open { transform:translateX(0); }

        .ham-line { display:block; width:20px; height:2px; background:#0B1957; transition:all 0.25s ease; transform-origin:center; }
        .ham-open .ham-line:nth-child(1) { transform:translateY(8px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity:0; transform:scaleX(0); }
        .ham-open .ham-line:nth-child(3) { transform:translateY(-8px) rotate(-45deg); }

        .content-fade { animation:fadeIn 0.3s ease both; }

        .grid-bg-dark {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            repeating-linear-gradient(0deg,rgba(158,204,250,0.08) 0,rgba(158,204,250,0.08) 1px,transparent 1px,transparent 40px),
            repeating-linear-gradient(90deg,rgba(158,204,250,0.08) 0,rgba(158,204,250,0.08) 1px,transparent 1px,transparent 40px);
        }
      `}</style>

      <div
        className="min-h-screen bg-[#D1E8FF] flex"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
      >

        {/* ─── SIDEBAR (desktop) ─── */}
        <aside className="anim-sidebar hidden md:flex flex-col w-64 bg-[#0B1957] border-r-4 border-[#0B1957] relative min-h-screen flex-shrink-0">
          <div className="grid-bg-dark" />

          {/* Brand */}
          <div className="border-b-4 border-[#9ECCFA] px-6 py-6 relative">
            <div className="font-black text-xl text-[#9ECCFA] uppercase tracking-widest">Yusron.dev</div>
            <div className="font-semibold text-xs text-[#D1E8FF] opacity-60 uppercase tracking-wider mt-1">Dashboard</div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 relative">
            {NAV_ITEMS.map(item => (
              <div
                key={item.key}
                className={`nav-item ${activeNav === item.key ? "active" : ""}`}
                onClick={() => setActiveNav(item.key)}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>

          {/* User + Logout */}
          <div className="border-t-4 border-[#9ECCFA] p-5 relative">
            <div className="mb-3">
              <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">{user?.name ?? "Yusron"}</p>
              <p className="font-semibold text-xs text-[#D1E8FF] opacity-60 truncate">{user?.email ?? "yusron@dev.com"}</p>
            </div>
            <button className="logout-btn w-full" onClick={handleLogout}>Logout →</button>
          </div>
        </aside>

        {/* ─── SIDEBAR (mobile overlay) ─── */}
        {sidebarOpen && <div className="mobile-overlay md:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`sidebar-mobile md:hidden bg-[#0B1957] border-r-4 border-[#0B1957]`} style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)" }}>
          <div className="grid-bg-dark" />
          <div className="border-b-4 border-[#9ECCFA] px-6 py-6 relative flex items-center justify-between">
            <div>
              <div className="font-black text-lg text-[#9ECCFA] uppercase tracking-widest">Yusron.dev</div>
              <div className="font-semibold text-xs text-[#D1E8FF] opacity-60 uppercase">Dashboard</div>
            </div>
            <button className="border-2 border-[#9ECCFA] p-2 text-[#9ECCFA]" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>
          <nav className="flex-1 py-4 relative">
            {NAV_ITEMS.map(item => (
              <div key={item.key} className={`nav-item ${activeNav === item.key ? "active" : ""}`}
                onClick={() => { setActiveNav(item.key); setSidebarOpen(false); }}>
                <span>{item.icon}</span>{item.label}
              </div>
            ))}
          </nav>
          <div className="border-t-4 border-[#9ECCFA] p-5 relative">
            <div className="mb-3">
              <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">{user?.name ?? "Yusron"}</p>
              <p className="font-semibold text-xs text-[#D1E8FF] opacity-60 truncate">{user?.email ?? ""}</p>
            </div>
            <button className="logout-btn w-full" onClick={handleLogout}>Logout →</button>
          </div>
        </aside>

        {/* ─── MAIN ─── */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

          {/* TOPBAR */}
          <header className="anim-topbar bg-[#F8F3EA] border-b-4 border-[#0B1957] shadow-[0_4px_0_#0B1957] px-4 sm:px-8 py-4 flex items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-4">
              {/* Hamburger (mobile) */}
              <button
                className={`md:hidden flex flex-col gap-[5px] p-2 border-4 border-[#0B1957] shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] btn-brutal ${sidebarOpen ? "ham-open" : ""}`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="ham-line" /><span className="ham-line" /><span className="ham-line" />
              </button>
              <div>
                <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">{greeting()}</p>
                <h2 className="font-black text-lg sm:text-xl text-[#0B1957] uppercase">{user?.name ?? "Yusron"} 👋</h2>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">Live Clock</p>
              <p className="font-black text-lg text-[#0B1957] tabular-nums">
                {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </p>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-8">

            {/* ── OVERVIEW ── */}
            {activeNav === "overview" && (
              <div className="content-fade space-y-8">

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {STATS.map((stat, i) => (
                    <div key={i} className={`stat-card anim-stat-${i} p-5 sm:p-6`}>
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <p className="font-black text-3xl sm:text-4xl text-[#0B1957] mb-1">{stat.value}</p>
                      <p className="font-black text-xs text-[#0B1957] uppercase tracking-widest opacity-70">{stat.label}</p>
                      <div className="h-2 mt-3 border-2 border-[#0B1957]" style={{ background: stat.color }} />
                    </div>
                  ))}
                </div>

                {/* Recent projects preview */}
                <div className="anim-content">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-xl uppercase text-[#0B1957]">Recent Projects</h2>
                    <button
                      className="btn-brutal border-4 border-[#0B1957] px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA]"
                      onClick={() => setActiveNav("projects")}
                    >All Projects →</button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PROJECTS.slice(0, 3).map((p, i) => (
                      <ProjectCard key={i} project={p} />
                    ))}
                  </div>
                </div>

                {/* Activity / info strip */}
                <div className="anim-content bg-[#0B1957] border-4 border-[#0B1957] shadow-[8px_8px_0_#9ECCFA] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest mb-1">Status</p>
                    <p className="font-black text-2xl text-[#F8F3EA] uppercase">Open to Work 🚀</p>
                    <p className="font-semibold text-sm text-[#D1E8FF] mt-1">Available for freelance & full-time roles</p>
                  </div>
                  <div className="border-3 border-[#9ECCFA] p-4 text-center" style={{border:"3px solid #9ECCFA"}}>
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
                  {PROJECTS.map((p, i) => (
                    <ProjectCard key={i} project={p} />
                  ))}
                </div>
              </div>
            )}

            {/* ── PROFILE ── */}
            {activeNav === "profile" && (
              <div className="content-fade space-y-6 max-w-2xl">
                <h2 className="font-black text-2xl uppercase text-[#0B1957]">Profile</h2>

                {/* Profile card */}
                <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] overflow-hidden">
                  <div className="bg-[#9ECCFA] h-20 border-b-4 border-[#0B1957] relative">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage:"repeating-linear-gradient(45deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 12px)" }} />
                  </div>
                  <div className="px-8 pb-8 relative -mt-8">
                    <div className="w-16 h-16 border-4 border-[#F8F3EA] bg-[#0B1957] flex items-center justify-center font-black text-2xl text-[#9ECCFA] mb-4" style={{boxShadow:"4px 4px 0 #9ECCFA"}}>
                      {(user?.name ?? "Y")[0]}
                    </div>
                    <h3 className="font-black text-2xl uppercase text-[#F8F3EA] mb-1">{user?.name ?? "Zaki Yusron"}</h3>
                    <p className="font-semibold text-sm text-[#9ECCFA] mb-6">{user?.email ?? "yusron@dev.com"}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Role",   value: "IT Programmer" },
                        { label: "Focus",  value: "Fullstack Web" },
                        { label: "Stack",  value: "React + Laravel" },
                        { label: "Status", value: "Open to Work ✓" },
                      ].map((item, i) => (
                        <div key={i} className="border-2 border-[#9ECCFA] p-3">
                          <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="font-bold text-sm text-[#F8F3EA]">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Logout button (large) */}
                <button
                  onClick={handleLogout}
                  className="btn-brutal w-full border-4 border-[#0B1957] py-4 font-black text-sm uppercase tracking-widest shadow-[6px_6px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957]"
                >
                  Logout dari Dashboard →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card p-5">
      <div className="flex items-start justify-between mb-3 gap-2">
        <h3 className="font-black uppercase text-sm text-[#0B1957] leading-tight">{project.title}</h3>
        <span className={`status-badge flex-shrink-0 ${STATUS_STYLE[project.status] ?? ""}`}>{project.status}</span>
      </div>
      <p className="font-semibold text-xs text-[#0B1957] mb-4 leading-relaxed">{project.desc}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.stacks.map((s, i) => (
          <span key={i} className="stack-tag">{s}</span>
        ))}
      </div>
      <div className="flex items-center justify-between border-t-2 border-[#0B1957] pt-3 mt-3">
        <span className="font-black text-xs text-[#0B1957] uppercase opacity-50">{project.date}</span>
        <span className="font-black text-xs text-[#9ECCFA] uppercase cursor-pointer hover:underline">View →</span>
      </div>
    </div>
  );
}