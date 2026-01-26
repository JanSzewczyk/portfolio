import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 100,
        background: "linear-gradient(135deg, #111111 0%, #333333 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontFamily: "system-ui, -apple-system, sans-serif",
        borderRadius: "20%"
      }}
    >
      JS
    </div>,
    {
      ...size
    }
  );
}
