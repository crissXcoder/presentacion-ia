/**
 * Mapa de motivos visuales por slide (serie de REDISEÑO R1→R4).
 *
 * El motivo es PRESENTACIÓN, no contenido: por eso se indexa por `id` de
 * slide aquí y no se agrega a `content/slides.ts` (que queda intocable).
 *
 * Principio: toda slide de SOLO TEXTO recibe un motivo visual grande que
 * ocupa el espacio con intención. Las slides con visual propio (KPI,
 * diagrama, cards, tabla, imagen) y la portada (tratamiento especial)
 * usan "none".
 *
 * R1 solo define los datos; los motivos concretos (SVG animados grandes)
 * se implementan en R2 y los layouts asimétricos en R3.
 *
 * Fuente de verdad del tipo: src/content/slides.types.ts.
 */
import type { SlideMotif } from "@/content/slides.types";

export const slideMotifs: Record<number, SlideMotif> = {
  1: "none", // portada — tratamiento especial (halos + partículas)
  2: "neural-net", // introducción · solo texto: de herramienta a infraestructura
  3: "none", // visual propio: complexity-curve
  4: "question-glyph", // pregunta de investigación · solo texto
  5: "target", // objetivo general · solo texto
  6: "none", // visual propio: cards
  7: "none", // visual propio: imagen caja-negra
  8: "none", // visual propio: cards
  9: "timeline-rail", // metodología · solo texto (fases)
  10: "none", // visual propio: triangulation
  11: "data-flow", // resultados O1 · solo texto (técnicas/habilitadores)
  12: "none", // visual propio: KPI
  13: "shield-grid", // resultados O3 · solo texto (gobernanza/riesgos)
  14: "none", // visual propio: mcp
  15: "concentric", // conclusiones · solo texto
  16: "layers", // recomendaciones · solo texto
  17: "none", // visual propio: tabla de referencias
  18: "none", // respaldo · tabla
  19: "none", // respaldo · tabla
  20: "none", // respaldo · visual risk-pyramid
  21: "timeline-rail", // respaldo · solo texto (guía de entrevista, 5 secciones)
};

/** Devuelve el motivo de una slide; "none" si no está mapeada. */
export function motifForSlide(id: number): SlideMotif {
  return slideMotifs[id] ?? "none";
}
