import { ImageResponse } from "next/og";

export const runtime = "edge";

function getContrast(hex: string) {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 >= 128 ? "#111827" : "#ffffff";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hex = searchParams.get("hex") || "cccccc";
  const name = searchParams.get("name") || "Цвет дня";
  const date = searchParams.get("date") || "";
  const feature = searchParams.get("feature") || "";
  const keywords = searchParams.get("keywords") || "";

  const textColor = getContrast(hex);
  const borderColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";

  return new ImageResponse(
    <div
      style={{
        background: `#${hex}`,
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "40px",
        color: textColor,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          border: `4px solid ${borderColor}`,
          borderRadius: "40px",
          padding: "60px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: 40,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {date}
          </span>
          <span style={{ fontSize: 32, opacity: 0.7, fontFamily: "monospace" }}>
            #{hex.toUpperCase()}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 130,
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            {name}
          </h1>
          <p style={{ fontSize: 40, fontWeight: 500, opacity: 0.9 }}>
            "{feature}"
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: 30,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              opacity: 0.8,
              marginBottom: 40,
            }}
          >
            {keywords}
          </p>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 800 }}>
            Colorstrology.viktoor.ru
          </div>
        </div>
      </div>
    </div>,
    { width: 1080, height: 1080 },
  );
}
