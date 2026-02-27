import { useState, useEffect } from "react";
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

// ── Types ─────────────────────────────────────────────────────────────────────
interface Project { title: string; desc: string; status: string; stacks: string[]; date: string; }
interface Stat    { label: string; value: string; icon: JSX.Element; color: string; }

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  read_at: string | null;
  ip_address: string | null;
  created_at: string;
}

interface MessageStats {
  total: number;
  unread: number;
  today: number;
}

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

const HOMEPAGE_SECTIONS_OVERVIEW = [
  { label: "Tech Stack",   status: "active" },
  { label: "Hero Section", status: "soon"   },
  { label: "Projects",     status: "soon"   },
  { label: "About",        status: "soon"   },
];

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

// ── MessagesManager ───────────────────────────────────────────────────────────
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
  // Mobile: show detail panel as overlay
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2500);
  };

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
    } catch {
      showToast("Gagal memuat pesan", false);
    } finally {
      setLoading(false);
      setTimeout(() => setMounted(true), 80);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleMarkRead = async (msg: Message) => {
    if (msg.is_read) return;
    try {
      const res     = await fetch(`/api/messages/${msg.id}/read`, { method: "PATCH", headers: { "X-CSRF-TOKEN": getCsrfToken() } });
      const updated = await res.json();
      setMessages(p => p.map(m => m.id === msg.id ? updated : m));
      setStats(s => {
        const next = { ...s, unread: Math.max(0, s.unread - 1) };
        onUnreadChange?.(next.unread);
        return next;
      });
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
    setSelected(msg);
    setReplyOpen(false);
    setReplyBody("");
    setShowDetailMobile(true);
    handleMarkRead(msg);
  };

  const handleSendReply = async () => {
    if (!selected || !replyBody.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/messages/${selected.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": getCsrfToken() },
        body: JSON.stringify({ body: replyBody }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Balasan berhasil dikirim!");
        setReplyOpen(false);
        setReplyBody("");
        const updated = { ...selected, is_read: true, read_at: new Date().toISOString() };
        setSelected(updated);
        setMessages(p => p.map(m => m.id === selected.id ? updated : m));
        if (!selected.is_read) {
          setStats(s => {
            const next = { ...s, unread: Math.max(0, s.unread - 1) };
            onUnreadChange?.(next.unread);
            return next;
          });
        }
      } else {
        showToast(data.message || "Gagal mengirim", false);
      }
    } catch {
      showToast("Gagal mengirim balasan", false);
    } finally {
      setSending(false);
    }
  };

  const filtered = messages.filter(m =>
    filterTab === "unread" ? !m.is_read :
    filterTab === "read"   ?  m.is_read : true
  );

  const fmt = (d: string) => {
    try { return new Date(d).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return d; }
  };

  const DetailPanel = () => selected ? (
    <div style={{ border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "8px 8px 0 #0B1957", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "#0B1957", borderBottom: "4px solid #0B1957", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "#9ECCFA", border: "3px solid #9ECCFA", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#0B1957", textTransform: "uppercase", flexShrink: 0 }}>
            {selected.name[0]}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontWeight: 900, fontSize: 13, textTransform: "uppercase", color: "#F8F3EA", letterSpacing: "0.06em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected.name}</p>
            <p style={{ fontWeight: 700, fontSize: 11, color: "#9ECCFA", opacity: 0.8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected.email}</p>
          </div>
        </div>
        <button onClick={() => { setSelected(null); setShowDetailMobile(false); }}
          style={{ border: "2px solid #9ECCFA", background: "transparent", color: "#9ECCFA", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
          <IconClose />
        </button>
      </div>

      {/* Meta */}
      <div style={{ borderBottom: "4px solid #0B1957", padding: "12px 18px", background: "#EAF4FF", display: "flex", flexWrap: "wrap", gap: 6 }}>
        {selected.subject && (
          <div style={{ border: "2px solid #0B1957", background: "#0B1957", color: "#9ECCFA", padding: "3px 10px", fontWeight: 900, fontSize: 10, textTransform: "uppercase" }}>
            {selected.subject}
          </div>
        )}
        <div style={{ border: "2px solid #0B1957", background: "#F8F3EA", color: "#0B1957", padding: "3px 10px", fontWeight: 700, fontSize: 10, display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {fmt(selected.created_at)}
        </div>
        <div style={{ border: "2px solid #0B1957", background: selected.is_read ? "#9ECCFA" : "#FFE8A0", color: "#0B1957", padding: "3px 10px", fontWeight: 900, fontSize: 10, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}>
          {selected.is_read ? <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Terbaca</> : <><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0B1957", display: "inline-block" }} /> Belum</>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 18px 22px" }}>
        <p style={{ fontWeight: 900, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0B1957", opacity: 0.4, marginBottom: 8 }}>Pesan</p>
        <div style={{ border: "3px solid #0B1957", background: "white", padding: "14px 16px", fontWeight: 600, fontSize: 13, color: "#0B1957", lineHeight: 1.75, whiteSpace: "pre-wrap", boxShadow: "3px 3px 0 #D1E8FF" }}>
          {selected.message}
        </div>
      </div>

      {/* Actions */}
      <div style={{ borderTop: "4px solid #0B1957" }}>
        {replyOpen && (
          <div style={{ borderBottom: "4px solid #0B1957", padding: "14px 18px", background: "#F0F7FF", animation: "slideUp 0.25s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{ fontWeight: 900, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0B1957", opacity: 0.5, marginBottom: 6 }}>
              Balas ke: <span style={{ opacity: 1 }}>{selected.email}</span>
            </p>
            <textarea
              value={replyBody}
              onChange={e => setReplyBody(e.target.value)}
              placeholder="Tulis balasan..."
              rows={4}
              style={{ width: "100%", border: "3px solid #0B1957", background: "white", padding: "10px 12px", fontWeight: 600, fontSize: 13, color: "#0B1957", lineHeight: 1.6, resize: "vertical", fontFamily: "inherit", boxShadow: "3px 3px 0 #D1E8FF", outline: "none", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={handleSendReply} disabled={sending || !replyBody.trim()}
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, border: "3px solid #0B1957", background: sending || !replyBody.trim() ? "#D1E8FF" : "#0B1957", color: sending || !replyBody.trim() ? "#0B1957" : "#9ECCFA", padding: "9px 14px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: sending || !replyBody.trim() ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: "3px 3px 0 #9ECCFA", transition: "all 0.08s ease", opacity: sending ? 0.7 : 1 }}>
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
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, border: "4px solid #0B1957", background: replyOpen ? "#F8F3EA" : "#0B1957", color: replyOpen ? "#0B1957" : "#9ECCFA", padding: "9px 14px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", boxShadow: replyOpen ? "4px 4px 0 #0B1957" : "4px 4px 0 #9ECCFA", transition: "transform 0.08s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}>
            <IconMail size={13} /> {replyOpen ? "Tutup" : "Balas"}
          </button>
          <button onClick={() => handleDelete(selected.id)} disabled={deleting === selected.id}
            style={{ border: "4px solid #0B1957", background: "#F8F3EA", color: "#0B1957", padding: "9px 12px", cursor: deleting === selected.id ? "wait" : "pointer", fontFamily: "inherit", boxShadow: "4px 4px 0 #0B1957", transition: "all 0.08s ease", display: "flex", alignItems: "center" }}
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
        <div key={i} style={{ border: "4px solid #0B1957", background: "#F8F3EA", boxShadow: "4px 4px 0 #0B1957", padding: "16px 18px", marginBottom: 10, animation: `slideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both` }}>
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
      {/* Mobile Detail Overlay */}
      {showDetailMobile && selected && (
        <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(11,25,87,0.5)", backdropFilter: "blur(2px)", animation: "fadeIn 0.2s ease both" }} onClick={() => { setSelected(null); setShowDetailMobile(false); }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, maxHeight: "90vh", overflowY: "auto", animation: "slideUpFull 0.35s cubic-bezier(0.16,1,0.3,1) both" }} onClick={e => e.stopPropagation()}>
            <DetailPanel />
          </div>
        </div>
      )}

      {/* Header */}
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
              style={{ display: "flex", alignItems: "center", gap: 5, border: "4px solid #0B1957", background: "#0B1957", color: "#9ECCFA", padding: "7px 13px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: markingAll ? "wait" : "pointer", boxShadow: "4px 4px 0 #9ECCFA", fontFamily: "inherit", opacity: markingAll ? 0.6 : 1 }}
              onMouseEnter={e => { if (!markingAll) (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}>
              <IconCheck size={13} /> Tandai Terbaca
            </button>
          )}
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { label: "Total",    value: stats.total,  bg: "#0B1957", fg: "#9ECCFA" },
          { label: "Unread",   value: stats.unread, bg: stats.unread > 0 ? "#FFE8A0" : "#F8F3EA", fg: "#0B1957" },
          { label: "Hari Ini", value: stats.today,  bg: "#9ECCFA", fg: "#0B1957" },
        ].map((s, i) => (
          <div key={i} style={{ border: "4px solid #0B1957", background: s.bg, color: s.fg, padding: "10px 16px", boxShadow: "4px 4px 0 #0B1957", minWidth: 80, flex: "1 1 80px", animation: `slideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.07}s both` }}>
            <p style={{ fontWeight: 900, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.7, marginBottom: 3 }}>{s.label}</p>
            <p style={{ fontWeight: 900, fontSize: 26, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", border: "4px solid #0B1957", marginBottom: 14, overflow: "hidden", boxShadow: "4px 4px 0 #0B1957" }}>
        {([
          ["all",    "Semua",   messages.length],
          ["unread", "Belum",   messages.filter(m => !m.is_read).length],
          ["read",   "Dibaca",  messages.filter(m =>  m.is_read).length],
        ] as const).map(([key, label, count]) => (
          <button key={key} onClick={() => setFilterTab(key)}
            style={{ flex: 1, padding: "10px 6px", fontWeight: 900, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", borderRight: key !== "read" ? "4px solid #0B1957" : "none", borderLeft: "none", borderTop: "none", borderBottom: "none", background: filterTab === key ? "#0B1957" : "#F8F3EA", color: filterTab === key ? "#9ECCFA" : "#0B1957", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background 0.15s ease, color 0.15s ease" }}>
            {label}
            <span style={{ background: filterTab === key ? "rgba(158,204,250,0.2)" : "#D1E8FF", color: filterTab === key ? "#9ECCFA" : "#0B1957", border: `2px solid ${filterTab === key ? "#9ECCFA" : "#0B1957"}`, fontSize: 9, fontWeight: 900, padding: "1px 5px", minWidth: 18, textAlign: "center" }}>{count}</span>
          </button>
        ))}
      </div>

      {/* Desktop: List + Detail side by side | Mobile: List only, detail as overlay */}
      <div style={{ display: "grid", gridTemplateColumns: selected ? "minmax(0,1fr) minmax(0,1fr)" : "1fr", gap: 14 }} className="msg-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.length === 0 && (
            <div style={{ border: "4px dashed #0B1957", background: "#F8F3EA", padding: "50px 20px", textAlign: "center", animation: "fadeIn 0.3s ease both" }}>
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
                      style={{ border: "2px solid " + (selected?.id === msg.id ? "#9ECCFA" : "#0B1957"), background: "transparent", color: selected?.id === msg.id ? "#9ECCFA" : "#0B1957", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: deleting === msg.id ? "wait" : "pointer", fontFamily: "inherit", opacity: deleting === msg.id ? 0.5 : 0.6, transition: "all 0.1s ease" }}
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

        {/* Desktop detail panel */}
        {selected && (
          <div className="hidden lg:block" style={{ position: "sticky", top: 16, animation: "slideRight 0.35s cubic-bezier(0.16,1,0.3,1) both" }}>
            <DetailPanel />
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 999, display: "flex", alignItems: "center", gap: 8, border: "4px solid #0B1957", background: toast.ok ? "#9ECCFA" : "#ef4444", color: toast.ok ? "#0B1957" : "white", padding: "10px 18px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", boxShadow: "6px 6px 0 #0B1957", whiteSpace: "nowrap", animation: "slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both", maxWidth: "calc(100vw - 32px)" }}>
          {toast.ok ? <IconCheck size={13} /> : null} {toast.msg}
        </div>
      )}
    </div>
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
  const [unreadCount, setUnreadCount] = useState(0);
  // Mobile bottom nav visible
  const [navReady, setNavReady] = useState(false);

  useEffect(() => { setTimeout(() => { setVisible(true); setNavReady(true); }, 50); }, []);
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    fetch("/api/messages/stats", { headers: { "X-CSRF-TOKEN": getCsrfToken() } })
      .then(r => r.json())
      .then(d => setUnreadCount(d.unread ?? 0))
      .catch(() => {});
  }, []);

  const handleLogout = () => router.post("/logout");
  const handleHome   = () => router.visit("/");

  const greeting = () => {
    const h = time.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleNavClick = (key: string) => {
    setActiveNav(key);
    setSidebarOpen(false);
    // scroll to top on mobile
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
            <span style={{ marginLeft: "auto", background: "#9ECCFA", color: "#0B1957", border: "2px solid #9ECCFA", fontSize: 10, fontWeight: 900, padding: "1px 7px", minWidth: 20, textAlign: "center", flexShrink: 0 }}>
              {unreadCount}
            </span>
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
        <p style={{ fontWeight: 900, fontSize: 11, color: "#9ECCFA", textTransform: "uppercase", letterSpacing: "0.1em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name ?? "Yusron"}</p>
        <p style={{ fontWeight: 600, fontSize: 10, color: "#D1E8FF", opacity: 0.6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email ?? "yusron@dev.com"}</p>
      </div>
      <button className="home-btn-sidebar" onClick={handleHome}><IconHome size={13} /> Homepage</button>
      <button className="logout-btn" style={{ width: "100%" }} onClick={handleLogout}><IconLogOut /> Logout</button>
    </div>
  );

  // Mobile bottom navigation — only show 5 key items
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

        .anim-sidebar { animation:slideLeft  0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-topbar  { animation:slideUp    0.4s cubic-bezier(0.16,1,0.3,1) 0.08s both; }
        .anim-content { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .anim-stat-0  { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
        .anim-stat-1  { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.27s both; }
        .anim-stat-2  { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.34s both; }
        .anim-stat-3  { animation:slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.41s both; }
        .anim-nav-item{ animation:slideLeft  0.4s cubic-bezier(0.16,1,0.3,1) both; }

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
          cursor:pointer; font-family:inherit; box-shadow:3px 3px 0 #0B1957;
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

        /* Mobile bottom nav */
        .bottom-nav {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
          background: #F8F3EA; border-top: 4px solid #0B1957;
          box-shadow: 0 -4px 0 rgba(11,25,87,0.15);
          display: flex; align-items: stretch;
          animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .bottom-nav-item {
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 3px; padding: 8px 4px; cursor: pointer; position: relative;
          transition: background 0.1s ease;
          border-right: 2px solid rgba(11,25,87,0.1);
          min-height: 58px;
        }
        .bottom-nav-item:last-child { border-right: none; }
        .bottom-nav-item.active { background: #0B1957; }
        .bottom-nav-item.active svg { stroke: #9ECCFA; }
        .bottom-nav-item.active .bnl { color: #9ECCFA; }
        .bottom-nav-item:not(.active):active { background: #D1E8FF; }
        .bnl { font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; color: #0B1957; line-height: 1; }
        .bn-badge {
          position: absolute; top: 6px; right: calc(50% - 14px);
          background: #9ECCFA; color: #0B1957; border: 2px solid #0B1957;
          font-size: 8px; font-weight: 900; padding: 0 4px; min-width: 14px; text-align: center; line-height: 14px; height: 14px;
          animation: bounceIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* msg-grid — on small screens collapse to single col */
        @media (max-width: 1023px) {
          .msg-grid { grid-template-columns: 1fr !important; }
        }

        /* Main content padding-bottom for mobile bottom nav */
        @media (max-width: 767px) {
          .main-scroll { padding-bottom: calc(70px + env(safe-area-inset-bottom, 0px)) !important; }
        }
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
            <button style={{ border: "2px solid #9ECCFA", padding: 8, color: "#9ECCFA", background: "transparent", cursor: "pointer", display: "flex", transition: "background 0.1s" }} onClick={() => setSidebarOpen(false)}><IconClose /></button>
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
              <button className="md:hidden p-2 border-4 border-[#0B1957] shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] btn-brutal" onClick={() => setSidebarOpen(!sidebarOpen)}>
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
                  style={{ display: "flex", alignItems: "center", gap: 5, border: "3px solid #0B1957", background: "#FFE8A0", color: "#0B1957", padding: "6px 10px", fontWeight: 900, fontSize: 10, textTransform: "uppercase", cursor: "pointer", boxShadow: "3px 3px 0 #0B1957", fontFamily: "inherit", transition: "transform 0.08s ease", animation: "pulse 2s ease infinite" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-1px,-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}>
                  <IconMail size={12} />
                  <span className="hidden xs:inline">{unreadCount} Baru</span>
                  <span className="xs:hidden">{unreadCount}</span>
                </button>
              )}
              <button className="home-btn-topbar" onClick={handleHome}>
                <IconHome size={12} /> <span className="hidden sm:inline">Home</span>
              </button>
              <div style={{ display: "none" }} className="sm:flex items-center gap-2">
                <IconClock size={15} />
                <div>
                  <p style={{ fontWeight: 900, fontSize: 8, color: "#9ECCFA", textTransform: "uppercase", letterSpacing: "0.2em" }}>Live</p>
                  <p style={{ fontWeight: 900, fontSize: 15, color: "#0B1957", fontVariantNumeric: "tabular-nums" }}>
                    {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </p>
                </div>
              </div>
              {/* Clock — show on sm+ using tailwind */}
              <div className="hidden sm:flex items-center gap-2">
                <IconClock size={15} />
                <div>
                  <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">Live</p>
                  <p className="font-black text-base text-[#0B1957] tabular-nums">
                    {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 main-scroll">

            {/* OVERVIEW */}
            {activeNav === "overview" && (
              <div className="content-fade space-y-6 sm:space-y-8">
                {/* Stats grid - 2x2 on mobile, 4 cols on lg */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {STATS.map((stat, i) => (
                    <div key={i} className={`stat-card anim-stat-${i} p-4 sm:p-5 lg:p-6`}>
                      <div className="mb-2 text-[#0B1957]">{stat.icon}</div>
                      <p className="font-black text-2xl sm:text-3xl lg:text-4xl text-[#0B1957] mb-1">{stat.value}</p>
                      <p className="font-black text-xs text-[#0B1957] uppercase tracking-widest opacity-70 leading-tight">{stat.label}</p>
                      <div className="h-1.5 sm:h-2 mt-2 sm:mt-3 border-2 border-[#0B1957]" style={{ background: stat.color }} />
                    </div>
                  ))}
                </div>

                {unreadCount > 0 && (
                  <div className="anim-content" style={{ border: "4px solid #0B1957", background: "#FFE8A0", boxShadow: "6px 6px 0 #0B1957", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", animation: "bounceIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, background: "#0B1957", border: "3px solid #0B1957", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <IconMail size={18} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 900, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0B1957", opacity: 0.5, marginBottom: 2 }}>Notifikasi</p>
                        <p style={{ fontWeight: 900, fontSize: 14, color: "#0B1957" }}>Ada <span style={{ fontSize: 20 }}>{unreadCount}</span> pesan baru belum dibaca</p>
                      </div>
                    </div>
                    <button onClick={() => handleNavClick("messages")}
                      className="btn-brutal border-4 border-[#0B1957] px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2">
                      Buka <IconArrow />
                    </button>
                  </div>
                )}

                <div className="anim-content">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="font-black text-lg sm:text-xl uppercase text-[#0B1957]">Recent Projects</h2>
                    <button className="btn-brutal border-4 border-[#0B1957] px-3 sm:px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2" onClick={() => handleNavClick("projects")}>
                      <span className="hidden sm:inline">All Projects</span><span className="sm:hidden">All</span> <IconArrow />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {PROJECTS.slice(0, 3).map((p, i) => (
                      <div key={i} style={{ animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s both` }}>
                        <ProjectCard project={p} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="anim-content">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="font-black text-lg sm:text-xl uppercase text-[#0B1957]">Tech Stack</h2>
                    <button className="btn-brutal border-4 border-[#0B1957] px-3 sm:px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2" onClick={() => handleNavClick("stacks")}>
                      Kelola <IconArrow />
                    </button>
                  </div>
                  <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[6px_6px_0_#0B1957] p-4 sm:p-5">
                    <p className="font-semibold text-xs sm:text-sm text-[#0B1957] opacity-60 mb-3 sm:mb-4">Tambah, edit, dan hapus tech stack yang tampil di portfolio — icon + nama framework/bahasa.</p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Laravel", "TypeScript", "JavaScript"].map((s, i) => <span key={i} className="stack-tag">{s}</span>)}
                      <button className="border-2 border-dashed border-[#0B1957] px-3 py-1 font-black text-xs uppercase text-[#0B1957] opacity-50 hover:opacity-100 transition-opacity" onClick={() => handleNavClick("stacks")}>+ Kelola</button>
                    </div>
                  </div>
                </div>

                <div className="anim-content">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="font-black text-lg sm:text-xl uppercase text-[#0B1957]">Homepage</h2>
                    <button className="btn-brutal border-4 border-[#0B1957] px-3 sm:px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2" onClick={() => handleNavClick("homepage")}>
                      Kelola <IconArrow />
                    </button>
                  </div>
                  <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[6px_6px_0_#0B1957] p-4 sm:p-5">
                    <p className="font-semibold text-xs sm:text-sm text-[#0B1957] opacity-60 mb-3 sm:mb-4">Kelola konten homepage portfolio — tech stack, hero, projects, dan about section.</p>
                    <div className="flex flex-wrap gap-2">
                      {HOMEPAGE_SECTIONS_OVERVIEW.map((s, i) => (
                        <span key={i} className={`border-2 border-[#0B1957] px-3 py-1 font-black text-xs uppercase ${s.status === "active" ? "bg-[#9ECCFA] text-[#0B1957]" : "bg-[#F8F3EA] text-[#0B1957] opacity-40"}`}>
                          {s.label}{s.status === "soon" ? " (soon)" : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="anim-content">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="font-black text-lg sm:text-xl uppercase text-[#0B1957]">About Page</h2>
                    <button className="btn-brutal border-4 border-[#0B1957] px-3 sm:px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center gap-2" onClick={() => handleNavClick("about")}>
                      Kelola <IconArrow />
                    </button>
                  </div>
                  <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[6px_6px_0_#0B1957] p-4 sm:p-5">
                    <p className="font-semibold text-xs sm:text-sm text-[#0B1957] opacity-60 mb-3 sm:mb-4">Kelola About page — hero (dual foto), capabilities + icon tech, experience, case studies, availability.</p>
                    <div className="flex flex-wrap gap-2">
                      {["Hero / Bio", "Capabilities", "Experience", "Case Studies", "Availability"].map((s, i) => (
                        <span key={i} className="border-2 border-[#0B1957] px-3 py-1 font-black text-xs uppercase bg-[#9ECCFA] text-[#0B1957]">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="anim-content bg-[#0B1957] border-4 border-[#0B1957] shadow-[8px_8px_0_#9ECCFA] p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2"><IconBriefcase size={14} /><p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">Status</p></div>
                    <p className="font-black text-xl sm:text-2xl text-[#F8F3EA] uppercase">Open to Work</p>
                    <p className="font-semibold text-xs sm:text-sm text-[#D1E8FF] mt-1">Available for freelance & full-time roles</p>
                  </div>
                  <div className="p-3 sm:p-4 text-center" style={{ border: "3px solid #9ECCFA" }}>
                    <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest mb-1">Stack</p>
                    <p className="font-black text-sm text-[#F8F3EA]">React + Laravel</p>
                  </div>
                </div>
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
                  <button onClick={handleHome} className="btn-brutal flex-1 border-4 border-[#0B1957] py-3 sm:py-4 font-black text-xs sm:text-sm uppercase tracking-widest shadow-[6px_6px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957] flex items-center justify-center gap-2 sm:gap-3">
                    <IconHome size={15} /> Homepage
                  </button>
                  <button onClick={handleLogout} className="btn-brutal flex-1 border-4 border-[#0B1957] py-3 sm:py-4 font-black text-xs sm:text-sm uppercase tracking-widest shadow-[6px_6px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957] flex items-center justify-center gap-2 sm:gap-3">
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
        <nav className="bottom-nav md:hidden">
          {BOTTOM_NAV.map(item => (
            <button
              key={item.key}
              className={`bottom-nav-item ${activeNav === item.key ? "active" : ""}`}
              onClick={() => handleNavClick(item.key)}>
              {item.icon}
              <span className="bnl">{item.label}</span>
              {item.key === "messages" && unreadCount > 0 && (
                <span className="bn-badge">{unreadCount}</span>
              )}
            </button>
          ))}
        </nav>
      )}
    </>
  );
}

// ── ProjectCard ───────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card p-4 sm:p-5">
      <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <h3 className="font-black uppercase text-xs sm:text-sm text-[#0B1957] leading-tight">{project.title}</h3>
        <span className={`status-badge flex-shrink-0 text-xs ${STATUS_STYLE[project.status] ?? ""}`}>{project.status}</span>
      </div>
      <p className="font-semibold text-xs text-[#0B1957] mb-3 sm:mb-4 leading-relaxed opacity-70">{project.desc}</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
        {project.stacks.map((s, i) => <span key={i} className="stack-tag">{s}</span>)}
      </div>
      <div className="flex items-center justify-between border-t-2 border-[#0B1957] pt-2 sm:pt-3 mt-2 sm:mt-3">
        <span className="font-black text-xs text-[#0B1957] uppercase opacity-50">{project.date}</span>
        <span className="font-black text-xs text-[#9ECCFA] uppercase cursor-pointer hover:underline flex items-center gap-1">View <IconArrow size={11} /></span>
      </div>
    </div>
  );
}