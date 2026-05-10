import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home",     href: "hero" },
  { label: "Projects", href: "projects" },
  { label: "About",    href: "about" },
  { label: "Contact",  href: "contact" },
];

export default function Navbar() {
  const { auth } = usePage<{ auth: { user: { name: string } | null } }>().props;
  const isLoggedIn = !!auth?.user;

  const currentUrl = typeof window !== "undefined" ? window.location.pathname : "";
  const isHome = currentUrl === "/" || currentUrl === "";
  const isContactPage = currentUrl === "/contact";
  const isAboutPage = currentUrl === "/about";

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavLink = (href: string) => {
    setMenuOpen(false);

    // "Projects" selalu ke halaman /projects
    if (href === "projects") {
      router.visit("/projects");
      return;
    }

    // "Contact" selalu ke halaman /contact
    if (href === "contact") {
      router.visit("/contact");
      return;
    }

    // "About" selalu ke halaman /about
    if (href === "about") {
      router.visit("/about");
      return;
    }

    // "Home" selalu ke /
    if (href === "hero") {
      if (isHome) {
        scrollToSection("hero");
      } else {
        router.visit("/");
      }
      return;
    }

    // Fallback
    if (isHome) {
      scrollToSection(href);
    } else {
      sessionStorage.setItem("scrollTo", href);
      router.visit("/");
    }
  };

  const handlePrimaryBtn = () => {
    setMenuOpen(false);
    if (isLoggedIn) {
      router.visit("/dashboard");
    } else {
      router.visit("/login");
    }
  };

  const handleContactBtn = () => {
    setMenuOpen(false);
    router.visit("/contact");
  };

  // Scroll ke section setelah balik ke home dari halaman lain
  useEffect(() => {
    if (!isHome) return;
    const target = sessionStorage.getItem("scrollTo");
    if (target) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => scrollToSection(target), 300);
    }
  }, [isHome]);

  // Active section detection (hanya di home)
  useEffect(() => {
    if (!isHome) return;
    const handler = () => {
      const scrollY = window.scrollY + 100;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].href);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navLinks[i].href);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  const getActiveLink = (href: string) => {
    if (href === "projects") return currentUrl.startsWith("/projects");
    if (href === "contact")  return isContactPage;
    if (href === "about")    return isAboutPage;
    if (isHome) return activeSection === href;
    return false;
  };

  return (
    <>
      <style>{`
        .nav-link {
          position: relative; cursor: pointer; padding-bottom: 2px;
          transition: color 0.15s ease;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0%; height: 2px; background-color: var(--nb-primary);
          transition: width 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link.active { color: var(--nb-primary); font-weight: 900; }

        .logo-hover { transition: transform 0.15s ease; display: inline-block; }
        .logo-hover:hover { transform: translate(-2px, -2px); }

        .btn-nav { transition: transform 0.08s ease, box-shadow 0.08s ease; }
        .btn-nav:hover  { transform: translate(2px, 2px);  box-shadow: 1px 1px 0 var(--nb-primary) !important; }
        .btn-nav:active { transform: translate(3px, 3px);  box-shadow: 0   0   0 var(--nb-primary) !important; }

        .ham-line { display: block; width: 22px; height: 2px; background: var(--nb-primary); transition: all 0.25s ease; transform-origin: center; }
        .ham-open .ham-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ham-open .ham-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        .mobile-menu { max-height: 0; overflow: hidden; transition: max-height 0.35s cubic-bezier(0.16,1,0.3,1); }
        .mobile-menu.open { max-height: 400px; }

        .mobile-nav-link {
          display: block; padding: 14px 24px;
          font-weight: 800; text-transform: uppercase; font-size: 15px;
          color: var(--nb-primary); border-bottom: 2px solid var(--nb-primary);
          transition: background 0.1s ease, padding-left 0.15s ease;
          letter-spacing: 0.05em; cursor: pointer;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active { background: var(--nb-accent-light); padding-left: 32px; }
        .mobile-nav-link.active { border-left: 4px solid var(--nb-primary); }
      `}</style>

      <div className="w-full border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[6px_6px_0_var(--nb-primary)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

          <div className="logo-hover font-black text-xl text-[var(--nb-primary)] cursor-pointer" onClick={() => router.visit("/")}>
            Zyrsnh
          </div>

          <div className="hidden md:flex gap-8 font-semibold text-[var(--nb-primary)]">
            {navLinks.map(link => (
              <a key={link.href} onClick={() => handleNavLink(link.href)}
                className={`nav-link ${getActiveLink(link.href) ? "active" : ""}`}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex gap-3">
            <button onClick={handlePrimaryBtn}
              className="btn-nav border-4 border-[var(--nb-primary)] px-4 py-2 font-bold shadow-[3px_3px_0_var(--nb-primary)] bg-[var(--nb-bg)] text-[var(--nb-primary)]">
              {isLoggedIn ? "Dashboard" : "Login"}
            </button>
            <button onClick={handleContactBtn}
              className="btn-nav border-4 border-[var(--nb-primary)] px-4 py-2 font-bold shadow-[3px_3px_0_var(--nb-primary)] bg-[var(--nb-accent)] text-[var(--nb-primary)]">
              Contact Me
            </button>
          </div>

          <button
            className={`md:hidden flex flex-col gap-[6px] p-2 border-4 border-[var(--nb-primary)] shadow-[3px_3px_0_var(--nb-primary)] bg-[var(--nb-bg)] btn-nav ${menuOpen ? "ham-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>

        <div className={`mobile-menu border-t-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] md:hidden ${menuOpen ? "open" : ""}`}>
          {navLinks.map(link => (
            <a key={link.href} onClick={() => handleNavLink(link.href)}
              className={`mobile-nav-link ${getActiveLink(link.href) ? "active" : ""}`}>
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 p-4">
            <button onClick={handlePrimaryBtn}
              className="btn-nav flex-1 border-4 border-[var(--nb-primary)] py-3 font-black shadow-[3px_3px_0_var(--nb-primary)] bg-[var(--nb-bg)] text-[var(--nb-primary)] uppercase text-sm">
              {isLoggedIn ? "Dashboard" : "Login"}
            </button>
            <button onClick={handleContactBtn}
              className="btn-nav flex-1 border-4 border-[var(--nb-primary)] py-3 font-black shadow-[3px_3px_0_var(--nb-primary)] bg-[var(--nb-accent)] text-[var(--nb-primary)] uppercase text-sm">
              Contact Me
            </button>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
