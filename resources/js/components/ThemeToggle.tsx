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
        { id: 'gold',   label: 'Gold',   primary: '#000000', accent: '#FCA311', bg: '#E5E5E5' },
        { id: 'fiery',  label: 'Fiery',  primary: '#003049', accent: '#C1121F', bg: '#FDF0D5' },
        { id: 'mystic', label: 'Mystic', primary: '#13273F', accent: '#4E0803', bg: '#F5EBE0' },
    ];

    const currentTheme = themes.find(t => t.id === theme)!;

    return (
        <div className="relative inline-flex items-center">
            {/* Theme Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-3 bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-primary)] p-2 min-w-[140px] z-[999] flex flex-col gap-1">
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--nb-primary)] opacity-40 px-2 py-1 border-b border-[var(--nb-primary)] mb-1">
                        Select Theme
                    </div>
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => { setTheme(t.id); setIsOpen(false); }}
                            className={`flex items-center gap-3 p-2 border-2 transition-all text-left ${
                                theme === t.id 
                                ? 'border-[var(--nb-primary)] bg-[var(--nb-primary)] text-[var(--nb-bg)]' 
                                : 'border-transparent hover:bg-[var(--nb-accent-light)] text-[var(--nb-primary)]'
                            }`}
                        >
                            <div className="w-5 h-5 border-2 border-current overflow-hidden flex flex-col flex-shrink-0">
                                <div style={{ backgroundColor: t.primary }} className="flex-1" />
                                <div style={{ backgroundColor: t.bg }} className="flex-1 relative">
                                    <div style={{ backgroundColor: t.accent }} className="absolute inset-y-0 right-0 w-1/2" />
                                </div>
                            </div>
                            <span className="font-black text-[10px] uppercase tracking-wider">{t.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-10 h-10 border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[3px_3px_0_var(--nb-primary)] flex items-center justify-center transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--nb-primary)] active:translate-x-0 active:translate-y-0 active:shadow-none ${isOpen ? 'bg-[var(--nb-accent-light)]' : ''}`}
                title="Ganti Tema"
            >
                <div className={`w-5 h-5 border-2 border-[var(--nb-primary)] overflow-hidden flex flex-col transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                    <div style={{ backgroundColor: currentTheme.primary }} className="flex-1" />
                    <div style={{ backgroundColor: currentTheme.bg }} className="flex-1 relative">
                        <div style={{ backgroundColor: currentTheme.accent }} className="absolute inset-y-0 right-0 w-1/2" />
                    </div>
                </div>
            </button>
        </div>
    );
}
