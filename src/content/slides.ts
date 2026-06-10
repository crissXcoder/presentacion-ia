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
      "Universidad Nacional, Campus Nicoya · I Ciclo 2026",
      "Métodos de Investigación Científica en Informática",
      "Cristhian Altamirano · Danny Abarca · David Morales",
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
    bullets: [
      "Dimensión técnica: Reducción de la explicabilidad (opacidad).",
      "Dimensión regulatoria: Necesidad de gobernanza y auditorías.",
      "Dimensión ética: Mitigación de riesgos inaceptables.",
    ],
    notes: "Leer la pregunta principal y explicar las tres dimensiones que evalúa la investigación.",
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
    image: {
      src: "/img/caja-negra.webp",
      alt: "Cubo oscuro y opaco que representa la caja negra de la IA: flujos de datos entran por un lado y decisiones salen por el otro sin que el proceso interno sea visible",
    },
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
    kicker: "Conclusiones",
    title: "De código a norma: gobernanza como requisito",
    subtitle:
      "Limitación: estudio cualitativo con 2 expertos; no generalizable.",
    bullets: [
      "IA = agente activo; gran impacto en productividad.",
      "La opacidad exige explicabilidad y auditoría.",
      "La integración avanzada amplía la superficie de ataque.",
    ],
    notes:
      "Responder directo a los 3 objetivos. Reconocer límites (lo pide la guía).",
  },
  {
    id: 16,
    section: "conclusiones",
    kicker: "Recomendaciones",
    title: "Hacia una cultura preventiva y de formación",
    bullets: [
      "Fomentar una cultura preventiva liderada por la alta gerencia.",
      "Formar profesionales que integren habilidades de código y gobernanza.",
      "Establecer directrices internas claras sobre el uso ético y seguro de la IA.",
    ],
    notes:
      "Recomendaciones realistas para la empresa y la academia basadas en los resultados.",
  },
  {
    id: 17,
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
   * se alcanzan por índice o deep-link (/slide/18..21) para la ronda de
   * preguntas. Contenido sintetizado del Capítulo 3 y los Anexos del paper
   * (docs/Grupo 4 Taller 5 - REVISADO.docx), celdas a una línea (regla D1).
   */
  {
    id: 18,
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
          "a · Uso e impacto en el desarrollo",
          "IA fundamental: automatiza tareas y eleva la productividad.",
          "E1: agentes autónomos sobre el proyecto; E2: métrica del 66%.",
        ],
        [
          "b · Complejidad y aprendizaje",
          "Alta complejidad; exige actualización práctica constante.",
          "E1: contexto, skills y rabbit holes; E2: barrera matemática (Transformers).",
        ],
        [
          "c · Integración empresarial",
          "El valor real surge al integrarse con la arquitectura existente.",
          "E1: MCP para estructurar y bajar costo de tokens; E2: caso real de consulta de datos privados.",
        ],
        [
          "d · Riesgos y limitaciones",
          "No son infalibles; falsa sensación de seguridad con acceso amplio.",
          "E1: inyección de prompts, filtración, dependencias; E2: desfase del mercado laboral.",
        ],
        [
          "e · Gobernanza y gestión de riesgos",
          "Gobernanza corporativa incipiente, madurez muy temprana.",
          "E1: seguridad vista como gasto (postura reactiva); E2: devs desvinculados de la gobernanza.",
        ],
      ],
    },
    notes:
      "Detalle de la matriz por categorías a–e del Capítulo 3. E1/E2 = Entrevistado 1 y 2.",
  },
  {
    id: 19,
    backup: true,
    section: "metodologia",
    kicker: "Respaldo · B2",
    title: "Cuadro de variables",
    table: {
      caption: "Operacionalización: objetivos, variables e instrumentos",
      source: "Anexos del paper",
      head: ["Objetivo", "Variable", "Indicadores", "Técnica", "Instrumento"],
      rows: [
        [
          "General · Evaluar",
          "Complejidad técnica de la IA",
          "Profundidad de modelos, parámetros, opacidad algorítmica",
          "Análisis cualitativo integral",
          "Triangulación: documental + entrevistas",
        ],
        [
          "1 · Describir",
          "Complejidad estructural de la IA",
          "Tipos de modelos, uso de datos, infraestructura",
          "Análisis documental",
          "Revisión de fuentes académicas",
        ],
        [
          "2 · Analizar",
          "Opacidad algorítmica",
          "«Caja negra», dificultad de interpretación, explicabilidad",
          "Entrevistas a expertos",
          "Guía de entrevista semiestructurada",
        ],
        [
          "3 · Proponer",
          "Gobernanza de la IA",
          "Regulación, prácticas éticas, auditoría y control",
          "Análisis cualitativo de entrevistas",
          "Sistematización de aportes",
        ],
      ],
    },
    notes:
      "Cuadro de variables completo de los Anexos: operacionaliza objetivos → variables → indicadores → técnica → instrumento.",
  },
  {
    id: 20,
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
    id: 21,
    backup: true,
    section: "metodologia",
    kicker: "Respaldo · B4",
    title: "Guía de entrevista (5 secciones)",
    bullets: [
      "1 · Contexto profesional y evolución de la IA.",
      "2 · Complejidad técnica de la Inteligencia Artificial.",
      "3 · Explicabilidad y toma de decisiones.",
      "4 · Riesgos asociados a la IA.",
      "5 · Gobernanza y contexto nacional.",
    ],
    subtitle: "Aplicada a 2 expertos (juicio) · 30–60 min · presencial o virtual",
    source: "Anexos del paper",
    notes:
      "Instrumento semiestructurado con preguntas abiertas por sección + complementarias opcionales; respuestas registradas con consentimiento.",
  },
];

/** Slides del flujo principal (numeración n/16, ProgressBar, flechas). */
export const mainSlides: SlideData[] = slides.filter((slide) => !slide.backup);

/** Total visible en la numeración (regla D6): solo el flujo principal. */
export const MAIN_TOTAL = mainSlides.length;
