"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { SlideData } from "@/content/slides.types";
import { cn } from "@/lib/cn";

/**
 * Índice del deck (tecla I o botón): lista las slides para saltar a
 * cualquiera por deep-link (reparto de turnos). Esc o clic fuera cierran.
 */
export function SlideIndex({
  slides,
  current,
  isOpen,
  onNavigate,
  onClose,
}: {
  slides: SlideData[];
  current: number;
  isOpen: boolean;
  onNavigate: (to: number) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-bg/80 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Índice de diapositivas"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85svh] w-[min(64rem,92vw)] overflow-y-auto rounded-card border border-border bg-bg-elev p-8 shadow-card"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-subtitle text-fg">Índice</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar índice"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-chip border border-border text-fg transition-colors duration-150 hover:bg-bg"
          >
            <X aria-hidden="true" size={20} strokeWidth={2} />
          </button>
        </div>
        <ol className="grid gap-2 md:grid-cols-2">
          {slides.map((slide, slideIndex) => {
            const target = slideIndex + 1;
            const isCurrent = target === current;
            return (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(target)}
                  aria-current={isCurrent ? "true" : undefined}
                  data-section={slide.section}
                  className={cn(
                    "flex w-full cursor-pointer items-baseline gap-3 rounded-chip border px-4 py-3 text-left transition-colors duration-150",
                    isCurrent
                      ? "border-primary bg-bg text-fg"
                      : "border-transparent text-fg-muted hover:border-border hover:bg-bg hover:text-fg",
                  )}
                >
                  <span className="text-source tabular-nums text-section-text">
                    {String(target).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-snug">{slide.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
