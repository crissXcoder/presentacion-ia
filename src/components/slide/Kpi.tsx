"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/reveal";
import type { KpiData } from "@/content/slides.types";

const lastCountStart = new Map<string, number>();
const REMOUNT_GUARD_MS = 3000;

/**
 * Cifra protagonista enriquecida con un Showcase Visual:
 * Un anillo gauge circular SVG animado en paralelo al conteo del número,
 * con glow pulsante lento y etiqueta destacada tipo pill.
 */
export function Kpi({ value, label }: KpiData) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  useGSAP(() => {
    const element = numberRef.current;
    const circle = circleRef.current;
    const match = value.match(/^(\d+)(.*)$/);

    if (!element || !match) return;

    const target = Number(match[1]);
    const suffix = match[2];

    // Control de Reduced Motion
    if (prefersReducedMotion()) {
      element.textContent = value;
      if (circle) {
        circle.style.strokeDashoffset = `${
          circumference - (circumference * target) / 100
        }`;
      }
      return;
    }

    const startedAt = lastCountStart.get(value);
    if (startedAt !== undefined && Date.now() - startedAt < REMOUNT_GUARD_MS) {
      // Si remonta antes del guard, fijar estado final directo
      element.textContent = value;
      if (circle) {
        circle.style.strokeDashoffset = `${
          circumference - (circumference * target) / 100
        }`;
      }
      return;
    }
    lastCountStart.set(value, Date.now());

    const counter = { n: 0 };
    element.textContent = `0${suffix}`;

    // 1. Animación del conteo numérico
    gsap.to(counter, {
      n: target,
      duration: 1.2,
      ease: "power1.out",
      delay: 0.1,
      onUpdate: () => {
        element.textContent = `${Math.round(counter.n)}${suffix}`;
      },
      onComplete: () => {
        element.textContent = value;
      },
    });

    // 2. Animación del trazo del círculo SVG (gauge)
    if (circle) {
      gsap.fromTo(
        circle,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: circumference - (circumference * target) / 100,
          duration: 1.2,
          ease: "power1.out",
          delay: 0.1,
        }
      );
    }

    // 3. Glow pulsante sutil en el número
    gsap.fromTo(
      element,
      {
        textShadow:
          "0 0 10px color-mix(in srgb, var(--color-accent) 25%, transparent)",
      },
      {
        textShadow:
          "0 0 25px color-mix(in srgb, var(--color-accent) 60%, transparent)",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.3, // Comienza tras terminar el conteo
      }
    );
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-6 text-center" data-reveal>
      {/* Contenedor relativo del Gauge y el Número */}
      <div className="relative flex h-[clamp(240px,26vw,340px)] w-[clamp(240px,26vw,340px)] items-center justify-center">
        <svg
          className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none select-none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="kpi-grad-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-primary)" />
            </linearGradient>
          </defs>
          {/* Círculo de fondo */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="stroke-border/30"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Círculo animado de progreso */}
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r={radius}
            stroke="url(#kpi-grad-glow)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>

        {/* Cifra grande centrada */}
        <span
          ref={numberRef}
          data-kpi-value={value}
          className="z-10 font-display text-kpi font-bold leading-none tabular-nums text-accent select-none"
        >
          {value}
        </span>
      </div>

      {/* Etiqueta destacada en píldora */}
      <span className="max-w-[32ch] text-body-slide text-fg-muted font-medium bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] border border-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] rounded-full px-5 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        {label}
      </span>
    </div>
  );
}
