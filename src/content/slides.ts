import type { SlideData } from "@/content/slides.types";

/*
 * PLACEHOLDERS de navegación (Fase 3): solo id, sección, kicker y título,
 * tomados de 05-contenido-diapositivas/guion-de-diapositivas.md.
 * El contenido completo (bullets, KPI, tablas, visuales, notas) se
 * vuelca en la Fase 4. La numeración "n / total" deriva de slides.length.
 */
export const slides: SlideData[] = [
  {
    id: 1,
    section: "portada",
    title: "Gobernanza y Riesgos en la Inteligencia Artificial",
    subtitle: "El impacto de la complejidad técnica",
  },
  {
    id: 2,
    section: "introduccion",
    kicker: "Introducción",
    title: "De herramienta a infraestructura crítica",
  },
  {
    id: 3,
    section: "introduccion",
    kicker: "Problema",
    title: "A mayor complejidad, menor explicabilidad",
  },
  {
    id: 4,
    section: "introduccion",
    kicker: "Pregunta de investigación",
    title: "¿Cómo condiciona la complejidad técnica la necesidad de gobernanza?",
  },
  {
    id: 5,
    section: "objetivos",
    kicker: "Objetivo general",
    title: "Evaluar la relación entre complejidad técnica y gobernanza",
  },
  {
    id: 6,
    section: "objetivos",
    kicker: "Objetivos específicos",
    title: "Tres pasos: describir, analizar, proponer",
  },
  {
    id: 7,
    section: "marco-teorico",
    kicker: "Marco teórico",
    title: "Caja negra y explicabilidad (XAI)",
  },
  {
    id: 8,
    section: "marco-teorico",
    kicker: "Marcos de gobernanza",
    title: "Cuatro referentes internacionales",
  },
  {
    id: 9,
    section: "metodologia",
    kicker: "Metodología",
    title: "Enfoque cualitativo, diseño descriptivo-analítico",
  },
  {
    id: 10,
    section: "metodologia",
    kicker: "Técnicas e instrumentos",
    title: "Triangulación: documentos + expertos",
  },
  {
    id: 11,
    section: "resultados",
    kicker: "Resultados · Objetivo 1",
    title: "Técnicas y habilitadores identificados",
  },
  {
    id: 12,
    section: "resultados",
    kicker: "Resultados · Objetivo 2",
    title: "La opacidad obliga a un enfoque funcional",
  },
  {
    id: 13,
    section: "resultados",
    kicker: "Resultados · Objetivo 3",
    title: "Gobernanza incipiente y cultura reactiva",
  },
  {
    id: 14,
    section: "discusion",
    kicker: "Discusión",
    title: "El puente MCP amplía el valor… y el riesgo",
  },
  {
    id: 15,
    section: "conclusiones",
    kicker: "Conclusiones y recomendaciones",
    title: "De código a norma: gobernanza como requisito",
  },
  {
    id: 16,
    section: "referencias",
    kicker: "Referencias · Cierre",
    title: "Gracias — ¿Preguntas?",
  },
];
