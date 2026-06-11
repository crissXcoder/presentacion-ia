"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { MotifProps } from "@/components/motifs/MotifProps";

/** Nodos distribuidos (coordenadas en el viewBox 400×400). */
const NODES = [
  { x: 60, y: 84, r: 6 },
  { x: 142, y: 50, r: 5 },
  { x: 212, y: 108, r: 9 },
  { x: 92, y: 182, r: 5 },
  { x: 168, y: 198, r: 7 },
  { x: 262, y: 58, r: 5 },
  { x: 322, y: 138, r: 6 },
  { x: 300, y: 244, r: 8 },
  { x: 122, y: 300, r: 6 },
  { x: 210, y: 322, r: 5 },
  { x: 58, y: 250, r: 5 },
  { x: 342, y: 300, r: 6 },
  { x: 240, y: 182, r: 6 },
  { x: 160, y: 130, r: 5 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [2, 5], [5, 6], [2, 13], [13, 4],
  [4, 12], [12, 6], [6, 7], [7, 11], [4, 8], [8, 9], [9, 7], [3, 10],
  [10, 8], [12, 2], [13, 1],
];

/** Aristas por las que viaja una "señal". */
const SIGNAL_EDGES = [1, 4, 5, 11, 12, 16];

/**
 * Motivo de red neuronal (intro, marco teórico): la IA como red /
 * infraestructura. Nodos que pulsan + señales que viajan por las aristas.
 * Reduced-motion: red estática visible.
 */
export function NeuralNetMotif({ className }: MotifProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.to("[data-node]", {
        scale: 1.4,
        opacity: 0.55,
        transformOrigin: "center",
        duration: "random(1.6, 3.2)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.18, from: "random" },
      });

      const signals = ref.current?.querySelectorAll<SVGCircleElement>("[data-signal]");
      signals?.forEach((dot) => {
        const dx = Number(dot.dataset.dx);
        const dy = Number(dot.dataset.dy);
        gsap.fromTo(
          dot,
          { x: 0, y: 0, opacity: 0 },
          {
            keyframes: {
              opacity: [0, 1, 1, 0],
              x: [0, dx],
              y: [0, dy],
            },
            duration: gsap.utils.random(1.8, 3),
            ease: "none",
            repeat: -1,
            delay: gsap.utils.random(0, 1.5),
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      aria-hidden="true"
      className={cn("h-full w-full select-none overflow-visible", className)}
    >
      <g className="stroke-section" strokeWidth="1.2" opacity="0.5">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>

      <g className="fill-section">
        {NODES.map((n, i) => (
          <circle key={i} data-node cx={n.x} cy={n.y} r={n.r} opacity="0.85" />
        ))}
      </g>

      <g className="fill-fg">
        {SIGNAL_EDGES.map((edgeIndex, i) => {
          const [a, b] = EDGES[edgeIndex];
          return (
            <circle
              key={i}
              data-signal
              data-dx={NODES[b].x - NODES[a].x}
              data-dy={NODES[b].y - NODES[a].y}
              cx={NODES[a].x}
              cy={NODES[a].y}
              r={3}
            />
          );
        })}
      </g>
    </svg>
  );
}
