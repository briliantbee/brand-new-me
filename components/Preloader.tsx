'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  'Hello World',
  'Let Me In',
  'This Is Me',
  'Abisam',
  'Software Dev',
];

const INTERVAL_MS = 350;

function WordCycler({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= words.length) {
          clearInterval(id);
          setDone(true);
          setTimeout(onComplete, 400);
          return prev;
        }
        return next;
      });
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [done, onComplete]);

  const variants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  return (
    <div className="relative flex h-16 w-72 items-center justify-center">
      {done ? (
        <div className="flex items-center gap-3 text-2xl font-medium text-foreground sm:text-3xl">
          <span className="h-2 w-2 rounded-full bg-foreground" />
          {words[index]}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            className="absolute flex items-center gap-3 text-2xl font-medium text-foreground sm:text-3xl"
            initial={variants.hidden}
            animate={variants.visible}
            exit={variants.exit}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <span className="h-2 w-2 rounded-full bg-foreground" />
            {words[index]}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { zIndex: 9999, y: 0 });
    }
  }, []);

  const handleComplete = () => {
    const el = overlayRef.current;
    if (!el) return;
    gsap.to(el, {
      yPercent: -110,
      duration: 0.9,
      ease: 'power2.inOut',
      onComplete: () => setRemoved(true),
    });
  };

  if (removed) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center bg-[var(--background)]"
    >
      <WordCycler onComplete={handleComplete} />
    </div>
  );
}
