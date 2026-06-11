import gsap from "gsap";

/** Media query estándar; toda animación del deck tiene variante reducida. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Tipo de elemento revelado; condiciona el gesto de entrada (R4). */
type RevealKind = "title" | "block" | "bullet" | "default";

function kindOf(target: Element): RevealKind {
  const attr = (target as HTMLElement).getAttribute("data-reveal");
  if (attr === "title" || attr === "block" || attr === "bullet") return attr;
  if (target.tagName.toLowerCase() === "li") return "bullet";
  return "default";
}

/**
 * Vars del reveal enriquecido (R4): el gesto depende del tipo de elemento.
 *  · título → sube alto (clip-path aparte lo descubre de abajo hacia arriba)
 *  · bloque numerado → escala desde 0.85 (pop)
 *  · bullet → entra desde la izquierda (x)
 *  · resto (kicker/subtítulo/footer) → subida sutil
 * Easing expresivo único (expo.out) para conservar la cascada por orden DOM.
 */
function revealFromVars(): gsap.TweenVars {
  return {
    opacity: 0,
    y: (_i: number, t: Element) => {
      const k = kindOf(t);
      if (k === "title") return 46;
      if (k === "bullet") return 0;
      return 24;
    },
    x: (_i: number, t: Element) => (kindOf(t) === "bullet" ? -28 : 0),
    scale: (_i: number, t: Element) => (kindOf(t) === "block" ? 0.85 : 1),
    transformOrigin: "center",
    duration: 0.7,
    ease: "expo.out",
    stagger: 0.08,
  };
}

/** Clip-path que descubre el título de abajo hacia arriba (solo data-reveal="title"). */
const TITLE_CLIP_FROM = "inset(100% 0% 0% 0%)";
const TITLE_CLIP_TO = "inset(0% 0% 0% 0%)";

/**
 * Reveal escalonado del contenido de una slide en carga directa/recarga.
 * Variante reducida: fundido único.
 */
export function revealSlideContent(scope: HTMLElement): gsap.core.Tween {
  const targets = scope.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion()) {
    return gsap.from(targets, { opacity: 0, duration: 0.15, ease: "none" });
  }
  const tween = gsap.from(targets, revealFromVars());
  const titles = scope.querySelectorAll('[data-reveal="title"]');
  if (titles.length > 0) {
    gsap.fromTo(
      titles,
      { clipPath: TITLE_CLIP_FROM },
      { clipPath: TITLE_CLIP_TO, duration: 0.9, ease: "expo.out", clearProps: "clipPath" },
    );
  }
  return tween;
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
  timeline.from(targets, { ...revealFromVars(), immediateRender: true }, position);
  const titles = scope.querySelectorAll('[data-reveal="title"]');
  if (titles.length > 0) {
    timeline.fromTo(
      titles,
      { clipPath: TITLE_CLIP_FROM },
      {
        clipPath: TITLE_CLIP_TO,
        duration: 0.9,
        ease: "expo.out",
        immediateRender: true,
        clearProps: "clipPath",
      },
      position,
    );
  }
  return timeline;
}
