import { referencesTableRows } from "@/content/references";
import type { SlideData } from "@/content/slides.types";

/*
 * Contenido real de las 16 diapositivas + 4 de respaldo (Fase 4).
 * Fuente textual: 05-contenido-diapositivas/guion-de-diapositivas.md
 * (contenido académico fijo: no se reescribe la investigación).
 * Correcciones del glosario aplicadas: "auditables", sigla "OCDE".
 * `notes` = guion del expositor (modo presentador); no se ve en pantalla.
 */
export const slides: SlideData[] = [
  {
    id: 1,
    section: "portada",
    title: "Gobernanza y Riesgos en la Inteligencia Artificial",
    subtitle: "El impacto de la complejidad técnica",
    bullets: [
      "Cristhian Altamirano · Danny Abarca · David Morales",
      "EIF 413 — Métodos de Investigación Científica en Informática",
      "Universidad Nacional, Campus Nicoya · I Ciclo 2026",
    ],
    notes:
      "Saludo, presentación del equipo, anunciar el tema y que la exposición sigue el orden de la investigación.",
  },
  {
    id: 2,
    section: "introduccion",
    kicker: "Introducción",
    title: "De herramienta a infraestructura crítica",
    bullets: [
      "La IA dejó de ser un apoyo aislado.",
      "Hoy es núcleo de la infraestructura digital global.",
      "La impulsan Deep Learning, Transformers y modelos generativos.",
    ],
    notes:
      "Enmarcar el avance acelerado y sus habilitadores (cómputo, datos, conectividad, talento).",
  },
  {
    id: 3,
    section: "introduccion",
    kicker: "Problema",
    title: "A mayor complejidad, menor explicabilidad",
    subtitle: "El fenómeno de la «caja negra»",
    bullets: [
      "Más precisión → menos trazabilidad de las decisiones.",
      "La innovación supera a los marcos regulatorios.",
      "La opacidad pasa de límite técnico a barrera ética.",
    ],
    visual: "complexity-curve",
    source: "Floridi (2023); OCDE (2024)",
    notes:
      "Aquí está el corazón del problema. La curva muestra la relación inversa.",
  },
  {
    id: 4,
    section: "introduccion",
    kicker: "Pregunta de investigación",
    title: "¿Cómo condiciona la complejidad técnica la necesidad de gobernanza?",
    subtitle:
      "¿De qué manera la complejidad técnica de los modelos de IA reduce su explicabilidad y en qué medida esto fundamenta la necesidad de políticas de gobernanza y auditoría eficaces para mitigar riesgos inaceptables?",
    notes: "Leer la pregunta una vez, con calma. Es el eje de todo.",
  },
  {
    id: 5,
    section: "objetivos",
    kicker: "Objetivo general",
    title: "Evaluar la relación entre complejidad técnica y gobernanza",
    bullets: [
      "Mediante técnicas de análisis cualitativo.",
      "Para comprender explicabilidad, supervisión y auditoría eficaces.",
    ],
    notes: "Es el norte. Los específicos lo desglosan.",
  },
  {
    id: 6,
    section: "objetivos",
    kicker: "Objetivos específicos",
    title: "Tres pasos: describir, analizar, proponer",
    visual: "cards",
    cards: [
      {
        title: "Describir",
        body: "Las técnicas de IA y sus habilitadores (análisis documental).",
      },
      {
        title: "Analizar",
        body: "Cómo la complejidad reduce la explicabilidad (entrevistas; clasificar riesgos).",
      },
      {
        title: "Proponer",
        body: "Lineamientos de gobernanza de datos, ética y políticas institucionales.",
      },
    ],
    notes:
      "Cada objetivo guía una parte de los resultados. Anunciar que volveremos a ellos.",
  },
  {
    id: 7,
    section: "marco-teorico",
    kicker: "Marco teórico",
    title: "Caja negra y explicabilidad (XAI)",
    bullets: [
      "Deep Learning y Transformers → opacidad algorítmica.",
      "XAI: interpretar y trazar decisiones.",
      "Sin gobernanza desde el diseño, los sesgos se amplifican.",
    ],
    visual: "image",
    source: "Floridi (2023); Suresh & Guttag (2021)",
    notes: "Síntesis, no leer definiciones largas (regla de la guía).",
  },
  {
    id: 8,
    section: "marco-teorico",
    kicker: "Marcos de gobernanza",
    title: "Cuatro referentes internacionales",
    visual: "cards",
    cards: [
      {
        title: "OCDE (2019, rev. 2024)",
        body: "IA confiable; transparencia y rendición de cuentas.",
        source: "OCDE (2024)",
      },
      {
        title: "NIST AI RMF (2023/2024)",
        body: "Govern · Map · Measure · Manage.",
        source: "NIST (2023)",
      },
      {
        title: "UNESCO (2022)",
        body: "Auditoría sostenible y no discriminación.",
        source: "UNESCO (2022)",
      },
      {
        title: "AI Act UE (2024)",
        body: "Riesgo escalonado; obligaciones por nivel.",
        source: "UE (2024)",
      },
    ],
    notes:
      "Convergen en hacer visible, controlable y auditable la complejidad técnica.",
  },
  {
    id: 9,
    section: "metodologia",
    kicker: "Metodología",
    title: "Enfoque cualitativo, diseño descriptivo-analítico",
    bullets: [
      "Fase descriptiva: caracterizar técnicas y habilitadores.",
      "Fase analítica: relación complejidad ↔ explicabilidad ↔ riesgos.",
      "No busca generalizar; busca comprender en profundidad.",
    ],
    notes:
      "Justificar por qué cualitativo: el fenómeno es interpretativo (explicabilidad, opacidad).",
  },
  {
    id: 10,
    section: "metodologia",
    kicker: "Técnicas e instrumentos",
    title: "Triangulación: documentos + expertos",
    bullets: [
      "Análisis documental: OCDE, NIST, UNESCO, AI Act.",
      "Entrevista semiestructurada (guía por categorías).",
      "Muestra: 2 expertos (muestreo por juicio).",
    ],
    visual: "triangulation",
    source: "Elaboración propia",
    notes:
      "Aclarar que n=2 es coherente con el enfoque cualitativo: profundidad, no representatividad.",
  },
  {
    id: 11,
    section: "resultados",
    kicker: "Resultados · Objetivo 1",
    title: "Técnicas y habilitadores identificados",
    bullets: [
      "Asistentes de código y agentes autónomos.",
      "Protocolo MCP para integrar datos privados.",
      "Habilitadores: hardware, contexto, costo de tokens.",
    ],
    source: "Entrevistas; OCDE (2024), NIST (2023)",
    notes: 'Triangula con la función "Map" del NIST: entender antes de regular.',
  },
  {
    id: 12,
    section: "resultados",
    kicker: "Resultados · Objetivo 2",
    title: "La opacidad obliga a un enfoque funcional",
    kpi: {
      value: "66%",
      label: "reducción de tiempo en tareas de desarrollo (caso reportado)",
    },
    bullets: [
      "Se prioriza usar sobre entender.",
      "Riesgos: comportamientos erráticos y rabbit holes.",
    ],
    source: "Entrevistas; Floridi (2023); AI Act UE (2024)",
    notes: "El 66% impacta, pero matizar: dato de un caso, no generalizable.",
  },
  {
    id: 13,
    section: "resultados",
    kicker: "Resultados · Objetivo 3",
    title: "Gobernanza incipiente y cultura reactiva",
    bullets: [
      "Seguridad vista como gasto, no inversión.",
      "Devs delegan la ética a la gerencia.",
      "Falta de políticas internas preventivas.",
    ],
    source: "Entrevistas; UNESCO (2022); NIST (2023)",
    notes: "Esto sustenta el tercer objetivo: la urgencia de lineamientos.",
  },
  {
    id: 14,
    section: "discusion",
    kicker: "Discusión",
    title: "El puente MCP amplía el valor… y el riesgo",
    bullets: [
      "Conecta modelos con datos privados del negocio.",
      "Abre vectores: inyección de prompts, fuga de datos.",
      "Persiste la desarticulación técnico-estratégica.",
    ],
    visual: "mcp",
    source: "Entrevistas; AI Act UE (2024)",
    notes:
      "Contrastar hallazgos con el marco: la teoría de la caja negra se confirma en campo.",
  },
  {
    id: 15,
    section: "conclusiones",
    kicker: "Conclusiones y recomendaciones",
    title: "De código a norma: gobernanza como requisito",
    subtitle:
      "Limitación: estudio cualitativo con 2 expertos; no generalizable.",
    bullets: [
      "IA = agente activo; gran impacto en productividad.",
      "La opacidad exige explicabilidad y auditoría.",
      "La integración avanzada amplía la superficie de ataque.",
      "Recomendación: cultura preventiva liderada por gerencia.",
      "Formar profesionales que integren código y gobernanza.",
    ],
    notes:
      "Responder directo a los 3 objetivos. Reconocer límites (lo pide la guía).",
  },
  {
    id: 16,
    section: "referencias",
    kicker: "Referencias · Cierre",
    title: "Gracias — ¿Preguntas?",
    table: {
      caption: "Referencias principales (APA 7)",
      head: ["Referencia"],
      rows: referencesTableRows,
    },
    notes:
      "Reafirmar el mensaje central (la gobernanza es requisito, no adorno) e invitar a preguntas.",
  },

  /*
   * Slides de respaldo (B1–B4): misma plantilla, fuera del flujo principal;
   * se alcanzan por índice o deep-link (/slide/17..20) para la ronda de
   * preguntas. Las celdas marcadas "(anexo del paper)" esperan el dato
   * exacto del anexo de la investigación; no se inventa contenido académico.
   */
  {
    id: 17,
    backup: true,
    section: "resultados",
    kicker: "Respaldo · B1",
    title: "Matriz de concordancias y divergencias",
    table: {
      caption: "Categorías a–e: concordancias y divergencias entre expertos",
      source: "Elaboración propia (entrevistas)",
      head: ["Categoría", "Concordancia", "Divergencia"],
      rows: [
        [
          "a–c · Técnicas y habilitadores",
          "Asistentes de código, agentes autónomos y MCP como técnicas centrales.",
          "(anexo del paper)",
        ],
        [
          "d · Opacidad y explicabilidad",
          "Se prioriza usar sobre entender; riesgos erráticos y rabbit holes.",
          "(anexo del paper)",
        ],
        [
          "e · Gobernanza y cultura",
          "Gobernanza incipiente; seguridad vista como gasto.",
          "(anexo del paper)",
        ],
      ],
    },
    notes:
      "Detalle de la matriz por categorías a–e. Completar las divergencias con el anexo del paper antes de exponer.",
  },
  {
    id: 18,
    backup: true,
    section: "metodologia",
    kicker: "Respaldo · B2",
    title: "Cuadro de variables",
    table: {
      caption: "Operacionalización: objetivos, variables e instrumentos",
      source: "Anexo del paper",
      head: ["Objetivo", "Variable", "Indicadores", "Técnica", "Instrumento"],
      rows: [
        [
          "Describir",
          "(anexo del paper)",
          "(anexo del paper)",
          "Análisis documental",
          "Ficha de análisis",
        ],
        [
          "Analizar",
          "(anexo del paper)",
          "(anexo del paper)",
          "Entrevista semiestructurada",
          "Guía de entrevista",
        ],
        [
          "Proponer",
          "(anexo del paper)",
          "(anexo del paper)",
          "Triangulación",
          "Matriz de análisis",
        ],
      ],
    },
    notes:
      "Cuadro de variables completo del anexo. Completar variables e indicadores con el paper antes de exponer.",
  },
  {
    id: 19,
    backup: true,
    section: "discusion",
    kicker: "Respaldo · B3",
    title: "Escalera de riesgo del AI Act",
    visual: "risk-pyramid",
    bullets: [
      "Cuatro niveles con obligaciones proporcionales al riesgo.",
      "El nivel inaceptable se prohíbe; el alto exige auditoría.",
    ],
    source: "UE (2024)",
    notes:
      "Apoyo para preguntas sobre clasificación de riesgos: inaceptable → alto → limitado → mínimo.",
  },
  {
    id: 20,
    backup: true,
    section: "metodologia",
    kicker: "Respaldo · B4",
    title: "Guía de entrevista (5 secciones)",
    bullets: [
      "Instrumento semiestructurado en 5 secciones temáticas.",
      "Sección 1–5: (anexo del paper).",
      "Aplicada a 2 expertos seleccionados por juicio.",
    ],
    source: "Anexo del paper",
    notes:
      "Listar las 5 secciones temáticas del instrumento. Completar los nombres con el anexo del paper antes de exponer.",
  },
];

/** Slides del flujo principal (numeración n/16, ProgressBar, flechas). */
export const mainSlides: SlideData[] = slides.filter((slide) => !slide.backup);

/** Total visible en la numeración (regla D6): solo el flujo principal. */
export const MAIN_TOTAL = mainSlides.length;
