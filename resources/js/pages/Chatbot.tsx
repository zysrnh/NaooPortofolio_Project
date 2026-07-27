import { useState, useRef, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import Navbar from "../components/Navbar";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "bot",
    text: "Selamat datang di halaman Naoo AI Chatbot! 🤖\nSaya asisten virtual cerdas yang siap menjawab segala pertanyaan kamu seputar profil, proyek, keahlian, dan ketersediaan kerja Zaki Yusron Hasyimmi. Ada yang ingin kamu tanyakan?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

const QUICK_TOPICS = [
  { title: "🚀 Highlight Proyek Utama", query: "Bisa jelaskan proyek-proyek unggulan yang dibuat Zaki?" },
  { title: "🛠️ Skill & Tech Stack", query: "Teknologi dan tools apa saja yang dikuasai Zaki?" },
  { title: "💼 Status Ketersediaan Kerja", query: "Apakah Zaki saat ini menerima tawaran kerja atau project freelance?" },
  { title: "✉️ Kontak & Sosmed", query: "Bagaimana cara berkomunikasi langsung dengan Zaki?" },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Terima kasih sudah bertanya! Zaki adalah seorang Fullstack Web Developer yang berfokus membangun solusi digital modern dengan Laravel, React, dan Tailwind CSS.";
      const lower = query.toLowerCase();

      if (lower.includes("proyek") || lower.includes("project") || lower.includes("portofolio") || lower.includes("aplikasi")) {
        reply = "Zaki telah mengembangkan berbagai aplikasi full-stack unggulan seperti:\n1. Naoo Portfolio & CMS (Laravel + React)\n2. Smart Color Picker Utility Tool\n3. Interactive Dashboard Analytics\n4. Geographic Information System (GIS)\n\nKamu bisa menjelajahi detail tiap project di halaman /projects !";
      } else if (lower.includes("stack") || lower.includes("skill") || lower.includes("teknologi") || lower.includes("keahlian")) {
        reply = "Berikut adalah daftar keahlian utama Zaki:\n• Frontend: React 19, TypeScript, Tailwind CSS v4, Inertia.js, Vite\n• Backend: PHP 8+, Laravel 12, Node.js, RESTful API\n• Database: SQLite, MySQL, PostgreSQL, DBAL\n• Version Control & Tools: Git, GitHub, Docker, Postman";
      } else if (lower.includes("kerja") || lower.includes("hire") || lower.includes("freelance") || lower.includes("job") || lower.includes("status")) {
        reply = "Zaki saat ini *OPEN TO WORK* untuk posisi Fullstack Web Developer, Frontend Engineer, maupun proyek Freelance / Kontrak. Jangan ragu untuk mendiskusikan ide proyek kamu!";
      } else if (lower.includes("kontak") || lower.includes("hubungi") || lower.includes("email") || lower.includes("wa") || lower.includes("sosmed")) {
        reply = "Kamu bisa menghubungi Zaki secara langsung melalui:\n• Halaman Kontak: /contact\n• GitHub: github.com/zyrsnh\n• Email: kontak resmi di footer website";
      } else if (lower.includes("halo") || lower.includes("hai") || lower.includes("hi") || lower.includes("pagi") || lower.includes("siang") || lower.includes("malam")) {
        reply = "Halo! Selamat datang di Naoo AI Chatbot. Ada informasi khusus yang ingin kamu ketahui tentang Zaki?";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      <Head title="Naoo AI Chatbot - Interactive Assistant" />
      <Navbar />

      <main className="min-h-screen bg-[var(--nb-bg)] pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center reveal">
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[var(--nb-primary)] mb-3 tracking-tighter leading-none">
              Naoo <span className="text-[var(--nb-accent)]">AI Assistant</span>
            </h1>
            <p className="font-bold text-[var(--nb-primary)] opacity-70 max-w-2xl mx-auto text-[10px] sm:text-xs uppercase tracking-[0.3em]">
              Asisten Virtual Interaktif seputar profil & portofolio Zaki Yusron Hasyimmi
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Quick Topics Card (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 shadow-[8px_8px_0_var(--nb-primary)] space-y-4">
                <h3 className="font-black uppercase text-xs tracking-widest text-[var(--nb-primary)]">Topik Populer</h3>
                <p className="text-[10px] font-bold opacity-60 uppercase">Klik topik di bawah ini untuk langsung bertanya ke bot:</p>

                <div className="space-y-2.5">
                  {QUICK_TOPICS.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(topic.query)}
                      className="w-full text-left bg-[var(--nb-accent-light)] border-3 border-[var(--nb-primary)] p-3 font-black text-xs uppercase text-[var(--nb-primary)] shadow-[3px_3px_0_var(--nb-primary)] hover:bg-[var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--nb-primary)] text-[var(--nb-bg)] p-6 border-4 border-[var(--nb-primary)] shadow-[8px_8px_0_var(--nb-accent)] space-y-3">
                <h4 className="font-black uppercase text-xs tracking-wider text-[var(--nb-accent)]">Butuh Respon Langsung?</h4>
                <p className="text-xs font-semibold leading-relaxed opacity-90">
                  Jika kamu ingin mengirimkan pesan resmi atau diskusi langsung, silakan gunakan form di halaman Contact.
                </p>
                <button
                  onClick={() => router.visit("/contact")}
                  className="w-full bg-[var(--nb-accent)] text-[var(--nb-primary)] border-3 border-[var(--nb-bg)] py-2.5 font-black uppercase text-xs shadow-[3px_3px_0_var(--nb-bg)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer transition-all"
                >
                  Buka Halaman Contact →
                </button>
              </div>
            </div>

            {/* Main Chat Interface (8 cols) */}
            <div className="lg:col-span-8">
              <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] flex flex-col h-[650px] overflow-hidden">
                
                {/* Chat Top Header */}
                <div className="bg-[var(--nb-primary)] text-[var(--nb-bg)] p-4 border-b-4 border-[var(--nb-primary)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--nb-accent)] border-3 border-[var(--nb-bg)] flex items-center justify-center font-black text-[var(--nb-primary)] text-sm">
                      AI
                    </div>
                    <div>
                      <h3 className="font-black uppercase text-sm tracking-wider text-[var(--nb-bg)] leading-none">
                        Naoo AI Assistant
                      </h3>
                      <p className="text-[10px] font-bold uppercase text-[var(--nb-accent)] opacity-90 mt-1">
                        Active & Ready to Help
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={clearChat}
                    className="border-2 border-[var(--nb-bg)] bg-red-500 text-white px-3 py-1 font-black text-[10px] uppercase hover:bg-red-600 shadow-[2px_2px_0_var(--nb-bg)] cursor-pointer"
                  >
                    Reset Chat
                  </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[var(--nb-bg)] text-sm">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 border-4 border-[var(--nb-primary)] font-semibold leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[5px_5px_0_var(--nb-primary)]"
                            : "bg-[var(--nb-bg)] text-[var(--nb-primary)] shadow-[5px_5px_0_var(--nb-primary)]"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <span className="text-[9px] font-black uppercase opacity-40 mt-1.5 px-1 text-[var(--nb-primary)]">
                        {msg.sender === "user" ? "Kamu" : "Naoo Bot"} • {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2 p-3 bg-[var(--nb-accent-light)] border-3 border-[var(--nb-primary)] w-fit text-xs font-black uppercase text-[var(--nb-primary)] animate-pulse">
                      <span>Naoo AI sedang memproses balasan...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Form Footer */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="p-4 border-t-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex gap-3"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ketik pertanyaan kamu tentang profil / proyek Zaki..."
                    className="flex-1 bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-4 py-3 font-bold text-xs outline-none focus:bg-[var(--nb-accent-light)]"
                  />
                  <button
                    type="submit"
                    className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-3 border-[var(--nb-primary)] px-6 py-3 font-black uppercase text-xs shadow-[4px_4px_0_var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer active:translate-x-0 active:translate-y-0"
                  >
                    Kirim Pesan
                  </button>
                </form>

              </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
