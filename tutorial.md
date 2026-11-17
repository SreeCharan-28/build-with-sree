# Your Portfolio Site, Explained: A Beginner's Tutorial

This tutorial walks through the personal portfolio site in this folder: what it's built with, how to run it, how the pieces fit together, and how the code works line by line. It assumes you have never written frontend code before. Every new term is explained the first time it appears.

**Contents**

1. [What we did in this session](#1-what-we-did-in-this-session)
2. [The technology, in plain English](#2-the-technology-in-plain-english)
3. [High-level walkthrough: how a page gets to your screen](#3-high-level-walkthrough-how-a-page-gets-to-your-screen)
4. [The project's folders and files](#4-the-projects-folders-and-files)
5. [Detailed code review](#5-detailed-code-review)
6. [How to make common changes](#6-how-to-make-common-changes)
7. [Five ways to improve the code (self-review)](#7-five-ways-to-improve-the-code-self-review)
8. [Glossary](#8-glossary)

---

## 1. What we did in this session

You asked to pick up yesterday's project, find out what it's built with, and get it running on your computer without recreating or overwriting anything. Here are the steps, in order.

### Step 1: Look before touching anything

The first job on an existing project is always to *read*, not write. Listing the top folder (`website/`) showed three things:

```
website/
├── .claude/launch.json     ← a saved "how to start the server" recipe
├── linkedInProfile.pdf     ← the source material for the site's text
└── site/                   ← the actual application
```

### Step 2: Identify the framework from `package.json`

Every JavaScript project has a file called `package.json`. It's the project's ID card: it lists the project's name, the commands you can run, and the libraries it depends on. Here's this project's:

```json
{
  "name": "site",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "lucide-react": "^1.73.0",
    "motion": "^14.14.0",
    "next": "16.4.6",
    "react": "19.3.0",
    "react-dom": "19.3.0"
  },
  "devDependencies": {
    "@tailwindcss/turbopack": "4.3.3",
    "tailwindcss": "4.3.3",
    "typescript": "^5",
    "eslint": "^9"
  }
}
```

How to read it:

- **`dependencies`** are libraries the site needs in order to work. `next` and `react` tell us straight away that this is a **Next.js** app.
- **`devDependencies`** are tools used only while you're developing, such as the TypeScript checker and the Tailwind CSS generator.
- **`scripts`** are shortcuts. `npm run dev` really runs `next dev`.
- The `^` in `^1.73.0` means "this version or any newer compatible one". A bare `16.4.6` means exactly that version.

### Step 3: Check whether the dependencies were already installed

Libraries get downloaded into a folder called `node_modules`. It already existed and held about 290 packages, so there was **no need to run `npm install`**. Re-installing wouldn't have hurt, but it also wasn't needed, and you'd asked me to change as little as possible.

### Step 4: Read the project's own notes

`site/README.md` explained how to run and edit the site. `site/AGENTS.md` is a note that Next.js writes for AI assistants. It warns that this Next.js version is newer than many tutorials online, so the docs bundled inside `node_modules/next/dist/docs/` are the source of truth.

### Step 5: Start the development server

`.claude/launch.json` already held a recipe for starting the server:

```json
{
  "name": "site",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["--prefix", "site", "run", "dev"],
  "port": 3000
}
```

In plain English: *"run `npm run dev` inside the `site` folder, and expect it on port 3000."* I started that recipe, and the server log confirmed it was working:

```
▲ Next.js 16.4.6 (Turbopack)
- Local:   http://localhost:3000
✓ Ready in 843ms
GET / 200 in 856ms
```

`200` is the web's code for "OK, here's your page." I then opened the page in the browser pane, checked the browser console for errors (there were none), and took a screenshot to confirm it looked right.

The server also printed a warning about a stray `package-lock.json` in your user folder (`C:\Users\Acer`). Next.js ignored that file, and it doesn't affect your site.

To run it yourself in the future, open a terminal in the `site` folder and type:

```bash
npm run dev
```

Then visit http://localhost:3000. Press `Ctrl+C` in the terminal to stop the server.

---

## 2. The technology, in plain English

A website is ultimately three languages that every browser understands:

| Language | Job | Analogy |
|---|---|---|
| **HTML** | The structure and content (headings, paragraphs, links) | The skeleton |
| **CSS** | The appearance (colours, spacing, fonts, layout) | The skin and clothes |
| **JavaScript** | The behaviour (animations, clicks, anything that changes) | The muscles |

Writing large sites in raw HTML, CSS and JavaScript gets repetitive, so developers use tools that *generate* those three languages for them. This project uses the tools below.

### React: build pages from reusable pieces

React lets you split a page into **components**. A component is a small, self-contained piece of UI, like a nav bar, a project card or a footer. You write each one once and reuse it anywhere. A component is just a JavaScript function that returns something that looks like HTML:

```tsx
function Greeting() {
  return <h1>Hello!</h1>;
}
```

That HTML-like syntax is called **JSX** (or **TSX** when used with TypeScript). It isn't real HTML, but it gets converted into real HTML.

### Next.js: the framework around React

React only builds components. **Next.js** adds everything else a real website needs:

- **Routing.** It decides which page to show for which URL, based on the folder layout.
- **Server rendering.** It builds the HTML on the server, so visitors (and Google) see content immediately instead of a blank page waiting for JavaScript.
- **A development server** with *hot reload*: save a file and the browser updates instantly.
- **Optimisations** such as automatically loading Google Fonts efficiently.

This project uses **Next.js 16** and its **App Router**, which means pages live in the `src/app/` folder.

### TypeScript: JavaScript with labels

**TypeScript** is JavaScript plus *types*: labels that say what kind of data something holds. If you say a project's `status` must be `"live"`, `"building"` or `"planned"`, TypeScript warns you the moment you type `"lvie"`. Files ending in `.ts` or `.tsx` are TypeScript.

### Tailwind CSS: styling with short class names

Instead of writing separate CSS files, **Tailwind** gives you thousands of tiny ready-made classes that you put straight on elements:

```tsx
<a className="rounded-full bg-accent px-6 py-3.5 text-sm font-semibold">View my work</a>
```

Reading those classes left to right: fully rounded corners, accent background colour, horizontal padding 6, vertical padding 3.5, small text, semi-bold. Prefixes such as `md:` or `hover:` mean "only on medium-or-larger screens" or "only when the mouse is over it".

### Motion: animation

**Motion** (formerly Framer Motion) is the animation library. You swap a normal tag like `<div>` for `<motion.div>` and describe where it starts and where it ends:

```tsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

That says: start invisible, fade in.

### Lucide: icons

**lucide-react** provides clean icons as components, such as `<ArrowUpRight />` and `<Menu />`.

### Turbopack and ESLint: behind the scenes

- **Turbopack** is the fast "bundler" that turns all these files into something the browser can load.
- **ESLint** is a spell-checker for code. Run it with `npm run lint`.

---

## 3. High-level walkthrough: how a page gets to your screen

Here's what happens when you visit `http://localhost:3000`:

```
 Your browser                     Next.js dev server (your computer)
 ────────────                     ──────────────────────────────────
 1. Requests "/"  ─────────────▶  2. Finds src/app/page.tsx (the "/" page)
                                  3. Wraps it in src/app/layout.tsx
                                  4. Runs the components → produces HTML
 5. Shows the HTML  ◀───────────     (+ CSS + JavaScript files)
 6. Downloads the JavaScript and "hydrates":
    the static HTML becomes interactive
    (animations start, menu button works)
```

**Hydration** (step 6) is a key idea. The server sends ready-made HTML so the page appears quickly. Then the JavaScript "brings it to life" by attaching click handlers and starting animations.

The whole site is **one long page** with six sections stacked on top of each other. The nav links (`#about`, `#work` and so on) scroll you down to the matching section rather than loading a new page:

```
┌────────────────────────────┐
│ Nav (fixed at the top)     │
├────────────────────────────┤
│ Hero        (#top)         │ ← name, tagline, animated "agent console"
│ About       (#about)       │
│ Focus       (#focus)       │ ← five skill cards in a "bento" grid
│ Journey     (#journey)     │ ← career timeline
│ Work        (#work)        │ ← project cards
│ Contact     (#contact)     │
├────────────────────────────┤
│ Footer                     │
└────────────────────────────┘
```

The single most useful design decision in this project is that **almost all the text lives in one file**, `src/content/profile.ts`. The components contain the *design*, and that file contains the *words*. To update your bio you never need to touch layout code.

---

## 4. The project's folders and files

```
site/
├── package.json          ← ID card: scripts + dependencies
├── package-lock.json     ← exact versions installed (don't edit by hand)
├── next.config.ts        ← Next.js settings
├── tsconfig.json         ← TypeScript settings
├── eslint.config.mjs     ← linting rules
├── README.md             ← how to run + edit
├── AGENTS.md             ← notes for AI assistants (auto-generated)
├── node_modules/         ← downloaded libraries (never edit)
├── .next/                ← build output (auto-generated, never edit)
├── public/               ← static files served as-is (images etc.)
└── src/
    ├── app/
    │   ├── layout.tsx    ← the HTML "frame" around every page
    │   ├── page.tsx      ← the homepage ("/")
    │   ├── globals.css   ← colours, fonts, custom effects
    │   └── icon.svg      ← the browser-tab icon (favicon)
    ├── components/       ← one file per section
    │   ├── Nav.tsx
    │   ├── Hero.tsx
    │   ├── AgentConsole.tsx
    │   ├── About.tsx
    │   ├── Focus.tsx
    │   ├── Journey.tsx
    │   ├── Work.tsx
    │   ├── Contact.tsx
    │   ├── Footer.tsx
    │   └── ui.tsx        ← small shared building blocks
    └── content/
        └── profile.ts    ← ALL the site's text and links
```

**Rule of thumb:** you'll spend 90% of your time in `src/content/` and `src/components/`. Folders that are generated for you (`node_modules`, `.next`) should never be edited.

---

## 5. Detailed code review

Let's go through the code from the outside in.

### 5.1 `next.config.ts`: framework settings

```ts
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};
```

- `cacheComponents` and `partialPrefetching` are newer Next.js 16 features for caching and pre-loading pages. According to the bundled Next.js docs, new apps get both switched on by default, and they're planned to become always-on in the next major release. On a one-page site like this they make little visible difference.
- The `turbopack.rules` block tells the bundler: "every time you meet a `.css` file, run it through Tailwind first." That's what turns `@import "tailwindcss"` into real CSS.

### 5.2 `src/app/layout.tsx`: the frame around every page

```tsx
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ... antialiased`}>
      <body className="grain min-h-dvh">{children}</body>
    </html>
  );
}
```

What's going on:

- **`import`** pulls code in from other files or libraries. `@/` is a shortcut meaning "the `src/` folder" (it's set up in `tsconfig.json`).
- **`next/font/google`** downloads the fonts *at build time* and serves them from your own site. That's faster and more private than linking to Google on every visit. Each font is stored in a CSS variable such as `--font-geist-sans`.
- **`metadata`** becomes the `<title>` and `<meta>` tags. That's the text in the browser tab and in Google results. Notice it reads from `profile`, so changing your name in one place updates the tab title too.
- **`{children}`** is a placeholder. Whatever page is being shown gets inserted there. This is how every page shares the same `<html>` and `<body>`.
- The backtick strings, like `` `${profile.name} — ${profile.role}` ``, are **template literals**: text with values slotted in.

### 5.3 `src/app/page.tsx`: the homepage

```tsx
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Focus />
        <Journey />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

This is beautifully simple: the homepage is just a list of sections. `<>...</>` is a **fragment**, a wrapper that doesn't add an extra element to the page. Using `<main>` for the core content is good **semantic HTML**, because it tells screen readers and search engines where the main content is.

To reorder the sections, you'd just reorder these lines.

### 5.4 `src/app/globals.css`: the design system

```css
@import "tailwindcss";

:root {
  --bg: #07080a;        /* near-black page background */
  --fg: #ededee;        /* main text colour */
  --fg-muted: #8b8f98;  /* secondary text */
  --accent: #c8ff3d;    /* the lime-green highlight */
  --accent-2: #7c5cff;  /* the purple secondary highlight */
}

@theme inline {
  --color-bg: var(--bg);
  --color-accent: var(--accent);
  --color-muted: var(--fg-muted);
  --font-mono: var(--font-geist-mono);
}
```

This is the site's **design system**: a small set of named colours used everywhere.

- `:root { --accent: ... }` defines **CSS custom properties** (variables). Change `--accent` here and every lime-green element on the site changes.
- `@theme inline` is Tailwind 4's way of turning those variables into class names. Because of `--color-accent`, you can now write `bg-accent`, `text-accent` or `border-accent` in any component.

The file also defines a few hand-written effects that Tailwind doesn't provide:

```css
/* A faint "film grain" texture over the whole page */
.grain::before {
  content: "";
  position: fixed;
  inset: -50%;
  pointer-events: none;   /* clicks pass straight through it */
  opacity: 0.035;
  background-image: url("data:image/svg+xml,...");  /* tiny noise pattern */
}

/* The scrolling "tech stack" ticker */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

And importantly, it respects visitors who get motion sickness:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .animate-marquee, .caret, .pulse-ring { animation: none; }
}
```

`prefers-reduced-motion` is an operating-system setting. This block switches off the CSS animations when it's on. (Section 7 covers the gap: the *Motion*-library animations aren't covered by this.)

### 5.5 `src/content/profile.ts`: the content "database"

```ts
// Single source of truth for all site copy. Edit here to update the site.

export const profile = {
  name: "Sree Charan R",
  role: "Agentic AI Developer",
  roleAlt: ["Agentic AI Developer", "AI-Assisted Builder", /* ... */],
  location: "Chennai, India",
  links: {
    linkedin: "https://www.linkedin.com/in/sreecharan28",
    github: "https://github.com/sreecharan2808",
  },
  // ...
};

export type Project = {
  title: string;
  category: string;
  body: string;
  status: "live" | "building" | "planned";
  href?: string;          // the ? means "optional"
  tags: string[];         // string[] means "a list of text"
};

export const projects: Project[] = [
  {
    title: "Personal Portfolio v1",
    category: "Web",
    status: "live",
    href: "https://sreecharan2808.github.io/Personal-Portfolio/",
    tags: ["HTML", "CSS", "GitHub Pages"],
    // ...
  },
  // ...
];
```

Key concepts:

- **`export`** makes a value available to other files, which `import` it.
- **Objects** (`{ name: ..., role: ... }`) group related values under names.
- **Arrays** (`[ ..., ... ]`) are ordered lists.
- **`type Project = {...}`** is TypeScript describing the *shape* every project must have. `status: "live" | "building" | "planned"` is a **union type**: only those three exact words are allowed. If you mistype one, your editor underlines it in red before you ever run the site.

**Review verdict:** this is the strongest part of the codebase. Separating content from presentation is exactly what professionals do, and the types protect you from typos.

### 5.6 `src/components/ui.tsx`: shared building blocks

```tsx
"use client";

export function Reveal({ children, delay = 0, y = 24, className, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}          // start: invisible, 24px lower
      whileInView={{ opacity: 1, y: 0 }}   // when scrolled into view: fade/slide up
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
```

- **`"use client"`** is a Next.js instruction. By default, components run *only on the server*, produce HTML and send zero JavaScript. Animations and click handlers need to run *in the browser*, so files that use them must opt in with `"use client"`. (Compare `About.tsx` and `Work.tsx`, which don't have it: they're plain server components that *use* the client `Reveal` wrapper.)
- **Props** are a component's inputs, like arguments to a function. `delay = 0` sets a **default value**. `...rest` gathers up any other props and passes them through.
- `whileInView` plus `once: true` gives you the "fade up as you scroll" effect you see on every section, triggered only the first time.
- `ease: [0.16, 1, 0.3, 1]` is a **cubic-bezier curve**: fast start, gentle stop. It's the same curve used across the site, which makes the motion feel consistent.

The file also exports `SectionHeading`, which every section uses for its numbered title ("01 — About"):

```tsx
export function SectionHeading({ index, label, title, accent, kicker }) {
  return (
    <Reveal className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 className="...">
          {title}{" "}
          {accent && <span className="font-serif italic text-accent">{accent}</span>}
        </h2>
      </div>
      {kicker && <p className="...">{kicker}</p>}
    </Reveal>
  );
}
```

`{accent && <span>...</span>}` is a common React pattern called **conditional rendering**: "if `accent` exists, show this span; otherwise show nothing."

**Review verdict:** good reuse. Five sections share one heading component, so they all look consistent.

### 5.7 `src/components/Nav.tsx`: the navigation bar

This is the most "programmatic" component. It uses **state**: values that, when they change, make React redraw the component.

```tsx
const [scrolled, setScrolled] = useState(false); // has the user scrolled down?
const [open, setOpen] = useState(false);         // is the mobile menu open?
const [active, setActive] = useState("");        // which section is on screen?
```

`useState` returns two things: the current value, and a function to change it.

**Feature 1: the bar turns frosted after you scroll.**

```tsx
useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
...
<div className={scrolled ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"}>
```

Once you've scrolled more than 24 pixels, it adds a semi-transparent background with a blur.

**Feature 2: highlighting the section you're reading.**

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
  return () => observer.disconnect();
}, []);
```

- **`useEffect`** runs code *after* the component appears on screen. It's the place for talking to the browser directly. The `[]` at the end means "run once, on first appearance".
- **`IntersectionObserver`** is a browser feature that reports when an element enters or leaves the screen. The `rootMargin` shrinks the "detection zone" to a thin band across the middle of the screen, so a section only counts as active when it crosses the middle.
- **`return () => observer.disconnect()`** is the **cleanup function**. React calls it when the component goes away, so we don't leave watchers running. This is good practice.

**Feature 3: the sliding pill behind the active link.**

```tsx
{isActive && (
  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full ..." />
)}
```

`layoutId` is Motion's clever trick. When the pill disappears from one link and appears on another with the *same* `layoutId`, Motion animates it sliding between them.

**Feature 4: the scroll progress bar.**

```tsx
<motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-accent/70" />
```

`scrollYProgress` goes from 0 (top of the page) to 1 (bottom). Using it as the horizontal scale turns a 1-pixel line into a reading-progress bar.

**Feature 5: the mobile menu.** On small screens, the links are hidden (`hidden md:flex`) and a hamburger button toggles `open`. `<AnimatePresence>` lets the menu animate *out* when it closes, not just in. The button has `aria-label` and `aria-expanded`, which tell screen readers what the button does and whether the menu is open. That's good accessibility.

### 5.8 `src/components/Hero.tsx`: the first screen

**The rotating job title** is a mini component inside the file:

```tsx
function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roleAlt.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span key={i} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}>
        {profile.roleAlt[i]}
      </motion.span>
    </AnimatePresence>
  );
}
```

- `setInterval` ticks every 2.6 seconds.
- `% profile.roleAlt.length` (the **modulo** operator) wraps the counter back to 0 at the end of the list, so 0, 1, 2, 3, 0, 1…
- Changing the `key` tells React "this is a *new* element", which triggers the exit and enter animations.

**The mouse-following spotlight:**

```tsx
const mx = useMotionValue(-1000);
const sx = useSpring(mx, { stiffness: 120, damping: 20 });
const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(200,255,61,0.07), transparent 70%)`;

<section onMouseMove={(e) => {
  const r = e.currentTarget.getBoundingClientRect();
  mx.set(e.clientX - r.left);
  my.set(e.clientY - r.top);
}}>
```

The mouse position is stored in a **motion value**, which updates without causing React to redraw the whole component. That keeps it smooth. `useSpring` makes the glow lag slightly behind the cursor, like it's on a spring. It starts at `-1000` so the glow is off-screen until you move the mouse.

**The name reveal:**

```tsx
{["Sree", "Charan"].map((w, i) => (
  <span key={w} className="block overflow-hidden">
    <motion.span initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1 }}>
      {w}
    </motion.span>
  </span>
))}
```

`.map()` turns an array into a list of elements. Each word starts pushed down below a box with `overflow-hidden` (so it's invisible), then slides up into view. The `i * 0.1` delay staggers the words. React needs a unique **`key`** on each item in a list so it can keep track of them.

**The infinite tech-stack ticker:**

```tsx
<div className="animate-marquee flex w-max gap-12">
  {[...stack, ...stack].map((s, i) => <span key={i}>{s} ✦</span>)}
</div>
```

The trick: the list is duplicated (`[...stack, ...stack]`, where `...` "spreads" an array's items out), and the CSS animation slides it left by exactly 50%. At that moment the second copy sits exactly where the first one started, so the loop is seamless.

### 5.9 `src/components/AgentConsole.tsx`: the fake terminal

This is a small **state machine** that "types" a scripted agent session line by line, pauses, and loops.

```tsx
const SCRIPT: Line[] = [
  { kind: "user", text: "Build a responsive habit-tracker app with auth." },
  { kind: "plan", text: "Planning → 4 steps: schema, API, UI, tests" },
  { kind: "tool", text: "scaffold_project(next, typescript, tailwind)" },
  // ...
];

const [count, setCount] = useState(0);   // how many lines are visible

useEffect(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {                                         // accessibility: show all at once
    const t = setTimeout(() => setCount(SCRIPT.length), 0);
    return () => clearTimeout(t);
  }
  if (count < SCRIPT.length) {                          // reveal the next line
    const t = setTimeout(() => setCount((c) => c + 1), 650 + Math.random() * 450);
    return () => clearTimeout(t);
  }
  const t = setTimeout(() => {                          // finished: wait, then restart
    setCount(0);
    setCycle((c) => c + 1);
  }, 4200);
  return () => clearTimeout(t);
}, [count]);
```

- The **dependency array** `[count]` means "re-run this effect whenever `count` changes." Each run schedules the next step, so the effect drives itself forward.
- `Math.random() * 450` adds a slightly irregular rhythm, so it feels like real work rather than a metronome.
- Every branch returns a cleanup that cancels its timer. This is correct and prevents bugs where timers fire after the component has gone.
- It checks `prefers-reduced-motion` and simply shows everything at once. This component is the best-behaved one for accessibility.

The colour and prefix of each line come from a lookup table instead of a chain of `if` statements:

```tsx
const style: Record<Line["kind"], { prefix: string; cls: string }> = {
  user: { prefix: "you",   cls: "text-fg" },
  plan: { prefix: "agent", cls: "text-accent-2" },
  tool: { prefix: "tool",  cls: "text-muted" },
  ok:   { prefix: "  ✓",   cls: "text-accent" },
  out:  { prefix: "done",  cls: "text-fg" },
};
```

`Record<Line["kind"], ...>` tells TypeScript that *every* kind must have an entry. If you add a new kind and forget its style, you get an error.

### 5.10 `src/components/About.tsx`: a server component

```tsx
import { about, profile } from "@/content/profile";
import { Reveal, SectionHeading } from "./ui";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
      <SectionHeading index="01" label="About" title="Ideas in, products out —" accent="agents in the loop." />
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5"> {/* the profile.json card + stats */} </Reveal>
        <div className="md:col-span-7 md:pl-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-[16.5px] leading-[1.75] text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Notice there's **no `"use client"`**. This component runs on the server only, so its HTML is ready immediately. It still gets animation by wrapping content in the client `Reveal` component. That's the recommended Next.js pattern: keep as much as possible on the server, and make only the interactive "leaves" client components.

**Responsive layout** is handled with a **12-column grid**: on medium screens and up (`md:`), the card takes 5 columns and the text takes 7. On phones, both stack full-width.

The decorative `profile.json` card uses `&quot;` (an **HTML entity**) for quote marks, and `{"\n"}` for line breaks inside a `<pre>` block, which keeps whitespace exactly as written.

### 5.11 `src/components/Focus.tsx`: the bento grid

```tsx
const icons: LucideIcon[] = [Bot, Code2, Globe, Smartphone, Layers];
const spans = [
  "md:col-span-2 lg:col-span-4 lg:row-span-2",   // featured card: big
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "md:col-span-2 lg:col-span-3",
];
```

On large screens the grid has 6 columns. The first (featured) card spans 4 columns and 2 rows, and the others fill in around it. This "bento box" layout is a popular modern pattern.

Each card has a **mouse-following border glow**, using the same motion-value technique as the Hero, but applied to two layers (border and background):

```tsx
const border = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(200,255,61,0.5), transparent 70%)`;
...
<div className="group relative ... p-px">                       {/* 1px padding = the "border" */}
  <motion.div className="... opacity-0 group-hover:opacity-100" style={{ background: border }} />
  <div className="relative ... bg-card p-7"> ...content... </div>
</div>
```

The trick: the outer box has 1 pixel of padding (`p-px`), and the glow layer sits behind the inner box. Only that 1-pixel gap shows the glow, so it looks like a glowing border. `group` / `group-hover:` is Tailwind's way of saying "when the *parent* is hovered, change this *child*."

The featured card also contains `AgentGraph`, a hand-drawn **SVG** (a vector-graphics format) node diagram. Its curved lines are calculated with a Bézier curve and animated with Motion's `pathLength`, so they appear to "draw" themselves.

### 5.12 `src/components/Journey.tsx`: the timeline

```tsx
const ref = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

<motion.div style={{ scaleY }} className="absolute ... w-px origin-top bg-gradient-to-b from-accent via-accent-2" />
```

- **`useRef`** gives you a handle to a real element on the page.
- `useScroll({ target: ref })` measures scroll progress *through this one element* instead of the whole page.
- The vertical line grows downward (`origin-top` + `scaleY`) as you scroll through your career. It's the same idea as the nav progress bar, aimed at one section.

Icons are chosen with a typed lookup table, which is clean and safe:

```tsx
const kindIcon: Record<JourneyItem["kind"], LucideIcon> = {
  now: Sparkles,
  work: Briefcase,
  education: GraduationCap,
};
```

The timeline uses `<ol>` (an *ordered* list), which is the semantically correct element for a sequence.

### 5.13 `src/components/Work.tsx`: project cards

The neatest trick here is a card that is a link *only if* the project has a URL:

```tsx
function ProjectCard({ p, i }: { p: Project; i: number }) {
  const Wrapper = p.href ? "a" : "div";
  return (
    <Wrapper
      {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}
      className={`group ... ${p.href ? "cursor-pointer hover:-translate-y-1" : ""}`}
    >
```

- The **ternary operator** `condition ? A : B` means "if condition, A, otherwise B."
- Storing a tag name in a variable (`Wrapper`) lets the same JSX render either an `<a>` or a `<div>`.
- `target="_blank"` opens the link in a new tab, and `rel="noreferrer"` stops the new tab from controlling or tracking your page. That's a security best practice.

`String(i + 1).padStart(2, "0")` turns `1` into `"01"` for the big faded number on each card.

### 5.14 `src/components/Contact.tsx`: copy-to-clipboard

```tsx
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
```

- **`async` / `await`** handles operations that take time. Copying to the clipboard needs the browser's permission, so it's asynchronous.
- **`try` / `catch`** handles failure gracefully. If clipboard access is blocked, it falls back to opening the visitor's email app. That's thoughtful error handling.
- The button text and icon swap to "Copied to clipboard" ✓ for 1.8 seconds, giving clear feedback.

The LinkedIn and GitHub logos are inline SVG components with `aria-hidden`, which hides them from screen readers because the text label next to them already says what they are.

### 5.15 `src/components/Footer.tsx`

A simple server component. The giant outlined "SREE CHARAN" uses `text-transparent` plus `-webkit-text-stroke` to draw only the outline of the letters, and `aria-hidden` stops screen readers from reading it out as content.

### 5.16 Overall review summary

| Area | Verdict |
|---|---|
| Structure | ✅ Clear: one component per section, shared UI in `ui.tsx` |
| Content separation | ✅ Excellent: `profile.ts` is a typed single source of truth (with a few leaks, see §7) |
| TypeScript use | ✅ Good: union types and `Record` lookups catch mistakes |
| Server vs client | 🟡 Mixed: About, Work and Footer are server components (good), but Hero is fully client-side |
| Accessibility | 🟡 Good basics (semantic tags, aria labels, reduced-motion CSS), with gaps in JS animations |
| Effects cleanup | ✅ Mostly correct (observers and timers are cleaned up), with one exception in Nav |
| Tests | ❌ None yet |

---

## 6. How to make common changes

With the dev server running (`npm run dev`), every save updates the browser instantly.

**Change your bio:** edit `about.lead` or `about.paragraphs` in `src/content/profile.ts`.

**Add a project:** add an entry to the `projects` array:

```ts
{
  title: "Habit Tracker",
  category: "Web",
  body: "A responsive habit tracker built end to end with AI agents.",
  status: "live",
  href: "https://example.com/habits",
  tags: ["Next.js", "TypeScript"],
},
```

**Change the accent colour:** edit `--accent` in `src/app/globals.css`. Be aware that some components hard-code the same green as `rgba(200,255,61,...)` (see §7).

**Add a job to the timeline:** add an entry to the `journey` array. `kind` must be `"now"`, `"work"` or `"education"`.

**Check your code for mistakes:**

```bash
npm run lint
```

**Build the production version** (the optimised version you'd deploy):

```bash
npm run build
```

---

## 7. Five ways to improve the code (self-review)

These come from reading every file in `src/`. They're ordered by how much they matter to a real visitor.

### 1. Fix the mobile menu leaving the page unscrollable

**Problem:** `Nav.tsx` locks page scrolling while the mobile menu is open:

```tsx
useEffect(() => {
  document.body.style.overflow = open ? "hidden" : "";
}, [open]);
```

But nothing closes the menu if the window is resized to desktop width. The menu becomes hidden (`md:hidden`), yet `open` is still `true`, so **the page stays frozen and can't be scrolled**. You can reproduce it by rotating a tablet or resizing a browser while the menu is open. The effect also has no cleanup, and there's no way to close the menu with the `Escape` key.

**Suggested fix:**

```tsx
useEffect(() => {
  if (!open) return;
  document.body.style.overflow = "hidden";

  const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
  const mq = window.matchMedia("(min-width: 768px)");
  const onResize = () => mq.matches && setOpen(false);

  window.addEventListener("keydown", onKey);
  mq.addEventListener("change", onResize);
  return () => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", onKey);
    mq.removeEventListener("change", onResize);
  };
}, [open]);
```

### 2. Make *all* animations respect "reduce motion"

**Problem:** `globals.css` turns off the CSS animations for users with reduced motion, and `AgentConsole` checks for it too. But everything driven by the Motion library ignores the setting: the `Reveal` fade-ups, the rotating role title (every 2.6 s, forever), the hero spotlight, and the `AgentGraph` lines that loop with `repeat: Infinity`. For people with vestibular disorders, constant motion can cause real discomfort.

**Suggested fix:** Motion has a one-line global switch. Wrap the app in `MotionConfig` inside a small client component:

```tsx
// src/components/MotionProvider.tsx
"use client";
import { MotionConfig } from "motion/react";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

Then use it in `layout.tsx`: `<body><MotionProvider>{children}</MotionProvider></body>`. Also have `RotatingRole` skip its `setInterval` when reduced motion is on.

### 3. Don't hide the main heading until JavaScript loads

**Problem:** `Hero.tsx` is entirely `"use client"`, and the name starts at `initial={{ y: "105%" }}`, pushed out of sight inside an `overflow-hidden` box. The server *does* send the HTML, but with that hidden starting position. So until JavaScript downloads and runs, the most important text on the page (your name) is invisible. On a slow phone connection, or if a script fails, visitors see an empty hero. It can also hurt the "Largest Contentful Paint" speed score that Google uses.

**Suggested fix:** Make `Hero` a server component and move only the interactive bits (spotlight, `RotatingRole`, the console) into small client components. For the name reveal, use a pure CSS animation (`@keyframes`, like the existing marquee), which runs without waiting for JavaScript. Or use `initial={false}` so the server-rendered state is already visible.

### 4. Finish the "single source of truth" idea

**Problem:** `profile.ts` promises to be the one place for all content, but several values are still hard-coded in components:

| Where | Hard-coded value |
|---|---|
| `Hero.tsx` | `["Sree", "Charan"]` and the "Now / Day job / Stack" facts |
| `Footer.tsx` | `SREE CHARAN` and `© 2026` |
| `Contact.tsx` | the handles `"in/sreecharan28"` and `"sreecharan2808"` |
| `Work.tsx` | the label `github.com/sreecharan2808` |
| `Focus.tsx`, `Hero.tsx`, `AgentConsole.tsx` | colours like `#c8ff3d` and `rgba(200,255,61,...)`, which duplicate `--accent` from the CSS |

If you rename a handle or change the accent colour, these won't follow.

**Suggested fix:** Derive them from `profile`, for example `profile.shortName.split(" ")` for the hero and `profile.shortName.toUpperCase()` for the footer. Use `new Date().getFullYear()` for the year. Add a `handle` field next to each link. Use `var(--accent)` or Tailwind's `fill-accent` / `stroke-accent` instead of raw hex codes.

### 5. Remove the hidden coupling in `Focus.tsx` (and add a safety net)

**Problem:** The icons and grid sizes live in arrays *separate* from the data they belong to, matched only by position:

```tsx
const icons = [Bot, Code2, Globe, Smartphone, Layers];   // must line up with focusAreas
const spans = ["md:col-span-2 lg:col-span-4 ...", ...];  // must line up too
const Icon = icons[index];
```

If you add a sixth focus area to `profile.ts`, `icons[5]` is `undefined`, and `<Icon />` **crashes the whole page** with a React error. Reordering the areas silently gives them the wrong icons. TypeScript can't catch this.

**Suggested fix:** Put the icon *with* the data, using the same lookup-table pattern `Journey.tsx` already uses:

```ts
// profile.ts
focusAreas = [{ code: "01", title: "Agentic AI Development", icon: "bot", size: "featured", ... }]

// Focus.tsx
const iconFor: Record<FocusIcon, LucideIcon> = { bot: Bot, code: Code2, globe: Globe, ... };
```

Now TypeScript guarantees every area has a valid icon. As a broader safety net, the project has **no automated tests**. You already know Playwright from your day job, so a handful of tests (the page loads, the menu opens and closes, the email copy works, every nav link scrolls to its section) would catch regressions like this one before visitors do.

---

## 8. Glossary

| Term | Meaning |
|---|---|
| **Component** | A reusable piece of UI, written as a function that returns JSX |
| **JSX / TSX** | HTML-like syntax inside JavaScript/TypeScript |
| **Props** | The inputs passed to a component (`<Reveal delay={0.1}>`) |
| **State** | Data that, when changed with its setter, redraws the component (`useState`) |
| **Hook** | A function starting with `use` that adds abilities to a component (`useState`, `useEffect`, `useRef`) |
| **Effect** | Code that runs after rendering, for timers, observers and browser APIs (`useEffect`) |
| **Cleanup function** | What an effect returns, run to undo its work when it's no longer needed |
| **Server component** | Runs only on the server, sends HTML, no JavaScript (the default in Next.js) |
| **Client component** | Also runs in the browser, for interactivity (needs `"use client"`) |
| **Hydration** | The browser attaching JavaScript behaviour to server-sent HTML |
| **Dev server** | A local web server (`npm run dev`) that rebuilds as you save |
| **localhost:3000** | "This computer, port 3000": your site, visible only to you |
| **Dependency** | An external library your project uses, listed in `package.json` |
| **CSS custom property** | A CSS variable like `--accent`, reused throughout the styles |
| **Responsive design** | Layouts that adapt to screen size (`sm:`, `md:`, `lg:` prefixes) |
| **Semantic HTML** | Using tags for their meaning (`<main>`, `<nav>`, `<ol>`) so assistive tech understands the page |
| **ARIA attributes** | Extra labels for screen readers (`aria-label`, `aria-expanded`, `aria-hidden`) |
| **Reduced motion** | An OS setting asking sites to minimise animation |
| **Linting** | Automatic checks for code mistakes and style issues (`npm run lint`) |
