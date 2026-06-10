import gsap from "gsap";

/** Media query estándar; toda animación del deck tiene variante reducida. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Reveal escalonado del contenido de una slide: los elementos marcados
 * con data-reveal aparecen en orden DOM (kicker → título → cuerpo →
 * footer) con fade + subida sutil. Variante reducida: fundido único.
 */
export function revealSlideContent(scope: HTMLElement): gsap.core.Tween {
  const targets = scope.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion()) {
    return gsap.from(targets, { opacity: 0, duration: 0.15, ease: "none" });
  }
  return gsap.from(targets, {
    y: 16,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
    stagger: 0.05,
  });
}

/**
 * Variante para integrar el reveal dentro del timeline de transición:
 * así el swap de slides espera a que el reveal termine (sin "pops").
 * immediateRender fija el estado inicial al construir el timeline,
 * evitando que el contenido parpadee visible antes de su turno.
 */
export function appendReveal(
  timeline: gsap.core.Timeline,
  scope: HTMLElement,
  position: gsap.Position,
): gsap.core.Timeline {
  const targets = scope.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion()) {
    return timeline.from(
      targets,
      { opacity: 0, duration: 0.15, ease: "none", immediateRender: true },
      position,
    );
  }
  return timeline.from(
    targets,
    {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.05,
      immediateRender: true,
    },
    position,
  );
}
