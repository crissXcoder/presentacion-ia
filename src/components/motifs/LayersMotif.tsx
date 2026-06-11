"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { MotifProps } from "@/components/motifs/MotifProps";

const LAYER_COUNT = 5;
const HALF_W = 130;
const DEPTH = 44;
const STEP = 52;
const TOP_Y = 70;

/** Rombo isométrico (cara superior) centrado en x=200, top en `y`. */
function isoPoints(y: number): string {
  return [
    `200,${y}`,
    `${200 + HALF_W},${y + DEPTH}`,
    `200,${y + 2 * DEPTH}`,
    `${200 - HALF_W},${y + DEPTH}`,
  ].join(" ");
}

/**
 * Motivo de capas apiladas (complejidad / deep learning / metodología):
 * planos isométricos en profundidad que entran con stagger y flotan con
 * desfase. Reduced-motion: pila estática.
 */
export function LayersMotif({ className }: MotifProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-layer]", {
        opacity: 0,
        scale: 0.9,
        transformOrigin: "center",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });
      gsap.to("[data-layer]", {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.18, from: "start" },
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
      {Array.from({ length: LAYER_COUNT }).map((_, i) => {
        const y = TOP_Y + i * STEP;
        return (
          <polygon
            key={i}
            data-layer
            points={isoPoints(y)}
            className="fill-section stroke-section"
            strokeWidth="1.5"
            fillOpacity={0.1 + i * 0.05}
            strokeOpacity="0.6"
          />
        );
      })}
    </svg>
  );
}
