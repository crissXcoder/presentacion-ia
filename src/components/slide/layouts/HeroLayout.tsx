import type { SlideData } from "@/content/slides.types";
import { SlideHeader } from "@/components/slide/SlideHeader";
import { MotifFigure } from "@/components/motifs/MotifFigure";

/**
 * Layout hero (R3): momento de impacto (pregunta, objetivo, cierre).
 * Título enorme centrado, motivo de fondo amplio y pocos elementos.
 * El contenido va por encima (z-10) del motivo ambiente (z-0).
 */
export function HeroLayout({ data }: { data: SlideData }) {
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.16]">
        <MotifFigure id={data.id} className="max-h-[92%] max-w-[80%]" />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center gap-7 text-center">
        <SlideHeader
          data={data}
          align="center"
          highlight
          titleClassName="text-display max-w-[20ch]"
        />
        {data.bullets && data.bullets.length > 0 && (
          <div className="flex flex-col gap-3" data-reveal>
            {data.bullets.map((bullet) => (
              <p
                key={bullet}
                className="max-w-[58ch] text-body-slide font-medium text-fg-muted"
              >
                {bullet}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
