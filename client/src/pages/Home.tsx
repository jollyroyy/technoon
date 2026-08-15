/*
 * Deep Ink Systems — This page uses Technoon's exact blue-violet logo as the
 * brand source. It must feel operational, concise and premium: no generic AI
 * spectacle, no fabricated social proof, and one clear next action at a time.
 */
import { useRef, useState, type FormEvent, type PointerEvent } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOGO = "/manus-storage/technoon-definitive-logo_a7c1441e.png";
const HERO_IMAGE = "/manus-storage/technoon-hero-systems_4195453c.jpg";
const REFERENCE_DASHBOARD_IMAGE = "/manus-storage/technoon-reference-dashboard_30b8829a.png";
const WORKFLOW_IMAGE = "/manus-storage/technoon-workflow-automation_4a8ea3e7.jpg";
const WORKPLACE_IMAGE = "/manus-storage/technoon-workplace-operations_a0790dd6.jpg";
const GROWTH_IMAGE = "/manus-storage/technoon-growth-system_ff76458a.jpg";

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

type HeaderNavItem = {
  title: string;
  detail: string;
  href: string;
  productId?: string;
};

const buildMenu: HeaderNavItem[] = [
  { title: "Workflow design", detail: "Automation, approvals and follow-through.", href: "#workflow-design" },
  { title: "Conversion websites", detail: "Sharper journeys from interest to action.", href: "#conversion-websites" },
  { title: "Marketing operations", detail: "Campaigns, signals and sales hand-offs.", href: "#marketing-operations" },
];

const solutionsMenu: HeaderNavItem[] = [
  { title: "AI & automation", detail: "Remove manual work without adding noise.", href: "#workflow-design" },
  { title: "Growth systems", detail: "Make more of the right conversations happen.", href: "#conversion-websites" },
  { title: "Workplace operations", detail: "Keep people, visits and movement accountable.", href: "#products" },
];

const productsMenu: HeaderNavItem[] = [
  { title: "Noon HR", detail: "A calmer system for people operations.", href: "#products", productId: "hr" },
  { title: "Visitor management", detail: "A composed arrival experience for every site.", href: "#products", productId: "visitor" },
  { title: "Gate-pass management", detail: "Clear movement controls for people and materials.", href: "#products", productId: "gate" },
];

const contactPaths = [
  { id: "audit", label: "Start a free AI audit", detail: "A focused review of the operating friction you want to remove.", formAction: "Start the free AI audit" },
  { id: "discovery", label: "Book a discovery call", detail: "Talk through one priority and decide whether there is a useful next step.", formAction: "Book the discovery call" },
  { id: "custom", label: "Request a custom AI solution", detail: "Bring a defined workflow or product need that requires a tailored build.", formAction: "Request the custom AI solution" },
] as const;

type ContactPathId = (typeof contactPaths)[number]["id"];

function SectionTag({ children }: { children: React.ReactNode }) {
  return <div className="section-tag"><span />{children}</div>;
}

function TextLink({ children, href = "#contact", light = false }: { children: React.ReactNode; href?: string; light?: boolean }) {
  return <a href={href} className={`text-link ${light ? "text-white" : "text-[#D7D4E3]"}`}><span>{children}</span><ArrowUpRight className="h-4 w-4" /></a>;
}

function HeaderMenu({ label, items, onNavigate }: { label: string; items: HeaderNavItem[]; onNavigate?: (item: HeaderNavItem) => void }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="nav-menu-trigger">
        {label}<ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={14} className="glass-nav-menu">
        <div className="glass-nav-menu__label">{label} / Explore</div>
        {items.map((item) => (
          <DropdownMenuItem key={item.title} asChild>
            <a href={item.href} onClick={() => onNavigate?.(item)} className="glass-nav-item">
              <span><strong>{item.title}</strong><small>{item.detail}</small></span><ArrowUpRight className="h-4 w-4" />
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState("hr");
  const [contactPath, setContactPath] = useState<ContactPathId>("audit");
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const active = products.find((product) => product.id === activeProduct) ?? products[0];
  const selectedContactPath = contactPaths.find((path) => path.id === contactPath) ?? contactPaths[0];

  const selectContactPath = (path: ContactPathId) => {
    setContactPath(path);
  };

  const updateHeroMotion = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !heroVisualRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    heroVisualRef.current.style.setProperty("--hero-x", x.toFixed(3));
    heroVisualRef.current.style.setProperty("--hero-y", y.toFixed(3));
  };

  const resetHeroMotion = () => {
    heroVisualRef.current?.style.setProperty("--hero-x", "0");
    heroVisualRef.current?.style.setProperty("--hero-y", "0");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const company = String(form.get("company") || "");
    const need = String(form.get("need") || "");
    const path = String(form.get("path") || selectedContactPath.label);
    const subject = encodeURIComponent(`${path} — ${company || name || "Technoon.ai website"}`);
    const body = encodeURIComponent(`Enquiry path: ${path}\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\n\nWhat should we improve?\n${need}`);
    window.location.href = `mailto:info@technoon.ai?subject=${subject}&body=${body}`;
  };

  return (
    <div className="tech-shell">
      <header className="site-header">
        <div className="site-container flex h-[86px] items-center justify-between gap-5">
          <a href="#top" aria-label="Technoon.ai home" className="brand-lockup brand-lockup--header">
            <img src={LOGO} alt="Technoon.ai" className="brand-logo" />
          </a>
          <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary navigation">
            <HeaderMenu label="Services" items={buildMenu} />
            <HeaderMenu label="Solutions" items={solutionsMenu} />
            <HeaderMenu label="Products" items={productsMenu} onNavigate={(item) => item.productId && setActiveProduct(item.productId)} />
            <a href="#proof" className="nav-link nav-link--standalone">Work</a><a href="#method" className="nav-link nav-link--standalone">About</a><a href="#insights" className="nav-link nav-link--standalone">Insights</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" onClick={() => selectContactPath("audit")} className="cta-header hidden sm:inline-flex">Start a free AI audit <ArrowUpRight className="h-3.5 w-3.5" /></a>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={mobileOpen} className="menu-button mobile-menu-toggle">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {mobileOpen && <div className="site-container mobile-menu-panel lg:hidden"><nav className="flex flex-col" aria-label="Mobile navigation">{[["Services", "#solutions"], ["Solutions", "#solutions"], ["Products", "#products"], ["How we work", "#method"], ["Insights", "#insights"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)} className="mobile-link">{label}<ChevronRight className="h-4 w-4" /></a>)}<a href="#contact" onClick={() => { selectContactPath("audit"); setMobileOpen(false); }} className="cta-primary mt-5 justify-center">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></a></nav></div>}
      </header>

      <main id="top">
        <section className="hero-section hero-section--reference">
          <div className="tech-grid" />
          <div className="site-container reference-hero-layout">
            <div className="reference-copy">
              <p className="reference-eyebrow">Start where the friction lives.</p><h1>Move faster.<br />Spend less.<br /><span>Look sharper.</span></h1><div className="reference-rule" /><p className="reference-description">AI, automation &amp; software that move your business forward.</p><div className="reference-actions"><a href="#contact" onClick={() => selectContactPath("audit")} className="cta-primary">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></a><a href="#solutions" className="cta-reference-secondary"><Play className="h-3.5 w-3.5" />See What We Build</a></div>
            </div>
            <div ref={heroVisualRef} onPointerMove={updateHeroMotion} onPointerLeave={resetHeroMotion} className="reference-console reference-console--image hero-motion-scene" aria-label="Technoon business systems dashboard">
              <span className="hero-scene-orbit hero-scene-orbit--one" aria-hidden="true" /><span className="hero-scene-orbit hero-scene-orbit--two" aria-hidden="true" /><span className="hero-scene-pulse hero-scene-pulse--one" aria-hidden="true" /><span className="hero-scene-pulse hero-scene-pulse--two" aria-hidden="true" />
              <img className="hero-dashboard-image" src={REFERENCE_DASHBOARD_IMAGE} alt="Technoon business systems dashboard with revenue, growth trend, AI workflow, visitor management and task automation panels" />
            </div>
          </div>
          <div className="site-container reference-benefits">{[["↗", "Grow Customers", "More leads.", "More sales."], ["ϟ", "Save Time", "Less manual", "work."], ["◌", "Empower Teams", "Work better", "together."], ["◇", "Manage Workplace", "Safer. Simpler.", "Smarter."], ["∞", "Integrate & Scale", "Everything works", "together."]].map(([symbol, title, lineOne, lineTwo]) => <a key={title} href="#solutions" className="reference-benefit"><i>{symbol}</i><div><strong>{title}</strong><span>{lineOne}<br />{lineTwo}</span></div></a>)}</div>
          <div className="reference-signoff"><i /><span>Built with experience. Focused on impact.</span></div>
        </section>

        <section id="solutions" className="dark-band">
          <div className="site-container"><div className="section-split band-intro"><div><SectionTag>Build with us</SectionTag><h2>Stop paying for<br />the gaps between<br />your systems.</h2></div><p>Every delayed reply, repeated entry and missed follow-up costs time, attention and confidence. We make the next action clear for customers and teams.</p></div><div className="service-grid">{[["workflow-design", "Workflow design", "Automate repetitive work and keep approvals moving."], ["conversion-websites", "Conversion websites", "Turn a strong brand into qualified conversations."], ["marketing-operations", "Marketing operations", "Connect campaigns, follow-up and sales attention."]].map(([id, title, copy], index) => <article key={title} id={id} className="service-card"><div><span>0{index + 1}</span><ArrowUpRight className="h-4 w-4" /></div><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="capability-strip">{["AI receptionist & voice flows", "Lead follow-up automation", "Custom business software", "Responsive conversion websites", "SEO, SEM & performance marketing", "Social & brand promotion"].map((item) => <span key={item}><i />{item}</span>)}</div><div className="band-footer"><p>Founder-led builds / Saudi & India ready</p><div className="band-footer-actions"><TextLink href="#method" light>See how we work</TextLink><a href="#contact" onClick={() => selectContactPath("discovery")} className="cta-outline">Book a discovery call <ArrowUpRight className="h-4 w-4" /></a></div></div></div>
        </section>

        <section id="products" className="site-container content-section">
          <div className="section-heading"><div><SectionTag>Run with our products</SectionTag><h2>One calmer way<br />to run the workplace.</h2></div><p>Independent products when you need a specific answer. A connected suite when operations need to move as one.</p></div>
          <div className="product-stage"><div className="product-tabs">{products.map((product) => <button type="button" key={product.id} onClick={() => setActiveProduct(product.id)} className={`product-tab ${activeProduct === product.id ? "active" : ""}`}><span>{product.eyebrow}</span><strong>{product.name}</strong><ArrowUpRight className="h-4 w-4" /></button>)}</div><div className="product-detail"><img src={WORKPLACE_IMAGE} alt="Workplace system interface visual" /><div className="product-overlay" /><div className="relative flex h-full flex-col justify-between"><div><i style={{ background: active.accent }} /><p>{active.eyebrow}</p><h3>{active.name}</h3><strong>{active.summary}</strong></div><div className="product-signal"><div><span>Live system layer</span><b><i style={{ background: active.accent }} />Ready to configure</b></div><div className="product-features">{active.features.map((feature, index) => <div key={feature}><span>0{index + 1}</span><strong>{feature}</strong></div>)}</div><TextLink href="#contact" light>Book a product walkthrough</TextLink></div></div></div></div>
        </section>

        <section className="proof-section"><div className="site-container proof-grid"><div><SectionTag>How we earn trust</SectionTag><h2>A new studio.<br />A serious standard.</h2><p>We are building Technoon deliberately. That means no inflated client roster, no borrowed promises, and no work we cannot own. You see the thinking, the system and the people behind it.</p><a href="#contact" onClick={() => selectContactPath("custom")} className="cta-primary">Request a custom AI solution <ArrowUpRight className="h-4 w-4" /></a></div><div className="proof-panel"><img src={GROWTH_IMAGE} alt="Modern digital system visual" /><div className="proof-overlay" /><div className="relative"><span>Our proof model</span><h3>Clarity first.<br />Working systems second.<br />Measured improvement after.</h3><div>{[["01", "Show the real workflow"], ["02", "Build the useful layer"], ["03", "Improve from live use"]].map(([number, text]) => <p key={number}><b>{number}</b>{text}<Check className="h-4 w-4" /></p>)}</div></div></div></div></section>

        <section id="method" className="site-container content-section"><div className="section-split"><div><SectionTag>How we work</SectionTag><h2>Short path.<br />Useful output.</h2><p>Every engagement begins with the operating outcome, not a long list of features.</p></div><div className="method-list">{[["Discover", "Find the friction, opportunity and owner."], ["Map", "Trace the hand-offs, decisions and missing signals."], ["Build", "Create the workflow, product or growth layer."], ["Improve", "Launch, train and refine from real use."]].map(([title, copy], index) => <article key={title}><b>0{index + 1}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

        <section className="faq-section"><div className="site-container section-split"><div><SectionTag>Before we build</SectionTag><h2>Clear questions.<br />Better decisions.</h2><p>Answers first. No discovery theatre.</p></div><div className="faq-list">{questions.map(([question, answer], index) => <details key={question}><summary><span>0{index + 1}</span>{question}<ChevronDown className="h-4 w-4" /></summary><p>{answer}</p></details>)}</div></div></section>

        <section id="insights" className="site-container content-section"><div className="section-heading border-b border-white/10 pb-8"><div><SectionTag>Notes for operators</SectionTag><h2>Useful thinking.<br />Before the sales call.</h2></div><TextLink href="#contact" light>Ask a specific question</TextLink></div><div className="insight-grid">{[["Workflow design", "Where automation creates momentum—and where it just adds software."], ["Workplace operations", "How to make people, access and records easier to manage."], ["B2B websites", "What a business website must communicate before it asks for a meeting."]].map(([label, title], index) => <article key={label}><span>0{index + 1}</span><p>{label}</p><h3>{title}</h3><ArrowUpRight className="h-4 w-4" /></article>)}</div></section>

        <section id="contact" className="contact-section"><div className="site-container contact-grid"><div><SectionTag>Choose the useful next step</SectionTag><h2>Tell us what is<br />costing time,<br />attention or trust.</h2><p>Choose the conversation that matches where you are. No pressure. No deck. Just one useful next move.</p><div className="contact-routes">{contactPaths.map((path, index) => <button type="button" key={path.id} onClick={() => selectContactPath(path.id)} aria-pressed={contactPath === path.id} className={`contact-route ${contactPath === path.id ? "is-active" : ""}`}><span>0{index + 1}</span><div><strong>{path.label}</strong><small>{path.detail}</small></div><ArrowUpRight className="h-4 w-4" /></button>)}</div><div className="contact-points"><span><CircleCheck className="h-4 w-4" />30-minute working review</span><span><ShieldCheck className="h-4 w-4" />Your information stays private</span></div></div><form onSubmit={handleSubmit} className="contact-form"><div className="contact-form-path"><span>Selected path</span><strong>{selectedContactPath.label}</strong></div><input type="hidden" name="path" value={selectedContactPath.label} /><label>Your name<input name="name" required placeholder="Name" /></label><label>Work email<input name="email" required type="email" placeholder="name@company.com" /></label><label>Company<input name="company" placeholder="Company name" /></label><label className="full-field">What needs to improve?<textarea name="need" required placeholder="For example: leads are slow to reach sales, the website is not converting, or approvals take too long." /></label><button type="submit" className="cta-primary justify-center">{selectedContactPath.formAction} <ArrowUpRight className="h-4 w-4" /></button><p>By sending this, you open a prepared email to <a href="mailto:info@technoon.ai">info@technoon.ai</a>.</p></form></div></section>
      </main>

      <footer className="site-footer site-footer--refined"><div className="site-container"><div className="footer-cta"><div><SectionTag>One useful next step</SectionTag><h2>Build a business<br />with fewer loose ends.</h2><p>Start with the one workflow, page or workplace process that is taking too much attention.</p></div><a href="#contact" className="cta-primary">Book a systems review <ArrowUpRight className="h-4 w-4" /></a></div><div className="footer-grid"><div className="footer-brand"><a href="#top" className="brand-lockup"><img src={LOGO} alt="Technoon.ai" className="brand-logo" /></a><p>Connected workflows, conversion websites and workplace systems for more capable teams.</p><a href="mailto:info@technoon.ai">info@technoon.ai <ArrowUpRight className="h-3.5 w-3.5" /></a></div><div><span>Build</span><a href="#solutions">Automation systems</a><a href="#solutions">Growth systems</a><a href="#solutions">Workplace systems</a></div><div><span>Products</span><a href="#products">Noon HR</a><a href="#products">Visitor management</a><a href="#products">Gate-pass management</a></div><div><span>Explore</span><a href="#method">How we work</a><a href="#insights">Operator notes</a><a href="#contact">Systems review</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Technoon.ai</span><span>Business systems with less drag</span><span>Saudi Arabia · India</span></div></div></footer>
    </div>
  );
}
