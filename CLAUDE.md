# Technoon.ai — Project Brief for Claude

## What This Project Is
A marketing/landing page for **Technoon.ai** — an AI systems agency that builds websites, automations, and AI agents for small-to-mid businesses. The goal of the site is lead generation and conversion (book a free audit).

**Email:** hello@technoon.ai
**Domain:** https://technoon.ai

---

## Tech Stack
- **Next.js 15.3.4** + **React 19** + **TypeScript 5.8**
- **No Tailwind.** Styling is plain CSS in `src/app/globals.css` (1343 lines) using CSS custom properties
- **lucide-react** for icons only
- **Google Fonts:** Plus Jakarta Sans (body), Space Grotesk (display/headings)
- Static site — no backend, no CMS, no API calls

---

## File Structure
```
src/app/
  layout.tsx          # Root layout, font setup, metadata
  page.tsx            # Entire homepage (all 11 sections, ~401 lines)
  globals.css         # All styles (~1343 lines)
  components/
    Navbar.tsx        # Nav with dropdowns + mobile menu ('use client')
public/
  logo.png
  hero-reference.png
```

---

## Architecture Decisions
- **Single page** with hash anchor navigation (`/#solutions`, `/#process`, etc.)
- All section content is hardcoded as JS objects in `page.tsx` (no CMS)
- Only `Navbar.tsx` is a client component (uses `useState`/`useEffect` for scroll + mobile toggle)
- `page.tsx` renders all 11 sections inline — no separate page files
- FAQ uses native HTML `<details>` (no JS accordion needed)

---

## Design System
**Theme:** Dark purple/black with purple-to-cyan gradients. Glassmorphism. Premium B2B SaaS aesthetic.

```css
--bg: #05030a               /* deep dark background */
--accent: #b26cff           /* primary purple */
--cyan: #8af3ff             /* secondary cyan */
--text: #f8f4ff             /* off-white */
--muted: #c4bad9            /* secondary text */
--border: rgba(211,181,255,0.2)
```

**Responsive breakpoints:** 1100px (tablet) and 720px (mobile)
**Max page width:** 1280px

---

## Page Sections (in order)
1. **Hero** — Headline, 2 CTAs, 4 stat metrics, hero background image
2. **Pain Points** — 3 industries × their specific problems
3. **Solutions** — 4 cards: Websites That Sell, Smart Automations, 24/7 AI Agents, Revenue Audit
4. **Industries** — Food & Beverage, Gyms, Logistics (glowing cards)
5. **Process** — 4-step timeline: Discovery → Blueprint → Build → Launch
6. **Results** — Stat cards (20-35% revenue lift, 30-60% automation, etc.) + animated bar chart
7. **Testimonials** — 3 client reviews (Sarah J., Priya M., Arjun T.)
8. **FAQ** — 5 Q&As via `<details>` element
9. **CTA** — Final conversion card → "Contact hello@technoon.ai"

---

## Target Audience
- Business owners in **Food & Beverage**, **Gyms**, and **Logistics**
- Non-technical operators, growth-focused
- Accepts INR & USD (India + international)

---

## Key Brand Promises
- Speed, transparency, results-driven
- Free audit to start (no commitment)
- Quantifiable ROI focus

---

## Dev Commands
```bash
npm run dev     # local dev server
npm run build   # production build
npm run start   # production server
npm run lint    # ESLint
```

---

## What the Owner Has in Mind
- Keep it a single landing page (no multi-page expansion planned unless discussed)
- Content and copy changes happen directly in `page.tsx` data objects
- CSS changes go in `globals.css` — do not introduce Tailwind or CSS-in-JS
- Any new section follows the same pattern: add data object → map to JSX → add CSS class
- Pricing has been adjusted manually before (reduced by 20k) — check `page.tsx` for current figures
- Hero image was intentionally removed at one point — check git log if reverting
