# sreecharan.dev

Personal site for Sree Charan — Software Developer. Built with Next.js 16, Tailwind CSS 4 and Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

All copy (bio, capabilities, delivery roadmap, toolkit, projects, quote, links) lives in `src/content/profile.ts`.

- **Add a portfolio project:** append to the `projects` array. Set `status` to `live`, `building` or `planned`, and add an `href` to make the card clickable.
- **Change the quote:** edit `quote`.
- **Change contact email / links:** edit `profile.email` and `profile.links`.

## Structure

- `src/app/` — layout, global styles, favicon and app icons
- `src/components/` — one component per section (Hero, About, Capabilities, Approach, Toolkit, Work, Contact, QuoteMarquee, Footer)
