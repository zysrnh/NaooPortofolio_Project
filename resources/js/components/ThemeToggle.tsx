import React, { useEffect, useState } from 'react';

type Theme = 'naoo' | 'gold' | 'fiery';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('nb-theme') as Theme) || 'naoo';
        }
        return 'naoo';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nb-theme', theme);
    }, [theme]);

    const themes: { id: Theme; label: string; colors: string[] }[] = [
        { id: 'naoo', label: 'Naoo', colors: ['#0B1957', '#F8F3EA', '#9ECCFA'] },
        { id: 'gold', label: 'Gold', colors: ['#000000', '#FCA311', '#E5E5E5'] },
        { id: 'fiery', label: 'Fiery', colors: ['#780000', '#003049', '#FDF0D5'] },
    ];

    return (
        <div className="fixed bottom-6 left-6 z-[300] flex flex-col gap-2">
            <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-shadow)] p-2 flex flex-col gap-2">
                <p className="font-black text-[9px] uppercase tracking-widest text-[var(--nb-primary)] px-1">Switch Theme</p>
                <div className="flex gap-2">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`w-10 h-10 border-4 border-[var(--nb-primary)] transition-all flex items-center justify-center relative group ${
                                theme === t.id ? 'scale-110 shadow-[3px_3px_0_var(--nb-primary)] -translate-x-0.5 -translate-y-0.5' : 'opacity-60 hover:opacity-100'
                            }`}
                            title={t.label}
                            style={{ backgroundColor: t.colors[1] }}
                        >
                            <div className="flex flex-col w-full h-full">
                                <div className="flex-1 w-full" style={{ backgroundColor: t.colors[0] }} />
                                <div className="flex-1 w-full" style={{ backgroundColor: t.colors[2] }} />
                            </div>
                            {theme === t.id && (
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--nb-accent)] border-2 border-[var(--nb-primary)] flex items-center justify-center text-[var(--nb-primary)]">
                                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
