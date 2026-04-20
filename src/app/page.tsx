import Link from "next/link";
import colorsData from "@/data/birthday_colors.json";
import MonthNav from "@/components/MonthNav"; // Импортируем наше меню

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

export default function Home() {
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
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight font-serif">
            Colorstrology
          </h1>
          <p className="text-xl font-light text-indigo-100 mb-10 max-w-3xl mx-auto">
            Узнайте цвет своего дня рождения и откройте скрытые черты характера.
          </p>
        </div>
      </section>

      <div id="calendar" className="max-w-7xl mx-auto px-4 py-12">
        {/* ИСПОЛЬЗУЕМ НОВЫЙ КОМПОНЕНТ */}
        <MonthNav />

        {groupedByMonth.map((monthDays: any[], index: number) => (
          <section key={index} id={`month-${index}`} className="mb-20">
            <h2 className="text-3xl font-black mb-6 text-gray-800 border-b-2 border-gray-100 pb-2">
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
                      <p className="text-xs font-bold text-indigo-500 mb-1 uppercase">
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
      </div>
    </main>
  );
}
