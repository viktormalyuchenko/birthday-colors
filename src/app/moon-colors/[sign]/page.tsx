import moonColors from "@/data/moon_colors.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ShareModal from "@/components/ShareModal";

// Надежная функция контраста (белый или темно-графитовый)
function getContrastColor(hexcolor: string) {
  if (!hexcolor) return "#111827";
  const hex = hexcolor.replace("#", "");
  if (hex.length !== 6) return "#111827";

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#111827" : "#ffffff";
}

// Динамические мета-теги для SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sign: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const data = (moonColors as any)[resolved.sign];
  if (!data) return { title: "Знак не найден" };

  return {
    title: `Луна в знаке ${data.sign} — Ваш лунный цвет ${data.ru_name} | Colorstrology`,
    description: data.ru_description,
    keywords: `луна в ${data.sign.toLowerCase()}, лунный знак ${data.sign.toLowerCase()}, лунный цвет, астрология цвета`,
  };
}

export default async function MoonColorResultPage({
  params,
}: {
  params: Promise<{ sign: string }>;
}) {
  const resolved = await params;
  const data = (moonColors as any)[resolved.sign];

  if (!data) notFound();

  const textColor = getContrastColor(data.hex);

  // Динамические эффекты "стекла" на основе цвета текста
  const borderColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(17,24,39,0.1)";
  const glassBgColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)";

  return (
    <main
      className="min-h-screen flex flex-col items-center p-6 lg:p-12 transition-colors duration-500"
      style={{ backgroundColor: data.hex, color: textColor }}
    >
      <div className="w-full max-w-4xl relative z-10 pt-4">
        {/* Хлебные крошки / Назад */}
        <Link
          href="/moon-colors"
          className="inline-flex items-center gap-2 mb-10 pb-1 hover:opacity-60 transition-opacity font-medium"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          ← Выбрать другой знак
        </Link>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-light mb-6 uppercase tracking-widest opacity-90">
            Луна в знаке {data.sign}
          </h3>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black mb-6 tracking-tighter font-serif drop-shadow-sm">
            {data.ru_name}
          </h1>
          <div className="flex justify-center gap-4 text-lg md:text-xl font-light font-serif italic opacity-90">
            <span>Планета: {data.planet}</span>
            <span>•</span>
            <span>Стихия: {data.element}</span>
          </div>
        </div>

        {/* Цитата / Особенность */}
        <div
          className="text-center text-xl md:text-3xl font-medium mb-12 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-xl"
          style={{
            border: `1px solid ${borderColor}`,
            backgroundColor: glassBgColor,
          }}
        >
          "{data.ru_feature}"
        </div>

        {/* Описание (Одна большая колонка для Луны, так как текста много, а тегов в лунной базе нет) */}
        <div
          className="p-8 md:p-12 rounded-3xl backdrop-blur-md mb-12"
          style={{
            border: `1px solid ${borderColor}`,
            backgroundColor: glassBgColor,
          }}
        >
          <h3 className="text-2xl font-bold mb-6 font-serif">
            Энергия Лунного Знака
          </h3>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">
            {data.ru_description}
          </p>
        </div>

        {/* Блок HEX и Кнопка "Поделиться" */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-8 p-8 md:p-10 rounded-3xl backdrop-blur-md"
          style={{
            border: `1px solid ${borderColor}`,
            backgroundColor: glassBgColor,
          }}
        >
          <div className="flex-grow">
            <p className="font-bold mb-1 opacity-60 uppercase tracking-widest text-xs">
              Цветовой код (HEX)
            </p>
            <p className="text-2xl font-mono">{data.hex}</p>
          </div>

          <ShareModal
            colorHex={data.hex}
            colorName={data.ru_name}
            colorEnName={`Луна в знаке ${data.sign}`}
            dateText="" // Дату не передаем, так как это общий знак
            textColor={textColor}
            feature={data.ru_feature}
          />
        </div>
      </div>
    </main>
  );
}
