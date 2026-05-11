import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('button, a, .spotlight-card, .tech-chip, .dot, .nb-tog')) setHovered(true);
      else setHovered(false);
    };
    const onDown = () => setClicked(true);
    const onUp   = () => setClicked(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
    };
  }, []);

  return (
    <>
      <style>{`
        body { cursor: none !important; }
        a, button, [role="button"] { cursor: none !important; }
        .custom-cursor {
          position: fixed; top: 0; left: 0;
          width: 16px; height: 16px;
          background: var(--nb-accent);
          border: 2.5px solid var(--nb-primary);
          pointer-events: none; z-index: 100000;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background 0.2s, transform 0.05s linear;
        }
        .custom-cursor.hover {
          width: 40px; height: 40px;
          background: transparent;
          border-width: 4px;
        }
        .custom-cursor.clicked {
          transform: translate(-50%, -50%) scale(0.8);
        }
        @media (max-width: 1024px) {
          .custom-cursor { display: none; }
          body { cursor: auto !important; }
          a, button { cursor: pointer !important; }
        }
      `}</style>
      <div 
        className={`custom-cursor ${hovered ? 'hover' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
    </>
  );
}
