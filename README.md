# Prime PDR — Landing Page

Landing page for Prime PDR (Paintless Dent Repair, Austin, TX).

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS v4
- Framer Motion (scroll animations)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `/` — main landing: hero, about, before/after gallery with drag sliders, services, contact, CTA
- `/estimate` — quote request form (not wired to a backend yet)
- `public/images` — all site images (before/after pairs are named `N_1.jpeg` = before, `N_2.jpeg` = after)
- `lib/site.ts` — contact info constants (phone, email, instagram)
