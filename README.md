# SK Photography Portfolio

A premium, fully responsive photography portfolio site. Pure frontend — no database,
no backend, no accounts required. Built with React 19 + TypeScript + Vite + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build     # production build → /dist
npm run preview   # preview the production build locally
npm run lint       # check code quality
```

Node 18+ recommended.

## What's included

- **Home** — full-screen hero slideshow, intro, featured categories, testimonials, CTA
- **Portfolio** — masonry gallery, category filter, search, browse-by-session strip, lightbox
- **Individual gallery pages** (`/portfolio/:galleryId`) — per-session galleries with a
  client "share" button (copies the link / uses native share sheet)
- **About** — bio, experience timeline, equipment & services
- **Services** — pricing table + FAQ accordion
- **Contact** — inquiry form (opens the visitor's email client, no backend needed),
  WhatsApp link, social links, Google Maps embed
- **Dark / light mode** — toggle in the header, persisted in `localStorage`, respects
  system preference on first visit
- **SEO basics** — per-page `<title>`/meta via `react-helmet-async`, Open Graph tags,
  JSON-LD schema, `robots.txt`, `sitemap.xml`
- Smooth scroll-reveal and page-transition animations via `framer-motion`,
  respecting `prefers-reduced-motion`

## Photos

Real photos have been imported from Instagram (@sk03_photography), resized
and optimized into `public/photos/<category>/`, and wired into
`src/data/content.ts` — 57 photos across 13 real galleries spanning
weddings, portraits, street, landscape, and events.

**Commercial** is the one category still using CSS-gradient placeholders —
no product/campaign photos were available to import. Follow the same
pattern as the rest of `content.ts` once you have real commercial work to
add (a real image path instead of a gradient string is all `PhotoMedia`
needs to switch from placeholder to real image automatically).

To add more real photos later, drop files into `public/photos/<category>/`
and add matching entries to the `galleries` / `photos` arrays in
`src/data/content.ts` — see the existing entries as a template.

## Things to personalize before launching

Search the codebase for these and replace with your real details:

| What | Where |
|---|---|
| `YOUR NAME` / studio name | `Header.tsx`, `Footer.tsx`, `Seo.tsx` (`SITE_NAME`) |
| `sivask3002@gmail.com` | `Footer.tsx`, `Contact.tsx`, `ContactForm.tsx` (`CONTACT_EMAIL`) |
| WhatsApp number | `WhatsAppButton.tsx` and `Contact.tsx` (`WHATSAPP_NUMBER`) |
| Instagram / Facebook URLs | `Footer.tsx`, `Contact.tsx` |
| Studio address | `MapEmbed.tsx` (`MAPS_QUERY`) |
| `https://www.yourdomain.com` | `Seo.tsx`, `public/robots.txt`, `public/sitemap.xml` |
| Bio, achievements, equipment, services | `src/pages/About.tsx` |
| Pricing packages | `src/data/content.ts` (`pricingPackages`) |
| FAQs | `src/data/content.ts` (`faqs`) |
| Testimonials | `src/data/content.ts` (`testimonials`) |

## Contact form behavior

There's no backend, so the inquiry form builds a `mailto:` link from the
filled-in fields and opens the visitor's email client with everything
pre-filled — they just hit send. If you'd rather have submissions land
somewhere automatically without standing up your own backend, swap the
`handleSubmit` logic in `src/components/contact/ContactForm.tsx` for a
form service like Formspree or EmailJS (both have generous free tiers and
a few lines of integration).

## Deploying

This is a static site after `npm run build` — the `/dist` folder can be
deployed to Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any static
host. Since this uses client-side routing (`react-router-dom`), make sure
your host redirects all paths to `index.html` (Netlify: add a `_redirects`
file with `/* /index.html 200`; Vercel and most others handle SPAs
automatically).

## Project structure

```
src/
  components/
    layout/      Header, Footer, page Layout wrapper
    home/        Hero, Intro, FeaturedCategories, Testimonials, CtaSection
    portfolio/   FilterBar, GalleryGrid, Lightbox
    services/    PricingTable, Faq
    contact/     ContactForm, MapEmbed
    shared/      Seo, WhatsAppButton
  context/       Theme context + provider
  hooks/         useTheme
  data/          content.ts — all mock photos, galleries, testimonials, pricing, FAQs
  pages/         One file per route
  types/         Shared TypeScript types
```

## Design system

Color tokens and fonts live in `src/index.css` (`:root` / `.dark` CSS
variables, mapped into Tailwind via `@theme inline`). Change the four
accent values there to retheme the whole site without touching components.
