import { useEffect, useRef } from 'react';

/**
 * useVisitorTracker — fires once per session to POST visit data to /api/track
 * Safe to call on every public page; uses sessionStorage to avoid duplicate hits.
 */
export function useVisitorTracker(page?: string) {
    const sent = useRef(false);

    useEffect(() => {
        if (sent.current) return;
        sent.current = true;

        // Generate or reuse a session ID (tab-scoped)
        let sessionId = sessionStorage.getItem('nb_session');
        if (!sessionId) {
            sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
            sessionStorage.setItem('nb_session', sessionId);
        }

        // Only track a page once per session
        const trackedKey = `nb_tracked_${page ?? window.location.pathname}`;
        if (sessionStorage.getItem(trackedKey)) return;
        sessionStorage.setItem(trackedKey, '1');

        const payload = {
            session_id: sessionId,
            page: page ?? window.location.pathname,
            referrer: document.referrer || null,
        };

        // Use sendBeacon for reliability (survives page unload)
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
            navigator.sendBeacon('/api/track', blob);
        } else {
            fetch('/api/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                body: JSON.stringify(payload),
                keepalive: true,
            }).catch(() => {});
        }
    }, [page]);
}
