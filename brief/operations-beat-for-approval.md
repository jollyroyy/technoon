# A fourth chaos beat — OPERATIONS, in the film, just after HR SOLUTIONS

Requested 2026-08-17: *"add a catchy heading on operations just after HR solutions
as clickable heading."*

Nothing here is on the page yet. The text law says every visible line comes from
you, so this is a menu, not a draft that ships if nobody objects. **Pick a row and
it goes live the same session.**

---

## 1 · What the beat is

A fourth label in the CHAOS stretch of the scroll film, sitting between
`HR SOLUTIONS` and `CUSTOM SOLUTIONS`, in its own quadrant of the frame at its own
depth — exactly like the three already there. The heading is a button: clicking it
opens the OPERATIONS function card, the same one every other Operations surface on
the page opens.

Worth saying plainly, because it may or may not be what you intended: **OPERATIONS
already has a beat**, the pain one at 0.185–0.250, which lands immediately *before*
HR SOLUTIONS. So this adds a second Operations moment a few flicks after the first.
That reads well if the new one is a *different angle* on Operations — the front desk
rather than the back office — and reads as a repeat if it is just the word
`OPERATIONS` again. Every candidate below is written to be the different angle.

---

## 2 · The candidates

| # | Heading | Sub-line | Status of the copy |
|---|---|---|---|
| **A** | `AI RECEPTIONIST` | Every call picked up. Every message logged. | **Already approved.** Both strings are on the allowlist verbatim — it is the offering you added to OPERATIONS on 2026-08-16, and its own line. Ships with no new copy at all. |
| **B** | `THE FRONT DESK` | Every call picked up. Every message logged. | Heading is new. Sub-line is approved. |
| **C** | `NOTHING DROPPED` | Every ask logged, routed, answered. | Heading is new. Sub-line is approved (`Request Intake`). |
| **D** | `ALWAYS ON` | Instant answers. Happy customers. No missed request. | Heading is new, and it half-echoes the approved `ALWAYS-ON OPERATIONS` further down the film, so the two would want to be heard as deliberate rather than as a duplicate. |

**Recommendation: A.** It is the only one that needs no approval beyond this note, it
is the most concrete thing Operations does, and "AI Receptionist" is the single
offering on the whole page a business owner recognises instantly. B is the same idea
with a warmer name if you want the beat to sound less like a product.

You can also send your own line; the table is a starting point, not a shortlist.

---

## 3 · What it costs to build (so the choice is informed)

The film is sixteen beats over a fixed 1800vh, and every caption has to hold a real
plateau of 49–75vh or it flashes past. A fourth chaos beat cannot be squeezed into
the existing 0.250–0.470 stretch: four beats there would be 0.055 wide each, which is
a 41vh plateau, under the floor. So the spine moves:

```
                        now                    proposed
pain beats     0.058 – 0.250  (3 x .064)   0.058 – 0.238  (3 x .060)
chaos beats    0.250 – 0.470  (3 x .073)   0.238 – 0.500  (4 x .0655)  <- the new one
bottleneck     0.470 – 0.530                0.500 – 0.530
```

Plateau at 0.0655 wide is ~60vh, comfortably inside the band. The cost is paid by the
BOTTLENECK moment, the wordless maximum-overload beat, which shortens from 108vh of
scroll to 54vh. It carries no text, so nothing becomes unreadable; it just holds for
half as long before the freeze.

Touched together, or the film desyncs from the footage:

- `site/index.html` — the new band, plus every changed `data-a` / `data-b`
- `site/assets/app.js` — `VIDEO_MAP`, whose anchors pin each band to its second of footage
- `review/verify-spine.mjs` — its own copy of `VIDEO_MAP`
- `review/verify-contrast.sh` — the per-beat crop windows, since a new quadrant means
  a new patch of footage under new type
- `site/assets/app.css` — a fourth `pos-d` in **both** cuts (§13 and §13b); the
  three existing ones are a documented specificity trap and a fourth joins it
- `CLAUDE.md` — the sixteen-beat table becomes seventeen, and the allowlist gains the
  chosen heading

Both audits (`verify-spine.mjs`, `verify-contrast.sh`) get re-run and have to come
back PASS before it ships. Estimate: one session, no credits, no new footage.

---

## 4 · Open question, only if you pick B, C or D

Which quadrant. `pos-a`–`pos-c` currently take upper-left, right and lower-centre.
A fourth position depends on how long the heading is — `NOTHING DROPPED` and
`AI RECEPTIONIST` want different room — so the placement is decided after the wording,
not before.
