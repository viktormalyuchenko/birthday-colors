import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleShare from "@/components/ArticleShare";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getArticleData, getSortedArticlesData } from "@/lib/blog";

const BASE_URL = "https://colorstrology.ru";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticleData(slug);
    return {
      title: article.title,
      description: article.excerpt,
      alternates: { canonical: `/articles/${slug}` },
      openGraph: {
        type: "article",
        title: article.title,
        description: article.excerpt,
        url: `/articles/${slug}`,
        publishedTime: article.date,
        images: [{ url: article.coverImage, alt: article.title }],
      },
    };
  } catch {
    return { title: "Статья не найдена" };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticleData(slug);
  } catch {
    notFound();
  }

  const relatedArticles = getSortedArticlesData()
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: `${BASE_URL}/articles/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Colorstrology",
      url: BASE_URL,
    },
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] px-4 py-10 font-sans md:py-16">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Статьи", href: "/articles" },
            { label: article.title },
          ]}
        />

        <article className="mt-4 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl md:rounded-[3rem] md:p-12 lg:p-16">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <header className="mx-auto mb-8 flex max-w-4xl flex-col items-center text-center md:mb-12">
            <span className="mb-4 inline-block rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
              {article.category}
            </span>
            <h1 className="mb-6 font-serif text-3xl font-black leading-tight text-gray-900 md:text-5xl">
              {article.title}
            </h1>
            <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
              Опубликовано: {article.date}
            </span>
          </header>

          <div className="relative mb-12 h-56 w-full overflow-hidden rounded-2xl shadow-md md:h-[350px] md:rounded-3xl">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className="prose prose-base prose-indigo min-w-full text-gray-700 prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 md:prose-lg"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          <ArticleShare title={article.title} label="Поделиться статьёй:" />
        </article>

        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-7 text-center font-serif text-3xl font-black text-gray-900">
              Другие статьи о цветах
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/articles/${item.slug}`}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/articles"
            className="inline-flex rounded-full border border-gray-200 bg-white px-8 py-4 font-bold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            ← Все статьи
          </Link>
        </div>
      </div>
    </main>
  );
}
