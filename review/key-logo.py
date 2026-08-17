"""Key the shipped mark off the supplied original. Nothing is redrawn.

Input : brief/logo-source-1672.png  — the client's 1672x941 file, supplied
        2026-08-17. It is named "without background" but it is an RGB file with
        the transparency CHECKERBOARD baked in as pixels: 20px squares of
        #FEFEFE and #F5F5F5. There is no alpha channel to keep.
Output: site/assets/logo-mark.png   — 1249x814 RGBA, the supplied art trimmed,
                                      with the checkerboard removed.
        site/assets/favicon.png     — the sphere alone, 128x128.

The wordmark in this original is already dark ink, so unlike the 640x640 file
there is NO colour flip. Every pixel that ships is the client's own.

How the key works, and why it is not a threshold:

- The background is KNOWN exactly — B(x,y) = 254 or 245 by checker parity — so
  this is an uncomposite, not a colour range: observed = art*a + B*(1-a).
- Two unknowns (art colour and a) per pixel, so the interior is settled first:
  a pixel more than 14 off B in any channel is fully opaque and IS its own art
  colour. Antialiased edge pixels then take the art colour of the nearest
  opaque pixel and solve for `a` by projecting (B - observed) onto (B - art).
  Assuming instead that the art's darkest channel is 0 — the mirror of what the
  640x640 key did against its black card — is wrong here: the wordmark's navy
  bottoms out at 14, so opaque type would come back at 94% alpha and the whole
  mark would sit washed toward the page.
- **The edge band is clipped to 3px around opaque art.** The checker's own
  square boundaries are 1-2px ramps between 254 and 245, which land inside the
  uncertain range and pick up a few percent of alpha. Without the band clip the
  entire 1672x941 frame comes back faintly opaque, the trim finds no edges, and
  the mark ships full-bleed with a ghost checkerboard in it.

Nothing fills holes. The gaps between the swirl's dots and the counters of the
letters are real background and are reachable from the frame edge anyway; a
hole fill would turn every letter counter into an opaque white blob.

Re-run only when the client supplies a new original:  python review/key-logo.py
"""

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

SRC = "brief/logo-source-1672.png"
MARK = "site/assets/logo-mark.png"
ICON = "site/assets/favicon.png"

SQUARE = 20          # checker square, px
LIGHT, DARK = 254.0, 245.0
OPAQUE = 14          # channel distance from B above which a pixel is art
BAND = 3             # px of antialias solved around opaque art


def key(src):
    obs = np.asarray(Image.open(src).convert("RGB")).astype(np.float64)
    h, w, _ = obs.shape
    yy, xx = np.mgrid[0:h, 0:w]
    parity = ((xx // SQUARE) + (yy // SQUARE)) % 2 == 0
    bg = np.where(parity, LIGHT, DARK)[..., None] * np.ones(3)

    opaque = np.abs(obs - bg).max(2) >= OPAQUE
    disc = np.hypot(*np.mgrid[-BAND:BAND + 1, -BAND:BAND + 1]) <= BAND
    near = ndi.binary_dilation(opaque, disc)

    # nearest opaque pixel's colour, for every pixel in the band
    _, idx = ndi.distance_transform_edt(~opaque, return_indices=True)
    art = obs[idx[0], idx[1]]

    v = bg - art
    a = np.clip(((bg - obs) * v).sum(2) / ((v * v).sum(2) + 1e-9), 0.0, 1.0)
    a[opaque] = 1.0
    a[~near] = 0.0

    rgb = np.where(opaque[..., None], obs, art)
    out = Image.fromarray(np.dstack([rgb, a * 255.0]).astype(np.uint8), "RGBA")
    return out.crop(out.getbbox())


def sphere_only(mark):
    """Crop the swirl out of the lockup. **There is no horizontal cut line that
    separates them** — the dot of the `i` rises beside the sphere's lowest dots,
    and the ascender of the `h` climbs past the sphere's bottom edge — so any
    row-based crop takes a slice of the wordmark with it. The separation is
    RADIAL instead, which is exact because the swirl is an annulus: every one of
    its dots is within one radius of its own centre, and the type is not.

    Two measurements, no hardcoded fractions of the canvas:

    1. A rough band, ending at the first row carrying ink in the left margin the
       sphere never reaches, is enough to locate the swirl's centre.
    2. The radius is the 99th percentile of ink distance from that centre. Not
       the maximum: the `i` dot sits inside the band at nearly twice the radius,
       and it is well under half a percent of the ink there.

    Everything outside that circle is then cleared, so the crop cannot carry a
    fragment of type no matter how the two overlap.
    """
    a = np.asarray(mark)[:, :, 3] > 8
    left = int(mark.width * 0.15)
    rows = np.nonzero(a[:, :left].any(1))[0]
    band = int(rows[0]) if len(rows) else mark.height

    ys, xs = np.nonzero(a[:band])
    cx, cy = xs.mean(), ys.mean()
    r = np.percentile(np.hypot(xs - cx, ys - cy), 99.0) * 1.02

    px = np.asarray(mark).copy()
    gy, gx = np.mgrid[0:mark.height, 0:mark.width]
    px[:, :, 3] = np.where(np.hypot(gx - cx, gy - cy) <= r, px[:, :, 3], 0)

    ring = Image.fromarray(px, "RGBA").crop(
        (round(cx - r), round(cy - r), round(cx + r), round(cy + r)))
    return ring.resize((128, 128), Image.LANCZOS)


if __name__ == "__main__":
    mark = key(SRC)
    mark.save(MARK, optimize=True)
    sphere_only(mark).save(ICON)
    print(f"{MARK}  {mark.size[0]}x{mark.size[1]}")
    print(f"{ICON}  128x128")
