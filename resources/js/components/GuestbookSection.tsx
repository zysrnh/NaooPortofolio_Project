import { useState, useEffect } from 'react';

interface Entry {
    id: number;
    name: string;
    message: string;
    avatar_color: string;
    created_at: string;
}

export default function GuestbookSection() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const fetchEntries = async () => {
        try {
            const res = await fetch('/api/guestbook');
            const data = await res.json();
            setEntries(data.data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchEntries(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !message) return;
        setSending(true);
        setError('');
        setSuccess(false);

        try {
            const res = await fetch('/api/guestbook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                body: JSON.stringify({ name, message })
            });
            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setName('');
                setMessage('');
                fetchEntries();
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(data.message || 'Gagal mengirim pesan.');
            }
        } catch (err) {
            setError('Terjadi kesalahan jaringan.');
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="max-w-4xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row gap-12">
                
                {/* Form LEFT */}
                <div className="flex-1">
                    <h2 className="text-4xl font-black uppercase text-[var(--nb-primary)] mb-2 tracking-tight">Guestbook</h2>
                    <p className="font-bold text-[var(--nb-primary)] opacity-60 mb-8 uppercase text-xs tracking-widest">Tinggalkan jejakmu di sini!</p>
                    
                    <form onSubmit={handleSubmit} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 shadow-[8px_8px_0_var(--nb-primary)] space-y-4">
                        <div>
                            <label className="block font-black uppercase text-[10px] tracking-widest mb-1 text-[var(--nb-primary)]">Nama Kamu</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Anonymous Hero"
                                className="w-full bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-3 font-bold text-sm outline-none focus:bg-[var(--nb-accent-light)] transition-colors"
                                maxLength={50}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-black uppercase text-[10px] tracking-widest mb-1 text-[var(--nb-primary)]">Pesan</label>
                            <textarea 
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Tulis sesuatu yang keren..."
                                className="w-full bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-3 font-bold text-sm outline-none focus:bg-[var(--nb-accent-light)] transition-colors min-h-[100px]"
                                maxLength={500}
                                required
                            />
                        </div>
                        
                        {error && <p className="text-red-500 font-black text-[10px] uppercase">{error}</p>}
                        {success && <p className="text-green-600 font-black text-[10px] uppercase">Pesan terkirim! Terima kasih 🔥</p>}

                        <button 
                            disabled={sending}
                            className="w-full bg-[var(--nb-primary)] text-[var(--nb-accent)] font-black uppercase py-4 border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-accent)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                        >
                            {sending ? 'Mengirim...' : 'Kirim Pesan →'}
                        </button>
                    </form>
                </div>

                {/* List RIGHT */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="font-black uppercase text-sm tracking-widest text-[var(--nb-primary)]">Pesan Terbaru</h3>
                         <div className="h-1 flex-1 mx-4 bg-[var(--nb-primary)] opacity-10" />
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {loading ? (
                            [1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 animate-pulse border-4 border-gray-200" />)
                        ) : entries.length === 0 ? (
                            <div className="text-center py-12 border-4 border-dashed border-[var(--nb-primary)] opacity-20">
                                <p className="font-black uppercase text-xs">Belum ada pesan</p>
                            </div>
                        ) : (
                            entries.map(entry => (
                                <div key={entry.id} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-4 shadow-[4px_4px_0_var(--nb-primary)] flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div 
                                        className="w-12 h-12 border-4 border-[var(--nb-primary)] flex-shrink-0 flex items-center justify-center font-black text-xl text-[var(--nb-primary)]"
                                        style={{ backgroundColor: entry.avatar_color }}
                                    >
                                        {entry.name[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-black text-xs uppercase tracking-tight text-[var(--nb-primary)]">{entry.name}</span>
                                            <span className="font-bold text-[8px] uppercase opacity-40">{new Date(entry.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="font-semibold text-sm text-[var(--nb-primary)] leading-tight">{entry.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--nb-primary); border: 2px solid var(--nb-bg); }
            `}</style>
        </section>
    );
}
