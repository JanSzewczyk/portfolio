import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 192,
  height: 192
};
export const contentType = "image/png";

export default function Icon192() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 96,
        background: "#111111FF",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#EAEAEAFF",
        fontWeight: "bold"
      }}
    >
      JS
    </div>,
    {
      ...size
    }
  );
}
