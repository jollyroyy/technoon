# Technoon.ai — Project Memory for Claude

## What This Project Is
A marketing landing page for **Technoon.ai** — a founder-led AI & software studio (Sudeshna Pal + Ummer Shaiq) that builds websites, AI automations, and business software for SMBs in **India and the Saudi/GCC market**. Goal: lead generation (book a free audit call via cal.com).

**Email:** info@technoon.ai
**Domain:** https://technoon.ai
**Repo:** https://github.com/jollyroyy/technoon (branch: `main`)
**Own product:** Noon HR — https://noon-hr.vercel.app

---

## Tech Stack
- **Next.js 15** + React 19 + TypeScript 5.8
- **No Tailwind.** Plain CSS in `src/app/globals.css`
- **lucide-react** for icons only
- **Google Fonts:** Manrope (body, `--font-body`), Syne (display/headings, `--font-display`)
- Static site — no backend. Chat widget is a scripted client-side demo.

---

## File Structure
```
src/app/
  layout.tsx            # Metadata (og/twitter/canonical), Organization JSON-LD,
                        # GA4 hook (set NEXT_PUBLIC_GA_ID in .env.local), fonts
  page.tsx              # Homepage — all sections; copy lives in data objects at top
  globals.css           # All styles — tokens, sections, chat widget, responsive
  sitemap.ts            # /sitemap.xml
  robots.ts             # /robots.txt
  icon.png              # Favicon (cropped from logo swirl)
  apple-icon.png
  privacy/page.tsx      # Privacy policy
  terms/page.tsx        # Terms of service
  components/
    Navbar.tsx          # Fixed nav, Services dropdown, mobile hamburger
    HeroChat.tsx        # Animated AI-receptionist chat mockup in the hero (loops)
    ChatWidget.tsx      # Floating AI receptionist demo (scripted replies).
                        # WHATSAPP_NUMBER const at top — fill in to enable wa.me CTA
    PricingSection.tsx  # Pricing cards + USD/SAR/INR currency toggle
public/
  logo.png              # Navbar logo — DO NOT MODIFY (owner requirement)
  og-image.png          # 1200×630 social share image (generated via PIL)
  industry-*.jpg        # Unsplash photos (restaurant / gym / logistics)
  ai-abstract.jpg       # spare Unsplash AI image (currently unused)
  hero-reference.png    # LEGACY — no longer referenced anywhere
```

---

## Design Tokens (globals.css)
```css
--bg: #060410          /* deep dark */
--blue: #4f8cff        /* logo blue */
--accent: #a06bff      /* logo purple */
--grad: linear-gradient(120deg,#3e7dff,#7a5cff,#b04dff)  /* brand gradient */
--text: #f6f4fb  --muted: #b9b3cf  --green: #4ade80
--page-max: 1240px
```
Theme is keyed to the logo's blue→purple dotted swirl. Glassmorphism cards
(`--surface` + `--border`), gradient CTAs, Syne headings.

## Page Sections (in order)
1. **Hero** (`#hero`) — H1 + dual CTA + trust chips + animated HeroChat mockup
2. **Proof strip** — Bejoice client · Noon HR · fixed-price delivery
3. **Pain** (`#pain`) — 3 industry pain cards
4. **Solutions** (`#solutions`) — 3 flagship cards + capability strip (apps/marketing/software)
5. **Case study** (`#work`) — Bejoice Shipping KSA, browser mockup + testimonial
6. **Noon HR** (`#technoonhr`) — product section + CSS dashboard mockup
7. **Founders** (`#founders`) — Sudeshna Pal & Ummer Shaiq
8. **Industries** (`#industries`) — photo cards (F&B, Gyms, Logistics)
9. **Process** (`#process`) — 4 steps
10. **Results** (`#results`) — "90-day target" stats (framed as targets, not claims)
11. **Pricing** (`#pricing`) — PricingSection component, USD/SAR/INR toggle
12. **FAQ** (`#faq`) — details/summary accordion + FAQPage JSON-LD
13. **CTA** (`#contact`) + **Footer** (incl. /privacy, /terms links)

---

## Key Business Details (from showcase deck, July 2026)
| Offer | Price (USD) | Timeline |
|---|---|---|
| Static / landing page | $350–700 | 3–5 days |
| Responsive multi-page (5–10 pages, CMS) | $800–1,800 | 7–14 days |
| Premium / corporate (Bejoice-tier) | $2,000–4,500 | 3–4 weeks |
| AI chatbot / WhatsApp assistant | $400 + $150–300/mo | 5–10 days |
| Noon HR | $3–6 / employee / mo (min $60) | live 2–5 days |

- Featured client: **Bejoice Shipping — KSA** (bejoiceshipping-ksa.com)
- Booking: cal.com/technoon/audit · cal.com/technoon/hr-demo
- Positioning: founder-led, fixed price, Saudi/GCC-ready (Arabic RTL, PDPL awareness)

---

## Owner Rules
- **Never change `public/logo.png`** or replace the navbar logo
- Copy edits: data objects at top of `page.tsx`; styles only in `globals.css`
- Single landing page — extra routes limited to legal pages unless discussed
- The old "Website in 1 Day" claim was retired → timelines now match the deck (3–5 days landing)
- Push to `main` only after the owner has reviewed changes locally

## Dev Commands
```bash
npm run dev     # local dev (http://localhost:3000)
npm run build   # production build — NOTE: wipes .next used by a running dev server; restart dev after
npm run lint
```

## To finish setup (owner TODOs)
- Add `NEXT_PUBLIC_GA_ID` to `.env.local` for Google Analytics
- Fill `WHATSAPP_NUMBER` in `components/ChatWidget.tsx`
- Replace founder initial-avatars with real photos when available
- Optional: swap case-study CSS mockup for a real Bejoice screenshot
