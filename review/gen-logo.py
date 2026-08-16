"""Rebuild the technoon.ai mark at 4K — the supplied mark, at resolution.

Sphere: the SUPPLIED sphere, traced dot by dot out of brief/logo-source.jpg by
review/trace-ring.py and redrawn as crisp circles. Its swirl, its shell spacing,
its dot sizes and its colours are the supplied art's own; the only thing added
is a sharp edge, which is the one thing a 190x112 JPEG cannot give. Nothing here
is a redesign — an earlier pass drew a mathematical closed ring instead and it
was rejected, correctly, as not being the client's mark.

Wordmark: re-set in Montserrat Medium, the typeface the supplied mark uses
(0.71 IoU against the source raster, the next candidate scores 0.58), so it is
sharp at any size. Tagline "AI AGENCY" and its rules are dropped, and the dark
card is dropped: the mark ships on transparency for a light page.

Montserrat-Medium.ttf is SIL Open Font License 1.1 (Julieta Ulanovsky et al.).
Run from anywhere:  python review/trace-ring.py && python review/gen-logo.py
"""
import json
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
FONT = os.path.join(HERE, 'Montserrat-Medium.ttf')
DOTS = os.path.join(HERE, 'ring-dots.json')

# supplied-mark geometry, in its 190x112 pixel space
BOX = (20.0, 0.0, 171.0, 91.0)          # l, t, r, b  -> the trimmed content box
RING_C, RING_R = (95.0, 34.0), 32.0
WORD = (22.0, 69.0, 169.0, 87.0)        # l, t, r, b  of the wordmark bbox

INK = (14, 19, 48)
VIOLET = (0x6C, 0x4C, 0xE0)
MAGENTA = (0xC6, 0x4B, 0xE8)


def build(width):
    l, t, r, b = BOX
    S = width / (r - l)
    W, H = int(round(width)), int(round((b - t) * S))
    ss = 3                                              # supersample the ring

    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))

    # ---- the supplied sphere, redrawn ----------------------------------
    # Every dot below came off the supplied JPEG. Its position, radius and
    # colour are measurements, not parameters — there is nothing here to tune.
    ring = Image.new('RGBA', (W * ss, H * ss), (0, 0, 0, 0))
    dr = ImageDraw.Draw(ring)
    for d in json.load(open(DOTS)):
        x, y = (d['x'] - l) * S * ss, (d['y'] - t) * S * ss
        rad = d['r'] * S * ss
        c = tuple(int(round(v * 255)) for v in d['c'])
        dr.ellipse([x - rad, y - rad, x + rad, y + rad], fill=c + (255,))
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
