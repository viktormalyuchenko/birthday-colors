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
        padding: "60px 40px",
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
          borderRadius: "60px",
          padding: "80px 60px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 50,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 40,
            opacity: 0.8,
          }}
        >
          {date}
        </span>

        <h1
          style={{
            fontSize: 160,
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 60,
          }}
        >
          {name}
        </h1>

        <div
          style={{
            display: "flex",
            background: borderColor,
            padding: "40px",
            borderRadius: "40px",
            marginBottom: 80,
          }}
        >
          <p
            style={{
              fontSize: 50,
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            "{feature}"
          </p>
        </div>

        <span
          style={{
            fontSize: 40,
            opacity: 0.7,
            fontFamily: "monospace",
            marginBottom: "auto",
          }}
        >
          HEX: #{hex.toUpperCase()}
        </span>

        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          Colorstrology.ru
        </div>
      </div>
    </div>,
    { width: 1080, height: 1920 },
  );
}
