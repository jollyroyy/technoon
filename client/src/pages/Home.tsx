/*
 * Deep Ink Systems — This page uses Technoon's exact blue-violet logo as the
 * brand source. It must feel operational, concise and premium: no generic AI
 * spectacle, no fabricated social proof, and one clear next action at a time.
 */
import { useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Menu,
  MoveRight,
  Play,
  ShieldCheck,
  X,
} from "lucide-react";

const LOGO = "/manus-storage/technoon-definitive-logo_a7c1441e.png";
const HERO_IMAGE = "/manus-storage/technoon-hero-systems_4195453c.jpg";
const WORKFLOW_IMAGE = "/manus-storage/technoon-workflow-automation_4a8ea3e7.jpg";
const WORKPLACE_IMAGE = "/manus-storage/technoon-workplace-operations_a0790dd6.jpg";
const GROWTH_IMAGE = "/manus-storage/technoon-growth-system_ff76458a.jpg";

const offerings = [
  { number: "01", title: "Automation systems", copy: "Remove repeated hand-offs. Route work, approvals and follow-ups without adding more tabs.", tag: "Time + cost" },
  { number: "02", title: "Growth systems", copy: "Make your brand clearer, your website sharper and every lead easier to act on.", tag: "Brand + revenue" },
  { number: "03", title: "Workplace systems", copy: "Run people, visitors and gate passes with one accountable operational layer.", tag: "Control + clarity" },
];

const products = [
  { id: "hr", eyebrow: "01 / People operations", name: "Noon HR", summary: "Attendance, leave, payroll readiness and employee records in one calm source of truth.", features: ["Attendance and leave", "Payroll-ready records", "Employee self-service"], accent: "#2F8CFF" },
  { id: "visitor", eyebrow: "02 / Front of house", name: "Visitor management", summary: "Turn arrivals into a composed, trackable experience for guests, hosts and security teams.", features: ["Pre-register visitors", "Instant host alerts", "Digital visit history"], accent: "#7446F7" },
  { id: "gate", eyebrow: "03 / Site control", name: "Gate-pass management", summary: "Control people and material movement from request through approval to release.", features: ["Configurable approvals", "Movement logs", "Gate-side verification"], accent: "#A447F0" },
];

const questions = [
  ["Where should we start?", "Start with the process that costs the most attention: a lead hand-off, approval loop, website drop-off, visitor flow or people operation."],
  ["Can you use the tools we already have?", "Yes. We first map what is already working, then connect, simplify or replace only what will improve the operating result."],
  ["Do we need every service?", "No. You can begin with one system. The advantage is that the next workflow, product or growth layer can connect cleanly when you need it."],
  ["What happens in a systems review?", "A focused 30-minute working conversation. You leave with one clearer problem statement and a practical next move, whether we work together or not."],
];

function SectionTag({ children }: { children: React.ReactNode }) {
  return <div className="section-tag"><span />{children}</div>;
}

function TextLink({ children, href = "#contact", light = false }: { children: React.ReactNode; href?: string; light?: boolean }) {
  return <a href={href} className={`text-link ${light ? "text-white" : "text-[#D7D4E3]"}`}><span>{children}</span><ArrowUpRight className="h-4 w-4" /></a>;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState("hr");
  const active = products.find((product) => product.id === activeProduct) ?? products[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const company = String(form.get("company") || "");
    const need = String(form.get("need") || "");
    const subject = encodeURIComponent(`Systems review request — ${company || name || "Technoon.ai website"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nWhat should we improve?\n${need}`);
    window.location.href = `mailto:info@technoon.ai?subject=${subject}&body=${body}`;
  };

  return (
    <div className="tech-shell">
      <header className="site-header">
        <div className="site-container flex h-[86px] items-center justify-between gap-5">
          <a href="#top" aria-label="Technoon.ai home" className="brand-lockup brand-lockup--header">
            <img src={LOGO} alt="Technoon.ai" className="brand-logo" />
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.16em] text-white/40 xl:block">Business<br />systems</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            <a href="#solutions" className="nav-link">Services</a><a href="#solutions" className="nav-link">Solutions</a><a href="#products" className="nav-link">Products</a><a href="#method" className="nav-link">Method</a><a href="#insights" className="nav-link">Insights</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="cta-header hidden sm:inline-flex">Let’s talk <ArrowUpRight className="h-3.5 w-3.5" /></a>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={mobileOpen} className="menu-button lg:hidden">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {mobileOpen && <div className="site-container border-t border-white/10 py-5 lg:hidden"><nav className="flex flex-col" aria-label="Mobile navigation">{[["Solutions", "#solutions"], ["Products", "#products"], ["Method", "#method"], ["Insights", "#insights"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)} className="mobile-link">{label}<ChevronRight className="h-4 w-4" /></a>)}<a href="#contact" onClick={() => setMobileOpen(false)} className="cta-primary mt-5 justify-center">Book a systems review <ArrowUpRight className="h-4 w-4" /></a></nav></div>}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="tech-grid" />
          <div className="site-container relative grid gap-0 lg:grid-cols-[.82fr_1.18fr]">
            <div className="hero-copy hero-copy--console">
              <div><SectionTag>Technoon.ai / Business systems</SectionTag><h1>Move faster.<br />Spend less.<br /><span>Look sharper.</span></h1><p>We build the connected workflows, high-converting websites and workplace systems that turn business friction into momentum.</p><div className="hero-benefits"><div><i><Check className="h-3.5 w-3.5" /></i><span><strong>Automate work.</strong> Save time. Reduce cost.</span></div><div><i><Check className="h-3.5 w-3.5" /></i><span><strong>Engage customers.</strong> Better experience. More useful leads.</span></div><div><i><Check className="h-3.5 w-3.5" /></i><span><strong>Scale confidently.</strong> Systems that grow with you.</span></div></div></div>
              <div className="hero-actions"><a href="#contact" className="cta-primary">Book a systems review <ArrowUpRight className="h-4 w-4" /></a><TextLink href="#solutions" light>See what we improve</TextLink></div>
            </div>
            <div className="hero-console" aria-label="Illustration of a connected Technoon business system">
              <div className="console-orbit" /><div className="console-orbit console-orbit--two" />
              <div className="systems-console"><div className="console-topbar"><div><i />Operational overview</div><span>System layer / live</span></div><div className="console-stats"><div><span>Lead response</span><strong>Connected</strong><small>Route and follow up</small></div><div><span>Work hand-offs</span><strong>Visible</strong><small>Map each owner</small></div><div><span>Growth signal</span><strong>Focused</strong><small>Turn visits into action</small></div></div><div className="console-board"><div className="console-grid-lines" /><div className="console-line console-line--one" /><div className="console-line console-line--two" /><div className="console-line console-line--three" /><div className="console-axis"><span>Connected signals</span><span>Less operating drag</span></div></div></div>
              <div className="console-float console-float--workflow"><span>Workflow layer</span><div><b />Request <em />Approval <em />Action</div></div><div className="console-float console-float--growth"><span>Growth layer</span><div className="mini-bars"><i /><i /><i /><i /><i /></div><strong>Message → enquiry</strong></div><div className="console-phone"><div className="phone-notch" /><CircleCheck className="h-9 w-9" /><span>Visitor checked in</span><b>Clear next action</b><div className="phone-code">▦</div></div>
              <div className="console-caption"><span>AI · Automation · Software · Websites · Integrations</span><MoveRight className="h-4 w-4" /></div>
            </div>
          </div>
          <div className="site-container outcome-rail">{[["01", "Protect response time", "Route leads and approvals before attention goes cold."], ["02", "Lower operating drag", "Replace manual chasing with useful automation."], ["03", "Strengthen the signal", "Make the brand, site and message easier to trust."]].map(([number, title, copy]) => <a key={number} href="#solutions" className="outcome-item"><b>{number}</b><div><strong>{title}</strong><span>{copy}</span></div><ArrowDownRight className="h-4 w-4" /></a>)}</div>
        </section>

        <section id="solutions" className="site-container content-section">
          <div className="section-split"><div><SectionTag>What we improve</SectionTag><h2>Make the business<br />easier to choose<br />and easier to run.</h2><p>Three connected offers. Start with the point of friction. Extend only where the return is clear.</p></div><div className="offer-list">{offerings.map((offering) => <article key={offering.number} className="offer-row"><b>{offering.number}</b><div><h3>{offering.title}</h3><p>{offering.copy}</p></div><span>{offering.tag}</span></article>)}</div></div>
        </section>

        <section className="dark-band">
          <div className="site-container"><div className="section-split band-intro"><div><SectionTag>Build with us</SectionTag><h2>Stop paying for<br />the gaps between<br />your systems.</h2></div><p>Every delayed reply, repeated entry and missed follow-up costs time, attention and confidence. We make the next action clear for customers and teams.</p></div><div className="service-grid">{[["Workflow design", "Automate repetitive work and keep approvals moving."], ["Conversion websites", "Turn a strong brand into qualified conversations."], ["Marketing operations", "Connect campaigns, follow-up and sales attention."]].map(([title, copy], index) => <article key={title} className="service-card"><div><span>0{index + 1}</span><ArrowUpRight className="h-4 w-4" /></div><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="capability-strip">{["AI receptionist & voice flows", "Lead follow-up automation", "Custom business software", "Responsive conversion websites", "SEO, SEM & performance marketing", "Social & brand promotion"].map((item) => <span key={item}><i />{item}</span>)}</div><div className="band-footer"><p>Founder-led builds / Saudi & India ready</p><TextLink href="#method" light>See how we work</TextLink></div></div>
        </section>

        <section id="products" className="site-container content-section">
          <div className="section-heading"><div><SectionTag>Run with our products</SectionTag><h2>One calmer way<br />to run the workplace.</h2></div><p>Independent products when you need a specific answer. A connected suite when operations need to move as one.</p></div>
          <div className="product-stage"><div className="product-tabs">{products.map((product) => <button type="button" key={product.id} onClick={() => setActiveProduct(product.id)} className={`product-tab ${activeProduct === product.id ? "active" : ""}`}><span>{product.eyebrow}</span><strong>{product.name}</strong><ArrowUpRight className="h-4 w-4" /></button>)}</div><div className="product-detail"><img src={WORKPLACE_IMAGE} alt="Workplace system interface visual" /><div className="product-overlay" /><div className="relative flex h-full flex-col justify-between"><div><i style={{ background: active.accent }} /><p>{active.eyebrow}</p><h3>{active.name}</h3><strong>{active.summary}</strong></div><div className="product-signal"><div><span>Live system layer</span><b><i style={{ background: active.accent }} />Ready to configure</b></div><div className="product-features">{active.features.map((feature, index) => <div key={feature}><span>0{index + 1}</span><strong>{feature}</strong></div>)}</div><TextLink href="#contact" light>Book a product walkthrough</TextLink></div></div></div></div>
        </section>

        <section className="proof-section"><div className="site-container proof-grid"><div><SectionTag>How we earn trust</SectionTag><h2>A new studio.<br />A serious standard.</h2><p>We are building Technoon deliberately. That means no inflated client roster, no borrowed promises, and no work we cannot own. You see the thinking, the system and the people behind it.</p><a href="#contact" className="cta-primary">Discuss your operating gap <ArrowUpRight className="h-4 w-4" /></a></div><div className="proof-panel"><img src={GROWTH_IMAGE} alt="Modern digital system visual" /><div className="proof-overlay" /><div className="relative"><span>Our proof model</span><h3>Clarity first.<br />Working systems second.<br />Measured improvement after.</h3><div>{[["01", "Show the real workflow"], ["02", "Build the useful layer"], ["03", "Improve from live use"]].map(([number, text]) => <p key={number}><b>{number}</b>{text}<Check className="h-4 w-4" /></p>)}</div></div></div></div></section>

        <section id="method" className="site-container content-section"><div className="section-split"><div><SectionTag>How we work</SectionTag><h2>Short path.<br />Useful output.</h2><p>Every engagement begins with the operating outcome, not a long list of features.</p></div><div className="method-list">{[["Discover", "Find the friction, opportunity and owner."], ["Map", "Trace the hand-offs, decisions and missing signals."], ["Build", "Create the workflow, product or growth layer."], ["Improve", "Launch, train and refine from real use."]].map(([title, copy], index) => <article key={title}><b>0{index + 1}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

        <section className="faq-section"><div className="site-container section-split"><div><SectionTag>Before we build</SectionTag><h2>Clear questions.<br />Better decisions.</h2><p>Answers first. No discovery theatre.</p></div><div className="faq-list">{questions.map(([question, answer], index) => <details key={question}><summary><span>0{index + 1}</span>{question}<ChevronDown className="h-4 w-4" /></summary><p>{answer}</p></details>)}</div></div></section>

        <section id="insights" className="site-container content-section"><div className="section-heading border-b border-white/10 pb-8"><div><SectionTag>Notes for operators</SectionTag><h2>Useful thinking.<br />Before the sales call.</h2></div><TextLink href="#contact" light>Ask a specific question</TextLink></div><div className="insight-grid">{[["Workflow design", "Where automation creates momentum—and where it just adds software."], ["Workplace operations", "How to make people, access and records easier to manage."], ["B2B websites", "What a business website must communicate before it asks for a meeting."]].map(([label, title], index) => <article key={label}><span>0{index + 1}</span><p>{label}</p><h3>{title}</h3><ArrowUpRight className="h-4 w-4" /></article>)}</div></section>

        <section id="contact" className="contact-section"><div className="site-container contact-grid"><div><SectionTag>Start with one operating gap</SectionTag><h2>Tell us what is<br />costing time,<br />attention or trust.</h2><p>A 30-minute systems review is enough to make the next move clearer. No pressure. No deck. Just one useful conversation.</p><div className="contact-points"><span><CircleCheck className="h-4 w-4" />30-minute working review</span><span><ShieldCheck className="h-4 w-4" />Your information stays private</span></div></div><form onSubmit={handleSubmit} className="contact-form"><label>Your name<input name="name" required placeholder="Name" /></label><label>Work email<input name="email" required type="email" placeholder="name@company.com" /></label><label>Company<input name="company" placeholder="Company name" /></label><label className="full-field">What needs to improve?<textarea name="need" required placeholder="For example: leads are slow to reach sales, the website is not converting, or approvals take too long." /></label><button type="submit" className="cta-primary justify-center">Send a systems review request <ArrowUpRight className="h-4 w-4" /></button><p>By sending this, you open a prepared email to <a href="mailto:info@technoon.ai">info@technoon.ai</a>.</p></form></div></section>
      </main>

      <footer className="site-footer site-footer--refined"><div className="site-container"><div className="footer-cta"><div><SectionTag>One useful next step</SectionTag><h2>Build a business<br />with fewer loose ends.</h2><p>Start with the one workflow, page or workplace process that is taking too much attention.</p></div><a href="#contact" className="cta-primary">Book a systems review <ArrowUpRight className="h-4 w-4" /></a></div><div className="footer-grid"><div className="footer-brand"><a href="#top" className="brand-lockup"><img src={LOGO} alt="Technoon.ai" className="brand-logo" /></a><p>Connected workflows, conversion websites and workplace systems for more capable teams.</p><a href="mailto:info@technoon.ai">info@technoon.ai <ArrowUpRight className="h-3.5 w-3.5" /></a></div><div><span>Build</span><a href="#solutions">Automation systems</a><a href="#solutions">Growth systems</a><a href="#solutions">Workplace systems</a></div><div><span>Products</span><a href="#products">Noon HR</a><a href="#products">Visitor management</a><a href="#products">Gate-pass management</a></div><div><span>Explore</span><a href="#method">How we work</a><a href="#insights">Operator notes</a><a href="#contact">Systems review</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Technoon.ai</span><span>Business systems with less drag</span><span>Saudi Arabia · India</span></div></div></footer>
    </div>
  );
}
