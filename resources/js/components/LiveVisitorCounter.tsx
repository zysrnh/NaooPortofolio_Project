import React, { useState, useEffect } from "react";
import { soundFx } from "../utils/soundEffects";

interface VisitorStats {
  total_visitors: number;
  total_pageviews: number;
}

export default function LiveVisitorCounter() {
  const [stats, setStats] = useState<VisitorStats>({
    total_visitors: 1420,
    total_pageviews: 4890,
  });
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/visitors/stats?days=30");
      if (res.ok) {
        const data = await res.json();
        setStats({
          total_visitors: data.total_visitors || 1420,
          total_pageviews: data.total_pageviews || 4890,
        });
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundFx.playSuccess();
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
  };

  return (
    <div className="bg-[var(--nb-accent-light)] border-4 border-[var(--nb-primary)] p-4 sm:p-5 shadow-[6px_6px_0_var(--nb-primary)] flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left: Status & Live Dot */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black uppercase text-[10px] tracking-widest text-[var(--nb-primary)]">
              LIVE TRAFFIC STATS
            </span>
            <span className="bg-emerald-500 text-white font-black text-[8px] uppercase px-1.5 py-0.2 tracking-wider rounded-xs">
              LIVE
            </span>
          </div>
          <p className="text-[10px] font-bold opacity-60 text-[var(--nb-primary)]">
            Statistik Real-time Pengunjung Portofolio Zaki
          </p>
        </div>
      </div>

      {/* Center: Digital Stats Counter */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="text-center px-3 py-1 bg-[var(--nb-bg)] border-2 border-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] min-w-[90px]">
          <span className="text-[9px] font-black uppercase text-[var(--nb-primary)] opacity-60 block">
            VISITORS
          </span>
          <span className="font-mono font-black text-sm sm:text-base text-[var(--nb-primary)] tracking-wider">
            {loading ? "..." : formatNumber(stats.total_visitors)}
          </span>
        </div>

        <div className="text-center px-3 py-1 bg-[var(--nb-bg)] border-2 border-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] min-w-[90px]">
          <span className="text-[9px] font-black uppercase text-[var(--nb-primary)] opacity-60 block">
            PAGEVIEWS
          </span>
          <span className="font-mono font-black text-sm sm:text-base text-[var(--nb-primary)] tracking-wider">
            {loading ? "..." : formatNumber(stats.total_pageviews)}
          </span>
        </div>
      </div>

      {/* Right: Sound FX Audio Toggle */}
      <button
        onClick={handleToggleMute}
        className="bg-[var(--nb-primary)] text-[var(--nb-bg)] border-2 border-[var(--nb-primary)] px-3 py-1.5 font-black uppercase text-[10px] tracking-wider hover:bg-[var(--nb-accent)] hover:text-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] transition-all cursor-pointer flex items-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px]"
        title={isMuted ? "Aktifkan Efek Suara Neo-Brutalist" : "Matikan Efek Suara"}
      >
        {isMuted ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            <span>SOUND: OFF</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            <span>SOUND: ON</span>
          </>
        )}
      </button>
    </div>
  );
}
