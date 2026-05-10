import { useEffect, useState } from 'react';

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconUsers    = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
const IconEye      = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconMonitor  = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
const IconGlobe    = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
const IconTrash    = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const IconTrend    = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;

// ── Types ─────────────────────────────────────────────────────────────────────
interface DayStat    { date: string; visitors: number; pageviews: number; }
interface TopPage    { page: string; views: number; }
interface DeviceStat { device: string; count: number; }
interface BrowserStat{ browser: string; count: number; }
interface CountryStat{ country: string | null; visitors: number; }
interface RecentVisit{ ip_address: string; country: string|null; city: string|null; device: string; browser: string; os: string; page: string; referrer: string|null; created_at: string; }

interface StatsData {
    total_visitors: number;
    total_pageviews: number;
    prev_visitors: number;
    daily: DayStat[];
    top_pages: TopPage[];
    devices: DeviceStat[];
    browsers: BrowserStat[];
    countries: CountryStat[];
    recent: RecentVisit[];
    period_days: number;
}

// ── Mini sparkline ────────────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
    if (data.length < 2) return null;
    const max = Math.max(...data, 1);
    const w = 80, h = 28;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ');
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
            <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} />
        </svg>
    );
}

// ── Bar chart ─────────────────────────────────────────────────────────────────
function MiniBar({ items, labelKey, valueKey, color }: { items: any[]; labelKey: string; valueKey: string; color: string }) {
    const max = Math.max(...items.map(i => i[valueKey]), 1);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--nb-primary)', width: 90, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
                        {item[labelKey] || 'Unknown'}
                    </span>
                    <div style={{ flex: 1, height: 8, background: 'rgba(0,0,0,0.06)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, width: `${(item[valueKey] / max) * 100}%`, background: color, transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 900, color: 'var(--nb-primary)', width: 28, textAlign: 'right' }}>{item[valueKey]}</span>
                </div>
            ))}
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function VisitorStats() {
    const [data, setData]     = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [days, setDays]     = useState(30);
    const [clearing, setClearing] = useState(false);
    const [tab, setTab]       = useState<'overview' | 'recent'>('overview');

    const load = (d = days) => {
        setLoading(true);
        fetch(`/api/visitors/stats?days=${d}`)
            .then(r => r.json())
            .then(setData)
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, [days]);

    const handleClear = async () => {
        if (!confirm('Hapus semua data visitor? Tidak bisa di-undo.')) return;
        setClearing(true);
        await fetch('/api/visitors/clear', { method: 'DELETE' });
        setClearing(false);
        load();
    };

    const trend = data ? (data.prev_visitors > 0
        ? Math.round(((data.total_visitors - data.prev_visitors) / data.prev_visitors) * 100)
        : 100) : 0;

    const sparkData = data?.daily.map(d => d.visitors) ?? [];

    const s: React.CSSProperties = {
        border: '3px solid var(--nb-primary)',
        background: 'var(--nb-bg)',
        boxShadow: '4px 4px 0 var(--nb-primary)',
        padding: '14px 16px',
    };

    return (
        <div style={{ animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ color: 'var(--nb-primary)' }}><IconUsers size={14} /></div>
                    <p style={{ fontWeight: 900, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--nb-primary)', margin: 0 }}>Visitor Analytics</p>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {/* Period selector */}
                    {[7, 30, 90].map(d => (
                        <button key={d} onClick={() => setDays(d)}
                            style={{ padding: '3px 8px', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', border: '2px solid var(--nb-primary)', background: days === d ? 'var(--nb-primary)' : 'transparent', color: days === d ? 'var(--nb-bg)' : 'var(--nb-primary)', transition: 'all 0.1s' }}>
                            {d}D
                        </button>
                    ))}
                    <button onClick={handleClear} disabled={clearing}
                        style={{ padding: '3px 8px', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', border: '2px solid var(--nb-accent)', color: 'var(--nb-accent)', background: 'transparent', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <IconTrash size={10} /> Reset
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--nb-primary)', opacity: 0.4, fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Loading...
                </div>
            ) : !data ? (
                <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--nb-primary)', opacity: 0.4, fontWeight: 900, fontSize: 11 }}>Gagal memuat data</div>
            ) : (
                <>
                    {/* Stat cards row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 14 }}>
                        {/* Visitors */}
                        <div style={s}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--nb-primary)', opacity: 0.6 }}>Unique Visitors</p>
                                    <p style={{ margin: '4px 0 0', fontSize: 28, fontWeight: 900, color: 'var(--nb-primary)', lineHeight: 1 }}>{data.total_visitors.toLocaleString()}</p>
                                    <p style={{ margin: '4px 0 0', fontSize: 9, fontWeight: 700, color: trend >= 0 ? '#22c55e' : 'var(--nb-accent)' }}>
                                        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs prev {days}d
                                    </p>
                                </div>
                                <div style={{ color: 'var(--nb-primary)', opacity: 0.3 }}><IconUsers size={20} /></div>
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <Sparkline data={sparkData} color="var(--nb-primary)" />
                            </div>
                        </div>

                        {/* Page Views */}
                        <div style={s}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--nb-primary)', opacity: 0.6 }}>Page Views</p>
                                    <p style={{ margin: '4px 0 0', fontSize: 28, fontWeight: 900, color: 'var(--nb-primary)', lineHeight: 1 }}>{data.total_pageviews.toLocaleString()}</p>
                                    <p style={{ margin: '4px 0 0', fontSize: 9, fontWeight: 700, color: 'var(--nb-primary)', opacity: 0.5 }}>
                                        {data.total_visitors > 0 ? (data.total_pageviews / data.total_visitors).toFixed(1) : '0'} pg/visitor
                                    </p>
                                </div>
                                <div style={{ color: 'var(--nb-accent)', opacity: 0.6 }}><IconEye size={20} /></div>
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <Sparkline data={data.daily.map(d => d.pageviews)} color="var(--nb-accent)" />
                            </div>
                        </div>

                        {/* Top device */}
                        <div style={s}>
                            <p style={{ margin: '0 0 8px', fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--nb-primary)', opacity: 0.6 }}>Devices</p>
                            <MiniBar items={data.devices} labelKey="device" valueKey="count" color="var(--nb-primary)" />
                        </div>

                        {/* Top browser */}
                        <div style={s}>
                            <p style={{ margin: '0 0 8px', fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--nb-primary)', opacity: 0.6 }}>Browsers</p>
                            <MiniBar items={data.browsers.slice(0, 4)} labelKey="browser" valueKey="count" color="var(--nb-accent)" />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: 0, marginBottom: 12, borderBottom: '3px solid var(--nb-primary)' }}>
                        {(['overview', 'recent'] as const).map(t => (
                            <button key={t} onClick={() => setTab(t)}
                                style={{ padding: '6px 14px', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', border: 'none', borderBottom: tab === t ? '3px solid var(--nb-accent)' : '3px solid transparent', marginBottom: -3, background: 'transparent', color: tab === t ? 'var(--nb-primary)' : 'var(--nb-primary)', opacity: tab === t ? 1 : 0.45, fontFamily: 'inherit', transition: 'all 0.1s' }}>
                                {t === 'overview' ? 'Overview' : 'Recent Visits'}
                            </button>
                        ))}
                    </div>

                    {tab === 'overview' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {/* Top pages */}
                            <div style={s}>
                                <p style={{ margin: '0 0 10px', fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--nb-primary)', opacity: 0.6 }}>Top Pages</p>
                                <MiniBar items={data.top_pages.slice(0, 6)} labelKey="page" valueKey="views" color="var(--nb-primary)" />
                            </div>
                            {/* Countries */}
                            <div style={s}>
                                <p style={{ margin: '0 0 10px', fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--nb-primary)', opacity: 0.6 }}>Countries</p>
                                <MiniBar items={data.countries.slice(0, 6).map(c => ({ ...c, country: c.country || 'Unknown' }))} labelKey="country" valueKey="visitors" color="var(--nb-accent)" />
                            </div>
                        </div>
                    )}

                    {tab === 'recent' && (
                        <div style={{ ...s, padding: 0, overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
                                    <thead>
                                        <tr style={{ background: 'var(--nb-primary)' }}>
                                            {['Time', 'IP', 'Country', 'Device', 'Browser', 'Page'].map(h => (
                                                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 900, fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--nb-bg)', whiteSpace: 'nowrap' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.recent.map((v, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid var(--nb-primary)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.03)' }}>
                                                <td style={{ padding: '7px 10px', whiteSpace: 'nowrap', color: 'var(--nb-primary)', opacity: 0.7 }}>
                                                    {new Date(v.created_at).toLocaleString('id-ID', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                                <td style={{ padding: '7px 10px', fontFamily: 'monospace', fontSize: 9, color: 'var(--nb-primary)' }}>{v.ip_address}</td>
                                                <td style={{ padding: '7px 10px', color: 'var(--nb-primary)' }}>{v.country || '—'}{v.city ? `, ${v.city}` : ''}</td>
                                                <td style={{ padding: '7px 10px', color: 'var(--nb-primary)' }}>{v.device}</td>
                                                <td style={{ padding: '7px 10px', color: 'var(--nb-primary)' }}>{v.browser}</td>
                                                <td style={{ padding: '7px 10px', fontFamily: 'monospace', fontSize: 9, color: 'var(--nb-accent)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.page}</td>
                                            </tr>
                                        ))}
                                        {data.recent.length === 0 && (
                                            <tr><td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: 'var(--nb-primary)', opacity: 0.4, fontWeight: 900, textTransform: 'uppercase', fontSize: 10 }}>Belum ada data visitor</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
