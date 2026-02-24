import { useState, useEffect, useRef } from "react";

// ── Icons ────────────────────────────────────────────────────────────────────
const IconPlus   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconEdit   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconTrash  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const IconClose  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconUpload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconLayers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IconCheck  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconAlert  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconSpin   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>;

// ── Types ────────────────────────────────────────────────────────────────────
interface TechStack {
  id: number;
  name: string;
  icon: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Language" | "Other";
  created_at: string;
}

type CategoryType = TechStack["category"];

const CATEGORIES: CategoryType[] = ["Frontend", "Backend", "Database", "DevOps", "Language", "Other"];

const CATEGORY_STYLE: Record<CategoryType, { bg: string; text: string; border: string }> = {
  Frontend: { bg: "bg-[#9ECCFA]", text: "text-[#0B1957]", border: "border-[#0B1957]" },
  Backend:  { bg: "bg-[#FFE8A0]", text: "text-[#0B1957]", border: "border-[#0B1957]" },
  Database: { bg: "bg-[#D1E8FF]", text: "text-[#0B1957]", border: "border-[#0B1957]" },
  DevOps:   { bg: "bg-[#F8F3EA]", text: "text-[#0B1957]", border: "border-[#0B1957]" },
  Language: { bg: "bg-[#0B1957]", text: "text-[#9ECCFA]", border: "border-[#9ECCFA]"  },
  Other:    { bg: "bg-[#E8E8E8]", text: "text-[#0B1957]", border: "border-[#0B1957]" },
};

// ── CSRF Helper ──────────────────────────────────────────────────────────────
function getCsrf(): string {
  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  if (meta?.content) return meta.content;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

// ── API Helpers ──────────────────────────────────────────────────────────────
const API = {
  getAll: () =>
    fetch("/api/tech-stacks").then(r => r.json()),

  create: (data: Omit<TechStack, "id" | "created_at">) =>
    fetch("/api/tech-stacks", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": getCsrf() },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  update: (id: number, data: Omit<TechStack, "id" | "created_at">) =>
    fetch(`/api/tech-stacks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": getCsrf() },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  delete: (id: number) =>
    fetch(`/api/tech-stacks/${id}`, {
      method: "DELETE",
      headers: { "X-CSRF-TOKEN": getCsrf() },
    }),
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Fallback SVG untuk icon error
const FALLBACK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%230B1957' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3C/svg%3E";

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[999] flex items-center gap-3 border-4 border-[#0B1957] px-5 py-3 font-black uppercase text-sm tracking-wide shadow-[6px_6px_0_#0B1957] ${type === "success" ? "bg-[#9ECCFA] text-[#0B1957]" : "bg-[#FF4444] text-white"}`}
      style={{ transform: "translateX(-50%)", animation: "toastIn 0.3s cubic-bezier(0.16,1,0.3,1)" }}
    >
      {type === "success" ? <IconCheck /> : <IconAlert />}
      {message}
    </div>
  );
}

// ── Delete Modal ──────────────────────────────────────────────────────────────
function DeleteModal({ name, loading, onConfirm, onCancel }: {
  name: string; loading: boolean; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1957] bg-opacity-70 px-4" style={{ backdropFilter: "blur(3px)" }}>
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[12px_12px_0_#0B1957] p-8 max-w-sm w-full" style={{ animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#FF4444] border-2 border-[#0B1957] flex items-center justify-center text-white flex-shrink-0">
            <IconAlert />
          </div>
          <h3 className="font-black text-lg uppercase text-[#0B1957]">Hapus Stack?</h3>
        </div>
        <p className="font-semibold text-sm text-[#0B1957] opacity-70 mb-6">
          Yakin mau hapus <span className="font-black text-[#0B1957] opacity-100">"{name}"</span>? Aksi ini tidak bisa dibatalkan.
        </p>
        <div className="flex gap-3">
          <button disabled={loading}
            className="flex-1 border-4 border-[#0B1957] py-3 font-black uppercase text-sm shadow-[4px_4px_0_#0B1957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0B1957] transition-all disabled:opacity-50"
            onClick={onCancel}>
            Batal
          </button>
          <button disabled={loading}
            className="flex-1 border-4 border-[#0B1957] py-3 font-black uppercase text-sm text-white bg-[#FF4444] shadow-[4px_4px_0_#0B1957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0B1957] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            onClick={onConfirm}>
            {loading ? <IconSpin /> : <IconTrash />}
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Form Modal ────────────────────────────────────────────────────────────────
interface FormModalProps {
  mode: "add" | "edit";
  initial?: TechStack;
  loading: boolean;
  onSave: (data: Omit<TechStack, "id" | "created_at">) => void;
  onClose: () => void;
}

function FormModal({ mode, initial, loading, onSave, onClose }: FormModalProps) {
  const [name, setName]               = useState(initial?.name ?? "");
  const [icon, setIcon]               = useState(initial?.icon ?? "");
  const [category, setCategory]       = useState<CategoryType>(initial?.category ?? "Frontend");
  const [iconPreview, setIconPreview] = useState(initial?.icon ?? "");
  const [dragging, setDragging]       = useState(false);
  const [nameErr, setNameErr]         = useState("");
  const [iconErr, setIconErr]         = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) { setIconErr("File harus berupa gambar!"); return; }
    if (file.size > 2 * 1024 * 1024)    { setIconErr("Ukuran max 2MB!"); return; }
    setIconErr("");
    const b64 = await toBase64(file);
    setIcon(b64);
    setIconPreview(b64);
  };

  const validate = () => {
    let ok = true;
    if (!name.trim()) { setNameErr("Nama wajib diisi!"); ok = false; } else setNameErr("");
    if (!icon.trim()) { setIconErr("Icon wajib diisi!"); ok = false; } else setIconErr("");
    return ok;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1957] bg-opacity-75 px-4" style={{ backdropFilter: "blur(4px)" }}>
      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[12px_12px_0_#0B1957] w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ animation: "slideUp 0.35s cubic-bezier(0.16,1,0.3,1)" }}>

        {/* Header */}
        <div className="bg-[#0B1957] border-b-4 border-[#0B1957] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3 text-[#9ECCFA]">
            <IconLayers />
            <span className="font-black uppercase text-sm tracking-widest">
              {mode === "add" ? "Tambah Tech Stack" : "Edit Tech Stack"}
            </span>
          </div>
          <button className="text-[#9ECCFA] hover:text-white transition-colors" onClick={onClose}><IconClose /></button>
        </div>

        <div className="p-6 space-y-5">

          {/* Nama */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest text-[#0B1957] mb-2">
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={e => { setName(e.target.value); setNameErr(""); }}
              placeholder="Contoh: React, Laravel, Python..."
              className={`w-full border-4 ${nameErr ? "border-red-500" : "border-[#0B1957]"} bg-white px-4 py-3 font-bold text-sm text-[#0B1957] placeholder-[#0B1957] placeholder-opacity-30 focus:outline-none focus:shadow-[4px_4px_0_#9ECCFA] transition-shadow`}
            />
            {nameErr && <p className="text-red-500 font-bold text-xs mt-1">{nameErr}</p>}
          </div>

          {/* Kategori */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest text-[#0B1957] mb-2">Kategori</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => {
                const s = CATEGORY_STYLE[cat];
                const active = category === cat;
                return (
                  <button key={cat} type="button"
                    onClick={() => setCategory(cat)}
                    className={`border-2 ${s.border} px-3 py-1.5 font-black text-xs uppercase tracking-wide transition-all ${active ? `${s.bg} ${s.text} shadow-[3px_3px_0_#0B1957]` : "bg-transparent text-[#0B1957] opacity-50 hover:opacity-100"}`}
                  >{cat}</button>
                );
              })}
            </div>
          </div>

          {/* Upload Icon */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest text-[#0B1957] mb-2">
              Upload Icon <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-4 border-dashed ${dragging ? "border-[#9ECCFA] bg-[#D1E8FF]" : iconErr ? "border-red-500 bg-red-50" : "border-[#0B1957] bg-white"} p-6 flex flex-col items-center gap-3 cursor-pointer transition-all hover:bg-[#D1E8FF]`}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            >
              {iconPreview ? (
                <div className="flex flex-col items-center gap-3">
                  {/* Preview dengan ukuran fixed konsisten */}
                  <div className="w-20 h-20 border-4 border-[#0B1957] bg-[#D1E8FF] shadow-[4px_4px_0_#0B1957] overflow-hidden">
                    <img src={iconPreview} alt="preview"
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).src = FALLBACK_ICON; }} />
                  </div>
                  <span className="font-black text-xs text-[#0B1957] uppercase opacity-60">Klik untuk ganti</span>
                </div>
              ) : (
                <>
                  <div className="text-[#0B1957] opacity-40"><IconUpload /></div>
                  <div className="text-center">
                    <p className="font-black text-xs uppercase text-[#0B1957] tracking-wide">Drop icon di sini</p>
                    <p className="font-semibold text-xs text-[#0B1957] opacity-50 mt-1">atau klik untuk pilih file</p>
                    <p className="font-bold text-xs text-[#0B1957] opacity-30 mt-1">PNG, JPG, SVG — Max 2MB</p>
                  </div>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
            </div>
            {iconErr && <p className="text-red-500 font-bold text-xs mt-1">{iconErr}</p>}
          </div>

          {/* URL Alternatif */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest text-[#0B1957] mb-2">
              atau URL Icon
            </label>
            <input
              value={icon.startsWith("data:") ? "" : icon}
              onChange={e => { setIcon(e.target.value); setIconPreview(e.target.value); setIconErr(""); }}
              placeholder="https://example.com/icon.png"
              className="w-full border-4 border-[#0B1957] bg-white px-4 py-3 font-bold text-sm text-[#0B1957] placeholder-[#0B1957] placeholder-opacity-30 focus:outline-none focus:shadow-[4px_4px_0_#9ECCFA] transition-shadow"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-4 border-[#0B1957] px-6 py-4 flex gap-3 sticky bottom-0 bg-[#F8F3EA]">
          <button disabled={loading}
            className="flex-1 border-4 border-[#0B1957] py-3 font-black uppercase text-sm shadow-[4px_4px_0_#0B1957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0B1957] transition-all disabled:opacity-50"
            onClick={onClose}>
            Batal
          </button>
          <button disabled={loading}
            className="flex-1 border-4 border-[#0B1957] py-3 font-black uppercase text-sm text-[#F8F3EA] bg-[#0B1957] shadow-[4px_4px_0_#9ECCFA] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#9ECCFA] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            onClick={() => { if (validate()) onSave({ name: name.trim(), icon, category }); }}>
            {loading ? <IconSpin /> : null}
            {loading ? "Menyimpan..." : mode === "add" ? "Tambah" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function TechStackCRUD() {
  const [stacks, setStacks]             = useState<TechStack[]>([]);
  const [search, setSearch]             = useState("");
  const [filterCat, setFilterCat]       = useState<CategoryType | "All">("All");
  const [modal, setModal]               = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget]     = useState<TechStack | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TechStack | null>(null);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingForm, setLoadingForm]   = useState(false);
  const [loadingDel, setLoadingDel]     = useState(false);
  const [toast, setToast]               = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    API.getAll()
      .then(data => setStacks(Array.isArray(data) ? data : []))
      .catch(() => showToast("Gagal memuat data!", "error"))
      .finally(() => setLoadingFetch(false));
  }, []);

  const handleAdd = async (data: Omit<TechStack, "id" | "created_at">) => {
    setLoadingForm(true);
    try {
      const newStack = await API.create(data);
      if (newStack?.id) {
        setStacks(prev => [newStack, ...prev]);
        setModal(null);
        showToast(`"${data.name}" berhasil ditambahkan!`);
      } else {
        showToast("Gagal menambahkan!", "error");
      }
    } catch { showToast("Terjadi kesalahan server!", "error"); }
    finally { setLoadingForm(false); }
  };

  const handleEdit = async (data: Omit<TechStack, "id" | "created_at">) => {
    if (!editTarget) return;
    setLoadingForm(true);
    try {
      const updated = await API.update(editTarget.id, data);
      if (updated?.id) {
        setStacks(prev => prev.map(s => s.id === editTarget.id ? updated : s));
        setModal(null);
        setEditTarget(null);
        showToast(`"${data.name}" berhasil diupdate!`);
      } else {
        showToast("Gagal mengupdate!", "error");
      }
    } catch { showToast("Terjadi kesalahan server!", "error"); }
    finally { setLoadingForm(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setLoadingDel(true);
    try {
      await API.delete(deleteTarget.id);
      setStacks(prev => prev.filter(s => s.id !== deleteTarget.id));
      showToast(`"${deleteTarget.name}" berhasil dihapus!`, "error");
      setDeleteTarget(null);
    } catch { showToast("Gagal menghapus!", "error"); }
    finally { setLoadingDel(false); }
  };

  const filtered = stacks.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat    = filterCat === "All" || s.category === filterCat;
    return matchSearch && matchCat;
  });

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = stacks.filter(s => s.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes toastIn { from{opacity:0;transform:translate(-50%,20px)} to{opacity:1;transform:translate(-50%,0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.4} }

        .anim-0 { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-1 { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .anim-2 { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.20s both; }

        .stack-card {
          border: 4px solid #0B1957;
          background: #F8F3EA;
          box-shadow: 6px 6px 0 #0B1957;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .stack-card:hover {
          transform: translate(-3px,-3px);
          box-shadow: 9px 9px 0 #9ECCFA, 11px 11px 0 #0B1957;
        }

        /* ── ICON BOX: fixed 80x80, no padding, overflow hidden ── */
        .icon-box {
          width: 80px;
          height: 80px;
          border: 3px solid #0B1957;
          background: #D1E8FF;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 3px 3px 0 #0B1957;
          transition: transform 0.15s ease;
        }
        .stack-card:hover .icon-box { transform: rotate(-3deg) scale(1.05); }

        /* ── ICON IMG: cover agar selalu penuh dan konsisten ── */
        .icon-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .search-input {
          border: 4px solid #0B1957; background: #F8F3EA;
          padding: 10px 16px 10px 42px;
          font-weight: 700; font-size: 13px; color: #0B1957; width: 100%;
          transition: box-shadow 0.15s ease;
        }
        .search-input:focus { outline: none; box-shadow: 4px 4px 0 #9ECCFA; }
        .search-input::placeholder { color: #0B1957; opacity: 0.35; }

        .cat-filter {
          border: 3px solid #0B1957; padding: 6px 14px;
          font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
          cursor: pointer; transition: all 0.1s ease; box-shadow: 3px 3px 0 #0B1957;
        }
        .cat-filter:hover { transform: translate(1px,1px); box-shadow: 2px 2px 0 #0B1957; }
        .cat-filter.active { background: #0B1957; color: #9ECCFA; }
        .cat-filter:not(.active) { background: #F8F3EA; color: #0B1957; }

        .add-btn {
          display: flex; align-items: center; gap: 8px;
          border: 4px solid #0B1957; background: #0B1957; color: #9ECCFA;
          padding: 12px 22px; font-weight: 900; font-size: 13px;
          text-transform: uppercase; letter-spacing: 0.07em; cursor: pointer;
          box-shadow: 5px 5px 0 #9ECCFA;
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }
        .add-btn:hover  { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 #9ECCFA; }
        .add-btn:active { transform: translate(2px,2px);  box-shadow: 2px 2px 0 #9ECCFA; }

        .edit-btn {
          border: 2px solid #0B1957; background: #D1E8FF; padding: 6px 10px;
          font-weight: 900; font-size: 11px; text-transform: uppercase; color: #0B1957;
          cursor: pointer; box-shadow: 2px 2px 0 #0B1957;
          display: flex; align-items: center; gap: 4px;
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }
        .edit-btn:hover  { transform: translate(1px,1px); box-shadow: 1px 1px 0 #0B1957; }

        .del-btn {
          border: 2px solid #0B1957; background: #FF4444; padding: 6px 10px;
          font-weight: 900; font-size: 11px; text-transform: uppercase; color: white;
          cursor: pointer; box-shadow: 2px 2px 0 #0B1957;
          display: flex; align-items: center; gap: 4px;
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }
        .del-btn:hover  { transform: translate(1px,1px); box-shadow: 1px 1px 0 #0B1957; }

        .skeleton { background: #D1E8FF; animation: pulse 1.2s ease infinite; }
      `}</style>

      {/* ── HEADER ── */}
      <div className="anim-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="font-black text-xs text-[#9ECCFA] uppercase tracking-[0.3em] mb-1">Kelola</p>
          <h2 className="font-black text-2xl uppercase text-[#0B1957]">Tech Stack</h2>
          <p className="font-semibold text-xs text-[#0B1957] opacity-60 mt-1">{stacks.length} stack terdaftar</p>
        </div>
        <button className="add-btn" onClick={() => { setEditTarget(null); setModal("add"); }}>
          <IconPlus /> Tambah Stack
        </button>
      </div>

      {/* ── CATEGORY STATS ── */}
      <div className="anim-0 flex flex-wrap gap-3 mb-6">
        {CATEGORIES.map(cat => {
          const s = CATEGORY_STYLE[cat];
          return (
            <div key={cat} className={`border-2 border-[#0B1957] px-3 py-2 flex items-center gap-2 ${s.bg}`}>
              <span className={`font-black text-sm ${s.text}`}>{categoryCounts[cat]}</span>
              <span className={`font-black text-xs uppercase tracking-widest ${s.text} opacity-70`}>{cat}</span>
            </div>
          );
        })}
      </div>

      {/* ── SEARCH + FILTER ── */}
      <div className="anim-1 flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 min-w-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B1957] opacity-40 pointer-events-none"><IconSearch /></span>
          <input className="search-input" placeholder="Cari nama stack..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={`cat-filter ${filterCat === "All" ? "active" : ""}`} onClick={() => setFilterCat("All")}>
            All ({stacks.length})
          </button>
          {CATEGORIES.map(cat => (
            <button key={cat} className={`cat-filter ${filterCat === cat ? "active" : ""}`} onClick={() => setFilterCat(cat)}>
              {cat} ({categoryCounts[cat]})
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="anim-2">

        {/* Loading Skeleton */}
        {loadingFetch && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border-4 border-[#0B1957] p-4 flex flex-col items-center gap-3"
                style={{ animation: `slideUp 0.4s both`, animationDelay: `${i * 0.05}s` }}>
                <div className="skeleton w-20 h-20" />
                <div className="skeleton h-4 w-24 rounded" />
                <div className="skeleton h-3 w-16 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loadingFetch && filtered.length === 0 && (
          <div className="border-4 border-dashed border-[#0B1957] bg-[#F8F3EA] p-12 text-center" style={{ animation: "fadeIn 0.4s ease" }}>
            <div className="text-[#0B1957] opacity-20 flex justify-center mb-4 scale-150"><IconLayers /></div>
            <p className="font-black uppercase text-lg text-[#0B1957] mb-2">
              {search || filterCat !== "All" ? "Tidak Ditemukan" : "Belum Ada Stack"}
            </p>
            <p className="font-semibold text-sm text-[#0B1957] opacity-50 mb-6">
              {search || filterCat !== "All" ? "Coba kata kunci atau filter lain" : "Tambahkan tech stack pertama!"}
            </p>
            {!search && filterCat === "All" && (
              <button className="add-btn mx-auto" onClick={() => { setEditTarget(null); setModal("add"); }}>
                <IconPlus /> Tambah Stack
              </button>
            )}
          </div>
        )}

        {/* Cards */}
        {!loadingFetch && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((stack, idx) => {
              const catStyle = CATEGORY_STYLE[stack.category];
              return (
                <div key={stack.id} className="stack-card p-4 flex flex-col items-center gap-3"
                  style={{ animation: `slideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${idx * 0.04}s both` }}>

                  {/* ── ICON: fixed 80×80, object-cover ── */}
                  <div className="icon-box">
                    <img
                      src={stack.icon}
                      alt={stack.name}
                      className="icon-img"
                      onError={e => { (e.target as HTMLImageElement).src = FALLBACK_ICON; }}
                    />
                  </div>

                  <p className="font-black uppercase text-sm text-[#0B1957] text-center leading-tight">{stack.name}</p>

                  <div className={`border-2 ${catStyle.border} ${catStyle.bg} px-2 py-0.5`}>
                    <span className={`font-black text-xs uppercase tracking-wide ${catStyle.text}`}>{stack.category}</span>
                  </div>

                  <p className="font-bold text-xs text-[#0B1957] opacity-40">{formatDate(stack.created_at)}</p>

                  <div className="flex gap-2 w-full mt-auto">
                    <button className="edit-btn flex-1 justify-center"
                      onClick={() => { setEditTarget(stack); setModal("edit"); }}>
                      <IconEdit /> Edit
                    </button>
                    <button className="del-btn flex-1 justify-center"
                      onClick={() => setDeleteTarget(stack)}>
                      <IconTrash /> Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      {modal === "add" && (
        <FormModal mode="add" loading={loadingForm} onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && editTarget && (
        <FormModal mode="edit" initial={editTarget} loading={loadingForm}
          onSave={handleEdit} onClose={() => { setModal(null); setEditTarget(null); }} />
      )}
      {deleteTarget && (
        <DeleteModal name={deleteTarget.name} loading={loadingDel}
          onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {/* ── TOAST ── */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}