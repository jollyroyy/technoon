"""Key the supplied 640x640 logo off its black card.

Input : brief/logo-source-640.jpg  (the client's own file, unmodified)
Output: site/assets/logo-mark.png  (RGBA, trimmed, wordmark flipped to --ink)
        site/assets/favicon.png    (the sphere alone, 128x128)
        brief/logo-keyed-raw.png   (the literal key, white wordmark kept)

The card is a uniform near-black (#020113), so the key is an unpremultiply
against black: alpha is the pixel's own brightness, colour is the pixel
divided by that alpha. Antialiased glyph edges come back crisp.

The wordmark ships in --ink because pure white on --pearl is 1.03:1. Only
NEUTRAL pixels are flipped; every coloured pixel (the sphere, the .ai, the
two rules) keeps the hue the client supplied.
"""
import numpy as np
from PIL import Image

SRC = r"brief/logo-source-640.jpg"
INK = np.array([0x0E, 0x13, 0x30], float)

im = np.asarray(Image.open(SRC).convert("RGB")).astype(float)

# --- key: uncomposite the art off the card ---------------------------------
# observed = art*alpha + card*(1-alpha).  The card is #020113, so its own
# brightest channel (blue, 19) is the floor: everything at or under it is card.
CARD = np.array([0x02, 0x01, 0x13], float)
FLOOR = CARD.max()

alpha = np.clip((im.max(axis=2) - FLOOR) / (255 - FLOOR), 0, 1)
safe = np.maximum(alpha, 1e-6)[..., None]
rgb = np.clip((im - CARD * (1 - alpha[..., None])) / safe, 0, 255)


def trim(rgba, thr=8):
    ys, xs = np.nonzero(rgba[..., 3] > thr)
    return rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


raw = np.dstack([rgb, alpha * 255]).astype(np.uint8)
Image.fromarray(trim(raw), "RGBA").save("brief/logo-keyed-raw.png")

# --- flip only the neutral glyphs to ink -----------------------------------
mx, mn = rgb.max(axis=2), rgb.min(axis=2)
sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
neutral = sat < 0.22                       # white type, not the gradient
ink = np.where(neutral[..., None], INK, rgb)

mark = trim(np.dstack([ink, alpha * 255]).astype(np.uint8))
Image.fromarray(mark, "RGBA").save("site/assets/logo-mark.png")
print("logo-mark.png", mark.shape[1], "x", mark.shape[0])

# --- favicon: the sphere alone --------------------------------------------
# the sphere is the coloured art above the wordmark; find it by saturation
# the sphere and the wordmark are separated by a band of empty rows; cut there
h = mark.shape[0]
empty = np.flatnonzero((mark[..., 3] > 8).sum(axis=1) == 0)
split = empty[(empty > h * 0.35) & (empty < h * 0.72)]
sph = trim(mark[: int(split[0]) if split.size else int(h * 0.58)])
side = max(sph.shape[:2])
pad = np.zeros((side, side, 4), np.uint8)
oy, ox = (side - sph.shape[0]) // 2, (side - sph.shape[1]) // 2
pad[oy:oy + sph.shape[0], ox:ox + sph.shape[1]] = sph
Image.fromarray(pad, "RGBA").resize((128, 128), Image.LANCZOS).save(
    "site/assets/favicon.png")
print("favicon.png 128 x 128  (sphere", sph.shape[1], "x", sph.shape[0], ")")
