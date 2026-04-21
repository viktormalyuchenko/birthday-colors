import moonColors from "@/data/moon_colors.json";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цвет Лунного Знака Зодиака | Астрология эмоций",
  description: "Узнайте цвет вашего подсознания по лунному знаку зодиака.",
};

export default function MoonColorsIndex() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] text-gray-900 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 font-serif">
            Лунные Цвета
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            В астрологии Солнце — это ваше Эго, а Луна — скрытая Душа. Выберите
            свой лунный знак, чтобы узнать цвет своего подсознания.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(moonColors).map(([slug, data]: [string, any]) => (
            <Link
              href={`/moon-colors/${slug}`}
              key={slug}
              className="p-8 rounded-[2rem] border border-gray-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all text-center flex flex-col items-center group"
            >
              <div
                className="w-16 h-16 rounded-full mb-6 shadow-inner transition-transform group-hover:scale-110"
                style={{ backgroundColor: data.hex }}
              />
              <h3 className="font-bold text-xl font-serif">{data.sign}</h3>
              <p className="text-sm text-gray-400 mt-2">{data.ru_name}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
