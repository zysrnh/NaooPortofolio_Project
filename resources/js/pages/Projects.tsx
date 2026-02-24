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

// ── useInView Hook ─────────────────────────────────────────────────────────────
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

// ── SpotlightCard ──────────────────────────────────────────────────────────────
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  visible?: boolean;
}

function SpotlightCard({ children, className = "", onClick, delay = 0, visible = true }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setEntered(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="spotlight-glow" style={{ left: spotlight.x, top: spotlight.y, opacity: spotlight.opacity }} />
      {children}
    </div>
  );
}

// ── AnimBlock ──────────────────────────────────────────────────────────────────
function AnimBlock({ children, delay = 0, from = "bottom", className = "" }: {
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right";
  className?: string;
}) {
  const { ref, inView } = useInView();

  const translateMap = { bottom: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)" };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : translateMap[from],
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter]     = useState("All");
  const [page, setPage]         = useState(1);
  const [gridKey, setGridKey]   = useState(0);
  const [gridVisible, setGridVisible] = useState(true);
  const [mounted, setMounted]   = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // subtle parallax on hero
  useEffect(() => {
    const handle = () => setHeroOffset(window.scrollY * 0.18);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.status === filter);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (f: string) => {
    setGridVisible(false);
    setTimeout(() => {
      setFilter(f);
      setPage(1);
      setGridKey(k => k + 1);
      setGridVisible(true);
    }, 220);
  };

  const handlePage = (p: number) => {
    setGridVisible(false);
    setTimeout(() => {
      setPage(p);
      setGridKey(k => k + 1);
      setGridVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 220);
  };

  return (
    <>
      <style>{`
        /* ── Page entrance ── */
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(24px) scale(0.99); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes counterUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(158, 204, 250, 0); }
          50%       { box-shadow: 0 0 0 4px rgba(158, 204, 250, 0.25); }
        }

        .page-wrapper {
          opacity: 0;
          animation: pageIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s forwards;
        }
        .hero-block {
          animation: heroReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .hero-stat {
          opacity: 0;
          animation: counterUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .hero-stat:nth-child(1) { animation-delay: 0.35s; }
        .hero-stat:nth-child(2) { animation-delay: 0.45s; }
        .hero-stat:nth-child(3) { animation-delay: 0.55s; }

        .back-btn-wrap {
          opacity: 0;
          animation: slideDownFade 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s forwards;
        }
        .filter-wrap {
          opacity: 0;
          animation: slideDownFade 0.5s cubic-bezier(0.16,1,0.3,1) 0.28s forwards;
        }

        /* ── Grid transition ── */
        .grid-wrapper {
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .grid-wrapper.hidden {
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
        }

        /* ── Spotlight Card ── */
        .spotlight-card {
          position: relative;
          overflow: visible !important;
          cursor: pointer;
          background: #F8F3EA;
          border: 4px solid #0B1957;
          box-shadow: 5px 5px 0 #0B1957;
          transition: transform 0.18s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        .spotlight-card:hover {
          transform: translate(-4px,-4px);
          box-shadow: 9px 9px 0 #9ECCFA, 11px 11px 0 #0B1957;
        }
        .spotlight-card:active {
          transform: translate(1px,1px);
          box-shadow: 3px 3px 0 #0B1957;
        }
        .spotlight-card-inner {
          overflow: hidden;
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
        }
        .spotlight-card:hover .card-img { transform: scale(1.07); }
        .card-img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .card-overlay { opacity: 0; transition: opacity 0.25s ease; }
        .spotlight-card:hover .card-overlay { opacity: 1; }

        .spotlight-glow {
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle at center, rgba(158,204,250,0.28) 0%, rgba(158,204,250,0.1) 40%, transparent 70%);
          pointer-events: none;
          z-index: 10;
          transition: opacity 0.35s ease;
          mix-blend-mode: screen;
        }

        /* ── Filter btn ── */
        .filter-btn {
          border: 3px solid #0B1957; padding: 8px 18px;
          font-weight: 900; font-size: 12px; text-transform: uppercase;
          letter-spacing: 0.08em; cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.15s ease, color 0.15s ease;
          box-shadow: 3px 3px 0 #0B1957;
          position: relative; overflow: hidden;
        }
        .filter-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .filter-btn:hover::after { opacity: 1; animation: shimmer 0.6s ease; }
        .filter-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 #0B1957; }
        .filter-btn:active { transform: translate(3px,3px); box-shadow: 0 0 0 #0B1957; }
        .filter-btn.active { background: #0B1957; color: #9ECCFA; animation: pulseGlow 2s ease 0.3s; }

        /* ── Back btn ── */
        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          border: 4px solid #0B1957; padding: 10px 20px;
          font-weight: 900; font-size: 13px; text-transform: uppercase;
          color: #0B1957; background: #F8F3EA; cursor: pointer;
          box-shadow: 4px 4px 0 #0B1957; letter-spacing: 0.07em;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        .back-btn:hover  { transform: translate(2px,2px); box-shadow: 2px 2px 0 #0B1957; }
        .back-btn:active { transform: translate(4px,4px); box-shadow: 0 0 0 #0B1957; }
        .back-btn svg { transition: transform 0.2s ease; }
        .back-btn:hover svg { transform: translateX(-3px); }

        /* ── Pagination ── */
        .page-btn {
          border: 3px solid #0B1957; width: 40px; height: 40px;
          font-weight: 900; font-size: 13px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.12s ease;
          box-shadow: 3px 3px 0 #0B1957; background: #F8F3EA; color: #0B1957;
        }
        .page-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 #0B1957; }
        .page-btn.active { background: #0B1957; color: #9ECCFA; }
        .page-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

        .dot {
          width: 12px; height: 12px;
          border: 2px solid #0B1957; background: transparent;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1); cursor: pointer; flex-shrink: 0;
        }
        .dot.active { background: #0B1957; width: 32px; }
        .dot:hover:not(.active) { background: #9ECCFA; }

        /* ── Stack chip hover ── */
        .stack-chip {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .stack-chip:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #0B1957;
        }

        /* ── Hero grid pattern ── */
        .hero-grid {
          background-image:
            repeating-linear-gradient(0deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px),
            repeating-linear-gradient(90deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px);
        }
      `}</style>

      <div className="min-h-screen bg-[#D1E8FF] page-wrapper">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20">

          {/* BACK */}
          <div className="back-btn-wrap mb-8">
            <button className="back-btn" onClick={() => router.visit("/")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Kembali ke Home
            </button>
          </div>

          {/* HERO */}
          <div
            ref={heroRef}
            className="hero-block bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] p-8 sm:p-10 mb-8 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-10 hero-grid"
              style={{ transform: `translateY(${heroOffset}px)`, transition: "transform 0.1s linear" }}
            />
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{
              background: "radial-gradient(circle at top right, #9ECCFA, transparent 70%)"
            }} />

            <div className="relative z-10">
              <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-[0.3em] mb-2">Portfolio</p>
              <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#F8F3EA] mb-3 leading-tight">
                All Projects
              </h1>
              <p className="font-semibold text-[#D1E8FF] text-base sm:text-lg max-w-2xl">
                Semua project yang pernah dibangun — dari web app, dashboard, hingga tools internal.
              </p>
              <div className="mt-6 flex gap-4 flex-wrap">
                {[
                  { count: PROJECTS.length, label: "Total Projects" },
                  { count: PROJECTS.filter(p => p.status === "Hosted").length, label: "Hosted" },
                  { count: PROJECTS.filter(p => p.status === "In Progress").length, label: "In Progress" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="hero-stat border-2 border-[#9ECCFA] px-4 py-2 inline-flex items-center gap-2"
                    style={{ animationDelay: `${0.35 + i * 0.1}s` }}
                  >
                    <span className="font-black text-[#9ECCFA] text-xl">{stat.count}</span>
                    <span className="font-black text-[#D1E8FF] text-xs uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FILTER */}
          <div className="filter-wrap flex flex-wrap gap-3 mb-8">
            {ALL_FILTERS.map((f, i) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : "bg-[#F8F3EA] text-[#0B1957]"}`}
                style={{ transitionDelay: `${i * 40}ms` }}
                onClick={() => handleFilter(f)}
              >
                {f}
                <span className="ml-2 opacity-60 text-xs">
                  ({f === "All" ? PROJECTS.length : PROJECTS.filter(p => p.status === f).length})
                </span>
              </button>
            ))}
          </div>

          {/* GRID */}
          <div
            key={gridKey}
            className={`grid-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 ${!gridVisible ? "hidden" : ""}`}
            style={{ padding: "12px", margin: "-12px", marginBottom: "calc(2.5rem - 12px)" }}
          >
            {paginated.map((p, idx) => {
              const st = STATUS_STYLE[p.status];
              return (
                <SpotlightCard
                  key={p.id}
                  delay={idx * 70}
                  visible={gridVisible}
                  onClick={() => router.visit(`/projects/${p.id}`)}
                >
                  {/* Image */}
                  <div className="w-full h-44 overflow-hidden border-b-4 border-[#0B1957] relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="card-img w-full h-full object-cover object-top"
                    />
                    <div className="card-overlay absolute inset-0 bg-[#0B1957] bg-opacity-65 flex items-center justify-center">
                      <span className="text-[#9ECCFA] font-black uppercase text-sm border-2 border-[#9ECCFA] px-4 py-2">
                        Lihat Detail →
                      </span>
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
                        <div
                          key={j}
                          title={s.label}
                          className="stack-chip border-2 border-[#0B1957] bg-[#D1E8FF] p-1.5"
                        >
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
            <AnimBlock>
              <div className="text-center py-20 border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[6px_6px_0_#0B1957]">
                <p className="font-black uppercase text-2xl text-[#0B1957] mb-2">Tidak Ada Project</p>
                <p className="font-semibold text-[#0B1957] opacity-60">Coba filter yang lain</p>
              </div>
            </AnimBlock>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <AnimBlock delay={100}>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <div
                      key={i}
                      className={`dot ${page === i + 1 ? "active" : ""}`}
                      onClick={() => handlePage(i + 1)}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button className="page-btn" onClick={() => handlePage(page - 1)} disabled={page === 1}>←</button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      className={`page-btn ${page === i + 1 ? "active" : ""}`}
                      onClick={() => handlePage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button className="page-btn" onClick={() => handlePage(page + 1)} disabled={page === totalPages}>→</button>
                </div>
              </div>
            </AnimBlock>
          )}
        </div>
      </div>
    </>
  );
}