'use client';

import { useEffect, useState } from 'react';

const RAIL_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'solutions', label: 'What we build' },
  { id: 'work', label: 'Client work' },
  { id: 'technoonhr', label: 'Noon HR' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Book a call' },
];

/**
 * Fixed right-edge chapter rail: shows where you are in the story and
 * lets visitors jump ahead (pricing / booking always one click away).
 * Hidden on small screens and for reduced-motion users (CSS handles both).
 */
export default function ProgressRail() {
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = RAIL_SECTIONS
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section is "active" when it crosses the middle of the viewport.
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((el) => observer.observe(el));

    // Rail appears once the visitor starts scrolling.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.3);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`progress-rail${visible ? ' rail-visible' : ''}`}
      aria-label="Page sections"
    >
      {RAIL_SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`rail-dot${active === id ? ' rail-active' : ''}`}
          onClick={() => jump(id)}
          aria-label={label}
          aria-current={active === id ? 'true' : undefined}
        >
          <span className="rail-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
