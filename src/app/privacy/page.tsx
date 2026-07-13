import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Technoon.ai",
  description: "How Technoon.ai collects, uses, and protects your information. Learn about data handling for AI, website, and HR services.",
  alternates: { canonical: "https://technoon.ai/privacy" },
  openGraph: {
    title: "Privacy Policy | Technoon.ai",
    description: "How Technoon.ai collects, uses, and protects your information.",
    url: "https://technoon.ai/privacy",
    siteName: "Technoon.ai",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <main className="legal-shell">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: July 2026</p>

      <p>
        Technoon.ai (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains
        what information we collect through technoon.ai and how we use it.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact details you share with us directly — for example when you email info@technoon.ai or book a call via our scheduling links.</li>
        <li>Basic usage analytics (pages visited, device type) collected to improve the site. We do not sell this data.</li>
        <li>Messages you type into the on-site chat assistant, used only to respond to your enquiry.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to enquiries and deliver services you request.</li>
        <li>To improve our website and offerings.</li>
        <li>We never sell your personal data to third parties.</li>
      </ul>

      <h2>Data protection</h2>
      <p>
        We apply reasonable technical and organisational safeguards to protect your data.
        For clients in Saudi Arabia and the GCC, we build with PDPL awareness; for clients in
        India, we follow applicable Indian data-protection law.
      </p>

      <h2>Third-party services</h2>
      <p>
        Scheduling is handled by Cal.com and is subject to their privacy policy. Analytics,
        where enabled, are provided by Google Analytics.
      </p>

      <h2>Contact</h2>
      <p>
        Questions or data requests: <a href="mailto:info@technoon.ai" className="legal-back">info@technoon.ai</a>
      </p>

      <p><Link href="/" className="legal-back">← Back to home</Link></p>
    </main>
  );
}
