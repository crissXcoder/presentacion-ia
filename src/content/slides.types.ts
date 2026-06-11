/**
 * Modelo de datos de las diapositivas.
 * Principio rector: el contenido es dato; la presentación es plantilla.
 * Fuente: 02-arquitectura-y-stack/arquitectura.md.
 */

/** Secciones del informe oral; determinan el kicker y el acento de color. */
export type SlideSection =
  | "portada"
  | "introduccion"
  | "objetivos"
  | "marco-teorico"
  | "metodologia"
  | "resultados"
  | "discusion"
  | "conclusiones"
  | "referencias";

/** Visual del cuerpo de la slide (diagramas propios, tarjetas, tabla o imagen). */
export type SlideVisual =
  | "complexity-curve"
  | "risk-pyramid"
  | "triangulation"
  | "mcp"
  | "cards"
  | "table"
  | "image";

/**
 * Motivo visual que enriquece una slide (no es contenido; es presentación).
 * Se asocia por `id` de slide en `src/design/slideMotifs.ts`, sin tocar el
 * contenido de `slides.ts`. Las slides con visual propio (KPI, diagrama,
 * cards, tabla, imagen) usan "none".
 */
export type SlideMotif =
  | "neural-net" // red neuronal / nodos conectados (intro, marco teórico)
  | "data-flow" // flujo de datos / partículas dirigidas
  | "question-glyph" // glifo tipográfico gigante "?" (pregunta de investigación)
  | "target" // diana / objetivo concéntrico (objetivo general)
  | "layers" // capas apiladas (complejidad / deep learning)
  | "shield-grid" // escudo + grid (gobernanza / riesgos)
  | "timeline-rail" // riel de progresión (metodología / fases)
  | "big-number" // número de slide gigante de fondo (genérico)
  | "concentric" // círculos concéntricos animados (conclusiones)
  | "none"; // slides que ya tienen visual propio (KPI, diagrama, cards, tabla)

/**
 * Variante de composición de la slide (R3): cómo se DISTRIBUYE en pantalla
 * el contenido (no es contenido). Se asigna por `id` en
 * `src/design/slideLayouts.ts`. "auto" = layout estructurado dirigido por
 * los datos (slides con visual propio: KPI, diagrama, cards, tabla, imagen).
 */
export type SlideLayoutVariant =
  | "editorial-left" // texto izquierda, motivo a sangre derecha (estilo revista)
  | "editorial-right" // espejo: motivo izquierda, texto derecha
  | "hero-centered" // título enorme centrado, motivo de fondo amplio (impacto)
  | "numbered-blocks" // bullets enumerables → bloques con número grande
  | "offset-grid" // bullets escalonados/zigzag sobre el motivo de fondo
  | "split-diagonal" // división diagonal entre texto y motivo, con seam de acento
  | "auto"; // layout estructurado por datos (sin variante)

export interface KpiData {
  /** Cifra mostrada en grande, ej. "66%". */
  value: string;
  label: string;
}

export interface CardData {
  title: string;
  body: string;
  source?: string;
}

export interface TableData {
  /** Título visible de la tabla (regla D4: tablas con título). */
  caption: string;
  source?: string;
  head: string[];
  rows: string[][];
}

export interface ImageData {
  src: string;
  /** Obligatorio por accesibilidad; "" solo si es decorativa. */
  alt: string;
}

export interface SlideData {
  /** Posición en el arreglo: 1..16 flujo principal, 17..20 respaldo. */
  id: number;
  /**
   * Slide de respaldo (B1..B4): accesible por índice/deep-link para la
   * ronda de preguntas, pero fuera del flujo principal (las flechas no
   * entran ni salen de la zona de respaldo; la numeración n/16 no la cuenta).
   */
  backup?: boolean;
  section: SlideSection;
  /** Etiqueta superior, ej. "METODOLOGÍA". */
  kicker?: string;
  /** Mensaje central, corto (regla D3: una idea por slide). */
  title: string;
  subtitle?: string;
  /** Frases de una línea (regla D1: pocas y breves). */
  bullets?: string[];
  kpi?: KpiData;
  visual?: SlideVisual;
  cards?: CardData[];
  table?: TableData;
  image?: ImageData;
  /** Cita APA corta para apoyos visuales (regla D4). */
  source?: string;
  /** Guion del expositor; no se muestra en pantalla (modo presentador). */
  notes?: string;
}
