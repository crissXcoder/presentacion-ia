"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { MotifProps } from "@/components/motifs/MotifProps";

const WAVES = [70, 100, 130, 160];

/**
 * Motivo de ondas concéntricas (conclusiones / cierre): anillos que
 * emanan de un punto en loop lento, como un eco que resuena.
 * Reduced-motion: anillos concéntricos estáticos.
 */
export function ConcentricMotif({ className }: MotifProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-wave]",
        { scale: 0.35, opacity: 0.55 },
        {
          scale: 1.5,
          opacity: 0,
          transformOrigin: "center",
          duration: 4.5,
          ease: "sine.out",
          repeat: -1,
          stagger: { each: 1.1 },
        },
      );
      gsap.to("[data-core]", {
        scale: 1.4,
        opacity: 0.5,
        transformOrigin: "center",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      aria-hidden="true"
      className={cn("h-full w-full select-none", className)}
    >
      {WAVES.map((r, i) => (
        <circle
          key={i}
          data-wave
          cx="200"
          cy="200"
          r={r}
          className="fill-none stroke-section"
          strokeWidth="2"
          opacity="0.45"
        />
      ))}
      <circle data-core cx="200" cy="200" r="20" className="fill-section blur-md" opacity="0.5" />
      <circle cx="200" cy="200" r="7" className="fill-section" />
    </svg>
  );
}
