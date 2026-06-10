import type { KpiData } from "@/content/slides.types";

/**
 * Cifra protagonista (ej. 66%). Cifras tabulares para que el número
 * no salte al animarse. El conteo GSAP se conecta en Fase 4 leyendo
 * data-kpi-value; sin JS muestra el valor final (progressive enhancement).
 */
export function Kpi({ value, label }: KpiData) {
  return (
    <div className="flex flex-col items-center gap-4 text-center" data-reveal>
      <span
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
