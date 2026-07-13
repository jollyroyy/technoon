/**
 * Frame polish pipeline for the scrollytelling hero.
 *
 * Input : C:/Users/ASUS/Downloads/frames/frame_000001.png (241 frames, 1280x720)
 * Output: public/frames/frame_000001.webp   — 1600w desktop set (241 frames)
 *         public/frames-m/frame_000001.webp — 800w mobile set (every 2nd frame, renumbered 1..121)
 *
 * Bakes in: cinematic edge vignette, a dark radial patch over the AI-generator
 * watermark zone (bottom-right, ~x1150 y650 in 720p space), and a faint
 * blue/purple brand tint keyed to the site gradient.
 *
 * Run once: node scripts/process-frames.mjs
 */
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'C:/Users/ASUS/Downloads/frames';
const OUT_DESKTOP = 'public/frames';
const OUT_MOBILE = 'public/frames-m';

const W = 1280;
const H = 720;

// SVG overlay composited onto every frame at source resolution.
const overlaySvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="vignette" cx="50%" cy="46%" r="72%">
      <stop offset="0%"  stop-color="#040310" stop-opacity="0"/>
      <stop offset="62%" stop-color="#040310" stop-opacity="0"/>
      <stop offset="86%" stop-color="#040310" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#040310" stop-opacity="0.62"/>
    </radialGradient>
    <radialGradient id="wm" cx="50%" cy="50%" r="50%">
      <stop offset="0%"  stop-color="#05040e" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="#05040e" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#05040e" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="tintBlue" cx="50%" cy="50%" r="50%">
      <stop offset="0%"  stop-color="#3e7dff" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#3e7dff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="tintPurple" cx="50%" cy="50%" r="50%">
      <stop offset="0%"  stop-color="#b04dff" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="#b04dff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#040310" stop-opacity="0"/>
      <stop offset="72%" stop-color="#040310" stop-opacity="0"/>
      <stop offset="100%" stop-color="#040310" stop-opacity="0.5"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  <rect width="${W}" height="${H}" fill="url(#bottomFade)"/>
  <!-- watermark cover: sparkle sits around (1090..1230, 590..710) across the sequence -->
  <ellipse cx="1160" cy="655" rx="200" ry="130" fill="url(#wm)"/>
  <!-- brand tint washes -->
  <ellipse cx="230" cy="160" rx="520" ry="360" fill="url(#tintBlue)"/>
  <ellipse cx="1080" cy="560" rx="520" ry="380" fill="url(#tintPurple)"/>
</svg>
`);

async function main() {
  await mkdir(OUT_DESKTOP, { recursive: true });
  await mkdir(OUT_MOBILE, { recursive: true });

  const files = (await readdir(SRC))
    .filter((f) => /^frame_\d{6}\.png$/.test(f))
    .sort();

  console.log(`Processing ${files.length} frames...`);
  const started = Date.now();

  // Process in small parallel batches to keep memory sane.
  const BATCH = 8;
  let mobileIndex = 0;

  for (let i = 0; i < files.length; i += BATCH) {
    const batch = files.slice(i, i + BATCH).map(async (file, j) => {
      const idx = i + j; // 0-based
      const src = path.join(SRC, file);

      // Polish once at source resolution.
      const polished = await sharp(src)
        .composite([{ input: overlaySvg }])
        .png()
        .toBuffer();

      // Desktop: 1600w lanczos upscale + gentle sharpen.
      await sharp(polished)
        .resize(1600, 900, { kernel: 'lanczos3' })
        .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.4 })
        .webp({ quality: 70 })
        .toFile(path.join(OUT_DESKTOP, file.replace('.png', '.webp')));

      // Mobile: every 2nd frame (0,2,4,...) at 800w, renumbered sequentially.
      if (idx % 2 === 0) {
        const n = String(idx / 2 + 1).padStart(6, '0');
        await sharp(polished)
          .resize(800, 450, { kernel: 'lanczos3' })
          .webp({ quality: 65 })
          .toFile(path.join(OUT_MOBILE, `frame_${n}.webp`));
        mobileIndex++;
      }
    });
    await Promise.all(batch);
    process.stdout.write(`\r${Math.min(i + BATCH, files.length)}/${files.length}`);
  }

  console.log(`\nDone in ${((Date.now() - started) / 1000).toFixed(1)}s — mobile frames: ${mobileIndex}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
