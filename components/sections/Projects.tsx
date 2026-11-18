'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OnScrollReveal } from '@/components/OnScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'BangbaraPos',
    description:
      'A real-client ordering system for UMKM, built with a team to streamline the way small businesses take and manage orders.',
    href: '#',
    image: '/projects/BangbaraPos-project.webp',
  },
  // KataKita — hidden for now
  // {
  //   title: 'KataKita',
  //   description:
  //     'An Indonesian dictionary application made with Flutter and Firebase.',
  //   href: '#',
  //   image: '/projects/kataKita.webp',
  // },
  {
    title: 'KosKita',
    description:
      'A SaaS platform for managing kos properties and tenants — a real product that helps owners handle occupancy, payments, and communication in one place.',
    href: '#',
    image: '/projects/koskita.png',
  },
  {
    title: 'Savora',
    description:
      'A personal finance app I built to help users manage their income, expenses, and financial goals through an interactive interface.',
    href: '#',
    image: '/projects/savora-mock.webp',
  },
];

// Per-card variation: tilt, vertical stagger (desktop only), corner radius
const layouts = [
  { rotate: -4, offset: 'lg:mt-0', radius: 'rounded-[2.75rem]' },
  { rotate: 3, offset: 'lg:-mt-12', radius: 'rounded-[3.25rem]' },
  { rotate: -2, offset: 'lg:mt-8', radius: 'rounded-[2.5rem]' },
];

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const text = textRef.current;
      if (!track || !text) return;

      let st: ScrollTrigger | null = null;
      let tweens: gsap.core.Tween[] = [];
      let resizeObserver: ResizeObserver;

      const rebuild = () => {
        tweens.forEach((t) => t.kill());
        tweens = [];
        st?.kill();
        st = null;

        const parentW = track.clientWidth;

        tweens.push(
          gsap.fromTo(
            text,
            { x: parentW },
            {
              x: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: track,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2,
              },
            }
          )
        );
        st = ScrollTrigger.getAll().pop() ?? null;
      };

      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
      fontsReady.then(rebuild).catch(() => rebuild());

      resizeObserver = new ResizeObserver(rebuild);
      resizeObserver.observe(track);

      return () => {
        tweens.forEach((t) => t.kill());
        st?.kill();
        resizeObserver.disconnect();
      };
    },
    { dependencies: [] }
  );

  return (
    <section
      id="projects"
      // overflow-x-clip: tilted cards / giant text never cause horizontal scroll
      // zIndex: keeps hero text from showing through the cards
      className="overflow-x-clip pb-24"
      style={{ position: 'relative', zIndex: 20 }}
    >
      {/* Text strip: tall track, sticky text inside — no overlap with grid below */}
      <div ref={trackRef} style={{ position: 'relative', height: '150vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '20vh',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <span
            ref={textRef}
            aria-hidden
            className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-sans font-light tracking-tight text-foreground text-[clamp(60px,8vw,120px)]"
          >
            Under the Hood
          </span>
        </div>
      </div>

      {/* Grid: tilted image cards, big numbers overlapping image and text */}
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <ul className="grid grid-cols-1 gap-x-12 gap-y-28 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const l = layouts[i % layouts.length];
            return (
              <li key={project.title} className={l.offset}>
                <OnScrollReveal delay={i * 120}>
                  <a href={project.href} className="group block">
                    <div className="relative">
                      {/* Tilted image — overflow-hidden lives only here */}
                      <div
                        className={`aspect-[4/5] w-full overflow-hidden bg-muted transition-transform duration-500 group-hover:!rotate-0 ${l.radius}`}
                        style={{ transform: `rotate(${l.rotate}deg)` }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Number sits OUTSIDE the clipped box so it can spill over the edge */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-20 -left-3 z-10 select-none font-sans text-[200px] font-extrabold leading-none tracking-[-0.06em] text-foreground sm:text-[240px]"
                      >
                        {i + 1}
                      </span>
                    </div>

                    {/* mt-24 leaves room for the number that spills below the image */}
                    <p className="mt-24 max-w-[16rem] font-sans text-[13px] leading-relaxed text-foreground/70 sm:ml-auto">
                      {project.description}
                    </p>
                  </a>
                </OnScrollReveal>
              </li>
            );
          })}
        </ul>

        {/* View All Projects button */}
        <div className="mt-16 flex justify-center">
          <OnScrollReveal>
            <a
              href="https://github.com/abisamhazim?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 font-sans text-base font-medium text-white shadow-lg shadow-orange-500/25 transition-transform duration-300 hover:scale-105 hover:shadow-orange-500/40"
            >
              View All Projects
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
          </OnScrollReveal>
        </div>
      </div>

      {/* Full-bleed "PROJECTS": solid, huge, cropped left and right */}
      <div
        aria-hidden
        className="relative mt-24 w-full select-none overflow-hidden"
      >
        <h2 className="block whitespace-nowrap text-center font-sans text-[20vw] font-extrabold uppercase leading-[0.85] tracking-[-0.05em] text-foreground">
          Pr
          <span className="relative inline-block">
            o
            {/* Star inside the counter of the "O" — tweak top / w to center it */}
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="absolute left-1/2 top-[50%] w-[0.2em] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] text-foreground"
            >
              <polygon
                points="12,2 15,9 22,9.5 16.5,14.5 18.5,22 12,18 5.5,22 7.5,14.5 2,9.5 9,9"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          jects
        </h2>
      </div>
    </section>
  );
}