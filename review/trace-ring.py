"""Trace the supplied mark's dot sphere out of brief/logo-source.jpg.

The client's instruction is "put the logo sphere exactly as given in the image".
The supplied sphere is NOT a set of clean concentric shells — it is a swirl:
five-ish shells that spiral, dots that grow toward the violet side, a sparse
scatter halo on the outside and a thin seam at the top right. Drawing that from
a formula gets the idea and loses the mark.

So this reads the real thing. It finds every dot in the 190x112 JPEG, recovers
its centre, radius and colour, and writes them out as geometry that can be
re-rendered crisply at any size. Nothing about the arrangement is invented; the
only thing added is sharp edges, which is what the JPEG cannot give.

Output: review/ring-dots.json  ->  consumed by review/gen-logo.py
Run:    python review/trace-ring.py
"""
import json
import os

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, 'brief', 'logo-source.jpg')

CROP = (55, 0, 136, 70)     # the sphere's box in the supplied 190x112 space
UP = 8                      # work at 8x: the dots are 2-3px in the original
MIN_SEP = 8.5               # in upsampled px — just under the tightest real spacing
FLOOR = 0.075                # below this a "dot" is JPEG ringing around a real one

# The supplied sphere's own colour axis, read off the raster: cyan sits at the
# left, magenta at the lower right. Dots whose sampled colour is too washed out
# to carry a reliable hue (the faint outer scatter, which JPEG turns grey) take
# their hue from this ramp instead of from noise.
RAMP = [(0.00, (0x35, 0xB8, 0xF2)), (0.36, (0x3E, 0x8B, 0xF0)),
        (0.66, (0x6C, 0x4C, 0xE0)), (1.00, (0xC6, 0x4B, 0xE8))]


def load():
    im = Image.open(SRC).convert('RGB').crop(CROP)
    big = im.resize((im.width * UP, im.height * UP), Image.LANCZOS)
    a = np.asarray(big, np.float32) / 255.0
    # the card colour: the darkest decile is all background
    lum = a @ np.array([.2126, .7152, .0722], np.float32)
    bg = a[lum <= np.percentile(lum, 10)].mean(0)
    return a, bg, lum


def peaks(sig):
    """local maxima, non-max suppressed at MIN_SEP, brightest first"""
    h, w = sig.shape
    r = int(MIN_SEP)
    ys, xs = np.nonzero(sig > FLOOR)
    order = np.argsort(-sig[ys, xs])
    ys, xs = ys[order], xs[order]

    taken = np.zeros((h, w), bool)
    out = []
    for y, x in zip(ys, xs):
        if taken[y, x]:
            continue
        y0, y1 = max(0, y - r), min(h, y + r + 1)
        x0, x1 = max(0, x - r), min(w, x + r + 1)
        if sig[y, x] < sig[y0:y1, x0:x1].max() - 1e-6:
            continue                                  # not the local peak
        taken[y0:y1, x0:x1] = True
        out.append((x, y))
    return out


def measure(sig, rgb, bg, x, y):
    """radius from the half-maximum footprint, colour from the dot's core.

    The window has to be wide enough for the fattest dot in the mark — the inner
    shells run 3-4 source px across — or every radius comes back clamped to the
    window and the whole sphere flattens into one dot size, which is precisely
    the character the supplied art has and a formula does not."""
    p = sig[y, x]
    r = int(MIN_SEP * 1.8)
    y0, y1 = max(0, y - r), min(sig.shape[0], y + r + 1)
    x0, x1 = max(0, x - r), min(sig.shape[1], x + r + 1)
    win = sig[y0:y1, x0:x1]
    yy, xx = np.mgrid[y0:y1, x0:x1]
    d2 = (yy - y) ** 2 + (xx - x) ** 2

    # grow outward from the peak only while the profile is still falling toward
    # half maximum: a neighbouring dot brightens again and stops the count
    m = (win >= p * 0.5) & (d2 <= r * r)
    rad = float(np.sqrt(max(m.sum(), 1) / np.pi))

    core = (win >= p * 0.8) & (d2 <= (r * 0.6) ** 2)
    if not core.any():
        core = d2 <= 2.0
    c = np.clip(rgb[y0:y1, x0:x1][core].mean(0) - bg, 0, None)
    return rad, c


def ramp(u):
    p = [s[0] for s in RAMP]
    return np.array([np.interp(u, p, [s[1][k] / 255 for s in RAMP])
                     for k in range(3)], np.float32)


def paint(c, u):
    """the dot's own hue, restored to full value; the ramp where JPEG ate it.

    Every dot in the supplied art is a saturated colour dimmed by the dark card
    and by compression. Dividing by the peak channel puts the value back without
    touching the hue. A dot that comes back near-grey has no hue left to keep, so
    it takes the position on the mark's own cyan-to-magenta axis instead."""
    mx = float(c.max())
    if mx < 1e-4:
        return ramp(u)
    c = c / mx
    sat = 1.0 - float(c.min())
    if sat < 0.34:
        return ramp(u)
    # nudge toward the axis colour so the sphere stays one family, never a
    # recolour: at most a third of the way, and only for what JPEG blurred
    return c * 0.78 + ramp(u) * 0.22


def main():
    rgb, bg, _ = load()
    sig = np.clip(rgb - bg, 0, None).max(-1)          # distance from the card
    sig = sig / max(sig.max(), 1e-6)

    found = [(x, y) + measure(sig, rgb, bg, x, y) for x, y in peaks(sig)]
    found = [f for f in found if f[2] >= 1.6]

    # the sphere's own centre and extent, taken from the dot cloud itself
    px = np.array([f[0] for f in found], np.float32)
    py = np.array([f[1] for f in found], np.float32)
    cx, cy = float(px.mean()), float(py.mean())
    rad_out = float(np.percentile(np.hypot(px - cx, py - cy), 99.5))

    dots = []
    for x, y, rad, c in found:
        d = np.hypot(x - cx, y - cy)
        if d > rad_out * 1.06:
            continue                                  # not part of the sphere
        # the mark's colour axis runs from upper left to lower right
        u = float(np.clip(((x - cx) + (y - cy)) / (2 * rad_out) + 0.5, 0, 1))
        col = paint(c, u)
        dots.append({
            # back into the supplied mark's own 190x112 coordinates
            'x': round(CROP[0] + x / UP, 3),
            'y': round(CROP[1] + y / UP, 3),
            'r': round(rad / UP, 3),
            'c': [round(float(v), 4) for v in col],
            'i': round(float(sig[y, x]), 4),
        })

    dots.sort(key=lambda d: (d['y'], d['x']))
    with open(os.path.join(HERE, 'ring-dots.json'), 'w') as f:
        json.dump(dots, f, indent=0)
    print('dots', len(dots),
          'r', min(d['r'] for d in dots), max(d['r'] for d in dots))


if __name__ == '__main__':
    main()
