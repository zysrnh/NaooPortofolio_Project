import { useState, useEffect, FormEvent } from "react";
import { router } from "@inertiajs/react";

// SVG Icons
const IconWarning = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IconKey = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B1957" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

export default function Login() {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [errors, setErrors]   = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const newErrors: typeof errors = {};
    if (!form.email)    newErrors.email    = "Email wajib diisi!";
    if (!form.password) newErrors.password = "Password wajib diisi!";
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setErrors({});
    setLoading(true);

    let p = 0;
    const bar = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 85) { clearInterval(bar); setProgress(85); }
      else setProgress(Math.round(p));
    }, 80);

    router.post("/login", { email: form.email, password: form.password }, {
      onError: (errs) => {
        clearInterval(bar);
        setLoading(false);
        setProgress(0);
        setErrors({ general: errs.email || errs.password || "Email atau password salah!" });
      },
      onSuccess: () => { setProgress(100); },
    });
  };

  return (
    <>
      <style>{`
        @keyframes slideUp   { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shake     { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        @keyframes shimmer   { from{transform:translateX(-200%)} to{transform:translateX(200%)} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        .anim-logo { animation:slideDown 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-card { animation:slideUp   0.65s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .anim-foot { animation:slideUp   0.5s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .deco-a    { animation:float 4s ease-in-out 0s infinite; }
        .deco-b    { animation:float 4s ease-in-out 1.2s infinite; }
        .deco-c    { animation:float 4s ease-in-out 2.4s infinite; }

        .grid-bg {
          position:fixed; inset:0; pointer-events:none;
          background-image:
            repeating-linear-gradient(0deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 48px),
            repeating-linear-gradient(90deg,#0B1957 0,#0B1957 1px,transparent 1px,transparent 48px);
          opacity:0.05;
        }

        .input-brutal {
          width:100%; border:4px solid #0B1957; padding:12px 16px;
          font-weight:800; font-size:15px; color:#0B1957;
          background:#F8F3EA; outline:none; font-family:inherit;
          transition:box-shadow 0.15s ease, transform 0.12s ease, background 0.15s ease;
        }
        .input-brutal:focus { box-shadow:4px 4px 0 #0B1957; transform:translate(-2px,-2px); background:#fff; }
        .input-brutal.has-err { background:#FFE8E8; }
        .input-brutal::placeholder { color:#0B195555; font-weight:600; }

        .btn-submit {
          width:100%; border:4px solid #0B1957; padding:14px;
          font-weight:900; font-size:15px; text-transform:uppercase; letter-spacing:0.1em;
          cursor:pointer; background:#0B1957; color:#9ECCFA;
          box-shadow:6px 6px 0 #9ECCFA;
          transition:transform 0.08s ease, box-shadow 0.08s ease;
          font-family:inherit;
        }
        .btn-submit:hover:not(:disabled)  { transform:translate(2px,2px);  box-shadow:4px 4px 0 #9ECCFA; }
        .btn-submit:active:not(:disabled) { transform:translate(5px,5px);  box-shadow:1px 1px 0 #9ECCFA; }
        .btn-submit:disabled { opacity:0.7; cursor:not-allowed; }

        .show-btn {
          display:flex; align-items:center; gap:5px;
          border:2px solid #0B1957; background:#D1E8FF; padding:4px 10px;
          font-size:11px; font-weight:800; text-transform:uppercase; color:#0B1957;
          cursor:pointer; letter-spacing:0.05em; font-family:inherit;
          transition:background 0.1s ease, transform 0.08s ease, box-shadow 0.08s ease;
        }
        .show-btn:hover { background:#9ECCFA; transform:translate(-1px,-1px); box-shadow:2px 2px 0 #0B1957; }

        .err-shake { animation:shake 0.4s ease; }
        .field-err {
          display:inline-block; margin-top:5px;
          font-size:11px; font-weight:800; color:#0B1957; text-transform:uppercase; letter-spacing:0.05em;
          background:#FFD1D1; border:2px solid #0B1957; padding:2px 8px;
        }

        .progress-wrap { height:4px; background:#D1E8FF; }
        .progress-fill {
          height:100%; background:#9ECCFA; position:relative; overflow:hidden;
          transition:width 0.1s linear;
        }
        .progress-fill::after {
          content:''; position:absolute; inset:0;
          background:repeating-linear-gradient(90deg,transparent,transparent 8px,rgba(255,255,255,0.4) 8px,rgba(255,255,255,0.4) 16px);
          animation:shimmer 0.5s linear infinite;
        }
      `}</style>

      <div
        className="min-h-screen bg-[#D1E8FF] flex flex-col items-center justify-center px-4 relative overflow-hidden"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
      >
        <div className="grid-bg" />

        {/* Floating decorative blocks */}
        <div className="deco-a absolute top-10 left-8 w-16 h-16 border-4 border-[#0B1957] bg-[#9ECCFA] shadow-[4px_4px_0_#0B1957] hidden md:block" />
        <div className="deco-b absolute bottom-16 right-10 w-10 h-10 border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[4px_4px_0_#0B1957] hidden md:block" />
        <div className="deco-c absolute top-1/3 right-14 w-7 h-7 border-4 border-[#0B1957] bg-[#0B1957] hidden md:block" />
        <div className="deco-a absolute bottom-28 left-16 w-5 h-5 border-4 border-[#0B1957] bg-[#9ECCFA] hidden md:block" />

        {/* LOGO */}
        <div className="anim-logo mb-8 z-10">
          <div className="border-4 border-[#0B1957] bg-[#0B1957] px-6 py-3 shadow-[6px_6px_0_#9ECCFA]">
            <span className="font-black text-2xl text-[#9ECCFA] uppercase tracking-widest">Yusron.dev</span>
          </div>
        </div>

        {/* CARD */}
        <div className="anim-card w-full max-w-md bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden z-10">

          {/* Header */}
          <div className="bg-[#0B1957] px-8 py-6">
            <p className="text-[#9ECCFA] font-black uppercase text-xs tracking-[0.3em] mb-1">Welcome Back</p>
            <h1 className="text-3xl font-black uppercase text-[#F8F3EA]">Login</h1>
          </div>

          {/* Progress bar */}
          <div className="progress-wrap">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">

            {/* General error */}
            {errors.general && (
              <div className="err-shake border-4 border-[#0B1957] bg-[#FFD1D1] p-4 flex items-center gap-3">
                <IconWarning />
                <p className="font-black text-[#0B1957] text-sm uppercase tracking-wide">{errors.general}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="font-black uppercase text-xs tracking-widest text-[#0B1957] block mb-2">Email</label>
              <input
                className={`input-brutal ${errors.email ? "has-err" : ""}`}
                type="email"
                placeholder="Masukkan email..."
                value={form.email}
                onChange={e => { setForm({ ...form, email: e.target.value }); setErrors(p => ({ ...p, email: undefined })); }}
                disabled={loading}
                autoComplete="email"
              />
              {errors.email && <span className="field-err">{errors.email}</span>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-black uppercase text-xs tracking-widest text-[#0B1957]">Password</label>
                <button type="button" className="show-btn" onClick={() => setShowPass(s => !s)}>
                  {showPass ? <IconEyeOff /> : <IconEye />}
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              <input
                className={`input-brutal ${errors.password ? "has-err" : ""}`}
                type={showPass ? "text" : "password"}
                placeholder="Masukkan password..."
                value={form.password}
                onChange={e => { setForm({ ...form, password: e.target.value }); setErrors(p => ({ ...p, password: undefined })); }}
                disabled={loading}
                autoComplete="current-password"
              />
              {errors.password && <span className="field-err">{errors.password}</span>}
            </div>

            {/* Submit */}
            <button type="submit" className="btn-submit mt-1" disabled={loading}>
              {loading ? "Authenticating..." : "Login →"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[3px] bg-[#0B1957]" />
              <span className="font-black text-xs text-[#0B1957] uppercase tracking-widest">Demo</span>
              <div className="flex-1 h-[3px] bg-[#0B1957]" />
            </div>

            {/* Seeded account hint */}
            <div className="p-4" style={{ border: "3px solid #0B1957", background: "#D1E8FF", boxShadow: "4px 4px 0 #0B1957" }}>
              <div className="flex items-center gap-2 mb-3">
                <IconKey />
                <p className="font-black uppercase text-xs text-[#0B1957] tracking-widest">Seeded Account</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Email",    value: "yusron@dev.com" },
                  { label: "Password", value: "password" },
                ].map((item, i) => (
                  <div key={i} className="border-2 border-[#0B1957] bg-[#F8F3EA] p-2">
                    <p className="font-black text-xs uppercase text-[#9ECCFA] tracking-wider">{item.label}</p>
                    <p className="font-black text-sm text-[#0B1957]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* Bottom strip */}
          <div className="h-3 bg-[#9ECCFA] border-t-4 border-[#0B1957]" />
        </div>

        <p className="anim-foot mt-6 font-bold text-xs text-[#0B1957] uppercase tracking-widest opacity-50 z-10">
          © {new Date().getFullYear()} Zaki Yusron Hasyimmi
        </p>
      </div>
    </>
  );
}