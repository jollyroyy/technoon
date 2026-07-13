'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type HrFeature = { title: string; description: string };

type Props = {
  features: HrFeature[];
};

/**
 * Pinned scene 3 — the Noon HR dashboard assembles as you scroll:
 * mock widgets fly in one by one, compliance bars fill last.
 * Static (no pin) on small screens / reduced motion.
 */
export default function NoonHrScene({ features }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isStatic =
      window.matchMedia('(max-width: 899px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    if (isStatic) {
      container.classList.add('hr-scene-static');
      return () => container.classList.remove('hr-scene-static');
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
        },
      });

      tl.fromTo('.hr-copy', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hr-scene" id="technoonhr" ref={containerRef}>
      <div className="hr-scene-sticky" ref={stickyRef}>
        <div className="technoon-hr-section section-shell hr-scene-card">
        <div className="hr-grid">
          <div className="hr-copy">
            <p className="eyebrow">Our own product</p>
            <h2>We run what we sell.</h2>
            <p className="section-text">
              Noon HR is our in-house SaaS — live with real paying users.
              Attendance, payroll, and compliance in one place, from
              <strong> $3–6 per employee/month</strong>. It&apos;s the proof that we
              build durable software, not just client projects.
            </p>
            <div className="hr-features-list">
              {features.map((feature) => (
                <div key={feature.title} className="hr-feature-item">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="hr-ctas">
              <button className="btn btn-primary" data-cal-link="technoon/hr-demo">Book a live demo</button>
              <a className="btn btn-ghost" href="https://noon-hr.vercel.app" target="_blank" rel="noopener noreferrer">
                Try the product <ArrowRight size={15} />
              </a>
            </div>
          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
