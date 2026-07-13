'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** Display value, e.g. "20–35%", "3–5 days", "< 24h", "120+" */
  value: string;
};

/**
 * Animates every numeric token in the value from 0 when scrolled into view.
 * Non-numeric text ("%", "days", "< ", "–") is preserved as-is.
 */
export default function CountUp({ value }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!/\d/.test(value)) return;

    const parts = value.split(/(\d+)/);
    const counters = parts.map((p) => (/^\d+$/.test(p) ? { end: parseInt(p, 10), cur: 0 } : null));

    const render = () => {
      el.textContent = parts
        .map((p, i) => {
          const c = counters[i];
          return c ? String(Math.round(c.cur)) : p;
        })
        .join('');
    };

    const tweens: gsap.core.Tween[] = [];
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter() {
        counters.forEach((c) => {
          if (!c) return;
          tweens.push(
            gsap.to(c, {
              cur: c.end,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: render,
            })
          );
        });
      },
    });

    return () => {
      trigger.kill();
      tweens.forEach((t) => t.kill());
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
