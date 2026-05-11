import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';
import { home } from '@/routes';
import { useEffect, useState } from 'react';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const [theme, setTheme] = useState('naoo');

    useEffect(() => {
        const saved = localStorage.getItem('nb-theme') || 'naoo';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
    }, []);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[var(--nb-bg)] p-6 md:p-10 font-sans">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4 reveal">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1"
                        >
                            <div className="mb-2 flex h-14 w-14 items-center justify-center bg-[var(--nb-primary)] border-4 border-[var(--nb-primary)] shadow-[6px_6px_0_var(--nb-accent)] group-hover:shadow-[8px_8px_0_var(--nb-accent)] transition-all">
                                <AppLogoIcon className="size-8 fill-[var(--nb-accent)]" />
                            </div>
                            <span className="font-black uppercase text-2xl tracking-widest text-[var(--nb-primary)]">NAOO.ID</span>
                        </Link>

                        <div className="space-y-3 text-center">
                            <h1 className="text-3xl font-black uppercase text-[var(--nb-primary)] leading-tight">{title}</h1>
                            <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--nb-primary)] opacity-60">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[12px_12px_0_var(--nb-primary)] p-8 relative overflow-hidden">
                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-12 h-12 bg-[var(--nb-accent)] border-b-4 border-l-4 border-[var(--nb-primary)] -mr-6 -mt-6 rotate-45" />
                        
                        <div className="relative z-10">
                            {children}
                        </div>
                    </div>

                    <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-[var(--nb-primary)] opacity-20 mt-4">
                        &copy; 2024 NAOO.ID — ALL RIGHTS RESERVED
                    </p>
                </div>
            </div>

            <style>{`
                .reveal { animation: authReveal 0.6s cubic-bezier(0.16,1,0.3,1) both; }
                @keyframes authReveal { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
                
                /* Neobrutalist form overrides */
                input, button, select, textarea {
                    font-family: inherit !important;
                }
                
                input:focus {
                    outline: none !important;
                    box-shadow: 4px 4px 0 var(--nb-primary) !important;
                    background: var(--nb-accent-light) !important;
                }
            `}</style>
        </div>
    );
}
