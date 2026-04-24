import colorsData from "@/data/birthday_colors.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShareModal from "@/components/ShareModal";
import ColorDataGrid from "@/components/ColorDataGrid";

function getContrastColor(hexcolor: string) {
  if (!hexcolor) return "#111827";
  const hex = hexcolor.replace("#", "");
  if (hex.length !== 6) return "#111827";

  // ТЕПЕРЬ ВЫРЕЗАЕМ ПРАВИЛЬНО: от 0 до 2, от 2 до 4, от 4 до 6
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#111827" : "#ffffff";
}

const MONTH_DECLENSIONS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const colorInfo = (colorsData as any)[resolvedParams.id];
  if (!colorInfo) return { title: "Цвет не найден" };
  const day = parseInt(colorInfo.date.split("-")[1], 10);
  const month =
    MONTH_DECLENSIONS[parseInt(colorInfo.date.split("-")[0], 10) - 1];
  return {
    title: `${day} ${month} — ${colorInfo.ru_name} | Colorstrology`,
    description: colorInfo.ru_description,
  };
}

export default async function ColorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const colorInfo = (colorsData as any)[resolvedParams.id];
  if (!colorInfo) notFound();

  const day = parseInt(colorInfo.date.split("-")[1], 10);
  const month =
    MONTH_DECLENSIONS[parseInt(colorInfo.date.split("-")[0], 10) - 1];
  const dateText = `${day} ${month}`;

  const textColor = getContrastColor(colorInfo.hex);
  const borderColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(17,24,39,0.1)";
  const glassBgColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)";

  return (
    <main
      className="min-h-screen flex flex-col items-center p-4 lg:p-12 transition-colors duration-500"
      style={{ backgroundColor: colorInfo.hex || "#f3f4f6" }}
    >
      <div
        className="w-full max-w-5xl relative z-10 pt-8"
        style={{ color: textColor }}
      >
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 pb-1 hover:opacity-60 transition-opacity font-medium"
            style={{ borderBottom: `1px solid ${borderColor}` }}
          >
            ← В календарь
          </Link>
        </div>

        <div className="text-center mb-12">
          {/* Явное применение цвета текста, убрал opacity, чтобы избежать глюков прозрачности */}
          <h3
            className="text-xl md:text-3xl font-light mb-4 uppercase tracking-widest"
            style={{ color: textColor }}
          >
            {dateText}
          </h3>
          {/* Убрал drop-shadow, так как белый drop-shadow на белом фоне давал эффект свечения */}
          <h1
            className="text-5xl sm:text-7xl lg:text-9xl font-black mb-4 tracking-tighter font-serif"
            style={{ color: textColor }}
          >
            {colorInfo.ru_name}
          </h1>
          <h2
            className="text-2xl md:text-4xl font-light font-serif italic"
            style={{ color: textColor }}
          >
            {colorInfo.en_name}
          </h2>
        </div>

        <div
          className="text-center text-xl md:text-3xl font-medium mb-12 p-8 rounded-3xl backdrop-blur-md"
          style={{
            border: `1px solid ${borderColor}`,
            backgroundColor: glassBgColor,
            color: textColor,
          }}
        >
          "{colorInfo.ru_feature}"
        </div>

        {/* Остальные блоки аналогично с жестким цветом */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className="md:col-span-2 p-8 rounded-3xl backdrop-blur-md"
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: glassBgColor,
            }}
          >
            <h3
              className="text-2xl font-bold mb-4 font-serif"
              style={{ color: textColor }}
            >
              Психология цвета
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: textColor }}>
              {colorInfo.ru_description}
            </p>
          </div>
          <div
            className="p-8 rounded-3xl backdrop-blur-md flex flex-col justify-center"
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: glassBgColor,
            }}
          >
            <h3
              className="text-xl font-bold mb-4 font-serif"
              style={{ color: textColor }}
            >
              Ключевые черты:
            </h3>
            <div className="flex flex-wrap gap-2">
              {colorInfo.ru_keywords.map((word: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: glassBgColor,
                    border: `1px solid ${borderColor}`,
                    color: textColor,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8 rounded-3xl backdrop-blur-md"
          style={{
            border: `1px solid ${borderColor}`,
            backgroundColor: glassBgColor,
          }}
        >
          <ColorDataGrid
            hex={colorInfo.hex}
            rgb={colorInfo.rgb}
            cmyk={colorInfo.cmyk}
            hsb={colorInfo.hsb}
            textColor={textColor}
          />
          <ShareModal
            colorHex={colorInfo.hex || "#cccccc"}
            colorName={colorInfo.ru_name}
            colorEnName={colorInfo.en_name}
            dateText={dateText}
            textColor={textColor}
            feature={colorInfo.ru_feature}
          />
        </div>
      </div>
    </main>
  );
}
