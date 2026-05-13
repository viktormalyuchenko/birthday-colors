import { getSortedPostsData } from "@/lib/blog";
import Breadcrumbs from "@/components/Breadcrumbs";
import ForecastCatalog from "@/components/ForecastCatalog"; // Импортируем наш новый компонент
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
  // Получаем посты на сервере (отлично для SEO, поисковик увидит JSON внутри)
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
          найти прогнозы для вашей стихии или знака зодиака.
        </p>

        {/* ПЕРЕДАЕМ ДАННЫЕ В КЛИЕНТСКИЙ КОМПОНЕНТ */}
        <ForecastCatalog initialPosts={allPosts} />
      </div>
    </main>
  );
}
