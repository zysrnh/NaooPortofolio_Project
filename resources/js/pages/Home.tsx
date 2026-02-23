import Navbar from "@/components/Navbar";
import { useEffect, useState, useRef } from "react";
import { router } from "@inertiajs/react";

// ── Scroll reveal hook with direction detection + varied animations ────────
function useScrollReveal(ready: boolean) {
  useEffect(() => {
    if (!ready) return;

    let lastScrollY = window.scrollY;

    const getTransform = (el: HTMLElement, directionDown: boolean) => {
      if (el.classList.contains("from-left"))  return "translateX(-50px)";
      if (el.classList.contains("from-right")) return "translateX(50px)";
      if (el.classList.contains("from-scale")) return "scale(0.92)";
      return directionDown ? "translateY(48px)" : "translateY(-48px)";
    };

    const els = Array.from(document.querySelectorAll(".reveal")) as HTMLElement[];

    // set initial hidden state
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = getTransform(el, true);
      el.style.transition = "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const directionDown = window.scrollY >= lastScrollY;
        lastScrollY = window.scrollY;

        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);

          if (entry.isIntersecting) {
            // entering viewport — animate in
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0) translateX(0) scale(1)";
            }, delay);
            el.dataset.visible = "true";
          } else {
            // leaving viewport — reset so it can re-animate
            const wasVisible = el.dataset.visible === "true";
            if (wasVisible) {
              el.style.transition = "none";
              el.style.opacity = "0";
              el.style.transform = getTransform(el, directionDown);
              // re-enable transition after reset
              requestAnimationFrame(() => {
                el.style.transition = "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)";
              });
              el.dataset.visible = "false";
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ready]);
}

const projects = [
  { title: "Burger Ordering App", desc: "Website restoran burger dengan sistem pemesanan online", image: "/profile/Mboy.jpeg", stacks: [{ label: "Laravel", icon: "/Icon/Laravel.jpg" }, { label: "React", icon: "/Icon/React.jpg" }] },
  { title: "Beyblade Leaderboard", desc: "Leaderboard turnamen dengan statistik otomatis", image: "/profile/Mboy.jpeg", stacks: [{ label: "JavaScript", icon: "/Icon/JavaScript.jpg" }] },
  { title: "CV Generator Tool", desc: "Generate CV massal dari Excel ke PDF", image: "/profile/Mboy.jpeg", stacks: [{ label: "React", icon: "/Icon/React.jpg" }, { label: "TypeScript", icon: "/Icon/TypeScript.jpg" }] },
  { title: "Dashboard Analytics", desc: "Dashboard visualisasi data real-time untuk monitoring bisnis", image: "/profile/Mboy.jpeg", stacks: [{ label: "React", icon: "/Icon/React.jpg" }, { label: "TypeScript", icon: "/Icon/TypeScript.jpg" }] },
  { title: "Inventory System", desc: "Sistem manajemen stok dan inventaris gudang berbasis web", image: "/profile/Mboy.jpeg", stacks: [{ label: "Laravel", icon: "/Icon/Laravel.jpg" }, { label: "JavaScript", icon: "/Icon/JavaScript.jpg" }] },
  { title: "E-Learning Platform", desc: "Platform belajar online dengan fitur kuis dan sertifikasi", image: "/profile/Mboy.jpeg", stacks: [{ label: "React", icon: "/Icon/React.jpg" }, { label: "Laravel", icon: "/Icon/Laravel.jpg" }] },
];

// ── Compute stats dynamically from projects ───────────────────────────────
const totalProjects = projects.length;
const stackCounts: Record<string, number> = {};
projects.forEach(p => p.stacks.forEach(s => {
  stackCounts[s.label] = (stackCounts[s.label] || 0) + 1;
}));
const uniqueStacks = Object.keys(stackCounts).length;
const topStack = Object.entries(stackCounts).sort((a, b) => b[1] - a[1])[0];

const PROJECT_STATS = [
  { value: totalProjects,               label: "Total Projects",   note: "Semua project" },
  { value: uniqueStacks,                label: "Tech Stacks Used", note: "Teknologi berbeda" },
  { value: stackCounts["React"] ?? 0,   label: "React Projects",   note: "Frontend modern" },
  { value: stackCounts["Laravel"] ?? 0, label: "Laravel Projects", note: "Backend solid" },
];

const TABS = [
  { key: "frontend", label: "Frontend", techs: [{ label: "React", icon: "/Icon/React.jpg" }, { label: "TypeScript", icon: "/Icon/TypeScript.jpg" }, { label: "JavaScript", icon: "/Icon/JavaScript.jpg" }, { label: "Tailwind", icon: "/Icon/TypeScript.jpg" }, { label: "Vite", icon: "/Icon/JavaScript.jpg" }] },
  { key: "backend",  label: "Backend",  techs: [{ label: "Laravel", icon: "/Icon/Laravel.jpg" }, { label: "JavaScript", icon: "/Icon/JavaScript.jpg" }, { label: "TypeScript", icon: "/Icon/TypeScript.jpg" }, { label: "MySQL", icon: "/Icon/Laravel.jpg" }] },
  { key: "tools",    label: "Tools",    techs: [{ label: "Git", icon: "/Icon/JavaScript.jpg" }, { label: "GitHub", icon: "/Icon/TypeScript.jpg" }, { label: "VS Code", icon: "/Icon/React.jpg" }, { label: "Postman", icon: "/Icon/Laravel.jpg" }, { label: "Figma", icon: "/Icon/JavaScript.jpg" }, { label: "Docker", icon: "/Icon/TypeScript.jpg" }] },
  { key: "ai",       label: "AI Tools", techs: [{ label: "Claude", icon: "/Icon/TypeScript.jpg" }, { label: "ChatGPT", icon: "/Icon/JavaScript.jpg" }, { label: "Copilot", icon: "/Icon/React.jpg" }, { label: "Gemini", icon: "/Icon/Laravel.jpg" }] },
];

function TechStack() {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);

  const switchTab = (i: number) => {
    if (i === activeTab) return;
    setAnimating(true);
    setTimeout(() => { setActiveTab(i); setAnimating(false); }, 180);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 reveal from-left">
      <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">Tech Stack</h2>
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden">
        <div className="flex border-b-4 border-[#0B1957] overflow-x-auto">
          {TABS.map((tab, i) => (
            <button key={tab.key} onClick={() => switchTab(i)}
              className={`flex-shrink-0 flex-1 py-3 px-3 sm:px-4 font-black uppercase text-xs sm:text-sm tracking-wider border-r-4 border-[#0B1957] last:border-r-0 transition-all duration-150 whitespace-nowrap
                ${activeTab === i ? "bg-[#0B1957] text-[#9ECCFA]" : "bg-[#F8F3EA] text-[#0B1957] hover:bg-[#D1E8FF]"}`}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6 sm:p-10 min-h-[160px] flex flex-wrap gap-3 sm:gap-5 items-start content-start"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.18s ease, transform 0.18s ease" }}>
          {TABS[activeTab].techs.map((tech, i) => (
            <div key={i} className="tech-chip">
              <img src={tech.icon} alt={tech.label} />
              <span>{tech.label}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-[#9ECCFA] border-t-4 border-[#0B1957]" />
      </div>
    </section>
  );
}

// ── PROJECT COUNT ─────────────────────────────────────────────────────────
function ProjectCount() {
  const [counts, setCounts] = useState(PROJECT_STATS.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          PROJECT_STATS.forEach((stat, i) => {
            const duration = 800;
            const steps = 40;
            let step = 0;
            const timer = setInterval(() => {
              step++;
              const eased = 1 - Math.pow(1 - step / steps, 3);
              const current = Math.round(eased * stat.value);
              setCounts(prev => {
                const next = [...prev];
                next[i] = current;
                return next;
              });
              if (step >= steps) clearInterval(timer);
            }, duration / steps);
          });
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="project-stats" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-right">
      <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">Project Stats</h2>

      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden">
        {/* Grid of stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {PROJECT_STATS.map((stat, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center py-10 px-4 text-center overflow-hidden group
                border-b-4 border-[#0B1957]
                [&:nth-child(odd)]:border-r-4 [&:nth-child(odd)]:border-r-[#0B1957]
                md:[&:nth-child(n)]:border-r-4 md:[&:nth-child(n)]:border-r-[#0B1957]
                md:[&:last-child]:border-r-0
                [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0
                md:[&:nth-child(3)]:border-b-4 md:[&:nth-child(4)]:border-b-4
              "
            >
              {/* Hover fill sweeps up */}
              <div className="absolute inset-0 bg-[#0B1957] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

              {/* Corner accent */}
              <div className="absolute top-0 left-0 border-t-[18px] border-l-[18px] border-t-[#9ECCFA] border-l-transparent" />

              {/* Count */}
              <span
                className="relative z-10 font-black tabular-nums leading-none text-[#0B1957] group-hover:text-[#9ECCFA] transition-colors duration-300"
                style={{ fontSize: "clamp(2.8rem, 7vw, 4.5rem)" }}
              >
                {counts[i]}
                <sup className="text-[#9ECCFA] group-hover:text-[#D1E8FF] text-xl align-super ml-0.5 transition-colors duration-300">+</sup>
              </span>

              {/* Label */}
              <p className="relative z-10 font-black uppercase text-xs tracking-[0.12em] text-[#0B1957] group-hover:text-[#F8F3EA] transition-colors duration-300 mt-3 leading-snug">
                {stat.label}
              </p>

              {/* Sub-note */}
              <p className="relative z-10 font-semibold text-[10px] uppercase tracking-wide text-[#0B1957] opacity-40 group-hover:text-[#9ECCFA] group-hover:opacity-100 transition-all duration-300 mt-1">
                {stat.note}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom summary bar */}
        <div className="bg-[#0B1957] border-t-4 border-[#0B1957] px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#9ECCFA] flex-shrink-0" />
            <span className="font-black uppercase text-xs tracking-[0.2em] text-[#9ECCFA]">Most Used Stack</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-black text-[#F8F3EA] uppercase text-sm tracking-wider border-2 border-[#9ECCFA] px-4 py-1">
              {topStack[0]}
            </span>
            <span className="font-bold text-[#D1E8FF] text-xs uppercase tracking-wide">
              {topStack[1]}x digunakan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [loading, setLoading]                   = useState(true);
  const [progress, setProgress]                 = useState(0);
  const [visible, setVisible]                   = useState(false);
  const [currentSlide, setCurrentSlide]         = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const [showTop, setShowTop]                   = useState(false);
  const [isMobile, setIsMobile]                 = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const perPage     = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(projects.length / perPage);

  useEffect(() => {
    if (!visible || isHoveringCarousel) return;
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [visible, isHoveringCarousel, totalSlides]);

  useEffect(() => {
    const duration = 1800, interval = 16, steps = duration / interval;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const eased = current < steps * 0.7
        ? (current / (steps * 0.7)) * 85
        : 85 + ((current - steps * 0.7) / (steps * 0.3)) * 15;
      setProgress(Math.min(Math.round(eased), 100));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => { setLoading(false); setTimeout(() => setVisible(true), 50); }, 200);
      }
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useScrollReveal(visible);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToSlide = (idx: number) => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    setCurrentSlide(idx);
  };

  // ── LOADING SCREEN ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1957] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="text-[#9ECCFA] font-bold uppercase text-sm tracking-[0.3em] mb-2">Initializing</p>
            <h1 className="text-4xl font-black uppercase text-[#F8F3EA]">Yusron.dev</h1>
          </div>
          <div className="border-4 border-[#9ECCFA] shadow-[6px_6px_0_#9ECCFA] p-1 mb-4 bg-[#0B1957]">
            <div className="h-8 bg-[#9ECCFA] relative overflow-hidden" style={{ width: `${progress}%`, transition: "width 0.016s linear" }}>
              <div className="absolute inset-0 opacity-40" style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 8px, #D1E8FF 8px, #D1E8FF 16px)", animation: "shimmer 0.4s linear infinite" }} />
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-[#D1E8FF] font-black text-2xl tabular-nums">{progress}%</p>
            <p className="text-[#9ECCFA] font-bold uppercase text-xs tracking-widest">
              {progress < 30 ? "Loading assets..." : progress < 60 ? "Building UI..." : progress < 90 ? "Almost there..." : "Ready!"}
            </p>
          </div>
          <div className="flex gap-2">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="h-2 flex-1 border-2 border-[#9ECCFA]"
                style={{ backgroundColor: progress >= (i+1)*20 ? "#9ECCFA" : "transparent", transition: "background-color 0.15s ease" }} />
            ))}
          </div>
        </div>
        <style>{`@keyframes shimmer { from { transform: translateX(-200%); } to { transform: translateX(200%); } }`}</style>
      </div>
    );
  }

  // ── MAIN PAGE ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes slideUp    { from { opacity:0; transform:translateY(40px);  } to { opacity:1; transform:translateY(0);  } }
        @keyframes slideDown  { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0);  } }
        @keyframes slideLeft  { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0);  } }
        @keyframes slideRight { from { opacity:0; transform:translateX(40px);  } to { opacity:1; transform:translateX(0);  } }

        .anim-navbar    { animation: slideDown  0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-hero-img  { animation: slideLeft  0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .anim-hero-text { animation: slideRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        /* reveal classes handled via inline styles by useScrollReveal hook */

        .btn-brutal { transition: transform 0.08s ease, box-shadow 0.08s ease; }
        .btn-brutal:hover  { transform: translate(2px, 2px);  box-shadow: 2px 2px 0 #0B1957 !important; }
        .btn-brutal:active { transform: translate(4px, 4px);  box-shadow: 0   0   0 #0B1957 !important; }

        .card-brutal { transition: transform 0.15s ease, box-shadow 0.15s ease; cursor: pointer; }
        .card-brutal:hover  { transform: translate(-5px,-5px); box-shadow: 10px 10px 0 #9ECCFA, 12px 12px 0 #0B1957; }
        .card-brutal:active { transform: translate(0,0); box-shadow: 3px 3px 0 #0B1957; }
        .card-brutal:hover .card-img { transform: scale(1.08); }
        .card-img { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .card-overlay { opacity: 0; transition: opacity 0.2s ease; }
        .card-brutal:hover .card-overlay { opacity: 1; }

        .photo-wrap {
          position: relative; overflow: hidden;
          border: 4px solid #0B1957; box-shadow: 10px 10px 0 #0B1957;
          flex-shrink: 0; transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .photo-wrap:hover { transform: translate(-3px,-3px); box-shadow: 13px 13px 0 #0B1957; }
        .photo-wrap img { position: absolute; top:0; left:0; width:100%; height:160%; object-fit:cover; object-position:center top; }

        .contact-card { transition: background 0.15s ease; text-decoration: none; }
        .contact-card:hover { background: #D1E8FF; }
        .contact-card:hover .contact-icon { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #0B1957; }
        .contact-icon { transition: transform 0.15s ease, box-shadow 0.15s ease; }

        .tech-chip {
          display: inline-flex; align-items: center; gap: 8px;
          border: 3px solid #0B1957; padding: 7px 14px 7px 7px;
          background: #F8F3EA; font-size: 11px; font-weight: 800;
          text-transform: uppercase; color: #0B1957; letter-spacing: 0.06em;
          transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
          cursor: default; box-shadow: 3px 3px 0 #0B1957;
          flex: 0 0 calc(25% - 15px); justify-content: flex-start; box-sizing: border-box;
        }
        @media (max-width: 640px) { .tech-chip { flex: 0 0 calc(50% - 6px); } }
        .tech-chip:hover { background: #9ECCFA; transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #0B1957; }
        .tech-chip img { width: 26px; height: 26px; object-fit: cover; border: 2px solid #0B1957; flex-shrink: 0; }

        .stack-icon {
          display: inline-flex; align-items: center; justify-content: center;
          border: 3px solid #0B1957; padding: 8px;
          background-color: #D1E8FF; box-shadow: 3px 3px 0 #0B1957;
          transition: transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease;
          cursor: default;
        }
        .stack-icon:hover { background-color: #9ECCFA; transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #0B1957; }
        .stack-icon img { width: 28px; height: 28px; object-fit: contain; flex-shrink: 0; display: block; }

        .dot { width: 12px; height: 12px; border: 2px solid #0B1957; background: transparent; transition: all 0.2s ease; cursor: pointer; flex-shrink: 0; }
        .dot.active { background: #0B1957; width: 32px; }
        .dot:hover:not(.active) { background: #9ECCFA; }

        .carousel-track { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }

        .back-to-top {
          position: fixed; bottom: 28px; right: 28px; z-index: 99;
          width: 48px; height: 48px;
          border: 4px solid #0B1957; background: #0B1957;
          box-shadow: 4px 4px 0 #9ECCFA;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease, opacity 0.3s ease, visibility 0.3s ease;
        }
        .back-to-top:hover  { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #9ECCFA; }
        .back-to-top:active { transform: translate(0,0); box-shadow: 2px 2px 0 #9ECCFA; }
      `}</style>

      <div className="min-h-screen bg-[#D1E8FF]" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
        <div className="anim-navbar"><Navbar /></div>

        {/* ── HERO ── */}
        <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 sm:pb-20">
          <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0px_0px_#0B1957] flex flex-col md:flex-row overflow-hidden">
            <div className="anim-hero-img md:w-2/5 relative bg-[#9ECCFA] border-b-4 md:border-b-0 md:border-r-4 border-[#0B1957] flex items-center justify-center py-8 sm:py-10 px-6 sm:px-8 min-h-[260px] sm:min-h-[320px]">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px)" }} />
              <div className="photo-wrap" style={{ width: "min(180px, 60vw)", height: "min(220px, 75vw)" }}>
                <img src="/profile/Mboy.jpeg" alt="Yusron" />
              </div>
            </div>
            <div className="anim-hero-text md:w-3/5 p-6 sm:p-10 flex flex-col justify-center relative">
              <span className="absolute top-4 right-6 text-6xl sm:text-8xl font-black text-[#9ECCFA] select-none leading-none" aria-hidden="true">"</span>
              <h1 className="text-4xl sm:text-5xl font-black uppercase mb-3 text-[#0B1957]">Yusron</h1>
              <p className="font-bold uppercase mb-4 sm:mb-5 text-[#9ECCFA] tracking-wider text-sm border-l-4 border-[#9ECCFA] pl-3">IT Programmer</p>
              <p className="font-semibold text-[#0B1957] text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
                Saya membangun aplikasi web modern, dashboard, dan tools internal dengan fokus pada UI yang rapi, performa, dan pengalaman pengguna.
              </p>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <button
                  onClick={() => scrollTo("about")}
                  className="btn-brutal border-4 border-[#0B1957] px-5 sm:px-6 py-2 sm:py-3 font-black uppercase shadow-[4px_4px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957] text-sm sm:text-base"
                >
                  About
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-left" data-delay="0">
          <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">Contact</h2>
          <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] flex flex-col md:flex-row">
            <a href="https://wa.me/6283861669565" target="_blank" rel="noopener noreferrer"
              className="contact-card flex-1 border-b-4 md:border-b-0 md:border-r-4 border-[#0B1957] p-6 sm:p-8 flex flex-row md:flex-col gap-4 items-center md:items-start">
              <div className="contact-icon bg-[#25D366] border-4 border-[#0B1957] w-12 h-12 flex-shrink-0 flex items-center justify-center shadow-[3px_3px_0_#0B1957]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest mb-1">WhatsApp</p>
                <p className="font-black text-[#0B1957] text-base sm:text-lg">083861669565</p>
                <p className="font-semibold text-xs text-[#0B1957] mt-1 uppercase tracking-wide">Klik untuk chat →</p>
              </div>
            </a>
            <a href="mailto:naooolaf@gmail.com"
              className="contact-card flex-1 border-b-4 md:border-b-0 md:border-r-4 border-[#0B1957] p-6 sm:p-8 flex flex-row md:flex-col gap-4 items-center md:items-start">
              <div className="contact-icon bg-[#EA4335] border-4 border-[#0B1957] w-12 h-12 flex-shrink-0 flex items-center justify-center shadow-[3px_3px_0_#0B1957]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div>
                <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest mb-1">Email</p>
                <p className="font-black text-[#0B1957] text-base sm:text-lg break-all">naooolaf@gmail.com</p>
                <p className="font-semibold text-xs text-[#0B1957] mt-1 uppercase tracking-wide">Klik untuk email →</p>
              </div>
            </a>
            <a href="https://github.com/zysrnh" target="_blank" rel="noopener noreferrer"
              className="contact-card flex-1 p-6 sm:p-8 flex flex-row md:flex-col gap-4 items-center md:items-start">
              <div className="contact-icon bg-[#0B1957] border-4 border-[#0B1957] w-12 h-12 flex-shrink-0 flex items-center justify-center shadow-[3px_3px_0_#9ECCFA]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#9ECCFA"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div>
                <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest mb-1">GitHub</p>
                <p className="font-black text-[#0B1957] text-base sm:text-lg">github.com/zysrnh</p>
                <p className="font-semibold text-xs text-[#0B1957] mt-1 uppercase tracking-wide">Klik untuk lihat repo →</p>
              </div>
            </a>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-right" data-delay="0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase text-[#0B1957]">Projects</h2>
            <div className="text-sm font-bold text-[#0B1957] uppercase tracking-widest">{currentSlide + 1} / {totalSlides}</div>
          </div>
          <div className="overflow-hidden" onMouseEnter={() => setIsHoveringCarousel(true)} onMouseLeave={() => setIsHoveringCarousel(false)}>
            <div className="carousel-track flex" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, page) => (
                <div key={page} className={`min-w-full grid gap-4 sm:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
                  {projects.slice(page * perPage, page * perPage + perPage).map((p, i) => (
                    <div key={i} className="card-brutal bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[6px_6px_0_#0B1957] overflow-hidden">
                      <div className="w-full h-40 sm:h-44 overflow-hidden border-b-4 border-[#0B1957] relative">
                        <img src={p.image} alt={p.title} className="card-img w-full h-full object-cover object-top" />
                        <div className="card-overlay absolute inset-0 bg-[#0B1957] bg-opacity-60 flex items-center justify-center">
                          <span className="text-[#9ECCFA] font-black uppercase text-sm border-2 border-[#9ECCFA] px-4 py-2">View Project →</span>
                        </div>
                        <div className="absolute top-3 right-3 bg-[#0B1957] text-[#9ECCFA] text-xs font-black uppercase px-2 py-1">Project</div>
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="font-black uppercase mb-2 text-[#0B1957] text-sm sm:text-base">{p.title}</h3>
                        <p className="font-semibold text-xs sm:text-sm mb-4 text-[#0B1957]">{p.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {p.stacks.map((s, j) => (
                            <div key={j} className="stack-icon" title={s.label}>
                              <img src={s.icon} alt={s.label} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            <div className="flex items-center gap-3">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <div key={i} className={`dot ${currentSlide === i ? "active" : ""}`} onClick={() => goToSlide(i)} />
              ))}
            </div>
            <button className="btn-brutal border-4 border-[#0B1957] px-4 sm:px-5 py-2 font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2">
              Lihat Selengkapnya <span>→</span>
            </button>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <TechStack />

        {/* ── ABOUT ── */}
        <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-scale">
          <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">About</h2>
          <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] flex flex-col md:flex-row overflow-hidden">
            <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
              <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-[0.3em] mb-3">Who am I</p>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#F8F3EA] mb-4 leading-tight">
                Zaki Yusron<br />Hasyimmi
              </h3>
              <div className="w-12 h-1 bg-[#9ECCFA] mb-5" />
              <p className="font-semibold text-[#D1E8FF] leading-relaxed mb-4">
                Seorang IT Programmer yang fokus membangun aplikasi web modern dengan React dan Laravel. Saya menikmati proses merancang UI yang rapi dan membangun sistem yang efisien di balik layar.
              </p>
              <p className="font-semibold text-[#D1E8FF] leading-relaxed mb-6">
                Aktif mengeksplorasi teknologi baru, dari tools AI hingga arsitektur fullstack — selalu ingin belajar dan berkembang.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Role",   value: "IT Programmer" },
                  { label: "Focus",  value: "Fullstack Web" },
                  { label: "Stack",  value: "React + Laravel" },
                  { label: "Status", value: "Open to Work" },
                ].map((item, i) => (
                  <div key={i} className="border-2 border-[#9ECCFA] p-3">
                    <p className="text-[#9ECCFA] font-black uppercase text-xs tracking-widest mb-1">{item.label}</p>
                    <p className="text-[#F8F3EA] font-bold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-2/5 relative bg-[#9ECCFA] border-t-4 md:border-t-0 md:border-l-4 border-[#9ECCFA] flex items-center justify-center py-10 px-8 min-h-[280px]">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 32px)" }} />
              <div className="photo-wrap" style={{ width: "min(260px, 70vw)", height: "min(320px, 85vw)" }}>
                <img src="/profile/Mboy.jpeg" alt="Zaki Yusron" />
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECT STATS ── */}
        <ProjectCount />

        {/* ── FOOTER ── */}
        <footer className="border-t-4 border-[#0B1957] bg-[#F8F3EA] reveal">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <div className="font-black text-2xl text-[#0B1957] mb-1">Yusron.dev</div>
                <p className="font-semibold text-sm text-[#0B1957] opacity-70">Made with ☕ by Zaki Yusron Hasyimmi</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest mb-1">Quick Links</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {["Hero", "Projects", "About", "Contact"].map(l => (
                    <a key={l}
                      onClick={() => scrollTo(l.toLowerCase())}
                      className="font-bold text-sm text-[#0B1957] uppercase cursor-pointer hover:underline">
                      {l === "Hero" ? "Home" : l}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest mb-1">Connect</p>
                <div className="flex gap-3">
                  <a href="https://wa.me/6283861669565" target="_blank" rel="noopener noreferrer"
                    className="border-4 border-[#0B1957] w-10 h-10 flex items-center justify-center bg-[#25D366] shadow-[3px_3px_0_#0B1957] btn-brutal">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                  <a href="mailto:naooolaf@gmail.com"
                    className="border-4 border-[#0B1957] w-10 h-10 flex items-center justify-center bg-[#EA4335] shadow-[3px_3px_0_#0B1957] btn-brutal">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  </a>
                  <a href="https://github.com/zysrnh" target="_blank" rel="noopener noreferrer"
                    className="border-4 border-[#0B1957] w-10 h-10 flex items-center justify-center bg-[#0B1957] shadow-[3px_3px_0_#9ECCFA] btn-brutal">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#9ECCFA"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t-4 border-[#0B1957] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
              <p className="font-bold uppercase text-xs text-[#0B1957] tracking-widest">
                © {new Date().getFullYear()} Zaki Yusron Hasyimmi
              </p>
              <p className="font-bold uppercase text-xs text-[#0B1957] opacity-50 tracking-widest">
                Built with React + Vite + Tailwind
              </p>
            </div>
          </div>
        </footer>

        {/* ── BACK TO TOP ── */}
        <button
          className="back-to-top"
          style={{ opacity: showTop ? 1 : 0, visibility: showTop ? "visible" : "hidden" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ECCFA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </>
  );
}