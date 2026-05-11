import { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface PaginatedResponse {
    data: User[];
    total: number;
}

function getCsrfToken(): string {
    const m = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : '';
}

export default function UserManager() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            setUsers(data.data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Hapus user ini?')) return;
        setDeleting(id);
        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: { 
                    'X-Requested-With': 'XMLHttpRequest', 
                    'X-XSRF-TOKEN': getCsrfToken(),
                    'Accept': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(users.filter(u => u.id !== id));
                setToast({ msg: 'User dihapus!', ok: true });
            } else {
                setToast({ msg: data.message || 'Gagal hapus user', ok: false });
            }
        } catch (e) {
            setToast({ msg: 'Error network', ok: false });
        } finally {
            setDeleting(null);
            setTimeout(() => setToast(null), 3000);
        }
    };

    if (loading) return <div className="font-black uppercase text-sm opacity-40 p-6 animate-pulse">Loading Users...</div>;

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="font-black uppercase text-2xl text-[var(--nb-primary)]">User Management</h2>
                    <p className="font-bold text-[10px] uppercase opacity-40 tracking-widest mt-1">Daftar semua orang yang sudah registrasi di web abang</p>
                </div>
                <div className="bg-[var(--nb-primary)] text-[var(--nb-accent)] px-4 py-2 border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] font-black text-xs uppercase">
                    Total: {users.length}
                </div>
            </div>

            <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] overflow-hidden">
                <div className="md:hidden p-3 bg-[var(--nb-accent-light)] border-b-2 border-[var(--nb-primary)] flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
                    <span className="font-black uppercase text-[9px] tracking-widest">Geser untuk liat semua →</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[500px] md:min-w-0">
                        <thead>
                            <tr className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-b-4 border-[var(--nb-primary)]">
                                <th className="p-3 sm:p-4 text-left font-black uppercase text-[10px] tracking-widest border-r-2 border-[var(--nb-bg)]">Name</th>
                                <th className="p-3 sm:p-4 text-left font-black uppercase text-[10px] tracking-widest border-r-2 border-[var(--nb-bg)]">Email</th>
                                <th className="p-3 sm:p-4 text-left font-black uppercase text-[10px] tracking-widest border-r-2 border-[var(--nb-bg)]">Role</th>
                                <th className="p-3 sm:p-4 text-left font-black uppercase text-[10px] tracking-widest border-r-2 border-[var(--nb-bg)] hidden sm:table-cell">Joined</th>
                                <th className="p-3 sm:p-4 text-center font-black uppercase text-[10px] tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={user.id} className="border-b-2 border-[var(--nb-primary)] hover:bg-[var(--nb-accent-light)] transition-colors" style={{ animationDelay: `${i * 0.05}s` }}>
                                    <td className="p-3 sm:p-4 font-black text-xs sm:text-sm text-[var(--nb-primary)] border-r-2 border-[var(--nb-primary)]">
                                        {user.name}
                                    </td>
                                    <td className="p-3 sm:p-4 font-bold text-[10px] sm:text-xs text-[var(--nb-primary)] opacity-70 border-r-2 border-[var(--nb-primary)]">
                                        {user.email}
                                    </td>
                                    <td className="p-3 sm:p-4 border-r-2 border-[var(--nb-primary)]">
                                        <span className={`px-2 py-1 font-black text-[8px] sm:text-[9px] uppercase border-2 border-[var(--nb-primary)] ${user.role === 'admin' ? 'bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)]' : 'bg-white text-[var(--nb-primary)]'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-3 sm:p-4 font-bold text-[9px] sm:text-[10px] text-[var(--nb-primary)] opacity-50 border-r-2 border-[var(--nb-primary)] hidden sm:table-cell">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 sm:p-4 text-center">
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            disabled={deleting === user.id}
                                            className="bg-red-500 text-white p-2 border-2 border-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all disabled:opacity-50"
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {users.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="font-black uppercase text-sm opacity-20">Belum ada user lain bang</p>
                    </div>
                )}
            </div>

            {toast && (
                <div className={`fixed bottom-8 right-8 px-6 py-4 border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-primary)] font-black uppercase text-xs animate-slideUp z-50 ${toast.ok ? 'bg-[var(--nb-accent)] text-[var(--nb-primary)]' : 'bg-red-500 text-white'}`}>
                    {toast.msg}
                </div>
            )}
        </div>
    );
}
