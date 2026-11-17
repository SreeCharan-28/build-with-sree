"use client";

import { motion, useScroll, useSpring } from "motion/react";
import {
  ClipboardList,
  Code2,
  FlaskConical,
  Lightbulb,
  Network,
  Palette,
  RefreshCw,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { approach } from "@/content/profile";
import { SectionHeading } from "./ui";

// Same order as `approach` in profile.ts
const icons: LucideIcon[] = [Lightbulb, ClipboardList, Network, Palette, Code2, FlaskConical, Rocket, RefreshCw];
const ease = [0.16, 1, 0.3, 1] as const;

export default function Approach() {
  const ref = useRef<HTMLOListElement>(null);
  // The roadmap line "draws" itself as the visitor scrolls through the steps
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="approach" className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
        <SectionHeading
          label="Development Approach"
          title="End-to-end"
          accent="application delivery."
          kicker="From an initial idea to a working product — and beyond. I own every stage; tools and agents speed up the execution, while the planning, review and decisions stay with me."
        />

        <div className="relative mx-auto max-w-5xl">
          <ol ref={ref} className="relative space-y-8 md:space-y-2">
            {/* Track + animated fill: left edge on mobile, centre on desktop */}
            <div className="absolute bottom-6 left-5 top-6 w-px bg-line md:left-1/2" />
            <motion.div
              style={{ scaleY: progress }}
              className="absolute bottom-6 left-5 top-6 w-px origin-top bg-gradient-to-b from-accent-2 via-accent to-accent shadow-[0_0_12px_rgba(200,255,61,0.6)] md:left-1/2"
            />

            {approach.map((a, i) => {
              const Icon = icons[i];
              const onLeft = i % 2 === 0;
              const last = i === approach.length - 1;
              return (
                <li key={a.step} className="relative grid pl-16 md:grid-cols-2 md:gap-20 md:pl-0">
                  {/* Milestone node on the line */}
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -30% 0px" }}
                    transition={{ duration: 0.5, ease }}
                    className={`absolute left-5 top-5 z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border md:left-1/2 ${
                      last
                        ? "border-accent bg-accent text-accent-ink shadow-[0_0_30px_-4px_rgba(200,255,61,0.7)]"
                        : "border-accent/50 bg-bg text-accent shadow-[0_0_24px_-8px_rgba(200,255,61,0.6)]"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </motion.div>

                  {/* Step card, alternating sides on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: onLeft ? -28 : 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease }}
                    className={onLeft ? "md:col-start-1 md:text-right" : "md:col-start-2"}
                  >
                    <div
                      className={`group relative rounded-2xl border bg-card p-6 transition-colors duration-300 hover:border-accent/40 ${
                        last ? "border-accent/40" : "border-line"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-dim ${
                          onLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                        <span className="h-px w-6 bg-line-strong" />
                        <span>{last ? "Ongoing" : `Stage ${i + 1} of ${approach.length}`}</span>
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-fg">{a.step}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{a.body}</p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>

          {/* End cap: improvements feed back into the next idea */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mt-10 flex md:justify-center"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-bg-elev/60 px-4 py-2 font-mono text-[11.5px] text-muted">
              <RefreshCw className="h-3.5 w-3.5 text-accent" />
              Improvements feed the next idea — the cycle continues
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
