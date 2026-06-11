import type { SlideData } from "@/content/slides.types";
import { Bullet } from "@/components/slide/Bullet";
import { SlideHeader } from "@/components/slide/SlideHeader";
import { MotifFigure } from "@/components/motifs/MotifFigure";
import { cn } from "@/lib/cn";

/**
 * Layout editorial (R3): texto en columna estrecha + motivo a sangre en la
 * otra mitad (estilo revista). `mirror` invierte los lados; `diagonal`
 * corta el panel del motivo con una diagonal y un seam de acento.
 * Responsive: el panel del motivo se oculta en angosto (1 columna limpia).
 */
export function EditorialLayout({
  data,
  mirror = false,
  diagonal = false,
  titleClassName,
}: {
  data: SlideData;
  mirror?: boolean;
  diagonal?: boolean;
  titleClassName?: string;
}) {
  const textZone = (
    <div
      className={cn(
        "flex min-h-0 flex-col justify-center gap-8",
        mirror ? "lg:pl-6" : "lg:pr-6",
      )}
    >
      <SlideHeader data={data} align="left" highlight titleClassName={titleClassName ?? "text-slide-editorial"} />
      {data.bullets && data.bullets.length > 0 && (
        <ul className="flex max-w-[46ch] flex-col gap-5">
          {data.bullets.map((bullet) => (
            <Bullet key={bullet}>{bullet}</Bullet>
          ))}
        </ul>
      )}
    </div>
  );

  const motifZone = (
    <div
      data-layer="motif"
      className="relative hidden overflow-hidden lg:flex lg:items-center lg:justify-center"
      style={
        diagonal
          ? { clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }
          : undefined
      }
    >
      <MotifFigure id={data.id} className="max-h-[80%]" />
      {diagonal && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-[14%] w-[2px] -skew-x-[14deg] bg-gradient-to-b from-transparent via-section to-transparent opacity-70"
        />
      )}
    </div>
  );

  return (
    <div className="grid min-h-0 flex-1 items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      {mirror ? (
        <>
          {motifZone}
          {textZone}
        </>
      ) : (
        <>
          {textZone}
          {motifZone}
        </>
      )}
    </div>
  );
}
