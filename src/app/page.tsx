import type { SlideData } from "@/content/slides.types";
import { Slide } from "@/components/slide/Slide";

/*
 * Página TEMPORAL de validación de la plantilla (Fase 2).
 * Contenido de muestra, NO académico: el contenido real de las 16
 * slides se vuelca en content/slides.ts en la Fase 4. En la Fase 3
 * esta página pasa a redirigir a /slide/1.
 */
const sampleSlides: SlideData[] = [
  {
    id: 1,
    section: "introduccion",
    kicker: "Introducción",
    title: "Layout de solo texto",
    subtitle: "Una columna, bullets de una línea, acento de sección en rojo.",
    bullets: [
      "Primera viñeta de prueba, corta y de una sola línea.",
      "Segunda viñeta para validar el ritmo vertical.",
      "Tercera viñeta: máximo cinco por slide.",
    ],
    notes: "Slide de muestra para validar el layout de texto.",
  },
  {
    id: 2,
    section: "resultados",
    kicker: "Resultados",
    title: "Layout de texto y visual",
    bullets: [
      "Columna izquierda con viñetas.",
      "Columna derecha con el diagrama.",
    ],
    visual: "triangulation",
    source: "Autora de prueba (2026)",
    notes: "Valida el layout de dos columnas con placeholder de diagrama.",
  },
  {
    id: 3,
    section: "discusion",
    kicker: "Discusión",
    title: "Layout de KPI",
    kpi: { value: "66%", label: "cifra de prueba para validar el KPI" },
    source: "Informe de prueba (2026)",
    notes: "Valida el KPI centrado con cifras tabulares.",
  },
  {
    id: 4,
    section: "referencias",
    kicker: "Referencias",
    title: "Layout de tabla",
    table: {
      caption: "Tabla de prueba con título visible",
      source: "Elaboración propia (2026)",
      head: ["Columna A", "Columna B", "Columna C"],
      rows: [
        ["Dato 1", "Valor 1", "Nota 1"],
        ["Dato 2", "Valor 2", "Nota 2"],
        ["Dato 3", "Valor 3", "Nota 3"],
      ],
    },
    notes: "Valida la tabla de ancho completo con caption y fuente.",
  },
  {
    id: 5,
    section: "objetivos",
    kicker: "Objetivos",
    title: "Layout de tarjetas",
    cards: [
      { title: "Tarjeta uno", body: "Cuerpo corto de prueba." },
      { title: "Tarjeta dos", body: "Glass sutil sobre superficie elevada." },
      {
        title: "Tarjeta tres",
        body: "Tres columnas a partir de tres tarjetas.",
      },
    ],
    notes: "Valida Card y CardGrid en una columna ancha.",
  },
];

export default function Home() {
  return (
    <main>
      {sampleSlides.map((slide, slideIndex) => (
        <div key={slide.id} className="h-svh">
          <Slide
            data={slide}
            index={slideIndex + 1}
            total={sampleSlides.length}
          />
        </div>
      ))}
    </main>
  );
}
