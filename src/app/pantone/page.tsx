import Link from "next/link";
import pantoneData from "@/data/pantone_days.json";
import MonthNav from "@/components/MonthNav";
import type { Metadata } from "next";

const MONTH_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const metadata: Metadata = {
  title: "Pantone Colorstrology | Цвета по дате рождения (Мишель Бернхардт)",
  description:
    "Система Colorstrology: 366 уникальных цветов Pantone и 12 оттенков месяцев. Найди свой Pantone-цвет и узнай свой психологический профиль.",
  keywords: [
    "pantone colorstrology",
    "цвет пантон по дате рождения",
    "мишель бернхардт",
    "цвет дня рождения pantone",
  ],
};

export default function PantoneIndex() {
  const colorsArray = Object.values(pantoneData).sort((a: any, b: any) =>
    a.date_mmdd.localeCompare(b.date_mmdd),
  );
  const grouped = colorsArray.reduce((acc: any, item: any) => {
    const m = parseInt(item.date_mmdd.substring(0, 2), 10) - 1;
    if (!acc[m]) acc[m] = [];
    acc[m].push(item);
    return acc;
  }, []);

  return (
    <main className="min-h-screen bg-[#F9F9F8] text-gray-900">
      <section className="bg-white border-b border-gray-200 py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 font-serif">
          Pantone Colors
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Система Мишель Бернхардт: 366 уникальных оттенков, объединяющих
          астрологию и психологию цвета.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <MonthNav />
        {grouped.map((days: any[], i: number) => (
          <section key={i} id={`month-${i}`} className="mb-20">
            <h2 className="text-3xl font-black mb-6 border-b-2 pb-2">
              {MONTH_NAMES[i]}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {days.map((item) => (
                <Link
                  href={`/pantone/${item.date_mmdd}`}
                  key={item.date_mmdd}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border flex flex-col hover:shadow-lg transition-all"
                >
                  <div
                    className="h-28 w-full"
                    style={{ backgroundColor: item.hex }}
                  />
                  <div className="p-3">
                    <p className="text-xs font-bold text-gray-400 mb-1">
                      {parseInt(item.date.split("-")[1])} {MONTH_NAMES[i]}
                    </p>
                    <p className="text-sm font-bold leading-tight">
                      {item.pantone_name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
