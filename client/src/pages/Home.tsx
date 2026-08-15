import { Button } from "@/components/ui/button";
/*
 * Quiet Systems Editorial — Home translates Technoon's positioning into a calm,
 * asymmetric story. Every asset, section and interaction must feel like a useful
 * operational artifact, not generic AI decoration.
 */
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  Menu,
  MoveRight,
  Play,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const LOGO = "/manus-storage/technoon-logo-exact_93ab0782.webp";
const HERO_IMAGE = "/manus-storage/technoon-hero-systems_4195453c.jpg";
const WORKFLOW_IMAGE = "/manus-storage/technoon-workflow-automation_4a8ea3e7.jpg";
const WORKPLACE_IMAGE = "/manus-storage/technoon-workplace-operations_a0790dd6.jpg";
const GROWTH_IMAGE = "/manus-storage/technoon-growth-system_ff76458a.jpg";

const productData = [
  {
    id: "hr",
    eyebrow: "01 / People operations",
    name: "Noon HR",
    summary: "One quiet source of truth for attendance, leave, payroll and compliance.",
    features: ["Attendance and leave", "Payroll-ready records", "Employee self-service"],
    accent: "bg-[#CEFF45]",
  },
  {
    id: "visitor",
    eyebrow: "02 / Front-of-house",
    name: "Visitor management",
    summary: "A composed arrival experience with registrations, approvals and host notifications.",
    features: ["Pre-register visitors", "Instant host alerts", "Digital visit history"],
    accent: "bg-[#9D8CFF]",
  },
  {
    id: "gate",
    eyebrow: "03 / Site control",
    name: "Gate-pass management",
    summary: "Make people and material movement accountable from request to release.",
    features: ["Configurable approvals", "Material movement logs", "Gate-side verification"],
    accent: "bg-[#70A8FF]",
  },
];

const faqItems = [
  ["What does a systems review involve?", "We use a focused 30-minute conversation to map one priority workflow, its friction points, the systems around it, and the most useful next step. It is a practical scoping conversation—not a generic sales call."],
  ["Can you work with the tools we already use?", "Yes. We design around your working reality. That can mean connecting existing CRM, communications, website, HR, or operational systems before recommending anything new."],
  ["Are the products separate from the services?", "They can be purchased independently. The advantage of working with Technoon is that products and custom systems can also be joined into one well-run operational setup."],
  ["How quickly can a project launch?", "The timeline depends on scope. Focused workflow and website engagements can move in weeks; connected operations programs are phased so you can realize value before the final layer is complete."],
];

function SectionTag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`font-mono flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] ${dark ? "text-[#CEFF45]" : "text-[#57535A]"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-[#CEFF45]" : "bg-[#151417]"}`} />
      {children}
    </div>
  );
}

function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={`font-mono inline-flex items-center rounded-full border px-3 py-1 text-[9px] uppercase tracking-[0.14em] ${dark ? "border-white/15 text-white/65" : "border-black/10 text-[#58535a]"}`}>{children}</span>;
}

function ArrowLink({ children, light = false, href = "#contact" }: { children: React.ReactNode; light?: boolean; href?: string }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-2 text-sm font-semibold ${light ? "text-white" : "text-[#17161A]"}`}>
      <span className="line-link">{children}</span><ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState("hr");
  const active = productData.find((item) => item.id === activeProduct) ?? productData[0];

  return (
    <div className="min-h-screen overflow-hidden bg-[#F7F4ED] text-[#17161A]">
      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-[#F7F4ED]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="Technoon.ai home" className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.015]">
            <span className="relative flex h-11 w-[132px] items-center overflow-hidden rounded-[3px] bg-[#111116] px-2.5"><img src={LOGO} alt="Technoon.ai" className="h-full w-full object-contain" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#CEFF45]" /></span>
            <span className="font-mono hidden text-[8px] uppercase tracking-[0.14em] text-[#777078] xl:block">Systems<br />studio</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            <a className="line-link text-xs font-semibold text-[#3E3A41]" href="#solutions">Solutions</a>
            <a className="line-link text-xs font-semibold text-[#3E3A41]" href="#products">Products</a>
            <a className="line-link text-xs font-semibold text-[#3E3A41]" href="#method">Method</a>
            <a className="line-link text-xs font-semibold text-[#3E3A41]" href="#work">Work</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden items-center gap-2 rounded-[3px] bg-[#17161A] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#333039] active:scale-[0.97] sm:inline-flex">
              Book a systems review <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="grid h-10 w-10 place-items-center rounded-[3px] border border-black/10 text-[#17161A] lg:hidden">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-black/10 bg-[#F7F4ED] px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-4 text-base font-semibold">
              {[["Solutions", "#solutions"], ["Products", "#products"], ["Method", "#method"], ["Work", "#work"], ["Insights", "#insights"]].map(([label, href]) => <a onClick={() => setMobileOpen(false)} href={href} key={label} className="flex items-center justify-between border-b border-black/10 pb-4">{label}<ChevronRight className="h-4 w-4" /></a>)}
              <a onClick={() => setMobileOpen(false)} href="#contact" className="mt-2 inline-flex items-center justify-between rounded-[3px] bg-[#17161A] px-4 py-3 text-sm text-white">Book a systems review <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative border-b border-black/10">
          <div className="grid-faint absolute inset-0 opacity-[0.34]" />
          <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[1.04fr_.96fr]">
            <div className="flex min-h-[560px] flex-col justify-between px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:min-h-[670px] lg:border-r lg:border-black/10 lg:px-12 lg:py-16 xl:px-20">
              <div>
                <SectionTag>Technoon.ai / Business systems</SectionTag>
                <h1 className="font-display mt-9 max-w-[700px] text-[clamp(3rem,7.5vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-[#17161A]">
                  The work between systems <span className="relative z-0 inline-block after:absolute after:bottom-[7%] after:left-0 after:-z-10 after:h-[17%] after:w-full after:bg-[#CEFF45]">should disappear.</span>
                </h1>
                <p className="mt-8 max-w-[530px] text-base leading-7 text-[#625D65] sm:text-lg">
                  Technoon designs the workflows, websites, and workplace software that make an ambitious business easier to run—and easier to grow.
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
                <a href="#contact" className="inline-flex w-fit items-center gap-3 rounded-[3px] bg-[#17161A] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(23,22,26,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#37333E] active:scale-[0.97]">
                  Book a systems review <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#products" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#17161A]"><span className="line-link">Explore workplace products</span><ArrowDownRight className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="relative min-h-[420px] overflow-hidden bg-[#EAE5D9] sm:min-h-[520px] lg:min-h-full">
              <img src={HERO_IMAGE} alt="Connected business systems visual" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#101015]/30 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
                <div className="flex items-end justify-between border-t border-white/50 pt-3 text-white">
                  <div><p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/70">System view / 01</p><p className="mt-1 text-sm font-medium">Operations, growth, and workplace—connected.</p></div>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/40 bg-black/10 backdrop-blur"><MoveRight className="h-4 w-4" /></span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 border-t border-black/10 sm:grid-cols-3">
            {[['01', 'Automate the work', 'AI workflows & integrations'], ['02', 'Grow the demand', 'Websites & marketing systems'], ['03', 'Run the workplace', 'HR, visitors & gate passes']].map(([number, title, caption], index) => (
              <a href={index === 2 ? '#products' : '#solutions'} key={number} className={`group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-white/45 sm:px-8 lg:px-12 ${index < 2 ? 'sm:border-r sm:border-black/10' : ''}`}>
                <span className="font-mono text-[10px] text-[#6D861B]">{number}</span><div><p className="text-sm font-semibold">{title}</p><p className="mt-0.5 text-xs text-[#736D74]">{caption}</p></div><ArrowUpRight className="ml-auto h-4 w-4 text-[#777078] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </section>

        <section id="solutions" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 xl:px-20">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <SectionTag>What we connect</SectionTag>
              <h2 className="font-display mt-7 text-4xl font-semibold leading-[0.97] tracking-[-0.055em] sm:text-5xl">One company.<br />Three systems of value.</h2>
              <p className="mt-6 max-w-sm text-sm leading-6 text-[#67616A]">A clear offer hierarchy means you can start where the friction is, then extend the system when it proves useful.</p>
            </div>
            <div className="border-t border-black/10">
              {[
                ['01', 'Automate the work', 'AI workflows, internal tools, approval systems, integrations and reporting designed around the way your team actually works.', 'Workflow architecture'],
                ['02', 'Grow the demand', 'Conversion websites, marketing operations, lead routing and response systems that carry the right signal from first visit to first meeting.', 'Growth systems'],
                ['03', 'Run the workplace', 'Connected tools for people, visitors, material movement and the repeatable processes that keep a location orderly.', 'Workplace suite'],
              ].map(([number, title, copy, tag]) => (
                <div key={number} className="group grid gap-4 border-b border-black/10 py-7 sm:grid-cols-[62px_1fr_auto] sm:items-start sm:gap-6 sm:py-8">
                  <span className="font-mono relative text-[10px] text-[#6D861B] after:absolute after:left-[4px] after:top-4 after:h-8 after:w-px after:bg-[#CEFF45]">{number}</span><div><h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-[#67616A]">{copy}</p></div><span className="font-mono mt-1 text-[9px] uppercase tracking-[0.14em] text-[#777078] sm:text-right">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17161A] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-20">
            <div className="grid gap-10 lg:grid-cols-[.86fr_1.14fr] lg:gap-20">
              <div><SectionTag dark>Build with us</SectionTag><h2 className="font-display mt-7 max-w-[530px] text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">Take the friction out of the hand-off.</h2></div>
              <div className="grid gap-5 sm:grid-cols-2"><p className="max-w-md text-base leading-7 text-white/65">A customer inquiry, an approval request, a website lead, a visitor arrival—these are not isolated moments. We map the spaces between them, then make them work together.</p><div className="border-l border-white/15 pl-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#CEFF45]">A better starting point</p><p className="mt-3 text-sm leading-6 text-white/65">Begin with one stubborn process. The solution can grow around it.</p></div></div>
            </div>
            <div className="relative mt-14 grid gap-4 lg:grid-cols-3 before:absolute before:-top-4 before:left-0 before:right-0 before:hidden before:h-px before:bg-[#CEFF45]/70 lg:before:block after:absolute after:-top-[18px] after:left-[33.333%] after:hidden after:h-[9px] after:w-[9px] after:-translate-x-1/2 after:rounded-full after:bg-[#CEFF45] lg:after:block">
              {[
                ['AI workflow design', 'Map the work, then automate what is genuinely repetitive.', 'Discovery → logic → delivery'],
                ['Conversion websites', 'Build a site that tells the right commercial story and routes the next action.', 'Strategy → build → improve'],
                ['Marketing operations', 'Make campaign, content and lead handling feel less like a collection of chores.', 'Signal → response → meeting'],
              ].map(([title, copy, process], index) => <article key={title} className={`group relative min-h-[250px] overflow-hidden border border-white/15 bg-white/[0.035] p-6 transition-colors hover:bg-white/[0.07] sm:p-7 ${index === 1 ? 'lg:translate-y-6' : ''}`}><div className="absolute right-6 top-6 flex items-center gap-1.5 text-[#CEFF45]"><span className="h-1.5 w-1.5 rounded-full bg-current" /><span className="h-px w-5 bg-current/60" /><ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><Pill dark>{process}</Pill><h3 className="mt-12 text-2xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/60">{copy}</p></article>)}
            </div>
            <div className="mt-10 border-y border-white/15 py-5"><div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">{['AI receptionist & voice flows', 'Lead follow-up automation', 'Custom business software', 'Responsive conversion websites', 'SEO, SEM & performance marketing', 'Social & brand promotion'].map((capability, index) => <div key={capability} className="flex items-center gap-3"><span className="font-mono text-[9px] text-[#CEFF45]">0{index + 1}</span><span className="text-xs text-white/70">{capability}</span></div>)}</div></div>
            <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">Founder-led builds / Saudi & India ready</p><ArrowLink light>See how we work</ArrowLink></div>
          </div>
        </section>

        <section id="products" className="bg-[#EDE9DE] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-20">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><SectionTag>Run with our products</SectionTag><h2 className="font-display mt-7 max-w-[630px] text-4xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-5xl">A workplace suite that behaves like one system.</h2></div><p className="max-w-sm text-sm leading-6 text-[#68626A]">Each product is useful on its own. Together, they give operations teams a calmer way to manage people, arrivals and movement.</p></div>
            <div className="relative mt-12 grid overflow-hidden border border-black/10 bg-[#F7F4ED] lg:grid-cols-[.47fr_.53fr] before:absolute before:left-[47%] before:top-8 before:z-10 before:hidden before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-[#CEFF45] lg:before:block">
              <div className="flex flex-col border-b border-black/10 lg:border-b-0 lg:border-r">
                {productData.map((product) => <button onClick={() => setActiveProduct(product.id)} key={product.id} className={`group flex flex-1 flex-col justify-between border-b border-black/10 p-6 text-left last:border-b-0 sm:p-8 ${activeProduct === product.id ? 'bg-[#17161A] text-white' : 'bg-transparent text-[#17161A] hover:bg-white/70'}`}><div className="flex items-center justify-between"><span className={`font-mono text-[9px] uppercase tracking-[0.15em] ${activeProduct === product.id ? 'text-[#CEFF45]' : 'text-[#767078]'}`}>{product.eyebrow}</span><ArrowUpRight className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${activeProduct === product.id ? 'text-[#CEFF45]' : 'text-[#777078]'}`} /></div><h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{product.name}</h3></button>)}
              </div>
              <div className="relative min-h-[520px] overflow-hidden p-6 sm:p-10">
                <img src={WORKPLACE_IMAGE} alt="Workplace management system" className="absolute inset-0 h-full w-full object-cover opacity-[0.3]" />
                <div className="absolute inset-0 bg-[#F7F4ED]/75" />
                <div className="relative flex h-full flex-col justify-between">
                  <div><span className={`block h-2.5 w-2.5 rounded-full ${active.accent}`} /><p className="font-mono mt-8 text-[10px] uppercase tracking-[0.16em] text-[#5C5660]">{active.eyebrow}</p><h3 className="font-display mt-3 text-4xl font-semibold tracking-[-0.055em]">{active.name}</h3><p className="mt-5 max-w-md text-base leading-7 text-[#5E5961]">{active.summary}</p></div>
                  <div className="mt-10 rounded-[4px] border border-black/10 bg-[#F7F4ED]/90 p-5 shadow-[0_20px_45px_rgba(25,22,25,0.12)] backdrop-blur"><div className="flex items-center justify-between border-b border-black/10 pb-4"><span className="font-mono text-[9px] uppercase tracking-[0.14em]">Daily signal</span><span className="flex items-center gap-1.5 text-xs font-semibold"><span className={`h-1.5 w-1.5 rounded-full ${active.accent}`} /> Live</span></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{active.features.map((feature, i) => <div key={feature} className="border border-black/10 bg-white/50 p-3"><p className="font-mono text-[9px] text-[#7A747B]">0{i + 1}</p><p className="mt-5 text-xs font-semibold leading-5">{feature}</p></div>)}</div></div>
                  <div className="mt-6"><ArrowLink href="#contact">Book a product walkthrough</ArrowLink></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 xl:px-20">
          <div className="grid gap-10 lg:grid-cols-[.66fr_1.34fr] lg:gap-20"><div><SectionTag>Selected work</SectionTag><h2 className="font-display mt-7 text-4xl font-semibold leading-[0.97] tracking-[-0.055em] sm:text-5xl">Proof is a working system, not a shiny promise.</h2><p className="mt-6 max-w-sm text-sm leading-6 text-[#68626A]">Every engagement should make a specific part of the business more visible, more responsive, or more reliable.</p><div className="mt-8 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#CEFF45]" /><span className="h-px w-20 bg-[#17161A]" /><span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#777078]">Evidence layer</span></div></div>
            <div className="grid gap-4"><article className="group relative overflow-hidden bg-[#151419] p-6 text-white sm:p-9"><div className="absolute right-0 top-0 h-40 w-44 bg-[#5E50CC] opacity-25 blur-3xl" /><div className="relative flex flex-col justify-between gap-16 sm:flex-row sm:gap-8"><div><Pill dark>Web + growth system</Pill><h3 className="font-display mt-7 max-w-lg text-3xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-4xl">A trust-first website for a Saudi logistics leader.</h3><p className="mt-5 max-w-lg text-sm leading-6 text-white/60">A clearer commercial story, a mobile-first site, and a structure designed for operators who need to communicate capability quickly.</p></div><div className="min-w-[136px] border-l border-white/15 pl-5"><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#CEFF45]">Built for</p><p className="mt-2 text-sm font-semibold">Bejoice Shipping</p><p className="mt-7 text-3xl font-semibold">25<span className="text-lg">+</span></p><p className="text-xs text-white/55">years of operations</p></div></div><div className="relative mt-10 flex justify-between border-t border-white/15 pt-5"><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/45">Saudi Arabia / Logistics</span><ArrowLink light>View the system</ArrowLink></div></article>
            <div className="grid gap-4 md:grid-cols-2"><article className="border border-black/10 p-6 sm:p-7"><Pill>Internal workflow</Pill><h3 className="mt-11 text-2xl font-semibold tracking-[-0.04em]">Requests that know where to go next.</h3><p className="mt-3 text-sm leading-6 text-[#68626A]">From initial submission to approval and record, without the group-chat chase.</p><div className="mt-8 flex items-center gap-2 text-xs font-semibold"><span className="h-2 w-2 rounded-full bg-[#CEFF45]" /> Workflow logic</div></article><article className="relative min-h-[260px] overflow-hidden bg-[#EAE5D9] p-6 sm:p-7"><img src={GROWTH_IMAGE} alt="Growth systems visual" className="absolute inset-0 h-full w-full object-cover opacity-70" /><div className="absolute inset-0 bg-gradient-to-t from-[#17161A]/75 via-transparent" /><div className="relative flex h-full flex-col justify-end text-white"><Pill dark>Marketing operations</Pill><h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Faster lead response, fewer loose ends.</h3></div></article></div></div>
          </div>
        </section>

        <section id="method" className="border-y border-black/10 bg-[#F7F4ED] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-20"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><SectionTag>How we work</SectionTag><h2 className="font-display mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">Structured enough to move. Flexible enough to fit.</h2><p className="mt-6 max-w-sm text-sm leading-6 text-[#68626A]">The method keeps a project focused on the real operational problem—not just the visible request.</p></div><div className="relative border-t border-black/10 before:absolute before:bottom-0 before:left-7 before:top-0 before:w-px before:bg-[#CEFF45]/80">{[['01','Discover','Find the repeated friction, the commercial opportunity, and the people closest to the problem.'],['02','Map','Turn the current reality into a clear workflow: triggers, decisions, systems and hand-offs.'],['03','Build','Design the useful layer—workflow, product, website, integration—then put it through real conditions.'],['04','Improve','Launch with ownership, training and a feedback loop so the system holds up after handover.']].map(([num,title,copy]) => <div key={num} className="relative grid gap-3 border-b border-black/10 py-5 sm:grid-cols-[56px_150px_1fr] sm:gap-6 sm:py-6"><span className="font-mono relative z-10 grid h-4 w-4 place-items-center rounded-full bg-[#F7F4ED] text-[10px] text-[#6D861B] ring-1 ring-[#CEFF45]">{num}</span><h3 className="text-lg font-semibold">{title}</h3><p className="max-w-lg text-sm leading-6 text-[#68626A]">{copy}</p></div>)}</div></div></div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 xl:px-20">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><SectionTag>Before we build</SectionTag><h2 className="font-display mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">The questions that make a project clearer.</h2><p className="mt-6 max-w-sm text-sm leading-6 text-[#68626A]">Clear answers reduce uncertainty before a project turns into a proposal, a build, or a product walkthrough.</p></div><div className="border-t border-black/10">{faqItems.map(([question, answer], index) => <details key={question} className="group border-b border-black/10 py-5"><summary className="flex list-none items-center justify-between gap-4 text-base font-semibold marker:hidden"><span><span className="font-mono mr-4 text-[9px] text-[#6D861B]">0{index + 1}</span>{question}</span><ChevronDown className="h-4 w-4 shrink-0 text-[#777078] transition-transform duration-200 group-open:rotate-180" /></summary><p className="max-w-2xl pb-1 pt-4 pl-8 text-sm leading-6 text-[#68626A]">{answer}</p></details>)}</div></div>
        </section>

        <section className="bg-[#EDE9DE] py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.93fr_1.07fr] lg:gap-20 lg:px-12 xl:px-20"><div className="relative min-h-[420px] overflow-hidden bg-[#1A1920]"><img src={WORKFLOW_IMAGE} alt="Workflow system mapping" className="absolute inset-0 h-full w-full object-cover opacity-75" /><div className="absolute inset-0 bg-gradient-to-t from-[#121116]/75 via-transparent" /><div className="absolute bottom-6 left-6 right-6 flex justify-between border-t border-white/35 pt-3 text-white"><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/65">A systems review, in practice</span><Play className="h-4 w-4 fill-white" /></div></div><div className="flex flex-col justify-center"><SectionTag>Not another discovery deck</SectionTag><h2 className="font-display mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">Start with the one process your team keeps working around.</h2><p className="mt-6 max-w-xl text-base leading-7 text-[#625D65]">We will help you see the hand-offs, gaps and opportunities around one real process. You will leave with a useful point of view whether we build together or not.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{[['30 minutes','A focused conversation'],['No pressure','A practical next step']].map(([title,sub]) => <div key={title} className="border-t border-black/10 pt-3"><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-[#716B73]">{sub}</p></div>)}</div><a href="#contact" className="mt-9 inline-flex w-fit items-center gap-3 rounded-[3px] bg-[#17161A] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#37333E] active:scale-[0.97]">Book a systems review <ArrowUpRight className="h-4 w-4" /></a></div></div>
        </section>

        <section id="insights" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 xl:px-20"><div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end"><div><SectionTag>Notes for operators</SectionTag><h2 className="font-display mt-7 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Useful thinking, before the sales call.</h2></div><ArrowLink href="#contact">See all insights</ArrowLink></div><div className="grid md:grid-cols-3">{[['Workflow design','Where automation helps—and where it just adds another system.'],['Workplace operations','A calmer way to think about people, access and record-keeping.'],['B2B websites','What a business website needs to explain before it asks for a meeting.']].map(([category,title],i) => <article key={category} className={`group relative px-0 py-8 md:px-7 md:py-10 ${i<2?'md:border-r md:border-black/10':''}`}><span className="absolute left-0 top-0 h-1.5 w-1.5 bg-[#CEFF45] md:left-7" /><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#6D861B]">{category}</span><h3 className="mt-10 text-xl font-semibold leading-7 tracking-[-0.03em]">{title}</h3><a href="#contact" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold"><span className="line-link">Read note</span><ArrowUpRight className="h-3.5 w-3.5" /></a></article>)}</div></section>

        <section id="contact" className="bg-[#17161A] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 xl:px-20"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-[.94fr_1.06fr] lg:gap-20"><div><SectionTag dark>Make the next move clearer</SectionTag><h2 className="font-display mt-7 max-w-[630px] text-4xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl">Tell us what keeps getting in the way.</h2><p className="mt-6 max-w-md text-sm leading-6 text-white/60">A better system starts with a specific operational or commercial friction. We are happy to look at one with you.</p><div className="mt-10 flex flex-wrap gap-2"><Pill dark>AI workflows</Pill><Pill dark>Websites</Pill><Pill dark>Marketing systems</Pill><Pill dark>Workplace products</Pill></div></div><form className="grid gap-5 self-end" onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.currentTarget); const name = data.get('name') ?? ''; const email = data.get('email') ?? ''; const need = data.get('need') ?? ''; const body = `Name: ${name}\nEmail: ${email}\n\nWhat needs to work better:\n${need}`; window.location.href = `mailto:info@technoon.ai?subject=${encodeURIComponent('Systems review request')}&body=${encodeURIComponent(body)}`; }}><label className="block"><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">Your name</span><input name="name" required className="mt-2 w-full border-b border-white/30 bg-transparent py-3 text-lg outline-none placeholder:text-white/25 focus:border-[#CEFF45]" placeholder="What should we call you?" /></label><label className="block"><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">Work email</span><input name="email" type="email" required className="mt-2 w-full border-b border-white/30 bg-transparent py-3 text-lg outline-none placeholder:text-white/25 focus:border-[#CEFF45]" placeholder="you@company.com" /></label><label className="block"><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">What needs to work better?</span><textarea name="need" required rows={3} className="mt-2 w-full resize-none border-b border-white/30 bg-transparent py-3 text-lg outline-none placeholder:text-white/25 focus:border-[#CEFF45]" placeholder="A workflow, a website, a workplace process…" /></label><div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xs text-xs leading-5 text-white/45">This opens your email client with the details you have entered. Prefer email? <a className="text-white underline underline-offset-4" href="mailto:info@technoon.ai">info@technoon.ai</a></p><button type="submit" className="inline-flex w-fit items-center gap-3 rounded-[3px] bg-[#CEFF45] px-5 py-3.5 text-sm font-bold text-[#17161A] transition-all hover:-translate-y-0.5 hover:bg-[#DDFF79] active:scale-[0.97]">Send a review request <ArrowUpRight className="h-4 w-4" /></button></div></form></div></div>
        </section>
      </main>

      <footer className="bg-[#0F0F12] px-5 pb-7 pt-9 text-white sm:px-8 lg:px-12 xl:px-20"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-8 sm:flex-row sm:items-start"><a href="#top" className="group flex items-center gap-2.5"><span className="relative flex h-12 w-[142px] items-center overflow-hidden rounded-[3px] bg-[#17161A] px-2.5"><img src={LOGO} alt="Technoon.ai" className="h-full w-full object-contain" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#CEFF45]" /></span><span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">Business<br />systems</span></a><div className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs text-white/60 sm:grid-cols-3"><a href="#solutions" className="hover:text-white">Solutions</a><a href="#products" className="hover:text-white">Products</a><a href="#method" className="hover:text-white">How we work</a><a href="#work" className="hover:text-white">Selected work</a><a href="#insights" className="hover:text-white">Insights</a><a href="mailto:info@technoon.ai" className="hover:text-white">info@technoon.ai</a></div></div><div className="flex flex-col justify-between gap-3 pt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40 sm:flex-row"><span>© {new Date().getFullYear()} Technoon.ai</span><span>Business systems that move as one</span></div></div></footer>
    </div>
  );
}
