"use client";

import { useDrawAnimation } from "@/components/visuals/useDrawAnimation";

const nodeLabelClasses = "fill-fg text-[14px] font-semibold";

/**
 * Slide 14 (discusión): el puente MCP conecta el LLM con los datos
 * privados.
 * Enriquecido con nodos de gradiente, iconos vectoriales, flujo cíclico
 * Bézier bidireccional, escudo protector de datos y bloques de alerta
 * warning detallados con conectores punteados.
 */
export function McpDiagram() {
  const scopeRef = useDrawAnimation<SVGSVGElement>();

  return (
    <svg
      ref={scopeRef}
      viewBox="0 0 440 260"
      role="img"
      aria-label="Diagrama del protocolo MCP: un puente bidireccional entre el modelo de lenguaje y los datos privados que abre vectores de riesgo como la inyección de prompts y la fuga de datos"
      className="w-full max-h-[45vh] select-none"
      data-reveal
    >
      <defs>
        {/* Marcador de flecha del flujo */}
        <marker
          id="mcp-arrowhead"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 2 L 7 5 L 0 8 z" fill="var(--section-accent)" />
        </marker>

        {/* Gradiente para nodos estándar */}
        <linearGradient id="mcp-node-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-bg-elev)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--color-bg-elev) 80%, var(--color-border))" stopOpacity="0.9" />
        </linearGradient>

        {/* Gradiente para el borde del badge central MCP */}
        <linearGradient id="mcp-border-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>

      {/* Escudo / Perímetro de seguridad alrededor de los datos privados */}
      <path
        d="M 285 45 A 72 72 0 0 0 285 171"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
        className="opacity-25"
        aria-hidden="true"
      />
      <text
        x="276"
        y="36"
        className="fill-primary/60 text-[8px] font-bold tracking-wider uppercase"
      >
        Perímetro seguro
      </text>

      {/* Nodo LLM */}
      <g>
        <rect
          x="16"
          y="72"
          width="120"
          height="72"
          rx="20"
          fill="url(#mcp-node-grad)"
          className="stroke-section"
          strokeWidth="1.5"
        />
        {/* Icono de Cerebro/Red Neuronal (🧠) */}
        <g transform="translate(30, 86)" className="opacity-70 stroke-primary" fill="none" strokeWidth="1.5">
          <circle cx="10" cy="5" r="2.5" />
          <circle cx="4" cy="13" r="2" />
          <circle cx="16" cy="13" r="2" />
          <line x1="8.5" y1="6.5" x2="5.5" y2="11.5" />
          <line x1="11.5" y1="6.5" x2="14.5" y2="11.5" />
          <line x1="6" y1="13" x2="14" y2="13" />
        </g>
        <text x="76" y="104" textAnchor="middle" className={nodeLabelClasses}>
          LLM
        </text>
        <text
          x="76"
          y="124"
          textAnchor="middle"
          className="fill-fg-muted text-[11px]"
        >
          Modelo de lenguaje
        </text>
      </g>

      {/* Nodo Datos Privados */}
      <g>
        <rect
          x="304"
          y="72"
          width="120"
          height="72"
          rx="20"
          fill="url(#mcp-node-grad)"
          className="stroke-border/80"
          strokeWidth="1.5"
        />
        {/* Icono de Candado (🔒) */}
        <g transform="translate(320, 86)" className="opacity-70 stroke-accent" fill="none" strokeWidth="1.5">
          <rect x="2" y="6" width="12" height="9" rx="1.5" />
          <path d="M 4 6 V 4 A 4 4 0 0 1 12 4 V 6" />
        </g>
        <text x="364" y="104" textAnchor="middle" className={nodeLabelClasses}>
          Datos privados
        </text>
        <text
          x="364"
          y="124"
          textAnchor="middle"
          className="fill-fg-muted text-[11px]"
        >
          del negocio
        </text>
      </g>

      {/* Ciclo de Flujo Bidireccional Bézier (se dibuja con GSAP) */}
      <path
        d="M 140 92 C 190 76, 250 76, 300 92"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        markerEnd="url(#mcp-arrowhead)"
        className="stroke-section"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 300 124 C 250 140, 190 140, 140 124"
        pathLength={1}
        strokeDasharray={1}
        data-draw
        markerEnd="url(#mcp-arrowhead)"
        className="stroke-section"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Recuadro Central MCP */}
      <g data-draw-label>
        <rect
          x="184"
          y="94"
          width="72"
          height="28"
          rx="8"
          className="fill-bg"
          stroke="url(#mcp-border-grad)"
          strokeWidth="2.5"
        />
        <text
          x="220"
          y="113"
          textAnchor="middle"
          className="fill-fg text-[13px] font-bold tracking-wider"
        >
          MCP
        </text>
      </g>

      {/* Conexiones de Riesgo Punteadas (se dibujan con GSAP) */}
      <path
        d="M 170 126 C 160 146, 150 162, 130 180"
        data-draw-label
        className="stroke-warning/60"
        strokeWidth="2"
        strokeDasharray="4 3"
        fill="none"
      />
      <path
        d="M 270 126 C 280 146, 290 162, 310 180"
        data-draw-label
        className="stroke-warning/60"
        strokeWidth="2"
        strokeDasharray="4 3"
        fill="none"
      />

      {/* Vectores de Alerta: Cajas de Alerta de Riesgo con Iconos */}
      <g data-draw-label>
        {/* Alerta 1: Inyección de Prompts */}
        <rect
          x="20"
          y="180"
          width="170"
          height="42"
          rx="10"
          className="fill-warning/8 stroke-warning/30"
          strokeWidth="1.2"
        />
        {/* Icono de Alerta SVG (⚠) */}
        <g transform="translate(30, 192)" className="stroke-warning" fill="none" strokeWidth="1.8">
          <path d="M 8 1.5 L 14.5 13 L 1.5 13 Z" strokeLinejoin="round" />
          <line x1="8" y1="5.5" x2="8" y2="9" />
          <circle cx="8" cy="11" r="0.5" fill="currentColor" />
        </g>
        <text
          x="54"
          y="206"
          textAnchor="start"
          className="fill-warning text-[12px] font-bold"
        >
          Inyección de prompts
        </text>

        {/* Alerta 2: Fuga de Datos */}
        <rect
          x="250"
          y="180"
          width="170"
          height="42"
          rx="10"
          className="fill-warning/8 stroke-warning/30"
          strokeWidth="1.2"
        />
        {/* Icono de Alerta SVG (⚠) */}
        <g transform="translate(260, 192)" className="stroke-warning" fill="none" strokeWidth="1.8">
          <path d="M 8 1.5 L 14.5 13 L 1.5 13 Z" strokeLinejoin="round" />
          <line x1="8" y1="5.5" x2="8" y2="9" />
          <circle cx="8" cy="11" r="0.5" fill="currentColor" />
        </g>
        <text
          x="284"
          y="206"
          textAnchor="start"
          className="fill-warning text-[12px] font-bold"
        >
          Fuga de datos
        </text>
      </g>
    </svg>
  );
}
