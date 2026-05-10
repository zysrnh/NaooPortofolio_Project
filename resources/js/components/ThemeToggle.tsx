import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

type Theme = 'naoo' | 'retro' | 'christmas' | 'luxe' | 'euro' | 'cold';

const ALL_THEMES: { id: Theme; label: string; desc: string; bg: string; primary: string; accent: string }[] = [
    { id: 'naoo',      label: 'Naoo',  desc: 'Classic Blue',     bg: '#F8F3EA', primary: '#0B1957', accent: '#9ECCFA' },
    { id: 'retro',     label: 'Retro', desc: 'American Vintage', bg: '#e8d8c9', primary: '#4b607f', accent: '#f3701e' },
    { id: 'christmas', label: 'Xmas',  desc: 'Christmas Color',  bg: '#F6E8DD', primary: '#193564', accent: '#DC3C24' },
    { id: 'luxe',      label: 'Luxe',  desc: 'Caramel & Black',  bg: '#f7ece6', primary: '#0d0d0f', accent: '#caa07d' },
    { id: 'euro',      label: 'Euro',  desc: 'European Retro',   bg: '#f4e5b2', primary: '#253054', accent: '#dc3c24' },
    { id: 'cold',      label: 'Cold',  desc: 'Cold Color Match', bg: '#EBEDE0', primary: '#31394C', accent: '#7A7F84' },
];

const PER_PAGE = 2;
const VALID_IDS = ALL_THEMES.map(t => t.id);

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const s = localStorage.getItem('nb-theme') as Theme;
            return VALID_IDS.includes(s) ? s : 'naoo';
        }
        return 'naoo';
    });
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [pos, setPos] = useState({ top: 0, right: 0 });
    const btnRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const totalPages = Math.ceil(ALL_THEMES.length / PER_PAGE);
    const visible = ALL_THEMES.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
    const current = ALL_THEMES.find(t => t.id === theme) ?? ALL_THEMES[0];

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nb-theme', theme);
    }, [theme]);

    const calcPos = useCallback(() => {
        if (!btnRef.current) return;
        const r = btnRef.current.getBoundingClientRect();
        setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }, []);

    const toggle = () => { if (!open) calcPos(); setOpen(p => !p); };

    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => {
            if (!panelRef.current?.contains(e.target as Node) &&
                !btnRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onDown);
        window.addEventListener('resize', calcPos);
        return () => { document.removeEventListener('mousedown', onDown); window.removeEventListener('resize', calcPos); };
    }, [open, calcPos]);

    const panel = open && typeof document !== 'undefined' ? ReactDOM.createPortal(
        <div ref={panelRef} style={{
            position: 'fixed', top: pos.top, right: pos.right,
            zIndex: 2147483647, fontFamily: 'inherit',
            background: current.bg,
            border: `3px solid ${current.primary}`,
            boxShadow: `6px 6px 0 ${current.primary}`,
            padding: '14px 16px', minWidth: 248,
            animation: 'nbIn 0.16s cubic-bezier(0.16,1,0.3,1) both',
        }}>
            <style>{`@keyframes nbIn{from{opacity:0;transform:translateY(-6px) scaleY(.93)}to{opacity:1;transform:none}}`}</style>

            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                <span style={{ fontWeight:900, fontSize:9, textTransform:'uppercase', letterSpacing:'0.2em', color:current.primary }}>UI Theme</span>
                <button onClick={() => setOpen(false)} style={{ background:current.primary, color:current.bg, border:'none', width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontWeight:900, fontSize:11 }}>✕</button>
            </div>
            <div style={{ height:2, background:current.primary, marginBottom:12 }} />

            {/* Theme cards */}
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {visible.map(t => {
                    const isActive = theme === t.id;
                    return (
                        <button key={t.id} onClick={() => { setTheme(t.id); setOpen(false); }}
                            style={{
                                display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
                                border: isActive ? `3px solid ${t.primary}` : `2px solid ${t.primary}55`,
                                background:t.bg,
                                boxShadow: isActive ? `3px 3px 0 ${t.primary}` : '2px 2px 0 rgba(0,0,0,0.08)',
                                transform: isActive ? 'translate(-2px,-2px)' : 'none',
                                transition:'all 0.1s ease', cursor:'pointer', outline:'none',
                                textAlign:'left', position:'relative',
                            }}>
                            <div style={{ display:'flex', gap:2, flexShrink:0 }}>
                                <div style={{ width:10, height:28, background:t.primary }} />
                                <div style={{ width:10, height:28, background:t.bg, border:'1px solid rgba(0,0,0,0.1)' }} />
                                <div style={{ width:10, height:28, background:t.accent }} />
                            </div>
                            <div>
                                <div style={{ fontWeight:900, fontSize:11, textTransform:'uppercase', color:t.primary, letterSpacing:'0.07em' }}>{t.label}</div>
                                <div style={{ fontSize:9, color:t.primary, opacity:0.6, marginTop:2 }}>{t.desc}</div>
                            </div>
                            {isActive && (
                                <div style={{ position:'absolute', top:-6, right:-6, background:t.primary, color:t.bg, width:16, height:16, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${t.bg}` }}>
                                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Arrow navigation */}
            {totalPages > 1 && (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:12, paddingTop:10, borderTop:`2px solid ${current.primary}44` }}>
                    <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page===0}
                        style={{ background: page===0 ? 'transparent' : current.primary, color: page===0 ? `${current.primary}44` : current.bg, border:`2px solid ${page===0?`${current.primary}33`:current.primary}`, width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', cursor: page===0?'not-allowed':'pointer', transition:'all 0.1s' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <div style={{ display:'flex', gap:5 }}>
                        {Array.from({length:totalPages}).map((_,i) => (
                            <button key={i} onClick={() => setPage(i)} style={{ width:i===page?16:6, height:6, border:'none', cursor:'pointer', padding:0, background:i===page?current.primary:`${current.primary}44`, transition:'all 0.2s' }}/>
                        ))}
                    </div>
                    <button onClick={() => setPage(p => Math.min(totalPages-1, p+1))} disabled={page===totalPages-1}
                        style={{ background: page===totalPages-1 ? 'transparent' : current.primary, color: page===totalPages-1 ? `${current.primary}44` : current.bg, border:`2px solid ${page===totalPages-1?`${current.primary}33`:current.primary}`, width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', cursor: page===totalPages-1?'not-allowed':'pointer', transition:'all 0.1s' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </div>
            )}
        </div>,
        document.body
    ) : null;

    return (
        <>
            <style>{`.nb-tog{transition:transform .08s ease,box-shadow .08s ease}.nb-tog:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--nb-shadow,var(--nb-primary))!important}.nb-tog:active{transform:translate(1px,1px)}`}</style>
            <button ref={btnRef} onClick={toggle} title="Ganti Tema" className="nb-tog"
                style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 10px', border:'3px solid var(--nb-primary)', background:'var(--nb-bg)', boxShadow:'3px 3px 0 var(--nb-shadow,var(--nb-primary))', cursor:'pointer', outline:'none' }}>
                <div style={{ display:'flex', gap:2 }}>
                    <div style={{ width:8, height:20, background:current.primary }} />
                    <div style={{ width:8, height:20, background:current.bg, border:'1.5px solid rgba(0,0,0,0.12)' }} />
                    <div style={{ width:8, height:20, background:current.accent }} />
                </div>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--nb-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition:'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </button>
            {panel}
        </>
    );
}
