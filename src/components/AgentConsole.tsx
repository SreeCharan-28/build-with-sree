"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Line = { kind: "user" | "plan" | "tool" | "ok" | "out"; text: string };

const SCRIPT: Line[] = [
  { kind: "user", text: "Build a responsive habit-tracker app with auth." },
  { kind: "plan", text: "Planning → 4 steps: schema, API, UI, tests" },
  { kind: "tool", text: "scaffold_project(next, typescript, tailwind)" },
  { kind: "tool", text: "write_files(src/app/**, 14 files)" },
  { kind: "tool", text: "run_tests(playwright, e2e)" },
  { kind: "ok", text: "18 passed · 0 failed · 4.2s" },
  { kind: "tool", text: "lighthouse(audit)" },
  { kind: "ok", text: "perf 98 · a11y 100 · seo 100" },
  { kind: "out", text: "Shipped. Preview ready at localhost:3000" },
];

const style: Record<Line["kind"], { prefix: string; cls: string }> = {
  user: { prefix: "you", cls: "text-fg" },
  plan: { prefix: "Me", cls: "text-accent-2" },
  tool: { prefix: "tool", cls: "text-muted" },
  ok: { prefix: "  ✓", cls: "text-accent" },
  out: { prefix: "done", cls: "text-fg" },
};

export default function AgentConsole() {
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = setTimeout(() => setCount(SCRIPT.length), 0);
      return () => clearTimeout(t);
    }
    if (count < SCRIPT.length) {
      const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 700 : 650 + Math.random() * 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCount(0);
      setCycle((c) => c + 1);
    }, 4200);
    return () => clearTimeout(t);
  }, [count]);

  const running = count < SCRIPT.length;
  const progress = Math.round((count / SCRIPT.length) * 100);

  return (
    <div className="brackets relative overflow-hidden rounded-xl border border-line bg-bg-elev/80 shadow-[0_40px_120px_-40px_rgba(200,255,61,0.18)] backdrop-blur">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <span className="font-mono text-[11px] text-dim">agent://session-{String(cycle + 1).padStart(3, "0")}</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
          <span className="relative flex h-1.5 w-1.5">
            {running && <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />}
            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${running ? "bg-accent" : "bg-dim"}`} />
          </span>
          <span className={running ? "text-accent" : "text-dim"}>{running ? "running" : "idle"}</span>
        </span>
      </div>

      {/* Fixed heights per breakpoint fit the full script without layout jumps */}
      <div className="h-[400px] space-y-2.5 px-4 py-4 font-mono text-[12px] leading-relaxed sm:h-[320px] sm:text-[12.5px] lg:h-[370px] xl:h-[320px]">
        <AnimatePresence mode="popLayout">
          {SCRIPT.slice(0, count).map((line, i) => (
            <motion.div
              key={`${cycle}-${i}`}
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex gap-3"
            >
              <span className="w-10 shrink-0 text-right text-dim">{style[line.kind].prefix}</span>
              <span className={style[line.kind].cls}>
                {line.kind === "tool" && <span className="text-accent-2">→ </span>}
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {running && (
          <div className="flex gap-3">
            <span className="w-10 shrink-0" />
            <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-accent" />
          </div>
        )}
      </div>

      <div className="border-t border-line px-4 py-3">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-dim">
          <span>plan · build · verify · ship</span>
          <span className="text-muted">{progress}%</span>
        </div>
        <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-2 to-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
