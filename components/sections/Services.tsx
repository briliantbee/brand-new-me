'use client';

import { useCallback, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const services = [
  {
    eyebrow: 'DIGITAL',
    title: 'PRODUCT',
    description:
      'Building fast, functional websites and custom applications tailored to solve your business needs.',
    items: ['Custom Websites', 'Business Apps', 'Digital Solutions'],
    number: '01',
    color: '#eadfca',
  },
  {
    eyebrow: 'SMART',
    title: 'SYSTEMS',
    description:
      'Connecting your tools and organizing data smoothly so your daily operations run effortlessly.',
    items: ['Workflow Automation', 'Data Management', 'Secure Systems'],
    number: '02',
    color: '#dbe4e9',
  },
  {
    eyebrow: 'VISUAL',
    title: 'DESIGN',
    description:
      'Crafting clean, intuitive, and responsive interfaces that feel great on any device.',
    items: ['Interface Design', 'Mobile Friendly', 'User-Focused'],
    number: '03',
    color: '#d9ded1',
  },
  {
    eyebrow: 'GROWTH',
    title: '& CARE',
    description:
      'Keeping your digital products reliable, secure, and continuously updated as you grow.',
    items: ['Regular Updates', 'Bug Fixes', 'Ongoing Care'],
    number: '04',
    color: '#e4d8d2',
  },
];

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const wordRefs = useRef<(HTMLElement | null)[]>([]);
  const indexRef = useRef<HTMLSpanElement>(null);

  const setCardRef = useCallback(
    (i: number) => (el: HTMLElement | null) => { cardRefs.current[i] = el; }, []
  );
  const setWordRef = useCallback(
    (i: number) => (el: HTMLElement | null) => { wordRefs.current[i] = el; }, []
  );

  useGSAP(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const runUpdate = (progress: number) => {
      const scene = progress * (services.length - 1);
      stage.style.setProperty('--progress', progress.toFixed(4));

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const delta = index - scene;
        const capped = clamp(delta, -1.4, 1.65);
        const y = capped < 0 ? capped * 160 : capped * 127;
        const rotation = capped < 0 ? capped * 7 : capped * 8.5;
        const scale = capped < 0 ? 1 - Math.min(Math.abs(capped), 1) * 0.085 : 1 - Math.min(capped, 1) * 0.055;
        const opacity =
          delta < -0.82 ? clamp((delta + 1.16) / 0.34, 0, 1)
          : delta > 1.16 ? clamp((1.55 - delta) / 0.39, 0, 1)
          : 1;
        card.style.transform = `translate3d(-50%, calc(-50% + ${y}%), 0) rotate(${rotation}deg) scale(${scale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = String(50 - Math.round(Math.abs(delta) * 10) + index);
      });

      wordRefs.current.forEach((word, index) => {
        if (!word) return;
        const dir = index === 1 ? 1 : -1;
        const tx = scene * (4.5 + index * 1.4) * dir;
        const ty = -scene * (5 + index * 3);
        word.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });

      if (indexRef.current) {
        indexRef.current.textContent = String(Math.round(scene) + 1).padStart(2, '0');
      }
    };

    runUpdate(0);

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => runUpdate(self.progress),
    });

    return () => st.kill();
  });

  return (
    <section
      aria-label="Services"
      id="services"
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'var(--background)',
      }}
    >
      {/* 430vh scroll track containing the sticky card showcase */}
      <div ref={trackRef} style={{ position: 'relative', height: '430vh' }}>
        <div
          ref={stageRef}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 3,
            display: 'grid',
            width: '100%',
            height: '100vh',
            placeItems: 'center',
            overflow: 'hidden',
            backgroundColor: 'var(--background)',
          }}
        >
          {/* Showcase container — uses container queries for responsive sizing */}
          <div
            style={{
              containerType: 'size',
              position: 'relative',
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
              backgroundColor: 'var(--background)',
              isolation: 'isolate',
            }}
          >
            {/* Background typography */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                overflow: 'hidden',
                color: '#080808',
                fontWeight: 950,
                letterSpacing: '-0.085em',
                lineHeight: 0.69,
                pointerEvents: 'none',
                opacity: 0.58,
                userSelect: 'none',
              }}
            >
              {(['WHAT', 'I', 'DO'] as const).map((word, i) => (
                <span
                  key={i}
                  ref={setWordRef(i)}
                  className={`svc-word svc-word-${i + 1}`}
                  style={{
                    position: 'absolute',
                    display: 'block',
                    fontSize: 'clamp(28px, 6cqw, 90px)',
                    whiteSpace: 'nowrap',
                    willChange: 'transform',
                    ...(i === 0 && { top: '4%', left: '2%' }),
                    ...(i === 1 && { top: '38%', right: '2%' }),
                    ...(i === 2 && { top: '68%', left: '22%' }),
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Card stack */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, perspective: 1100 }}>
              {services.map((svc, i) => (
                <article
                  key={i}
                  ref={setCardRef(i)}
                  className="svc-card"
                  aria-label={`${svc.number} — ${svc.eyebrow} ${svc.title}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    display: 'flex',
                    width: 'min(35.8cqw, 57cqh)',
                    aspectRatio: '1.03 / 1',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 'clamp(15px, 2.2cqw, 34px)',
                    overflow: 'hidden',
                    color: '#0b0c0c',
                    boxShadow: '0 10px 28px rgba(25,30,33,0.09), 0 2px 8px rgba(25,30,33,0.055)',
                    opacity: i === 0 ? 1 : 0,
                    transform:
                      i === 0
                        ? 'translate3d(-50%, -50%, 0)'
                        : 'translate3d(-50%, 125%, 0) rotate(8deg) scale(0.95)',
                    transformOrigin: '50% 50%',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    backgroundColor: svc.color,
                  }}
                >
                  <header>
                    <h2 className="svc-title"
                      style={{
                        margin: 0,
                        fontSize: 'clamp(25px, 4.15cqw, 61px)',
                        fontWeight: 950,
                        letterSpacing: '-0.075em',
                        lineHeight: 0.78,
                        textTransform: 'uppercase',
                      }}
                    >
                      <span style={{ display: 'block' }}>{svc.eyebrow}</span>
                      <span style={{ display: 'block' }}>{svc.title}</span>
                    </h2>
                    <p className="svc-desc"
                      style={{
                        width: '80%',
                        margin: 'clamp(8px, 1.25cqw, 18px) 0 0',
                        fontSize: 'clamp(7px, 0.97cqw, 14px)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.08,
                      }}
                    >
                      {svc.description}
                    </p>
                  </header>
                  <footer
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      gap: 20,
                    }}
                  >
                    <ul
                      className="svc-items"
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        fontSize: 'clamp(8px, 1.1cqw, 14px)',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.2,
                        color: 'rgba(11,12,12,0.55)',
                      }}
                    >
                      {svc.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <span className="svc-num"
                      style={{
                        display: 'block',
                        fontSize: 'clamp(31px, 4.8cqw, 70px)',
                        fontWeight: 800,
                        letterSpacing: '-0.075em',
                        lineHeight: 0.75,
                      }}
                    >
                      {svc.number}
                    </span>
                  </footer>
                </article>
              ))}
            </div>

            {/* Red side label */}
            {/* <div
              aria-hidden
              style={{
                position: 'absolute',
                zIndex: 5,
                top: '42%',
                right: 0,
                display: 'flex',
                width: 'clamp(19px, 2.6cqw, 38px)',
                height: 'clamp(60px, 10.4cqh, 94px)',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
                padding: '6px 3px',
                background: '#ed2d23',
                color: '#fff',
              }}
            >
              <strong style={{ fontSize: 'clamp(8px, 1.1cqw, 15px)', lineHeight: 1 }}>W.</strong>
              <span style={{ fontSize: 'clamp(4px, 0.45cqw, 7px)', fontWeight: 700, lineHeight: 1, whiteSpace: 'nowrap', writingMode: 'vertical-rl' }}>
                Made for motion
              </span>
            </div> */}

            {/* Progress indicator */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                zIndex: 4,
                right: 'clamp(18px, 2cqw, 31px)',
                bottom: 'clamp(16px, 2.2cqh, 25px)',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 'clamp(7px, 0.72cqw, 11px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
              }}
            >
              <span ref={indexRef}>01</span>
              <span
                style={{
                  position: 'relative',
                  display: 'block',
                  width: 'clamp(20px, 3.6cqw, 52px)',
                  height: 1,
                  overflow: 'hidden',
                  background: 'rgba(0,0,0,0.2)',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#0b0c0c',
                    display: 'block',
                    transform: 'scaleX(var(--progress, 0))',
                    transformOrigin: 'left',
                  }}
                />
              </span>
              <span>04</span>
            </div>
          </div>

          <style>{`
          @media (max-width: 700px) {
            .svc-word { font-size: 16cqw !important; }
            .svc-word-1 { top: 8% !important; left: -4% !important; }
            .svc-word-2 { top: 40% !important; right: -2% !important; left: auto !important; }
            .svc-word-3 { top: 66% !important; left: 5% !important; }
            .svc-card {
              width: min(73cqw, 49cqh) !important;
              padding: clamp(17px, 5cqw, 25px) !important;
            }
            .svc-title { font-size: clamp(27px, 9cqw, 45px) !important; }
            .svc-desc { font-size: clamp(8px, 2.2cqw, 11px) !important; }
            .svc-items { font-size: clamp(8px, 2.2cqw, 11px) !important; }
            .svc-num { font-size: clamp(34px, 10cqw, 50px) !important; }
          }
          `}</style>
        </div>
      </div>
    </section>
  );
}
