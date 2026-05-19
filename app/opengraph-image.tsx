import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Jan Szewczyk - Frontend Engineer Portfolio";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #111111 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Jan Szewczyk
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            color: "#a0a0b8",
            letterSpacing: "0.05em",
            textTransform: "uppercase" as const,
          }}
        >
          Frontend Engineer
        </div>
        <div
          style={{
            marginTop: "24px",
            fontSize: "18px",
            color: "#6b6b80",
            letterSpacing: "0.02em",
          }}
        >
          janszewczyk.com
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
