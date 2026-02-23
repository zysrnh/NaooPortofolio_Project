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
      // Fast start → slow middle → burst finish
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
          {/* Header */}
          <div className="mb-8">
            <p className="text-[#9ECCFA] font-bold uppercase text-sm tracking-[0.3em] mb-2">
              Initializing
            </p>
            <h1 className="text-4xl font-black uppercase text-[#F8F3EA]">
              Yusron.dev
            </h1>
          </div>

          {/* Energy Bar */}
          <div className="border-4 border-[#9ECCFA] shadow-[6px_6px_0_#9ECCFA] p-1 mb-4 bg-[#0B1957]">
            <div
              className="h-8 bg-[#9ECCFA] relative overflow-hidden"
              style={{ width: `${progress}%`, transition: "width 0.016s linear" }}
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 8px, #D1E8FF 8px, #D1E8FF 16px)",
                  animation: "shimmer 0.4s linear infinite",
                }}
              />
            </div>
          </div>

          {/* Progress info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-[#D1E8FF] font-black text-2xl tabular-nums">
              {progress}%
            </p>
            <p className="text-[#9ECCFA] font-bold uppercase text-xs tracking-widest">
              {progress < 30
                ? "Loading assets..."
                : progress < 60
                ? "Building UI..."
                : progress < 90
                ? "Almost there..."
                : "Ready!"}
            </p>
          </div>

          {/* Block indicators */}
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-2 flex-1 border-2 border-[#9ECCFA]"
                style={{
                  backgroundColor: progress >= (i + 1) * 20 ? "#9ECCFA" : "transparent",
                  transition: "background-color 0.15s ease",
                }}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            from { transform: translateX(-200%); }
            to { transform: translateX(200%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .anim-navbar   { animation: slideDown 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-hero     { animation: slideUp  0.6s cubic-bezier(0.16,1,0.3,1) 0.1s  both; }
        .anim-title    { animation: slideUp  0.5s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .anim-card-1   { animation: slideUp  0.5s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .anim-card-2   { animation: slideUp  0.5s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .anim-card-3   { animation: slideUp  0.5s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .anim-about    { animation: slideUp  0.6s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .anim-footer   { animation: slideUp  0.5s cubic-bezier(0.16,1,0.3,1) 0.75s both; }

        /* Button press effect */
        .btn-brutal {
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }
        .btn-brutal:hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #0B1957 !important;
        }
        .btn-brutal:active {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0 #0B1957 !important;
        }

        /* Card lift effect */
        .card-brutal {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .card-brutal:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0 #0B1957;
        }
        .card-brutal:active {
          transform: translate(0px, 0px);
          box-shadow: 3px 3px 0 #0B1957;
        }
      `}</style>

      <div
        className="min-h-screen bg-[#D1E8FF]"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div className="anim-navbar">
          <Navbar />
        </div>

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 anim-hero">
          <div className="bg-[#F8F3EA] border-4 border-[#0B1957] p-12 shadow-[10px_10px_0px_0px_#0B1957]">
            <h1 className="text-5xl font-black uppercase mb-4 text-[#0B1957]">
              Yusron
            </h1>
            <p className="font-bold uppercase mb-6 text-[#0B1957]">
              Frontend Developer • React • Laravel
            </p>
            <p className="max-w-xl font-semibold text-[#0B1957]">
              Saya membangun aplikasi web modern, dashboard, dan tools internal
              dengan fokus pada UI yang rapi, performa, dan pengalaman pengguna.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="btn-brutal border-4 border-[#0B1957] px-6 py-3 font-black uppercase shadow-[4px_4px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957]">
                Projects
              </button>
              <button className="btn-brutal border-4 border-[#0B1957] px-6 py-3 font-black uppercase shadow-[4px_4px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957]">
                Contact
              </button>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957] anim-title">
            Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Burger Ordering App",
                desc: "Website restoran burger dengan sistem pemesanan online",
                stack: "Laravel • React",
                cls: "anim-card-1",
              },
              {
                title: "Beyblade Leaderboard",
                desc: "Leaderboard turnamen dengan statistik otomatis",
                stack: "JavaScript",
                cls: "anim-card-2",
              },
              {
                title: "CV Generator Tool",
                desc: "Generate CV massal dari Excel ke PDF",
                stack: "React • XLSX",
                cls: "anim-card-3",
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`card-brutal bg-[#F8F3EA] border-4 border-[#0B1957] p-6 shadow-[6px_6px_0_#0B1957] cursor-pointer ${p.cls}`}
              >
                <h3 className="font-black uppercase mb-2 text-[#0B1957]">{p.title}</h3>
                <p className="font-semibold text-sm mb-4 text-[#0B1957]">{p.desc}</p>
                <span className="text-xs font-bold uppercase bg-[#9ECCFA] border-2 border-[#0B1957] px-2 py-1 text-[#0B1957]">
                  {p.stack}
                </span>
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