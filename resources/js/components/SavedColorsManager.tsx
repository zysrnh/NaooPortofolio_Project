import { useState, useEffect } from "react";
import axios from "axios";

const IconTrash = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const IconCopy = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;

export default function SavedColorsManager() {
  const [palettes, setPalettes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    fetchPalettes();
  }, []);

  const fetchPalettes = async () => {
    try {
      const res = await axios.get("/api/saved-colors");
      setPalettes(res.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const deletePalette = async (id: number) => {
    if (!confirm("Hapus box palet ini bang?")) return;
    try {
      await axios.delete(`/api/saved-colors/${id}`);
      setPalettes(palettes.filter(p => p.id !== id));
    } catch (e) {
      alert("Gagal hapus!");
    }
  };

  const copyPaletteHex = (colors: string[], id: number) => {
    navigator.clipboard.writeText(colors.join(", "));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return <div className="p-20 text-center font-black uppercase opacity-50 animate-pulse tracking-[0.5em]">Loading Vault...</div>;

  return (
    <div className="space-y-10 p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-[var(--nb-primary)] tracking-tight">Color <span className="text-[var(--nb-accent)]">Vault</span></h2>
          <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.3em] mt-2">Manage your saved color playlists and design box collections</p>
        </div>
        <div className="bg-[var(--nb-primary)] text-[var(--nb-bg)] px-6 py-3 font-black text-sm border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-accent)]">
          {palettes.length} COLLECTIONS
        </div>
      </div>

      {palettes.length === 0 ? (
        <div className="border-8 border-dashed border-[var(--nb-primary)] p-24 text-center opacity-20">
          <p className="font-black uppercase text-sm tracking-[0.4em]">Vault is empty</p>
          <p className="text-[10px] font-bold mt-4">Go to Tools and save your first palette box bang!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {palettes.map((p) => (
            <div key={p.id} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[8px_8px_0_var(--nb-primary)] group transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0_var(--nb-primary)] overflow-hidden">
              {/* Palette Preview */}
              <div className="flex h-32 border-b-4 border-[var(--nb-primary)]">
                {p.colors.map((c: string, idx: number) => (
                  <div 
                    key={idx} 
                    className="flex-1 h-full relative group/color cursor-pointer"
                    style={{ background: c }}
                    onClick={() => navigator.clipboard.writeText(c)}
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover/color:opacity-20 transition-opacity flex items-center justify-center">
                        <span className="text-[8px] font-black text-white bg-black/50 px-1">{c}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Meta */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 pr-4">
                    <h3 className="font-black text-xl uppercase leading-none truncate mb-2" title={p.name}>
                      {p.name || "Unnamed Box"}
                    </h3>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
                      Saved {new Date(p.created_at).toLocaleDateString()} • {p.colors.length} Colors
                    </p>
                  </div>
                  <button 
                    onClick={() => deletePalette(p.id)}
                    className="p-3 border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-[3px_3px_0_var(--nb-primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => copyPaletteHex(p.colors, p.id)}
                        className={`flex items-center justify-center gap-3 border-4 border-[var(--nb-primary)] py-3 font-black uppercase text-xs transition-all shadow-[4px_4px_0_var(--nb-primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        ${copiedId === p.id ? "bg-green-500 text-white" : "bg-[var(--nb-accent-light)] text-[var(--nb-primary)] hover:bg-[var(--nb-accent)]"}`}
                    >
                        {copiedId === p.id ? "COPIED ALL!" : (
                            <>
                            <IconCopy size={14} />
                            COPY HEX
                            </>
                        )}
                    </button>
                    <div className="flex flex-wrap gap-1 items-center justify-end">
                         {p.colors.map((c: string, idx: number) => (
                            <div key={idx} className="w-4 h-4 border-2 border-[var(--nb-primary)]" style={{ background: c }} />
                         ))}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
