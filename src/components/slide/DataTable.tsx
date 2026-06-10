import type { TableData } from "@/content/slides.types";
import { SourceTag } from "@/components/slide/SourceTag";
import { cn } from "@/lib/cn";

/** Tabla de datos con título visible y fuente (regla D4). */
export function DataTable({
  caption,
  source,
  head,
  rows,
  compact = false,
}: TableData & { compact?: boolean }) {
  return (
    <figure className={cn("flex w-full flex-col", compact ? "gap-2" : "gap-4")} data-reveal>
      <table className="w-full border-collapse text-left tabular-nums">
        <caption
          className={cn(
            "caption-top text-left font-display font-semibold text-fg",
            compact ? "pb-2 text-sm" : "pb-4 text-body-slide",
          )}
        >
          {caption}
        </caption>
        <thead>
          <tr>
            {head.map((heading) => (
              <th
                key={heading}
                scope="col"
                className={cn(
                  "border-b border-border font-semibold uppercase tracking-[0.12em] text-fg-muted",
                  compact ? "pb-2 pr-4 text-xs" : "pb-3 pr-6 text-kicker",
                )}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cellIndex}-${cell}`}
                  className={cn(
                    "border-b border-border/50 text-fg",
                    compact ? "py-2 pr-4 text-sm" : "py-3 pr-6 text-body-slide",
                  )}
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
