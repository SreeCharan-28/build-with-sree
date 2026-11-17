import { Cloud, Code2, Database, GitBranch, Monitor, PenTool, Server, Terminal, type LucideIcon } from "lucide-react";
import { toolkit } from "@/content/profile";
import { Reveal, SectionHeading } from "./ui";

// Same order as `toolkit` in profile.ts
const icons: LucideIcon[] = [Monitor, Server, Code2, Database, PenTool, Terminal, GitBranch, Cloud];

export default function Toolkit() {
  return (
    <section id="toolkit" className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
        <SectionHeading
          label="Toolkit"
          title="Modern development"
          accent="toolkit."
          kicker="The tools and technologies I use to design, build and ship applications."
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((t, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={t.group} delay={0.04 * i} className="bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong bg-white/[0.03] text-accent">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="font-mono text-[10.5px] uppercase leading-snug tracking-[0.16em] text-muted">
                    {t.group}
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {t.items.map((item) => (
                    <li key={item} className="text-[15px] text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
