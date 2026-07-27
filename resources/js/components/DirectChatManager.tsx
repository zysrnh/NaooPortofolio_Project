import { useState, useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";

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

// Icons
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

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function DirectChatManager() {
  const props = usePage().props as any;
  const currentUser = props.auth?.user;

  const [userList, setUserList] = useState<DirectUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<DirectUser | null>(null);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [sending, setSending] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchChatHistory(selectedUser.id);
    }
  }, [selectedUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch("/api/user-chats/users");
      if (res.ok) {
        const data = await res.json();
        setUserList(data);
        if (data.length > 0 && !selectedUser) {
          setSelectedUser(data[0]);
        }
      }
    } catch (e) {
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchChatHistory = async (receiverId: number) => {
    try {
      setLoadingChat(true);
      const res = await fetch(`/api/user-chats/${receiverId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
    } finally {
      setLoadingChat(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputMessage.trim();
    if (!text || !selectedUser || sending) return;

    setSending(true);
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
        setInputMessage("");
        fetchChatHistory(selectedUser.id);
      }
    } catch (e) {
    } finally {
      setSending(false);
    }
  };

  const filteredUsers = userList.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fmtTime = (d: string) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <h2 className="font-black text-2xl uppercase text-[var(--nb-primary)] leading-tight">
          User Direct Chat
        </h2>
        <p className="font-bold text-xs text-[var(--nb-primary)] opacity-60 uppercase tracking-widest mt-1">
          Berkirim pesan langsung 1-on-1 antar akun pengguna terdaftar
        </p>
      </div>

      {/* Main Grid */}
      <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] grid grid-cols-1 lg:grid-cols-12 min-h-[580px] overflow-hidden">
        
        {/* Left Contacts Sidebar (4 cols) */}
        <div className="lg:col-span-4 border-b-4 lg:border-b-0 lg:border-r-4 border-[var(--nb-primary)] flex flex-col bg-[var(--nb-accent-light)]">
          <div className="p-4 border-b-4 border-[var(--nb-primary)] bg-[var(--nb-primary)] text-[var(--nb-bg)]">
            <h3 className="font-black uppercase text-xs tracking-wider text-[var(--nb-accent)] mb-3 flex items-center gap-2">
              <IconUsers /> Daftar Pengguna ({userList.length})
            </h3>
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari user..."
                className="w-full bg-[var(--nb-bg)] text-[var(--nb-primary)] border-2 border-[var(--nb-primary)] px-3 py-1.5 pl-8 text-xs font-bold focus:outline-none"
              />
              <span className="absolute left-2.5 top-2 text-[var(--nb-primary)] opacity-50">
                <IconSearch />
              </span>
            </div>
          </div>

          {/* User List */}
          <div className="flex-1 overflow-y-auto divide-y-2 divide-[var(--nb-primary)]">
            {loadingUsers ? (
              <div className="p-8 text-center font-black uppercase text-xs opacity-50">
                Memuat daftar user...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center font-black uppercase text-xs opacity-50">
                Tidak ada user ditemukan.
              </div>
            ) : (
              filteredUsers.map((u) => {
                const isSelected = selectedUser?.id === u.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`p-4 cursor-pointer transition-colors flex items-center gap-3 ${
                      isSelected
                        ? "bg-[var(--nb-accent)] text-[var(--nb-primary)] font-black"
                        : "hover:bg-[var(--nb-bg)] text-[var(--nb-primary)]"
                    }`}
                  >
                    <div className="w-10 h-10 border-3 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex items-center justify-center font-black text-sm text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] flex-shrink-0">
                      {u.name[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-black text-xs uppercase truncate leading-tight">{u.name}</p>
                        {u.role === "admin" && (
                          <span className="text-[8px] font-black uppercase bg-[var(--nb-primary)] text-[var(--nb-accent)] px-1.5 py-0.5">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] font-semibold opacity-60 truncate mt-0.5">{u.email}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Chat Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-[var(--nb-bg)]">
          {selectedUser ? (
            <>
              {/* Active Chat Topbar */}
              <div className="p-4 border-b-4 border-[var(--nb-primary)] bg-[var(--nb-accent-light)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-3 border-[var(--nb-primary)] bg-[var(--nb-accent)] flex items-center justify-center font-black text-sm text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)]">
                    {selectedUser.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-sm text-[var(--nb-primary)] leading-none">
                      {selectedUser.name}
                    </h4>
                    <p className="text-[10px] font-semibold text-[var(--nb-primary)] opacity-50 mt-1">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[var(--nb-bg)] text-xs">
                {loadingChat ? (
                  <div className="py-16 text-center font-black uppercase opacity-40">
                    Memuat percakapan...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="py-20 text-center border-4 border-dashed border-[var(--nb-primary)] opacity-30 font-black uppercase tracking-widest">
                    Belum ada pesan dengan {selectedUser.name}. Kirim pesan pertama!
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.sender_id === currentUser?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-4 border-4 border-[var(--nb-primary)] font-bold text-sm leading-relaxed ${
                            isMe
                              ? "bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)]"
                              : "bg-[var(--nb-bg)] text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)]"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.message}</p>
                        </div>
                        <span className="text-[9px] font-black uppercase opacity-40 mt-1 px-1 text-[var(--nb-primary)]">
                          {isMe ? "Kamu" : msg.sender?.name} • {fmtTime(msg.created_at)}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Message Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex gap-3"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Tulis pesan untuk ${selectedUser.name}...`}
                  className="flex-1 bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-4 py-3 font-bold text-xs outline-none focus:bg-[var(--nb-accent-light)]"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-3 border-[var(--nb-primary)] px-6 py-3 font-black uppercase text-xs shadow-[4px_4px_0_var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer active:translate-x-0 active:translate-y-0 disabled:opacity-50 flex items-center gap-2"
                >
                  <IconSend /> Kirim
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-40">
              <IconUsers />
              <p className="font-black uppercase text-xs tracking-widest mt-3">
                Pilih user di sebelah kiri untuk mengobrol
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
