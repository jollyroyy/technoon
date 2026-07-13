'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  /** CSS selector for children to stagger; omit to animate the wrapper as one block */
  stagger?: string;
  /** Seconds between staggered items */
  staggerEach?: number;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Scroll-reveal wrapper: fades content up when it enters the viewport.
 * With `stagger`, matching children animate in sequence instead.
 * No-op (content just shows) when prefers-reduced-motion.
 */
export default function Reveal({
  children,
  stagger,
  staggerEach = 0.12,
  delay = 0,
  y = 36,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets: Element[] | Element = stagger
      ? Array.from(el.querySelectorAll(stagger))
      : el;
    if (Array.isArray(targets) && targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay,
          stagger: stagger ? staggerEach : 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, staggerEach, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
