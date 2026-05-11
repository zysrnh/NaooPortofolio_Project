import { useState, useEffect } from 'react';

interface Supporter {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  photo2?: string | null;
}

export default function SupportersSection() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(true);
  const [swappedPhotos, setSwappedPhotos] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch("/api/supporters")
      .then(r => r.json())
      .then(d => {
        setSupporters(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleSwap = (id: number) => {
    setSwappedPhotos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading || supporters.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-24 reveal from-left mt-12 overflow-visible">
      <div className="flex items-center gap-3 mb-8 sm:mb-12 px-2">
        <h2 className="text-3xl sm:text-5xl font-black uppercase text-[var(--nb-primary)] tracking-tight whitespace-nowrap relative z-10">
          VIP Area
        </h2>
        <div className="flex-1 h-2 sm:h-3 bg-[var(--nb-primary)] mt-1 sm:mt-2"></div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[var(--nb-accent)] border-4 border-[var(--nb-primary)] rounded-full hidden sm:block"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 relative">
        {supporters.map(s => {
          const isSwapped = swappedPhotos[s.id] || false;
          const hasPhoto2 = !!s.photo2;

          return (
          <div key={s.id} className="relative bg-[var(--nb-accent-light)] border-4 border-[var(--nb-primary)] shadow-[12px_12px_0_var(--nb-primary)] sm:shadow-[20px_20px_0_var(--nb-primary)] p-6 sm:p-12 flex flex-col lg:flex-row gap-10 sm:gap-20 items-center lg:items-start group">
            
            {/* Background Dot Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(var(--nb-primary) 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>
            
            {/* Dual Polaroid Photo Frames */}
            <div className="relative z-10 w-56 sm:w-72 flex-shrink-0 min-h-[250px] sm:min-h-[320px] aspect-square mx-auto lg:mx-0">
              {hasPhoto2 && (
                <div 
                  onClick={() => toggleSwap(s.id)}
                  className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] ${
                    isSwapped 
                    ? "z-20 w-full left-0 top-0 p-4 pb-12 sm:pb-16 shadow-[8px_8px_0_var(--nb-accent)] -rotate-3 hover:rotate-0 hover:scale-[1.02]"
                    : "z-0 w-[85%] right-[-15%] top-[-10%] p-3 pb-12 shadow-[8px_8px_0_var(--nb-primary)] rotate-[10deg] hover:rotate-[15deg] hover:scale-105"
                  }`}
                >
                  <div className="absolute -top-3 right-4 w-12 h-6 bg-white/70 border-2 border-[var(--nb-primary)] -rotate-6 z-30 shadow-sm backdrop-blur-sm"></div>
                  <div className="w-full aspect-square border-4 border-[var(--nb-primary)] overflow-hidden">
                    <img src={s.photo2!} className="w-full h-full object-cover" alt="secondary" />
                  </div>
                </div>
              )}

              <div 
                onClick={() => hasPhoto2 && toggleSwap(s.id)}
                className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${hasPhoto2 ? 'cursor-pointer' : ''} bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] ${
                  isSwapped && hasPhoto2
                  ? "z-0 w-[85%] right-[-15%] top-[-10%] p-3 pb-12 shadow-[8px_8px_0_var(--nb-primary)] rotate-[10deg] hover:rotate-[15deg] hover:scale-105"
                  : "z-10 w-full left-0 top-0 p-4 pb-12 sm:pb-16 shadow-[8px_8px_0_var(--nb-accent)] -rotate-3 hover:rotate-0 hover:scale-[1.02]"
                }`}
              >
                 <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-8 sm:h-10 bg-white/70 border-2 border-[var(--nb-primary)] rotate-2 z-30 shadow-sm backdrop-blur-md"></div>
                 
                 <div className="w-full aspect-square border-4 border-[var(--nb-primary)] overflow-hidden bg-[var(--nb-primary)]">
                   {s.image ? (
                     <img src={s.image} className="w-full h-full object-cover" alt={s.name} />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center font-black text-[var(--nb-bg)] opacity-50">NO PIC</div>
                   )}
                 </div>
                 
                 <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center font-black text-xs sm:text-sm uppercase text-[var(--nb-primary)] opacity-90 tracking-[0.2em] px-2 truncate">
                   #1 Supporter
                 </div>
              </div>
            </div>

            
            <div className="flex-1 text-center lg:text-left pt-2 lg:pt-8 z-10 w-full overflow-hidden">
              <h3 className="font-black text-2xl sm:text-5xl lg:text-7xl uppercase text-[var(--nb-primary)] mb-6 leading-[0.9] break-words" style={{ textShadow: "1px 1px 0 var(--nb-bg), 3px 3px 0 var(--nb-accent)" }}>
                {s.name}
              </h3>
              
              <div className="inline-block bg-[var(--nb-primary)] text-[var(--nb-bg)] px-6 py-3 border-2 sm:border-4 border-[var(--nb-primary)] font-black text-xs sm:text-sm uppercase tracking-widest mb-10 shadow-[6px_6px_0_var(--nb-accent)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-default">
                {s.role}
              </div>
              
              <div className="relative bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] p-6 sm:p-10 shadow-[8px_8px_0_var(--nb-primary)] mx-4 sm:mx-0 lg:mr-10">
                <span className="absolute -top-8 -left-4 sm:-left-6 text-7xl sm:text-8xl text-[var(--nb-accent)] font-serif leading-none select-none" style={{ textShadow: "3px 3px 0 var(--nb-primary)" }}>&ldquo;</span>
                <p className="font-bold text-base sm:text-xl text-[var(--nb-primary)] leading-relaxed relative z-10">
                  {s.description}
                </p>
                <span className="absolute -bottom-14 -right-4 sm:-right-6 text-7xl sm:text-8xl text-[var(--nb-accent)] font-serif leading-none select-none" style={{ textShadow: "3px 3px 0 var(--nb-primary)" }}>&rdquo;</span>
              </div>
            </div>
            
          </div>
        );
        })}
      </div>
    </section>
  );
}
