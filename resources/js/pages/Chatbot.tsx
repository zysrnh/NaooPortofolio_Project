import { useState, useRef, useEffect } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import { FormattedMessage, CopySvgIcon } from "../components/FormattedMessage";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

interface DirectUser {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface DirectMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
  sender?: { id: number; name: string };
  receiver?: { id: number; name: string };
}

function getCsrfToken(): string {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) return decodeURIComponent(match[1]);
  return "";
}

// --- SVG Icons ---
const IconBot = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8.01" y2="16" />
    <line x1="16" y1="16" x2="16.01" y2="16" />
  </svg>
);

const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

const IconUserCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconSparkles = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.885L20 10.8l-5.088 1.915L13 18.6l-1.912-5.885L6 10.8l5.088-1.915z" />
  </svg>
);

export default function ChatbotPage() {
  const props = usePage().props as any;
  const user = props.auth?.user;

  const [activeTab, setActiveTab] = useState<"community">("community");

  // AI Chat State with localStorage persistence
  const [aiMessages, setAiMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem("naoo_ai_messages");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      {
        id: "1",
        sender: "bot",
        text: "Halo! Aku Naoo Helper. Selamat datang di Naoo Chat Hub. Ada yang ingin kamu tanyakan seputar portofolio proyek atau keahlian web development Zaki? Silakan tanya saja ya!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  });
  const [aiInput, setAiInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("naoo_ai_messages", JSON.stringify(aiMessages));
    } catch (e) {}
  }, [aiMessages]);

  // Direct User Chat State
  const [userList, setUserList] = useState<DirectUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<DirectUser | null>(null);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([]);
  const [directInput, setDirectInput] = useState("");
  const [isSendingDirect, setIsSendingDirect] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, directMessages, activeTab, selectedUser]);

  useEffect(() => {
    if (activeTab === "community" && user) {
      fetchUserList();
    }
  }, [activeTab, user]);

  useEffect(() => {
    if (selectedUser) {
      fetchDirectMessages(selectedUser.id);
    }
  }, [selectedUser]);

  const fetchUserList = async () => {
    try {
      const res = await fetch("/api/user-chats/users");
      if (res.ok) {
        const data = await res.json();
        setUserList(data);
      }
    } catch (e) {}
  };

  const fetchDirectMessages = async (receiverId: number) => {
    try {
      const res = await fetch(`/api/user-chats/${receiverId}`);
      if (res.ok) {
        const data = await res.json();
        setDirectMessages(data);
      }
    } catch (e) {}
  };

  const handleSendAi = async (textToSend?: string) => {
    const text = (textToSend || aiInput).trim();
    if (!text || isAiTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setAiMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setAiInput("");
    setIsAiTyping(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getCsrfToken(),
        },
        body: JSON.stringify({
          message: text,
          history: aiMessages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "Maaf ya, ada kendala koneksi ke server.";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setAiMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      setAiMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Maaf ya, gagal terhubung ke Naoo Helper API.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleSendDirect = async () => {
    const text = directInput.trim();
    if (!text || !selectedUser || isSendingDirect) return;

    setIsSendingDirect(true);
    try {
      const res = await fetch("/api/user-chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getCsrfToken(),
        },
        body: JSON.stringify({ receiver_id: selectedUser.id, message: text }),
      });

      if (res.ok) {
        setDirectInput("");
        fetchDirectMessages(selectedUser.id);
      }
    } catch (e) {
    } finally {
      setIsSendingDirect(false);
    }
  };

  const resetAiChat = () => {
    try {
      localStorage.removeItem("naoo_ai_messages");
    } catch (e) {}
    setAiMessages([
      {
        id: "1",
        sender: "bot",
        text: "Halo! Percakapan di-reset. Ada yang mau kamu tanyakan seputar proyek atau keahlianku?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const fmtTime = (d: string) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const SIDEBAR_TOPIC_BUTTONS = [
    { label: "PENDIDIKAN", title: "Kuliah di IDE LPKIA (Tingkat 2 Sem 1)", prompt: "Bisa ceritakan tentang perkuliahan Zaki di IDE LPKIA?" },
    { label: "ORGANISASI", title: "Anggota HIMA IF LPKIA", prompt: "Apa peran Zaki di organisasi HIMA IF LPKIA?" },
    { label: "PEKERJAAN", title: "Freelancer di Cyberlabs", prompt: "Bisa jelaskan seputar pengalaman Zaki sebagai Freelancer di Cyberlabs?" },
    { label: "ALUMNI", title: "Alumni SMKN 7 Baleendah", prompt: "Zaki alumni mana dan jurusan apa pas di SMKN 7 Baleendah?" },
  ];

  return (
    <>
      <Head title="Naoo Chat & Community - Interactive Hub" />
      <Navbar />

      <main className="min-h-screen bg-[var(--nb-bg)] pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center reveal">
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[var(--nb-primary)] mb-3 tracking-tighter leading-none">
              Naoo <span className="text-[var(--nb-accent)]">Chat Hub</span>
            </h1>
            <p className="font-bold text-[var(--nb-primary)] opacity-70 max-w-2xl mx-auto text-[10px] sm:text-xs uppercase tracking-[0.3em]">
              Asisten Naoo Helper & Ruang Direct Chat Antar User
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Profile & Interactive Topic Buttons (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 shadow-[8px_8px_0_var(--nb-primary)] space-y-4">
                <div className="flex items-center gap-3 border-b-4 border-[var(--nb-primary)] pb-4">
                  <div className="w-12 h-12 bg-[var(--nb-accent)] border-3 border-[var(--nb-primary)] flex items-center justify-center font-black text-[var(--nb-primary)] text-lg shadow-[2px_2px_0_var(--nb-primary)]">
                    ZY
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-sm text-[var(--nb-primary)] leading-tight">Zaki Yusron Hasyimmi</h3>
                    <p className="text-[10px] font-black uppercase text-[var(--nb-primary)] opacity-60">Full Stack Developer</p>
                  </div>
                </div>

                {/* Clickable Topic Buttons */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase text-[var(--nb-primary)] opacity-50">Klik topik untuk langsung bertanya ke Naoo Helper:</p>
                  {SIDEBAR_TOPIC_BUTTONS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTab("ai");
                        handleSendAi(item.prompt);
                      }}
                      className="w-full text-left border-3 border-[var(--nb-primary)] p-3 bg-[var(--nb-accent-light)] hover:bg-[var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] shadow-[3px_3px_0_var(--nb-primary)] transition-all cursor-pointer group"
                    >
                      <p className="font-black text-[9px] uppercase opacity-60 mb-0.5 text-[var(--nb-primary)]">{item.label}</p>
                      <p className="font-black text-xs text-[var(--nb-primary)] flex items-center justify-between">
                        {item.title}
                        <IconSparkles />
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Redirect Card */}
              <div className="bg-[var(--nb-primary)] text-[var(--nb-bg)] p-6 border-4 border-[var(--nb-primary)] shadow-[8px_8px_0_var(--nb-accent)] space-y-3">
                <h4 className="font-black uppercase text-xs tracking-wider text-[var(--nb-accent)]">Kirim Pesan Langsung</h4>
                <p className="text-xs font-semibold leading-relaxed opacity-90">
                  Perlu diskusi proyek atau pesan pribadi? Kamu bisa langsung ke halaman Contact.
                </p>
                <button
                  onClick={() => router.visit("/contact")}
                  className="w-full bg-[var(--nb-accent)] text-[var(--nb-primary)] border-3 border-[var(--nb-bg)] py-2.5 font-black uppercase text-xs shadow-[3px_3px_0_var(--nb-bg)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer transition-all"
                >
                  Ke Halaman Contact →
                </button>
              </div>

            </div>

            {/* Main Chat System Container (8 cols) */}
            <div className="lg:col-span-8">
              <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] flex flex-col h-[650px] overflow-hidden">
                
                {/* Header & Mode Switcher */}
                <div className="bg-[var(--nb-primary)] text-[var(--nb-bg)] p-4 border-b-4 border-[var(--nb-primary)] flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-2 font-black uppercase text-xs border-3 border-[var(--nb-bg)] bg-[var(--nb-accent)] text-[var(--nb-primary)] flex items-center gap-2">
                      <IconUsers /> User Chat / Pesan
                    </span>
                  </div>
                </div>

                {/* TAB 1: NAOO HELPER AI */}
                {activeTab === "ai" && (
                  <>
                    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[var(--nb-bg)] text-sm">
                      {aiMessages.map((msg) => (
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
                            <FormattedMessage text={msg.text} isUser={msg.sender === "user"} />
                          </div>
                          <div className="flex items-center gap-1.5 mt-1.5 px-1">
                            <span className="text-[9px] font-black uppercase opacity-50 text-[var(--nb-primary)]">
                              {msg.sender === "user" ? "Kamu" : "Naoo Helper"} • {msg.timestamp}
                            </span>
                            <CopySvgIcon text={msg.text} />
                          </div>
                        </div>
                      ))}

                      {isAiTyping && (
                        <div className="flex items-center gap-2 p-3 bg-[var(--nb-accent-light)] border-3 border-[var(--nb-primary)] w-fit text-xs font-black uppercase text-[var(--nb-primary)] animate-pulse">
                          <span>Naoo Helper sedang memproses...</span>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendAi();
                      }}
                      className="p-4 border-t-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex gap-3"
                    >
                      <input
                        type="text"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="Tanya Naoo Helper seputar proyek, keahlian, atau pengalaman Zaki..."
                        className="flex-1 bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-4 py-3 font-bold text-xs outline-none focus:bg-[var(--nb-accent-light)]"
                      />
                      <button
                        type="submit"
                        disabled={isAiTyping}
                        className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-3 border-[var(--nb-primary)] px-6 py-3 font-black uppercase text-xs shadow-[4px_4px_0_var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer active:translate-x-0 active:translate-y-0 disabled:opacity-50 flex items-center gap-2"
                      >
                        <IconSend /> Kirim
                      </button>
                    </form>
                  </>
                )}

                {/* TAB 2: DIRECT USER CHATROOM */}
                {activeTab === "community" && (
                  <>
                    {!user ? (
                      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 bg-[var(--nb-accent-light)]">
                        <div className="w-14 h-14 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] flex items-center justify-center text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)]">
                          <IconUsers />
                        </div>
                        <div className="space-y-1">
                          <p className="font-black uppercase text-sm text-[var(--nb-primary)]">
                            Login dulu untuk berkirim pesan dengan user lain!
                          </p>
                          <p className="text-[10px] font-semibold text-[var(--nb-primary)] opacity-60">
                            Kamu dapat memilih nama akun terdaftar dan memulai obrolan langsung.
                          </p>
                        </div>
                        <button
                          onClick={() => router.visit("/login")}
                          className="bg-[var(--nb-accent)] text-[var(--nb-primary)] border-3 border-[var(--nb-primary)] px-8 py-2.5 font-black uppercase text-xs shadow-[4px_4px_0_var(--nb-primary)] cursor-pointer"
                        >
                          Masuk Sekarang →
                        </button>
                      </div>
                    ) : !selectedUser ? (
                      /* User Contacts List */
                      <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-[var(--nb-bg)] text-xs">
                        <p className="font-black uppercase text-xs text-[var(--nb-primary)] mb-3">
                          Pilih Akun User untuk Memulai Obrolan:
                        </p>
                        {userList.length === 0 ? (
                          <div className="py-16 text-center opacity-40 font-black uppercase text-xs border-4 border-dashed border-[var(--nb-primary)]">
                            Belum ada akun user terdaftar lain.
                          </div>
                        ) : (
                          userList.map((u) => (
                            <div
                              key={u.id}
                              onClick={() => setSelectedUser(u)}
                              className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-4 shadow-[4px_4px_0_var(--nb-primary)] hover:bg-[var(--nb-accent-light)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--nb-primary)] cursor-pointer transition-all flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[var(--nb-accent)] border-3 border-[var(--nb-primary)] flex items-center justify-center font-black text-[var(--nb-primary)] text-sm shadow-[2px_2px_0_var(--nb-primary)]">
                                  {u.name[0]?.toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-black text-sm uppercase text-[var(--nb-primary)] leading-tight">{u.name}</p>
                                  <p className="text-[10px] font-semibold text-[var(--nb-primary)] opacity-50">{u.email}</p>
                                </div>
                              </div>
                              <button className="text-xs font-black uppercase bg-[var(--nb-primary)] text-[var(--nb-accent)] border-2 border-[var(--nb-primary)] px-3 py-1.5 shadow-[2px_2px_0_var(--nb-accent)]">
                                Buka Chat →
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    ) : (
                      /* 1-on-1 Direct Chat Window */
                      <>
                        <div className="bg-[var(--nb-accent-light)] border-b-4 border-[var(--nb-primary)] p-3 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedUser(null)}
                            className="font-black text-xs uppercase text-[var(--nb-primary)] border-3 border-[var(--nb-primary)] px-3 py-1.5 bg-[var(--nb-bg)] flex items-center gap-1.5 shadow-[3px_3px_0_var(--nb-primary)] cursor-pointer"
                          >
                            <IconBack /> Kembali ke Daftar User
                          </button>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase opacity-50 text-[var(--nb-primary)]">Chatting dengan:</span>
                            <span className="font-black text-xs uppercase text-[var(--nb-primary)] bg-[var(--nb-bg)] border-2 border-[var(--nb-primary)] px-2 py-0.5">
                              {selectedUser.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[var(--nb-bg)] text-sm">
                          {directMessages.length === 0 ? (
                            <div className="py-16 text-center opacity-40 font-black uppercase text-xs border-4 border-dashed border-[var(--nb-primary)]">
                              Belum ada percakapan dengan {selectedUser.name}. Mulai sapa sekarang!
                            </div>
                          ) : (
                            directMessages.map((msg) => {
                              const isMe = msg.sender_id === user.id;
                              const avatar = isMe ? user?.avatar : msg.sender?.avatar;
                              const senderName = isMe ? "Kamu" : msg.sender?.name;
                              return (
                                <div
                                  key={msg.id}
                                  className={`flex gap-3 items-start ${isMe ? "flex-row-reverse" : "flex-row"}`}
                                >
                                  <div className="w-8 h-8 border-2 border-[var(--nb-primary)] bg-[var(--nb-accent)] flex items-center justify-center font-black text-xs text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] flex-shrink-0 overflow-hidden mt-0.5">
                                    {avatar ? (
                                      <img src={avatar} alt={senderName} className="w-full h-full object-cover" />
                                    ) : (
                                      (senderName || "U")[0]?.toUpperCase()
                                    )}
                                  </div>

                                  <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                                    <div
                                      className={`max-w-[80%] p-4 border-4 border-[var(--nb-primary)] font-semibold leading-relaxed ${
                                        isMe
                                          ? "bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[5px_5px_0_var(--nb-primary)]"
                                          : "bg-[var(--nb-bg)] text-[var(--nb-primary)] shadow-[5px_5px_0_var(--nb-primary)]"
                                      }`}
                                    >
                                      <p className="whitespace-pre-wrap">{msg.message}</p>
                                    </div>
                                    <span className="text-[9px] font-black uppercase opacity-40 mt-1.5 px-1 text-[var(--nb-primary)]">
                                      {senderName} • {fmtTime(msg.created_at)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })
                          )}
                          <div ref={chatEndRef} />
                        </div>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendDirect();
                          }}
                          className="p-4 border-t-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex gap-3"
                        >
                          <input
                            type="text"
                            value={directInput}
                            onChange={(e) => setDirectInput(e.target.value)}
                            placeholder={`Tulis pesan untuk ${selectedUser.name}...`}
                            className="flex-1 bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-4 py-3 font-bold text-xs outline-none focus:bg-[var(--nb-accent-light)]"
                          />
                          <button
                            type="submit"
                            disabled={isSendingDirect}
                            className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-3 border-[var(--nb-primary)] px-6 py-3 font-black uppercase text-xs shadow-[4px_4px_0_var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer active:translate-x-0 active:translate-y-0 disabled:opacity-50 flex items-center gap-2"
                          >
                            <IconSend /> Kirim
                          </button>
                        </form>
                      </>
                    )}
                  </>
                )}

              </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
