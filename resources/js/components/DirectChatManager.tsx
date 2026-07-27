import { useState, useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";

interface DirectUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

interface DirectMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  attachment?: string;
  attachment_type?: string;
  attachment_name?: string;
  created_at: string;
  sender?: { id: number; name: string; avatar?: string };
  receiver?: { id: number; name: string; avatar?: string };
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

const IconPaperclip = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const IconFile = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<{ url: string; name: string; isImage: boolean } | null>(null);
  const [previewModalImg, setPreviewModalImg] = useState<string | null>(null);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [sending, setSending] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file maksimal 10MB!");
      return;
    }

    setSelectedFile(file);
    const isImg = file.type.startsWith("image/");
    if (isImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview({ url: reader.result as string, name: file.name, isImage: true });
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview({ url: "", name: file.name, isImage: false });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputMessage.trim();
    if ((!text && !selectedFile) || !selectedUser || sending) return;

    setSending(true);
    try {
      const formData = new FormData();
      formData.append("receiver_id", selectedUser.id.toString());
      if (text) formData.append("message", text);
      if (selectedFile) formData.append("file", selectedFile);

      const res = await fetch("/api/user-chats", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getCsrfToken(),
        },
        body: formData,
      });

      if (res.ok) {
        setInputMessage("");
        setSelectedFile(null);
        setFilePreview(null);
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
          Berkirim pesan & lampiran file 1-on-1 antar akun pengguna terdaftar
        </p>
      </div>

      {/* Main Grid with fixed height & internal scroll like WhatsApp */}
      <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] grid grid-cols-1 lg:grid-cols-12 h-[580px] sm:h-[620px] overflow-hidden">
        
        {/* Left Contacts Sidebar (4 cols) */}
        <div className="lg:col-span-4 border-b-4 lg:border-b-0 lg:border-r-4 border-[var(--nb-primary)] flex flex-col bg-[var(--nb-accent-light)] h-full min-h-0 overflow-hidden">
          <div className="p-4 border-b-4 border-[var(--nb-primary)] bg-[var(--nb-primary)] text-[var(--nb-bg)] flex-shrink-0">
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
          <div className="flex-1 min-h-0 overflow-y-auto divide-y-2 divide-[var(--nb-primary)]">
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
                        ? "bg-[var(--nb-accent)] text-[var(--accent-foreground,var(--nb-primary))] font-black"
                        : "hover:bg-[var(--nb-bg)] text-[var(--nb-primary)]"
                    }`}
                  >
                    <div className="w-10 h-10 border-3 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex items-center justify-center font-black text-sm text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] flex-shrink-0 overflow-hidden">
                      {u.avatar ? (
                        <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                      ) : (
                        u.name[0]?.toUpperCase()
                      )}
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
        <div className="lg:col-span-8 flex flex-col bg-[var(--nb-bg)] h-full min-h-0 overflow-hidden">
          {selectedUser ? (
            <>
              {/* Active Chat Topbar */}
              <div className="p-4 border-b-4 border-[var(--nb-primary)] bg-[var(--nb-accent-light)] flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-3 border-[var(--nb-primary)] bg-[var(--nb-accent)] flex items-center justify-center font-black text-sm text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] overflow-hidden flex-shrink-0">
                    {selectedUser.avatar ? (
                      <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" />
                    ) : (
                      selectedUser.name[0]?.toUpperCase()
                    )}
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
              <div className="flex-1 min-h-0 p-6 overflow-y-auto space-y-4 bg-[var(--nb-bg)] text-xs">
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
                    const avatar = isMe ? currentUser?.avatar : msg.sender?.avatar;
                    const senderName = isMe ? "Kamu" : msg.sender?.name;
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 items-start ${isMe ? "flex-row-reverse" : "flex-row"}`}
                      >
                        {/* Profile Avatar Badge */}
                        <div className="w-8 h-8 border-2 border-[var(--nb-primary)] bg-[var(--nb-accent)] flex items-center justify-center font-black text-xs text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] flex-shrink-0 overflow-hidden mt-0.5">
                          {avatar ? (
                            <img src={avatar} alt={senderName} className="w-full h-full object-cover" />
                          ) : (
                            (senderName || "U")[0]?.toUpperCase()
                          )}
                        </div>

                        {/* Bubble Text & Attachments */}
                        <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                          <div
                            className={`max-w-[80vw] sm:max-w-[420px] p-3.5 border-3 border-[var(--nb-primary)] font-bold text-xs sm:text-sm leading-relaxed ${
                              isMe
                                ? "bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)]"
                                : "bg-[var(--nb-bg)] text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)]"
                            }`}
                          >
                            {/* Image Attachment */}
                            {msg.attachment && msg.attachment_type === "image" && (
                              <div className="mb-2">
                                <img
                                  src={msg.attachment}
                                  alt="Attached Photo"
                                  className="max-w-full max-h-[280px] object-cover border-2 border-[var(--nb-primary)] cursor-pointer shadow-[2px_2px_0_var(--nb-primary)] hover:opacity-95 transition-opacity"
                                  onClick={() => setPreviewModalImg(msg.attachment!)}
                                />
                              </div>
                            )}

                            {/* File Attachment */}
                            {msg.attachment && msg.attachment_type === "file" && (
                              <div className="mb-2">
                                <a
                                  href={msg.attachment}
                                  download={msg.attachment_name || "file_download"}
                                  className="flex items-center gap-2 border-2 border-[var(--nb-primary)] p-2.5 bg-[var(--nb-accent-light)] hover:bg-[var(--nb-accent)] text-[var(--nb-primary)] font-black text-xs uppercase shadow-[2px_2px_0_var(--nb-primary)]"
                                >
                                  <IconFile /> {msg.attachment_name || "Unduh Dokumen"}
                                </a>
                              </div>
                            )}

                            {msg.message && <p className="whitespace-pre-wrap">{msg.message}</p>}
                          </div>
                          <span className="text-[9px] font-black uppercase opacity-40 mt-1 px-1 text-[var(--nb-primary)]">
                            {senderName} • {fmtTime(msg.created_at)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* File Preview Bar */}
              {filePreview && (
                <div className="bg-[var(--nb-accent-light)] border-t-3 border-[var(--nb-primary)] p-2.5 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {filePreview.isImage ? (
                      <img src={filePreview.url} alt="Preview" className="w-10 h-10 object-cover border-2 border-[var(--nb-primary)]" />
                    ) : (
                      <div className="w-10 h-10 bg-[var(--nb-accent)] border-2 border-[var(--nb-primary)] flex items-center justify-center text-[var(--nb-primary)]">
                        <IconFile />
                      </div>
                    )}
                    <span className="font-black text-xs uppercase text-[var(--nb-primary)] truncate max-w-[250px]">
                      {filePreview.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setFilePreview(null);
                    }}
                    className="p-1 text-[var(--nb-primary)] hover:text-red-500 cursor-pointer"
                  >
                    <IconClose />
                  </button>
                </div>
              )}

              {/* Input Message Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex gap-2 sm:gap-3 items-center"
              >
                {/* File Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[var(--nb-accent-light)] text-[var(--nb-primary)] border-3 border-[var(--nb-primary)] p-3 hover:bg-[var(--nb-accent)] cursor-pointer shadow-[2px_2px_0_var(--nb-primary)]"
                  title="Lampirkan Foto atau File"
                >
                  <IconPaperclip />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />

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
                  className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-3 border-[var(--nb-primary)] px-5 sm:px-6 py-3 font-black uppercase text-xs shadow-[4px_4px_0_var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer active:translate-x-0 active:translate-y-0 disabled:opacity-50 flex items-center gap-2"
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

      {/* Lightbox Photo Preview Modal */}
      {previewModalImg && (
        <div
          className="fixed inset-0 z-[99999] bg-[var(--nb-primary)] bg-opacity-80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewModalImg(null)}
        >
          <div
            className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[12px_12px_0_var(--nb-accent)] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-4 border-[var(--nb-primary)] pb-3">
              <span className="font-black text-xs uppercase tracking-wider text-[var(--nb-primary)]">
                Pratinjau Foto
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={previewModalImg}
                  download="chat_photo.png"
                  className="bg-[var(--nb-accent)] text-[var(--nb-primary)] border-2 border-[var(--nb-primary)] px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0_var(--nb-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer flex items-center gap-1.5"
                >
                  <IconDownload /> Unduh Foto
                </a>
                <button
                  onClick={() => setPreviewModalImg(null)}
                  className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-2 border-[var(--nb-primary)] p-1.5 font-black cursor-pointer"
                >
                  <IconClose />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center bg-[var(--nb-accent-light)] border-2 border-[var(--nb-primary)] p-2">
              <img
                src={previewModalImg}
                alt="Full Preview"
                className="max-w-full max-h-[75vh] object-contain border-2 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
