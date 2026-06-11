import { resolveMotif } from "@/components/motifs/registry";
import { cn } from "@/lib/cn";

/**
 * Renderiza el motivo de una slide integrado en la composición (R3).
 * El contenedor define tamaño/posición; el motivo llena su caja.
 * Decorativo: aria-hidden y sin eventos.
 */
export function MotifFigure({ id, className }: { id: number; className?: string }) {
  const Motif = resolveMotif(id);
  if (!Motif) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none flex h-full w-full items-center justify-center select-none", className)}
    >
      <Motif className="h-full w-full" />
    </div>
  );
}
