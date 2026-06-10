import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Gobernanza y Riesgos en la IA · Presentación web interactiva";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          backgroundColor: "#0b1020",
          padding: "72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* accent bar */}
        <div
          style={{
            display: "flex",
            width: "64px",
            height: "4px",
            backgroundColor: "#4f7cff",
            marginBottom: "32px",
            borderRadius: "2px",
          }}
        />
        {/* kicker */}
        <div
          style={{
            display: "flex",
            fontSize: "18px",
            fontWeight: 600,
            color: "#4f7cff",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          EIF 413 · UNA Campus Nicoya · I Ciclo 2026
        </div>
        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: "60px",
            fontWeight: 700,
            color: "#f2f5ff",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Gobernanza y Riesgos en la Inteligencia Artificial
        </div>
        {/* subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#a7b0c8",
            lineHeight: 1.3,
          }}
        >
          El impacto de la complejidad técnica
        </div>
      </div>
    ),
    { ...size },
  );
}
