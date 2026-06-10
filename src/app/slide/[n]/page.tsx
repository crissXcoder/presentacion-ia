import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Deck } from "@/components/deck/Deck";
import { slides } from "@/content/slides";

type SlidePageProps = { params: Promise<{ n: string }> };

/** Pre-renderiza las 16 rutas (deep-linking estático, ADR-001). */
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
  return { title: `${index}/${slides.length} · ${slide.title}` };
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { n } = await params;
  const index = Number(n);
  if (!Number.isInteger(index)) notFound();
  if (index < 1) redirect("/slide/1");
  if (index > slides.length) redirect(`/slide/${slides.length}`);
  return <Deck slides={slides} initialIndex={index} />;
}
