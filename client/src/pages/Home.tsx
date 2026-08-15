/*
 * Deep Ink Systems — Technoon's exact blue-violet logo anchors an operational,
 * editorial experience: restrained, concrete and free from generic AI spectacle.
 */
import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, Play, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const LOGO = "/manus-storage/technoon-definitive-logo_a7c1441e.png";
const REFERENCE_DASHBOARD_IMAGE = "/manus-storage/technoon-reference-dashboard_30b8829a.png";

const products = [
  { id: "hr", eyebrow: "People operations", name: "Noon HR", summary: "Attendance, leave, payroll readiness and employee records in one calm source of truth.", accent: "#2F8CFF" },
  { id: "visitor", eyebrow: "Front of house", name: "Visitor management", summary: "Turn arrivals into a composed, trackable experience for guests, hosts and security teams.", accent: "#7446F7" },
  { id: "gate", eyebrow: "Site control", name: "Gate-pass management", summary: "Control people and material movement from request through approval to release.", accent: "#A447F0" },
];

type HeaderNavItem = { title: string; detail: string; href: string; productId?: string };

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

const capabilitiesMenu: HeaderNavItem[] = [
  { title: "AI receptionist & voice flows", detail: "Route routine conversations with clarity.", href: "#solutions" },
  { title: "Lead follow-up automation", detail: "Keep the next action visible from enquiry to hand-off.", href: "#solutions" },
  { title: "Custom business software", detail: "Build the operating layer your team needs.", href: "#solutions" },
  { title: "Responsive conversion websites", detail: "Turn positioning into qualified conversations.", href: "#solutions" },
  { title: "SEO, SEM & performance marketing", detail: "Connect demand, visibility and measurement.", href: "#solutions" },
  { title: "Social & brand promotion", detail: "Create a clearer signal for your business.", href: "#solutions" },
];

type HeroBenefit = { id: string; symbol: string; title: string; lineOne: string; lineTwo: string; scene: string; viewLabel: string };

const heroBenefits: HeroBenefit[] = [
  { id: "grow", symbol: "↗", title: "Grow Customers", lineOne: "More leads.", lineTwo: "More sales.", scene: "growth", viewLabel: "Growth system view" },
  { id: "save", symbol: "ϟ", title: "Save Time", lineOne: "Less manual", lineTwo: "work.", scene: "workflow", viewLabel: "Workflow automation view" },
  { id: "empower", symbol: "◌", title: "Empower Teams", lineOne: "Work better", lineTwo: "together.", scene: "teams", viewLabel: "Team systems view" },
  { id: "workplace", symbol: "◇", title: "Manage Workplace", lineOne: "Safer. Simpler.", lineTwo: "Smarter.", scene: "workplace", viewLabel: "Workplace operations view" },
  { id: "integrate", symbol: "∞", title: "Integrate & Scale", lineOne: "Everything works", lineTwo: "together.", scene: "integrate", viewLabel: "Connected systems view" },
];

const operatingOutcomes = [
  { label: "Map", title: "Less manual admin", detail: "Find the repeated hand-offs, duplicate entries and follow-ups that keep attention fragmented." },
  { label: "Route", title: "Faster first responses", detail: "Give customer questions, lead routing and internal requests a dependable first path." },
  { label: "Qualify", title: "Clearer next conversations", detail: "Make the website and intake experience easier for the right buyer to act on." },
  { label: "Measure", title: "Ready reporting cycles", detail: "Collect the important information once, organise it well and make it available when decisions happen." },
];

function SectionTag({ children }: { children: React.ReactNode }) {
  return <div className="section-tag">{children}</div>;
}

function HeaderMenu({ label, items, onNavigate }: { label: string; items: HeaderNavItem[]; onNavigate?: (item: HeaderNavItem) => void }) {
  return <DropdownMenu modal={false}><DropdownMenuTrigger className="nav-menu-trigger">{label}<ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /></DropdownMenuTrigger><DropdownMenuContent align="start" sideOffset={14} className="glass-nav-menu"><div className="glass-nav-menu__label">{label} / Explore</div>{items.map((item) => <DropdownMenuItem key={item.title} asChild><a href={item.href} onClick={() => onNavigate?.(item)} className="glass-nav-item"><span><strong>{item.title}</strong><small>{item.detail}</small></span><ArrowUpRight className="h-4 w-4" /></a></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>;
}

function SystemVisual({ scene }: { scene: string }) {
  return <div className={`system-visual system-visual--${scene}`} aria-hidden="true"><span className="system-visual__grid" /><span className="system-visual__thread system-visual__thread--one" /><span className="system-visual__thread system-visual__thread--two" /><span className="system-visual__node system-visual__node--one" /><span className="system-visual__node system-visual__node--two" /><span className="system-visual__node system-visual__node--three" /><span className="system-visual__specimen"><i /><i /><i /><i /></span></div>;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState("hr");
  const [activeBenefitId, setActiveBenefitId] = useState("integrate");
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const activeProductDetail = products.find((product) => product.id === activeProduct) ?? products[0];
  const activeBenefit = heroBenefits.find((benefit) => benefit.id === activeBenefitId) ?? heroBenefits[4];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    let frame = 0;
    const updateParallax = () => {
      const viewportCenter = window.innerHeight / 2;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
        const rect = element.getBoundingClientRect();
        const speed = Number(element.dataset.parallaxSpeed ?? "0.05");
        const offset = Math.max(-42, Math.min(42, (viewportCenter - (rect.top + rect.height / 2)) * speed));
        element.style.setProperty("--parallax-y", `${Math.round(offset)}px`);
      });
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(updateParallax); };
    updateParallax();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  const updateHeroMotion = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !heroVisualRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    heroVisualRef.current.style.setProperty("--hero-x", (((event.clientX - bounds.left) / bounds.width - 0.5) * 2).toFixed(3));
    heroVisualRef.current.style.setProperty("--hero-y", (((event.clientY - bounds.top) / bounds.height - 0.5) * 2).toFixed(3));
  };
  const resetHeroMotion = () => { heroVisualRef.current?.style.setProperty("--hero-x", "0"); heroVisualRef.current?.style.setProperty("--hero-y", "0"); };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const company = String(form.get("company") || "");
    const role = String(form.get("role") || "");
    const need = String(form.get("need") || "");
    const outcome = String(form.get("outcome") || "");
    const currentTools = String(form.get("currentTools") || "");
    const subject = encodeURIComponent(`Free AI audit — ${company || name || "Technoon.ai website"}`);
    const body = encodeURIComponent(`Free AI Audit Scope\n\nName: ${name}\nWork email: ${email}\nCompany: ${company}\nRole: ${role}\n\nWhat is creating friction?\n${need}\n\nUseful outcome:\n${outcome}\n\nCurrent tools or process:\n${currentTools || "Not provided"}`);
    window.location.href = `mailto:info@technoon.ai?subject=${subject}&body=${body}`;
  };

  return <div className="tech-shell"><header className="site-header"><div className="site-container flex h-[86px] items-center justify-between gap-5"><a href="#top" aria-label="Technoon.ai home" className="brand-lockup brand-lockup--header"><img src={LOGO} alt="Technoon.ai" className="brand-logo" /></a><nav className="hidden items-center gap-2 lg:flex" aria-label="Primary navigation"><HeaderMenu label="Services" items={buildMenu} /><HeaderMenu label="Capabilities" items={capabilitiesMenu} /><HeaderMenu label="Solutions" items={solutionsMenu} /><HeaderMenu label="Products" items={productsMenu} onNavigate={(item) => item.productId && setActiveProduct(item.productId)} /><a href="#who-we-are" className="nav-link nav-link--standalone">Who we are</a></nav><div className="flex items-center gap-3"><a href="mailto:info@technoon.ai" className="header-contact hidden xl:inline-flex">info@technoon.ai</a><a href="#contact" className="cta-header hidden sm:inline-flex">Start a free AI audit <ArrowUpRight className="h-3.5 w-3.5" /></a><button type="button" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={mobileOpen} className="menu-button mobile-menu-toggle">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div></div>{mobileOpen && <div className="site-container mobile-menu-panel lg:hidden"><nav className="flex flex-col" aria-label="Mobile navigation">{[["Services", "#solutions"], ["Capabilities", "#solutions"], ["Solutions", "#solutions"], ["Products", "#products"], ["Who we are", "#who-we-are"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)} className="mobile-link">{label}<ChevronRight className="h-4 w-4" /></a>)}<a href="#contact" onClick={() => setMobileOpen(false)} className="cta-primary mt-5 justify-center">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></a></nav></div>}</header><main id="top"><section className="hero-section hero-section--reference"><div className="tech-grid" /><div className="site-container reference-hero-layout"><div className="reference-copy"><h1>Move faster.<br />Spend less.<br /><span>Look sharper.</span></h1><div className="reference-rule" /><p className="reference-description">AI, automation &amp; software that move your business forward.</p><div className="reference-actions"><a href="#contact" className="cta-primary">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></a><a href="#solutions" className="cta-reference-secondary"><Play className="h-3.5 w-3.5" />See what we build</a></div></div><div ref={heroVisualRef} onPointerMove={updateHeroMotion} onPointerLeave={resetHeroMotion} data-parallax data-parallax-speed="0.12" className="reference-console reference-console--image hero-motion-scene" role="img" aria-label={activeBenefit.viewLabel}><span className="hero-scene-orbit hero-scene-orbit--one" aria-hidden="true" /><span className="hero-scene-orbit hero-scene-orbit--two" aria-hidden="true" /><span className="hero-view-label">{activeBenefit.viewLabel}</span>{activeBenefit.scene === "integrate" ? <img key={activeBenefit.id} className="hero-dashboard-image" src={REFERENCE_DASHBOARD_IMAGE} alt="Technoon business systems dashboard with connected workflow panels" /> : <SystemVisual key={activeBenefit.id} scene={activeBenefit.scene} />}</div></div><div className="site-container reference-benefits" aria-label="Choose a Technoon focus area">{heroBenefits.map((benefit) => <button key={benefit.id} type="button" aria-pressed={activeBenefit.id === benefit.id} onClick={() => setActiveBenefitId(benefit.id)} className={`reference-benefit ${activeBenefit.id === benefit.id ? "is-active" : ""}`}><i>{benefit.symbol}</i><div><strong>{benefit.title}</strong><span>{benefit.lineOne}<br />{benefit.lineTwo}</span></div></button>)}</div><div className="reference-signoff"><span>Built with experience. Focused on impact.</span></div></section><section id="solutions" className="editorial-services"><div className="site-container editorial-services__layout"><div className="editorial-services__intro"><SectionTag>What we build</SectionTag><h2>Complex problems.<br /><span>Elegant systems.</span></h2><p>From first idea to full deployment, we turn practical business friction into a clear system your team can run.</p><a href="#contact" className="editorial-services__link">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></a></div><div className="editorial-services__panels"><article id="conversion-websites" className="editorial-service-panel editorial-service-panel--web"><SystemVisual scene="growth" /><div><span>Conversion systems</span><h3>Websites that make the next step clearer.</h3><p>Positioning, content and conversion paths built to help the right customer understand, trust and choose you.</p></div></article><article id="workflow-design" className="editorial-service-panel editorial-service-panel--workflow"><SystemVisual scene="workflow" /><div><span>Workflow systems</span><h3>Automations that remove repeated work.</h3><p>Map hand-offs, approvals and follow-ups so the work moves without another tab or another reminder.</p></div></article><article id="marketing-operations" className="editorial-service-panel editorial-service-panel--software"><SystemVisual scene="teams" /><div><span>Business software</span><h3>Tools that fit the way your team works.</h3><p>Custom software and operating layers for teams that need their information and decisions to stay connected.</p></div></article></div></div></section><section className="operating-outcomes"><div className="site-container"><div className="operating-outcomes__intro"><SectionTag>The advantage, made tangible</SectionTag><h2>More capacity.<br /><span>Less drag.</span></h2><p>Not vague promises. We find the places where better systems can return time, speed and confidence to your team.</p></div><div className="operating-outcomes__grid">{operatingOutcomes.map((outcome) => <article key={outcome.label}><span>{outcome.label}</span><h3>{outcome.title}</h3><p>{outcome.detail}</p></article>)}</div><p className="operating-outcomes__note">Illustrative operating outcomes, not guarantees. We establish a baseline first, then measure the change.</p></div></section><section id="products" className="site-container content-section"><div className="section-heading"><div><SectionTag>Run with our products</SectionTag><h2>One calmer way<br />to run the <span className="heading-accent">workplace.</span></h2></div><p>Independent products when you need a specific answer. A connected suite when operations need to move as one.</p></div><div className="product-stage"><div className="product-tabs">{products.map((product) => <button type="button" key={product.id} onClick={() => setActiveProduct(product.id)} className={`product-tab ${activeProduct === product.id ? "active" : ""}`}><span>{product.eyebrow}</span><strong>{product.name}</strong></button>)}</div><div className={`product-detail product-detail--${activeProductDetail.id}`}><SystemVisual scene={activeProductDetail.id === "hr" ? "teams" : activeProductDetail.id === "visitor" ? "workplace" : "workflow"} /><div className="product-overlay" /><div className="relative h-full"><i style={{ background: activeProductDetail.accent }} /><p>{activeProductDetail.eyebrow}</p><h3>{activeProductDetail.name}</h3><strong>{activeProductDetail.summary}</strong></div></div></div></section><section id="who-we-are" className="who-section"><div className="site-container who-grid"><div><SectionTag>Who we are</SectionTag><h2>We make business systems<br /><span className="heading-accent">easier to move through.</span></h2></div><div className="who-copy"><p>Technoon designs AI workflows, conversion systems, business software and workplace products for teams that want less manual drag and more dependable momentum.</p><div className="who-statements"><div><span>Our mission</span><strong>Make essential business systems clearer, quicker and easier to own.</strong></div><div><span>Our motto</span><strong>Less drag. More momentum.</strong></div></div></div></div></section><section id="contact" className="contact-section"><div className="site-container contact-grid contact-grid--audit"><form onSubmit={handleSubmit} className="contact-form contact-form--audit"><div className="audit-form-intro"><SectionTag>Free AI audit</SectionTag><div className="audit-intro-layout"><div><h2>Scope the audit<br /><span className="heading-accent">before we begin.</span></h2><p>This is a focused intake, not a sales deck. Share enough context for us to make the first audit conversation useful from the start.</p></div><aside className="audit-promise"><span>A practical first exchange</span><strong>One meaningful friction point. One clearer next move.</strong></aside></div></div><div className="audit-context"><span>What happens next</span><div><p>We review the friction you describe.</p><p>We identify the clearest next move.</p><p>You decide whether to build further.</p></div></div><div className="audit-form-fields"><label>Your name<input name="name" required placeholder="Name" /></label><label>Work email<input name="email" required type="email" placeholder="name@company.com" /></label><label>Company<input name="company" placeholder="Company name" /></label><label>Role<input name="role" placeholder="Your role" /></label><label className="full-field">What is creating friction?<textarea name="need" required placeholder="For example: leads are slow to reach sales, the website is not converting, or approvals take too long." /></label><label className="full-field">What would a useful outcome look like?<textarea name="outcome" required placeholder="For example: a clearer lead flow, fewer manual hand-offs, or a better workplace process." /></label><label className="full-field">Current tools or process <em>(optional)</em><input name="currentTools" placeholder="For example: HubSpot, WhatsApp, spreadsheets, manual approvals" /></label></div><div className="audit-submit-row"><p>By sending this, you open a prepared Free AI Audit scope email to <a href="mailto:info@technoon.ai">info@technoon.ai</a>.</p><button type="submit" className="cta-primary">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></button></div></form></div></section></main><footer className="site-footer site-footer--refined"><div className="site-container"><div className="footer-cta"><div><SectionTag>One useful next step</SectionTag><h2>Build a business<br /><span className="heading-accent">with fewer loose ends.</span></h2><p>Start with the one workflow, page or workplace process that is taking too much attention.</p></div><a href="#contact" className="cta-primary">Start a free AI audit <ArrowUpRight className="h-4 w-4" /></a></div><div className="footer-grid"><div className="footer-brand"><a href="#top" className="brand-lockup"><img src={LOGO} alt="Technoon.ai" className="brand-logo" /></a><p>Connected workflows, conversion websites and workplace systems for more capable teams.</p></div><div><span>Build</span><a href="#solutions">Automation systems</a><a href="#solutions">Growth systems</a><a href="#solutions">Workplace systems</a></div><div><span>Products</span><a href="#products">Noon HR</a><a href="#products">Visitor management</a><a href="#products">Gate-pass management</a></div><div><span>Explore</span><a href="#products">Product suite</a><a href="#who-we-are">Who we are</a><a href="#contact">Free AI audit</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Technoon.ai</span><span>Business systems with less drag</span><span>Saudi Arabia · India</span></div></div></footer></div>;
}
