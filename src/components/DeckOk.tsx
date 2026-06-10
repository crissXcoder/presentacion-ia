"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Componente de prueba de la Fase 1 (scaffolding).
 * Verifica que Tailwind v4, las fuentes (next/font) y GSAP funcionan
 * del lado cliente sin romper SSR. Se elimina en fases posteriores.
 */
export function DeckOk() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      gsap.from("[data-reveal]", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg text-fg"
    >
      <h1
        data-reveal
        className="font-display text-7xl font-bold tracking-tight text-primary"
      >
        Deck OK
      </h1>
      <p data-reveal className="font-body text-xl text-fg-muted">
        Next.js 15 · Tailwind v4 · GSAP 3
      </p>
    </div>
  );
}
