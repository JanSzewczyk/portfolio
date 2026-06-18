import { ImageResponse } from "next/og";

// No edge runtime: the image is fully static, so let Next prerender it at build time
// (edge runtime forces dynamic generation on every request).

export const size = {
  height: 630,
  width: 1200
};

export const contentType = "image/png";

export const alt = "Jan Szewczyk - Frontend Engineer Portfolio";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #111111 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, sans-serif",
        height: "100%",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "64px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1
          }}
        >
          Jan Szewczyk
        </div>
        <div
          style={{
            color: "#a0a0b8",
            fontSize: "28px",
            fontWeight: 400,
            letterSpacing: "0.05em",
            textTransform: "uppercase" as const
          }}
        >
          Frontend Engineer
        </div>
        <div
          style={{
            color: "#6b6b80",
            fontSize: "18px",
            letterSpacing: "0.02em",
            marginTop: "24px"
          }}
        >
          janszewczyk.dev
        </div>
      </div>
    </div>,
    {
      ...size
    }
  );
}
