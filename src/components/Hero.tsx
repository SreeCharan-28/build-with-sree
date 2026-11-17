"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import AgentConsole from "./AgentConsole";
import { profile, stack } from "@/content/profile";

const ease = [0.16, 1, 0.3, 1] as const;

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roleAlt.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="text-fg"
        >
          {profile.roleAlt[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(200,255,61,0.07), transparent 70%)`;

  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative isolate overflow-hidden pt-28 sm:pt-32"
    >
      {/* Backdrop */}
      <div className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black_30%,transparent_100%)]" />
      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} />
      <div className="absolute left-1/2 top-[-20%] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent-2/15 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] py-1.5 pl-2 pr-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.role}
            <span className="hidden sm:inline">· {profile.location}</span>
          </motion.div>

          <h1 className="mt-8 text-[clamp(3.2rem,10vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
            {["Sree", "Charan"].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
                  className="text-gradient block"
                >
                  {w}
                  {i === 1 && <span className="text-accent">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="mt-7 max-w-xl text-2xl leading-tight tracking-tight text-muted sm:text-[28px]"
          >
            I build <span className="font-serif text-[1.15em] italic text-fg">software</span> — from first idea to
            shipped product.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 flex items-center gap-3 font-mono text-[13px] text-dim"
          >
            <span className="text-accent">$</span> role <span className="text-dim">=</span> <RotatingRole />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition-all hover:shadow-[0_0_40px_-6px_rgba(200,255,61,0.6)]"
            >
              View my work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#build"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-fg/40 hover:bg-white/[0.03]"
            >
              What I build
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
          className="lg:col-span-5 lg:pt-6 [perspective:1200px]"
        >
          <AgentConsole />
        </motion.div>
      </div>

      {/* Stack marquee */}
      <div className="relative border-y border-line bg-bg-elev/40 py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-12">
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.18em] text-muted">
              {s}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
