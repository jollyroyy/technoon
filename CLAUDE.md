# technoon.ai — cinematic scroll site

Read this first, every session. It is the handoff. Keep it current.

**No relationship to `Desktop\technoon1`.** Do not copy or reference anything from it.

## How to work here

- Keep answers **short and to the point**. Report only when done.
- **Do not re-verify the whole site** unless asked. Check what you changed; the full
  Verification block is a pre-commit gate, not a per-edit ritual.
- Keep this file compact. Facts, not essays.

---

## What this is

A single-page, scroll-driven cinematic site for technoon.ai, an AI agency that runs a
business's operational functions. ONE world, ONE camera, ONE continuous story:

`BUSINESS → FRAGMENTATION → CHAOS → BOTTLENECK → AI ACTIVATION → SPATIAL SPLASH →
CONNECTED SYSTEM → ACCELERATION → technoon.ai`

## Layout

```
technoon2/
├─ vercel.json            deploy config (see Deployment)
├─ brief/                 storyboard.png (source of truth), storyboard-hero.png,
│                         logo-source-640.jpg (SUPPLIED ORIGINAL, the live one),
│                         logo-keyed-raw.png (the key with the white type kept),
│                         logo-source.jpg + logo-4k.png (superseded, see Logo law)
├─ review/                raw footage + tooling. NEVER ships.
│                         seq1/2.mp4, room-sd-1.jpg, verify-spine.mjs,
│                         verify-contrast.sh, key-logo.py (the LIVE mark pipeline),
│                         gen-logo.py + trace-ring.py (superseded, do not run),
│                         Montserrat-Medium.ttf,
│                         audit-2026-08-16.md (full UI/security/GEO audit)
└─ site/                  the deployable product
   ├─ index.html         the film, then the offerings stack, then the process band,
   │                     then arrival. The THREE dialogs live at the end of <body>.
   ├─ robots.txt         allows 21 named crawlers, retrieval and training split
   ├─ sitemap.xml        one URL. lastmod moves when copy or schema does.
   ├─ llms.txt           the site flattened for answer engines
   └─ assets/
      ├─ vendor/          three.module.js, gsap.min.js, ScrollTrigger.min.js, lenis.min.js
      ├─ app.css          all styles
      ├─ app.js           drive loop: scrub, bands, gates, reduced motion
      ├─ scene.js         Three.js layer — BUILT BUT OFF (SCENE_3D = false)
      ├─ detail.js        function card: one native <dialog>, six panels
      ├─ cal.js           booking card: Cal.com in a second <dialog>
      ├─ form.js          enquiry card: the third <dialog>. FORM_ENDPOINT is
      │                   unset and falls back to mailto until it is set.
      ├─ hero-scrub.mp4   the 30s core, 2 chained Seedance clips, ONE encode
      ├─ logo-mark.png    THE SHIPPED MARK, 543x400 RGBA (see Logo law)
      └─ *.jpg/png        poster, ending, overload still, favicon, logo.jpg (original)
```

`site/` is self-contained: plain HTML/CSS/vanilla JS, vendored libs, no build step.
The full scrub needs a local server (`fetch` is blocked on `file://`).
Preview: `npx http-server site -p 8080`

### Deployment

Vercel, from `main` on `github.com/jollyroyy/technoon`. That repo previously held a
Next.js site, so the Vercel project still has a Next.js preset. `vercel.json` at the
repo root overrides it and must stay:

```json
{ "framework": null, "buildCommand": "", "installCommand": "", "outputDirectory": "site" }
```

`outputDirectory: "site"` is load-bearing: **only `site/` is served**, which keeps
`review/` and `brief/` off the internet. Never widen it to `.`. Verify after deploy
that `/review/room-sd-1.jpg` 404s.

**`vercel.json` also carries the security headers**, added 2026-08-16. CSP, HSTS,
`nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`. Three
things about the CSP that will bite whoever edits it next:

- **`script-src` has no `'unsafe-inline'`.** The one inline script in `<head>`
  is allowed by its SHA-256 hash. **Change that script by even one character and
  the page stops booting** — recompute the hash and update the header together.
- **`style-src` DOES keep `'unsafe-inline'`, and must.** The sticky stack passes
  `--i` and the dealt tiles pass `--nth` as inline `style` attributes. Removing
  it removes the mechanism, not a bad habit.
- **`connect-src` lists `formspree.io` and `api.web3forms.com` in advance.** When
  `FORM_ENDPOINT` is set in `form.js`, its origin must be in that list or the
  post is blocked and the form silently falls back to `mailto`.

`frame-ancestors` is `'self'`, not `'none'`, on purpose: the documented mobile
check loads the page in a 375px same-origin iframe, and `'none'` would break it
against production while still blocking every other origin.

Old Next.js site preserved on `archive/main-nextjs`. `main` and `technoon2-cinematic`
are unrelated histories pointing at this project — push them together.

---

## The five laws

### 1. Logo law — amended four times, the only law that has moved

**READ (d) FIRST. It supersedes (a), (b) and (c), which are kept only because
they record what was tried and why each attempt failed.**

Original: ship `brief/logo-source.jpg` exactly as supplied.

**2026-08-16 (a):** client killed the dark plate. That could not be done by keying a
background out — the supplied file is a near-WHITE wordmark on a near-black card, and
on `--pearl` that reads as nothing. Blend modes can't save it either. So: recolour.

**2026-08-16 (b):** *"the round shape is not fully done … completely take a very 4K
kind of image … remove the AI agency."* The supplied file is 190x112 with a ~20px
x-height. No key, upscale or SDF trace reaches 4K from that — the wordmark comes out
lumpy. So the mark is now **rebuilt**, not extracted.

**2026-08-16 (c), and this one REVERSES (b):** *"put the logo sphere exactly as given
in the image, don't change the logo style … keep the logo exactly as it is, no
placeholder, increase the resolution."* The mathematical closed ring from (b) was a
redesign and read as one. The supplied sphere is not concentric shells: it is a swirl,
with shells that spiral, dots that fatten toward the violet side, a sparse scatter halo
and a thin seam at the top right. **A formula gets the idea and loses the mark.**

**2026-08-17 (d), and this SUPERSEDES (a)–(c):** the client supplied a **640x640**
original — `brief/logo-source-640.jpg` — and said *"use this image exactly as it is,
just remove the black boxed background colour."* That single file dissolves the
problem the previous three amendments were all working around. 190x112 with a ~20px
x-height was why the mark had to be rebuilt, then traced; at 640x640 the sphere, the
wordmark and the tagline are all real pixels and nothing has to be reconstructed.

**What ships now: `site/assets/logo-mark.png`, 543x400 RGBA — the supplied file with
its card removed and nothing else redrawn.** One checked-in step,
**`review/key-logo.py`**:

- The card is a uniform `#020113`, so the key is an **uncomposite**, not a colour
  range: `observed = art·α + card·(1-α)`, α taken from the pixel's own brightest
  channel above the card's own brightest channel (blue, 19). Antialiased glyph edges
  come back crisp instead of fringed. A naive "make black transparent" leaves a blue
  haze over the whole 640x640 and the trim then finds no edges — that was the first
  attempt and it silently produced a full-bleed 640x640 with a tinted background.
- **The wordmark is flipped to `--ink` and only the wordmark.** Pure white on
  `--pearl` is 1.03:1 — the reason (a) exists, unchanged by better resolution. The
  flip is gated on **saturation < 0.22**, so it catches the neutral white type and
  cannot touch the sphere, the `.ai`, or the two coloured rules. Every coloured pixel
  in the shipped mark is the client's own.
- **`AI AGENCY` is back**, because it is in the supplied file and the instruction was
  "exactly as it is". This reverses (b)'s "remove the AI agency". At nav size it is
  ~2px tall and reads as a texture rather than as type; that is inherent to a stacked
  lockup in a 72px bar and is not fixable by sizing.
- `site/assets/favicon.png` is still the sphere alone at 128x128, cut at the empty
  row band between the sphere and the wordmark rather than at a hardcoded fraction.

Re-run, and only when the client supplies a new original: `python review/key-logo.py`.

**`.brand-plate img` is sized by HEIGHT now, not width, and this is load-bearing.**
The supplied lockup is 0.74 as tall as it is wide (the rebuilt one was 0.60), so a
fixed `width` lets `--navh` clip the top of the sphere the moment the clamp sits at
its floor. `--navh`'s floor also moved 64px → 72px for the same reason. Nav mark:
`height: clamp(44px, calc(var(--navh) - 20px), 60px)`. Arrival: `clamp(88px, 12vh,
116px)`. Both phone blocks (§13, §13b) are height-based too — leave one of them on
`width` and that breakpoint clips.

**`review/trace-ring.py`, `review/gen-logo.py`, `review/preview-ring.py`,
`brief/logo-4k.png` and `review/ring-dots.json` are SUPERSEDED and no longer feed the
build.** They are the (b)/(c) pipeline. Do not run them; they overwrite
`logo-mark.png` with the reconstructed mark. Kept only as the record of what a trace
of the 190px file could and could not reach.

<details><summary>Superseded: what (b) and (c) shipped</summary>

**Was: `site/assets/logo-mark.png`**, 640x386 RGBA, downscaled from a 3840px
master (`brief/logo-4k.png`). Two checked-in, reproducible steps:

- **`review/trace-ring.py`** reads `brief/logo-source.jpg`, finds every dot in the
  sphere, and measures its centre, radius and colour → `review/ring-dots.json`.
  Positions and sizes are **measurements, not parameters**; there is nothing in that
  file to tune. Colour is each dot's own hue with the value the dark card took out of
  it put back; only a dot that comes back grey (JPEG ate its hue) falls back to the
  mark's own cyan→magenta axis.
- **`review/gen-logo.py`** draws those dots as crisp circles at any size and sets the
  wordmark. The one thing added to the supplied art is a sharp edge — which is exactly
  what 190x112 cannot give, and exactly what "increase the resolution" asked for.
- **Wordmark:** re-set in **Montserrat Medium**, the supplied mark's own typeface
  (0.71 IoU against the source raster; next best candidate 0.58). `technoon` in
  `--ink`, `.ai` in the violet→magenta gradient.
- **Geometry** is the supplied mark's own: sphere centre (95.5,34.3) r≈31, wordmark box
  x22–169 / y69–87, in its 190x112 space.
- **No tagline.** "AI AGENCY" and its rules are dropped.
- `site/assets/favicon.png` is the sphere alone at 128x128 — the wordmark dies at 16px.
- **`.brand-plate img` is 100px wide and cannot go wider.** The lockup is stacked, so
  it is 0.6 as tall as it is wide, and `--navh` bottoms out at 64px: 118px was tried
  and the nav clipped the top of the sphere. More resolution is an asset question, not
  a display-size one, and the asset is already 6.4x its slot.

Re-run order, and only when the mark itself changes:
`python review/trace-ring.py && python review/gen-logo.py`.
`review/preview-ring.py` renders the supplied sphere beside the traced one for eyeballing.

`brief/logo-source.jpg` and `site/assets/logo.jpg` are kept untouched as the supplied
original; the page does not load them.

**Forbidden:** re-colouring outside the token palette, particle-ising, or regenerating
the mark through any AI tool. Animation is opacity, position, scale and parallax only.

</details>

`--plate` survives as a token (the skip link uses it). `.brand-plate` survives purely
as the hover-lift transform hook — **it must stay visually inert**. A background,
padding or radius on it brings the rejected box back.

**Flag for the client, and it is now down to one line:** the mark is theirs, pixel for
pixel, with the card removed and the white wordmark darkened so it can be read on a
light page. The only remaining ask is an **officially supplied vector (SVG/AI/EPS)
logo**, which would let the wordmark render as type at any size instead of as a 543px
raster, and would make the `AI AGENCY` rule legible in the nav. That is a client
deliverable, not a build task.

### 2. Text law — the complete allowlist

The brief bans body copy but carves out text "explicitly required by the supplied
storyboard or explicitly provided by me". A line not on this list is a defect.

**The list is closed, but the client can open it** through that second clause —
`Free Audit` came through it. **It works in reverse too:** `You run the business. /
We run what moves it.` was replaced 2026-08-16 and is now OFF the list and off the
page, including `og:description`.

```
Move faster. / Spend less. / Look sharper.
Strategy. Systems. Growth.

MARKETING              → Too much activity. Not enough impact.
SALES                  → Leads everywhere. Follow-up nowhere.
OPERATIONS             → Requests never stop. Agents overwhelmed.
HR SOLUTIONS           → Great people. Slow process.
CUSTOM SOLUTIONS       → Your edge cases. Nobody's software.
CUSTOMER SUCCESS       → Customers leave quietly.

SMART MARKETING        → Smarter campaigns. Better results. Less effort.
AI-POWERED SALES       → Research. Reach out. Close more. On autopilot.
ALWAYS-ON OPERATIONS   → Instant answers. Happy customers. No missed request.
EFFORTLESS HR          → Hire faster. Onboard cleaner. Keep longer.
BUILT FOR YOU          → The system your business actually runs on.
PROACTIVE SUCCESS      → See the drop early. Fix it before they go.

ONE BUSINESS. ONE INTELLIGENT SYSTEM.
All connected. All aligned. All accelerating.

You don't worry about the functions.
We take care of the strategy.
Intelligence that runs your business. So you can lead it.

Free Audit / Build Your Intelligent Business / technoon.ai
info@technoon.ai
Name / Email / Company / What do you want to run? / Anything else / Send
```

**`Book free audit of your business` is OFF the page.** It was client-supplied
earlier on 2026-08-16 for the nav primary slot, and reverted by the client later
the same day. It duplicated the `Free Audit` ghost pill beside it, so the nav
asked twice for the same click; that duplication was a standing flag here and
the revert is what closed it. The line stays recorded as approved, but nothing
renders it. Do not put it back without the client asking.

**`info@technoon.ai` is client-supplied 2026-08-16.** It was dictated as
"info@takenone.ai", confirmed as a dictation slip, and the spelling law applies
unchanged. It appears twice: top right in the nav, and in the footer. **The nav
copy is hidden below 860px** because a phone bar cannot carry a mark, an address
and two actions; the footer one is the copy that is always reachable.

**The form field labels** are the last block above. They are functional UI
chrome, in the same category as the skip link and the Close buttons, not brand
copy — a form the client asked for cannot ship without labels and stay usable.
Recorded here so the audits and the next session both know they were a decision.

**The offerings, added 2026-08-16** under the same clause. Eyebrow `WHAT WE RUN`.
Every one of these is HTML inside `index.html`, never a JS object, so the audits see it.

```
MARKETING   Brand Visuals          One look that holds up everywhere it lands.
            Campaign Engine        Built once. Runs every week.
            Sites & Landing Pages  Pages that carry the pitch on their own.
            Content Studio         Enough to publish. Never enough to burn out.

SALES       Account Research       Know the account before the first line.
            Outbound Sequences     Follow-up that never forgets.
            Proposals & Quotes     Out the same day, not the same quarter.
            Clean Handoff          Nothing lost between the deal and the work.

OPERATIONS  AI Receptionist        Every call picked up. Every message logged.
            Request Intake         Every ask logged, routed, answered.
            Workflow Automation    The repeat work stops being work.
            Vendor & Supply        Orders move without chasing.
            Live Reporting         One view. Current. Always.

HR          Sourcing & Screening   The shortlist arrives already sorted.
            Onboarding             Day one runs itself.
            Policy & Records       Answers your team can find alone.
            Retention Signals      Notice people leaving before they do.

CUSTOM      Process Mapping        We learn how you already work.
            Bespoke Agents         Built for your business, not a template.
            Systems Integration    Your tools, finally talking.
            Internal Tools         The thing you kept meaning to build.

SUCCESS     Always-On Support      Answers at 3am, in your voice.
            Health Monitoring      Quiet accounts stop being invisible.
            Renewals               The conversation starts early, not late.
            Feedback Loop          What customers say reaches the people building.
```

**OPERATIONS carries FIVE offerings, not four.** `AI Receptionist` was added by the
client on 2026-08-16 and leads the list. The tiles sample the ribbon across their own
count, so a fifth tile needs `.offers--five` on the `<ul>` or the set stops reading as
one spectrum. A sixth would need a `--six` walk.

**Below the film, added 2026-08-16:**

```
Everything technoon.ai runs        (the stack heading)
From first call to running system  (the process heading)

Audit   → We map what your business actually does today.
Design  → We choose which functions to run, and how they connect.
Build   → Systems go live one function at a time.
Run     → We operate them. You lead the business.
```

**FINANCE was removed entirely 2026-08-16.** Gone from the allowlist, spine, dock,
`MEDAL_COUNT` and contrast audit. Do not reintroduce it.

**CLOSED 2026-08-16.** The three label-only functions used to reuse the approved closing
line as filler and were the one thing waiting on the client. They now carry real pain and
resolution pairs, approved above. Nothing on this page is placeholder copy any more.

Permitted non-brand text: `<title>`, meta description, skip link, visually-hidden
screen-reader copies, `alt`, `aria-label`, `© 2026 technoon.ai`.

### 3. Spelling law
Always `technoon.ai`. Never Technoon, Technoon AI, Technoon.ai, TechNoon.

### 4. Zero-hallucination law
Never invent customers, partners, awards, testimonials, statistics, case studies,
integrations or ROI figures. The storyboard's results panel (+128% revenue etc.) is
**omitted** by client decision — unverified. Third-party marks (Instagram, Facebook,
LinkedIn) are not reproduced.

### 5. AI-media law
Generated imagery/video must contain **no** text, lettering, signage, readable UI or
logos. Every generation prompt ends with an explicit ban. All real text is HTML/CSS/SVG.

### 6. Machine-readability law — added 2026-08-16

The page has to answer "what is this" to something that will never scroll it. Two
audiences: classic search, and answer engines that quote rather than rank.

**What ships:** `<link rel=canonical>`, a full `robots` meta, Open Graph and
Twitter cards with image dimensions and alt, `site/robots.txt`, `site/sitemap.xml`,
`site/llms.txt`, and a JSON-LD `@graph` in `<head>` — `Organization` +
`ProfessionalService`, `WebSite`, `WebPage`, an `ItemList` of the four process
steps, and an `OfferCatalog` carrying all six functions and all 25 offerings.

**The rules, and every one of them has teeth:**

- **Every string in the graph is copied verbatim from the visible page.** That is
  Google's stated requirement, and it is why there is no `FAQPage` node: marking
  up answers that do not appear on the page is a policy violation. The draft FAQ
  waits in `brief/faq-for-approval.md` until the client approves it as visible
  copy, and then the section and the schema ship together or not at all.
- **The zero-hallucination law governs the graph too.** No `aggregateRating`, no
  `review`, no `foundingDate`, no `address`, no `numberOfEmployees`, no
  `areaServed`. None of those is verified, and an empty-looking graph is not a
  reason to invent one. `alternateName` is also absent, because the bare word
  without `.ai` would break the spelling audit's single-row grouping.
- **Every absolute URL assumes `https://technoon.ai/`.** Canonical, sitemap,
  `og:url` and four `@id`s. If the custom domain is ever not the address that
  serves this page, all of them move together, and a canonical pointing at a URL
  that does not resolve is worse than no canonical at all.
- **`robots.txt` splits retrieval bots from training bots.** `OAI-SearchBot`,
  `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Claude-SearchBot`,
  `Claude-User`, `DuckAssistBot` and `Applebot` are what make this page eligible
  to be *cited* inside an AI answer; `GPTBot`, `ClaudeBot`, `Google-Extended` and
  the rest feed training. Both groups are allowed today. If the client ever wants
  out of training, flip **only** the training group — blocking the retrieval group
  is how a site vanishes from AI search without anyone noticing. Each is written
  as a full group because a named group replaces the wildcard for that crawler.
- **`llms.txt` states what is NOT published** (no pricing, case studies, client
  names or figures) so a model asked for them says so instead of estimating.

Re-run `node review/verify-spine.mjs` is unrelated to any of this; the graph is
checked by parsing it and counting — 4 nodes, 6 catalogs, 25 offers, no dangling
`@id`, no banned property.

---

## The room (fixed)

Client: **"same exact office space, no deviation."** Defined by
`brief/storyboard-hero.png`, realised in `review/room-sd-1.jpg` (the video's start
frame). Inventory:

- **Left:** warm mid-grey feature wall, white L-shaped reception counter with a slim
  monitor, black mesh chair, small plant, pale grey sofa + chrome-legged side table,
  warm LED strip at the wall base.
- **Centre:** polished light-grey floor, floor-to-ceiling city window wall, two palms
  in white cylindrical planters, grey lounge armchairs.
- **Right:** glass-walled conference room, slim dark frames, graphite table, ~10 grey
  mesh chairs, a **blank** wall display, floor lamp and plant.
- **Ceiling:** white, recessed linear warm-white cove strips.

The wall and display stay **bare** in every generation; the logo lives in HTML only.

Known drift, accepted: in seq2 the left wall returns as textured stone. The seam sits
inside the white void four seconds before the wall reappears, at the frame edge.

---

## Design system

**Direction: "The Pearl Floor."** One room the camera travels through as it fills with
overload, freezes, and is rebuilt as an ordered system. Light theme. Never dark.

**Legibility is INVERTED here.** The world is near-white and the type is dark ink, so
every scrim is a *light pearl wash* and the text shadow is a light halo. The worst-frame
audit hunts the **darkest** pixel under the text.

**Signature: the light ribbon** — a soft band grading cyan→violet→magenta, lifted from
storyboard rows 3–4 where it links the functions. It carries the whole boldness budget.

**Where it may appear:** the hero rule, the `.ghost` dot, the left edge of each card
in the reduced-motion static cut, and — added 2026-08-16 — inside the function card, as
the lit part of each capability artifact and as the 2px left edge of each offering tile,
plus two more from later the same day: **the drawn run of the process flow line**, and
**the 2px underline that arrives under a focused enquiry field**.
That is the list. The blurred band behind the dock pills was removed 2026-08-16 — at that
size it read as a stray purple shape. **On this page the ribbon works as a crisp mark and
fails as a soft floating glow.** Every appearance added since is a hard edge or a solid
stroke; none is a glow, and none may become one.

The four offering tiles in a function card each take a consecutive quarter of the ribbon,
so a function's offerings read as one spectrum rather than four unrelated boxes. That is
the site's own thesis applied at component scale, and it is why the walk has to be
re-cut when the tile count changes rather than left to fall back on a default.

**An earlier dot-ring motif was rejected** ("Exclude the ring"). The ring geometry
appears once inside the footage at the AI Moment of Truth, and never as a HUD, marker,
orbit or section device. (The logo's own ring is the mark, not a motif.)

| Token | Hex | Use |
|---|---|---|
| `--pearl` | `#F2F4F8` | canvas. Never pure `#fff`. |
| `--pearl-2` | `#E8ECF4` | recessed surfaces |
| `--ink` | `#0E1330` | primary type |
| `--ink-soft` | `#2A3154` | secondary type |
| `--slate` | `#5A628A` | tertiary, small labels |
| `--violet` | `#6C4CE0` | primary accent — rare doses |
| `--cyan` | `#35B8F2` | ribbon cool end |
| `--magenta` | `#C64BE8` | ribbon warm end |
| `--plate` | `#080918` | skip link only |

Accent appears only on: "moves", "strategy", the kickers, the CTA, focus rings, the
hero rule, the ribbon, and the lit chain chips.

**Type** — two faces only. Display: **Familjen Grotesk** (500, 700). Body: **Hanken
Grotesk** (400, 500). Never Inter or Roboto as display. (Montserrat is not a web font
here — it exists only inside the baked logo PNG.)

---

## The scroll spine — sixteen beats

One pinned sticky stage owns **1800vh**. Progress 0→1 drives video, 3D camera and
caption bands together. Minimum band width 0.055 (~94vh), so every beat survives 7–8
scroll flicks.

| Progress | Beat | Text |
|---|---|---|
| 0.000–0.058 | BUSINESS. The office. | hero heading + `Strategy. Systems. Growth.` |
| 0.058–0.120 | FRAGMENTATION | `MARKETING` + pain |
| 0.120–0.185 | FRAGMENTATION | `SALES` + pain |
| 0.185–0.250 | FRAGMENTATION | `OPERATIONS` + pain |
| 0.250–0.323 | CHAOS | `HR SOLUTIONS` |
| 0.323–0.397 | CHAOS | `CUSTOM SOLUTIONS` |
| 0.397–0.470 | CHAOS | `CUSTOMER SUCCESS` |
| 0.470–0.530 | BOTTLENECK, max overload | none |
| 0.530–0.575 | **THE STOP.** | none |
| 0.575–0.640 | AI ACTIVATION | none |
| 0.640–0.700 | THE SPATIAL SPLASH | none |
| 0.700–0.760 | AFTER | `SMART MARKETING` + line |
| 0.760–0.820 | AFTER | `AI-POWERED SALES` + line |
| 0.820–0.880 | AFTER | `ALWAYS-ON OPERATIONS` + line |
| 0.880–0.945 | CONNECTED SYSTEM | chain line + all six chips |
| 0.945–1.000 | technoon.ai | closing lines + CTA |

Layout rule: pain beats on the **left rail**, the three chaos labels in **three
quadrants**, resolution beats on the **right rail**, chain and close **centred**. The
mirrored side is how before-and-after is expressed structurally rather than announced.

The chaos labels were pulled **inboard off the rail** (`pos-a`–`pos-c` in app.css)
because at the frame edge they sat in the reader's periphery. Type size unchanged —
bigger was tried and rejected. Moving a caption moves the footage under it, so the
contrast audit's per-beat crop windows moved too.

### The phone runs the same film — not a separate build

Client: *"I want to see the exact scroll-driven website … on the mobile as well."*
The old build gated every phone to the static cut, which was a different product.

**Shared, and must stay shared:** the pinned stage, the 1800vh spine, all sixteen band
boundaries, `VIDEO_MAP`, the footage, split-text entrances, the wave, the dock, both
dialogs. ONE spine, ONE drive loop.

**What app.css §13 reframes for a tall narrow window, and only this:**
- rails give up their horizontal OFFSET but keep their ALIGNMENT;
- the three chaos beats trade quadrants for three distinct HEIGHTS (21vh / 46vh /
  bottom 19vh);
- type grows; `.band::before` widens to `-20vh -26vw` and deepens to .94/.80;
- `.journey` is re-declared in **`svh`** — `vh` is the LARGE viewport on a phone and
  stays frozen while the URL bar collapses, but `.stage` is already `100svh`, so the
  spine and the pinned frame would be measured against two different heights.

**The static stacked cut lives in §13b** and now belongs to
`prefers-reduced-motion: reduce` alone. `GATES` in `app.js` matches.

Three things in `app.js` that make the film paint on a phone:
- **The iOS decode unlock.** iOS holds a `<video>` undecoded until it has played once.
  Nothing errors — `currentTime` moves, `seeked` fires, the element paints nothing. One
  muted `play()`/`pause()` on first `touchstart`. Wired **both ways** (listener unlocks
  if the video is there, `canplay` unlocks if the reader got there first).
- **The metered-connection bail.** `saveData` or 2g `effectiveType` skips the 12MB
  download and lands on `failVideo()`; the ROOM falls back to poster.
- **Lenis `syncTouch` stays OFF.** Touch scroll is native; turning it on hands iOS
  momentum to a JS lerp and feels worse.

### The scroll-to-video curve is piecewise
`VIDEO_MAP` pins each band to its footage moment (office 0-3s, fragmenting 3-7,
chaos 7-11, freeze 11-13, core 13-15, activation 15-18, wave 18-22, connect 22-26,
accelerate 26-28, converge 28-30). A linear map slid every caption off its moment.
**Change a band boundary → change its VIDEO_MAP anchor.**

---

## The cinematic core

Two 15s silent Seedance 2.5 clips chained and concatenated into **one** 30s file with a
single encode, so the join cannot mismatch.

- `bytedance-seedance-pro-2.5` via Magnific MCP, **720p 16:9 silent**, 6,600 credits/clip.
  1080p was 16,500/clip, over balance.
- Seq2 starts from seq1's final frame as a full-quality PNG (`-q:v 1`). Seam verified
  frame by frame 14.6–15.5s; invisible.
- Encode: `-c:v libx264 -crf 21 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p
  -movflags +faststart -an` → 11.6 MB, 30.08s. **Do not lengthen the keyframe interval**
  — it is what makes scrubbing smooth.

720p is fine because the footage is the environment layer behind pearl scrims, never a
sharp full-bleed surface. Foreground is HTML type, razor sharp at any resolution.

### The 3D layer is BUILT and OFF

`scene.js` is complete and exports `createScene()`. `const SCENE_3D = false` in `app.js`
is the whole switch. Switched off 2026-08-16 — the drifting tinted objects read as
"purple shape things". That is a taste verdict on the execution, not the idea.

If revived: it comes back **untinted** unless the client says otherwise, and
`MEDAL_COUNT` must match the number of `.chain-item` pills. Nothing structural depends
on it — every beat it illustrated is already in the footage. The original reasoning:
cards, envelopes and chat bubbles belong in 3D because AI video hallucinates fake logos
and garbage text onto that content, which would break the AI-media law.

---

## Interaction

**The dock.** The six pills in CONNECTED SYSTEM magnify under the pointer like macOS
dock icons: the pointed-at pill takes the full pop, neighbours a decaying share, so the
row feels like one elastic surface. `:has()` reaches backwards, the sibling combinator
forwards. This is the client's "glassmorphic MacBook task bar pop up" and the one place
carrying a glass material, because it is the one thing that is genuinely a dock.

**Glass plates behind captions were rejected** — same request, wrong reading: "I do not
want that white background, it's looking odd." `.glass` survives as `display: contents`,
a pass-through hook. **It must stay visually inert.**

**The function card.** Every function surface carries `data-fn` and opens one native
`<dialog>` (focus trap, Escape, top layer, inertness). Six panels live in `index.html`,
not a JS object, so the audits still see every string.

Rebuilt 2026-08-16 from four lines of text into **three zones**: the pain/resolution pair,
one **capability artifact**, and the **offering tiles**. `detail.js` did not change to
support any of it — the panel `Map`, the tilt, the `aria-label` derivation and the
`.detail-ready` gate all still work untouched. The card widened 680px → 880px.

*The artifacts.* One per function, pure inline SVG built only from primitives the page
already owns: lanes converging, pills stepping down, a queue clearing, gates being passed,
a lattice locking, a dip caught early. **No rings, no orbits, no arcs** — the dot-ring
motif is rejected as a site device, which rules out the single most obvious way to draw
most of these. No numbers, invented or otherwise, which is what separates this from the
stat-card approach it was modelled against.

**THE AUTHORING RULE, and it is load-bearing:** the BASE css state of every artifact is
its RESOLVED frame, and the keyframes travel away from it and back. That is the only
reason `animation: none` under reduced motion lands on the picture that carries the
meaning instead of on a broken first frame. Exactly one element per artifact moves.
A new artifact that animates *into* its resolved state instead of *out of* it will look
correct until somebody turns motion off, and then it will be nonsense.

*The tiles.* Hover and focus lift them with the same `@property` `--pop` / `--rise` pair
the dock pills use, so the page has one interaction vocabulary — and, by construction,
nothing transitions a transform that also carries another term. They lift toward the
reader on the card's own 3D stage, not merely up the page.

*Two zones, two columns, and the deck deals.* Rebuilt again 2026-08-16 on client
instruction — *"they should aesthetically eject stacked cards … offering details in
compact format"*:

- Each panel's children are wrapped in **`.detail-story`** (kicker, pain, resolution,
  artifact) and **`.detail-run`** (eyebrow, offerings). Above 800px the panel is a
  two-column grid of those two wrappers. Below it, one column, unchanged.
- **The wrappers are load-bearing.** Laid out from the flat run of paragraphs it used
  to be, the offerings block has to *span* the story's grid rows, and a spanning item
  distributes its height back across every row it spans — a five-offering function
  opened with a 400px hole between its own kicker and its own headline. Explicit
  `grid-row` values do not fix it; only giving each column its own flow does.
- **The offerings are ONE column now**, so the ribbon walk runs top to bottom and a
  single file of cards can read as a deck. The `--four` / `--five` walks are unchanged.
- **The deal:** each tile animates in from the first tile's slot, piled, fanned by a
  few degrees and 70px behind the card's surface, staggered 80ms apart. `--nth` drives
  both the delay and the travel, as a percentage of the tile, so it needs no
  measurement and no script and cannot go wrong at a different card width.
- **THE AUTHORING RULE COVERS THIS TOO**, and it is why the animation is `backwards`
  and not `forwards`: the tile's BASE state is its resolved place in the grid, so a
  tab that never ticks the animation, or a reader who asked for less motion, gets the
  finished deck rather than a heap in the corner. Verified: in a hidden tab the
  animation is discarded outright and the tiles render in place.
- The card lost ~350px of height: it now opens with every offering already on screen
  at 1568x745 instead of below the fold.

**The stack, below the film.** Six cards collecting into a real deck, on `position: sticky`
with a static per-card offset and scale keyed to `--i`. **No script, no rAF, no timeline** —
the cards are simply physically in the way of each other, which is why it reads as paper
rather than as an effect playing. `--i` drives `top`, `scale` and shadow depth together;
change one without the others and it stops looking like a deck. The kickers are `.fn-open`
buttons carrying `data-fn`, so they open the same six function cards with no JS at all.

It sits immediately after `.journey` closes because that is the **highest point on the page
it can occupy**. Everything above is inside the pinned 1800vh stage, where a sticky child
fights the pin. Do not move it up.

*Rejected on the way in:* React Bits `DriftWall` and `ScrollStack`. Both are React
components with hooks and a rAF loop; this site has no React and no build step, and
installing either would have required both. DriftWall additionally needs a photo wall we
have no real images for and ships a near-black overlay against a light-theme-only system.
The stacking idea was worth keeping and was rebuilt in ~20 lines of CSS instead.

**The process flow line.** Added 2026-08-16. Audit → Design → Build → Run is a real
sequence and the numbering was the only thing saying so. A hairline track runs the
full 940px measure, a ribbon run draws across it, and a chevron built from two
rotated borders rides the leading edge. Above 860px it **replaces** the per-step
top rules — one continuous line reads as a sequence, four separate ones read as
four cards. Below 860px the grid has wrapped to a stack, a horizontal rail through
it would be saying something untrue, so it is hidden and the step rules come back.

*No script, no rAF, no timeline object*, in the same spirit as the sticky stack:
one registered `@property --flow` animated on a scroll timeline, driving
the run's `clip-path` and the chevron's `left` **together**, so the arrow cannot
drift out of sync with the end of the line by construction rather than by
measurement. `clip-path`, not `width` — the ribbon has to read as one spectrum
being revealed, not a short gradient being stretched, and that is not visible in
a screenshot. `--flow` is registered or it would swap discretely and the line would
jump rather than draw.

**The four steps ride the arrow's OWN timeline, 2026-08-17.** They used to each
carry their own anonymous `view()` with hand-guessed ranges, and that could not be
right: `view()` is **per element**, so `.flow` and each `.step` had four different
timelines. "cover 22%" meant a different scroll position on each of them, and the
gap between the arrowhead and the step it was meant to light changed with the
window height. Now `.flow` declares `view-timeline-name: --flowline`, `.process`
hoists it with `timeline-scope`, and all five animations name it — verifiable in
one line: the `.flow` and `.step` animations return the *same* `ViewTimeline`
object. With one clock the arithmetic is exact: the draw spans `cover 0%–55%`,
the four columns are quarters of the 940px measure, so step N runs
`(N-1)/4 · 55%` → `N/4 · 55%`. Quarters rather than the real column edges because
`.steps` has a fluid gap; quarters are within a couple of percent at every width,
cannot go stale, and the slack falls in the gutters. `--land` (registered, and a
`<percentage>` **not** a `<number>` — Chrome rejects a `calc()` inside `color-mix`,
and the numeral then silently inherits `--ink` instead of taking `--violet`)
carries the numeral from `--slate` to `--violet` on the same window, so the step
takes its accent as the arrow crosses it.

**THE AUTHORING RULE COVERS THIS**, and it is the whole reason it is safe: the
BASE state is the resolved frame — line fully drawn, arrow landed, steps lit — and
the keyframes travel away from it. Safari and Firefox have no scroll timelines
today and get the finished picture, as does anyone with reduced motion on.

**The enquiry card.** The THIRD dialog, added 2026-08-16 on client instruction:
*"Book Free Audit should open the calendar widget, Build Your Intelligent Business
should open a form."* Two different readers — one ready to pick a slot, one who
wants to describe a business first — were being sent to the same place.

- **`data-cal` opens the calendar, `data-form` opens the form.** Two triggers are
  `data-cal` (the nav ghost, and nothing else). Three are `data-form` (nav primary,
  arrival, and the one inside the function card).
- **Triggers are `<a href="mailto:info@technoon.ai">`** intercepted by `form.js`,
  the same ordering that makes the booking triggers safe. Do not make them buttons.
- **The fields are hairlines, not boxes.** A rounded filled bordered input is the
  one shape this site does not otherwise contain, and it is what makes a form look
  a decade old. Label takes the accent, grey hairline is replaced by the ribbon
  drawing left to right. That is the entire interaction.
- **`.enq-input:focus-visible` restores the global focus ring explicitly.** The
  borderless field sets `outline: none` on `:focus`, which is two components of
  specificity against the page's one-component `:focus-visible` rule, so without
  the restore it silently wins and leaves keyboard readers with no indicator
  inside a focus-trapping modal. The ribbon is a state change, not an indicator:
  at its cyan end it is ~2.2:1, under the 3:1 an indicator needs.
- **`.enq-area` has an explicit height** rather than a `rows` count. That is what
  keeps the card inside 86vh on a 745px laptop; `rows="3"` overflowed it by 29px
  and put a scrollbar on a card with nothing to scroll to.
- **`FORM_ENDPOINT` is unset.** Submitting composes the fields into a `mailto` to
  the same inbox. Set it to the Formspree or Web3Forms URL and add its origin to
  the CSP `connect-src`, or the post is blocked and the form silently falls back.
- A honeypot named `_gotcha` sits off screen rather than `display: none`, because
  a bot that renders CSS skips hidden fields and fills positioned ones. A filled
  honeypot reports **success** — a bot told it failed retries.

**The booking card.** The `Free Audit` ghost pill opens Cal.com in a second
`<dialog>` via `cal.js`:
`https://cal.com/sudeshna-pal-ruww5f/technoon.ai`. Three load-bearing changes from the
original port:
- **Triggers are `<a href>` to the booking page carrying `data-cal`;** `cal.js`
  delegates and calls `preventDefault()`. That ordering IS the fallback. Do not turn
  them into `<button>`s.
- **The iframe ships with no `src`** — assigned on first open. Do not put one back.
- **It stops Lenis and pins the document together**, as `detail.js` does, and reuses
  `html.detail-open` so the two cards cannot fight over the pin.

Deliberately NOT `preserve-3d`: an iframe in a 3D context renders inconsistently, and
flat is what lets this one own a scroller safely.

**The Cal.com event title is spelled `Technoon.ai`** — outside this repo and outside the
audit's reach. It must be renamed in the Cal.com dashboard.

## Engineering rules that earned their place

- **Fetch the video as a streamed Blob.** Many hosts lack HTTP Range support; without
  it every seek clamps to zero — scrubbing works locally and silently dies live. Stream
  behind the progress ring with a 20s no-progress watchdog into the still fallback.
- **Gate every seek.** Never write `currentTime` while a seek is in flight. Coalesce to
  the newest target, issue one follow-up on `seeked`, reset the busy flag on `error`.
- **Lerp the displayed time** in a rAF loop that idles when converged and off-screen.
  Use `1 - Math.pow(1 - k, dt / 16.667)` or it feels different at 120Hz.
- **Write to the DOM only on change.** Delta-gate every band opacity, `--k` and chip.
- **The page must be complete if the video never loads.** Test by renaming the file.
- **`scene.js` and `detail.js` are imported dynamically, never statically.** A static
  import makes the drive loop hostage to that file; a `try/catch` guards the call, not
  the import. Any layer may fail alone. `detail.js` alone adds `.detail-ready`, and
  every pointer cursor and hover underline hangs off it, so a module that never loads
  leaves plain words rather than dead-looking links.
- **Never transition a transform that also carries a scroll-driven term.** A dock pill's
  transform holds the per-frame `--lit` rise and the hover pop. `--pop`/`--rise` are
  `@property`-registered and transitioned instead. Same trap for `box-shadow` and
  `background` on those pills — both interpolate `--lit`. The hover glow is a separate
  `::after` for exactly that reason.
- **A grouping property silently flattens `preserve-3d`.** `backdrop-filter`, `filter`,
  `opacity < 1` and `mask` force `transform-style: flat`, collapsing the function card's
  depth layers. That is why `.detail-card` carries none of them and the frosting lives
  on `::backdrop` and a sibling pane.
- **`showModal()` blocks interaction but not scrolling.** Behind it is an 1800vh film, so
  a wheel flick over the veil scrubs it. Stop Lenis and pin the native scroller
  together; releasing one without the other is worse than releasing neither.
- **THREE dialogs share one pin, so none may release it alone.** Was two until
  2026-08-16; `form.js` is the third and carries the same `release()` guard. The
  capture handler in `detail.js` now closes the function card on `[data-form]` as
  well as `[data-cal]`, because the card's own CTA became an enquiry trigger and
  inherited exactly the stacking problem the booking trigger had. The original
  two-dialog note, still accurate, follows.
- **TWO dialogs share one pin, so neither may release it alone.** The CTA inside the
  function card is a `data-cal` trigger, so it opened the booking card *on top of* the
  function card, and whichever closed first unpinned the film while the other was still on
  screen. Fixed 2026-08-16 in two halves, and both halves are needed: `detail.js`'s
  capture handler now closes on `a[data-cal]` as well as `a[href^="#"]`, so the booking
  card opens into a clean single-modal state; and **both** `release()` functions check
  `document.querySelector('dialog[open]')` before removing `html.detail-open`, restarting
  Lenis, or restoring focus. By the time `close` fires, the closing dialog has already
  lost its `open` attribute, so that query only matches a sibling genuinely still up.
- **SVG gradients inside the function card: three separate traps, all of which fail
  silently.** (1) CSS beats a presentation attribute, so a blanket `.fn-art path { stroke:
  … }` greys out anything painted by a gradient and `fill: none` erases it outright — the
  scaffolding rule is scoped to the scaffolding classes for exactly this reason. (2) Moving
  the paint into CSS does **not** fix it: a `url(#fragment)` in an external stylesheet
  resolves against the *stylesheet's* URL, so `url(#art-rib-mk)` in `app.css` means
  `assets/app.css#art-rib-mk` and paints nothing. The gradients therefore stay in the
  markup. (3) Every gradient carries `gradientUnits="userSpaceOnUse"`, because the default
  `objectBoundingBox` is **not rendered at all** on a horizontal line, whose bounding box
  has zero height. All three of these render as "the element is just missing".
- **Every animated SVG path carries `pathLength="100"`.** It normalises the dash maths to
  0–100 regardless of geometry, so reshaping a curve cannot desync the draw. Learned by
  authoring a path that overran its viewBox: with a hand-matched `stroke-dasharray` it drew
  in broken segments instead of one line.
- **The stack cards are opaque, alone among the surfaces on this page.** Everything else is
  translucent over the pearl. A translucent card in a deck lets the card beneath read
  straight through it, and two overlapping headlines at once is a rendering fault, not a
  stack. Paper is opaque.
- **The poster image is declared in CSS, not assigned by JS.** `initHeroOnce()` only runs
  inside `enableScrub()`, so any cut that disarms the scrub would otherwise render the
  beats on blank pearl. The room is the premise of the page.
- **Seed `body.paused` at boot**, not only on `visibilitychange` — that event fires on
  change only, so a page opened into a background tab never gets the class.
- **Specificity trap, in BOTH cuts.** The chaos beats are `.band--fn.pos-a`–`.pos-c`,
  two classes, out-specifying a bare `.band` reset. §13 re-aims them with two-class
  selectors; §13b instead uses `position: static` + `inset: auto !important`, and must
  name `text-align: right` on `.pos-b` and its underline origin explicitly. Anything
  one-class (`.band--pain`, `.band--fix`) is fine — both blocks come later in the file.
  **A fourth position joins all of those lists.**
- **`.band { padding }` belongs to §13b only.** It is the static cut's card inset; in the
  phone cinematic cut the beats are captions with no box, and padding pushes type off a
  gutter it already sits on.
- **`.brand-plate` and `.glass` must stay visually inert** — transform hooks, not surfaces.
- **`border-image` replaces all four borders.** Paint the mobile ribbon edge as a
  background layer or every card ends up ringed in gradient.
- **Static-hero gate: the query list is character-for-character identical in CSS (§13b)
  and JS (`GATES`)**, re-evaluated live on preference flips. It is down to ONE query,
  `(prefers-reduced-motion: reduce)`. Drift un-hides a stage the JS never armed.
- Splitting text: measure the string BEFORE clearing the element, or every character
  threshold collapses and the stagger dies.
- WebGL: DPR capped at 2, no post-processing, no allocations in `update()`, instanced
  everything, rAF paused off-screen and on hidden tabs.
- `overflow-x: clip` on both `html` and `body`, with `hidden` declared first.
- Reduced motion honoured **live and in both directions**.

---

## Verification

**Scope checks to what you changed.** Run the full block before a commit, not per edit.

```powershell
cd C:\Users\ASUS\Desktop\technoon2
# Spelling: grouped output must show ONE row, "technoon.ai"
(Select-String site\index.html -Pattern "[Tt]echnoon[\w.]*" -AllMatches).Matches.Value | Group-Object | Select Count,Name
# Banned variants: must return nothing. -CaseSensitive is REQUIRED (Select-String is
# case-insensitive by default, which would flag every correct lowercase hit).
Select-String site\index.html -CaseSensitive -Pattern "Technoon|TechNoon"
# Stock words / em dashes: nothing except the CUSTOM SOLUTIONS label
Select-String site\index.html -Pattern "—|leverage|seamless|empower|unlock|robust|actionable|data-driven"
# ESM parse check (no bundler, a syntax error kills the page). ALL FIVE modules.
foreach ($m in "app","scene","detail","cal","form") {
  Copy-Item "site\assets\$m.js" "$env:TEMP\$m.mjs" -Force; node --check "$env:TEMP\$m.mjs"
}
# Scroll spine — run after ANY band boundary or VIDEO_MAP change. Must end "RESULT: PASS".
node review\verify-spine.mjs
# Worst-frame legibility, sampled from the real footage. Must end PASS.
bash review\verify-contrast.sh
```

`verify-contrast.sh` samples the footage at each caption's moment, takes the **darkest**
pixel in that caption's rail, blends it under the scrim as the browser does, and reports
contrast against `--ink`. It runs **two passes**: a 375x812 portrait slot showing a
1280x720 plate under `cover` keeps only columns 474–806, so two thirds of every desktop
frame is off screen and the darkest visible pixel is a different one. The phone pass
audits at its scrim's .80 shoulder, not the .94 centre. As of 2026-08-16: worst desktop
**9.84:1**, worst phone **10.78:1**, bar 4.5:1.

`verify-spine.mjs` replicates `updateBands()` and `videoTimeFor()` and sweeps p 0→1. It
proves four things a browser cannot: every band reaches full opacity and holds a real
plateau (49–75vh), no two captions are readable at once, all four text-free beats are
silent, and the video clock never runs backwards. **Prefer it over eyeballing** — a
backgrounded tab pauses rAF, so scripted scrubbing in an unfocused window reports stale
band state and invents defects.

`review/key-logo.py` regenerates the mark and the favicon from the supplied original.
Run it only if the client supplies a new one. (`gen-logo.py` and `trace-ring.py` are
superseded — running them replaces the supplied mark with the reconstructed one.)

**Scroll-driven animations cannot be verified under browser automation either,
and for a different reason than the `close` event below.** The automation tab is
always backgrounded, so `document.hidden` is true, so `body.paused` is on and
Chrome produces no frames. Everything *about* the animation reads correctly —
`animation-timeline` computes to `view()`, `animation-range` resolves,
`animation-duration` is `auto`, the ViewTimeline is attached and its
`currentTime` tracks the scroll — but the interpolated OUTPUT never repaints, so
`getComputedStyle` and any screenshot report the last frame drawn before the tab
went to the background. Removing `body.paused` by hand does not help; there is
still no compositor frame. **That is the harness, not the site.** Anything
depending on mid-scroll interpolation has to be looked at once by a human on a
focused window. `await`-ing `requestAnimationFrame` in that tab hangs outright
and times the tool call out; use `setTimeout`, or better, do not await at all.

**The `close` event does not fire under browser automation.** Verified 2026-08-16 against
the committed baseline as well as the working tree: a listener added by hand to a
`<dialog>` never sees `close`, even for a real Escape keypress, so `html.detail-open`
appears to stick and Lenis appears to stay stopped. **That is the harness, not the site.**
Do not "fix" it. Anything that depends on `release()` running has to be click-tested by
hand. What automation *can* prove is the ordering: with both dialogs instrumented, the
baseline reports `fn=true cal=true` after clicking the card's CTA and the current build
reports `fn=false cal=true`.

**Mobile responsiveness is a standing client requirement.** Verify at 375px, and that
means the *film*: beats advance, footage scrubs, three chaos beats at three heights.
Also check the offering tiles collapse to one column and the stack cards still overlap
opaquely.
Chrome often refuses to resize below the OS minimum — a 375x812 **iframe** inside the
page is a faithful substitute (media queries resolve against the iframe's viewport).
Drive it with a real wheel `scroll`, not `scrollTo` from a tool call.

---

## Decisions log (2026-08-17)

- **The client supplied a 640x640 original and the logo problem ended.** Three
  amendments of rebuilding and tracing existed only because the previous file was
  190x112. `review/key-logo.py` uncomposites the supplied art off its `#020113` card
  and ships it at 543x400 with nothing redrawn. The white wordmark is still flipped to
  `--ink` — 1.03:1 on pearl is not a resolution problem — but the flip is gated on
  saturation, so every coloured pixel is the client's own. `AI AGENCY` is back, which
  reverses amendment (b).
- **The nav mark is sized by height now**, and `--navh`'s floor moved 64 → 72, because
  the supplied lockup is 0.74 as tall as it is wide against the rebuilt one's 0.60.
- **The four process steps were moved onto the flow line's own named timeline.** The
  old per-element `view()` ranges could not stay in sync with the arrowhead at
  different window heights, which is the one thing that animation is for.
- **The primary CTA was rebuilt for curvature**, not more colour. See the design note.

## Decisions log (all 2026-08-16)

- Project started fresh in `technoon2`. No code carried over.
- Stack: vanilla HTML/CSS/JS + Three.js, GSAP/ScrollTrigger, Lenis, vendored. No build step.
- Video scrub is hand-rolled rAF, not ScrollTrigger `scrub` — its per-frame writes fight
  the seek gate. GSAP drives DOM choreography; Lenis drives smooth scroll.
- Seedance 2.5 at 720p for both clips; all claimed business results dropped.
- **"Same exact office space, no deviation."** The first start frame and first seq1 render
  were a generic glass corridor and were discarded (6,750 credits, sunk). Room rebuilt
  from `storyboard-hero.png`; `room-sd-1.jpg` won across four takes.
- **The dot ring was rejected as the site's signature**, replaced by the light ribbon.
- Story locked to the storyboard's own sequence, every function given its own beat.
- **FINANCE removed entirely.** The three remaining chaos beats re-span 0.250–0.470;
  `VIDEO_MAP`, dock `data-w`, `MEDAL_COUNT` and contrast crops moved with them.
- **Dock pop adopted, glass caption plates rejected** — same request, two readings.
- **Function names open a native `<dialog>`.** Copy for the three label-only functions
  is outstanding with the client.
- **3D layer switched off** (`SCENE_3D = false`) — read as stray purple shapes.
- **Ribbon glow behind the dock pills removed**, same reason.
- **Cal.com booking card ported** and wired to all five CTAs, retiring the `#build`
  hrefs (two were dead self-links). `#build` is still the arrival section.
- **The phone now runs the same film.** The static-hero gate lost its four phone queries;
  added the iOS decode unlock, the `saveData` bail, `.journey` in `svh`, and a second
  phone pass in the contrast audit.
- **The logo's dark plate was removed** — a near-white mark on a near-black card has no
  reading on pearl without a colour flip.
- **The logo was then rebuilt** (fully closed ring, Montserrat Medium wordmark, no
  tagline, 4K master, ring-only favicon) because 190x112 cannot be scaled to 4K.
  Flagged: the clean fix is an officially supplied vector logo.
- **Hero heading became `Move faster. / Spend less. / Look sharper.`**, client-supplied.
  Accent on the last word so the eye runs the whole promise and lands on the payoff.
- **The primary CTA got a second premium pass, 2026-08-17.** The first was a diagonal
  grade, a lit top edge, a shaded bottom and a specular sweep — a nice flat pill. What
  it lacked was curvature: every edge was a hairline and the face between them was
  flat. Now a radial crown lights the upper face, an inset foot rolls the lower edge
  away, a hairline ring defines the rim inside the fill, and three shadows at three
  radii replace two. Pressed collapses the bloom to a contact shadow and deepens the
  foot, so it reads as pushed in rather than moved down. Still violet, not the ribbon —
  the ribbon's appearance list is closed and the CTA is not on it.
- **`verify-spine.mjs` had a stale `VIDEO_MAP`** (pre-FINANCE anchors). Resynced.
- **`Free Audit` added** to the nav and the allowlist under the brief's "explicitly
  provided by me" clause. Primary CTA reworked for depth: diagonal grade, lit top edge,
  shaded bottom, one slow specular sweep on hover.
- **Audited `outcrowd.io` and took three things from it, rejecting the rest.** Taken: a
  bespoke animated artifact inside every service card; named offerings instead of vague
  services; real content below the fold. Rejected: their entire stats layer (`$300m`,
  `100M`, `24%`, `60+`), which is unverifiable and is the exact thing the
  zero-hallucination law exists to prevent; and their dark→light theme inversion, against
  "Light theme. Never dark."
- **The function card became an offering card.** Three zones, six capability artifacts, 25
  named offerings. Positioning widened so the page finally says technoon.ai does brand
  visuals, site design and campaigns, which it previously never said anywhere.
- **The three hollow functions got real copy**, closing the last outstanding client item.
- **`AI Receptionist` added to OPERATIONS**, leading its list, which is why that one
  function has five offerings and its own `.offers--five` ribbon walk.
- **Two sections added below the film**: the sticky-stack offerings index and the numbered
  process band. Both sit after `.journey`, and the stack is as high on the page as a
  sticky element can go.
- **Two live bugs fixed, both invisible until they bit:** the booking card stacking on the
  function card and unpinning the film beneath it, and `.detail-cta` losing its Z-plane on
  hover inside a `preserve-3d` card. The first was reproduced on the committed baseline
  before the fix, not assumed.
- **`.detail-line--fix` was a dead rule** (identical to `.detail-line`). It now
  differentiates by DEPTH rather than colour, spending no further dose of violet.
- **The logo's sphere is the supplied sphere again**, traced dot by dot rather than
  drawn from a formula. The closed mathematical ring was a redesign; the client asked
  for their own mark at resolution, not a better ring.
- **The nav primary CTA became `Book free audit of your business`.** The ghost pill
  beside it still says `Free Audit`; that duplication is flagged, not resolved.
- **The function card's offerings became a dealt deck in a second column.** The card
  was one tall scroll where the named offerings — the entire point of opening it —
  were always below the fold.
- **The site became machine-readable.** canonical, robots meta, robots.txt with 21
  named crawlers, sitemap.xml, llms.txt and a JSON-LD graph carrying all six
  functions and all 25 offerings. See law 6. The FAQ block, which is the largest
  remaining lever, is drafted in `brief/faq-for-approval.md` and waits on the
  client, because visible copy needs sign-off and invisible FAQ markup is a policy
  violation.
- **`vercel.json` grew security headers**, CSP included, with the inline boot
  script allowed by hash rather than by `'unsafe-inline'`.
- **`info@technoon.ai` added**, top right and in the footer. Dictated as
  "info@takenone.ai"; confirmed a dictation slip.
- **The CTAs split in two.** `Free Audit` opens the calendar. The three
  `Build Your Intelligent Business` CTAs open a new enquiry form, the third dialog.
  `Book free audit of your business` was reverted out of the nav the same day it
  arrived, which closed the standing "the nav asks twice" flag.
- **The three function names in the film became real headings.** MARKETING, SALES
  and OPERATIONS carried theirs in a `<p>` while the other three used `<h2>`, so
  the three functions search engines most need to associate with this page were
  the three whose names were not headings.
- **A full audit was run** — UI/UX, accessibility, security, vulnerability and
  prompt-injection surface: `review/audit-2026-08-16.md`. Clean on XSS (no
  `innerHTML`, `eval` or `document.write` anywhere) and on secrets. The one real
  defect it found and fixed was the invisible keyboard focus in the new form. Its
  headline open item is that **there is still no privacy policy**, on a site that
  now collects names and email addresses and proposes to operate other companies'
  sales and HR data.

## Credit ledger

| Item | Credits |
|---|---|
| Start balance | 26,569 |
| 2 corridor frames (discarded) | -150 |
| 4 storyboard-room frames | -300 |
| Sequence 1, corridor room (discarded) | -6,600 |
| Sequence 1, correct room | -6,600 |
| Sequence 2 | -6,600 |
| **Remaining** | **6,319** |

A 15s Seedance 2.5 clip at 720p costs 6,600, so **no further clip is affordable at that
setting.** 480p/15s is 3,000; Seedance 2.0 Mini at 720p/15s is 2,100. Everything still
outstanding is 3D, CSS and DOM, which costs nothing.
