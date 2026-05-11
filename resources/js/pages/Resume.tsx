import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";

// ── Icons ──────────────────────────────────────────────────────────────────────
const IconPrint = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
  </svg>
);
const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

// ── Types ──────────────────────────────────────────────────────────────────────
interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}
interface TechStack {
  id: number;
  name: string;
  category: string;
}
interface Hero {
  name: string;
  title: string;
  bio: string;
  photo: string | null;
}
interface Contact {
  platform: string;
  label: string;
  value: string;
  url: string;
}

export default function Resume() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [stacks, setStacks] = useState<TechStack[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [h, e, s, c] = await Promise.all([
          fetch("/api/hero").then(r => r.json()),
          fetch("/api/about/experiences").then(r => r.json()),
          fetch("/api/tech-stacks/visible").then(r => r.json()),
          fetch("/api/contact/visible").then(r => r.json())
        ]);
        setHero(h);
        setExperiences(e);
        setStacks(s);
        setContacts(c);
      } catch (err) {
        console.error("Failed to fetch resume data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="font-black uppercase text-xl animate-pulse">Loading Resume...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] py-10 px-4 sm:px-6">
      <Head title={`${hero?.name || "User"}'s Resume`} />
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .resume-container { box-shadow: none !important; border: none !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .page-break { page-break-before: always; }
        }
        .resume-container {
          background: white;
          max-width: 850px;
          margin: 0 auto;
          border: 4px solid #000;
          box-shadow: 12px 12px 0 #000;
          padding: 40px;
        }
        .section-title {
          border-bottom: 4px solid #000;
          display: inline-block;
          padding-right: 20px;
          margin-bottom: 15px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      `}</style>

      {/* Toolbar */}
      <div className="max-w-[850px] mx-auto mb-8 flex justify-between items-center no-print">
        <button 
          onClick={() => router.visit("/")}
          className="flex items-center gap-2 font-black uppercase text-xs border-3 border-black px-4 py-2 bg-white shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <IconArrowLeft /> Back to Home
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 font-black uppercase text-xs border-3 border-black px-4 py-2 bg-[#9ECCFA] shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <IconPrint /> Print Resume
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="resume-container">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between gap-8 mb-12 border-b-8 border-black pb-8">
          <div>
            <h1 className="text-5xl font-black uppercase leading-none mb-2">{hero?.name}</h1>
            <p className="text-xl font-black uppercase text-gray-500 tracking-widest">{hero?.title}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {contacts.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-black text-[10px] uppercase bg-black text-white px-2 py-0.5">{c.label}</span>
                  <span className="font-bold text-sm">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
          {hero?.photo && (
            <div className="w-32 h-32 border-4 border-black overflow-hidden flex-shrink-0 grayscale hover:grayscale-0 transition-all">
              <img src={hero.photo} alt={hero.name} className="w-full h-full object-cover" />
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="section-title text-xl">Professional Summary</h2>
              <p className="font-semibold text-lg leading-relaxed text-gray-800 italic">
                "{hero?.bio}"
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="section-title text-xl">Work Experience</h2>
              <div className="space-y-8 mt-4">
                {experiences.length > 0 ? experiences.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-4 border-black">
                    <div className="absolute -left-[10px] top-0 w-4 h-4 bg-black rounded-full" />
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-black text-xl uppercase">{exp.role}</h3>
                      <span className="font-black text-xs bg-black text-white px-3 py-1">{exp.duration}</span>
                    </div>
                    <p className="font-black text-sm uppercase text-[#9ECCFA] mb-3">{exp.company}</p>
                    <p className="font-medium text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                )) : (
                  <p className="text-gray-400 font-bold uppercase italic">No experience records found.</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-12">
            {/* Skills */}
            <section>
              <h2 className="section-title text-xl">Core Skills</h2>
              <div className="mt-4 no-print">
                <input 
                  type="text" 
                  placeholder="Search skills..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-2 border-black p-2 text-[10px] font-black uppercase outline-none focus:bg-yellow-50"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {stacks.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map((s, i) => (
                  <span key={i} className="border-2 border-black px-3 py-1 font-black uppercase text-[10px] bg-[#FFE8A0]">
                    {s.name}
                  </span>
                ))}
                {stacks.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                  <p className="text-[10px] font-bold text-gray-300 uppercase italic">No skills match your search.</p>
                )}
              </div>
            </section>

            {/* Languages or Other Info */}
            <section>
              <h2 className="section-title text-xl">Tech Stack Categories</h2>
              <div className="mt-4 space-y-3">
                {Array.from(new Set(stacks.map(s => s.category))).map((cat, i) => (
                  <div key={i}>
                    <p className="font-black uppercase text-[10px] text-gray-400 mb-1">{cat}</p>
                    <div className="flex flex-wrap gap-1">
                      {stacks.filter(s => s.category === cat).map((s, j) => (
                        <span key={j} className="font-bold text-[11px]">{s.name}{j < stacks.filter(s => s.category === cat).length - 1 ? "," : ""}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications or Education could go here if added to DB */}
            <section className="bg-black p-5 text-white">
              <h2 className="text-[#9ECCFA] font-black uppercase text-sm mb-3 tracking-widest">Availability</h2>
              <p className="font-black text-xs leading-relaxed uppercase">
                Available for full-time roles, freelance projects, and consultations.
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-gray-100 flex justify-between items-center">
          <p className="font-black text-[10px] uppercase text-gray-300">Generated by Naoo Portfolio System</p>
          <p className="font-black text-[10px] uppercase text-gray-300">{new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </div>
  );
}
