import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gobernanza y Riesgos en la IA",
    template: "%s · Gobernanza IA",
  },
  description:
    "Presentación web interactiva — Gobernanza y Riesgos en la Inteligencia Artificial: el impacto de la complejidad técnica. EIF 413, Universidad Nacional, Campus Nicoya, I Ciclo 2026.",
  keywords: [
    "inteligencia artificial",
    "gobernanza",
    "riesgos",
    "IA",
    "AI Act",
    "OCDE",
    "NIST",
    "UNESCO",
    "regulación",
    "complejidad técnica",
  ],
  authors: [{ name: "Grupo 4 · EIF 413 · UNA Campus Nicoya" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: siteUrl,
    siteName: "Gobernanza IA",
    title: "Gobernanza y Riesgos en la IA",
    description:
      "Presentación web interactiva. EIF 413 · UNA Campus Nicoya · I Ciclo 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gobernanza y Riesgos en la IA",
    description:
      "Presentación web interactiva. EIF 413 · UNA Campus Nicoya · I Ciclo 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PresentationDigitalDocument",
    "name": "Gobernanza y Riesgos en la Inteligencia Artificial: El impacto de la complejidad técnica",
    "alternativeHeadline": "Gobernanza y Riesgos en la IA",
    "description": "Presentación web interactiva que expone la investigación sobre gobernanza, explicabilidad, opacidad algorítmica y marcos de gestión de riesgos (NIST, OCDE, UNESCO, AI Act) en Inteligencia Artificial.",
    "inLanguage": "es-CR",
    "creator": [
      { "@type": "Person", "name": "Cristhian Altamirano Montes" },
      { "@type": "Person", "name": "Danny Orlando Abarca Alvarado" },
      { "@type": "Person", "name": "David Morales Gatica" }
    ],
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Universidad Nacional de Costa Rica, Campus Nicoya",
      "url": "https://www.una.ac.cr"
    },
    "educationalLevel": "Educación Superior / Curso EIF 413",
    "genre": "Investigación Científica en Informática",
    "url": siteUrl,
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
