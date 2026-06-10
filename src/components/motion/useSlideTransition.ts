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

/**
 * Transición horizontal estilo Reveal (la firma del deck, ADR-005):
 * saliente x→-8% con fade (power2.in, 350ms); entrante desde ±8%
 * (power3.out, 500ms) con leve solape, seguida del reveal interno.
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

      timeline
        .to(outgoing, {
          xPercent: direction * -8,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        })
        .fromTo(
          entering,
          { xPercent: direction * 8, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.2",
        );
      appendReveal(timeline, entering, "-=0.3");
    },
    { dependencies: [incoming] },
  );
}
