import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Viñeta enriquecida con badge circular y línea conectora vertical
 * para sugerir secuencia y mejorar la presencia visual en proyector.
 * data-reveal="bullet" permite una animación de escala en reveal.ts.
 */
export function Bullet({
  children,
  icon: Icon = ChevronRight,
  className,
}: {
  children: ReactNode;
  icon?: LucideIcon;
  /** Clases extra en el <li> (ej. offsets en offset-grid). */
  className?: string;
}) {
  return (
    <li
      className={cn(
        "group relative flex items-start gap-4 text-body-slide text-fg pb-5 last:pb-0",
        className,
      )}
      data-reveal="bullet"
    >
      {/* Línea conectora vertical */}
      <div
        className="absolute left-[11px] top-[1.8rem] bottom-[-1.5rem] w-px bg-[color-mix(in_srgb,var(--section-accent)_20%,transparent)] group-last:hidden pointer-events-none"
        aria-hidden="true"
      />

      {/* Badge circular para la viñeta */}
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--section-accent)_12%,transparent)] border border-[color-mix(in_srgb,var(--section-accent)_25%,transparent)] text-section mt-[0.2em] z-10"
        style={{ color: "var(--section-accent)" }}
      >
        <Icon aria-hidden="true" size={14} strokeWidth={3} />
      </div>

      <span className="max-w-[60ch] leading-relaxed">{children}</span>
    </li>
  );
}
