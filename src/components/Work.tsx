import { ArrowUpRight, Plus } from "lucide-react";
import { projects, type Project } from "@/content/profile";
import { Reveal, SectionHeading, Tag } from "./ui";

const statusStyle: Record<Project["status"], { label: string; dot: string; text: string }> = {
  live: { label: "Live", dot: "bg-accent", text: "text-accent" },
  building: { label: "In progress", dot: "bg-accent-2", text: "text-accent-2" },
  planned: { label: "Planned", dot: "bg-dim", text: "text-muted" },
};

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const s = statusStyle[p.status];
  const Wrapper = p.href ? "a" : "div";
  return (
    <Wrapper
      {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-500 ${
        p.href ? "cursor-pointer hover:-translate-y-1 hover:border-line-strong" : ""
      }`}
    >
      {/* Preview area */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
        <div className="grid-bg absolute inset-0 opacity-60 [background-size:28px_28px]" />
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            p.status === "live"
              ? "bg-[radial-gradient(circle_at_30%_20%,rgba(200,255,61,0.18),transparent_60%)]"
              : "bg-[radial-gradient(circle_at_70%_30%,rgba(124,92,255,0.18),transparent_60%)]"
          }`}
        />
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-mono text-[64px] font-bold leading-none tracking-tighter text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.1] sm:text-[80px]">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur">
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
          <span className={s.text}>{s.label}</span>
        </div>
        {p.href && (
          <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-fg text-bg opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">{p.category}</div>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-fg">{p.title}</h3>
        <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default function Work() {
  return (
    <section id="projects" className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
        <SectionHeading
          label="Projects"
          title="Selected work —"
          accent="loading next."
          kicker="A living index of what I'm building. New web, mobile and agentic engineering projects land here as they ship."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={0.06 * i}>
              <ProjectCard p={p} i={i} />
            </Reveal>
          ))}

          {/* Reserved slot */}
          <Reveal delay={0.06 * projects.length}>
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong p-8 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-line-strong text-muted">
                <Plus className="h-5 w-5" />
              </div>
              <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Slot reserved</div>
              <p className="mt-2 max-w-[220px] text-[14px] leading-relaxed text-muted">
                Your next idea could live here. Let&apos;s build it together.
              </p>
              <a
                href="#contact"
                className="mt-5 text-[13px] font-medium text-fg underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
              >
                Start a conversation
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
