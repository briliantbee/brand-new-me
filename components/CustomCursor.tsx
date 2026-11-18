'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const smoothRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest('a, button, [data-cursor]'));
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest('a, button, [data-cursor]'));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      const s = smoothRef.current;
      const t = targetRef.current;
      s.x += (t.x - s.x) * 0.18;
      s.y += (t.y - s.y) * 0.18;
      posRef.current = { ...s };

      const el = document.getElementById('custom-cursor');
      if (el) {
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const size = hovering ? 48 : pressed ? 12 : 20;
  const opacity = hovering ? 0.5 : 0.9;

  return (
    <div
      id="custom-cursor"
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-foreground transition-[width,height,opacity] duration-200 ease-out"
      style={{
        width: size,
        height: size,
        opacity: visible ? opacity : 0,
        transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`,
      }}
    />
  );
}
