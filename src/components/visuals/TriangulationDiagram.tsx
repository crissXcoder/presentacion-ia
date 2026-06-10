"use client";

import { useDrawAnimation } from "@/components/visuals/useDrawAnimation";

const nodeClasses = "fill-bg-elev stroke-border";
const nodeLabelClasses = "fill-fg text-[15px] font-semibold";

/**
 * Slide 10 (metodología): triangulación — análisis documental +
 * entrevistas convergen en los hallazgos. Las flechas se dibujan
 * con GSAP (data-draw); todos los nodos llevan etiqueta de texto.
 */
export function TriangulationDiagram() {
  const scopeRef = useDrawAnimation<SVGSVGElement>();

  return (
    <svg
      ref={scopeRef}
      viewBox="0 0 440 260"
      role="img"
      aria-label="Diagrama de triangulación: el análisis documental y las entrevistas a expertos convergen en los hallazgos"
      className="w-full"
      data-reveal
    >
      {/* Fuente 1: análisis documental */}
      <rect
        x="16"
        y="32"
        width="172"
        height="64"
        rx="16"
        className={nodeClasses}
        strokeWidth="1.5"
      />
      <text x="102" y="60" textAnchor="middle" className={nodeLabelClasses}>
        Análisis documental
      </text>
      <text
        x="102"
        y="82"
        textAnchor="middle"
        className="fill-fg-muted text-[12px]"
      >
        OCDE · NIST · UNESCO · AI Act
      </text>

      {/* Fuente 2: entrevistas */}
      <rect
        x="16"
        y="164"
        width="172"
        height="64"
        rx="16"
        className={nodeClasses}
        strokeWidth="1.5"
      />
      <text x="102" y="192" textAnchor="middle" className={nodeLabelClasses}>
        Entrevistas a expertos
      </text>
      <text
        x="102"
        y="214"
        textAnchor="middle"
        className="fill-fg-muted text-[12px]"
      >
        n = 2 · muestreo por juicio
      </text>

      {/* Flechas convergentes (se dibujan con GSAP) */}
      <path
        d="M 192 64 C 250 64, 268 110, 304 126"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        className="stroke-section"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 192 196 C 250 196, 268 150, 304 134"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        className="stroke-section"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Convergencia: hallazgos */}
      <rect
        x="308"
        y="98"
        width="116"
        height="64"
        rx="16"
        data-draw-label
        className="fill-bg-elev stroke-section"
        strokeWidth="2"
      />
      <text
        x="366"
        y="134"
        textAnchor="middle"
        data-draw-label
        className={nodeLabelClasses}
      >
        Hallazgos
      </text>
    </svg>
  );
}
