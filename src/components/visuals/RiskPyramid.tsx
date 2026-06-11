import { Ban, CircleCheck, Eye, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface RiskLevel {
  label: string;
  detail: string;
  icon: LucideIcon;
  /** Acento del nivel y degradado de fondo. */
  accentClasses: string;
  bgGradient: string;
  width: string;
}

/**
 * Niveles del AI Act (UE, 2024), de mayor a menor riesgo.
 * Enriquecido con anchos graduales más piramidales y degradados dedicados.
 */
const levels: RiskLevel[] = [
  {
    label: "Inaceptable",
    detail: "Prohibido",
    icon: Ban,
    accentClasses: "border-danger text-danger",
    bgGradient: "from-danger/20 via-danger/5 to-transparent",
    width: "w-[45%] md:w-[35%]",
  },
  {
    label: "Alto",
    detail: "Auditoría y supervisión estricta",
    icon: TriangleAlert,
    accentClasses: "border-warning text-warning",
    bgGradient: "from-warning/20 via-warning/5 to-transparent",
    width: "w-[65%] md:w-[55%]",
  },
  {
    label: "Limitado",
    detail: "Deberes de transparencia",
    icon: Eye,
    accentClasses: "border-primary text-primary",
    bgGradient: "from-primary/20 via-primary/5 to-transparent",
    width: "w-[82%] md:w-[75%]",
  },
  {
    label: "Mínimo",
    detail: "Uso libre, buenas prácticas",
    icon: CircleCheck,
    accentClasses: "border-accent text-accent",
    bgGradient: "from-accent/20 via-accent/5 to-transparent",
    width: "w-full",
  },
];

/**
 * Slide B3 (respaldo): escalera de riesgo del AI Act,
 * inaceptable → alto → limitado → mínimo.
 * Mejorado con conector de escala de riesgo a la izquierda,
 * fondos degradados con glassmorphism y sello/badge de "PROHIBIDO".
 */
export function RiskPyramid() {
  return (
    <div
      role="img"
      aria-label="Escalera de riesgo del AI Act con cuatro niveles: inaceptable (prohibido), alto (auditoría estricta), limitado (transparencia) y mínimo (uso libre)"
      className="relative flex w-full flex-col items-center gap-3.5 select-none"
    >
      {/* Conector vertical con degradado de progresión de riesgo */}
      <div
        className="absolute left-[2%] md:left-[6%] top-6 bottom-6 w-[2.5px] bg-gradient-to-b from-danger via-warning to-accent opacity-30 rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {levels.map((level) => {
        const Icon = level.icon;
        const isInaceptable = level.label === "Inaceptable";

        return (
          <div
            key={level.label}
            data-reveal
            className={`group relative flex items-center justify-center gap-3 rounded-chip border-2 px-5 py-3.5 backdrop-blur-md transition-all duration-300 ${level.width} ${level.accentClasses} bg-gradient-to-r ${level.bgGradient} bg-bg-elev/40 shadow-sm`}
          >
            {/* Sello de Prohibido rotado para el nivel inaceptable */}
            {isInaceptable && (
              <div
                className="absolute -top-3.5 -right-3.5 bg-danger text-bg font-display text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded rotate-[-10deg] shadow-[0_4px_12px_rgba(242,95,92,0.4)] border border-danger/60 select-none z-20 transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                Prohibido
              </div>
            )}

            <Icon aria-hidden="true" size={22} strokeWidth={2.5} className="shrink-0" />
            <span className="font-display text-base font-bold text-fg">
              {level.label}
            </span>
            <span className="hidden text-sm text-fg-muted font-medium sm:inline">
              · {level.detail}
            </span>
          </div>
        );
      })}
    </div>
  );
}
