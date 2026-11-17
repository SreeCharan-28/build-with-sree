// Single source of truth for all site copy. Edit here to update the site.

export const profile = {
  name: "Sree Charan R",
  shortName: "Sree Charan",
  role: "Software Developer",
  roleAlt: ["Software Developer", "Web Application Developer", "Mobile Application Developer", "Agentic Engineer"],
  location: "Tamil Nadu, India",
  tagline:
    "Software developer who plans, builds, tests and ships web and mobile applications end to end — using modern development tools and agentic engineering workflows.",
  email: "sreecharan2808@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/sreecharan28",
  },
};

export const about = {
  lead: "I build software that performs well, works smoothly and solves real problems — from first idea to shipped product.",
  paragraphs: [
    "Good software should feel effortless. I build web and mobile applications that load fast, respond quickly and stay easy to use on any screen, so people can simply get done what they came to do.",
    "Behind that is solid engineering: a secure structure, clean code that is easy to maintain, and a design that can grow with the product. Every feature is tested before it ships, so the app works the way it should.",
    "I take care of the whole process — planning, building, testing and releasing — using modern tools and agentic engineering workflows to move quickly without cutting corners.",
  ],
  principles: [
    { title: "Fast & optimized", body: "Quick to load and quick to respond." },
    { title: "Smooth to use", body: "Clear, intuitive screens that feel natural." },
    { title: "Reliable", body: "Works consistently and solves the real problem." },
    { title: "Secure", body: "Safe by default, with user data protected." },
    { title: "Clean code", body: "Readable, maintainable and easy to extend." },
    { title: "Scalable", body: "Ready to grow with more users and features." },
    { title: "Responsive", body: "Looks and works right on every device." },
    { title: "End-to-end", body: "From idea to a running, shipped product." },
  ],
  stats: [
    { value: "2+", label: "Years in software engineering" },
    { value: "3", label: "Application categories" },
    { value: "E2E", label: "Idea to shipped product" },
  ],
};

export const capabilities = [
  {
    code: "01",
    title: "Commercial MVP Websites",
    body: "Professional websites and minimum viable products that turn business ideas into working digital products.",
    points: ["Modern UI/UX", "Responsive layouts", "Performance optimization", "Secure functionality", "Production-ready delivery"],
  },
  {
    code: "02",
    title: "SaaS Applications",
    body: "Scalable software-as-a-service applications with the core features a real product needs.",
    points: [
      "Authentication & authorization",
      "User management",
      "Dashboards",
      "Subscriptions",
      "Database integration",
      "Backend integrations",
      "Scalable architecture",
    ],
  },
  {
    code: "03",
    title: "Mobile Applications",
    body: "Mobile apps for Android and iOS that feel smooth and work reliably every day.",
    points: ["Smooth user experience", "Responsive interfaces", "Reliable functionality", "Performance", "Cross-platform where it fits"],
  },
];


// Quote for the scrolling strip below Contact (shown as a single line)
export const quote =
  "If you hold a gun and I hold a gun, we can talk about the law. If you hold a knife and I hold a knife, we can talk about rules. If you come empty-handed and I come empty-handed, we can talk about reason. But if you have a gun and I only have a knife, then the truth lies in your hands. If you have a gun and I have nothing, what you hold isn't just a weapon, it's my life.";

// Shown in the About card as profile.json
export const developerProfile = {
  name: "Sree Charan",
  focus: "Agentic Engineering",
  builds: ["Web", "Mobile", "AI-powered Applications"],
  workflow: "Idea → Plan → Build → Test → Run",
  roots: "Engineering",
  based: "Tamil Nadu, India",
  status: "Building & Improving",
};

// End-to-end delivery workflow, shown in the Development Approach section
export const approach = [
  { step: "Idea", body: "Understand the problem, the users and what success looks like." },
  { step: "Planning", body: "Define requirements, scope and a clear step-by-step plan." },
  { step: "Architecture", body: "Choose the right structure, data model and tools for the job." },
  { step: "UI/UX", body: "Design simple, intuitive screens that work on every device." },
  { step: "Development", body: "Build with modern tools and coding agents, reviewing every change." },
  { step: "Testing", body: "Verify everything works with automated end-to-end tests." },
  { step: "Deployment", body: "Ship to production — fast, secure and reliable." },
  { step: "Improvements", body: "Gather feedback, monitor and keep making it better." },
];

export const toolkit = [
  { group: "Frontend Development", items: ["Next.js", "React", "Tailwind CSS"] },
  { group: "Backend Development", items: ["Node.js", "Next.js API Routes"] },
  { group: "Programming Languages", items: ["TypeScript", "JavaScript", "HTML & CSS"] },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL"] },
  { group: "UI/UX and Design", items: ["Figma", "Canva", "Motion", "Lucide Icons"] },
  { group: "Development Environments", items: ["VS Code", "Claude Code"] },
  { group: "Version Control", items: ["Git", "GitHub"] },
  { group: "Deployment and Hosting", items: ["Vercel", "Netlify", "GitHub Pages"] },
];

export const stack = toolkit.flatMap((t) => t.items);

export type Project = {
  title: string;
  category: string;
  body: string;
  status: "live" | "building" | "planned";
  href?: string;
  tags: string[];
};

// Placeholder projects — replace with real ones as they ship
export const projects: Project[] = [
  {
    title: "Business Landing Page",
    category: "MVP Website",
    body: "A fast, responsive marketing site with a clear call to action and a simple contact flow.",
    status: "live",
    tags: ["Next.js", "Tailwind CSS"],
  },
  {
    title: "Team Task Dashboard",
    category: "SaaS",
    body: "A SaaS dashboard with sign-in, team workspaces and real-time task tracking.",
    status: "building",
    tags: ["Next.js", "PostgreSQL", "Auth"],
  },
  {
    title: "Habit Tracker App",
    category: "Mobile",
    body: "A cross-platform mobile app for building daily habits, with streaks and reminders.",
    status: "building",
    tags: ["Mobile", "Cross-platform"],
  },
  {
    title: "Online Store MVP",
    category: "MVP Website",
    body: "A lightweight storefront with product listings, a cart and a smooth checkout flow.",
    status: "planned",
    tags: ["React", "Node.js", "MongoDB"],
  },
];
