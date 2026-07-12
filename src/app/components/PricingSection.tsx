"use client";

import { useState } from "react";

type Currency = "USD" | "SAR" | "INR";

type Plan = {
  service: string;
  detail: string;
  timeline: string;
  price: Record<Currency, string>;
  includes: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    service: "Static / Landing Page",
    detail: "One conversion-focused page",
    timeline: "3–5 days",
    price: {
      USD: "$350 – $700",
      SAR: "SAR 1,300 – 2,600",
      INR: "₹30,000 – ₹60,000",
    },
    includes: "Conversion copy layout, WhatsApp integration, SEO + analytics setup, mobile-first",
  },
  {
    service: "Responsive Multi-Page Website",
    detail: "5–10 pages, custom UI — Bejoice-tier",
    timeline: "1–3 weeks",
    price: {
      USD: "$700 – $1,000",
      SAR: "SAR 2,600 – 3,750",
      INR: "₹60,000 – ₹85,000",
    },
    includes: "Full site architecture, CMS, custom design system, quote forms, on-page SEO, multilingual / Arabic RTL ready",
    featured: true,
  },
  {
    service: "AI Chatbot / WhatsApp Assistant",
    detail: "24/7 lead capture & booking",
    timeline: "5–10 days",
    price: {
      USD: "$400 setup + $150–300/mo",
      SAR: "SAR 1,500 + 560–1,125/mo",
      INR: "₹34,000 + ₹13,000–26,000/mo",
    },
    includes: "Lead qualification, booking integration, custom responses, 24/7 uptime",
  },
  {
    service: "Noon HR",
    detail: "Attendance · Payroll · Compliance",
    timeline: "Live in 2–5 days",
    price: {
      USD: "$3–6 / employee / mo (min $60)",
      SAR: "SAR 11–22 / employee / mo",
      INR: "₹250–500 / employee / mo (min ₹5,000)",
    },
    includes: "All modules, onboarding, and support included — cancel anytime",
  },
];

const currencies: Currency[] = ["USD", "SAR", "INR"];

export default function PricingSection() {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <section className="section section-shell" id="pricing">
      <div className="section-heading centered-heading">
        <p className="eyebrow">Pricing</p>
        <h2>Flat. Honest. No surprises.</h2>
        <p className="section-text centered-note">
          Fixed quotes before we start — what we quote is what you pay.
        </p>
      </div>

      <div className="currency-toggle" role="group" aria-label="Choose currency">
        {currencies.map((c) => (
          <button
            key={c}
            className={currency === c ? "active" : ""}
            onClick={() => setCurrency(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            key={plan.service}
            className={`pricing-card${plan.featured ? " pricing-featured" : ""}`}
          >
            {plan.featured && <span className="pricing-flag">Most popular</span>}
            <h3>{plan.service}</h3>
            <p className="pricing-detail">{plan.detail}</p>
            <div className="pricing-amount">{plan.price[currency]}</div>
            <p className="pricing-timeline">⚡ {plan.timeline}</p>
            <p className="pricing-includes">{plan.includes}</p>
            <button
              className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"} btn-sm pricing-cta`}
              data-cal-link={
                plan.service === "Noon HR" ? "technoon/hr-demo" : "technoon/audit"
              }
            >
              {plan.service === "Noon HR" ? "Book a demo" : "Scope my project"}
            </button>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Setup, onboarding, and 30-day support included on every build.
        Pay in USD, SAR, or INR.
      </p>
    </section>
  );
}
