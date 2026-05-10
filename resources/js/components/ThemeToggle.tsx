import React, { useEffect, useState } from 'react';

type Theme = 'naoo' | 'gold' | 'fiery' | 'mystic';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('nb-theme') as Theme) || 'naoo';
        }
        return 'naoo';
    });

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nb-theme', theme);
    }, [theme]);

    const themes: { id: Theme; label: string; primary: string; accent: string; bg: string }[] = [
        { id: 'naoo',   label: 'Naoo',   primary: '#0B1957', accent: '#9ECCFA', bg: '#F8F3EA' },
        { id: 'gold',   label: 'Gold',   primary: '#1a1a1a', accent: '#fbbf24', bg: '#ffffff' },
        { id: 'fiery',  label: 'Fiery',  primary: '#f43f5e', accent: '#fb7185', bg: '#0f172a' },
        { id: 'mystic', label: 'Mystic', primary: '#111835', accent: '#f8d613', bg: '#fbfcfc' },
    ];

    return (
        <div className="flex items-center gap-2 sm:gap-3 p-1 border-2 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[3px_3px_0_var(--nb-primary)]">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    title={`Ganti Tema: ${t.label}`}
                    className={`group relative flex items-center justify-center transition-all ${
                        theme === t.id 
                        ? 'w-9 h-9 border-4 border-[var(--nb-primary)] shadow-[2px_2px_0_var(--nb-primary)] -translate-x-0.5 -translate-y-0.5' 
                        : 'w-8 h-8 border-2 border-[var(--nb-primary)] border-opacity-30 hover:border-opacity-100 hover:scale-110 active:scale-95'
                    }`}
                >
                    <div className="w-full h-full flex flex-col overflow-hidden">
                        <div style={{ backgroundColor: t.primary }} className="flex-1" />
                        <div style={{ backgroundColor: t.bg }} className="flex-1 relative">
                            <div style={{ backgroundColor: t.accent }} className="absolute inset-y-0 right-0 w-1/2" />
                        </div>
                    </div>
                    {/* Tooltip on hover */}
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[var(--nb-primary)] text-[var(--nb-bg)] text-[8px] font-black uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                        {t.label}
                    </span>
                    {theme === t.id && (
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--nb-primary)] text-[var(--nb-bg)] flex items-center justify-center border-2 border-[var(--nb-primary)]">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
}
