import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Считываем параметры из URL ссылки
    const title = searchParams.get("title") || "Цвет дня";
    const hex = searchParams.get("hex") || "cccccc"; // Получаем hex БЕЗ решетки
    const subtitle = searchParams.get("subtitle") || "Colorstrology";
    const system = searchParams.get("system") || "colorstrology.ru";

    // Вычисляем контрастный цвет текста
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = yiq >= 128 ? "#111827" : "#ffffff";
    const borderColor =
      yiq >= 128 ? "rgba(17,24,39,0.1)" : "rgba(255,255,255,0.2)";

    return new ImageResponse(
      <div
        style={{
          background: `#${hex}`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: textColor,
          fontFamily: "sans-serif",
          padding: "40px",
        }}
      >
        {/* Внешняя стильная рамка */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            border: `4px solid ${borderColor}`,
            borderRadius: "40px",
            padding: "60px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 32,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.8,
              marginBottom: 20,
            }}
          >
            {subtitle}
          </p>
          <h1
            style={{
              fontSize: 100,
              fontWeight: 900,
              marginBottom: 40,
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 36, opacity: 0.6, letterSpacing: "0.1em" }}>
            HEX: #{hex}
          </p>

          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: 60,
              fontSize: 24,
              fontWeight: "bold",
              opacity: 0.8,
            }}
          >
            {system}
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },
    );
  } catch (e: any) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
