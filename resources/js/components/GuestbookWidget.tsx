import { useState, useEffect, useRef } from 'react';

interface Entry {
  id: number;
  name: string;
  message: string;
  avatar_color: string;
  created_at: string;
}

function getCsrfToken(): string {
  const meta = null;
  if (meta) return '';
  // Fallback: read from cookie
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) return decodeURIComponent(match[1]);
  return '';
}

export default function GuestbookWidget() {
  const [open, setOpen]       = useState(false);
  const [tab, setTab]         = useState<'form' | 'list'>('form');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName]       = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);
  const [hasNew, setHasNew]   = useState(false);
  const panelRef              = useRef<HTMLDivElement>(null);

  const fetchEntries = async () => {
    try {
      const res  = await fetch('/api/guestbook');
      const data = await res.json();
      setEntries(data.data ?? []);
    } catch { /* silent */ }
  };

  useEffect(() => { fetchEntries(); }, []);

  // Pulse dot after 3 s to attract attention
  useEffect(() => {
    const t = setTimeout(() => setHasNew(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/guestbook', {
        method:  'POST',
        headers: {
          'Content-Type':     'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN':     getCsrfToken(),
        },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setName('');
        setMessage('');
        setHasNew(false);
        await fetchEntries();
        setTimeout(() => { setSuccess(false); setTab('list'); }, 1500);
      } else {
        setError(data.message ?? 'Gagal mengirim pesan.');
      }
    } catch {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setSending(false);
    }
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <>
      <style>{`
        @keyframes gb-bounce {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-6px) scale(1.05); }
        }
        @keyframes gb-slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes gb-pulse-ring {
          0%   { transform: scale(1);   opacity: .7; }
          100% { transform: scale(1.7); opacity: 0;  }
        }
        .gb-btn { animation: gb-bounce 2.8s ease-in-out 4s infinite; }
        .gb-btn:hover { animation: none; }
        .gb-panel { animation: gb-slide-up 0.3s cubic-bezier(0.16,1,0.3,1); }
        .gb-pulse::before {
          content: '';
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 3px solid var(--nb-accent);
          animation: gb-pulse-ring 1.5s ease-out infinite;
        }
        .gb-scrollbar::-webkit-scrollbar { width: 6px; }
        .gb-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .gb-scrollbar::-webkit-scrollbar-thumb { background: var(--nb-primary); }
      `}</style>

      {/* ── Floating Button ─────────────────────────── */}
      <div className="fixed bottom-6 left-6 z-[999]" style={{ zIndex: 9999 }}>
        <div className="relative">
          {/* pulse ring */}
          {hasNew && !open && (
            <span className="gb-pulse absolute inset-0 rounded-none pointer-events-none" />
          )}
          {/* unread dot */}
          {hasNew && !open && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 border-2 border-white rounded-full z-10 flex items-center justify-center">
              <span className="text-[7px] text-white font-black">!</span>
            </span>
          )}

          <button
            onClick={() => { setOpen(o => !o); setHasNew(false); }}
            className="gb-btn w-14 h-14 bg-[var(--nb-primary)] border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-accent)] flex items-center justify-center text-[var(--nb-accent)] hover:shadow-[6px_6px_0_var(--nb-accent)] hover:bg-[var(--nb-accent)] hover:text-[var(--nb-primary)] transition-all duration-150"
            title="Guestbook — Tinggalkan Pesan"
            aria-label="Open Guestbook"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                <line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/>
              </svg>
            )}
          </button>
        </div>

        {/* ── Panel ──────────────────────────────────── */}
        {open && (
          <div
            ref={panelRef}
            className="gb-panel absolute bottom-[68px] left-0 w-[340px] max-w-[calc(100vw-24px)] bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[8px_8px_0_var(--nb-primary)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--nb-primary)] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--nb-accent)] animate-pulse" />
                <span className="font-black text-[10px] uppercase tracking-[0.3em] text-[var(--nb-accent)]">Guestbook</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setTab('form')}
                  className={`px-3 py-1 font-black text-[9px] uppercase tracking-wider border-2 transition-colors ${
                    tab === 'form'
                      ? 'bg-[var(--nb-accent)] text-[var(--nb-primary)] border-[var(--nb-accent)]'
                      : 'text-[var(--nb-accent)] border-[var(--nb-accent)] opacity-50 hover:opacity-100'
                  }`}
                >
                  Tulis
                </button>
                <button
                  onClick={() => { setTab('list'); fetchEntries(); }}
                  className={`px-3 py-1 font-black text-[9px] uppercase tracking-wider border-2 transition-colors ${
                    tab === 'list'
                      ? 'bg-[var(--nb-accent)] text-[var(--nb-primary)] border-[var(--nb-accent)]'
                      : 'text-[var(--nb-accent)] border-[var(--nb-accent)] opacity-50 hover:opacity-100'
                  }`}
                >
                  Pesan ({entries.length})
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              {tab === 'form' ? (
                /* ── Form Tab ── */
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block font-black text-[9px] uppercase tracking-widest text-[var(--nb-primary)] mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Anonymous Hero"
                      maxLength={50}
                      required
                      className="w-full bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] p-2.5 text-sm font-bold outline-none focus:bg-[var(--nb-accent-light)] transition-colors"
                      style={{ border: '3px solid var(--nb-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block font-black text-[9px] uppercase tracking-widest text-[var(--nb-primary)] mb-1">
                      Pesan
                    </label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Tulis sesuatu yang keren..."
                      maxLength={300}
                      required
                      rows={3}
                      className="w-full bg-[var(--nb-bg)] p-2.5 text-sm font-bold outline-none focus:bg-[var(--nb-accent-light)] transition-colors resize-none"
                      style={{ border: '3px solid var(--nb-primary)' }}
                    />
                    <p className="text-right font-black text-[8px] opacity-30 mt-0.5">{message.length}/300</p>
                  </div>

                  {error && (
                    <p className="font-black text-[10px] uppercase text-red-500 bg-red-50 p-2 border-2 border-red-400">
                      {error}
                    </p>
                  )}
                  {success && (
                    <p className="font-black text-[10px] uppercase text-green-700 bg-green-50 p-2 border-2 border-green-400">
                      ✓ Pesan terkirim! Terima kasih 🔥
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending || !name.trim() || !message.trim()}
                    className="w-full bg-[var(--nb-primary)] text-[var(--nb-accent)] font-black uppercase text-xs py-3 border-4 border-[var(--nb-primary)] shadow-[3px_3px_0_var(--nb-accent)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-3 h-3 border-2 border-[var(--nb-accent)] border-t-transparent rounded-full animate-spin" />
                        Mengirim...
                      </span>
                    ) : 'Kirim Pesan →'}
                  </button>
                </form>
              ) : (
                /* ── List Tab ── */
                <div className="space-y-2 max-h-[280px] overflow-y-auto gb-scrollbar pr-1">
                  {entries.length === 0 ? (
                    <div className="py-8 text-center border-4 border-dashed border-[var(--nb-primary)] opacity-20">
                      <p className="font-black uppercase text-xs">Belum ada pesan</p>
                    </div>
                  ) : entries.map(entry => (
                    <div
                      key={entry.id}
                      className="flex gap-3 p-3 border-3 border-[var(--nb-primary)] bg-[var(--nb-bg)] hover:bg-[var(--nb-accent-light)] transition-colors"
                      style={{ border: '3px solid var(--nb-primary)' }}
                    >
                      <div
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center font-black text-sm text-[var(--nb-primary)] border-2 border-[var(--nb-primary)]"
                        style={{ backgroundColor: entry.avatar_color }}
                      >
                        {entry.name[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-1 mb-0.5">
                          <span className="font-black text-xs uppercase text-[var(--nb-primary)] truncate">{entry.name}</span>
                          <span className="font-bold text-[7px] uppercase opacity-30 flex-shrink-0">{fmtDate(entry.created_at)}</span>
                        </div>
                        <p className="font-semibold text-xs text-[var(--nb-primary)] leading-snug break-words">{entry.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t-4 border-[var(--nb-primary)] px-4 py-2 bg-[var(--nb-accent-light)] flex justify-between items-center">
              <span className="font-black text-[8px] uppercase tracking-widest text-[var(--nb-primary)] opacity-40">Naoo Portfolio</span>
              <span className="font-black text-[8px] uppercase text-[var(--nb-primary)] opacity-40">{entries.length} pesan</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
