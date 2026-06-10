"use client";

import { useDrawAnimation } from "@/components/visuals/useDrawAnimation";

/**
 * Slide 3 (problema): curva inversa complejidad ↑ / explicabilidad ↓.
 * El trazo se dibuja al entrar (data-draw); la zona de "caja negra"
 * queda señalada con etiqueta de texto, no solo con color.
 */
export function ComplexityCurve() {
  const scopeRef = useDrawAnimation<SVGSVGElement>();

  return (
    <svg
      ref={scopeRef}
      viewBox="0 0 420 300"
      role="img"
      aria-label="Curva descendente: al aumentar la complejidad técnica, la explicabilidad disminuye hasta la zona de caja negra"
      className="w-full max-h-[45vh]"
      data-reveal
    >
      {/* Ejes */}
      <line
        x1="48"
        y1="252"
        x2="400"
        y2="252"
        className="stroke-border"
        strokeWidth="2"
      />
      <line
        x1="48"
        y1="252"
        x2="48"
        y2="24"
        className="stroke-border"
        strokeWidth="2"
      />

      {/* Curva inversa (se dibuja con GSAP) */}
      <path
        d="M 60 44 C 160 56, 220 150, 384 234"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        className="stroke-danger"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Zona de caja negra al final de la curva */}
      <circle cx="384" cy="234" r="7" className="fill-danger" data-draw-label />
      <text
        x="378"
        y="212"
        textAnchor="end"
        data-draw-label
        className="fill-fg text-[15px] font-semibold"
      >
        «Caja negra»
      </text>

      {/* Etiquetas de ejes (texto, no solo color) */}
      <text
        x="224"
        y="286"
        textAnchor="middle"
        className="fill-fg-muted text-[14px]"
      >
        Complejidad técnica →
      </text>
      <text
        x="20"
        y="138"
        textAnchor="middle"
        transform="rotate(-90 20 138)"
        className="fill-fg-muted text-[14px]"
      >
        Explicabilidad →
      </text>
    </svg>
  );
}
