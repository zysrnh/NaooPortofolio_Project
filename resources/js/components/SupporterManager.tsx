import { useState, useEffect, useRef, useCallback } from 'react';

interface Supporter {
    id: number;
    name: string;
    role: string;
    description: string;
    image: string | null;
    photo2: string | null;
    is_visible: boolean;
}

function getCsrfToken(): string {
    const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    if (meta?.content) return meta.content;
    const m = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : '';
}

// ── Improved Canvas Cropper ───────────────────────────────────────────────────
function ImageCropper({ src, onCrop, onCancel }: {
    src: string;
    onCrop: (blob: Blob) => void;
    onCancel: () => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef  = useRef<HTMLImageElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [dragType, setDragType] = useState<'move' | 'nw' | 'ne' | 'sw' | 'se' | null>(null);
    const [start, setStart]   = useState({ x: 0, y: 0 });
    const [box, setBox]       = useState({ x: 50, y: 50, w: 200, h: 200 });
    const displayW = 400, displayH = 400;

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            imageRef.current = img;
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width  = displayW;
            canvas.height = displayH;
            const scale = Math.min(displayW / img.width, displayH / img.height);
            const w = img.width * scale, h = img.height * scale;
            const ox = (displayW - w) / 2, oy = (displayH - h) / 2;
            const sq = Math.min(w, h) * 0.8;
            setBox({ x: ox + (w - sq) / 2, y: oy + (h - sq) / 2, w: sq, h: sq });
            setLoaded(true);
        };
        img.src = src;
    }, [src]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const img    = imageRef.current;
        if (!canvas || !img || !loaded) return;
        const ctx = canvas.getContext('2d')!;
        const scale = Math.min(displayW / img.width, displayH / img.height);
        const w = img.width * scale, h = img.height * scale;
        const ox = (displayW - w) / 2, oy = (displayH - h) / 2;

        ctx.clearRect(0, 0, displayW, displayH);
        ctx.drawImage(img, ox, oy, w, h);
        
        // Dimmed overlay
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, displayW, displayH);

        // Highlight crop area
        ctx.save();
        ctx.beginPath();
        ctx.rect(box.x, box.y, box.w, box.h);
        ctx.clip();
        ctx.drawImage(img, ox, oy, w, h);
        ctx.restore();

        // White guide lines
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(box.x, box.y, box.w, box.h);

        // Handles
        ctx.fillStyle = '#9ECCFA';
        const hs = 10; // handle size
        ctx.fillRect(box.x - hs/2, box.y - hs/2, hs, hs); // NW
        ctx.fillRect(box.x + box.w - hs/2, box.y - hs/2, hs, hs); // NE
        ctx.fillRect(box.x - hs/2, box.y + box.h - hs/2, hs, hs); // SW
        ctx.fillRect(box.x + box.w - hs/2, box.y + box.h - hs/2, hs, hs); // SE
    }, [box, loaded]);

    useEffect(() => { draw(); }, [draw]);

    const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        // Correct coordinate math with scaling
        return { 
            x: (e.clientX - rect.left) * (canvas.width / rect.width), 
            y: (e.clientY - rect.top) * (canvas.height / rect.height) 
        };
    };

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const pos = getPos(e);
        const hs = 20; // larger hit area
        
        if (Math.abs(pos.x - box.x) < hs && Math.abs(pos.y - box.y) < hs) setDragType('nw');
        else if (Math.abs(pos.x - (box.x + box.w)) < hs && Math.abs(pos.y - box.y) < hs) setDragType('ne');
        else if (Math.abs(pos.x - box.x) < hs && Math.abs(pos.y - (box.y + box.h)) < hs) setDragType('sw');
        else if (Math.abs(pos.x - (box.x + box.w)) < hs && Math.abs(pos.y - (box.y + box.h)) < hs) setDragType('se');
        else if (pos.x >= box.x && pos.x <= box.x + box.w && pos.y >= box.y && pos.y <= box.y + box.h) {
            setDragType('move');
            setStart({ x: pos.x - box.x, y: pos.y - box.y });
        }
    };

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!dragType) return;
        const pos = getPos(e);
        const minS = 40;

        if (dragType === 'move') {
            const nx = Math.max(0, Math.min(pos.x - start.x, displayW - box.w));
            const ny = Math.max(0, Math.min(pos.y - start.y, displayH - box.h));
            setBox(b => ({ ...b, x: nx, y: ny }));
        } else {
            setBox(b => {
                let { x, y, w, h } = b;
                if (dragType === 'nw') {
                    const dx = x - pos.x;
                    const dy = y - pos.y;
                    const s = Math.max(dx, dy); // Keep square
                    if (w + s > minS) { x -= s; y -= s; w += s; h += s; }
                } else if (dragType === 'se') {
                    const s = Math.max(pos.x - (x + w), pos.y - (y + h));
                    if (w + s > minS) { w += s; h += s; }
                } else if (dragType === 'ne') {
                    const s = Math.max(pos.x - (x + w), y - pos.y);
                    if (w + s > minS) { y -= s; w += s; h += s; }
                } else if (dragType === 'sw') {
                    const s = Math.max(x - pos.x, pos.y - (y + h));
                    if (w + s > minS) { x -= s; w += s; h += s; }
                }
                return { x: Math.max(0, x), y: Math.max(0, y), w: Math.min(displayW - x, w), h: Math.min(displayH - y, h) };
            });
        }
    };

    const handleCrop = () => {
        const img = imageRef.current;
        if (!img) return;
        const scale = Math.min(displayW / img.width, displayH / img.height);
        const ox = (displayW - img.width * scale) / 2;
        const oy = (displayH - img.height * scale) / 2;
        const sx = (box.x - ox) / scale, sy = (box.y - oy) / scale;
        const sw = box.w / scale, sh = box.h / scale;

        const out = document.createElement('canvas');
        out.width = 500; out.height = 500; // Output high res
        const ctx = out.getContext('2d')!;
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 500, 500);
        out.toBlob(b => { if (b) onCrop(b); }, 'image/jpeg', 0.9);
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[3000] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black uppercase text-[var(--nb-primary)]">Crop Foto Supporter</h3>
                    <button onClick={onCancel} className="text-xl font-black">&times;</button>
                </div>
                <div className="relative border-4 border-[var(--nb-primary)] bg-black overflow-hidden" style={{ width: displayW, height: displayH, margin: '0 auto' }}>
                    <canvas
                        ref={canvasRef}
                        className={`block cursor-${dragType ? (dragType === 'move' ? 'grabbing' : 'nwse-resize') : 'crosshair'}`}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={() => setDragType(null)}
                        onMouseLeave={() => setDragType(null)}
                    />
                </div>
                <div className="flex gap-3 mt-6">
                    <button onClick={handleCrop}
                        className="flex-1 bg-[var(--nb-primary)] text-[var(--nb-bg)] py-3 font-black uppercase text-xs border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-accent)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                        Potong & Gunakan
                    </button>
                    <button onClick={onCancel}
                        className="flex-1 border-4 border-[var(--nb-primary)] py-3 font-black uppercase text-xs hover:bg-gray-100 transition-colors">
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SupporterManager() {
    const [supporter, setSupporter]   = useState<Supporter | null>(null);
    const [loading, setLoading]       = useState(true);
    const [form, setForm]             = useState({ name: '', role: 'Special Supporter', description: '' });
    const [preview, setPreview]       = useState<string | null>(null);
    const [preview2, setPreview2]     = useState<string | null>(null);
    const [cropSrc, setCropSrc]       = useState<{src: string, isPhoto2: boolean} | null>(null);
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [croppedBlob2, setCroppedBlob2] = useState<Blob | null>(null);
    const [saving, setSaving]         = useState(false);
    const [deleting, setDeleting]     = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg]     = useState('');
    const fileRef = useRef<HTMLInputElement>(null);
    const fileRef2 = useRef<HTMLInputElement>(null);

    const load = () => {
        setLoading(true);
        fetch('/api/admin/supporters')
            .then(r => r.json())
            .then((data: Supporter[]) => {
                if (data.length > 0) {
                    setSupporter(data[0]);
                    setForm({ name: data[0].name, role: data[0].role, description: data[0].description || '' });
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isPhoto2: boolean) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            setCropSrc({ src: ev.target?.result as string, isPhoto2 });
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleCropDone = (blob: Blob) => {
        if (!cropSrc) return;
        if (cropSrc.isPhoto2) {
            setCroppedBlob2(blob);
            setPreview2(URL.createObjectURL(blob));
        } else {
            setCroppedBlob(blob);
            setPreview(URL.createObjectURL(blob));
        }
        setCropSrc(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrorMsg('');
        setSuccessMsg('');

        const fd = new FormData();
        fd.append('name',        form.name);
        fd.append('role',        form.role);
        fd.append('description', form.description);
        fd.append('is_visible',  '1');
        if (croppedBlob) fd.append('image_file', croppedBlob, 'supporter.jpg');
        if (croppedBlob2) fd.append('image_file2', croppedBlob2, 'supporter2.jpg');

        const url    = supporter ? `/api/admin/supporters/${supporter.id}` : '/api/admin/supporters';
        const res    = await fetch(url, {
            method:  'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-TOKEN': getCsrfToken() },
            body:    fd,
        });

        setSaving(false);
        if (res.ok) {
            setSuccessMsg('Tersimpan!');
            setCroppedBlob(null);
            load();
        } else {
            setErrorMsg('Gagal menyimpan. Coba lagi.');
        }
    };

    const handleDelete = async () => {
        if (!supporter) return;
        if (!confirm('Hapus supporter ini?')) return;
        setDeleting(true);
        await fetch(`/api/admin/supporters/${supporter.id}`, {
            method:  'DELETE',
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-TOKEN': getCsrfToken() },
        });
        setDeleting(false);
        setSupporter(null);
        setForm({ name: '', role: 'Special Supporter', description: '' });
        setPreview(null);
        setPreview2(null);
        setCroppedBlob(null);
        setCroppedBlob2(null);
    };

    const displayImage = preview ?? supporter?.image ?? null;
    const displayImage2 = preview2 ?? supporter?.photo2 ?? null;

    if (loading) return <div className="font-black uppercase text-sm opacity-40 p-6">Loading...</div>;

    return (
        <>
            {/* Crop Modal */}
            {cropSrc && (
                <ImageCropper src={cropSrc.src} onCrop={handleCropDone} onCancel={() => setCropSrc(null)} />
            )}

            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="font-black uppercase text-xl text-[var(--nb-primary)]">Special Supporter</h2>
                        <p className="font-bold text-[10px] uppercase opacity-40 tracking-widest mt-1">
                            {supporter ? 'Edit atau ganti foto supporter' : 'Belum ada supporter — tambahkan sekarang'}
                        </p>
                    </div>
                    {supporter && (
                        <button onClick={handleDelete} disabled={deleting}
                            className="border-4 border-red-500 text-red-500 px-4 py-2 font-black uppercase text-xs hover:bg-red-50 transition-colors disabled:opacity-40">
                            {deleting ? '...' : 'Hapus'}
                        </button>
                    )}
                </div>

                <form onSubmit={handleSave} className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[8px_8px_0_var(--nb-primary)] overflow-hidden">
                    {/* Photo Area */}
                    <div className="bg-[var(--nb-primary)] p-6 flex flex-col sm:flex-row items-center gap-6">
                        
                        <div className="flex gap-4 flex-shrink-0">
                            {/* Avatar Preview */}
                            <div className="relative flex-shrink-0">
                                <label className="block font-black text-[9px] uppercase tracking-widest text-[var(--nb-accent)] mb-1">Primary Photo</label>
                                <div className="w-24 h-32 sm:w-32 sm:h-40 border-4 border-[var(--nb-accent)] shadow-[4px_4px_0_var(--nb-accent)] overflow-hidden bg-gray-200">
                                    {displayImage
                                        ? <img src={displayImage} className="w-full h-full object-cover" alt="Supporter" />
                                        : (
                                            <div className="w-full h-full flex items-center justify-center opacity-30">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--nb-accent)" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                                                    <circle cx="12" cy="7" r="4"/>
                                                </svg>
                                            </div>
                                        )
                                    }
                                </div>
                                <button type="button" onClick={() => fileRef.current?.click()}
                                    className="absolute -bottom-2 -right-2 bg-[var(--nb-accent)] border-3 border-[var(--nb-primary)] w-8 h-8 flex items-center justify-center shadow-[2px_2px_0_var(--nb-primary)] hover:shadow-none transition-all"
                                    title="Ganti foto"
                                    style={{ border: '3px solid var(--nb-primary)' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--nb-primary)" strokeWidth="2.5">
                                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                                        <circle cx="12" cy="13" r="4"/>
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Avatar 2 Preview */}
                            <div className="relative flex-shrink-0">
                                <label className="block font-black text-[9px] uppercase tracking-widest text-[var(--nb-accent)] mb-1">Decorative Photo</label>
                                <div className="w-24 h-32 sm:w-32 sm:h-40 border-4 border-[var(--nb-accent)] shadow-[4px_4px_0_var(--nb-accent)] overflow-hidden bg-gray-200">
                                    {displayImage2
                                        ? <img src={displayImage2} className="w-full h-full object-cover" alt="Supporter Decorative" />
                                        : (
                                            <div className="w-full h-full flex items-center justify-center opacity-30">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--nb-accent)" strokeWidth="2">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                                    <polyline points="21 15 16 10 5 21"/>
                                                </svg>
                                            </div>
                                        )
                                    }
                                </div>
                                <button type="button" onClick={() => fileRef2.current?.click()}
                                    className="absolute -bottom-2 -right-2 bg-[var(--nb-accent)] border-3 border-[var(--nb-primary)] w-8 h-8 flex items-center justify-center shadow-[2px_2px_0_var(--nb-primary)] hover:shadow-none transition-all"
                                    title="Ganti foto 2"
                                    style={{ border: '3px solid var(--nb-primary)' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--nb-primary)" strokeWidth="2.5">
                                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                                        <circle cx="12" cy="13" r="4"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, false)} />
                        <input ref={fileRef2} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, true)} />

                        {/* Name + Role inline */}
                        <div className="flex-1 w-full space-y-3">
                            <div>
                                <label className="block font-black text-[9px] uppercase tracking-widest text-[var(--nb-accent)] mb-1">Nama</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm(f => ({...f, name: e.target.value}))}
                                    placeholder="Nama lengkap..."
                                    required
                                    className="w-full bg-transparent border-b-2 border-[var(--nb-accent)] text-[var(--nb-bg)] font-black text-lg outline-none pb-1 placeholder:opacity-30"
                                />
                            </div>
                            <div>
                                <label className="block font-black text-[9px] uppercase tracking-widest text-[var(--nb-accent)] mb-1">Role / Caption</label>
                                <input
                                    type="text"
                                    value={form.role}
                                    onChange={e => setForm(f => ({...f, role: e.target.value}))}
                                    placeholder="Special Supporter"
                                    className="w-full bg-transparent border-b-2 border-[var(--nb-accent)] text-[var(--nb-accent-light)] font-bold text-sm outline-none pb-1 placeholder:opacity-30"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="p-6">
                        <label className="block font-black text-[9px] uppercase tracking-widest text-[var(--nb-primary)] mb-2">Deskripsi / Pesan Khusus</label>
                        <textarea
                            value={form.description}
                            onChange={e => setForm(f => ({...f, description: e.target.value}))}
                            placeholder="Tulis sesuatu yang manis di sini..."
                            rows={3}
                            className="w-full bg-[var(--nb-accent-light)] p-3 font-bold text-sm outline-none resize-none"
                            style={{ border: '3px solid var(--nb-primary)' }}
                        />

                        {croppedBlob && (
                            <div className="mt-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <p className="font-black text-[10px] uppercase text-green-600">Foto baru siap di-upload</p>
                                <button type="button" onClick={() => fileRef.current?.click()}
                                    className="font-black text-[10px] uppercase underline text-[var(--nb-accent)]">Ganti</button>
                            </div>
                        )}
                        {croppedBlob2 && (
                            <div className="mt-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <p className="font-black text-[10px] uppercase text-green-600">Foto decorative baru siap di-upload</p>
                                <button type="button" onClick={() => fileRef2.current?.click()}
                                    className="font-black text-[10px] uppercase underline text-[var(--nb-accent)]">Ganti</button>
                            </div>
                        )}

                        {successMsg && (
                            <div className="mt-3 bg-green-50 border-3 border-green-400 p-3 font-black text-[11px] uppercase text-green-700"
                                style={{ border: '3px solid #4ade80' }}>
                                ✓ {successMsg}
                            </div>
                        )}
                        {errorMsg && (
                            <div className="mt-3 bg-red-50 border-3 border-red-400 p-3 font-black text-[11px] uppercase text-red-600"
                                style={{ border: '3px solid #f87171' }}>
                                {errorMsg}
                            </div>
                        )}

                        <button type="submit" disabled={saving || (!form.name.trim())}
                            className="mt-4 w-full bg-[var(--nb-primary)] text-[var(--nb-accent)] py-4 font-black uppercase text-sm border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-accent)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                            {saving ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-[var(--nb-accent)] border-t-transparent rounded-full animate-spin" />
                                    Menyimpan...
                                </span>
                            ) : (supporter ? 'Update Supporter →' : 'Simpan Supporter →')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
