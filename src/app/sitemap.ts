import type { MetadataRoute } from "next";
import { MAIN_TOTAL } from "@/content/slides";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/slide/1`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  for (let i = 2; i <= MAIN_TOTAL; i++) {
    entries.push({
      url: `${siteUrl}/slide/${i}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
