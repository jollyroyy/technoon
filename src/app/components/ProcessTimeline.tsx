'use client';

import { useEffect, useRef } from 'react';
import { CalendarCheck, ClipboardList, Hammer, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  calendar: CalendarCheck,
  clipboard: ClipboardList,
  hammer: Hammer,
  rocket: Rocket,
} as const;

export type ProcessStep = {
  icon: keyof typeof ICONS;
  title: string;
  copy: string;
};

type Props = { steps: ProcessStep[] };

/**
 * Scroll-driven timeline (not pinned): a progress line draws across the
 * section and each step lights up as the line reaches it.
 */
export default function ProcessTimeline({ steps }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.timeline-step').forEach((s) => s.classList.add('step-lit'));
      return;
    }

    const stepEls = Array.from(el.querySelectorAll('.timeline-step'));
    const line = el.querySelector<HTMLElement>('.timeline-line-fill');

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      end: 'bottom 55%',
      scrub: 0.3,
      onUpdate(self) {
        if (line) line.style.transform = `scaleX(${self.progress})`;
        stepEls.forEach((s, i) => {
          const threshold = (i + 0.5) / stepEls.length;
          s.classList.toggle('step-lit', self.progress >= threshold);
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={ref}>
      <div className="timeline-line" aria-hidden="true">
        <div className="timeline-line-fill" />
      </div>
      <div className="timeline">
        {steps.map((step, i) => {
          const Icon = ICONS[step.icon];
          return (
            <div className="timeline-step" key={step.title}>
              <span className="timeline-icon"><Icon size={19} /></span>
              <span className="timeline-num">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
