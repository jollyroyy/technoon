import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Technoon.ai",
  description: "Terms governing the use of Technoon.ai website development, AI automation, and software services including Noon HR.",
  alternates: { canonical: "https://technoon.ai/terms" },
  openGraph: {
    title: "Terms of Service | Technoon.ai",
    description: "Terms governing the use of Technoon.ai website development, AI automation, and software services.",
    url: "https://technoon.ai/terms",
    siteName: "Technoon.ai",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <main className="legal-shell">
      <h1>Terms of Service</h1>
      <p className="legal-updated">Last updated: July 2026</p>

      <h2>Services</h2>
      <p>
        Technoon.ai provides website development, AI automation, digital marketing, and
        software services (including the Noon HR product) under fixed-scope, fixed-price
        agreements defined per project before work begins.
      </p>

      <h2>Quotes &amp; payment</h2>
      <ul>
        <li>All quotes are fixed once scope is agreed in writing. What we quote is what you pay.</li>
        <li>Unless agreed otherwise, projects are billed 50% on start and 50% on delivery, payable in USD, SAR, or INR.</li>
        <li>Noon HR subscriptions are billed monthly and can be cancelled anytime; access continues to the end of the billing period.</li>
      </ul>

      <h2>Delivery &amp; support</h2>
      <p>
        Published timelines (e.g. landing pages in 3–5 days) apply from receipt of all required
        content and approvals. Every build includes setup, onboarding, and 30 days of
        post-launch support.
      </p>

      <h2>Intellectual property</h2>
      <p>
        On full payment, you own the deliverables produced for your project. We retain the
        right to reference non-confidential work in our portfolio unless agreed otherwise.
      </p>

      <h2>Liability</h2>
      <p>
        Services are provided with professional care. Our aggregate liability for any claim is
        limited to the fees paid for the specific engagement giving rise to the claim.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href="mailto:info@technoon.ai" className="legal-back">info@technoon.ai</a>
      </p>

      <p><Link href="/" className="legal-back">← Back to home</Link></p>
    </main>
  );
}
