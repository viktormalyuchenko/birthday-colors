import colorsData from "@/data/birthday_colors.json";
import Link from "next/link";
import { notFound } from "next/navigation";

// Функция для определения цвета текста (черный или белый) в зависимости от фона
function getContrastYIQ(hexcolor: string) {
  if (!hexcolor) return "black";
  const hex = hexcolor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

export default function ColorPage({ params }: { params: { id: string } }) {
  // Ищем цвет по ключу (например, "0101")
  const colorInfo = (colorsData as any)[params.id];

  if (!colorInfo) {
    notFound(); // Показывает 404, если дата не найдена
  }

  const textColor = getContrastYIQ(colorInfo.hex || "#ffffff");
  const borderColor =
    textColor === "white" ? "border-white/30" : "border-black/10";

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500"
      style={{ backgroundColor: colorInfo.hex || "#f3f4f6", color: textColor }}
    >
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className={`inline-block mb-8 pb-1 border-b hover:opacity-70 transition-opacity ${borderColor}`}
        >
          ← Назад к календарю
        </Link>

        <h3 className="text-2xl font-light mb-2">{colorInfo.date}</h3>
        <h1 className="text-5xl md:text-7xl font-bold mb-2">
          {colorInfo.ru_name}
        </h1>
        <h2 className="text-xl md:text-2xl font-light opacity-80 mb-8 uppercase tracking-widest">
          {colorInfo.en_name}
        </h2>

        <div
          className={`text-xl md:text-2xl font-medium mb-8 p-6 rounded-2xl border ${borderColor} backdrop-blur-sm bg-white/5`}
        >
          "{colorInfo.ru_feature}"
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {colorInfo.ru_keywords.map((word: string, index: number) => (
            <span
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${borderColor} backdrop-blur-sm bg-white/10`}
            >
              {word}
            </span>
          ))}
        </div>

        <p className="text-lg leading-relaxed mb-12 opacity-90">
          {colorInfo.ru_description}
        </p>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t ${borderColor} opacity-80 text-sm`}
        >
          <div>
            <p className="font-bold mb-1">HEX</p>
            <p>{colorInfo.hex || "Нет данных"}</p>
          </div>
          <div>
            <p className="font-bold mb-1">RGB</p>
            <p>{colorInfo.rgb}</p>
          </div>
          <div>
            <p className="font-bold mb-1">CMYK</p>
            <p>{colorInfo.cmyk}</p>
          </div>
          <div>
            <p className="font-bold mb-1">HSB</p>
            <p>{colorInfo.hsb}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
