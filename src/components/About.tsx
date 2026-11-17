import { Check } from "lucide-react";
import { about, developerProfile } from "@/content/profile";
import { Reveal, SectionHeading } from "./ui";

const entries = Object.entries(developerProfile);

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
      <SectionHeading
        label="About"
        title="Ideas in, products out —"
        accent="tested and shipped."
      />

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <div className="brackets relative overflow-hidden rounded-2xl border border-line bg-card p-7">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">profile.json</div>
            <pre className="mt-5 whitespace-pre-wrap font-mono text-[12.5px] leading-[1.9] text-muted">
              <code>
                <span className="text-dim">{"{"}</span>
                {entries.map(([key, value], i) => {
                  const cls = key === "focus" || key === "status" ? "text-accent" : "text-fg";
                  const comma = i < entries.length - 1 ? "," : "";
                  return (
                    <span key={key}>
                      {"\n"}  <span className="text-accent-2">&quot;{key}&quot;</span>:{" "}
                      {Array.isArray(value) ? (
                        <>
                          [
                          {value.map((v, j) => (
                            <span key={v}>
                              {"\n"}    <span className={cls}>&quot;{v}&quot;</span>
                              {j < value.length - 1 ? "," : ""}
                            </span>
                          ))}
                          {"\n"}  ]{comma}
                        </>
                      ) : (
                        <>
                          <span className={cls}>&quot;{value}&quot;</span>
                          {comma}
                        </>
                      )}
                    </span>
                  );
                })}
                {"\n"}<span className="text-dim">{"}"}</span>
              </code>
            </pre>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {about.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-card/60 p-4">
                <div className="text-3xl font-semibold tracking-tight text-fg">{s.value}</div>
                <div className="mt-1.5 text-[11.5px] leading-snug text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="md:col-span-7 md:pl-6">
          <Reveal>
            <p className="text-2xl font-medium leading-snug tracking-tight text-fg sm:text-[28px]">{about.lead}</p>
          </Reveal>
          <div className="mt-10 space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-[16.5px] leading-[1.75] text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {about.principles.map((pr) => (
                <li key={pr.title} className="flex gap-3 bg-card p-5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <div className="text-[15px] font-medium text-fg">{pr.title}</div>
                    <div className="mt-1 text-[13.5px] leading-snug text-muted">{pr.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
