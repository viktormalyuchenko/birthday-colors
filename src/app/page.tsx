import Link from "next/link";
import colorsData from "@/data/birthday_colors.json";

export default function Home() {
  // Превращаем объект в массив для удобного рендера
  const colorsArray = Object.values(colorsData);

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Colorstrology</h1>
        <p className="text-center mb-10 text-gray-600">
          Узнай цвет своего дня рождения
        </p>

        {/* Сетка цветов */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {colorsArray.map((item) => (
            <Link
              href={`/${item.date_mmdd}`}
              key={item.date_mmdd}
              className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="h-24 w-full flex items-center justify-center transition-opacity group-hover:opacity-90"
                style={{ backgroundColor: item.hex || "#ccc" }} // Резервный цвет, если hex пустой
              >
                {/* Здесь можно добавить логику цвета текста, но пока оставим так */}
              </div>
              <div className="p-3 bg-white">
                <p className="text-xs font-bold text-gray-500">{item.date}</p>
                <p
                  className="text-sm font-semibold truncate"
                  title={item.ru_name}
                >
                  {item.ru_name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
