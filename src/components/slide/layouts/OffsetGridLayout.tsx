import type { SlideData } from "@/content/slides.types";
import { Bullet } from "@/components/slide/Bullet";
import { SlideHeader } from "@/components/slide/SlideHeader";
import { MotifFigure } from "@/components/motifs/MotifFigure";

/**
 * Layout offset-grid (R3): los bullets se escalonan horizontalmente en
 * zigzag sobre el motivo de fondo, rompiendo la lista vertical recta.
 * En angosto los offsets se anulan (`lg:` only) → columna ordenada.
 */
const OFFSET_CLASSES = [
  "lg:ml-0",
  "lg:ml-16",
  "lg:ml-32",
  "lg:ml-20",
  "lg:ml-4",
  "lg:ml-24",
];

export function OffsetGridLayout({ data }: { data: SlideData }) {
  const bullets = data.bullets ?? [];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col justify-center gap-8">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.10]">
        <MotifFigure id={data.id} className="max-h-[88%]" />
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <SlideHeader data={data} align="left" highlight />
        <ul className="flex flex-col gap-4">
          {bullets.map((bullet, i) => (
            <Bullet
              key={bullet}
              className={OFFSET_CLASSES[i % OFFSET_CLASSES.length]}
            >
              {bullet}
            </Bullet>
          ))}
        </ul>
      </div>
    </div>
  );
}
