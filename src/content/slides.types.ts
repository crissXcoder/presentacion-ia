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
  /** Posición 1..16 en el deck. */
  id: number;
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
