import { useState, useEffect, useRef } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import axios from "axios";

// --- Icons ---
const IconCamera = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconSparkles = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.885L20 10.8l-5.088 1.915L13 18.6l-1.912-5.885L6 10.8l5.088-1.915z"/><path d="M5 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/><path d="M19 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/></svg>;
const IconKey = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5"/></svg>;
const IconRefresh = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;
const IconTrash = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const IconPalette = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125 0-.937.75-1.688 1.688-1.688h1.937c3.063 0 5.625-2.5 5.625-5.625 0-4.82-4.114-8.75-9.063-8.75z"/></svg>;
const IconPlus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

// --- Tool Components ---

function ColorPicker() {
  const { auth } = usePage<{ auth: { user: any | null } }>().props;
  const [image, setImage] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState("#4ade80");
  const [autoPalette, setAutoPalette] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState<string[]>([]); // "Playlist" wadah warna
  const [savedPalettes, setSavedPalettes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paletteName, setPaletteName] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (auth?.user) fetchSavedPalettes();
  }, [auth?.user]);

  const fetchSavedPalettes = async () => {
    try {
      const res = await axios.get("/api/saved-colors");
      setSavedPalettes(res.data);
    } catch (e) {}
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("Gambar terlalu besar bang! Maksimal 8MB.");
        return;
      }
      setProcessing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setAutoPalette([]);
        setPlaylist([]);
        setProcessing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetPicker = () => {
    setImage(null);
    setPickedColor("#4ade80");
    setAutoPalette([]);
    setPlaylist([]);
    setPaletteName("");
  };

  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (canvas && img) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const maxWidth = 1600;
        const scale = Math.min(1, maxWidth / img.naturalWidth);
        canvas.width = img.naturalWidth * scale;
        canvas.height = img.naturalHeight * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setTimeout(extractPalette, 200);
      }
    }
  };

  const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
        setPickedColor(hex);
        addToPlaylist(hex);
      }
    }
  };

  const addToPlaylist = (hex: string) => {
    if (playlist.length >= 6) {
       // Auto replace last or just ignore? Let's limit to 6
       return;
    }
    if (!playlist.includes(hex)) {
      setPlaylist(prev => [...prev, hex]);
    }
  };

  const removeFromPlaylist = (hex: string) => {
    setPlaylist(prev => prev.filter(c => c !== hex));
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  };

  const extractPalette = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorCounts: Record<string, number> = {};
    const step = 30; // Better sampling

    for (let i = 0; i < imageData.length; i += 4 * step) {
      const r = imageData[i], g = imageData[i+1], b = imageData[i+2];
      // Skip extremes (too dark or too light)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      if (brightness < 15 || brightness > 240) continue;

      const hex = "#" + rgbToHex(r, g, b);
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }

    const sorted = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1]);

    const final: string[] = [];
    const threshold = 40; // Diff threshold to keep colors distinct

    const getDiff = (c1: string, c2: string) => {
        const r1 = parseInt(c1.substring(1,3), 16), g1 = parseInt(c1.substring(3,5), 16), b1 = parseInt(c1.substring(5,7), 16);
        const r2 = parseInt(c2.substring(1,3), 16), g2 = parseInt(c2.substring(3,5), 16), b2 = parseInt(c2.substring(5,7), 16);
        return Math.sqrt(Math.pow(r1-r2, 2) + Math.pow(g1-g2, 2) + Math.pow(b1-b2, 2));
    };

    for (const [hex] of sorted) {
        if (final.length >= 5) break;
        if (final.every(c => getDiff(c, hex) > threshold)) {
            final.push(hex);
        }
    }

    setAutoPalette(final);
    // Auto add all extracted to playlist? No, let user pick
  };

  const savePalette = async () => {
    if (!auth?.user || playlist.length === 0) return;
    setLoading(true);
    try {
      await axios.post("/api/saved-colors", { 
        colors: playlist, 
        name: paletteName || "My Awesome Palette",
        source_image: image // Optional: we could save the base64 but it's large
      });
      setPaletteName("");
      setPlaylist([]);
      fetchSavedPalettes();
    } catch (e) {
      alert("Gagal simpan palet!");
    } finally {
      setLoading(false);
    }
  };

  const copyPalette = (colors: string[], id: number) => {
    navigator.clipboard.writeText(colors.join(", "));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Picker & Playlist Staging */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div 
                className={`aspect-video border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex items-center justify-center transition-all relative overflow-hidden ${!image ? "border-dashed cursor-pointer hover:bg-[var(--nb-accent-light)]" : "shadow-[8px_8px_0_var(--nb-primary)]"}`}
                onClick={!image ? () => document.getElementById("img-upload")?.click() : undefined}
            >
                {image ? (
                <div className="w-full h-full relative">
                    <img 
                    ref={imgRef} src={image} alt="Upload" 
                    className="hidden" onLoad={drawImageOnCanvas} 
                    />
                    <canvas 
                    ref={canvasRef} 
                    onClick={pickColor}
                    className="w-full h-full object-contain cursor-crosshair"
                    />
                </div>
                ) : (
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] flex items-center justify-center mx-auto mb-4 rotate-3 shadow-[4px_4px_0_var(--nb-primary)] text-[var(--nb-primary)]">
                    <IconCamera />
                    </div>
                    <p className="font-black uppercase text-[var(--nb-primary)] text-sm sm:text-base tracking-tighter">Upload Photo</p>
                    <p className="text-[10px] font-bold opacity-50 uppercase mt-1 tracking-widest">Select file to start picking</p>
                </div>
                )}
                <input 
                id="img-upload" type="file" accept="image/*" className="hidden" 
                onChange={handleImageUpload} 
                />
            </div>

            {/* Controls relocated below image as requested */}
            {image && (
                <div className="flex gap-3 justify-center">
                    <button 
                        onClick={() => document.getElementById("img-upload")?.click()}
                        className="flex-1 bg-[var(--nb-bg)] border-2 border-[var(--nb-primary)] py-2 font-black uppercase text-[10px] shadow-[4px_4px_0_var(--nb-primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--nb-primary)] transition-all flex items-center justify-center gap-2"
                    >
                        <IconRefresh /> Change Photo
                    </button>
                    <button 
                        onClick={resetPicker}
                        className="flex-1 bg-red-500 text-white border-2 border-[var(--nb-primary)] py-2 font-black uppercase text-[10px] shadow-[4px_4px_0_var(--nb-primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--nb-primary)] transition-all flex items-center justify-center gap-2"
                    >
                        <IconTrash /> Reset Tool
                    </button>
                </div>
            )}
          </div>

          {/* Staging Area: Your Playlist */}
          <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 shadow-[10px_10px_0_var(--nb-accent-light)]">
             <div className="flex items-center justify-between mb-6">
                <h4 className="font-black uppercase text-sm tracking-widest text-[var(--nb-primary)]">Staging Palette</h4>
                <span className="text-[10px] font-black opacity-40 uppercase">{playlist.length}/6 Colors</span>
             </div>
             
             <div className="flex flex-wrap gap-4 mb-8 min-h-[60px] items-center">
                {playlist.length === 0 ? (
                    <p className="text-[11px] font-bold opacity-30 uppercase italic">Click image to add colors to playlist...</p>
                ) : (
                    playlist.map((c, i) => (
                        <div key={i} className="group relative">
                            <div className="w-14 h-14 border-4 border-[var(--nb-primary)] shadow-[3px_3px_0_var(--nb-primary)]" style={{ background: c }} />
                            <button 
                                onClick={() => removeFromPlaylist(c)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-[var(--nb-primary)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <IconTrash size={10} />
                            </button>
                            <p className="mt-2 text-[8px] font-black text-center">{c}</p>
                        </div>
                    ))
                )}
                {image && playlist.length < 6 && (
                    <div className="w-14 h-14 border-4 border-dashed border-[var(--nb-primary)] flex items-center justify-center opacity-20">
                        <IconPlus />
                    </div>
                )}
             </div>

             {playlist.length > 0 && (
                <div className="flex gap-2">
                    <input 
                        type="text" value={paletteName} onChange={e => setPaletteName(e.target.value)}
                        placeholder="Name your playlist (e.g. Vintage Mood)"
                        className="flex-1 bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] px-4 py-2 font-bold text-xs uppercase placeholder:opacity-30 focus:outline-none"
                    />
                    <button 
                        onClick={savePalette} disabled={loading}
                        className="btn-brutal border-4 border-[var(--nb-primary)] px-8 py-2 font-black uppercase bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] text-xs"
                    >
                        {loading ? "..." : "Save Box"}
                    </button>
                </div>
             )}
          </div>

          {autoPalette.length > 0 && (
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em]">Smart Suggested Palette</p>
              <div className="flex gap-3">
                {autoPalette.map((c, i) => (
                  <div 
                    key={i} onClick={() => addToPlaylist(c)}
                    className="flex-1 aspect-square border-4 border-[var(--nb-primary)] cursor-pointer transition-all hover:scale-105 shadow-[4px_4px_0_var(--nb-primary)] hover:shadow-[6px_6px_0_var(--nb-primary)] flex items-end justify-center pb-1"
                    style={{ background: c }}
                  >
                     <span className="bg-[var(--nb-bg)] border border-[var(--nb-primary)] px-1 font-black text-[7px] uppercase">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: History / Login Prompt */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black uppercase text-xl text-[var(--nb-primary)] tracking-tighter">
              Saved Palettes
            </h3>
            {auth?.user && <span className="text-[10px] font-black px-3 py-1 bg-[var(--nb-primary)] text-[var(--nb-bg)] uppercase">{savedPalettes.length} Box</span>}
          </div>
          
          {!auth?.user ? (
            <div className="relative overflow-hidden border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[10px_10px_0_var(--nb-primary)]">
               <div className="p-10 text-center space-y-8">
                  <div className="w-16 h-16 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] flex items-center justify-center mx-auto shadow-[4px_4px_0_var(--nb-primary)] text-[var(--nb-primary)]">
                     <IconKey />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-2xl text-[var(--nb-primary)] leading-tight tracking-tighter">Vault Locked</h4>
                    <p className="text-[10px] font-bold opacity-50 uppercase mt-2 leading-relaxed px-6 tracking-[0.2em]">
                      Unlock the ability to save custom playlists and categorize your design inspirations.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => router.visit("/login")} className="btn-brutal border-4 border-[var(--nb-primary)] py-4 font-black uppercase bg-[var(--nb-primary)] text-[var(--nb-bg)] shadow-[6px_6px_0_var(--nb-accent)] text-xs">
                      Login Now
                    </button>
                    <button onClick={() => router.visit("/register")} className="btn-brutal border-4 border-[var(--nb-primary)] py-4 font-black uppercase bg-[var(--nb-bg)] text-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-primary)] text-xs">
                      Join Community
                    </button>
                  </div>
               </div>
            </div>
          ) : savedPalettes.length === 0 ? (
            <div className="p-16 border-4 border-dashed border-[var(--nb-primary)] opacity-20 text-center bg-[var(--nb-bg)]">
              <p className="font-black uppercase text-xs tracking-widest leading-relaxed">No palettes in vault.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {savedPalettes.slice(0, 5).map((p) => (
                <div 
                    key={p.id} 
                    onClick={() => copyPalette(p.colors, p.id)}
                    className={`group border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] p-4 shadow-[6px_6px_0_var(--nb-primary)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[9px_9px_0_var(--nb-primary)] cursor-pointer
                    ${copiedId === p.id ? "bg-green-50" : ""}`}
                >
                    <div className="flex justify-between items-start mb-3">
                        <h5 className="font-black uppercase text-xs text-[var(--nb-primary)] truncate flex-1 pr-4">{p.name}</h5>
                        <span className="text-[8px] font-bold opacity-30 uppercase">{p.colors.length} Colors</span>
                    </div>
                    <div className="flex h-10 border-2 border-[var(--nb-primary)] overflow-hidden">
                        {p.colors.map((c: string, idx: number) => (
                            <div key={idx} className="flex-1 h-full" style={{ background: c }} />
                        ))}
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <p className="text-[8px] font-black opacity-40 uppercase">
                            {copiedId === p.id ? "Copied All HEX!" : "Click to Copy HEX List"}
                        </p>
                        <div className="flex gap-1">
                            {p.colors.map((c: string, idx: number) => (
                                <div key={idx} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                            ))}
                        </div>
                    </div>
                </div>
              ))}
              {savedPalettes.length > 5 && (
                <button onClick={() => router.visit("/dashboard")} className="w-full border-4 border-dashed border-[var(--nb-primary)] py-4 font-black uppercase text-xs opacity-50 hover:opacity-100 hover:bg-[var(--nb-accent-light)] transition-all">
                  View {savedPalettes.length - 5} More Palettes in Dashboard →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TOOLS_CONFIG = [
  { id: "picker", title: "Smart Color Picker", desc: "Extract colors from your favorite photos.", component: ColorPicker, icon: <IconPalette /> },
];

export default function Tools() {
  const [activeTool, setActiveTool] = useState(TOOLS_CONFIG[0].id);
  const ActiveComp = TOOLS_CONFIG.find(t => t.id === activeTool)?.component;

  return (
    <>
      <Head title="Tools - Developer Utilities" />
      <Navbar />

      <main className="min-h-screen bg-[var(--nb-bg)] pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-12 text-center reveal">
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[var(--nb-primary)] mb-4 tracking-tighter leading-none">
              Dev <span className="text-[var(--nb-accent)]">Tools</span>
            </h1>
            <p className="font-bold text-[var(--nb-primary)] opacity-70 max-w-2xl mx-auto text-[10px] sm:text-xs uppercase tracking-[0.3em]">
              Professional utilities for modern creators
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            <div className="lg:w-1/4 space-y-4">
              {TOOLS_CONFIG.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`w-full text-left p-6 border-4 border-[var(--nb-primary)] transition-all duration-150 flex items-center gap-4
                    ${activeTool === tool.id 
                      ? "bg-[var(--nb-accent)] shadow-none translate-x-[4px] translate-y-[4px]" 
                      : "bg-[var(--nb-bg)] shadow-[6px_6px_0_var(--nb-primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_var(--nb-primary)]"}`}
                >
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] font-black text-lg ${activeTool === tool.id ? "bg-[var(--nb-bg)]" : ""}`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-xs text-[var(--nb-primary)] tracking-widest leading-tight">{tool.title}</h3>
                  </div>
                </button>
              ))}
              <div className="p-6 border-4 border-dashed border-[var(--nb-primary)] opacity-10 text-center">
                <p className="font-black uppercase text-[8px] tracking-[0.4em]">Next Module Coming Soon</p>
              </div>
            </div>

            <div className="lg:flex-1">
              <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] p-6 sm:p-12 reveal">
                {ActiveComp ? <ActiveComp /> : null}
              </div>
            </div>

          </div>

        </div>
      </main>

      <style>{`
        .reveal { animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes revealUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .btn-brutal:active { transform: translate(4px, 4px); shadow: none; }
      `}</style>
    </>
  );
}
