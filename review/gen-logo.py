"""Rebuild the technoon.ai mark at 4K.

Ring: drawn mathematically, fully closed (the supplied bitmap's ring was an open
spiral and reads as unfinished). Wordmark: re-set in Montserrat Medium, the
typeface the supplied mark uses (0.71 IoU against the source raster, the next
candidate scores 0.58). Tagline "AI AGENCY" and its rules are dropped.
Everything sits on the supplied mark's own geometry, in its own coordinates.

Montserrat-Medium.ttf is SIL Open Font License 1.1 (Julieta Ulanovsky et al.).
Run from anywhere:  python review/gen-logo.py
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
FONT = os.path.join(HERE, 'Montserrat-Medium.ttf')

# supplied-mark geometry, in its 190x112 pixel space
BOX = (20.0, 0.0, 171.0, 91.0)          # l, t, r, b  -> the trimmed content box
RING_C, RING_R = (95.0, 34.0), 32.0
WORD = (22.0, 69.0, 169.0, 87.0)        # l, t, r, b  of the wordmark bbox

INK = (14, 19, 48)
CYAN = (0x35, 0xB8, 0xF2)
BLUE = (0x3E, 0x8B, 0xF0)
VIOLET = (0x6C, 0x4C, 0xE0)
MAGENTA = (0xC6, 0x4B, 0xE8)
RING_RAMP = [(0.00, CYAN), (0.34, BLUE), (0.62, VIOLET), (1.00, MAGENTA)]

# radius fraction, dot radius fraction, dot count
SHELLS = [(0.44, 0.046, 26), (0.575, 0.053, 34), (0.71, 0.057, 42),
          (0.845, 0.051, 50), (0.965, 0.026, 58)]


def ramp(u, stops):
    u = float(np.clip(u, 0, 1))
    p = [s[0] for s in stops]
    return tuple(int(round(np.interp(u, p, [s[1][c] for s in stops]))) for c in range(3))


def build(width):
    l, t, r, b = BOX
    S = width / (r - l)
    W, H = int(round(width)), int(round((b - t) * S))
    ss = 3                                              # supersample the ring

    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))

    # ---- ring ----------------------------------------------------------
    ring = Image.new('RGBA', (W * ss, H * ss), (0, 0, 0, 0))
    dr = ImageDraw.Draw(ring)
    cx, cy = (RING_C[0] - l) * S * ss, (RING_C[1] - t) * S * ss
    rr = RING_R * S * ss
    for frac, dot, n in SHELLS:
        rad = rr * frac
        for i in range(n):
            th = 2 * np.pi * i / n + frac * 1.7         # per-shell phase: the spiral read
            x, y = cx + rad * np.cos(th), cy + rad * np.sin(th)
            g = np.clip((((x - cx) + (y - cy)) / (2 * rr * 0.965) + 1) / 2, 0, 1)
            d = rr * dot * (0.70 + 0.75 * g)
            dr.ellipse([x - d, y - d, x + d, y + d], fill=ramp(g, RING_RAMP) + (255,))
    canvas.alpha_composite(ring.resize((W, H), Image.LANCZOS))

    # ---- wordmark ------------------------------------------------------
    wl, wt, wr, wb = WORD
    target_w = int(round((wr - wl + 1) * S))
    if wr <= wl:                                        # ring-only (favicon)
        return canvas
    size = 64
    f = ImageFont.truetype(FONT, size)
    size = max(8, int(round(size * target_w / ImageDraw.Draw(
        Image.new('L', (1, 1))).textbbox((0, 0), 'technoon.ai', font=f)[2])))
    f = ImageFont.truetype(FONT, size)
    pad = size
    tmp = Image.new('L', (target_w + 4 * pad, size * 3), 0)
    ImageDraw.Draw(tmp).text((pad, pad), 'technoon.ai', font=f, fill=255)
    m = np.array(tmp, np.float32) / 255
    ys, xs = np.nonzero(m > 0.5)
    m = m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    # ".ai" begins after "technoon"
    split = int(round(f.getlength('technoon'))) - xs.min() + pad

    h, w = m.shape
    xx = np.arange(w, dtype=np.float32)[None, :]
    u = np.clip((xx - split) / max(1.0, w - split), 0, 1)
    ai = np.stack([np.interp(u[0], [0, 1], [VIOLET[c], MAGENTA[c]]) for c in range(3)], -1)
    rgb = np.where((xx >= split)[..., None], ai[None, :, :], np.array(INK, np.float32))
    word = Image.fromarray(np.dstack([np.broadcast_to(rgb, (h, w, 3)),
                                      m[..., None] * 255]).astype(np.uint8), 'RGBA')
    word = word.resize((target_w, max(1, round(target_w * h / w))), Image.LANCZOS)
    canvas.alpha_composite(word, (int(round((wl - l) * S)), int(round((wt - t) * S))))
    return canvas


def trim_square(im):
    a = np.asarray(im)[..., 3]
    ys, xs = np.nonzero(a > 8)
    im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    s = max(im.size)
    out = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    out.paste(im, ((s - im.width) // 2, (s - im.height) // 2))
    return out


if __name__ == '__main__':
    master = build(3840)
    master.save(os.path.join(ROOT, 'brief', 'logo-4k.png'))
    w = 640
    master.resize((w, round(w * master.height / master.width)), Image.LANCZOS) \
          .save(os.path.join(ROOT, 'site', 'assets', 'logo-mark.png'))

    BOX = (RING_C[0] - RING_R - 2, RING_C[1] - RING_R - 2,
           RING_C[0] + RING_R + 2, RING_C[1] + RING_R + 2)
    WORD = (0.0, 0.0, 0.0, 0.0)                         # ring only: what survives at 16px
    globals().update(BOX=BOX, WORD=WORD)
    trim_square(build(1024)).resize((128, 128), Image.LANCZOS) \
        .save(os.path.join(ROOT, 'site', 'assets', 'favicon.png'))
    print('4k', master.size)
