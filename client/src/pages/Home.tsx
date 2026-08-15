/*
 * Deep Ink Systems — This page uses Technoon's exact blue-violet logo as the
 * brand source. It must feel operational, concise and premium: no generic AI
 * spectacle, no fabricated social proof, and one clear next action at a time.
 */
import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  MoveRight,
  Play,
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

const products = [
  { id: "hr", eyebrow: "01 / People operations", name: "Noon HR", summary: "Attendance, leave, payroll readiness and employee records in one calm source of truth.", accent: "#2F8CFF" },
  { id: "visitor", eyebrow: "02 / Front of house", name: "Visitor management", summary: "Turn arrivals into a composed, trackable experience for guests, hosts and security teams.", accent: "#7446F7" },
  { id: "gate", eyebrow: "03 / Site control", name: "Gate-pass management", summary: "Control people and material movement from request through approval to release.", accent: "#A447F0" },
];

const serviceOffers = [
  { code: "01", title: "AI receptionist & voice flows", detail: "Capture intent, answer routine questions and route the right conversation forward." },
  { code: "02", title: "Lead follow-up automation", detail: "Keep the next action clear from first enquiry through the sales hand-off." },
  { code: "03", title: "Custom business software", detail: "Build the operating layer that fits the way your team actually works." },
  { code: "04", title: "Responsive conversion websites", detail: "Turn positioning into a faster, clearer path to qualified conversations." },
  { code: "05", title: "SEO, SEM & performance marketing", detail: "Connect discoverability, demand and measurement without fragmenting the work." },
  { code: "06", title: "Social & brand promotion", detail: "Create a consistent signal that makes the business easier to recognise and choose." },
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

function SectionTag({ children }: { children: React.ReactNode }) {
  return <div className="section-tag">{children}</div>;
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
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const active = products.find((product) => product.id === activeProduct) ?? products[0];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    const updateParallax = () => {
      const viewportCenter = window.innerHeight / 2;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
        const rect = element.getBoundingClientRect();
        const speed = Number(element.dataset.parallaxSpeed ?? "0.05");
        const distance = viewportCenter - (rect.top + rect.height / 2);
        const offset = Math.max(-42, Math.min(42, distance * speed));
        element.style.setProperty("--parallax-y", `${Math.round(offset)}px`);
      });
      frame = 0;
    };
    const scheduleParallax = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", scheduleParallax);
    return () => {
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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
    const role = String(form.get("role") || "");
    const outcome = String(form.get("outcome") || "");
    const currentTools = String(form.get("currentTools") || "");
    const subject = encodeURIComponent(`Free AI audit — ${company || name || "Technoon.ai website"}`);
    const body = encodeURIComponent(`Free AI Audit Scope\n\nName: ${name}\nWork email: ${email}\nCompany: ${company}\nRole: ${role}\n\nWhat is creating friction?\n${need}\n\nUseful outcome:\n${outcome}\n\nCurrent tools or process:\n${currentTools || "Not provided"}`);
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
            <a href="#who-we-are" className="nav-link nav-link--standalone">Who we are</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="mailto:info@technoon.ai" className="header-contact hidden xl:inline-flex">info@technoon.ai</a>
            <a href="#contact" className="cta-header hidden sm:inline-flex">Start a free AI audit <ArrowUpRight className="h-3.5 w-3.5" /></a>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={mobileOpen} className="menu-button mobile-menu-toggle">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {mobileOpen && <div className="site-container mobile-menu-panel lg:hidden"><nav className="flex flex-col" aria-label="Mobile navigation">{[["Services", "#solutions"], ["Solutions", "#solutions"], ["Products", "#products"], ["Who we are", "#who-we-are"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)} className="mobile-link">{label}<ChevronRight className="h-4 w-4" /></a>)}<a href="#contact" onClick={() => setMobileOpen(false)} className="cta-primary mt-5 justify-center">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></a></nav></div>}
      </header>

      <main id="top">
        <section className="hero-section hero-section--reference">
          <div className="tech-grid" />
          <div className="site-container reference-hero-layout">
            <div className="reference-copy">
              <p className="reference-eyebrow">Start where the friction lives.</p><h1>Move faster.<br />Spend less.<br /><span>Look sharper.</span></h1><div className="reference-rule" /><p className="reference-description">AI, automation &amp; software that move your business forward.</p><div className="reference-actions"><a href="#contact" className="cta-primary">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></a><a href="#solutions" className="cta-reference-secondary"><Play className="h-3.5 w-3.5" />See What We Build</a></div>
            </div>
            <div ref={heroVisualRef} onPointerMove={updateHeroMotion} onPointerLeave={resetHeroMotion} data-parallax data-parallax-speed="0.12" className="reference-console reference-console--image hero-motion-scene" role="img" aria-label="Technoon business systems dashboard">
              <span className="hero-scene-orbit hero-scene-orbit--one" aria-hidden="true" /><span className="hero-scene-orbit hero-scene-orbit--two" aria-hidden="true" /><span className="hero-scene-pulse hero-scene-pulse--one" aria-hidden="true" /><span className="hero-scene-pulse hero-scene-pulse--two" aria-hidden="true" />
              <img className="hero-dashboard-image" src={REFERENCE_DASHBOARD_IMAGE} alt="Technoon business systems dashboard with revenue, growth trend, AI workflow, visitor management and task automation panels" />
            </div>
          </div>
          <div className="site-container reference-benefits">{[["↗", "Grow Customers", "More leads.", "More sales."], ["ϟ", "Save Time", "Less manual", "work."], ["◌", "Empower Teams", "Work better", "together."], ["◇", "Manage Workplace", "Safer. Simpler.", "Smarter."], ["∞", "Integrate & Scale", "Everything works", "together."]].map(([symbol, title, lineOne, lineTwo]) => <a key={title} href="#solutions" className="reference-benefit"><i>{symbol}</i><div><strong>{title}</strong><span>{lineOne}<br />{lineTwo}</span></div></a>)}</div>
          <div className="reference-signoff"><i /><span>Built with experience. Focused on impact.</span></div>
        </section>

        <section id="solutions" className="dark-band">
          <div className="site-container"><div className="section-split band-intro"><div><SectionTag>Build with us</SectionTag><h2>Stop paying for<br />the gaps between<br />your <span className="heading-accent">systems.</span></h2></div><p>Every delayed reply, repeated entry and missed follow-up costs time, attention and confidence. We make the next action clear for customers and teams.</p></div><div className="service-grid">{[["workflow-design", "Workflow design", "Automate repetitive work and keep approvals moving."], ["conversion-websites", "Conversion websites", "Turn a strong brand into qualified conversations."], ["marketing-operations", "Marketing operations", "Connect campaigns, follow-up and sales attention."]].map(([id, title, copy], index) => <article key={title} id={id} className="service-card"><div><span>0{index + 1}</span><ArrowUpRight className="h-4 w-4" /></div><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="service-package"><div className="service-package__intro"><div><span>Full offering</span><h3>Six focused ways to <em>remove drag.</em></h3></div><p>Choose one starting point, or connect the layers that are currently making growth and operations harder than they need to be.</p></div><div className="service-offer-grid">{serviceOffers.map((offer) => <article key={offer.code} className="service-offer"><span>{offer.code}</span><h3>{offer.title}</h3><p>{offer.detail}</p><ArrowUpRight className="h-4 w-4" /></article>)}</div></div></div>
        </section>

        <section id="products" className="site-container content-section">
          <div className="section-heading"><div><SectionTag>Run with our products</SectionTag><h2>One calmer way<br />to run the <span className="heading-accent">workplace.</span></h2></div><p>Independent products when you need a specific answer. A connected suite when operations need to move as one.</p></div>
          <div className="product-stage"><div className="product-tabs">{products.map((product) => <button type="button" key={product.id} onClick={() => setActiveProduct(product.id)} className={`product-tab ${activeProduct === product.id ? "active" : ""}`}><span>{product.eyebrow}</span><strong>{product.name}</strong><ArrowUpRight className="h-4 w-4" /></button>)}</div><div className="product-detail"><img data-parallax data-parallax-speed="-0.045" src={WORKPLACE_IMAGE} alt="Workplace system interface visual" /><div className="product-overlay" /><div className="relative h-full"><i style={{ background: active.accent }} /><p>{active.eyebrow}</p><h3>{active.name}</h3><strong>{active.summary}</strong></div></div></div>
        </section>

        <section id="who-we-are" className="who-section"><div className="site-container who-grid"><div><SectionTag>Who we are</SectionTag><h2>We make business systems<br /><span className="heading-accent">easier to move through.</span></h2></div><div className="who-copy"><p>Technoon designs AI workflows, conversion systems, business software and workplace products for teams that want less manual drag and more dependable momentum.</p><div className="who-statements"><div><span>Our mission</span><strong>Make essential business systems clearer, quicker and easier to own.</strong></div><div><span>Our motto</span><strong>Less drag. More momentum.</strong></div></div></div></div></section>

        <section id="contact" className="contact-section"><div className="site-container contact-grid contact-grid--audit"><form onSubmit={handleSubmit} className="contact-form contact-form--audit"><div className="audit-form-intro"><SectionTag>Free AI audit</SectionTag><h2>Scope the audit<br /><span className="heading-accent">before we begin.</span></h2><p>This is a focused intake, not a sales deck. Share enough context for us to make the first audit conversation useful from the start.</p><div className="audit-context"><span>What happens next</span><div><p><b>01</b> We review the friction.</p><p><b>02</b> We identify the clearest next move.</p><p><b>03</b> You decide whether to build further.</p></div></div></div><label>Your name<input name="name" required placeholder="Name" /></label><label>Work email<input name="email" required type="email" placeholder="name@company.com" /></label><label>Company<input name="company" placeholder="Company name" /></label><label>Role<input name="role" placeholder="Your role" /></label><label className="full-field">What is creating friction?<textarea name="need" required placeholder="For example: leads are slow to reach sales, the website is not converting, or approvals take too long." /></label><label className="full-field">What would a useful outcome look like?<textarea name="outcome" required placeholder="For example: a clearer lead flow, fewer manual hand-offs, or a better workplace process." /></label><label className="full-field">Current tools or process <em>(optional)</em><input name="currentTools" placeholder="For example: HubSpot, WhatsApp, spreadsheets, manual approvals" /></label><button type="submit" className="cta-primary justify-center">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></button><p>By sending this, you open a prepared Free AI Audit scope email to <a href="mailto:info@technoon.ai">info@technoon.ai</a>.</p></form></div></section>
      </main>

          <footer className="site-footer site-footer--refined"><div className="site-container"><div className="footer-cta"><div><SectionTag>One useful next step</SectionTag><h2>Build a business<br /><span className="heading-accent">with fewer loose ends.</span></h2><p>Start with the one workflow, page or workplace process that is taking too much attention.</p></div><a href="#contact" className="cta-primary">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></a></div><div className="footer-grid"><div className="footer-brand"><a href="#top" className="brand-lockup"><img src={LOGO} alt="Technoon.ai" className="brand-logo" /></a><p>Connected workflows, conversion websites and workplace systems for more capable teams.</p></div><div><span>Build</span><a href="#solutions">Automation systems</a><a href="#solutions">Growth systems</a><a href="#solutions">Workplace systems</a></div><div><span>Products</span><a href="#products">Noon HR</a><a href="#products">Visitor management</a><a href="#products">Gate-pass management</a></div><div><span>Explore</span><a href="#products">Product suite</a><a href="#who-we-are">Who we are</a><a href="#contact">Free AI audit</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Technoon.ai</span><span>Business systems with less drag</span><span>Saudi Arabia · India</span></div></div></footer>
    </div>
  );
}
