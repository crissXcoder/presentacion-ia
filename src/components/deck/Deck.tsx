"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useMemo, useRef, useState } from "react";
import { DeckControls } from "@/components/deck/DeckControls";
import { ProgressBar } from "@/components/deck/ProgressBar";
import { SlideIndex } from "@/components/deck/SlideIndex";
import {
  useDeckNavigation,
  type NavigateOptions,
} from "@/components/deck/useDeckNavigation";
import { revealSlideContent } from "@/components/motion/reveal";
import { useSlideTransition } from "@/components/motion/useSlideTransition";
import { Slide } from "@/components/slide/Slide";
import type { SlideData } from "@/content/slides.types";

gsap.registerPlugin(useGSAP);

/**
 * Orquestador del deck (ADR-001): la ruta /slide/[n] da el índice
 * inicial; tras hidratar, la navegación es estado cliente sincronizado
 * con la URL vía history.pushState (Next lo integra sin remontar la
 * página), lo que permite que la slide saliente y la entrante coexistan
 * durante la transición GSAP sin parpadeos. popstate cubre atrás/adelante.
 *
 * Zonas: flujo principal (1..16) y respaldo (17..20, `backup: true`).
 * Las flechas/teclas no cruzan de zona; a las de respaldo se llega por
 * índice o deep-link (reparto de turnos y ronda de preguntas).
 */
export function Deck({
  slides,
  initialIndex,
}: {
  slides: SlideData[];
  initialIndex: number;
}) {
  const total = slides.length;
  const mainTotal = useMemo(
    () => slides.filter((slide) => !slide.backup).length,
    [slides],
  );
  const [current, setCurrent] = useState(initialIndex);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [isIndexOpen, setIndexOpen] = useState(false);
  const directionRef = useRef<1 | -1>(1);
  const currentRef = useRef<HTMLDivElement>(null);
  const incomingRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<gsap.core.Timeline | null>(null);

  const navigate = useCallback(
    (to: number, options?: NavigateOptions) => {
      if (incoming !== null) {
        // Pulsación durante la transición: completarla al instante para
        // que el deck responda en vez de tragarse la orden.
        transitionRef.current?.progress(1);
        return;
      }
      const target = Math.min(Math.max(to, 1), total);
      if (target === current) return;
      directionRef.current = target > current ? 1 : -1;
      if (!options?.skipHistory) {
        window.history.pushState(null, "", `/slide/${target}`);
      }
      setIncoming(target);
    },
    [current, incoming, total],
  );

  // Avance secuencial confinado a la zona actual: el flujo principal
  // termina en la 16 (no se cuela una slide de respaldo al avanzar) y
  // desde el respaldo no se vuelve al flujo con flechas (solo índice).
  const step = useCallback(
    (direction: 1 | -1) => {
      const reference = incoming ?? current;
      const isBackupZone = reference > mainTotal;
      const zoneStart = isBackupZone ? mainTotal + 1 : 1;
      const zoneEnd = isBackupZone ? total : mainTotal;
      const target = Math.min(Math.max(reference + direction, zoneStart), zoneEnd);
      navigate(target);
    },
    [current, incoming, mainTotal, navigate, total],
  );

  useDeckNavigation({
    navigate,
    step,
    goHome: () => navigate(1),
    goEnd: () => navigate(mainTotal),
    isIndexOpen,
    toggleIndex: () => setIndexOpen((open) => !open),
    closeIndex: () => setIndexOpen(false),
  });

  const handleTransitionComplete = useCallback(() => {
    setCurrent((previous) => incoming ?? previous);
    setIncoming(null);
    // Foco al contenido recién montado (lectores de pantalla anuncian
    // el aria-label de la slide). Doble rAF: espera el commit del swap.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        currentRef.current?.focus({ preventScroll: true });
      });
    });
  }, [incoming]);

  useSlideTransition({
    currentRef,
    incomingRef,
    incoming,
    direction: directionRef.current,
    timelineRef: transitionRef,
    onComplete: handleTransitionComplete,
  });

  // Reveal de entrada en la carga directa/recarga de la página.
  useGSAP(() => {
    if (currentRef.current) revealSlideContent(currentRef.current);
  }, []);

  const displayIndex = incoming ?? current;
  const isBackup = displayIndex > mainTotal;
  // Numeración (regla D6): solo cuenta el flujo principal; las slides
  // de respaldo se identifican como B1..B4 sin sumar al total.
  const counterLabel = isBackup
    ? `B${displayIndex - mainTotal} · respaldo`
    : `${displayIndex} / ${mainTotal}`;

  return (
    <div className="relative h-svh w-full overflow-hidden bg-bg">
      <ProgressBar
        current={Math.min(displayIndex, mainTotal)}
        total={mainTotal}
      />

      <div
        ref={currentRef}
        key={`slide-${current}`}
        tabIndex={-1}
        className="absolute inset-0 outline-none"
      >
        <Slide data={slides[current - 1]} index={current} total={mainTotal} />
      </div>

      {incoming !== null && (
        <div
          ref={incomingRef}
          key={`incoming-${incoming}`}
          className="absolute inset-0"
        >
          <Slide
            data={slides[incoming - 1]}
            index={incoming}
            total={mainTotal}
          />
        </div>
      )}

      <DeckControls
        counterLabel={counterLabel}
        isPrevHidden={displayIndex === 1 || displayIndex === mainTotal + 1}
        isNextHidden={displayIndex === mainTotal || displayIndex === total}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        onOpenIndex={() => setIndexOpen(true)}
      />

      <SlideIndex
        slides={slides}
        current={displayIndex}
        isOpen={isIndexOpen}
        onNavigate={(to) => {
          setIndexOpen(false);
          navigate(to);
        }}
        onClose={() => setIndexOpen(false)}
      />
    </div>
  );
}
