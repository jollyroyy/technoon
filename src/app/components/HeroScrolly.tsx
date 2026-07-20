'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type HeroChapter = {
  /** progress range [from, to] in 0..1 */
  range: [number, number];
  heading: string;
  headingAccent: string;
  sub: string;
};

type Props = {
  chapters: HeroChapter[];
  trustLine: string;
};

const FRAME_SETS = {
  desktop: { path: '/frames', count: 241 },
  mobile: { path: '/frames-m', count: 121 },
} as const;

/** CSS top offset — navbar (84px) + 50px gap. */
const CANVAS_TOP = 134;
/** Every Nth frame loads first so scrubbing works almost immediately. */
const KEYFRAME_STEP = 8;
/** Crossfade width between chapter beats, in progress units. */
const FADE = 0.05;

function zeroPad(n: number) {
  return String(n).padStart(6, '0');
}

/**
 * Cover-crop draw — fills the canvas at native DPR resolution.
 * canvas.width/height are physical pixels; drawImage coords are physical pixels.
 * Anchor: horizontal 50%, vertical top (0%) — top of image is never cropped.
 */
function drawCover(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement
) {
  if (!img.naturalWidth || !img.naturalHeight) return;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = 0; // top-anchored — never crops the top of the frame

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

/** Opacity of a chapter at a given progress, with soft edges. */
function chapterOpacity(range: [number, number], p: number, isFirst: boolean, isLast: boolean) {
  const [from, to] = range;
  const fadeIn = isFirst ? 1 : Math.min(1, Math.max(0, (p - from) / FADE));
  const fadeOut = isLast ? 1 : Math.min(1, Math.max(0, (to - p) / FADE));
  if (p < from - 0.001 || p > to + 0.001) return 0;
  return Math.min(fadeIn, fadeOut);
}

export default function HeroScrolly({ chapters, trustLine }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const frameIndexRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const frameSetRef = useRef<{ path: string; count: number }>(FRAME_SETS.desktop);

  const [keyframesLoaded, setKeyframesLoaded] = useState(0);
  const [keyframeTotal, setKeyframeTotal] = useState(1);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /** Nearest loaded frame to idx — lets us scrub before every frame arrives. */
  const nearestLoaded = useCallback((idx: number) => {
    const loaded = loadedRef.current;
    if (loaded[idx]) return idx;
    for (let d = 1; d < loaded.length; d++) {
      if (loaded[idx - d]) return idx - d;
      if (loaded[idx + d]) return idx + d;
    }
    return -1;
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = window.innerWidth;
    const availH = window.innerHeight - CANVAS_TOP;
    const ASPECT = 16 / 9;
    /** Vertical scale — zoomed-out cinematic height, full width. */
    const SCALE = 0.88;
    const cssH = Math.min(Math.round((cssW / ASPECT) * SCALE), availH);

    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    // Full width, vertically centered below the navbar
    canvas.style.left = '0px';
    canvas.style.top = `${CANVAS_TOP + Math.max(0, Math.round((availH - cssH) / 2))}px`;

    const idx = nearestLoaded(frameIndexRef.current);
    const img = imagesRef.current[idx];
    if (idx >= 0 && img?.complete && img.naturalWidth > 0) {
      const ctx = canvas.getContext('2d');
      if (ctx) drawCover(ctx, canvas, img);
    }
  }, [nearestLoaded]);

  // Reduced motion: skip scrub entirely, show static poster hero.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Progressive preload: keyframes first (draw frame 0 ASAP), then backfill.
  useEffect(() => {
    if (reducedMotion) return;

    const set = window.matchMedia('(max-width: 767px)').matches
      ? FRAME_SETS.mobile
      : FRAME_SETS.desktop;
    frameSetRef.current = set;

    const images: HTMLImageElement[] = new Array(set.count);
    const loaded: boolean[] = new Array(set.count).fill(false);
    imagesRef.current = images;
    loadedRef.current = loaded;

    const keyIdxs: number[] = [];
    for (let i = 0; i < set.count; i += KEYFRAME_STEP) keyIdxs.push(i);
    if (!keyIdxs.includes(set.count - 1)) keyIdxs.push(set.count - 1);
    setKeyframeTotal(keyIdxs.length);

    let keysDone = 0;
    let cancelled = false;

    const load = (i: number, onDone?: () => void) => {
      const img = new Image();
      img.src = `${set.path}/frame_${zeroPad(i + 1)}.webp`;
      img.onload = () => {
        if (cancelled) return;
        loaded[i] = true;
        if (i === 0) {
          setFirstFrameReady(true);
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) drawCover(ctx, canvas, img);
          }
        }
        onDone?.();
      };
      images[i] = img;
    };

    // Phase 1: keyframes.
    keyIdxs.forEach((i) =>
      load(i, () => {
        keysDone++;
        setKeyframesLoaded(keysDone);
        // Phase 2: backfill the rest once all keyframes are in.
        if (keysDone === keyIdxs.length) {
          for (let i = 0; i < set.count; i++) {
            if (!images[i]) load(i);
          }
        }
      })
    );

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  // Canvas sizing on mount + resize.
  useEffect(() => {
    if (reducedMotion) return;
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas, reducedMotion]);

  // RAF loop — draws the frame and updates chapter opacities.
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastDrawn = -1;

    /** Max downward shift in px as scroll progresses 0→1. */
    const PARALLAX_PX = 120;

    function loop() {
      const p = progressRef.current;
      const count = frameSetRef.current.count;
      const target = Math.round(p * (count - 1));
      frameIndexRef.current = target;

      const idx = nearestLoaded(target);
      if (idx >= 0 && idx !== lastDrawn) {
        lastDrawn = idx;
        const img = imagesRef.current[idx];
        if (img?.complete && img.naturalWidth > 0) {
          drawCover(ctx!, canvas!, img);
        }
      }

      // Parallax — canvas drifts downward as user scrolls.
      canvas!.style.transform = `translateY(${p * PARALLAX_PX}px)`;

      // Chapter crossfades — direct style writes, no React re-render.
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const ch = chapters[i];
        const o = chapterOpacity(ch.range, p, i === 0, i === chapters.length - 1);
        el.style.opacity = String(o);
        // Only the active beat accepts clicks (last beat holds the CTAs).
        el.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
        el.style.transform = `translateY(${(1 - o) * 14}px)`;
      });

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [chapters, nearestLoaded, reducedMotion]);

  // ScrollTrigger — writes progress, fades scroll hint.
  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const scrollHint = scrollHintRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        progressRef.current = self.progress;
        if (scrollHint) {
          scrollHint.style.opacity =
            self.progress < 0.06 ? String(1 - self.progress / 0.06) : '0';
        }
      },
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  const loadPct = Math.round((keyframesLoaded / keyframeTotal) * 100);

  // ---------- Reduced motion: static cinematic hero ----------
  if (reducedMotion) {
    const fallback = chapters[0] || {
      heading: 'Every function of your business.',
      headingAccent: 'One AI core.',
      sub: 'Websites, voice agents, support, CRM — connected and working as one.',
    };
    return (
      <section className="hero-static" id="hero">
        {/* poster uses <img> not next/image: fixed known asset, cover-fit */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/frames-m/frame_000121.webp" />
          <img src="/frames/frame_000241.webp" alt="Technoon.ai — AI systems that stop revenue leaks" className="hero-poster" />
        </picture>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-overlay hero-overlay-static">
          <h1>
            {fallback.heading}
            <span className="grad-text"> {fallback.headingAccent}</span>
          </h1>
          <p className="hero-sub">{fallback.sub}</p>
          <p className="hero-trust-line">{trustLine}</p>
        </div>
      </section>
    );
  }

  // ---------- Scrollytelling hero ----------
  return (
    <section className="hero-scrolly-container" ref={containerRef} id="hero">
      <div className="hero-sticky">
        {/* Brand ambient layers — visible before canvas paints */}
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid-bg" aria-hidden="true" />

        {/* Poster under the canvas: LCP element + no-JS fallback */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/frames-m/frame_000001.webp" />
          <img
            src="/frames/frame_000001.webp"
            alt="Technoon.ai — AI systems that stop revenue leaks"
            className="hero-poster"
            width={1920}
            height={1080}
            style={{ opacity: firstFrameReady ? 0 : 1 }}
          />
        </picture>

        {/* DPR-aware canvas — cover-fills viewport, centered */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Film grain — masks upscale softness */}
        <div className="hero-grain" aria-hidden="true" />

        {/* Loading bar — keyframe phase only */}
        {!firstFrameReady && (
          <div className="hero-loading-screen" aria-hidden="true">
            <div className="hero-loading-track">
              <div className="hero-loading-fill" style={{ width: `${loadPct}%` }} />
            </div>
          </div>
        )}

        {/* Narrative chapter beats — crossfade with scroll progress */}
        {chapters.map((ch, i) => {
          const isLast = i === chapters.length - 1;
          const Heading = i === 0 ? 'h1' : 'h2';
          return (
            <div
              key={i}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              className={`hero-chapter${isLast ? ' hero-chapter-final' : ''}`}
              style={{ opacity: i === 0 ? 1 : 0 }}
              aria-hidden={i !== 0}
            >
              <Heading className="hero-chapter-heading">
                {ch.heading}
                <span className="grad-text"> {ch.headingAccent}</span>
              </Heading>
              <p className="hero-sub">{ch.sub}</p>
              {isLast && (
                <>
                  <p className="hero-trust-line">{trustLine}</p>
                </>
              )}
            </div>
          );
        })}

        {/* Scroll hint */}
        <div className="scroll-hint" ref={scrollHintRef} aria-hidden="true">
          ↓ Scroll
        </div>
      </div>
    </section>
  );
}
