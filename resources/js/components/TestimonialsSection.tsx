import { useState, useEffect, useRef } from 'react';
import { usePage, router } from '@inertiajs/react';

interface Entry {
  id: number;
  name: string;
  message: string;
  avatar_color: string;
  created_at: string;
}

function getCsrfToken(): string {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) return decodeURIComponent(match[1]);
  return '';
}

export default function TestimonialsSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName]       = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res  = await fetch('/api/guestbook');
      const data = await res.json();
      setEntries(data.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  };

  const { auth } = usePage().props as any;
  const user = auth?.user;

  useEffect(() => { fetchEntries(); }, []);
  useEffect(() => { if(user) setName(user.name); }, [user]);

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
        await fetchEntries();
        setTimeout(() => { setSuccess(false); }, 3000);
      } else {
        setError(data.message ?? 'Gagal mengirim testimonial.');
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
    <section id="testimonials" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 reveal from-bottom">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Left: Info & Form */}
        <div className="md:w-1/3 space-y-6">
          <div>
            <h2 className="text-4xl font-black uppercase text-[var(--nb-primary)] mb-4 leading-none">Testimonials</h2>
            <p className="font-bold text-[var(--nb-primary)] opacity-70 uppercase tracking-wide text-sm">
              Apa kata mereka tentang project atau kerjasama dengan saya? Tinggalkan pesan atau kesan Anda di sini!
            </p>
          </div>

          {!user ? (
            <div className="bg-[var(--nb-primary)] border-4 border-[var(--nb-primary)] p-8 shadow-[8px_8px_0_var(--nb-accent)] text-center space-y-6">
              <div className="w-16 h-16 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] mx-auto flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--nb-primary)" strokeWidth="3" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="space-y-2">
                <p className="font-black text-[var(--nb-bg)] uppercase text-sm tracking-widest">Wajib Login Bang!</p>
                <p className="font-bold text-[var(--nb-accent)] opacity-70 uppercase text-[10px] tracking-widest leading-relaxed">
                  Daftar dulu biar testimonial kamu resmi dan tercatat di sistem
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => router.visit('/login')}
                  className="w-full bg-[var(--nb-accent)] text-[var(--nb-primary)] font-black uppercase text-xs py-3 border-4 border-[var(--nb-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Masuk Sekarang →
                </button>
                <button 
                  onClick={() => router.visit('/register')}
                  className="w-full bg-[var(--nb-bg)] text-[var(--nb-primary)] font-black uppercase text-xs py-3 border-4 border-[var(--nb-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Belum Punya Akun? Daftar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 shadow-[8px_8px_0_var(--nb-primary)] space-y-4">
              <div>
                <label className="block font-black text-[10px] uppercase tracking-[0.2em] text-[var(--nb-primary)] mb-2">Nama Kamu (Otomatis)</label>
                <div className="w-full bg-[var(--nb-accent-light)] border-3 border-[var(--nb-primary)] p-3 text-sm font-black text-[var(--nb-primary)] opacity-80" style={{ border: '3px solid var(--nb-primary)' }}>
                  {user.name}
                </div>
              </div>
              <div>
                <label className="block font-black text-[10px] uppercase tracking-[0.2em] text-[var(--nb-primary)] mb-2">Pesan / Testimonial</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tulis kesan Anda..."
                  className="w-full bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] p-3 text-sm font-bold outline-none focus:bg-[var(--nb-accent-light)] transition-colors resize-none h-32"
                  style={{ border: '3px solid var(--nb-primary)' }}
                  required
                />
              </div>

              {error && <p className="text-red-500 font-black text-[10px] uppercase">{error}</p>}
              {success && <p className="text-green-600 font-black text-[10px] uppercase">✓ Testimonial dikirim! Menunggu moderasi.</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[var(--nb-primary)] text-[var(--nb-accent)] font-black uppercase text-xs py-4 border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-accent)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
              >
                {sending ? 'Mengirim...' : 'Kirim Testimonial →'}
              </button>
            </form>
          )}
        </div>

        {/* Right: List of Testimonials */}
        <div className="md:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] opacity-50 animate-pulse" />
              ))
            ) : entries.length === 0 ? (
              <div className="col-span-full py-20 text-center border-4 border-dashed border-[var(--nb-primary)] opacity-20">
                <p className="font-black uppercase text-sm tracking-[0.3em]">Belum ada testimonial</p>
              </div>
            ) : entries.map(entry => (
              <div key={entry.id} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 shadow-[6px_6px_0_var(--nb-primary)] hover:-translate-y-1 transition-transform group">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 border-3 border-[var(--nb-primary)] flex items-center justify-center font-black text-[var(--nb-primary)]"
                    style={{ backgroundColor: entry.avatar_color }}
                  >
                    {entry.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-black uppercase text-xs text-[var(--nb-primary)] leading-none mb-1">{entry.name}</p>
                    <p className="font-bold text-[9px] uppercase text-[var(--nb-primary)] opacity-40">{fmtDate(entry.created_at)}</p>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute -top-2 -left-2 text-3xl font-black text-[var(--nb-accent)] opacity-30 select-none">"</span>
                  <p className="font-bold text-sm text-[var(--nb-primary)] leading-relaxed italic relative z-10 pl-2">
                    {entry.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
