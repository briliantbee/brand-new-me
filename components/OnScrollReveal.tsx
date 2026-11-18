'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useOnScrollReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const { threshold = 0.35, rootMargin = '0px' } = options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

export function OnScrollReveal({
  children,
  className = '',
  style,
  threshold = 0.35,
  rootMargin = '0px',
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}) {
  const { ref, inView } = useOnScrollReveal<HTMLDivElement>({ threshold, rootMargin });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'translate-x-0 translate-y-0 opacity-100' : '-translate-x-4 translate-y-4 opacity-0'} ${className}`}
      style={{ ...style, transitionDelay: inView ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}

export function ScrollRevealText({
  children,
  className = '',
  startOpacity = 0.12,
  endOpacity = 1,
  stagger = 0.06
}: {
  children: ReactNode;
  className?: string;
  startOpacity?: number;
  endOpacity?: number;
  stagger?: number;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);

  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;
      const wordEls = Array.from(root.querySelectorAll<HTMLElement>('.sr-word'));
      if (wordEls.length === 0) return;

      gsap.set(wordEls, { opacity: startOpacity });

      ScrollTrigger.create({
        trigger: root,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          wordEls.forEach((el, i) => {
            const local = Math.min(1, Math.max(0, p * (wordEls.length + stagger * 10) - i));
            const opacity = startOpacity + (endOpacity - startOpacity) * local;
            el.style.opacity = String(opacity);
          });
        }
      });
    },
    { dependencies: [text, startOpacity, endOpacity, stagger] }
  );

  return (
    <span
      ref={containerRef}
      aria-label={text || undefined}
      className={`block ${className}`}
    >
      <span aria-hidden className="block">
        {words.map((word, i) => (
          <span key={i}>
            <span className="sr-word inline-block will-change-[opacity]">{word}</span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    </span>
  );
}
