import Image from "next/image";
import { X } from "lucide-react";

const painPoints = [
  {
    industry: "Food & Beverage",
    items: [
      "Losing repeat customers — no system to bring them back",
      "Tracking inventory in spreadsheets nobody trusts",
      "No visibility into which items or shifts drain your margin",
    ],
  },
  {
    industry: "Gyms",
    items: [
      "Trial leads go cold before anyone followed up",
      "Members cancel silently — you notice at month-end",
      "Front desk burning hours on calls instead of closing memberships",
    ],
  },
  {
    industry: "Logistics",
    items: [
      "Losing freight leads because quotes take too long to send",
      "Answering 'Where is my shipment?' all day on WhatsApp",
      "Customer data scattered across emails, Excel, and group chats",
    ],
  },
];

const solutionCards = [
  {
    title: "Launch-Ready Website",
    copy: "Fast, conversion-focused landing pages delivered in 14 days. Fixed price, fixed timeline, conversion-optimized.",
    featured: true,
    tag: "01",
  },
  {
    title: "AI Receptionist",
    copy: "WhatsApp + web AI that responds to leads instantly, qualifies them, and books calls while you sleep.",
    tag: "02",
  },
  {
    title: "Lead Follow-up Automation",
    copy: "Form fills → instant reply → calendar booking → CRM entry → reminder sequences. Speed-to-lead that converts.",
    tag: "03",
  },
];

const industryCards = [
  {
    title: "Food & Beverage",
    subtitle: "Serve more. Waste less.",
    points: [
      "Predict demand and cut inventory waste before it hits margin",
      "Win back lost repeat customers with automated follow-ups",
      "Spot which menu items, shifts, or staff are draining profit",
    ],
  },
  {
    title: "Gyms",
    subtitle: "Convert better. Retain longer.",
    points: [
      "Respond to trial leads before they sign up somewhere else",
      "Flag churn risk before members cancel — not after",
      "Drive PT and membership upgrades with targeted workflows",
    ],
  },
  {
    title: "Logistics",
    subtitle: "Move faster. Operate tighter.",
    points: [
      "Automate quote requests and live shipment updates",
      "Surface route, delay, and load inefficiencies automatically",
      "Cut manual coordination between ops, sales, and clients",
    ],
  },
];

const proofStats = [
  { value: "20–35%", label: "Revenue lift identified" },
  { value: "30–60%", label: "Manual work automated" },
  { value: "15–30%", label: "Operational waste cut" },
  { value: "< 24h", label: "First audit turnaround" },
];

const technoonHrFeatures = [
  {
    title: "Attendance",
    description: "Real-time tracking, geo-location check-in, absence alerts, and compliance reports — all in one place.",
  },
  {
    title: "Payroll",
    description: "Auto-calculate salaries with deductions, generate payslips in minutes, and integrate with your bank — zero manual math.",
  },
  {
    title: "Compliance",
    description: "Labor law updates built in. Statutory compliance managed for Food & Beverage, Gyms, Logistics, and more — India + globally.",
  },
];

const pricingOptions = [
  {
    service: "Launch-Ready Website",
    price: "₹35,000 – ₹60,000",
    timeline: "14 days",
    includes: "Landing page, WhatsApp integration, SEO basics, mobile-optimized",
  },
  {
    service: "AI Receptionist (WhatsApp + Web)",
    price: "₹25,000 setup + ₹8,000–15,000/month",
    timeline: "7–10 days",
    includes: "Lead qualification, booking integration, custom responses, 24/7 uptime",
  },
  {
    service: "Lead Follow-up Automation",
    price: "₹15,000 – ₹35,000",
    timeline: "3–5 days",
    includes: "Form + email + SMS + WhatsApp sequences, CRM sync, analytics",
  },
  {
    service: "TechnoonHR",
    price: "₹2,999–4,999/month (unlimited)",
    timeline: "2 days to launch",
    includes: "Attendance, payroll, compliance, support included",
  },
];

const faqs = [
  {
    q: "How long does a website take?",
    a: "14 days. Fixed timeline, fixed scope. We lock in the plan on the discovery call, build it, test it, hand it over.",
  },
  {
    q: "Can I see a demo of TechnoonHR?",
    a: "Yes. Book a free 30-min call and we'll walk you through how it works for your team size and industry. No credit card needed.",
  },
  {
    q: "Do you offer custom development?",
    a: "We start with productized services (fixed price, fixed timeline). For custom builds, we scope on the discovery call and only take on what we can deliver reliably.",
  },
  {
    q: "Do you work outside India?",
    a: "Yes. We serve clients globally. Payments in INR or USD. Our compliance features are live for India; international clients get attendance + payroll core.",
  },
  {
    q: "You're a new agency. Why should I trust you?",
    a: "Fair question. We run our own SaaS (TechnoonHR, live with real users). We don't promise results we can't back up. Book the free call and judge for yourself.",
  },
];

export default function Home() {
  return (
    <main className="page-shell" id="top">
      <div className="content-stack">

        {/* ── HERO ─────────────────────────────── */}
        <section className="hero-section" id="hero">
          <div className="hero-bg-wrap">
            <div className="hero-bg-overlay" />
          </div>
          <div className="hero-content">
          </div>
        </section>

        {/* ── PAIN ─────────────────────────────── */}
        <section className="section section-shell" id="pain">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Sound Familiar?</p>
            <h2>If one of these hits — we built this for you.</h2>
          </div>
          <div className="pain-cols">
            {painPoints.map((col) => (
              <div key={col.industry} className="pain-card">
                <p className="pain-label">{col.industry}</p>
                <ul className="pain-list">
                  {col.items.map((item) => (
                    <li key={item} className="pain-item">
                      <X size={14} className="pain-x" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="pain-bridge">
            Sounds like your business?{" "}
            <a href="#contact" className="pain-link">Let&apos;s talk →</a>
          </p>
        </section>

        {/* ── SOLUTIONS ────────────────────────── */}
        <section className="section section-shell" id="solutions">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">What We Build</p>
              <h2>Done-for-you services.</h2>
            </div>
            <p className="section-text">
              Productized, fixed-price solutions. No surprises, no scope creep.
            </p>
          </div>
          <div className="bento-grid">
            {solutionCards.map((card) => (
              <article
                className={`info-card${card.featured ? " bento-featured" : ""}`}
                key={card.title}
              >
                <span className="card-tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── TECHNOON HR ──────────────────────── */}
        <section className="section section-shell technoon-hr-section" id="technoonhr">
          <div className="hr-feature-container">
            <div className="hr-copy">
              <p className="eyebrow">Our Own Product</p>
              <h2>TechnoonHR — Attendance + Payroll + Compliance.</h2>
              <p className="section-text">
                We don&apos;t just consult on HR. We built and run our own SaaS. TechnoonHR handles attendance, payroll calculations, labor law compliance, and reporting — built for growing teams in India and globally.
              </p>
              <p className="section-text">
                ₹2,999–4,999/month for unlimited users. Live in 2 days. No IT headaches.
              </p>
              <div className="hr-features-list">
                {technoonHrFeatures.map((feature) => (
                  <div key={feature.title} className="hr-feature-item">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
              <a className="btn btn-primary" href="https://cal.com/technoon/hr-demo">Get a demo of TechnoonHR</a>
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ───────────────────────── */}
        <section className="section section-shell" id="industries">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Industry Focus</p>
              <h2>Your industry. Our system.</h2>
            </div>
            <p className="section-text">
              We go deep on three sectors where manual work is expensive
              and automation wins fast.
            </p>
          </div>
          <div className="card-grid industry-grid">
            {industryCards.map((industry, index) => (
              <article className="industry-card" key={industry.title}>
                <div className="industry-card-glow" />
                <div className="industry-index">0{index + 1}</div>
                <div className="industry-top">
                  <h3>{industry.title}</h3>
                  <p>{industry.subtitle}</p>
                </div>
                <ul>
                  {industry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────── */}
        <section className="section section-shell alt-section" id="process">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">How We Work</p>
              <h2>How we work.</h2>
            </div>
            <p className="section-text">Four steps. No surprises.</p>
          </div>
          <div className="timeline">
            <div className="timeline-step">
              <span>01</span>
              <h3>Discovery Call</h3>
              <p>
                We discuss your goals and bottlenecks. Free 30-minute call,
                no obligation.
              </p>
            </div>
            <div className="timeline-step">
              <span>02</span>
              <h3>System Blueprint</h3>
              <p>
                We design a custom AI plan built specifically around your
                business and highest-impact gaps.
              </p>
            </div>
            <div className="timeline-step">
              <span>03</span>
              <h3>Build & Integrate</h3>
              <p>
                We build the automations, connect your tools, and test
                everything before handing over.
              </p>
            </div>
            <div className="timeline-step">
              <span>04</span>
              <h3>Launch & Support</h3>
              <p>
                You get the keys, full training, and 30 days of support
                so nothing gets dropped.
              </p>
            </div>
          </div>
        </section>

        {/* ── RESULTS ──────────────────────────── */}
        <section className="section section-shell results-shell" id="results">
          <div className="results-feature">
            <div className="results-copy">
              <p className="eyebrow">Expected Impact</p>
              <h2>Numbers that matter.</h2>
              <p className="section-text">
                These are the outcomes businesses see after an AI operating
                layer is in place.
              </p>
            </div>
            <div className="results-panel">
              <div className="results-chart">
                <span className="results-chart-label">Performance Lift</span>
                <div className="results-bars" aria-hidden="true">
                  <span /><span /><span /><span /><span />
                </div>
              </div>
            </div>
          </div>
          <div className="stats-row">
            {proofStats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ── PRICING ──────────────────────────── */}
        <section className="section section-shell" id="pricing">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Simple Pricing</p>
            <h2>Fixed price. No hidden fees.</h2>
          </div>
          <div className="pricing-grid">
            {pricingOptions.map((option) => (
              <article key={option.service} className="pricing-card">
                <h3>{option.service}</h3>
                <div className="pricing-amount">{option.price}</div>
                <p className="pricing-timeline">🚀 {option.timeline}</p>
                <p className="pricing-includes">{option.includes}</p>
              </article>
            ))}
          </div>
          <p className="pricing-note">All prices include setup, onboarding, and 30 days of support. Payments accepted in INR and USD.</p>
        </section>

        {/* ── FAQ ──────────────────────────────── */}
        <section className="section section-shell" id="faq">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Common Questions</p>
            <h2>Questions we get a lot.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary className="faq-q">{faq.q}</summary>
                <p className="faq-a">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className="section cta-section" id="contact">
          <div className="cta-card cta-centered">
            <div className="cta-copy">
              <p className="eyebrow">Free Revenue Audit</p>
              <h2>
                Your next client shouldn&apos;t have to<br />
                wait for you to reply.
              </h2>
              <p>
                Let&apos;s build the system that catches them first. 30 minutes, zero obligation. You&apos;ll walk away with a clear map of where you&apos;re losing leads and what it costs.
              </p>
            </div>
            <div className="cta-foot">
              <a className="btn btn-primary" href="https://cal.com/technoon/audit">
                Book a free 30-minute audit call
              </a>
              <p className="cta-note">No credit card. No sales pitch. Just honest feedback.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
