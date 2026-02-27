import Navbar from "@/components/Navbar";
import { useState, useEffect, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type ContactPlatform = "whatsapp"|"email"|"github"|"linkedin"|"twitter"|"instagram"|"telegram"|"custom";

interface ContactItem {
  id: number;
  platform: ContactPlatform;
  label: string;
  value: string;
  url: string;
  is_visible: boolean;
  icon_color: string;
}

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

// ── Platform SVG Icons ─────────────────────────────────────────────────────────
function PlatformIcon({ platform, size = 20 }: { platform: ContactPlatform; size?: number }) {
  const s = size;
  switch (platform) {
    case "whatsapp":
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
    case "email":
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
    case "github":
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="#9ECCFA"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
    case "linkedin":
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    case "instagram":
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
    case "telegram":
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;
    case "twitter":
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
    default:
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
  }
}

// ── FloatingBlocks ─────────────────────────────────────────────────────────────
const BLOCK_CONFIGS = [
  { top:"6%",  left:"2%",   size:56, color:"#9ECCFA", type:"filled",  animDelay:"0s"   },
  { top:"50%", left:"1.5%", size:18, color:"#0B1957", type:"outline", animDelay:"1.2s" },
  { top:"80%", left:"3%",   size:36, color:"#F8F3EA", type:"outline", animDelay:"0.6s" },
  { top:"15%", left:"93%",  size:24, color:"#0B1957", type:"filled",  animDelay:"1.8s" },
  { top:"55%", left:"94%",  size:44, color:"#9ECCFA", type:"outline", animDelay:"0.3s" },
  { top:"85%", left:"92%",  size:32, color:"#9ECCFA", type:"outline", animDelay:"1.5s" },
];

function FloatingBlocks() {
  return (
    <>
      <style>{`@keyframes floatBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}} aria-hidden="true">
        {BLOCK_CONFIGS.map((cfg,i)=>(
          <div key={i} style={{position:"absolute",top:cfg.top,left:cfg.left,width:cfg.size,height:cfg.size,
            background:cfg.type==="filled"?cfg.color:"transparent",
            border:cfg.type==="outline"?`4px solid ${cfg.color}`:`3px solid rgba(11,25,87,0.3)`,
            boxShadow:`4px 4px 0 rgba(11,25,87,0.4)`,
            animation:`floatBob ${3.5+i*0.4}s ease-in-out ${cfg.animDelay} infinite`}} />
        ))}
      </div>
    </>
  );
}

// ── getCsrfToken ──────────────────────────────────────────────────────────────
function getCsrfToken(): string {
  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  if (meta?.content) return meta.content;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

// ── Main Contact Page ─────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/contact/visible")
      .then(r => r.json())
      .then(d => setContacts(Array.isArray(d) ? d : []))
      .catch(() => {});

    setTimeout(() => setVisible(true), 50);
  }, []);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = "Nama wajib diisi";
    if (!form.email.trim())   e.email   = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Format email tidak valid";
    if (!form.message.trim()) e.message = "Pesan wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCsrfToken(),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      } else {
        if (data.errors) {
          const mapped: Partial<FormState> = {};
          Object.keys(data.errors).forEach(k => {
            mapped[k as keyof FormState] = data.errors[k][0];
          });
          setErrors(mapped);
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrors({});
  };

  return (
    <>
      <style>{`
        @keyframes slideDown  { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp    { from{opacity:0;transform:translateY(32px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes slideLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn    { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
        @keyframes checkBounce{ 0%{transform:scale(0) rotate(-15deg)} 60%{transform:scale(1.2) rotate(5deg)} 100%{transform:scale(1) rotate(0deg)} }
        @keyframes pulse      { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes spin       { to{transform:rotate(360deg)} }

        body { background-color: #D1E8FF; }

        .anim-navbar  { animation: slideDown  0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-hero    { animation: slideUp    0.7s cubic-bezier(0.16,1,0.3,1) 0.1s  both; }
        .anim-form    { animation: slideLeft  0.7s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
        .anim-sidebar { animation: slideRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s  both; }

        .btn-brutal {
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }
        .btn-brutal:hover:not(:disabled) {
          transform: translate(2px,2px);
          box-shadow: 2px 2px 0 #0B1957 !important;
        }
        .btn-brutal:active:not(:disabled) {
          transform: translate(4px,4px);
          box-shadow: 0 0 0 #0B1957 !important;
        }

        .form-input {
          width: 100%;
          border: 4px solid #0B1957;
          background: white;
          padding: 12px 16px;
          font-weight: 700;
          font-size: 14px;
          color: #0B1957;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
          transition: box-shadow 0.15s ease, transform 0.12s ease, border-color 0.15s ease;
        }
        .form-input:focus {
          box-shadow: 4px 4px 0 #9ECCFA;
          transform: translate(-1px,-1px);
        }
        .form-input.error {
          border-color: #ef4444;
          box-shadow: 4px 4px 0 rgba(239,68,68,0.3);
        }
        .form-input::placeholder {
          color: #0B1957;
          opacity: 0.3;
          font-weight: 600;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          border: 4px solid #0B1957;
          background: #F8F3EA;
          box-shadow: 4px 4px 0 #0B1957;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.12s ease;
        }
        .contact-link:hover {
          transform: translate(-3px,-3px);
          box-shadow: 7px 7px 0 #0B1957;
          background: #D1E8FF;
        }
        .contact-link:hover .contact-link-icon {
          transform: translate(-2px,-2px);
          box-shadow: 4px 4px 0 #0B1957;
        }
        .contact-link-icon {
          width: 48px;
          height: 48px;
          border: 3px solid #0B1957;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 2px 2px 0 #0B1957;
        }

        .sending-spinner {
          animation: pulse 0.8s ease infinite;
        }
      `}</style>

      <div className="min-h-screen relative" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
        <FloatingBlocks />
        <div className="anim-navbar"><Navbar /></div>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12 anim-hero">
          <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[10px_10px_0_#9ECCFA] px-8 sm:px-12 py-10 sm:py-14 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:"repeating-linear-gradient(0deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#9ECCFA 0,#9ECCFA 1px,transparent 1px,transparent 40px)"}}/>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9ECCFA] opacity-10" style={{clipPath:"polygon(100% 0,0 0,100% 100%)"}}/>

            <div className="relative z-10 max-w-2xl">
              <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-[0.35em] mb-3">Get in touch</p>
              <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#F8F3EA] mb-5 leading-[0.95]">
                Let's<br/>
                <span className="text-[#9ECCFA]">Talk.</span>
              </h1>
              <p className="font-semibold text-[#D1E8FF] text-base sm:text-lg leading-relaxed max-w-lg opacity-80">
                Punya project, pertanyaan, atau sekadar ingin berkenalan? Kirimkan pesan dan saya akan membalas secepatnya.
              </p>
            </div>

            <div className="absolute bottom-4 right-8 opacity-5 leading-none select-none pointer-events-none">
              <svg width="160" height="160" viewBox="0 0 24 24" fill="#9ECCFA">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            <div className="lg:col-span-3 anim-form" ref={formRef}>

              {status === "success" && (
                <div ref={successRef} className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden" style={{animation:"scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) both"}}>
                  <div className="bg-[#0B1957] border-b-4 border-[#0B1957] px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#9ECCFA] border-4 border-[#9ECCFA] flex items-center justify-center flex-shrink-0" style={{animation:"checkBounce 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both"}}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div>
                        <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest mb-1">Terkirim!</p>
                        <p className="font-black text-xl uppercase text-[#F8F3EA]">Pesan Berhasil Dikirim</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-8 py-10 text-center flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-[#D1E8FF] border-4 border-[#0B1957] flex items-center justify-center" style={{boxShadow:"6px 6px 0 #0B1957"}}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                    </div>
                    <div>
                      <p className="font-black text-2xl uppercase text-[#0B1957] mb-3">Yeay, Pesanmu Terkirim!</p>
                      <p className="font-semibold text-[#0B1957] opacity-60 leading-relaxed max-w-md">
                        Terima kasih sudah menghubungi saya. Saya akan membalas pesanmu sesegera mungkin, biasanya dalam 24 jam.
                      </p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="btn-brutal border-4 border-[#0B1957] px-8 py-3 font-black uppercase text-sm shadow-[4px_4px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957]"
                    >
                      Kirim Pesan Lain →
                    </button>
                  </div>
                </div>
              )}

              {status !== "success" && (
                <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden">
                  <div className="bg-[#0B1957] border-b-4 border-[#0B1957] px-8 py-5 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#9ECCFA] border-2 border-[#9ECCFA] flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2.5" strokeLinecap="round"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </div>
                    <div>
                      <p className="font-black uppercase text-xs text-[#9ECCFA] tracking-widest">Form Kontak</p>
                      <p className="font-bold text-[#F8F3EA] text-sm">Isi form di bawah untuk mengirim pesan</p>
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="mx-8 mt-6 border-4 border-red-500 bg-red-50 px-5 py-4 flex items-center gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      <p className="font-bold text-sm text-red-600">Terjadi kesalahan. Periksa form dan coba lagi.</p>
                    </div>
                  )}

                  <div className="px-8 py-8 flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div style={{animation:"slideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.25s both"}}>
                        <label className="block font-black text-xs uppercase tracking-[0.12em] text-[#0B1957] mb-2">
                          Nama <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={e => handleChange("name", e.target.value)}
                          placeholder="Nama kamu"
                          className={`form-input ${errors.name ? "error" : ""}`}
                          maxLength={100}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div style={{animation:"slideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.3s both"}}>
                        <label className="block font-black text-xs uppercase tracking-[0.12em] text-[#0B1957] mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => handleChange("email", e.target.value)}
                          placeholder="email@kamu.com"
                          className={`form-input ${errors.email ? "error" : ""}`}
                          maxLength={255}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div style={{animation:"slideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.35s both"}}>
                      <label className="block font-black text-xs uppercase tracking-[0.12em] text-[#0B1957] mb-2">
                        Subjek <span className="text-[#0B1957] opacity-40 font-semibold normal-case">(opsional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={e => handleChange("subject", e.target.value)}
                        placeholder="Topik pesan kamu"
                        className="form-input"
                        maxLength={200}
                      />
                    </div>

                    <div style={{animation:"slideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.4s both"}}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block font-black text-xs uppercase tracking-[0.12em] text-[#0B1957]">
                          Pesan <span className="text-red-500">*</span>
                        </label>
                        <span className="text-xs font-bold text-[#0B1957] opacity-40">{form.message.length}/3000</span>
                      </div>
                      <textarea
                        value={form.message}
                        onChange={e => handleChange("message", e.target.value)}
                        placeholder="Tulis pesanmu di sini..."
                        rows={6}
                        maxLength={3000}
                        className={`form-input resize-y ${errors.message ? "error" : ""}`}
                        style={{minHeight: 140}}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div style={{animation:"slideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.45s both"}}>
                      <button
                        onClick={handleSubmit}
                        disabled={status === "sending"}
                        className="btn-brutal w-full border-4 border-[#0B1957] py-4 font-black uppercase text-sm shadow-[4px_4px_0_#0B1957] bg-[#0B1957] text-[#9ECCFA] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "sending" ? (
                          <>
                            <span className="sending-spinner">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{animation:"spin 0.8s linear infinite",display:"block"}}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                            </span>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                            Kirim Pesan
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="border-t-4 border-[#0B1957] bg-[#0B1957] px-8 py-4 flex items-center gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ECCFA" strokeWidth="2.5" strokeLinecap="round" style={{flexShrink:0}}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D1E8FF] opacity-60">
                      Data kamu aman — tidak akan dibagikan ke pihak ketiga
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 flex flex-col gap-5 anim-sidebar">

              <div className="bg-[#0B1957] border-4 border-[#0B1957] shadow-[8px_8px_0_#9ECCFA] px-7 py-6 relative overflow-hidden" style={{animation:"slideRight 0.5s cubic-bezier(0.16,1,0.3,1) 0.35s both"}}>
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10" style={{background:"#9ECCFA",clipPath:"polygon(100% 0,0 0,100% 100%)"}}/>
                <p className="font-black uppercase text-[10px] text-[#9ECCFA] tracking-[0.25em] mb-3">Response Time</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-black text-4xl text-[#9ECCFA]">&lt;24</span>
                  <span className="font-black text-sm text-[#F8F3EA] uppercase">Jam</span>
                </div>
                <p className="font-semibold text-[#D1E8FF] text-sm opacity-70">Biasanya saya membalas dalam waktu kurang dari 24 jam pada hari kerja.</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 rounded-full bg-green-400" style={{animation:"pulse 1.5s ease infinite"}}/>
                  <span className="font-black text-xs text-green-400 uppercase tracking-widest">Open to Work</span>
                </div>
              </div>

              <div style={{animation:"slideRight 0.5s cubic-bezier(0.16,1,0.3,1) 0.45s both"}}>
                <p className="font-black uppercase text-xs text-[#0B1957] tracking-[0.2em] mb-3 opacity-50">Atau hubungi via</p>
                <div className="flex flex-col gap-3">
                  {contacts.length === 0 ? (
                    [0,1,2].map(i => (
                      <div key={i} className="border-4 border-[#0B1957] bg-[#F8F3EA]" style={{height:80,animation:`pulse 1.5s ease ${i*0.1}s infinite`}}/>
                    ))
                  ) : (
                    contacts.map((c, i) => (
                      <a
                        key={c.id}
                        href={c.url}
                        {...(c.platform !== "email" && {
                          target: "_blank",
                          rel: "noopener noreferrer"
                        })}
                        className="contact-link"
                        style={{animationDelay:`${0.5 + i * 0.07}s`}}
                      >
                        <div
                          className="contact-link-icon"
                          style={{ background: c.icon_color || "#0B1957" }}
                        >
                          <PlatformIcon platform={c.platform} size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black uppercase text-[10px] text-[#9ECCFA] tracking-widest mb-0.5">{c.label}</p>
                          <p className="font-black text-[#0B1957] text-sm leading-tight truncate">{c.value}</p>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2.5" strokeLinecap="round" style={{flexShrink:0,opacity:0.3}}>
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[6px_6px_0_#0B1957] overflow-hidden" style={{animation:"slideRight 0.5s cubic-bezier(0.16,1,0.3,1) 0.55s both"}}>
                <div className="bg-[#9ECCFA] border-b-4 border-[#0B1957] px-6 py-4">
                  <p className="font-black uppercase text-xs text-[#0B1957] tracking-[0.15em]">Tips Menghubungi</p>
                </div>
                <div className="px-6 py-5 flex flex-col gap-4">
                  {[
                    {
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>,
                      title: "Project Baru",
                      desc: "Sebutkan scope, timeline, dan budget estimasi kamu."
                    },
                    {
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
                      title: "Kolaborasi",
                      desc: "Ceritakan skill kamu dan bagaimana kita bisa bekerja sama."
                    },
                    {
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
                      title: "Pertanyaan",
                      desc: "Langsung tulis pertanyaanmu, saya senang membantu!"
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="font-black text-xs uppercase text-[#0B1957] mb-0.5 tracking-wide">{item.title}</p>
                        <p className="font-semibold text-xs text-[#0B1957] opacity-55 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t-4 border-[#0B1957] bg-[#F8F3EA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="font-bold uppercase text-xs text-[#0B1957] tracking-widest">© {new Date().getFullYear()} Zaki Yusron Hasyimmi</p>
              <p className="font-bold uppercase text-xs text-[#0B1957] opacity-40 tracking-widest">Built with React + Laravel</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}