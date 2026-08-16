/* technoon.ai — the drive loop.

   ONE world, ONE camera, ONE continuous story. Scroll progress through the
   pinned journey drives the 30 second cinematic core, the 3D camera and every
   caption band together, so nothing on the page is on its own timeline.

   Nothing here writes to the DOM unless the value actually changed. That delta
   gate is the difference between smooth and choppy. */

/* The 3D layer is imported dynamically, on purpose. A static import would make
   the whole drive loop hostage to it: if scene.js were missing or threw at
   module scope, this module would never evaluate and the page would lose its
   captions and its scrub as well as its geometry. Same law as the video — the
   page stays complete when a layer fails. */

/* ── constants ────────────────────────────────────────────────────────── */

const VIDEO_URL   = 'assets/hero-scrub.mp4';
const POSTER_URL  = 'assets/hero-poster.jpg';
const VIDEO_BYTES = 12160713;          // real byte size: the fallback when Content-Length is absent
const STREAM_MIN  = 8 * 1024 * 1024;   // above this, stream behind the ring instead of one blocking fetch

/* The scroll-to-video curve, piecewise rather than linear.

   The footage has its own narrative clock (office 0-3s, fragmenting 3-7s,
   chaos 7-11s, freeze 11-13s, core 13-15s, activation 15-18s, wave 18-22s,
   connect 22-26s, accelerate 26-28s, converge 28-30s). A straight linear map
   would slide every caption off the moment it belongs to, and would rush the
   freeze, which is the beat the whole story turns on. These anchors pin each
   band to its own footage. Seconds, clamped to the real duration. */
const VIDEO_MAP = [
  [0.000,  0.0],   // the office
  [0.058,  2.0],   // hero settles
  [0.120,  3.6],   // MARKETING, panes lifting
  [0.185,  5.4],   // SALES
  [0.250,  7.0],   // OPERATIONS, chaos opens
  [0.323,  8.4],   // HR SOLUTIONS
  [0.397,  9.7],   // CUSTOM SOLUTIONS
  [0.470, 11.0],   // CUSTOMER SUCCESS into the bottleneck
  [0.530, 11.8],   // THE STOP begins, footage is frozen here
  [0.575, 13.0],   // the stop is held across this stretch on purpose
  [0.640, 15.2],   // AI activation
  [0.700, 18.0],   // the spatial splash
  [0.760, 20.5],   // SMART MARKETING
  [0.820, 23.0],   // AI-POWERED SALES
  [0.880, 26.0],   // ALWAYS-ON OPERATIONS into the connected system
  [0.945, 30.0],   // converge
  [1.000, 30.0]    // held: the 3D vortex owns the last stretch
];

/* The static-hero gate. These five strings are duplicated character-for-character
   in app.css. If one side drifts, the CSS un-hides a stage the JS never armed. */
const GATES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)'
];

const CHAIN_A = 0.880, CHAIN_B = 0.945;   // the wave that lights the six, its own window

/* THE FLOATING 3D LAYER IS OFF. Client call, 2026-08-16: the drifting tinted
   objects read as "purple shape things coming in the middle of things" rather
   than as the business artifacts they were built to be.

   Flip this to true to bring the whole layer back. scene.js is untouched, still
   parses, and still exports createScene(); nothing else has to change. It is a
   flag rather than a deletion because the layer is a real asset and this is a
   taste call that can reverse.

   What the page loses: nothing structural. Every beat the 3D layer illustrated
   is already in the footage, which is why the story still reads end to end with
   it dark. What it loses is the sharp, scroll-reactive artifacts; the footage
   carries those beats at its own resolution instead. */
const SCENE_3D = false;

/* ── elements ─────────────────────────────────────────────────────────── */

const journey  = document.querySelector('.journey');
const stage    = document.querySelector('.stage');
const video    = document.getElementById('hero');
const posterEl = document.querySelector('.poster');
const canvas   = document.getElementById('gl');
const loader   = document.querySelector('.loader');
const bandEls  = [...document.querySelectorAll('.band')];
const chainEls = [...document.querySelectorAll('.chain-item')];

/* ── small maths ──────────────────────────────────────────────────────── */

const clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
const smoothstep = (p, e0, e1) => {
  const t = clamp((p - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
/* seeded, so the "random" scatter is identical on every load */
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

/* piecewise-linear lookup through VIDEO_MAP */
function videoTimeFor(p) {
  const n = VIDEO_MAP.length;
  if (p <= VIDEO_MAP[0][0]) return VIDEO_MAP[0][1];
  for (let i = 1; i < n; i++) {
    const [pb, tb] = VIDEO_MAP[i];
    if (p <= pb) {
      const [pa, ta] = VIDEO_MAP[i - 1];
      const span = pb - pa;
      return span <= 0 ? tb : ta + (tb - ta) * ((p - pa) / span);
    }
  }
  return VIDEO_MAP[n - 1][1];
}

/* ── text splitting, done once at load ────────────────────────────────── */

function splitText() {
  document.querySelectorAll('.split[data-split]').forEach((el, n) => {
    const rand = rng(0x7ec4 + n * 977);
    const mode = el.dataset.split;                       // 'word' | 'char'
    const band = el.closest('.band');
    const spread = parseFloat(band?.dataset.spread || '0.20');

    /* measure BEFORE clearing, or every threshold collapses and the stagger dies */
    const total = Math.max(el.textContent.replace(/\s+/g, '').length, 1);
    const wordTotal = Math.max(el.textContent.trim().split(/\s+/).length, 1);
    const nodes = [...el.childNodes];
    el.textContent = '';

    let charIndex = 0, wordIndex = 0;

    /* rebuild, preserving <em> so the accent word survives the split */
    const makeWord = (text, em) => {
      const w = document.createElement('span');
      w.className = 'w' + (em ? ' em' : '');
      if (mode === 'word') {
        /* reading order, with a touch of noise so it never feels mechanical */
        w.style.setProperty('--th', (wordIndex / wordTotal * 0.42 + rand() * 0.04).toFixed(3));
        w.textContent = text;
        wordIndex++;
      } else {
        for (const ch of text) {
          const c = document.createElement('span');
          c.className = 'c';
          c.textContent = ch;
          c.style.setProperty('--th', (charIndex / total * 0.34 + rand() * 0.10 * spread).toFixed(3));
          c.style.setProperty('--jx', ((rand() - 0.5) * 120 * spread).toFixed(1) + 'px');
          c.style.setProperty('--jy', ((rand() - 0.5) * 96 * spread).toFixed(1) + 'px');
          c.style.setProperty('--jr', ((rand() - 0.5) * 58 * spread).toFixed(1) + 'deg');
          w.appendChild(c);
          charIndex++;
        }
      }
      return w;
    };

    nodes.forEach(node => {
      const em = node.nodeType === 1 && node.tagName === 'EM';
      node.textContent.split(/(\s+)/).forEach(tok => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { el.appendChild(document.createTextNode(' ')); return; }
        el.appendChild(makeWord(tok, em));
      });
    });
  });
}

/* ── band state, cached so we only touch the DOM on change ────────────── */

const bands = bandEls.map(el => {
  const a = parseFloat(el.dataset.a);
  const b = parseFloat(el.dataset.b);
  return {
    el, a, b,
    f: Math.min(0.018, (b - a) / 3),
    ramp: parseFloat(el.dataset.ramp || '0') || Math.min(0.025, (b - a) * 0.35),
    first: a <= 0,
    last: b >= 1,
    o: -1, k: -1, vis: null
  };
});

/* ── the video: streamed blob, gated seeks ────────────────────────────── */

let videoReady = false, heroInit = false;

function initHeroOnce() {
  if (heroInit) return;
  heroInit = true;
  posterEl.style.backgroundImage = `url('${POSTER_URL}')`;

  /* the poster wins the bandwidth race by design: only start the blob once it is in */
  let started = false;
  const start = () => { if (!started) { started = true; loadHeroBlob().catch(failVideo); } };
  const img = new Image();
  img.onload = start;
  img.onerror = start;
  img.src = POSTER_URL;
  setTimeout(start, 4000);              // a hung poster must never block the video forever
}

async function loadHeroBlob() {
  const ctrl = new AbortController();
  let watchdog = setTimeout(() => ctrl.abort(), 20000);
  const res = await fetch(VIDEO_URL, { priority: 'low', signal: ctrl.signal });
  if (!res.ok) throw new Error('video ' + res.status);

  const total = Number(res.headers.get('Content-Length')) || VIDEO_BYTES;

  /* small files do not need the ring; large ones must never block the first impression */
  if (total < STREAM_MIN || !res.body) {
    clearTimeout(watchdog);
    attachBlob(await res.blob());
    return;
  }

  const reader = res.body.getReader();
  const chunks = [];
  let got = 0, lastRing = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    clearTimeout(watchdog);
    watchdog = setTimeout(() => ctrl.abort(), 20000);   // 20s with no progress aborts to the still hero
    chunks.push(value);
    got += value.length;
    const frac = Math.min(1, got / total);
    const now = performance.now();
    if (now - lastRing > 100 || frac === 1) {
      lastRing = now;
      loader?.style.setProperty('--ld', Math.round(126 * (1 - frac)));
    }
  }
  clearTimeout(watchdog);
  loader?.style.setProperty('--ld', 0);
  attachBlob(new Blob(chunks));
}

function attachBlob(blob) {
  video.src = URL.createObjectURL(blob);
  video.load();
  video.addEventListener('canplay', () => {
    videoReady = true;
    stage.classList.add('video-ready');
    requestSeek(videoTimeFor(shown));        // land on wherever the reader already is
  }, { once: true });
}

function failVideo() {
  /* an honest end state, never a stuck ring. The stills carry the whole journey. */
  stage.classList.add('video-failed');
}

/* Never write currentTime while a seek is in flight: un-gated seeks pile up and
   that is exactly what choppy looks like in Chrome. Coalesce to the newest target. */
let seekBusy = false, pendingTime = null;

function requestSeek(t) {
  if (!videoReady || !video.duration) return;
  const clamped = clamp(t, 0, video.duration - 0.02);
  if (seekBusy) { pendingTime = clamped; return; }
  seekBusy = true;
  video.currentTime = clamped;
}
video.addEventListener('seeked', () => {
  seekBusy = false;
  if (pendingTime !== null) { const t = pendingTime; pendingTime = null; requestSeek(t); }
});
video.addEventListener('error', () => {        // the deadlock escape
  seekBusy = false; pendingTime = null;
  failVideo();
});

/* ── the 3D layer ─────────────────────────────────────────────────────── */

let scene = null, sceneTried = false;
function initScene() {
  if (!SCENE_3D || sceneTried || !canvas) return;
  sceneTried = true;
  import('./scene.js')
    .then(m => {
      scene = m.createScene(canvas);
      scene.resize();
      kick();                       // it may have landed after the loop went idle
    })
    .catch(() => { scene = null; });   // the footage and the type carry the story alone
}

/* ── the drive loop ───────────────────────────────────────────────────── */

let target = 0, shown = 0;
let rafId = null, lastTick = 0;
let heroOnScreen = true;
let loadK = 0, loadStart = 0;          // band one's one-time assembly ramp
let pxT = 0, pyT = 0, px = 0, py = 0;  // pointer target and damped

function heroProgress() {
  if (!journey) return 0;
  const range = journey.offsetHeight - window.innerHeight;
  if (range <= 0) return 0;
  return clamp((window.scrollY - journey.offsetTop) / range, 0, 1);
}

function updateBands(p) {
  for (const b of bands) {
    let o;
    if (p < b.a - b.f || p > b.b + b.f) o = 0;
    else {
      const inA = b.first ? 1 : smoothstep(p, b.a, b.a + b.f);
      const outA = b.last ? 0 : smoothstep(p, b.b - b.f, b.b);
      o = inA * (1 - outA);
    }

    let k = clamp((p - b.a) / b.ramp, 0, 1);
    if (b.first) k = Math.max(k, loadK);       // the opening beat arrives assembled

    /* delta gate: converged bands cost nothing */
    if (Math.abs(o - b.o) > 0.004) {
      b.o = o;
      b.el.style.setProperty('--o', o.toFixed(3));
    }
    const vis = o > 0.002;
    if (vis !== b.vis) {
      b.vis = vis;
      b.el.style.visibility = vis ? 'visible' : 'hidden';
    }
    if (Math.abs(k - b.k) > 0.008) {
      b.k = k;
      b.el.style.setProperty('--k', k.toFixed(3));
    }
  }

  /* the splash reaching each function in turn: MARKETING through CUSTOMER SUCCESS */
  const wave = clamp((p - CHAIN_A) / (CHAIN_B - CHAIN_A), 0, 1);
  for (const it of chainEls) {
    const lit = clamp((wave - parseFloat(it.dataset.w)) * 6, 0, 1);
    if (Math.abs(lit - (it._lit ?? -1)) > 0.01) {
      it._lit = lit;
      it.style.setProperty('--lit', lit.toFixed(3));
    }
  }
}

function tick(now) {
  const dt = Math.min(100, now - (lastTick || now));
  lastTick = now;

  /* frame-rate independent smoothing: the same feel at 60Hz and 144Hz */
  const a = 1 - Math.pow(1 - 0.16, dt / 16.667);
  shown += (target - shown) * a;
  px += (pxT - px) * a;
  py += (pyT - py) * a;

  if (loadStart) loadK = clamp((now - loadStart) / 900, 0, 1);

  const converged = Math.abs(target - shown) < 0.0005
    && Math.abs(pxT - px) < 0.001 && Math.abs(pyT - py) < 0.001
    && loadK >= 1;
  if (converged) shown = target;

  requestSeek(videoTimeFor(shown));
  updateBands(shown);
  scene?.update(shown, px, py, dt);

  if (converged) { rafId = null; lastTick = 0; }
  else rafId = requestAnimationFrame(tick);
}

function kick() {
  if (rafId === null && heroOnScreen && scrubOn) { lastTick = 0; rafId = requestAnimationFrame(tick); }
}

let scrolled = false;
function onScroll() {
  target = heroProgress();
  if (!scrolled && window.scrollY > 40) { scrolled = true; stage.classList.add('moved'); }
  kick();
}

function onPointer(e) {
  pxT = (e.clientX / window.innerWidth) * 2 - 1;
  pyT = (e.clientY / window.innerHeight) * 2 - 1;
  kick();
}

/* ── arming and disarming, decided live ───────────────────────────────── */

let scrubOn = false;

function enableScrub() {
  if (scrubOn) return;
  scrubOn = true;
  initHeroOnce();
  initScene();
  scene?.resize();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('pointermove', onPointer, { passive: true });
  bands.forEach(b => { b.o = -1; b.k = -1; b.vis = null; });   // reset caches so pinned styles get rewritten
  unpinFinalStates();
  if (!loadStart) loadStart = performance.now();
  target = heroProgress();
  updateBands(target);
  onScroll();                                      // re-seek to where the reader actually is
}

function disableScrub() {
  if (!scrubOn) return;
  scrubOn = false;
  removeEventListener('scroll', onScroll);
  removeEventListener('pointermove', onPointer);
  if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
}

const MQLS = GATES.map(q => matchMedia(q));        // keep them referenced or listeners are lost
function applyHeroMode() {
  if (MQLS.some(m => m.matches)) disableScrub();
  else enableScrub();
}

/* reduced motion is honoured live and in BOTH directions */
function pinToFinalStates() {
  document.documentElement.classList.add('pinned');
  bands.forEach(b => {
    b.el.style.setProperty('--o', '1');
    b.el.style.setProperty('--k', '1');
    b.el.style.visibility = 'visible';
    b.vis = true;
  });
  chainEls.forEach(it => { it.style.setProperty('--lit', '1'); it._lit = 1; });
}
function unpinFinalStates() {
  document.documentElement.classList.remove('pinned');
  bands.forEach(b => { b.el.style.removeProperty('--o'); b.el.style.removeProperty('--k'); });
  chainEls.forEach(it => { it.style.removeProperty('--lit'); it._lit = -1; });
}

/* ── boot ─────────────────────────────────────────────────────────────── */

splitText();

const reduce = matchMedia('(prefers-reduced-motion: reduce)');

/* Lenis gives the scrub its cinematic weight. Reduced motion gets native scroll. */
let lenis = null;
if (!reduce.matches && window.Lenis) {
  lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 });
  const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  lenis.on('scroll', onScroll);
  window.__lenis = lenis;
}

/* the loop must never run while the hero is off screen */
if (journey && 'IntersectionObserver' in window) {
  new IntersectionObserver(es => {
    heroOnScreen = es[0].isIntersecting;
    if (heroOnScreen) kick();
    else if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }, { rootMargin: '10% 0px' }).observe(journey);
}

MQLS.forEach(m => m.addEventListener('change', applyHeroMode));
reduce.addEventListener('change', e => {
  if (e.matches) { disableScrub(); pinToFinalStates(); }
  else applyHeroMode();
});

addEventListener('resize', () => {
  scene?.resize();
  target = heroProgress();
  kick();
}, { passive: true });

/* Pause every loop on a hidden tab; animation-play-state does not inherit,
   so the rule has to reach pseudo-elements too (see app.css).

   Seed the state at boot as well as on change: a page opened into a background
   tab (middle-click, a restored session, a prerender) is already hidden when
   this runs and would otherwise never receive the class, leaving every CSS
   animation burning while nobody is looking at it. */
document.body.classList.toggle('paused', document.hidden);
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('paused', document.hidden);
  if (!document.hidden) kick();
});

if (reduce.matches) pinToFinalStates();
applyHeroMode();

/* the arrival section below the journey: choreographed, never snapping */
if (window.gsap && window.ScrollTrigger && !reduce.matches) {
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);
  gsap.from('.arrival-inner > *', {
    scrollTrigger: { trigger: '.arrival', start: 'top 78%' },
    y: 26, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out'
  });
}

/* in-page anchors ride Lenis so the journey never jumps */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 });
    else el.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth' });
  });
});

/* The function card. Imported dynamically for exactly the reason scene.js is:
   this drive loop must never become hostage to a layer that can fail on its
   own. It is handed a GETTER rather than the Lenis instance, because Lenis is
   created conditionally above and this import resolves after that decision. */
import('./detail.js')
  .then(m => m.initDetail({ lenis: () => lenis }))
  .catch(() => {});   // the labels simply stay unclickable

/* The booking card, on the same terms and for the same reason. It is handed
   the same Lenis getter because it has the same problem: an open modal over a
   scroll-driven film has to stop the film. */
import('./cal.js')
  .then(m => m.initCal({ lenis: () => lenis }))
  .catch(() => {});   // the CTAs stay plain links to the booking page
