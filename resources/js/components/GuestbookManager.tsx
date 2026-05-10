import { useState, useEffect } from "react";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  is_visible: boolean;
  avatar_color: string;
  ip_address: string;
  created_at: string;
}

export default function GuestbookManager() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/guestbook");
      const data = await res.json();
      setEntries(data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  const toggleVisible = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/guestbook/${id}`, { 
        method: "PATCH",
        headers: { "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as any)?.content }
      });
      if (res.ok) fetchEntries();
    } catch (e) { console.error(e); }
  };

  const deleteEntry = async (id: number) => {
    if (!confirm("Hapus pesan ini permanen?")) return;
    try {
      const res = await fetch(`/api/admin/guestbook/${id}`, { 
        method: "DELETE",
        headers: { "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as any)?.content }
      });
      if (res.ok) fetchEntries();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="font-black text-2xl uppercase text-[var(--nb-primary)]">Guestbook Moderation</h2>
        <button onClick={fetchEntries} className="btn-brutal bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] p-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        </button>
      </div>

      <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[8px_8px_0_var(--nb-primary)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--nb-primary)] text-[var(--nb-bg)]">
              <th className="p-4 font-black uppercase text-xs tracking-widest">User</th>
              <th className="p-4 font-black uppercase text-xs tracking-widest">Message</th>
              <th className="p-4 font-black uppercase text-xs tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-10 text-center font-bold animate-pulse">Loading...</td></tr>
            ) : entries.length === 0 ? (
              <tr><td colSpan={3} className="p-10 text-center font-bold opacity-30">Belum ada pesan masuk.</td></tr>
            ) : (
              entries.map(entry => (
                <tr key={entry.id} className="border-b-4 border-[var(--nb-primary)] hover:bg-[var(--nb-accent-light)] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border-2 border-[var(--nb-primary)] flex-shrink-0 flex items-center justify-center font-black text-sm" style={{ backgroundColor: entry.avatar_color }}>
                        {entry.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase leading-tight">{entry.name}</p>
                        <p className="font-bold text-[8px] opacity-40 uppercase">{entry.ip_address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-semibold text-[var(--nb-primary)] line-clamp-2">{entry.message}</p>
                    <p className="text-[8px] font-black opacity-30 uppercase mt-1">{new Date(entry.created_at).toLocaleString()}</p>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                        <button 
                            onClick={() => toggleVisible(entry.id)}
                            className={`px-3 py-1 border-2 border-[var(--nb-primary)] font-black text-[10px] uppercase shadow-[2px_2px_0_var(--nb-primary)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all ${entry.is_visible ? 'bg-green-400' : 'bg-gray-300 opacity-50'}`}
                        >
                            {entry.is_visible ? 'Visible' : 'Hidden'}
                        </button>
                        <button 
                            onClick={() => deleteEntry(entry.id)}
                            className="p-1.5 border-2 border-[var(--nb-primary)] bg-red-400 shadow-[2px_2px_0_var(--nb-primary)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                        </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
