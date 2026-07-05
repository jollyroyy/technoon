import Image from "next/image";
import { X } from "lucide-react";

const painPoints = [
  {
    industry: "Food & Beverage",
    items: [
      "Repeat customers disappearing — no system to win them back",
      "Inventory in spreadsheets. Waste invisible until it's too late",
      "No idea which dishes, shifts, or staff are killing your margin",
    ],
  },
  {
    industry: "Gyms",
    items: [
      "Trial leads go cold before anyone follows up",
      "Members cancel silently — you find out at month-end",
      "Front desk on calls instead of closing memberships",
    ],
  },
  {
    industry: "Logistics",
    items: [
      "Freight leads lost because quotes take too long",
      "WhatsApp flooded with 'Where's my shipment?' all day",
      "Customer data split across email, Excel, and group chats",
    ],
  },
];

const solutionCards = [
  {
    title: "Website in 1 Day",
    copy: "Conversion-ready landing page. Live in 24 hours. Fixed price. No revision hell.",
    featured: true,
    tag: "01",
  },
  {
    title: "AI Receptionist",
    copy: "Responds in seconds. Qualifies leads. Books meetings. Runs 24/7 on WhatsApp and web.",
    tag: "02",
  },
  {
    title: "Lead Follow-up",
    copy: "Form submitted → instant reply → meeting booked → CRM updated. Zero manual work.",
    tag: "03",
  },
];

const industryCards = [
  {
    title: "Food & Beverage",
    subtitle: "Serve more. Waste less.",
    points: [
      "Predict demand — stop ordering what sits on the shelf",
      "Auto-follow up with customers who haven't returned",
      "See which items, shifts, and staff drain your margin",
    ],
  },
  {
    title: "Gyms",
    subtitle: "Convert leads. Keep members.",
    points: [
      "Reply to trial leads before they sign up elsewhere",
      "Catch churn risk before the cancellation — not after",
      "Upsell PT and memberships with automated workflows",
    ],
  },
  {
    title: "Logistics",
    subtitle: "Move fast. Cut waste.",
    points: [
      "Auto-send quotes and shipment updates via WhatsApp",
      "Surface delays, route gaps, and load issues automatically",
      "Replace group chat chaos with one source of truth",
    ],
  },
];

const proofStats = [
  { value: "20–35%", label: "Revenue lift" },
  { value: "30–60%", label: "Manual work eliminated" },
  { value: "1 day", label: "Website live" },
  { value: "< 24h", label: "Audit turnaround" },
];

const technoonHrFeatures = [
  {
    title: "Attendance",
    description: "Real-time tracking, geo check-in, absence alerts. No spreadsheets.",
  },
  {
    title: "Payroll",
    description: "Salaries calculated, payslips generated, bank-ready in minutes.",
  },
  {
    title: "Compliance",
    description: "Labor law built in. India + global. Always current, zero manual updates.",
  },
];

const pricingOptions = [
  {
    service: "Website in 1 Day",
    price: "₹35,000 – ₹60,000",
    timeline: "1 day",
    includes: "Landing page, WhatsApp integration, SEO basics, mobile-optimized",
  },
  {
    service: "AI Receptionist",
    price: "₹25,000 + ₹8,000–15,000/mo",
    timeline: "7–10 days",
    includes: "Lead qualification, booking integration, custom responses, 24/7 uptime",
  },
  {
    service: "Lead Follow-up",
    price: "₹15,000 – ₹35,000",
    timeline: "3–5 days",
    includes: "Email + SMS + WhatsApp sequences, CRM sync, analytics",
  },
  {
    service: "TechnoonHR",
    price: "₹2,999–4,999/month",
    timeline: "Live in 2 days",
    includes: "Attendance, payroll, compliance, support included",
  },
];

const faqs = [
  {
    q: "Really — a website in 1 day?",
    a: "Yes. We scope it on the call, build it, test it, hand it over — all within 24 hours. Fixed price, zero surprises.",
  },
  {
    q: "Can I see TechnoonHR before committing?",
    a: "Yes. Book a free 30-minute demo. No credit card, no sales pressure. Just a live walkthrough.",
  },
  {
    q: "Do you handle custom builds?",
    a: "We start with fixed-price services. Custom scope gets locked in on the discovery call — we only take on what we can deliver.",
  },
  {
    q: "Do you work outside India?",
    a: "Yes. Payments in INR or USD. Compliance features are live for India; international clients get attendance + payroll core.",
  },
  {
    q: "Why trust a new agency?",
    a: "We run TechnoonHR with real paying users. We don't sell what we can't prove. Book the call and judge for yourself.",
  },
];

export default function Home() {
  return (
    <main className="page-shell" id="top">
      <div className="content-stack">

        {/* ── HERO ─────────────────────────────── */}
        <section className="hero-section" id="hero">
          <div className="hero-bg-wrap">
            <Image
              src="/hero-reference.png"
              alt=""
              fill
              priority
              className="hero-bg-img"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="hero-bg-overlay" />
          </div>
          <div className="hero-content">
          </div>
        </section>

        {/* ── PAIN ─────────────────────────────── */}
        <section className="section section-shell" id="pain">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Sound Familiar?</p>
            <h2>You&apos;re losing revenue. You just can&apos;t see where.</h2>
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
            This is your business?{" "}
            <a href="#contact" className="pain-link">Let&apos;s fix it →</a>
          </p>
        </section>

        {/* ── SOLUTIONS ────────────────────────── */}
        <section className="section section-shell" id="solutions">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">What We Build</p>
              <h2>Live fast. Priced flat.</h2>
            </div>
            <p className="section-text">
              Fixed price. Fixed scope. No agency surprises.
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
              <h2>We run what we sell.</h2>
              <p className="section-text">
                TechnoonHR is live with real paying users — attendance, payroll, and compliance in one place. ₹2,999–4,999/month for unlimited users. Live in 2 days.
              </p>
              <div className="hr-features-list">
                {technoonHrFeatures.map((feature) => (
                  <div key={feature.title} className="hr-feature-item">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
              <a className="btn btn-primary" href="https://cal.com/technoon/hr-demo">See TechnoonHR live</a>
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ───────────────────────── */}
        <section className="section section-shell" id="industries">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Industry Focus</p>
              <h2>Deep in your world.</h2>
            </div>
            <p className="section-text">
              Three sectors. Specific problems. Systems that actually fit.
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
              <p className="eyebrow">How It Works</p>
              <h2>Four steps. Done.</h2>
            </div>
            <p className="section-text">No fluff. No delays. You know exactly what happens next.</p>
          </div>
          <div className="timeline">
            <div className="timeline-step">
              <span>01</span>
              <h3>Free Audit Call</h3>
              <p>30 minutes. We map your revenue leaks and gaps. No obligation.</p>
            </div>
            <div className="timeline-step">
              <span>02</span>
              <h3>We Scope It</h3>
              <p>You get a clear plan — what we build, what it costs, when it ships.</p>
            </div>
            <div className="timeline-step">
              <span>03</span>
              <h3>We Build It</h3>
              <p>Our team builds, integrates, and tests everything. You stay focused on your business.</p>
            </div>
            <div className="timeline-step">
              <span>04</span>
              <h3>You Launch</h3>
              <p>Go live with full handover, training, and 30 days of support included.</p>
            </div>
          </div>
        </section>

        {/* ── RESULTS ──────────────────────────── */}
        <section className="section section-shell results-shell" id="results">
          <div className="results-feature">
            <div className="results-copy">
              <p className="eyebrow">Real Impact</p>
              <h2>What happens after.</h2>
              <p className="section-text">
                Businesses using our AI layer see these numbers within 90 days.
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
            <p className="eyebrow">Pricing</p>
            <h2>Flat. Honest. No surprises.</h2>
          </div>
          <div className="pricing-grid">
            {pricingOptions.map((option) => (
              <article key={option.service} className="pricing-card">
                <h3>{option.service}</h3>
                <div className="pricing-amount">{option.price}</div>
                <p className="pricing-timeline">⚡ {option.timeline}</p>
                <p className="pricing-includes">{option.includes}</p>
              </article>
            ))}
          </div>
          <p className="pricing-note">Setup, onboarding, and 30-day support included. Pay in INR or USD.</p>
        </section>

        {/* ── FAQ ──────────────────────────────── */}
        <section className="section section-shell" id="faq">
          <div className="section-heading centered-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Quick answers.</h2>
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
              <p className="eyebrow">Free Audit — 30 Minutes</p>
              <h2>
                Walk away with a plan.<br />Not a pitch.
              </h2>
              <p>
                We&apos;ll show you exactly where you&apos;re losing money and what it takes to fix it. Specific. Honest. Free.
              </p>
            </div>
            <div className="cta-foot">
              <a className="btn btn-primary" href="https://cal.com/technoon/audit">
                Book your free audit call
              </a>
              <p className="cta-note">No credit card. No sales pitch. Just clarity.</p>
              <div className="cta-divider"><span>or</span></div>
              <a className="cta-email-link" href="mailto:info@technoon.ai">
                info@technoon.ai
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo-text">Technoon.ai</span>
            <p className="footer-tagline">AI systems for growing businesses.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-label">Services</p>
              <a href="#solutions">Website in 1 Day</a>
              <a href="#solutions">AI Receptionist</a>
              <a href="#solutions">Lead Follow-up</a>
              <a href="#technoonhr">TechnoonHR</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Company</p>
              <a href="#process">How It Works</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Contact</p>
              <a href="mailto:info@technoon.ai" className="footer-email">info@technoon.ai</a>
              <a href="https://cal.com/technoon/audit">Book a free audit</a>
              <a href="https://cal.com/technoon/hr-demo">TechnoonHR demo</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Technoon.ai. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
