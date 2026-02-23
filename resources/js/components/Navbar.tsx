"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-link {
          position: relative; cursor: pointer; padding-bottom: 2px;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0%; height: 2px; background-color: #0B1957;
          transition: width 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover::after { width: 100%; }

        .logo-hover { transition: transform 0.15s ease; display: inline-block; }
        .logo-hover:hover { transform: translate(-2px, -2px); }

        .btn-nav { transition: transform 0.08s ease, box-shadow 0.08s ease; }
        .btn-nav:hover  { transform: translate(2px, 2px);  box-shadow: 1px 1px 0 #0B1957 !important; }
        .btn-nav:active { transform: translate(3px, 3px);  box-shadow: 0   0   0 #0B1957 !important; }

        /* Hamburger lines */
        .ham-line {
          display: block; width: 22px; height: 2px;
          background: #0B1957; transition: all 0.25s ease;
          transform-origin: center;
        }
        .ham-open .ham-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ham-open .ham-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        /* Mobile menu slide */
        .mobile-menu {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-menu.open { max-height: 400px; }

        .mobile-nav-link {
          display: block; padding: 14px 24px;
          font-weight: 800; text-transform: uppercase; font-size: 15px;
          color: #0B1957; border-bottom: 2px solid #0B1957;
          transition: background 0.1s ease, padding-left 0.15s ease;
          letter-spacing: 0.05em;
        }
        .mobile-nav-link:hover { background: #D1E8FF; padding-left: 32px; }
      `}</style>

      <div className="w-full border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[6px_6px_0_#0B1957]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <div className="logo-hover font-black text-xl text-[#0B1957] cursor-pointer">
            Yusron.dev
          </div>

          {/* MENU — desktop */}
          <div className="hidden md:flex gap-8 font-semibold text-[#0B1957]">
            <a className="nav-link">Features</a>
            <a className="nav-link">Projects</a>
            <a className="nav-link">About</a>
            <a className="nav-link">Contact</a>
          </div>

          {/* BUTTONS — desktop */}
          <div className="hidden md:flex gap-3">
            <button className="btn-nav border-4 border-[#0B1957] px-4 py-2 font-bold shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957]">
              Login
            </button>
            <button className="btn-nav border-4 border-[#0B1957] px-4 py-2 font-bold shadow-[3px_3px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957]">
              Get Started
            </button>
          </div>

          {/* HAMBURGER — mobile */}
          <button
            className={`md:hidden flex flex-col gap-[6px] p-2 border-4 border-[#0B1957] shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] btn-nav ${menuOpen ? "ham-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu border-t-4 border-[#0B1957] bg-[#F8F3EA] md:hidden ${menuOpen ? "open" : ""}`}>
          <a className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Features</a>
          <a className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Projects</a>
          <a className="mobile-nav-link" onClick={() => setMenuOpen(false)}>About</a>
          <a className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <div className="flex gap-3 p-4">
            <button className="btn-nav flex-1 border-4 border-[#0B1957] py-3 font-bold shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957] uppercase font-black">
              Login
            </button>
            <button className="btn-nav flex-1 border-4 border-[#0B1957] py-3 font-bold shadow-[3px_3px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957] uppercase font-black">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}