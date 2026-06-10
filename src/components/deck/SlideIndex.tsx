"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { SlideData } from "@/content/slides.types";
import { cn } from "@/lib/cn";

function IndexEntry({
  slide,
  target,
  code,
  isCurrent,
  onNavigate,
}: {
  slide: SlideData;
  target: number;
  code: string;
  isCurrent: boolean;
  onNavigate: (to: number) => void;
}) {
  return (
    <li>
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
          {code}
        </span>
        <span className="text-base leading-snug">{slide.title}</span>
      </button>
    </li>
  );
}

/**
 * Índice del deck (tecla I o botón): lista el flujo principal y, aparte,
 * las slides de respaldo (única vía junto al deep-link para llegar a
 * ellas: no entran en el flujo de flechas). Esc o clic fuera cierran.
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
  const mainCount = slides.filter((slide) => !slide.backup).length;
  const backups = slides.filter((slide) => slide.backup);

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

        <ol className="grid gap-2 md:grid-cols-2" aria-label="Flujo principal">
          {slides.slice(0, mainCount).map((slide, slideIndex) => (
            <IndexEntry
              key={slide.id}
              slide={slide}
              target={slideIndex + 1}
              code={String(slideIndex + 1).padStart(2, "0")}
              isCurrent={slideIndex + 1 === current}
              onNavigate={onNavigate}
            />
          ))}
        </ol>

        {backups.length > 0 && (
          <>
            <h3 className="mb-3 mt-8 text-kicker font-semibold uppercase tracking-[0.2em] text-fg-muted">
              Respaldo · ronda de preguntas
            </h3>
            <ol
              className="grid gap-2 md:grid-cols-2"
              aria-label="Slides de respaldo"
            >
              {backups.map((slide, backupIndex) => (
                <IndexEntry
                  key={slide.id}
                  slide={slide}
                  target={mainCount + backupIndex + 1}
                  code={`B${backupIndex + 1}`}
                  isCurrent={mainCount + backupIndex + 1 === current}
                  onNavigate={onNavigate}
                />
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}
