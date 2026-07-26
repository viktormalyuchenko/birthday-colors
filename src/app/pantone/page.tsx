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
                  prefetch={false}
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
