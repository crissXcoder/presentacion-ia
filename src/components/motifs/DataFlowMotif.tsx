"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { MotifProps } from "@/components/motifs/MotifProps";

/** Canales oblicuos (viewBox 400×420); las partículas fluyen a lo largo. */
const CHANNELS = [
  { x1: 70, y1: -10, x2: 30, y2: 430 },
  { x1: 150, y1: -10, x2: 130, y2: 430 },
  { x1: 230, y1: -10, x2: 250, y2: 430 },
  { x1: 310, y1: -10, x2: 300, y2: 430 },
  { x1: 380, y1: -10, x2: 410, y2: 430 },
];

const DOTS_PER_CHANNEL = 3;

/**
 * Motivo de flujo de datos (resultados): partículas que recorren canales
 * en loop continuo a distintas velocidades. Reduced-motion: canales
 * estáticos con las partículas en reposo.
 */
export function DataFlowMotif({ className }: MotifProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const dots = ref.current?.querySelectorAll<SVGCircleElement>("[data-dot]");
      dots?.forEach((dot) => {
        const dx = Number(dot.dataset.dx);
        const dy = Number(dot.dataset.dy);
        const phase = Number(dot.dataset.phase);
        const tween = gsap.fromTo(
          dot,
          { x: 0, y: 0 },
          {
            x: dx,
            y: dy,
            duration: gsap.utils.random(3.2, 5.5),
            ease: "none",
            repeat: -1,
          },
        );
        tween.progress(phase);
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 420"
      aria-hidden="true"
      className={cn("h-full w-full select-none", className)}
    >
      <g className="stroke-section" strokeWidth="1.2" opacity="0.4">
        {CHANNELS.map((c, i) => (
          <line key={i} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} />
        ))}
      </g>

      <g className="fill-section">
        {CHANNELS.flatMap((c, ci) => {
          const dx = c.x2 - c.x1;
          const dy = c.y2 - c.y1;
          return Array.from({ length: DOTS_PER_CHANNEL }).map((_, di) => {
            const phase = di / DOTS_PER_CHANNEL;
            return (
              <circle
                key={`${ci}-${di}`}
                data-dot
                data-dx={dx}
                data-dy={dy}
                data-phase={phase}
                cx={c.x1}
                cy={c.y1}
                r={di % 2 === 0 ? 3.5 : 2.5}
                opacity="0.9"
              />
            );
          });
        })}
      </g>
    </svg>
  );
}
