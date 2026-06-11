/**
 * Props comunes a todos los motivos visuales (serie R2).
 * El color lo heredan vía `var(--section-accent)` por estar dentro del
 * elemento `[data-section]` de la slide; por eso no se pasa la sección.
 */
export interface MotifProps {
  /** Clases del contenedor SVG (tamaño/posición las define MotifFigure). */
  className?: string;
}
