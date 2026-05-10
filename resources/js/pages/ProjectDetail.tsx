"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { router } from "@inertiajs/react";
import Navbar from "@/components/Navbar"; 

// ── Icons ──────────────────────────────────────────────────────────────────────
const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
); 
const IconGlobe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const IconZoom = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);
const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ── Types ──────────────────────────────────────────────────────────────────────
interface Stack {
  id: number;
  label: string;
  icon: string;
}

interface SocialLink     { platform: string; url: string; }
interface Collaborator   { name: string; role: string; origin: string; socials: SocialLink[]; photo: string; }

interface ProjectData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  status: "Hosted" | "In Progress" | "Planning";
  date: string;
  duration: string;
  images: string[];
  stacks: Stack[];
  tech_stack_ids: number[];
  features: { title: string; desc: string }[];
  demoUrl: string | null;
  githubUrl: string | null;
  order: number;
  visible: boolean;
  workType: "Solo" | "Collaboration";
  soloRole: string;
  collaborators: Collaborator[];
}

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  "Hosted":      { bg: "bg-[#9ECCFA]",  text: "text-[#0B1957]", dot: "bg-[#0B1957]" },
  "In Progress": { bg: "bg-[#FFE8A0]",  text: "text-[#0B1957]", dot: "bg-[#F59E0B]" },
  "Planning":    { bg: "bg-[#F8F3EA]",  text: "text-[#0B1957]", dot: "bg-[#9ECCFA]" },
};

// ── useInView ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ── AnimBlock ──────────────────────────────────────────────────────────────────
function AnimBlock({
  children, delay = 0, from = "bottom", className = "", style = {}
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right" | "none";
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  const translateMap = {
    bottom: "translateY(36px)",
    left:   "translateX(-36px)",
    right:  "translateX(36px)",
    none:   "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : translateMap[from],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── SpotlightCard ──────────────────────────────────────────────────────────────
function SpotlightCard({ children, className = "", style = {}, onClick }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

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
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="spotlight-glow" style={{ left: spotlight.x, top: spotlight.y, opacity: spotlight.opacity }} />
      {children}
    </div>
  );
}

// ── FeatureItem ────────────────────────────────────────────────────────────────
function FeatureItem({ title, desc, index }: { title: string; desc: string; index: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className="feature-item p-5 flex gap-4 items-start"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
      }}
    >
      <div className="flex-shrink-0 w-7 h-7 bg-[#0B1957] border-2 border-[#0B1957] flex items-center justify-center text-[#9ECCFA] mt-0.5">
        <IconCheck />
      </div>
      <div>
        <p className="font-black uppercase text-sm text-[#0B1957] mb-1 tracking-wide">{title}</p>
        <p className="font-semibold text-sm text-[#0B1957] opacity-70 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── SectionHeading ─────────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView(0.3);
  return (
    <div ref={ref} className="mb-4">
      <h2 className={`section-heading text-xl font-black uppercase text-[#0B1957] ${inView ? "visible" : ""}`}>
        {children}
      </h2>
    </div>
  );
}

// ── Skeleton loaders ───────────────────────────────────────────────────────────
function SkeletonHero() {
  return (
    <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] p-8 sm:p-10 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 hero-grid" />
      <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-4">
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="skeleton-shimmer-dark" style={{ height: 10, width: 80 }} />
          <div className="skeleton-shimmer-dark" style={{ height: 48, width: "60%" }} />
          <div className="skeleton-shimmer-dark" style={{ height: 20, width: "80%" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
          <div className="skeleton-shimmer-dark" style={{ width: 120, height: 44 }} />
          <div className="skeleton-shimmer-dark" style={{ width: 120, height: 56 }} />
          <div className="skeleton-shimmer-dark" style={{ width: 120, height: 56 }} />
        </div>
      </div>
    </div>
  );
}

function SkeletonGallery() {
  return (
    <div>
      <div className="skeleton-shimmer mb-4" style={{ height: 20, width: 80 }} />
      <div className="skeleton-shimmer" style={{ width: "100%", height: 384, border: "4px solid #0B1957" }} />
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="skeleton-shimmer" style={{ flex: 1, height: 80, border: "3px solid #0B1957" }} />
        ))}
      </div>
    </div>
  );
}

// ── CollaboratorPopup ────────────────────────────────────────────────────────
function CollaboratorPopup({ collab, onClose }: { collab: Collaborator; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0B1957]/30 backdrop-blur-sm" onClick={onClose}>
      <style>{`
        @keyframes pcFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pcScaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .collab-grid { background-image: radial-gradient(#0B1957 1px, transparent 1px); background-size: 12px 12px; }
      `}</style>
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[12px_12px_0_#0B1957] w-full max-w-[360px] relative overflow-hidden" 
        style={{animation:"pcScaleIn 0.3s cubic-bezier(0.16,1,0.3,1), pcFadeIn 0.2s ease"}} onClick={e=>e.stopPropagation()}>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#9ECCFA]/10 -rotate-12 translate-x-12 -translate-y-12" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FFE8A0]/20 rotate-45 -translate-x-12 translate-y-12" />
        
        <div className="bg-[#0B1957] p-4 flex items-center justify-between border-b-4 border-[#0B1957] relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#9ECCFA] animate-pulse" />
            <span className="font-black text-[10px] uppercase text-[#9ECCFA] tracking-[0.3em]">Collaborator Profile</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#9ECCFA] hover:bg-[#9ECCFA] hover:text-[#0B1957] transition-all border-2 border-transparent hover:border-[#0B1957]"><IconClose /></button>
        </div>

        <div className="p-8 flex flex-col items-center relative z-10 collab-grid">
          {/* Profile Section with Branded Frame */}
          <div className="relative mb-8">
             <div className="absolute inset-0 bg-[#0B1957] translate-x-2 translate-y-2" />
             <div className="relative w-28 h-28 border-4 border-[#0B1957] bg-white overflow-hidden">
                {collab.photo ? <img src={collab.photo} className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" /> : <div className="w-full h-full flex items-center justify-center text-4xl bg-[#D1E8FF]">👤</div>}
             </div>
             <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#9ECCFA] border-4 border-[#0B1957] flex items-center justify-center text-[#0B1957]">
                <IconCheck />
             </div>
             <div className="absolute -bottom-2 -right-6 bg-[#0B1957] border-2 border-[#9ECCFA] px-2 py-0.5 rotate-6">
                <span className="font-black text-[8px] text-[#9ECCFA] uppercase tracking-tighter">Verified Team</span>
             </div>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black uppercase text-[#0B1957] mb-1 tracking-tighter leading-none">{collab.name}</h3>
            <div className="inline-block bg-[#0B1957] px-3 py-1 mt-2">
               <p className="font-black text-[10px] text-[#9ECCFA] uppercase tracking-widest">{collab.role}</p>
            </div>
            {collab.origin && (
              <p className="font-bold text-[10px] text-[#0B1957] opacity-60 mt-2 uppercase tracking-wide">From {collab.origin}</p>
            )}
          </div>

          {/* Socials Divider */}
          <div className="w-full flex items-center gap-3 mb-6">
            <div className="flex-1 h-[2px] bg-[#0B1957] opacity-10" />
            <span className="font-black text-[9px] text-[#0B1957] opacity-30 uppercase tracking-[0.3em]">Social Links</span>
            <div className="flex-1 h-[2px] bg-[#0B1957] opacity-10" />
          </div>

          <div className="w-full space-y-3">
            {collab.socials && collab.socials.length > 0 ? (
              collab.socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-4 border-[4px] border-[#0B1957] p-3 bg-white hover:bg-[#FFE8A0] transition-all group shadow-[5px_5px_0_#0B1957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                  <div className="w-9 h-9 bg-[#0B1957] flex items-center justify-center text-[#9ECCFA] group-hover:scale-110 transition-transform flex-shrink-0 shadow-[2px_2px_0_#9ECCFA]">
                    {s.platform === "instagram" && <IconInstagram />}
                    {s.platform === "github" && <IconGithubSmall />}
                    {s.platform === "linkedin" && <IconLinkedin />}
                    {s.platform === "twitter" && <IconTwitter />}
                    {s.platform === "web" && <IconGlobe />}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-black uppercase text-[10px] text-[#0B1957] tracking-wider leading-none mb-1">{s.platform}</span>
                    <span className="font-bold text-[9px] text-[#0B1957] opacity-40 truncate">Visit Profile →</span>
                  </div>
                </a>
              ))
            ) : (
              <div className="py-6 border-4 border-dashed border-[#0B1957]/10 bg-[#0B1957]/5 text-center w-full group overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#0B1957] opacity-10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                 <p className="text-[10px] font-black uppercase text-[#0B1957] opacity-30 tracking-[0.4em]">No Social Links Provided</p>
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-[#0B1957] opacity-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </div>
            )}
          </div>
          
          <div className="mt-10 flex flex-col items-center gap-3">
             <button onClick={onClose} 
               className="font-black text-[10px] uppercase text-white bg-[#0B1957] px-8 py-2 border-2 border-[#0B1957] shadow-[4px_4px_0_#9ECCFA] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all tracking-[0.2em]">
               Close Details
             </button>
             <p className="text-[8px] font-bold uppercase text-[#0B1957] opacity-20">Naoo Portfolio System v2.0</p>
          </div>
        </div>

        {/* Decorative Corner Block */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#0B1957] flex items-center justify-center translate-x-4 translate-y-4 rotate-45 z-20" />
      </div>
    </div>
  );
}

const IconInstagram = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const IconLinkedin  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const IconTwitter   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;
const IconGithubSmall = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;

// ── Props ──────────────────────────────────────────────────────────────────────
interface Props { projectId: string; }

export default function ProjectDetail({ projectId }: Props) {
  const [project,       setProject]       = useState<ProjectData | null>(null);
  const [otherProjects, setOtherProjects] = useState<ProjectData[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(false);
  const [pageIn,        setPageIn]        = useState(false);
  const [activeImg,     setActiveImg]     = useState(0);
  const [lightbox,      setLightbox]      = useState<number | null>(null);
  const [activeCollab,  setActiveCollab]  = useState<Collaborator | null>(null);
  const [showTop,       setShowTop]       = useState(false);
  const [heroOffset,    setHeroOffset]    = useState(0);

  useEffect(() => { const t = setTimeout(() => setPageIn(true), 40); return () => clearTimeout(t); }, []);

  // Fetch project detail
  useEffect(() => {
    setLoading(true);
    setError(false);
    setActiveImg(0);

    fetch(`/api/projects/${projectId}`)
      .then(r => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data: ProjectData) => {
        setProject(data);
        setLoading(false);

        // Fetch other projects setelah dapat project utama
        return fetch("/api/projects");
      })
      .then(r => r ? r.json() : [])
      .then((all: ProjectData[]) => {
        if (Array.isArray(all)) {
          setOtherProjects(all.filter(p => p.slug !== projectId).slice(0, 3));
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [projectId]);

  useEffect(() => {
    const h = () => {
      setShowTop(window.scrollY > 300);
      setHeroOffset(window.scrollY * 0.15);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (lightbox === null || !project) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i !== null ? (i + 1) % project.images.length : null);
      if (e.key === "ArrowLeft")  setLightbox(i => i !== null ? (i - 1 + project.images.length) % project.images.length : null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightbox, project?.images?.length]);

  // ── Error state ──
  if (!loading && error) {
    return (
      <div className="min-h-screen bg-[#D1E8FF] flex items-center justify-center">
        <div className="bg-[#FFD1D1] border-4 border-[#0B1957] p-12 shadow-[10px_10px_0_#0B1957] text-center max-w-md mx-4">
          <h1 className="font-black text-4xl uppercase text-[#0B1957] mb-4">404</h1>
          <p className="font-bold text-[#0B1957] mb-6 opacity-70">Project tidak ditemukan atau gagal dimuat.</p>
          <button
            onClick={() => router.visit("/projects")}
            className="btn-brutal border-4 border-[#0B1957] px-6 py-3 font-black uppercase shadow-[4px_4px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957]"
          >
            Kembali ke Projects
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = project ? (STATUS_STYLE[project.status] ?? STATUS_STYLE["Planning"]) : STATUS_STYLE["Planning"];

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp    { from{opacity:0;transform:translateY(40px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes fadeSlideLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeSlideRight { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn         { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn        { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer        { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes floatBadge     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes skeletonPulse  { 0%,100%{opacity:0.5} 50%{opacity:1} }

        .page-enter { opacity: 0; transition: opacity 0.4s ease; }
        .page-enter.visible { opacity: 1; }

        .hero-in    { animation: fadeSlideUp    0.7s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .back-in    { animation: fadeSlideLeft  0.5s cubic-bezier(0.16,1,0.3,1) 0.0s  both; }
        .gallery-in { animation: fadeSlideLeft  0.7s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }

        .hero-grid {
          background-image:
            repeating-linear-gradient(0deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px),
            repeating-linear-gradient(90deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px);
        }

        .btn-brutal { transition: transform 0.1s ease, box-shadow 0.1s ease; }
        .btn-brutal:hover  { transform: translate(2px,2px);  box-shadow: 2px 2px 0 #0B1957 !important; }
        .btn-brutal:active { transform: translate(4px,4px);  box-shadow: 0 0 0 #0B1957 !important; }

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
        .back-btn svg    { transition: transform 0.2s ease; }
        .back-btn:hover svg { transform: translateX(-4px); }

        .main-img-wrap {
          border: 4px solid #0B1957; overflow: hidden;
          box-shadow: 8px 8px 0 #0B1957; cursor: zoom-in; position: relative;
        }
        .main-img-wrap img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .main-img-wrap:hover img { transform: scale(1.04); }
        .zoom-badge { opacity: 0; transition: opacity 0.2s ease; }
        .main-img-wrap:hover .zoom-badge { opacity: 1; }

        .thumb-item {
          border: 3px solid #0B1957; overflow: hidden; cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 3px 3px 0 #0B1957;
        }
        .thumb-item:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #0B1957; }
        .thumb-item.active { box-shadow: 4px 4px 0 #9ECCFA, 6px 6px 0 #0B1957; }

        .tech-card {
          border: 4px solid #0B1957; background: #F8F3EA; box-shadow: 6px 6px 0 #0B1957;
          transition: transform 0.18s cubic-bezier(0.16,1,0.3,1), box-shadow 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        .tech-card:hover { transform: translate(-3px,-3px); box-shadow: 9px 9px 0 #9ECCFA, 11px 11px 0 #0B1957; }

        .feature-item {
          border: 3px solid #0B1957; background: #F8F3EA; box-shadow: 4px 4px 0 #0B1957;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        .feature-item:hover { background: #D1E8FF; transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #0B1957; }

        .spotlight-card {
          position: relative; overflow: hidden; cursor: pointer;
          background: #F8F3EA; border: 4px solid #0B1957; box-shadow: 5px 5px 0 #0B1957;
          transition: transform 0.18s cubic-bezier(0.16,1,0.3,1), box-shadow 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        .spotlight-card:hover { transform: translate(-4px,-4px); box-shadow: 9px 9px 0 #9ECCFA, 11px 11px 0 #0B1957; }
        .spotlight-card:hover .card-img-inner { transform: scale(1.06); }
        .card-img-inner { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .spotlight-card:hover .card-overlay-inner { opacity: 1; }
        .card-overlay-inner { opacity: 0; transition: opacity 0.22s ease; }
        .spotlight-glow {
          position: absolute; width: 300px; height: 300px; border-radius: 50%;
          transform: translate(-50%,-50%);
          background: radial-gradient(circle at center, rgba(158,204,250,0.25) 0%, rgba(158,204,250,0.1) 40%, transparent 70%);
          pointer-events: none; z-index: 10; transition: opacity 0.3s ease; mix-blend-mode: screen;
        }

        .lightbox-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(11,25,87,0.93);
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.2s ease; backdrop-filter: blur(6px);
        }
        .lightbox-img {
          max-width: 90vw; max-height: 85vh;
          border: 4px solid #9ECCFA;
          box-shadow: 0 0 0 4px #0B1957, 10px 10px 0 #9ECCFA;
          object-fit: contain; animation: scaleIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .lb-btn {
          border: 4px solid #9ECCFA; background: #0B1957; color: #9ECCFA;
          width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: transform 0.1s ease, box-shadow 0.1s ease;
          box-shadow: 3px 3px 0 #9ECCFA;
        }
        .lb-btn:hover { transform: translate(-1px,-1px); box-shadow: 4px 4px 0 #9ECCFA; }
        .lb-btn:active { transform: translate(2px,2px); box-shadow: 0 0 0 #9ECCFA; }

        .back-to-top {
          position: fixed; bottom: 28px; right: 28px; z-index: 99;
          width: 48px; height: 48px; border: 4px solid #0B1957;
          background: #0B1957; box-shadow: 4px 4px 0 #9ECCFA;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.3s ease, visibility 0.3s ease;
        }
        .back-to-top:hover  { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #9ECCFA; }
        .back-to-top:active { transform: translate(2px,2px); box-shadow: 0 0 0 #9ECCFA; }

        .info-row { transition: background 0.15s ease; }
        .info-row:hover { background: rgba(158,204,250,0.08); }

        .section-heading { position: relative; display: inline-block; }
        .section-heading::after {
          content: ''; position: absolute; left: 0; bottom: -4px;
          height: 3px; background: #0B1957; width: 0;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .section-heading.visible::after { width: 100%; }

        /* Skeleton */
        .skeleton-shimmer {
          background: linear-gradient(90deg, #D1E8FF 25%, #b8daff 50%, #D1E8FF 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite, skeletonPulse 1.4s ease infinite;
        }
        .skeleton-shimmer-dark {
          background: linear-gradient(90deg, rgba(158,204,250,0.2) 25%, rgba(158,204,250,0.4) 50%, rgba(158,204,250,0.2) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite, skeletonPulse 1.4s ease infinite;
        }
      `}</style>

      <div className={`min-h-screen bg-[#D1E8FF] page-enter ${pageIn ? "visible" : ""}`}>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20">

          {/* BACK */}
          <div className="back-in mb-8">
            <button className="back-btn" onClick={() => router.visit("/projects")}>
              <IconArrowLeft /> Kembali ke Projects
            </button>
          </div>

          {/* HERO — skeleton atau data */}
          {loading ? (
            <SkeletonHero />
          ) : project && (
            <div className="hero-in bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] p-8 sm:p-10 mb-8 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 hero-grid"
                style={{ transform: `translateY(${heroOffset}px)`, transition: "transform 0.1s linear" }}
              />
              <div className="absolute top-0 right-0 w-48 h-48 opacity-5" style={{
                background: "radial-gradient(circle at top right, #9ECCFA, transparent 70%)"
              }} />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-[0.3em] mb-2">Project Detail</p>
                  <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#F8F3EA] mb-3 leading-tight">
                    {project.title}
                  </h1>
                  <p className="font-semibold text-[#D1E8FF] text-base sm:text-lg max-w-2xl">{project.subtitle}</p>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <div
                    className={`inline-flex items-center gap-2 border-4 border-[#F8F3EA] px-4 py-2 ${statusStyle.bg}`}
                    style={{ animation: "floatBadge 3s ease-in-out 1s infinite" }}
                  >
                    <div className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                    <span className={`font-black uppercase text-sm tracking-wider ${statusStyle.text}`}>{project.status}</span>
                  </div>
                  <div className="border-2 border-[#9ECCFA] p-3 text-center">
                    <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest mb-1">Tanggal</p>
                    <p className="font-black text-[#F8F3EA] text-sm">{project.date}</p>
                  </div>
                  <div className="border-2 border-[#9ECCFA] p-3 text-center">
                    <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest mb-1">Durasi</p>
                    <p className="font-black text-[#F8F3EA] text-sm">{project.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MAIN GRID */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <SkeletonGallery />
                <div>
                  <div className="skeleton-shimmer mb-4" style={{ height: 20, width: 100 }} />
                  <div className="skeleton-shimmer" style={{ width: "100%", height: 140, border: "4px solid #0B1957" }} />
                </div>
                <div>
                  <div className="skeleton-shimmer mb-4" style={{ height: 20, width: 100 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} className="skeleton-shimmer" style={{ height: 72, border: "3px solid #0B1957" }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <div className="skeleton-shimmer mb-4" style={{ height: 20, width: 80 }} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {[0, 1].map(i => (
                      <div key={i} className="skeleton-shimmer" style={{ width: "calc(50% - 6px)", height: 80, border: "4px solid #0B1957" }} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="skeleton-shimmer mb-4" style={{ height: 20, width: 50 }} />
                  <div className="skeleton-shimmer" style={{ height: 200, border: "4px solid #0B1957" }} />
                </div>
              </div>
            </div>
          ) : project && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* LEFT COL */}
              <div className="lg:col-span-2 space-y-8">

                {/* GALLERY */}
                <div className="gallery-in">
                  <SectionHeading>Gallery</SectionHeading>
                  {project.images?.length > 0 ? (
                    <>
                      <div className="main-img-wrap" onClick={() => setLightbox(activeImg)}>
                        <img
                          src={project.images[activeImg]}
                          alt={`screenshot ${activeImg + 1}`}
                          className="w-full h-64 sm:h-96 object-cover object-top"
                        />
                        <div className="zoom-badge absolute top-3 right-3 bg-[#0B1957] border-2 border-[#9ECCFA] px-3 py-2 flex items-center gap-2">
                          <IconZoom />
                          <span className="text-[#9ECCFA] font-black uppercase text-xs">Zoom</span>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-[#0B1957] border-2 border-[#9ECCFA] px-3 py-1">
                          <span className="text-[#9ECCFA] font-black text-xs">{activeImg + 1} / {project.images.length}</span>
                        </div>
                      </div>
                      {project.images.length > 1 && (
                        <div className="flex gap-3 mt-4">
                          {project.images.map((img, i) => (
                            <div
                              key={i}
                              className={`thumb-item flex-1 h-20 ${activeImg === i ? "active" : ""}`}
                              onClick={() => setActiveImg(i)}
                            >
                              <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover object-top" />
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[8px_8px_0_#0B1957] w-full h-64 flex items-center justify-center">
                      <p className="font-black uppercase text-sm text-[#0B1957] opacity-30">Belum Ada Gambar</p>
                    </div>
                  )}
                </div>

                {/* DESCRIPTION */}
                <AnimBlock from="right" delay={50}>
                  <SectionHeading>Deskripsi</SectionHeading>
                  <div className="bg-[#F8F3EA] border-4 border-[#0B1957] p-6 sm:p-8 shadow-[6px_6px_0_#0B1957]">
                    <p className="font-semibold text-[#0B1957] leading-relaxed text-base">{project.longDesc}</p>
                  </div>
                </AnimBlock>

                {/* FEATURES */}
                {project.features?.length > 0 && (
                  <AnimBlock from="bottom" delay={80}>
                    <SectionHeading>Fitur-Fitur</SectionHeading>
                    <div className="space-y-3">
                      {project.features.map((f, i) => (
                        <FeatureItem key={i} title={f.title} desc={f.desc} index={i} />
                      ))}
                    </div>
                  </AnimBlock>
                )}

                {/* COLLABORATORS */}
                {project.workType === "Collaboration" && project.collaborators?.length > 0 && (
                  <AnimBlock from="bottom" delay={100}>
                    <SectionHeading>Kolaborator Project</SectionHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.collaborators.map((c, i) => (
                        <div key={i} onClick={()=>setActiveCollab(c)}
                          className="bg-[#F8F3EA] border-4 border-[#0B1957] p-5 shadow-[6px_6px_0_#0B1957] flex items-center gap-5 group hover:bg-[#D1E8FF] transition-colors duration-300 cursor-pointer hover:-translate-y-1">
                          <div className="flex-shrink-0 w-16 h-16 border-4 border-[#0B1957] bg-[#D1E8FF] overflow-hidden group-hover:scale-110 transition-transform duration-300">
                            {c.photo ? (
                              <img src={c.photo} alt={c.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-sm uppercase text-[#0B1957] tracking-wider mb-1 truncate">{c.name}</p>
                            <p className="font-bold text-xs text-[#0B1957] opacity-60 mb-2 truncate">{c.role} {c.origin && `· ${c.origin}`}</p>
                            <div className="inline-flex items-center gap-1.5 font-black text-[10px] uppercase text-[#9ECCFA] bg-[#0B1957] px-3 py-1 group-hover:bg-[#9ECCFA] group-hover:text-[#0B1957] transition-all">
                               PROFILE
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimBlock>
                )}
              </div>

              {/* SIDEBAR */}
              <div className="space-y-8">

                {/* TECH STACK */}
                {project.stacks?.length > 0 && (
                  <AnimBlock from="right" delay={100}>
                    <SectionHeading>Tech Stack</SectionHeading>
                    <div className="flex flex-wrap gap-3">
                      {project.stacks.map((tech, i) => (
                        <div
                          key={i}
                          className="tech-card p-4 flex flex-col items-center justify-center gap-2 w-[calc(50%-6px)]"
                          title={tech.label}
                        >
                          <div className="border-2 border-[#0B1957] p-2 bg-[#D1E8FF]">
                            <img src={tech.icon} alt={tech.label} className="w-12 h-12 object-contain" />
                          </div>
                          <span className="font-black text-xs uppercase text-[#0B1957] tracking-wide text-center">{tech.label}</span>
                        </div>
                      ))}
                    </div>
                  </AnimBlock>
                )}

                {/* LINKS */}
                {(project.demoUrl || project.githubUrl) && (
                  <AnimBlock from="right" delay={140}>
                    <SectionHeading>Links</SectionHeading>
                    <div className="space-y-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-brutal flex items-center justify-center gap-3 border-4 border-[#0B1957] py-4 font-black uppercase text-sm shadow-[4px_4px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957] w-full"
                        >
                          <IconGlobe /> Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-brutal flex items-center justify-center gap-3 border-4 border-[#0B1957] py-4 font-black uppercase text-sm shadow-[4px_4px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] w-full"
                        >
                          <IconGithub /> GitHub Repo
                        </a>
                      )}
                    </div>
                  </AnimBlock>
                )}

                {/* INFO */}
                <AnimBlock from="right" delay={180}>
                  <SectionHeading>Info</SectionHeading>
                  <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[6px_6px_0_#9ECCFA] overflow-hidden">
                    {[
                      { label: "Status",  value: project.status },
                      { label: "Tanggal", value: project.date },
                      { label: "Durasi",  value: project.duration },
                      { label: "Pengerjaan", value: project.workType === "Solo" ? (project.soloRole || "Mandiri") : "Kolaborasi Tim" },
                      { label: "Stack",   value: project.stacks?.map(s => s.label).join(", ") || "-" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="info-row flex justify-between items-center px-5 py-4 border-b-2 border-[#9ECCFA] last:border-b-0"
                        style={{
                          opacity: 0,
                          animation: `fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.07}s forwards`,
                        }}
                      >
                        <p className="font-black text-xs uppercase text-[#9ECCFA] tracking-widest">{item.label}</p>
                        <p className="font-bold text-sm text-[#F8F3EA] text-right max-w-[60%]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </AnimBlock>
              </div>
            </div>
          )}

          {/* OTHER PROJECTS */}
          {!loading && otherProjects.length > 0 && (
            <AnimBlock from="bottom" delay={50} className="mt-16">
              <SectionHeading>Project Lainnya</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherProjects.map((p, i) => (
                  <AnimBlock key={p.id} from="bottom" delay={i * 80}>
                    <SpotlightCard onClick={() => router.visit(`/projects/${p.slug}`)}>
                      <div className="overflow-hidden border-b-4 border-[#0B1957] relative">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="card-img-inner w-full h-32 object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-32 bg-[#D1E8FF] flex items-center justify-center">
                            <span className="font-black uppercase text-xs text-[#0B1957] opacity-30">No Image</span>
                          </div>
                        )}
                        <div className="card-overlay-inner absolute inset-0 bg-[#0B1957] bg-opacity-55 flex items-center justify-center">
                          <span className="text-[#9ECCFA] font-black uppercase text-xs border-2 border-[#9ECCFA] px-3 py-1.5">
                            Lihat Detail →
                          </span>
                        </div>
                      </div>
                      <div className="p-5 relative z-20">
                        <p className="font-black uppercase text-sm text-[#0B1957] mb-2">{p.title}</p>
                        <p className="font-semibold text-xs text-[#0B1957] opacity-60 mb-3 leading-relaxed">{p.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {p.stacks?.map((s, j) => (
                            <div key={j} title={s.label} className="border-2 border-[#0B1957] bg-[#D1E8FF] p-1">
                              <img src={s.icon} alt={s.label} className="w-6 h-6 object-contain" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </AnimBlock>
                ))}
              </div>
            </AnimBlock>
          )}
        </div>

        {/* LIGHTBOX */}
        {lightbox !== null && project && (
          <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
            <button className="lb-btn absolute top-6 right-6 z-10" onClick={() => setLightbox(null)}>
              <IconClose />
            </button>
            {project.images.length > 1 && (
              <button
                className="lb-btn absolute left-4 sm:left-8"
                onClick={e => {
                  e.stopPropagation();
                  setLightbox(i => i !== null ? (i - 1 + project.images.length) % project.images.length : null);
                }}
              >
                <IconChevronLeft />
              </button>
            )}
            <img
              src={project.images[lightbox]}
              alt=""
              className="lightbox-img"
              onClick={e => e.stopPropagation()}
            />
            {project.images.length > 1 && (
              <button
                className="lb-btn absolute right-4 sm:right-8"
                onClick={e => {
                  e.stopPropagation();
                  setLightbox(i => i !== null ? (i + 1) % project.images.length : null);
                }}
              >
                <IconChevronRight />
              </button>
            )}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 border-2 border-[#9ECCFA] bg-[#0B1957] px-4 py-2">
              <span className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">
                {lightbox + 1} / {project.images.length}
              </span>
            </div>
          </div>
        )}

        {/* COLLAB POPUP */}
        {activeCollab && (
          <CollaboratorPopup collab={activeCollab} onClose={()=>setActiveCollab(null)} />
        )}

        {/* BACK TO TOP */}
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