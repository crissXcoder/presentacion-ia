import type { ReactNode } from "react";

/** Cita APA corta para apoyos visuales (regla D4), ej. "AI Act UE (2024)". */
export function SourceTag({ children }: { children: ReactNode }) {
  return (
    <p className="text-source text-fg-muted">
      Fuente: <cite className="not-italic">{children}</cite>
    </p>
  );
}
