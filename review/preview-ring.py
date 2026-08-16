"""Side-by-side: the supplied sphere upsampled, and the traced redraw.
Written to the scratchpad only — this is a look-at-it tool, not a build step.
"""
import json
import os
import sys

import numpy as np
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
CROP = (55, 0, 136, 72)
SCALE = 10
SS = 4

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'ring-preview.png')

src = Image.open(os.path.join(ROOT, 'brief', 'logo-source.jpg')).convert('RGB').crop(CROP)
W, H = src.width * SCALE, src.height * SCALE
left = src.resize((W, H), Image.LANCZOS)

dots = json.load(open(os.path.join(HERE, 'ring-dots.json')))
right = Image.new('RGB', (W * SS, H * SS), (10, 12, 30))
dr = ImageDraw.Draw(right)
for d in dots:
    x = (d['x'] - CROP[0]) * SCALE * SS
    y = (d['y'] - CROP[1]) * SCALE * SS
    r = d['r'] * SCALE * SS
    c = tuple(int(round(v * 255)) for v in d['c'])
    dr.ellipse([x - r, y - r, x + r, y + r], fill=c)
right = right.resize((W, H), Image.LANCZOS)

sheet = Image.new('RGB', (W * 2 + 20, H), (0, 0, 0))
sheet.paste(left, (0, 0))
sheet.paste(right, (W + 20, 0))
sheet.save(out)
print(out, sheet.size, 'dots', len(dots))
