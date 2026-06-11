import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";
import { appendReveal, prefersReducedMotion } from "@/components/motion/reveal";

gsap.registerPlugin(useGSAP);

interface SlideTransitionArgs {
  /** Wrapper de la slide visible (saliente durante la transición). */
  currentRef: RefObject<HTMLDivElement | null>;
  /** Wrapper de la slide entrante (montado solo durante la transición). */
  incomingRef: RefObject<HTMLDivElement | null>;
  /** Índice destino, o null cuando no hay transición en curso. */
  incoming: number | null;
  /** 1 = avanzar (entra desde la derecha), -1 = retroceder. */
  direction: 1 | -1;
  /** Expone el timeline activo (permite completarlo al instante). */
  timelineRef: RefObject<gsap.core.Timeline | null>;
  onComplete: () => void;
}

/** Capas con profundidad de parallax (R4): el fondo deriva más lento que
 *  el contenido, el motivo a velocidad intermedia. Factores de contra-deriva
 *  (signo opuesto al wrapper): bg el mayor → parece el más lejano. */
const BG_PARALLAX = 10;
const MOTIF_PARALLAX = 5;

/**
 * Transición horizontal estilo Reveal (la firma del deck, ADR-005) con
 * parallax de capas (R4): el wrapper se desplaza a velocidad plena
 * (contenido al frente) mientras `data-layer="bg"` y `data-layer="motif"`
 * contra-derivan para aparentar mayor profundidad. Easing expresivo
 * (entrante expo.out; saliente power4.in, ~65% de la duración de entrada).
 * Variante reducida: cross-fade de 150ms sin desplazamiento.
 */
export function useSlideTransition({
  currentRef,
  incomingRef,
  incoming,
  direction,
  timelineRef,
  onComplete,
}: SlideTransitionArgs): void {
  useGSAP(
    () => {
      if (incoming === null) return;
      const outgoing = currentRef.current;
      const entering = incomingRef.current;
      if (!outgoing || !entering) return;

      const outBg = outgoing.querySelectorAll('[data-layer="bg"]');
      const outMotif = outgoing.querySelectorAll('[data-layer="motif"]');
      const inBg = entering.querySelectorAll('[data-layer="bg"]');
      const inMotif = entering.querySelectorAll('[data-layer="motif"]');

      const timeline = gsap.timeline({
        onComplete: () => {
          timelineRef.current = null;
          onComplete();
        },
      });
      timelineRef.current = timeline;

      if (prefersReducedMotion()) {
        timeline
          .to(outgoing, { opacity: 0, duration: 0.15, ease: "none" })
          .fromTo(
            entering,
            { opacity: 0 },
            { opacity: 1, duration: 0.15, ease: "none" },
            "<",
          );
        appendReveal(timeline, entering, "<");
        return;
      }

      // Salida del wrapper (velocidad plena) + capas contra-derivando.
      timeline.to(outgoing, {
        xPercent: direction * -22,
        scale: direction === 1 ? 0.94 : 1.06,
        opacity: 0,
        duration: 0.45,
        ease: "power4.in",
      });
      if (outBg.length)
        timeline.to(
          outBg,
          { xPercent: direction * BG_PARALLAX, duration: 0.45, ease: "power4.in" },
          "<",
        );
      if (outMotif.length)
        timeline.to(
          outMotif,
          { xPercent: direction * MOTIF_PARALLAX, duration: 0.45, ease: "power4.in" },
          "<",
        );

      // Entrada del wrapper con solape + capas que recuperan su posición
      // desde una contra-deriva menor (parecen quedarse atrás → profundidad).
      timeline.fromTo(
        entering,
        {
          xPercent: direction * 22,
          scale: direction === 1 ? 1.06 : 0.94,
          opacity: 0,
        },
        { xPercent: 0, scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" },
        "-=0.25",
      );
      if (inBg.length)
        timeline.fromTo(
          inBg,
          { xPercent: direction * -BG_PARALLAX },
          { xPercent: 0, duration: 0.7, ease: "expo.out", immediateRender: true },
          "<",
        );
      if (inMotif.length)
        timeline.fromTo(
          inMotif,
          { xPercent: direction * -MOTIF_PARALLAX },
          { xPercent: 0, duration: 0.7, ease: "expo.out", immediateRender: true },
          "<",
        );

      appendReveal(timeline, entering, "-=0.5");
    },
    { dependencies: [incoming] },
  );
}
