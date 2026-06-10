import type { TableData } from "@/content/slides.types";
import { SourceTag } from "@/components/slide/SourceTag";

/** Tabla de datos con título visible y fuente (regla D4). */
export function DataTable({ caption, source, head, rows }: TableData) {
  return (
    <figure className="flex w-full flex-col gap-4" data-reveal>
      <table className="w-full border-collapse text-left tabular-nums">
        <caption className="caption-top pb-4 text-left font-display text-body-slide font-semibold text-fg">
          {caption}
        </caption>
        <thead>
          <tr>
            {head.map((heading) => (
              <th
                key={heading}
                scope="col"
                className="border-b border-border pb-3 pr-6 text-kicker font-semibold uppercase tracking-[0.12em] text-fg-muted"
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
                  className="border-b border-border/50 py-3 pr-6 text-body-slide text-fg"
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
