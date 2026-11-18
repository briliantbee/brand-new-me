'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import TechText from "@/components/TechText";
import CircularText from "@/components/CircularText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useIsMobile(bp = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [bp]);
  return isMobile;
}

// Floating pills resting on top of the name.
// Positioning is pure CSS (no JS state), so there is no layout jump on load:
//  - mobile: only 2 pills (left + right edge), same vertical "ridge" as desktop
//  - sm+:    all 4 pills in one horizontal band, as before
//
// Vertical position on mobile:
// TechText scales the name to fit the screen width, so the letter height grows
// and shrinks with the viewport width (cap height ≈ 0.187 × (100vw − 48px)).
// The text is vertically centered in a 480px block that starts at 12vh, so the
// top of the letters is:  12vh + 240px − 10px − cap/2.
// The pill sits just above that line:
//   12vh + 212px − 9.36vw
// Pills too high/low? Change the 212px (bigger = lower, smaller = higher).
const TAG_TOP = "top-[calc(12vh_+_212px_-_9.36vw)] sm:top-[32%]";

const FLOATING_TAGS = [
  { label: "WEB CRAFTER", rotate: -5, pos: "left-[6%] sm:left-[4%]" },
  { label: "FRONTEND ALCHEMIST", rotate: 7, pos: "hidden sm:block sm:left-[28%]" },
  { label: "PRODUCT THINKER", rotate: -4, pos: "hidden sm:block sm:left-[54%]" },
  { label: "DESIGN ALCHEMIST", rotate: 5, pos: "right-[6%] sm:right-auto sm:left-[78%]" },
] as const;

export function Hero() {
  const isMobile = useIsMobile();
  const heroText = isMobile ? "ABISAM" : "ABISAM HAZIM";
  const heroFontSize = isMobile ? 280 : 400;

  useGSAP(() => {
    const section = document.getElementById('hero');
    if (!section) return;

    // Floating intro tags: gravity fall (deterministic wobble + slight overshoot),
    // then a scrubbed drift on scroll. Rotations are stored on the element so the
    // final state never gets cleared.
    const tags = Array.from(section.querySelectorAll<HTMLElement>('.hero-float-tag'));
    if (tags.length) {
      const rest = tags.map((el) => el.dataset.rot0 as string);
      gsap.set(tags, { rotation: rest.map((r) => `${r}deg`) as unknown as string, y: 0, clearProps: 'willChange' });

      const tl = gsap.timeline({ delay: 0.6 });
      tags.forEach((el, i) => {
        const base = parseFloat(rest[i]);
        const dir = i % 2 ? 1 : -1;
        const start = 0.2 * i + 0.1;
        // fall: 96% down is gravity-fast (ease-in), the last 4% eases out for a
        // touch of landing
        tl.fromTo(
          el,
          { opacity: 0, y: -130, rotation: base - dir * 14 },
          { opacity: 1, rotation: base, ease: 'power2.in', duration: 0.45 },
          start
        );
        tl.to(el, { rotation: base + dir * 3, ease: 'power1.out', duration: 0.25 }, `+=0`);
        tl.to(el, { y: 8, ease: 'power2.in', duration: 0.32 }, `-=0.25`);
      });
    }
  });
  return (
    <section id="hero" className="relative h-dvh w-full overflow-visible text-foreground">
      {/* Layer 1: interactive TechText */}
      <div className="absolute inset-0 z-20 flex items-start justify-center px-6 pt-[12vh]">
        <div className="w-full" style={{ height: "480px", position: "relative" }}>
          <TechText
            text={heroText}
            fontWeight={700}
            fontSize={heroFontSize}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            fontFamily="Geist"
            letterSpacing={-0.02}
            accentColor="var(--primary)"
            reach={200}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1.5}
            speed={1}
            bounce={0.4}
            selection
            labels
            color="var(--foreground)"
            align="center"
            draggable
            sweep
          />
        </div>
      </div>

      {/* Layer 1.5: circular text — bottom-right on every screen size.
          Smaller on mobile, and the intro copy on the left is narrower there
          so the two never collide. */}
      <div className="pointer-events-none absolute bottom-[5%] right-5 z-20 sm:bottom-[10%] sm:right-[18%]">
        <div className="pointer-events-auto group">
          <CircularText
            text="NEXT*LISTEN*TO*THE*NEXT*PROJECT*"
            onHover="speedUp"
            direction="clockwise"
            spinDuration={14}
            size={isMobile ? 96 : 140}
            fontSize={isMobile ? 9 : 13}
            fontWeight={900}
            startAngle={-90}
            fill
            ring={false}
            color=""
            letterSpacing={isMobile ? 1.4 : 2}
            draggable
            className="text-foreground/60 transition-colors duration-300 group-hover:text-primary"
          >
            <div className="flex h-7 w-7 items-center justify-center sm:h-9 sm:w-9">
              <span className="text-sm tracking-tighter text-foreground/50 transition-colors duration-300 group-hover:text-primary/80 sm:text-base">▶▶</span>
            </div>
          </CircularText>
        </div>
      </div>

      {/* Layer 2: floating identity pills — fall in on load, drift on scroll */}
      {FLOATING_TAGS.map((tag) => (
        <div
          key={tag.label}
          data-rot0={tag.rotate}
          className={`hero-float-tag absolute z-30 rounded-full border border-foreground/30 bg-background px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-foreground/80 sm:px-3.5 sm:py-1.5 sm:text-[10px] ${TAG_TOP} ${tag.pos}`}
        >
          {tag.label}
        </div>
      ))}

      {/* Layer 3: photo centerpiece, in front of the text */}
      <div className="pointer-events-none absolute left-1/2 top-[50%] z-30 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/gwehj.png"
          alt="Abisam"
          width={420}
          height={480}
          className="h-auto w-[280px] sm:w-[400px] lg:w-[480px]"
          style={{
            maxHeight: "74vh",
            objectFit: "cover",
            objectPosition: "center 30%",
            maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)"
          }}
          priority
        />
      </div>

      {/* Layer 4: intro copy, bottom-left — aligned with TechText padding (px-6) */}
      <div className="pointer-events-none absolute bottom-[5%] left-6 z-30 sm:bottom-[12%] sm:left-24">
        <div className="max-w-[165px] sm:max-w-[260px]">
          <p className="font-mono text-[9px] tracking-[0.18em] text-foreground/40 uppercase sm:text-[10px]">
            Hello world i'am
          </p>
          <h2 className="mt-1.5 font-sans text-2xl font-extrabold tracking-tight sm:mt-2 sm:text-3xl">
            Abisam
          </h2>
          <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-foreground/60 sm:mt-2 sm:text-[15px]">
            I build clean, fast interfaces and ship things that people actually use.
          </p>
        </div>
      </div>

      {/* Bottom mist: bleeds out of the hero into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-48 z-10 h-64 bg-gradient-to-b from-transparent via-background/60 to-transparent"
      />
    </section>
  );
}