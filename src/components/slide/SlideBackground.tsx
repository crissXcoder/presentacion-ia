"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import type { SlideSection } from "@/content/slides.types";
import { prefersReducedMotion } from "@/components/motion/reveal";

interface SlideBackgroundProps {
  section: SlideSection;
}

/**
 * Componente global de partículas flotantes animadas con GSAP.
 * Solo se renderiza en 'portada' y 'conclusiones'.
 * Respeta 'prefers-reduced-motion' haciendo las partículas estáticas.
 */
function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generamos un set fijo de partículas con posiciones y opacidades aleatorias
  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: i % 2 === 0 ? 5 : 8, // Tamaños alternados: 5px y 8px
    left: `${(i * 12 + 7) % 100}%`,
    top: `${(i * 17 + 13) % 100}%`,
    color: i % 3 === 0 ? "var(--color-primary)" : "var(--section-accent)",
    opacity: i % 2 === 0 ? 0.16 : 0.22,
  }));

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const elParticles = containerRef.current?.querySelectorAll("[data-particle]");
      if (!elParticles) return;

      elParticles.forEach((el, index) => {
        // Asignamos una deriva lenta con tiempos desfasados
        gsap.to(el, {
          xPercent: index % 2 === 0 ? "random(30, 80)" : "random(-80, -30)",
          yPercent: index % 2 === 0 ? "random(-80, -30)" : "random(30, 80)",
          duration: 15 + (index % 4) * 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          data-particle
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            opacity: p.opacity,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Componente que renderiza el fondo dinámico de cada slide.
 * Contiene mesh gradients, grano de ruido, texturas técnicas (SVG grids),
 * partículas flotantes y acentos de esquina (corner frames).
 */
export function SlideBackground({ section }: SlideBackgroundProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || section !== "portada") return;

      // Animación lenta de los halos de la portada
      gsap.to("[data-halo='primary']", {
        xPercent: 6,
        yPercent: -4,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to("[data-halo='accent']", {
        xPercent: -5,
        yPercent: 6,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: scopeRef, dependencies: [section] }
  );

  // Renderizado del Mesh Gradient / Glow sutil localizado según la sección
  const renderMeshGlow = () => {
    switch (section) {
      case "portada":
        return (
          <>
            <div
              data-halo="primary"
              className="absolute -top-[20%] left-[-12%] h-[70vh] w-[55vw] rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, var(--color-primary), transparent)",
              }}
            />
            <div
              data-halo="accent"
              className="absolute -bottom-[25%] right-[-10%] h-[60vh] w-[45vw] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, var(--color-accent), transparent)",
              }}
            />
          </>
        );
      case "introduccion":
        return (
          <div
            className="absolute -top-[10%] -right-[10%] h-[50vh] w-[40vw] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, var(--section-accent), transparent)",
            }}
          />
        );
      case "objetivos":
        return (
          <div
            className="absolute -top-[15%] left-[30%] h-[45vh] w-[40vw] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, var(--section-accent), transparent)",
            }}
          />
        );
      case "marco-teorico":
        return (
          <>
            <div
              className="absolute -top-[10%] -left-[10%] h-[45vh] w-[35vw] rounded-full opacity-[0.16] blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, var(--section-accent), transparent)",
              }}
            />
            <div
              className="absolute -bottom-[15%] -right-[10%] h-[45vh] w-[35vw] rounded-full opacity-[0.16] blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, var(--color-primary), transparent)",
              }}
            />
          </>
        );
      case "metodologia":
        return (
          <div
            className="absolute top-[20%] -left-[15%] h-[55vh] w-[35vw] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, var(--section-accent), transparent)",
            }}
          />
        );
      case "resultados":
        return (
          <div
            className="absolute -bottom-[15%] -right-[10%] h-[55vh] w-[40vw] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, var(--section-accent), transparent)",
            }}
          />
        );
      case "discusion":
        return (
          <div
            className="absolute -top-[15%] -left-[10%] h-[50vh] w-[40vw] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, var(--section-accent), transparent)",
            }}
          />
        );
      case "conclusiones":
        return (
          <div
            className="absolute top-[10%] left-[25%] h-[60vh] w-[50vw] rounded-full opacity-[0.20] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, var(--section-accent), transparent)",
            }}
          />
        );
      case "referencias":
        return (
          <div
            className="absolute -bottom-[20%] left-[30%] h-[40vh] w-[40vw] rounded-full opacity-[0.15] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, var(--section-accent), transparent)",
            }}
          />
        );
      default:
        return null;
    }
  };

  // Renderizado del patrón SVG (Grid técnica, dot grid, etc.) según sección
  const renderPatternGrid = () => {
    switch (section) {
      case "portada":
      case "objetivos":
      case "conclusiones":
        return (
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.12] pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="dot-grid-standard"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" className="fill-border" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid-standard)" />
          </svg>
        );
      case "marco-teorico":
        return (
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.13] pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="dot-grid-dense"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1.5" cy="1.5" r="0.75" className="fill-border" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid-dense)" />
          </svg>
        );
      case "introduccion":
        return (
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.11] pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="horizontal-lines"
                width="100"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="0"
                  className="stroke-border"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#horizontal-lines)" />
          </svg>
        );
      case "metodologia":
        return (
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.11] pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="crossed-lines"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="120"
                  className="stroke-border"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="120"
                  y2="0"
                  className="stroke-border"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crossed-lines)" />
          </svg>
        );
      case "resultados":
        return (
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.14] pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="dot-grid-results"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.2" className="fill-border" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid-results)" />
          </svg>
        );
      case "discusion":
        return (
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.11] pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="diagonal-lines"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="60"
                  y2="60"
                  className="stroke-border"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
          </svg>
        );
      default:
        return null;
    }
  };

  const showParticles = section === "portada" || section === "conclusiones";

  return (
    <div
      ref={scopeRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden select-none bg-bg"
    >
      {/* 1. Mesh Gradients / Glows */}
      {renderMeshGlow()}

      {/* 2. Patrones de Redes Técnicas */}
      {renderPatternGrid()}

      {/* 3. Partículas de Deriva Lenta (si corresponde) */}
      {showParticles && <ParticleBackground />}

      {/* 4. Ruido / Grano Global */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03] pointer-events-none">
        <filter id="global-noise-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#global-noise-grain)" />
      </svg>

      {/* 5. Esquinas Decorativas (Corner Accents) enmarcando la diapositiva */}
      <div className="absolute inset-[clamp(1.5rem,3vw,3.5rem)] pointer-events-none">
        {/* Superior Izquierda */}
        <div
          className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 opacity-25 transition-colors duration-300"
          style={{ borderColor: "var(--section-accent)" }}
        />
        {/* Inferior Derecha */}
        <div
          className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 opacity-25 transition-colors duration-300"
          style={{ borderColor: "var(--section-accent)" }}
        />
      </div>
    </div>
  );
}
