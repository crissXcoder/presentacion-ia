import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

/**
 * Título de la slide con soporte para degradado sutil en la portada,
 * revelado animado palabra por palabra, y sombra de texto "eco visual" para el cierre.
 */
export function SlideTitle({
  children,
  isPortada = false,
  isCierre = false,
}: {
  children: ReactNode;
  isPortada?: boolean;
  isCierre?: boolean;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isPortada) return;
      const title = titleRef.current;
      if (!title) return;

      const words = title.querySelectorAll(".word");
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 15, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.08,
            delay: 0.1,
          }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 }
        );
      }
    },
    { scope: titleRef, dependencies: [isPortada] },
  );

  let content = children;
  if (isPortada && typeof children === "string") {
    content = children.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[0.25em] pb-1">
        {word}
      </span>
    ));
  }

  // Cierre: Eco visual mediante sombras multicapa
  const cierreShadows = isCierre
    ? "0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(var(--color-primary), 0.2), 0 4px 24px rgba(0,0,0,0.8)"
    : "0 2px 16px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.4)";

  return (
    <>
      <h1
        ref={titleRef}
        className={cn(
          "max-w-[24ch] text-balance font-display text-slide-title leading-tight tracking-tight transition-all duration-300",
          isPortada
            ? "bg-gradient-to-br from-fg via-fg to-primary/55 bg-clip-text text-transparent"
            : "text-fg",
          isCierre && "relative z-10 scale-[1.05] drop-shadow-2xl"
        )}
        style={{
          textShadow: isPortada ? "none" : cierreShadows,
          perspective: "800px",
        }}
      >
        {isCierre && (
          <span
            className="absolute inset-0 z-[-1] animate-pulse blur-xl opacity-40 bg-gradient-to-t from-primary/40 to-transparent bg-clip-text text-transparent select-none"
            aria-hidden="true"
          >
            {children}
          </span>
        )}
        {content}
      </h1>
      {isPortada && (
        <div
          ref={lineRef}
          className="mt-6 mx-auto h-[1.5px] w-24 bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-0 origin-center"
        />
      )}
    </>
  );
}
