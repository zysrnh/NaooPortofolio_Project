import { useState, useEffect, useRef, useCallback } from "react";
import { router } from "@inertiajs/react";
import Navbar from "@/components/Navbar";

interface Stack {
  label: string;
  icon: string;
}

interface Project {
  id: string;
  title: string;
  desc: string;
  image: string;
  status: "Hosted" | "In Progress" | "Planning";
  date: string;
  stacks: Stack[];
}

const PROJECTS: Project[] = [
  {
    id: "burger-ordering-app",
    title: "Burger Ordering App",
    desc: "Website restoran burger dengan sistem pemesanan online",
    image: "/profile/Mboy.jpeg",
    status: "Hosted",
    date: "Jan 2025",
    stacks: [{ label: "Laravel", icon: "/Icon/Laravel.jpg" }, { label: "React", icon: "/Icon/React.jpg" }],
  },
  {
    id: "beyblade-leaderboard",
    title: "Beyblade Leaderboard",
    desc: "Leaderboard turnamen dengan statistik otomatis",
    image: "/profile/Mboy.jpeg",
    status: "Hosted",
    date: "Mar 2025",
    stacks: [{ label: "JavaScript", icon: "/Icon/JavaScript.jpg" }],
  },
  {
    id: "cv-generator-tool",
    title: "CV Generator Tool",
    desc: "Generate CV massal dari Excel ke PDF",
    image: "/profile/Mboy.jpeg",
    status: "In Progress",
    date: "May 2025",
    stacks: [{ label: "React", icon: "/Icon/React.jpg" }, { label: "TypeScript", icon: "/Icon/TypeScript.jpg" }],
  },
  {
    id: "dashboard-analytics",
    title: "Dashboard Analytics",
    desc: "Dashboard visualisasi data real-time untuk monitoring bisnis",
    image: "/profile/Mboy.jpeg",
    status: "Planning",
    date: "Jun 2025",
    stacks: [{ label: "React", icon: "/Icon/React.jpg" }, { label: "TypeScript", icon: "/Icon/TypeScript.jpg" }],
  },
  {
    id: "inventory-system",
    title: "Inventory System",
    desc: "Sistem manajemen stok dan inventaris gudang berbasis web",
    image: "/profile/Mboy.jpeg",
    status: "Hosted",
    date: "Feb 2025",
    stacks: [{ label: "Laravel", icon: "/Icon/Laravel.jpg" }, { label: "JavaScript", icon: "/Icon/JavaScript.jpg" }],
  },
  {
    id: "e-learning-platform",
    title: "E-Learning Platform",
    desc: "Platform belajar online dengan fitur kuis dan sertifikasi",
    image: "/profile/Mboy.jpeg",
    status: "In Progress",
    date: "Apr 2025",
    stacks: [{ label: "React", icon: "/Icon/React.jpg" }, { label: "Laravel", icon: "/Icon/Laravel.jpg" }],
  },
];

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  "Hosted":      { bg: "bg-[#9ECCFA]",  text: "text-[#0B1957]", dot: "bg-[#0B1957]" },
  "In Progress": { bg: "bg-[#FFE8A0]",  text: "text-[#0B1957]", dot: "bg-[#F59E0B]" },
  "Planning":    { bg: "bg-[#F8F3EA]",  text: "text-[#0B1957]", dot: "bg-[#9ECCFA]" },
};

const ALL_FILTERS = ["All", "Hosted", "In Progress", "Planning"];
const PER_PAGE = 6;

// ── SpotlightCard — sama persis kayak ProjectDetail ───────────────────────────
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function SpotlightCard({ children, className = "", onClick }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        className="spotlight-glow"
        style={{
          left: spotlight.x,
          top: spotlight.y,
          opacity: spotlight.opacity,
        }}
      />
      {children}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const filtered = filter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.status === filter);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (f: string) => {
    setFilter(f);
    setPage(1);
    setAnimKey(k => k + 1);
  };

  const handlePage = (p: number) => {
    setPage(p);
    setAnimKey(k => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .anim-hero   { animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-filter { animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both; }

        .card-enter { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .card-enter:nth-child(1) { animation-delay: 0.05s; }
        .card-enter:nth-child(2) { animation-delay: 0.10s; }
        .card-enter:nth-child(3) { animation-delay: 0.15s; }
        .card-enter:nth-child(4) { animation-delay: 0.20s; }
        .card-enter:nth-child(5) { animation-delay: 0.25s; }
        .card-enter:nth-child(6) { animation-delay: 0.30s; }

        /* ── SPOTLIGHT CARD ── */
        .spotlight-card {
          position: relative;
          overflow: visible !important;
          cursor: pointer;
          background: #F8F3EA;
          border: 4px solid #0B1957;
          box-shadow: 5px 5px 0 #0B1957;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .spotlight-card:hover {
          transform: translate(-3px,-3px);
          box-shadow: 8px 8px 0 #9ECCFA, 10px 10px 0 #0B1957;
        }
        /* clip image & glow hanya di dalam area card */
        .spotlight-card-inner {
          overflow: hidden;
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
        }
        .spotlight-card:hover .card-img { transform: scale(1.05); }
        .card-img { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .card-overlay { opacity: 0; transition: opacity 0.2s ease; }
        .spotlight-card:hover .card-overlay { opacity: 1; }

        .spotlight-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle at center,
            rgba(158, 204, 250, 0.25) 0%,
            rgba(158, 204, 250, 0.1) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 10;
          transition: opacity 0.3s ease;
          mix-blend-mode: screen;
        }

        .filter-btn {
          border: 3px solid #0B1957; padding: 8px 18px;
          font-weight: 900; font-size: 12px; text-transform: uppercase;
          letter-spacing: 0.08em; cursor: pointer;
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.1s ease;
          box-shadow: 3px 3px 0 #0B1957;
        }
        .filter-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 #0B1957; }
        .filter-btn.active { background: #0B1957; color: #9ECCFA; }

        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          border: 4px solid #0B1957; padding: 10px 20px;
          font-weight: 900; font-size: 13px; text-transform: uppercase;
          color: #0B1957; background: #F8F3EA; cursor: pointer;
          box-shadow: 4px 4px 0 #0B1957; letter-spacing: 0.07em;
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }
        .back-btn:hover  { transform: translate(2px,2px);  box-shadow: 2px 2px 0 #0B1957; }
        .back-btn:active { transform: translate(4px,4px);  box-shadow: 0 0 0 #0B1957; }

        .page-btn {
          border: 3px solid #0B1957; width: 40px; height: 40px;
          font-weight: 900; font-size: 13px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.1s ease;
          box-shadow: 3px 3px 0 #0B1957; background: #F8F3EA; color: #0B1957;
        }
        .page-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 #0B1957; }
        .page-btn.active { background: #0B1957; color: #9ECCFA; }
        .page-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; box-shadow: 3px 3px 0 #0B1957; }

        .dot { width: 12px; height: 12px; border: 2px solid #0B1957; background: transparent; transition: all 0.2s ease; cursor: pointer; flex-shrink: 0; }
        .dot.active { background: #0B1957; width: 32px; }
        .dot:hover:not(.active) { background: #9ECCFA; }
      `}</style>

      <div className="min-h-screen bg-[#D1E8FF]">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20">

          {/* BACK */}
          <div className="anim-hero mb-8">
            <button className="back-btn" onClick={() => router.visit("/")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Kembali ke Home
            </button>
          </div>

          {/* HERO */}
          <div className="anim-hero bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] p-8 sm:p-10 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "repeating-linear-gradient(0deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px)"
            }} />
            <div className="relative z-10">
              <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-[0.3em] mb-2">Portfolio</p>
              <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#F8F3EA] mb-3 leading-tight">All Projects</h1>
              <p className="font-semibold text-[#D1E8FF] text-base sm:text-lg max-w-2xl">
                Semua project yang pernah dibangun — dari web app, dashboard, hingga tools internal.
              </p>
              <div className="mt-4 flex gap-4 flex-wrap">
                <div className="border-2 border-[#9ECCFA] px-4 py-2 inline-flex items-center gap-2">
                  <span className="font-black text-[#9ECCFA] text-xl">{PROJECTS.length}</span>
                  <span className="font-black text-[#D1E8FF] text-xs uppercase tracking-widest">Total Projects</span>
                </div>
                <div className="border-2 border-[#9ECCFA] px-4 py-2 inline-flex items-center gap-2">
                  <span className="font-black text-[#9ECCFA] text-xl">{PROJECTS.filter(p => p.status === "Hosted").length}</span>
                  <span className="font-black text-[#D1E8FF] text-xs uppercase tracking-widest">Hosted</span>
                </div>
                <div className="border-2 border-[#9ECCFA] px-4 py-2 inline-flex items-center gap-2">
                  <span className="font-black text-[#9ECCFA] text-xl">{PROJECTS.filter(p => p.status === "In Progress").length}</span>
                  <span className="font-black text-[#D1E8FF] text-xs uppercase tracking-widest">In Progress</span>
                </div>
              </div>
            </div>
          </div>

          {/* FILTER */}
          <div className="anim-filter flex flex-wrap gap-3 mb-8">
            {ALL_FILTERS.map(f => (
              <button key={f}
                className={`filter-btn ${filter === f ? "active" : "bg-[#F8F3EA] text-[#0B1957]"}`}
                onClick={() => handleFilter(f)}>
                {f}
                <span className="ml-2 opacity-60 text-xs">
                  ({f === "All" ? PROJECTS.length : PROJECTS.filter(p => p.status === f).length})
                </span>
              </button>
            ))}
          </div>

          {/* GRID */}
          <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10" style={{ padding: "12px", margin: "-12px", marginBottom: "calc(2.5rem - 12px)" }}>
            {paginated.map((p) => {
              const st = STATUS_STYLE[p.status];
              return (
                <SpotlightCard
                  key={p.id}
                  className="card-enter"
                  onClick={() => router.visit(`/projects/${p.id}`)}
                >
                  {/* Image */}
                  <div className="w-full h-44 overflow-hidden border-b-4 border-[#0B1957] relative">
                    <img src={p.image} alt={p.title} className="card-img w-full h-full object-cover object-top" />
                    <div className="card-overlay absolute inset-0 bg-[#0B1957] bg-opacity-65 flex items-center justify-center">
                      <span className="text-[#9ECCFA] font-black uppercase text-sm border-2 border-[#9ECCFA] px-4 py-2">Lihat Detail →</span>
                    </div>
                    <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 border-2 border-[#0B1957] px-3 py-1 ${st.bg} z-20`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      <span className={`font-black uppercase text-xs tracking-wide ${st.text}`}>{p.status}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5 relative z-20">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-black uppercase text-sm text-[#0B1957] leading-tight">{p.title}</h3>
                      <span className="text-xs font-bold text-[#0B1957] opacity-50 flex-shrink-0">{p.date}</span>
                    </div>
                    <p className="font-semibold text-xs text-[#0B1957] opacity-70 mb-4 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.stacks.map((s, j) => (
                        <div key={j} title={s.label} className="border-2 border-[#0B1957] bg-[#D1E8FF] p-1.5">
                          <img src={s.icon} alt={s.label} className="w-6 h-6 object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* EMPTY */}
          {filtered.length === 0 && (
            <div className="text-center py-20 border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[6px_6px_0_#0B1957]">
              <p className="font-black uppercase text-2xl text-[#0B1957] mb-2">Tidak Ada Project</p>
              <p className="font-semibold text-[#0B1957] opacity-60">Coba filter yang lain</p>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div key={i}
                    className={`dot ${page === i + 1 ? "active" : ""}`}
                    onClick={() => handlePage(i + 1)} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button className="page-btn" onClick={() => handlePage(page - 1)} disabled={page === 1}>←</button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i}
                    className={`page-btn ${page === i + 1 ? "active" : ""}`}
                    onClick={() => handlePage(i + 1)}>
                    {i + 1}
                  </button>
                ))}
                <button className="page-btn" onClick={() => handlePage(page + 1)} disabled={page === totalPages}>→</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}