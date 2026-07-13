/**
 * Frame polish pipeline for the scrollytelling hero.
 *
 * Input : C:/Users/ASUS/Downloads/frames/frame_000001.png (241 frames, 3840x2160)
 * Output: public/frames/frame_000001.webp   — 1600w desktop set (241 frames)
 *         public/frames-m/frame_000001.webp — 800w mobile set (every 2nd frame, renumbered 1..121)
 *
 * Pipeline: downscale 4K source -> 1280x720 -> apply vignette + brand tint
 *           + bottom cover (hides full-width vendor watermark) -> resize to outputs
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

// SVG overlay composited at working resolution (1280x720).
const overlaySvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="vignette" cx="50%" cy="46%" r="72%">
      <stop offset="0%"  stop-color="#040310" stop-opacity="0"/>
      <stop offset="62%" stop-color="#040310" stop-opacity="0"/>
      <stop offset="86%" stop-color="#040310" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#040310" stop-opacity="0.62"/>
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
      <stop offset="0%"    stop-color="#040310" stop-opacity="0"/>
      <stop offset="84%"   stop-color="#040310" stop-opacity="0"/>
      <stop offset="93%"   stop-color="#040310" stop-opacity="0.3"/>
      <stop offset="100%"  stop-color="#040310" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  <rect width="${W}" height="${H}" fill="url(#bottomFade)"/>
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
  const BATCH = 4;
  let mobileIndex = 0;

  for (let i = 0; i < files.length; i += BATCH) {
    const batch = files.slice(i, i + BATCH).map(async (file, j) => {
      const idx = i + j;
      const src = path.join(SRC, file);

      // Step 1: Downscale 4K source -> 1280x720 working resolution.
      const hd = await sharp(src)
        .resize(W, H, { kernel: 'lanczos3', fit: 'fill' })
        .png()
        .toBuffer();

      // Step 2: Composite overlay (vignette, bottom cover, brand tints).
      const polished = await sharp(hd)
        .composite([{ input: overlaySvg }])
        .png()
        .toBuffer();

      // Step 3: Desktop output — 1600x900.
      await sharp(polished)
        .resize(1600, 900, { kernel: 'lanczos3' })
        .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.4 })
        .webp({ quality: 70 })
        .toFile(path.join(OUT_DESKTOP, file.replace('.png', '.webp')));

      // Step 4: Mobile output — every 2nd frame, 800x450, renumbered.
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
