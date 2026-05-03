import { getPostData } from "@/lib/blog";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  try {
    const post = await getPostData(resolved.slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.coverImage }],
      },
    };
  } catch {
    return { title: "Статья не найдена" };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;

  let postData;
  try {
    postData = await getPostData(resolved.slug);
  } catch (error) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-16 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {" "}
        {/* Увеличили с 3xl до 4xl */}
        <Breadcrumbs
          items={[{ label: "Блог", href: "/blog" }, { label: postData.title }]}
        />
        <article className="bg-white p-8 md:p-16 lg:p-20 rounded-[3rem] shadow-xl border border-gray-100 mt-8">
          <header className="mb-12 text-center max-w-3xl mx-auto">
            {" "}
            {/* Центрируем заголовок в более узкой зоне для красоты */}
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-6 inline-block bg-indigo-50 px-4 py-1.5 rounded-full">
              {postData.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 font-serif leading-tight">
              {postData.title}
            </h1>
            <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">
              Опубликовано: {postData.date}
            </p>
          </header>

          {/* Картинка теперь шире, занимает почти всю карточку */}
          <div className="w-full h-72 md:h-[500px] rounded-3xl overflow-hidden mb-16 shadow-md relative">
            <img
              src={postData.coverImage}
              alt={postData.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Контент статьи */}
          <div className="overflow-x-auto w-full pb-4">
            <div
              className="prose prose-lg md:prose-xl prose-indigo min-w-full text-gray-700 prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-3xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
          </div>
        </article>
        {/* Кнопка возврата в самом низу статьи для удобства */}
        <div className="mt-12 text-center">
          <a
            href="/blog"
            className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-indigo-600 transition-colors"
          >
            ← Назад ко всем статьям
          </a>
        </div>
      </div>
    </main>
  );
}
