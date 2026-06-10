import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/slide/18", "/slide/19", "/slide/20", "/slide/21"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
