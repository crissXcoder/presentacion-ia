"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import type { KpiData } from "@/content/slides.types";

/**
 * Al terminar la transición, el Deck remonta la slide (cambio de key);
 * sin esta marca el conteo se reiniciaría a mitad de animación. Si el
 * mismo valor contó hace <3s, se muestra el final directamente.
 */
const lastCountStart = new Map<string, number>();
const REMOUNT_GUARD_MS = 3000;

/**
 * Cifra protagonista (ej. 66%). Cifras tabulares para que el número
 * no salte durante el conteo. Al entrar la slide, GSAP cuenta de 0 al
 * valor (animaciones-gsap.md §3: ~1.2s, power1.out). Variante reducida
 * y SSR muestran el valor final directamente (progressive enhancement).
 */
export function Kpi({ value, label }: KpiData) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const element = numberRef.current;
    // Solo cuenta si el valor empieza con un número (ej. "66%").
    const match = value.match(/^(\d+)(.*)$/);
    if (!element || !match || prefersReducedMotion()) return;

    const startedAt = lastCountStart.get(value);
    if (startedAt !== undefined && Date.now() - startedAt < REMOUNT_GUARD_MS) {
      return;
    }
    lastCountStart.set(value, Date.now());

    const target = Number(match[1]);
    const suffix = match[2];
    const counter = { n: 0 };
    // Estado inicial antes del primer paint del cliente (sin parpadeo
    // del valor final): el conteo arranca junto al reveal de la slide.
    element.textContent = `0${suffix}`;
    // delay+duración ≈ 1.2s total: el conteo queda prácticamente
    // completo cuando el swap de la transición remonta la slide.
    gsap.to(counter, {
      n: target,
      duration: 1,
      ease: "power1.out",
      delay: 0.2,
      onUpdate: () => {
        element.textContent = `${Math.round(counter.n)}${suffix}`;
      },
      onComplete: () => {
        element.textContent = value;
      },
    });
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-4 text-center" data-reveal>
      <span
        ref={numberRef}
        data-kpi-value={value}
        className="font-display text-kpi tabular-nums text-accent"
      >
        {value}
      </span>
      <span className="max-w-[30ch] text-body-slide text-fg-muted">
        {label}
      </span>
    </div>
  );
}
