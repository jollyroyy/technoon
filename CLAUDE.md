# Technoon.ai — Project Memory for Claude

## What This Project Is
A marketing landing page for **Technoon.ai** — an AI systems agency that builds websites, automations, and AI agents for SMBs. Goal: lead generation and conversion (book a free audit call).

**Email:** info@technoon.ai
**Domain:** https://technoon.ai
**Repo:** https://github.com/jollyroyy/technoon (branch: `main`)

---

## Tech Stack
- **Next.js 15.3.4** + React 19 + TypeScript 5.8
- **No Tailwind.** Plain CSS in `src/app/globals.css`
- **lucide-react** for icons only
- **Google Fonts:** Inter (body, `--font-body`), Syne (display/headings, `--font-display`)
- Static single-page site — no backend, no CMS, no API calls

---

## File Structure
```
src/app/
  layout.tsx          # Root layout, font setup (Inter + Syne), metadata
  page.tsx            # Entire homepage — all sections + all copy as JS objects
  globals.css         # All styles — tokens, layout, components, responsive
  components/
    Navbar.tsx        # Fixed nav, dropdowns, mobile hamburger, email link
public/
  logo.png            # Navbar logo
  hero-reference.png  # Hero background image (2048×1148px, edited)
```

---

## Design Tokens
```css
--bg: #05030a            /* deep dark */
--accent: #b26cff        /* purple */
--cyan: #8af3ff          /* cyan */
--text: #f8f4ff          /* off-white */
--muted: #c4bad9         /* secondary text */
--accent-soft: #e2c8ff
--page-max: 1280px
--font-body              /* Inter */
--font-display           /* Syne */
```

---

## Responsive Breakpoints
| Breakpoint | Behaviour |
|-----------|-----------|
| ≤1100px | Grids → 2 columns, split headings stack |
| ≤980px | Navbar email hidden |
| ≤768px | Hamburger menu, navbar height 68px, logo 68px |
| ≤720px | All grids → 1 column, fonts reduced, hero shrinks |

---

## Page Sections (in order)
1. **Hero** (`#hero`) — background image, empty `hero-content` div
2. **Pain** (`#pain`) — 3-column pain cards (F&B, Gyms, Logistics)
3. **Solutions** (`#solutions`) — bento grid, 3 cards
4. **TechnoonHR** (`#technoonhr`) — HR SaaS product section
5. **Industries** (`#industries`) — 3-column industry cards
6. **Process** (`#process`) — 4-step timeline
7. **Results** (`#results`) — stats row + decorative bar chart
8. **Pricing** (`#pricing`) — 4-card pricing grid
9. **FAQ** (`#faq`) — native `<details>` accordion
10. **CTA** (`#contact`) — book audit call + email link
11. **Footer** — brand, 3 nav columns, copyright

---

## Key Business Details
| | |
|--|--|
| Website launch | **1 day** (24 hours) |
| AI Receptionist | 7–10 days |
| Lead Follow-up | 3–5 days |
| TechnoonHR | ₹2,999–4,999/month, live in 2 days |
| Target industries | Food & Beverage, Gyms, Logistics |
| Booking links | cal.com/technoon/audit · cal.com/technoon/hr-demo |

---

## Hero Image Notes
- `public/hero-reference.png` — baked-in "Techooon.Ai" logo was **removed via Python/PIL**
- "Ai" → "AI" fixed in subheading via Python/PIL pixel editing
- **No `.hero-logo-cover` CSS overlay** — that was removed once the image was fixed
- `object-position: center top` on mobile to keep the image visible

---

## Navbar Structure
- Logo (left) → Nav links (Services dropdown, TechnoonHR, Pricing, How It Works) → `info@technoon.ai` + Book Free Audit button (right)
- Email hidden at ≤980px, full nav hidden at ≤768px (hamburger only)

---

## Dev Commands
```bash
npm run dev     # local dev
npm run build   # production build
npm run lint    # ESLint
```

---

## What the Owner Wants
- Single landing page — no multi-page expansion unless discussed
- Copy and content: edit JS objects at the top of `page.tsx`
- CSS: all changes go in `globals.css` — no Tailwind, no CSS-in-JS
- New sections: add data object → map to JSX → add CSS class
- Always push to `main` on GitHub after changes

---

## Session History (what has been done)
| # | Change |
|---|--------|
| 1 | Removed baked-in "Techooon.Ai" logo from hero image via Python/PIL |
| 2 | Fixed "Ai" → "AI" in hero image subheading via Python/PIL |
| 3 | Upgraded fonts: Plus Jakarta Sans → Inter, Space Grotesk → Syne |
| 4 | Added antialiased rendering, tighter heading letter-spacing, refined weights |
| 5 | Added `info@technoon.ai` in navbar (beside Book Audit), CTA section, and footer |
| 6 | Built full site footer (brand + 3 nav columns + copyright) |
| 7 | Full mobile responsiveness pass — hero visible on mobile, grids collapse correctly |
| 8 | Removed `.hero-logo-cover` (was blacking out entire hero on mobile) |
| 9 | Navbar logo made responsive via `.nav-logo-img` CSS class (68px on mobile) |
| 10 | Rewrote all page copy: punchy, scannable, premium tone |
| 11 | Changed website launch: "14 days" → "1 day" throughout entire site |
| 12 | Updated navbar dropdown label: "Launch-Ready Website" → "Website in 1 Day" |
