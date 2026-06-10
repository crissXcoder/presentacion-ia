import { Ban, CircleCheck, Eye, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface RiskLevel {
  label: string;
  detail: string;
  icon: LucideIcon;
  /** Acento del nivel: solo tokens; el nivel se identifica por etiqueta e icono. */
  accentClasses: string;
  width: string;
}

/**
 * Niveles del AI Act (UE, 2024), de mayor a menor riesgo. Cada nivel
 * lleva etiqueta e icono además del color (accesibilidad: el color
 * nunca es el único indicador).
 */
const levels: RiskLevel[] = [
  {
    label: "Inaceptable",
    detail: "Prohibido",
    icon: Ban,
    accentClasses: "border-danger text-danger",
    width: "w-[40%]",
  },
  {
    label: "Alto",
    detail: "Auditoría y supervisión estricta",
    icon: TriangleAlert,
    accentClasses: "border-warning text-warning",
    width: "w-[60%]",
  },
  {
    label: "Limitado",
    detail: "Deberes de transparencia",
    icon: Eye,
    accentClasses: "border-primary text-primary",
    width: "w-[80%]",
  },
  {
    label: "Mínimo",
    detail: "Uso libre, buenas prácticas",
    icon: CircleCheck,
    accentClasses: "border-accent text-accent",
    width: "w-full",
  },
];

/**
 * Slide B3 (respaldo): escalera de riesgo del AI Act,
 * inaceptable → alto → limitado → mínimo. Los niveles entran con el
 * reveal escalonado del deck (data-reveal), con variante reducida ya
 * cubierta por el motor.
 */
export function RiskPyramid() {
  return (
    <div
      role="img"
      aria-label="Escalera de riesgo del AI Act con cuatro niveles: inaceptable (prohibido), alto (auditoría estricta), limitado (transparencia) y mínimo (uso libre)"
      className="flex w-full flex-col items-center gap-3"
    >
      {levels.map((level) => {
        const Icon = level.icon;
        return (
          <div
            key={level.label}
            data-reveal
            className={`flex items-center justify-center gap-3 rounded-chip border-2 bg-bg-elev/60 px-5 py-3 ${level.width} ${level.accentClasses}`}
          >
            <Icon aria-hidden="true" size={22} strokeWidth={2} />
            <span className="font-display text-base font-semibold text-fg">
              {level.label}
            </span>
            <span className="hidden text-sm text-fg-muted sm:inline">
              · {level.detail}
            </span>
          </div>
        );
      })}
    </div>
  );
}
