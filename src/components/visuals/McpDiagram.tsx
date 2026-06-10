"use client";

import { useDrawAnimation } from "@/components/visuals/useDrawAnimation";

const nodeClasses = "fill-bg-elev stroke-border";
const nodeLabelClasses = "fill-fg text-[15px] font-semibold";

/**
 * Slide 14 (discusión): el puente MCP conecta el LLM con los datos
 * privados; los vectores de riesgo van señalados con etiqueta de texto
 * en color de alerta (texto, no solo color). El enlace se dibuja con GSAP.
 */
export function McpDiagram() {
  const scopeRef = useDrawAnimation<SVGSVGElement>();

  return (
    <svg
      ref={scopeRef}
      viewBox="0 0 440 260"
      role="img"
      aria-label="Diagrama del protocolo MCP: un puente bidireccional entre el modelo de lenguaje y los datos privados que abre vectores de riesgo como la inyección de prompts y la fuga de datos"
      className="w-full max-h-[45vh]"
      data-reveal
    >
      {/* Nodo LLM */}
      <rect
        x="16"
        y="72"
        width="120"
        height="72"
        rx="16"
        className={nodeClasses}
        strokeWidth="1.5"
      />
      <text x="76" y="104" textAnchor="middle" className={nodeLabelClasses}>
        LLM
      </text>
      <text
        x="76"
        y="126"
        textAnchor="middle"
        className="fill-fg-muted text-[12px]"
      >
        Modelo de lenguaje
      </text>

      {/* Nodo datos privados */}
      <rect
        x="304"
        y="72"
        width="120"
        height="72"
        rx="16"
        className={nodeClasses}
        strokeWidth="1.5"
      />
      <text x="364" y="104" textAnchor="middle" className={nodeLabelClasses}>
        Datos privados
      </text>
      <text
        x="364"
        y="126"
        textAnchor="middle"
        className="fill-fg-muted text-[12px]"
      >
        del negocio
      </text>

      {/* Puente MCP bidireccional (se dibuja con GSAP) */}
      <path
        d="M 140 96 L 300 96"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        className="stroke-section"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 300 120 L 140 120"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        className="stroke-section"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <rect
        x="186"
        y="84"
        width="68"
        height="48"
        rx="12"
        data-draw-label
        className="fill-bg stroke-section"
        strokeWidth="2"
      />
      <text
        x="220"
        y="113"
        textAnchor="middle"
        data-draw-label
        className="fill-fg text-[14px] font-semibold"
      >
        MCP
      </text>

      {/* Vectores de riesgo: icono de alerta (triángulo) + etiqueta de
          texto, nunca solo color */}
      <path
        d="M 178 140 L 162 180"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        className="stroke-warning"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 262 140 L 278 180"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        className="stroke-warning"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <g data-draw-label>
        <path
          d="M 76 196 L 84 210 L 68 210 Z"
          className="fill-none stroke-warning"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text
          x="92"
          y="210"
          textAnchor="start"
          className="fill-warning text-[13px] font-semibold"
        >
          Inyección de prompts
        </text>
      </g>
      <g data-draw-label>
        <path
          d="M 252 196 L 260 210 L 244 210 Z"
          className="fill-none stroke-warning"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text
          x="268"
          y="210"
          textAnchor="start"
          className="fill-warning text-[13px] font-semibold"
        >
          Fuga de datos
        </text>
      </g>
    </svg>
  );
}
