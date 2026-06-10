/**
 * Referencias en APA 7 como datos (ADR-004: el contenido es dato).
 * La lista completa solo se muestra en la slide 16; las citas cortas
 * de cada slide (SourceTag) usan el formato "Autor (año)".
 * Fuente: 05-contenido-diapositivas/guion-de-diapositivas.md.
 */
export interface Reference {
  /** Cita corta usada en los SourceTag, ej. "Floridi (2023)". */
  shortCite: string;
  /** Entrada completa en APA 7 (slide 16). */
  apa: string;
}

export const references: Reference[] = [
  {
    shortCite: "Floridi (2023)",
    apa: "Floridi, L. (2023). The ethics of artificial intelligence. Oxford University Press.",
  },
  {
    shortCite: "NIST (2023)",
    apa: "NIST. (2023). AI Risk Management Framework (AI RMF 1.0). https://doi.org/10.6028/NIST.AI.100-1",
  },
  {
    shortCite: "OCDE (2024)",
    apa: "OCDE. (2024). OECD AI principles (updated 2024). https://oecd.ai/en/ai-principles",
  },
  {
    shortCite: "Suresh & Guttag (2021)",
    apa: "Suresh, H., & Guttag, J. V. (2021). A framework for understanding sources of harm… CACM, 64(12), 36–44. https://doi.org/10.1145/3466298",
  },
  {
    shortCite: "UNESCO (2022)",
    apa: "UNESCO. (2022). Recommendation on the ethics of artificial intelligence.",
  },
  {
    shortCite: "UE (2024)",
    apa: "Unión Europea. (2024). Reglamento (UE) 2024/1689 (AI Act). DOUE.",
  },
];

/** Filas listas para el DataTable de la slide 16. */
export const referencesTableRows: string[][] = references.map((reference) => [
  reference.apa,
]);
