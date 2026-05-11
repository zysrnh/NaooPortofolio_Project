import { useState, useEffect } from "react";
import axios from "axios";

const IconTrash = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const IconCopy = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;

export default function SavedColorsManager() {
  const [colors, setColors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const res = await axios.get("/api/saved-colors");
      setColors(res.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const deleteColor = async (id: number) => {
    if (!confirm("Hapus warna ini bang?")) return;
    try {
      await axios.delete(`/api/saved-colors/${id}`);
      setColors(colors.filter(c => c.id !== id));
    } catch (e) {
      alert("Gagal hapus!");
    }
  };

  const copyToClipboard = (hex: string, id: number) => {
    navigator.clipboard.writeText(hex);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) return <div className="p-10 text-center font-black uppercase opacity-50 animate-pulse">Loading Collection...</div>;

  return (
    <div className="space-y-8 p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase text-[var(--nb-primary)] tracking-tight">Saved <span className="text-[var(--nb-accent)]">Colors</span></h2>
          <p className="text-xs font-bold opacity-60 uppercase tracking-widest mt-1">Koleksi warna pilihan abang dari Color Picker</p>
        </div>
        <div className="bg-[var(--nb-primary)] text-[var(--nb-bg)] px-4 py-2 font-black text-sm border-2 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-accent)]">
          {colors.length} TOTAL
        </div>
      </div>

      {colors.length === 0 ? (
        <div className="border-4 border-dashed border-[var(--nb-primary)] p-20 text-center opacity-30">
          <p className="font-black uppercase text-sm tracking-widest">Belum ada warna tersimpan</p>
          <p className="text-xs font-bold mt-2">Pilih warna di halaman Tools bang!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {colors.map((c) => (
            <div key={c.id} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-primary)] group overflow-hidden transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--nb-primary)]">
              {/* Swatch */}
              <div className="h-32 border-b-4 border-[var(--nb-primary)] relative" style={{ background: c.hex }}>
                 <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
              
              {/* Meta */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-black text-xl uppercase leading-none">{c.hex}</p>
                    <p className="text-[10px] font-bold opacity-50 uppercase mt-1 tracking-wider">
                      Saved {new Date(c.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => deleteColor(c.id)}
                    className="p-2 border-2 border-[var(--nb-primary)] bg-[var(--nb-bg)] text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    title="Hapus"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>

                <button 
                  onClick={() => copyToClipboard(c.hex, c.id)}
                  className={`w-full flex items-center justify-center gap-2 border-2 border-[var(--nb-primary)] py-2 font-black uppercase text-xs transition-all
                    ${copied === c.id ? "bg-green-500 text-white" : "bg-[var(--nb-accent-light)] text-[var(--nb-primary)] hover:bg-[var(--nb-accent)]"}`}
                >
                  {copied === c.id ? "COPIED!" : (
                    <>
                      <IconCopy size={12} />
                      COPY HEX
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
