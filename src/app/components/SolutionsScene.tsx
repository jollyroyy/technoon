'use client';

import { useEffect, useRef, useState } from 'react';
import { Globe, Bot, Zap, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ICONS = { globe: Globe, bot: Bot, zap: Zap } as const;

export type SolutionSlide = {
  icon: keyof typeof ICONS;
  title: string;
  copy: string;
  meta: string;
};

type Props = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  intro: string;
  slides: SolutionSlide[];
};

/**
 * Pinned scene 2 — sticky split. Left: the three offers as a menu.
 * Right: the active offer's detail panel. Scroll scrubs through them.
 * Falls back to plain stacked cards on small screens / reduced motion.
 */
export default function SolutionsScene({
  eyebrow,
  headingLine1,
  headingLine2,
  intro,
  slides,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const isStatic =
      window.matchMedia('(max-width: 899px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setStaticMode(isStatic);
    if (isStatic) return;

    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        const idx = Math.min(
          slides.length - 1,
          Math.floor(self.progress * slides.length)
        );
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      },
    });

    return () => trigger.kill();
  }, [slides.length]);

  const heading = (
    <div className="section-heading split-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          {headingLine1}
          <br />
          {headingLine2}
        </h2>
      </div>
      <p className="section-text">{intro}</p>
    </div>
  );

  // ---------- Static fallback: stacked cards (mobile / reduced motion) ----------
  if (staticMode) {
    return (
      <section className="section section-shell" id="solutions">
        {heading}
        <div className="bento-grid">
          {slides.map((card, i) => {
            const Icon = ICONS[card.icon];
            return (
              <article className={`info-card${i === 0 ? ' bento-featured' : ''}`} key={card.title}>
                <span className="card-icon"><Icon size={22} /></span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <span className="card-meta">⚡ {card.meta}</span>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  // ---------- Pinned scrollytelling scene ----------
  return (
    <section className="solutions-scene" id="solutions" ref={containerRef}>
      <div className="solutions-sticky section-shell">
        {heading}
        <div className="solutions-split">
          <div className="solutions-menu" role="list">
            {slides.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <div
                  key={s.title}
                  role="listitem"
                  className={`solutions-menu-item${i === active ? ' sol-active' : ''}`}
                >
                  <span className="sol-num">0{i + 1}</span>
                  <Icon size={18} />
                  <span className="sol-title">{s.title}</span>
                </div>
              );
            })}
            <div className="solutions-progress">
              <div
                className="solutions-progress-fill"
                style={{ height: `${((active + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="solutions-stage">
            {slides.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <article
                  key={s.title}
                  className={`solutions-panel${i === active ? ' sol-panel-active' : ''}`}
                  aria-hidden={i !== active}
                >
                  <span className="card-icon sol-panel-icon"><Icon size={26} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                  <span className="card-meta">⚡ {s.meta}</span>
                  <button className="btn btn-ghost sol-panel-cta" data-cal-link="technoon/audit">
                    Scope this for my business <ArrowRight size={15} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
