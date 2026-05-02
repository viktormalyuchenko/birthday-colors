import colorsData from "@/data/birthday_colors.json";
import colorsExtensions from "@/data/japanese_extensions.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShareModal from "@/components/ShareModal";
import ColorDataGrid from "@/components/ColorDataGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  const prettyDate = `${day} ${month}`;

  // Убираем решетку из HEX для передачи в URL
  const cleanHex = (colorInfo.hex || "cccccc").replace("#", "");

  return {
    title: `${prettyDate} — Цвет души ${colorInfo.ru_name} | Японский календарь`,
    description: `Ваш цветовой гороскоп на ${prettyDate}. Цвет: ${colorInfo.ru_name}. Узнайте скрытые черты вашего характера и судьбы.`,
    openGraph: {
      title: `${prettyDate} — Ваш цвет: ${colorInfo.ru_name}`,
      description: colorInfo.ru_feature,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(colorInfo.ru_name)}&hex=${cleanHex}&subtitle=${encodeURIComponent(prettyDate)}&system=colorstrology.ru`,
          width: 1200,
          height: 630,
          alt: `Цвет ${colorInfo.ru_name}`,
        },
      ],
    },
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
  const extInfo = (colorsExtensions as any)[resolvedParams.id] || {};

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
          <Breadcrumbs
            items={[
              { label: "Японский календарь", href: "/japanese-colors" },
              { label: dateText },
            ]}
            textColor={textColor}
          />
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
        {/* НОВЫЙ БЛОК: Глубокий анализ (Из japanese_extensions.json) */}
        {(extInfo.strengths || extInfo.love) && (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Сильные и слабые стороны */}
            <div
              className="p-8 md:p-10 rounded-3xl backdrop-blur-md flex flex-col gap-6"
              style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: glassBgColor,
              }}
            >
              <div>
                <h3 className="text-xl font-bold mb-3 font-serif flex items-center gap-2">
                  <span className="text-green-500">✦</span> Сильные стороны
                </h3>
                <ul className="list-disc list-inside opacity-90 space-y-1">
                  {extInfo.strengths?.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 font-serif flex items-center gap-2">
                  <span className="text-red-400">✧</span> Теневая сторона
                </h3>
                <ul className="list-disc list-inside opacity-80 space-y-1">
                  {extInfo.weaknesses?.map((w: string, i: number) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Карьера и Любовь */}
            <div
              className="p-8 md:p-10 rounded-3xl backdrop-blur-md flex flex-col gap-6"
              style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: glassBgColor,
              }}
            >
              <div>
                <h3 className="text-xl font-bold mb-2 font-serif opacity-70 uppercase tracking-widest text-sm">
                  Карьера и Призвание
                </h3>
                <p className="opacity-95 leading-relaxed">{extInfo.career}</p>
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-bold mb-2 font-serif opacity-70 uppercase tracking-widest text-sm">
                  Любовь и Отношения
                </h3>
                <p className="opacity-95 leading-relaxed">{extInfo.love}</p>
              </div>
            </div>
          </div>
        )}

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
        {/* БЛОК ПЕРЕЛИНКОВКИ ДЛЯ SEO */}
        <div
          className="mt-16 pt-12 text-center"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          <h3
            className="text-2xl font-bold font-serif mb-8"
            style={{ color: textColor }}
          >
            Узнайте больше о своей дате
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              href={`/pantone/${colorInfo.date_mmdd}`}
              className="px-8 py-5 rounded-2xl backdrop-blur-md transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: glassBgColor,
                border: `1px solid ${borderColor}`,
                color: textColor,
              }}
            >
              <span className="block text-xs uppercase tracking-widest opacity-60 mb-1">
                Colorstrology
              </span>
              <span className="font-bold text-lg">Ваш цвет по Pantone →</span>
            </Link>

            <Link
              href="/numerology"
              className="px-8 py-5 rounded-2xl backdrop-blur-md transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: glassBgColor,
                border: `1px solid ${borderColor}`,
                color: textColor,
              }}
            >
              <span className="block text-xs uppercase tracking-widest opacity-60 mb-1">
                Пифагор
              </span>
              <span className="font-bold text-lg">Ваше Число Судьбы →</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
