import { useState, useEffect, useRef, useCallback } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconLayers   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IconLock     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const IconExternal = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IconHero     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconFolder   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>;
const IconUser     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconEye      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconPlus     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconClose    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconSearch   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconCheck    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconSave     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconUpload   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconSpin     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "hmSpin 0.8s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>;
const IconCrop     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 2 6 8 2 8"/><polyline points="18 22 18 16 22 16"/><path d="M2 14h14V2"/><path d="M10 22H22V10"/></svg>;
const IconZoomIn   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconZoomOut  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconRefresh  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;

// ── Types ─────────────────────────────────────────────────────────────────────
interface TSItem   { id: number; name: string; icon: string; category: string; is_visible: boolean; }
interface HeroData { name: string; title: string; bio: string; photo: string | null; }

const FALLBACK_ICON  = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3C/svg%3E";
const FALLBACK_PHOTO = "/profile/Mboy.jpeg";

// Crop aspect ratio: portrait 4:5 (cocok untuk foto profil)
const CROP_ASPECT_W = 4;
const CROP_ASPECT_H = 5;

function getCsrfToken(): string {
  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  if (meta?.content) return meta.content;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// ── ImageCropModal ────────────────────────────────────────────────────────────
interface CropState {
  scale: number;
  offsetX: number;
  offsetY: number;
}

function ImageCropModal({ src, onConfirm, onCancel }: {
  src: string;
  onConfirm: (croppedBase64: string) => void;
  onCancel: () => void;
}) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const imgRef      = useRef<HTMLImageElement | null>(null);
  const stateRef    = useRef<CropState>({ scale: 1, offsetX: 0, offsetY: 0 });
  const dragRef     = useRef<{ active: boolean; startX: number; startY: number; ox: number; oy: number }>({ active: false, startX: 0, startY: 0, ox: 0, oy: 0 });
  const rafRef      = useRef<number | null>(null);

  // Canvas display size
  const CANVAS_W = 400;
  const CANVAS_H = Math.round(CANVAS_W * CROP_ASPECT_H / CROP_ASPECT_W); // 500

  // ── Draw ───────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d")!;
    const { scale, offsetX, offsetY } = stateRef.current;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background gelap di luar crop
    ctx.fillStyle = "#0B1957";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Gambar foto
    const drawW = img.naturalWidth  * scale;
    const drawH = img.naturalHeight * scale;
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    // Overlay gelap di luar crop box (crop box = full canvas tapi dengan border indicator)
    // Pakai clip region untuk nunjukin area crop
    ctx.save();
    ctx.strokeStyle = "#9ECCFA";
    ctx.lineWidth   = 3;
    ctx.setLineDash([]);
    ctx.strokeRect(2, 2, CANVAS_W - 4, CANVAS_H - 4);

    // Grid rule-of-thirds
    ctx.strokeStyle = "rgba(158,204,250,0.25)";
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(CANVAS_W / 3, 0); ctx.lineTo(CANVAS_W / 3, CANVAS_H);
    ctx.moveTo(CANVAS_W * 2 / 3, 0); ctx.lineTo(CANVAS_W * 2 / 3, CANVAS_H);
    ctx.moveTo(0, CANVAS_H / 3); ctx.lineTo(CANVAS_W, CANVAS_H / 3);
    ctx.moveTo(0, CANVAS_H * 2 / 3); ctx.lineTo(CANVAS_W, CANVAS_H * 2 / 3);
    ctx.stroke();

    // Corner brackets (brutalist style)
    const BL = 24;
    ctx.strokeStyle = "#9ECCFA";
    ctx.lineWidth   = 4;
    ctx.beginPath();
    // top-left
    ctx.moveTo(2, 2 + BL); ctx.lineTo(2, 2); ctx.lineTo(2 + BL, 2);
    // top-right
    ctx.moveTo(CANVAS_W - 2 - BL, 2); ctx.lineTo(CANVAS_W - 2, 2); ctx.lineTo(CANVAS_W - 2, 2 + BL);
    // bottom-left
    ctx.moveTo(2, CANVAS_H - 2 - BL); ctx.lineTo(2, CANVAS_H - 2); ctx.lineTo(2 + BL, CANVAS_H - 2);
    // bottom-right
    ctx.moveTo(CANVAS_W - 2 - BL, CANVAS_H - 2); ctx.lineTo(CANVAS_W - 2, CANVAS_H - 2); ctx.lineTo(CANVAS_W - 2, CANVAS_H - 2 - BL);
    ctx.stroke();
    ctx.restore();
  }, []);

  // ── Init image ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      // Fit image ke canvas (cover)
      const scaleX = CANVAS_W / img.naturalWidth;
      const scaleY = CANVAS_H / img.naturalHeight;
      const scale  = Math.max(scaleX, scaleY);
      const drawW  = img.naturalWidth  * scale;
      const drawH  = img.naturalHeight * scale;
      stateRef.current = {
        scale,
        offsetX: (CANVAS_W - drawW) / 2,
        offsetY: (CANVAS_H - drawH) / 2,
      };
      draw();
    };
    img.crossOrigin = "anonymous";
    img.src = src;
  }, [src, draw]);

  // ── Clamp offset supaya gambar selalu nutup canvas ─────────────────────────
  const clamp = (s: CropState): CropState => {
    const img = imgRef.current;
    if (!img) return s;
    const drawW = img.naturalWidth  * s.scale;
    const drawH = img.naturalHeight * s.scale;
    const minX  = Math.min(0, CANVAS_W - drawW);
    const minY  = Math.min(0, CANVAS_H - drawH);
    return {
      scale:   s.scale,
      offsetX: Math.max(minX, Math.min(0, s.offsetX)),
      offsetY: Math.max(minY, Math.min(0, s.offsetY)),
    };
  };

  const requestDraw = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  // ── Drag handlers ───────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, ox: stateRef.current.offsetX, oy: stateRef.current.offsetY };
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    stateRef.current = clamp({ ...stateRef.current, offsetX: d.ox + dx, offsetY: d.oy + dy });
    requestDraw();
  }, [requestDraw]);

  const onMouseUp = useCallback(() => { dragRef.current.active = false; }, []);

  // ── Touch handlers ──────────────────────────────────────────────────────────
  const lastTouchDist = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      dragRef.current = { active: true, startX: e.touches[0].clientX, startY: e.touches[0].clientY, ox: stateRef.current.offsetX, oy: stateRef.current.offsetY };
      lastTouchDist.current = null;
    } else if (e.touches.length === 2) {
      dragRef.current.active = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist.current = Math.hypot(dx, dy);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && dragRef.current.active) {
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      stateRef.current = clamp({ ...stateRef.current, offsetX: dragRef.current.ox + dx, offsetY: dragRef.current.oy + dy });
      requestDraw();
    } else if (e.touches.length === 2 && lastTouchDist.current !== null) {
      const dx   = e.touches[0].clientX - e.touches[1].clientX;
      const dy   = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const delta = dist / lastTouchDist.current;
      lastTouchDist.current = dist;
      zoom(delta > 1 ? 0.05 : -0.05);
    }
  };

  const onTouchEnd = () => { dragRef.current.active = false; };

  // ── Wheel zoom ──────────────────────────────────────────────────────────────
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoom(e.deltaY < 0 ? 0.07 : -0.07);
  };

  const zoom = (delta: number) => {
    const img = imgRef.current;
    if (!img) return;
    const minScale = Math.max(CANVAS_W / img.naturalWidth, CANVAS_H / img.naturalHeight);
    const newScale = Math.max(minScale, Math.min(5, stateRef.current.scale + delta * stateRef.current.scale));
    // Zoom ke center canvas
    const cx = CANVAS_W / 2;
    const cy = CANVAS_H / 2;
    const ratio = newScale / stateRef.current.scale;
    stateRef.current = clamp({
      scale:   newScale,
      offsetX: cx - (cx - stateRef.current.offsetX) * ratio,
      offsetY: cy - (cy - stateRef.current.offsetY) * ratio,
    });
    requestDraw();
  };

  // ── Reset ───────────────────────────────────────────────────────────────────
  const resetCrop = () => {
    const img = imgRef.current;
    if (!img) return;
    const scaleX = CANVAS_W / img.naturalWidth;
    const scaleY = CANVAS_H / img.naturalHeight;
    const scale  = Math.max(scaleX, scaleY);
    const drawW  = img.naturalWidth  * scale;
    const drawH  = img.naturalHeight * scale;
    stateRef.current = { scale, offsetX: (CANVAS_W - drawW) / 2, offsetY: (CANVAS_H - drawH) / 2 };
    requestDraw();
  };

  // ── Global mouse events ─────────────────────────────────────────────────────
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // ── Confirm crop ─────────────────────────────────────────────────────────────
  const handleConfirm = () => {
    const img = imgRef.current;
    if (!img) return;

    // Export dengan resolusi lebih tinggi (2x)
    const EXPORT_W = CANVAS_W * 2;
    const EXPORT_H = CANVAS_H * 2;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width  = EXPORT_W;
    exportCanvas.height = EXPORT_H;
    const ctx = exportCanvas.getContext("2d")!;
    const { scale, offsetX, offsetY } = stateRef.current;
    ctx.drawImage(img, offsetX * 2, offsetY * 2, img.naturalWidth * scale * 2, img.naturalHeight * scale * 2);
    onConfirm(exportCanvas.toDataURL("image/jpeg", 0.92));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{ background: "rgba(11,25,87,0.85)", backdropFilter: "blur(6px)" }}>
      <div className="bg-[#0B1957] border-4 border-[#9ECCFA] shadow-[16px_16px_0_#9ECCFA] w-full max-w-lg flex flex-col"
        style={{ animation: "hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)" }}>

        {/* Header */}
        <div className="border-b-4 border-[#9ECCFA] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#9ECCFA]">
            <IconCrop />
            <div>
              <span className="font-black uppercase text-sm tracking-widest text-[#9ECCFA] block">Crop Foto</span>
              <span className="font-semibold text-[10px] text-[#D1E8FF] opacity-60 uppercase tracking-wide">Drag untuk geser · Scroll untuk zoom</span>
            </div>
          </div>
          <button className="text-[#9ECCFA] hover:text-white transition-colors" onClick={onCancel}><IconClose /></button>
        </div>

        {/* Canvas area */}
        <div className="relative flex justify-center bg-[#040d3a] border-b-4 border-[#9ECCFA]">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            style={{ display: "block", cursor: "grab", width: "100%", maxWidth: CANVAS_W, userSelect: "none", touchAction: "none" }}
            onMouseDown={onMouseDown}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
          {/* Aspect ratio badge */}
          <div className="absolute top-3 left-3 bg-[#0B1957] border-2 border-[#9ECCFA] px-2 py-1">
            <span className="font-black text-[10px] text-[#9ECCFA] uppercase tracking-widest">{CROP_ASPECT_W}:{CROP_ASPECT_H}</span>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="px-6 py-4 flex items-center justify-between border-b-4 border-[#9ECCFA]">
          <div className="flex items-center gap-2">
            <span className="font-black text-[10px] text-[#9ECCFA] uppercase tracking-widest opacity-60">Zoom</span>
            <button onClick={() => zoom(-0.15)}
              style={{ border:"2px solid #9ECCFA", background:"transparent", color:"#9ECCFA", width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.1s ease", fontFamily:"inherit" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#9ECCFA"; (e.currentTarget as HTMLElement).style.color = "#0B1957"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#9ECCFA"; }}>
              <IconZoomOut />
            </button>
            <button onClick={() => zoom(0.15)}
              style={{ border:"2px solid #9ECCFA", background:"transparent", color:"#9ECCFA", width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.1s ease", fontFamily:"inherit" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#9ECCFA"; (e.currentTarget as HTMLElement).style.color = "#0B1957"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#9ECCFA"; }}>
              <IconZoomIn />
            </button>
          </div>
          <button onClick={resetCrop}
            style={{ display:"flex", alignItems:"center", gap:6, border:"2px solid #9ECCFA", background:"transparent", color:"#9ECCFA", padding:"6px 12px", fontWeight:900, fontSize:11, textTransform:"uppercase", letterSpacing:"0.07em", cursor:"pointer", transition:"all 0.1s ease", fontFamily:"inherit" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#9ECCFA"; (e.currentTarget as HTMLElement).style.color = "#0B1957"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#9ECCFA"; }}>
            <IconRefresh /> Reset
          </button>
        </div>

        {/* Action buttons */}
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={onCancel}
            style={{ border:"4px solid #9ECCFA", background:"transparent", color:"#9ECCFA", padding:"10px 20px", fontWeight:900, fontSize:12, textTransform:"uppercase", letterSpacing:"0.07em", cursor:"pointer", transition:"all 0.1s ease", fontFamily:"inherit" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translate(0,0)"; }}>
            Batal
          </button>
          <button onClick={handleConfirm}
            style={{ display:"flex", alignItems:"center", gap:8, border:"4px solid #9ECCFA", background:"#9ECCFA", color:"#0B1957", padding:"10px 24px", fontWeight:900, fontSize:12, textTransform:"uppercase", letterSpacing:"0.07em", cursor:"pointer", boxShadow:"4px 4px 0 rgba(158,204,250,0.3)", transition:"all 0.1s ease", fontFamily:"inherit" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 rgba(158,204,250,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translate(0,0)"; (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 rgba(158,204,250,0.3)"; }}>
            <IconCheck /> Gunakan Foto Ini
          </button>
        </div>
      </div>
    </div>
  );
}

// ── AddStackModal ─────────────────────────────────────────────────────────────
function AddStackModal({ hiddenStacks, adding, onAdd, onClose }: {
  hiddenStacks: TSItem[]; adding: number | null;
  onAdd: (stack: TSItem) => void; onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = hiddenStacks.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );
  const grouped = filtered.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, TSItem[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(11,25,87,0.75)", backdropFilter: "blur(4px)" }}>
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[12px_12px_0_#0B1957] w-full max-w-lg max-h-[80vh] flex flex-col"
        style={{ animation: "hmSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
        <div className="bg-[#0B1957] border-b-4 border-[#0B1957] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 text-[#9ECCFA]">
            <IconPlus />
            <span className="font-black uppercase text-sm tracking-widest">Tambah ke Homepage</span>
          </div>
          <button className="text-[#9ECCFA] hover:text-white transition-colors" onClick={onClose}><IconClose /></button>
        </div>
        <div className="px-5 pt-4 pb-2 flex-shrink-0">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B1957] opacity-40 pointer-events-none"><IconSearch /></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama atau kategori..."
              className="w-full border-4 border-[#0B1957] bg-white pl-9 pr-4 py-2.5 font-bold text-sm text-[#0B1957] placeholder-[#0B1957] placeholder-opacity-30 focus:outline-none focus:shadow-[4px_4px_0_#9ECCFA] transition-shadow" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-black text-sm uppercase text-[#0B1957] opacity-40 tracking-widest">
                {hiddenStacks.length === 0 ? "Semua stack sudah tampil di homepage" : "Tidak ditemukan"}
              </p>
            </div>
          ) : (
            Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="mb-4">
                <p className="font-black text-[10px] uppercase tracking-[0.25em] text-[#0B1957] opacity-40 mb-2 mt-3">{cat}</p>
                <div className="flex flex-col gap-2">
                  {items.map(stack => {
                    const isAdding = adding === stack.id;
                    return (
                      <button key={stack.id} disabled={isAdding} onClick={() => onAdd(stack)}
                        className="flex items-center gap-3 p-3 bg-white hover:bg-[#D1E8FF] transition-all text-left w-full group"
                        style={{ border: "3px solid #0B1957", boxShadow: "3px 3px 0 #0B1957", opacity: isAdding ? 0.6 : 1, cursor: isAdding ? "wait" : "pointer" }}
                        onMouseEnter={e => { if (!isAdding) (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translate(0,0)"; }}>
                        <img src={stack.icon} alt={stack.name}
                          style={{ width: 32, height: 32, objectFit: "cover", border: "2px solid #0B1957", flexShrink: 0 }}
                          onError={e => { (e.target as HTMLImageElement).src = FALLBACK_ICON; }} />
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-xs uppercase text-[#0B1957] tracking-wide">{stack.name}</p>
                          <p className="font-semibold text-[10px] text-[#0B1957] opacity-40 uppercase tracking-widest">{stack.category}</p>
                        </div>
                        <div className="flex-shrink-0 text-[#0B1957] opacity-0 group-hover:opacity-60 transition-opacity">
                          {isAdding ? <span style={{ animation: "hmSpin 0.6s linear infinite", display: "inline-block" }}>⟳</span> : <IconPlus />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t-4 border-[#0B1957] bg-[#0B1957] px-6 py-3 flex items-center justify-between flex-shrink-0">
          <span className="font-black text-[10px] text-[#9ECCFA] opacity-60 uppercase tracking-widest">{hiddenStacks.length} stack belum ditampilkan</span>
          <button onClick={onClose} className="border-2 border-[#9ECCFA] px-4 py-1.5 font-black text-xs uppercase text-[#9ECCFA] hover:bg-[#9ECCFA] hover:text-[#0B1957] transition-colors">Tutup</button>
        </div>
      </div>
    </div>
  );
}

// ── TechStackVisibility ───────────────────────────────────────────────────────
function TechStackVisibility() {
  const [stacks,   setStacks]   = useState<TSItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [toggling, setToggling] = useState<number | null>(null);
  const [adding,   setAdding]   = useState<number | null>(null);
  const [activeTab,setActiveTab]= useState(0);
  const [animating,setAnimating]= useState(false);
  const [showModal,setShowModal]= useState(false);
  const [toast,    setToast]    = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 2500); };

  useEffect(() => {
    fetch("/api/tech-stacks")
      .then(r => r.json())
      .then(data => { setStacks(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories    = Array.from(new Set(stacks.filter(s => s.is_visible).map(s => s.category)));
  const visibleStacks = stacks.filter(s => s.is_visible);
  const hiddenStacks  = stacks.filter(s => !s.is_visible);
  const currentTechs  = visibleStacks.filter(s => s.category === categories[activeTab]);

  useEffect(() => { setActiveTab(0); }, [categories.length]);

  const switchTab = (i: number) => {
    if (i === activeTab) return;
    setAnimating(true);
    setTimeout(() => { setActiveTab(i); setAnimating(false); }, 150);
  };

  const handleToggle = async (stack: TSItem) => {
    setToggling(stack.id);
    try {
      const res = await fetch(`/api/tech-stacks/${stack.id}/toggle`, { method: "PATCH", headers: { "X-CSRF-TOKEN": getCsrfToken() } });
      const updated = await res.json();
      if (updated?.id) { setStacks(prev => prev.map(s => s.id === stack.id ? updated : s)); showToast(`"${stack.name}" ${updated.is_visible ? "ditampilkan" : "disembunyikan"}`); }
    } catch { showToast("Gagal update!", false); }
    finally { setToggling(null); }
  };

  const handleAdd = async (stack: TSItem) => {
    setAdding(stack.id);
    try {
      const res = await fetch(`/api/tech-stacks/${stack.id}/toggle`, { method: "PATCH", headers: { "X-CSRF-TOKEN": getCsrfToken() } });
      const updated = await res.json();
      if (updated?.id) { setStacks(prev => prev.map(s => s.id === stack.id ? updated : s)); showToast(`"${stack.name}" ditambahkan ke homepage!`); }
    } catch { showToast("Gagal menambahkan!", false); }
    finally { setAdding(null); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="border-4 border-[#0B1957] bg-[#9ECCFA] text-[#0B1957] font-black text-xs px-3 py-1.5 uppercase tracking-widest">{visibleStacks.length} Tampil</span>
          <span className="border-4 border-[#0B1957] bg-[#F8F3EA] text-[#0B1957] font-black text-xs px-3 py-1.5 uppercase tracking-widest">{hiddenStacks.length} Disembunyikan</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-xs text-[#0B1957] opacity-50 uppercase tracking-wide hidden sm:block">Klik chip untuk toggle</p>
          <button onClick={() => setShowModal(true)} disabled={loading || hiddenStacks.length === 0}
            style={{ display:"flex", alignItems:"center", gap:6, border:"4px solid #0B1957", background: hiddenStacks.length === 0 ? "#D1E8FF" : "#0B1957", color: hiddenStacks.length === 0 ? "#0B1957" : "#9ECCFA", padding:"8px 16px", fontWeight:900, fontSize:12, textTransform:"uppercase", letterSpacing:"0.07em", cursor: (loading || hiddenStacks.length === 0) ? "not-allowed" : "pointer", boxShadow:"4px 4px 0 #9ECCFA", opacity: (loading || hiddenStacks.length === 0) ? 0.5 : 1, transition:"transform 0.08s ease", fontFamily:"inherit" }}
            onMouseEnter={e => { if (!loading && hiddenStacks.length > 0) (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translate(0,0)"; }}>
            <IconPlus /> Tambah Stack
            {hiddenStacks.length > 0 && <span style={{ background:"#9ECCFA", color:"#0B1957", border:"2px solid #9ECCFA", fontSize:10, fontWeight:900, padding:"1px 6px", marginLeft:2 }}>{hiddenStacks.length}</span>}
          </button>
        </div>
      </div>

      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[8px_8px_0_#0B1957] overflow-hidden">
        {!loading && categories.length > 0 && (
          <div className="flex border-b-4 border-[#0B1957] overflow-x-auto">
            {categories.map((cat, i) => (
              <button key={cat} onClick={() => switchTab(i)}
                className={`flex-shrink-0 flex-1 py-3 px-4 font-black uppercase text-xs tracking-wider border-r-4 border-[#0B1957] last:border-r-0 transition-all duration-150 whitespace-nowrap ${activeTab === i ? "bg-[#0B1957] text-[#9ECCFA]" : "bg-[#F8F3EA] text-[#0B1957] hover:bg-[#D1E8FF]"}`}>
                {cat}
                <span className={`ml-2 text-[10px] font-black ${activeTab === i ? "text-[#9ECCFA] opacity-70" : "opacity-40"}`}>{visibleStacks.filter(s => s.category === cat).length}</span>
              </button>
            ))}
          </div>
        )}
        <div className="p-6 sm:p-8 min-h-[160px] flex flex-wrap gap-3 items-start content-start"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)", transition: "opacity 0.15s ease, transform 0.15s ease" }}>
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ display:"inline-flex", alignItems:"center", gap:8, border:"3px solid #0B1957", padding:"7px 10px 7px 7px", background:"#D1E8FF", opacity:0.5, animation:"hmPulse 1.2s ease infinite" }}>
              <div style={{ width:26, height:26, background:"#9ECCFA", border:"2px solid #0B1957" }} />
              <span style={{ minWidth:60, background:"#9ECCFA", color:"transparent" }}>___</span>
            </div>
          ))}
          {!loading && visibleStacks.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center py-10 gap-4">
              <p className="font-bold text-xs uppercase text-[#0B1957] opacity-40 tracking-widest text-center">Belum ada stack yang ditampilkan</p>
              <button onClick={() => setShowModal(true)} disabled={hiddenStacks.length === 0}
                style={{ display:"flex", alignItems:"center", gap:6, border:"3px dashed #0B1957", background:"transparent", color:"#0B1957", padding:"8px 20px", fontWeight:900, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", cursor: hiddenStacks.length === 0 ? "not-allowed" : "pointer", opacity: hiddenStacks.length === 0 ? 0.4 : 0.7, fontFamily:"inherit" }}>
                <IconPlus /> Tambah stack pertama
              </button>
            </div>
          )}
          {!loading && visibleStacks.length > 0 && currentTechs.length === 0 && (
            <p className="font-bold text-xs uppercase text-[#0B1957] opacity-40 tracking-widest self-center w-full text-center py-8">Tidak ada stack di kategori ini</p>
          )}
          {!loading && currentTechs.map(tech => {
            const isTogglingThis = toggling === tech.id;
            return (
              <button key={tech.id} onClick={() => !isTogglingThis && handleToggle(tech)} disabled={isTogglingThis} title="Klik untuk sembunyikan"
                style={{ display:"inline-flex", alignItems:"center", gap:8, border:"3px solid #0B1957", padding:"7px 10px 7px 7px", background:"#F8F3EA", opacity: isTogglingThis ? 0.5 : 1, boxShadow:"3px 3px 0 #0B1957", cursor: isTogglingThis ? "wait" : "pointer", fontFamily:"inherit", fontWeight:800, fontSize:11, textTransform:"uppercase", letterSpacing:"0.06em", color:"#0B1957", transition:"all 0.12s ease" }}
                onMouseEnter={e => { if (!isTogglingThis) (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translate(0,0)"; }}>
                <img src={tech.icon} alt={tech.name} style={{ width:26, height:26, objectFit:"cover", border:"2px solid #0B1957", flexShrink:0 }} onError={e => { (e.target as HTMLImageElement).src = FALLBACK_ICON; }} />
                <span>{tech.name}</span>
                <span style={{ display:"flex", alignItems:"center", marginLeft:2, opacity:0.6 }}>
                  {isTogglingThis ? <span style={{ animation:"hmSpin 0.6s linear infinite", display:"inline-block" }}>⟳</span> : <IconEye />}
                </span>
              </button>
            );
          })}
        </div>
        <div className="border-t-4 border-[#0B1957] bg-[#0B1957] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 border-2 border-[#9ECCFA] bg-[#9ECCFA]" /><span className="font-black text-[10px] text-[#9ECCFA] uppercase tracking-widest">Tampil di homepage</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 border-2 border-[#9ECCFA] bg-transparent" /><span className="font-black text-[10px] text-[#9ECCFA] opacity-60 uppercase tracking-widest">Disembunyikan</span></div>
          </div>
          <span className="font-bold text-[10px] text-[#D1E8FF] opacity-50 uppercase tracking-widest hidden sm:block">Perubahan langsung tersimpan</span>
        </div>
      </div>

      {showModal && <AddStackModal hiddenStacks={hiddenStacks} adding={adding} onAdd={handleAdd} onClose={() => setShowModal(false)} />}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 z-[999] flex items-center gap-3 border-4 border-[#0B1957] px-5 py-3 font-black uppercase text-sm tracking-wide shadow-[6px_6px_0_#0B1957] ${toast.ok ? "bg-[#9ECCFA] text-[#0B1957]" : "bg-red-500 text-white"}`} style={{ transform: "translateX(-50%)" }}>
          {toast.ok ? <IconCheck /> : null}{toast.msg}
        </div>
      )}
    </div>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────────
function HeroSection() {
  const [form,      setForm]      = useState<HeroData>({ name: "", title: "", bio: "", photo: null });
  const [preview,   setPreview]   = useState<string | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [dirty,     setDirty]     = useState(false);
  const [dragging,  setDragging]  = useState(false);
  const [toast,     setToast]     = useState<{ msg: string; ok: boolean } | null>(null);
  // Crop state
  const [cropSrc,   setCropSrc]   = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 2500); };

  useEffect(() => {
    fetch("/api/hero")
      .then(r => r.json())
      .then(data => {
        setForm({ name: data.name ?? "", title: data.title ?? "", bio: data.bio ?? "", photo: data.photo ?? null });
        setPreview(data.photo ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof HeroData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  // ── File → buka crop modal ──────────────────────────────────────────────────
  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) { showToast("File harus berupa gambar!", false); return; }
    if (file.size > 10 * 1024 * 1024)   { showToast("Ukuran max 10MB!", false); return; }
    const b64 = await toBase64(file);
    setCropSrc(b64); // buka crop modal
  };

  // ── Crop confirm → set ke form ──────────────────────────────────────────────
  const handleCropConfirm = (croppedBase64: string) => {
    setForm(prev => ({ ...prev, photo: croppedBase64 }));
    setPreview(croppedBase64);
    setDirty(true);
    setCropSrc(null);
  };

  // ── URL foto manual (skip crop) ─────────────────────────────────────────────
  const handleUrlChange = (url: string) => {
    handleChange("photo", url);
    setPreview(url);
  };

  const handleSave = async () => {
    if (!form.name.trim())  { showToast("Nama wajib diisi!", false); return; }
    if (!form.title.trim()) { showToast("Title wajib diisi!", false); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": getCsrfToken() },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      if (updated?.id || updated?.name) {
        setForm({ name: updated.name, title: updated.title, bio: updated.bio ?? "", photo: updated.photo });
        setPreview(updated.photo);
        setDirty(false);
        showToast("Hero section berhasil disimpan!");
      } else {
        showToast("Gagal menyimpan!", false);
      }
    } catch { showToast("Terjadi kesalahan!", false); }
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[8px_8px_0_#0B1957] p-8 space-y-4">
        {[80, 60, 40, 100].map((w, i) => (
          <div key={i} className="h-10 bg-[#D1E8FF] border-2 border-[#0B1957]" style={{ width: `${w}%`, animation: "hmPulse 1.2s ease infinite" }} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Preview mini */}
      <div className="mb-5 bg-[#0B1957] border-4 border-[#0B1957] shadow-[6px_6px_0_#9ECCFA] p-5 flex items-center gap-5">
        <div className="flex-shrink-0" style={{ width:64, height:80, border:"3px solid #9ECCFA", overflow:"hidden", position:"relative", background:"#1a2f7a" }}>
          <img src={preview ?? FALLBACK_PHOTO} alt="preview"
            style={{ position:"static", width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
            onError={e => { (e.target as HTMLImageElement).src = FALLBACK_PHOTO; }} />
        </div>
        <div>
          <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-widest mb-1">Preview</p>
          <p className="font-black text-xl text-[#F8F3EA] uppercase leading-tight">{form.name || "—"}</p>
          <p className="font-bold text-xs text-[#9ECCFA] uppercase tracking-wider mt-1">{form.title || "—"}</p>
          <p className="font-semibold text-xs text-[#D1E8FF] mt-1 opacity-70 line-clamp-1">{form.bio || "—"}</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[8px_8px_0_#0B1957] overflow-hidden">
        <div className="p-6 sm:p-8 space-y-5">

          {/* Nama + Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-black text-xs uppercase tracking-widest text-[#0B1957] mb-2">Nama <span className="text-red-500">*</span></label>
              <input value={form.name} onChange={e => handleChange("name", e.target.value)} placeholder="Yusron"
                className="w-full border-4 border-[#0B1957] bg-white px-4 py-3 font-bold text-sm text-[#0B1957] placeholder-[#0B1957] placeholder-opacity-30 focus:outline-none focus:shadow-[4px_4px_0_#9ECCFA] transition-shadow" />
            </div>
            <div>
              <label className="block font-black text-xs uppercase tracking-widest text-[#0B1957] mb-2">Title / Role <span className="text-red-500">*</span></label>
              <input value={form.title} onChange={e => handleChange("title", e.target.value)} placeholder="IT Programmer"
                className="w-full border-4 border-[#0B1957] bg-white px-4 py-3 font-bold text-sm text-[#0B1957] placeholder-[#0B1957] placeholder-opacity-30 focus:outline-none focus:shadow-[4px_4px_0_#9ECCFA] transition-shadow" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-black text-xs uppercase tracking-widest text-[#0B1957]">Bio</label>
              <span className="font-bold text-xs text-[#0B1957] opacity-40">{form.bio.length}/500</span>
            </div>
            <textarea value={form.bio} onChange={e => handleChange("bio", e.target.value)} rows={3} maxLength={500}
              placeholder="Saya membangun aplikasi web modern..."
              className="w-full border-4 border-[#0B1957] bg-white px-4 py-3 font-semibold text-sm text-[#0B1957] placeholder-[#0B1957] placeholder-opacity-30 focus:outline-none focus:shadow-[4px_4px_0_#9ECCFA] transition-shadow resize-none" />
          </div>

          {/* Foto + Crop */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest text-[#0B1957] mb-2">
              Foto Profil
              <span className="ml-2 font-semibold text-[#0B1957] opacity-40 normal-case tracking-normal text-[10px]">— akan di-crop otomatis 4:5</span>
            </label>
            <div className="flex gap-4 items-start flex-col sm:flex-row">

              {/* Preview foto + tombol re-crop */}
              <div className="flex-shrink-0 flex flex-col gap-2 items-center">
                <div style={{ width:96, height:112, border:"4px solid #0B1957", overflow:"hidden", boxShadow:"4px 4px 0 #0B1957", background:"#D1E8FF", position:"relative" }} className="group">
                  <img src={preview ?? FALLBACK_PHOTO} alt="foto"
                    style={{ position:"static", width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center" }}
                    onError={e => { (e.target as HTMLImageElement).src = FALLBACK_PHOTO; }} />
                  {/* Overlay re-crop */}
                  {preview && preview !== FALLBACK_PHOTO && (
                    <div className="absolute inset-0 bg-[#0B1957] bg-opacity-0 group-hover:bg-opacity-70 transition-all flex items-center justify-center cursor-pointer"
                      onClick={() => { if (preview) setCropSrc(preview); }}>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-1">
                        <span className="text-[#9ECCFA]"><IconCrop /></span>
                        <span className="font-black text-[9px] text-[#9ECCFA] uppercase tracking-widest">Re-crop</span>
                      </span>
                    </div>
                  )}
                </div>
                {preview && preview !== FALLBACK_PHOTO && (
                  <button onClick={() => setCropSrc(preview!)}
                    style={{ display:"flex", alignItems:"center", gap:4, border:"2px solid #0B1957", background:"transparent", color:"#0B1957", padding:"4px 10px", fontWeight:900, fontSize:10, textTransform:"uppercase", letterSpacing:"0.07em", cursor:"pointer", transition:"all 0.1s ease", fontFamily:"inherit", whiteSpace:"nowrap" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#0B1957"; (e.currentTarget as HTMLElement).style.color = "#9ECCFA"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#0B1957"; }}>
                    <IconCrop /> Re-crop
                  </button>
                )}
              </div>

              <div className="flex-1">
                {/* Drop zone */}
                <div
                  className={`border-4 border-dashed ${dragging ? "border-[#9ECCFA] bg-[#D1E8FF]" : "border-[#0B1957] bg-white"} p-5 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#D1E8FF] transition-all`}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}>
                  <div className="text-[#0B1957] opacity-40"><IconUpload /></div>
                  <p className="font-black text-xs uppercase text-[#0B1957] tracking-wide">Drop foto di sini</p>
                  <p className="font-semibold text-xs text-[#0B1957] opacity-50">atau klik untuk pilih</p>
                  <p className="font-bold text-[10px] text-[#0B1957] opacity-30">PNG, JPG — Max 10MB · Akan dibuka di crop editor</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />

                {/* URL input (skip crop) */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    value={form.photo?.startsWith("data:") ? "" : (form.photo ?? "")}
                    onChange={e => handleUrlChange(e.target.value)}
                    placeholder="atau masukkan URL foto (skip crop)..."
                    className="flex-1 border-4 border-[#0B1957] bg-white px-4 py-2.5 font-bold text-xs text-[#0B1957] placeholder-[#0B1957] placeholder-opacity-30 focus:outline-none focus:shadow-[4px_4px_0_#9ECCFA] transition-shadow" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer simpan */}
        <div className="border-t-4 border-[#0B1957] bg-[#0B1957] px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-[10px] text-[#D1E8FF] opacity-60 uppercase tracking-widest hidden sm:block">
            {dirty ? "⚠ Ada perubahan yang belum disimpan" : "✓ Semua perubahan tersimpan"}
          </span>
          <button onClick={handleSave} disabled={saving || !dirty}
            style={{ display:"flex", alignItems:"center", gap:8, border:"4px solid #9ECCFA", background: dirty ? "#9ECCFA" : "transparent", color: dirty ? "#0B1957" : "#9ECCFA", padding:"10px 24px", fontWeight:900, fontSize:13, textTransform:"uppercase", letterSpacing:"0.07em", cursor: (saving || !dirty) ? "not-allowed" : "pointer", boxShadow: dirty ? "4px 4px 0 rgba(158,204,250,0.4)" : "none", opacity: !dirty ? 0.5 : 1, transition:"all 0.1s ease", fontFamily:"inherit" }}
            onMouseEnter={e => { if (dirty && !saving) (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translate(0,0)"; }}>
            {saving ? <IconSpin /> : <IconSave />}
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      {/* Crop Modal */}
      {cropSrc && (
        <ImageCropModal
          src={cropSrc}
          onConfirm={handleCropConfirm}
          onCancel={() => setCropSrc(null)}
        />
      )}

      {toast && (
        <div className={`fixed bottom-6 left-1/2 z-[999] flex items-center gap-3 border-4 border-[#0B1957] px-5 py-3 font-black uppercase text-sm tracking-wide shadow-[6px_6px_0_#0B1957] ${toast.ok ? "bg-[#9ECCFA] text-[#0B1957]" : "bg-red-500 text-white"}`}
          style={{ transform: "translateX(-50%)" }}>
          {toast.ok ? <IconCheck /> : null}{toast.msg}
        </div>
      )}
    </div>
  );
}

// ── Section config ─────────────────────────────────────────────────────────────
const SECTIONS = [
  { key: "techstack", label: "Tech Stack",   icon: <IconLayers />, description: "Kelola tech stack yang tampil di homepage", status: "active" },
  { key: "hero",      label: "Hero Section", icon: <IconHero />,   description: "Edit nama, bio, dan foto di hero section",  status: "active" },
  { key: "projects",  label: "Projects",     icon: <IconFolder />, description: "Kelola daftar project di homepage",         status: "soon"   },
  { key: "about",     label: "About",        icon: <IconUser />,   description: "Edit konten section About",                 status: "soon"   },
];

// ── HomepageManager ───────────────────────────────────────────────────────────
export default function HomepageManager() {
  const [activeSection, setActiveSection] = useState("techstack");
  const current = SECTIONS.find(s => s.key === activeSection)!;

  return (
    <>
      <style>{`
        @keyframes hmSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hmFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes hmSpin    { to{transform:rotate(360deg)} }
        @keyframes hmPulse   { 0%,100%{opacity:1} 50%{opacity:.4} }

        .hm-anim-0 { animation: hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .hm-anim-1 { animation: hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .hm-anim-2 { animation: hmSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.20s both; }
        .hm-content-fade { animation: hmFadeIn 0.25s ease both; }

        .hm-section-btn {
          display:flex; align-items:flex-start; gap:12px; padding:14px 16px;
          border:3px solid #0B1957; background:#F8F3EA; cursor:pointer;
          font-family:inherit; text-align:left; box-shadow:3px 3px 0 #0B1957; width:100%;
          transition:transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
        }
        .hm-section-btn:hover:not(:disabled) { background:#D1E8FF; transform:translate(-2px,-2px); box-shadow:5px 5px 0 #0B1957; }
        .hm-section-btn.active { background:#0B1957; transform:translate(-2px,-2px); box-shadow:5px 5px 0 #9ECCFA; }
        .hm-section-btn:disabled { cursor:not-allowed; opacity:0.55; }
      `}</style>

      <div className="hm-anim-0 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-[0.3em] mb-1">Kelola</p>
            <h2 className="font-black text-2xl uppercase text-[#0B1957]">Homepage</h2>
            <p className="font-semibold text-xs text-[#0B1957] opacity-60 mt-1">Manage konten yang tampil di halaman utama portfolio</p>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 border-4 border-[#0B1957] px-4 py-2 font-black text-xs uppercase bg-[#F8F3EA] text-[#0B1957] shadow-[3px_3px_0_#0B1957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#0B1957] transition-all">
            <IconExternal /> Preview Homepage
          </a>
        </div>
      </div>

      <div className="hm-anim-1 flex gap-5 flex-col lg:flex-row">
        <div className="lg:w-56 flex-shrink-0">
          <p className="font-black text-xs uppercase tracking-widest text-[#0B1957] opacity-50 mb-3 px-1">Sections</p>
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
            {SECTIONS.map(section => {
              const isActive = activeSection === section.key;
              const isSoon   = section.status === "soon";
              return (
                <button key={section.key} disabled={isSoon}
                  className={`hm-section-btn flex-shrink-0 ${isActive ? "active" : ""}`}
                  onClick={() => !isSoon && setActiveSection(section.key)}>
                  <div className={`mt-0.5 flex-shrink-0 ${isActive ? "text-[#9ECCFA]" : "text-[#0B1957]"}`}>{section.icon}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-black text-xs uppercase tracking-wide leading-tight ${isActive ? "text-[#9ECCFA]" : "text-[#0B1957]"}`}>{section.label}</span>
                      {isSoon && <span className="flex items-center gap-1 border border-current px-1.5 py-0.5 font-black text-[9px] uppercase tracking-wide opacity-60"><IconLock /> Soon</span>}
                    </div>
                    <p className={`font-semibold text-[10px] leading-snug mt-0.5 hidden lg:block ${isActive ? "text-[#D1E8FF]" : "text-[#0B1957] opacity-50"}`}>{section.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="hm-anim-2 flex items-center gap-2 mb-5">
            <span className="font-black text-xs uppercase tracking-widest text-[#0B1957] opacity-40">Homepage</span>
            <span className="font-black text-xs text-[#0B1957] opacity-30">/</span>
            <span className="font-black text-xs uppercase tracking-widest text-[#0B1957]">{current.label}</span>
            {current.status === "active" && (
              <span className="ml-1 border-2 border-[#0B1957] bg-[#9ECCFA] px-2 py-0.5 font-black text-[9px] uppercase tracking-wide text-[#0B1957]">Live</span>
            )}
          </div>

          <div key={activeSection} className="hm-content-fade">
            {activeSection === "techstack" && <TechStackVisibility />}
            {activeSection === "hero"      && <HeroSection />}
            {(activeSection === "projects" || activeSection === "about") && (
              <div className="border-4 border-dashed border-[#0B1957] bg-[#F8F3EA] p-12 text-center">
                <div className="text-[#0B1957] opacity-20 flex justify-center mb-4"><IconLock /></div>
                <p className="font-black uppercase text-lg text-[#0B1957] mb-2">Coming Soon</p>
                <p className="font-semibold text-sm text-[#0B1957] opacity-50">Section <span className="font-black opacity-80">"{current.label}"</span> belum tersedia</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}