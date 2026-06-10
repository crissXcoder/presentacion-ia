import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Deck } from "@/components/deck/Deck";
import { MAIN_TOTAL, slides } from "@/content/slides";

type SlidePageProps = { params: Promise<{ n: string }> };

/** Pre-renderiza todas las rutas, incluidas las de respaldo (ADR-001). */
export function generateStaticParams() {
  return slides.map((_, slideIndex) => ({ n: String(slideIndex + 1) }));
}

export async function generateMetadata({
  params,
}: SlidePageProps): Promise<Metadata> {
  const { n } = await params;
  const index = Number(n);
  const slide = slides[index - 1];
  if (!slide) return { title: "Gobernanza y Riesgos en la IA" };
  if (slide.backup) {
    return {
      title: `B${index - MAIN_TOTAL} · ${slide.title}`,
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `${index}/${MAIN_TOTAL} · ${slide.title}`,
    description: slide.subtitle ?? slide.title,
    alternates: { canonical: `/slide/${index}` },
  };
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { n } = await params;
  const index = Number(n);
  if (!Number.isInteger(index)) notFound();
  if (index < 1) redirect("/slide/1");
  // Fuera de rango: al cierre del flujo principal (las de respaldo
  // existen en 17..20 pero no son un destino "por exceso").
  if (index > slides.length) redirect(`/slide/${MAIN_TOTAL}`);
  return <Deck slides={slides} initialIndex={index} />;
}
