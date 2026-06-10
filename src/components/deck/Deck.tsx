"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef, useState } from "react";
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
 */
export function Deck({
  slides,
  initialIndex,
}: {
  slides: SlideData[];
  initialIndex: number;
}) {
  const total = slides.length;
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

  useDeckNavigation({
    current,
    total,
    navigate,
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

  return (
    <div className="relative h-svh w-full overflow-hidden bg-bg">
      <ProgressBar current={displayIndex} total={total} />

      <div
        ref={currentRef}
        key={`slide-${current}`}
        tabIndex={-1}
        className="absolute inset-0 outline-none"
      >
        <Slide data={slides[current - 1]} index={current} total={total} />
      </div>

      {incoming !== null && (
        <div
          ref={incomingRef}
          key={`incoming-${incoming}`}
          className="absolute inset-0"
        >
          <Slide data={slides[incoming - 1]} index={incoming} total={total} />
        </div>
      )}

      <DeckControls
        current={displayIndex}
        total={total}
        onPrev={() => navigate(displayIndex - 1)}
        onNext={() => navigate(displayIndex + 1)}
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
