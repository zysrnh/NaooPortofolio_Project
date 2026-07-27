import { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";

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
    text: "Halo! 👋 Saya Naoo AI Assistant. Ada yang bisa saya bantu terkait profil, portofolio proyek, atau kontak Zaki Yusron Hasyimmi?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

const SUGGESTIONS = [
  "🚀 Apa saja proyek terbarunya?",
  "🛠️ Apa tech stack utamanya?",
  "💼 Apakah sedang open for hire?",
  "✉️ Bagaimana cara menghubungi?",
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

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

    // Smart Bot Responses
    setTimeout(() => {
      let reply = "Terima kasih sudah bertanya! Zaki adalah seorang Fullstack Web Developer yang berpengalaman membangun aplikasi modern dengan React, Laravel, dan TypeScript.";
      const lower = query.toLowerCase();

      if (lower.includes("proyek") || lower.includes("project") || lower.includes("portofolio")) {
        reply = "Zaki telah mengerjakan berbagai proyek full-stack seperti Web Portfolio CMS, Smart Color Picker, Sistem Informasi Geografis, hingga Dashboard Admin. Kamu bisa melihat selengkapnya di halaman /projects !";
      } else if (lower.includes("stack") || lower.includes("skill") || lower.includes("keahlian") || lower.includes("bahasa")) {
        reply = "Tech Stack utama Zaki meliputi: React 19, TypeScript, Laravel 12, Tailwind CSS v4, Inertia.js, Node.js, REST API, dan SQLite/MySQL.";
      } else if (lower.includes("hire") || lower.includes("kerja") || lower.includes("job") || lower.includes("freelance") || lower.includes("open")) {
        reply = "Ya! Zaki sedang *Open for Work & Freelance Projects*. Silakan kirim pesan melalui halaman Contact atau via email!";
      } else if (lower.includes("kontak") || lower.includes("hubungi") || lower.includes("email") || lower.includes("contact")) {
        reply = "Kamu bisa menghubungi Zaki melalui halaman /contact atau langsung via email dan media sosial di bagian footer website.";
      } else if (lower.includes("halo") || lower.includes("hai") || lower.includes("hi") || lower.includes("pagi") || lower.includes("malam")) {
        reply = "Halo! Senang bisa menyapa kamu. Ada informasi khusus tentang Zaki yang ingin kamu ketahui?";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Button (Placed beside Back-To-Top button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[28px] right-[88px] z-[99] w-[48px] h-[48px] border-4 border-[var(--nb-primary)] bg-[var(--nb-accent)] shadow-[4px_4px_0_var(--nb-primary)] flex items-center justify-center cursor-pointer transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--nb-primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        aria-label="Open Chatbot Assistant"
        title="Naoo AI Assistant Chatbot"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--nb-primary)" strokeWidth="3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--nb-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-[var(--nb-primary)] rounded-full animate-ping" />
          </div>
        )}
      </button>

      {/* Floating Chat Popup Drawer */}
      {isOpen && (
        <div className="fixed bottom-[90px] right-[16px] sm:right-[28px] z-[9999] w-[calc(100vw-32px)] sm:w-[380px] h-[500px] bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[var(--nb-primary)] text-[var(--nb-bg)] p-4 border-b-4 border-[var(--nb-primary)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--nb-accent)] border-2 border-[var(--nb-bg)] flex items-center justify-center font-black text-[var(--nb-primary)] text-xs">
                AI
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-wider text-[var(--nb-bg)] leading-none">
                  Naoo Assistant
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase opacity-80 text-[var(--nb-accent)]">Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => router.visit("/chatbot")}
                className="text-[10px] font-black uppercase bg-[var(--nb-accent)] text-[var(--nb-primary)] border-2 border-[var(--nb-bg)] px-2 py-1 hover:opacity-90 cursor-pointer"
                title="Buka halaman penuh"
              >
                Expand ↗
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--nb-bg)] font-black text-lg hover:text-[var(--nb-accent)] px-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[var(--nb-bg)] text-sm font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 border-3 border-[var(--nb-primary)] text-xs font-bold ${
                    msg.sender === "user"
                      ? "bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[3px_3px_0_var(--nb-primary)]"
                      : "bg-[var(--nb-bg)] text-[var(--nb-primary)] shadow-[3px_3px_0_var(--nb-primary)]"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[8px] font-black uppercase opacity-40 mt-1 px-1 text-[var(--nb-primary)]">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-[var(--nb-accent-light)] border-3 border-[var(--nb-primary)] w-fit text-xs font-black uppercase text-[var(--nb-primary)] animate-pulse">
                <span>Naoo AI mengetik...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions Quick Buttons */}
          {messages.length <= 2 && (
            <div className="p-2 border-t-2 border-[var(--nb-primary)] bg-[var(--nb-accent-light)] flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  className="text-[9px] font-black uppercase bg-[var(--nb-bg)] border-2 border-[var(--nb-primary)] px-2 py-1 text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] hover:bg-[var(--nb-accent)] transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya sesuatu ke Naoo AI..."
              className="flex-1 bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-3 py-2 text-xs font-bold outline-none focus:bg-[var(--nb-accent-light)]"
            />
            <button
              type="submit"
              className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-3 border-[var(--nb-primary)] px-4 font-black uppercase text-xs shadow-[2px_2px_0_var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer active:translate-x-0 active:translate-y-0"
            >
              Kirim
            </button>
          </form>

        </div>
      )}
    </>
  );
}
