import { useState, useRef, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { FormattedMessage, CopySvgIcon } from "./FormattedMessage";

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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconSend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconMessage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconExternalLink = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function ChatbotWidget() {
  // Temporarily hidden
  return null;
  const user = props.auth?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"community">("community");

  // AI Chat state with localStorage persistence
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
        text: "Halo! Aku Naoo Helper. Ada yang bisa aku bantu seputar proyek, keahlian noding, atau materi web development Zaki? Silakan tanya ya!",
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

  // Direct User Chat state
  const [userList, setUserList] = useState<DirectUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<DirectUser | null>(null);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([]);
  const [directInput, setDirectInput] = useState("");
  const [isSendingDirect, setIsSendingDirect] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages, directMessages, isOpen, activeTab, selectedUser]);

  useEffect(() => {
    if (isOpen && activeTab === "community" && user) {
      fetchUserList();
    }
  }, [isOpen, activeTab, user]);

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

  const handleSendAi = async () => {
    const text = aiInput.trim();
    if (!text || isAiTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setAiMessages((prev) => [...prev, userMsg]);
    setAiInput("");
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
      const replyText = data.reply || "Maaf ya, ada sedikit kendala koneksi.";

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
          text: "Maaf ya, gagal terhubung ke server Naoo Helper.",
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

  const fmtTime = (d: string) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[28px] right-[88px] z-[99] w-[48px] h-[48px] border-4 border-[var(--nb-primary)] bg-[var(--nb-accent)] shadow-[4px_4px_0_var(--nb-primary)] flex items-center justify-center cursor-pointer transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--nb-primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-[var(--nb-primary)]"
        aria-label="Toggle Assistant Chat"
        title="Naoo Helper & User Chat"
      >
        {isOpen ? <IconClose /> : <IconMessage />}
      </button>

      {/* Floating Popup Drawer */}
      {isOpen && (
        <div className="fixed bottom-[90px] right-[16px] sm:right-[28px] z-[9999] w-[calc(100vw-32px)] sm:w-[400px] h-[520px] bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Top Header */}
          <div className="bg-[var(--nb-primary)] text-[var(--nb-bg)] p-3.5 border-b-4 border-[var(--nb-primary)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[var(--nb-accent)] border-2 border-[var(--nb-bg)] flex items-center justify-center font-black text-[var(--nb-primary)] text-xs">
                <IconUsers />
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-wider text-[var(--nb-bg)] leading-none">
                  {selectedUser ? selectedUser.name : "User Chat"}
                </h4>
                <p className="text-[9px] font-bold uppercase text-[var(--nb-accent)] opacity-90 mt-0.5">
                  {selectedUser ? "Direct Chat" : "Pilih Akun User"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => router.visit("/chatbot")}
                className="text-[9px] font-black uppercase bg-[var(--nb-accent)] text-[var(--nb-primary)] border-2 border-[var(--nb-bg)] px-2 py-1 hover:opacity-90 cursor-pointer flex items-center gap-1"
                title="Buka Halaman Penuh"
              >
                Expand <IconExternalLink />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--nb-bg)] font-black hover:text-[var(--nb-accent)] px-1 cursor-pointer"
              >
                <IconClose />
              </button>
            </div>
          </div>



          {/* DIRECT USER CHAT */}
          {true && (
            <>
              {!user ? (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3 bg-[var(--nb-accent-light)]">
                  <div className="w-12 h-12 bg-[var(--nb-accent)] border-3 border-[var(--nb-primary)] flex items-center justify-center text-[var(--nb-primary)]">
                    <IconUsers />
                  </div>
                  <p className="font-black uppercase text-xs text-[var(--nb-primary)]">
                    Login dulu untuk berkirim pesan dengan user lain!
                  </p>
                  <button
                    onClick={() => router.visit("/login")}
                    className="bg-[var(--nb-accent)] text-[var(--nb-primary)] border-3 border-[var(--nb-primary)] px-6 py-2 font-black uppercase text-xs shadow-[3px_3px_0_var(--nb-primary)] cursor-pointer"
                  >
                    Masuk Sekarang →
                  </button>
                </div>
              ) : !selectedUser ? (
                /* User Contacts List */
                <div className="flex-1 p-4 overflow-y-auto space-y-2.5 bg-[var(--nb-bg)] text-xs">
                  <p className="font-black uppercase text-[10px] opacity-50 text-[var(--nb-primary)] mb-2">
                    Pilih akun user untuk diajak chat:
                  </p>
                  {userList.length === 0 ? (
                    <div className="py-12 text-center opacity-40 font-black uppercase text-[10px]">
                      Belum ada akun user terdaftar lain.
                    </div>
                  ) : (
                    userList.map((u) => (
                      <div
                        key={u.id}
                        onClick={() => setSelectedUser(u)}
                        className="bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] p-3 shadow-[3px_3px_0_var(--nb-primary)] hover:bg-[var(--nb-accent-light)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-[var(--nb-accent)] border-2 border-[var(--nb-primary)] flex items-center justify-center font-black text-[var(--nb-primary)] text-xs">
                            {u.name[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-black text-xs uppercase text-[var(--nb-primary)] leading-tight">{u.name}</p>
                            <p className="text-[9px] font-semibold text-[var(--nb-primary)] opacity-50">{u.email}</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-black uppercase bg-[var(--nb-primary)] text-[var(--nb-bg)] px-2 py-0.5">
                          Chat →
                        </span>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* 1-on-1 Direct Chat Window */
                <>
                  <div className="bg-[var(--nb-accent-light)] border-b-3 border-[var(--nb-primary)] p-2.5 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="font-black text-[10px] uppercase text-[var(--nb-primary)] border-2 border-[var(--nb-primary)] px-2 py-1 bg-[var(--nb-bg)] flex items-center gap-1 shadow-[2px_2px_0_var(--nb-primary)] cursor-pointer"
                    >
                      <IconBack /> Kembali ke Daftar User
                    </button>
                    <span className="font-black text-xs uppercase text-[var(--nb-primary)] truncate max-w-[150px]">
                      {selectedUser.name}
                    </span>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[var(--nb-bg)] text-xs">
                    {directMessages.length === 0 ? (
                      <div className="py-12 text-center opacity-40 font-black uppercase text-[10px]">
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
                            className={`flex gap-2 items-start ${isMe ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <div className="w-7 h-7 border-2 border-[var(--nb-primary)] bg-[var(--nb-accent)] flex items-center justify-center font-black text-[10px] text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] flex-shrink-0 overflow-hidden mt-0.5">
                              {avatar ? (
                                <img src={avatar} alt={senderName} className="w-full h-full object-cover" />
                              ) : (
                                (senderName || "U")[0]?.toUpperCase()
                              )}
                            </div>

                            <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                              <div
                                className={`max-w-[85%] p-3 border-3 border-[var(--nb-primary)] font-semibold leading-relaxed ${
                                  isMe
                                    ? "bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[3px_3px_0_var(--nb-primary)]"
                                    : "bg-[var(--nb-bg)] text-[var(--nb-primary)] shadow-[3px_3px_0_var(--nb-primary)]"
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{msg.message}</p>
                              </div>
                              <span className="text-[8px] font-black uppercase opacity-40 mt-1 px-1 text-[var(--nb-primary)]">
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
                    className="p-3 border-t-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex gap-2"
                  >
                    <input
                      type="text"
                      value={directInput}
                      onChange={(e) => setDirectInput(e.target.value)}
                      placeholder={`Pesan untuk ${selectedUser.name}...`}
                      className="flex-1 bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-3 py-2 text-xs font-bold outline-none focus:bg-[var(--nb-accent-light)]"
                    />
                    <button
                      type="submit"
                      disabled={isSendingDirect}
                      className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-3 border-[var(--nb-primary)] px-4 font-black uppercase text-xs shadow-[2px_2px_0_var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0 active:translate-y-0 disabled:opacity-50 cursor-pointer flex items-center gap-1"
                    >
                      <IconSend />
                    </button>
                  </form>
                </>
              )}
            </>
          )}

        </div>
      )}
    </>
  );
}
