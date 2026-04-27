import pantoneData from "@/data/pantone_days.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

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

function getContrastColor(hex: string) {
  if (!hex) return "#111827";
  const h = hex.replace("#", "");
  if (h.length !== 6) return "#111827";
  const yiq =
    (parseInt(h.substring(0, 2), 16) * 299 +
      parseInt(h.substring(2, 4), 16) * 587 +
      parseInt(h.substring(4, 6), 16) * 114) /
    1000;
  return yiq >= 128 ? "#111827" : "#ffffff";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const data = (pantoneData as any)[resolved.id];
  if (!data) return { title: "Цвет не найден" };

  // Делаем красивую дату
  const day = parseInt(data.date.split("-")[1], 10);
  const month = MONTH_DECLENSIONS[parseInt(data.date.split("-")[0], 10) - 1];
  const prettyDate = `${day} ${month}`;

  return {
    title: `${prettyDate} — Цвет ${data.pantone_name} (Pantone ${data.pantone_code})`,
    description: `Психологический профиль для рожденных ${prettyDate}. Ваш цвет — ${data.pantone_name}. ${data.profile.substring(0, 120)}...`,
    keywords: [
      data.pantone_name,
      `Pantone ${data.pantone_code}`,
      `цвет рождения ${prettyDate}`,
    ],
  };
}

export default async function PantoneColorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  const data = (pantoneData as any)[resolved.id];
  if (!data) notFound();

  // Делаем красивую дату для отображения на странице
  const day = parseInt(data.date.split("-")[1], 10);
  const month = MONTH_DECLENSIONS[parseInt(data.date.split("-")[0], 10) - 1];
  const prettyDate = `${day} ${month}`;

  const textColor = getContrastColor(data.hex);
  const borderColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(17,24,39,0.1)";
  const glassBgColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)";

  return (
    <main
      className="min-h-screen p-6 lg:p-12"
      style={{ backgroundColor: data.hex, color: textColor }}
    >
      <div className="max-w-4xl mx-auto">
        <Link
          href="/pantone"
          className="pb-1 mb-10 inline-block font-medium"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          ← В календарь
        </Link>
        <h3 className="text-2xl opacity-80 mb-2">{data.date}</h3>
        <h1 className="text-6xl md:text-8xl font-black font-serif mb-4">
          {data.pantone_name}
        </h1>
        <h2 className="text-2xl md:text-3xl opacity-80 font-mono mb-12">
          Pantone {data.pantone_code}
        </h2>

        <div className="flex gap-2 mb-12 flex-wrap">
          {data.keywords.map((w: string) => (
            <span
              key={w}
              className="px-4 py-2 rounded-full font-bold"
              style={{
                backgroundColor: glassBgColor,
                border: `1px solid ${borderColor}`,
              }}
            >
              {w}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            className="p-8 rounded-3xl"
            style={{
              backgroundColor: glassBgColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            <h3 className="text-2xl font-bold mb-4 font-serif">Ваш Профиль</h3>
            <p className="text-lg opacity-90 leading-relaxed">{data.profile}</p>
          </div>
          <div
            className="p-8 rounded-3xl"
            style={{
              backgroundColor: glassBgColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            <h3 className="text-2xl font-bold mb-4 font-serif">Магия Цвета</h3>
            <p className="text-lg opacity-90 leading-relaxed">{data.benefit}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
