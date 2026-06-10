import Image from "next/image";
import type { SlideData, SlideVisual } from "@/content/slides.types";
import { ComplexityCurve } from "@/components/visuals/ComplexityCurve";
import { McpDiagram } from "@/components/visuals/McpDiagram";
import { RiskPyramid } from "@/components/visuals/RiskPyramid";
import { TriangulationDiagram } from "@/components/visuals/TriangulationDiagram";
import { Bullet } from "@/components/slide/Bullet";
import { CardGrid } from "@/components/slide/CardGrid";
import { DataTable } from "@/components/slide/DataTable";
import { Kpi } from "@/components/slide/Kpi";
import { PortadaBackground } from "@/components/slide/PortadaBackground";
import { SlideKicker } from "@/components/slide/SlideKicker";
import { SlideTitle } from "@/components/slide/SlideTitle";
import { SourceTag } from "@/components/slide/SourceTag";
import { cn } from "@/lib/cn";

type SlideLayout = "text" | "split" | "kpi" | "table";

/** Decide el layout del cuerpo según los campos presentes en el dato. */
function resolveLayout(data: SlideData): SlideLayout {
  if (data.table) return "table";
  const hasDiagramOrImage =
    data.image !== undefined ||
    (data.visual !== undefined &&
      data.visual !== "cards" &&
      data.visual !== "table");
  if (hasDiagramOrImage) return "split";
  if (data.kpi && !data.bullets?.length && !data.cards?.length) return "kpi";
  return "text";
}

/** Diagramas propios (Fase 4); "image" llega como asset en la Fase 5. */
const diagramComponents: Partial<Record<SlideVisual, () => React.JSX.Element>> =
  {
    "complexity-curve": ComplexityCurve,
    "risk-pyramid": RiskPyramid,
    triangulation: TriangulationDiagram,
    mcp: McpDiagram,
  };

/** Marcador para los assets de imagen que se integran en la Fase 5. */
function VisualPlaceholder({ name }: { name: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-video w-full items-center justify-center rounded-card border border-dashed border-border bg-bg-elev/40"
    >
      <span className="text-source uppercase tracking-[0.2em] text-fg-muted">
        {name}
      </span>
    </div>
  );
}

function SlideVisualArea({ data }: { data: SlideData }) {
  if (data.image) {
    return (
      <div className="relative aspect-video w-full" data-reveal>
        <Image
          src={data.image.src}
          alt={data.image.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="rounded-card object-contain"
        />
      </div>
    );
  }
  if (data.visual) {
    const Diagram = diagramComponents[data.visual];
    if (Diagram) {
      return (
        <div className="flex w-full items-center justify-center overflow-hidden">
          <Diagram />
        </div>
      );
    }
    if (data.visual === "image") {
      // Asset de imagen pendiente (Fase 5), con dimensiones declaradas.
      return <VisualPlaceholder name="imagen · Fase 5" />;
    }
  }
  return null;
}

function SlideTextColumn({ data }: { data: SlideData }) {
  return (
    <div className="flex flex-col gap-8">
      {data.kpi && <Kpi {...data.kpi} />}
      {data.bullets && data.bullets.length > 0 && (
        <ul className="flex flex-col gap-5">
          {data.bullets.map((bullet) => (
            <Bullet key={bullet}>{bullet}</Bullet>
          ))}
        </ul>
      )}
      {data.cards && data.cards.length > 0 && <CardGrid cards={data.cards} />}
    </div>
  );
}

function SlideBody({ data, layout }: { data: SlideData; layout: SlideLayout }) {
  if (layout === "table" && data.table) {
    return (
      <div className="flex flex-1 items-center">
        <DataTable {...data.table} />
      </div>
    );
  }
  if (layout === "split") {
    return (
      <div className="grid flex-1 items-center gap-12 lg:grid-cols-2">
        <SlideTextColumn data={data} />
        <SlideVisualArea data={data} />
      </div>
    );
  }
  if (layout === "kpi" && data.kpi) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Kpi {...data.kpi} />
      </div>
    );
  }
  return (
    <div className="flex max-w-5xl flex-1 flex-col justify-center">
      <SlideTextColumn data={data} />
    </div>
  );
}

/**
 * Plantilla única de diapositiva (regla D5: coherencia visual).
 * Zonas fijas: header (kicker/título/subtítulo), cuerpo (layout según
 * datos) y footer (fuente + numeración). La ProgressBar y los controles
 * de navegación viven en el Deck (Fase 3). Los atributos data-reveal
 * marcan la secuencia de entrada que GSAP anima en Fases 3-4.
 */
export function Slide({
  data,
  index,
  total,
}: {
  data: SlideData;
  index: number;
  total: number;
}) {
  const layout = resolveLayout(data);
  return (
    <section
      data-section={data.section}
      data-layout={layout}
      aria-roledescription="diapositiva"
      aria-label={
        data.backup
          ? `Diapositiva de respaldo: ${data.title}`
          : `Diapositiva ${index} de ${total}: ${data.title}`
      }
      className="relative isolate flex h-full w-full flex-col gap-[clamp(1rem,3vh,2.5rem)] bg-bg p-slide text-fg"
    >
      {data.section === "portada" && <PortadaBackground />}
      <header
        className={cn(
          "flex flex-col gap-4",
          layout === "kpi" && "items-center text-center",
        )}
      >
        {data.kicker && (
          <span data-reveal>
            <SlideKicker>{data.kicker}</SlideKicker>
          </span>
        )}
        <span data-reveal>
          <SlideTitle>{data.title}</SlideTitle>
        </span>
        {data.subtitle && (
          <p
            data-reveal
            className="max-w-[55ch] text-subtitle font-normal text-fg-muted"
          >
            {data.subtitle}
          </p>
        )}
      </header>

      <SlideBody data={data} layout={layout} />

      {/* La numeración n/total visible la pone DeckControls (una sola
          fuente); index/total alimentan aquí el aria-label de la slide. */}
      <footer className="flex min-h-6 items-end justify-between gap-4" data-reveal>
        <div>{data.source && <SourceTag>{data.source}</SourceTag>}</div>
      </footer>
    </section>
  );
}
