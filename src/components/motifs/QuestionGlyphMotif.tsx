"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { MotifProps } from "@/components/motifs/MotifProps";

/** Líneas finas de "circuito" que emanan del glifo. */
const CIRCUITS = [
  { x1: 70, y1: 96, x2: 130, y2: 96, cx: 70, cy: 96 },
  { x1: 300, y1: 150, x2: 360, y2: 150, cx: 360, cy: 150 },
  { x1: 64, y1: 280, x2: 64, y2: 220, cx: 64, cy: 280 },
  { x1: 330, y1: 300, x2: 330, y2: 250, cx: 330, cy: 250 },
];

/**
 * Motivo de pregunta de investigación (slide 4): un "?" tipográfico
 * gigante como elemento gráfico, con flotación lenta y circuitos que
 * pulsan. La tipografía ES el diseño. Reduced-motion: glifo estático.
 */
export function QuestionGlyphMotif({ className }: MotifProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.to("[data-glyph]", {
        y: -12,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });
      gsap.to("[data-circuit-node]", {
        opacity: 0.2,
        scale: 1.6,
        transformOrigin: "center",
        duration: "random(1.2, 2.2)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.2, from: "random" },
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
      <g className="stroke-section" strokeWidth="1.4" opacity="0.45">
        {CIRCUITS.map((c, i) => (
          <line key={i} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} />
        ))}
      </g>
      <g className="fill-section">
        {CIRCUITS.map((c, i) => (
          <circle key={i} data-circuit-node cx={c.cx} cy={c.cy} r={5} opacity="0.7" />
        ))}
      </g>

      <text
        data-glyph
        x="200"
        y="208"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-section font-display"
        style={{ fontWeight: 700, fontSize: "340px" }}
        opacity="0.9"
      >
        ?
      </text>
    </svg>
  );
}
