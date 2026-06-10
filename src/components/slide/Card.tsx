import type { CardData } from "@/content/slides.types";
import { SourceTag } from "@/components/slide/SourceTag";
import { cn } from "@/lib/cn";

/**
 * Tarjeta para objetivos, marcos y conceptos.
 * Glass sutil: solo en superficies, nunca en texto plano.
 */
export function Card({
  title,
  body,
  source,
  centered,
}: CardData & { centered?: boolean }) {
  return (
    <article
      data-reveal
      className={cn(
        "flex flex-col gap-3 rounded-card border border-border bg-bg-elev/60 p-5 shadow-card backdrop-blur-sm",
        centered && "items-center text-center",
      )}
    >
      <h3 className="font-display text-body-slide font-semibold text-fg">
        {title}
      </h3>
      <p className={cn("text-body-slide text-fg-muted", centered && "max-w-[45ch]")}>
        {body}
      </p>
      {source && <SourceTag>{source}</SourceTag>}
    </article>
  );
}
