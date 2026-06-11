"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { MotifProps } from "@/components/motifs/MotifProps";

const RINGS = [
  { r: 60, w: 2 },
  { r: 110, w: 1.6 },
  { r: 160, w: 1.2 },
];

/**
 * Motivo de diana / objetivo (slide 5): anillos concéntricos que se
 * dibujan al entrar, un anillo punteado que rota lento y un centro con
 * glow. Refuerza "objetivo / foco". Reduced-motion: diana estática.
 */
export function TargetMotif({ className }: MotifProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-ring]",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          stagger: 0.14,
        },
      );
      gsap.to("[data-spin]", {
        rotation: 360,
        transformOrigin: "center",
        duration: 26,
        ease: "none",
        repeat: -1,
      });
      gsap.to("[data-glow]", {
        scale: 1.3,
        opacity: 0.18,
        transformOrigin: "center",
        duration: 2.4,
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
      <circle
        data-glow
        cx="200"
        cy="200"
        r="40"
        className="fill-section blur-xl"
        opacity="0.35"
      />
      <g className="stroke-section" fill="none">
        {RINGS.map((ring, i) => (
          <circle
            key={i}
            data-ring
            cx="200"
            cy="200"
            r={ring.r}
            pathLength={1}
            strokeDasharray={1}
            strokeWidth={ring.w}
            opacity="0.75"
          />
        ))}
      </g>
      <circle
        data-spin
        cx="200"
        cy="200"
        r="135"
        fill="none"
        className="stroke-section"
        strokeWidth="3"
        strokeDasharray="3 16"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="200" cy="200" r="8" className="fill-section" />
    </svg>
  );
}
