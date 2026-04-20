import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";

export const metadata = { title: "Блог | Colorstrology" };

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-indigo-600 font-bold hover:underline mb-8 inline-block"
        >
          ← На главную
        </Link>
        <h1 className="text-5xl font-black text-gray-900 mb-12">
          Блог о психологии цвета
        </h1>

        <div className="grid gap-6">
          {allPostsData.map(({ id, date, title, excerpt }) => (
            <Link
              href={`/blog/${id}`}
              key={id}
              className="block p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >
              <p className="text-sm font-bold text-indigo-500 mb-2">{date}</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
              <p className="text-gray-600 leading-relaxed">{excerpt}</p>
            </Link>
          ))}
          {allPostsData.length === 0 && <p>Статьи скоро появятся...</p>}
        </div>
      </div>
    </main>
  );
}
