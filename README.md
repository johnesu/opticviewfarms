# OpticsView Farms — public website

The public face of OpticsView Farms: a corporate site, a multi-vendor
agricultural marketplace and the marketing surface for the farm-management
platform. This repository is **phase one — the frontend only**. There is no
server, database, cart or payment flow in here yet, and nothing pretends
otherwise.

---

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build     # production build (25 static/dynamic routes)
npm run start     # serve the production build
npm run typecheck # tsc --noEmit
```

Requires Node 18.18+ (Node 20+ recommended) and npm.

---

## What is built

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, capability band, how it works, divisions, marketplace preview, offline section, vendor programme, testimonials, closing CTA |
| `/marketplace` | Catalogue with search, category filter, sort and a wholesale-only filter |
| `/marketplace/[slug]` | 13 statically generated product pages with quotation CTAs |
| `/our-farms` | Divisions and the five production sites |
| `/about` | Story, milestones, operating principles, offline architecture, delivery |
| `/vendors` | Vendor programme, requirements, commission terms, onboarding steps, FAQ |
| `/contact` | Direct lines and a mailto-based enquiry form |
| `/credits` | Photography attribution and licences |
| `/manifest.webmanifest`, `/icon.svg` | PWA manifest and app icon |

### Honest CTAs

There is no checkout yet, so no button claims to complete a purchase.

- Product pages offer **“Request a quotation”** and **“Ask the vendor a question”**, which deep-link into the contact form with the product pre-filled.
- The contact form validates on the client, then opens the visitor's mail app via `mailto:`. It states this in the UI. Nothing is sent to a server.

---

## Stack

- **Next.js 15** (App Router, React Server Components, static generation)
- **React 19**
- **TypeScript** in strict mode (`noUncheckedIndexedAccess` on)
- **Tailwind CSS v4** — CSS-first `@theme` tokens, no config file
- No component library, no icon package. UI primitives and icons are local, so
  the design is not constrained by someone else's defaults.

---

## Project structure

```
app/                     routes, layout, metadata, manifest
components/
  home/                  home page sections
  marketplace/           catalogue (client) and product card
  site/                  header, footer, logo, page hero, connection status
  ui/                    button, eyebrow, section heading, icons, reveal observer
  contact/               enquiry form
lib/
  site.ts                brand, contact details, navigation — rename the brand here
  images.ts              every image path used by the site
  format.ts              kobo → naira formatting
  data/products.ts       seeded catalogue (13 products)
  data/farms.ts          farms, testimonials, milestones
  data/credits.ts        typed access to photo-credits.json
scripts/
  shoot.mjs              CDP screenshots (true mobile widths, full page)
  commons-sheet.mjs      Wikimedia Commons candidate contact sheets
  download-images.mjs    fetch chosen photos + regenerate credits
public/images/           optimised local photography
```

### Brand rename

`lib/site.ts` holds the company name, legal name, address, phone, email and
navigation. Renaming the business is one file.

---

## Design system

Tokens live at the top of `app/globals.css` under `@theme`.

| Token | Value | Use |
| --- | --- | --- |
| `ink-950` | `#17120f` | headings, fine print |
| `ink-900` | `#1f1916` | body text, dark buttons |
| `bronze-600` | `#8a5a3b` | italic emphasis, links, icons |
| `ochre-500` | `#b07a3f` | ratings, highlight marks |
| `sand-50` | `#ffffff` | page background, cards |
| `sand-100` | `#f7f1e8` | alternating bands, footer |
| `sand-200` | `#efe3d3` | CTA bands, quiet panels |
| `sand-300` | `#e2d0ba` | hairline borders |
| `stone-600` | `#6b625a` | secondary copy |
| `clay-500` | `#bf5b3f` | errors, conflict states |

Typography: **Cormorant Garamond** for display and italic emphasis,
**Plus Jakarta Sans** for body and UI, both loaded from Google Fonts with system
fallbacks. Display sizes use `clamp()` so headings scale without breakpoint
jumps.

Shape: square by default — cards, buttons, inputs and panels use a 0px radius.
Circles are reserved for avatars, the stat badge, status dots and the arrow
button that overlaps the hero product card.

Signature details:

- `.lift` — a restrained hover lift on cards.
- `.zoom-media` — the slow image scale on product cards.
- `.marquee` — the capability band.
- `.grain` / `.hairline` — quiet paper texture and rules.
- Scroll reveals are gated on `html.js`, so content is fully visible without
  JavaScript. `RevealObserver` handles every `[data-reveal]` element.

---

## Data conventions

- **Money is stored in kobo** (minor units) as integers. `lib/format.ts` turns
  `4_800_000` into `₦48,000`. No floats anywhere near currency.
- A product with a wholesale tier has `wholesalePrice` and `moq`; a retail-only
  product has `wholesalePrice: null` and `moq: null` (for example, Smoked Catfish).
  This is what makes the marketplace “Wholesale available” filter meaningful.
- Prices, stock and vendor details are seeded fixtures. They are clearly
  illustrative and should be replaced by API data in phase two.

---

## Photography

All site imagery is openly licensed stock photography, downloaded into
`public/images` rather than hot-linked.

```bash
npm run images:sheet     # build a contact sheet of Wikimedia Commons candidates
npm run images:download  # download the picks and regenerate attribution
npm run shoot -- <url> <out.png> [width] [height] [full|viewport|region]
```

`shoot` also takes flags, which are easier to quote than trailing empty arguments:

```bash
npm run shoot -- http://localhost:3100/ out.png 390 900 viewport --click="[aria-controls='mobile-menu']"
npm run shoot -- http://localhost:3100/ out.png 1440 950 region --region=1750:950
```

It prints any broken images and reports horizontal overflow.

`lib/data/photo-credits.json` is generated by the download script and rendered at
`/credits`. If you replace an image, add its credit there too.

---

## Accessibility & performance notes

- Skip link, focus-visible styles, labelled form fields, `aria-live` form status.
- Decorative imagery is `alt=""` + `aria-hidden`; meaningful imagery is described.
- Product cards are single links (no nested interactive elements).
- `prefers-reduced-motion` disables reveals, marquee and transitions.
- Images use `next/image` with explicit `sizes`; the project runs with
  `images.unoptimized` because there is no image server in this phase.

---

## Deliberately not built yet

- Accounts, authentication and vendor onboarding backend
- Cart, checkout, payment integration, orders
- Live stock, pricing or availability from an API
- The offline sync engine and IndexedDB persistence
- Admin, vendor and farm-management portals
- Email delivery for the contact form (currently `mailto:`)
- Real delivery-rate calculation

These are the next phases, in that order: backend and data model, then
commerce, then the offline field app and portals.
