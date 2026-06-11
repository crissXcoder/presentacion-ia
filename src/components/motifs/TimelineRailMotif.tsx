"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { MotifProps } from "@/components/motifs/MotifProps";

const RAIL_X = 100;
const NODES_Y = [60, 140, 220, 300, 380];
const TOP = 40;
const BOTTOM = 400;

/**
 * Motivo de riel de fases (metodología): un riel vertical con hitos y una
 * línea de progreso que lo recorre en loop; cada hito pulsa. Refuerza un
 * proceso secuencial. Reduced-motion: riel estático con hitos visibles.
 */
export function TimelineRailMotif({ className }: MotifProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-progress]",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 3.2,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 0.4,
        },
      );
      gsap.to("[data-milestone]", {
        scale: 1.5,
        opacity: 0.5,
        transformOrigin: "center",
        duration: 0.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.6,
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 440"
      aria-hidden="true"
      className={cn("h-full w-full select-none", className)}
    >
      <line
        x1={RAIL_X}
        y1={TOP}
        x2={RAIL_X}
        y2={BOTTOM}
        className="stroke-section"
        strokeWidth="2"
        opacity="0.25"
      />
      <line
        data-progress
        x1={RAIL_X}
        y1={TOP}
        x2={RAIL_X}
        y2={BOTTOM}
        pathLength={1}
        strokeDasharray={1}
        className="stroke-section"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.9"
      />

      {NODES_Y.map((y, i) => (
        <g key={i}>
          <circle
            data-milestone
            cx={RAIL_X}
            cy={y}
            r="9"
            className="fill-none stroke-section"
            strokeWidth="2"
            opacity="0.7"
          />
          <circle cx={RAIL_X} cy={y} r="4.5" className="fill-section" />
          <line
            x1={RAIL_X + 16}
            y1={y}
            x2={RAIL_X + 60}
            y2={y}
            className="stroke-section"
            strokeWidth="1.4"
            opacity="0.3"
          />
        </g>
      ))}
    </svg>
  );
}
