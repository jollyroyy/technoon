import Image from "next/image";
import Link from "next/link";
import {
  X, ArrowRight,
  BadgeCheck, Quote
} from "lucide-react";
import PricingSection from "./components/PricingSection";
import FooterLogo from "./components/FooterLogo";
import HeroScrolly, { type HeroChapter } from "./components/HeroScrolly";
import ProgressRail from "./components/ProgressRail";
import Reveal from "./components/Reveal";
import SolutionsScene, { type SolutionSlide } from "./components/SolutionsScene";
import NoonHrScene from "./components/NoonHrScene";
import ProcessTimeline, { type ProcessStep } from "./components/ProcessTimeline";
import CountUp from "./components/CountUp";

/* ─────────────────────────  DATA  ───────────────────────── */

/* Hero narrative beats — synced to the frame animation:
   ring assembles → Voice AI/Support front → dashboards front → full ring + Revenue */
const heroChapters: HeroChapter[] = [
  {
    range: [0, 0.22],
    heading: "Every function of your business.",
    headingAccent: "One AI core.",
    sub: "Websites, voice agents, support, CRM — connected and working as one.",
  },
  {
    range: [0.22, 0.48],
    heading: "An AI receptionist that",
    headingAccent: "never sleeps.",
    sub: "Answers calls and WhatsApp 24/7 — in English and Arabic.",
  },
  {
    range: [0.48, 0.76],
    heading: "Automation that books meetings",
    headingAccent: "while you sleep.",
    sub: "Leads captured, followed up, and scheduled — hands-free.",
  },
  {
    range: [0.76, 1],
    heading: "See it working on",
    headingAccent: "your business.",
    sub: "Founder-built systems, live in days — starting with a free 30-minute audit.",
  },
];

const heroTrustLine = "Built by founders · Fixed price · Saudi & India ready";

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

const solutionCards: SolutionSlide[] = [
  {
    icon: "globe",
    title: "Conversion Websites",
    copy: "Landing pages live in days. Multi-page corporate sites in weeks. Built to convert visitors into booked calls — not to win design awards.",
    meta: "Landing page in 3–5 days",
  },
  {
    icon: "bot",
    title: "AI Receptionist",
    copy: "Responds in seconds, qualifies leads, books meetings. Runs 24/7 on WhatsApp and your website. Like the one in the corner of this page.",
    meta: "Live in 5–10 days",
  },
  {
    icon: "zap",
    title: "Lead Follow-up Automation",
    copy: "Form submitted → instant reply → meeting booked → CRM updated. Email, SMS, and WhatsApp sequences with zero manual work.",
    meta: "Live in 3–5 days",
  },
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

const processSteps: ProcessStep[] = [
  {
    icon: "calendar",
    title: "Free Audit Call",
    copy: "30 minutes. We map your revenue leaks and gaps. No obligation.",
  },
  {
    icon: "clipboard",
    title: "We Scope It",
    copy: "You get a clear plan — what we build, what it costs, when it ships.",
  },
  {
    icon: "hammer",
    title: "We Build It",
    copy: "Founder-led build, integration, and testing. No junior hand-offs.",
  },
  {
    icon: "rocket",
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



/* ─────────────────────────  PAGE  ───────────────────────── */

export default function Home() {
  return (
    <main className="page-shell" id="top">
      <ProgressRail />
      {/* ── HERO ─────────────────────────────── */}
      <HeroScrolly
        chapters={heroChapters}
        trustLine={heroTrustLine}
        ctaPrimary="Book a free 30-min audit"
        ctaSecondary="See our work"
      />

      <div className="content-stack">

        {/* ── PAIN ─────────────────────────────── */}
        <section className="section section-shell" id="pain">
          <Reveal>
            <div className="section-heading centered-heading">
              <h2>You&apos;re losing revenue.<br />You just can&apos;t see where.</h2>
            </div>
          </Reveal>
          <Reveal stagger=".pain-card">
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
          </Reveal>
          <p className="pain-bridge">
            This is your business?{" "}
            <a href="#contact" className="pain-link">Let&apos;s fix it <ArrowRight size={14} /></a>
          </p>
        </section>

        {/* ── SOLUTIONS — pinned scene ─────────── */}
        <SolutionsScene
          eyebrow="What we build"
          headingLine1="One studio."
          headingLine2="Three ways to fix it."
          intro="Fixed price. Fixed scope. Delivered by the founders — no account managers, no hand-offs, no agency surprises."
          slides={solutionCards}
        />

        {/* ── CASE STUDY ───────────────────────── */}
        <section className="section section-shell" id="work">
          <Reveal>
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Proof, not promises</p>
                <h2>Bejoice Shipping — Saudi Arabia</h2>
              </div>
              <p className="section-text">
                AI-powered smart freight forwarding. A corporate website for a
                25+ year KSA logistics leader — live at bejoiceshipping-ksa.com.
              </p>
            </div>
          </Reveal>
          <div className="case-grid">
            <Reveal y={70}>
              <div className="case-mockup case-parallax" aria-label="Bejoice Shipping website preview">
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
                        <strong><CountUp value={s.value} /></strong>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal y={30} delay={0.15}>
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
                <button className="btn btn-ghost" data-cal-link="technoon/audit">
                  Get a build like this <ArrowRight size={15} />
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── TECHNOON HR — pinned scene ───────── */}
        <NoonHrScene features={technoonHrFeatures} />

        {/* ── FOUNDERS ─────────────────────────── */}
        <section className="section section-shell" id="founders">
          <Reveal>
            <div className="section-heading centered-heading">
              <p className="eyebrow">Who you&apos;ll work with</p>
              <h2>Two founders. Zero hand-offs.</h2>
            </div>
          </Reveal>
          <Reveal stagger=".founder-card">
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
          </Reveal>
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
          <Reveal stagger=".industry-card">
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
          </Reveal>
        </section>

        {/* ── PROCESS ──────────────────────────── */}
        <section className="section section-shell alt-section" id="process">
          <Reveal>
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">How it works</p>
                <h2>Idea to live in weeks,<br />not months.</h2>
              </div>
              <p className="section-text">
                No fluff. No delays. You know exactly what happens next.
              </p>
            </div>
          </Reveal>
          <ProcessTimeline steps={processSteps} />
        </section>

        {/* ── RESULTS ──────────────────────────── */}
        <section className="section section-shell results-shell" id="results">
          <Reveal>
            <div className="section-heading centered-heading">
              <p className="eyebrow">The 90-day target</p>
              <h2>What we build toward.</h2>
              <p className="section-text centered-note">
                Every system we ship is scoped against these outcomes — and we
                review them with you at the 30, 60, and 90-day mark.
              </p>
            </div>
          </Reveal>
          <Reveal stagger=".stat-card">
            <div className="stats-row">
              {targetStats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <strong><CountUp value={stat.value} /></strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── PRICING ──────────────────────────── */}
        <PricingSection />

        {/* ── CTA ──────────────────────────────── */}
        <section className="section cta-section" id="contact">
          <Reveal>
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
              <button className="btn btn-primary btn-lg" data-cal-link="technoon/audit">
                Book your free audit call
                <ArrowRight size={17} />
              </button>
              <p className="cta-note">No credit card. No sales pitch. Just clarity.</p>
              <div className="cta-divider"><span>or</span></div>
              <a className="cta-email-link" href="mailto:info@technoon.ai">
                info@technoon.ai
              </a>
            </div>
          </div>
          </Reveal>
        </section>

      </div>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <FooterLogo />
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
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Contact</p>
              <a href="mailto:info@technoon.ai" className="footer-email">info@technoon.ai</a>
              <button className="footer-linkbtn" data-cal-link="technoon/audit">Book a free audit</button>
              <button className="footer-linkbtn" data-cal-link="technoon/hr-demo">Noon HR demo</button>
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
