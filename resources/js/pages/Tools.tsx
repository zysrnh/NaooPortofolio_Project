import { useState, useEffect, useRef } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import axios from "axios";

// --- Icons ---
const IconCamera = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconSparkles = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.885L20 10.8l-5.088 1.915L13 18.6l-1.912-5.885L6 10.8l5.088-1.915z"/><path d="M5 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/><path d="M19 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/></svg>;
const IconKey = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5"/></svg>;
const IconRefresh = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;

// --- Tool Components ---

function ColorPicker() {
  const { auth } = usePage<{ auth: { user: any | null } }>().props;
  const [image, setImage] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState("#4ade80");
  const [autoPalette, setAutoPalette] = useState<string[]>([]);
  const [savedColors, setSavedColors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (auth?.user) fetchSavedColors();
  }, [auth?.user]);

  const fetchSavedColors = async () => {
    try {
      const res = await axios.get("/api/saved-colors");
      setSavedColors(res.data);
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
        setProcessing(false);
      };
      reader.readAsDataURL(file);
    }
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
        // Extract default palette on load
        setTimeout(extractPalette, 100);
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
      }
    }
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
    const colors: Record<string, number> = {};
    const step = 25;

    for (let i = 0; i < imageData.length; i += 4 * step) {
      const hex = "#" + rgbToHex(imageData[i], imageData[i+1], imageData[i+2]);
      if (hex !== "#000000" && hex !== "#ffffff") {
        colors[hex] = (colors[hex] || 0) + 1;
      }
    }

    const sorted = Object.entries(colors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);

    setAutoPalette(sorted);
    if (sorted[0]) setPickedColor(sorted[0]);
  };

  const saveColor = async () => {
    if (!auth?.user) return;
    setLoading(true);
    try {
      await axios.post("/api/saved-colors", { hex: pickedColor, label: "Picked Color" });
      fetchSavedColors();
    } catch (e) {
      alert("Gagal simpan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Picker */}
        <div className="space-y-6">
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
                {/* Float button to change image */}
                <button 
                  onClick={() => document.getElementById("img-upload")?.click()}
                  className="absolute top-4 right-4 bg-[var(--nb-bg)] border-2 border-[var(--nb-primary)] px-3 py-1.5 font-black uppercase text-[10px] shadow-[3px_3px_0_var(--nb-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_var(--nb-primary)] transition-all flex items-center gap-2"
                >
                  <IconRefresh /> Change Photo
                </button>
              </div>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] flex items-center justify-center mx-auto mb-4 rotate-3 shadow-[4px_4px_0_var(--nb-primary)] text-[var(--nb-primary)]">
                  <IconCamera />
                </div>
                <p className="font-black uppercase text-[var(--nb-primary)] text-sm sm:text-base">Upload Image</p>
                <p className="text-[10px] font-bold opacity-50 uppercase mt-1 tracking-widest">Click to select file</p>
              </div>
            )}
            <input 
              id="img-upload" type="file" accept="image/*" className="hidden" 
              onChange={handleImageUpload} 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {image && (
              <button 
                onClick={extractPalette}
                className="flex-1 btn-brutal border-4 border-[var(--nb-primary)] py-3 font-black uppercase bg-[var(--nb-accent-light)] text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] flex items-center justify-center gap-2"
              >
                <IconSparkles /> Auto Extract
              </button>
            )}

            <div className="flex-1 flex items-center gap-4 p-4 border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[4px_4px_0_var(--nb-primary)]">
              <div 
                className="w-12 h-12 border-4 border-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)]"
                style={{ background: pickedColor }}
              />
              <div className="flex-1">
                <p className="font-black text-xl uppercase text-[var(--nb-primary)] leading-none">{pickedColor}</p>
                <p className="text-[8px] font-bold opacity-40 uppercase tracking-widest mt-1">HEX CODE</p>
              </div>
              {auth?.user && (
                <button 
                  onClick={saveColor} disabled={loading}
                  className="btn-brutal border-4 border-[var(--nb-primary)] px-4 py-2 font-black uppercase bg-[var(--nb-accent)] text-[var(--nb-primary)] shadow-[3px_3px_0_var(--nb-primary)] text-xs"
                >
                  {loading ? "..." : "Save"}
                </button>
              )}
            </div>
          </div>

          {autoPalette.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em] text-center">Generated Palette</p>
              <div className="flex gap-3">
                {autoPalette.map((c, i) => (
                  <div 
                    key={i} onClick={() => setPickedColor(c)}
                    className={`flex-1 aspect-square border-4 border-[var(--nb-primary)] cursor-pointer transition-all ${pickedColor === c ? "scale-110 shadow-[4px_4px_0_var(--nb-primary)] z-10" : "opacity-80 hover:opacity-100 shadow-[2px_2px_0_var(--nb-primary)]"}`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: History / Login Prompt */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black uppercase text-xl text-[var(--nb-primary)] flex items-center gap-3">
              Collection
            </h3>
            {auth?.user && <span className="text-[10px] font-black px-3 py-1 bg-[var(--nb-primary)] text-[var(--nb-bg)] uppercase">{savedColors.length} Items</span>}
          </div>
          
          {!auth?.user ? (
            <div className="relative overflow-hidden border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[10px_10px_0_var(--nb-primary)]">
               <div className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] flex items-center justify-center mx-auto shadow-[4px_4px_0_var(--nb-primary)] text-[var(--nb-primary)]">
                     <IconKey />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-2xl text-[var(--nb-primary)] leading-tight">Member Only</h4>
                    <p className="text-[10px] font-bold opacity-50 uppercase mt-2 leading-relaxed px-6 tracking-wide">
                      Sign in to save your discovered palettes to the cloud and access them anytime from your dashboard.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => router.visit("/login")} className="btn-brutal border-4 border-[var(--nb-primary)] py-4 font-black uppercase bg-[var(--nb-primary)] text-[var(--nb-bg)] shadow-[4px_4px_0_var(--nb-accent)] text-sm">
                      Login Now
                    </button>
                    <button onClick={() => router.visit("/register")} className="btn-brutal border-4 border-[var(--nb-primary)] py-4 font-black uppercase bg-[var(--nb-bg)] text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] text-sm">
                      Create Account
                    </button>
                  </div>
               </div>
            </div>
          ) : savedColors.length === 0 ? (
            <div className="p-12 border-4 border-dashed border-[var(--nb-primary)] opacity-40 text-center bg-[var(--nb-bg)]">
              <p className="font-black uppercase text-xs tracking-widest leading-relaxed">No saved colors yet.<br/>Start by picking from a photo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {savedColors.slice(0, 9).map((c) => (
                <div key={c.id} className="group relative">
                  <div 
                    className="aspect-square border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0_var(--nb-primary)] p-2 bg-[var(--nb-bg)]"
                  >
                    <div className="w-full h-full" style={{ background: c.hex }} />
                    <p className="mt-2 text-[9px] font-black uppercase text-center tracking-tighter">{c.hex}</p>
                  </div>
                </div>
              ))}
              {savedColors.length > 9 && (
                <button onClick={() => router.visit("/dashboard")} className="aspect-square border-4 border-dashed border-[var(--nb-primary)] flex items-center justify-center font-black uppercase text-[10px] hover:bg-[var(--nb-accent-light)] transition-colors">
                  +{savedColors.length - 9} More
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
  { id: "picker", title: "Smart Color Picker", desc: "Extract colors from your favorite photos.", component: ColorPicker, icon: "🎨" },
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
            <p className="font-bold text-[var(--nb-primary)] opacity-70 max-w-2xl mx-auto text-xs sm:text-sm uppercase tracking-widest">
              Utility tools for modern designers & developers.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="lg:w-1/4 space-y-4">
              {TOOLS_CONFIG.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`w-full text-left p-5 border-4 border-[var(--nb-primary)] transition-all duration-150 flex items-center gap-4
                    ${activeTool === tool.id 
                      ? "bg-[var(--nb-accent)] shadow-none translate-x-[4px] translate-y-[4px]" 
                      : "bg-[var(--nb-bg)] shadow-[6px_6px_0_var(--nb-primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_var(--nb-primary)]"}`}
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] font-black text-lg">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-xs text-[var(--nb-primary)] leading-tight">{tool.title}</h3>
                  </div>
                </button>
              ))}
              <div className="p-5 border-4 border-dashed border-[var(--nb-primary)] opacity-30 text-center">
                <p className="font-black uppercase text-[9px] tracking-[0.3em]">Coming Soon</p>
              </div>
            </div>

            <div className="lg:flex-1">
              <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] p-6 sm:p-10 reveal">
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
