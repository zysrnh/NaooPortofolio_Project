import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import HomeVersionSwitcher from "@/components/HomeVersionSwitcher";
import { useVisitorTracker } from "@/hooks/useVisitorTracker";

// ── Types ──────────────────────────────────────────────────────────────────────
interface HeroProfile {
  name: string;
  title: string;
  bio: string;
  photo: string | null;
  photo2?: string | null;
}

interface ProjectItem {
  id: number;
  slug?: string;
  title: string;
  desc?: string;
  category?: string;
  image?: string;
  images?: string[];
  status?: string;
}

interface ContactItem {
  id: number;
  type: string;
  label: string;
  value: string;
  url?: string;
}

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  description: string;
  type: string;
}

export default function HomeV2() {
  useVisitorTracker("/v2");

  const [hero, setHero] = useState<HeroProfile>({
    name: "RAYHAN ADITYA",
    title: "WEB DESIGNER & UI/UX CREATOR",
    bio: "I design and build stylish, user-focused web experiences that combine creativity with strategy. Passionate about clean design, smooth interactions, and details that make a difference.",
    photo: null,
  });

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Fetch Hero Profile
    fetch("/api/hero")
      .then((r) => r.json())
      .then((d) => {
        if (d && (d.name || d.photo)) {
          setHero((prev) => ({
            ...prev,
            name: d.name?.toUpperCase() || prev.name,
            title: d.title?.toUpperCase() || prev.title,
            bio: d.bio || prev.bio,
            photo: d.photo || prev.photo,
          }));
        }
      })
      .catch(() => {});

    // Fetch Projects
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) {
          setProjects(d);
        }
      })
      .catch(() => {});

    // Fetch Contacts
    fetch("/api/contact/visible")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) {
          setContacts(d);
        }
      })
      .catch(() => {});

    // Fetch Experiences / Education
    fetch("/api/about/experiences")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setExperiences(d);
        }
      })
      .catch(() => {});

    // Scroll listener for back to top
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Default Fallback Projects matching the luxury reference
  const showcaseProjects = [
    {
      num: "01",
      title: projects[0]?.title || "VELOCE BIKES",
      category: projects[0]?.desc || "E-COMMERCE WEBSITE",
      image:
        projects[0]?.images?.[0] ||
        projects[0]?.image ||
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80",
      slug: projects[0]?.slug,
    },
    {
      num: "02",
      title: projects[1]?.title || "WOODCRAFT",
      category: projects[1]?.desc || "FURNITURE WEBSITE",
      image:
        projects[1]?.images?.[0] ||
        projects[1]?.image ||
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
      slug: projects[1]?.slug,
    },
    {
      num: "03",
      title: projects[2]?.title || "URBANIC",
      category: projects[2]?.desc || "FASHION MAGAZINE",
      image:
        projects[2]?.images?.[0] ||
        projects[2]?.image ||
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
      slug: projects[2]?.slug,
    },
  ];

  // Work Process 5 Steps
  const workProcessSteps = [
    {
      num: "01",
      title: "DISCOVER",
      desc: "Understanding goals, audience, and project requirements.",
      icon: (
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "IDEATE",
      desc: "Planning, wireframing, and creating the right concept.",
      icon: (
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "DESIGN",
      desc: "Crafting visual design with a focus on user experience.",
      icon: (
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "DEVELOP",
      desc: "Building fast, responsive, and high-performing websites.",
      icon: (
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      num: "05",
      title: "DELIVER",
      desc: "Testing, optimizing, and launching with perfection.",
      icon: (
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
  ];

  // Skills Pills
  const skillPills = [
    "WEB DESIGN",
    "UI/UX DESIGN",
    "FIGMA",
    "FRAMER",
    "LARAVEL",
    "REACT.JS",
    "TYPESCRIPT",
    "TAILWIND CSS",
    "NEXT.JS",
    "INERTIA.JS",
    "REST API",
    "GIT & CI/CD",
  ];

  const emailContact = contacts.find((c) => c.type === "email")?.value || "hello@rayhanaditya.com";
  const phoneContact = contacts.find((c) => c.type === "phone" || c.type === "whatsapp")?.value || "+62 812 3456 7890";
  const webContact = contacts.find((c) => c.type === "website")?.value || "www.rayhanaditya.com";
  const locationContact = contacts.find((c) => c.type === "location" || c.type === "address")?.value || "Jakarta, Indonesia";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#e5e5e7] selection:bg-red-600 selection:text-white font-sans overflow-x-hidden relative">
      <Head>
        <title>Portfolio - {hero.name} | Editorial Dark Version</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .font-condensed { font-family: 'Anton', 'Impact', sans-serif; }
          .font-cursive { font-family: 'Caveat', cursive; }
          .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }

          /* Red glow spotlight effects */
          .glow-red {
            box-shadow: 0 0 50px rgba(220, 38, 38, 0.15);
          }
          .text-stroke-red {
            -webkit-text-stroke: 1px rgba(220, 38, 38, 0.4);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #27272a;
            border-radius: 3px;
          }
        `}</style>
      </Head>

      {/* Floating Version Switcher */}
      <HomeVersionSwitcher variant="floating" />

      {/* Navbar Container */}
      <div className="sticky top-0 z-[99999] backdrop-blur-md bg-[#070709]/80 border-b border-white/5">
        <Navbar />
      </div>

      {/* ── HERO SECTION ────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 overflow-hidden">
        {/* Ambient Dark Red Gradient Backdrop */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[450px] bg-red-700/10 blur-[140px] pointer-events-none rounded-full"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          {/* Top Bar inside Hero */}
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 mb-6 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-ping" />
              <span className="text-white/80">{hero.title || "WEB DESIGNER / DIGITAL CREATOR"}</span>
            </div>
            <div className="flex items-center gap-2 text-red-500 font-extrabold">
              <span className="text-sm">✦</span>
              <span>AVAILABLE FOR FREELANCE</span>
            </div>
          </div>

          {/* Massive Giant Background PORTFOLIO typography */}
          <div className="relative w-full flex items-center justify-center select-none pointer-events-none my-2 sm:my-0">
            <h1
              className="font-condensed text-[18vw] sm:text-[16vw] lg:text-[14vw] font-black uppercase tracking-tight text-[#b91c1c]/90 leading-none text-center drop-shadow-[0_4px_30px_rgba(185,28,28,0.2)]"
              style={{ letterSpacing: "-0.02em" }}
            >
              PORTFOLIO
            </h1>
          </div>

          {/* Hero Content Grid (Left Info, Center Model Image, Right Stats) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center -mt-12 sm:-mt-24 lg:-mt-36 relative z-20">
            {/* Left Content (5 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 pt-6 lg:pt-16">
              <p className="font-cursive text-3xl sm:text-4xl text-neutral-300 mb-1 tracking-wide">
                Hello, I'm
              </p>
              <h2 className="font-condensed text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-[0.9] mb-3">
                {hero.name}
              </h2>
              <p className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-red-600 mb-4">
                {hero.title}
              </p>
              <p className="text-sm leading-relaxed text-neutral-400 mb-6 max-w-md font-body">
                {hero.bio}
              </p>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 text-[11px] font-bold uppercase tracking-wider text-neutral-300">
                  <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeWidth="2" />
                  </svg>
                  AVAILABLE WORLDWIDE
                </span>
              </div>
            </div>

            {/* Center Image (4 cols) */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 relative">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] flex items-end justify-center">
                {/* Subtle backlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute -inset-4 bg-red-600/10 blur-2xl rounded-full -z-10" />

                <img
                  src={
                    hero.photo ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={hero.name}
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105 shadow-2xl rounded-sm"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
            </div>

            {/* Right Stats & Tagline (3 cols) */}
            <div className="lg:col-span-3 flex flex-col justify-center order-3 lg:pl-4 space-y-8">
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 text-lg leading-none mt-0.5">✦</span>
                <p className="text-xs sm:text-sm font-semibold text-neutral-300 leading-snug">
                  Turning ideas into powerful digital experiences.
                </p>
              </div>

              {/* Stats Numbers */}
              <div className="space-y-6 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-condensed text-4xl sm:text-5xl font-black text-red-600 tracking-tight">
                    3+
                  </span>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                    YEARS <br /> EXPERIENCE
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-condensed text-4xl sm:text-5xl font-black text-red-600 tracking-tight">
                    {projects.length > 0 ? `${projects.length}+` : "40+"}
                  </span>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                    PROJECTS <br /> COMPLETED
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-condensed text-4xl sm:text-5xl font-black text-red-600 tracking-tight">
                    20+
                  </span>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                    HAPPY <br /> CLIENTS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: SELECTED PROJECTS ────────────────────────────────────────── */}
      <section id="projects" className="py-16 sm:py-20 border-t border-neutral-900 bg-[#08080b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Header with Horizontal Rule */}
          <div className="flex items-center justify-between gap-4 mb-10">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-widest text-white whitespace-nowrap">
              SELECTED PROJECTS
            </h2>
            <div className="h-px bg-neutral-800 flex-1 max-w-2xl hidden md:block" />
            <button
              onClick={() => router.visit("/projects")}
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-red-500 transition-colors whitespace-nowrap"
            >
              <span>VIEW ALL PROJECTS</span>
              <span className="group-hover:translate-x-1 transition-transform">⟶</span>
            </button>
          </div>

          {/* 3 Projects Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {showcaseProjects.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (item.slug) {
                    router.visit(`/projects/${item.slug}`);
                  } else {
                    router.visit("/projects");
                  }
                }}
                className="group cursor-pointer flex flex-col"
              >
                {/* Card Image Container */}
                <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden border border-neutral-800/80 rounded-sm mb-4 transition-all duration-300 group-hover:border-red-600/60 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.2)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Card Meta Footer */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <span className="font-condensed text-xl sm:text-2xl font-black text-red-600">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-white group-hover:text-red-500 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-neutral-500 group-hover:text-red-500 group-hover:translate-x-1 transition-all">
                    ⟶
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: EDUCATION & SKILLS + WORK PROCESS + QUOTE CARD ───────────── */}
      <section className="py-16 sm:py-24 border-t border-neutral-900 bg-[#070709]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* 1. Education & Skills (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
              <div>
                <h3 className="text-base font-black uppercase tracking-widest text-white mb-6">
                  EDUCATION & SKILLS
                </h3>

                {/* Education Subsection */}
                <div className="mb-8">
                  <span className="text-[11px] font-black uppercase tracking-widest text-red-600 block mb-4">
                    EDUCATION
                  </span>
                  <div className="space-y-4">
                    {experiences.length > 0 ? (
                      experiences.slice(0, 2).map((exp) => (
                        <div key={exp.id} className="border-b border-neutral-800/80 pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-neutral-200">
                              {exp.title}
                            </h4>
                            <span className="text-[10px] font-bold text-red-500 whitespace-nowrap">
                              {exp.start_date?.split("-")[0]} - {exp.end_date?.split("-")[0] || "Present"}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">{exp.company}</p>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="border-b border-neutral-800/80 pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-neutral-200">
                              B.Sc. in Visual Communication Design
                            </h4>
                            <span className="text-[10px] font-bold text-red-500 whitespace-nowrap">
                              2018 - 2022
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">Binus University</p>
                        </div>
                        <div className="border-b border-neutral-800/80 pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-neutral-200">
                              UI/UX Design Certification
                            </h4>
                            <span className="text-[10px] font-bold text-red-500 whitespace-nowrap">
                              2023
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">Google Career Certificates</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Skills Subsection */}
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-red-600 block mb-3">
                    SKILLS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skillPills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-neutral-900/90 border border-neutral-800 text-[10px] font-bold tracking-wider uppercase text-neutral-300 hover:border-red-600/50 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Work Process (4 cols) */}
            <div className="lg:col-span-4">
              <h3 className="text-base font-black uppercase tracking-widest text-white mb-6">
                WORK PROCESS
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-6">
                {/* Vertical connecting line */}
                <div className="absolute left-[13px] sm:left-[17px] top-2 bottom-4 w-px bg-red-900/50" />

                {workProcessSteps.map((step) => (
                  <div key={step.num} className="relative flex items-start gap-4">
                    {/* Circle Node */}
                    <div className="absolute -left-[24px] sm:-left-[32px] w-7 h-7 rounded-full bg-[#0a0a0d] border border-red-600/80 flex items-center justify-center shadow-[0_0_10px_rgba(220,38,38,0.3)] z-10">
                      {step.icon}
                    </div>

                    {/* Step Body */}
                    <div className="pt-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-condensed text-xs font-black text-red-500">
                          {step.num}
                        </span>
                        <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider text-white">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 font-body leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Quote Card (4 cols) */}
            <div className="lg:col-span-4">
              <div className="h-full min-h-[380px] bg-gradient-to-b from-[#8b0e1b] to-[#5b0811] p-8 sm:p-10 flex flex-col justify-between border border-red-500/30 rounded-sm relative overflow-hidden shadow-2xl">
                {/* Background Accent watermark */}
                <div
                  className="absolute -right-8 -bottom-8 text-white/5 font-condensed text-[140px] font-black select-none pointer-events-none"
                  aria-hidden="true"
                >
                  RED
                </div>

                {/* Top Quote Icon */}
                <div>
                  <span className="font-serif text-6xl text-red-300/80 leading-none block mb-4">
                    “
                  </span>
                  <p className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight font-body">
                    Good design is not just how it looks, but how it works.
                  </p>
                </div>

                {/* Middle Signature */}
                <div className="my-8">
                  <p className="font-cursive text-4xl sm:text-5xl text-neutral-100 italic">
                    {hero.name.split(" ")[0] || "Rayhan"}
                  </p>
                </div>

                {/* Bottom Call to Action */}
                <div className="pt-4 border-t border-red-400/20 flex items-center justify-between text-xs font-extrabold uppercase tracking-widest text-red-200">
                  <span>LET'S CREATE SOMETHING GREAT TOGETHER.</span>
                  <span className="text-sm">✦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: LET'S WORK TOGETHER / CONTACT ────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-24 border-t border-neutral-900 bg-[#08080b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Contact Details (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-red-500">
                <span className="text-sm">✦</span>
                <span className="text-xs font-black uppercase tracking-widest">GET IN TOUCH</span>
              </div>

              <h2 className="font-condensed text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white leading-none">
                LET'S WORK <br /> TOGETHER
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-body max-w-lg leading-relaxed">
                I'm currently open for new projects and collaborations. Let's create something amazing that drives results.
              </p>

              <div>
                <button
                  onClick={() => router.visit("/contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-200 text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(220,38,38,0.25)]"
                >
                  <span>⟶</span>
                  <span>AVAILABLE FOR FREELANCE</span>
                </button>
              </div>

              {/* Contact Items List */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-red-600/60 bg-red-950/30 flex items-center justify-center text-red-500 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-300 font-body">
                    {emailContact}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-red-600/60 bg-red-950/30 flex items-center justify-center text-red-500 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeWidth="2" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-300 font-body">
                    {webContact}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-red-600/60 bg-red-950/30 flex items-center justify-center text-red-500 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-300 font-body">
                    {phoneContact}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-red-600/60 bg-red-950/30 flex items-center justify-center text-red-500 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-300 font-body">
                    {locationContact}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Laptop & Workspace Mockup (6 cols) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[16/11] bg-neutral-900/60 border border-neutral-800 rounded-lg p-3 sm:p-5 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden group">
                {/* Screen Mockup */}
                <div className="w-full h-full bg-[#0a0a0d] border border-neutral-800/80 rounded flex flex-col overflow-hidden relative">
                  {/* Window Bar */}
                  <div className="h-6 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-neutral-600" />
                    <div className="w-2 h-2 rounded-full bg-neutral-600" />
                    <div className="ml-3 text-[9px] font-mono text-neutral-500">zysrnh-portfolio.dev</div>
                  </div>

                  {/* Inner Screen Content */}
                  <div className="flex-1 p-5 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-600/5 blur-xl pointer-events-none" />
                    <span className="font-condensed text-red-600 text-xs sm:text-sm tracking-widest mb-1">
                      WE DESIGN DIGITAL EXPERIENCES
                    </span>
                    <h3 className="font-condensed text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                      INNOVATE & ELEVATE
                    </h3>
                    <p className="text-[11px] text-neutral-400 max-w-xs mb-4">
                      Clean architecture, high-converting interfaces, and seamless developer experience.
                    </p>
                    <button
                      onClick={() => router.visit("/projects")}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-wider transition-colors rounded-sm"
                    >
                      Explore Works
                    </button>
                  </div>
                </div>

                {/* Ambient Coffee Mug Icon or Details */}
                <div className="absolute bottom-4 right-4 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Version 2.0 Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────────── */}
      <footer className="py-8 border-t border-neutral-900 bg-[#050507] text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {hero.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.visit("/")}
              className="hover:text-red-500 transition-colors uppercase font-bold text-[11px]"
            >
              Switch to V1 (Neobrutalism)
            </button>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors uppercase font-bold text-[11px]"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Back to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[9999] w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
