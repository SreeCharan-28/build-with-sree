"use client";

import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { Reveal, SectionLabel } from "./ui";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const channels = [
    { label: "LinkedIn", handle: "in/sreecharan28", href: profile.links.linkedin, Icon: LinkedInIcon },
    { label: "Email", handle: "Send a message", href: `mailto:${profile.email}`, Icon: Mail },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div className="grid-bg absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black,transparent)]" />
      <div className="absolute bottom-[-30%] left-1/2 -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-40">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-5xl text-[clamp(2.6rem,7.5vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
            <span className="text-gradient">Have an idea worth</span>{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">building?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m open to collaborations, new projects and conversations about building better software. Let&apos;s
            turn your idea into something real.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[15px] font-semibold text-accent-ink transition-all hover:shadow-[0_0_50px_-8px_rgba(200,255,61,0.7)]"
          >
            Let&apos;s connect
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            onClick={copy}
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-6 py-4 font-mono text-[13px] text-fg transition-colors hover:border-fg/40 hover:bg-white/[0.03]"
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4 text-muted" />}
            {copied ? "Copied to clipboard" : "Copy email"}
          </button>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {channels.map(({ label, handle, href, Icon }, i) => (
            <Reveal key={label} delay={0.05 * i} className="bg-bg">
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-card sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-line-strong text-fg transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">{label}</div>
                    <div className="mt-1 text-[15px] text-fg">{handle}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
