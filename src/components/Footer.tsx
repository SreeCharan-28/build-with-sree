import { profile } from "@/content/profile";

const links = [
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div
          aria-hidden
          className="select-none whitespace-nowrap text-center text-[clamp(2.5rem,12.4vw,13rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)]"
        >
          SREE CHARAN
        </div>
        <div className="flex flex-col items-center justify-between gap-5 border-t border-line py-8 font-mono text-[11.5px] text-dim lg:flex-row">
          <span>
            © 2026 {profile.shortName}. All rights reserved.
          </span>
          <span className="flex items-center gap-2 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Designed, built &amp; shipped by me — end to end.
          </span>
          <nav className="flex items-center gap-5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
            <a href="#top" className="transition-colors hover:text-fg">
              Top ↑
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
