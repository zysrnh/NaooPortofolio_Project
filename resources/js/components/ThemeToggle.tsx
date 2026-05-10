import React, { useEffect, useRef, useState } from 'react';

type Theme = 'naoo' | 'retro';

const themes: { id: Theme; label: string; bg: string; primary: string; accent: string; desc: string }[] = [
    {
        id: 'naoo',
        label: 'Naoo',
        bg: '#F8F3EA',
        primary: '#0B1957',
        accent: '#9ECCFA',
        desc: 'Classic Blue',
    },
    {
        id: 'retro',
        label: 'Retro',
        bg: '#e8d8c9',
        primary: '#4b607f',
        accent: '#f3701e',
        desc: 'American Vintage',
    },
];

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('nb-theme') as Theme;
            return (saved === 'naoo' || saved === 'retro') ? saved : 'naoo';
        }
        return 'naoo';
    });

    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nb-theme', theme);
    }, [theme]);

    // Close panel on outside click
    useEffect(() => {
        if (!panelOpen) return;
        const handler = (e: MouseEvent) => {
            if (
                panelRef.current && !panelRef.current.contains(e.target as Node) &&
                btnRef.current && !btnRef.current.contains(e.target as Node)
            ) {
                setPanelOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [panelOpen]);

    const current = themes.find(t => t.id === theme)!;

    const applyTheme = (id: Theme) => {
        setTheme(id);
        setPanelOpen(false);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <style>{`
                @keyframes nb-panel-in {
                    from { opacity: 0; transform: translateY(-8px) scaleY(0.9); }
                    to   { opacity: 1; transform: translateY(0) scaleY(1); }
                }
                .nb-theme-panel {
                    animation: nb-panel-in 0.18s cubic-bezier(0.16,1,0.3,1) both;
                    transform-origin: top center;
                }
                .nb-swatch-btn {
                    transition: transform 0.1s ease, box-shadow 0.1s ease;
                    cursor: pointer;
                }
                .nb-swatch-btn:hover {
                    transform: translate(-2px,-2px);
                    box-shadow: 4px 4px 0 var(--nb-shadow, #000) !important;
                }
                .nb-swatch-btn:active {
                    transform: translate(0,0);
                    box-shadow: 1px 1px 0 var(--nb-shadow, #000) !important;
                }
                .nb-toggle-btn {
                    transition: transform 0.08s ease, box-shadow 0.08s ease;
                }
                .nb-toggle-btn:hover {
                    transform: translate(-2px,-2px);
                    box-shadow: 5px 5px 0 var(--nb-shadow, #0B1957) !important;
                }
                .nb-toggle-btn:active {
                    transform: translate(1px,1px);
                    box-shadow: 1px 1px 0 var(--nb-shadow, #0B1957) !important;
                }
            `}</style>

            {/* Trigger button — shows active palette preview */}
            <button
                ref={btnRef}
                onClick={() => setPanelOpen(p => !p)}
                title="Ganti Tema"
                className="nb-toggle-btn"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 10px',
                    border: '3px solid var(--nb-primary)',
                    background: 'var(--nb-bg)',
                    boxShadow: '3px 3px 0 var(--nb-shadow, var(--nb-primary))',
                    cursor: 'pointer',
                    outline: 'none',
                }}
            >
                {/* Mini palette swatch of active theme */}
                <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <div style={{ width: 10, height: 20, background: current.primary, border: '1.5px solid rgba(0,0,0,0.15)' }} />
                    <div style={{ width: 10, height: 20, background: current.bg,      border: '1.5px solid rgba(0,0,0,0.15)' }} />
                    <div style={{ width: 10, height: 20, background: current.accent,  border: '1.5px solid rgba(0,0,0,0.15)' }} />
                </div>
                {/* Chevron icon — rotates when open */}
                <svg
                    width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="var(--nb-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: 'transform 0.2s ease', transform: panelOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {/* Panel — slides down below the button, NOT a dropdown */}
            {panelOpen && (
                <div
                    ref={panelRef}
                    className="nb-theme-panel"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        right: 0,
                        zIndex: 999999,
                        background: 'var(--nb-bg)',
                        border: '3px solid var(--nb-primary)',
                        boxShadow: '6px 6px 0 var(--nb-shadow, var(--nb-primary))',
                        padding: '14px 16px',
                        minWidth: 220,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}
                >
                    {/* Panel header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{
                            fontWeight: 900, fontSize: 9, textTransform: 'uppercase',
                            letterSpacing: '0.2em', color: 'var(--nb-primary)',
                        }}>
                            UI Theme
                        </span>
                        {/* Close X button */}
                        <button
                            onClick={() => setPanelOpen(false)}
                            style={{
                                background: 'var(--nb-primary)',
                                color: 'var(--nb-bg)',
                                border: 'none',
                                width: 18, height: 18,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer',
                                fontWeight: 900,
                                fontSize: 11,
                                lineHeight: 1,
                            }}
                            title="Tutup"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 2, background: 'var(--nb-primary)', marginBottom: 2 }} />

                    {/* Theme swatches */}
                    {themes.map(t => {
                        const isActive = theme === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => applyTheme(t.id)}
                                className="nb-swatch-btn"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '8px 10px',
                                    border: isActive ? `3px solid ${t.primary}` : '2px solid rgba(0,0,0,0.15)',
                                    background: t.bg,
                                    boxShadow: isActive ? `3px 3px 0 ${t.primary}` : '2px 2px 0 rgba(0,0,0,0.1)',
                                    outline: 'none',
                                    textAlign: 'left',
                                    position: 'relative',
                                }}
                            >
                                {/* Color blocks */}
                                <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                                    <div style={{ width: 12, height: 24, background: t.primary }} />
                                    <div style={{ width: 12, height: 24, background: t.bg, border: '1px solid rgba(0,0,0,0.1)' }} />
                                    <div style={{ width: 12, height: 24, background: t.accent }} />
                                </div>

                                {/* Label + desc */}
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontWeight: 900, fontSize: 11, textTransform: 'uppercase',
                                        letterSpacing: '0.08em', color: t.primary,
                                    }}>
                                        {t.label}
                                    </div>
                                    <div style={{ fontSize: 9, color: t.primary, opacity: 0.7, letterSpacing: '0.05em' }}>
                                        {t.desc}
                                    </div>
                                </div>

                                {/* Active checkmark */}
                                {isActive && (
                                    <div style={{
                                        position: 'absolute', top: -6, right: -6,
                                        background: t.primary, color: t.bg,
                                        width: 16, height: 16,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: `2px solid ${t.bg}`,
                                        borderRadius: '50%',
                                    }}>
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
