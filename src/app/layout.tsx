import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";
import CalEmbed from "./components/CalEmbed";
import SmoothScroll from "./components/SmoothScroll";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

// Set NEXT_PUBLIC_GA_ID in .env.local (e.g. G-XXXXXXXXXX) to enable Google Analytics.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://technoon.ai"),
  title: {
    default: "Transform Your Business with AI Powered Solutions",
    template: "%s | Technoon.ai",
  },
  description:
    "Founder-led AI studio for growing businesses in India and the GCC. Conversion-ready websites in days, 24/7 AI receptionists on WhatsApp, lead follow-up automation, and Noon HR.",
  alternates: {
    canonical: "https://technoon.ai",
    languages: {
      "en": "https://technoon.ai",
      "en-IN": "https://technoon.ai",
      "en-SA": "https://technoon.ai",
    },
  },
  keywords: [
    "AI agency India", "AI automation agency", "AI agency Saudi Arabia",
    "AI agency GCC", "website development fixed price", "website development Saudi Arabia",
    "AI receptionist WhatsApp", "WhatsApp chatbot India",
    "lead follow-up automation", "HR software India", "Noon HR",
    "founder-led AI studio", "AI chatbot Riyadh", "website design Jeddah",
    "AI automation Dammam", "business software India",
    "fixed price website India", "fixed price website Saudi Arabia",
  ],
  openGraph: {
    title: "Technoon.ai — Transform Your Business with AI Powered Solutions",
    description:
      "Websites in days. AI receptionists that never sleep. Automation that books meetings while you work. Founder-led, fixed price — India & GCC.",
    url: "https://technoon.ai",
    siteName: "Technoon.ai",
    type: "website",
    locale: "en_IN",
    countryName: "India",
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
    title: "Technoon.ai — Transform Your Business with AI Powered Solutions",
    description:
      "Websites in days. AI receptionists that never sleep. Founder-led, fixed price — India & GCC.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad, Gujarat, India",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://technoon.ai/#organization",
      name: "Technoon.ai",
      url: "https://technoon.ai",
      logo: "https://technoon.ai/logo.webp",
      email: "info@technoon.ai",
      description:
        "Founder-led AI & software studio building websites, AI receptionists, automation, and business software for SMBs in India and the GCC.",
      foundingDate: "2025",
      founder: [
        { "@type": "Person", name: "Sudeshna Pal", jobTitle: "Co-Founder — Full-Stack Development, AI Solutions & Client Delivery" },
        { "@type": "Person", name: "Ummer Shaiq", jobTitle: "Co-Founder — Business Development & Growth" }
      ],
      areaServed: [
        { "@type": "Country", name: "IN" },
        { "@type": "Country", name: "SA" },
        { "@type": "Country", name: "AE" },
        { "@type": "Country", name: "QA" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@technoon.ai",
        contactType: "sales",
        availableLanguage: ["English", "Arabic"],
      },
      sameAs: ["https://noon-hr.vercel.app"],
      knowsAbout: [
        "Website Development", "AI Chatbots", "HR Software",
        "Business Automation", "Digital Marketing",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://technoon.ai/#website",
      url: "https://technoon.ai",
      name: "Technoon.ai",
      publisher: { "@id": "https://technoon.ai/#organization" },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": "https://technoon.ai/#webpage",
      url: "https://technoon.ai",
      name: "Technoon.ai — Transform Your Business with AI Powered Solutions",
      isPartOf: { "@id": "https://technoon.ai/#website" },
      about: { "@id": "https://technoon.ai/#organization" },
      description:
        "Founder-led AI & software studio. Websites, AI receptionists, automation, and business software for SMBs in India and the GCC.",
    },
    {
      "@type": "Service",
      name: "Website Development",
      provider: { "@id": "https://technoon.ai/#organization" },
      areaServed: ["IN", "SA", "AE", "QA"],
      description: "Conversion websites 3–5 days. Multi-page corporate sites 1–3 weeks. Fixed price.",
      offers: {
        "@type": "Offer",
        price: "350",
        priceCurrency: "USD",
        priceRange: "350-1000",
      },
    },
    {
      "@type": "Service",
      name: "AI Chatbot / WhatsApp Assistant",
      provider: { "@id": "https://technoon.ai/#organization" },
      areaServed: ["IN", "SA", "AE", "QA"],
      description: "24/7 AI receptionist that qualifies leads and books meetings on WhatsApp and web.",
      offers: {
        "@type": "Offer",
        price: "400",
        priceCurrency: "USD",
        priceRange: "400-600",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Noon HR",
      operatingSystem: "Web",
      applicationCategory: "HRApplication",
      offers: {
        "@type": "Offer",
        price: "3",
        priceCurrency: "USD",
        priceRange: "3-6",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://technoon.ai/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://technoon.ai" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://technoon.ai/#solutions" },
        { "@type": "ListItem", position: 3, name: "Pricing", item: "https://technoon.ai/#pricing" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://technoon.ai/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does a website cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Landing pages start at $350–700 and ship in 3–5 days. Multi-page corporate sites with CMS are $700–1,000 and take 1–3 weeks. All pricing is fixed — no hidden fees, no scope creep.",
          },
        },
        {
          "@type": "Question",
          name: "What industries do you serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We primarily serve SMBs in India and the GCC across F&B/restaurants, fitness/gyms, and logistics. Our AI and web solutions are adaptable to most service-based businesses.",
          },
        },
        {
          "@type": "Question",
          name: "How does the AI WhatsApp receptionist work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It answers customer inquiries 24/7 on WhatsApp and your website, qualifies leads, answers FAQs, and books meetings into your calendar. Setup takes 5–10 days. Pricing is $400 setup + $150–300/month.",
          },
        },
        {
          "@type": "Question",
          name: "Do you serve clients outside India and Saudi Arabia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. While our core markets are India and the GCC (Saudi Arabia, UAE, Qatar), we work with clients globally. All communication and delivery is remote.",
          },
        },
        {
          "@type": "Question",
          name: "What is Noon HR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Noon HR is our own HR software product — employee management, attendance, payroll, and leave tracking. Pricing is $3–6 per employee per month with a $60 monthly minimum. Live in 2–5 days.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get started?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Book a free 30-minute audit call via cal.com/technoon/audit. We'll review your business, identify revenue leaks, and give you a clear plan — no pitch, no pressure.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="theme-color" content="#060410" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        {/* Hero first frame — LCP preload, per device frame set (React hoists to <head>) */}
        <link
          rel="preload"
          as="image"
          href="/frames/frame_000001.webp"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/frames-m/frame_000001.webp"
          media="(max-width: 767px)"
        />
        <link rel="preload" as="image" href="/logo.webp" />
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
        <SmoothScroll />
        <Navbar />
        {children}
        <ChatWidget />
        <CalEmbed />
      </body>
    </html>
  );
}
