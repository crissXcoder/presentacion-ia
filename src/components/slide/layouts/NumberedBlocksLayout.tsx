import type { SlideData } from "@/content/slides.types";
import { SlideHeader } from "@/components/slide/SlideHeader";
import { MotifFigure } from "@/components/motifs/MotifFigure";
import { cn } from "@/lib/cn";

/**
 * Layout de bloques numerados (R3): los bullets enumerables (objetivos,
 * conclusiones, recomendaciones) se presentan como bloques con un número
 * grande. NO cambia el contenido: el texto del bullet es el mismo.
 * El motivo va de fondo sutil; los bloques entran con stagger (data-reveal).
 */
export function NumberedBlocksLayout({ data }: { data: SlideData }) {
  const bullets = data.bullets ?? [];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col justify-center gap-10">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.08]">
        <MotifFigure id={data.id} className="max-h-[90%]" />
      </div>

      <div className="relative z-10 flex flex-col gap-10">
        <SlideHeader data={data} align="left" highlight />
        <div
          className={cn(
            "grid gap-6",
            bullets.length === 3 ? "lg:grid-cols-3" : "sm:grid-cols-2",
          )}
        >
          {bullets.map((bullet, i) => (
            <div
              key={bullet}
              data-reveal
              className="relative flex flex-col gap-3 rounded-card border border-border bg-bg-elev/40 p-6 shadow-card"
            >
              <span className="font-display text-5xl font-bold leading-none tabular-nums text-section">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-body-slide text-fg">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
