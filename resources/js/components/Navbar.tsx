"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home",     href: "hero" },
  { label: "Projects", href: "projects" },
  { label: "About",    href: "about" },
  { label: "Contact",  href: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  // Highlight active section on scroll
  useEffect(() => {
    const handler = () => {
      const sections = navLinks.map(l => document.getElementById(l.href));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navLinks[i].href);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{`
        .nav-link {
          position: relative; cursor: pointer; padding-bottom: 2px;
          transition: color 0.15s ease;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0%; height: 2px; background-color: #0B1957;
          transition: width 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #0B1957; font-weight: 900; }

        .logo-hover { transition: transform 0.15s ease; display: inline-block; }
        .logo-hover:hover { transform: translate(-2px, -2px); }

        .btn-nav { transition: transform 0.08s ease, box-shadow 0.08s ease; }
        .btn-nav:hover  { transform: translate(2px, 2px);  box-shadow: 1px 1px 0 #0B1957 !important; }
        .btn-nav:active { transform: translate(3px, 3px);  box-shadow: 0   0   0 #0B1957 !important; }

        .ham-line { display: block; width: 22px; height: 2px; background: #0B1957; transition: all 0.25s ease; transform-origin: center; }
        .ham-open .ham-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ham-open .ham-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        .mobile-menu { max-height: 0; overflow: hidden; transition: max-height 0.35s cubic-bezier(0.16,1,0.3,1); }
        .mobile-menu.open { max-height: 400px; }

        .mobile-nav-link {
          display: block; padding: 14px 24px;
          font-weight: 800; text-transform: uppercase; font-size: 15px;
          color: #0B1957; border-bottom: 2px solid #0B1957;
          transition: background 0.1s ease, padding-left 0.15s ease;
          letter-spacing: 0.05em; cursor: pointer;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active { background: #D1E8FF; padding-left: 32px; }
        .mobile-nav-link.active { border-left: 4px solid #0B1957; }
      `}</style>

      <div className="w-full border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[6px_6px_0_#0B1957] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <div className="logo-hover font-black text-xl text-[#0B1957] cursor-pointer" onClick={() => scrollTo("hero")}>
            Yusron.dev
          </div>

          {/* MENU — desktop */}
          <div className="hidden md:flex gap-8 font-semibold text-[#0B1957]">
            {navLinks.map(link => (
              <a key={link.href} onClick={() => scrollTo(link.href)}
                className={`nav-link ${activeSection === link.href ? "active" : ""}`}>
                {link.label}
              </a>
            ))}
          </div>

          {/* BUTTONS — desktop */}
          <div className="hidden md:flex gap-3">
            <button className="btn-nav border-4 border-[#0B1957] px-4 py-2 font-bold shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957]">Login</button>
            <button className="btn-nav border-4 border-[#0B1957] px-4 py-2 font-bold shadow-[3px_3px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957]">Get Started</button>
          </div>

          {/* HAMBURGER — mobile */}
          <button
            className={`md:hidden flex flex-col gap-[6px] p-2 border-4 border-[#0B1957] shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] btn-nav ${menuOpen ? "ham-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu border-t-4 border-[#0B1957] bg-[#F8F3EA] md:hidden ${menuOpen ? "open" : ""}`}>
          {navLinks.map(link => (
            <a key={link.href} onClick={() => scrollTo(link.href)}
              className={`mobile-nav-link ${activeSection === link.href ? "active" : ""}`}>
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 p-4">
            <button className="btn-nav flex-1 border-4 border-[#0B1957] py-3 font-black shadow-[3px_3px_0_#0B1957] bg-[#F8F3EA] text-[#0B1957] uppercase text-sm">Login</button>
            <button className="btn-nav flex-1 border-4 border-[#0B1957] py-3 font-black shadow-[3px_3px_0_#0B1957] bg-[#9ECCFA] text-[#0B1957] uppercase text-sm">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}