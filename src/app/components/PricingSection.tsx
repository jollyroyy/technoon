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
    detail: "5–10 pages, CMS-ready",
    timeline: "7–14 days",
    price: {
      USD: "$800 – $1,800",
      SAR: "SAR 3,000 – 6,700",
      INR: "₹68,000 – ₹1,55,000",
    },
    includes: "Full site architecture, CMS, contact & quote forms, on-page SEO, blog-ready",
  },
  {
    service: "Premium / Corporate Website",
    detail: "Bejoice-tier, fully custom UI",
    timeline: "3–4 weeks",
    price: {
      USD: "$2,000 – $4,500",
      SAR: "SAR 7,500 – 16,900",
      INR: "₹1,70,000 – ₹3,85,000",
    },
    includes: "Custom design system, animations, multilingual / Arabic RTL ready, performance-tuned",
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
            <a
              className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"} btn-sm pricing-cta`}
              href={
                plan.service === "Noon HR"
                  ? "https://cal.com/technoon/hr-demo"
                  : "https://cal.com/technoon/audit"
              }
            >
              {plan.service === "Noon HR" ? "Book a demo" : "Scope my project"}
            </a>
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
