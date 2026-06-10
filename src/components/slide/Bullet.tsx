import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Viñeta de una línea con icono lucide (nunca emoji). */
export function Bullet({
  children,
  icon: Icon = ChevronRight,
}: {
  children: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <li className="flex items-start gap-3 text-body-slide text-fg" data-reveal>
      <Icon
        aria-hidden="true"
        size={24}
        strokeWidth={2}
        className="mt-[0.3em] shrink-0 text-section"
      />
      <span className="max-w-[60ch]">{children}</span>
    </li>
  );
}
