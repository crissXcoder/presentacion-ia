"use client";

import { ArrowRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import type { SlideData } from "@/content/slides.types";
import { cn } from "@/lib/cn";

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Modo presentador (tecla P): notas del expositor de la slide actual,
 * título de la siguiente y reloj de exposición (límite del curso:
 * 30 min). Panel discreto abajo-izquierda; el público no lo ve si el
 * proyector duplica pantalla y se cierra con la misma tecla.
 */
export function PresenterPanel({
  current,
  next,
  isOpen,
}: {
  current: SlideData;
  next: SlideData | null;
  isOpen: boolean;
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // El reloj corre desde que se abre el panel por primera vez y persiste
  // mientras el Deck viva (no se reinicia al cambiar de slide).
  useEffect(() => {
    if (!isOpen) return;
    const intervalId = window.setInterval(
      () => setElapsedSeconds((seconds) => seconds + 1),
      1000,
    );
    return () => window.clearInterval(intervalId);
  }, [isOpen]);

  const isOverTime = elapsedSeconds >= 30 * 60;

  return (
    <aside
      role="complementary"
      aria-label="Notas del presentador"
      className={cn(
        "absolute top-4 left-4 md:top-auto md:bottom-4 z-20 w-[min(26rem,calc(100vw-2rem))] rounded-card border border-border bg-bg-elev/90 p-5 shadow-card backdrop-blur-sm",
        "transition-all duration-300 ease-out origin-top-left md:origin-bottom-left",
        isOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-4 md:translate-y-4 scale-95 pointer-events-none"
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-kicker font-semibold uppercase tracking-[0.2em] text-fg-muted">
          Presentador
        </span>
        <span
          className={`flex items-center gap-2 text-source tabular-nums ${
            isOverTime ? "font-semibold text-danger" : "text-fg-muted"
          }`}
        >
          <Clock aria-hidden="true" size={16} strokeWidth={2} />
          {formatElapsed(elapsedSeconds)} / 30:00
        </span>
      </div>

      <p className="text-sm leading-relaxed text-fg">
        {current.notes ?? "Sin notas para esta diapositiva."}
      </p>

      {next && (
        <p className="mt-4 flex items-baseline gap-2 border-t border-border pt-3 text-source text-fg-muted">
          <ArrowRight
            aria-hidden="true"
            size={14}
            strokeWidth={2}
            className="self-center"
          />
          Siguiente: {next.title}
        </p>
      )}
    </aside>
  );
}
