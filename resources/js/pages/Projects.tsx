import { useState, useEffect, useRef, useCallback } from "react";
import { router, Head } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import { useVisitorTracker } from "@/hooks/useVisitorTracker";

interface Stack {
  id: number;
  label: string; 
  icon: string;
}

interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category?: string;
  desc: string;
  images: string[];
  status: "Hosted" | "In Progress" | "Planning";
  date: string;
  duration: string;
  stacks: Stack[];
  features: { title: string; desc: string }[];
  demoUrl: string | null;
  githubUrl: string | null; 
  order: number;
  visible: boolean; 
  workType: "Solo" | "Collaboration";
  soloRole: string;
}

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  "Hosted":      { bg: "bg-[var(--nb-accent)]",  text: "text-[var(--nb-primary)]", dot: "bg-[var(--nb-primary)]" },
  "In Progress": { bg: "bg-[var(--nb-secondary)]",  text: "text-[var(--nb-primary)]", dot: "bg-[#F59E0B]" },
  "Planning":    { bg: "bg-[var(--nb-bg)]",  text: "text-[var(--nb-primary)]", dot: "bg-[var(--nb-accent)]" },
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


// ── SkeletonCard ───────────────────────────────────────────────────────────────
function SkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[5px_5px_0_var(--nb-primary)] p-0 overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-full h-44 skeleton-shimmer border-b-4 border-[var(--nb-primary)]" />
      <div className="p-5 flex flex-col gap-3">
        <div className="skeleton-shimmer h-4 w-1/3" />
        <div className="skeleton-shimmer h-6 w-3/4" />
        <div className="skeleton-shimmer h-12 w-full" />
        <div className="flex gap-2">
          <div className="skeleton-shimmer h-8 w-8" />
          <div className="skeleton-shimmer h-8 w-8" />
        </div>
      </div>
    </div>
  );
}

// ── SpotlightCard ──────────────────────────────────────────────────────────────
function SpotlightCard({
  children,
  onClick,
  delay = 0,
  visible = true,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  delay?: number;
  visible?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className="spotlight-card rounded-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  useVisitorTracker('/projects');
  const [projects, setProjects]             = useState<Project[]>([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(false);
  const [filter, setFilter]                 = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage]                     = useState(1);
  const [gridKey, setGridKey]               = useState(0);
  const [gridVisible, setGridVisible]       = useState(true);
  const [mounted, setMounted]               = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroOffset, setHeroOffset]         = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Fetch projects dari API
  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch("/api/projects")
      .then(r => {
        if (!r.ok) throw new Error("Gagal fetch");
        return r.json();
      })
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Subtle parallax on hero
  useEffect(() => {
    const handle = () => setHeroOffset(window.scrollY * 0.18);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const allCategories = ["All", ...Array.from(new Set(projects.map(p => p.category || "Web Application")))];

  const filtered = projects.filter(p => {
    const matchStatus = filter === "All" || p.status === filter;
    const matchCat    = categoryFilter === "All" || (p.category || "Web Application") === categoryFilter;
    return matchStatus && matchCat;
  });

  const totalPages  = Math.ceil(filtered.length / PER_PAGE);
  const paginated   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (f: string) => {
    setGridVisible(false);
    setTimeout(() => {
      setFilter(f);
      setPage(1);
      setGridKey(k => k + 1);
      setGridVisible(true);
    }, 220);
  };

  const handleCategoryFilter = (c: string) => {
    setGridVisible(false);
    setTimeout(() => {
      setCategoryFilter(c);
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
        @keyframes skeletonPulse {
          0%,100% { opacity: 0.5; }
          50%     { opacity: 1; }
        }

        .back-btn-wrap {
          animation: slideDownFade 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s both;
        }
        .filter-wrap {
          animation: slideDownFade 0.5s cubic-bezier(0.16,1,0.3,1) 0.28s both;
        }
        .hero-block {
          animation: heroReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .hero-stat {
          animation: counterUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        .grid-wrapper {
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .grid-wrapper.hidden {
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
        }

        .spotlight-card {
          position: relative;
          overflow: visible !important;
          cursor: pointer;
          background: var(--nb-bg);
          border: 4px solid var(--nb-primary);
          box-shadow: 5px 5px 0 var(--nb-primary);
          transition: transform 0.18s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        .spotlight-card:hover {
          transform: translate(-4px,-4px);
          box-shadow: 9px 9px 0 var(--nb-accent), 11px 11px 0 var(--nb-primary);
        }
        .spotlight-card:active {
          transform: translate(1px,1px);
          box-shadow: 3px 3px 0 var(--nb-primary);
        }
        .spotlight-card:hover .card-img { transform: scale(1.07); }
        .card-img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .card-overlay { opacity: 0; transition: opacity 0.25s ease; }
        .spotlight-card:hover .card-overlay { opacity: 1; }

        .filter-btn {
          border: 3px solid var(--nb-primary); padding: 8px 18px;
          font-weight: 900; font-size: 12px; text-transform: uppercase;
          letter-spacing: 0.08em; cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.15s ease, color 0.15s ease;
          box-shadow: 3px 3px 0 var(--nb-primary);
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
        .filter-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--nb-primary); }
        .filter-btn:active { transform: translate(3px,3px); box-shadow: 0 0 0 var(--nb-primary); }
        .filter-btn.active { background: var(--nb-primary); color: var(--nb-accent); animation: pulseGlow 2s ease 0.3s; }

        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          border: 4px solid var(--nb-primary); padding: 10px 20px;
          font-weight: 900; font-size: 13px; text-transform: uppercase;
          color: var(--nb-primary); background: var(--nb-bg); cursor: pointer;
          box-shadow: 4px 4px 0 var(--nb-primary); letter-spacing: 0.07em;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        .back-btn:hover  { transform: translate(2px,2px); box-shadow: 2px 2px 0 var(--nb-primary); }
        .back-btn:active { transform: translate(4px,4px); box-shadow: 0 0 0 var(--nb-primary); }
        .back-btn svg { transition: transform 0.2s ease; }
        .back-btn:hover svg { transform: translateX(-3px); }

        .page-btn {
          border: 3px solid var(--nb-primary); width: 40px; height: 40px;
          font-weight: 900; font-size: 13px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.12s ease;
          box-shadow: 3px 3px 0 var(--nb-primary); background: var(--nb-bg); color: var(--nb-primary);
        }
        .page-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--nb-primary); }
        .page-btn.active { background: var(--nb-primary); color: var(--nb-accent); }
        .page-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

        .dot {
          width: 12px; height: 12px;
          border: 2px solid var(--nb-primary); background: transparent;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1); cursor: pointer; flex-shrink: 0;
        }
        .dot.active { background: var(--nb-primary); width: 32px; }
        .dot:hover:not(.active) { background: var(--nb-accent); }

        .stack-chip {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .stack-chip:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 var(--nb-primary);
        }

        .hero-grid {
          background-image:
            repeating-linear-gradient(0deg,var(--nb-accent) 0,var(--nb-accent) 1px,transparent 1px,transparent 40px),
            repeating-linear-gradient(90deg,var(--nb-accent) 0,var(--nb-accent) 1px,transparent 1px,transparent 40px);
        }

        .skeleton-shimmer {
          background: linear-gradient(90deg, var(--nb-accent-light) 25%, var(--nb-accent) 50%, var(--nb-accent-light) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite, skeletonPulse 1.4s ease infinite;
        }

        .error-box {
          border: 4px solid var(--nb-primary); background: #FFD1D1;
          box-shadow: 6px 6px 0 var(--nb-primary);
          padding: 40px 24px; text-align: center;
        }

        .retry-btn {
          border: 3px solid var(--nb-primary); padding: 10px 24px;
          font-weight: 900; font-size: 12px; text-transform: uppercase;
          background: var(--nb-primary); color: var(--nb-accent); cursor: pointer;
          box-shadow: 3px 3px 0 var(--nb-accent);
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        .retry-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--nb-accent); }
        .retry-btn:active { transform: translate(3px,3px); box-shadow: 0 0 0 var(--nb-accent); }
      `}</style>
      <div className="min-h-screen bg-[var(--nb-accent-light)]">
        <Head title="Projects - Portfolio" />
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
            className="hero-block bg-[var(--nb-primary)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-accent)] p-8 sm:p-10 mb-8 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-10 hero-grid"
              style={{ transform: `translateY(${heroOffset}px)`, transition: "transform 0.1s linear" }}
            />
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{
              background: "radial-gradient(circle at top right, var(--nb-accent), transparent 70%)"
            }} />

            <div className="relative z-10">
              <p className="font-black uppercase text-xs text-[var(--nb-accent)] tracking-[0.3em] mb-2">Portfolio</p>
              <h1 className="text-3xl sm:text-5xl font-black uppercase text-[var(--nb-bg)] mb-3 leading-tight">
                All Projects
              </h1>
              <p className="font-semibold text-[var(--nb-accent-light)] text-base sm:text-lg max-w-2xl">
                Semua project yang pernah dibangun — dari web app, dashboard, hingga tools internal.
              </p>

              {!loading && (
                <div className="mt-6 flex gap-4 flex-wrap">
                  {[
                    { count: projects.length, label: "Total Projects" },
                    { count: projects.filter(p => p.status === "Hosted").length, label: "Hosted" },
                    { count: projects.filter(p => p.status === "In Progress").length, label: "In Progress" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="hero-stat border-2 border-[var(--nb-accent)] px-4 py-2 inline-flex items-center gap-2"
                      style={{ animationDelay: `${0.35 + i * 0.1}s` }}
                    >
                      <span className="font-black text-[var(--nb-accent)] text-xl">{stat.count}</span>
                      <span className="font-black text-[var(--nb-accent-light)] text-xs uppercase tracking-widest">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {loading && (
                <div className="mt-6 flex gap-4 flex-wrap">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="skeleton-shimmer border-2 border-[var(--nb-accent)] px-4 py-2 inline-flex items-center gap-2" style={{ width: 130, height: 42 }} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FILTER */}
          <div className="filter-wrap flex flex-wrap gap-3 mb-8">
            {ALL_FILTERS.map((f, i) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : "bg-[var(--nb-bg)] text-[var(--nb-primary)]"}`}
                style={{ transitionDelay: `${i * 40}ms` }}
                onClick={() => handleFilter(f)}
                disabled={loading}
              >
                {f}
                {!loading && (
                  <span className="ml-2 opacity-60 text-xs">
                    ({f === "All" ? projects.length : projects.filter(p => p.status === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ERROR STATE */}
          {error && (
            <AnimBlock>
              <div className="error-box mb-8">
                <p className="font-black uppercase text-lg text-[var(--nb-primary)] mb-2">Gagal Memuat Data</p>
                <p className="font-semibold text-[var(--nb-primary)] opacity-60 mb-6">Koneksi ke server gagal. Coba lagi.</p>
                <button
                  className="retry-btn"
                  onClick={() => {
                    setError(false);
                    setLoading(true);
                    fetch("/api/projects")
                      .then(r => r.json())
                      .then(data => { setProjects(Array.isArray(data) ? data : []); setLoading(false); })
                      .catch(() => { setError(true); setLoading(false); });
                  }}
                >
                  ↻ Coba Lagi
                </button>
              </div>
            </AnimBlock>
          )}

          {/* LOADING SKELETON GRID */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <SkeletonCard key={i} delay={i * 60} />
              ))}
            </div>
          )}

          {/* GRID */}
          {!loading && !error && (
            <div
              key={gridKey}
              className={`grid-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 ${!gridVisible ? "hidden" : ""}`}
              style={{ padding: "12px", margin: "-12px", marginBottom: "calc(2.5rem - 12px)" }}
            >
              {paginated.map((p, idx) => {
                const st = STATUS_STYLE[p.status] ?? STATUS_STYLE["Planning"];
                return (
                  <SpotlightCard
                    key={p.id}
                    delay={idx * 70}
                    visible={gridVisible}
                    onClick={() => router.visit(`/projects/${p.slug}`)}
                  >
                    {/* Image */}
                    <div className="w-full h-44 overflow-hidden border-b-4 border-[var(--nb-primary)] relative">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="card-img w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--nb-accent-light)] flex items-center justify-center">
                          <span className="font-black uppercase text-xs text-[var(--nb-primary)] opacity-30">No Image</span>
                        </div>
                      )}
                      <div className="card-overlay absolute inset-0 bg-[var(--nb-primary)] bg-opacity-65 flex items-center justify-center">
                        <span className="text-[var(--nb-accent)] font-black uppercase text-sm border-2 border-[var(--nb-accent)] px-4 py-2">
                          Lihat Detail →
                        </span>
                      </div>
                      <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 border-2 border-[var(--nb-primary)] px-3 py-1 ${st.bg} z-20`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        <span className={`font-black uppercase text-xs tracking-wide ${st.text}`}>{p.status}</span>
                      </div>
                      <div className="absolute top-3 right-3 z-20 bg-[var(--nb-primary)] border-2 border-[var(--nb-accent)] px-2 py-0.5">
                        <span className="font-black text-[9px] text-[var(--nb-accent)] uppercase tracking-tighter">
                          {p.workType === "Solo" ? (p.soloRole || "Solo") : "Collab"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 relative z-20">
                      <div className="mb-2">
                        <span className="inline-block font-black uppercase text-[10px] bg-[var(--nb-primary)] text-[var(--nb-accent)] px-2 py-0.5 border border-[var(--nb-primary)] tracking-wider">
                          🏷️ {p.category || "Web Application"}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-black uppercase text-sm text-[var(--nb-primary)] leading-tight">{p.title}</h3>
                        <span className="text-xs font-bold text-[var(--nb-primary)] opacity-50 flex-shrink-0">{p.date}</span>
                      </div>
                      <p className="font-semibold text-xs text-[var(--nb-primary)] opacity-70 leading-relaxed">{p.desc}</p>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && filtered.length === 0 && (
            <AnimBlock>
              <div className="text-center py-20 border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[6px_6px_0_var(--nb-primary)]">
                <p className="font-black uppercase text-2xl text-[var(--nb-primary)] mb-2">Tidak Ada Project</p>
                <p className="font-semibold text-[var(--nb-primary)] opacity-60">Coba filter yang lain</p>
              </div>
            </AnimBlock>
          )}

          {/* PAGINATION */}
          {!loading && !error && totalPages > 1 && (
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
