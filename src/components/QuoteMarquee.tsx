import { quote } from "@/content/profile";

// Same scrolling strip as the hero's skills marquee, showing a quote instead.
// The track holds two identical copies so the -50% loop is seamless.
const repeated = [quote, quote];

export default function QuoteMarquee() {
  return (
    <div
      aria-label={quote}
      className="relative overflow-hidden border-t border-line bg-bg-elev/40 py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      {/* Shorter loop than the skills strip so both scroll at about the same speed */}
      <div aria-hidden className="animate-marquee flex w-max gap-12" style={{ animationDuration: "32s" }}>
        {repeated.map((q, i) => (
          <span
            key={i}
            className="flex items-center gap-12 whitespace-nowrap font-serif text-[22px] italic tracking-[-0.01em] text-fg/80 sm:text-[26px]"
          >
            &ldquo;{q}&rdquo;
            <span className="font-mono text-[13px] not-italic text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
