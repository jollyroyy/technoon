import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";
import CalEmbed from "./components/CalEmbed";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body"
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display"
});

// Set NEXT_PUBLIC_GA_ID in .env.local (e.g. G-XXXXXXXXXX) to enable Google Analytics.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://technoon.ai"),
  title: "Technoon.ai — AI Systems That Stop Revenue Leaks | Websites, AI Receptionists, Automation",
  description:
    "Founder-led AI studio for growing businesses in India and the GCC. Conversion-ready websites in days, 24/7 AI receptionists on WhatsApp, lead follow-up automation, and Noon HR — our own HR SaaS. Fixed scope, fixed price.",
  alternates: { canonical: "https://technoon.ai" },
  keywords: [
    "AI agency", "AI automation agency India", "AI agency Saudi Arabia",
    "website development fixed price", "AI receptionist WhatsApp",
    "lead follow-up automation", "HR software India", "Noon HR"
  ],
  openGraph: {
    title: "Technoon.ai — AI Systems That Stop Revenue Leaks",
    description:
      "Websites in days. AI receptionists that never sleep. Automation that books meetings while you work. Founder-led, fixed price — India & GCC.",
    url: "https://technoon.ai",
    siteName: "Technoon.ai",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Technoon.ai — AI systems that stop revenue leaks"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Technoon.ai — AI Systems That Stop Revenue Leaks",
    description:
      "Websites in days. AI receptionists that never sleep. Founder-led, fixed price — India & GCC.",
    images: ["/og-image.png"]
  },
  robots: { index: true, follow: true }
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Technoon.ai",
  url: "https://technoon.ai",
  logo: "https://technoon.ai/logo.png",
  email: "info@technoon.ai",
  description:
    "Founder-led AI & software studio building websites, AI receptionists, automation, and business software for SMBs in India and the GCC.",
  founder: [
    { "@type": "Person", name: "Sudeshna Pal", jobTitle: "Co-Founder — Full-Stack Development, AI Solutions & Client Delivery" },
    { "@type": "Person", name: "Ummer Shaiq", jobTitle: "Co-Founder — Business Development & Growth" }
  ],
  areaServed: ["IN", "SA", "AE", "QA", "OM"],
  sameAs: ["https://noon-hr.vercel.app"]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${syne.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
        <Navbar />
        {children}
        <ChatWidget />
        <CalEmbed />
      </body>
    </html>
  );
}
