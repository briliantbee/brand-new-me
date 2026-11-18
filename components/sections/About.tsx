'use client';

import { ScrollRevealText } from "@/components/OnScrollReveal";

export function About() {
  return (
    <section
      id="about"
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        zIndex: 1,
        display: 'grid',
        placeItems: 'center',
        background: 'var(--background)',
        boxSizing: 'border-box',
      }}
    >
      <div className="mx-auto w-full max-w-5xl px-6 text-center">
        {/*
          Font size is stepped down on small screens on purpose: the reveal
          only finishes if the whole paragraph fits comfortably in the
          viewport (roughly < 60% of its height). text-6xl on a phone made
          the paragraph ~11 lines tall, so the last words never got revealed.
        */}
        <ScrollRevealText
          className="text-3xl font-extrabold leading-[1.12] tracking-tight min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          startOpacity={0.15}
          endOpacity={1}
        >
          I combine design with engineering to build digital experiences that
          are clean, fast, and human.
        </ScrollRevealText>
      </div>
    </section>
  );
}