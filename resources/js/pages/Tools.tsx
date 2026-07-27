import { useState, useEffect, useRef } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import ChatbotWidget from "../components/ChatbotWidget";
import axios from "axios";

// --- Icons ---
const IconCamera = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const IconPipette = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22s3-1 5-3l11-11a2.828 2.828 0 10-4-4L3 15c-2 2-3 5-3 5z"/>
    <path d="M15 6l3 3"/>
  </svg>
);
const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"/>
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
  </svg>
);
const IconTrash = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
);
const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconKey = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5"/>
  </svg>
);
const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
const IconSparkles = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.885L20 10.8l-5.088 1.915L13 18.6l-1.912-5.885L6 10.8l5.088-1.915z"/>
  </svg>
);

export default function Tools() {
  const props = usePage().props as any;
  const auth = props.auth || { user: null };

  const [image, setImage] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState("#4ADE80");
  const [manualHex, setManualHex] = useState("#4ADE80");
  const [autoPalette, setAutoPalette] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [savedPalettes, setSavedPalettes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [paletteName, setPaletteName] = useState("");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (auth?.user) fetchSavedPalettes();
  }, [auth?.user]);

  const fetchSavedPalettes = async () => {
    try {
      const res = await axios.get("/api/saved-colors");
      if (Array.isArray(res.data)) {
        setSavedPalettes(res.data);
      }
    } catch (e) {}
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setAutoPalette([]);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const resetPicker = () => {
    setImage(null);
    setPickedColor("#4ADE80");
    setManualHex("#4ADE80");
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
        canvas.width = Math.round(img.naturalWidth * scale);
        canvas.height = Math.round(img.naturalHeight * scale);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setTimeout(extractPalette, 150);
      }
    }
  };

  const pickColorFromCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase();
      setPickedColor(hex);
      setManualHex(hex);
      addColorToStaging(hex);
    }
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0").toUpperCase();
  };

  const extractPalette = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorCounts: Record<string, number> = {};
    const step = Math.max(1, Math.floor((canvas.width * canvas.height) / 3000));
    
    for (let i = 0; i < imageData.length; i += step * 4) {
      const a = imageData[i + 3];
      if (a < 128) continue; // Skip transparent
      const hex = "#" + rgbToHex(imageData[i], imageData[i + 1], imageData[i + 2]);
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }

    const sorted = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(entry => entry[0]);

    setAutoPalette(sorted);
  };

  const addColorToStaging = (hex: string) => {
    const cleanHex = hex.toUpperCase();
    if (playlist.length < 6 && !playlist.includes(cleanHex)) {
      setPlaylist(prev => [...prev, cleanHex]);
    }
  };

  const addAllAutoToStaging = () => {
    const remainingSlots = 6 - playlist.length;
    if (remainingSlots <= 0) return;
    const newColors = autoPalette.filter(c => !playlist.includes(c)).slice(0, remainingSlots);
    setPlaylist(prev => [...prev, ...newColors]);
  };

  const handleNativeEyedropper = async () => {
    if ("EyeDropper" in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          const hex = result.sRGBHex.toUpperCase();
          setPickedColor(hex);
          setManualHex(hex);
          addColorToStaging(hex);
        }
      } catch (e) {
        // User canceled eyedropper
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const savePalette = async () => {
    if (!auth?.user || playlist.length === 0) return;
    setLoading(true);
    try {
      await axios.post("/api/saved-colors", {
        colors: playlist,
        name: paletteName.trim() || "My Color Box"
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setPaletteName("");
      setPlaylist([]);
      fetchSavedPalettes();
    } catch (e) {
      alert("Gagal menyimpan palet!");
    } finally {
      setLoading(false);
    }
  };

  const deleteSavedPalette = async (id: number) => {
    try {
      await axios.delete(`/api/saved-colors/${id}`);
      setSavedPalettes(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      alert("Gagal menghapus palet.");
    }
  };

  return (
    <>
      <Head title="Smart Color Picker - Developer Tools" />
      <Navbar />

      <main className="min-h-screen bg-[var(--nb-bg)] pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-12 text-center reveal">
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[var(--nb-primary)] mb-3 tracking-tighter leading-none">
              Smart <span className="text-[var(--nb-accent)]">Color Picker</span>
            </h1>
            <p className="font-bold text-[var(--nb-primary)] opacity-70 max-w-2xl mx-auto text-[10px] sm:text-xs uppercase tracking-[0.3em]">
              Extract, generate, and save color palettes from images or pick any color code
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Image Canvas & Color Picker Tools (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Image Upload / Drop Area */}
              <div 
                className={`aspect-video border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] flex items-center justify-center relative overflow-hidden transition-all duration-200 ${
                  !image 
                    ? `border-dashed cursor-pointer ${isDragging ? "bg-[var(--nb-accent-light)] border-dashed scale-[1.01]" : "hover:bg-[var(--nb-accent-light)]"}` 
                    : "shadow-[8px_8px_0_var(--nb-primary)]"
                }`}
                onClick={!image ? () => document.getElementById("img-upload")?.click() : undefined}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                {image ? (
                  <>
                    <img ref={imgRef} src={image} className="hidden" onLoad={drawImageOnCanvas} alt="Uploaded source" />
                    <canvas 
                      ref={canvasRef} 
                      onClick={pickColorFromCanvas} 
                      className="w-full h-full object-contain cursor-crosshair" 
                      title="Klik pada gambar untuk mengambil warna!"
                    />
                  </>
                ) : (
                  <div className="text-center p-6 space-y-3 pointer-events-none">
                    <div className="w-16 h-16 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] flex items-center justify-center mx-auto rotate-3 shadow-[4px_4px_0_var(--nb-primary)] text-[var(--nb-primary)] transition-transform hover:rotate-0">
                      <IconCamera />
                    </div>
                    <div>
                      <p className="font-black uppercase text-[var(--nb-primary)] text-sm tracking-tight">Upload or Drop Photo Here</p>
                      <p className="text-[10px] font-bold opacity-50 uppercase mt-1 tracking-widest">Supports PNG, JPG, WEBP formats</p>
                    </div>
                  </div>
                )}
                <input id="img-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>

              {/* Action buttons if image uploaded */}
              {image && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => document.getElementById("img-upload")?.click()} 
                    className="flex-1 bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] py-2.5 font-black uppercase text-xs shadow-[4px_4px_0_var(--nb-primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--nb-primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <IconRefresh /> Ganti Foto
                  </button>
                  <button 
                    onClick={resetPicker} 
                    className="bg-red-500 text-white border-3 border-[var(--nb-primary)] px-6 py-2.5 font-black uppercase text-xs shadow-[4px_4px_0_var(--nb-primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--nb-primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <IconTrash /> Reset
                  </button>
                </div>
              )}

              {/* Manual Color Picker & EyeDropper Control Card */}
              <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 shadow-[8px_8px_0_var(--nb-primary)] space-y-4">
                <h4 className="font-black uppercase text-xs tracking-widest text-[var(--nb-primary)] flex items-center gap-2">
                  <IconPipette /> Color Selection & Pipette
                </h4>

                <div className="flex flex-wrap items-center gap-4">
                  {/* Current Color Swatch */}
                  <div className="flex items-center gap-3 bg-[var(--nb-accent-light)] border-3 border-[var(--nb-primary)] p-2 pr-4">
                    <div 
                      className="w-10 h-10 border-2 border-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)]" 
                      style={{ backgroundColor: pickedColor }} 
                    />
                    <div>
                      <p className="text-[9px] font-black uppercase opacity-40">Picked Color</p>
                      <p className="font-black text-sm text-[var(--nb-primary)] tracking-wider">{pickedColor}</p>
                    </div>
                  </div>

                  {/* Native Eyedropper API Button (if supported) */}
                  {typeof window !== "undefined" && "EyeDropper" in window && (
                    <button
                      onClick={handleNativeEyedropper}
                      className="bg-[var(--nb-accent)] text-[var(--nb-primary)] border-3 border-[var(--nb-primary)] px-4 py-3 font-black uppercase text-xs shadow-[3px_3px_0_var(--nb-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_var(--nb-primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <IconPipette /> Pick From Screen
                    </button>
                  )}

                  {/* Manual HEX Input & Color Wheel */}
                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <input 
                      type="color" 
                      value={manualHex} 
                      onChange={e => {
                        const val = e.target.value.toUpperCase();
                        setManualHex(val);
                        setPickedColor(val);
                      }} 
                      className="w-10 h-10 border-3 border-[var(--nb-primary)] cursor-pointer p-0 bg-transparent"
                    />
                    <input 
                      type="text" 
                      value={manualHex} 
                      onChange={e => {
                        const val = e.target.value.toUpperCase();
                        setManualHex(val);
                        if (/^#[0-9A-F]{6}$/i.test(val)) setPickedColor(val);
                      }} 
                      className="flex-1 bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-3 py-2 font-black text-xs uppercase focus:outline-none focus:bg-[var(--nb-accent-light)]" 
                      placeholder="#HEX"
                    />
                    <button 
                      onClick={() => addColorToStaging(pickedColor)} 
                      disabled={playlist.length >= 6}
                      className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-3 border-[var(--nb-primary)] px-4 py-2 font-black uppercase text-xs shadow-[3px_3px_0_var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1"
                    >
                      <IconPlus /> Add
                    </button>
                  </div>
                </div>

                {/* Copied Toast Banner */}
                {copiedHex && (
                  <div className="bg-[var(--nb-accent)] text-[var(--nb-primary)] border-2 border-[var(--nb-primary)] p-2 text-center text-xs font-black uppercase animate-bounce shadow-[2px_2px_0_var(--nb-primary)]">
                    ✓ Copied {copiedHex} to clipboard!
                  </div>
                )}
              </div>

              {/* Auto Extracted Colors from Image */}
              {autoPalette.length > 0 && (
                <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 shadow-[8px_8px_0_var(--nb-accent-light)] space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-black uppercase text-xs tracking-widest text-[var(--nb-primary)] flex items-center gap-2">
                      <IconSparkles /> Dominant Colors Extracted
                    </h4>
                    <button
                      onClick={addAllAutoToStaging}
                      disabled={playlist.length >= 6}
                      className="border-2 border-[var(--nb-primary)] bg-[var(--nb-accent)] px-3 py-1 font-black text-[10px] uppercase shadow-[2px_2px_0_var(--nb-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:opacity-40 cursor-pointer transition-all"
                    >
                      + Add All to Staging
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {autoPalette.map((color, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          copyToClipboard(color);
                          addColorToStaging(color);
                        }}
                        className="group border-3 border-[var(--nb-primary)] p-2 text-center cursor-pointer bg-[var(--nb-bg)] shadow-[3px_3px_0_var(--nb-primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_var(--nb-primary)] transition-all"
                      >
                        <div className="w-full h-12 border-2 border-[var(--nb-primary)] mb-2" style={{ backgroundColor: color }} />
                        <p className="font-black text-[9px] uppercase text-[var(--nb-primary)] truncate">{color}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Staging Palette Card */}
              <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 shadow-[10px_10px_0_var(--nb-primary)] space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-black uppercase text-xs tracking-widest text-[var(--nb-primary)]">Staging Palette</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black opacity-50 uppercase">{playlist.length}/6 Colors</span>
                    {playlist.length > 0 && (
                      <button 
                        onClick={() => setPlaylist([])} 
                        className="text-red-500 font-black text-[10px] uppercase underline cursor-pointer hover:opacity-70"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                {/* Staging Colors Row */}
                <div className="flex flex-wrap gap-4 min-h-[70px] items-center p-3 border-3 border-dashed border-[var(--nb-primary)] bg-[var(--nb-accent-light)]">
                  {playlist.length === 0 ? (
                    <p className="text-center w-full text-[10px] font-bold opacity-40 uppercase tracking-widest">
                      Klik warna pada gambar, pipet, atau warna dominan untuk menambahkan ke sini...
                    </p>
                  ) : (
                    playlist.map((c, i) => (
                      <div key={i} className="group relative">
                        <div 
                          onClick={() => copyToClipboard(c)}
                          className="w-14 h-14 border-3 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] transition-transform hover:scale-105 cursor-pointer flex items-end justify-center pb-1" 
                          style={{ background: c }}
                        >
                          <span className="text-[8px] font-black text-white bg-black/80 px-1 py-0.5 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                            COPY
                          </span>
                        </div>
                        <button 
                          onClick={() => setPlaylist(playlist.filter(x => x !== c))} 
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-[var(--nb-primary)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <IconTrash size={10} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Save Palette Form */}
                {playlist.length > 0 && (
                  <div className="flex flex-col gap-3 relative pt-2">
                    {showSuccess && (
                      <div className="absolute inset-0 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] z-10 flex items-center justify-center animate-bounce shadow-[4px_4px_0_var(--nb-primary)]">
                        <span className="font-black uppercase text-xs">PALETTE SAVED TO VAULT! 🔥</span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={paletteName} 
                        onChange={e => setPaletteName(e.target.value)} 
                        placeholder="Nama Palet Warna..." 
                        className="flex-1 bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-4 py-2.5 font-bold text-xs uppercase placeholder:opacity-30 focus:outline-none" 
                      />
                      <button 
                        onClick={savePalette} 
                        disabled={loading || !auth?.user}
                        className="border-3 border-[var(--nb-primary)] px-6 py-2.5 font-black uppercase bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-xs disabled:opacity-50 cursor-pointer transition-all"
                      >
                        {loading ? "SAVING..." : "Save Box"}
                      </button>
                    </div>
                    {!auth?.user && (
                      <p className="text-[10px] font-bold text-red-500 uppercase text-center">
                        * Silakan login untuk menyimpan palet warna ini ke akun kamu.
                      </p>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Saved Palettes Vault (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="border-b-4 border-[var(--nb-primary)] pb-3">
                <h3 className="font-black uppercase text-xl text-[var(--nb-primary)] tracking-tight">Saved Palettes Vault</h3>
                <p className="text-[10px] font-bold opacity-60 uppercase">Koleksi palet warna yang sudah kamu simpan</p>
              </div>

              {!auth?.user ? (
                <div className="border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] p-8 text-center space-y-4 shadow-[8px_8px_0_var(--nb-accent)]">
                  <div className="w-14 h-14 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] flex items-center justify-center mx-auto text-[var(--nb-primary)] rotate-3">
                    <IconKey />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black uppercase text-sm tracking-wider">Login Required</p>
                    <p className="text-[10px] font-bold opacity-60 uppercase leading-relaxed">
                      Masuk ke akun kamu untuk menyimpan dan mengelola palet warna favorit.
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => router.visit("/login")}
                      className="flex-1 bg-[var(--nb-accent)] text-[var(--nb-primary)] border-3 border-[var(--nb-primary)] py-2 font-black uppercase text-xs shadow-[3px_3px_0_var(--nb-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer transition-all"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => router.visit("/register")}
                      className="flex-1 bg-[var(--nb-bg)] text-[var(--nb-primary)] border-3 border-[var(--nb-primary)] py-2 font-black uppercase text-xs shadow-[3px_3px_0_var(--nb-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer transition-all"
                    >
                      Daftar
                    </button>
                  </div>
                </div>
              ) : savedPalettes.length === 0 ? (
                <div className="border-4 border-dashed border-[var(--nb-primary)] p-12 text-center opacity-40">
                  <p className="font-black uppercase text-xs tracking-widest">Belum ada palet warna tersimpan.</p>
                </div>
              ) : (
                <div className="space-y-6 max-h-[750px] overflow-y-auto pr-1">
                  {savedPalettes.map((p) => (
                    <div 
                      key={p.id} 
                      className="border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[6px_6px_0_var(--nb-primary)] overflow-hidden transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_var(--nb-primary)]"
                    >
                      {/* Horizontal Color Bars */}
                      <div className="flex h-24 border-b-4 border-[var(--nb-primary)]">
                        {Array.isArray(p.colors) && p.colors.map((c: string, i: number) => (
                          <div 
                            key={i} 
                            className="flex-1 h-full relative group/color cursor-pointer" 
                            style={{ backgroundColor: c }}
                            onClick={() => copyToClipboard(c)}
                            title={`Klik untuk copy ${c}`}
                          >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 bg-black/40 transition-opacity">
                              <span className="text-[9px] font-black text-white bg-black px-1.5 py-0.5 uppercase tracking-wider">{c}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer Info */}
                      <div className="p-4 flex justify-between items-center bg-[var(--nb-accent-light)]">
                        <div>
                          <p className="font-black uppercase text-xs tracking-widest text-[var(--nb-primary)] mb-0.5">{p.name || "UNNAMED PALETTE"}</p>
                          <p className="text-[9px] font-bold opacity-40 uppercase">{Array.isArray(p.colors) ? p.colors.length : 0} Colors Saved</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => copyToClipboard(Array.isArray(p.colors) ? p.colors.join(", ") : "")}
                            className="border-2 border-[var(--nb-primary)] bg-[var(--nb-bg)] px-3 py-1 font-black uppercase text-[9px] hover:bg-[var(--nb-accent)] transition-colors shadow-[2px_2px_0_var(--nb-primary)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer flex items-center gap-1"
                          >
                            <IconCopy /> Copy All
                          </button>
                          <button 
                            onClick={() => deleteSavedPalette(p.id)}
                            className="border-2 border-[var(--nb-primary)] bg-red-500 text-white px-2 py-1 font-black uppercase text-[9px] shadow-[2px_2px_0_var(--nb-primary)] hover:bg-red-600 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                            title="Hapus Palet"
                          >
                            <IconTrash size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>
      </main>
      <ChatbotWidget />
    </>
  );
}
