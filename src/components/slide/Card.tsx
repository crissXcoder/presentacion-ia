import type { CardData } from "@/content/slides.types";
import { SourceTag } from "@/components/slide/SourceTag";

/**
 * Tarjeta para objetivos, marcos y conceptos.
 * Glass sutil: solo en superficies, nunca en texto plano.
 */
export function Card({ title, body, source }: CardData) {
  return (
    <article
      data-reveal
      className="flex flex-col gap-3 rounded-card border border-border bg-bg-elev/60 p-6 shadow-card backdrop-blur-sm"
    >
      <h3 className="font-display text-body-slide font-semibold text-fg">
        {title}
      </h3>
      <p className="text-body-slide text-fg-muted">{body}</p>
      {source && <SourceTag>{source}</SourceTag>}
    </article>
  );
}
