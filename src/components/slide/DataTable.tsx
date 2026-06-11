import type { TableData } from "@/content/slides.types";
import { SourceTag } from "@/components/slide/SourceTag";
import { cn } from "@/lib/cn";

/**
 * Tabla de datos con título visible y fuente (regla D4).
 * Enriquecida con cabecera elevada, filas alternas (zebra strips),
 * borde de acento en la primera columna y efectos de fila interactivos.
 */
export function DataTable({
  caption,
  source,
  head,
  rows,
  compact = false,
}: TableData & { compact?: boolean }) {
  return (
    <figure
      className={cn("flex w-full flex-col", compact ? "gap-3" : "gap-5")}
      data-reveal
    >
      <table className="w-full border-collapse text-left tabular-nums overflow-hidden rounded-chip">
        <caption
          className={cn(
            "caption-top text-left font-display font-semibold text-fg pb-2",
            compact ? "text-sm" : "text-body-slide",
          )}
        >
          {caption}
        </caption>
        <thead>
          <tr className="bg-bg-elev/50 border-b border-border/80">
            {head.map((heading, index) => (
              <th
                key={heading}
                scope="col"
                className={cn(
                  "font-semibold uppercase tracking-[0.12em] text-fg-muted",
                  compact ? "py-2.5 px-4 text-xs" : "py-4 px-6 text-kicker",
                  index === 0 && "rounded-tl-chip",
                  index === head.length - 1 && "rounded-tr-chip",
                )}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {rows.map((row, rowIndex) => (
            <tr
              key={`${rowIndex}-${row.join("|")}`}
              className={cn(
                "transition-colors duration-150 odd:bg-bg-elev/15",
                "@media(hover:hover):hover:bg-bg-elev/30",
              )}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cellIndex}-${cell}`}
                  className={cn(
                    "text-fg py-3",
                    compact ? "px-4 text-sm" : "px-6 text-body-slide",
                    // Borde izquierdo de sección para la primera columna
                    cellIndex === 0 &&
                      "border-l-[3px] font-semibold transition-colors duration-300",
                  )}
                  style={
                    cellIndex === 0
                      ? { borderLeftColor: "var(--section-accent)" }
                      : undefined
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {source && <SourceTag>{source}</SourceTag>}
    </figure>
  );
}
