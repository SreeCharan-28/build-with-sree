"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
      <span className="h-px w-8 bg-accent" />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({
  label,
  title,
  accent,
  kicker,
}: {
  label: string;
  title: string;
  accent?: string;
  kicker?: string;
}) {
  return (
    <Reveal className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl md:text-6xl">
          {title}{" "}
          {accent && <span className="font-serif font-normal italic tracking-[-0.01em] text-accent">{accent}</span>}
        </h2>
      </div>
      {kicker && (
        <p className="max-w-md text-base leading-relaxed text-muted md:col-span-5 md:justify-self-end">{kicker}</p>
      )}
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-muted">
      {children}
    </span>
  );
}
