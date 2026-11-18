'use client';

import { OnScrollReveal } from "@/components/OnScrollReveal";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-32 text-center">
      <OnScrollReveal>
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">
          Contact
        </h2>
        <p className="mb-8 font-sans text-lg leading-relaxed text-foreground/70">
          Have a project in mind or just want to say hi? Reach out — I&apos;m
          always up for a conversation.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="mailto:abisam@example.com"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get in touch
          </a>
        </div>
      </OnScrollReveal>
    </section>
  );
}
