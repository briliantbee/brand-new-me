'use client';

import { useEffect } from 'react';

export type BgStop = {
  trigger: string;
  /** CSS variable atau hex value — akan di-set ke document.documentElement.style */
  color: string;
};

export function ScrollBackground({ stops }: { stops: BgStop[] }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--page-bg', stops[0]?.color ?? 'var(--background)');
      return;
    }

    const all = stops
      .map((s) => ({
        el: document.getElementById(s.trigger),
        color: s.color,
      }))
      .filter((s): s is { el: HTMLElement; color: string } => !!s.el);

    if (all.length < 2) return;

    document.documentElement.style.setProperty('--page-bg', all[0]!.color);

    let raf = 0;

    const tick = () => {
      const y = window.scrollY;

      const absTops = all.map((s) => s.el.getBoundingClientRect().top + y);

      let idx = 0;
      for (let i = 0; i < absTops.length; i++) {
        if (y >= absTops[i]!) idx = i;
      }

      const color = all[idx]!.color;
      const current = getComputedStyle(document.documentElement)
        .getPropertyValue('--page-bg')
        .trim();

      if (color !== current) {
        document.documentElement.style.setProperty('--page-bg', color);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty('--page-bg');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
