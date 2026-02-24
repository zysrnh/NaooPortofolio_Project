"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { router } from "@inertiajs/react";
import Navbar from "@/components/Navbar";

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

interface TechDetail { label: string; icon: string; desc: string; }
interface ProjectData {
  id: string; title: string; subtitle: string; desc: string; longDesc: string;
  status: "Hosted" | "In Progress" | "Planning";
  date: string; duration: string; images: string[];
  stacks: TechDetail[];
  features: { title: string; desc: string }[];
  demoUrl?: string; githubUrl?: string;
}

const PROJECTS: Record<string, ProjectData> = {
  "burger-ordering-app": {
    id: "burger-ordering-app",
    title: "Burger Ordering App",
    subtitle: "Website restoran dengan sistem pemesanan online",
    desc: "Website restoran burger dengan sistem pemesanan online",
    longDesc: "Aplikasi pemesanan burger berbasis web yang memungkinkan pelanggan memilih menu, menyesuaikan pesanan, dan melakukan checkout secara online. Dibangun dengan arsitektur Laravel sebagai backend API dan React sebagai frontend SPA.",
    status: "Hosted",
    date: "Jan 2025", duration: "3 Bulan",
    images: ["/profile/Mboy.jpeg", "/profile/Mboy.jpeg", "/profile/Mboy.jpeg"],
    stacks: [
      { label: "Laravel", icon: "/Icon/Laravel.jpg", desc: "Backend REST API, autentikasi, manajemen pesanan & menu" },
      { label: "React",   icon: "/Icon/React.jpg",   desc: "Frontend SPA, komponen dinamis, cart management" },
    ],
    features: [
      { title: "Menu Management",   desc: "Admin bisa tambah, edit, hapus menu dengan upload gambar dan atur kategori" },
      { title: "Cart & Checkout",   desc: "Pelanggan bisa tambah ke keranjang, atur jumlah, dan checkout dengan ringkasan pesanan" },
      { title: "Order Tracking",    desc: "Status pesanan real-time: Pending → Processing → Ready → Delivered" },
      { title: "Auth System",       desc: "Login/register pelanggan, role admin & customer dengan middleware" },
      { title: "Responsive Design", desc: "Tampilan optimal di desktop dan mobile untuk pengalaman memesan yang nyaman" },
    ],
    demoUrl: "#", githubUrl: "https://github.com/zysrnh",
  },
  "beyblade-leaderboard": {
    id: "beyblade-leaderboard",
    title: "Beyblade Leaderboard",
    subtitle: "Leaderboard turnamen dengan statistik otomatis",
    desc: "Leaderboard turnamen dengan statistik otomatis",
    longDesc: "Sistem leaderboard untuk turnamen Beyblade yang menampilkan ranking pemain, statistik pertandingan, dan riwayat hasil secara real-time. Data diperbarui otomatis setelah setiap match selesai diinput.",
    status: "Hosted",
    date: "Mar 2025", duration: "1 Bulan",
    images: ["/profile/Mboy.jpeg", "/profile/Mboy.jpeg"],
    stacks: [
      { label: "JavaScript", icon: "/Icon/JavaScript.jpg", desc: "Logika perhitungan skor, sorting, dan update real-time" },
    ],
    features: [
      { title: "Live Ranking",       desc: "Ranking pemain diperbarui otomatis setelah setiap pertandingan diinput" },
      { title: "Match History",      desc: "Riwayat semua pertandingan dengan detail skor dan tanggal" },
      { title: "Player Stats",       desc: "Statistik per pemain: win/loss ratio, total poin, streak" },
      { title: "Tournament Bracket", desc: "Bracket otomatis dihasilkan dari daftar peserta yang terdaftar" },
    ],
    githubUrl: "https://github.com/zysrnh",
  },
  "cv-generator-tool": {
    id: "cv-generator-tool",
    title: "CV Generator Tool",
    subtitle: "Generate CV massal dari Excel ke PDF",
    desc: "Generate CV massal dari Excel ke PDF",
    longDesc: "Tools untuk generate CV dalam jumlah besar dari data Excel. User upload file .xlsx berisi data pegawai/pelamar, sistem otomatis mengisi template CV dan mengekspor ke PDF per orang.",
    status: "In Progress",
    date: "May 2025", duration: "2 Bulan",
    images: ["/profile/Mboy.jpeg", "/profile/Mboy.jpeg", "/profile/Mboy.jpeg"],
    stacks: [
      { label: "React",      icon: "/Icon/React.jpg",      desc: "UI upload file, preview template, progress tracker" },
      { label: "TypeScript", icon: "/Icon/TypeScript.jpg", desc: "Type-safe data parsing, validasi kolom Excel" },
    ],
    features: [
      { title: "Bulk Upload",     desc: "Upload satu file Excel berisi ratusan data, langsung diproses otomatis" },
      { title: "Template Engine", desc: "Template CV yang bisa dikustomisasi: font, warna, layout" },
      { title: "PDF Export",      desc: "Generate PDF per orang atau zip semua sekaligus untuk download" },
      { title: "Data Validation", desc: "Deteksi kolom yang kosong atau format salah sebelum generate" },
      { title: "Preview Mode",    desc: "Preview hasil CV sebelum export ke PDF" },
    ],
    githubUrl: "https://github.com/zysrnh",
  },
  "dashboard-analytics": {
    id: "dashboard-analytics",
    title: "Dashboard Analytics",
    subtitle: "Dashboard visualisasi data real-time untuk monitoring bisnis",
    desc: "Dashboard visualisasi data real-time untuk monitoring bisnis",
    longDesc: "Dashboard analytics untuk monitoring KPI bisnis secara real-time. Menampilkan grafik interaktif, tabel data, dan alert otomatis ketika ada anomali di data.",
    status: "Planning",
    date: "Jun 2025", duration: "4 Bulan",
    images: ["/profile/Mboy.jpeg", "/profile/Mboy.jpeg"],
    stacks: [
      { label: "React",      icon: "/Icon/React.jpg",      desc: "Komponen chart interaktif, filter data, real-time update" },
      { label: "TypeScript", icon: "/Icon/TypeScript.jpg", desc: "Type-safe API response, validasi data pipeline" },
    ],
    features: [
      { title: "Real-time Charts", desc: "Grafik line, bar, pie yang update otomatis dari data stream" },
      { title: "KPI Cards",        desc: "Kartu ringkasan KPI utama dengan tren naik/turun dari periode sebelumnya" },
      { title: "Filter & Drill",   desc: "Filter data per tanggal, kategori, region dengan drill-down detail" },
      { title: "Alert System",     desc: "Notifikasi otomatis ketika nilai KPI di bawah threshold yang ditentukan" },
    ],
    githubUrl: "https://github.com/zysrnh",
  },
  "inventory-system": {
    id: "inventory-system",
    title: "Inventory System",
    subtitle: "Sistem manajemen stok dan inventaris gudang berbasis web",
    desc: "Sistem manajemen stok dan inventaris gudang berbasis web",
    longDesc: "Sistem manajemen inventaris lengkap untuk gudang. Tracking stok barang masuk/keluar, laporan stok real-time, dan alert otomatis saat stok mendekati batas minimum.",
    status: "Hosted",
    date: "Feb 2025", duration: "3 Bulan",
    images: ["/profile/Mboy.jpeg", "/profile/Mboy.jpeg", "/profile/Mboy.jpeg"],
    stacks: [
      { label: "Laravel",    icon: "/Icon/Laravel.jpg",    desc: "Backend CRUD barang, transaksi stok, laporan PDF" },
      { label: "JavaScript", icon: "/Icon/JavaScript.jpg", desc: "Dynamic table, search & filter, konfirmasi aksi" },
    ],
    features: [
      { title: "Stock Management",   desc: "Tambah, edit, hapus barang dengan kategori, satuan, dan harga" },
      { title: "In/Out Transaction", desc: "Catat barang masuk dan keluar dengan keterangan dan tanggal" },
      { title: "Low Stock Alert",    desc: "Alert otomatis saat stok barang di bawah minimum yang ditentukan" },
      { title: "Laporan PDF",        desc: "Export laporan stok harian/bulanan ke PDF dengan satu klik" },
      { title: "Multi User",         desc: "Role admin dan staff dengan hak akses berbeda" },
    ],
    githubUrl: "https://github.com/zysrnh",
  },
  "e-learning-platform": {
    id: "e-learning-platform",
    title: "E-Learning Platform",
    subtitle: "Platform belajar online dengan fitur kuis dan sertifikasi",
    desc: "Platform belajar online dengan fitur kuis dan sertifikasi",
    longDesc: "Platform e-learning lengkap dengan sistem kursus, kuis interaktif, dan sertifikasi otomatis setelah menyelesaikan materi. Mendukung video, dokumen, dan soal pilihan ganda.",
    status: "In Progress",
    date: "Apr 2025", duration: "5 Bulan",
    images: ["/profile/Mboy.jpeg", "/profile/Mboy.jpeg", "/profile/Mboy.jpeg"],
    stacks: [
      { label: "React",   icon: "/Icon/React.jpg",   desc: "UI player video, kuis interaktif, progress tracker" },
      { label: "Laravel", icon: "/Icon/Laravel.jpg", desc: "Backend kursus, manajemen soal, generate sertifikat" },
    ],
    features: [
      { title: "Course Management", desc: "Instruktur bisa buat kursus dengan materi video, teks, dan lampiran file" },
      { title: "Interactive Quiz",  desc: "Kuis pilihan ganda dengan timer, shuffle soal, dan batas percobaan" },
      { title: "Sertifikasi",       desc: "Sertifikat otomatis di-generate sebagai PDF setelah lulus semua modul" },
      { title: "Progress Tracking", desc: "Tracking progress belajar per user dengan persentase penyelesaian" },
      { title: "Discussion Forum",  desc: "Forum diskusi per kursus untuk interaksi peserta dan instruktur" },
    ],
    githubUrl: "https://github.com/zysrnh",
  },
};

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  "Hosted":      { bg: "bg-[#9ECCFA]",  text: "text-[#0B1957]", dot: "bg-[#0B1957]" },
  "In Progress": { bg: "bg-[#FFE8A0]",  text: "text-[#0B1957]", dot: "bg-[#F59E0B]" },
  "Planning":    { bg: "bg-[#F8F3EA]",  text: "text-[#0B1957]", dot: "bg-[#9ECCFA]" },
};

// ── Spotlight Card Component ──────────────────────────────────────────────────
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function SpotlightCard({ children, className = "", style = {}, onClick }: SpotlightCardProps) {
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
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Spotlight overlay */}
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

interface Props { projectId: string; }

export default function ProjectDetail({ projectId }: Props) {
  const project = PROJECTS[projectId];
  const [visible, setVisible]     = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox]   = useState<number | null>(null);
  const [showTop, setShowTop]     = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);
  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    if (lightbox === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i !== null ? (i + 1) % project.images.length : null);
      if (e.key === "ArrowLeft")  setLightbox(i => i !== null ? (i - 1 + project.images.length) % project.images.length : null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightbox, project?.images.length]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#D1E8FF] flex items-center justify-center">
        <div className="bg-[#F8F3EA] border-4 border-[#0B1957] p-12 shadow-[10px_10px_0_#0B1957] text-center">
          <h1 className="font-black text-4xl uppercase text-[#0B1957] mb-4">404</h1>
          <p className="font-bold text-[#0B1957] mb-6">Project tidak ditemukan</p>
          <button onClick={() => router.visit("/projects")}
            className="btn-brutal border-4 border-[#0B1957] px-6 py-3 font-black uppercase shadow-[4px_4px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957]">
            ← Kembali ke Projects
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = STATUS_STYLE[project.status] ?? STATUS_STYLE["Planning"];

  return (
    <>
      <style>{`
        @keyframes slideUp    { from{opacity:0;transform:translateY(40px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes slideLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }

        .anim-0 { animation: slideUp    0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-1 { animation: slideLeft  0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .anim-2 { animation: slideRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
        .anim-3 { animation: slideUp    0.6s cubic-bezier(0.16,1,0.3,1) 0.3s  both; }
        .anim-4 { animation: slideUp    0.6s cubic-bezier(0.16,1,0.3,1) 0.4s  both; }
        .anim-5 { animation: slideUp    0.6s cubic-bezier(0.16,1,0.3,1) 0.5s  both; }

        .btn-brutal { transition: transform 0.08s ease, box-shadow 0.08s ease; }
        .btn-brutal:hover  { transform: translate(2px,2px);  box-shadow: 2px 2px 0 #0B1957 !important; }
        .btn-brutal:active { transform: translate(4px,4px);  box-shadow: 0 0 0   #0B1957 !important; }

        .thumb-item { border: 3px solid #0B1957; overflow: hidden; cursor: pointer; transition: transform 0.12s ease, box-shadow 0.12s ease; box-shadow: 3px 3px 0 #0B1957; }
        .thumb-item:hover  { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #0B1957; }
        .thumb-item.active { box-shadow: 4px 4px 0 #9ECCFA, 6px 6px 0 #0B1957; }

        .tech-card { border: 4px solid #0B1957; background: #F8F3EA; box-shadow: 6px 6px 0 #0B1957; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .tech-card:hover { transform: translate(-3px,-3px); box-shadow: 9px 9px 0 #9ECCFA, 11px 11px 0 #0B1957; }

        .feature-item { border: 3px solid #0B1957; background: #F8F3EA; box-shadow: 4px 4px 0 #0B1957; transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease; }
        .feature-item:hover { background: #D1E8FF; transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #0B1957; }

        .back-btn { display: inline-flex; align-items: center; gap: 8px; border: 4px solid #0B1957; padding: 10px 20px; font-weight: 900; font-size: 13px; text-transform: uppercase; color: #0B1957; background: #F8F3EA; cursor: pointer; box-shadow: 4px 4px 0 #0B1957; letter-spacing: 0.07em; transition: transform 0.08s ease, box-shadow 0.08s ease; }
        .back-btn:hover  { transform: translate(2px,2px);  box-shadow: 2px 2px 0 #0B1957; }
        .back-btn:active { transform: translate(4px,4px);  box-shadow: 0 0 0 #0B1957; }

        .lightbox-overlay { position: fixed; inset: 0; z-index: 100; background: rgba(11,25,87,0.92); display: flex; align-items: center; justify-content: center; animation: fadeIn 0.2s ease; backdrop-filter: blur(4px); }
        .lightbox-img { max-width: 90vw; max-height: 85vh; border: 4px solid #9ECCFA; box-shadow: 0 0 0 4px #0B1957, 10px 10px 0 #9ECCFA; object-fit: contain; animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1); }

        .back-to-top { position: fixed; bottom: 28px; right: 28px; z-index: 99; width: 48px; height: 48px; border: 4px solid #0B1957; background: #0B1957; box-shadow: 4px 4px 0 #9ECCFA; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.1s ease, box-shadow 0.1s ease, opacity 0.3s ease, visibility 0.3s ease; }
        .back-to-top:hover  { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #9ECCFA; }
        .back-to-top:active { transform: translate(0,0); box-shadow: 2px 2px 0 #9ECCFA; }

        /* ── SPOTLIGHT CARD ── */
        .spotlight-card {
          position: relative;
          overflow: hidden;
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
        .spotlight-card:hover .card-img-inner {
          transform: scale(1.05);
        }
        .card-img-inner {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .spotlight-card:hover .card-overlay-inner {
          opacity: 1;
        }
        .card-overlay-inner {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

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
      `}</style>

      <div className="min-h-screen bg-[#D1E8FF]" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20">

          {/* BACK */}
          <div className="anim-0 mb-8">
            <button className="back-btn" onClick={() => router.visit("/projects")}>
              <IconArrowLeft /> Kembali ke Projects
            </button>
          </div>

          {/* HERO */}
          <div className="anim-0 bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] p-8 sm:p-10 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px)" }} />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-[0.3em] mb-2">Project Detail</p>
                <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#F8F3EA] mb-3 leading-tight">{project.title}</h1>
                <p className="font-semibold text-[#D1E8FF] text-base sm:text-lg max-w-2xl">{project.subtitle}</p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <div className={`inline-flex items-center gap-2 border-4 border-[#F8F3EA] px-4 py-2 ${statusStyle.bg}`}>
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

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">

              {/* GALLERY */}
              <div className="anim-1">
                <h2 className="text-xl font-black uppercase mb-4 text-[#0B1957]">Gallery</h2>
                <div className="relative border-4 border-[#0B1957] overflow-hidden shadow-[8px_8px_0_#0B1957] cursor-zoom-in group" onClick={() => setLightbox(activeImg)}>
                  <img src={project.images[activeImg]} alt={`screenshot ${activeImg + 1}`} className="w-full h-64 sm:h-96 object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 bg-[#0B1957] border-2 border-[#9ECCFA] px-3 py-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconZoom /><span className="text-[#9ECCFA] font-black uppercase text-xs">Zoom</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#0B1957] border-2 border-[#9ECCFA] px-3 py-1">
                    <span className="text-[#9ECCFA] font-black text-xs">{activeImg + 1} / {project.images.length}</span>
                  </div>
                </div>
                {project.images.length > 1 && (
                  <div className="flex gap-3 mt-4">
                    {project.images.map((img, i) => (
                      <div key={i} className={`thumb-item flex-1 h-20 ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)}>
                        <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover object-top" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="anim-2">
                <h2 className="text-xl font-black uppercase mb-4 text-[#0B1957]">Deskripsi</h2>
                <div className="bg-[#F8F3EA] border-4 border-[#0B1957] p-6 sm:p-8 shadow-[6px_6px_0_#0B1957]">
                  <p className="font-semibold text-[#0B1957] leading-relaxed text-base">{project.longDesc}</p>
                </div>
              </div>

              {/* FEATURES */}
              <div className="anim-3">
                <h2 className="text-xl font-black uppercase mb-4 text-[#0B1957]">Fitur-Fitur</h2>
                <div className="space-y-3">
                  {project.features.map((f, i) => (
                    <div key={i} className="feature-item p-5 flex gap-4 items-start">
                      <div className="flex-shrink-0 w-7 h-7 bg-[#0B1957] border-2 border-[#0B1957] flex items-center justify-center text-[#9ECCFA] mt-0.5">
                        <IconCheck />
                      </div>
                      <div>
                        <p className="font-black uppercase text-sm text-[#0B1957] mb-1 tracking-wide">{f.title}</p>
                        <p className="font-semibold text-sm text-[#0B1957] opacity-70 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-8">

              {/* TECH STACK */}
              <div className="anim-4">
                <h2 className="text-xl font-black uppercase mb-4 text-[#0B1957]">Tech Stack</h2>
                <div className="flex flex-wrap gap-3">
                  {project.stacks.map((tech, i) => (
                    <div key={i} className="tech-card p-4 flex items-center justify-center w-[calc(50%-6px)]" title={tech.label}>
                      <div className="border-2 border-[#0B1957] p-2 bg-[#D1E8FF]">
                        <img src={tech.icon} alt={tech.label} className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LINKS */}
              {(project.demoUrl || project.githubUrl) && (
                <div className="anim-5">
                  <h2 className="text-xl font-black uppercase mb-4 text-[#0B1957]">Links</h2>
                  <div className="space-y-3">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                        className="btn-brutal flex items-center justify-center gap-3 border-4 border-[#0B1957] py-4 font-black uppercase text-sm shadow-[4px_4px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957] w-full">
                        <IconGlobe /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="btn-brutal flex items-center justify-center gap-3 border-4 border-[#0B1957] py-4 font-black uppercase text-sm shadow-[4px_4px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] w-full">
                        <IconGithub /> GitHub Repo
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* INFO */}
              <div className="anim-5">
                <h2 className="text-xl font-black uppercase mb-4 text-[#0B1957]">Info</h2>
                <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[6px_6px_0_#9ECCFA] overflow-hidden">
                  {[
                    { label: "Status",  value: project.status },
                    { label: "Tanggal", value: project.date },
                    { label: "Durasi",  value: project.duration },
                    { label: "Stack",   value: project.stacks.map(s => s.label).join(", ") },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center px-5 py-4 border-b-2 border-[#9ECCFA] last:border-b-0">
                      <p className="font-black text-xs uppercase text-[#9ECCFA] tracking-widest">{item.label}</p>
                      <p className="font-bold text-sm text-[#F8F3EA] text-right max-w-[60%]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* OTHER PROJECTS — dengan SpotlightCard */}
          <div className="mt-16">
            <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">Project Lainnya</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.values(PROJECTS).filter(p => p.id !== project.id).slice(0, 3).map((p, i) => (
                <SpotlightCard
                  key={i}
                  onClick={() => router.visit(`/projects/${p.id}`)}
                >
                  {/* image */}
                  <div className="overflow-hidden border-b-4 border-[#0B1957] relative">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="card-img-inner w-full h-32 object-cover object-top"
                    />
                    <div className="card-overlay-inner absolute inset-0 bg-[#0B1957] bg-opacity-55 flex items-center justify-center">
                      <span className="text-[#9ECCFA] font-black uppercase text-xs border-2 border-[#9ECCFA] px-3 py-1.5">Lihat Detail →</span>
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-5 relative z-20">
                    <p className="font-black uppercase text-sm text-[#0B1957] mb-2">{p.title}</p>
                    <p className="font-semibold text-xs text-[#0B1957] opacity-60 mb-3 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.stacks.map((s, j) => (
                        <div key={j} title={s.label} className="border-2 border-[#0B1957] bg-[#D1E8FF] p-1">
                          <img src={s.icon} alt={s.label} className="w-6 h-6 object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>

        {/* LIGHTBOX */}
        {lightbox !== null && (
          <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
            <button className="absolute top-6 right-6 border-4 border-[#9ECCFA] bg-[#0B1957] text-[#9ECCFA] w-12 h-12 flex items-center justify-center z-10" onClick={() => setLightbox(null)} style={{ boxShadow: "3px 3px 0 #9ECCFA" }}>
              <IconClose />
            </button>
            {project.images.length > 1 && (
              <button className="absolute left-4 sm:left-8 border-4 border-[#9ECCFA] bg-[#0B1957] text-[#9ECCFA] w-12 h-12 flex items-center justify-center" style={{ boxShadow: "3px 3px 0 #9ECCFA" }}
                onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + project.images.length) % project.images.length : null); }}>
                <IconChevronLeft />
              </button>
            )}
            <img src={project.images[lightbox]} alt={`lightbox ${lightbox + 1}`} className="lightbox-img" onClick={e => e.stopPropagation()} />
            {project.images.length > 1 && (
              <button className="absolute right-4 sm:right-8 border-4 border-[#9ECCFA] bg-[#0B1957] text-[#9ECCFA] w-12 h-12 flex items-center justify-center" style={{ boxShadow: "3px 3px 0 #9ECCFA" }}
                onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % project.images.length : null); }}>
                <IconChevronRight />
              </button>
            )}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 border-2 border-[#9ECCFA] bg-[#0B1957] px-4 py-2">
              <span className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest">{lightbox + 1} / {project.images.length}</span>
            </div>
          </div>
        )}

        {/* BACK TO TOP */}
        <button className="back-to-top" style={{ opacity: showTop ? 1 : 0, visibility: showTop ? "visible" : "hidden" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ECCFA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </>
  );
}