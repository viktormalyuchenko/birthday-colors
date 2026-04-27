import Link from "next/link";
import colorsData from "@/data/birthday_colors.json";
import MonthNav from "@/components/MonthNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Японский календарь: Узнай цвет своей души по дате рождения",
  description:
    "Цветовой гороскоп на каждый день (система Tanjoshoku). Узнайте скрытые черты характера и истинный цвет вашей души.",
  keywords: [
    "японские цвета дня рождения",
    "tanjoshoku",
    "японский календарь цветов",
    "цвет характера",
    "японский календарь цвета души",
    "японский цветовой гороскоп онлайн",
    "цвет души по дате рождения",
  ],
};

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

export default function JapaneseColorsPage() {
  const colorsArray = Object.values(colorsData).sort((a: any, b: any) =>
    a.date_mmdd.localeCompare(b.date_mmdd),
  );
  const groupedByMonth = colorsArray.reduce((acc: any, item: any) => {
    const monthIndex = parseInt(item.date_mmdd.substring(0, 2), 10) - 1;
    if (!acc[monthIndex]) acc[monthIndex] = [];
    acc[monthIndex].push(item);
    return acc;
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-gray-900">
      {/* ХЕРО БЛОК */}
      <section className="bg-gradient-to-br from-red-900 via-rose-900 to-slate-900 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight font-serif drop-shadow-lg">
            Японский календарь цветов
          </h1>
          <p className="text-xl font-light text-rose-100 mb-6 max-w-2xl mx-auto leading-relaxed">
            Система 誕生色 (Tanjoshoku). 366 уникальных оттенков, вдохновленных
            природой, временами года и традиционной поэзией Японии.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <MonthNav />

        {/* СЕТКА МЕСЯЦЕВ */}
        {groupedByMonth.map((monthDays: any[], index: number) => (
          <section key={index} id={`month-${index}`} className="mb-20">
            <h2 className="text-3xl font-black mb-6 text-gray-800 border-b-2 border-gray-100 pb-2 font-serif">
              {MONTH_NAMES[index]}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {monthDays.map((item) => {
                const day = parseInt(item.date.split("-")[1], 10);
                return (
                  <Link
                    href={`/${item.date_mmdd}`}
                    key={item.date_mmdd}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                  >
                    <div
                      className="h-28 w-full transition-transform group-hover:scale-105 origin-bottom"
                      style={{ backgroundColor: item.hex || "#e5e7eb" }}
                    />
                    <div className="p-3 bg-white z-10">
                      <p className="text-xs font-bold text-rose-500 mb-1 uppercase tracking-wider">
                        {day} {MONTH_DECLENSIONS[index]}
                      </p>
                      <p className="text-sm font-bold text-gray-900 leading-tight">
                        {item.ru_name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* СЕО БЛОК (В самом низу) */}
        <article className="mt-24 pt-12 border-t border-gray-200 prose prose-lg prose-rose max-w-4xl mx-auto text-gray-700">
          <h2 className="text-3xl font-black font-serif text-gray-900">
            Что такое Японские цвета дня рождения (Tanjoshoku)?
          </h2>
          <p>
            В Японии существует уникальная традиция связывать каждый день в году
            с определенным цветом. Эта система называется{" "}
            <strong>Tanjoshoku (誕生色)</strong>. В отличие от западной
            астрологии, японская колорострология глубоко укоренена в наблюдении
            за природой: сменой сезонов, цветением растений, оттенками неба и
            моря.
          </p>
          <h3>Как использовать свой цвет?</h3>
          <p>
            Ваш личный цвет — это не просто эстетика, это ваша энергетическая
            подпись. Японцы верят, что ношение элемента одежды или аксессуара
            своего цвета (или цвета текущего дня) приносит удачу, защищает от
            злых духов и помогает найти душевный баланс.
          </p>
          <p>
            Вы можете использовать свой цвет при выборе интерьера, рабочего
            стола на телефоне или даже как талисман в важные дни. Нажмите на
            свою дату рождения в календаре выше, чтобы узнать глубокое
            психологическое значение вашего личного оттенка!
          </p>
        </article>
      </div>
    </main>
  );
}
