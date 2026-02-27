import { useState, useEffect, useRef, useCallback } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconLayers   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IconLock     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const IconExternal = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IconHero     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconFolder   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>;
const IconUser     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconEye      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const IconPlus     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconClose    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconSearch   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconCheck    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconSave     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconUpload   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconSpin     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "hmSpin 0.8s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>;
const IconCrop     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 2 6 8 2 8"/><polyline points="18 22 18 16 22 16"/><path d="M2 14h14V2"/><path d="M10 22H22V10"/></svg>;
const IconZoomIn   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconZoomOut  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconRefresh  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const IconPhone    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.54-.54a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>;
const IconContact  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const IconTrash    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const IconLink     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
const IconEdit     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconMenu     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;

// ── Types ─────────────────────────────────────────────────────────────────────
interface TSItem   { id: number; name: string; icon: string; category: string; is_visible: boolean; }
interface HeroData { name: string; title: string; bio: string; photo: string | null; }

// ── Contact Types ─────────────────────────────────────────────────────────────
type ContactPlatform = "whatsapp" | "email" | "github" | "linkedin" | "twitter" | "instagram" | "telegram" | "custom";

interface ContactItem {
  id: number;
  platform: ContactPlatform;
  label: string;
  value: string;
  url: string;
  is_visible: boolean;
  sort_order: number;
  icon_color: string;
}

const PLATFORM_PRESETS: Record<ContactPlatform, { label: string; color: string; placeholder_value: string; placeholder_url: string; url_prefix?: string }> = {
  whatsapp:  { label: "WhatsApp",  color: "#25D366", placeholder_value: "6283861669565",  placeholder_url: "https://wa.me/6283861669565",      url_prefix: "https://wa.me/" },
  email:     { label: "Email",     color: "#EA4335", placeholder_value: "nama@email.com", placeholder_url: "mailto:nama@email.com",            url_prefix: "mailto:" },
  github:    { label: "GitHub",    color: "#0B1957", placeholder_value: "username",       placeholder_url: "https://github.com/username",     url_prefix: "https://github.com/" },
  linkedin:  { label: "LinkedIn",  color: "#0A66C2", placeholder_value: "username",       placeholder_url: "https://linkedin.com/in/username", url_prefix: "https://linkedin.com/in/" },
  twitter:   { label: "Twitter/X", color: "#000000", placeholder_value: "@username",      placeholder_url: "https://twitter.com/username",    url_prefix: "https://twitter.com/" },
  instagram: { label: "Instagram", color: "#E1306C", placeholder_value: "@username",      placeholder_url: "https://instagram.com/username",  url_prefix: "https://instagram.com/" },
  telegram:  { label: "Telegram",  color: "#2AABEE", placeholder_value: "@username",      placeholder_url: "https://t.me/username",           url_prefix: "https://t.me/" },
  custom:    { label: "Custom",    color: "#9ECCFA", placeholder_value: "Nama kontak",    placeholder_url: "https://...",                     url_prefix: "" },
};

const PLATFORM_ICONS: Record<ContactPlatform, JSX.Element> = {
  whatsapp:  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  email:     <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  github:    <svg width="20" height="20" viewBox="0 0 24 24" fill="#9ECCFA"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  linkedin:  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  twitter:   <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  instagram: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  telegram:  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  custom:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
};

const FALLBACK_ICON  = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3C/svg%3E";
const FALLBACK_PHOTO = "/profile/Mboy.jpeg";

const CROP_ASPECT_W = 4;
const CROP_ASPECT_H = 5;

function getCsrfToken(): string {
  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  if (meta?.content) return meta.content;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// ── useIsMobile hook ──────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < breakpoint : false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ── Global styles ─────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @keyframes hmSlideUp   { from{opacity:0;transform:translateY(22px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes hmSlideRight{ from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes hmSlideLeft { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes hmFadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes hmSpin      { to{transform:rotate(360deg)} }
  @keyframes hmPulse     { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes hmShimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes hmBounce    { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} 60%{transform:translateY(-2px)} }
  @keyframes hmGlow      { 0%,100%{box-shadow:4px 4px 0 #0B1957} 50%{box-shadow:4px 4px 0 #9ECCFA,6px 6px 0 #0B1957} }
  @keyframes hmCardIn    { from{opacity:0;transform:translateY(28px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }

  /* ── Prevent horizontal overflow on mobile ── */
  * { box-sizing: border-box; }

  .hm-skeleton {
    background: linear-gradient(90deg, #D1E8FF 25%, #b8daff 50%, #D1E8FF 75%);
    background-size: 200% 100%;
    animation: hmShimmer 1.5s ease infinite, hmPulse 1.5s ease infinite;
    border: 3px solid #0B1957;
  }

  /* ── Project card ── */
  .hm-proj-card {
    border: 4px solid #0B1957;
    background: #F8F3EA;
    box-shadow: 5px 5px 0 #0B1957;
    transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease;
  }
  .hm-proj-card:hover {
    transform: translate(-3px,-3px);
    box-shadow: 8px 8px 0 #9ECCFA, 10px 10px 0 #0B1957;
  }
  .hm-proj-card.hm-proj-hidden {
    opacity: 0.48;
    box-shadow: 3px 3px 0 #0B1957;
  }
  .hm-proj-card.hm-proj-hidden:hover {
    transform: translate(-2px,-2px);
    box-shadow: 5px 5px 0 #0B1957;
    opacity: 0.65;
  }

  /* ── Thumbnail ── */
  .hm-proj-thumb {
    overflow: hidden;
    position: relative;
    border-right: 4px solid #0B1957;
    flex-shrink: 0;
  }
  .hm-proj-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
    transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
  }
  .hm-proj-card:hover .hm-proj-thumb img {
    transform: scale(1.08);
  }

  /* ── Stack chip ── */
  .hm-stack-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 2px solid #0B1957;
    padding: 3px 8px;
    background: #D1E8FF;
    font-weight: 800;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #0B1957;
    transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  }
  .hm-stack-chip:hover {
    transform: translate(-1px,-1px);
    box-shadow: 2px 2px 0 #0B1957;
    background: #9ECCFA;
  }

  /* ── Section nav buttons ── */
  .hm-section-btn {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border: 3px solid #0B1957;
    background: #F8F3EA;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
    box-shadow: 3px 3px 0 #0B1957;
    width: 100%;
    transition: transform 0.15s cubic-bezier(0.16,1,0.3,1), box-shadow 0.15s cubic-bezier(0.16,1,0.3,1), background 0.12s ease;
    position: relative;
    overflow: hidden;
  }
  .hm-section-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(158,204,250,0.15), transparent);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .hm-section-btn:hover:not(:disabled)::after { opacity: 1; animation: hmShimmer 0.5s ease; }
  .hm-section-btn:hover:not(:disabled) { background: #D1E8FF; transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #0B1957; }
  .hm-section-btn.active { background: #0B1957; transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #9ECCFA; }
  .hm-section-btn:disabled { cursor: not-allowed; opacity: 0.55; }

  /* ── Mobile section nav tabs ── */
  .hm-mobile-nav {
    display: none;
  }
  .hm-mobile-nav-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 8px;
    border: none;
    border-right: 3px solid #0B1957;
    background: #F8F3EA;
    color: #0B1957;
    cursor: pointer;
    font-family: inherit;
    font-weight: 900;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
    flex: 1;
    min-width: 56px;
    transition: background 0.12s ease, color 0.12s ease;
  }
  .hm-mobile-nav-tab:last-child { border-right: none; }
  .hm-mobile-nav-tab.active { background: #0B1957; color: #9ECCFA; }
  .hm-mobile-nav-tab:not(.active):hover { background: #D1E8FF; }

  /* ── Filter tab ── */
  .hm-filter-tab {
    flex: 1;
    padding: 11px 8px;
    font-weight: 900;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: none;
    border-right: 4px solid #0B1957;
    cursor: pointer;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
  }
  .hm-filter-tab:last-child { border-right: none; }
  .hm-filter-tab.active { background: #0B1957; color: #9ECCFA; }
  .hm-filter-tab:not(.active) { background: #F8F3EA; color: #0B1957; }
  .hm-filter-tab:not(.active):hover { background: #D1E8FF; }

  /* ── Toggle button ── */
  .hm-toggle-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 10px 8px;
    transition: background 0.12s ease;
  }
  .hm-toggle-btn:hover { background: rgba(255,255,255,0.1); }
  .hm-toggle-btn:disabled { cursor: wait; opacity: 0.7; }

  /* ── Action button ── */
  .hm-action-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 10px 8px;
    transition: background 0.12s ease;
  }
  .hm-action-btn:hover { background: rgba(255,255,255,0.1); }

  /* ══════════════════════════════════════════
     RESPONSIVE — Mobile (≤ 768px)
  ══════════════════════════════════════════ */
  @media (max-width: 768px) {

    /* Show mobile nav, hide sidebar */
    .hm-sidebar { display: none !important; }
    .hm-mobile-nav { display: flex !important; }

    /* Page header: stack */
    .hm-page-header {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 12px !important;
    }
    .hm-page-header .hm-preview-btn {
      width: 100% !important;
      justify-content: center !important;
    }

    /* Main layout: full width */
    .hm-layout {
      flex-direction: column !important;
      gap: 0 !important;
    }
    .hm-content-area {
      min-width: 0 !important;
      width: 100% !important;
    }

    /* Breadcrumb: hide on mobile to save space */
    .hm-breadcrumb { display: none !important; }

    /* ── TechStack ── */
    .hm-ts-topbar {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .hm-ts-topbar > div:last-child {
      width: 100% !important;
    }
    .hm-ts-topbar > div:last-child > button {
      width: 100% !important;
      justify-content: center !important;
    }

    /* ── Hero Section ── */
    .hm-hero-grid-2 {
      grid-template-columns: 1fr !important;
    }
    .hm-hero-preview {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 14px !important;
    }
    .hm-hero-photo-row {
      flex-direction: column !important;
      gap: 14px !important;
    }
    .hm-hero-photo-row > div:last-child {
      min-width: 0 !important;
      width: 100% !important;
    }

    /* ── Projects ── */
    .hm-proj-header {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 12px !important;
    }
    .hm-proj-header > div:last-child > a {
      width: 100% !important;
      justify-content: center !important;
    }
    .hm-proj-card-inner {
      flex-wrap: wrap !important;
    }
    .hm-proj-meta { display: none !important; }
    .hm-proj-actions {
      width: 100% !important;
      flex-direction: row !important;
      justify-content: flex-end !important;
      margin-top: 8px !important;
    }

    /* ── Contact ── */
    .hm-contact-topbar {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .hm-contact-topbar > button {
      width: 100% !important;
      justify-content: center !important;
    }
    .hm-contact-list-header {
      grid-template-columns: auto 1fr auto auto !important;
      gap: 8px !important;
      padding: 8px 12px !important;
    }
    .hm-contact-list-row {
      grid-template-columns: auto 1fr auto auto !important;
      gap: 8px !important;
      padding: 12px !important;
    }
    .hm-contact-url { display: none !important; }
    .hm-contact-platform-badge { display: none !important; }

    /* ── About ── */
    .hm-about-preview-grid {
      grid-template-columns: 1fr 1fr !important;
    }
    .hm-about-cards-grid {
      grid-template-columns: 1fr !important;
    }

    /* ── ContactFormModal platform grid ── */
    .hm-platform-grid {
      grid-template-columns: repeat(4, 1fr) !important;
    }

    /* Filter tabs: smaller text */
    .hm-filter-tab {
      font-size: 10px !important;
      padding: 10px 4px !important;
      gap: 4px !important;
    }

    /* Modal: take full width */
    .hm-modal-inner {
      max-width: 100% !important;
      margin: 0 !important;
      max-height: 92vh !important;
    }

    /* Footer save bar: stack on tiny screens */
    .hm-footer-bar {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 10px !important;
    }
    .hm-footer-bar > button,
    .hm-footer-bar > span {
      width: 100% !important;
      text-align: center !important;
      justify-content: center !important;
    }

    /* Stats badges wrap */
    .hm-stats-row {
      flex-wrap: wrap !important;
    }
  }

  @media (max-width: 480px) {
    .hm-platform-grid {
      grid-template-columns: repeat(4, 1fr) !important;
    }
    /* project card image: smaller */
    .hm-proj-thumb-wrap {
      width: 72px !important;
      height: 54px !important;
    }
    /* hide long text in contact list on tiny screens */
    .hm-contact-value-text {
      max-width: 120px !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }
    /* header title smaller */
    .hm-page-title {
      font-size: 20px !important;
    }
  }
`;

// ── ImageCropModal ────────────────────────────────────────────────────────────
interface CropState { scale: number; offsetX: number; offsetY: number; }

function ImageCropModal({ src, onConfirm, onCancel }: {
  src: string; onConfirm: (croppedBase64: string) => void; onCancel: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef    = useRef<HTMLImageElement | null>(null);
  const stateRef  = useRef<CropState>({ scale: 1, offsetX: 0, offsetY: 0 });
  const dragRef   = useRef<{ active: boolean; startX: number; startY: number; ox: number; oy: number }>({ active: false, startX: 0, startY: 0, ox: 0, oy: 0 });
  const rafRef    = useRef<number | null>(null);
  const CANVAS_W  = 400;
  const CANVAS_H  = Math.round(CANVAS_W * CROP_ASPECT_H / CROP_ASPECT_W);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d")!;
    const { scale, offsetX, offsetY } = stateRef.current;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "#0B1957"; ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.drawImage(img, offsetX, offsetY, img.naturalWidth * scale, img.naturalHeight * scale);
    ctx.save();
    ctx.strokeStyle = "#9ECCFA"; ctx.lineWidth = 3; ctx.strokeRect(2, 2, CANVAS_W - 4, CANVAS_H - 4);
    ctx.strokeStyle = "rgba(158,204,250,0.25)"; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(CANVAS_W/3,0);ctx.lineTo(CANVAS_W/3,CANVAS_H);
    ctx.moveTo(CANVAS_W*2/3,0);ctx.lineTo(CANVAS_W*2/3,CANVAS_H);
    ctx.moveTo(0,CANVAS_H/3);ctx.lineTo(CANVAS_W,CANVAS_H/3);
    ctx.moveTo(0,CANVAS_H*2/3);ctx.lineTo(CANVAS_W,CANVAS_H*2/3);
    ctx.stroke();
    const BL = 24; ctx.strokeStyle = "#9ECCFA"; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(2,2+BL);ctx.lineTo(2,2);ctx.lineTo(2+BL,2);
    ctx.moveTo(CANVAS_W-2-BL,2);ctx.lineTo(CANVAS_W-2,2);ctx.lineTo(CANVAS_W-2,2+BL);
    ctx.moveTo(2,CANVAS_H-2-BL);ctx.lineTo(2,CANVAS_H-2);ctx.lineTo(2+BL,CANVAS_H-2);
    ctx.moveTo(CANVAS_W-2-BL,CANVAS_H-2);ctx.lineTo(CANVAS_W-2,CANVAS_H-2);ctx.lineTo(CANVAS_W-2,CANVAS_H-2-BL);
    ctx.stroke(); ctx.restore();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const scale = Math.max(CANVAS_W/img.naturalWidth, CANVAS_H/img.naturalHeight);
      stateRef.current = { scale, offsetX:(CANVAS_W-img.naturalWidth*scale)/2, offsetY:(CANVAS_H-img.naturalHeight*scale)/2 };
      draw();
    };
    img.crossOrigin = "anonymous"; img.src = src;
  }, [src, draw]);

  const clamp = (s: CropState): CropState => {
    const img = imgRef.current; if (!img) return s;
    const drawW = img.naturalWidth*s.scale, drawH = img.naturalHeight*s.scale;
    return { scale:s.scale, offsetX:Math.max(Math.min(0,CANVAS_W-drawW),Math.min(0,s.offsetX)), offsetY:Math.max(Math.min(0,CANVAS_H-drawH),Math.min(0,s.offsetY)) };
  };
  const requestDraw = useCallback(() => { if(rafRef.current)cancelAnimationFrame(rafRef.current); rafRef.current=requestAnimationFrame(draw); }, [draw]);
  const zoom = (delta: number) => {
    const img = imgRef.current; if(!img) return;
    const minScale = Math.max(CANVAS_W/img.naturalWidth, CANVAS_H/img.naturalHeight);
    const newScale = Math.max(minScale, Math.min(5, stateRef.current.scale+delta*stateRef.current.scale));
    const ratio = newScale/stateRef.current.scale;
    stateRef.current = clamp({ scale:newScale, offsetX:CANVAS_W/2-(CANVAS_W/2-stateRef.current.offsetX)*ratio, offsetY:CANVAS_H/2-(CANVAS_H/2-stateRef.current.offsetY)*ratio });
    requestDraw();
  };

  // Touch support for crop canvas
  const touchStartRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY, ox: stateRef.current.offsetX, oy: stateRef.current.offsetY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    e.preventDefault();
    const t = e.touches[0];
    stateRef.current = clamp({ ...stateRef.current, offsetX: touchStartRef.current.ox + t.clientX - touchStartRef.current.x, offsetY: touchStartRef.current.oy + t.clientY - touchStartRef.current.y });
    requestDraw();
  };
  const onTouchEnd = () => { touchStartRef.current = null; };

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); dragRef.current={active:true,startX:e.clientX,startY:e.clientY,ox:stateRef.current.offsetX,oy:stateRef.current.offsetY}; };
  const onMouseMove = useCallback((e: MouseEvent) => { const d=dragRef.current; if(!d.active)return; stateRef.current=clamp({...stateRef.current,offsetX:d.ox+e.clientX-d.startX,offsetY:d.oy+e.clientY-d.startY}); requestDraw(); }, [requestDraw]);
  const onMouseUp = useCallback(() => { dragRef.current.active=false; }, []);
  useEffect(() => { window.addEventListener("mousemove",onMouseMove); window.addEventListener("mouseup",onMouseUp); return()=>{window.removeEventListener("mousemove",onMouseMove);window.removeEventListener("mouseup",onMouseUp);}; }, [onMouseMove,onMouseUp]);

  const handleConfirm = () => {
    const img = imgRef.current; if(!img) return;
    const ec = document.createElement("canvas"); ec.width=CANVAS_W*2; ec.height=CANVAS_H*2;
    ec.getContext("2d")!.drawImage(img, stateRef.current.offsetX*2, stateRef.current.offsetY*2, img.naturalWidth*stateRef.current.scale*2, img.naturalHeight*stateRef.current.scale*2);
    onConfirm(ec.toDataURL("image/jpeg",0.92));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" style={{background:"rgba(11,25,87,0.85)",backdropFilter:"blur(6px)",animation:"hmFadeIn 0.2s ease"}}>
      <div className="hm-modal-inner bg-[#0B1957] border-4 border-[#9ECCFA] shadow-[16px_16px_0_#9ECCFA] w-full max-w-lg flex flex-col" style={{animation:"hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)"}}>
        <div className="border-b-4 border-[#9ECCFA] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#9ECCFA]"><IconCrop /><span className="font-black uppercase text-sm tracking-widest">Crop Foto</span></div>
          <button className="text-[#9ECCFA] hover:text-white" onClick={onCancel}><IconClose /></button>
        </div>
        <div className="relative flex justify-center bg-[#040d3a] border-b-4 border-[#9ECCFA]">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            style={{display:"block",cursor:"grab",width:"100%",maxWidth:CANVAS_W,userSelect:"none",touchAction:"none"}}
            onMouseDown={onMouseDown}
            onWheel={e=>{e.preventDefault();zoom(e.deltaY<0?0.07:-0.07);}}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-b-4 border-[#9ECCFA]">
          <div className="flex items-center gap-2">
            <button onClick={()=>zoom(-0.15)} style={{border:"2px solid #9ECCFA",background:"transparent",color:"#9ECCFA",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"inherit"}}><IconZoomOut /></button>
            <button onClick={()=>zoom(0.15)}  style={{border:"2px solid #9ECCFA",background:"transparent",color:"#9ECCFA",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"inherit"}}><IconZoomIn /></button>
          </div>
          <button onClick={()=>{const img=imgRef.current;if(!img)return;const sc=Math.max(CANVAS_W/img.naturalWidth,CANVAS_H/img.naturalHeight);stateRef.current={scale:sc,offsetX:(CANVAS_W-img.naturalWidth*sc)/2,offsetY:(CANVAS_H-img.naturalHeight*sc)/2};requestDraw();}} style={{display:"flex",alignItems:"center",gap:6,border:"2px solid #9ECCFA",background:"transparent",color:"#9ECCFA",padding:"6px 12px",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer",fontFamily:"inherit"}}><IconRefresh /> Reset</button>
        </div>
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={onCancel} style={{border:"4px solid #9ECCFA",background:"transparent",color:"#9ECCFA",padding:"10px 20px",fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer",fontFamily:"inherit"}}>Batal</button>
          <button onClick={handleConfirm} style={{display:"flex",alignItems:"center",gap:8,border:"4px solid #9ECCFA",background:"#9ECCFA",color:"#0B1957",padding:"10px 24px",fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer",boxShadow:"4px 4px 0 rgba(158,204,250,0.3)",fontFamily:"inherit"}}><IconCheck /> Gunakan Foto Ini</button>
        </div>
      </div>
    </div>
  );
}

// ── AddStackModal ─────────────────────────────────────────────────────────────
function AddStackModal({ hiddenStacks, adding, onAdd, onClose }: {
  hiddenStacks: TSItem[]; adding: number | null; onAdd: (stack: TSItem) => void; onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = hiddenStacks.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));
  const grouped  = filtered.reduce((acc,s) => { if(!acc[s.category])acc[s.category]=[]; acc[s.category].push(s); return acc; }, {} as Record<string,TSItem[]>);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{background:"rgba(11,25,87,0.75)",backdropFilter:"blur(4px)",animation:"hmFadeIn 0.2s ease"}}>
      <div className="hm-modal-inner bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[12px_12px_0_#0B1957] w-full max-w-lg max-h-[85vh] flex flex-col" style={{animation:"hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)"}}>
        <div className="bg-[#0B1957] border-b-4 border-[#0B1957] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 text-[#9ECCFA]"><IconPlus /><span className="font-black uppercase text-sm tracking-widest">Tambah ke Homepage</span></div>
          <button className="text-[#9ECCFA] hover:text-white" onClick={onClose}><IconClose /></button>
        </div>
        <div className="px-5 pt-4 pb-2 flex-shrink-0">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B1957] opacity-40 pointer-events-none"><IconSearch /></span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari nama atau kategori..." className="w-full border-4 border-[#0B1957] bg-white pl-9 pr-4 py-2.5 font-bold text-sm text-[#0B1957] placeholder-[#0B1957] placeholder-opacity-30 focus:outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {filtered.length===0 ? <div className="py-12 text-center"><p className="font-black text-sm uppercase text-[#0B1957] opacity-40 tracking-widest">{hiddenStacks.length===0?"Semua stack sudah tampil":"Tidak ditemukan"}</p></div>
          : Object.entries(grouped).map(([cat,items])=>(
            <div key={cat} className="mb-4">
              <p className="font-black text-[10px] uppercase tracking-[0.25em] text-[#0B1957] opacity-40 mb-2 mt-3">{cat}</p>
              <div className="flex flex-col gap-2">
                {items.map((stack,si) => (
                  <button key={stack.id} disabled={adding===stack.id} onClick={()=>onAdd(stack)}
                    className="flex items-center gap-3 p-3 bg-white hover:bg-[#D1E8FF] transition-all text-left w-full"
                    style={{border:"3px solid #0B1957",boxShadow:"3px 3px 0 #0B1957",opacity:adding===stack.id?0.6:1,cursor:adding===stack.id?"wait":"pointer",animation:`hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) ${si*0.04}s both`}}>
                    <img src={stack.icon} alt={stack.name} style={{width:32,height:32,objectFit:"cover",border:"2px solid #0B1957",flexShrink:0}} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}} />
                    <div className="flex-1 min-w-0"><p className="font-black text-xs uppercase text-[#0B1957]">{stack.name}</p><p className="font-semibold text-[10px] text-[#0B1957] opacity-40 uppercase tracking-widest">{stack.category}</p></div>
                    <div className="flex-shrink-0 text-[#0B1957] opacity-60">{adding===stack.id?<span style={{animation:"hmSpin 0.6s linear infinite",display:"inline-block"}}>⟳</span>:<IconPlus />}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t-4 border-[#0B1957] bg-[#0B1957] px-6 py-3 flex items-center justify-between flex-shrink-0">
          <span className="font-black text-[10px] text-[#9ECCFA] opacity-60 uppercase tracking-widest">{hiddenStacks.length} stack belum ditampilkan</span>
          <button onClick={onClose} className="border-2 border-[#9ECCFA] px-4 py-1.5 font-black text-xs uppercase text-[#9ECCFA] hover:bg-[#9ECCFA] hover:text-[#0B1957] transition-colors">Tutup</button>
        </div>
      </div>
    </div>
  );
}

// ── TechStackVisibility ───────────────────────────────────────────────────────
function TechStackVisibility() {
  const [stacks,   setStacks]   = useState<TSItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [toggling, setToggling] = useState<number | null>(null);
  const [adding,   setAdding]   = useState<number | null>(null);
  const [activeTab,setActiveTab]= useState(0);
  const [animating,setAnimating]= useState(false);
  const [showModal,setShowModal]= useState(false);
  const [toast,    setToast]    = useState<{ msg: string; ok: boolean } | null>(null);
  const [mounted,  setMounted]  = useState(false);

  const showToast = (msg: string, ok = true) => { setToast({msg,ok}); setTimeout(()=>setToast(null),2500); };

  useEffect(() => {
    fetch("/api/tech-stacks").then(r=>r.json()).then(data=>{setStacks(Array.isArray(data)?data:[]);setLoading(false);setTimeout(()=>setMounted(true),80);}).catch(()=>setLoading(false));
  }, []);

  const categories    = Array.from(new Set(stacks.filter(s=>s.is_visible).map(s=>s.category)));
  const visibleStacks = stacks.filter(s=>s.is_visible);
  const hiddenStacks  = stacks.filter(s=>!s.is_visible);
  const currentTechs  = visibleStacks.filter(s=>s.category===categories[activeTab]);
  useEffect(()=>{setActiveTab(0);},[categories.length]);

  const switchTab = (i:number) => { if(i===activeTab)return; setAnimating(true); setTimeout(()=>{setActiveTab(i);setAnimating(false);},150); };
  const handleToggle = async (stack: TSItem) => {
    setToggling(stack.id);
    try { const res=await fetch(`/api/tech-stacks/${stack.id}/toggle`,{method:"PATCH",headers:{"X-CSRF-TOKEN":getCsrfToken()}}); const u=await res.json(); if(u?.id){setStacks(p=>p.map(s=>s.id===stack.id?u:s));showToast(`"${stack.name}" ${u.is_visible?"ditampilkan":"disembunyikan"}`);} } catch{showToast("Gagal update!",false);}
    finally{setToggling(null);}
  };
  const handleAdd = async (stack: TSItem) => {
    setAdding(stack.id);
    try { const res=await fetch(`/api/tech-stacks/${stack.id}/toggle`,{method:"PATCH",headers:{"X-CSRF-TOKEN":getCsrfToken()}}); const u=await res.json(); if(u?.id){setStacks(p=>p.map(s=>s.id===stack.id?u:s));showToast(`"${stack.name}" ditambahkan!`);} } catch{showToast("Gagal menambahkan!",false);}
    finally{setAdding(null);}
  };

  return (
    <div>
      {/* Top bar */}
      <div className="hm-ts-topbar" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:12,animation:"hmSlideRight 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s both"}}>
          <span style={{border:"4px solid #0B1957",background:"#9ECCFA",color:"#0B1957",fontWeight:900,fontSize:12,padding:"6px 14px",textTransform:"uppercase",letterSpacing:"0.1em",boxShadow:"3px 3px 0 #0B1957"}}>{visibleStacks.length} Tampil</span>
          <span style={{border:"4px solid #0B1957",background:"#F8F3EA",color:"#0B1957",fontWeight:900,fontSize:12,padding:"6px 14px",textTransform:"uppercase",letterSpacing:"0.1em",boxShadow:"3px 3px 0 #0B1957"}}>{hiddenStacks.length} Disembunyikan</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,animation:"hmSlideLeft 0.4s cubic-bezier(0.16,1,0.3,1) 0.1s both"}}>
          <button onClick={()=>setShowModal(true)} disabled={loading||hiddenStacks.length===0}
            style={{display:"flex",alignItems:"center",gap:6,border:"4px solid #0B1957",background:hiddenStacks.length===0?"#D1E8FF":"#0B1957",color:hiddenStacks.length===0?"#0B1957":"#9ECCFA",padding:"8px 16px",fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.07em",cursor:(loading||hiddenStacks.length===0)?"not-allowed":"pointer",boxShadow:"4px 4px 0 #9ECCFA",opacity:(loading||hiddenStacks.length===0)?0.5:1,fontFamily:"inherit",transition:"transform 0.1s ease, box-shadow 0.1s ease"}}
            onMouseEnter={e=>{if(!loading&&hiddenStacks.length>0){(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";(e.currentTarget as HTMLElement).style.boxShadow="6px 6px 0 #9ECCFA";}}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translate(0,0)";(e.currentTarget as HTMLElement).style.boxShadow="4px 4px 0 #9ECCFA";}}>
            <IconPlus /> Tambah Stack
            {hiddenStacks.length>0&&<span style={{background:"#9ECCFA",color:"#0B1957",border:"2px solid #9ECCFA",fontSize:10,fontWeight:900,padding:"1px 6px",marginLeft:2}}>{hiddenStacks.length}</span>}
          </button>
        </div>
      </div>

      {/* Main panel */}
      <div style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"8px 8px 0 #0B1957",overflow:"hidden",animation:"hmSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s both"}}>
        {!loading&&categories.length>0&&(
          <div style={{display:"flex",borderBottom:"4px solid #0B1957",overflowX:"auto"}}>
            {categories.map((cat,i)=>(
              <button key={cat} onClick={()=>switchTab(i)}
                style={{flexShrink:0,flex:1,padding:"12px 16px",fontWeight:900,textTransform:"uppercase",fontSize:12,letterSpacing:"0.08em",borderRight:"4px solid #0B1957",borderLeft:"none",borderTop:"none",borderBottom:"none",background:activeTab===i?"#0B1957":"#F8F3EA",color:activeTab===i?"#9ECCFA":"#0B1957",cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",transition:"background 0.15s ease, color 0.15s ease",animation:`hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${0.2+i*0.06}s both`}}>
                {cat}
                <span style={{marginLeft:8,fontSize:10,fontWeight:900,opacity:0.7}}>{visibleStacks.filter(s=>s.category===cat).length}</span>
              </button>
            ))}
          </div>
        )}

        <div style={{padding:"24px 28px",minHeight:160,display:"flex",flexWrap:"wrap",gap:10,alignItems:"flex-start",alignContent:"flex-start",opacity:animating?0:1,transform:animating?"translateY(8px)":"translateY(0)",transition:"opacity 0.15s ease, transform 0.15s ease"}}>
          {loading&&Array.from({length:5}).map((_,i)=>(
            <div key={i} style={{display:"inline-flex",alignItems:"center",gap:8,border:"3px solid #0B1957",padding:"7px 12px 7px 7px",animation:`hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s both`}}>
              <div className="hm-skeleton" style={{width:26,height:26,border:"none"}}/>
              <div className="hm-skeleton" style={{width:60,height:12,border:"none"}}/>
            </div>
          ))}
          {!loading&&visibleStacks.length===0&&(
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",gap:8,animation:"hmFadeIn 0.4s ease"}}>
              <p style={{fontWeight:900,fontSize:12,textTransform:"uppercase",color:"#0B1957",opacity:0.4,letterSpacing:"0.15em"}}>Belum ada stack yang ditampilkan</p>
            </div>
          )}
          {!loading&&currentTechs.map((tech,i)=>(
            <button key={tech.id} onClick={()=>!toggling&&handleToggle(tech)} disabled={toggling===tech.id}
              style={{display:"inline-flex",alignItems:"center",gap:8,border:"3px solid #0B1957",padding:"7px 12px 7px 7px",background:"#F8F3EA",opacity:toggling===tech.id?0.5:1,boxShadow:"3px 3px 0 #0B1957",cursor:toggling===tech.id?"wait":"pointer",fontFamily:"inherit",fontWeight:800,fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",color:"#0B1957",transition:"transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease",animation:mounted?`hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.05}s both`:"none"}}
              onMouseEnter={e=>{if(toggling!==tech.id){(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";(e.currentTarget as HTMLElement).style.boxShadow="4px 4px 0 #0B1957";(e.currentTarget as HTMLElement).style.background="#D1E8FF";}}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translate(0,0)";(e.currentTarget as HTMLElement).style.boxShadow="3px 3px 0 #0B1957";(e.currentTarget as HTMLElement).style.background="#F8F3EA";}}>
              <img src={tech.icon} alt={tech.name} style={{width:26,height:26,objectFit:"cover",border:"2px solid #0B1957",flexShrink:0}} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}/>
              <span>{tech.name}</span>
              <span style={{display:"flex",alignItems:"center",marginLeft:2,opacity:0.5}}>{toggling===tech.id?<span style={{animation:"hmSpin 0.6s linear infinite",display:"inline-block"}}>⟳</span>:<IconEye />}</span>
            </button>
          ))}
        </div>

        <div style={{borderTop:"4px solid #0B1957",background:"#0B1957",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,border:"2px solid #9ECCFA",background:"#9ECCFA"}}/><span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.12em"}}>Tampil di homepage</span></div>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,border:"2px solid #9ECCFA",background:"transparent"}}/><span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.12em",opacity:0.5}}>Disembunyikan</span></div>
          </div>
          <span style={{fontWeight:700,fontSize:10,color:"#D1E8FF",opacity:0.4,textTransform:"uppercase",letterSpacing:"0.1em"}}>Perubahan langsung tersimpan</span>
        </div>
      </div>

      {showModal&&<AddStackModal hiddenStacks={hiddenStacks} adding={adding} onAdd={handleAdd} onClose={()=>setShowModal(false)}/>}
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",zIndex:999,display:"flex",alignItems:"center",gap:10,border:"4px solid #0B1957",background:ok?"#9ECCFA":"#ef4444",color:ok?"#0B1957":"white",padding:"12px 22px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",boxShadow:"6px 6px 0 #0B1957",whiteSpace:"nowrap",animation:"hmSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both",maxWidth:"calc(100vw - 32px)"}}>
      {ok ? <IconCheck/> : null}{msg}
    </div>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────────
function HeroSection() {
  const [form,     setForm]     = useState<HeroData>({name:"",title:"",bio:"",photo:null});
  const [preview,  setPreview]  = useState<string|null>(null);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [dirty,    setDirty]    = useState(false);
  const [dragging, setDragging] = useState(false);
  const [toast,    setToast]    = useState<{msg:string;ok:boolean}|null>(null);
  const [cropSrc,  setCropSrc]  = useState<string|null>(null);
  const [mounted,  setMounted]  = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const showToast = (msg:string,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),2500);};

  useEffect(()=>{
    fetch("/api/hero").then(r=>r.json()).then(data=>{setForm({name:data.name??"",title:data.title??"",bio:data.bio??"",photo:data.photo??null});setPreview(data.photo??null);setLoading(false);setTimeout(()=>setMounted(true),80);}).catch(()=>setLoading(false));
  },[]);

  const handleChange = (field:keyof HeroData,value:string)=>{setForm(p=>({...p,[field]:value}));setDirty(true);};
  const handleFile = async (file:File)=>{
    if(!file.type.startsWith("image/")){showToast("File harus berupa gambar!",false);return;}
    if(file.size>10*1024*1024){showToast("Ukuran max 10MB!",false);return;}
    setCropSrc(await toBase64(file));
  };
  const handleCropConfirm=(b64:string)=>{setForm(p=>({...p,photo:b64}));setPreview(b64);setDirty(true);setCropSrc(null);};
  const handleUrlChange=(url:string)=>{handleChange("photo",url);setPreview(url);};
  const handleSave=async()=>{
    if(!form.name.trim()){showToast("Nama wajib diisi!",false);return;}
    if(!form.title.trim()){showToast("Title wajib diisi!",false);return;}
    setSaving(true);
    try{
      const res=await fetch("/api/hero",{method:"PUT",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":getCsrfToken()},body:JSON.stringify(form)});
      const u=await res.json();
      if(u?.id||u?.name){setForm({name:u.name,title:u.title,bio:u.bio??"",photo:u.photo});setPreview(u.photo);setDirty(false);showToast("Hero section berhasil disimpan!");}
      else showToast("Gagal menyimpan!",false);
    }catch{showToast("Terjadi kesalahan!",false);}
    finally{setSaving(false);}
  };

  if(loading) return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:"#0B1957",border:"4px solid #0B1957",boxShadow:"6px 6px 0 #9ECCFA",padding:20,display:"flex",gap:20,animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) both"}}>
        <div className="hm-skeleton" style={{width:64,height:80,border:"3px solid #9ECCFA",flexShrink:0}}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:8}}>
          <div className="hm-skeleton" style={{height:12,width:"40%"}}/>
          <div className="hm-skeleton" style={{height:20,width:"60%"}}/>
          <div className="hm-skeleton" style={{height:12,width:"50%"}}/>
        </div>
      </div>
      <div style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"8px 8px 0 #0B1957",padding:28,display:"flex",flexDirection:"column",gap:16}}>
        {[1,2,3,4].map(i=><div key={i} className="hm-skeleton" style={{height:48,width:`${100-i*5}%`,animation:`hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s both`}}/>)}
      </div>
    </div>
  );

  return (
    <div>
      {/* Preview bar */}
      <div className="hm-hero-preview" style={{marginBottom:16,background:"#0B1957",border:"4px solid #0B1957",boxShadow:"6px 6px 0 #9ECCFA",padding:20,display:"flex",alignItems:"center",gap:20,animation:"hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.05s both"}}>
        <div style={{width:64,height:80,border:"3px solid #9ECCFA",overflow:"hidden",position:"relative",background:"#1a2f7a",flexShrink:0}}>
          <img src={preview??FALLBACK_PHOTO} alt="preview" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_PHOTO;}}/>
        </div>
        <div style={{minWidth:0,flex:1}}>
          <p style={{fontWeight:900,fontSize:11,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.2em",marginBottom:4}}>Preview Hero</p>
          <p style={{fontWeight:900,fontSize:22,color:"#F8F3EA",textTransform:"uppercase",lineHeight:1.1,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{form.name||"—"}</p>
          <p style={{fontWeight:800,fontSize:12,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:4}}>{form.title||"—"}</p>
          <p style={{fontWeight:600,fontSize:12,color:"#D1E8FF",opacity:0.7,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{form.bio||"—"}</p>
        </div>
      </div>

      {/* Form */}
      <div style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"8px 8px 0 #0B1957",overflow:"hidden",animation:"hmSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both"}}>
        <div style={{padding:"24px 28px",display:"flex",flexDirection:"column",gap:18}}>
          {/* Name + Title — 2 col on desktop, 1 col on mobile */}
          <div className="hm-hero-grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.2s both"}}>
            <div>
              <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:6}}>Nama <span style={{color:"#e53e3e"}}>*</span></label>
              <input value={form.name} onChange={e=>handleChange("name",e.target.value)} placeholder="Yusron"
                style={{width:"100%",border:"4px solid #0B1957",background:"white",padding:"10px 14px",fontWeight:700,fontSize:13,color:"#0B1957",outline:"none",boxSizing:"border-box",transition:"box-shadow 0.15s ease, transform 0.12s ease"}}
                onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="4px 4px 0 #9ECCFA";(e.target as HTMLInputElement).style.transform="translate(-1px,-1px)";}}
                onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";(e.target as HTMLInputElement).style.transform="translate(0,0)";}}/>
            </div>
            <div>
              <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:6}}>Title / Role <span style={{color:"#e53e3e"}}>*</span></label>
              <input value={form.title} onChange={e=>handleChange("title",e.target.value)} placeholder="IT Programmer"
                style={{width:"100%",border:"4px solid #0B1957",background:"white",padding:"10px 14px",fontWeight:700,fontSize:13,color:"#0B1957",outline:"none",boxSizing:"border-box",transition:"box-shadow 0.15s ease, transform 0.12s ease"}}
                onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="4px 4px 0 #9ECCFA";(e.target as HTMLInputElement).style.transform="translate(-1px,-1px)";}}
                onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";(e.target as HTMLInputElement).style.transform="translate(0,0)";}}/>
            </div>
          </div>

          {/* Bio */}
          <div style={{animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.28s both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
              <label style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957"}}>Bio</label>
              <span style={{fontWeight:700,fontSize:11,color:"#0B1957",opacity:0.4}}>{form.bio.length}/500</span>
            </div>
            <textarea value={form.bio} onChange={e=>handleChange("bio",e.target.value)} rows={3} maxLength={500} placeholder="Saya membangun aplikasi web modern..."
              style={{width:"100%",border:"4px solid #0B1957",background:"white",padding:"10px 14px",fontWeight:600,fontSize:13,color:"#0B1957",outline:"none",boxSizing:"border-box",resize:"vertical",fontFamily:"inherit",transition:"box-shadow 0.15s ease, transform 0.12s ease"}}
              onFocus={e=>{(e.target as HTMLTextAreaElement).style.boxShadow="4px 4px 0 #9ECCFA";(e.target as HTMLTextAreaElement).style.transform="translate(-1px,-1px)";}}
              onBlur={e=>{(e.target as HTMLTextAreaElement).style.boxShadow="none";(e.target as HTMLTextAreaElement).style.transform="translate(0,0)";}}/>
          </div>

          {/* Photo */}
          <div style={{animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.34s both"}}>
            <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:8}}>
              Foto Profil
              <span style={{marginLeft:8,fontWeight:600,fontSize:10,opacity:0.4,textTransform:"none",letterSpacing:0}}>— akan di-crop otomatis 4:5</span>
            </label>
            <div className="hm-hero-photo-row" style={{display:"flex",gap:16,alignItems:"flex-start"}}>
              <div style={{flexShrink:0,display:"flex",flexDirection:"column",gap:8,alignItems:"center"}}>
                <div style={{width:96,height:112,border:"4px solid #0B1957",overflow:"hidden",boxShadow:"4px 4px 0 #0B1957",background:"#D1E8FF",position:"relative"}}>
                  <img src={preview??FALLBACK_PHOTO} alt="foto" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_PHOTO;}}/>
                </div>
                {preview&&preview!==FALLBACK_PHOTO&&<button onClick={()=>setCropSrc(preview!)} style={{display:"flex",alignItems:"center",gap:4,border:"2px solid #0B1957",background:"transparent",color:"#0B1957",padding:"5px 10px",fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer",fontFamily:"inherit"}}><IconCrop/>Re-crop</button>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{border:`4px dashed ${dragging?"#9ECCFA":"#0B1957"}`,background:dragging?"#D1E8FF":"white",padding:"20px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",transition:"all 0.15s ease"}}
                  onClick={()=>fileRef.current?.click()}
                  onDragOver={e=>{e.preventDefault();setDragging(true);}}
                  onDragLeave={()=>setDragging(false)}
                  onDrop={e=>{e.preventDefault();setDragging(false);const f=e.dataTransfer.files[0];if(f)handleFile(f);}}>
                  <div style={{color:"#0B1957",opacity:0.4}}><IconUpload/></div>
                  <p style={{fontWeight:900,fontSize:12,textTransform:"uppercase",color:"#0B1957",letterSpacing:"0.08em",textAlign:"center"}}>Drop foto di sini</p>
                  <p style={{fontWeight:600,fontSize:11,color:"#0B1957",opacity:0.5}}>atau klik untuk pilih</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)handleFile(f);e.target.value="";}}/>
                <div style={{marginTop:10}}>
                  <input value={form.photo?.startsWith("data:")?"":(form.photo??"")} onChange={e=>handleUrlChange(e.target.value)} placeholder="atau masukkan URL foto..."
                    style={{width:"100%",border:"4px solid #0B1957",background:"white",padding:"10px 14px",fontWeight:600,fontSize:12,color:"#0B1957",outline:"none",boxSizing:"border-box",transition:"box-shadow 0.15s ease"}}
                    onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="4px 4px 0 #9ECCFA";}}
                    onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";}}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="hm-footer-bar" style={{borderTop:"4px solid #0B1957",background:"#0B1957",padding:"16px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <span style={{fontWeight:700,fontSize:10,color:"#D1E8FF",opacity:0.6,textTransform:"uppercase",letterSpacing:"0.1em"}}>{dirty?"⚠ Ada perubahan yang belum disimpan":"✓ Semua perubahan tersimpan"}</span>
          <button onClick={handleSave} disabled={saving||!dirty}
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,border:"4px solid #9ECCFA",background:dirty?"#9ECCFA":"transparent",color:dirty?"#0B1957":"#9ECCFA",padding:"10px 24px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",cursor:(saving||!dirty)?"not-allowed":"pointer",boxShadow:dirty?"4px 4px 0 rgba(158,204,250,0.4)":"none",opacity:!dirty?0.5:1,fontFamily:"inherit",transition:"all 0.1s ease",whiteSpace:"nowrap"}}>
            {saving?<IconSpin/>:<IconSave/>}{saving?"Menyimpan...":"Simpan"}
          </button>
        </div>
      </div>
      {cropSrc&&<ImageCropModal src={cropSrc} onConfirm={handleCropConfirm} onCancel={()=>setCropSrc(null)}/>}
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ── ContactFormModal ──────────────────────────────────────────────────────────
function ContactFormModal({ item, onSave, onClose }: {
  item: Partial<ContactItem> | null;
  onSave: (data: Partial<ContactItem>) => void;
  onClose: () => void;
}) {
  const isEdit = !!(item?.id);
  const [platform, setPlatform] = useState<ContactPlatform>((item?.platform as ContactPlatform) ?? "whatsapp");
  const [label,    setLabel]    = useState(item?.label ?? PLATFORM_PRESETS.whatsapp.label);
  const [value,    setValue]    = useState(item?.value ?? "");
  const [url,      setUrl]      = useState(item?.url ?? "");
  const [color,    setColor]    = useState(item?.icon_color ?? PLATFORM_PRESETS.whatsapp.color);

  const handleValueChange = (v: string) => {
    setValue(v);
    const preset = PLATFORM_PRESETS[platform];
    if (platform !== "custom" && preset.url_prefix) {
      if (platform === "email") setUrl(`mailto:${v}`);
      else setUrl(`${preset.url_prefix}${v.replace(/^@/,"")}`);
    }
  };

  const handlePlatformChange = (p: ContactPlatform) => {
    setPlatform(p); setLabel(PLATFORM_PRESETS[p].label); setColor(PLATFORM_PRESETS[p].color); setValue(""); setUrl("");
  };

  const handleSubmit = () => {
    if (!value.trim() || !url.trim()) return;
    onSave({ id: item?.id, platform, label, value, url, icon_color: color, is_visible: item?.is_visible ?? true, sort_order: item?.sort_order ?? 0 });
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"0",background:"rgba(11,25,87,0.75)",backdropFilter:"blur(4px)",animation:"hmFadeIn 0.2s ease"}}
      /* on desktop center it */ onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="hm-modal-inner" style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"0 -8px 0 #0B1957",width:"100%",maxWidth:520,display:"flex",flexDirection:"column",animation:"hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)",borderBottom:"none",maxHeight:"92vh"}}
        onClick={e=>e.stopPropagation()}>
        <div style={{background:"#0B1957",borderBottom:"4px solid #0B1957",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10,color:"#9ECCFA"}}>
            <IconContact/>
            <span style={{fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.15em"}}>{isEdit?"Edit Kontak":"Tambah Kontak"}</span>
          </div>
          <button style={{color:"#9ECCFA",background:"transparent",border:"none",cursor:"pointer",display:"flex",padding:4}} onClick={onClose}><IconClose/></button>
        </div>
        <div style={{padding:24,display:"flex",flexDirection:"column",gap:16,overflowY:"auto",flex:1}}>
          {/* Platform */}
          <div style={{animation:"hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) 0.05s both"}}>
            <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:10}}>Platform</label>
            <div className="hm-platform-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {(Object.keys(PLATFORM_PRESETS) as ContactPlatform[]).map((p,i)=>(
                <button key={p} onClick={()=>handlePlatformChange(p)}
                  style={{border:"3px solid #0B1957",background:platform===p?"#0B1957":"white",color:platform===p?"#9ECCFA":"#0B1957",padding:"8px 4px",fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.05em",cursor:"pointer",fontFamily:"inherit",boxShadow:platform===p?"inset 0 0 0 0":"2px 2px 0 #0B1957",transition:"all 0.1s ease",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{width:32,height:32,background:PLATFORM_PRESETS[p].color,border:`2px solid ${platform===p?"#9ECCFA":"#0B1957"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {PLATFORM_ICONS[p]}
                  </div>
                  <span style={{fontSize:9,lineHeight:1.2,textAlign:"center"}}>{PLATFORM_PRESETS[p].label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Label */}
          <div>
            <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:6}}>Label Tampil</label>
            <input value={label} onChange={e=>setLabel(e.target.value)} placeholder={PLATFORM_PRESETS[platform].label}
              style={{width:"100%",border:"4px solid #0B1957",background:"white",padding:"10px 14px",fontWeight:700,fontSize:13,color:"#0B1957",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="4px 4px 0 #9ECCFA";}} onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";}}/>
          </div>
          {/* Value */}
          <div>
            <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:6}}>
              {platform==="whatsapp"?"Nomor HP":platform==="email"?"Alamat Email":"Username / ID"} <span style={{color:"#e53e3e"}}>*</span>
            </label>
            <input value={value} onChange={e=>handleValueChange(e.target.value)} placeholder={PLATFORM_PRESETS[platform].placeholder_value}
              style={{width:"100%",border:"4px solid #0B1957",background:"white",padding:"10px 14px",fontWeight:700,fontSize:13,color:"#0B1957",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="4px 4px 0 #9ECCFA";}} onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";}}/>
          </div>
          {/* URL */}
          <div>
            <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:6}}>
              URL / Link <span style={{color:"#e53e3e"}}>*</span>
            </label>
            <input value={url} onChange={e=>setUrl(e.target.value)} placeholder={PLATFORM_PRESETS[platform].placeholder_url}
              style={{width:"100%",border:"4px solid #0B1957",background:"white",padding:"10px 14px",fontWeight:700,fontSize:13,color:"#0B1957",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="4px 4px 0 #9ECCFA";}} onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";}}/>
          </div>
          {/* Color */}
          <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
            <div>
              <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:6}}>Warna Icon</label>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:40,height:40,background:color,border:"4px solid #0B1957",flexShrink:0}}/>
                <input type="color" value={color} onChange={e=>setColor(e.target.value)} style={{border:"4px solid #0B1957",height:40,width:60,cursor:"pointer",background:"white",padding:"2px"}}/>
                <button onClick={()=>setColor(PLATFORM_PRESETS[platform].color)} style={{border:"2px solid #0B1957",background:"transparent",color:"#0B1957",padding:"6px 10px",fontWeight:900,fontSize:10,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>Reset</button>
              </div>
            </div>
            <div>
              <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",opacity:0.6,marginBottom:6}}>Preview</p>
              <div style={{width:48,height:48,background:color,border:"4px solid #0B1957",boxShadow:"3px 3px 0 #0B1957",display:"flex",alignItems:"center",justifyContent:"center"}}>{PLATFORM_ICONS[platform]}</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:"4px solid #0B1957",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#F8F3EA",flexShrink:0,gap:10}}>
          <button onClick={onClose} style={{border:"4px solid #0B1957",background:"transparent",color:"#0B1957",padding:"10px 20px",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>Batal</button>
          <button onClick={handleSubmit} disabled={!value.trim()||!url.trim()}
            style={{display:"flex",alignItems:"center",gap:8,border:"4px solid #0B1957",background:(!value.trim()||!url.trim())?"#D1E8FF":"#0B1957",color:(!value.trim()||!url.trim())?"#0B1957":"#9ECCFA",padding:"10px 24px",fontWeight:900,fontSize:12,textTransform:"uppercase",cursor:(!value.trim()||!url.trim())?"not-allowed":"pointer",boxShadow:"4px 4px 0 #9ECCFA",fontFamily:"inherit",opacity:(!value.trim()||!url.trim())?0.5:1}}>
            <IconCheck/>{isEdit?"Simpan Perubahan":"Tambah Kontak"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ContactSection ────────────────────────────────────────────────────────────
function ContactSection() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [dirty,    setDirty]    = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const [modal,    setModal]    = useState<{ open: boolean; item: Partial<ContactItem> | null }>({ open: false, item: null });
  const [toast,    setToast]    = useState<{ msg: string; ok: boolean } | null>(null);
  const showToast = (msg:string,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),2500);};

  useEffect(()=>{
    fetch("/api/contact").then(r=>r.json())
      .then(data=>{ setContacts(Array.isArray(data)?data:[]); setLoading(false); setTimeout(()=>setMounted(true),80); })
      .catch(()=>setLoading(false));
  },[]);

  const handleToggleVisibility = (id: number) => { setContacts(p => p.map(c => c.id===id ? {...c, is_visible:!c.is_visible} : c)); setDirty(true); };
  const handleDelete = (id: number) => { setContacts(p => p.filter(c => c.id !== id)); setDirty(true); };
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const arr = [...contacts]; [arr[index-1], arr[index]] = [arr[index], arr[index-1]];
    setContacts(arr.map((c,i) => ({...c, sort_order:i}))); setDirty(true);
  };
  const handleMoveDown = (index: number) => {
    if (index === contacts.length-1) return;
    const arr = [...contacts]; [arr[index], arr[index+1]] = [arr[index+1], arr[index]];
    setContacts(arr.map((c,i) => ({...c, sort_order:i}))); setDirty(true);
  };
  const handleModalSave = (data: Partial<ContactItem>) => {
    if (data.id) { setContacts(p => p.map(c => c.id===data.id ? {...c,...data} as ContactItem : c)); }
    else { const tempId = -(Date.now()); setContacts(p => [...p, { ...data, id:tempId, sort_order:p.length } as ContactItem]); }
    setDirty(true); setModal({ open:false, item:null }); showToast(data.id ? "Kontak diperbarui!" : "Kontak ditambahkan!");
  };
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/contact", { method:"PUT", headers:{"Content-Type":"application/json","X-CSRF-TOKEN":getCsrfToken()}, body:JSON.stringify(contacts.map((c,i)=>({...c,sort_order:i}))) });
      const updated = await res.json();
      if (Array.isArray(updated)) { setContacts(updated); setDirty(false); showToast("Kontak berhasil disimpan!"); }
      else showToast("Gagal menyimpan!", false);
    } catch { showToast("Terjadi kesalahan!", false); }
    finally { setSaving(false); }
  };

  const visibleCount = contacts.filter(c=>c.is_visible).length;

  if (loading) return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {[0,1,2].map(i=>(
        <div key={i} style={{border:"4px solid #0B1957",padding:"18px 22px",background:"#F8F3EA",boxShadow:"5px 5px 0 #0B1957",display:"flex",gap:16,alignItems:"center",animation:`hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s both`}}>
          <div className="hm-skeleton" style={{width:40,height:40,flexShrink:0}}/>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
            <div className="hm-skeleton" style={{height:12,width:"30%"}}/>
            <div className="hm-skeleton" style={{height:10,width:"50%"}}/>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="hm-contact-topbar" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",gap:10,animation:"hmSlideRight 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s both"}}>
          <span style={{border:"4px solid #0B1957",background:"#9ECCFA",color:"#0B1957",fontWeight:900,fontSize:12,padding:"6px 14px",textTransform:"uppercase",letterSpacing:"0.1em",boxShadow:"3px 3px 0 #0B1957"}}>{visibleCount} Tampil</span>
          <span style={{border:"4px solid #0B1957",background:"#F8F3EA",color:"#0B1957",fontWeight:900,fontSize:12,padding:"6px 14px",textTransform:"uppercase",letterSpacing:"0.1em",boxShadow:"3px 3px 0 #0B1957"}}>{contacts.length-visibleCount} Hidden</span>
        </div>
        <button onClick={()=>setModal({open:true,item:null})}
          style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,border:"4px solid #0B1957",background:"#0B1957",color:"#9ECCFA",padding:"8px 18px",fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer",boxShadow:"4px 4px 0 #9ECCFA",fontFamily:"inherit",animation:"hmSlideLeft 0.4s cubic-bezier(0.16,1,0.3,1) 0.1s both"}}>
          <IconPlus/> Tambah Kontak
        </button>
      </div>

      {/* Preview bar */}
      <div style={{marginBottom:14,background:"#0B1957",border:"4px solid #0B1957",boxShadow:"6px 6px 0 #9ECCFA",padding:"14px 20px",animation:"hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.15s both"}}>
        <p style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.2em",marginBottom:10}}>Preview di Homepage</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {contacts.filter(c=>c.is_visible).length===0
            ? <p style={{fontWeight:700,fontSize:12,textTransform:"uppercase",color:"#D1E8FF",opacity:0.4,letterSpacing:"0.1em"}}>Belum ada kontak yang ditampilkan</p>
            : contacts.filter(c=>c.is_visible).map((c,i)=>(
              <div key={c.id} style={{display:"flex",alignItems:"center",gap:8,border:"2px solid #9ECCFA",padding:"6px 12px 6px 6px",background:"rgba(158,204,250,0.1)",animation:`hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) ${i*0.05}s both`}}>
                <div style={{width:28,height:28,background:c.icon_color,border:"2px solid #9ECCFA",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {PLATFORM_ICONS[c.platform]}
                </div>
                <div>
                  <p style={{fontWeight:900,fontSize:9,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.15em"}}>{c.label}</p>
                  <p className="hm-contact-value-text" style={{fontWeight:700,fontSize:10,color:"#F8F3EA",opacity:0.8}}>{c.value}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Contact list */}
      <div style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"8px 8px 0 #0B1957",overflow:"hidden",animation:"hmSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s both"}}>
        {contacts.length===0 ? (
          <div style={{padding:"48px 24px",display:"flex",flexDirection:"column",alignItems:"center",gap:12,animation:"hmFadeIn 0.4s ease"}}>
            <div style={{opacity:0.15}}><IconPhone/></div>
            <p style={{fontWeight:900,fontSize:12,textTransform:"uppercase",color:"#0B1957",opacity:0.4,letterSpacing:"0.15em"}}>Belum ada kontak</p>
          </div>
        ) : (
          <div>
            <div className="hm-contact-list-header" style={{borderBottom:"4px solid #0B1957",background:"#0B1957",padding:"10px 20px",display:"grid",gridTemplateColumns:"auto 1fr auto auto",alignItems:"center",gap:16}}>
              <span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.1em",opacity:0.6,width:32,textAlign:"center"}}>№</span>
              <span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.1em",opacity:0.6}}>Kontak</span>
              <span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.1em",opacity:0.6}}>Tampil</span>
              <span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.1em",opacity:0.6}}>Aksi</span>
            </div>
            {contacts.map((c,index)=>(
              <div key={c.id} className="hm-contact-list-row"
                style={{display:"grid",gridTemplateColumns:"auto 1fr auto auto",alignItems:"center",gap:16,padding:"14px 20px",borderBottom:"4px solid #0B1957",background:c.is_visible?"#F8F3EA":"#ede8df",opacity:c.is_visible?1:0.55,transition:"background 0.15s ease, opacity 0.2s ease",animation:mounted?`hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${index*0.06}s both`:"none"}}>
                <div style={{display:"flex",flexDirection:"column",gap:3,width:32,alignItems:"center"}}>
                  <button onClick={()=>handleMoveUp(index)} disabled={index===0} style={{width:24,height:20,border:"2px solid #0B1957",background:"transparent",cursor:index===0?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:index===0?0.25:1,fontFamily:"inherit",fontSize:10,color:"#0B1957"}}>▲</button>
                  <span style={{fontWeight:900,fontSize:11,color:"#0B1957",opacity:0.4}}>{index+1}</span>
                  <button onClick={()=>handleMoveDown(index)} disabled={index===contacts.length-1} style={{width:24,height:20,border:"2px solid #0B1957",background:"transparent",cursor:index===contacts.length-1?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:index===contacts.length-1?0.25:1,fontFamily:"inherit",fontSize:10,color:"#0B1957"}}>▼</button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0}}>
                  <div style={{width:40,height:40,background:c.icon_color,border:"3px solid #0B1957",boxShadow:"2px 2px 0 #0B1957",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {PLATFORM_ICONS[c.platform]}
                  </div>
                  <div style={{minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                      <p style={{fontWeight:900,fontSize:12,textTransform:"uppercase",color:"#0B1957",letterSpacing:"0.06em"}}>{c.label}</p>
                      <span className="hm-contact-platform-badge" style={{border:"2px solid #0B1957",background:"#D1E8FF",fontSize:9,fontWeight:900,padding:"2px 6px",textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957"}}>{c.platform}</span>
                    </div>
                    <p className="hm-contact-value-text" style={{fontWeight:600,fontSize:12,color:"#0B1957",opacity:0.6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.value}</p>
                    <a className="hm-contact-url" href={c.url} target="_blank" rel="noopener noreferrer" style={{fontWeight:600,fontSize:10,color:"#0B1957",opacity:0.4,display:"flex",alignItems:"center",gap:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textDecoration:"none"}}>
                      <IconLink/>{c.url.length>40?c.url.slice(0,40)+"...":c.url}
                    </a>
                  </div>
                </div>
                <button onClick={()=>handleToggleVisibility(c.id)}
                  style={{width:36,height:36,border:"3px solid #0B1957",background:c.is_visible?"#0B1957":"#F8F3EA",color:c.is_visible?"#9ECCFA":"#0B1957",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"inherit",flexShrink:0,transition:"all 0.12s ease"}}>
                  {c.is_visible?<IconEye/>:<IconEyeOff/>}
                </button>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <button onClick={()=>setModal({open:true,item:c})}
                    style={{width:32,height:32,border:"3px solid #0B1957",background:"#F8F3EA",color:"#0B1957",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"inherit",transition:"all 0.12s ease"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#0B1957";(e.currentTarget as HTMLElement).style.color="#9ECCFA";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#F8F3EA";(e.currentTarget as HTMLElement).style.color="#0B1957";}}><IconEdit/></button>
                  <button onClick={()=>handleDelete(c.id)}
                    style={{width:32,height:32,border:"3px solid #0B1957",background:"#F8F3EA",color:"#0B1957",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"inherit",transition:"all 0.12s ease"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#ef4444";(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="#ef4444";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#F8F3EA";(e.currentTarget as HTMLElement).style.color="#0B1957";(e.currentTarget as HTMLElement).style.borderColor="#0B1957";}}><IconTrash/></button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="hm-footer-bar" style={{borderTop:"4px solid #0B1957",background:"#0B1957",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
          <span style={{fontWeight:700,fontSize:10,color:"#D1E8FF",opacity:0.6,textTransform:"uppercase",letterSpacing:"0.1em"}}>{dirty?"⚠ Ada perubahan yang belum disimpan":"✓ Semua perubahan tersimpan"}</span>
          <button onClick={handleSaveAll} disabled={saving||!dirty}
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,border:"4px solid #9ECCFA",background:dirty?"#9ECCFA":"transparent",color:dirty?"#0B1957":"#9ECCFA",padding:"10px 24px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",cursor:(saving||!dirty)?"not-allowed":"pointer",boxShadow:dirty?"4px 4px 0 rgba(158,204,250,0.4)":"none",opacity:!dirty?0.5:1,fontFamily:"inherit",whiteSpace:"nowrap"}}>
            {saving?<IconSpin/>:<IconSave/>}{saving?"Menyimpan...":"Simpan Semua"}
          </button>
        </div>
      </div>
      {modal.open&&<ContactFormModal item={modal.item} onSave={handleModalSave} onClose={()=>setModal({open:false,item:null})}/>}
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ── ProjectsSection ───────────────────────────────────────────────────────────
interface ProjectItem {
  id: number; slug: string; title: string; subtitle: string; desc: string;
  status: "Hosted" | "In Progress" | "Planning";
  date: string; duration: string; images: string[];
  stacks: { id: number; label: string; icon: string }[];
  visible: boolean; order: number;
}

const STATUS_CFG: Record<string, { bg: string; fg: string }> = {
  "Hosted":      { bg: "#9ECCFA", fg: "#0B1957" },
  "In Progress": { bg: "#FFE8A0", fg: "#0B1957" },
  "Planning":    { bg: "#F8F3EA", fg: "#0B1957" },
};

function ProjectCard({ p, index, onToggle, toggling }: {
  p: ProjectItem; index: number; onToggle: () => void; toggling: boolean;
}) {
  const [entered, setEntered] = useState(false);
  const sc = STATUS_CFG[p.status] ?? STATUS_CFG["Planning"];

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), index * 65 + 80);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div className={`hm-proj-card${!p.visible?" hm-proj-hidden":""}`}
      style={{padding:"18px 22px",opacity:entered?(p.visible?1:0.52):0,transform:entered?"translateY(0) scale(1)":"translateY(24px) scale(0.97)",transition:`opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s cubic-bezier(0.16,1,0.3,1)`}}>
      <div className="hm-proj-card-inner" style={{display:"flex",alignItems:"flex-start",gap:18,flexWrap:"wrap"}}>

        {/* Thumbnail */}
        {p.images?.[0] ? (
          <div className="hm-proj-thumb hm-proj-thumb-wrap" style={{width:96,height:72,border:"3px solid #0B1957",boxShadow:"3px 3px 0 #0B1957",flexShrink:0}}>
            <img src={p.images[0]} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block",transition:"transform 0.45s cubic-bezier(0.16,1,0.3,1)"}}/>
          </div>
        ) : (
          <div className="hm-proj-thumb-wrap" style={{width:96,height:72,flexShrink:0,border:"3px solid #0B1957",background:"#D1E8FF",boxShadow:"3px 3px 0 #0B1957",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:24,opacity:0.2}}>🗂</span>
          </div>
        )}

        {/* Info */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
            <span style={{fontWeight:900,fontSize:14,textTransform:"uppercase",color:"#0B1957",letterSpacing:"0.05em"}}>{p.title}</span>
            <span style={{border:"2px solid #0B1957",background:sc.bg,color:sc.fg,padding:"2px 9px",fontSize:10,fontWeight:900,textTransform:"uppercase",letterSpacing:"0.08em"}}>{p.status}</span>
            {!p.visible&&<span style={{border:"2px solid #0B1957",background:"#F8F3EA",color:"#0B1957",padding:"2px 9px",fontSize:10,fontWeight:900,textTransform:"uppercase",letterSpacing:"0.08em",opacity:0.45}}>Hidden</span>}
          </div>
          {p.subtitle&&<p style={{fontWeight:700,fontSize:11,color:"#0B1957",opacity:0.5,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>{p.subtitle}</p>}
          <p style={{fontWeight:600,fontSize:12,color:"#0B1957",opacity:0.65,lineHeight:1.5,marginBottom:8,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.desc}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {p.stacks?.slice(0,6).map((s,si)=>(
              <div key={s.id} className="hm-stack-chip" style={{animationDelay:`${(index*0.065)+(si*0.04)}s`}}>
                <img src={s.icon} alt={s.label} style={{width:14,height:14,objectFit:"cover"}} onError={e=>{(e.target as HTMLImageElement).src=FALLBACK_ICON;}}/>
                {s.label}
              </div>
            ))}
            {p.stacks?.length>6&&<div style={{border:"2px solid #0B1957",padding:"3px 8px",background:"#0B1957",color:"#9ECCFA",fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.06em"}}>+{p.stacks.length-6}</div>}
          </div>
        </div>

        {/* Meta — hidden on mobile */}
        <div className="hm-proj-meta" style={{textAlign:"right",flexShrink:0}}>
          <p style={{fontWeight:800,fontSize:11,color:"#0B1957",opacity:0.45,textTransform:"uppercase",letterSpacing:"0.1em",margin:"0 0 2px"}}>{p.date}</p>
          <p style={{fontWeight:800,fontSize:11,color:"#0B1957",opacity:0.45,textTransform:"uppercase",letterSpacing:"0.1em",margin:0}}>{p.duration}</p>
        </div>

        {/* Actions */}
        <div className="hm-proj-actions" style={{display:"flex",gap:8,flexShrink:0,alignItems:"center"}}>
          <button onClick={onToggle} disabled={toggling} title={p.visible?"Sembunyikan":"Tampilkan"}
            style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:5,border:"3px solid #0B1957",background:p.visible?"#F8F3EA":"#0B1957",color:p.visible?"#0B1957":"#9ECCFA",padding:"5px 10px",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.05em",cursor:toggling?"wait":"pointer",boxShadow:"2px 2px 0 #0B1957",fontFamily:"inherit",opacity:toggling?0.6:1,transition:"transform 0.1s ease, box-shadow 0.1s ease"}}>
            {toggling?<span style={{animation:"hmSpin 0.5s linear infinite",display:"inline-block"}}>⟳</span>:p.visible?<><IconEye/><span>Tampil</span></>:<><IconEyeOff/><span>Hidden</span></>}
          </button>
          <a href={`/projects/${p.slug}`} target="_blank" rel="noopener noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:5,border:"3px solid #0B1957",background:"#F8F3EA",color:"#0B1957",padding:"5px 10px",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.05em",boxShadow:"2px 2px 0 #0B1957",textDecoration:"none"}}>
            <IconExternal/><span>Lihat</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [projects,  setProjects]  = useState<ProjectItem[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [toggling,  setToggling]  = useState<number | null>(null);
  const [filterTab, setFilterTab] = useState<"all"|"visible"|"hidden">("all");
  const [headerIn,  setHeaderIn]  = useState(false);
  const [toast,     setToast]     = useState<{ msg: string; ok: boolean } | null>(null);
  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 2800); };

  useEffect(() => { const t = setTimeout(() => setHeaderIn(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => {
    fetch("/api/admin/projects", { headers: { "X-CSRF-TOKEN": getCsrfToken() } })
      .then(r => r.json()).then(d => { setProjects(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleToggle = async (p: ProjectItem) => {
    setToggling(p.id);
    try {
      const res = await fetch(`/api/admin/projects/${p.id}/toggle`, { method: "PATCH", headers: { "X-CSRF-TOKEN": getCsrfToken() } });
      const updated = await res.json();
      if (updated?.id) { setProjects(prev => prev.map(x => x.id === p.id ? { ...x, visible: updated.visible } : x)); showToast(`"${p.title}" ${updated.visible ? "✓ ditampilkan" : "✗ disembunyikan"}`); }
    } catch { showToast("Gagal update!", false); }
    finally { setToggling(null); }
  };

  const visibleCount = projects.filter(p => p.visible).length;
  const hiddenCount  = projects.filter(p => !p.visible).length;
  const filtered     = projects.filter(p => filterTab === "visible" ? p.visible : filterTab === "hidden" ? !p.visible : true);

  if (loading) return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {[80,72,72].map((w,i) => <div key={i} className="hm-skeleton" style={{width:w,height:36,animation:`hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s both`}}/>)}
        </div>
        <div className="hm-skeleton" style={{width:140,height:36,animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.2s both"}}/>
      </div>
      <div className="hm-skeleton" style={{height:48,marginBottom:14}}/>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {[0,1,2].map(i => (
          <div key={i} style={{border:"4px solid #0B1957",background:"#F8F3EA",boxShadow:"5px 5px 0 #0B1957",padding:"18px 22px",animation:`hmSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.3+i*0.09}s both`}}>
            <div style={{display:"flex",gap:18,alignItems:"flex-start",flexWrap:"wrap"}}>
              <div className="hm-skeleton" style={{width:96,height:72,flexShrink:0}}/>
              <div style={{flex:1,minWidth:160,display:"flex",flexDirection:"column",gap:8}}>
                <div className="hm-skeleton" style={{height:14,width:"40%"}}/>
                <div className="hm-skeleton" style={{height:11,width:"65%"}}/>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[1,2,3].map(j=><div key={j} className="hm-skeleton" style={{height:24,width:80}}/>)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="hm-proj-header" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,gap:12,flexWrap:"wrap",opacity:headerIn?1:0,transform:headerIn?"translateY(0)":"translateY(-14px)",transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)"}}>
        <div className="hm-stats-row" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {[{n:projects.length,label:"Total",bg:"#0B1957",fg:"#9ECCFA",delay:"0s"},{n:visibleCount,label:"Tampil",bg:"#9ECCFA",fg:"#0B1957",delay:"0.06s"},{n:hiddenCount,label:"Hidden",bg:"#F8F3EA",fg:"#0B1957",delay:"0.12s"}].map(c=>(
            <div key={c.label} style={{border:"4px solid #0B1957",background:c.bg,color:c.fg,display:"flex",alignItems:"center",gap:6,padding:"6px 14px",boxShadow:"3px 3px 0 #0B1957"}}>
              <span style={{fontWeight:900,fontSize:20,lineHeight:1}}>{c.n}</span>
              <span style={{fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",opacity:0.75}}>{c.label}</span>
            </div>
          ))}
        </div>
        <a href="/dashboard/projects"
          style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,border:"4px solid #0B1957",background:"#F8F3EA",color:"#0B1957",padding:"8px 18px",fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.07em",textDecoration:"none",boxShadow:"4px 4px 0 #0B1957",whiteSpace:"nowrap"}}>
          <IconFolder/> Kelola di Project Manager
        </a>
      </div>

      {/* Filter tabs */}
      <div style={{display:"flex",border:"4px solid #0B1957",marginBottom:16,overflow:"hidden",boxShadow:"4px 4px 0 #0B1957",animation:"hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.18s both"}}>
        {([["all","Semua",projects.length],["visible","Tampil",visibleCount],["hidden","Hidden",hiddenCount]] as const).map(([key,label,count])=>(
          <button key={key} onClick={()=>setFilterTab(key)} className={`hm-filter-tab${filterTab===key?" active":""}`}>
            {label}
            <span style={{background:filterTab===key?"rgba(158,204,250,0.2)":"#D1E8FF",color:filterTab===key?"#9ECCFA":"#0B1957",border:`2px solid ${filterTab===key?"#9ECCFA":"#0B1957"}`,fontSize:10,fontWeight:900,padding:"1px 7px",minWidth:22,textAlign:"center"}}>{count}</span>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length===0&&(
        <div style={{border:"4px dashed #0B1957",background:"#F8F3EA",padding:"60px 24px",textAlign:"center",animation:"hmFadeIn 0.4s ease"}}>
          <div style={{fontSize:40,marginBottom:12,opacity:0.12}}>📁</div>
          <p style={{fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",color:"#0B1957",opacity:0.4}}>
            {filterTab==="visible"?"Tidak ada project yang ditampilkan":filterTab==="hidden"?"Tidak ada project yang disembunyikan":"Belum ada project"}
          </p>
        </div>
      )}

      {/* Cards */}
      {filtered.length>0&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {filtered.map((p,idx)=><ProjectCard key={p.id} p={p} index={idx} onToggle={()=>handleToggle(p)} toggling={toggling===p.id}/>)}
        </div>
      )}

      {/* Footer legend */}
      {filtered.length>0&&(
        <div style={{marginTop:14,background:"#0B1957",border:"4px solid #0B1957",boxShadow:"4px 4px 0 #9ECCFA",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,animation:"hmFadeIn 0.5s ease 0.4s both"}}>
          <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,border:"2px solid #9ECCFA",background:"#9ECCFA"}}/><span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.12em"}}>Tampil di homepage</span></div>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,border:"2px solid #9ECCFA",background:"transparent",opacity:0.5}}/><span style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.12em",opacity:0.5}}>Disembunyikan</span></div>
          </div>
          <span style={{fontWeight:700,fontSize:10,color:"#D1E8FF",opacity:0.4,textTransform:"uppercase",letterSpacing:"0.1em"}}>{visibleCount}/{projects.length} aktif</span>
        </div>
      )}

      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ── AboutSection ──────────────────────────────────────────────────────────────
interface AboutData {
  tagline: string; extra_bio: string;
  info_cards: { label: string; value: string }[];
  highlights: string[];
}

const DEFAULT_ABOUT: AboutData = {
  tagline:    "Who am I",
  extra_bio:  "",
  info_cards: [
    { label: "Role",   value: "IT Programmer" },
    { label: "Focus",  value: "Fullstack Web" },
    { label: "Stack",  value: "React + Laravel" },
    { label: "Status", value: "Open to Work" },
  ],
  highlights: [],
};

function AboutSection() {
  const [form,    setForm]    = useState<AboutData>(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [dirty,   setDirty]   = useState(false);
  const [mounted, setMounted] = useState(false);
  const [toast,   setToast]   = useState<{ msg: string; ok: boolean } | null>(null);
  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 2500); };

  useEffect(() => {
    fetch("/api/about").then(r => r.json())
      .then(d => {
        setForm({
          tagline:    d.tagline    ?? DEFAULT_ABOUT.tagline,
          extra_bio:  d.extra_bio  ?? "",
          info_cards: Array.isArray(d.info_cards) && d.info_cards.length > 0 ? d.info_cards : DEFAULT_ABOUT.info_cards,
          highlights: Array.isArray(d.highlights) ? d.highlights : [],
        });
        setLoading(false); setTimeout(() => setMounted(true), 80);
      })
      .catch(() => { setLoading(false); setTimeout(() => setMounted(true), 80); });
  }, []);

  const setCard = (i: number, k: "label" | "value", v: string) => {
    const cards = [...form.info_cards]; cards[i] = { ...cards[i], [k]: v };
    setForm(f => ({ ...f, info_cards: cards })); setDirty(true);
  };
  const addCard = () => { if (form.info_cards.length >= 8) return; setForm(f => ({ ...f, info_cards: [...f.info_cards, { label: "", value: "" }] })); setDirty(true); };
  const removeCard = (i: number) => { setForm(f => ({ ...f, info_cards: f.info_cards.filter((_, j) => j !== i) })); setDirty(true); };
  const addHighlight = () => { if (form.highlights.length >= 10) return; setForm(f => ({ ...f, highlights: [...f.highlights, ""] })); setDirty(true); };
  const setHighlight = (i: number, v: string) => { const hl = [...form.highlights]; hl[i] = v; setForm(f => ({ ...f, highlights: hl })); setDirty(true); };
  const removeHighlight = (i: number) => { setForm(f => ({ ...f, highlights: f.highlights.filter((_, j) => j !== i) })); setDirty(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/about", { method:"PUT", headers:{"Content-Type":"application/json","X-CSRF-TOKEN":getCsrfToken()}, body:JSON.stringify(form) });
      const updated = await res.json();
      if (updated?.id || updated?.tagline) { setDirty(false); showToast("About section berhasil disimpan!"); }
      else showToast("Gagal menyimpan!", false);
    } catch { showToast("Terjadi kesalahan!", false); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:"#0B1957",border:"4px solid #0B1957",boxShadow:"6px 6px 0 #9ECCFA",padding:20,animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) both"}}>
        <div className="hm-skeleton" style={{height:12,width:"20%",marginBottom:14}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[1,2,3,4].map(i=><div key={i} className="hm-skeleton" style={{height:48}}/>)}
        </div>
      </div>
      <div style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"8px 8px 0 #0B1957",padding:28,display:"flex",flexDirection:"column",gap:16}}>
        {[1,2,3].map(i=><div key={i} className="hm-skeleton" style={{height:48,width:`${100-i*5}%`}}/>)}
      </div>
    </div>
  );

  return (
    <div>
      {/* Live Preview */}
      <div style={{marginBottom:16,background:"#0B1957",border:"4px solid #0B1957",boxShadow:"6px 6px 0 #9ECCFA",padding:20,animation:"hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.05s both"}}>
        <p style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.2em",marginBottom:12}}>Preview About</p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div>
            <p style={{fontWeight:900,fontSize:10,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.3em",marginBottom:2,opacity:0.7}}>{form.tagline||"Who am I"}</p>
            <p style={{fontWeight:900,fontSize:18,color:"#F8F3EA",textTransform:"uppercase"}}>Nama dari Hero Section</p>
          </div>
          <div className="hm-about-preview-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {form.info_cards.slice(0,4).map((card,i)=>(
              <div key={i} style={{border:"2px solid #9ECCFA",padding:"8px 10px",animation:mounted?`hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) ${i*0.06}s both`:"none"}}>
                <p style={{fontWeight:900,fontSize:9,color:"#9ECCFA",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:2}}>{card.label||"Label"}</p>
                <p style={{fontWeight:700,fontSize:12,color:"#F8F3EA"}}>{card.value||"—"}</p>
              </div>
            ))}
          </div>
          {form.highlights.filter(Boolean).length>0&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4}}>
              {form.highlights.filter(Boolean).map((h,i)=>(
                <span key={i} style={{border:"2px solid #9ECCFA",background:"rgba(158,204,250,0.12)",color:"#9ECCFA",padding:"3px 10px",fontWeight:800,fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>{h}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div style={{background:"#F8F3EA",border:"4px solid #0B1957",boxShadow:"8px 8px 0 #0B1957",overflow:"hidden",animation:"hmSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.12s both"}}>
        <div style={{padding:"24px 28px",display:"flex",flexDirection:"column",gap:22}}>
          {/* Tagline */}
          <div style={{animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.18s both"}}>
            <label style={{display:"block",fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",marginBottom:6}}>
              Tagline <span style={{fontWeight:600,fontSize:10,opacity:0.4,textTransform:"none",letterSpacing:0}}>— tampil di atas nama</span>
            </label>
            <input value={form.tagline} onChange={e=>{setForm(f=>({...f,tagline:e.target.value}));setDirty(true);}} placeholder="Who am I" maxLength={80}
              style={{width:"100%",border:"4px solid #0B1957",background:"white",padding:"10px 14px",fontWeight:700,fontSize:13,color:"#0B1957",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="4px 4px 0 #9ECCFA";}} onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";}}/>
          </div>

          {/* Extra Bio */}
          <div style={{animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.24s both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
              <label style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957"}}>Bio Tambahan <span style={{fontWeight:600,fontSize:10,opacity:0.4,textTransform:"none",letterSpacing:0}}>— opsional</span></label>
              <span style={{fontWeight:700,fontSize:11,color:"#0B1957",opacity:0.4}}>{form.extra_bio.length}/500</span>
            </div>
            <textarea value={form.extra_bio} onChange={e=>{setForm(f=>({...f,extra_bio:e.target.value}));setDirty(true);}} rows={3} maxLength={500} placeholder="Deskripsi tambahan..."
              style={{width:"100%",border:"4px solid #0B1957",background:"white",padding:"10px 14px",fontWeight:600,fontSize:13,color:"#0B1957",outline:"none",boxSizing:"border-box",resize:"vertical",fontFamily:"inherit"}}
              onFocus={e=>{(e.target as HTMLTextAreaElement).style.boxShadow="4px 4px 0 #9ECCFA";}} onBlur={e=>{(e.target as HTMLTextAreaElement).style.boxShadow="none";}}/>
          </div>

          {/* Info Cards */}
          <div style={{animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.30s both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <label style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957"}}>
                Info Cards <span style={{fontWeight:600,fontSize:10,opacity:0.4,textTransform:"none",letterSpacing:0}}>— maks 8</span>
              </label>
              <button onClick={addCard} disabled={form.info_cards.length>=8}
                style={{display:"flex",alignItems:"center",gap:6,border:"3px solid #0B1957",background:form.info_cards.length>=8?"#D1E8FF":"#0B1957",color:form.info_cards.length>=8?"#0B1957":"#9ECCFA",padding:"5px 12px",fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:form.info_cards.length>=8?"not-allowed":"pointer",boxShadow:"2px 2px 0 #9ECCFA",fontFamily:"inherit",opacity:form.info_cards.length>=8?0.5:1}}>
                <IconPlus/> Tambah
              </button>
            </div>
            <div className="hm-about-cards-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {form.info_cards.map((card,i)=>(
                <div key={i} style={{border:"3px solid #0B1957",background:"#F8F3EA",boxShadow:"3px 3px 0 #0B1957",padding:"12px 14px",display:"flex",flexDirection:"column",gap:8,position:"relative",animation:mounted?`hmSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) ${i*0.05}s both`:"none"}}>
                  <div style={{position:"absolute",top:-2,left:-2,background:"#0B1957",color:"#9ECCFA",fontWeight:900,fontSize:9,padding:"2px 6px",letterSpacing:"0.08em"}}>#{i+1}</div>
                  <div style={{paddingTop:8}}>
                    <label style={{display:"block",fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",opacity:0.5,marginBottom:4}}>Label</label>
                    <input value={card.label} onChange={e=>setCard(i,"label",e.target.value)} placeholder="Contoh: Role" maxLength={40}
                      style={{width:"100%",border:"3px solid #0B1957",background:"white",padding:"7px 10px",fontWeight:800,fontSize:12,color:"#0B1957",outline:"none",boxSizing:"border-box"}}
                      onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="3px 3px 0 #9ECCFA";}} onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";}}/>
                  </div>
                  <div>
                    <label style={{display:"block",fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:"#0B1957",opacity:0.5,marginBottom:4}}>Value</label>
                    <input value={card.value} onChange={e=>setCard(i,"value",e.target.value)} placeholder="Contoh: IT Programmer" maxLength={80}
                      style={{width:"100%",border:"3px solid #0B1957",background:"white",padding:"7px 10px",fontWeight:700,fontSize:12,color:"#0B1957",outline:"none",boxSizing:"border-box"}}
                      onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="3px 3px 0 #9ECCFA";}} onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";}}/>
                  </div>
                  <button onClick={()=>removeCard(i)}
                    style={{alignSelf:"flex-end",display:"flex",alignItems:"center",gap:5,border:"2px solid #0B1957",background:"#F8F3EA",color:"#0B1957",padding:"4px 10px",fontWeight:900,fontSize:10,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"all 0.1s ease"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#ef4444";(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="#ef4444";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#F8F3EA";(e.currentTarget as HTMLElement).style.color="#0B1957";(e.currentTarget as HTMLElement).style.borderColor="#0B1957";}}>
                    <IconTrash/> Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div style={{animation:"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.36s both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <label style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957"}}>
                Highlight Tags <span style={{fontWeight:600,fontSize:10,opacity:0.4,textTransform:"none",letterSpacing:0}}>— maks 10</span>
              </label>
              <button onClick={addHighlight} disabled={form.highlights.length>=10}
                style={{display:"flex",alignItems:"center",gap:6,border:"3px solid #0B1957",background:form.highlights.length>=10?"#D1E8FF":"#0B1957",color:form.highlights.length>=10?"#0B1957":"#9ECCFA",padding:"5px 12px",fontWeight:900,fontSize:11,textTransform:"uppercase",cursor:form.highlights.length>=10?"not-allowed":"pointer",boxShadow:"2px 2px 0 #9ECCFA",fontFamily:"inherit",opacity:form.highlights.length>=10?0.5:1}}>
                <IconPlus/> Tambah
              </button>
            </div>
            {form.highlights.length===0 ? (
              <div style={{border:"3px dashed #0B1957",padding:"20px 16px",textAlign:"center",opacity:0.4}}>
                <p style={{fontWeight:700,fontSize:12,textTransform:"uppercase",color:"#0B1957",letterSpacing:"0.1em"}}>Belum ada tag</p>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {form.highlights.map((hl,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,border:"3px solid #0B1957",background:"#F8F3EA",boxShadow:"2px 2px 0 #0B1957",padding:"8px 12px",animation:mounted?`hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) ${i*0.05}s both`:"none"}}>
                    <span style={{fontWeight:900,fontSize:10,color:"#0B1957",opacity:0.35,flexShrink:0,minWidth:20}}>#{i+1}</span>
                    <input value={hl} onChange={e=>setHighlight(i,e.target.value)} placeholder="Contoh: Problem Solver..." maxLength={100}
                      style={{flex:1,border:"2px solid #0B1957",background:"white",padding:"6px 10px",fontWeight:700,fontSize:12,color:"#0B1957",outline:"none",minWidth:0}}
                      onFocus={e=>{(e.target as HTMLInputElement).style.boxShadow="2px 2px 0 #9ECCFA";}} onBlur={e=>{(e.target as HTMLInputElement).style.boxShadow="none";}}/>
                    <button onClick={()=>removeHighlight(i)}
                      style={{flexShrink:0,width:30,height:30,border:"2px solid #0B1957",background:"#F8F3EA",color:"#0B1957",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"inherit",transition:"all 0.1s ease"}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#ef4444";(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="#ef4444";}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#F8F3EA";(e.currentTarget as HTMLElement).style.color="#0B1957";(e.currentTarget as HTMLElement).style.borderColor="#0B1957";}}>
                      <IconTrash/>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Note */}
          <div style={{background:"#D1E8FF",border:"3px solid #0B1957",padding:"12px 16px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontWeight:900,fontSize:14,flexShrink:0,color:"#0B1957"}}>ℹ</span>
            <p style={{fontWeight:600,fontSize:12,color:"#0B1957",opacity:0.7,lineHeight:1.5}}>
              Nama, foto, dan bio utama diambil dari <strong>Hero Section</strong>.
            </p>
          </div>
        </div>

        <div className="hm-footer-bar" style={{borderTop:"4px solid #0B1957",background:"#0B1957",padding:"16px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
          <span style={{fontWeight:700,fontSize:10,color:"#D1E8FF",opacity:0.6,textTransform:"uppercase",letterSpacing:"0.1em"}}>{dirty?"⚠ Ada perubahan belum disimpan":"✓ Tersimpan"}</span>
          <button onClick={handleSave} disabled={saving||!dirty}
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,border:"4px solid #9ECCFA",background:dirty?"#9ECCFA":"transparent",color:dirty?"#0B1957":"#9ECCFA",padding:"10px 24px",fontWeight:900,fontSize:13,textTransform:"uppercase",letterSpacing:"0.07em",cursor:(saving||!dirty)?"not-allowed":"pointer",boxShadow:dirty?"4px 4px 0 rgba(158,204,250,0.4)":"none",opacity:!dirty?0.5:1,fontFamily:"inherit",whiteSpace:"nowrap"}}>
            {saving?<IconSpin/>:<IconSave/>}{saving?"Menyimpan...":"Simpan About"}
          </button>
        </div>
      </div>
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ── Section config ─────────────────────────────────────────────────────────────
const SECTIONS = [
  { key: "techstack", label: "Tech Stack",   icon: <IconLayers/>,  description: "Kelola tech stack yang tampil di homepage", status: "active" },
  { key: "hero",      label: "Hero Section", icon: <IconHero/>,    description: "Edit nama, bio, dan foto di hero section",  status: "active" },
  { key: "contact",   label: "Contact",      icon: <IconContact/>, description: "Kelola kontak yang tampil di homepage",     status: "active" },
  { key: "projects",  label: "Projects",     icon: <IconFolder/>,  description: "Toggle visibility project di homepage",     status: "active" },
  { key: "about",     label: "About",        icon: <IconUser/>,    description: "Edit konten section About",                 status: "active" },
];

// ── HomepageManager ───────────────────────────────────────────────────────────
export default function HomepageManager() {
  const [activeSection, setActiveSection] = useState("techstack");
  const [headerIn,      setHeaderIn]      = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useIsMobile();
  const current = SECTIONS.find(s => s.key === activeSection)!;

  useEffect(() => {
    const t = setTimeout(() => setHeaderIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleSectionChange = (key: string) => {
    setActiveSection(key);
    setMobileNavOpen(false);
    // Scroll to top of content on mobile
    if (isMobile) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      {/* ── Page Header ── */}
      <div className="hm-page-header" style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20,gap:16,flexWrap:"wrap",opacity:headerIn?1:0,transform:headerIn?"translateY(0)":"translateY(-18px)",transition:"opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)"}}>
        <div>
          <p style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.3em",color:"#9ECCFA",margin:"0 0 4px"}}>Kelola</p>
          <h2 className="hm-page-title" style={{fontWeight:900,fontSize:26,textTransform:"uppercase",color:"#0B1957",margin:"0 0 6px"}}>Homepage</h2>
          <p style={{fontWeight:600,fontSize:12,color:"#0B1957",opacity:0.55,margin:0}}>Manage konten yang tampil di halaman utama portfolio</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="hm-preview-btn"
          style={{display:"flex",alignItems:"center",gap:8,border:"4px solid #0B1957",background:"#F8F3EA",color:"#0B1957",padding:"10px 18px",fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.07em",textDecoration:"none",boxShadow:"4px 4px 0 #0B1957",transition:"transform 0.1s ease, box-shadow 0.1s ease"}}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translate(-2px,-2px)";(e.currentTarget as HTMLElement).style.boxShadow="6px 6px 0 #0B1957";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translate(0,0)";(e.currentTarget as HTMLElement).style.boxShadow="4px 4px 0 #0B1957";}}>
          <IconExternal/> Preview Homepage
        </a>
      </div>

      {/* ── Mobile Navigation — horizontal scrollable tabs ── */}
      <div className="hm-mobile-nav" style={{border:"4px solid #0B1957",boxShadow:"4px 4px 0 #0B1957",marginBottom:20,overflow:"hidden",animation:headerIn?"hmSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s both":"none"}}>
        <div style={{display:"flex",overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
          {SECTIONS.map(section => {
            const isActive = activeSection === section.key;
            return (
              <button key={section.key}
                className={`hm-mobile-nav-tab${isActive ? " active" : ""}`}
                onClick={() => handleSectionChange(section.key)}>
                <span style={{color:"inherit"}}>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Layout: sidebar + content ── */}
      <div className="hm-layout" style={{display:"flex",gap:20,alignItems:"flex-start"}}>

        {/* ── Sidebar nav — desktop only ── */}
        <div className="hm-sidebar" style={{width:"100%",maxWidth:224,flexShrink:0}}>
          <p style={{fontWeight:900,fontSize:10,textTransform:"uppercase",letterSpacing:"0.2em",color:"#0B1957",marginBottom:10,paddingLeft:4,opacity:headerIn?0.45:0,transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s"}}>Sections</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {SECTIONS.map((section, i) => {
              const isActive = activeSection === section.key;
              const isSoon   = section.status === "soon";
              return (
                <button key={section.key} disabled={isSoon}
                  className={`hm-section-btn${isActive ? " active" : ""}`}
                  style={{opacity:headerIn?1:0,transform:headerIn?"translateX(0)":"translateX(-20px)",transition:`opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.22+i*0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.22+i*0.07}s, background 0.12s ease, box-shadow 0.12s ease`}}
                  onClick={() => !isSoon && setActiveSection(section.key)}>
                  <div style={{marginTop:2,flexShrink:0,color:isActive?"#9ECCFA":"#0B1957"}}>{section.icon}</div>
                  <div style={{minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                      <span style={{fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:"0.06em",lineHeight:1.2,color:isActive?"#9ECCFA":"#0B1957"}}>{section.label}</span>
                      {isSoon&&<span style={{display:"inline-flex",alignItems:"center",gap:4,border:`1px solid ${isActive?"#9ECCFA":"#0B1957"}`,padding:"2px 6px",fontWeight:900,fontSize:9,textTransform:"uppercase",letterSpacing:"0.08em",color:isActive?"#9ECCFA":"#0B1957",opacity:0.6}}><IconLock/>Soon</span>}
                    </div>
                    <p style={{fontWeight:600,fontSize:10,lineHeight:1.4,marginTop:2,color:isActive?"#D1E8FF":"#0B1957",opacity:isActive?0.75:0.45}}>{section.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Content area ── */}
        <div className="hm-content-area" style={{flex:1,minWidth:0}}>
          {/* Breadcrumb — desktop only */}
          <div className="hm-breadcrumb" style={{display:"flex",alignItems:"center",gap:6,marginBottom:18,opacity:headerIn?1:0,transform:headerIn?"translateY(0)":"translateY(-8px)",transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.35s"}}>
            <span style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957",opacity:0.35}}>Homepage</span>
            <span style={{fontWeight:900,fontSize:11,color:"#0B1957",opacity:0.25}}>/</span>
            <span style={{fontWeight:900,fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",color:"#0B1957"}}>{current.label}</span>
            {current.status==="active"&&<span style={{marginLeft:4,border:"2px solid #0B1957",background:"#9ECCFA",padding:"2px 8px",fontWeight:900,fontSize:9,textTransform:"uppercase",letterSpacing:"0.08em",color:"#0B1957"}}>Live</span>}
          </div>

          {/* Section content */}
          <div key={activeSection} style={{animation:"hmFadeIn 0.28s ease both"}}>
            {activeSection==="techstack"&&<TechStackVisibility/>}
            {activeSection==="hero"     &&<HeroSection/>}
            {activeSection==="contact"  &&<ContactSection/>}
            {activeSection==="projects" &&<ProjectsSection/>}
            {activeSection==="about"    &&<AboutSection/>}
          </div>
        </div>
      </div>
    </>
  );
}