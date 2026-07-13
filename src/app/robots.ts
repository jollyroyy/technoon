import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow AI search crawlers (GEO — Generative Engine Optimization)
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "AndiBot", allow: "/" },
      // Block training-only crawlers (no search use)
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      // Default — allow everything
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://technoon.ai/sitemap.xml",
  };
}
