import type { ReactNode } from "react";

/** Título de la slide: una sola idea, frase corta (regla D3). */
export function SlideTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="max-w-[24ch] text-balance font-display text-slide-title text-fg">
      {children}
    </h1>
  );
}
