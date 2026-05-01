import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог о психологии цвета и астрологии",
  description:
    "Полезные статьи о том, как цвета влияют на нашу жизнь, карму и характер. Читайте о колорострологии, нумерологии и астрологии.",
};

export default function BlogIndex() {
  const allPosts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: "Блог" }]} />

        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-12 font-serif tracking-tight">
          Блог
        </h1>

        <div className="grid gap-10">
          {allPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >
              {/* Обложка статьи */}
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${post.coverImage})` }}
                />
              </div>

              {/* Текст анонса */}
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    {post.category}
                  </span>
                  <span className="text-sm font-medium text-gray-400">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-serif leading-tight group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}

          {allPosts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              Статьи скоро появятся...
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
