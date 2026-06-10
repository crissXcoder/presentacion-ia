"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";

/**
 * Fondo sutil de la portada (Fase 5, sustituye a la imagen del pipeline):
 * dos halos con los acentos del sistema + grano de ruido SVG, generados
 * en código — 0 KB de assets, escala a cualquier proyector y el
 * contraste del texto queda garantizado (opacidades ≤ 15%). Los halos
 * derivan muy lento con GSAP (animaciones-gsap.md §6: momento "wow"
 * controlado, siempre detrás del texto); variante reducida: estático.
 * Solo transform/opacity (compositor); el ruido no se anima.
 */
export function PortadaBackground() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to("[data-halo='primary']", {
        xPercent: 4,
        yPercent: -3,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to("[data-halo='accent']", {
        xPercent: -3,
        yPercent: 4,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: scopeRef },
  );

  return (
    <div
      ref={scopeRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        data-halo="primary"
        className="absolute -top-[20%] left-[-12%] h-[70vh] w-[55vw] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary), transparent)",
        }}
      />
      <div
        data-halo="accent"
        className="absolute -bottom-[25%] right-[-10%] h-[60vh] w-[45vw] rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), transparent)",
        }}
      />
      {/* Grano sutil: feTurbulence genera el ruido por sí mismo (decorativo). */}
      <svg className="absolute inset-0 h-full w-full opacity-5">
        <filter id="portada-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#portada-grain)" />
      </svg>
    </div>
  );
}
