import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import Breadcrumbs from "@/components/Breadcrumbs";
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

export default function HoroscopesIndex() {
  const allPosts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={[{ label: "Гороскопы и Прогнозы" }]} />

        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-12 font-serif tracking-tight">
          Гороскопы и Таро
        </h1>

        {/* НОВАЯ СЕТКА: 1 колонка -> 2 колонки -> 3 колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <Link
              href={`/horoscopes/${post.slug}`}
              key={post.slug}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >
              {/* Обложка (Сверху) */}
              <div className="w-full h-56 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${post.coverImage || "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000"})`,
                  }}
                />
              </div>

              {/* Текст */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {post.category}
                  </span>

                  {post.date_start &&
                    post.date_end &&
                    post.forecast_type !== "general" &&
                    (new Date() >= new Date(post.date_start) &&
                    new Date() <=
                      new Date(new Date(post.date_end).setHours(23, 59, 59)) ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Актуально
                      </span>
                    ) : null)}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 font-serif leading-tight group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 text-xs text-gray-400 font-medium">
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
