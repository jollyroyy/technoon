/* technoon.ai — the 3D layer.

   Renders the concrete business artifacts that the cinematic video deliberately
   does NOT show. AI video hallucinates fake brand logos and garbage text the
   moment you ask it for "a dashboard" or "a chat app" — so every card, envelope,
   bubble, ticket, core, ribbon and closing cube here is built from plain geometry
   and lit with a fresnel rim, never a texture or a glyph. That is the whole reason
   this file exists instead of just trusting the footage.

   Contract with app.js: createScene(canvas) returns { update(p,px,py,dt), resize() }.
   update() is called from the CALLER's rAF loop and must render exactly one frame
   itself — this file never starts its own loop. Both methods must tolerate being
   called in any order, any number of times.

   Hard laws this file is built around (see CLAUDE.md for the full brief):
   - no text, glyphs, logos or humanoid/robot/face shapes, anywhere
   - ring/torus geometry appears in exactly one place: the AI-activation core
     at p 0.575–0.640, and nowhere else — the client rejected a dot-ring motif
     once already, so the "connected nodes" at the core sit on a small sphere
     shell rather than a flat ring of dots, to avoid rhyming with that look
   - the freeze at p 0.530–0.575 is a true hard stop: every chaos-object pose is
     a function of chaosBaseP = min(p, FREEZE_A), which is a constant once p
     passes FREEZE_A, and the one running clock accumulator is gated to not
     advance while frozen — so a held scroll position reproduces bit-identical
     output frame after frame, not just "close enough"
   - zero allocations inside update() and everything it calls per frame: every
     scratch Vector3/Matrix4/Object3D is hoisted to module scope and reused */

import * as THREE from './vendor/three.module.js';

/* ── palette (sampled from the storyboard, not invented — see CLAUDE.md) ─ */

const PEARL   = 0xF2F4F8;
const PEARL2  = 0xE8ECF4;
const VIOLET  = 0x6C4CE0;
const CYAN    = 0x35B8F2;
const MAGENTA = 0xC64BE8;

/* ── the sixteen beats, as p ranges (mirrors the table in app.js/CLAUDE.md) ─ */

const FREEZE_A = 0.530, FREEZE_B = 0.575;          // THE STOP — the hard vacuum
const ACTIVATE_A = 0.575, ACTIVATE_B = 0.640;      // the core forms, ring appears once
const SPLASH_A = 0.640, SPLASH_B = 0.700;          // the wave travels outward
const CORE_OUT_A = 0.680, CORE_OUT_B = 0.720;      // the core dissolves into the after-world

const MARKETING_ON = 0.058, SALES_ON = 0.120, OPS_ON = 0.185;
const CHAOS_GROW_A = 0.250, CHAOS_GROW_B = 0.470;  // "all families now active and swirling"
const BOTTLENECK_A = 0.470;                        // compresses toward centre through FREEZE_A

const RESOLVE_MKT_A = 0.700, RESOLVE_MKT_B = 0.760;     // SMART MARKETING
const RESOLVE_SALES_A = 0.760, RESOLVE_SALES_B = 0.820; // AI-POWERED SALES
const RESOLVE_OPS_A = 0.820, RESOLVE_OPS_B = 0.880;     // ALWAYS-ON OPERATIONS

const RIBBON_IN_A = 0.620, RIBBON_IN_B = 0.680;
const MEDAL_IN_A = 0.840, MEDAL_IN_B = 0.880;
const CHAIN_A = 0.880, CHAIN_B = 0.945;            // matches app.js's own wave constants exactly

const VORTEX_OUT_A = 0.930, VORTEX_OUT_B = 0.965;  // everything earlier dissolves
const VORTEX_IN_A = 0.910, VORTEX_IN_B = 0.975;    // the closing cubes arrive
const CLOSE_A = 0.945, CLOSE_B = 1.000;

const AMBIENT_OUT_A = 0.03, AMBIENT_OUT_B = 0.11;

/* ── small maths, hoisted so update() never allocates ────────────────────── */

const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const smoothstep = (e0, e1, x) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
/* seeded, so every reload scatters the debris identically — same trick as app.js */
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

/* the ribbon's own cyan → violet → magenta sweep, reused for the ring, the
   medallions and every instanced family's baked tint so the whole piece reads
   as one signature gradient rather than five unrelated accent colours */
const GRAD_STOPS = [new THREE.Color(CYAN), new THREE.Color(VIOLET), new THREE.Color(MAGENTA), new THREE.Color(CYAN)];
function gradientColor(t, out) {
  const tt = ((t % 1) + 1) % 1;
  const seg = tt * 3;
  const i = Math.min(2, Math.floor(seg));
  const f = seg - i;
  out.copy(GRAD_STOPS[i]).lerp(GRAD_STOPS[i + 1], f);
  return out;
}

/* module-scope scratch — every family and every frame reuses these instead of
   allocating a fresh Object3D/Matrix4 per instance per frame */
const _dummy = new THREE.Object3D();

/* ── the shared "fake glass" material ─────────────────────────────────────
   One vertex/fragment pair, reused (with different uniform values) for every
   family in the piece: chaos cards through the closing cubes, the core, the
   nodes, the shockwave shell and the medallions. No transmission — hundreds
   of transmissive instances would tank the frame rate — just a fresnel rim
   faked from the view direction, plus an optional per-face rounded-rect mask
   and one of a few purely procedural "abstract bars" patterns. Nothing here
   is a texture, a glyph or a logo. */

const GLASS_VERT = `
varying vec3 vNormalV;
varying vec3 vViewDirV;
varying vec2 vUv;
varying vec3 vInstColor;

void main() {
  vUv = uv;

  #ifdef USE_INSTANCING
    vec4 localPos = instanceMatrix * vec4(position, 1.0);
    vec3 localNormal = mat3(instanceMatrix) * normal;
  #else
    vec4 localPos = vec4(position, 1.0);
    vec3 localNormal = normal;
  #endif

  #ifdef USE_INSTANCING_COLOR
    vInstColor = instanceColor;
  #else
    vInstColor = vec3(1.0);
  #endif

  vec4 mvPosition = modelViewMatrix * localPos;
  vNormalV = normalize(normalMatrix * localNormal);
  vViewDirV = normalize(-mvPosition.xyz);   /* view space: camera sits at the origin */

  gl_Position = projectionMatrix * mvPosition;
}
`;

const GLASS_FRAG = `
varying vec3 vNormalV;
varying vec3 vViewDirV;
varying vec2 vUv;
varying vec3 vInstColor;

uniform vec3 uBase;
uniform vec3 uAccent;
uniform float uOpacity;    // family-level fade (0..1), the ONLY per-frame write on most families
uniform float uGlow;       // transient brighten: activation forming, splash wash, medallion lit
uniform float uMaskRect;   // >0.5: clip to a rounded rect using this face's own UV
uniform float uPattern;    // 0 none, 1 bars, 2 lines, 3 crease, 4 dot — all procedural, never glyphs

float glassHash(float x) { return fract(sin(x * 127.1) * 43758.5453); }

void main() {
  vec3 N = normalize(vNormalV);
  vec3 V = normalize(vViewDirV);
  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.4);

  vec3 accent = uAccent * vInstColor;
  vec3 col = mix(uBase, accent, clamp(fres * 1.15 + uGlow * 0.55, 0.0, 1.0));
  float alpha = mix(0.30, 0.86, fres) + uGlow * 0.22;

  if (uMaskRect > 0.5) {
    /* standard rounded-box SDF (Inigo Quilez form) in per-face UV space, so
       a thin BoxGeometry reads as an abstract rounded card, never a hard slab */
    vec2 c = abs(vUv - 0.5) * 2.0;
    float rr = 0.30;
    vec2 q = c - (1.0 - rr);
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - rr;
    alpha *= 1.0 - smoothstep(-0.02, 0.02, d);
  }

  if (uPattern > 0.5 && uPattern < 1.5) {                 // vertical bars — cards
    float slot = floor(vUv.x * 4.0);
    float h = 0.16 + glassHash(slot + 4.0) * 0.5;
    float inCol = step(fract(vUv.x * 4.0), 0.68);
    float filled = step(vUv.y, h) * step(0.08, vUv.y);
    float bar = inCol * filled;
    col = mix(col, accent, bar * 0.55);
    alpha += bar * 0.12;
  } else if (uPattern > 1.5 && uPattern < 2.5) {           // horizontal lines — tickets
    float rows = fract(vUv.y * 7.0);
    float line = step(0.80, rows) * step(0.10, vUv.x) * step(vUv.x, 0.90);
    col = mix(col, accent, line * 0.4);
    alpha += line * 0.08;
  } else if (uPattern > 2.5 && uPattern < 3.5) {           // diagonal crease — envelopes
    float crease = 1.0 - smoothstep(0.0, 0.035, abs((vUv.x - 0.5) - (vUv.y - 0.5)));
    col = mix(col, accent, crease * 0.5);
    alpha += crease * 0.1;
  } else if (uPattern > 3.5) {                             // centre dot — tiles
    float d2 = length(vUv - 0.5);
    float dot0 = 1.0 - smoothstep(0.09, 0.15, d2);
    col = mix(col, accent, dot0 * 0.65);
    alpha += dot0 * 0.12;
  }

  alpha = clamp(alpha, 0.0, 1.0) * uOpacity;
  if (alpha <= 0.003) discard;

  gl_FragColor = vec4(col, alpha);
  gl_FragColor = linearToOutputTexel(gl_FragColor);   /* auto-injected; matches every built-in material's output */
}
`;

function makeGlassMaterial({ base = PEARL2, accent = 0xffffff, maskRect = 0, pattern = 0, additive = false } = {}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uBase:     { value: new THREE.Color(base) },
      uAccent:   { value: new THREE.Color(accent) },
      uOpacity:  { value: 1 },
      uGlow:     { value: 0 },
      uMaskRect: { value: maskRect },
      uPattern:  { value: pattern }
    },
    vertexShader: GLASS_VERT,
    fragmentShader: GLASS_FRAG,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending
  });
}

/* ── the ribbon's own shader — a flowing gradient band, the signature element ─ */

const RIBBON_VERT = `
uniform float uTime;
uniform float uAmp;
varying float vEdge;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  float w1 = sin(pos.x * 1.6 + uTime * 0.9);
  float w2 = sin(pos.x * 3.1 - uTime * 1.3);
  float envel = max(1.0 - abs(uv.y - 0.5) * 1.5, 0.0);
  pos.y += (w1 * 0.6 + w2 * 0.4) * uAmp * envel;
  pos.z += cos(pos.x * 1.1 + uTime * 0.6) * uAmp * 0.5;

  vEdge = 1.0 - clamp(abs(uv.y - 0.5) * 2.0, 0.0, 1.0);   // 1 at the centreline, 0 at the long edges

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const RIBBON_FRAG = `
varying float vEdge;
varying vec2 vUv;
uniform vec3 uCyan;
uniform vec3 uViolet;
uniform vec3 uMagenta;
uniform float uOpacity;

void main() {
  float t = clamp(vUv.x, 0.0, 1.0);
  vec3 col = t < 0.5 ? mix(uCyan, uViolet, t * 2.0) : mix(uViolet, uMagenta, (t - 0.5) * 2.0);

  float edge = vEdge * vEdge;
  float alpha = edge * 0.85 * uOpacity;
  if (alpha <= 0.003) discard;

  gl_FragColor = vec4(col, alpha);
  gl_FragColor = linearToOutputTexel(gl_FragColor);
}
`;

/* ── chaos-family construction ────────────────────────────────────────────
   One data-driven builder for every "debris" population (the five pain-beat
   families plus the faint opening ambience). Each instance gets a permanent
   seed — orbit angle, radius, spin, phase, resting scale/tilt and an AFTER
   grid slot — computed once here and read every frame in updateFamily(),
   never recomputed. */

function buildFamily(scene, opts) {
  const {
    count, geometry, seed, base, maskRect, pattern, additive = false,
    onset, bias0, bias1, cols, spacingX, spacingY,
    radiusRange, yRange, scaleRange, accentT, jitter, useColor = true
  } = opts;

  const material = makeGlassMaterial({ base, accent: 0xffffff, maskRect, pattern, additive });
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;

  const angle0 = new Float32Array(count);
  const radX = new Float32Array(count);
  const radZ = new Float32Array(count);
  const yBase = new Float32Array(count);
  const spin = new Float32Array(count);
  const phase = new Float32Array(count);
  const scaleBase = new Float32Array(count);
  const tiltX = new Float32Array(count);
  const tiltZ = new Float32Array(count);
  const onsetOff = new Float32Array(count);
  const slotX = new Float32Array(count);
  const slotY = new Float32Array(count);
  const slotZ = new Float32Array(count);
  const slotTiltX = new Float32Array(count);
  const slotTiltZ = new Float32Array(count);

  const rand = rng(seed);
  const rows = Math.max(1, Math.ceil(count / cols));
  const cTmp = new THREE.Color();

  for (let i = 0; i < count; i++) {
    angle0[i] = rand() * Math.PI * 2;
    radX[i] = radiusRange[0] + rand() * (radiusRange[1] - radiusRange[0]);
    radZ[i] = radiusRange[0] + rand() * (radiusRange[1] - radiusRange[0]);
    yBase[i] = yRange[0] + rand() * (yRange[1] - yRange[0]);
    spin[i] = (0.15 + rand() * 0.34) * (rand() < 0.5 ? -1 : 1);
    phase[i] = rand() * Math.PI * 2;
    scaleBase[i] = scaleRange[0] + rand() * (scaleRange[1] - scaleRange[0]);
    tiltX[i] = (rand() - 0.5) * 2.2;
    tiltZ[i] = (rand() - 0.5) * 2.2;
    onsetOff[i] = rand() * 0.028;

    const col = i % cols;
    const row = (i / cols) | 0;
    slotX[i] = (col - (cols - 1) / 2) * spacingX + (rand() - 0.5) * 0.02;
    slotY[i] = ((rows - 1) / 2 - row) * spacingY + (rand() - 0.5) * 0.02;
    slotZ[i] = (rand() - 0.5) * 0.06;
    slotTiltX[i] = (rand() - 0.5) * 0.12;
    slotTiltZ[i] = (rand() - 0.5) * 0.12;

    if (useColor) {
      gradientColor(accentT + (rand() - 0.5) * jitter, cTmp);
      mesh.setColorAt(i, cTmp);
    }

    /* park off-screen so the very first frame (before update() has run) never
       shows a stray instance sitting at the origin at full size */
    _dummy.position.set(0, -50, 0);
    _dummy.rotation.set(0, 0, 0);
    _dummy.scale.setScalar(0.0001);
    _dummy.updateMatrix();
    mesh.setMatrixAt(i, _dummy.matrix);
  }

  if (useColor) mesh.instanceColor.needsUpdate = true;
  mesh.instanceMatrix.needsUpdate = true;
  scene.add(mesh);

  return {
    mesh, material, count, onset, bias: bias0, biasAfter: bias1,
    angle0, radX, radZ, yBase, spin, phase, scaleBase, tiltX, tiltZ,
    onsetOff, slotX, slotY, slotZ, slotTiltX, slotTiltZ
  };
}

/* Per-frame pose for one chaos family. chaosBaseP is ALREADY clamped to
   FREEZE_A by the caller — that single clamp is what makes the bottleneck
   pose permanent from the freeze onward, so everything below it (wobble,
   orbit, compression) is provably frozen too, not just visually close. */
function updateFamily(fam, chaosBaseP, resolveW, opacityMul, clock) {
  const {
    mesh, material, count, bias, biasAfter,
    angle0, radX, radZ, yBase, spin, phase, scaleBase, tiltX, tiltZ,
    onsetOff, slotX, slotY, slotZ, slotTiltX, slotTiltZ, onset
  } = fam;

  material.uniforms.uOpacity.value = opacityMul;

  const growT = smoothstep(CHAOS_GROW_A, CHAOS_GROW_B, chaosBaseP);
  const compT = smoothstep(BOTTLENECK_A, FREEZE_A, chaosBaseP);
  const centerX = bias[0] * (1 - compT);
  const centerZ = bias[2] + compT * 0.85;

  for (let i = 0; i < count; i++) {
    const bornAt = onset + onsetOff[i];
    const on = smoothstep(bornAt, bornAt + 0.05, chaosBaseP);

    if (on <= 0.0005 && resolveW <= 0.0005) {
      _dummy.position.set(0, -50, 0);
      _dummy.rotation.set(0, 0, 0);
      _dummy.scale.setScalar(0.0001);
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
      continue;
    }

    const ang = angle0[i] + chaosBaseP * spin[i] * (1 + growT * 2.0 + compT * 0.5);
    const wobbleAmp = 0.04 + growT * 0.20 + compT * 0.12;
    const wob = Math.sin(ang * 2.3 + phase[i]) * wobbleAmp;

    const rX = radX[i] * (1 + growT * 0.5) * (1 - compT * 0.55);
    const rZ = radZ[i] * (1 + growT * 0.5) * (1 - compT * 0.55);

    const chx = centerX + Math.cos(ang) * rX + wob;
    const chy = bias[1] + yBase[i] * (1 - compT * 0.4) + Math.sin(ang * 1.3) * rX * 0.4 * (1 - compT * 0.3);
    const chz = centerZ + Math.sin(ang) * rZ * 0.5;

    const chaosScale = scaleBase[i] * on;
    const chaosRotX = tiltX[i] + ang * 0.5;
    const chaosRotZ = tiltZ[i] + ang * 0.3;

    const bob = resolveW > 0.001 ? Math.sin(clock * 0.0011 + phase[i] * 4.0) * 0.022 * resolveW : 0;

    const fx = chx + (biasAfter[0] + slotX[i] - chx) * resolveW;
    const fy = chy + (biasAfter[1] + slotY[i] - chy) * resolveW + bob;
    const fz = chz + (biasAfter[2] + slotZ[i] - chz) * resolveW;

    _dummy.position.set(fx, fy, fz);
    _dummy.rotation.set(
      chaosRotX * (1 - resolveW) + slotTiltX[i] * resolveW,
      ang * 0.15 * (1 - resolveW),
      chaosRotZ * (1 - resolveW) + slotTiltZ[i] * resolveW
    );
    _dummy.scale.setScalar(Math.max(chaosScale * (1 - resolveW) + scaleBase[i] * resolveW, 0.0001));
    _dummy.updateMatrix();
    mesh.setMatrixAt(i, _dummy.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

/* ── the closing vortex: ~220 cubes spiralling into a resting formation ──── */

function buildCloseFamily(scene, count, seed, geometry) {
  const material = makeGlassMaterial({ base: PEARL, accent: 0xffffff, maskRect: 1, pattern: 0, additive: false });
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.visible = false;

  const angle0 = new Float32Array(count);
  const radius0 = new Float32Array(count);
  const zStart = new Float32Array(count);
  const yOff = new Float32Array(count);
  const spin = new Float32Array(count);
  const tumble = new Float32Array(count);
  const tiltX = new Float32Array(count);
  const tiltY = new Float32Array(count);
  const tiltZ = new Float32Array(count);
  const scaleV = new Float32Array(count);

  const rand = rng(seed);
  const cTmp = new THREE.Color();

  for (let i = 0; i < count; i++) {
    angle0[i] = rand() * Math.PI * 2;
    radius0[i] = 0.5 + rand() * 2.6;
    zStart[i] = -0.4 - rand() * 2.8;
    yOff[i] = (rand() - 0.5) * 1.6;
    spin[i] = 1.6 + rand() * 2.2;
    tumble[i] = 0.5 + rand() * 1.5;
    tiltX[i] = rand() * Math.PI * 2;
    tiltY[i] = rand() * Math.PI * 2;
    tiltZ[i] = rand() * Math.PI * 2;
    scaleV[i] = 0.6 + rand() * 0.9;

    gradientColor(rand(), cTmp);
    mesh.setColorAt(i, cTmp);

    _dummy.position.set(0, -50, 0);
    _dummy.rotation.set(0, 0, 0);
    _dummy.scale.setScalar(0.0001);
    _dummy.updateMatrix();
    mesh.setMatrixAt(i, _dummy.matrix);
  }
  mesh.instanceColor.needsUpdate = true;
  mesh.instanceMatrix.needsUpdate = true;
  scene.add(mesh);

  return { mesh, material, count, angle0, radius0, zStart, yOff, spin, tumble, tiltX, tiltY, tiltZ, scaleV };
}

function updateCloseCubes(fam, vp, clock) {
  const { mesh, count, angle0, radius0, zStart, yOff, spin, tumble, tiltX, tiltY, tiltZ, scaleV } = fam;
  for (let i = 0; i < count; i++) {
    const ang = angle0[i] + vp * (2.3 + spin[i]);
    const rad = radius0[i] * (1 - vp * 0.82) + 0.05;
    const z = zStart[i] + (-2.6 - zStart[i]) * vp;
    const x = Math.cos(ang) * rad;
    const y = Math.sin(ang) * rad * 0.7 + yOff[i] * (1 - vp * 0.6);
    const tumbleAmt = (1 - vp) * clock * tumble[i] * 0.0006;   // settles to a calm rest as vp -> 1

    _dummy.position.set(x, y, z);
    _dummy.rotation.set(tiltX[i] + tumbleAmt, tiltY[i] + ang * 0.4, tiltZ[i] + tumbleAmt * 0.7);
    _dummy.scale.setScalar(scaleV[i]);
    _dummy.updateMatrix();
    mesh.setMatrixAt(i, _dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

/* ── the scene ─────────────────────────────────────────────────────────── */

export function createScene(canvas) {
  const w0 = canvas.clientWidth || window.innerWidth || 1;
  const h0 = canvas.clientHeight || window.innerHeight || 1;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);         // the 30s video plays behind this canvas
  renderer.setSize(w0, h0, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, w0 / (h0 || 1), 0.1, 60);
  camera.position.set(0, 0, 8);
  const CAM_Z0 = 8, CAM_DOLLY = 1.3;

  /* read once at construction, per the brief: instance counts scale down below
     ~900px so the file stays safe if the static-hero gate is ever loosened */
  const scaleFactor = w0 < 900 ? 0.55 : 1;
  const ambientCount   = Math.max(4,  Math.round(8   * scaleFactor));
  const cardsCount     = Math.max(16, Math.round(58  * scaleFactor));
  const tilesCount     = Math.max(14, Math.round(50  * scaleFactor));
  const envelopesCount = Math.max(14, Math.round(50  * scaleFactor));
  const bubblesCount   = Math.max(14, Math.round(50  * scaleFactor));
  const ticketsCount   = Math.max(14, Math.round(50  * scaleFactor));
  const cubeCount      = Math.max(60, Math.round(220 * scaleFactor));

  /* ── geometry: thin boxes read as abstract rounded cards once the fragment
     shader's SDF mask clips their corners; the sphere for bubbles is squashed
     once, here, so every per-instance transform below stays uniform-scale
     (a non-uniform per-instance scale would need a real inverse-transpose
     normal matrix, which the shared shader deliberately skips for speed) ── */
  const ambientGeo = new THREE.PlaneGeometry(0.85, 0.5);
  const cardGeo = new THREE.BoxGeometry(0.58, 0.38, 0.035);
  const tileGeo = new THREE.BoxGeometry(0.27, 0.27, 0.032);
  const envGeo = new THREE.BoxGeometry(0.64, 0.40, 0.032);
  const bubbleGeo = new THREE.SphereGeometry(0.20, 12, 8);
  bubbleGeo.scale(1, 1, 0.55);
  const ticketGeo = new THREE.BoxGeometry(0.20, 0.55, 0.030);
  const cubeGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);

  /* ── the six chaos populations (ambient panes + five pain-beat families) ── */

  const famAmbient = buildFamily(scene, {
    count: ambientCount, geometry: ambientGeo, seed: 0x1001,
    base: PEARL, maskRect: 1, pattern: 0, useColor: false,
    onset: 0, bias0: [0, 0.10, -3.4], bias1: [0, 0.10, -3.4],
    cols: 4, spacingX: 0.9, spacingY: 0.6,
    radiusRange: [1.4, 3.2], yRange: [-0.9, 0.9], scaleRange: [0.8, 1.3],
    accentT: 0, jitter: 0
  });

  const famCards = buildFamily(scene, {
    count: cardsCount, geometry: cardGeo, seed: 0x2001,
    base: PEARL2, maskRect: 1, pattern: 1,
    onset: MARKETING_ON, bias0: [-2.3, 0.22, 0.20], bias1: [-2.3, 0.55, 0.10],
    cols: 8, spacingX: 0.30, spacingY: 0.24,
    radiusRange: [0.55, 1.35], yRange: [-0.55, 0.55], scaleRange: [0.78, 1.15],
    accentT: 0.03, jitter: 0.10
  });

  const famTiles = buildFamily(scene, {
    count: tilesCount, geometry: tileGeo, seed: 0x2101,
    base: PEARL2, maskRect: 1, pattern: 4,
    onset: MARKETING_ON + 0.012, bias0: [-2.3, 0.22, 0.20], bias1: [-2.3, 0.55, 0.10],
    cols: 8, spacingX: 0.20, spacingY: 0.18,
    radiusRange: [0.45, 1.20], yRange: [-0.5, 0.5], scaleRange: [0.6, 0.95],
    accentT: 0.16, jitter: 0.10
  });

  const famEnvelopes = buildFamily(scene, {
    count: envelopesCount, geometry: envGeo, seed: 0x3001,
    base: PEARL2, maskRect: 1, pattern: 3,
    onset: SALES_ON, bias0: [0.0, 0.08, 0.40], bias1: [0.0, 0.50, 0.30],
    cols: 7, spacingX: 0.32, spacingY: 0.24,
    radiusRange: [0.5, 1.3], yRange: [-0.5, 0.5], scaleRange: [0.8, 1.2],
    accentT: 0.5, jitter: 0.10
  });

  const famBubbles = buildFamily(scene, {
    count: bubblesCount, geometry: bubbleGeo, seed: 0x4001,
    base: PEARL2, maskRect: 0, pattern: 0,
    onset: OPS_ON, bias0: [2.3, 0.18, 0.20], bias1: [2.3, 0.55, 0.10],
    cols: 8, spacingX: 0.24, spacingY: 0.22,
    radiusRange: [0.45, 1.2], yRange: [-0.5, 0.5], scaleRange: [0.55, 0.95],
    accentT: 0.65, jitter: 0.10
  });

  const famTickets = buildFamily(scene, {
    count: ticketsCount, geometry: ticketGeo, seed: 0x4101,
    base: PEARL2, maskRect: 1, pattern: 2,
    onset: OPS_ON + 0.012, bias0: [2.3, 0.18, 0.20], bias1: [2.3, 0.55, 0.10],
    cols: 8, spacingX: 0.18, spacingY: 0.30,
    radiusRange: [0.5, 1.3], yRange: [-0.55, 0.55], scaleRange: [0.7, 1.05],
    accentT: 0.85, jitter: 0.10
  });

  const chaosMats = [famCards.material, famTiles.material, famEnvelopes.material, famBubbles.material, famTickets.material];

  /* ── the AI-activation core: glass + light + connected nodes ──────────────
     The nodes sit on a small Fibonacci-sphere shell (a 3D cluster) rather than
     a flat circle, so this reads as a molecule/atom, not a rehash of the
     rejected flat dot-ring. The ONE torus in the whole file lives here, as an
     equatorial band, and is gradient-coloured with the ribbon's own palette. */

  const coreGroup = new THREE.Group();
  coreGroup.visible = false;

  const coreMat = makeGlassMaterial({ base: PEARL, accent: VIOLET, maskRect: 0, pattern: 0, additive: false });
  const coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 1), coreMat);
  coreGroup.add(coreMesh);

  const ringGeo = new THREE.TorusGeometry(0.95, 0.032, 8, 64);
  {
    /* TorusGeometry's own uv.x IS the main-loop sweep parameter (0..1), so the
       gradient can be baked straight from it with no trig needed */
    const uvAttr = ringGeo.attributes.uv;
    const colors = new Float32Array(uvAttr.count * 3);
    const cTmp = new THREE.Color();
    for (let i = 0; i < uvAttr.count; i++) {
      gradientColor(uvAttr.getX(i), cTmp);
      colors[i * 3] = cTmp.r; colors[i * 3 + 1] = cTmp.g; colors[i * 3 + 2] = cTmp.b;
    }
    ringGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }
  const ringMat = new THREE.MeshBasicMaterial({
    vertexColors: true, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  coreGroup.add(ringMesh);

  const NODE_COUNT = 18;
  const nodesMat = makeGlassMaterial({ base: PEARL, accent: CYAN, maskRect: 0, pattern: 0, additive: true });
  const nodesMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.055, 8, 6), nodesMat, NODE_COUNT);
  nodesMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  nodesMesh.frustumCulled = false;

  const linePositions = new Float32Array(NODE_COUNT * 2 * 3);
  for (let i = 0; i < NODE_COUNT; i++) {
    const t = (i + 0.5) / NODE_COUNT;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;     // Fibonacci sphere — even 3D coverage, cheap
    const r = 0.88;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    _dummy.position.set(x, y, z);
    _dummy.rotation.set(0, 0, 0);
    _dummy.scale.setScalar(1);
    _dummy.updateMatrix();
    nodesMesh.setMatrixAt(i, _dummy.matrix);

    linePositions[i * 6 + 0] = 0; linePositions[i * 6 + 1] = 0; linePositions[i * 6 + 2] = 0;
    linePositions[i * 6 + 3] = x; linePositions[i * 6 + 4] = y; linePositions[i * 6 + 5] = z;
  }
  nodesMesh.instanceMatrix.needsUpdate = true;
  coreGroup.add(nodesMesh);

  const linesGeo = new THREE.BufferGeometry();
  linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const linesMat = new THREE.LineBasicMaterial({
    color: 0xE4ECFF, transparent: true, opacity: 0.45,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
  coreGroup.add(linesMesh);

  coreGroup.position.set(0, 0.15, 0.6);
  scene.add(coreGroup);

  /* ── the spatial-splash shockwave: an expanding fresnel shell, never a ring ── */

  const shockMat = makeGlassMaterial({ base: PEARL, accent: VIOLET, maskRect: 0, pattern: 0, additive: true });
  const shockMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), shockMat);
  shockMesh.position.copy(coreGroup.position);
  shockMesh.visible = false;
  scene.add(shockMesh);

  /* ── the ribbon: the signature element, carries the whole boldness budget ── */

  const ribbonGeo = new THREE.PlaneGeometry(9.2, 1.3, 56, 8);
  const ribbonMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }, uAmp: { value: 0.18 },
      uCyan: { value: new THREE.Color(CYAN) }, uViolet: { value: new THREE.Color(VIOLET) }, uMagenta: { value: new THREE.Color(MAGENTA) },
      uOpacity: { value: 0 }
    },
    vertexShader: RIBBON_VERT, fragmentShader: RIBBON_FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
  });
  const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
  ribbonMesh.position.set(0, 0.05, 0.55);
  ribbonMesh.visible = false;
  scene.add(ribbonMesh);

  /* ── the six medallions, threaded by the ribbon in CONNECTED SYSTEM ───────
     Only six objects — plain individual meshes are simpler and just as
     cheap as instancing at this count, and each needs its own independent
     "lit" value as the wave passes, which a shared InstancedMesh material
     cannot hold per-instance without extra machinery.

     MEDAL_COUNT must match the number of .chain-item pills in index.html: the
     medallions are the 3D echo of that row, and a mismatch shows up as the
     ribbon lighting a bead the reader has no chip for. */

  const medallionGroup = new THREE.Group();
  medallionGroup.visible = false;
  const medallionGeo = new THREE.CircleGeometry(0.24, 24);
  const MEDAL_COUNT = 6;
  const medallionMeshes = [];
  for (let i = 0; i < MEDAL_COUNT; i++) {
    const t = i / (MEDAL_COUNT - 1);
    const accent = gradientColor(t, new THREE.Color());
    const mat = makeGlassMaterial({ base: PEARL, accent, maskRect: 0, pattern: 0, additive: true });
    const mesh = new THREE.Mesh(medallionGeo, mat);
    mesh.position.set((t - 0.5) * 4.6, Math.sin(t * Math.PI) * 0.16, 0);
    mesh.userData.t = t;
    medallionGroup.add(mesh);
    medallionMeshes.push(mesh);
  }
  medallionGroup.position.set(0, -0.1, 0.5);
  scene.add(medallionGroup);

  /* ── the closing vortex ────────────────────────────────────────────────── */

  const famClose = buildCloseFamily(scene, cubeCount, 0x9e17, cubeGeo);

  /* ── per-frame state — the ONLY mutable module/closure state update() owns ─
     clock is gated so it never advances during the freeze; heldPx/heldPy do
     the same for pointer parallax, so the camera cannot drift during THE STOP
     either, even if the reader's mouse is moving. */

  let clock = 0;
  let heldPx = 0, heldPy = 0;

  function update(p, px, py, dt) {
    p = clamp01(p);
    const frozen = p >= FREEZE_A && p <= FREEZE_B;
    if (!frozen) { clock += dt; heldPx = px; heldPy = py; }

    const chaosBaseP = Math.min(p, FREEZE_A);   // permanently pinned once the freeze is reached
    const dollyP = frozen ? FREEZE_A : p;       // camera pin: held only WHILE frozen, resumes after

    camera.position.set(
      heldPx * 0.26 + Math.sin(clock * 0.00018) * 0.05,
      -heldPy * 0.16 + Math.cos(clock * 0.00014) * 0.04,
      CAM_Z0 - dollyP * CAM_DOLLY
    );

    const resolveMkt = smoothstep(RESOLVE_MKT_A, RESOLVE_MKT_B, p);
    const resolveSales = smoothstep(RESOLVE_SALES_A, RESOLVE_SALES_B, p);
    const resolveOps = smoothstep(RESOLVE_OPS_A, RESOLVE_OPS_B, p);

    const legacyFade = 1 - smoothstep(VORTEX_OUT_A, VORTEX_OUT_B, p);
    const ambientEnv = 1 - smoothstep(AMBIENT_OUT_A, AMBIENT_OUT_B, p);

    updateFamily(famAmbient, chaosBaseP, 0, ambientEnv, clock);
    updateFamily(famCards, chaosBaseP, resolveMkt, legacyFade, clock);
    updateFamily(famTiles, chaosBaseP, resolveMkt, legacyFade, clock);
    updateFamily(famEnvelopes, chaosBaseP, resolveSales, legacyFade, clock);
    updateFamily(famBubbles, chaosBaseP, resolveOps, legacyFade, clock);
    updateFamily(famTickets, chaosBaseP, resolveOps, legacyFade, clock);

    /* the wave "reaching the six functions" washes the whole debris field
       with a brief brightening pulse — one uniform write per material, not
       per instance, so it costs nothing extra */
    const splashT = smoothstep(SPLASH_A, SPLASH_B, p);
    const washPulse = Math.sin(Math.PI * clamp01(splashT)) * 0.42;
    for (let i = 0; i < chaosMats.length; i++) chaosMats[i].uniforms.uGlow.value = washPulse;

    const actT = smoothstep(ACTIVATE_A, ACTIVATE_B, p);
    const coreFade = actT * (1 - smoothstep(CORE_OUT_A, CORE_OUT_B, p));
    coreGroup.visible = coreFade > 0.004;
    if (coreGroup.visible) {
      coreGroup.scale.setScalar(0.35 + actT * 0.65);
      coreGroup.rotation.y = clock * 0.00022;
      coreGroup.rotation.x = Math.sin(clock * 0.00016) * 0.08;
      coreMat.uniforms.uOpacity.value = coreFade;
      coreMat.uniforms.uGlow.value = actT * 0.6;
      nodesMat.uniforms.uOpacity.value = coreFade;
      nodesMat.uniforms.uGlow.value = actT;
      ringMat.opacity = coreFade * 0.85;
      linesMat.opacity = coreFade * 0.4;
    }

    const shellShape = Math.sin(Math.PI * clamp01(splashT));
    shockMesh.visible = shellShape > 0.004;
    if (shockMesh.visible) {
      shockMesh.scale.setScalar(0.25 + splashT * 2.5);
      shockMat.uniforms.uOpacity.value = shellShape * 0.4;
      shockMat.uniforms.uGlow.value = 0.8;
    }

    const ribbonIn = smoothstep(RIBBON_IN_A, RIBBON_IN_B, p) * legacyFade;
    ribbonMesh.visible = ribbonIn > 0.004;
    if (ribbonMesh.visible) {
      ribbonMat.uniforms.uOpacity.value = ribbonIn;
      ribbonMat.uniforms.uTime.value = clock * 0.001;
      ribbonMat.uniforms.uAmp.value = 0.16 + splashT * 0.14;
    }

    const medalIn = smoothstep(MEDAL_IN_A, MEDAL_IN_B, p) * legacyFade;
    medallionGroup.visible = medalIn > 0.004;
    if (medallionGroup.visible) {
      const wave = clamp01((p - CHAIN_A) / (CHAIN_B - CHAIN_A));
      for (let i = 0; i < medallionMeshes.length; i++) {
        const mesh = medallionMeshes[i];
        const lit = clamp01((wave - mesh.userData.t) * 6);
        mesh.material.uniforms.uOpacity.value = medalIn * (0.5 + lit * 0.5);
        mesh.material.uniforms.uGlow.value = lit * 0.85;
        mesh.scale.setScalar(0.82 + lit * 0.28);
      }
    }

    const vortexIn = smoothstep(VORTEX_IN_A, VORTEX_IN_B, p);
    famClose.mesh.visible = vortexIn > 0.002;
    famClose.material.uniforms.uOpacity.value = vortexIn;
    if (famClose.mesh.visible) {
      const vp = smoothstep(CLOSE_A, CLOSE_B, p);
      updateCloseCubes(famClose, vp, clock);
    }

    renderer.render(scene, camera);
  }

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  return { update, resize };
}
