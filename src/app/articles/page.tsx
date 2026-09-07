import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getSortedArticlesData } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Статьи о цветах, датах рождения и личных палитрах",
  description:
    "Практические материалы Colorstrology о цветах по дате рождения, цветовых календарях и составлении личной палитры.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const articles = getSortedArticlesData();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Статьи" }]} />

        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
            Библиотека Colorstrology
          </p>
          <h1 className="mb-5 font-serif text-4xl font-black text-gray-900 md:text-6xl">
            Статьи о цветах
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            Инструкции, таблицы и практические материалы о цветах по дате
            рождения и способах собрать собственную палитру.
          </p>
        </header>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              href={`/articles/${article.slug}`}
              key={article.slug}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${article.coverImage})` }}
              />
              <div className="p-7">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {article.category}
                </span>
                <h2 className="mb-3 font-serif text-2xl font-bold leading-tight text-gray-900 group-hover:text-indigo-600">
                  {article.title}
                </h2>
                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
