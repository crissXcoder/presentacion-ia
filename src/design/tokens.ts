/**
 * Espejo en JS de los tokens de color definidos en `globals.css` (@theme).
 * Solo para los casos donde GSAP o SVG necesitan leer el valor en JS
 * (ej. trazos de diagramas animados). Para estilos, usar siempre las
 * utilidades de Tailwind (`text-primary`, `bg-bg-elev`, …), nunca esto.
 *
 * Fuente de verdad visual: 03-diseno/sistema-de-diseno.md.
 */
export const colors = {
  bg: "#0b1020",
  bgElev: "#141b30",
  fg: "#f2f5ff",
  fgMuted: "#a7b0c8",
  primary: "#4f7cff",
  primaryStrong: "#2e5bff",
  accent: "#22d3a6",
  warning: "#f5a524",
  danger: "#f25f5c",
  border: "#2a3350",
  ring: "#7aa2ff",
} as const;

export type ColorToken = keyof typeof colors;
