"use client";

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

export default function MonthNav() {
  const scrollToMonth = (index: number) => {
    const element = document.getElementById(`month-${index}`);
    if (element) {
      // Увеличили отступ (y - 160), чтобы заголовок месяца был четко под меню
      const y = element.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-20 md:top-24 z-40 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-gray-100 mb-12 flex overflow-x-auto hide-scrollbar gap-2">
      {MONTH_NAMES.map((month, index) => (
        <button
          key={month}
          onClick={() => scrollToMonth(index)}
          className="px-5 py-2 hover:bg-gray-100 hover:text-gray-900 text-gray-500 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors"
        >
          {month}
        </button>
      ))}
    </div>
  );
}
