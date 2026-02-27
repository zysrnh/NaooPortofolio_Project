import { useState, useEffect, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import TechStackCRUD from "@/components/TechStackCRUD";
import HomepageManager from "@/components/HomepageManager";
import ProjectCRUD from "@/components/ProjectCRUD";
import AboutManager from "@/components/AboutManager";

// ── SVG Icons ─────────────────────────────────────────────────────────────────
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
const IconInfo      = ({ size = 18 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const IconMail      = ({ size = 18 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconTrash     = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const IconCheck     = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconRefresh   = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const IconTrend     = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const IconActivity  = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconGithub    = ({ size = 20 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const IconCode      = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;

// ── Icon from DB (base64 / URL) ───────────────────────────────────────────────
const FALLBACK_ICON_DB = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3C/svg%3E";
const DbIcon = ({ src, size = 16, alt = "" }: { src: string; size?: number; alt?: string }) => (
  <img src={src || FALLBACK_ICON_DB} alt={alt}
    style={{ width: size, height: size, objectFit: "cover", flexShrink: 0, display: "inline-block" }}
    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_ICON_DB; }}
  />
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface ProjectItem {
  id: number; slug: string; title: string; desc: string; status: string;
  stacks: { id: number; label: string; icon: string }[];
  date: string; visible: boolean;
}
interface Message {
  id: number; name: string; email: string; subject: string | null;
  message: string; is_read: boolean; read_at: string | null;
  ip_address: string | null; created_at: string;
}
interface MessageStats { total: number; unread: number; today: number; }
interface Availability {
  status: string; freelance: boolean; remote: boolean;
  collaboration: boolean; timezone: string;
}

const STATUS_STYLE: Record<string, string> = {
  "Hosted":      "bg-[#9ECCFA] border-[#0B1957] text-[#0B1957]",
  "Live":        "bg-[#9ECCFA] border-[#0B1957] text-[#0B1957]",
  "In Progress": "bg-[#FFE8A0] border-[#0B1957] text-[#0B1957]",
  "Planning":    "bg-[#F8F3EA] border-[#0B1957] text-[#0B1957]",
};

const NAV_ITEMS = [
  { key: "overview",  label: "Overview",   icon: <IconGrid /> },
  { key: "projects",  label: "Projects",   icon: <IconFolder size={18} /> },
  { key: "stacks",    label: "Tech Stack", icon: <IconLayers size={18} /> },
  { key: "homepage",  label: "Homepage",   icon: <IconGlobe size={18} /> },
  { key: "about",     label: "About Page", icon: <IconInfo size={18} /> },
  { key: "messages",  label: "Messages",   icon: <IconMail size={18} /> },
  { key: "profile",   label: "Profile",    icon: <IconUser /> },
];

function getCsrfToken(): string {
  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  if (meta?.content) return meta.content;
  const m = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}

// ── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: visible ? "section-visible" : "section-hidden", style: { animationDelay: `${delay}s` } };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ── CHART COMPONENTS ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

function Sparkline({ data, color = "#9ECCFA", height = 36, width = 120 }: {
  data: number[]; color?: string; height?: number; width?: number;
}) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(" ");
  const lastPt = pts.split(" ").slice(-1)[0].split(",");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 2px 6px ${color}88)` }} />
      <circle cx={lastPt[0]} cy={lastPt[1]} r="3.5" fill={color} stroke="#0B1957" strokeWidth="2" />
    </svg>
  );
}

function MiniBarChart({ data, color = "#9ECCFA", height = 64 }: {
  data: { label?: string; value: number }[]; color?: string; height?: number;
}) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%" }}>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
            <div style={{
              width: "100%",
              height: `${Math.max((d.value / max) * 100, 5)}%`,
              background: i === data.length - 1 ? "#0B1957" : color,
              border: "2px solid #0B1957",
              boxShadow: "1px 1px 0 rgba(11,25,87,0.3)",
              transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`,
            }} />
          </div>
          {d.label && (
            <span style={{ fontSize: 7, fontWeight: 900, color: "#0B1957", opacity: 0.45, textTransform: "uppercase" }}>{d.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments, size = 110 }: {
  segments: { label: string; value: number; color: string }[]; size?: number;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  let cumulative = 0;
  const r = 38, cx = 50, cy = 50, strokeW = 14;
  const circumference = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#D1E8FF" strokeWidth={strokeW} />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circumference;
        const offset = circumference * (1 - cumulative);
        cumulative += pct;
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth={strokeW}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
            style={{ transition: `stroke-dasharray 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s` }}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r - strokeW / 2 - 2} fill="#F8F3EA" />
      <text x="50" y="54" textAnchor="middle" style={{ fontWeight: 900, fontSize: 14, fill: "#0B1957", fontFamily: "inherit" }}>
        {total}
      </text>
    </svg>
  );
}

function StatCard({ icon, value, label, color, sparkData, trend, delay = 0 }: {
  icon: React.ReactNode; value: string; label: string; color: string;
  sparkData?: number[]; trend?: number; delay?: number;
}) {
  const [counted, setCounted] = useState(0);
  const numVal = parseInt(value) || 0;

  useEffect(() => {
    if (numVal === 0) return;
    let start = 0;
    const steps = Math.min(numVal, 30);
    const increment = numVal / steps;
    const interval = setInterval(() => {
      start += increment;
      if (start >= numVal) { setCounted(numVal); clearInterval(interval); }
      else setCounted(Math.floor(start));
    }, 30);
    return () => clearInterval(interval);
  }, [numVal]);

  return (
    <div style={{
      border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "6px 6px 0 #0B1957",
      padding: "20px", display: "flex", flexDirection: "column", gap: 8,
      animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s both`,
      transition: "transform 0.15s ease, box-shadow 0.15s ease",
      position: "relative", overflow: "hidden", cursor: "default",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "9px 9px 0 #0B1957"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #0B1957"; }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: color, borderBottom: "2px solid #0B1957" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: 4 }}>
        <div style={{ color: "#0B1957" }}>{icon}</div>
        {trend !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: 3, border: "2px solid #0B1957", padding: "2px 6px", background: trend >= 0 ? "#9ECCFA" : "#FFE8A0", flexShrink: 0 }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="3.5" strokeLinecap="round">
              {trend >= 0
                ? <polyline points="1 18 8.5 10.5 13.5 15.5 23 6" />
                : <polyline points="1 6 8.5 13.5 13.5 8.5 23 18" />}
            </svg>
            <span style={{ fontWeight: 900, fontSize: 8, color: "#0B1957", textTransform: "uppercase", letterSpacing: "0.06em" }}>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <p style={{ fontWeight: 900, fontSize: 42, color: "#0B1957", margin: 0, lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
        {counted}
      </p>
      <p style={{ fontWeight: 900, fontSize: 9, color: "#0B1957", textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.55, margin: 0 }}>{label}</p>
      {sparkData && (
        <div style={{ marginTop: 2 }}>
          <Sparkline data={sparkData} color={color} height={30} width={130} />
        </div>
      )}
    </div>
  );
}

function ProjectStatusChart({ projects }: { projects: ProjectItem[] }) {
  const live = projects.filter(p => p.status === "Hosted" || p.status === "Live").length;
  const inProg = projects.filter(p => p.status === "In Progress").length;
  const planning = projects.filter(p => p.status === "Planning").length;
  const other = projects.length - live - inProg - planning;
  const segments = [
    { label: "Live",        value: live,     color: "#4ade80" },
    { label: "In Progress", value: inProg,   color: "#FFE8A0" },
    { label: "Planning",    value: planning, color: "#9ECCFA" },
    { label: "Other",       value: other,    color: "#C8B8A0" },
  ].filter(s => s.value > 0);
  if (segments.length === 0) return (
    <p style={{ fontWeight: 900, fontSize: 10, color: "#0B1957", opacity: 0.3, textTransform: "uppercase" }}>No data</p>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <DonutChart segments={segments} size={100} />
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 12, height: 12, background: s.color, border: "2px solid #0B1957", boxShadow: "1px 1px 0 #0B1957", flexShrink: 0 }} />
            <span style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", color: "#0B1957", letterSpacing: "0.08em" }}>{s.label}</span>
            <span style={{ fontWeight: 900, fontSize: 16, color: "#0B1957", marginLeft: "auto", paddingLeft: 12, fontVariantNumeric: "tabular-nums" }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackDistribution({ stacks }: { stacks: { category?: string }[] }) {
  if (!stacks.length) return (
    <p style={{ fontWeight: 900, fontSize: 10, color: "#9ECCFA", opacity: 0.3, textTransform: "uppercase" }}>No stacks</p>
  );
  const categories: Record<string, number> = {};
  stacks.forEach(s => { const c = (s as any).category || "Other"; categories[c] = (categories[c] || 0) + 1; });
  const total = stacks.length || 1;
  const entries = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  const colors = ["#9ECCFA", "#FFE8A0", "#D1E8FF", "#4ade80", "#9ECCFA"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {entries.map(([cat, count], i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", color: "#9ECCFA", letterSpacing: "0.1em" }}>{cat}</span>
            <span style={{ fontWeight: 900, fontSize: 9, color: "#D1E8FF", opacity: 0.7 }}>{count}</span>
          </div>
          <div style={{ height: 14, background: "rgba(158,204,250,0.12)", border: "2px solid rgba(158,204,250,0.3)" }}>
            <div style={{
              height: "100%",
              width: `${(count / total) * 100}%`,
              background: colors[i % colors.length],
              borderRight: count < total ? "2px solid #0B1957" : "none",
              transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const IconStatusLive     = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconStatusProgress = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>;
const IconStatusPlan     = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconStatusHosted   = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>;
const IconStatusDefault  = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>;

function getActivityMeta(status: string): { icon: React.ReactNode; color: string; iconColor: string; tag: string } {
  switch (status) {
    case "Hosted": return { icon: <IconStatusHosted size={15} />, color: "#9ECCFA", iconColor: "#0B1957", tag: "Deployed" };
    case "Live":   return { icon: <IconStatusLive size={15} />,   color: "#4ade80", iconColor: "#0B1957", tag: "Live" };
    case "In Progress": return { icon: <IconStatusProgress size={15} />, color: "#FFE8A0", iconColor: "#0B1957", tag: "WIP" };
    case "Planning":    return { icon: <IconStatusPlan size={15} />,     color: "#D1E8FF",  iconColor: "#0B1957", tag: "Planned" };
    default: return { icon: <IconStatusDefault size={15} />, color: "#F8F3EA", iconColor: "#0B1957", tag: status };
  }
}

// ── Activity Feed — Quick Action style hover ──────────────────────────────────
function ActivityFeed({ projects }: { projects: ProjectItem[] }) {
  if (!projects.length) return (
    <div style={{ padding: "50px 20px", textAlign: "center" }}>
      <div style={{ color: "#0B1957", opacity: 0.12, marginBottom: 12, display: "flex", justifyContent: "center" }}>
        <IconStatusDefault size={36} />
      </div>
      <p style={{ fontWeight: 900, fontSize: 10, textTransform: "uppercase", color: "#0B1957", opacity: 0.3, letterSpacing: "0.15em" }}>No activity yet</p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {projects.slice(0, 6).map((p, i) => {
        const meta = getActivityMeta(p.status);
        return (
          <ActivityFeedItem key={p.id} project={p} meta={meta} index={i} total={Math.min(projects.length, 6)} />
        );
      })}
    </div>
  );
}

function ActivityFeedItem({ project: p, meta, index: i, total }: {
  project: ProjectItem;
  meta: { icon: React.ReactNode; color: string; iconColor: string; tag: string };
  index: number;
  total: number;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      style={{
        display: "flex", gap: 12, padding: "13px 16px",
        borderBottom: i < total - 1 ? "2px solid #D1E8FF" : "none",
        background: hov ? meta.color : "#F8F3EA",
        border: hov ? "0px" : "0px",
        cursor: "default",
        transform: hov ? "translate(-3px,-3px)" : "translate(0,0)",
        boxShadow: hov ? `6px 6px 0 #0B1957` : "none",
        transition: "transform 0.12s cubic-bezier(0.16,1,0.3,1), box-shadow 0.12s cubic-bezier(0.16,1,0.3,1), background 0.12s ease",
        animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.07}s both`,
        position: "relative",
        zIndex: hov ? 5 : 1,
        alignItems: "center",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Icon box */}
      <div style={{
        width: 36, height: 36, flexShrink: 0,
        background: hov ? "#0B1957" : "#F0F7FF",
        border: "3px solid #0B1957",
        boxShadow: hov ? "3px 3px 0 rgba(11,25,87,0.3)" : "2px 2px 0 rgba(11,25,87,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? meta.color : "#0B1957",
        transition: "background 0.12s ease, color 0.12s ease, box-shadow 0.12s ease",
      }}>
        {meta.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
          <p style={{
            fontWeight: 900, fontSize: 11, textTransform: "uppercase",
            color: "#0B1957", margin: 0,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            letterSpacing: "0.06em",
          }}>{p.title}</p>
          <span style={{
            flexShrink: 0,
            border: "2px solid #0B1957",
            background: hov ? "#0B1957" : meta.color,
            color: hov ? meta.color : "#0B1957",
            padding: "0px 5px", fontSize: 7, fontWeight: 900,
            textTransform: "uppercase", letterSpacing: "0.06em",
            transition: "background 0.12s ease, color 0.12s ease",
          }}>{meta.tag}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 9, color: "#0B1957", opacity: hov ? 0.6 : 0.35, textTransform: "uppercase", letterSpacing: "0.06em", transition: "opacity 0.12s" }}>{p.date}</span>
          {(p.stacks ?? []).slice(0, 3).map((s, si) => (
            <span key={si} style={{
              display: "inline-flex", alignItems: "center", gap: 3,
              border: "2px solid #0B1957",
              background: hov ? "#0B1957" : "#D1E8FF",
              color: hov ? "#9ECCFA" : "#0B1957",
              padding: "0px 5px", fontSize: 7, fontWeight: 900,
              textTransform: "uppercase",
              transition: "background 0.12s ease, color 0.12s ease",
            }}>
              {s.icon && <DbIcon src={s.icon} size={9} />}{s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div style={{
        color: "#0B1957",
        opacity: hov ? 1 : 0,
        transform: hov ? "translateX(0)" : "translateX(-6px)",
        transition: "opacity 0.15s ease, transform 0.18s cubic-bezier(0.16,1,0.3,1)",
        flexShrink: 0,
        display: "flex", alignItems: "center",
      }}>
        <IconArrow size={13} />
      </div>
    </div>
  );
}

// ── GitHub Push Chart ─────────────────────────────────────────────────────────
function PushActivityChart({ contributions }: { contributions: ContribDay[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const last30 = contributions.slice(-30);
  if (!last30.length) return null;
  const W = 900, H = 100, PAD = { top: 12, bottom: 28, left: 8, right: 8 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const maxV = Math.max(...last30.map(d => d.count), 1);
  const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const pts = last30.map((d, i) => ({
    x: PAD.left + (i / (last30.length - 1)) * innerW,
    y: PAD.top + innerH - (d.count / maxV) * innerH,
    d,
  }));
  const pathD = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const cpx = (prev.x + p.x) / 2;
    return `C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`;
  }).join(" ");
  const areaD = pathD + ` L ${pts[pts.length-1].x} ${PAD.top + innerH} L ${pts[0].x} ${PAD.top + innerH} Z`;
  const fmtDate = (d: string) => { const date = new Date(d); return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`; };
  const dateLabels = last30.map((d, i) => ({ d, i })).filter((_, i) => i % 7 === 0 || i === last30.length - 1);
  const hov = hoveredIdx !== null ? pts[hoveredIdx] : null;
  return (
    <div style={{ borderTop: "4px solid #0B1957", padding: "16px 20px 12px", background: "#F8F3EA" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ color: "#0B1957" }}><IconActivity size={13} /></div>
        <p style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "#0B1957", margin: 0 }}>Push Activity — Last 30 Days</p>
        <span style={{ marginLeft: "auto", fontWeight: 900, fontSize: 9, color: "#0B1957", opacity: 0.45, textTransform: "uppercase" }}>
          {last30.reduce((s, d) => s + d.count, 0)} commits total
        </span>
      </div>
      <div style={{ position: "relative", overflowX: "auto" }}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair" }}
          onMouseLeave={() => setHoveredIdx(null)}>
          <defs>
            <linearGradient id="pushGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ECCFA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#9ECCFA" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = PAD.top + (1 - pct) * innerH;
            return (
              <g key={i}>
                <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#D1E8FF" strokeWidth="1" strokeDasharray={i === 0 ? "none" : "4 4"} />
                {pct > 0 && (
                  <text x={PAD.left - 2} y={y + 4} textAnchor="end" style={{ fontSize: 7, fill: "#0B1957", opacity: 0.4, fontWeight: 900, fontFamily: "inherit" }}>
                    {Math.round(maxV * pct)}
                  </text>
                )}
              </g>
            );
          })}
          <path d={areaD} fill="url(#pushGrad)" />
          <path d={pathD} fill="none" stroke="#9ECCFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 2px 6px rgba(158,204,250,0.6))" }} />
          {pts.map((p, i) => (
            <g key={i}>
              <rect
                x={i === 0 ? p.x : pts[i - 1].x + (p.x - pts[i - 1].x) / 2}
                y={PAD.top}
                width={i === 0 ? (pts[1].x - pts[0].x) / 2 : i === pts.length - 1 ? (p.x - pts[i - 1].x) / 2 : (pts[i + 1].x - pts[i - 1].x) / 2}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHoveredIdx(i)}
              />
              {(p.d.count > 0 || hoveredIdx === i) && (
                <circle cx={p.x} cy={p.y} r={hoveredIdx === i ? 5 : 3}
                  fill={hoveredIdx === i ? "#0B1957" : "#9ECCFA"}
                  stroke={hoveredIdx === i ? "#9ECCFA" : "#0B1957"}
                  strokeWidth={2}
                  style={{ transition: "r 0.1s ease" }}
                />
              )}
            </g>
          ))}
          {dateLabels.map(({ d, i }) => (
            <text key={i} x={pts[i].x} y={H - 4} textAnchor="middle"
              style={{ fontSize: 7, fill: "#0B1957", opacity: 0.45, fontWeight: 900, fontFamily: "inherit", textTransform: "uppercase" }}>
              {fmtDate(d.date)}
            </text>
          ))}
          {hov && (
            <>
              <line x1={hov.x} y1={PAD.top} x2={hov.x} y2={PAD.top + innerH}
                stroke="#0B1957" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
              <g transform={`translate(${Math.min(hov.x + 8, W - 120)}, ${Math.max(hov.y - 48, PAD.top)})`}>
                <rect x={0} y={0} width={110} height={38} fill="#0B1957" stroke="#9ECCFA" strokeWidth="2" />
                <rect x={2} y={2} width={110} height={38} fill="none" stroke="rgba(158,204,250,0.15)" strokeWidth="1" />
                <text x={8} y={14} style={{ fontSize: 8, fill: "#9ECCFA", fontWeight: 900, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {hov.d.count} commit{hov.d.count !== 1 ? "s" : ""}
                </text>
                <text x={8} y={28} style={{ fontSize: 7, fill: "#D1E8FF", fontWeight: 600, fontFamily: "inherit" }}>
                  {fmtDate(hov.d.date)} {new Date(hov.d.date).getFullYear()}
                </text>
              </g>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

// ── GitHub Contributions ──────────────────────────────────────────────────────
interface ContribDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4; }

function GitHubContributions({ username = "zysrnh" }: { username?: string }) {
  const [weeks, setWeeks]             = useState<ContribDay[][]>([]);
  const [allContribs, setAllContribs] = useState<ContribDay[]>([]);
  const [loading, setLoading]         = useState(true);
  const [totalContribs, setTotal]     = useState(0);
  const [streak, setStreak]           = useState(0);
  const [maxDay, setMaxDay]           = useState(0);
  const [hoveredDay, setHoveredDay]   = useState<ContribDay | null>(null);
  const [tooltipPos, setTooltipPos]   = useState({ x: 0, y: 0 });
  const containerRef                  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then(data => {
        const contributions: ContribDay[] = data.contributions ?? [];
        const grouped: ContribDay[][] = [];
        for (let i = 0; i < contributions.length; i += 7) grouped.push(contributions.slice(i, i + 7));
        setWeeks(grouped);
        setAllContribs(contributions);
        setTotal(contributions.reduce((s, d) => s + d.count, 0));
        setMaxDay(Math.max(...contributions.map(d => d.count), 0));
        let s = 0;
        for (let i = contributions.length - 1; i >= 0; i--) { if (contributions[i].count > 0) s++; else break; }
        setStreak(s);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  const CELL_STYLES: Record<number, { bg: string; border: string }> = {
    0: { bg: "#E8E0D4", border: "#C8B8A0" },
    1: { bg: "#9ECCFA", border: "#0B1957" },
    2: { bg: "#5aa8f0", border: "#0B1957" },
    3: { bg: "#2563eb", border: "#0B1957" },
    4: { bg: "#0B1957", border: "#9ECCFA" },
  };
  const MONTHS   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DAY_LBLS = ["", "Mon", "", "Wed", "", "Fri", ""];
  const CELL = 13, GAP = 3;

  const monthLabels = (() => {
    if (!weeks.length) return [];
    const labels: { label: string; col: number }[] = [];
    let lastM = -1;
    weeks.forEach((week, wi) => {
      if (!week[0]) return;
      const m = new Date(week[0].date).getMonth();
      if (m !== lastM) { labels.push({ label: MONTHS[m], col: wi }); lastM = m; }
    });
    return labels;
  })();

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div style={{ border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "8px 8px 0 #0B1957", overflow: "hidden" }}>
      <div style={{ background: "#0B1957", borderBottom: "4px solid #0B1957", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ border: "3px solid #9ECCFA", boxShadow: "3px 3px 0 #9ECCFA", padding: 6, color: "#9ECCFA" }}>
            <IconGithub size={18} />
          </div>
          <div>
            <p style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.25em", color: "#9ECCFA", opacity: 0.7, margin: 0 }}>GitHub Activity</p>
            <p style={{ fontWeight: 900, fontSize: 15, textTransform: "uppercase", color: "#F8F3EA", margin: 0, letterSpacing: "0.06em" }}>@{username}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { val: loading ? "…" : totalContribs, label: "Commits" },
            { val: loading ? "…" : streak,        label: "Streak"  },
            { val: loading ? "…" : maxDay,        label: "Best Day" },
          ].map((s, i) => (
            <div key={i} style={{ border: "2px solid #9ECCFA", background: "rgba(158,204,250,0.08)", padding: "6px 12px", textAlign: "center", boxShadow: "2px 2px 0 #9ECCFA" }}>
              <p style={{ fontWeight: 900, fontSize: 18, color: "#9ECCFA", margin: 0, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.val}</p>
              <p style={{ fontWeight: 900, fontSize: 8, color: "#D1E8FF", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div ref={containerRef} style={{ padding: "16px 20px 8px", overflowX: "auto", position: "relative" }}>
        {loading ? (
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: 52 }).map((_, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                {Array.from({ length: 7 }).map((_, di) => (
                  <div key={di} style={{ width: CELL, height: CELL, background: "linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s ease infinite" }} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: GAP, marginBottom: 4, marginLeft: 28 }}>
              {weeks.map((_, wi) => {
                const lbl = monthLabels.find(m => m.col === wi);
                return (
                  <div key={wi} style={{ width: CELL, flexShrink: 0, overflow: "visible" }}>
                    {lbl && <span style={{ fontWeight: 900, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0B1957", opacity: 0.5, whiteSpace: "nowrap", display: "block" }}>{lbl.label}</span>}
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: GAP }}>
              <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginRight: 2, flexShrink: 0, width: 24 }}>
                {DAY_LBLS.map((d, i) => (
                  <div key={i} style={{ height: CELL, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    {d && <span style={{ fontWeight: 900, fontSize: 7, textTransform: "uppercase", color: "#0B1957", opacity: 0.4 }}>{d}</span>}
                  </div>
                ))}
              </div>
              {weeks.map((week, wi) => (
                <div key={wi} style={{
                  display: "flex", flexDirection: "column", gap: GAP, flexShrink: 0,
                  animation: `cellColIn 0.4s cubic-bezier(0.16,1,0.3,1) ${wi * 0.008}s both`,
                }}>
                  {week.map((day, di) => {
                    const cs = CELL_STYLES[day.level];
                    const isHov = hoveredDay?.date === day.date;
                    return (
                      <div key={di} style={{
                        width: CELL, height: CELL, flexShrink: 0,
                        background: cs.bg, border: `2px solid ${cs.border}`,
                        cursor: "pointer",
                        transform: isHov ? "scale(1.55)" : "scale(1)",
                        boxShadow: isHov ? `0 0 0 2px #0B1957, 3px 3px 0 #0B1957, 0 0 8px ${cs.bg}` : day.level > 0 ? "1px 1px 0 #0B1957" : "none",
                        transition: "transform 0.1s cubic-bezier(0.16,1,0.3,1), box-shadow 0.1s ease",
                        position: "relative", zIndex: isHov ? 10 : 1,
                      }}
                        onMouseEnter={e => {
                          setHoveredDay(day);
                          const rect = containerRef.current?.getBoundingClientRect();
                          if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            {hoveredDay && (
              <div style={{ position: "absolute", left: tooltipPos.x + 12, top: tooltipPos.y - 52, pointerEvents: "none", zIndex: 50, background: "#0B1957", border: "3px solid #9ECCFA", boxShadow: "4px 4px 0 #9ECCFA", padding: "7px 12px", minWidth: 162 }}>
                <p style={{ fontWeight: 900, fontSize: 11, color: "#9ECCFA", margin: "0 0 3px", textTransform: "uppercase" }}>{hoveredDay.count} commit{hoveredDay.count !== 1 ? "s" : ""}</p>
                <p style={{ fontWeight: 600, fontSize: 10, color: "#D1E8FF", margin: 0 }}>{fmt(hoveredDay.date)}</p>
              </div>
            )}
          </>
        )}
      </div>
      {!loading && allContribs.length > 0 && (
        <PushActivityChart contributions={allContribs} />
      )}
      <div style={{ borderTop: "3px solid #0B1957", padding: "8px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
          style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0B1957", textDecoration: "none", border: "2px solid #0B1957", padding: "4px 10px", background: "#D1E8FF", boxShadow: "2px 2px 0 #0B1957", display: "flex", alignItems: "center", gap: 5 }}>
          <IconGithub size={10} /> Profile →
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontWeight: 900, fontSize: 8, textTransform: "uppercase", color: "#0B1957", opacity: 0.4 }}>Less</span>
          {[0, 1, 2, 3, 4].map(lvl => (
            <div key={lvl} style={{ width: 10, height: 10, background: CELL_STYLES[lvl].bg, border: `2px solid ${CELL_STYLES[lvl].border}`, boxShadow: lvl > 0 ? "1px 1px 0 #0B1957" : "none" }} />
          ))}
          <span style={{ fontWeight: 900, fontSize: 8, textTransform: "uppercase", color: "#0B1957", opacity: 0.4 }}>More</span>
        </div>
      </div>
    </div>
  );
}

// ── Recent Project Card — ENHANCED ────────────────────────────────────────────
function RecentProjectCard({ project: p, delay }: { project: ProjectItem; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const meta = getActivityMeta(p.status);

  return (
    <div
      style={{
        border: "4px solid #0B1957",
        background: hovered ? "#EAF4FF" : "#F8F3EA",
        boxShadow: hovered ? "8px 8px 0 #0B1957" : "4px 4px 0 #0B1957",
        padding: "18px 20px",
        transform: hovered ? "translate(-4px,-4px)" : "translate(0,0)",
        transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s cubic-bezier(0.16,1,0.3,1), background 0.15s ease",
        animation: `slideUp 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}s both`,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? 5 : 3,
        background: hovered ? meta.color : "rgba(11,25,87,0.08)",
        borderBottom: hovered ? "2px solid #0B1957" : "2px solid transparent",
        transition: "height 0.2s ease, background 0.2s ease",
      }} />

      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hovered ? 6 : 3,
        background: hovered ? meta.color : "rgba(11,25,87,0.08)",
        borderRight: hovered ? "2px solid #0B1957" : "2px solid transparent",
        transition: "width 0.2s cubic-bezier(0.16,1,0.3,1), background 0.2s ease",
      }} />

      {/* Content top */}
      <div style={{ paddingLeft: 10 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
            <div style={{
              color: hovered ? "#0B1957" : "#9ECCFA",
              transition: "color 0.15s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1)",
              transform: hovered ? "scale(1.2) rotate(-5deg)" : "scale(1) rotate(0deg)",
              flexShrink: 0,
            }}>
              {meta.icon}
            </div>
            <p style={{
              fontWeight: 900, fontSize: 13, textTransform: "uppercase", color: "#0B1957",
              margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              letterSpacing: "0.06em",
            }}>{p.title}</p>
          </div>
          <span style={{
            border: "2px solid #0B1957", padding: "3px 8px", fontSize: 9, fontWeight: 900,
            textTransform: "uppercase",
            background: hovered ? meta.color : "#F0F7FF",
            color: "#0B1957",
            boxShadow: hovered ? "3px 3px 0 #0B1957" : "1px 1px 0 rgba(11,25,87,0.2)",
            transition: "background 0.15s ease, box-shadow 0.15s ease",
            flexShrink: 0, letterSpacing: "0.06em",
          }}>{p.status}</span>
        </div>
        <p style={{
          fontWeight: 600, fontSize: 11, color: "#0B1957", opacity: 0.55, margin: "0 0 10px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{p.desc}</p>
      </div>

      {/* Content bottom */}
      <div style={{ paddingLeft: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }}>
          {(p.stacks ?? []).slice(0, 4).map((s, si) => (
            <span key={si} style={{
              border: "2px solid #0B1957",
              background: hovered ? meta.color : "#D1E8FF",
              color: "#0B1957", padding: "2px 7px", fontSize: 8, fontWeight: 900,
              textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 3,
              transition: "background 0.15s ease, box-shadow 0.15s ease",
              boxShadow: hovered ? "1px 1px 0 #0B1957" : "none",
            }}>
              {s.icon && <DbIcon src={s.icon} size={10} />}{s.label}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontWeight: 900, fontSize: 8, color: "#0B1957", opacity: 0.35, textTransform: "uppercase" }}>{p.date}</span>
          {/* Arrow slides in */}
          <div style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1)",
            color: "#0B1957",
            border: "2px solid #0B1957",
            padding: "3px 5px",
            background: meta.color,
            display: "flex", alignItems: "center",
          }}>
            <IconArrow size={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ── OVERVIEW SECTION ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
function OverviewSection({ unreadCount, onNavClick }: { unreadCount: number; onNavClick: (key: string) => void }) {
  const [projects,     setProjects]     = useState<ProjectItem[]>([]);
  const [stacks,       setStacks]       = useState<{ id: number; name: string; icon: string; is_visible: boolean; category?: string }[]>([]);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    const headers = { "X-CSRF-TOKEN": getCsrfToken() };
    Promise.all([
      fetch("/api/admin/projects",     { headers }).then(r => r.json()).catch(() => []),
      fetch("/api/tech-stacks",        { headers }).then(r => r.json()).catch(() => []),
      fetch("/api/about/availability", { headers }).then(r => r.json()).catch(() => null),
    ]).then(([proj, stk, avail]) => {
      setProjects(Array.isArray(proj) ? proj : (proj.data ?? []));
      setStacks(Array.isArray(stk) ? stk : []);
      setAvailability(avail);
      setLoading(false);
    });
  }, []);

  const live   = projects.filter(p => p.status === "Hosted" || p.status === "Live").length;
  const inProg = projects.filter(p => p.status === "In Progress").length;

  const STAT_CARDS = [
    { icon: <IconFolder size={22} />,  value: String(projects.length), label: "Total Projects", color: "#9ECCFA",  sparkData: [1,2,1,3,2,4,3, projects.length], trend: 12,  delay: 0.15 },
    { icon: <IconRocket size={22} />,  value: String(live),            label: "Live Projects",  color: "#4ade80",  sparkData: [0,1,1,2,1,2,live,live],           trend: 8,   delay: 0.22 },
    { icon: <IconGear   size={22} />,  value: String(inProg),          label: "In Progress",    color: "#FFE8A0",  sparkData: [0,1,0,2,1,inProg,inProg,inProg],  trend: -5,  delay: 0.29 },
    { icon: <IconLayers size={22} />,  value: String(stacks.length),   label: "Tech Stacks",    color: "#D1E8FF",  sparkData: [1,2,3,4,5,6,stacks.length,stacks.length], trend: 20, delay: 0.36 },
  ];

  const shimmer = { background: "linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s ease infinite" };

  const secStats   = useScrollReveal(0);
  const secCharts  = useScrollReveal(0);
  const secGithub  = useScrollReveal(0);
  const secBottom  = useScrollReveal(0);
  const secActions = useScrollReveal(0);
  const secStatus  = useScrollReveal(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}>
        <div>
          <p style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.4em", color: "#9ECCFA", margin: "0 0 4px" }}>Portfolio CMS</p>
          <h1 style={{ fontWeight: 900, fontSize: 26, textTransform: "uppercase", color: "#0B1957", margin: 0 }}>Overview</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, border: "4px solid #0B1957", padding: "10px 16px", background: "#0B1957", boxShadow: "4px 4px 0 #9ECCFA" }}>
          <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
            <div style={{ width: 10, height: 10, background: "#4ade80", position: "absolute" }} />
            <div style={{ width: 10, height: 10, background: "#4ade80", position: "absolute", animation: "ping 1.5s ease infinite", opacity: 0.4 }} />
          </div>
          <span style={{ fontWeight: 900, fontSize: 8, color: "#9ECCFA", textTransform: "uppercase", letterSpacing: "0.2em" }}>System Online</span>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
      <div ref={secStats.ref} className={secStats.className} style={secStats.style}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading
            ? [0,1,2,3].map(i => (
              <div key={i} style={{ border: "4px solid #0B1957", boxShadow: "6px 6px 0 #0B1957", height: 150, ...shimmer }} />
            ))
            : STAT_CARDS.map((card, i) => <StatCard key={i} {...card} />)
          }
        </div>
      </div>

      {/* ── Unread Banner ──────────────────────────────────────────────────── */}
      {unreadCount > 0 && (
        <div style={{ border: "4px solid #0B1957", background: "#FFE8A0", boxShadow: "6px 6px 0 #0B1957", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", animation: "bounceIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, background: "#0B1957", border: "3px solid #0B1957", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ECCFA", flexShrink: 0, animation: "pulse 2s ease infinite" }}>
              <IconMail size={18} />
            </div>
            <div>
              <p style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "#0B1957", opacity: 0.5, margin: "0 0 2px" }}>Notifikasi Masuk</p>
              <p style={{ fontWeight: 900, fontSize: 15, color: "#0B1957", margin: 0 }}>Ada <span style={{ fontSize: 22 }}>{unreadCount}</span> pesan baru belum dibaca</p>
            </div>
          </div>
          <button onClick={() => onNavClick("messages")}
            style={{ border: "4px solid #0B1957", background: "#0B1957", color: "#9ECCFA", padding: "10px 18px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: "pointer", boxShadow: "4px 4px 0 #9ECCFA", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, transition: "transform 0.08s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}>
            Buka Pesan <IconArrow size={13} />
          </button>
        </div>
      )}

      {/* ── Charts Row ─────────────────────────────────────────────────────── */}
      <div ref={secCharts.ref} className={secCharts.className} style={secCharts.style}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div style={{ border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "6px 6px 0 #0B1957", padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ color: "#0B1957" }}><IconActivity size={13} /></div>
              <p style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "#0B1957", margin: 0 }}>Project Status</p>
            </div>
            {loading
              ? <div style={{ height: 110, ...shimmer }} />
              : <ProjectStatusChart projects={projects} />
            }
          </div>
          <div style={{ border: "4px solid #0B1957", background: "#0B1957", boxShadow: "6px 6px 0 #9ECCFA", padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ color: "#9ECCFA" }}><IconLayers size={13} /></div>
              <p style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "#9ECCFA", margin: 0 }}>Stack Categories</p>
            </div>
            {loading
              ? <div style={{ height: 80, background: "linear-gradient(90deg,rgba(158,204,250,0.2) 25%,rgba(158,204,250,0.35) 50%,rgba(158,204,250,0.2) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s ease infinite" }} />
              : <StackDistribution stacks={stacks} />
            }
          </div>
        </div>
      </div>

      {/* ── GitHub Contributions ───────────────────────────────────────────── */}
      <div ref={secGithub.ref} className={secGithub.className} style={secGithub.style}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <h2 style={{ fontWeight: 900, fontSize: 14, textTransform: "uppercase", color: "#0B1957", margin: 0, letterSpacing: "0.08em" }}>GitHub Contributions</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: "2px solid #0B1957", padding: "3px 10px", background: "#D1E8FF" }}>
            <div style={{ width: 7, height: 7, background: "#4ade80", flexShrink: 0, animation: "ping 1.5s ease infinite" }} />
            <span style={{ fontWeight: 900, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0B1957" }}>Live Data</span>
          </div>
        </div>
        <GitHubContributions username="zysrnh" />
      </div>

      {/* ── Bottom Grid: Recent Projects + Activity Feed — SYMMETRIC ────────── */}
      <div ref={secBottom.ref} className={secBottom.className} style={secBottom.style}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="overview-bottom-grid">

        {/* Recent Projects */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, height: 36 }}>
            <h2 style={{ fontWeight: 900, fontSize: 14, textTransform: "uppercase", color: "#0B1957", margin: 0, letterSpacing: "0.08em" }}>Recent Projects</h2>
            <button onClick={() => onNavClick("projects")}
              style={{
                border: "3px solid #0B1957", background: "#0B1957", color: "#9ECCFA",
                padding: "7px 14px", fontWeight: 900, fontSize: 9, textTransform: "uppercase",
                cursor: "pointer", boxShadow: "3px 3px 0 #9ECCFA", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 5, letterSpacing: "0.08em",
                transition: "transform 0.1s ease, box-shadow 0.1s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 #9ECCFA"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #9ECCFA"; }}>
              All <IconArrow size={10} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {loading
              ? [0,1,2].map(i => (
                <div key={i} style={{ border: "4px solid #0B1957", boxShadow: "4px 4px 0 #0B1957", height: 120, ...shimmer }} />
              ))
              : projects.length === 0
                ? <div style={{ border: "4px dashed #0B1957", background: "#F8F3EA", padding: "40px 20px", textAlign: "center", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontWeight: 900, fontSize: 10, color: "#0B1957", opacity: 0.3, textTransform: "uppercase" }}>Belum ada project</p>
                  </div>
                : projects.slice(0, 3).map((p, i) => (
                  <RecentProjectCard key={p.id} project={p} delay={0.45 + i * 0.1} />
                ))
            }
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, height: 36 }}>
            <h2 style={{ fontWeight: 900, fontSize: 14, textTransform: "uppercase", color: "#0B1957", margin: 0, letterSpacing: "0.08em" }}>Activity Feed</h2>
            <span style={{
              border: "3px solid #0B1957", background: "#9ECCFA", color: "#0B1957",
              padding: "4px 10px", fontWeight: 900, fontSize: 9, textTransform: "uppercase",
              letterSpacing: "0.06em", display: "flex", alignItems: "center",
            }}>{projects.length} total</span>
          </div>
          <div style={{ border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "4px 4px 0 #0B1957" }}>
            {loading
              ? <div style={{ height: 360, ...shimmer }} />
              : <ActivityFeed projects={projects} />
            }
          </div>
        </div>
      </div>
      </div>{/* close scroll reveal wrapper */}

      {/* ── Quick Actions ───────────────────────────────────────────────────── */}
      <div ref={secActions.ref} className={secActions.className} style={secActions.style}>
        <h2 style={{ fontWeight: 900, fontSize: 14, textTransform: "uppercase", color: "#0B1957", margin: "0 0 12px", letterSpacing: "0.08em" }}>Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Add Project",    icon: <IconFolder size={16} />, key: "projects",  bg: "#9ECCFA"  },
            { label: "Manage Stacks",  icon: <IconLayers size={16} />, key: "stacks",    bg: "#FFE8A0"  },
            { label: "Edit Homepage",  icon: <IconCode   size={16} />, key: "homepage",  bg: "#D1E8FF"  },
            { label: "Messages",       icon: <IconMail   size={16} />, key: "messages",  bg: "#F8F3EA", badge: unreadCount > 0 ? unreadCount : null },
          ].map((action, i) => (
            <button key={i} onClick={() => onNavClick(action.key)}
              style={{ border: "4px solid #0B1957", background: action.bg, color: "#0B1957", padding: "14px 16px", fontWeight: 900, fontSize: 10, textTransform: "uppercase", cursor: "pointer", boxShadow: "4px 4px 0 #0B1957", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.08em", transition: "transform 0.08s ease, box-shadow 0.08s ease", position: "relative" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #0B1957"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #0B1957"; }}>
              {action.icon} {action.label}
              {action.badge && (
                <span style={{ marginLeft: "auto", background: "#0B1957", color: "#9ECCFA", fontSize: 9, fontWeight: 900, padding: "2px 6px", minWidth: 18, textAlign: "center", border: "2px solid #0B1957" }}>{action.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Status Banner ───────────────────────────────────────────────────── */}
      <div ref={secStatus.ref} className={secStatus.className} style={secStatus.style}>
        <div style={{ border: "4px solid #0B1957", background: "#0B1957", boxShadow: "8px 8px 0 #9ECCFA", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <IconBriefcase size={14} />
              <p style={{ fontWeight: 900, fontSize: 9, color: "#9ECCFA", textTransform: "uppercase", letterSpacing: "0.25em", margin: 0 }}>Current Status</p>
            </div>
            <p style={{ fontWeight: 900, fontSize: 26, color: "#F8F3EA", textTransform: "uppercase", margin: 0 }}>
              {availability?.status ?? "Open to Work"}
            </p>
            <p style={{ fontWeight: 600, fontSize: 12, color: "#D1E8FF", opacity: 0.65, margin: "6px 0 0" }}>
              {availability
                ? [availability.freelance && "Freelance", availability.remote && "Remote", availability.collaboration && "Collaboration"].filter(Boolean).join(" · ")
                : "Freelance · Remote · Collaboration"
              }
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "Projects", val: projects.length, icon: <IconFolder size={12} /> },
              { label: "Live",     val: live,            icon: <IconRocket size={12} /> },
              { label: "Stacks",   val: stacks.length,   icon: <IconLayers size={12} /> },
            ].map((s, i) => (
              <div key={i} style={{ border: "3px solid rgba(158,204,250,0.4)", background: "rgba(158,204,250,0.08)", padding: "10px 16px", textAlign: "center", boxShadow: "3px 3px 0 rgba(158,204,250,0.25)" }}>
                <div style={{ color: "#9ECCFA", display: "flex", justifyContent: "center", marginBottom: 4 }}>{s.icon}</div>
                <p style={{ fontWeight: 900, fontSize: 22, color: "#9ECCFA", margin: 0, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.val}</p>
                <p style={{ fontWeight: 900, fontSize: 8, color: "#D1E8FF", opacity: 0.6, margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
              </div>
            ))}
            <div style={{ border: "3px solid #9ECCFA", padding: "10px 16px", textAlign: "center" }}>
              <p style={{ fontWeight: 900, fontSize: 9, color: "#9ECCFA", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 4px", opacity: 0.6 }}>Timezone</p>
              <p style={{ fontWeight: 900, fontSize: 13, color: "#F8F3EA", margin: 0 }}>{availability?.timezone ?? "WIB (UTC+7)"}</p>
            </div>
          </div>
        </div>
        {stacks.filter(s => s.is_visible).length > 0 && (
          <div style={{ borderTop: "2px solid rgba(158,204,250,0.2)", paddingTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {stacks.filter(s => s.is_visible).slice(0, 14).map((s, i) => (
              <div key={i} title={s.name}
                style={{ width: 32, height: 32, border: "2px solid rgba(158,204,250,0.3)", background: "rgba(158,204,250,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.1s, background 0.1s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#9ECCFA"; (e.currentTarget as HTMLElement).style.background = "rgba(158,204,250,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(158,204,250,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(158,204,250,0.08)"; }}>
                <DbIcon src={s.icon} size={18} />
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ── MESSAGES MANAGER ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
function MessagesManager({ onUnreadChange }: { onUnreadChange?: (n: number) => void }) {
  const [messages,   setMessages]   = useState<Message[]>([]);
  const [stats,      setStats]      = useState<MessageStats>({ total: 0, unread: 0, today: 0 });
  const [loading,    setLoading]    = useState(true);
  const [filterTab,  setFilterTab]  = useState<"all" | "unread" | "read">("all");
  const [selected,   setSelected]   = useState<Message | null>(null);
  const [deleting,   setDeleting]   = useState<number | null>(null);
  const [markingAll, setMarkingAll] = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const [toast,      setToast]      = useState<{ msg: string; ok: boolean } | null>(null);
  const [replyOpen,  setReplyOpen]  = useState(false);
  const [replyBody,  setReplyBody]  = useState("");
  const [sending,    setSending]    = useState(false);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 2500); };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [msgRes, statsRes] = await Promise.all([
        fetch("/api/messages",       { headers: { "X-CSRF-TOKEN": getCsrfToken() } }),
        fetch("/api/messages/stats", { headers: { "X-CSRF-TOKEN": getCsrfToken() } }),
      ]);
      const msgData   = await msgRes.json();
      const statsData = await statsRes.json();
      const list = Array.isArray(msgData.data) ? msgData.data : Array.isArray(msgData) ? msgData : [];
      setMessages(list);
      setStats(statsData);
      onUnreadChange?.(statsData.unread ?? 0);
    } catch { showToast("Gagal memuat pesan", false); }
    finally { setLoading(false); setTimeout(() => setMounted(true), 80); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleMarkRead = async (msg: Message) => {
    if (msg.is_read) return;
    try {
      const res     = await fetch(`/api/messages/${msg.id}/read`, { method: "PATCH", headers: { "X-CSRF-TOKEN": getCsrfToken() } });
      const updated = await res.json();
      setMessages(p => p.map(m => m.id === msg.id ? updated : m));
      setStats(s => { const next = { ...s, unread: Math.max(0, s.unread - 1) }; onUnreadChange?.(next.unread); return next; });
      if (selected?.id === msg.id) setSelected(updated);
    } catch { /* silent */ }
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE", headers: { "X-CSRF-TOKEN": getCsrfToken() } });
      setMessages(p => p.filter(m => m.id !== id));
      setStats(s => ({ ...s, total: Math.max(0, s.total - 1) }));
      if (selected?.id === id) { setSelected(null); setShowDetailMobile(false); }
      showToast("Pesan dihapus");
    } catch { showToast("Gagal menghapus", false); }
    finally  { setDeleting(null); }
  };

  const handleMarkAllRead = async () => {
    setMarkingAll(true);
    try {
      await fetch("/api/messages/read-all", { method: "PATCH", headers: { "X-CSRF-TOKEN": getCsrfToken() } });
      setMessages(p => p.map(m => ({ ...m, is_read: true })));
      setStats(s => { onUnreadChange?.(0); return { ...s, unread: 0 }; });
      showToast("Semua pesan ditandai terbaca");
    } catch { showToast("Gagal", false); }
    finally  { setMarkingAll(false); }
  };

  const handleOpen = (msg: Message) => {
    setSelected(msg); setReplyOpen(false); setReplyBody(""); setShowDetailMobile(true); handleMarkRead(msg);
  };

  const handleSendReply = async () => {
    if (!selected || !replyBody.trim()) return;
    setSending(true);
    try {
      const res  = await fetch(`/api/messages/${selected.id}/reply`, {
        method: "POST", headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": getCsrfToken() },
        body: JSON.stringify({ body: replyBody }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Balasan berhasil dikirim!");
        setReplyOpen(false); setReplyBody("");
        const updated = { ...selected, is_read: true, read_at: new Date().toISOString() };
        setSelected(updated);
        setMessages(p => p.map(m => m.id === selected.id ? updated : m));
        if (!selected.is_read) setStats(s => { const next = { ...s, unread: Math.max(0, s.unread - 1) }; onUnreadChange?.(next.unread); return next; });
      } else showToast(data.message || "Gagal mengirim", false);
    } catch { showToast("Gagal mengirim balasan", false); }
    finally  { setSending(false); }
  };

  const filtered = messages.filter(m =>
    filterTab === "unread" ? !m.is_read : filterTab === "read" ? m.is_read : true
  );
  const fmt = (d: string) => {
    try { return new Date(d).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return d; }
  };

  const DetailPanel = () => selected ? (
    <div style={{ border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "8px 8px 0 #0B1957", overflow: "hidden" }}>
      <div style={{ background: "#0B1957", borderBottom: "4px solid #0B1957", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "#9ECCFA", border: "3px solid #9ECCFA", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#0B1957", textTransform: "uppercase", flexShrink: 0 }}>{selected.name[0]}</div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontWeight: 900, fontSize: 13, textTransform: "uppercase", color: "#F8F3EA", letterSpacing: "0.06em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>{selected.name}</p>
            <p style={{ fontWeight: 700, fontSize: 11, color: "#9ECCFA", opacity: 0.8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>{selected.email}</p>
          </div>
        </div>
        <button onClick={() => { setSelected(null); setShowDetailMobile(false); }}
          style={{ border: "2px solid #9ECCFA", background: "transparent", color: "#9ECCFA", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
          <IconClose />
        </button>
      </div>
      <div style={{ borderBottom: "4px solid #0B1957", padding: "12px 18px", background: "#EAF4FF", display: "flex", flexWrap: "wrap", gap: 6 }}>
        {selected.subject && <div style={{ border: "2px solid #0B1957", background: "#0B1957", color: "#9ECCFA", padding: "3px 10px", fontWeight: 900, fontSize: 10, textTransform: "uppercase" }}>{selected.subject}</div>}
        <div style={{ border: "2px solid #0B1957", background: "#F8F3EA", color: "#0B1957", padding: "3px 10px", fontWeight: 700, fontSize: 10, display: "flex", alignItems: "center", gap: 4 }}>
          <IconClock size={10} /> {fmt(selected.created_at)}
        </div>
        <div style={{ border: "2px solid #0B1957", background: selected.is_read ? "#9ECCFA" : "#FFE8A0", color: "#0B1957", padding: "3px 10px", fontWeight: 900, fontSize: 10, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}>
          {selected.is_read ? <><IconCheck size={10} /> Terbaca</> : <><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0B1957", display: "inline-block" }} /> Belum</>}
        </div>
      </div>
      <div style={{ padding: "18px 18px 22px" }}>
        <p style={{ fontWeight: 900, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0B1957", opacity: 0.4, marginBottom: 8 }}>Pesan</p>
        <div style={{ border: "3px solid #0B1957", background: "white", padding: "14px 16px", fontWeight: 600, fontSize: 13, color: "#0B1957", lineHeight: 1.75, whiteSpace: "pre-wrap", boxShadow: "3px 3px 0 #D1E8FF" }}>{selected.message}</div>
      </div>
      <div style={{ borderTop: "4px solid #0B1957" }}>
        {replyOpen && (
          <div style={{ borderBottom: "4px solid #0B1957", padding: "14px 18px", background: "#F0F7FF" }}>
            <p style={{ fontWeight: 900, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0B1957", opacity: 0.5, marginBottom: 6 }}>Balas ke: <span style={{ opacity: 1 }}>{selected.email}</span></p>
            <textarea value={replyBody} onChange={e => setReplyBody(e.target.value)} placeholder="Tulis balasan..." rows={4}
              style={{ width: "100%", border: "3px solid #0B1957", background: "white", padding: "10px 12px", fontWeight: 600, fontSize: 13, color: "#0B1957", lineHeight: 1.6, resize: "vertical", fontFamily: "inherit", boxShadow: "3px 3px 0 #D1E8FF", outline: "none", boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={handleSendReply} disabled={sending || !replyBody.trim()}
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, border: "3px solid #0B1957", background: sending || !replyBody.trim() ? "#D1E8FF" : "#0B1957", color: sending || !replyBody.trim() ? "#0B1957" : "#9ECCFA", padding: "9px 14px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: sending || !replyBody.trim() ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: "3px 3px 0 #9ECCFA" }}>
                {sending ? <><IconRefresh size={12} /> Mengirim...</> : <><IconMail size={12} /> Kirim</>}
              </button>
              <button onClick={() => { setReplyOpen(false); setReplyBody(""); }}
                style={{ border: "3px solid #0B1957", background: "#F8F3EA", color: "#0B1957", padding: "9px 12px", cursor: "pointer", fontFamily: "inherit", boxShadow: "3px 3px 0 #0B1957", fontWeight: 900, fontSize: 11, textTransform: "uppercase" }}>
                Batal
              </button>
            </div>
          </div>
        )}
        <div style={{ padding: "14px 18px", display: "flex", gap: 8 }}>
          <button onClick={() => { setReplyOpen(r => !r); setReplyBody(""); }}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, border: "4px solid #0B1957", background: replyOpen ? "#F8F3EA" : "#0B1957", color: replyOpen ? "#0B1957" : "#9ECCFA", padding: "9px 14px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", boxShadow: replyOpen ? "4px 4px 0 #0B1957" : "4px 4px 0 #9ECCFA" }}>
            <IconMail size={13} /> {replyOpen ? "Tutup" : "Balas"}
          </button>
          <button onClick={() => handleDelete(selected.id)} disabled={deleting === selected.id}
            style={{ border: "4px solid #0B1957", background: "#F8F3EA", color: "#0B1957", padding: "9px 12px", cursor: deleting === selected.id ? "wait" : "pointer", fontFamily: "inherit", boxShadow: "4px 4px 0 #0B1957", display: "flex", alignItems: "center" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#ef4444"; (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = "#ef4444"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F8F3EA"; (e.currentTarget as HTMLElement).style.color = "#0B1957"; (e.currentTarget as HTMLElement).style.borderColor = "#0B1957"; }}>
            <IconTrash size={13} />
          </button>
        </div>
      </div>
    </div>
  ) : null;

  if (loading) return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "4px 4px 0 #0B1957", padding: "14px 20px", minWidth: 90, flex: "1 1 90px" }}>
            <div style={{ height: 10, width: 60, background: "linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s ease infinite", marginBottom: 8 }}/>
            <div style={{ height: 26, width: 44, background: "linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s ease infinite" }}/>
          </div>
        ))}
      </div>
      {[0,1,2,3].map(i => (
        <div key={i} style={{ border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "4px 4px 0 #0B1957", padding: "16px 18px", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 40, height: 40, background: "linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s ease infinite", border: "3px solid #0B1957", flexShrink: 0 }}/>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ height: 11, width: "35%", background: "linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s ease infinite" }}/>
              <div style={{ height: 10, width: "65%", background: "linear-gradient(90deg,#D1E8FF 25%,#b8daff 50%,#D1E8FF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s ease infinite" }}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {showDetailMobile && selected && (
        <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(11,25,87,0.5)", backdropFilter: "blur(2px)", animation: "fadeIn 0.2s ease both" }} onClick={() => { setSelected(null); setShowDetailMobile(false); }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, maxHeight: "90vh", overflowY: "auto", animation: "slideUpFull 0.35s cubic-bezier(0.16,1,0.3,1) both" }} onClick={e => e.stopPropagation()}>
            <DetailPanel />
          </div>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div>
          <p style={{ fontWeight: 900, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "#9ECCFA", margin: "0 0 3px" }}>Kotak Masuk</p>
          <h2 style={{ fontWeight: 900, fontSize: 22, textTransform: "uppercase", color: "#0B1957", margin: 0 }}>Messages</h2>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={fetchAll}
            style={{ display: "flex", alignItems: "center", gap: 5, border: "4px solid #0B1957", background: "#F8F3EA", color: "#0B1957", padding: "7px 13px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: "pointer", boxShadow: "4px 4px 0 #0B1957", fontFamily: "inherit", transition: "transform 0.08s ease, box-shadow 0.08s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #0B1957"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #0B1957"; }}>
            <IconRefresh size={13} /> Refresh
          </button>
          {stats.unread > 0 && (
            <button onClick={handleMarkAllRead} disabled={markingAll}
              style={{ display: "flex", alignItems: "center", gap: 5, border: "4px solid #0B1957", background: "#0B1957", color: "#9ECCFA", padding: "7px 13px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: markingAll ? "wait" : "pointer", boxShadow: "4px 4px 0 #9ECCFA", fontFamily: "inherit", opacity: markingAll ? 0.6 : 1 }}>
              <IconCheck size={13} /> Tandai Terbaca
            </button>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { label: "Total",    value: stats.total,  bg: "#0B1957", fg: "#9ECCFA" },
          { label: "Unread",   value: stats.unread, bg: stats.unread > 0 ? "#FFE8A0" : "#F8F3EA", fg: "#0B1957" },
          { label: "Hari Ini", value: stats.today,  bg: "#9ECCFA", fg: "#0B1957" },
        ].map((s, i) => (
          <div key={i} style={{ border: "4px solid #0B1957", background: s.bg, color: s.fg, padding: "10px 16px", boxShadow: "4px 4px 0 #0B1957", minWidth: 80, flex: "1 1 80px", animation: `slideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.07}s both` }}>
            <p style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.7, marginBottom: 3 }}>{s.label}</p>
            <p style={{ fontWeight: 900, fontSize: 26, lineHeight: 1, fontVariantNumeric: "tabular-nums", margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", border: "4px solid #0B1957", marginBottom: 14, overflow: "hidden", boxShadow: "4px 4px 0 #0B1957" }}>
        {([ ["all","Semua",messages.length], ["unread","Belum",messages.filter(m=>!m.is_read).length], ["read","Dibaca",messages.filter(m=>m.is_read).length] ] as const).map(([key, label, count]) => (
          <button key={key} onClick={() => setFilterTab(key)}
            style={{ flex: 1, padding: "10px 6px", fontWeight: 900, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", borderRight: key !== "read" ? "4px solid #0B1957" : "none", borderLeft: "none", borderTop: "none", borderBottom: "none", background: filterTab === key ? "#0B1957" : "#F8F3EA", color: filterTab === key ? "#9ECCFA" : "#0B1957", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            {label}
            <span style={{ background: filterTab === key ? "rgba(158,204,250,0.2)" : "#D1E8FF", color: filterTab === key ? "#9ECCFA" : "#0B1957", border: `2px solid ${filterTab === key ? "#9ECCFA" : "#0B1957"}`, fontSize: 9, fontWeight: 900, padding: "1px 5px", minWidth: 18, textAlign: "center" }}>{count}</span>
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: selected ? "minmax(0,1fr) minmax(0,1fr)" : "1fr", gap: 14 }} className="msg-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.length === 0 && (
            <div style={{ border: "4px dashed #0B1957", background: "#F8F3EA", padding: "50px 20px", textAlign: "center" }}>
              <div style={{ marginBottom: 10, opacity: 0.15 }}><IconMail size={36} /></div>
              <p style={{ fontWeight: 900, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0B1957", opacity: 0.4 }}>
                {filterTab === "unread" ? "Tidak ada pesan belum dibaca" : filterTab === "read" ? "Tidak ada pesan sudah dibaca" : "Belum ada pesan masuk"}
              </p>
            </div>
          )}
          {filtered.map((msg, idx) => (
            <div key={msg.id} onClick={() => handleOpen(msg)}
              style={{ border: "4px solid #0B1957", background: selected?.id === msg.id ? "#0B1957" : msg.is_read ? "#F8F3EA" : "#EAF4FF", boxShadow: selected?.id === msg.id ? "5px 5px 0 #9ECCFA" : "5px 5px 0 #0B1957", padding: "14px 16px", cursor: "pointer", position: "relative", overflow: "hidden", transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease", animation: mounted ? `slideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${idx * 0.05}s both` : "none" }}
              onMouseEnter={e => { if (selected?.id !== msg.id) { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "7px 7px 0 #0B1957"; }}}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = selected?.id === msg.id ? "5px 5px 0 #9ECCFA" : "5px 5px 0 #0B1957"; }}>
              {!msg.is_read && <div style={{ position: "absolute", top: 12, right: 12, width: 9, height: 9, borderRadius: "50%", background: "#9ECCFA", border: "2px solid #0B1957" }}/>}
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 38, height: 38, flexShrink: 0, border: "3px solid " + (selected?.id === msg.id ? "#9ECCFA" : "#0B1957"), background: selected?.id === msg.id ? "#9ECCFA" : "#0B1957", color: selected?.id === msg.id ? "#0B1957" : "#9ECCFA", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, textTransform: "uppercase" }}>
                  {msg.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: msg.is_read ? 700 : 900, fontSize: 12, textTransform: "uppercase", color: selected?.id === msg.id ? "#F8F3EA" : "#0B1957", letterSpacing: "0.04em" }}>{msg.name}</span>
                    {!msg.is_read && <span style={{ border: "2px solid #0B1957", background: "#9ECCFA", color: "#0B1957", fontSize: 8, fontWeight: 900, padding: "1px 5px", textTransform: "uppercase" }}>Baru</span>}
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 11, color: selected?.id === msg.id ? "#9ECCFA" : "#0B1957", opacity: 0.7, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.subject || "(Tanpa Subjek)"}</p>
                  <p style={{ fontWeight: 600, fontSize: 10, color: selected?.id === msg.id ? "#D1E8FF" : "#0B1957", opacity: 0.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.message}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 9, color: selected?.id === msg.id ? "#9ECCFA" : "#0B1957", opacity: 0.45, textTransform: "uppercase", letterSpacing: "0.06em" }}>{fmt(msg.created_at)}</span>
                    <button onClick={e => { e.stopPropagation(); handleDelete(msg.id); }} disabled={deleting === msg.id}
                      style={{ border: "2px solid " + (selected?.id === msg.id ? "#9ECCFA" : "#0B1957"), background: "transparent", color: selected?.id === msg.id ? "#9ECCFA" : "#0B1957", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: deleting === msg.id ? "wait" : "pointer", fontFamily: "inherit", opacity: deleting === msg.id ? 0.5 : 0.6 }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#ef4444"; (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = "#ef4444"; (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = selected?.id === msg.id ? "#9ECCFA" : "#0B1957"; (e.currentTarget as HTMLElement).style.borderColor = selected?.id === msg.id ? "#9ECCFA" : "#0B1957"; (e.currentTarget as HTMLElement).style.opacity = "0.6"; }}>
                      <IconTrash size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selected && (
          <div className="hidden lg:block" style={{ position: "sticky", top: 16, animation: "slideRight 0.35s cubic-bezier(0.16,1,0.3,1) both" }}>
            <DetailPanel />
          </div>
        )}
      </div>
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 999, display: "flex", alignItems: "center", gap: 8, border: "4px solid #0B1957", background: toast.ok ? "#9ECCFA" : "#ef4444", color: toast.ok ? "#0B1957" : "white", padding: "10px 18px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", boxShadow: "6px 6px 0 #0B1957", whiteSpace: "nowrap", animation: "slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both", maxWidth: "calc(100vw - 32px)" }}>
          {toast.ok ? <IconCheck size={13} /> : null} {toast.msg}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ── DASHBOARD (Main) ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
export default function Dashboard() {
  const { auth } = usePage<{ auth: { user: { name: string; email: string } } }>().props;
  const user = auth?.user;

  const [visible,     setVisible]     = useState(false);
  const [activeNav,   setActiveNav]   = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time,        setTime]        = useState(new Date());
  const [unreadCount, setUnreadCount] = useState(0);
  const [navReady,    setNavReady]    = useState(false);

  useEffect(() => { setTimeout(() => { setVisible(true); setNavReady(true); }, 50); }, []);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    fetch("/api/messages/stats", { headers: { "X-CSRF-TOKEN": getCsrfToken() } })
      .then(r => r.json()).then(d => setUnreadCount(d.unread ?? 0)).catch(() => {});
  }, []);

  const handleLogout = () => router.post("/logout");
  const handleHome   = () => router.visit("/");
  const greeting = () => { const h = time.getHours(); return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening"; };

  const handleNavClick = (key: string) => {
    setActiveNav(key); setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const NavItems = ({ onClose }: { onClose?: () => void }) => (
    <>
      {NAV_ITEMS.map((item, idx) => (
        <div key={item.key}
          className={`nav-item ${activeNav === item.key ? "active" : ""}`}
          style={{ animationDelay: `${idx * 0.04}s` }}
          onClick={() => { handleNavClick(item.key); onClose?.(); }}>
          {item.icon}
          {item.label}
          {item.key === "messages" && unreadCount > 0 ? (
            <span style={{ marginLeft: "auto", background: "#9ECCFA", color: "#0B1957", border: "2px solid #9ECCFA", fontSize: 10, fontWeight: 900, padding: "1px 7px", minWidth: 20, textAlign: "center", flexShrink: 0 }}>{unreadCount}</span>
          ) : activeNav === item.key ? (
            <span style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "#9ECCFA", display: "inline-block", flexShrink: 0 }} />
          ) : null}
        </div>
      ))}
    </>
  );

  const SidebarBottom = () => (
    <div style={{ borderTop: "4px solid #9ECCFA", padding: "20px", position: "relative", zIndex: 10 }}>
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontWeight: 900, fontSize: 11, color: "#9ECCFA", textTransform: "uppercase", letterSpacing: "0.1em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>{user?.name ?? "Yusron"}</p>
        <p style={{ fontWeight: 600, fontSize: 10, color: "#D1E8FF", opacity: 0.6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: "2px 0 0" }}>{user?.email ?? "yusron@dev.com"}</p>
      </div>
      <button className="home-btn-sidebar" onClick={handleHome}><IconHome size={13} /> Homepage</button>
      <button className="logout-btn" style={{ width: "100%" }} onClick={handleLogout}><IconLogOut /> Logout</button>
    </div>
  );

  const BOTTOM_NAV = [
    { key: "overview",  label: "Home",     icon: <IconGrid size={18} /> },
    { key: "projects",  label: "Projects", icon: <IconFolder size={18} /> },
    { key: "messages",  label: "Messages", icon: <IconMail size={18} /> },
    { key: "homepage",  label: "Site",     icon: <IconGlobe size={18} /> },
    { key: "profile",   label: "Profile",  icon: <IconUser size={18} /> },
  ];

  return (
    <>
      <style>{`
        @keyframes slideUp     { from{opacity:0;transform:translateY(24px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes slideUpFull { from{opacity:0;transform:translateY(100%)}  to{opacity:1;transform:translateY(0)} }
        @keyframes slideLeft   { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight  { from{opacity:0;transform:translateX(30px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn      { from{opacity:0} to{opacity:1} }
        @keyframes shimmer     { from{background-position:-200% 0} to{background-position:200% 0} }
        @keyframes pulse       { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes bounceIn    { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes ping        { 0%{transform:scale(1);opacity:0.4} 70%,100%{transform:scale(2.2);opacity:0} }
        @keyframes cellColIn   { from{opacity:0;transform:translateY(12px) scaleY(0.7)} to{opacity:1;transform:translateY(0) scaleY(1)} }
        @keyframes sectionReveal { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }

        .section-hidden { opacity:0; transform:translateY(32px); }
        .section-visible { animation: sectionReveal 0.6s cubic-bezier(0.16,1,0.3,1) both; }

        .anim-sidebar { animation:slideLeft  0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-topbar  { animation:slideUp    0.4s cubic-bezier(0.16,1,0.3,1) 0.08s both; }
        .anim-content { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.15s both; }

        .nav-item {
          display:flex; align-items:center; gap:10px;
          padding:12px 16px; font-weight:800; font-size:13px;
          text-transform:uppercase; letter-spacing:0.08em;
          color:#9ECCFA; cursor:pointer; border-left:4px solid transparent;
          transition:background 0.12s ease, color 0.12s ease, border-color 0.12s ease, padding-left 0.15s ease;
          animation: slideLeft 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        .nav-item:hover  { background:rgba(158,204,250,0.1); color:#F8F3EA; padding-left:22px; }
        .nav-item.active { background:rgba(158,204,250,0.15); color:#F8F3EA; border-left-color:#9ECCFA; padding-left:22px; }

        .home-btn-sidebar {
          display:flex; align-items:center; gap:8px; width:100%;
          border:3px solid rgba(158,204,250,0.4); padding:9px 14px;
          background:transparent; font-weight:900; font-size:12px;
          text-transform:uppercase; color:#9ECCFA; letter-spacing:0.08em;
          cursor:pointer; font-family:inherit; margin-bottom:8px;
          box-shadow:2px 2px 0 rgba(158,204,250,0.3);
          transition:background 0.1s ease, border-color 0.1s ease, transform 0.08s ease, box-shadow 0.08s ease;
        }
        .home-btn-sidebar:hover  { background:rgba(158,204,250,0.1); border-color:#9ECCFA; transform:translate(-1px,-1px); }
        .home-btn-topbar {
          display:flex; align-items:center; gap:6px;
          border:3px solid #0B1957; padding:7px 14px;
          background:#F8F3EA; font-weight:900; font-size:12px;
          text-transform:uppercase; color:#0B1957; letter-spacing:0.07em;
          cursor:pointer; font-family:inherit; box-shadow:3px 3px 0 #0B1957;
          transition:transform 0.08s ease, box-shadow 0.08s ease;
        }
        .home-btn-topbar:hover  { transform:translate(2px,2px); box-shadow:1px 1px 0 #0B1957; }

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

        .content-fade { animation:fadeIn 0.3s ease both; }
        .grid-bg-dark {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            repeating-linear-gradient(0deg,rgba(158,204,250,0.08) 0,rgba(158,204,250,0.08) 1px,transparent 1px,transparent 40px),
            repeating-linear-gradient(90deg,rgba(158,204,250,0.08) 0,rgba(158,204,250,0.08) 1px,transparent 1px,transparent 40px);
        }

        .bottom-nav {
          display:none; position:fixed; bottom:0; left:0; right:0; z-index:50;
          background:#F8F3EA; border-top:4px solid #0B1957;
          box-shadow:0 -4px 0 rgba(11,25,87,0.15);
          align-items:stretch;
          animation:slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
          padding-bottom:env(safe-area-inset-bottom,0px);
        }
        @media (max-width:767px) { .bottom-nav { display:flex; } }

        .bottom-nav-item {
          flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:3px; padding:8px 4px; cursor:pointer; position:relative;
          border:none; background:transparent; border-right:2px solid rgba(11,25,87,0.1);
          min-height:58px; transition:background 0.1s ease;
        }
        .bottom-nav-item:last-child { border-right:none; }
        .bottom-nav-item.active { background:#0B1957; }
        .bottom-nav-item.active svg { stroke:#9ECCFA; }
        .bottom-nav-item.active .bnl { color:#9ECCFA; }
        .bnl { font-size:8px; font-weight:900; text-transform:uppercase; letter-spacing:0.05em; color:#0B1957; line-height:1; }
        .bn-badge {
          position:absolute; top:6px; right:calc(50% - 14px);
          background:#9ECCFA; color:#0B1957; border:2px solid #0B1957;
          font-size:8px; font-weight:900; padding:0 4px; min-width:14px; text-align:center; line-height:14px; height:14px;
        }

        .msg-grid { }
        @media (max-width:1023px) { .msg-grid { grid-template-columns:1fr !important; } }
        @media (max-width:767px)  { .main-scroll { padding-bottom:calc(70px + env(safe-area-inset-bottom,0px)) !important; } }

        /* Symmetric bottom grid */
        .overview-bottom-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width:1023px) { .overview-bottom-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="min-h-screen bg-[#D1E8FF] flex" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}>

        {/* SIDEBAR Desktop */}
        <aside className="anim-sidebar hidden md:flex flex-col w-64 bg-[#0B1957] border-r-4 border-[#0B1957] relative min-h-screen flex-shrink-0">
          <div className="grid-bg-dark" />
          <div className="border-b-4 border-[#9ECCFA] px-6 py-6 relative">
            <div style={{ fontWeight: 900, fontSize: 20, color: "#9ECCFA", textTransform: "uppercase", letterSpacing: "0.12em" }}>Naoo.id</div>
            <div style={{ fontWeight: 600, fontSize: 10, color: "#D1E8FF", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>Dashboard</div>
          </div>
          <nav style={{ flex: 1, paddingTop: 16, paddingBottom: 16, position: "relative" }}><NavItems /></nav>
          <SidebarBottom />
        </aside>

        {/* SIDEBAR Mobile Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-[#0B1957] bg-opacity-60 z-30 md:hidden" style={{ backdropFilter: "blur(3px)", animation: "fadeIn 0.2s ease both" }} onClick={() => setSidebarOpen(false)} />
        )}
        <aside className="fixed top-0 left-0 bottom-0 w-72 z-40 md:hidden bg-[#0B1957] border-r-4 border-[#0B1957] flex flex-col"
          style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
          <div className="grid-bg-dark" />
          <div style={{ borderBottom: "4px solid #9ECCFA", padding: "20px 24px", position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: "#9ECCFA", textTransform: "uppercase", letterSpacing: "0.12em" }}>Naoo.id</div>
              <div style={{ fontWeight: 600, fontSize: 10, color: "#D1E8FF", opacity: 0.6, textTransform: "uppercase" }}>Dashboard</div>
            </div>
            <button style={{ border: "2px solid #9ECCFA", padding: 8, color: "#9ECCFA", background: "transparent", cursor: "pointer", display: "flex" }} onClick={() => setSidebarOpen(false)}><IconClose /></button>
          </div>
          <nav style={{ flex: 1, paddingTop: 12, paddingBottom: 12, position: "relative", zIndex: 10, overflowY: "auto" }}>
            <NavItems onClose={() => setSidebarOpen(false)} />
          </nav>
          <SidebarBottom />
        </aside>

        {/* MAIN */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

          {/* TOPBAR */}
          <header className="anim-topbar bg-[#F8F3EA] border-b-4 border-[#0B1957] shadow-[0_4px_0_#0B1957] px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-3 flex-shrink-0 sticky top-0 z-20">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="md:hidden p-2 border-4 border-[#0B1957] shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA]" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <IconMenu />
              </button>
              <div>
                <p style={{ fontWeight: 900, fontSize: 9, color: "#9ECCFA", textTransform: "uppercase", letterSpacing: "0.25em", margin: 0 }}>{greeting()}</p>
                <h2 style={{ fontWeight: 900, fontSize: 17, color: "#0B1957", textTransform: "uppercase", margin: 0, letterSpacing: "0.04em" }}>{user?.name ?? "Yusron"}</h2>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {unreadCount > 0 && (
                <button onClick={() => handleNavClick("messages")}
                  style={{ display: "flex", alignItems: "center", gap: 5, border: "3px solid #0B1957", background: "#FFE8A0", color: "#0B1957", padding: "6px 10px", fontWeight: 900, fontSize: 10, textTransform: "uppercase", cursor: "pointer", boxShadow: "3px 3px 0 #0B1957", fontFamily: "inherit", animation: "pulse 2s ease infinite" }}>
                  <IconMail size={12} />
                  <span className="hidden xs:inline">{unreadCount} Baru</span>
                  <span className="xs:hidden">{unreadCount}</span>
                </button>
              )}
              <button className="home-btn-topbar" onClick={handleHome}>
                <IconHome size={12} /> <span className="hidden sm:inline">Home</span>
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <IconClock size={15} />
                <div>
                  <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest" style={{ margin: 0 }}>Live</p>
                  <p className="font-black text-base text-[#0B1957] tabular-nums" style={{ margin: 0 }}>
                    {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 main-scroll">

            {activeNav === "overview" && (
              <div className="content-fade">
                <OverviewSection unreadCount={unreadCount} onNavClick={handleNavClick} />
              </div>
            )}

            {activeNav === "projects" && <div className="content-fade"><ProjectCRUD /></div>}
            {activeNav === "stacks"   && <div className="content-fade"><TechStackCRUD /></div>}
            {activeNav === "homepage" && <div className="content-fade"><HomepageManager /></div>}
            {activeNav === "about"    && <div className="content-fade"><AboutManager /></div>}

            {activeNav === "messages" && (
              <div className="content-fade">
                <MessagesManager onUnreadChange={setUnreadCount} />
              </div>
            )}

            {activeNav === "profile" && (
              <div className="content-fade space-y-5 sm:space-y-6 max-w-2xl">
                <h2 className="font-black text-2xl uppercase text-[#0B1957]">Profile</h2>
                <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] overflow-hidden" style={{ animation: "slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
                  <div className="bg-[#9ECCFA] h-16 sm:h-20 border-b-4 border-[#0B1957] relative">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 12px)" }} />
                  </div>
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 relative -mt-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-[#F8F3EA] bg-[#0B1957] flex items-center justify-center font-black text-xl sm:text-2xl text-[#9ECCFA] mb-4" style={{ boxShadow: "4px 4px 0 #9ECCFA" }}>
                      {(user?.name ?? "Y")[0]}
                    </div>
                    <h3 className="font-black text-xl sm:text-2xl uppercase text-[#F8F3EA] mb-1">{user?.name ?? "Zaki Yusron"}</h3>
                    <p className="font-semibold text-xs sm:text-sm text-[#9ECCFA] mb-5 sm:mb-6">{user?.email ?? "yusron@dev.com"}</p>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {[{ label: "Role", value: "IT Programmer" }, { label: "Focus", value: "Fullstack Web" }, { label: "Stack", value: "React + Laravel" }, { label: "Status", value: "Open to Work" }].map((item, i) => (
                        <div key={i} className="border-2 border-[#9ECCFA] p-2 sm:p-3" style={{ animation: `slideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.06}s both` }}>
                          <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="font-bold text-xs sm:text-sm text-[#F8F3EA]">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleHome} className="flex-1 border-4 border-[#0B1957] py-3 sm:py-4 font-black text-xs sm:text-sm uppercase tracking-widest shadow-[6px_6px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957] flex items-center justify-center gap-2 sm:gap-3">
                    <IconHome size={15} /> Homepage
                  </button>
                  <button onClick={handleLogout} className="flex-1 border-4 border-[#0B1957] py-3 sm:py-4 font-black text-xs sm:text-sm uppercase tracking-widest shadow-[6px_6px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957] flex items-center justify-center gap-2 sm:gap-3">
                    <IconLogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      {navReady && (
        <nav className="bottom-nav">
          {BOTTOM_NAV.map(item => (
            <button key={item.key} className={`bottom-nav-item ${activeNav === item.key ? "active" : ""}`} onClick={() => handleNavClick(item.key)}>
              {item.icon}
              <span className="bnl">{item.label}</span>
              {item.key === "messages" && unreadCount > 0 && <span className="bn-badge">{unreadCount}</span>}
            </button>
          ))}
        </nav>
      )}
    </>
  );
}

// ── ProjectCard ────────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="project-card p-4 sm:p-5" style={{ border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "5px 5px 0 #0B1957", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 0 #9ECCFA, 10px 10px 0 #0B1957"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 #0B1957"; }}>
      <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <h3 className="font-black uppercase text-xs sm:text-sm text-[#0B1957] leading-tight">{project.title}</h3>
        <span className={`status-badge flex-shrink-0 text-xs border-2 px-2 py-0.5 font-black uppercase ${STATUS_STYLE[project.status] ?? "bg-[#F8F3EA] border-[#0B1957] text-[#0B1957]"}`}>{project.status}</span>
      </div>
      <p className="font-semibold text-xs text-[#0B1957] mb-3 sm:mb-4 leading-relaxed opacity-70">{project.desc}</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
        {(project.stacks ?? []).map((s, i) => (
          <span key={i} className="stack-tag" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            {s.icon && <DbIcon src={s.icon} size={12} />}{s.label}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between border-t-2 border-[#0B1957] pt-2 sm:pt-3 mt-2 sm:mt-3">
        <span className="font-black text-xs text-[#0B1957] uppercase opacity-50">{project.date}</span>
        <span className="font-black text-xs text-[#9ECCFA] uppercase cursor-pointer hover:underline flex items-center gap-1">View <IconArrow size={11} /></span>
      </div>
    </div> 
  );
}