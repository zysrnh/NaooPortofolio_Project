import { useState, useEffect, FormEvent } from "react";
import { router, Head } from "@inertiajs/react";

// SVG Icons
const IconWarning = () => ( 
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
); 
const IconEyeOff = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function Register() {
  const [form, setForm]       = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [errors, setErrors]   = useState<{ name?: string; email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    setErrors({});
    setLoading(true);

    let p = 0;
    const bar = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 85) { clearInterval(bar); setProgress(85); }
      else setProgress(Math.round(p));
    }, 80);

    router.post("/register", form, {
      onError: (errs) => {
        clearInterval(bar);
        setLoading(false);
        setProgress(0);
        setErrors(errs as any);
      },
      onSuccess: () => { setProgress(100); },
    });
  };

  return (
    <>
      <Head title="Register - Create Account" />
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

        .grid-bg {
          position:fixed; inset:0; pointer-events:none;
          background-image:
            repeating-linear-gradient(0deg,var(--nb-primary) 0,var(--nb-primary) 1px,transparent 1px,transparent 48px),
            repeating-linear-gradient(90deg,var(--nb-primary) 0,var(--nb-primary) 1px,transparent 1px,transparent 48px);
          opacity:0.05;
        }

        .input-brutal {
          width:100%; border:4px solid var(--nb-primary); padding:12px 16px;
          font-weight:800; font-size:14px; color:var(--nb-primary);
          background:var(--nb-bg); outline:none; font-family:inherit;
          transition:box-shadow 0.15s ease, transform 0.12s ease, background 0.15s ease;
        }
        .input-brutal:focus { box-shadow:4px 4px 0 var(--nb-primary); transform:translate(-2px,-2px); background:#fff; }
        .input-brutal.has-err { background:#FFE8E8; }
        .input-brutal::placeholder { color:var(--nb-primary); opacity:0.3; font-weight:600; }

        .btn-submit {
          width:100%; border:4px solid var(--nb-primary); padding:14px;
          font-weight:900; font-size:15px; text-transform:uppercase; letter-spacing:0.1em;
          cursor:pointer; background:var(--nb-primary); color:var(--nb-accent);
          box-shadow:6px 6px 0 var(--nb-accent);
          transition:transform 0.08s ease, box-shadow 0.08s ease;
          font-family:inherit;
        }
        .btn-submit:hover:not(:disabled)  { transform:translate(2px,2px);  box-shadow:4px 4px 0 var(--nb-accent); }
        .btn-submit:active:not(:disabled) { transform:translate(5px,5px);  box-shadow:1px 1px 0 var(--nb-accent); }
        .btn-submit:disabled { opacity:0.7; cursor:not-allowed; }

        .show-btn {
          display:flex; align-items:center; gap:5px;
          border:2px solid var(--nb-primary); background:var(--nb-accent-light); padding:4px 10px;
          font-size:10px; font-weight:800; text-transform:uppercase; color:var(--nb-primary);
          cursor:pointer; letter-spacing:0.05em; font-family:inherit;
        }

        .err-shake { animation:shake 0.4s ease; }
        .field-err {
          display:inline-block; margin-top:5px;
          font-size:10px; font-weight:800; color:var(--nb-primary); text-transform:uppercase;
          background:#FFD1D1; border:2px solid var(--nb-primary); padding:2px 8px;
        }

        .progress-wrap { height:4px; background:var(--nb-accent-light); }
        .progress-fill {
          height:100%; background:var(--nb-accent); position:relative; overflow:hidden;
          transition:width 0.1s linear;
        }
      `}</style>

      <div
        className="min-h-screen bg-[var(--nb-accent-light)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
      >
        <div className="grid-bg" />

        {/* LOGO */}
        <div className="anim-logo mb-8 z-10">
          <div 
            onClick={() => router.visit('/')}
            className="cursor-pointer border-4 border-[var(--nb-primary)] bg-[var(--nb-primary)] px-6 py-3 shadow-[6px_6px_0_var(--nb-accent)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:translate-x-2 active:translate-y-2"
          >
            <span className="font-black text-2xl text-[var(--nb-accent)] uppercase tracking-widest">ZYSRNH</span>
          </div>
        </div>

        {/* CARD */}
        <div className="anim-card w-full max-w-md bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] overflow-hidden z-10">

          {/* Header */}
          <div className="bg-[var(--nb-primary)] px-8 py-6">
            <p className="text-[var(--nb-accent)] font-black uppercase text-xs tracking-[0.3em] mb-1">Create Account</p>
            <h1 className="text-3xl font-black uppercase text-[var(--nb-bg)]">Register</h1>
          </div>

          <div className="progress-wrap">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">

            {/* Name */}
            <div>
              <label className="font-black uppercase text-[10px] tracking-widest text-[var(--nb-primary)] block mb-1.5">Full Name</label>
              <input
                className={`input-brutal ${errors.name ? "has-err" : ""}`}
                type="text"
                placeholder="Nama lengkap..."
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                disabled={loading}
              />
              {errors.name && <span className="field-err">{errors.name}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="font-black uppercase text-[10px] tracking-widest text-[var(--nb-primary)] block mb-1.5">Email Address</label>
              <input
                className={`input-brutal ${errors.email ? "has-err" : ""}`}
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                disabled={loading}
              />
              {errors.email && <span className="field-err">{errors.email}</span>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-black uppercase text-[10px] tracking-widest text-[var(--nb-primary)]">Password</label>
                <button type="button" className="show-btn" onClick={() => setShowPass(s => !s)}>
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              <input
                className={`input-brutal ${errors.password ? "has-err" : ""}`}
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                disabled={loading}
              />
              {errors.password && <span className="field-err">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="font-black uppercase text-[10px] tracking-widest text-[var(--nb-primary)] block mb-1.5">Confirm Password</label>
              <input
                className="input-brutal"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password_confirmation}
                onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn-submit mt-2" disabled={loading}>
              {loading ? "Creating account..." : "Register →"}
            </button>

            <div className="mt-2 text-center border-t-2 border-dashed border-[var(--nb-primary)] pt-4 opacity-70">
              <p className="font-bold text-[10px] uppercase text-[var(--nb-primary)] mb-2">Sudah punya akun?</p>
              <button 
                type="button"
                onClick={() => router.visit('/login')}
                className="font-black text-xs uppercase text-[var(--nb-primary)] border-b-2 border-[var(--nb-primary)] hover:text-[var(--nb-accent)] hover:border-[var(--nb-accent)] transition-all"
              >
                Kembali ke Login
              </button>
            </div>
          </form>

          <div className="h-3 bg-[var(--nb-accent)] border-t-4 border-[var(--nb-primary)]" />
        </div>
      </div>
    </>
  );
}
