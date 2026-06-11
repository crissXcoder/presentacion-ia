import type { FC } from "react";
import type { SlideMotif } from "@/content/slides.types";
import { motifForSlide } from "@/design/slideMotifs";
import type { MotifProps } from "@/components/motifs/MotifProps";
import { NeuralNetMotif } from "@/components/motifs/NeuralNetMotif";
import { DataFlowMotif } from "@/components/motifs/DataFlowMotif";
import { QuestionGlyphMotif } from "@/components/motifs/QuestionGlyphMotif";
import { TargetMotif } from "@/components/motifs/TargetMotif";
import { LayersMotif } from "@/components/motifs/LayersMotif";
import { ShieldGridMotif } from "@/components/motifs/ShieldGridMotif";
import { TimelineRailMotif } from "@/components/motifs/TimelineRailMotif";
import { ConcentricMotif } from "@/components/motifs/ConcentricMotif";
import { BigNumberMotif } from "@/components/motifs/BigNumberMotif";

/** Registro motivo → componente (fuente única del dispatcher). */
export const motifComponents: Record<SlideMotif, FC<MotifProps> | null> = {
  "neural-net": NeuralNetMotif,
  "data-flow": DataFlowMotif,
  "question-glyph": QuestionGlyphMotif,
  target: TargetMotif,
  layers: LayersMotif,
  "shield-grid": ShieldGridMotif,
  "timeline-rail": TimelineRailMotif,
  concentric: ConcentricMotif,
  "big-number": BigNumberMotif,
  none: null,
};

/** Componente de motivo de una slide por su `id`, o null si es "none". */
export function resolveMotif(id: number): FC<MotifProps> | null {
  return motifComponents[motifForSlide(id)];
}
