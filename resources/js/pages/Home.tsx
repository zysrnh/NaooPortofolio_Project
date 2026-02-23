"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const interval = 16;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const eased =
        current < steps * 0.7
          ? (current / (steps * 0.7)) * 85
          : 85 + ((current - steps * 0.7) / (steps * 0.3)) * 15;

      setProgress(Math.min(Math.round(eased), 100));

      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => setVisible(true), 50);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

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
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-2 flex-1 border-2 border-[#9ECCFA]"
                style={{ backgroundColor: progress >= (i + 1) * 20 ? "#9ECCFA" : "transparent", transition: "background-color 0.15s ease" }} />
            ))}
          </div>
        </div>
        <style>{`@keyframes shimmer { from { transform: translateX(-200%); } to { transform: translateX(200%); } }`}</style>
      </div>
    );
  }

  const projects = [
    {
      title: "Burger Ordering App",
      desc: "Website restoran burger dengan sistem pemesanan online",
      image: "/profile/Mboy.jpeg",
      stacks: [
        { label: "Laravel", icon: "/Icon/Laravel.jpg" },
        { label: "React", icon: "/Icon/React.jpg" },
      ],
      cls: "anim-card-1",
    },
    {
      title: "Beyblade Leaderboard",
      desc: "Leaderboard turnamen dengan statistik otomatis",
      image: "/profile/Mboy.jpeg",
      stacks: [
        { label: "JavaScript", icon: "/Icon/JavaScript.jpg" },
      ],
      cls: "anim-card-2",
    },
    {
      title: "CV Generator Tool",
      desc: "Generate CV massal dari Excel ke PDF",
      image: "/profile/Mboy.jpeg",
      stacks: [
        { label: "React", icon: "/Icon/React.jpg" },
        { label: "TypeScript", icon: "/Icon/TypeScript.jpg" },
      ],
      cls: "anim-card-3",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }

        .anim-navbar    { animation: slideDown  0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-hero-img  { animation: slideLeft  0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .anim-hero-text { animation: slideRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .anim-title     { animation: slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.3s  both; }
        .anim-card-1    { animation: slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.4s  both; }
        .anim-card-2    { animation: slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.5s  both; }
        .anim-card-3    { animation: slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.6s  both; }
        .anim-about     { animation: slideUp    0.6s cubic-bezier(0.16,1,0.3,1) 0.7s  both; }
        .anim-footer    { animation: slideUp    0.5s cubic-bezier(0.16,1,0.3,1) 0.8s  both; }

        .btn-brutal { transition: transform 0.08s ease, box-shadow 0.08s ease; }
        .btn-brutal:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #0B1957 !important; }
        .btn-brutal:active { transform: translate(4px, 4px); box-shadow: 0px 0px 0 #0B1957 !important; }

        .card-brutal { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .card-brutal:hover { transform: translate(-3px, -3px); box-shadow: 9px 9px 0 #0B1957; }
        .card-brutal:active { transform: translate(0px, 0px); box-shadow: 3px 3px 0 #0B1957; }

        /* Project card image hover zoom */
        .card-brutal:hover .card-img {
          transform: scale(1.05);
        }
        .card-img {
          transition: transform 0.3s ease;
        }

        .photo-wrap {
          position: relative;
          overflow: hidden;
          width: 224px;
          height: 280px;
          border: 4px solid #0B1957;
          box-shadow: 10px 10px 0 #0B1957;
          flex-shrink: 0;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .photo-wrap:hover {
          transform: translate(-3px, -3px);
          box-shadow: 13px 13px 0 #0B1957;
        }
        .photo-wrap img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 160%;
          object-fit: cover;
          object-position: center top;
        }

        /* Stack icon pill */
        .stack-icon {
          display: flex;
          align-items: center;
          gap: 6px;
          border: 2px solid #0B1957;
          padding: 3px 8px 3px 4px;
          background: #D1E8FF;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          color: #0B1957;
          letter-spacing: 0.05em;
        }
        .stack-icon img {
          width: 20px;
          height: 20px;
          object-fit: cover;
          border: 1px solid #0B1957;
          flex-shrink: 0;
        }
      `}</style>

      <div className="min-h-screen bg-[#D1E8FF]" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
        <div className="anim-navbar"><Navbar /></div>

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
          <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0px_0px_#0B1957] flex flex-col md:flex-row overflow-hidden">

            {/* LEFT — Photo */}
            <div className="anim-hero-img md:w-2/5 relative bg-[#9ECCFA] border-b-4 md:border-b-0 md:border-r-4 border-[#0B1957] flex items-center justify-center py-10 px-8 min-h-[320px]">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "repeating-linear-gradient(0deg, #0B1957 0px, #0B1957 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #0B1957 0px, #0B1957 1px, transparent 1px, transparent 32px)",
              }} />
              <div className="photo-wrap">
                <img src="/profile/Mboy.jpeg" alt="Yusron" />
              </div>
            </div>

            {/* RIGHT — Text */}
            <div className="anim-hero-text md:w-3/5 p-10 flex flex-col justify-center relative">
              <span className="absolute top-6 right-8 text-8xl font-black text-[#9ECCFA] select-none leading-none" aria-hidden="true">"</span>
              <h1 className="text-5xl font-black uppercase mb-3 text-[#0B1957]">Yusron</h1>
              <p className="font-bold uppercase mb-5 text-[#9ECCFA] tracking-wider text-sm border-l-4 border-[#9ECCFA] pl-3">
                IT Programmer
              </p>
              <p className="font-semibold text-[#0B1957] text-lg leading-relaxed mb-8 max-w-md">
                Saya membangun aplikasi web modern, dashboard, dan tools internal
                dengan fokus pada UI yang rapi, performa, dan pengalaman pengguna.
              </p>
              <div className="flex gap-4">
                <button className="btn-brutal border-4 border-[#0B1957] px-6 py-3 font-black uppercase shadow-[4px_4px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957]">About</button>
                <button className="btn-brutal border-4 border-[#0B1957] px-6 py-3 font-black uppercase shadow-[4px_4px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957]">Contact</button>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957] anim-title">Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className={`card-brutal bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[6px_6px_0_#0B1957] cursor-pointer overflow-hidden ${p.cls}`}>

                {/* Project thumbnail */}
                <div className="w-full h-44 overflow-hidden border-b-4 border-[#0B1957] relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="card-img w-full h-full object-cover object-top"
                  />
                  {/* Overlay tag top-right */}
                  <div className="absolute top-3 right-3 bg-[#0B1957] text-[#9ECCFA] text-xs font-black uppercase px-2 py-1">
                    Project
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-black uppercase mb-2 text-[#0B1957]">{p.title}</h3>
                  <p className="font-semibold text-sm mb-4 text-[#0B1957]">{p.desc}</p>

                  {/* Stack icons */}
                  <div className="flex flex-wrap gap-2">
                    {p.stacks.map((s, j) => (
                      <div key={j} className="stack-icon">
                        <img src={s.icon} alt={s.label} />
                        {s.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="max-w-6xl mx-auto px-6 pb-20 anim-about">
          <div className="bg-[#0B1957] border-4 border-[#0B1957] p-10 shadow-[10px_10px_0_#9ECCFA]">
            <h2 className="text-2xl font-black uppercase mb-4 text-[#9ECCFA]">About</h2>
            <p className="font-semibold max-w-2xl text-[#D1E8FF]">
              Fokus membuat aplikasi React + Laravel, dashboard, tools internal,
              dan aplikasi berbasis data dengan desain yang konsisten.
            </p>
          </div>
        </section>

        <footer className="text-center pb-10 font-bold uppercase text-[#0B1957] anim-footer">
          © {new Date().getFullYear()} Yusron
        </footer>
      </div>
    </>
  );
}