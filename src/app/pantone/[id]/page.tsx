import pantoneData from "@/data/pantone_days.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

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

  const day = parseInt(data.date.split("-")[1], 10);
  const month = MONTH_DECLENSIONS[parseInt(data.date.split("-")[0], 10) - 1];
  const prettyDate = `${day} ${month}`;

  return {
    // В Title пишем самые "вкусные" ключевые слова
    title: `Цвет рождения ${prettyDate}: ${data.pantone_name} | Колорострология Pantone`,
    description: `Ваш личный цвет по дате рождения ${prettyDate} в системе Колорострологии Мишель Бернхардт — ${data.pantone_name} (Pantone ${data.pantone_code}). Узнайте свой психологический профиль и как этот цвет привлекает удачу.`,
    keywords: [
      `цвет по дате рождения ${prettyDate}`,
      "колорострология",
      "мишель бернхардт",
      data.pantone_name,
      `Pantone ${data.pantone_code}`,
      "астрология цвета",
    ],
    openGraph: {
      title: `${prettyDate} — Ваш цвет: ${data.pantone_name} (Pantone)`,
      description: data.profile.substring(0, 150) + "...",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(data.pantone_name)}&hex=${data.hex.replace("#", "")}&subtitle=${encodeURIComponent(prettyDate + " | Pantone")}&system=colorstrology.ru`,
          width: 1200,
          height: 630,
        },
      ],
    },
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
        <Breadcrumbs items={[{ label: "Pantone", href: "/pantone" }]} />
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
              href={`/${data.date_mmdd}`}
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
              <span className="font-bold text-lg">
                Ваш цвет по Японскому календарю →
              </span>
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
        {/* СЕО БЛОК (В самом низу) */}
        <article className="mt-24 pt-12 border-t border-gray-200 prose prose-lg max-w-4xl mx-auto text-gray-700">
          <h2 className="text-3xl font-black font-serif text-gray-900 mb-6">
            Что такое Pantone Colorstrology?
          </h2>
          <p>
            <strong>Colorstrology (Колорострология)</strong> — это уникальная
            система самопознания, созданная астрологом и нумерологом Мишель
            Бернхардт (Michele Bernhardt) совместно с мировым институтом цвета{" "}
            <strong>Pantone</strong>. Эта система объединяет классическую
            астрологию, вибрации чисел и психологию цвета.
          </p>
          <h3 className="text-2xl font-bold font-serif text-gray-900 mt-8 mb-4">
            Как работает цвет по дате рождения?
          </h3>
          <p>
            В отличие от привычного зодиакального гороскопа, система Мишель
            Бернхардт выделяет <strong>366 уникальных оттенков Pantone</strong>{" "}
            — для каждого дня в году, включая 29 февраля, а также 12 управляющих
            цветов для каждого месяца.
          </p>
          <p>
            Ваш личный цвет Пантон вычисляется на основе солнечного знака,
            правящей планеты и нумерологии вашей даты рождения. Этот цвет — не
            обязательно ваш любимый оттенок. Это энергетический маркер, который
            отражает ваши скрытые таланты, сильные стороны и истинную природу.
          </p>
          <h3 className="text-2xl font-bold font-serif text-gray-900 mt-8 mb-4">
            Как использовать свой цвет Pantone?
          </h3>
          <ul>
            <li>
              <strong>Для привлечения удачи:</strong> Носите аксессуары своего
              цвета в важные дни.
            </li>
            <li>
              <strong>В интерьере:</strong> Окружите себя своим цветом рождения
              дома или на рабочем месте, чтобы чувствовать себя увереннее и
              снизить стресс.
            </li>
            <li>
              <strong>Для медитации:</strong> Визуализируйте свой оттенок, когда
              вам нужно восстановить душевный баланс.
            </li>
          </ul>
          <p>
            Выберите месяц и день своего рождения в календаре выше, чтобы узнать
            свой личный номер Pantone, название цвета и подробный
            психологический профиль личности!
          </p>
        </article>
      </div>
    </main>
  );
}
