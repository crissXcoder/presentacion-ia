/**
 * Mapa de variantes de composición por slide (R3).
 *
 * Es PRESENTACIÓN, no contenido: se indexa por `id` aquí y no se toca
 * `content/slides.ts`. Solo las slides de solo-texto reciben variante; las
 * de visual propio (KPI, diagrama, cards, tabla, imagen) y la portada usan
 * el layout estructurado dirigido por datos ("auto").
 *
 * Criterio: alternar para crear ritmo, `hero-centered` en los momentos
 * clave (pregunta, objetivo), `numbered-blocks` donde los bullets son
 * enumerables (conclusiones, recomendaciones).
 *
 * Fuente de verdad del tipo: src/content/slides.types.ts.
 */
import type { SlideLayoutVariant } from "@/content/slides.types";

export const slideLayouts: Record<number, SlideLayoutVariant> = {
  2: "editorial-left", // intro · neural-net a la derecha
  4: "hero-centered", // pregunta de investigación · glifo ? de fondo
  5: "editorial-right", // objetivo general · diana a la izquierda (rompe el doble-hero 4→5)
  9: "editorial-left", // metodología · timeline-rail a la derecha
  11: "editorial-right", // resultados O1 · data-flow a la izquierda
  13: "split-diagonal", // resultados O3 · shield-grid en panel diagonal
  15: "numbered-blocks", // conclusiones · 3 bloques numerados
  16: "numbered-blocks", // recomendaciones · 3 bloques numerados
  21: "offset-grid", // respaldo B4 · 5 ítems escalonados
};

/** Variante de una slide; "auto" (layout estructurado) si no está mapeada. */
export function layoutForSlide(id: number): SlideLayoutVariant {
  return slideLayouts[id] ?? "auto";
}

/**
 * Override de clase de título por slide (presentación pura, no contenido).
 * - Sin entrada → el layout usa su propio default.
 * - "editorial-*" default: text-slide-editorial (83px).
 * - "hero-centered" default: text-display (88px).
 * Slides 2, 4, 5, 9 tienen contenido denso → usan text-slide-content (72px).
 */
export const slideTitleClass: Partial<Record<number, string>> = {
  2: "text-slide-content",
  4: "text-slide-content",
  5: "text-slide-content",
  8: "text-slide-content",
  9: "text-slide-content",
};
