import { Check, Globe, LayoutDashboard, Smartphone, type LucideIcon } from "lucide-react";
import { capabilities } from "@/content/profile";
import { Reveal, SectionHeading } from "./ui";

// Same order as `capabilities` in profile.ts
const icons: LucideIcon[] = [Globe, LayoutDashboard, Smartphone];

export default function Capabilities() {
  return (
    <section id="build" className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
        <SectionHeading
          label="What I Build"
          title="Applications that"
          accent="work in the real world."
          kicker="Three kinds of products, each taken from idea to a working, production-ready application."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {capabilities.map((c, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={c.code} delay={0.06 * i}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex items-start justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-lg border border-line-strong bg-white/[0.03] text-fg transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-accent-ink">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] text-dim">{c.code}</span>
                  </div>
                  <h3 className="mt-10 text-2xl font-semibold tracking-[-0.025em] text-fg">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.body}</p>
                  <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[14px] text-fg">
                        <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
