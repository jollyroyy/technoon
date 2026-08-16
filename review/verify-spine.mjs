/* Exact replica of updateBands() + videoTimeFor() from site/assets/app.js,
   run over the real band table parsed out of index.html. Deterministic:
   no browser, no rAF, no Lenis. */
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../site/index.html', import.meta.url), 'utf8');

const clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
const smoothstep = (p, e0, e1) => { const t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };

/* Kept identical to VIDEO_MAP in site/assets/app.js. The three chaos anchors
   moved to 0.323/0.397/0.470 when FINANCE was dropped and this copy was left
   on the old 0.305/0.360/0.415 — harmless to the pass/fail (the curve stays
   monotonic either way) but it made the freeze report describe a spine the
   site does not have. Resynced 2026-08-16. */
const VIDEO_MAP = [
  [0.000,0.0],[0.058,2.0],[0.120,3.6],[0.185,5.4],[0.250,7.0],
  [0.323,8.4],[0.397,9.7],[0.470,11.0],[0.530,11.8],
  [0.575,13.0],[0.640,15.2],[0.700,18.0],[0.760,20.5],[0.820,23.0],
  [0.880,26.0],[0.945,30.0],[1.000,30.0]
];
function videoTimeFor(p){
  if (p <= VIDEO_MAP[0][0]) return VIDEO_MAP[0][1];
  for (let i=1;i<VIDEO_MAP.length;i++){
    const [pb,tb]=VIDEO_MAP[i];
    if (p<=pb){ const [pa,ta]=VIDEO_MAP[i-1]; const s=pb-pa; return s<=0?tb:ta+(tb-ta)*((p-pa)/s); }
  }
  return VIDEO_MAP[VIDEO_MAP.length-1][1];
}

// parse the real bands out of the shipped HTML
const bands = [];
const re = /<div class="band ([^"]+)"\s+data-a="([\d.]+)"\s+data-b="([\d.]+)"/g;
let m;
while ((m = re.exec(html))) {
  const a = parseFloat(m[2]), b = parseFloat(m[3]);
  const rampM = html.slice(m.index, m.index + 400).match(/data-ramp="([\d.]+)"/);
  bands.push({
    cls: m[1], a, b,
    f: Math.min(0.018, (b - a) / 3),
    ramp: rampM ? parseFloat(rampM[1]) : Math.min(0.025, (b - a) * 0.35),
    first: a <= 0, last: b >= 1
  });
}

function opacityAt(x, p) {
  if (p < x.a - x.f || p > x.b + x.f) return 0;
  const inA  = x.first ? 1 : smoothstep(p, x.a, x.a + x.f);
  const outA = x.last  ? 0 : smoothstep(p, x.b - x.f, x.b);
  return inA * (1 - outA);
}

console.log(`parsed ${bands.length} bands from index.html\n`);

// 1 · every band must reach full opacity somewhere, and hold a real plateau
console.log('BAND                       range            peak   plateau(>0.98)   vh');
let fail = 0;
for (const x of bands) {
  let peak = 0, plateauLo = null, plateauHi = null;
  for (let p = 0; p <= 1.00001; p += 0.0005) {
    const o = opacityAt(x, p);
    if (o > peak) peak = o;
    if (o > 0.98) { if (plateauLo === null) plateauLo = p; plateauHi = p; }
  }
  const width = plateauHi === null ? 0 : plateauHi - plateauLo;
  const vh = (width * 1800).toFixed(0);
  const ok = peak > 0.99 && width >= 0.02;
  if (!ok) fail++;
  console.log(
    `${x.cls.padEnd(24)} ${x.a.toFixed(3)}-${x.b.toFixed(3)}   ${peak.toFixed(3)}  ` +
    `${plateauLo===null?'NONE':plateauLo.toFixed(3)+'-'+plateauHi.toFixed(3)}     ${vh}vh  ${ok?'':'  <-- FAIL'}`
  );
}

// 2 · no two text bands may be readable at once (overlap would collide on screen)
console.log('\nOVERLAP CHECK (two bands both >0.10 at the same p):');
let overlaps = 0;
for (let p = 0; p <= 1.00001; p += 0.0005) {
  const on = bands.filter(x => opacityAt(x, p) > 0.10);
  if (on.length > 1) { overlaps++; if (overlaps < 4) console.log(`  p=${p.toFixed(3)}  ${on.map(o=>o.cls).join(' + ')}`); }
}
console.log(overlaps === 0 ? '  none — every beat is exclusive' : `  ${overlaps} sample points with overlap`);

// 3 · the deliberately text-free stretches
console.log('\nTEXT-FREE BEATS (must be silent):');
for (const [lo,hi,name] of [[0.470,0.530,'BOTTLENECK'],[0.530,0.575,'THE STOP'],[0.575,0.640,'AI ACTIVATION'],[0.640,0.700,'SPATIAL SPLASH']]) {
  let maxO = 0, who = '';
  for (let p = lo; p <= hi; p += 0.0005) for (const x of bands) { const o = opacityAt(x,p); if (o > maxO) { maxO = o; who = x.cls; } }
  console.log(`  ${name.padEnd(16)} ${lo}-${hi}  loudest text = ${maxO.toFixed(3)} ${maxO>0.02?'('+who+')':''} ${maxO<0.02?'OK':'<-- LEAK'}`);
}

// 4 · the video clock must never run backwards
console.log('\nVIDEO CURVE:');
let prev = -1, mono = true;
for (let p = 0; p <= 1.00001; p += 0.0005) { const t = videoTimeFor(p); if (t < prev - 1e-9) mono = false; prev = t; }
console.log(`  monotonic: ${mono ? 'yes' : 'NO — footage runs backwards'}`);
console.log(`  freeze 0.530->0.575 advances only ${(videoTimeFor(0.575)-videoTimeFor(0.530)).toFixed(2)}s over ${((0.575-0.530)*1800).toFixed(0)}vh of scroll`);
console.log(`  ends at ${videoTimeFor(1).toFixed(2)}s of 30.08s`);

console.log(fail === 0 && overlaps === 0 ? '\nRESULT: PASS' : `\nRESULT: ${fail} band failures, ${overlaps} overlap points`);
