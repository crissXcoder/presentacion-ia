"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { MotifProps } from "@/components/motifs/MotifProps";

/** Hexágono (pointy-top) centrado en 200,200 con radio `r`. */
function hexPoints(r: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const a = (Math.PI / 180) * (-90 + i * 60);
      return `${(200 + r * Math.cos(a)).toFixed(1)},${(200 + r * Math.sin(a)).toFixed(1)}`;
    })
    .join(" ");
}

const GRID = [60, 110, 160, 200, 240, 290, 340];

/**
 * Motivo de escudo + retícula (gobernanza / riesgos / conclusiones):
 * hexágono de "protección" sobre un grid, con anillos defensivos que
 * pulsan hacia afuera. Reduced-motion: escudo estático.
 */
export function ShieldGridMotif({ className }: MotifProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-draw]",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" },
      );
      gsap.to("[data-shield]", {
        scale: 1.04,
        transformOrigin: "center",
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.fromTo(
        "[data-pulse]",
        { scale: 0.92, opacity: 0.5 },
        {
          scale: 1.5,
          opacity: 0,
          transformOrigin: "center",
          duration: 3,
          ease: "sine.out",
          repeat: -1,
          stagger: 1.5,
        },
      );
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
      <g className="stroke-section" strokeWidth="1" opacity="0.14">
        {GRID.map((v) => (
          <line key={`h${v}`} x1="40" y1={v} x2="360" y2={v} />
        ))}
        {GRID.map((v) => (
          <line key={`v${v}`} x1={v} y1="40" x2={v} y2="360" />
        ))}
      </g>

      {[0, 1].map((i) => (
        <polygon
          key={i}
          data-pulse
          points={hexPoints(96)}
          className="fill-none stroke-section"
          strokeWidth="2"
        />
      ))}

      <polygon
        data-shield
        points={hexPoints(96)}
        className="fill-section"
        fillOpacity="0.08"
      />
      <polygon
        data-shield
        data-draw
        points={hexPoints(96)}
        pathLength={1}
        strokeDasharray={1}
        className="fill-none stroke-section"
        strokeWidth="2.5"
        strokeLinejoin="round"
        opacity="0.9"
      />

      <g
        transform="translate(200 200)"
        className="stroke-section"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="-18,2 -6,16 20,-16" />
      </g>
    </svg>
  );
}
