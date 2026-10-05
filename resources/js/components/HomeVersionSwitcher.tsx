import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";

interface HomeVersionSwitcherProps {
  className?: string;
  variant?: "navbar" | "floating";
}

export default function HomeVersionSwitcher({
  className = "",
  variant = "navbar",
}: HomeVersionSwitcherProps) {
  const [currentPath, setCurrentPath] = useState<string>("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const isV2 = currentPath === "/v2";

  const handleSwitch = (target: "v1" | "v2") => {
    if (target === "v1" && isV2) {
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred_home_version", "v1");
      }
      router.visit("/");
    } else if (target === "v2" && !isV2) {
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred_home_version", "v2");
      }
      router.visit("/v2");
    }
  };

  if (variant === "floating") {
    return (
      <div
        className={`fixed bottom-6 left-6 z-[9999] flex items-center bg-[#0d0d11]/90 backdrop-blur-md border border-[#27272a] shadow-2xl p-1.5 rounded-full transition-all duration-300 hover:border-red-500/50 ${className}`}
      >
        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 pl-3 pr-2 hidden sm:inline-block">
          Style:
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleSwitch("v1")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              !isV2
                ? "bg-amber-400 text-black shadow-md font-black"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
            }`}
            title="Switch ke Versi 1 (Neobrutalism)"
          >
            V1 Neo
          </button>
          <button
            type="button"
            onClick={() => handleSwitch("v2")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              isV2
                ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.6)] font-black"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
            }`}
            title="Switch ke Versi 2 (Dark Crimson Editorial)"
          >
            V2 Red
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-1 border-2 border-[var(--nb-primary,currentColor)] bg-[var(--nb-bg,transparent)] shadow-[2px_2px_0_var(--nb-primary,currentColor)] text-xs font-bold select-none ${className}`}
    >
      <button
        type="button"
        onClick={() => handleSwitch("v1")}
        className={`px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
          !isV2
            ? "bg-[var(--nb-primary,#000)] text-[var(--nb-bg,#fff)]"
            : "text-[var(--nb-primary,#888)] hover:bg-[var(--nb-accent-light,rgba(0,0,0,0.05))]"
        }`}
        title="Versi 1: Neobrutalism"
      >
        V1
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("v2")}
        className={`px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
          isV2
            ? "bg-red-600 text-white shadow-[0_0_8px_rgba(220,38,38,0.5)]"
            : "text-[var(--nb-primary,#888)] hover:bg-[var(--nb-accent-light,rgba(0,0,0,0.05))]"
        }`}
        title="Versi 2: Dark Crimson Editorial"
      >
        V2
      </button>
    </div>
  );
}
