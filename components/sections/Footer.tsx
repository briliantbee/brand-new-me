'use client';

import { Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ---------- EDIT THESE ---------- */
const BIG_NAME = 'ABISAM'; // giant text at the bottom
const FULL_NAME = 'Abisam Hazim'; // copyright line
const EMAIL = 'abisamhazim04@gmail.com'; // <-- replace with your real email
const LOCATION = 'Indonesia';
const YEAR = new Date().getFullYear();

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About Me', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: 'https://github.com/abisamhazim' },
];
/* -------------------------------- */

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

/* Numbered row with hairline dividers (from the second reference) */
function LinkRow({
  index,
  label,
  href,
  external,
}: {
  index?: number;
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li className="border-b border-foreground/20 first:border-t">
      <a
        href={href}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="group flex items-center justify-between py-5 text-base font-medium"
      >
        <span className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-1">
          {index !== undefined && (
            <span className="text-sm font-normal text-foreground/50">
              {String(index).padStart(2, '0')}/
            </span>
          )}
          {label}
        </span>
        {external ? (
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : (
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </a>
    </li>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = nameRef.current;
      if (!wrap) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Same "pop up from behind the edge" motion as the CTA.
        // The cropped container works as the mask.
        gsap.from('.footer-char', {
          yPercent: 110,
          rotate: 6,
          duration: 1.1,
          ease: 'back.out(1.4)',
          stagger: 0.07,
          scrollTrigger: {
            trigger: wrap,
            start: 'top 98%',
            toggleActions: 'play none none reset',
          },
        });
      });

      return () => mm.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative overflow-hidden pt-28 font-sans text-foreground"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Top: contact (left) + links (right) */}
        <div className="grid gap-20 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          {/* Left: Stay Connected */}
          <div className="flex flex-col justify-center">
            <p className="text-[clamp(28px,4.2vw,64px)] font-medium leading-[1.05] tracking-tight text-foreground/50">
              Stay Wired
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-1 w-fit break-all text-[clamp(28px,4.2vw,64px)] font-medium leading-[1.05] tracking-tight underline decoration-[0.05em] underline-offset-[0.12em] transition-opacity duration-300 hover:opacity-60"
            >
              {EMAIL}
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="group mt-12 inline-flex w-fit items-center gap-4 rounded-full bg-foreground/10 py-1.5 pl-1.5 pr-7 text-base font-medium transition-colors duration-300 hover:bg-foreground/15"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-orange-500 text-white transition-transform duration-300 group-hover:-rotate-45">
                <ArrowRight className="h-5 w-5" />
              </span>
              Contact Now
            </a>
          </div>

          {/* Right: two link lists */}
          <div className="grid gap-12 sm:grid-cols-2">
            <nav aria-label="Quick links">
              <h3 className="mb-5 text-lg font-medium text-orange-500">
                Quick Links
              </h3>
              <ul>
                {quickLinks.map((l, i) => (
                  <LinkRow key={l.label} index={i + 1} label={l.label} href={l.href} />
                ))}
              </ul>
            </nav>

            <nav aria-label="Social links">
              <h3 className="mb-5 text-lg font-medium text-orange-500">
                Connect Me On
              </h3>
              <ul>
                {socials.map((s) => (
                  <LinkRow key={s.label} label={s.label} href={s.href} external />
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-foreground/20 pt-6 text-sm sm:flex-row">
          <p>Proudly Crafted in {LOCATION}</p>
          <p>
            &copy;{YEAR} {FULL_NAME}
          </p>
          <p>All Rights Reserved</p>
        </div>
      </div>

      {/* Giant name, cropped at the bottom edge */}
      <div
        ref={nameRef}
        aria-hidden
        className="relative mt-6 h-[17vw] w-full select-none overflow-hidden"
      >
        <h2 className="block whitespace-nowrap text-center text-[26vw] font-extrabold uppercase leading-[0.8] tracking-[-0.04em]">
          {Array.from(BIG_NAME).map((char, i) => (
            <Fragment key={i}>
              <span className="footer-char inline-block origin-bottom-left">
                {char}
              </span>
            </Fragment>
          ))}
        </h2>
      </div>
    </footer>
  );
}