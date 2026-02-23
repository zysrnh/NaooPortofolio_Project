import { useState } from "react";

export default function Home() {
  const [dark, setDark] = useState(false);

  const projects = [
    {
      title: "Burger Ordering App",
      desc: "Website restoran burger dengan sistem pemesanan online",
      stack: "Laravel • React",
    },
    {
      title: "Beyblade Leaderboard",
      desc: "Leaderboard turnamen dengan statistik otomatis",
      stack: "JavaScript • LocalStorage",
    },
    {
      title: "CV Generator Tool",
      desc: "Generate CV massal dari Excel ke PDF",
      stack: "React • XLSX",
    },
  ];

  return (
    <div className={`${dark ? "bg-neutral-900 text-white" : "bg-white text-black"} min-h-screen p-6 md:p-10`}>

      {/* NAV */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-black uppercase">Yusron.dev</h1>

        <button
          onClick={() => setDark(!dark)}
          className={`border-4 px-5 py-2 font-black uppercase ${
            dark
              ? "border-white shadow-[4px_4px_0_white]"
              : "border-black shadow-[4px_4px_0_black]"
          }`}
        >
          Mode
        </button>
      </div>

      {/* HERO */}
      <section
        className={`border-4 p-10 mb-10 ${
          dark
            ? "border-white shadow-[8px_8px_0_white]"
            : "border-black shadow-[8px_8px_0_black]"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
          Yusron
        </h2>

        <p className="font-bold uppercase text-sm md:text-base">
          Frontend Developer • React • Laravel
        </p>

        <p className="mt-6 max-w-xl font-semibold">
          Saya membangun aplikasi web modern, dashboard, dan tools internal
          menggunakan React dan Laravel dengan fokus pada UI yang rapi,
          performa, dan pengalaman pengguna.
        </p>
      </section>

      {/* ABOUT */}
      <section
        className={`border-4 p-8 mb-10 ${
          dark
            ? "border-white shadow-[8px_8px_0_white]"
            : "border-black shadow-[8px_8px_0_black]"
        }`}
      >
        <h3 className="text-2xl font-black uppercase mb-4">About</h3>

        <p className="font-semibold max-w-2xl">
          Saya fokus membuat aplikasi web modern menggunakan React sebagai
          frontend dan Laravel sebagai backend. Berpengalaman membuat dashboard,
          sistem CRUD, tools internal, dan aplikasi berbasis data.
        </p>
      </section>

      {/* SKILLS */}
      <section
        className={`border-4 p-8 mb-10 ${
          dark
            ? "border-white shadow-[8px_8px_0_white]"
            : "border-black shadow-[8px_8px_0_black]"
        }`}
      >
        <h3 className="text-2xl font-black uppercase mb-6">Skills</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["React", "Laravel", "TypeScript", "Tailwind", "MySQL", "Git", "REST API", "UI Engineering"].map(
            (s) => (
              <div
                key={s}
                className={`border-4 p-4 text-center font-black uppercase ${
                  dark
                    ? "border-white shadow-[4px_4px_0_white]"
                    : "border-black shadow-[4px_4px_0_black]"
                }`}
              >
                {s}
              </div>
            )
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        className={`border-4 p-8 mb-10 ${
          dark
            ? "border-white shadow-[8px_8px_0_white]"
            : "border-black shadow-[8px_8px_0_black]"
        }`}
      >
        <h3 className="text-2xl font-black uppercase mb-6">Projects</h3>

        <div className="space-y-5">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`border-4 p-5 ${
                dark
                  ? "border-white shadow-[4px_4px_0_white]"
                  : "border-black shadow-[4px_4px_0_black]"
              }`}
            >
              <h4 className="font-black uppercase text-lg">{p.title}</h4>
              <p className="font-semibold mt-2">{p.desc}</p>
              <p className="text-sm font-bold uppercase mt-3">{p.stack}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        className={`border-4 p-8 ${
          dark
            ? "border-white shadow-[8px_8px_0_white]"
            : "border-black shadow-[8px_8px_0_black]"
        }`}
      >
        <h3 className="text-2xl font-black uppercase mb-4">Contact</h3>

        <div className="space-y-2 font-semibold">
          <p>Email: yusron@email.com</p>
          <p>GitHub: github.com/yusron</p>
          <p>LinkedIn: linkedin.com/in/yusron</p>
        </div>
      </section>
    </div>
  );
}