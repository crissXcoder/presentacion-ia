import type { ReactNode } from "react";

/**
 * Etiqueta de sección sobre el título (ej. "METODOLOGÍA").
 * Mejorado con una línea de acento más larga y degradada, y
 * una píldora estética para envolver el texto del kicker.
 */
export function SlideKicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-4 text-kicker font-semibold uppercase tracking-[0.2em] text-section-text select-none">
      {/* Línea decorativa larga con degradado; respira suavemente (R4). */}
      <span
        aria-hidden="true"
        className="ambient-breathe h-[1.5px] w-16 bg-gradient-to-r from-section to-transparent shrink-0"
      />
      {/* Texto de kicker en píldora */}
      <span className="bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)] border border-[color-mix(in_srgb,var(--section-accent)_20%,transparent)] rounded-full px-4 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-colors duration-300">
        {children}
      </span>
    </p>
  );
}
