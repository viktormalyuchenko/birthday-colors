import { getPostData } from "@/lib/blog";
import Link from "next/link";

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-indigo-600 font-bold hover:underline mb-8 inline-block"
        >
          ← Назад в блог
        </Link>

        <article className="prose prose-lg prose-indigo max-w-none">
          <p className="text-sm font-bold text-gray-400">{postData.date}</p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
            {postData.title}
          </h1>

          {/* Контент статьи из Markdown */}
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    </main>
  );
}
