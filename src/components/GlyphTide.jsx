import React, { useEffect, useRef, useMemo } from 'react';

const GLYPHS = ['@', '#', '%', '=', '*', '+', '~', '&', '$', '^'];
const COLS = 32;
const ROWS = 16;

const GlyphTide = () => {
  const gridRef = useRef(null);
  const animRef = useRef(null);

  // Generate stable random glyphs and offsets once
  const cells = useMemo(() => {
    return Array.from({ length: ROWS * COLS }, (_, i) => ({
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      offset: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.8,
    }));
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const spans = grid.querySelectorAll('span[data-glyph]');
    let t = 0;

    const animate = () => {
      t += 0.012;
      for (let i = 0; i < spans.length; i++) {
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        const cell = cells[i];
        // Wave travels diagonally across the grid
        const wave = Math.sin(t * cell.speed + col * 0.25 + row * 0.3 + cell.offset);
        // Map sine [-1,1] to opacity [0.03, 0.25]
        const opacity = 0.03 + (wave + 1) * 0.11;
        spans[i].style.opacity = opacity;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    // Respect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) {
      animRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [cells]);

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
    >
      {cells.map((cell, i) => (
        <span
          key={i}
          data-glyph
          className="flex items-center justify-center font-mono text-[10px] sm:text-xs text-on-surface-variant"
          style={{ opacity: 0.06 }}
        >
          {cell.glyph}
        </span>
      ))}
    </div>
  );
};

export default GlyphTide;
