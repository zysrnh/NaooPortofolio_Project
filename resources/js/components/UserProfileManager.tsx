import { useState, useRef } from "react";
import { usePage, router } from "@inertiajs/react";

function getCsrfToken(): string {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) return decodeURIComponent(match[1]);
  return "";
}

// Icons
const IconCamera = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconSave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function UserProfileManager() {
  const { auth } = usePage<{ auth: { user: any } }>().props;
  const user = auth?.user;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Ukuran foto maksimal 5MB!");
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (password) formData.append("password", password);
      if (avatarFile) formData.append("avatar_file", avatarFile);

      const res = await fetch("/api/user/profile-update", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getCsrfToken(),
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("Profil dan foto profil berhasil diperbarui!");
        setPassword("");
        router.reload({ preserveScroll: true });
      } else {
        setErrorMsg(data.message || "Gagal memperbarui profil.");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan koneksi server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-black text-2xl uppercase text-[var(--nb-primary)] leading-tight">
          Pengaturan Profil
        </h2>
        <p className="font-bold text-xs text-[var(--nb-primary)] opacity-60 uppercase tracking-widest mt-1">
          Perbarui foto profil, nama, email, dan kata sandi akun kamu
        </p>
      </div>

      {successMsg && (
        <div className="bg-[var(--nb-accent)] text-[var(--nb-primary)] border-4 border-[var(--nb-primary)] p-4 shadow-[4px_4px_0_var(--nb-primary)] font-black text-xs uppercase flex items-center gap-2">
          <IconCheck /> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-500 text-white border-4 border-[var(--nb-primary)] p-4 shadow-[4px_4px_0_var(--nb-primary)] font-black text-xs uppercase">
          {errorMsg}
        </div>
      )}

      <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)]">
        {/* Banner Header */}
        <div className="bg-[var(--nb-accent)] h-28 border-b-4 border-[var(--nb-primary)] relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,var(--nb-primary) 0,var(--nb-primary) 1px,transparent 1px,transparent 12px)",
            }}
          />
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-8 pt-4">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            {/* Avatar & User Header Card */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b-4 border-[var(--nb-primary)]">
              
              {/* Avatar Photo Box (Negative margin ONLY on avatar square) */}
              <div className="relative group flex-shrink-0 -mt-16 z-10">
                <div className="w-28 h-28 border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[6px_6px_0_var(--nb-primary)] overflow-hidden flex items-center justify-center text-[var(--nb-primary)] font-black text-4xl">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    (name || "U")[0]?.toUpperCase()
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 bg-[var(--nb-accent)] text-[var(--nb-primary)] border-2 border-[var(--nb-primary)] p-2 shadow-[2px_2px_0_var(--nb-primary)] hover:scale-105 cursor-pointer"
                  title="Ganti Foto Profil"
                >
                  <IconCamera />
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                />
              </div>

              {/* User Info Text Block (Normal flow, never cut off) */}
              <div className="flex-1 space-y-2 text-center sm:text-left pt-2 sm:pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h3 className="font-black text-2xl uppercase text-[var(--nb-primary)] leading-tight">
                    {name || "User"}
                  </h3>
                  <span className="text-[9px] font-black uppercase bg-[var(--nb-primary)] text-[var(--nb-accent)] px-2.5 py-1 w-fit mx-auto sm:mx-0 shadow-[2px_2px_0_var(--nb-accent)]">
                    {user?.role === "admin" ? "ADMINISTRATOR" : "REGULAR USER"}
                  </span>
                </div>
                <p className="font-bold text-xs text-[var(--nb-primary)] opacity-60">
                  Format gambar yang didukung: JPG, PNG, WEBP (Maks 5MB)
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[var(--nb-accent)] text-[var(--nb-primary)] border-3 border-[var(--nb-primary)] px-4 py-1.5 font-black text-xs uppercase shadow-[3px_3px_0_var(--nb-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <IconCamera /> Upload Foto Baru
                </button>
              </div>

            </div>

            {/* Form Fields Section */}
            <div className="space-y-4 pt-2">
              <h4 className="font-black text-sm uppercase text-[var(--nb-primary)] tracking-wider">
                Informasi Akun
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-black text-xs uppercase text-[var(--nb-primary)] tracking-wider block">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-4 py-3 font-bold text-xs outline-none focus:bg-[var(--nb-accent-light)] shadow-[2px_2px_0_var(--nb-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-black text-xs uppercase text-[var(--nb-primary)] tracking-wider block">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-4 py-3 font-bold text-xs outline-none focus:bg-[var(--nb-accent-light)] shadow-[2px_2px_0_var(--nb-primary)]"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="font-black text-xs uppercase text-[var(--nb-primary)] tracking-wider flex items-center justify-between">
                  <span>Kata Sandi Baru</span>
                  <span className="opacity-50 text-[10px] lowercase font-normal">(opsional)</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Biarkan kosong jika tidak ingin mengganti password"
                  className="w-full bg-[var(--nb-bg)] border-3 border-[var(--nb-primary)] px-4 py-3 font-bold text-xs outline-none focus:bg-[var(--nb-accent-light)] shadow-[2px_2px_0_var(--nb-primary)]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t-3 border-[var(--nb-primary)] flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-[var(--nb-primary)] text-[var(--nb-accent)] border-3 border-[var(--nb-primary)] px-8 py-3.5 font-black uppercase text-xs shadow-[5px_5px_0_var(--nb-accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0 active:translate-y-0 disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                <IconSave /> {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
