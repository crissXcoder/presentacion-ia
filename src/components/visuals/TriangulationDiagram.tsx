"use client";

import { useDrawAnimation } from "@/components/visuals/useDrawAnimation";

const nodeLabelClasses = "fill-fg text-[14px] font-semibold";

/**
 * Slide 10 (metodología): triangulación — análisis documental +
 * entrevistas convergen en los hallazgos.
 * Enriquecido con tarjetas con gradiente, iconos SVG vectoriales,
 * marcadores de flecha en defs, etiquetas de flujo ("Análisis"/"Síntesis")
 * y un halo de color-accent detrás del nodo final.
 */
export function TriangulationDiagram() {
  const scopeRef = useDrawAnimation<SVGSVGElement>();

  return (
    <svg
      ref={scopeRef}
      viewBox="0 0 440 260"
      role="img"
      aria-label="Diagrama de triangulación: el análisis documental y las entrevistas a expertos convergen en los hallazgos"
      className="w-full max-h-[45vh] select-none"
      data-reveal
    >
      <defs>
        {/* Marcador de punta de flecha */}
        <marker
          id="tri-arrowhead"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--section-accent)" />
        </marker>

        {/* Gradiente para nodos estándar */}
        <linearGradient id="node-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-bg-elev)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--color-bg-elev) 80%, var(--color-border))" stopOpacity="0.9" />
        </linearGradient>

        {/* Gradiente para nodo acentuado (Hallazgos) */}
        <linearGradient id="node-accent-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-bg-elev)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--color-bg-elev) 82%, var(--color-accent))" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Halo/Glow detrás del nodo Hallazgos */}
      <ellipse
        cx="366"
        cy="130"
        rx="64"
        ry="42"
        className="fill-accent/10 blur-xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Fuente 1: análisis documental */}
      <g>
        <rect
          x="16"
          y="32"
          width="172"
          height="64"
          rx="16"
          fill="url(#node-grad)"
          className="stroke-border/80"
          strokeWidth="1.5"
        />
        {/* Icono de Documento (📄) */}
        <g transform="translate(32, 46)" className="opacity-60 stroke-fg-muted" fill="none" strokeWidth="1.5">
          <rect x="0" y="0" width="12" height="15" rx="1.5" />
          <line x1="3" y1="4" x2="9" y2="4" />
          <line x1="3" y1="7" x2="9" y2="7" />
          <line x1="3" y1="10" x2="7" y2="10" />
        </g>
        <text x="112" y="58" textAnchor="middle" className={nodeLabelClasses}>
          Análisis documental
        </text>
        <text
          x="112"
          y="78"
          textAnchor="middle"
          className="fill-fg-muted text-[11px]"
        >
          OCDE · NIST · UNESCO · AI Act
        </text>
      </g>

      {/* Fuente 2: entrevistas */}
      <g>
        <rect
          x="16"
          y="164"
          width="172"
          height="64"
          rx="16"
          fill="url(#node-grad)"
          className="stroke-border/80"
          strokeWidth="1.5"
        />
        {/* Icono de Personas (👥) */}
        <g transform="translate(30, 178)" className="opacity-60 stroke-fg-muted" fill="none" strokeWidth="1.5">
          <circle cx="5" cy="4" r="2.5" />
          <path d="M 1 11 A 4 4 0 0 1 9 11" />
          <circle cx="12" cy="5" r="2" />
          <path d="M 9 11 A 3 3 0 0 1 15 11" />
        </g>
        <text x="112" y="190" textAnchor="middle" className={nodeLabelClasses}>
          Entrevistas a expertos
        </text>
        <text
          x="112"
          y="210"
          textAnchor="middle"
          className="fill-fg-muted text-[11px]"
        >
          n = 2 · muestreo por juicio
        </text>
      </g>

      {/* Flechas convergentes (se dibujan con GSAP y tienen punta de flecha) */}
      <path
        d="M 192 64 C 250 64, 268 110, 302 125"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        markerEnd="url(#tri-arrowhead)"
        className="stroke-section"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 192 196 C 250 196, 268 150, 302 135"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        markerEnd="url(#tri-arrowhead)"
        className="stroke-section"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Etiquetas sobre las flechas (aparecen tras la animación) */}
      <text
        x="244"
        y="75"
        textAnchor="middle"
        data-draw-label
        className="fill-fg-muted text-[11px] font-semibold tracking-wider uppercase opacity-75"
      >
        Análisis
      </text>
      <text
        x="244"
        y="190"
        textAnchor="middle"
        data-draw-label
        className="fill-fg-muted text-[11px] font-semibold tracking-wider uppercase opacity-75"
      >
        Síntesis
      </text>

      {/* Convergencia: hallazgos (con gradiente y borde de sección) */}
      <g data-draw-label>
        <rect
          x="308"
          y="98"
          width="116"
          height="64"
          rx="16"
          fill="url(#node-accent-grad)"
          className="stroke-section"
          strokeWidth="2"
        />
        {/* Icono de Verificación/Check (✓) */}
        <g transform="translate(322, 118)" className="stroke-accent" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="2 6 5 9 11 3" />
        </g>
        <text
          x="368"
          y="136"
          textAnchor="middle"
          className={nodeLabelClasses}
        >
          Hallazgos
        </text>
      </g>
    </svg>
  );
}
