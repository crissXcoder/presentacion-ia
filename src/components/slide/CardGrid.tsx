import type { CardData } from "@/content/slides.types";
import { Card } from "@/components/slide/Card";
import { cn } from "@/lib/cn";

/** Grilla de tarjetas: 2 columnas por defecto, 3 cuando hay 3 o más. */
export function CardGrid({ cards, centered }: { cards: CardData[]; centered?: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2",
        cards.length === 3 && "lg:grid-cols-3",
      )}
    >
      {cards.map((card) => (
        <Card key={card.title} {...card} centered={centered} />
      ))}
    </div>
  );
}
