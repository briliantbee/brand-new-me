'use client';

import { Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Each line is a mask (overflow-hidden); the chars pop up from behind its bottom edge */
function SplitLine({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span className="-mb-[0.15em] block overflow-hidden pb-[0.15em]" aria-hidden>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, ci) => (
              <span key={ci} className="cta-char inline-block origin-bottom-left">
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  );
}

export function Cta() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reset',
          },
        });

        tl.from('.cta-char', {
          yPercent: 115,
          rotate: 10,
          duration: 1,
          ease: 'back.out(1.7)',
          stagger: 0.035,
        })
          .from('.cta-sub', { yPercent: 110, duration: 0.8, ease: 'power3.out' }, '-=0.55')
          .from(
            '.cta-btn',
            { scale: 0, duration: 0.7, ease: 'back.out(2)', clearProps: 'transform' },
            '-=0.45'
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    // Same wrapper as before: NO background and NO min-height,
    // so the site's own background color transition keeps working.
    <section id="cta" ref={sectionRef} className="relative overflow-hidden pt-32 pb-16">
      <div className="flex flex-col items-center gap-8 px-6 text-center">
        <h2
          aria-label="Great Things Begin Together."
          className="font-sans text-[clamp(52px,8.4vw,140px)] font-semibold leading-[0.95] tracking-[-0.03em] text-foreground"
        >
          <SplitLine text="Great Things" />
          <SplitLine text="Begin Together." />
        </h2>

        <p className="max-w-2xl overflow-hidden font-sans text-lg leading-relaxed text-foreground md:text-[28px] md:leading-snug">
          <span className="cta-sub block">
            From Creative Collaborations to New Opportunities,
            <br className="hidden md:block" /> Let&apos;s make Something
            Meaningful happen.
          </span>
        </p>

        <a
          href="#contact"
          className="cta-btn group inline-flex items-center gap-3 rounded-full bg-[var(--background)] px-8 py-4 font-sans text-base font-medium text-foreground transition-transform duration-300 hover:scale-105"
        >
          Let&apos;s Connect
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}