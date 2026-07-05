import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://technoon.ai"),
  title: "Technoon.ai | AI Systems For Revenue Growth",
  description:
    "AI systems for food and beverage, gyms, and logistics teams. Find revenue leakages, automate workflows, and scale operations with clarity.",
  openGraph: {
    title: "Technoon.ai | AI Systems For Revenue Growth",
    description:
      "We help food and beverage brands, gyms, and logistics teams find revenue leakages and scale with AI workflows.",
    url: "https://technoon.ai",
    siteName: "Technoon.ai",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${grotesk.variable}`}>
          <Navbar />
          {children}
        </body>
    </html>
  );
}
