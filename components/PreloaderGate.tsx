'use client';

import { useEffect } from 'react';

/**
 * Removes the CSS cover (html.is-loading) once React has hydrated and the
 * Preloader has had time to render its own overlay. Two animation frames
 * is enough for the Preloader's first render to be painted.
 */
export function PreloaderGate() {
  useEffect(() => {
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        document.documentElement.classList.remove('is-loading');
      });
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, []);

  return null;
}