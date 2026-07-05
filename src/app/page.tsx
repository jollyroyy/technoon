import Image from "next/image";
import { X, Star } from "lucide-react";

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
    title: "Websites That Sell",
    copy: "Fast, conversion-focused sites that turn visitors into paying clients — not just look good on a screen.",
    featured: true,
    tag: "01",
  },
  {
    title: "Smart Automations",
    copy: "When a lead contacts you, our system replies instantly and books them straight to your calendar.",
    tag: "02",
  },
  {
    title: "24/7 AI Agents",
    copy: "A custom AI for your site or WhatsApp that qualifies leads and answers questions while you sleep.",
    tag: "03",
  },
  {
    title: "Revenue Audit",
    copy: "We map where money, leads, and hours are leaking through your workflow — then we fix it.",
    tag: "04",
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

const testimonials = [
  {
    quote:
      "They built our website quickly and it genuinely looks better than anything I'd seen from agencies twice the price. Clean, professional, and it worked properly on every device.",
    name: "Sarah J.",
    role: "Small Business Owner",
    initials: "SJ",
  },
  {
    quote:
      "The automation they set up means I never miss a coaching lead anymore. Forms go in, emails go out, calls get booked — I didn't have to do anything after the setup.",
    name: "Priya M.",
    role: "Life Coach, Bengaluru",
    initials: "PM",
  },
  {
    quote:
      "We get freight inquiries on WhatsApp and email all day. The AI system they built handles the first response now. Absolute game changer for our ops team.",
    name: "Arjun T.",
    role: "Logistics / Freight Broker",
    initials: "AT",
  },
];

const faqs = [
  {
    q: "How long does a project take?",
    a: "Website builds: 2–4 weeks. Automations add 1–2 weeks. AI agents: 1–3 weeks. Timeline is locked in before we start — no surprises.",
  },
  {
    q: "We're not a tech company. Is this hard to manage?",
    a: "No. We handle all the technical setup. You get a handover call, a plain-language guide, and ongoing support if anything comes up.",
  },
  {
    q: "What if I only need one service?",
    a: "Standalone builds are available. We'll scope it honestly on the discovery call and only take on work we can actually deliver.",
  },
  {
    q: "Do you work outside India?",
    a: "Yes. We work with clients globally. Payments accepted in INR or USD.",
  },
  {
    q: "You're a new agency. Why should I trust you?",
    a: "Fair question. We're transparent about our process, selective about what we take on, and we don't promise results we can't back up. Book the free call — judge for yourself.",
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
              <h2>Three systems. One goal.</h2>
            </div>
            <p className="section-text">
              Websites that sell. Automations that save time. Agents that never sleep.
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

        {/* ── TESTIMONIALS ─────────────────────── */}
        <section className="section section-shell" id="testimonials">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Client Results</p>
            <h2>What clients say.</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t) => (
              <article key={t.name} className="testi-card">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <p className="testi-name">{t.name}</p>
                    <p className="testi-role">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
              <p className="eyebrow">Free Revenue Leakage Audit</p>
              <h2>
                Your next client shouldn&apos;t have to<br />
                wait for you to reply.
              </h2>
              <p>
                Let&apos;s build the system that catches them first. No fluff,
                no jargon — just a clear map of what to fix and what it costs.
              </p>
            </div>
            <div className="cta-foot">
              <a className="btn btn-primary" href="mailto:hello@technoon.ai">
                Contact hello@technoon.ai
              </a>
              <p className="cta-note">Free audit. No commitment required.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
