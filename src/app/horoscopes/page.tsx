import { getSortedPostsData } from "@/lib/blog";
import Breadcrumbs from "@/components/Breadcrumbs";
import ForecastCatalog from "@/components/ForecastCatalog";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Гороскопы и Таро прогнозы | Любовь, финансы, карьера",
  description:
    "Актуальные астрологические и таро прогнозы на неделю и месяц. Узнайте, что приготовила Вселенная для вашего знака зодиака.",
  keywords: [
    "гороскоп",
    "таро прогноз",
    "расклад таро на месяц",
    "любовный гороскоп",
    "прогноз для знаков зодиака",
  ],
};

const ZODIAC_SIGNS = [
  { id: "aries", ru: "Овен", emoji: "♈", date: "21.03 - 19.04" },
  { id: "taurus", ru: "Телец", emoji: "♉", date: "20.04 - 20.05" },
  { id: "gemini", ru: "Близнецы", emoji: "♊", date: "21.05 - 20.06" },
  { id: "cancer", ru: "Рак", emoji: "♋", date: "21.06 - 22.07" },
  { id: "leo", ru: "Лев", emoji: "♌", date: "23.07 - 22.08" },
  { id: "virgo", ru: "Дева", emoji: "♍", date: "23.08 - 22.09" },
  { id: "libra", ru: "Весы", emoji: "♎", date: "23.09 - 22.10" },
  { id: "scorpio", ru: "Скорпион", emoji: "♏", date: "23.10 - 21.11" },
  { id: "sagittarius", ru: "Стрелец", emoji: "♐", date: "22.11 - 21.12" },
  { id: "capricorn", ru: "Козерог", emoji: "♑", date: "22.12 - 19.01" },
  { id: "aquarius", ru: "Водолей", emoji: "♒", date: "20.01 - 18.02" },
  { id: "pisces", ru: "Рыбы", emoji: "♓", date: "19.02 - 20.03" },
];

export default function HoroscopesIndex() {
  const allPosts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={[{ label: "Гороскопы и Прогнозы" }]} />

        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 font-serif tracking-tight">
          Прогнозы и Таро
        </h1>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl">
          Читайте актуальные расклады и гороскопы. Используйте фильтры, чтобы
          найти свежие прогнозы.
        </p>

        {/* КАТАЛОГ С ФИЛЬТРАМИ (Идет первым!) */}
        <section className="mb-20">
          <ForecastCatalog initialPosts={allPosts} />
        </section>

        {/* СЕТКА 12 ЗНАКОВ ЗОДИАКА (Ушла вниз) */}
        <section className="pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">
            Все прогнозы по знакам зодиака
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {ZODIAC_SIGNS.map((sign) => (
              <Link
                href={`/horoscopes/signs/${sign.id}`}
                key={sign.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {sign.emoji}
                </div>
                <h3 className="font-bold text-gray-900">{sign.ru}</h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                  {sign.date}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
