"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { MotifProps } from "@/components/motifs/MotifProps";

interface BigNumberMotifProps extends MotifProps {
  /** Cifra/marca a mostrar gigante de fondo. */
  value?: string;
}

/**
 * Motivo genérico: una cifra o marca tipográfica gigante de fondo
 * (marca de agua), con flotación lenta. La tipografía como textura, útil
 * cuando ningún motivo temático encaja. Reduced-motion: estático.
 */
export function BigNumberMotif({ className, value = "AI" }: BigNumberMotifProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to("[data-bignum]", {
        y: -14,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
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
      <text
        data-bignum
        x="200"
        y="210"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-section font-display"
        style={{ fontWeight: 700, fontSize: "260px", letterSpacing: "-0.04em" }}
        opacity="0.85"
      >
        {value}
      </text>
    </svg>
  );
}
