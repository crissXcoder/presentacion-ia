"use client";

import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { cn } from "@/lib/cn";

// Clases base para los botones, enriquecidas con micro-interacciones,
// bordes degradados y glow al hover en pantallas con puntero (desktop)
const buttonClasses =
  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-chip " +
  "border border-border/50 border-t-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] border-l-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] " +
  "bg-bg-elev/75 text-fg backdrop-blur-md " +
  "transition-all duration-200 " +
  "@media(hover:hover):hover:scale-[1.05] @media(hover:hover):hover:bg-bg-elev @media(hover:hover):hover:shadow-[0_4px_16px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] " +
  "@media(hover:hover):hover:border-t-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] @media(hover:hover):hover:border-l-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] " +
  "active:scale-[0.95]";

/**
 * Controles de navegación de la presentación.
 * Mejorado con botones de diseño glassmorphism con brillo al hover,
 * y contador de páginas ("n / 16") destacado en una píldora premium flotante.
 */
export function DeckControls({
  counterLabel,
  isPrevHidden,
  isNextHidden,
  onPrev,
  onNext,
  onOpenIndex,
}: {
  counterLabel: string;
  isPrevHidden: boolean;
  isNextHidden: boolean;
  onPrev: () => void;
  onNext: () => void;
  onOpenIndex: () => void;
}) {
  return (
    <div className="absolute bottom-4 right-4 z-35 flex items-center gap-3 select-none">
      {/* Botón de Índice */}
      <button
        type="button"
        onClick={onOpenIndex}
        aria-label="Índice de diapositivas (tecla I)"
        className={buttonClasses}
      >
        <List aria-hidden="true" size={20} strokeWidth={2.5} />
      </button>

      {/* Botón Anterior */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Diapositiva anterior"
        className={cn(buttonClasses, isPrevHidden && "invisible pointer-events-none")}
      >
        <ChevronLeft aria-hidden="true" size={20} strokeWidth={2.5} />
      </button>

      {/* Contador de Slide tipo Píldora */}
      <span
        aria-live="polite"
        className="min-w-20 text-center text-source font-semibold tabular-nums text-fg-muted bg-bg-elev/85 border border-border/60 rounded-full px-3 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-md"
      >
        {counterLabel}
      </span>

      {/* Botón Siguiente */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Diapositiva siguiente"
        className={cn(buttonClasses, isNextHidden && "invisible pointer-events-none")}
      >
        <ChevronRight aria-hidden="true" size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
}
