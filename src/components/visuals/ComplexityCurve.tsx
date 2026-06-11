"use client";

import { useDrawAnimation } from "@/components/visuals/useDrawAnimation";

/**
 * Slide 3 (problema): curva inversa complejidad ↑ / explicabilidad ↓.
 * Enriquecida con gradiente de área de riesgo, ticks en ejes, brillo (glow)
 * en la curva, hitos de tecnología (ML, Deep Learning, Transformers)
 * y un encuadre punteado de "Caja negra" para dar profundidad visual.
 */
export function ComplexityCurve() {
  const scopeRef = useDrawAnimation<SVGSVGElement>();

  return (
    <svg
      ref={scopeRef}
      viewBox="0 0 430 310"
      role="img"
      aria-label="Curva descendente: al aumentar la complejidad técnica, la explicabilidad disminuye hasta la zona de caja negra"
      className="w-full max-h-[45vh] select-none"
      data-reveal
    >
      <defs>
        {/* Degradado de área de riesgo */}
        <linearGradient id="curve-danger-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--color-danger)" stopOpacity="0.0" />
        </linearGradient>

        {/* Filtro de brillo glow para la curva */}
        <filter id="glow-danger-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Área degradada bajo la curva (aparece tras el trazo) */}
      <path
        d="M 60 252 L 60 44 C 160 56, 220 150, 384 234 L 384 252 Z"
        fill="url(#curve-danger-grad)"
        data-draw-label
        className="pointer-events-none"
      />

      {/* Ejes con marcas de graduación (ticks) */}
      <g className="stroke-border" strokeWidth="2">
        {/* Eje X */}
        <line x1="48" y1="252" x2="405" y2="252" />
        {/* Ticks X */}
        <line x1="136" y1="252" x2="136" y2="257" strokeWidth="1" className="stroke-border/60" />
        <line x1="224" y1="252" x2="224" y2="257" strokeWidth="1" className="stroke-border/60" />
        <line x1="312" y1="252" x2="312" y2="257" strokeWidth="1" className="stroke-border/60" />
        <line x1="384" y1="252" x2="384" y2="257" strokeWidth="1" className="stroke-border/60" />

        {/* Eje Y */}
        <line x1="48" y1="252" x2="48" y2="24" />
        {/* Ticks Y */}
        <line x1="43" y1="202" x2="48" y2="202" strokeWidth="1" className="stroke-border/60" />
        <line x1="43" y1="152" x2="48" y2="152" strokeWidth="1" className="stroke-border/60" />
        <line x1="43" y1="102" x2="48" y2="102" strokeWidth="1" className="stroke-border/60" />
        <line x1="43" y1="52" x2="48" y2="52" strokeWidth="1" className="stroke-border/60" />
      </g>

      {/* Curva inversa (se dibuja con GSAP y brilla) */}
      <path
        d="M 60 44 C 160 56, 220 150, 384 234"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        filter="url(#glow-danger-filter)"
        className="stroke-danger"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hitos/Puntos de referencia sobre la curva */}
      <g data-draw-label>
        {/* Hito 1: ML simple */}
        <circle cx="120" cy="72" r="4" className="fill-fg-muted" />
        <text x="126" y="66" className="fill-fg-muted text-[10px] font-medium">
          ML simple
        </text>

        {/* Hito 2: Deep Learning */}
        <circle cx="200" cy="128" r="4" className="fill-fg-muted" />
        <text x="206" y="122" className="fill-fg-muted text-[10px] font-medium">
          Deep Learning
        </text>

        {/* Hito 3: Transformers */}
        <circle cx="280" cy="182" r="4" className="fill-fg-muted" />
        <text x="286" y="176" className="fill-fg-muted text-[10px] font-medium">
          Transformers
        </text>
      </g>

      {/* Zona Enmarcada de Caja Negra */}
      <g data-draw-label>
        {/* Rectángulo de zona opaca */}
        <rect
          x="314"
          y="190"
          width="94"
          height="68"
          rx="10"
          className="fill-danger/5 stroke-danger/25"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        {/* Etiqueta de aviso */}
        <text
          x="361"
          y="204"
          textAnchor="middle"
          className="fill-danger/80 text-[8px] font-bold tracking-wider uppercase"
        >
          Zona Opaca
        </text>
        {/* Punto e Hito principal */}
        <circle cx="384" cy="234" r="7" className="fill-danger animate-pulse" />
        <text
          x="372"
          y="230"
          textAnchor="end"
          className="fill-fg text-[14px] font-bold"
        >
          «Caja negra»
        </text>
      </g>

      {/* Etiquetas de ejes (texto principal) */}
      <text
        x="224"
        y="286"
        textAnchor="middle"
        className="fill-fg-muted text-[13px] font-semibold tracking-wide"
      >
        Complejidad técnica →
      </text>
      <text
        x="20"
        y="138"
        textAnchor="middle"
        transform="rotate(-90 20 138)"
        className="fill-fg-muted text-[13px] font-semibold tracking-wide"
      >
        Explicabilidad →
      </text>
    </svg>
  );
}
