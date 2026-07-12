import Image from "next/image";
import Link from "next/link";
import {
  X, ArrowRight, Globe, Bot, Zap, Smartphone, Megaphone, Boxes,
  CalendarCheck, ClipboardList, Hammer, Rocket, ShieldCheck, MapPin,
  Users, BadgeCheck, Quote
} from "lucide-react";
import HeroChat from "./components/HeroChat";
import PricingSection from "./components/PricingSection";

/* ─────────────────────────  DATA  ───────────────────────── */

const heroChips = [
  "Founder-led delivery",
  "Fixed scope, fixed price",
  "India · Saudi & GCC",
  "We run our own SaaS",
];

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
    icon: Globe,
    title: "Conversion Websites",
    copy: "Landing pages live in days. Multi-page corporate sites in weeks. Built to convert visitors into booked calls — not to win design awards.",
    meta: "Landing page in 3–5 days",
    featured: true,
  },
  {
    icon: Bot,
    title: "AI Receptionist",
    copy: "Responds in seconds, qualifies leads, books meetings. Runs 24/7 on WhatsApp and your website. Like the one in the corner of this page.",
    meta: "Live in 5–10 days",
  },
  {
    icon: Zap,
    title: "Lead Follow-up Automation",
    copy: "Form submitted → instant reply → meeting booked → CRM updated. Email, SMS, and WhatsApp sequences with zero manual work.",
    meta: "Live in 3–5 days",
  },
];

const capabilityStrip = [
  { icon: Smartphone, label: "App Development", detail: "React Native · AI-powered apps · MVPs" },
  { icon: Megaphone, label: "Digital Marketing", detail: "SEO · SEM · PPC · brand promotion" },
  { icon: Boxes, label: "Business Software", detail: "CRM · ERP · custom SaaS" },
];

const bejoicePoints = [
  "Fully responsive corporate website for a 25+ year KSA logistics leader",
  "FCL, LCL, breakbulk, reefer, hazardous & OOG freight across 120+ countries",
  "Built for a trust-driven B2B audience — clean visuals, fast load, mobile-first",
  "Delivered on a fixed timeline and fixed budget. Live and in production today",
];

const bejoiceStats = [
  { value: "120+", label: "Countries served" },
  { value: "25+", label: "Years in business" },
  { value: "24/7", label: "Operations" },
  { value: "KSA", label: "Market specialist" },
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
    description: "Indian labor law built in — multi-country compliance on the roadmap.",
  },
];

const founders = [
  {
    initials: "SP",
    name: "Sudeshna Pal",
    role: "Co-Founder",
    focus: "Full-Stack Development, AI Solutions & Client Delivery",
  },
  {
    initials: "US",
    name: "Ummer Shaiq",
    role: "Co-Founder",
    focus: "Business Development & Growth",
  },
];

const industryCards = [
  {
    title: "Food & Beverage",
    subtitle: "Serve more. Waste less.",
    image: "/industry-restaurant.jpg",
    points: [
      "Predict demand — stop ordering what sits on the shelf",
      "Auto-follow up with customers who haven't returned",
      "See which items, shifts, and staff drain your margin",
    ],
  },
  {
    title: "Gyms",
    subtitle: "Convert leads. Keep members.",
    image: "/industry-gym.jpg",
    points: [
      "Reply to trial leads before they sign up elsewhere",
      "Catch churn risk before the cancellation — not after",
      "Upsell PT and memberships with automated workflows",
    ],
  },
  {
    title: "Logistics",
    subtitle: "Move fast. Cut waste.",
    image: "/industry-logistics.jpg",
    points: [
      "Auto-send quotes and shipment updates via WhatsApp",
      "Surface delays, route gaps, and load issues automatically",
      "Replace group chat chaos with one source of truth",
    ],
  },
];

const processSteps = [
  {
    icon: CalendarCheck,
    title: "Free Audit Call",
    copy: "30 minutes. We map your revenue leaks and gaps. No obligation.",
  },
  {
    icon: ClipboardList,
    title: "We Scope It",
    copy: "You get a clear plan — what we build, what it costs, when it ships.",
  },
  {
    icon: Hammer,
    title: "We Build It",
    copy: "Founder-led build, integration, and testing. No junior hand-offs.",
  },
  {
    icon: Rocket,
    title: "You Launch",
    copy: "Go live with full handover, training, and 30 days of support included.",
  },
];

const targetStats = [
  { value: "20–35%", label: "Revenue lift we build toward" },
  { value: "30–60%", label: "Manual work eliminated" },
  { value: "3–5 days", label: "Landing page live" },
  { value: "< 24h", label: "Audit turnaround" },
];

const faqs = [
  {
    q: "How fast is “fast”?",
    a: "Landing pages go live in 3–5 days. Multi-page sites take 7–14 days. Premium corporate builds — like the one we shipped for Bejoice Shipping — take 3–4 weeks. Fixed scope, fixed price, no revision hell.",
  },
  {
    q: "Why trust a new agency?",
    a: "Fair question — so we prove instead of promise. We built and shipped the corporate website for Bejoice Shipping, a 25-year logistics leader in Saudi Arabia, on a fixed timeline and budget. And we run Noon HR, our own SaaS, with real paying users. We don't sell what we can't prove.",
  },
  {
    q: "Do you work with Saudi & GCC businesses?",
    a: "Yes — actively. Our featured client is in KSA, and we build with the GCC in mind: Arabic RTL layouts, PDPL awareness, and SAR pricing. We also serve clients across India and internationally.",
  },
  {
    q: "Can I see Noon HR before committing?",
    a: "Yes. Book a free 30-minute demo, or explore the live product at noon-hr.vercel.app. No credit card, no sales pressure.",
  },
  {
    q: "Do you handle custom builds?",
    a: "Yes — apps, CRMs, ERPs, and custom SaaS are all in-house. We start with fixed-price scope locked on the discovery call, so you always know the cost before we write a line of code.",
  },
  {
    q: "How do payments work?",
    a: "Fixed quotes in USD, SAR, or INR — whatever suits you. Typically 50% to start, 50% on delivery. Setup, onboarding, and 30 days of support are always included.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ─────────────────────────  PAGE  ───────────────────────── */

export default function Home() {
  return (
    <main className="page-shell" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <ShieldCheck size={14} />
              Founder-led AI studio — India &amp; GCC
            </p>
            <h1>
              AI systems that stop
              <span className="grad-text"> revenue leaks.</span>
            </h1>
            <p className="hero-sub">
              Conversion-ready websites in days. AI receptionists that answer in
              seconds, 24/7. Automation that books meetings while you sleep.
              For restaurants, gyms, and logistics companies — at a fixed,
              honest price.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-lg" href="https://cal.com/technoon/audit">
                Book a free 30-min audit
                <ArrowRight size={17} />
              </a>
              <a className="btn btn-ghost btn-lg" href="#work">
                See our work
              </a>
            </div>
            <ul className="hero-chips">
              {heroChips.map((chip) => (
                <li key={chip}><BadgeCheck size={13} /> {chip}</li>
              ))}
            </ul>
          </div>
          <div className="hero-visual">
            <HeroChat />
          </div>
        </div>
      </section>

      <div className="content-stack">

        {/* ── PROOF STRIP ──────────────────────── */}
        <section className="proof-strip" aria-label="Highlights">
          <div className="proof-strip-inner">
            <span className="proof-item"><strong>Featured client:</strong> Bejoice Shipping · Saudi Arabia</span>
            <span className="proof-dot" aria-hidden="true" />
            <span className="proof-item"><strong>Own product:</strong> Noon HR — live with paying users</span>
            <span className="proof-dot" aria-hidden="true" />
            <span className="proof-item"><strong>Delivery:</strong> Fixed price · days, not months</span>
          </div>
        </section>

        {/* ── PAIN ─────────────────────────────── */}
        <section className="section section-shell" id="pain">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Sound familiar?</p>
            <h2>You&apos;re losing revenue.<br />You just can&apos;t see where.</h2>
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
            <a href="#contact" className="pain-link">Let&apos;s fix it <ArrowRight size={14} /></a>
          </p>
        </section>

        {/* ── SOLUTIONS ────────────────────────── */}
        <section className="section section-shell" id="solutions">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">What we build</p>
              <h2>Three systems. One goal:<br />more booked revenue.</h2>
            </div>
            <p className="section-text">
              Fixed price. Fixed scope. Delivered by the founders — no account
              managers, no hand-offs, no agency surprises.
            </p>
          </div>
          <div className="bento-grid">
            {solutionCards.map((card) => (
              <article
                className={`info-card${card.featured ? " bento-featured" : ""}`}
                key={card.title}
              >
                <span className="card-icon"><card.icon size={22} /></span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <span className="card-meta">⚡ {card.meta}</span>
              </article>
            ))}
          </div>
          <div className="capability-strip">
            <p className="capability-label">Also under one roof</p>
            <div className="capability-items">
              {capabilityStrip.map((cap) => (
                <div key={cap.label} className="capability-item">
                  <cap.icon size={18} />
                  <div>
                    <span>{cap.label}</span>
                    <p>{cap.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASE STUDY ───────────────────────── */}
        <section className="section section-shell" id="work">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Featured client work</p>
              <h2>Bejoice Shipping — Saudi Arabia</h2>
            </div>
            <p className="section-text">
              AI-powered smart freight forwarding. A corporate website for a
              25+ year KSA logistics leader — live at bejoiceshipping-ksa.com.
            </p>
          </div>
          <div className="case-grid">
            <div className="case-mockup" aria-label="Bejoice Shipping website preview">
              <div className="browser-chrome">
                <span className="browser-dot" /><span className="browser-dot" /><span className="browser-dot" />
                <span className="browser-url">bejoiceshipping-ksa.com</span>
              </div>
              <div className="browser-body">
                <p className="mock-eyebrow">Bejoice Shipping · KSA</p>
                <p className="mock-headline">AI-Powered Smart<br />Freight Forwarding</p>
                <p className="mock-sub">FCL · LCL · Breakbulk · Reefer · Hazardous · OOG</p>
                <div className="mock-stats">
                  {bejoiceStats.map((s) => (
                    <div key={s.label} className="mock-stat">
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="case-copy">
              <ul className="case-points">
                {bejoicePoints.map((p) => (
                  <li key={p}><BadgeCheck size={16} /> {p}</li>
                ))}
              </ul>
              <blockquote className="case-quote">
                <Quote size={20} aria-hidden="true" />
                <p>
                  &ldquo;Impressed by the design quality and delivery speed — this
                  is the work that led to today&apos;s conversation.&rdquo;
                </p>
                <cite>Partner feedback · Bejoice Shipping project</cite>
              </blockquote>
              <a className="btn btn-ghost" href="https://cal.com/technoon/audit">
                Get a build like this <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* ── TECHNOON HR ──────────────────────── */}
        <section className="section section-shell technoon-hr-section" id="technoonhr">
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
                {technoonHrFeatures.map((feature) => (
                  <div key={feature.title} className="hr-feature-item">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
              <div className="hr-ctas">
                <a className="btn btn-primary" href="https://cal.com/technoon/hr-demo">Book a live demo</a>
                <a className="btn btn-ghost" href="https://noon-hr.vercel.app" target="_blank" rel="noopener noreferrer">
                  Try the product <ArrowRight size={15} />
                </a>
              </div>
            </div>
            <div className="hr-visual" aria-hidden="true">
              <div className="hr-mock">
                <div className="hr-mock-head">
                  <span className="hr-mock-title">Noon HR</span>
                  <span className="hr-mock-badge">Live</span>
                </div>
                <div className="hr-mock-row">
                  <div className="hr-mock-card">
                    <span>Present today</span>
                    <strong>47 / 52</strong>
                    <em className="up">▲ on time 94%</em>
                  </div>
                  <div className="hr-mock-card">
                    <span>Payroll — June</span>
                    <strong>Ready</strong>
                    <em>52 payslips generated</em>
                  </div>
                </div>
                <div className="hr-mock-row">
                  <div className="hr-mock-card wide">
                    <span>Compliance</span>
                    <div className="hr-mock-bars">
                      <i style={{ width: "92%" }} /><i style={{ width: "78%" }} /><i style={{ width: "88%" }} />
                    </div>
                    <em>PF · ESI · PT — all current</em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOUNDERS ─────────────────────────── */}
        <section className="section section-shell" id="founders">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Who you&apos;ll work with</p>
            <h2>Two founders. Zero hand-offs.</h2>
          </div>
          <div className="founder-grid">
            {founders.map((f) => (
              <article key={f.name} className="founder-card">
                <span className="founder-avatar">{f.initials}</span>
                <h3>{f.name}</h3>
                <p className="founder-role">{f.role}</p>
                <p className="founder-focus">{f.focus}</p>
              </article>
            ))}
          </div>
          <blockquote className="founder-quote">
            &ldquo;We don&apos;t sell what we can&apos;t prove. Every service we offer,
            we run internally first.&rdquo;
          </blockquote>
        </section>

        {/* ── INDUSTRIES ───────────────────────── */}
        <section className="section section-shell" id="industries">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Industry focus</p>
              <h2>Built for your floor,<br />not a generic funnel.</h2>
            </div>
            <p className="section-text">
              Three sectors we know deeply. Specific problems, systems that
              actually fit the way you operate.
            </p>
          </div>
          <div className="card-grid industry-grid">
            {industryCards.map((industry) => (
              <article className="industry-card" key={industry.title}>
                <div className="industry-photo">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(max-width: 720px) 100vw, 33vw"
                    className="industry-img"
                  />
                  <div className="industry-photo-overlay" />
                  <div className="industry-photo-text">
                    <h3>{industry.title}</h3>
                    <p>{industry.subtitle}</p>
                  </div>
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
              <p className="eyebrow">How it works</p>
              <h2>Four steps. Done.</h2>
            </div>
            <p className="section-text">
              No fluff. No delays. You know exactly what happens next.
            </p>
          </div>
          <div className="timeline">
            {processSteps.map((step, i) => (
              <div className="timeline-step" key={step.title}>
                <span className="timeline-icon"><step.icon size={19} /></span>
                <span className="timeline-num">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESULTS ──────────────────────────── */}
        <section className="section section-shell results-shell" id="results">
          <div className="section-heading centered-heading">
            <p className="eyebrow">The 90-day target</p>
            <h2>What we build toward.</h2>
            <p className="section-text centered-note">
              Every system we ship is scoped against these outcomes — and we
              review them with you at the 30, 60, and 90-day mark.
            </p>
          </div>
          <div className="stats-row">
            {targetStats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ── PRICING ──────────────────────────── */}
        <PricingSection />

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
              <p className="eyebrow">Free audit — 30 minutes</p>
              <h2>
                Walk away with a plan.<br />Not a pitch.
              </h2>
              <p>
                We&apos;ll show you exactly where you&apos;re losing money and what it
                takes to fix it. Specific. Honest. Free.
              </p>
            </div>
            <div className="cta-foot">
              <a className="btn btn-primary btn-lg" href="https://cal.com/technoon/audit">
                Book your free audit call
                <ArrowRight size={17} />
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
            <p className="footer-tagline">
              Founder-led AI &amp; software studio.<br />
              Websites, AI systems, and business software — fast, fixed-price,
              without agency bloat.
            </p>
            <p className="footer-loc"><MapPin size={13} /> India · Saudi Arabia &amp; GCC</p>
            <p className="footer-loc"><Users size={13} /> Sudeshna Pal &amp; Ummer Shaiq — Co-Founders</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-label">Services</p>
              <a href="#solutions">Conversion Websites</a>
              <a href="#solutions">AI Receptionist</a>
              <a href="#solutions">Lead Follow-up</a>
              <a href="#technoonhr">Noon HR</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Company</p>
              <a href="#work">Featured Work</a>
              <a href="#founders">Founders</a>
              <a href="#process">How It Works</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Contact</p>
              <a href="mailto:info@technoon.ai" className="footer-email">info@technoon.ai</a>
              <a href="https://cal.com/technoon/audit">Book a free audit</a>
              <a href="https://cal.com/technoon/hr-demo">Noon HR demo</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Legal</p>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
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
