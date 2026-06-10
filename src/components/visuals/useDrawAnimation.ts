"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";

/**
 * Efecto de "dibujo" para los diagramas SVG (animaciones-gsap.md §4):
 * los trazos marcados con data-draw (con pathLength={1} y
 * strokeDasharray 1) animan stroke-dashoffset 1 → 0; las etiquetas
 * marcadas con data-draw-label aparecen después con stagger.
 * Variante reducida: el SVG completo queda visible sin animación
 * (el estado SSR ya es el final: progressive enhancement).
 */
export function useDrawAnimation<T extends HTMLElement | SVGSVGElement>() {
  const scopeRef = useRef<T>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-draw]",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          stagger: 0.15,
          delay: 0.35,
        },
      );
      gsap.from("[data-draw-label]", {
        opacity: 0,
        y: 8,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.9,
      });
    },
    { scope: scopeRef },
  );

  return scopeRef;
}
