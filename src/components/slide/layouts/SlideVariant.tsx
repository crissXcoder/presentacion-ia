import type { SlideData, SlideLayoutVariant } from "@/content/slides.types";
import { EditorialLayout } from "@/components/slide/layouts/EditorialLayout";
import { HeroLayout } from "@/components/slide/layouts/HeroLayout";
import { NumberedBlocksLayout } from "@/components/slide/layouts/NumberedBlocksLayout";
import { OffsetGridLayout } from "@/components/slide/layouts/OffsetGridLayout";
import { slideTitleClass } from "@/design/slideLayouts";

/**
 * Resuelve la variante de composición de una slide (R3) a su layout.
 * "auto" no llega aquí (lo maneja el layout estructurado en Slide.tsx).
 */
export function SlideVariant({
  data,
  variant,
}: {
  data: SlideData;
  variant: Exclude<SlideLayoutVariant, "auto">;
}) {
  const titleCls = slideTitleClass[data.id];
  switch (variant) {
    case "editorial-left":
      return <EditorialLayout data={data} titleClassName={titleCls} />;
    case "editorial-right":
      return <EditorialLayout data={data} mirror titleClassName={titleCls} />;
    case "split-diagonal":
      return <EditorialLayout data={data} diagonal titleClassName={titleCls} />;
    case "hero-centered":
      return <HeroLayout data={data} titleClassName={titleCls} />;
    case "numbered-blocks":
      return <NumberedBlocksLayout data={data} />;
    case "offset-grid":
      return <OffsetGridLayout data={data} />;
  }
}
