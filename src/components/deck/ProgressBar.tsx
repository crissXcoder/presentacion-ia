"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";

gsap.registerPlugin(useGSAP);

/**
 * Barra fina superior con el avance del deck. Anima scaleX (nunca width,
 * por rendimiento). Decorativa: la numeración textual vive en DeckControls.
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
      gsap.to(fill, { scaleX: progress, duration: 0.4, ease: "power2.out" });
    },
    { dependencies: [progress] },
  );

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-20 h-1 bg-border/40"
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-primary"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
