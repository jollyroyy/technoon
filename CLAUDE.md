# technoon.ai — cinematic scroll site

Read this file first, every session. It is the handoff. Keep it current; a stale
note is worse than none.

**This project has no relationship to `C:\Users\ASUS\Desktop\technoon1`.** That is
earlier, unrelated technoon work. Do not copy, mimic, or reference anything from it.
The only file borrowed from it is the logo bitmap, and only because it is the
official mark.

---

## What this is

A single-page, scroll-driven cinematic website for technoon.ai, an AI agency that
runs the operational functions of a business. Not a SaaS template, not stacked
sections. ONE world, ONE camera, ONE continuous story:

```
BUSINESS → FRAGMENTATION → CHAOS → BOTTLENECK → AI ACTIVATION
        → SPATIAL SPLASH → CONNECTED SYSTEM → ACCELERATION → technoon.ai
```

## Where things live

```
technoon2/
├─ CLAUDE.md              ← this file
├─ vercel.json            ← deploy config. See Deployment below.
├─ brief/
│  ├─ storyboard.png      ← PRIMARY visual source of truth (1536x1024, five rows)
│  ├─ storyboard-hero.png ← the top row cropped out, used as the room reference
│  └─ logo-source.jpg     ← official mark, 190x112 (see Logo law below)
├─ review/                ← raw footage, inspection frames, verification. NEVER ships.
│  ├─ seq1.mp4            ← sequence 1 raw, 15s
│  ├─ seq2.mp4            ← sequence 2 raw, 15s
│  ├─ room-sd-1.jpg       ← the approved room, also the video's start frame
│  ├─ verify-spine.mjs    ← deterministic scroll-spine check (see Verification)
│  └─ verify-contrast.sh  ← worst-frame legibility audit (see Verification)
├─ site/                  ← the deployable site. This folder is the whole product.
│  ├─ index.html
│  └─ assets/
│     ├─ vendor/          ← three.module.js, gsap.min.js, ScrollTrigger.min.js, lenis.min.js
│     ├─ app.css          ← all styles
│     ├─ app.js           ← the drive loop: scrub, bands, gates, reduced motion
│     ├─ scene.js         ← the Three.js layer. BUILT BUT CURRENTLY OFF, see below
│     ├─ detail.js        ← the function card: one native <dialog>, six panels
│     ├─ cal.js           ← the booking card: Cal.com in a second <dialog>
│     ├─ hero-scrub.mp4   ← the 30s core, 2 chained Seedance clips, ONE encode
│     ├─ logo-mark.png    ← THE SHIPPED MARK. 148x102 RGBA, no plate. See Logo law.
│     └─ *.jpg            ← poster, ending frame, overload still, logo.jpg, favicon
│                            (logo.jpg is the untouched supplied original, kept
│                             for reference; the page does not load it)
└─ 10k-websites-skill/    ← build methodology. Reference only, never ships.
```

`site/` is self-contained: plain HTML, CSS, vanilla JS, vendored libraries. No build
step, no npm at runtime, no framework. Double-clicking `index.html` gives the static
hero; the full scrub needs a local server because browsers block `fetch` on `file://`.

Preview: `npx http-server "C:\Users\ASUS\Desktop\technoon2\site" -p 8080`

### Deployment

Vercel, from `main` on `github.com/jollyroyy/technoon`. **That repo previously held a
completely different Next.js site**, so the Vercel project was configured for Next.js
and kept running `next build` against a repo that has no `package.json`. `vercel.json`
at the repo root is what corrects it, and it must stay there:

```json
{ "framework": null, "buildCommand": "", "installCommand": "", "outputDirectory": "site" }
```

`framework: null` is Vercel's "Other" preset; an empty `buildCommand` is the
documented way to skip the build entirely and serve files as-is. `vercel.json`
overrides the dashboard, so the stale Next.js preset there is now inert — but if
someone ever "fixes" the dashboard instead of this file, the override is what wins.

`outputDirectory: "site"` is load-bearing beyond routing: **only `site/` is served**,
which is what keeps `review/` and `brief/` off the public internet. Do not switch this
to Root Directory in the dashboard and do not widen it to `.` — that would publish the
raw footage and the client brief. Verify after any deploy that `/review/room-sd-1.jpg`
404s.

The old Next.js site is preserved on the `archive/main-nextjs` branch. `main` and
`technoon2-cinematic` are unrelated histories that both point at this project; keep
them pushed together or the deploy silently falls behind.

---

## The five laws (non-negotiable, from the client brief)

### 1. Logo law — amended 2026-08-16, and this is the one law that moved

Originally: `brief/logo-source.jpg` ships **exactly as supplied**, dark navy card and
all, inside a `--plate` badge so the baked card read as an intentional badge rather
than a stray rectangle.

The client killed the badge on 2026-08-16: *"remove the black colour box from the
logo … it should appear seamlessly over the normal background of the entire
website."*

**That could not be done by deleting a background, and the reason matters.** The
supplied file is a near-WHITE wordmark baked onto a near-black card. Key the card out
and drop the result on `--pearl` and you get an invisible logo. Blend modes cannot
save it either: `lighten`/`screen` erase the mark along with the card, `multiply`/
`darken` keep the card. A light-on-dark mark simply has no reading on a light page
without a colour flip. So there were exactly two options — keep a dark box the client
rejected, or recolour — and the client picked.

**What ships now: `site/assets/logo-mark.png`**, 148x102, RGBA:

- the navy card is **recovered as alpha**, per pixel, from each pixel's distance from
  the plate colour — so every glyph keeps its exact position and its exact
  anti-aliasing. Nothing is retraced.
- the **neutral** ink of the wordmark is flipped to `--ink` `#0E1330`.
- every **saturated** pixel — the dot ring, the `.ai` gradient, the tagline rule —
  keeps its own hue untouched.
- one mild alpha gamma (0.82), because a stroke that reads as solid on near-black
  needs more coverage to read as solid on near-white.

`site/assets/logo.jpg` and `brief/logo-source.jpg` are both **kept, untouched**, as
the supplied original. The generator is not checked in; it was a one-shot and the PNG
is the artifact.

**Still forbidden, unchanged:** redrawing, revectorising, particle-ising, upscaling
past its own 148x102 extent, or regenerating it through any AI tool. Animation is
still only opacity, position, scale and parallax. Displayed at 100px in the nav and
148px (native) in the arrival section; **never wider than 148px**.

`--plate` survives as a token because the skip link still uses it. `.brand-plate` also
survives, but purely as the transform hook for the hover lift — **it must stay
visually inert**. Give it a background, padding or a radius and the box the client
rejected comes straight back.

**Flag for the client:** this is a recolour of the supplied mark, which the original
law banned outright. It was the only way to satisfy the instruction. If they want the
mark untouched instead, the ask is an **officially supplied light-background version**
of the logo — that is a client deliverable, not something to solve in code.

### 2. Text law — the complete allowlist
The client's brief bans body copy, but carves out text "explicitly required by the
supplied storyboard or explicitly provided by me". The storyboard's pain and solution
lines meet BOTH conditions (2026-08-16: "tell the pain points faced by each business
vertical and how our AI is solving it"). So these strings, and only these, are the
brand-visible text on the site. A line that is not on this list is a defect.

**The list is closed, but the client can open it.** That second clause, "explicitly
provided by me", is the only door in. `Free Audit` came through it on 2026-08-16 and
is listed below because of that, not as an exception to the law. Anything the client
asks for in writing is admitted the same way and gets added here at the same time.
Nothing else is.

**The same door works in reverse.** `You run the business. / We run what moves it.`
was the hero heading until 2026-08-16, when the client supplied
`Move faster. / Spend less. / Look sharper.` to replace it. The old pair is now OFF
the list and off the page — including `og:description`, which carried it. If it
appears anywhere again, that is a defect, not nostalgia. `Strategy. Systems. Growth.`
was NOT part of that swap and still sits under the new heading.

```
Move faster.
Spend less.
Look sharper.
Strategy. Systems. Growth.

MARKETING              → Too much activity. Not enough impact.
SALES                  → Leads everywhere. Follow-up nowhere.
OPERATIONS             → Requests never stop. Agents overwhelmed.
HR SOLUTIONS           (label only)
CUSTOM SOLUTIONS       (label only)
CUSTOMER SUCCESS       (label only)

SMART MARKETING        → Smarter campaigns. Better results. Less effort.
AI-POWERED SALES       → Research. Reach out. Close more. On autopilot.
ALWAYS-ON OPERATIONS   → Instant answers. Happy customers. No missed request.

ONE BUSINESS. ONE INTELLIGENT SYSTEM.
All connected. All aligned. All accelerating.

You don't worry about the functions.
We take care of the strategy.
Intelligence that runs your business. So you can lead it.

Free Audit
Build Your Intelligent Business
technoon.ai
```

No other copy. No "Learn more", no "Explore", no lorem ipsum, no filler.

**FINANCE was removed entirely on 2026-08-16** at the client's instruction. It is gone
from the allowlist, the spine, the dock, the 3D medallion count and the contrast audit.
Do not reintroduce it as a label, a chip or a card.

**OUTSTANDING, and the only thing on this page waiting on the client:** HR SOLUTIONS,
CUSTOM SOLUTIONS and CUSTOMER SUCCESS are label-only in the storyboard, so their
function cards have no offering copy of their own. They currently reuse the approved
closing line. The client chose on 2026-08-16 to supply a real pain line and solution
line for each. When those arrive they drop straight into the three `.detail-panel`
blocks in `index.html` and go on the list above. Until then, do NOT write copy for
them; that is the zero-hallucination law, not a formatting preference.

Permitted non-brand text, because the site would be broken or inaccessible without
it: `<title>`, the meta description, the skip link, visually-hidden screen-reader
copies of split headlines, `alt` attributes, `aria-label`s, and `© 2026 technoon.ai`.

### 3. Spelling law
The brand is **always** `technoon.ai`. Never Technoon, Technoon AI, Technoon.ai,
TechNoon. Zero spelling mistakes anywhere. Re-run the audit under Verification after
any copy change.

### 4. Zero-hallucination law
Never invent customers, partners, awards, certifications, testimonials, statistics,
case studies, integrations, or ROI figures.

**Decided 2026-08-16:** the storyboard's results panel (+128% revenue, +156% sales,
+78% efficiency, 8.6x ROI) is **omitted** by client decision, because those numbers
are unverified. If real verified figures ever arrive, that is the one place they may
go. Third-party marks in the storyboard (Instagram, Facebook, LinkedIn) are **not**
reproduced either: they are other companies' trademarks and the brief bans logos in
generated media. Abstract card and tile shapes read the same at a glance.

### 5. AI-media law
Generated imagery and video must contain **no** text, lettering, signage, readable
UI, or logos. Every generation prompt ends with an explicit ban. All real text is
rendered in HTML/CSS/SVG so it stays perfectly sharp and correctly spelled.

---

## The room (fixed, non-negotiable)

Client instruction 2026-08-16: **"same exact office space, no deviation."** The room
is defined by `brief/storyboard-hero.png` and realised in `review/room-sd-1.jpg`,
which is the video's start frame. Its fixed inventory:

- **Left:** bare warm mid-grey feature wall, white lacquered L-shaped reception
  counter with a slim silver monitor, black mesh task chair and a small plant, a pale
  grey sofa with a round chrome-legged side table at the far edge, warm LED strip
  along the wall base.
- **Centre:** polished light-grey floor with long reflections, floor-to-ceiling city
  window wall, two palms in white cylindrical planters, grey lounge armchairs.
- **Right:** glass-walled conference room, slim dark frames, graphite table, about ten
  grey mesh chairs, a **blank** wall display, floor lamp and plant at the far edge.
- **Ceiling:** white with recessed linear warm-white cove strips.

The wall and the display stay **bare** in every generation. The real logo is never
generated into a shot; it lives in HTML only.

Known drift, accepted: in sequence 2 the left wall returns as textured stone rather
than flat plaster. Texture identity does not carry across an AI generation. It is not
visible at the seam (the join happens inside the white void, four seconds before the
wall reappears) and sits at the frame edge.

---

## Design system

**Direction: "The Pearl Floor."** One room, the storyboard's room, that the camera
travels forward through while it fills with overload, freezes, and is then rebuilt as
an ordered system. Light theme throughout. Never converted to dark.

**Legibility is INVERTED here, and this trips people up.** The world is bright,
high-key, near-white, and the type is dark ink. So every scrim is a *light pearl
wash*, never a dark one, and the text shadow is a light halo. The worst-frame audit
hunts the **darkest** pixel under the text, not the lightest.

**Signature element: the light ribbon.** A wide, soft, flowing band of light grading
cyan to violet to magenta that threads the business functions together. It is lifted
straight from the storyboard's rows 3 and 4, where it is the device that visually
links the functions. It carries the whole boldness budget; everything else stays
quiet.

**Where the ribbon may appear, after 2026-08-16:** the hero rule, the `.ghost` dot,
and the left edge of each card in the reduced-motion static cut (§13b — the phone
cinematic cut has no cards to edge, so the hero rule is the only ribbon a phone
sees). That is the list. The blurred band that used to cross
behind the dock pills was removed the same day, because at that size and blur it
stopped reading as a thread joining the functions and started reading as a stray
purple shape parked in the middle of the frame. The lesson generalises, and it is the
same one the dot ring taught: **on this page the ribbon works as a crisp, deliberate
mark and fails as a soft floating glow.** Do not reintroduce it as ambient haze.

**An earlier build used a dot ring as the signature and the client rejected it**
("why are you focusing too much on the ring? Exclude the ring"). The ring geometry now
appears exactly once, inside the footage at the AI Moment of Truth, and is never
reused as a motif. Do not reintroduce it as a HUD, a marker, an orbit, or a section
device.

**Palette** (sampled from the storyboard, not invented):

| Token | Hex | Use |
|---|---|---|
| `--pearl` | `#F2F4F8` | page canvas. Never pure `#fff`. |
| `--pearl-2` | `#E8ECF4` | recessed surfaces |
| `--ink` | `#0E1330` | primary type |
| `--ink-soft` | `#2A3154` | secondary type |
| `--slate` | `#5A628A` | tertiary, small labels |
| `--violet` | `#6C4CE0` | primary accent — rare doses only |
| `--cyan` | `#35B8F2` | ribbon cool end |
| `--magenta` | `#C64BE8` | ribbon warm end |
| `--plate` | `#080918` | the logo badge, sampled from logo-source.jpg |

The accent appears only on: the word "moves", the word "strategy", the kickers, the
CTA, focus rings, the hero rule, the ribbon, and the lit chain chips. Nowhere else.

**Type** — two faces only, because the site carries a short fixed set of strings and
a third face would be decoration.
- Display: **Familjen Grotesk** (500, 700) — headings, labels, kickers, the CTA
- Body: **Hanken Grotesk** (400, 500) — the sublines and the footer

Never Inter or Roboto as display.

---

## The scroll spine — sixteen beats

One pinned sticky stage owns **1800vh** of scroll. Progress 0→1 drives the video, the
3D camera and the caption bands together. No hard section breaks. Minimum band width
is 0.055 of progress, which is about 94vh, so every beat survives roughly 7 to 8
normal scroll flicks.

| Progress | Beat | Visible text |
|---|---|---|
| 0.000–0.058 | BUSINESS. The office. | `Move faster. Spend less. Look sharper.` + `Strategy. Systems. Growth.` |
| 0.058–0.120 | FRAGMENTATION | `MARKETING` + its pain line |
| 0.120–0.185 | FRAGMENTATION | `SALES` + its pain line |
| 0.185–0.250 | FRAGMENTATION | `OPERATIONS` + its pain line |
| 0.250–0.323 | CHAOS | `HR SOLUTIONS` |
| 0.323–0.397 | CHAOS | `CUSTOM SOLUTIONS` |
| 0.397–0.470 | CHAOS | `CUSTOMER SUCCESS` |
| 0.470–0.530 | BOTTLENECK, maximum overload | none |
| 0.530–0.575 | **THE STOP.** Everything freezes. | none |
| 0.575–0.640 | AI ACTIVATION. The core forms. | none |
| 0.640–0.700 | THE SPATIAL SPLASH | none |
| 0.700–0.760 | AFTER | `SMART MARKETING` + its line |
| 0.760–0.820 | AFTER | `AI-POWERED SALES` + its line |
| 0.820–0.880 | AFTER | `ALWAYS-ON OPERATIONS` + its line |
| 0.880–0.945 | CONNECTED SYSTEM, ACCELERATION | `ONE BUSINESS. ONE INTELLIGENT SYSTEM.` + all six chips |
| 0.945–1.000 | technoon.ai. The closing vortex. | closing lines + `Build Your Intelligent Business` |

Layout rule that keeps the beats distinct: pain beats sit on the **left rail**, the
three chaos labels sit in **three different quadrants**, the resolution beats sit on
the **right rail**, and the chain and close are **centred**. The mirrored side plus a
calm entrance instead of an agitated one is how before-and-after is expressed
structurally rather than announced in words.

The chaos labels were pulled **inboard off the rail** on 2026-08-16 (`pos-a` to
`pos-c` in app.css) because at the frame edge they sat in the reader's periphery
through the fastest stretch of the scroll. Their type size and depth are unchanged
from the storyboard: bigger was tried the same day and rejected. Note that moving a
caption moves the footage under it, so `review/verify-contrast.sh` carries its own
crop window per beat and those windows moved too.

### The phone runs the same film — this is not a separate build

Client instruction 2026-08-16: *"the mobile is completely different from what you
have made … I want to see the exact scroll-driven website, the scrolling effect that
we are seeing on the desktop, on the mobile as well."*

They were right and the old build had earned it: every phone matched the static-hero
gate, which disarmed the scrub, unpinned the stage, hid the video and stacked the
sixteen beats as pearl cards. A reader on a phone was looking at a different product.

**What is shared, and must stay shared:** the pinned sticky stage, the 1800vh spine,
all sixteen band boundaries, `VIDEO_MAP`, the scrubbed 30s footage, the split-text
entrances, the wave, the dock and both dialogs. There is **one** spine and one drive
loop. A change to any of it changes both cuts.

**What `app.css` §13 reframes for a tall narrow window, and only this:**

- the left and right rails give up their horizontal OFFSET but keep their
  ALIGNMENT — which is the thing that still reads pain from resolution;
- the three chaos beats trade three quadrants for three distinct HEIGHTS
  (21vh / 46vh / bottom 19vh), because a narrow frame has thirds to spend
  vertically and none across;
- the type grows, because the frame shrank;
- `.band::before` widens to `-20vh -26vw` and deepens to .94/.80, because the
  footage now fills a much tighter window behind much larger words;
- `.journey` is re-declared in **`svh`**. On a phone `vh` is the LARGE viewport
  and stays frozen there while the URL bar collapses, but `.stage` is already
  `100svh` — so the spine and the pinned frame would be measured against two
  different heights and the scrub would drift against the film.

**The static stacked cut still exists** in §13b, and it now belongs to
`prefers-reduced-motion: reduce` **alone**. That is the only reader who ever asked
not to be moved. `GATES` in `app.js` is down to that one query to match.

Three things that make the film actually paint on a phone and are easy to delete by
accident, all in `app.js`:

- **The iOS decode unlock.** iOS holds a `<video>` undecoded until it has played at
  least once. The symptom is vicious because nothing errors: `currentTime` moves,
  `seeked` fires, the seek gate stays healthy, and the element paints nothing —
  a phone scrolling through an invisible film. One muted `play()`/`pause()` on the
  first `touchstart` hands it the gesture it wants. It is wired **both ways** (the
  listener unlocks if the video is already there, `canplay` unlocks if the reader
  got there first) because those two can land in either order.
- **The metered-connection bail.** `saveData` or a 2g `effectiveType` skips the
  12MB download and lands on `failVideo()`. The journey still runs; the ROOM falls
  back from footage to poster, which is exactly where the load watchdog already
  lands.
- **Lenis `syncTouch` stays OFF.** Touch scrolling is native, Lenis's
  `onNativeScroll` re-syncs and re-emits, and `onScroll` fires either way. Turning
  `syncTouch` on would hand iOS momentum to a JS lerp and it feels worse, not
  smoother — the scrub already has its own lerp on `shown`.

### The scroll-to-video curve is piecewise, not linear
`VIDEO_MAP` in `app.js` pins each band to the footage moment it belongs to. The
footage has its own narrative clock (office 0-3s, fragmenting 3-7s, chaos 7-11s,
freeze 11-13s, core 13-15s, activation 15-18s, wave 18-22s, connect 22-26s,
accelerate 26-28s, converge 28-30s). A linear map slid every caption off its moment
and rushed the freeze, which is the beat the whole story turns on. **If you change a
band boundary, change its VIDEO_MAP anchor too.**

---

## The cinematic core

Two 15-second silent Seedance 2.5 clips, chained and concatenated into **one**
30-second file with a single encode, so the join cannot mismatch.

- Model: `bytedance-seedance-pro-2.5` via the Magnific MCP
- **720p, 16:9, silent** — 6,600 credits per clip
- 1080p was priced at 16,500/clip = 33,000 for two, over the account balance. Client
  chose 720p to keep the requested model plus re-roll headroom.
- Sequence 2 starts from sequence 1's final frame, extracted as a full-quality PNG
  (`-q:v 1`), never a review-grade jpg. The seam was verified frame by frame across
  14.6s to 15.5s and is invisible.
- Encode: `-c:v libx264 -crf 21 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p
  -movflags +faststart -an`. Result: 11.6 MB, 30.08s. The short keyframe interval is
  what makes scrubbing smooth; do not lengthen it.

720p is acceptable **because of where the footage sits**: it is the environment layer
behind pearl scrims and the 3D canvas, never a sharp full-bleed surface. The
foreground is real-time WebGL and HTML type, both razor sharp at any resolution.

### The 3D layer is BUILT and currently OFF

`scene.js` is complete, parses, and exports `createScene()`. It is not running.
`const SCENE_3D = false` in `app.js` is the whole switch; flip it to `true` and the
layer comes back with nothing else to change.

It was switched off on 2026-08-16 at the client's call. The drifting tinted objects
read as "purple shape things coming in the middle of things" rather than as the
business artifacts they were built to be. That is a taste verdict on the execution,
not on the idea, which is why this is a flag and not a deletion.

The original reasoning still stands and is worth keeping in view if the layer is ever
revived: cards, envelopes, chat bubbles and notification pips belong in 3D rather than
in the footage, because AI video hallucinates fake brand logos and garbage text all
over that content, which would break the AI-media law. If the layer comes back, it
comes back **untinted** unless the client says otherwise, and `MEDAL_COUNT` in
`scene.js` must keep matching the number of `.chain-item` pills in `index.html`.

Nothing structural depends on it. Every beat it illustrated is already in the footage,
which is why the story reads end to end with the canvas dark. What the page gives up
is the sharp, scroll-reactive artifacts; the footage carries those beats at 720p
instead.

---

## Interaction: the dock and the function card

The only interactive things in the story are the function names. Everything else is
scroll.

**The dock.** The six pills in the CONNECTED SYSTEM beat magnify under the pointer the
way macOS task bar icons do: the pointed-at pill takes the full pop and its neighbours
take a decaying share, which is what makes the row feel like one elastic surface
rather than six separate buttons. `:has()` reaches backwards to the pills before the
hovered one, the sibling combinator reaches forwards. This is the client-requested
"glassmorphic MacBook task bar pop up" and it is the one place on the page that
carries a glass material, because it is the one thing that is genuinely a dock.

**A glass plate behind each caption was tried on 2026-08-16 and rejected.** Wrapping
the pain, chaos and resolution beats in white glass cards was the literal reading of
the same request, and it turned a cinematic frame into a component gallery. Client:
"I do not want that white background, it's looking odd." The `.glass` wrapper survives
in the markup as `display: contents`, a pass-through with no box at all, so each beat
keeps one hook. **It must stay visually inert.** Give it a background, a padding, a
backdrop filter or a transform and the boxes come straight back.

**The function card.** Every function surface carries `data-fn` and opens one native
`<dialog>`, which supplies the focus trap, Escape, the top layer and the inertness of
the page behind it. Six panels live in `index.html` rather than in a JS object,
specifically so the spelling and stock-word audits still see every string.

**The booking card.** Every CTA on the page — `Free Audit` and all four
`Build Your Intelligent Business` buttons — opens Cal.com in a second native
`<dialog>`, driven by `assets/cal.js`. Ported on 2026-08-16 from the previous
technoon.ai site, which used the same account and the same 30-minute event:
`https://cal.com/sudeshna-pal-ruww5f/technoon.ai`.

Three things about it are load-bearing and were changed from the original:

- **The triggers are `<a href>` pointing at the booking page, carrying `data-cal`.**
  `cal.js` delegates off that attribute and calls `preventDefault()`. That ordering
  IS the fallback: if the module fails to load, or the browser has no `showModal`,
  the same click still reaches the same booking page the long way round. Turning
  these into `<button>`s throws that away for nothing.
- **The iframe ships with no `src`.** `cal.js` assigns one the first time somebody
  opens the card. The old site rendered the iframe on every page load whether or
  not anyone ever booked, which is a third-party connection nobody asked for on a
  page already carrying a 12MB film. Do not helpfully put a `src` back in the HTML.
- **It stops Lenis and pins the document together**, exactly as `detail.js` does and
  for the same reason. The original only set `body.style.overflow`, which is enough
  on an ordinary page and not enough over an 1800vh scroll-driven film. It reuses
  the `html.detail-open` class rather than inventing a second one, so the two cards
  cannot fight over the pin.

Deliberately NOT `preserve-3d`, unlike the function card: an iframe inside a 3D
context renders inconsistently across browsers, and there is nothing to give depth
to — the panel is a window onto someone else's page. Flat is also what lets this
one own a scroller safely.

**The event title lives in Cal.com, not in this repo, and it is currently spelled
`Technoon.ai`.** That breaks the spelling law and neither the audit nor any code
here can see it or fix it. It has to be renamed to `technoon.ai` in the Cal.com
dashboard. Same for anything else Cal.com renders: that surface is outside the text
allowlist's reach, so it is governed by hand.

## Engineering rules that earned their place

- **Fetch the video as a streamed Blob**, not a plain `src`. Many hosts lack HTTP
  Range support, and without it every seek clamps to zero: scrubbing works locally
  and silently dies live. Stream it behind the progress ring with a 20-second
  no-progress watchdog that aborts into the still-image fallback.
- **Gate every seek.** Never write `currentTime` while a seek is in flight. Coalesce
  to the newest target, issue exactly one follow-up on `seeked`, and reset the busy
  flag on `error` so the gate cannot deadlock.
- **Lerp the displayed time** in a rAF loop that goes idle when converged and when
  the hero is off-screen. Use the frame-rate-independent form
  (`1 - Math.pow(1 - k, dt / 16.667)`), or the site feels different at 120Hz.
- **Write to the DOM only on change.** Delta-gate every band opacity, `--k` and chip.
- **The page must be complete and beautiful if the video never loads.** Test it by
  renaming the file.
- **`scene.js` is imported dynamically, never statically.** A static
  `import { createScene } from './scene.js'` makes the whole drive loop hostage to
  the 3D layer: if that file is missing or throws at module scope, `app.js` never
  evaluates and the page loses its captions and its scrub too. The `try/catch`
  around `createScene()` cannot save that, because it guards the call, not the
  import. Same law as the video: any layer may fail alone.
- **`detail.js` follows the same rule, and CSS is what closes the loop.** It is
  imported dynamically and it alone adds `.detail-ready`. Every pointer cursor and
  hover underline hangs off that class, so a module that never loads leaves plain
  words rather than words that look clickable and do nothing.
- **Never transition a transform that also carries a scroll-driven term.** A dock
  pill's transform holds both the `--lit` rise written every frame by the wave and
  the hover pop. `transition: transform` would put a third of a second of lag
  between the scroll and the light. `--pop` and `--rise` are registered with
  `@property` and transitioned instead, which leaves the `--lit` term instant.
  Browsers without `@property` snap the pop, which still reads correctly. The same
  trap applies to `box-shadow` and `background` on those pills: both interpolate
  `--lit`, so neither may be transitioned. The hover glow is a separate `::after`
  for exactly that reason.
- **A grouping property silently flattens `preserve-3d`.** `backdrop-filter`,
  `filter`, `opacity` below 1 and `mask` all force `transform-style: flat`, which
  would collapse the function card's depth layers into a single plane and quietly
  throw away the 3D. That is why `.detail-card` carries none of them and the
  frosting lives on `::backdrop` and on a sibling pane instead.
- **`showModal()` blocks interaction with the page behind it but not scrolling.**
  Behind this dialog is an 1800vh scroll-driven journey, so a wheel flick over the
  veil scrubs the film underneath and drops the reader somewhere they never chose.
  `detail.js` stops Lenis and pins the native scroller together; releasing one
  without the other is worse than releasing neither.
- **The poster image is declared in CSS, not assigned by JS.** `initHeroOnce()`
  only runs inside `enableScrub()`, so any cut that disarms the scrub — now
  reduced motion, and before 2026-08-16 every phone — would otherwise render
  the beats on blank pearl with no room behind them. The room is the premise of
  the page; it cannot depend on the scrub being armed.
- **Seed `body.paused` at boot, not only on `visibilitychange`.** That event fires
  on change only, so a page opened into a background tab (middle-click, restored
  session, prerender) never receives the class and burns every CSS animation
  while nobody is watching.
- **Specificity trap, and it now bites in BOTH cuts.** The chaos beats are
  addressed as `.band--fn.pos-a` to `.pos-c`, which is a two-class selector and
  therefore OUT-SPECIFIES a bare `.band` reset. §13 (the phone cut) re-aims
  them with two-class selectors of its own for exactly this reason. §13b (the
  static cut) instead makes the offsets inert with `position: static` plus
  `inset: auto !important`; without those, the desktop quadrant offsets survive
  and shove each card off the screen edge. `text-align: right` on `.pos-b`
  survives the same way and has to be named explicitly in §13b, and so does its
  underline origin. Anything one-class (`.band--pain`, `.band--fix`) is fine
  because both blocks simply come later in the file. **If a fourth position ever
  returns, it joins all of those lists.**
- **`.band { padding }` belongs to §13b only.** It is the static cut's card
  inset. In the phone cinematic cut the beats are captions floating in a room
  with no box around them, and a padding there pushes the type in off a gutter
  it is already sitting on. It used to live in the bare `@media (max-width:
  400px)` block, where it reached both.
- **`.brand-plate` must stay visually inert**, for the same reason `.glass` must:
  it is a transform hook, not a surface. A background on it is the dark logo box
  the client removed, coming back.
- **`border-image` replaces all four borders**, not just the one you declared a
  width for. The mobile ribbon edge is painted as a background layer instead, or
  every card ends up ringed in gradient.
- **Static-hero gate: the query list is character-for-character identical in the
  CSS (§13b) and the JS (`GATES`)**, re-evaluated live on preference flips. It is
  down to ONE query, `(prefers-reduced-motion: reduce)`, since the phone cut
  landed. If the two sides ever drift, the CSS un-hides a stage the JS never
  armed and the hero goes blank.
- Splitting text: measure the string BEFORE clearing the element, or every character
  threshold collapses to the same value and the stagger silently dies.
- WebGL: DPR capped at 2, no post-processing, no allocations inside `update()`,
  instanced everything, rAF paused off-screen and on hidden tabs.
- `overflow-x: clip` on both `html` and `body`, with `hidden` declared first.
- Reduced motion honoured **live and in both directions**.

---

## Verification

Run all of this before calling any change done.

```powershell
cd C:\Users\ASUS\Desktop\technoon2
# Spelling: the grouped output must show ONE row, "technoon.ai"
(Select-String site\index.html -Pattern "[Tt]echnoon[\w.]*" -AllMatches).Matches.Value | Group-Object | Select Count,Name
# Banned variants: must return nothing. -CaseSensitive is REQUIRED here.
# Select-String is case-insensitive by default, so without it every correct
# lowercase "technoon.ai" reports as a violation and the check is worthless.
Select-String site\index.html -CaseSensitive -Pattern "Technoon|TechNoon"
# Stock words and em dashes: must return nothing except the CUSTOM SOLUTIONS label
Select-String site\index.html -Pattern "—|leverage|seamless|empower|unlock|robust|actionable|data-driven"
# ESM parse check, since there is no bundler and a syntax error kills the page
Copy-Item site\assets\app.js $env:TEMP\c.mjs -Force; node --check $env:TEMP\c.mjs
Copy-Item site\assets\scene.js $env:TEMP\s.mjs -Force; node --check $env:TEMP\s.mjs
# The scroll spine, checked deterministically against the real index.html.
# Must end "RESULT: PASS". Run this after ANY band boundary or VIDEO_MAP change.
node review\verify-spine.mjs
# Worst-frame legibility, sampled from the real footage. Must end PASS.
bash review\verify-contrast.sh
```

`review/verify-contrast.sh` samples the footage at each caption's own moment,
takes the **darkest** pixel in that caption's rail, blends it under the band
scrim the way the browser does, and reports the contrast against `--ink`.

It runs **two passes** since the phone cut landed, and the second one is not a
formality. A 375x812 portrait slot showing a 1280x720 plate under `cover` keeps
only 332 source pixels of width, columns 474–806 — two thirds of every frame the
desktop pass checks is simply not on screen on a phone, and the darkest pixel in
the part that IS on screen is a different pixel. The phone pass also audits at
its own scrim's .80 shoulder rather than its .94 centre.

As of 2026-08-16: worst desktop caption **9.84:1**, worst phone caption
**10.78:1**, against a 4.5:1 bar. Re-run it if a scrim alpha, a rail position,
a phone band height or the footage ever changes.

`review/verify-spine.mjs` replicates `updateBands()` and `videoTimeFor()` exactly
and sweeps p from 0 to 1. It proves four things a browser cannot show you
reliably: every band reaches full opacity and holds a real plateau (currently 49
to 75vh each), no two captions are ever readable at once, all four text-free
beats are genuinely silent, and the video clock never runs backwards. Prefer it
over eyeballing the page — a backgrounded tab pauses `requestAnimationFrame`
entirely, so scrubbing by script in an unfocused window reports stale band state
and invents defects that are not there.

Then: zero console errors at desktop and phone widths, no horizontal overflow at
375px, reverse scrolling works, no stuck animations, every band readable at 120, 240
and 360px flick steps, reduced motion honoured in both directions, and the page still
complete with the video removed.

**Mobile responsiveness is a standing client requirement**, not a follow-up task.
Verify at 375px before reporting anything done — and since 2026-08-16 that means
verifying the *film*, not a layout: the beats must advance, the footage must
scrub, and the three chaos beats must land at three different heights.

Practical note for checking the phone cut: Chrome's window often refuses to
resize below the OS minimum. Loading `/index.html` into a **375x812 iframe**
inside the page is a faithful substitute — media queries resolve against the
iframe's own viewport. Drive it with a real wheel `scroll` over the iframe, not
`scrollTo` from a tool call: the same `requestAnimationFrame` stall CLAUDE.md
warns about for `verify-spine` applies here, and a scripted jump in an unpainted
tab reports stale band state and invents defects that are not there.

---

## Decisions log

- **2026-08-16** — Project started fresh in `technoon2`. No code carried over from any
  previous technoon work.
- **2026-08-16** — Client chose: Seedance 2.5 at 720p for both clips; logo ships as
  the supplied JPEG with zero deviation; all claimed business results dropped.
- **2026-08-16** — Stack: vanilla HTML/CSS/JS with Three.js, GSAP + ScrollTrigger and
  Lenis vendored locally. Chosen so the brief's 3D and motion requirements are met
  while the site stays a no-build-step static folder.
- **2026-08-16** — Video scrub is hand-rolled rAF rather than ScrollTrigger's `scrub`,
  because ScrollTrigger's per-frame writes fight the seek gate. GSAP drives the DOM
  choreography below the fold; Lenis drives smooth scroll.
- **2026-08-16** — **"Same exact office space, no deviation."** The first start frame
  and first sequence 1 render were a generic glass corridor and were discarded (6,750
  credits, sunk). The room was rebuilt from `brief/storyboard-hero.png` used as a
  generation reference; `review/room-sd-1.jpg` won across four takes.
- **2026-08-16** — **The dot ring was rejected as the site's signature.** Replaced by
  the storyboard's light ribbon. The ring survives only as the one-time AI core inside
  the footage.
- **2026-08-16** — **Story locked to the storyboard's own sequence** with every
  function given its own beat, per the master prompt's sections 10 to 17.
- **2026-08-16** — **FINANCE removed entirely**, client instruction. The three
  remaining chaos beats re-span 0.250 to 0.470 rather than leaving a dead stretch,
  so their `VIDEO_MAP` anchors, the dock `data-w` weights, `MEDAL_COUNT` in
  `scene.js` and the contrast crops all moved with them.
- **2026-08-16** — **The macOS dock pop was adopted; the glass caption plates were
  rejected.** Same client request, two readings. The dock magnification on the pill
  row was right; wrapping every caption in a white glass card was wrong and looked
  like a component gallery. See the Interaction section.
- **2026-08-16** — **Function names are clickable and open a native `<dialog>`**
  carrying that function's pain and solution lines. Copy for the three label-only
  functions is outstanding with the client.
- **2026-08-16** — **The 3D layer was switched off** with `SCENE_3D = false` after
  the client read the drifting tinted objects as stray purple shapes. Built, kept,
  one flag away from returning.
- **2026-08-16** — **The ribbon glow behind the dock pills was removed** for the
  same reason. The ribbon stays only where it is a crisp mark.
- **2026-08-16** — **The Cal.com booking card was ported from the previous
  technoon.ai site** and wired to all five CTAs, which retired the `#build` hrefs.
  Two of those were dead self-links (the arrival and detail-card CTAs pointed at
  the section they already sat in). `#build` is still the narrative arrival
  section, it just is not a link target any more. See the Interaction section for
  the three things that changed from the original and why.
- **2026-08-16** — **The phone now runs the same film as the desktop.** The
  static-hero gate lost its four phone queries; `GATES` and app.css §13b are down
  to `prefers-reduced-motion` alone. app.css §13 reframes the same spine for a
  tall narrow window rather than replacing it. Added with it: the iOS decode
  unlock, the `saveData` bail, `.journey` in `svh`, and a second phone pass in
  `review/verify-contrast.sh`. See "The phone runs the same film".
- **2026-08-16** — **The logo's dark plate was removed**, client instruction. This
  is the only one of the five laws that has moved, and it moved because it had to:
  a near-white mark on a near-black card has no reading on a pearl page without a
  colour flip, so the choice was a box the client rejected or a recolour the
  original law banned. Ships as `logo-mark.png`. The supplied original is kept
  untouched. Flagged back to the client — the clean fix is an official
  light-background mark. See the Logo law.
- **2026-08-16** — **The hero heading became `Move faster. / Spend less. / Look
  sharper.`**, client-supplied, replacing `You run the business. / We run what
  moves it.` The old pair is off the allowlist and off the page. The accent sits
  on the last word: three parallel lines, so the eye should run the whole promise
  and land on the payoff rather than stop in the middle.
- **2026-08-16** — **`review/verify-spine.mjs` had a stale `VIDEO_MAP`** — still on
  the pre-FINANCE-removal 0.305/0.360/0.415 anchors. Harmless to its pass/fail, but
  it made the freeze report describe a spine the site does not have. Resynced.
- **2026-08-16** — **`Free Audit` added to the nav and to the text allowlist**,
  client-provided, under the brief's own "explicitly provided by me" clause. The
  primary CTA was reworked for depth: a diagonal grade, a lit top edge and a shaded
  bottom one, and one slow specular sweep on hover.

## Credit ledger

| Item | Credits |
|---|---|
| Start balance | 26,569 |
| 2 corridor frames (discarded) | -150 |
| 4 storyboard-room frames (2 models) | -300 |
| Sequence 1, corridor room (discarded) | -6,600 |
| Sequence 1, correct room | -6,600 |
| Sequence 2 | -6,600 |
| **Remaining** | **6,319** |

A 15-second Seedance 2.5 clip at 720p costs 6,600, so **no further clip is affordable
at that setting.** If more footage is ever needed: 480p/15s is 3,000, Seedance 2.0
Mini at 720p/15s is 2,100. Everything still outstanding is 3D, CSS and DOM, which
costs nothing.
