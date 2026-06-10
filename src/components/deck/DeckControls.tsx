"use client";

import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonClasses =
  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-chip " +
  "border border-border bg-bg-elev/70 text-fg backdrop-blur-sm " +
  "transition-[transform,background-color] duration-150 " +
  "hover:scale-[1.03] hover:bg-bg-elev active:scale-[0.96]";

/**
 * Controles de navegación: índice, anterior/siguiente (táctiles ≥44px,
 * ocultos en los extremos sin mover el layout) e indicador "n / total"
 * con cifras tabulares (regla D6).
 */
export function DeckControls({
  current,
  total,
  onPrev,
  onNext,
  onOpenIndex,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenIndex: () => void;
}) {
  return (
    <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
      <button
        type="button"
        onClick={onOpenIndex}
        aria-label="Índice de diapositivas (tecla I)"
        className={buttonClasses}
      >
        <List aria-hidden="true" size={20} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Diapositiva anterior"
        className={cn(buttonClasses, current === 1 && "invisible")}
      >
        <ChevronLeft aria-hidden="true" size={20} strokeWidth={2} />
      </button>
      <span
        aria-live="polite"
        className="min-w-[4.5rem] text-center text-source tabular-nums text-fg-muted"
      >
        {current} / {total}
      </span>
      <button
        type="button"
        onClick={onNext}
        aria-label="Diapositiva siguiente"
        className={cn(buttonClasses, current === total && "invisible")}
      >
        <ChevronRight aria-hidden="true" size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
