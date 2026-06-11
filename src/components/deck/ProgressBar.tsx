"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";

gsap.registerPlugin(useGSAP);

/**
 * Barra de progreso superior interactiva con el avance de las diapositivas.
 * Mejorada con mayor presencia (4px), degradado de color premium y un
 * efecto de brillo (glow) sutil de energía.
 */
export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const fillRef = useRef<HTMLDivElement>(null);
  const progress = current / total;

  useGSAP(
    () => {
      const fill = fillRef.current;
      if (!fill) return;
      if (prefersReducedMotion()) {
        gsap.set(fill, { scaleX: progress });
        return;
      }
      gsap.to(fill, { scaleX: progress, duration: 0.45, ease: "power2.out" });
    },
    { dependencies: [progress] },
  );

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-30 h-[4px] bg-border/30 select-none pointer-events-none"
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-gradient-to-r from-primary to-accent shadow-[0_0_8px_rgba(79,124,255,0.6)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
