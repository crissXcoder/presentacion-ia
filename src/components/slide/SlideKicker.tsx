import type { ReactNode } from "react";

/**
 * Etiqueta de sección sobre el título (ej. "METODOLOGÍA").
 * El color llega por cascada desde data-section en <Slide>:
 * la línea usa el acento pleno; el texto, la variante con AA garantizado.
 */
export function SlideKicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-kicker font-semibold uppercase tracking-[0.2em] text-section-text">
      <span aria-hidden="true" className="h-px w-8 bg-section" />
      {children}
    </p>
  );
}
