import {
  Search,
  LineChart,
  FileText,
  Globe,
  ShieldCheck,
  Scale,
  Gavel,
  type LucideIcon,
} from "lucide-react";
import type { CardData } from "@/content/slides.types";
import { SourceTag } from "@/components/slide/SourceTag";
import { cn } from "@/lib/cn";

// Mapeo de iconos por título exacto según la especificación V2 (sin tocar slides.ts)
const cardIcons: Record<string, LucideIcon> = {
  "Describir": Search,
  "Analizar": LineChart,
  "Proponer": FileText,
  "OCDE (2019, rev. 2024)": Globe,
  "NIST AI RMF (2023/2024)": ShieldCheck,
  "UNESCO (2022)": Scale,
  "AI Act UE (2024)": Gavel,
};

/**
 * Tarjeta para objetivos, marcos y conceptos.
 * Enriquecida con glows dinámicos, bordes degradados, iconos mapeados
 * y micro-interacciones de elevación (hover en desktop).
 */
export function Card({
  title,
  body,
  source,
  centered,
}: CardData & { centered?: boolean }) {
  const Icon = cardIcons[title];

  // Estilos inline para el glow dinámico usando color-mix nativo de CSS
  const glowStyle = {
    "--card-glow-color": "color-mix(in srgb, var(--section-accent) 12%, transparent)",
    "--card-glow-hover": "color-mix(in srgb, var(--section-accent) 22%, transparent)",
  } as React.CSSProperties;

  return (
    <article
      data-reveal
      style={glowStyle}
      className={cn(
        // Posicionamiento
        "relative flex flex-col gap-4 rounded-card p-6 backdrop-blur-md transition-all duration-300 ease-out",
        // Superficie glassmorphism premium con degradado
        "bg-gradient-to-br from-bg-elev/85 to-bg-elev/55 shadow-[0_8px_32px_var(--card-glow-color)]",
        // Borde degradado sutil simulado con bordes específicos
        "border border-border/50 border-t-[color-mix(in_srgb,var(--section-accent)_35%,transparent)] border-l-[color-mix(in_srgb,var(--section-accent)_35%,transparent)]",
        // Hover condicional para dispositivos con puntero (desktop)
        "@media(hover:hover):hover:translate-y-[-4px] @media(hover:hover):hover:shadow-[0_12px_40px_var(--card-glow-hover)] @media(hover:hover):hover:border-t-[color-mix(in_srgb,var(--section-accent)_50%,transparent)] @media(hover:hover):hover:border-l-[color-mix(in_srgb,var(--section-accent)_50%,transparent)]",
        centered && "items-center text-center",
      )}
    >
      <div className={cn("flex gap-3", centered ? "flex-col items-center" : "items-center")}>
        {Icon && (
          <Icon
            aria-hidden="true"
            size={30}
            className="text-section shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ color: "var(--section-accent)" }}
          />
        )}
        <h3 className="font-display text-body-slide font-semibold text-fg leading-tight">
          {title}
        </h3>
      </div>
      <p className={cn("text-body-slide text-fg-muted leading-relaxed", centered && "max-w-[45ch]")}>
        {body}
      </p>
      {source && <SourceTag>{source}</SourceTag>}
    </article>
  );
}
