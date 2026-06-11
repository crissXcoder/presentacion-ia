import type { SlideData } from "@/content/slides.types";
import { SlideKicker } from "@/components/slide/SlideKicker";
import { SlideTitle } from "@/components/slide/SlideTitle";
import { cn } from "@/lib/cn";

/**
 * Header de slide (kicker + título + subtítulo) reutilizable entre el
 * layout estructurado y las variantes (R3). Mantiene los wrappers
 * data-reveal para el reveal escalonado del Deck.
 */
export function SlideHeader({
  data,
  align = "left",
  highlight = false,
  titleClassName,
}: {
  data: SlideData;
  align?: "left" | "center";
  highlight?: boolean;
  titleClassName?: string;
}) {
  const isPortada = data.section === "portada";
  // La portada conserva su reveal palabra-por-palabra (SlideTitle) y un
  // título mayor (text-display); el resto usa el clip-path "title" de R4.
  const resolvedTitleClassName =
    titleClassName ?? (isPortada ? "text-display" : undefined);
  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center mx-auto",
      )}
    >
      {data.kicker && (
        <div data-reveal>
          <SlideKicker>{data.kicker}</SlideKicker>
        </div>
      )}
      <div data-reveal={isPortada ? "" : "title"}>
        <SlideTitle
          isPortada={isPortada}
          isCierre={data.section === "referencias"}
          highlightKeywords={highlight}
          className={resolvedTitleClassName}
        >
          {data.title}
        </SlideTitle>
      </div>
      {data.subtitle && (
        <p
          data-reveal
          className="max-w-[55ch] text-subtitle font-normal text-fg-muted"
        >
          {data.subtitle}
        </p>
      )}
    </header>
  );
}
